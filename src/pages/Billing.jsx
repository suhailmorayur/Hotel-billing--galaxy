import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { StorageService } from '../services/storage';
import PaymentModal from '../components/PaymentModal';
import Invoice from '../components/Invoice';

const BillingPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState(null); // For printing immediately after

    const invoiceRef = useRef();

    useEffect(() => {
        setItems(StorageService.getItems());
    }, []);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePaymentConfirm = (method) => {
        const order = {
            items: cart,
            total: cartTotal,
            paymentMethod: method,
        };
        const savedOrder = StorageService.saveOrder(order);
        setLastOrder(savedOrder);
        setIsPaymentModalOpen(false);

        // Trigger print
        setTimeout(() => {
            window.print();
            // Clear cart after print dialog closes (or ideally, we just clear it now)
            setCart([]);
        }, 100);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="billing-container">
            {/* Left Column: Product Grid */}
            <div className="billing-products">
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '1rem 1rem 1rem 3rem',
                            borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0',
                            boxShadow: 'var(--shadow-sm)', fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem'
                }}>
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            className="card"
                            onClick={() => addToCart(item)}
                            style={{
                                padding: 0, overflow: 'hidden', cursor: 'pointer',
                                transition: 'transform 0.1s', ':active': { transform: 'scale(0.98)' }
                            }}
                        >
                            <div style={{ height: '120px', backgroundColor: '#f1f5f9' }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#cbd5e1' }}>No Image</div>
                                )}
                            </div>
                            <div style={{ padding: '0.75rem' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem' }}>
                                    <span>{item.category}</span>
                                    <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>₹{item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Cart */}
            <div className="card billing-cart-container">
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                        <ShoppingCart size={24} /> Current Order
                    </h2>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#94a3b8' }}>
                            <p>Cart is empty</p>
                            <p style={{ fontSize: '0.875rem' }}>Select items to start billing</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>₹{item.price} each</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-md)' }}>
                                            <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.25rem 0.5rem', opacity: item.quantity === 1 ? 0.5 : 1 }}><Minus size={14} /></button>
                                            <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.25rem 0.5rem' }}><Plus size={14} /></button>
                                        </div>
                                        <div style={{ width: '4rem', textAlign: 'right', fontWeight: 700 }}>
                                            ₹{(item.price * item.quantity).toFixed(0)}
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                        disabled={cart.length === 0}
                        onClick={() => setIsPaymentModalOpen(true)}
                        style={{
                            width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)',
                            backgroundColor: cart.length === 0 ? '#cbd5e1' : 'var(--color-accent)',
                            color: 'white', fontWeight: 'bold', fontSize: '1.125rem',
                            cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Pay Now
                    </button>
                </div>
            </div>

            {isPaymentModalOpen && (
                <PaymentModal
                    total={cartTotal}
                    onClose={() => setIsPaymentModalOpen(false)}
                    onConfirm={handlePaymentConfirm}
                />
            )}

            {/* Hidden Invoice for Printing */}
            <div className="print-only">
                <Invoice
                    ref={invoiceRef}
                    cart={lastOrder ? lastOrder.items : []}
                    total={lastOrder ? lastOrder.total : 0}
                    orderId={lastOrder ? lastOrder.id : ''}
                    date={lastOrder ? lastOrder.timestamp : ''}
                    paymentMethod={lastOrder ? lastOrder.paymentMethod : ''}
                />
            </div>
        </div>
    );
};

export default BillingPage;
