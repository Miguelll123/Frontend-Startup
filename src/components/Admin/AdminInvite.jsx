import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown, Space, Input, Button, Form, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AdminInvite = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [form] = Form.useForm(); 

  
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

  
  const handleMenuClick = (e) => {
    setRole(e.key); 
    form.setFieldsValue({ role: e.key }); 
  };

  const handleSubmit = async (values) => {
    
    try {
      const res = await axios.post('/api/invite', { role: values.role, email: values.email });
      setMessage(res.data.message);
      setRole(''); 
      setEmail(''); 
      form.resetFields(); 
    } catch (error) {
      console.error('Error al enviar invitación:', error);
      setMessage('Error al enviar invitación. Por favor, inténtalo de nuevo.');
    }
  };

 
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
        layout="vertical" 
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