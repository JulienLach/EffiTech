import React from 'react';
import styles from './SidebarMenu.module.css';

const SibebarMenu = () => {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li><a href="/dashboard">Calendrier</a></li>
                <li><a href="/clients">Clients</a></li>
                <li><a href="/employees">Équipes</a></li>
                <li><a href="/company">Société</a></li>
                <li><a href="/invoices">Facture/Devis</a></li>
                <li><a href="/documents">Documents</a></li>
            </ul>
        </div>
    )
}

export default SibebarMenu;