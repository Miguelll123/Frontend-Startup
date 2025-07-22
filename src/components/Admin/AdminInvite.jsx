import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown, Space, Input, Button, Form, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// Asegúrate de importar los estilos de Ant Design en tu archivo principal (ej. App.js o index.js):
// import 'antd/dist/reset.css'; // Para Ant Design v5

const { Text } = Typography;

const AdminInvite = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [form] = Form.useForm(); // Usamos Form de Ant Design para manejar el formulario

  // Define los ítems para el Dropdown de Ant Design
  const items = [
    {
      key: 'startup',
      label: 'Startup',
    },
    {
      key: 'mentor',
      label: 'Mentor',
    },
  ];

  // Función para manejar la selección del Dropdown
  const handleMenuClick = (e) => {
    setRole(e.key); // e.key contiene el 'key' del ítem seleccionado ('startup' o 'mentor')
    form.setFieldsValue({ role: e.key }); // Actualiza el valor en el formulario de Ant Design
  };

  const handleSubmit = async (values) => {
    // 'values' contendrá { role: '...', email: '...' } si usas Form.Item con name
    // Si sigues usando estados separados, usa 'role' y 'email' directamente
    try {
      const res = await axios.post('/api/invite', { role: values.role, email: values.email });
      setMessage(res.data.message);
      setRole(''); // Limpiar el rol después de enviar
      setEmail(''); // Limpiar el email después de enviar
      form.resetFields(); // Limpiar los campos del formulario de Ant Design
    } catch (error) {
      console.error('Error al enviar invitación:', error);
      setMessage('Error al enviar invitación. Por favor, inténtalo de nuevo.');
    }
  };

  // Función para obtener el texto del rol seleccionado para mostrar en el Dropdown
  const getRoleDisplayName = (currentRole) => {
    const selectedItem = items.find(item => item.key === currentRole);
    return selectedItem ? selectedItem.label : 'Selecciona un rol';
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1.5rem' }}>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>Dar de alta nuevo usuario</Typography.Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical" // Estilo vertical para etiquetas y campos
        initialValues={{ role: '', email: '' }}
      >
        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: 'Por favor, selecciona un rol!' }]}
        >
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
              selectedKeys: [role],
            }}
            trigger={['click']}
          >
            <Button>
              <Space>
                {getRoleDisplayName(role)}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor, introduce el email!' },
            { type: 'email', message: 'El email no es válido!' }
          ]}
        >
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar formulario
          </Button>
        </Form.Item>
      </Form>
      {message && <Text type="success" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>{message}</Text>}
    </div>
  );
};

export default AdminInvite;