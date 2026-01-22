import React, { forwardRef } from 'react';
import { format } from 'date-fns';

const Invoice = forwardRef(({ cart, total, orderId, date, paymentMethod }, ref) => {
    return (
        <div ref={ref} className="invoice-print" style={{ padding: '2rem', maxWidth: '80mm', margin: '0 auto', fontFamily: 'monospace' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>HOTEL GALAXY</h2>
                <p>Fathima Building, Arimbra Road, Morayur</p>
                <p>Ph: 8921938399</p>
            </div>

            <div style={{ borderBottom: '1px dashed black', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <p>Date: {date ? format(new Date(date), 'dd/MM/yyyy HH:mm') : format(new Date(), 'dd/MM/yyyy HH:mm')}</p>
                <p>Order #: {orderId || 'New'}</p>
                <p>Payment: {paymentMethod}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid black' }}>
                        <th style={{ textAlign: 'left', padding: '0.25rem 0' }}>Item</th>
                        <th style={{ textAlign: 'right', padding: '0.25rem 0' }}>Qty</th>
                        <th style={{ textAlign: 'right', padding: '0.25rem 0' }}>Amt</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '0.25rem 0' }}>{item.name}</td>
                            <td style={{ textAlign: 'right', padding: '0.25rem 0' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'right', padding: '0.25rem 0' }}>{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ borderTop: '1px dashed black', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>TOTAL</span>
                <span>₹{total.toFixed(2)}</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>Thank you for visiting!</p>
                <p>Please come again.</p>
            </div>
        </div>
    );
});

export default Invoice;
