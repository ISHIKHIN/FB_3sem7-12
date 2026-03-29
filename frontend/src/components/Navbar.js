import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const styles = {
        nav: {
            backgroundColor: '#333',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
            marginRight: '1rem',
        },
        button: {
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px',
        },
        userInfo: {
            color: 'white',
            marginRight: '1rem',
        },
    };

    return (
        <nav style={styles.nav}>
            <div>
                <Link to="/products" style={styles.link}>Products</Link>
                {user?.role === 'admin' && (
                    <Link to="/users" style={styles.link}>Users</Link>
                )}
                {(user?.role === 'seller' || user?.role === 'admin') && (
                    <Link to="/products/create" style={styles.link}>Create Product</Link>
                )}
            </div>
            <div>
                {user ? (
                    <>
            <span style={styles.userInfo}>
              {user.username} ({user.role})
            </span>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;