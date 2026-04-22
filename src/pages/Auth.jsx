import React from 'react';
import { Link } from 'react-router-dom';
import AuthComponent from '@/components/Auth/Auth'; 
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm/RegisterForm';
import styles from './Auth.module.scss'; // Додай сюди центрирування

const Auth = ({ mode }) => {
  return (
    <div className={styles.authPage}>
      {/* Головний контейнер (скелет) */}
      <AuthComponent>
        
        {mode === 'choice' && (
          <div style={{ textAlign: 'center', padding: '20px', background: '#333', color: 'white' }}>
            <h2>Welcome to Wikipédia</h2>
            <div className="d-flex gap-3 justify-content-center mt-4">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Register</Link>
            </div>
          </div>
        )}

        {mode === 'login' && <LoginForm />}
        {mode === 'register' && <RegisterForm />}

      </AuthComponent>
    </div>
  );
};

export default Auth;