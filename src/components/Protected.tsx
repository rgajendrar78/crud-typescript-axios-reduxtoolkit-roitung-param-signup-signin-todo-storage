import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  Component: React.ElementType;
}

const Protected: React.FC<ProtectedProps> = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let signin = localStorage.getItem('login');
    if (signin === 'false') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
