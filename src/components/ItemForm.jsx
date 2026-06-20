import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

const ItemForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({
                id: Date.now().toString(),
                name: '',
                price: '',
                category: '',
                image: ''
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, price: parseFloat(formData.price) });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>{item ? 'Edit Item' : 'Add New Item'}</h3>
                    <button onClick={onCancel}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Item Name</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Price (₹)</label>
                        <input
                            required
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}
                        >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Curry">Curry</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Tea">Tea</option>
                            <option value="Cool Drinks">Cool Drinks</option>

                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Image</label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: 'var(--radius-md)',
                                backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden', border: '1px dashed #cbd5e1'
                            }}>
                                {formData.image ?
                                    <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> :
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>No Img</div>
                                }
                            </div>
                            <label style={{
                                cursor: 'pointer', padding: '0.5rem 1rem', border: '1px solid #e2e8f0',
                                borderRadius: 'var(--radius-md)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <Upload size={16} /> Upload
                                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                            </label>
                        </div>
                        <input
                            type="text"
                            name="image"
                            placeholder="Or paste URL..."
                            value={formData.image}
                            onChange={handleChange}
                            style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="type"
                            onClick={onCancel}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', fontWeight: 500 }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent)', color: 'white', fontWeight: 500 }}
                        >
                            Save Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemForm;
