import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AuthRegister = () => {
  const [params] = useSearchParams();
  const roleFromUrl = params.get('role') || '';
  const emailFromUrl = params.get('email') || '';
  const [loading, setLoading] = useState(false);
  const [startups, setStartups] = useState([]); // Estado para startups

  // Estado del formulario
  const [form, setForm] = useState({
    role: roleFromUrl,
    email: emailFromUrl,
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    // 'company' puede ser el ObjectId de una startup existente o el nombre de una nueva empresa (para mentor o nueva startup)
    company: '', 
    // Campos adicionales para la creación de una NUEVA startup (si aplica)
    description: '',
    sector: '',
    web: '',
    stage: '',
    roundsRaised: '',
    recognitions: '',
    contact: '',
    respondent: '',
    // Campos adicionales para la creación de un NUEVO mentor (si aplica)
    position: '',
    linkedin: '',
  });

  // Cargar startups solo si el rol de la URL es 'startup'
  useEffect(() => {
    if (roleFromUrl === 'startup') {
      const fetchStartups = async () => {
        try {
          const res = await axios.get('/api/startups');
          // 👉 CAMBIO CRÍTICO AQUÍ: Esperamos que res.data sea directamente el array de startups.
          // Si tu backend devuelve { startups: [...] }, deberías usar res.data.startups
          setStartups(res.data || []); 
        } catch (error) {
          console.error('Error al cargar startups:', error);
          alert('Error al cargar las startups disponibles. Por favor, inténtalo de nuevo.');
        }
      };
      fetchStartups();
    }
  }, [roleFromUrl]);

  // Manejador de cambios en los inputs del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones frontend básicas
    if (!form.password || !form.phone || !form.firstName || !form.lastName) {
      alert('Por favor, completa todos los campos obligatorios: Contraseña, Teléfono, Nombre y Apellido.');
      return;
    }

    // Validación específica para startups
    if (roleFromUrl === 'startup') {
      // Si el rol es 'startup', necesitamos la ID de la startup seleccionada
      if (!form.company) {
        alert('Por favor, selecciona tu startup de la lista.');
        return;
      }
      // Aquí, si fuera una NUEVA startup, necesitarías validar sus campos adicionales
      // Por ahora, asumimos que siempre se selecciona una existente si el rol es 'startup' desde la URL
    }

    // Validación específica para mentores
    if (roleFromUrl === 'mentor') {
      if (!form.company) { // 'company' para mentor es el nombre de la empresa
        alert('Por favor, indica tu empresa para el rol de mentor.');
        return;
      }
      if (!form.position) {
        alert('Por favor, indica tu puesto en la empresa para el rol de mentor.');
        return;
      }
    }

    try {
      setLoading(true);

      // Construcción del payload basado en el rol
      let payload = {
        role: form.role,
        email: form.email,
        password: form.password,
        phone: form.phone,
        firstName: form.firstName,
        lastName: form.lastName,
        company: form.company, // Aquí va el _id de la startup (si es existente) o el nombre de la empresa/nueva startup
        companyModel: roleFromUrl === 'startup' ? 'startup' : 'mentoring',
      };

      // Añadir campos específicos si el rol es 'mentor' y se está creando un nuevo mentor
      if (roleFromUrl === 'mentor') {
        payload = {
          ...payload,
          position: form.position,
          linkedin: form.linkedin,
          // Si tu modelo Mentor tiene un campo 'company' que es diferente al 'company' del User, ajústalo aquí
          // Por ejemplo, si el modelo Mentor tiene un 'nombreEmpresa' y el User usa 'company' para el _id
          // de ese modelo Mentor, tendrías que enviar 'nombreEmpresa' aquí y el controlador lo crearía.
        };
      } 
      // Si el rol es 'startup' y **estás permitiendo crear una NUEVA startup desde aquí**,
      // necesitarías añadir los campos de la startup al payload.
      // Sin embargo, tu `AuthRegister` actual parece ser solo para que un *miembro*
      // se una a una *startup existente*. Si también creara nuevas startups,
      // necesitarías formularios y validaciones adicionales aquí.
      // Actualmente, el `company` de la startup es el ID de la startup EXISTENTE seleccionada.
      // Si el controlador backend es quien decide si crear una nueva startup o usar una existente
      // basándose en si 'company' es un ObjectId, entonces este payload está bien para ambos casos.

      console.log('Payload a enviar:', payload);
      await axios.post('/api/auth/register', payload);

      alert('¡Registro completado con éxito! Ahora puedes iniciar sesión.');
      // Opcional: Limpiar formulario o redirigir al usuario
      // navigate('/login'); 
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Error al registrar: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
        Registro de{' '}
        <span style={{ textTransform: 'capitalize' }}>
          {roleFromUrl === 'mentor' ? 'Mentor' : roleFromUrl === 'startup' ? 'Startup' : 'Usuario'}
        </span>
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Campos comunes a todos los roles */}
        <input
          type="email"
          name="email"
          value={form.email}
          readOnly // El email viene de la URL y no debería ser editable
          disabled // Deshabilitado para evitar modificaciones
          style={{ backgroundColor: '#f0f0f0', border: '1px solid #ddd', padding: '0.8rem', borderRadius: '4px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña *"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono *"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Nombre *"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido *"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Campos específicos para rol 'startup' */}
        {roleFromUrl === 'startup' && (
          <>
            <label htmlFor="company" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Selecciona tu startup *
            </label>
            <select
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              style={inputStyle} // Reutiliza el estilo para inputs
            >
              <option value="">Selecciona tu startup</option>
              {startups.map((startup) => (
                // 👉 CAMBIO CRÍTICO AQUÍ: Usamos startup.company para el texto del desplegable
                <option key={startup._id} value={startup._id}>
                  {startup.company} 
                </option>
              ))}
            </select>
          </>
        )}

        {/* Campos específicos para rol 'mentor' */}
        {roleFromUrl === 'mentor' && (
          <>
            <input
              type="text"
              name="company"
              placeholder="Empresa donde trabajas *"
              onChange={handleChange}
              required
              value={form.company}
              style={inputStyle}
            />
            <input
              type="text"
              name="position"
              placeholder="Tu puesto en la empresa *"
              onChange={handleChange}
              required
              value={form.position}
              style={inputStyle}
            />
            <input
              type="text"
              name="linkedin"
              placeholder="URL de tu perfil de LinkedIn (opcional)"
              onChange={handleChange}
              value={form.linkedin}
              style={inputStyle}
            />
          </>
        )}

        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontSize: '1.1rem',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          {loading ? 'Enviando...' : 'Enviar registro'}
        </button>
      </form>
    </div>
  );
};

// Estilo base para los inputs para mantener consistencia
const inputStyle = {
  padding: '0.8rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box', // Asegura que el padding no aumente el ancho total
};

export default AuthRegister;