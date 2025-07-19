import React, { useState } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import logoAjuntament from "../../assets/Logo_ajuntamentValencia.png";
import logoVIC from "../../assets/Logo_VIC.png";
import logoSV from "../../assets/Logo_SV.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./mainLayout.css";

const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

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

export default function MainLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

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
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={logoAjuntament}
            alt="Logo Ayuntament de valencia"
            style={{ height: "40px", maxWidth: "100%", flexShrink: 1 }}
          />
          <img
            src={logoVIC}
            alt="Logo Valencia Innovation Capital"
            style={{ height: "40px", maxWidth: "100%", flexShrink: 1 }}
          />
          <img
            src={logoSV}
            alt="Logo Startup Valencia"
            style={{ height: "40px", maxWidth: "100%", flexShrink: 1 }}
          />
        </div>
        <div>
          <h1 style={{ margin: 0 }}>Seed Startup Program</h1>
        </div>
      </Header>

      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          trigger={
            collapsed ? (
              <MenuUnfoldOutlined
                style={{
                  color: "white",
                  fontSize: "24px",
                }}
              />
            ) : (
              <MenuFoldOutlined
                style={{
                  color: "white",
                  fontSize: "24px",
                }}
              />
            )
          }
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>

        <Layout
          style={{
            padding: "0 24px 24px",
            background: "var(--main-gradient)",
          }}
        >
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
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
