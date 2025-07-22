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
      <div className="networking-details">
        {activity.date && (
          <p><b>Fecha:</b> {new Date(activity.date).toLocaleDateString()}</p>
        )}
        {activity.schedule && (
          <p><b>Horario:</b> {activity.schedule}</p>
        )}
        {activity.location && (
          <p><b>Lugar:</b> {activity.location}</p>
        )}
        {activity.description && (
          <p><b>Descripción:</b> {activity.description}</p>
        )}
        {activity.attendance && activity.attendance !== '-' && (
          <p><b>Asistencia:</b> {activity.attendance}</p>
        )}
        {activity.format && (
          <p><b>Formato:</b> {activity.format}</p>
        )}
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