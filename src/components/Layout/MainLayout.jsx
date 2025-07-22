import React, { useState, useEffect } from "react";
import { Layout, Menu, theme, Drawer } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import logoAjuntament from "../../assets/Logo_ajuntamentValencia.png";
import logoVIC from "../../assets/Logo_VIC.png";
import logoSV from "../../assets/Logo_SV.png";
import "./mainLayout.css";
import Header from "./Header";
import SideMenu from "./SideMenu/SideMenu";

const { Content, Sider } = Layout;

export default function MainLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: `${subKey}`,
          label: `option${subKey}`,
        };
      }),
    };
  });

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Header
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
          style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}
        >
          <img src={logoAjuntament} alt="Logo Ayuntament" style={{ height: "40px" }} />
          <img src={logoVIC} alt="Logo VIC" style={{ height: "40px" }} />
          <img src={logoSV} alt="Logo SV" style={{ height: "40px" }} />
        </div>
        <h1 style={{ margin: 0 }}>Seed Startup Program</h1>
        
        {/* Botón hamburguesa para móvil */}
        {isMobile && (
          <div
            style={{
              cursor: "pointer",
              padding: "8px",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.1)",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuOutlined style={{ fontSize: "20px", color: "white" }} />
          </div>
        )}
      </Header>

      <Layout>
        {/* Sider solo visible en escritorio */}
        {!isMobile && (
          <Sider
            width={200}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: "white", fontSize: "24px" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "white", fontSize: "24px" }} />
              )
            }
          >
            <SideMenu onItemClick={() => {}} />
          </Sider>
        )}

        <Layout style={{ padding: "0 24px 24px", background: "var(--main-gradient)" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: "20px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* Drawer para móvil */}
      {isMobile && (
        <Drawer
          title="Menú"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          width={280}
          bodyStyle={{ padding: 0 }}
        >
          <SideMenu onItemClick={() => setDrawerOpen(false)} />
        </Drawer>
      )}
    </Layout>
  );
}
