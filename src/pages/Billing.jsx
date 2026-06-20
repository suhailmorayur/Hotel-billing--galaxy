import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { StorageService } from '../services/storage';
import PaymentModal from '../components/PaymentModal';
import PostPaymentOptions from '../components/PostPaymentOptions';
import Invoice from '../components/Invoice';
import html2canvas from 'html2canvas';

const BillingPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const invoiceRef = useRef();

    useEffect(() => {
        setItems(StorageService.getItems());
    }, []);

    const categories = ['All', 'Tea', 'Breakfast', 'Lunch', 'Curry', 'Snacks', 'Cool Drinks'];

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
            timestamp: new Date().toISOString(),
            id: Date.now().toString().slice(-6)
        };
        const savedOrder = StorageService.saveOrder(order);
        setLastOrder(savedOrder);
        setIsPaymentModalOpen(false);
        setIsSuccessModalOpen(true);
        setCart([]);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSaveImage = async () => {
        if (invoiceRef.current) {
            try {
                const element = invoiceRef.current;
                const parent = element.parentElement; // This is .print-only

                // Store original styles
                const originalDisplay = parent.style.display;
                const originalPosition = parent.style.position;
                const originalTop = parent.style.top;
                const originalLeft = parent.style.left;
                const originalZIndex = parent.style.zIndex;

                // Temporarily reveal it off-screen
                parent.style.display = 'block';
                parent.style.position = 'fixed';
                parent.style.top = '0'; // Must be in viewport for some canvas engines
                parent.style.left = '0';
                parent.style.zIndex = '-9999'; // Behind everything
                parent.style.backgroundColor = 'white';

                // Allow a brief moment for render
                await new Promise(resolve => setTimeout(resolve, 100));

                const canvas = await html2canvas(element, {
                    scale: 2,
                    backgroundColor: '#ffffff'
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `invoice-${lastOrder?.id || 'bill'}.png`;
                link.click();

                // Restore styles
                parent.style.display = originalDisplay;
                parent.style.position = originalPosition;
                parent.style.top = originalTop;
                parent.style.left = originalLeft;
                parent.style.zIndex = originalZIndex;

            } catch (error) {
                console.error("Error saving image:", error);
                alert("Failed to save image. Please use Print -> Save as PDF instead.");
            }
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: selectedCategory === cat ? 'var(--color-accent)' : 'white',
                                color: selectedCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                border: `1px solid ${selectedCategory === cat ? 'var(--color-accent)' : '#e2e8f0'}`,
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                transition: 'all 0.2s',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                    gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem', paddingBottom: '2rem',
                    flex: 1, minHeight: 0
                }}>
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            className="card"
                            onClick={() => addToCart(item)}
                            style={{
                                padding: 0, overflow: 'hidden', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column',
                                transition: 'all 0.2s', ':active': { transform: 'scale(0.98)' },
                                border: '1px solid #e2e8f0',
                                height: '100%',
                                minHeight: '220px', // Force explicit height
                                backgroundColor: 'white'
                            }}
                        >
                            <div style={{ height: '120px', backgroundColor: '#f1f5f9', flexShrink: 0, position: 'relative' }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#cbd5e1' }}>No Image</div>
                                )}
                            </div>
                            <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{
                                    fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem',
                                    lineHeight: '1.2',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    minHeight: '2.4em'
                                }}>
                                    {item.name}
                                </h4>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', backgroundColor: '#f8fafc', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {item.category}
                                    </span>
                                    <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '1.1rem' }}>
                                        ₹{item.price}
                                    </span>
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

            {isSuccessModalOpen && lastOrder && (
                <PostPaymentOptions
                    onClose={() => setIsSuccessModalOpen(false)}
                    onPrint={handlePrint}
                    onSave={handleSaveImage}
                    orderTotal={lastOrder.total}
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
