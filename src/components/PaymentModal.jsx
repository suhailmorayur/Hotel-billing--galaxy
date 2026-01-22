import React, { useState } from 'react';
import { X, QrCode, Banknote } from 'lucide-react';

const PaymentModal = ({ total, onClose, onConfirm }) => {
    const [method, setMethod] = useState('online'); // 'online' or 'offline'

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Select Payment Method</h3>
                    <button onClick={onClose}><X size={20} /></button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setMethod('online')}
                        style={{
                            flex: 1, padding: '1.5rem', borderRadius: 'var(--radius-md)', border: `2px solid ${method === 'online' ? 'var(--color-accent)' : '#e2e8f0'}`,
                            backgroundColor: method === 'online' ? '#eff6ff' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <QrCode size={32} color={method === 'online' ? 'var(--color-accent)' : '#94a3b8'} />
                        <span style={{ fontWeight: 600, color: method === 'online' ? 'var(--color-accent)' : '#64748b' }}>Online Payment</span>
                    </button>

                    <button
                        onClick={() => setMethod('offline')}
                        style={{
                            flex: 1, padding: '1.5rem', borderRadius: 'var(--radius-md)', border: `2px solid ${method === 'offline' ? 'var(--color-accent)' : '#e2e8f0'}`,
                            backgroundColor: method === 'offline' ? '#eff6ff' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Banknote size={32} color={method === 'offline' ? 'var(--color-accent)' : '#94a3b8'} />
                        <span style={{ fontWeight: 600, color: method === 'offline' ? 'var(--color-accent)' : '#64748b' }}>Cash / Offline</span>
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {method === 'online' ? (
                        <div style={{ animation: 'fadeIn 0.3s' }}>
                            <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>Scan QR to pay <strong>₹{total.toFixed(2)}</strong></p>
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=hotel@upi&pn=HotelName&am=${total}&cu=INR`}
                                alt="Payment QR"
                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', padding: '1rem' }}
                            />
                        </div>
                    ) : (
                        <div style={{ animation: 'fadeIn 0.3s', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Collect Cash</p>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-success)' }}>₹{total.toFixed(2)}</h2>
                            <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Please collect the exact amount.</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => onConfirm(method)}
                    style={{
                        width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-success)', color: 'white', fontWeight: 'bold', fontSize: '1.125rem',
                        boxShadow: 'var(--shadow-md)'
                    }}
                >
                    Confirm Payment & Print
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;
