import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { startOfDay, startOfWeek, startOfMonth, isAfter, format } from 'date-fns';
import { IndianRupee, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const ReportsPage = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('daily'); // daily, weekly, monthly

    useEffect(() => {
        setOrders(StorageService.getOrders());
    }, []);

    const getFilteredOrders = () => {
        const now = new Date();
        let startDate;

        switch (filter) {
            case 'daily':
                startDate = startOfDay(now);
                break;
            case 'weekly':
                startDate = startOfWeek(now);
                break;
            case 'monthly':
                startDate = startOfMonth(now);
                break;
            default:
                startDate = startOfDay(now);
        }

        return orders.filter(order => isAfter(new Date(order.timestamp), startDate));
    };

    const filteredOrders = getFilteredOrders();
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Sales Reports</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Track your business performance</p>
                </div>
                <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-card)', padding: '0.25rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    {['daily', 'weekly', 'monthly'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: filter === f ? 'var(--color-accent)' : 'transparent',
                                color: filter === f ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 600,
                                textTransform: 'capitalize'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#64748b' }}>Total Sales</span>
                        <div style={{ padding: '0.5rem', backgroundColor: '#ecfdf5', color: '#10b981', borderRadius: '50%' }}><IndianRupee size={20} /></div>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{totalSales.toFixed(2)}</h3>
                    <span style={{ fontSize: '0.875rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <TrendingUp size={14} /> +0% from last period
                    </span>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#64748b' }}>Total Orders</span>
                        <div style={{ padding: '0.5rem', backgroundColor: '#eff6ff', color: '#3b82f6', borderRadius: '50%' }}><ArrowUpRight size={20} /></div>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalOrders}</h3>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#64748b' }}>Average Order</span>
                        <div style={{ padding: '0.5rem', backgroundColor: '#fff7ed', color: '#f97316', borderRadius: '50%' }}><Calendar size={20} /></div>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{averageOrderValue.toFixed(2)}</h3>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Recent Transactions</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: 600 }}>Order ID</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: 600 }}>Date & Time</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: 600 }}>Items</th>
                                <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: 600 }}>Method</th>
                                <th style={{ textAlign: 'right', padding: '1rem', color: '#64748b', fontWeight: 600 }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No transactions found for this period</td>
                                </tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>#{order.id.slice(-6)}</td>
                                        <td style={{ padding: '1rem' }}>{format(new Date(order.timestamp), 'dd MMM yyyy HH:mm')}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600,
                                                backgroundColor: order.paymentMethod === 'online' ? '#eff6ff' : '#f0fdf4',
                                                color: order.paymentMethod === 'online' ? '#2563eb' : '#16a34a'
                                            }}>
                                                {order.paymentMethod.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>₹{order.total.toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
