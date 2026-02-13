// Global variables
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
});

// Load products (defined inline to avoid fetch issues on Vercel)
async function loadProducts() {
    try {
        products = [
            { id: 1, name: "100 Followers", price: 2.99, originalPrice: 3.99, rating: 4.5, reviews: 10, image: "statics/100.jpg" },
            { id: 2, name: "500 Followers", price: 9.99, originalPrice: 12.99, rating: 4.8, reviews: 15, image: "statics/500.jpg" },
            { id: 3, name: "1000 Followers", price: 18.99, originalPrice: 22.99, rating: 4.7, reviews: 20, image: "statics/1000.jpg" },
            { id: 4, name: "Free 50 Followers", price: 0, originalPrice: 0, rating: 4.0, reviews: 5, image: "statics/free50.jpg", condition: "Share a link on Twitter" },
            { id: 5, name: "Free 100 Followers", price: 0, originalPrice: 0, rating: 4.2, reviews: 8, image: "statics/free100.jpg", condition: "Post link on Facebook" },
            { id: 6, name: "2000 Followers", price: 34.99, originalPrice: 40.99, rating: 4.9, reviews: 30, image: "statics/2000.jpg" },
            { id: 7, name: "5000 Followers", price: 79.99, originalPrice: 89.99, rating: 5.0, reviews: 50, image: "statics/5000.jpg" },
            { id: 8, name: "Free 200 Followers", price: 0, originalPrice: 0, rating: 4.3, reviews: 12, image: "statics/free200.jpg", condition: "Share a tweet with link" },
            { id: 9, name: "Instagram Likes 100", price: 1.99, originalPrice: 2.99, rating: 4.4, reviews: 7, image: "statics/like100.jpg" },
            { id: 10, name: "Instagram Likes 500", price: 8.99, originalPrice: 10.99, rating: 4.6, reviews: 14, image: "statics/like500.jpg" },
            { id: 11, name: "Free 150 Likes", price: 0, originalPrice: 0, rating: 4.1, reviews: 9, image: "statics/free150.jpg", condition: "Share a post on Twitter or Facebook" },
            { id: 12, name: "10000 Followers", price: 149.99, originalPrice: 170.99, rating: 5.0, reviews: 70, image: "statics/10000.jpg" }
        ];
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products in the grid
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => goToProduct(product.id);

    const discount = product.price > 0 ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const stars = generateStars(product.rating);
    const conditionText = product.price === 0 && product.condition ? `<p class="condition">${product.condition}</p>` : "";

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${product.price === 0 ? "Free" : product.price + "TL"}</span>
                ${discount > 0 ? `<span class="original-price">${product.originalPrice}TL</span>` : ""}
            </div>
            <div class="product-rating">
                <div class="stars">${stars}</div>
                <span class="rating-text">${product.rating} (${product.reviews} Reviews)</span>
            </div>
            ${conditionText}
            <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> ${product.price === 0 ? "Claim Now" : "Add to Cart"}
            </button>
        </div>
    `;
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars += '<i class="far fa-star"></i>';
    return stars;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(product.price === 0 ? "Free product claimed!" : "Product added to cart!");
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Navigate to product page
function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: #10b981; color: white;
        padding: 1rem 1.5rem; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001; transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Cart icon click handler
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                showNotification('Your cart is empty!');
            }
        });
    }
});
