import React from "react";
import startupIcon from "../../../assets/3dicons-rocket-front-gradient.png";
import moduleIcon from "../../../assets/3dicons-file-text-front-gradient.png";
import trainerIcon from "../../../assets/3dicons-bulb-front-gradient.png";
import mentoringIcon from "../../../assets/3dicons-target-front-gradient.png";
import networkingIcon from "../../../assets/3dicons-megaphone-dynamic-gradient.png";
import moreIcon from "../../../assets/3dicons-chat-bubble-front-gradient.png";
import "./landing.css";
import Card from "../Card/Card";

const Landing = () => {
  return (
    <>
      <div class="parent">
        <div class="div3">
          <Card
            title="Startups"
            description="Explora todas las startups del programa de aceleración."
            image={startupIcon}
          />
        </div>
        <div class="div4">
          <Card
            title="Contenido"
            description="Accede al material exclusivo del programa."
            image={moduleIcon}
          />
        </div>
        <div class="div5">
          <Card
            title="Formadores"
            description="Descubre quiénes son los formadores del programa."
            image={trainerIcon}
          />
        </div>
        <div class="div6">esto es el logo</div>
        <div class="div8">
          <Card
            title="Mentoring"
            description="Conecta con mentores y empresas colaboradoras."
            image={mentoringIcon}
          />
        </div>
        <div class="div9">
          <Card
            title="Eventos"
            description="Consulta los eventos y actividades de networking."
            image={networkingIcon}
          />
        </div>
        <div class="div10">
          <Card title="Contacto" description="Más detalles y cómo contactarnos." image={moreIcon} />
        </div>
      </div>
    </>
  );
};

export default Landing;
