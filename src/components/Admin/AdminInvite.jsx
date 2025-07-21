import React, { useState } from 'react';
import axios from 'axios';

const AdminInvite = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/invite', { role, email });
      setMessage(res.data.message);
      setRole('');
      setEmail('');
    } catch (error) {
      setMessage('Error al enviar invitación');
    }
  };

  return (
    <div>
      <h2>Dar de alta nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Rol:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Selecciona un rol</option>
          <option value="startup">Startup</option>
          <option value="mentor">Mentor</option>
        </select>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Enviar formulario</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminInvite;