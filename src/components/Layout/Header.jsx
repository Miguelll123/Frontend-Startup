import React from "react";
import logoAjuntament from "../../assets/Logo_ajuntamentValencia.png";
import logoVIC from "../../assets/Logo_VIC.png";
import logoSV from "../../assets/Logo_SV.png";

const Header = () => (
  <header
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      background: "var(--main-gradient)",
      color: "white",
      padding: "10px 20px",
      height: "auto",
      boxSizing: "border-box",
    }}
  >
    <div
      className="demo-logo"
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        alignItems: "center",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <img src={logoAjuntament} alt="Logo Ayuntament de valencia" style={{ height: "40px", maxWidth: "100%", flexShrink: 1 }} />
      <img src={logoVIC} alt="Logo Valencia Innovation Capital" style={{ height: "40px", maxWidth: "100%", flexShrink: 1 }} />
      <img src={logoSV} alt="Logo Startup Valencia" style={{ height: "40px", maxWidth: "100%", flexShrink: 1 }} />
    </div>
    <div>
      <h1 style={{ margin: 0 }}>Seed Startup Program</h1>
    </div>
  </header>
);

export default Header; 