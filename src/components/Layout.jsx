import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2 style={{ marginBottom: '3rem', fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    HOTEL GALAXY
                </h2>
                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <ShoppingCart size={20} />
                        <span>Billing</span>
                    </NavLink>
                    <NavLink
                        to="/inventory"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Package size={20} />
                        <span>Inventory</span>
                    </NavLink>
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Reports</span>
                    </NavLink>
                </nav>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
