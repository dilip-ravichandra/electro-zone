// ============================
// HOME PAGE INITIALIZATION
// ============================
const HomePage = {
    API_BASE_URL: 'http://localhost:5000/api',

    // Initialize page
    init() {
        console.log("HomePage initializing...");
        
        // Check authentication
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');

        console.log("Token present:", !!token);
        console.log("Username:", username);

        if (!token) {
            console.log("No token, redirecting to auth.html");
            window.location.href = "auth.html";
            return;
        }

        // Set username in navbar
        this.setUsername(username);
        
        // Load products
        this.loadProducts();
    },

    // Set username
    setUsername(username) {
        const element = document.getElementById('navUsername');
        if (element) {
            element.textContent = username || "User";
            console.log("Username updated:", username || "User");
        } else {
            console.warn("navUsername element not found");
        }
    },

    // Load products from API
    async loadProducts() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/products`);
            if (!response.ok) {
                console.warn("Could not fetch products from API");
                return;
            }
            const products = await response.json();
            this.displayProducts(products);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    },

    // Display products
    displayProducts(products) {
        const container = document.getElementById('productsContainer');
        if (!container) {
            console.warn("productsContainer not found");
            return;
        }

        if (!products || products.length === 0) {
            console.log("No products to display");
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ₹${product.price}</p>
                <button onclick="HomePage.addToCart('${product._id}')">Add to Cart</button>
            </div>
        `).join('');
    },

    // Add to cart
    addToCart(productId) {
        console.log("Added to cart:", productId);
        alert(`Added product to cart!`);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    HomePage.init();
});
