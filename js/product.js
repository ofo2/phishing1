// مصفوفة المنتجات الموسعة
const products = [
    {
        id: 1,
        name: "100 Followers",
        price: 2.99,
        description: "احصل على 100 متابع جديد سريعًا.",
        image: "statics/100-followers.jpg"
    },
    {
        id: 2,
        name: "500 Followers",
        price: 9.99,
        description: "زيادة كبيرة: 500 متابع جديد في حسابك.",
        image: "statics/500-followers.jpg"
    },
    {
        id: 3,
        name: "1000 Followers",
        price: 17.99,
        description: "أكبر باقة: 1000 متابع حقيقي لحسابك.",
        image: "statics/1000-followers.jpg"
    },
    {
        id: 4,
        name: "2000 Followers",
        price: 29.99,
        description: "باقة ضخمة: 2000 متابع بسرعة وسهولة.",
        image: "statics/2000-followers.jpg"
    },
    {
        id: 5,
        name: "3000 Followers",
        price: 39.99,
        description: "باقة مميزة: 3000 متابع لحسابك.",
        image: "statics/3000-followers.jpg"
    },
    {
        id: 6,
        name: "5000 Followers",
        price: 59.99,
        description: "باقة ضخمة: 5000 متابع حقيقي.",
        image: "statics/5000-followers.jpg"
    },
    {
        id: 7,
        name: "10000 Followers",
        price: 99.99,
        description: "باقة أسطورية: 10000 متابع في حسابك.",
        image: "statics/10000-followers.jpg"
    },
    {
        id: 8,
        name: "Free 50 Followers",
        price: 0,
        description: "مجاني: احصل على 50 متابع بشرط نشر رابط على تويتر أو فيسبوك.",
        image: "statics/free-50.jpg",
        condition: "Share the link on Twitter or Facebook"
    },
    {
        id: 9,
        name: "Free 100 Followers",
        price: 0,
        description: "مجاني: احصل على 100 متابع بشرط مشاركة منشور على تويتر أو فيسبوك.",
        image: "statics/free-100.jpg",
        condition: "Post our link on your social media"
    },
    {
        id: 10,
        name: "Free 200 Followers",
        price: 0,
        description: "مجاني: 200 متابع بعد نشر رابط الحملة على تويتر أو فيسبوك.",
        image: "statics/free-200.jpg",
        condition: "Share a post and provide the link"
    },
    {
        id: 11,
        name: "Free 500 Followers",
        price: 0,
        description: "مجاني: 500 متابع بشروط بسيطة، مثل نشر رابط الحملة.",
        image: "statics/free-500.jpg",
        condition: "Post our link on social media and submit URL"
    }
];

// عرض المنتجات
function displayProducts() {
    const container = document.getElementById('product-details');
    container.innerHTML = "";

    products.forEach(product => {
        const conditionText = product.price === 0 ? `<p class="condition">Condition: ${product.condition}</p>` : "";
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                ${conditionText}
                <span class="price">${product.price === 0 ? "Free" : "$" + product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    ${product.price === 0 ? "Claim Now" : "Add to Cart"}
                </button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

// عربة التسوق
let cart = [];
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (product.price === 0) {
            alert(`You claimed "${product.name}". ${product.condition}`);
        } else {
            cart.push(product);
            alert(`${product.name} added to cart!`);
            document.querySelector('.cart-count').innerText = cart.length;
        }
    }
}

// تشغيل عند تحميل الصفحة
window.onload = displayProducts;
