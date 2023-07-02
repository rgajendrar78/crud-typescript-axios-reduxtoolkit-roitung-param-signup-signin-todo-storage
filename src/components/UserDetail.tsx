import React from 'react';
import { useLocation } from 'react-router';

const UserDetail: React.FC = () => {
  const location = useLocation();
  console.log(location.state.row.id)

  const center={
    display:"flex",
    justifyContent:'center',
    alignItem:'center'
  }
  return (
    <div style={center}>
      <ul>
        <h1>User Detail</h1>
        <li>ID : {location.state.row.id}</li>
        <li>NAME : {location.state.row.name}</li>
        <li>USERNAME : {location.state.row.username}</li>
        <li>LOCATION : {location.state.row.email}</li>
      </ul>
    </div>
  );
};

export default UserDetail;
