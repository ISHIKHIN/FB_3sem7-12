import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../api/axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await apiClient.get('/products');
            setProducts(response.data);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await apiClient.delete(`/products/${id}`);
                loadProducts();
            } catch (err) {
                alert('Failed to delete product');
            }
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
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
        },
        card: {
            border: '1px solid #eee',
            padding: '20px',
            background: '#fff',
            borderRadius: '2px',
        },
        productTitle: {
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '10px',
        },
        category: {
            fontSize: '12px',
            color: '#666',
            marginBottom: '10px',
        },
        price: {
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '10px 0',
        },
        description: {
            fontSize: '13px',
            color: '#666',
            marginBottom: '15px',
        },
        button: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: '2px',
            marginRight: '8px',
        },
        viewButton: {
            backgroundColor: '#666',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: '2px',
            marginRight: '8px',
        },
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
    if (error) return <div style={{ color: '#ff0000', textAlign: 'center' }}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Плюшки</h2>
            <div style={styles.grid}>
                {products.map(product => (
                    <div key={product.id} style={styles.card}>
                        <div style={styles.productTitle}>{product.title}</div>
                        <div style={styles.category}>{product.category}</div>
                        <div style={styles.price}>{product.price} ₽</div>
                        <div style={styles.description}>
                            {product.description.substring(0, 80)}
                        </div>
                        <div>
                            <Link to={`/products/${product.id}`}>
                                <button style={styles.viewButton}>View</button>
                            </Link>
                            {(user?.role === 'seller' || user?.role === 'admin') && (
                                <Link to={`/products/${product.id}/edit`}>
                                    <button style={styles.button}>Edit</button>
                                </Link>
                            )}
                            {user?.role === 'admin' && (
                                <button onClick={() => handleDelete(product.id)} style={styles.button}>
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;