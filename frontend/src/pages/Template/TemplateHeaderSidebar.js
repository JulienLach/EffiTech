import React from "react";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import TemplateStyle from "./TemplateHeaderSidebar.module.css";
const TemplateHeaderSidebar = function () {
  return (
    <>
      <div className={TemplateStyle.header}>
        <Header />
      </div>

      <div className={TemplateStyle.sidebar}>
      <SidebarMenu />
      </div>
    </>
  );
};

export default TemplateHeaderSidebar;
