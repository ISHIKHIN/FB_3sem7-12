import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/axios';

function ProductForm({ isEdit = false }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit && id) {
            loadProduct();
        }
    }, [isEdit, id]);

    const loadProduct = async () => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            const product = response.data;
            setFormData({
                title: product.title,
                category: product.category,
                description: product.description,
                price: product.price,
            });
        } catch (err) {
            setError('Failed to load product');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await apiClient.put(`/products/${id}`, formData);
            } else {
                await apiClient.post('/products', formData);
            }
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '40px auto',
            padding: '30px',
            background: '#fff',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'normal',
            marginBottom: '20px',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '2px',
            fontSize: '14px',
            boxSizing: 'border-box',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '2px',
            fontSize: '14px',
            minHeight: '100px',
            boxSizing: 'border-box',
        },
        button: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '2px',
            marginTop: '10px',
        },
        error: {
            color: '#ff0000',
            fontSize: '14px',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{isEdit ? 'Edit Product' : 'Create Product'}</h2>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.textarea}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
                </button>
            </form>
        </div>
    );
}

export default ProductForm;