const pool = require("../config/db.config"); // Réutilise le Pool existant de ton projet

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

        // Récupérer la version actuelle de la base depuis companies
        let currentVersion = "0.9.0"; // Dernière version déployée en prod
        if (hasCompaniesTable) {
            const result = await client.query(`
        SELECT database_version FROM companies
        LIMIT 1
      `);
            if (result.rows.length > 0) {
                currentVersion = result.rows[0].database_version || "0.9.0";
            }
        }

        // Version cible depuis les variables d'environnement injectées par Ansible via docker-compose.yml
        const targetVersion = process.env.DATABASE_VERSION || "0.9.0";
        console.log(
            `Current DB version: ${currentVersion}, Target version: ${targetVersion}`
        );

        // Si la version actuelle est >= à la cible, pas de migration nécessaire
        if (currentVersion >= targetVersion) {
            console.log("No migrations needed, database is up to date");
            return;
        }

        // Liste des migrations avec un exemple de migration
        const migrations = [
            /*
            {
                version: "1.0.0", // Sans 'v' pour cohérence avec companies.database_version
                up: async () => {
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
        ];

        // Appliquer les migrations nécessaires
        for (const migration of migrations) {
            if (
                currentVersion < migration.version &&
                migration.version <= targetVersion
            ) {
                console.log(`Applying migration to ${migration.version}`);
                await migration.up();
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
