import React from 'react';
import { Printer, Download, X } from 'lucide-react';

const PostPaymentOptions = ({ onClose, onPrint, onSave, orderTotal }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '400px', maxWidth: '90%', textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#dcfce7',
                        color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Order Completed!</h3>
                    <p style={{ color: '#64748b' }}>Total Paid: <strong>₹{orderTotal.toFixed(2)}</strong></p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={onPrint}
                        style={{
                            padding: '1rem', borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            border: 'none', cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        <Printer size={20} /> Print Invoice
                    </button>

                    <button
                        onClick={onSave}
                        style={{
                            padding: '1rem', borderRadius: 'var(--radius-md)',
                            backgroundColor: 'white', color: 'var(--color-primary)',
                            border: '2px solid var(--color-primary)',
                            fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        <Download size={20} /> Save as Image
                    </button>

                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem', borderRadius: 'var(--radius-md)',
                            backgroundColor: 'transparent',
                            color: '#64748b', fontWeight: '600',
                            border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        <X size={20} /> Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostPaymentOptions;
