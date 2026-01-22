const STORAGE_KEYS = {
    ITEMS: 'hotel_billing_items',
    ORDERS: 'hotel_billing_orders'
};

export const StorageService = {
    // Items CRUD
    getItems: () => {
        const items = localStorage.getItem(STORAGE_KEYS.ITEMS);
        return items ? JSON.parse(items) : [];
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
