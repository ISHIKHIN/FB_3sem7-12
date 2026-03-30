import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            setError('Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '40px auto',
            padding: '30px',
            background: '#fff',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
        title: {
            fontSize: '28px',
            fontWeight: 'normal',
            marginBottom: '20px',
        },
        category: {
            fontSize: '14px',
            color: '#666',
            marginBottom: '10px',
        },
        price: {
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '20px 0',
        },
        description: {
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '30px',
        },
        button: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '2px',
        },
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
    if (error) return <div style={{ color: '#ff0000', textAlign: 'center' }}>{error}</div>;
    if (!product) return <div style={{ textAlign: 'center' }}>Product not found</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{product.title}</h1>
            <div style={styles.category}>Category: {product.category}</div>
            <div style={styles.price}>{product.price} ₽</div>
            <div style={styles.description}>
                <strong>Description:</strong>
                <p>{product.description}</p>
            </div>
            <Link to="/products">
                <button style={styles.button}>Back to Products</button>
            </Link>
        </div>
    );
}

export default ProductDetail;