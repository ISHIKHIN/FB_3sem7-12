import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await apiClient.get('/users');
            setUsers(response.data);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleBlock = async (userId) => {
        if (window.confirm('Are you sure you want to block this user?')) {
            try {
                await apiClient.delete(`/users/${userId}`);
                loadUsers();
            } catch (err) {
                alert('Failed to block user');
            }
        }
    };

    const handleUpdateRole = async (userId, newRole) => {
        try {
            await apiClient.put(`/users/${userId}`, { role: newRole });
            loadUsers();
            setEditingUser(null);
        } catch (err) {
            alert('Failed to update user role');
        }
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'normal',
            marginBottom: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #eee',
            padding: '12px',
            backgroundColor: '#f9f9f9',
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: 'normal',
        },
        td: {
            border: '1px solid #eee',
            padding: '12px',
            fontSize: '14px',
        },
        button: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: '2px',
            marginRight: '8px',
        },
        editButton: {
            backgroundColor: '#666',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: '2px',
            marginRight: '8px',
        },
        select: {
            padding: '5px',
            fontSize: '12px',
            border: '1px solid #ccc',
            borderRadius: '2px',
        },
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
    if (error) return <div style={{ color: '#ff0000', textAlign: 'center' }}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Users Management</h2>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Username</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td style={styles.td}>{user.id}</td>
                        <td style={styles.td}>{user.username}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>{user.firstName} {user.lastName}</td>
                        <td style={styles.td}>
                            {editingUser === user.id ? (
                                <select
                                    defaultValue={user.role}
                                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                    <option value="admin">Admin</option>
                                </select>
                            ) : (
                                user.role
                            )}
                        </td>
                        <td style={styles.td}>
                            <span style={{ color: user.isActive ? '#00aa00' : '#ff0000' }}>
                                {user.isActive ? 'Active' : 'Blocked'}
                            </span>
                        </td>
                        <td style={styles.td}>
                            {user.role !== 'admin' && (
                                <>
                                    {editingUser === user.id ? (
                                        <button onClick={() => setEditingUser(null)} style={styles.button}>
                                            Cancel
                                        </button>
                                    ) : (
                                        <button onClick={() => setEditingUser(user.id)} style={styles.editButton}>
                                            Edit Role
                                        </button>
                                    )}
                                    {user.isActive && (
                                        <button onClick={() => handleBlock(user.id)} style={styles.button}>
                                            Block user
                                        </button>
                                    )}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;