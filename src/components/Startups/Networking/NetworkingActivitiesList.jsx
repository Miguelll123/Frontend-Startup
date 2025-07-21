import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Spin, Alert } from 'antd';
import { fetchActivities } from '../../../features/activity/activitySlice';
import './NetworkingActivitiesList.css';

console.log('NetworkingActivitiesList.jsx loaded');

const NetworkingActivitiesList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, isError, message } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (isLoading) return <Spin tip="Cargando actividades..." />;
  if (isError) return <Alert type="error" message={message || 'Error al cargar actividades'} />;

  const items = list.map((activity) => ({
    key: activity._id,
    label: activity.title,
    children: (
      <div className='networking-details'>
        <p><b>Fecha:</b> {activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</p>
        <p><b>Horario:</b> {activity.schedule || '-'}</p>
        <p><b>Lugar:</b> {activity.location || '-'}</p>
        <p><b>Descripción:</b> {activity.description || '-'}</p>
        <p><b>Asistencia:</b> {activity.attendance || '-'}</p>
        <p><b>Formato:</b> {activity.format || '-'}</p>
      </div>
    ),
  }));

  return (
    <div className="networking-container">
      <h2 className="networking-title">Actividades de Networking</h2>
      <Collapse accordion items={items} />
    </div>
  );
};

export default NetworkingActivitiesList; 