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
                // Breakfast Items
                { id: '1', name: 'Porotta', price: 12, category: 'Breakfast', image: '/porotta1.jpg' },
                { id: '43', name: 'Poori', price: 12, category: 'Breakfast', image: '/poori.jpg' },
                { id: '2', name: 'Chapathi', price: 12, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80' },
                { id: '3', name: 'Dosha', price: 12, category: 'Breakfast', image: '/dosha.jpg' },
                { id: '27', name: 'Idli', price: 12, category: 'Breakfast', image: '/Idli.jpg' },
                { id: '4', name: 'Vellayappam', price: 10, category: 'Breakfast', image: '/vellayappam.jpg' },
                { id: '5', name: 'Nool Puttu', price: 10, category: 'Breakfast', image: '/nool puttu.jpg' },
                { id: '6', name: 'Puttu', price: 12, category: 'Breakfast', image: '/puttu.jpg' },

                // Lunch Items
                { id: '12', name: 'Beef Biriyani (Full)', price: 130, category: 'Lunch', image: '/beef-biryani.jpg' },
                { id: '13', name: 'Beef Biriyani (Half)', price: 90, category: 'Lunch', image: '/beef-biryani.jpg' },
                { id: '14', name: 'Chicken Biriyani (Full)', price: 110, category: 'Lunch', image: '/chicken Biryani.jpg' },
                { id: '15', name: 'Chicken Biriyani (Half)', price: 90, category: 'Lunch', image: '/chicken Biryani.jpg' },
                { id: '16', name: 'Meals', price: 60, category: 'Lunch', image: '/meals.jpg' },
                { id: '48', name: 'Meals with Fish Fry', price: 100, category: 'Lunch', image: '/fish fry.jpg' },
                { id: '34', name: 'Rice (Full)', price: 60, category: 'Lunch', image: '/biriyani rice.jpg' },
                { id: '35', name: 'Rice (Half)', price: 50, category: 'Lunch', image: '/biriyani rice.jpg' },

                // Curry
                { id: '7', name: 'Chicken Kadai', price: 80, category: 'Curry', image: '/chiken kaday.jpg' },
                { id: '44', name: 'Green Peas', price: 30, category: 'Curry', image: '/greenpeas.jpg' },
                { id: '45', name: 'Cherupayar Curry', price: 30, category: 'Curry', image: '/cherupayar curry.jpg' },
                { id: '46', name: 'Kadala Curry', price: 30, category: 'Curry', image: '/kadala curry.jpg' },
                { id: '47', name: 'Baaji Curry', price: 30, category: 'Curry', image: '/baaji curry.jpg' },
                { id: '29', name: 'Egg Curry', price: 30, category: 'Curry', image: '/egg curry.jpg' },
                { id: '8', name: 'Fish Curry', price: 50, category: 'Curry', image: '/Fish-Curry-.jpg' },
                { id: '9', name: 'Fish Fry', price: 40, category: 'Curry', image: '/fish fry.jpg' },
                { id: '10', name: 'Beef Fry (Full)', price: 120, category: 'Curry', image: '/beef fry.jpg' },
                { id: '11', name: 'Beef Fry (Half)', price: 80, category: 'Curry', image: '/beef fry.jpg' },

                // Snacks
                { id: '17', name: 'Pazhampori', price: 12, category: 'Snacks', image: '/pazhampori.jpg' },
                { id: '30', name: 'Cutlet', price: 12, category: 'Snacks', image: '/cutlet.jpg' },
                { id: '31', name: 'Vada', price: 10, category: 'Snacks', image: '/vada.jpg' },
                { id: '18', name: 'Samoosa', price: 12, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },
                { id: '19', name: 'Ullivada', price: 12, category: 'Snacks', image: '/ullivada.jpg' },
                { id: '49', name: 'Vettu Cake', price: 12, category: 'Snacks', image: '/vett cake.jpg' },
                { id: '50', name: 'Paal Cake', price: 12, category: 'Snacks', image: '/paal cake.jpg' },
                { id: '51', name: 'Sugiyan', price: 12, category: 'Snacks', image: '/sugiyan.jpg' },
                { id: '52', name: 'Neyyappam', price: 12, category: 'Snacks', image: '/neyyappam.jpg' },
                { id: '53', name: 'Ela Ada', price: 12, category: 'Snacks', image: '/ela Ada.jpg' },
                { id: '54', name: 'Masala Bonda', price: 12, category: 'Snacks', image: '/masala bonda.jpg' },
                { id: '55', name: 'Mutta Bajji', price: 12, category: 'Snacks', image: '/mutta bajji.jpg' },
                { id: '56', name: 'Boiled Egg', price: 10, category: 'Snacks', image: '/boiled egg.jpg' },

                { id: '57', name: 'Mittayi', price: 5, category: 'Snacks', image: '/mittayi.jpg' },
                { id: '58', name: 'Mittayi (Small)', price: 1, category: 'Snacks', image: '/mittayi2.jpg' },
                { id: '59', name: 'Elanchi', price: 12, category: 'Snacks', image: '/elanchi.jpg' },
                { id: '60', name: 'Kalathappam', price: 12, category: 'Snacks', image: '/kalathappam.jpg' },
                { id: '61', name: 'Kayappam', price: 12, category: 'Snacks', image: '/kayappam.jpg' },

                // Tea
                { id: '32', name: 'Lime Tea', price: 15, category: 'Tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80' },
                { id: '33', name: 'Black Tea', price: 10, category: 'Tea', image: '/black tea.jpg' },
                { id: '20', name: 'Tea', price: 12, category: 'Tea', image: '/tea.jpg' },
                { id: '21', name: 'Coffee', price: 15, category: 'Tea', image: '/bru cofee.jpg' },
                { id: '22', name: 'Bru Coffee', price: 20, category: 'Tea', image: '/bru cofee.jpg' },
                { id: '23', name: 'Horlicks', price: 20, category: 'Tea', image: '/horlicks.jpg' },
                { id: '24', name: 'Boost', price: 20, category: 'Tea', image: '/Boost.jpg' },

                // Cool Drinks
                { id: '36', name: 'Soda', price: 10, category: 'Cool Drinks', image: '/soda.jpg' },
                { id: '37', name: 'Pepsi (Small)', price: 20, category: 'Cool Drinks', image: '/pepsi.jpg' },
                { id: '38', name: '7up (Small)', price: 20, category: 'Cool Drinks', image: '/7up.jpg' },
                { id: '39', name: 'Pepsi (Medium)', price: 40, category: 'Cool Drinks', image: '/pepsi.jpg' },
                { id: '40', name: '7up (Medium)', price: 40, category: 'Cool Drinks', image: '/7up.jpg' },
                { id: '41', name: 'Pepsi (Large)', price: 50, category: 'Cool Drinks', image: '/pepsi.jpg' },
                { id: '42', name: '7up (Large)', price: 50, category: 'Cool Drinks', image: '/7up.jpg' },
                { id: '62', name: 'Mineral Water (Small)', price: 10, category: 'Cool Drinks', image: '/minaral water.jpg' },
                { id: '63', name: 'Mineral Water (Medium)', price: 20, category: 'Cool Drinks', image: '/minaral water.jpg' },
                { id: '64', name: 'Mineral Water (Large)', price: 30, category: 'Cool Drinks', image: '/minaral water.jpg' },
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
