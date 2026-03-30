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
            backgroundColor: '#fff',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
        },
        link: {
            color: '#000',
            textDecoration: 'none',
            marginRight: '20px',
            fontSize: '14px',
        },
        button: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            borderRadius: '2px',
        },
        userInfo: {
            fontSize: '12px',
            color: '#666',
            marginRight: '15px',
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