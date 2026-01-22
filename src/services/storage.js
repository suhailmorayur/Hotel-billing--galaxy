const STORAGE_KEYS = {
    ITEMS: 'hotel_billing_items',
    ORDERS: 'hotel_billing_orders'
};

export const StorageService = {
    // Items CRUD
    getItems: () => {
        const items = localStorage.getItem(STORAGE_KEYS.ITEMS);
        if (!items) {
            const defaultItems = [
                // Meals - Breads
                { id: '1', name: 'Porotta', price: 12, category: 'Meals', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=400&q=80' },
                { id: '2', name: 'Chapathi', price: 12, category: 'Meals', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80' },
                { id: '3', name: 'Dosha', price: 12, category: 'Meals', image: 'https://images.unsplash.com/photo-1668236543090-d2f896b86e7c?auto=format&fit=crop&w=400&q=80' },
                { id: '25', name: 'Masala Dosa', price: 50, category: 'Meals', image: 'https://images.unsplash.com/photo-1589301760014-d9296c97d6fb?auto=format&fit=crop&w=400&q=80' },
                { id: '26', name: 'Ghee Roast', price: 45, category: 'Meals', image: 'https://images.unsplash.com/photo-1668236543090-d2f896b86e7c?auto=format&fit=crop&w=400&q=80' },
                { id: '27', name: 'Idli', price: 10, category: 'Meals', image: 'https://images.unsplash.com/photo-1589948197771-33758379468f?auto=format&fit=crop&w=400&q=80' },
                { id: '4', name: 'Vellayappam', price: 10, category: 'Meals', image: 'https://images.unsplash.com/photo-1626505705325-154df660bf2e?auto=format&fit=crop&w=400&q=80' },
                { id: '5', name: 'Nool Puttu', price: 10, category: 'Meals', image: 'https://images.unsplash.com/photo-1626505705325-154df660bf2e?auto=format&fit=crop&w=400&q=80' },
                { id: '6', name: 'Puttu', price: 12, category: 'Meals', image: 'https://images.unsplash.com/photo-1626505705325-154df660bf2e?auto=format&fit=crop&w=400&q=80' },

                // Meals - Rice/Biriyani
                { id: '12', name: 'Beef Biriyani (Full)', price: 120, category: 'Meals', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80' },
                { id: '13', name: 'Beef Biriyani (Half)', price: 80, category: 'Meals', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80' },
                { id: '14', name: 'Chicken Biriyani (Full)', price: 100, category: 'Meals', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80' },
                { id: '15', name: 'Chicken Biriyani (Half)', price: 80, category: 'Meals', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80' },
                { id: '16', name: 'Meals', price: 50, category: 'Meals', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=400&q=80' },

                // Curry
                { id: '7', name: 'Chicken Kaday', price: 70, category: 'Curry', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80' },
                { id: '28', name: 'Beef Roast', price: 120, category: 'Curry', image: 'https://images.unsplash.com/photo-1533089862017-ec32840b2a48?auto=format&fit=crop&w=400&q=80' },
                { id: '29', name: 'Egg Curry', price: 40, category: 'Curry', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80' },
                { id: '8', name: 'Fish Curry', price: 50, category: 'Curry', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80' },
                { id: '9', name: 'Fish Fry', price: 35, category: 'Curry', image: 'https://images.unsplash.com/photo-1599307767316-65655183063f?auto=format&fit=crop&w=400&q=80' },
                { id: '10', name: 'Beef Fry (Full)', price: 110, category: 'Curry', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80' },
                { id: '11', name: 'Beef Fry (Half)', price: 70, category: 'Curry', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80' },

                // Snacks
                { id: '17', name: 'Pazhampori', price: 12, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },
                { id: '30', name: 'Cutlet', price: 15, category: 'Snacks', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80' },
                { id: '31', name: 'Vada', price: 10, category: 'Snacks', image: 'https://images.unsplash.com/photo-1563861826100-9cb078cf69f8?auto=format&fit=crop&w=400&q=80' },
                { id: '18', name: 'Samoosa', price: 12, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },
                { id: '19', name: 'Ullivada', price: 12, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },

                // Tea
                { id: '32', name: 'Lime Tea', price: 15, category: 'Tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80' },
                { id: '20', name: 'Tea', price: 12, category: 'Tea', image: 'https://images.unsplash.com/photo-1544787210-282bbd471012?auto=format&fit=crop&w=400&q=80' },
                { id: '21', name: 'Coffee', price: 15, category: 'Tea', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80' },
                { id: '22', name: 'Bru Coffee', price: 20, category: 'Tea', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80' },
                { id: '23', name: 'Horlicks', price: 20, category: 'Tea', image: 'https://images.unsplash.com/photo-1595981267035-23c3489fe0a2?auto=format&fit=crop&w=400&q=80' },
                { id: '24', name: 'Boost', price: 20, category: 'Tea', image: 'https://images.unsplash.com/photo-1595981267035-23c3489fe0a2?auto=format&fit=crop&w=400&q=80' },
            ];
            localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(defaultItems));
            return defaultItems;
        }
        return JSON.parse(items);
    },

    saveItem: (item) => {
        const items = StorageService.getItems();
        const existingIndex = items.findIndex(i => i.id === item.id);

        if (existingIndex >= 0) {
            items[existingIndex] = item;
        } else {
            items.push(item);
        }

        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
        return item;
    },

    deleteItem: (id) => {
        const items = StorageService.getItems();
        const filtered = items.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(filtered));
    },

    // Orders CRUD
    getOrders: () => {
        const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return orders ? JSON.parse(orders) : [];
    },

    saveOrder: (order) => {
        const orders = StorageService.getOrders();
        // Add new order to the beginning
        orders.unshift({ ...order, id: Date.now().toString(), timestamp: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        return order;
    }
};
