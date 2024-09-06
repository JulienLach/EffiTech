import react from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./TeamPage.module.css";
import profilPicture from "../../images/profilPic.jpg";

const TeamPage = () => {
  return (
    <>
      <TemplateGlobal />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.profilPicture}>
            <img src={profilPicture} alt="Profil picture" />
          </div>
          <div className={styles.profilInfo}>
            <p className={styles.lastname}>QUINETTE</p>
            <p className={styles.firstname}>Andy</p>
            <p className={styles.info}>Developpeur web</p>
            <p className={styles.info}>06 63 63 63 63</p>
            <p className={styles.info}>kiki@Dmail.gom</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
