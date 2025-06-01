const pool = require("../config/db.config");

async function runMigrations() {
    const client = await pool.connect();

    try {
        // Vérifier si la table companies existe
        const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'companies'
      );
    `);
        const hasCompaniesTable = tableExists.rows[0].exists;

        // Récupérer la version actuelle de la base depuis la table companies
        let currentVersion = "0.9.2"; // Dernière version déployée en prod
        if (hasCompaniesTable) {
            const result = await client.query(`
        SELECT database_version FROM companies
        LIMIT 1
      `);
            if (result.rows.length > 0) {
                currentVersion = result.rows[0].database_version || "0.9.2";
            }
        }

        // Version cible depuis les variables d'environnement injectées par Ansible dans le fichier vars.yml
        const targetVersion = process.env.DATABASE_VERSION || "0.9.2";
        console.log(
            `Current DB version: ${currentVersion}, Target version: ${targetVersion}`
        );

        // Si la version actuelle est >= à la cible, pas de migration, exemple si en prod
        // on est en 0.9.0 et qu'on déploie la même version, pas de migration
        if (currentVersion >= targetVersion) {
            console.log("No migrations needed, database is up to date");
            return;
        }

        // Si la version en base est inférieure à la cible, on applique les migrations
        // Exemple de migration : ajouter une colonne test_column à la table employees
        const migrations = [
            /*
            {
                version: "1.0.0", // nouvelle version pour la migration
                updateDatabase: async () => {
                    await client.query(`
                        ALTER TABLE employees
                        ADD COLUMN IF NOT EXISTS test_column BOOLEAN DEFAULT FALSE;
                    `);
                    await client.query(`
                        UPDATE companies SET database_version = '1.0.0';
                    `);
                },
            },
            */
            /*
            On ajoute à la suite du tableau les migration suivantes et on incrémente la version pour correspondre à la version dans le vars.yml d'ansible
           */
        ];

        // Appliquer les migrations nécessaires
        for (const migration of migrations) {
            if (
                currentVersion < migration.version &&
                migration.version <= targetVersion
            ) {
                console.log(`Applying migration to ${migration.version}`);
                await migration.updateDatabase();
            }
        }

        console.log(
            `Migrations completed, database updated to ${targetVersion}`
        );
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    } finally {
        client.release();
    }
}

module.exports = runMigrations;
