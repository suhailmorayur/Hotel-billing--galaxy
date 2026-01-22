import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { StorageService } from '../services/storage';
import ItemForm from '../components/ItemForm';

const InventoryPage = () => {
    const [items, setItems] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        setItems(StorageService.getItems());
    };

    const handleSave = (item) => {
        StorageService.saveItem(item);
        loadItems();
        setIsFormOpen(false);
        setEditingItem(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            StorageService.deleteItem(id);
            loadItems();
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Inventory Management</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Manage your hotel menu and products</p>
                </div>
                <button
                    onClick={handleAddNew}
                    style={{
                        backgroundColor: 'var(--color-accent)', color: 'white', padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem',
                        boxShadow: 'var(--shadow-md)', transition: 'background-color 0.2s', fontWeight: 600
                    }}
                >
                    <Plus size={20} /> Add New Item
                </button>
            </div>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    />
                </div>
            </div>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)' }}>
                    <p>No items found. Add your first item to get started.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {filteredItems.map(item => (
                        <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '180px', backgroundColor: '#f1f5f9', position: 'relative' }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#cbd5e1' }}>No Image</div>
                                )}
                                <span style={{
                                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                                    backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: '#475569'
                                }}>
                                    {item.category || 'Uncategorized'}
                                </span>
                            </div>

                            <div style={{ padding: '1rem', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{item.name}</h3>
                                    <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>₹{item.price.toFixed(2)}</span>
                                </div>
                            </div>

                            <div style={{ padding: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                <button
                                    onClick={() => handleEdit(item)}
                                    style={{ padding: '0.5rem', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-md)', ':hover': { backgroundColor: '#f1f5f9' } }}
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{ padding: '0.5rem', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', ':hover': { backgroundColor: '#fee2e2' } }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <ItemForm
                    item={editingItem}
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

export default InventoryPage;
