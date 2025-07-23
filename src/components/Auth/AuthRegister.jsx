import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, Typography, Spin, Alert } from 'antd';

const { Option } = Select;
const { Title, Text } = Typography;

const AuthRegister = () => {
  const [params] = useSearchParams();
  const roleFromUrl = params.get('role') || '';
  const emailFromUrl = params.get('email') || '';
  const [loading, setLoading] = useState(false);
  const [startups, setStartups] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      role: roleFromUrl,
      email: emailFromUrl,
    });
  }, [roleFromUrl, emailFromUrl, form]);

  useEffect(() => {
    if (roleFromUrl === 'startup') {
      const fetchStartups = async () => {
        setLoading(true);
        try {
          const res = await axios.get('/api/startups');
          setStartups(res.data || []);
          setErrorMessage('');
        } catch (error) {
          console.error('Error al cargar startups:', error);
          setErrorMessage('Error al cargar las startups disponibles. Por favor, inténtalo de nuevo.');
          setStartups([]);
        } finally {
          setLoading(false);
        }
      };
      fetchStartups();
    }
  }, [roleFromUrl]);

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage('');
    setMessage('');
    setRegistrationSuccess(false);

    try {
      let payload = {
        role: roleFromUrl,
        email: values.email,
        password: values.password,
        phone: values.phone,
        firstName: values.firstName,
        lastName: values.lastName,
        company: values.company,
        companyModel: roleFromUrl === 'startup' ? 'startup' : 'mentoring',
      };

      if (roleFromUrl === 'mentor') {
        payload = {
          ...payload,
          position: values.position,
          linkedin: values.linkedin,
        };
      }

      console.log('Payload a enviar:', payload);
      const res = await axios.post('/api/auth/register', payload);


      setMessage('¡Registro completado con éxito!');
      setRegistrationSuccess(true);
      form.resetFields(['password', 'phone', 'firstName', 'lastName', 'company', 'position', 'linkedin']);


    } catch (error) {
      console.error('Error durante el registro:', error);
      console.log('Respuesta de error del backend:', error.response?.data);
      const errorMsg = error.response?.data?.msg || error.message || 'Error desconocido al registrar.';
      setErrorMessage('Error al registrar: ' + errorMsg);
      setRegistrationSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '1.5rem',
        background: 'linear-gradient(90deg, #1f0d1e, #070d34)', // Aplicar el gradiente principal
        borderRadius: '8px', // Añadir un poco de redondeo
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Sombra para que resalte
      }}
    >
      <Title level={2} style={{ textAlign: 'center', color: 'white' }}> {/* Título en blanco */}
        Registro de <span style={{ textTransform: 'capitalize', color: '#1677ff' }}>{roleFromUrl}</span> {/* Usar --azul para el rol */}
      </Title>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label={<span style={{ color: 'white' }}>Email</span>} name="email">
          <Input
            readOnly
            disabled
            style={{
              color: '#b0b0b0', // Gris más claro para el texto del email (readOnly)
              background: 'rgba(255, 255, 255, 0.05)', // Fondo ligeramente más oscuro para diferenciarlo
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>Contraseña</span>}
          name="password"
          rules={[{ required: true, message: 'Por favor, introduce tu contraseña!' }]}
        >
          <Input.Password
            placeholder="Contraseña *"
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>Teléfono</span>}
          name="phone"
          rules={[{ required: true, message: 'Por favor, introduce tu teléfono!' }]}
        >
          <Input
            placeholder="Teléfono *"
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>Nombre</span>}
          name="firstName"
          rules={[{ required: true, message: 'Por favor, introduce tu nombre!' }]}
        >
          <Input
            placeholder="Nombre *"
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>Apellido</span>}
          name="lastName"
          rules={[{ required: true, message: 'Por favor, introduce tu apellido!' }]}
        >
          <Input
            placeholder="Apellido *"
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
          />
        </Form.Item>

        {roleFromUrl === 'startup' && (
          <Form.Item
            label={<span style={{ color: 'white' }}>Selecciona tu startup</span>}
            name="company"
            rules={[{ required: true, message: 'Por favor, selecciona tu startup!' }]}
          >
            <Select
              placeholder="Selecciona tu startup"
              loading={loading}
              disabled={loading || startups.length === 0}
              style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
              dropdownStyle={{ background: '#070d34', border: '1px solid #1f0d1e' }} // Estilo para el menú desplegable
            >
              {startups.map((startup) => (
                <Option key={startup._id} value={startup._id} style={{ color: 'white', background: '#070d34' }}> {/* Estilo para las opciones */}
                  {startup.company}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {roleFromUrl === 'mentor' && (
          <>
            <Form.Item
              label={<span style={{ color: 'white' }}>Empresa donde trabajas</span>}
              name="company"
              rules={[{ required: true, message: 'Por favor, indica tu empresa!' }]}
            >
              <Input
                placeholder="Empresa donde trabajas *"
                style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: 'white' }}>Tu puesto en la empresa</span>}
              name="position"
              rules={[{ required: true, message: 'Por favor, indica tu puesto!' }]}
            >
              <Input
                placeholder="Tu puesto en la empresa *"
                style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
              />
            </Form.Item>
            <Form.Item label={<span style={{ color: 'white' }}>URL de tu perfil de LinkedIn</span>} name="linkedin">
              <Input
                placeholder="URL de tu perfil de LinkedIn (opcional)"
                style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }} // Color blanco para el texto y placeholder
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              background: '#1677ff', // Usar --azul para el botón
              borderColor: '#1677ff',
              color: 'white',
              fontWeight: 'bold',
              height: '40px',
              fontSize: '16px',
            }}
          >
            {loading ? 'Enviando...' : 'Enviar registro'}
          </Button>
        </Form.Item>
      </Form>


      {message && (
        <Alert
          message={
            <span>
              {message}{' '}
              {registrationSuccess && (
                <Link to="/login" style={{ color: '#1677ff', fontWeight: 'bold' }}> {/* Usar --azul para el enlace */}
                  Haz clic aquí para iniciar sesión.
                </Link>
              )}
            </span>
          }
          type="success"
          showIcon
          style={{ marginTop: '1rem' }}
        />
      )}
      {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginTop: '1rem' }} />}
    </div>
  );
};

export default AuthRegister;