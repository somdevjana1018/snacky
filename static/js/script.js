/* ==========================================================================
   SNACKY - E-COMMERCE & SNACKS MANAGEMENT SYSTEM
   Central JavaScript Engine: script.js
   Screenshot-Exact Perfection: 60 Product Dataset, Global Cart State, Filters,
                                 Timers, OTP Auto-Advance, Payment Gateway & Modals
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Helper Utilities: Multi-Package & Single Package SVG Data URL Generators
// --------------------------------------------------------------------------
function createSingleSnackSvg(title, bgHex, accentHex, emoji) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
    <rect width="280" height="280" rx="30" fill="${bgHex}"/>
    <circle cx="140" cy="140" r="95" fill="${accentHex}" opacity="0.25"/>
    <circle cx="140" cy="140" r="70" fill="${accentHex}" opacity="0.4"/>
    <text x="140" y="130" font-size="64" text-anchor="middle" dominant-baseline="central">${emoji}</text>
    <text x="140" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="800" fill="#0b1528" text-anchor="middle">${title}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function createMultiPackSvg(title, packColor1, packColor2, emoji1, emoji2) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
    <!-- Back Pack -->
    <rect x="50" y="30" width="120" height="180" rx="16" fill="${packColor1}" transform="rotate(-10 110 120)"/>
    <text x="100" y="110" font-size="44" text-anchor="middle">${emoji1}</text>
    <!-- Front Pack -->
    <rect x="110" y="60" width="130" height="190" rx="16" fill="${packColor2}" transform="rotate(6 175 155)"/>
    <text x="175" y="145" font-size="52" text-anchor="middle">${emoji2}</text>
    <rect x="125" y="195" width="100" height="35" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="175" y="218" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#0b1528" text-anchor="middle">LET'S TRY</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function createCategoryBlobSvg(emoji1, emoji2, packColor1, packColor2) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120" viewBox="0 0 180 120">
    <rect x="25" y="15" width="65" height="90" rx="10" fill="${packColor1}" transform="rotate(-12 57 60)"/>
    <text x="52" y="55" font-size="30" text-anchor="middle">${emoji1}</text>
    <rect x="80" y="20" width="75" height="95" rx="10" fill="${packColor2}" transform="rotate(8 117 67)"/>
    <text x="115" y="65" font-size="34" text-anchor="middle">${emoji2}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// --------------------------------------------------------------------------
// 2. Comprehensive Products Dataset (60 Products)
// --------------------------------------------------------------------------
const SNACKY_PRODUCTS = [
  // --- NAMKEENS (20 Items) ---
  { id: 101, title: "Paachratan Mixture", category: "namkeen", price: 80, mrp: 100, discount: 20, weight: "120 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 102, title: "Millet Mixture", category: "namkeen", price: 95, mrp: 120, discount: 21, weight: "150 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "High Fiber"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 103, title: "Poha Mixture", category: "namkeen", price: 75, mrp: 90, discount: 17, weight: "140 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/snack_namkeen.jpg" },
  { id: 104, title: "Millet Chakli", category: "namkeen", price: 64, mrp: 80, discount: 20, weight: "100 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/snack_chakli.jpg" },
  { id: 105, title: "Teekha Gathiya", category: "namkeen", price: 70, mrp: 90, discount: 22, weight: "160 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_namkeen.jpg" },
  { id: 106, title: "Aloo Bhujia Delight", category: "namkeen", price: 85, mrp: 110, discount: 23, weight: "200 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/aloo_bhujia.jpg" },
  { id: 107, title: "Bikaner Bhujia Classic", category: "namkeen", price: 90, mrp: 115, discount: 22, weight: "200 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/aloo_bhujia.jpg" },
  { id: 108, title: "Spicy Corn Mixture", category: "namkeen", price: 65, mrp: 85, discount: 24, weight: "130 g", frameClass: "frame-sage", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_namkeen.jpg" },
  { id: 109, title: "Khatta Meetha Mix", category: "namkeen", price: 80, mrp: 100, discount: 20, weight: "180 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 110, title: "Chana Dal Crunch", category: "namkeen", price: 60, mrp: 75, discount: 20, weight: "150 g", frameClass: "frame-sage", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_namkeen.jpg" },
  { id: 111, title: "Crispy Sev Murmura", category: "namkeen", price: 55, mrp: 70, discount: 21, weight: "120 g", frameClass: "frame-sage", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/aloo_bhujia.jpg" },
  { id: 112, title: "Navratan Royal Mix", category: "namkeen", price: 110, mrp: 140, discount: 21, weight: "220 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 113, title: "Masala Peanuts Classic", category: "namkeen", price: 70, mrp: 90, discount: 22, weight: "150 g", frameClass: "frame-sage", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_namkeen.jpg" },
  { id: 114, title: "South Indian Murukku", category: "namkeen", price: 75, mrp: 95, discount: 21, weight: "140 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_chakli.jpg" },
  { id: 115, title: "Salted Moong Dal", category: "namkeen", price: 65, mrp: 80, discount: 19, weight: "160 g", frameClass: "frame-sage", inStock: false, tags: ["High Fiber"], image: "../static/images/snack_namkeen.jpg" },
  { id: 116, title: "Cashew Namkeen Mix", category: "namkeen", price: 160, mrp: 200, discount: 20, weight: "150 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 117, title: "Soya Sticks Masala", category: "namkeen", price: 70, mrp: 90, discount: 22, weight: "130 g", frameClass: "frame-sage", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_namkeen.jpg" },
  { id: 118, title: "Tasty Nut Chatpata", category: "namkeen", price: 85, mrp: 110, discount: 23, weight: "170 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_namkeen.jpg" },
  { id: 119, title: "Lachha Potato Spicy", category: "namkeen", price: 90, mrp: 115, discount: 22, weight: "140 g", frameClass: "frame-sage", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/aloo_bhujia.jpg" },
  { id: 120, title: "Mini Kachori Snack", category: "namkeen", price: 100, mrp: 130, discount: 23, weight: "200 g", frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_namkeen.jpg" },

  // --- CHIPS (20 Items) ---
  { id: 201, title: "Soya Katori Wafers", category: "chips", price: 60, mrp: 75, discount: 20, weight: "85 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 202, title: "Ragi Masala Chips", category: "chips", price: 70, mrp: 90, discount: 22, weight: "90 g", frameClass: "frame-blue", inStock: true, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 203, title: "Desi Masala Potato Chips", category: "chips", price: 40, mrp: 50, discount: 20, weight: "60 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 204, title: "Wheels Crunchies", category: "chips", price: 45, mrp: 60, discount: 25, weight: "75 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 205, title: "Classic Salted Wafers", category: "chips", price: 50, mrp: 65, discount: 23, weight: "80 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 206, title: "Cream & Onion Chips", category: "chips", price: 55, mrp: 70, discount: 21, weight: "75 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 207, title: "Tangy Tomato Crisps", category: "chips", price: 50, mrp: 65, discount: 23, weight: "75 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 208, title: "Banana Chips Salted", category: "chips", price: 80, mrp: 100, discount: 20, weight: "120 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil", "Fasting Special / Vrat"], image: "../static/images/banana_chips.jpg" },
  { id: 209, title: "Peri Peri Potato Wafers", category: "chips", price: 60, mrp: 75, discount: 20, weight: "70 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 210, title: "Jackfruit Chips Special", category: "chips", price: 95, mrp: 120, discount: 21, weight: "100 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/banana_chips.jpg" },
  { id: 211, title: "Sweet Potato Crisps", category: "chips", price: 75, mrp: 95, discount: 21, weight: "85 g", frameClass: "frame-blue", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_chips.jpg" },
  { id: 212, title: "Beetroot Veggie Chips", category: "chips", price: 90, mrp: 110, discount: 18, weight: "70 g", frameClass: "frame-blue", inStock: false, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 213, title: "Taro Root Chips Salted", category: "chips", price: 85, mrp: 105, discount: 19, weight: "80 g", frameClass: "frame-blue", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/snack_chips.jpg" },
  { id: 214, title: "Puffcorn Masala Crunch", category: "chips", price: 40, mrp: 50, discount: 20, weight: "50 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_makhana.jpg" },
  { id: 215, title: "Tortilla Corn Chips", category: "chips", price: 70, mrp: 90, discount: 22, weight: "100 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 216, title: "Pudina Potato Chips", category: "chips", price: 50, mrp: 65, discount: 23, weight: "75 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 217, title: "Jalapeno Nacho Chips", category: "chips", price: 75, mrp: 95, discount: 21, weight: "90 g", frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 218, title: "Tapioca Chips Spicy", category: "chips", price: 65, mrp: 80, discount: 19, weight: "110 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 219, title: "Black Pepper Wafers", category: "chips", price: 60, mrp: 75, discount: 20, weight: "80 g", frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 220, title: "Multi-Grain Chips", category: "chips", price: 80, mrp: 100, discount: 20, weight: "95 g", frameClass: "frame-blue", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_chips.jpg" },

  // --- HEALTHY SNACKS (20 Items) ---
  { id: 301, title: "Makhana Twisters", category: "healthy", price: 120, mrp: 150, discount: 20, weight: "60 g", frameClass: "frame-orange", inStock: true, tags: ["No Palm Oil", "High Fiber", "Fasting Special / Vrat"], image: "../static/images/snack_makhana.jpg" },
  { id: 302, title: "Lime & Chilli Makhana", category: "healthy", price: 130, mrp: 160, discount: 19, weight: "65 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/snack_makhana.jpg" },
  { id: 303, title: "Roasted Cashews Masala", category: "healthy", price: 240, mrp: 300, discount: 20, weight: "100 g", frameClass: "frame-orange", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 304, title: "Roasted Almonds Salted", category: "healthy", price: 220, mrp: 280, discount: 21, weight: "100 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 305, title: "Quinoa Puffs Herb", category: "healthy", price: 95, mrp: 120, discount: 21, weight: "50 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/snack_makhana.jpg" },
  { id: 306, title: "Oat & Seed Cookies", category: "healthy", price: 110, mrp: 140, discount: 21, weight: "150 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_makhana.jpg" },
  { id: 307, title: "Flax Seed Crackers", category: "healthy", price: 85, mrp: 110, discount: 23, weight: "90 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_makhana.jpg" },
  { id: 308, title: "Jowar Puff Chatpata", category: "healthy", price: 75, mrp: 95, discount: 21, weight: "60 g", frameClass: "frame-orange", inStock: true, tags: ["No Palm Oil", "High Fiber"], image: "../static/images/snack_makhana.jpg" },
  { id: 309, title: "Roasted Chana Masala", category: "healthy", price: 65, mrp: 80, discount: 19, weight: "150 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_namkeen.jpg" },
  { id: 310, title: "Trail Mix Seeds & Nuts", category: "healthy", price: 180, mrp: 225, discount: 20, weight: "120 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 311, title: "Amaranth Puffs Sweet", category: "healthy", price: 80, mrp: 100, discount: 20, weight: "70 g", frameClass: "frame-orange", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/snack_makhana.jpg" },
  { id: 312, title: "Pudina Roasted Makhana", category: "healthy", price: 135, mrp: 170, discount: 21, weight: "65 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber", "Fasting Special / Vrat"], image: "../static/images/snack_makhana.jpg" },
  { id: 313, title: "Soya Nut Crunch", category: "healthy", price: 70, mrp: 90, discount: 22, weight: "100 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_namkeen.jpg" },
  { id: 314, title: "Chia Seed Munchies", category: "healthy", price: 90, mrp: 115, discount: 22, weight: "80 g", frameClass: "frame-orange", inStock: false, tags: ["High Fiber"], image: "../static/images/snack_makhana.jpg" },
  { id: 315, title: "Pumpkin Seeds Salted", category: "healthy", price: 160, mrp: 200, discount: 20, weight: "100 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 316, title: "Sunflower Seeds Roasted", category: "healthy", price: 140, mrp: 175, discount: 20, weight: "100 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 317, title: "Baked Beetroot Munch", category: "healthy", price: 85, mrp: 105, discount: 19, weight: "60 g", frameClass: "frame-orange", inStock: true, tags: ["No Palm Oil"], image: "../static/images/snack_chips.jpg" },
  { id: 318, title: "Multi-Seed Energy Bar", category: "healthy", price: 50, mrp: 65, discount: 23, weight: "40 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_makhana.jpg" },
  { id: 319, title: "Dry Fruit Laddu", category: "healthy", price: 190, mrp: 240, discount: 21, weight: "150 g", frameClass: "frame-orange", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/paachratan_mixture.jpg" },
  { id: 320, title: "Baked Mathri Whole Wheat", category: "healthy", price: 90, mrp: 110, discount: 18, weight: "140 g", frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/snack_chakli.jpg" }
];

// --------------------------------------------------------------------------
// 3. Global Cart & State Engine
// --------------------------------------------------------------------------
let snackyCart = JSON.parse(localStorage.getItem('snacky_cart')) || [];
let snackyAddress = JSON.parse(localStorage.getItem('snacky_address')) || null;
let snackyUser = JSON.parse(localStorage.getItem('snacky_user')) || { name: "", email: "", phone: "", dob: "" };

function saveCartState() {
  localStorage.setItem('snacky_cart', JSON.stringify(snackyCart));
  updateCartBadge();
  renderOffcanvasCart();
  if (typeof renderCheckoutItems === 'function') {
    renderCheckoutItems();
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const totalCount = snackyCart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => b.textContent = totalCount);
}

function addToCart(productId, weight, qty = 1) {
  const prod = SNACKY_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const selectedWeight = weight || prod.weight;
  const existingIndex = snackyCart.findIndex(item => item.id === productId && item.weight === selectedWeight);

  if (existingIndex > -1) {
    snackyCart[existingIndex].qty += qty;
  } else {
    snackyCart.push({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      mrp: prod.mrp,
      weight: selectedWeight,
      image: prod.image,
      qty: qty
    });
  }

  saveCartState();
  showToast(`Added ${prod.title} (${selectedWeight}) to cart!`);
}

function updateCartQuantity(index, delta) {
  if (!snackyCart[index]) return;
  snackyCart[index].qty += delta;
  if (snackyCart[index].qty <= 0) {
    snackyCart.splice(index, 1);
  }
  saveCartState();
}

function removeFromCart(index) {
  if (!snackyCart[index]) return;
  snackyCart.splice(index, 1);
  saveCartState();
}

function getCartSubtotal() {
  return snackyCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function renderOffcanvasCart() {
  const cartContainer = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const totalEl = document.getElementById('cart-total-val');
  const meterText = document.getElementById('free-shipping-text');
  const meterProgress = document.getElementById('free-shipping-progress');

  if (!cartContainer) return;

  if (snackyCart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center py-5">
        <div class="display-1 mb-3">🍿</div>
        <h5 class="fw-bold">Your cart is empty</h5>
        <p class="text-muted small">Looks like you haven't added any snacks yet.</p>
        <a href="products.html" class="btn btn-snacky-primary mt-2">Explore Snacks</a>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = "₹0.00";
    if (totalEl) totalEl.textContent = "₹0.00";
    if (meterText) meterText.textContent = "Add ₹199 more for free delivery";
    if (meterProgress) meterProgress.style.width = "0%";
    return;
  }

  let html = '';
  snackyCart.forEach((item, index) => {
    html += `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <h6 class="fw-bold text-navy mb-1" style="font-size: 0.95rem;">${item.title}</h6>
            <button class="btn btn-link text-danger p-0 border-0" onclick="removeFromCart(${index})" style="font-size: 0.8rem;">✕</button>
          </div>
          <div class="text-muted small mb-2">Weight: ${item.weight}</div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="quantity-control-box" style="padding: 2px;">
              <button class="qty-btn" style="width: 24px; height: 24px;" onclick="updateCartQuantity(${index}, -1)">-</button>
              <span class="qty-val" style="padding: 0 10px; font-size: 0.85rem;">${item.qty}</span>
              <button class="qty-btn" style="width: 24px; height: 24px;" onclick="updateCartQuantity(${index}, 1)">+</button>
            </div>
            <div class="fw-bold text-navy">₹${(item.price * item.qty).toFixed(2)}</div>
          </div>
        </div>
      </div>`;
  });
  cartContainer.innerHTML = html;

  const subtotal = getCartSubtotal();
  const deliveryFee = subtotal >= 199 || subtotal === 0 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;

  if (meterText && meterProgress) {
    if (subtotal >= 199) {
      meterText.textContent = "🎉 You have unlocked FREE Delivery!";
      meterProgress.style.width = "100%";
      meterProgress.className = "progress-bar bg-success";
    } else {
      const remaining = 199 - subtotal;
      meterText.textContent = `Add ₹${remaining.toFixed(2)} more for FREE delivery`;
      const pct = Math.min(100, (subtotal / 199) * 100);
      meterProgress.style.width = `${pct}%`;
      meterProgress.className = "progress-bar bg-warning";
    }
  }
}

function showToast(message) {
  let container = document.querySelector('.toast-container-custom');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  toast.innerHTML = `<i class="bi bi-check-circle-fill text-warning fs-5"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => { toast.remove(); }, 3000);
}

// --------------------------------------------------------------------------
// 4. Page Initializers
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Nav Search
  const navSearch = document.getElementById('nav-search-input');
  if (navSearch) {
    navSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && navSearch.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(navSearch.value.trim())}`;
      }
    });
  }

  if (document.getElementById('products-grid-container')) initProductsPage();
  if (document.getElementById('product-detail-section')) initProductDetailPage();
  if (document.getElementById('flash-sale-timer-box')) initOffersPage();
  if (document.getElementById('contact-form')) initContactPage();
  if (document.getElementById('search-results-grid')) initSearchPage();
  if (document.getElementById('auth-card-wrapper')) initAuthPage();
  if (document.getElementById('profile-details-card')) initProfilePage();
  if (document.getElementById('payment-gateway-wrapper')) initPaymentFlowPage();
  if (document.getElementById('track-order-wrapper')) initTrackOrderPage();
});

// Products Page
let currentCategoryFilter = 'all';
let visibleProductsCount = 12;

function initProductsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) currentCategoryFilter = catParam.toLowerCase();

  const tabBtns = document.querySelectorAll('.category-tab-btn');
  tabBtns.forEach(btn => {
    if (btn.dataset.category === currentCategoryFilter) {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryFilter = btn.dataset.category;
      visibleProductsCount = 12;
      renderProductsGrid();
    });
  });

  const loadMoreBtn = document.getElementById('load-more-products-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleProductsCount += 8;
      renderProductsGrid();
    });
  }

  renderProductsGrid();
}

function getCartItemQty(productId) {
  const item = snackyCart.find(i => i.id === productId);
  return item ? item.qty : 0;
}

function updateCartItemQty(productId, delta) {
  const item = snackyCart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      const idx = snackyCart.findIndex(i => i.id === productId);
      if (idx > -1) snackyCart.splice(idx, 1);
    }
  } else if (delta > 0) {
    addToCart(productId);
    return;
  }
  saveCartState();
  const valElem = document.getElementById(`card-qty-val-${productId}`);
  if (valElem) {
    valElem.textContent = getCartItemQty(productId) || 1;
  }
}

function renderProductsGrid() {
  const container = document.getElementById('products-grid-container');
  const countHeader = document.getElementById('products-count-header');
  const categoryHeader = document.getElementById('products-category-header');
  const loadMoreBtn = document.getElementById('load-more-products-btn');
  if (!container) return;

  let filtered = SNACKY_PRODUCTS;
  if (currentCategoryFilter !== 'all') {
    filtered = SNACKY_PRODUCTS.filter(p => p.category === currentCategoryFilter);
  }

  if (countHeader) countHeader.textContent = `${filtered.length} products available`;
  if (categoryHeader) {
    const titleMap = { all: 'All Products', namkeen: 'Namkeens', chips: 'Chips & Wafers', healthy: 'Healthy Snacks' };
    categoryHeader.textContent = titleMap[currentCategoryFilter] || 'Products';
  }

  const displayed = filtered.slice(0, visibleProductsCount);

  if (loadMoreBtn) {
    loadMoreBtn.style.display = visibleProductsCount >= filtered.length ? 'none' : 'inline-block';
  }

  let html = '';
  displayed.forEach(p => {
    const currentQty = getCartItemQty(p.id);
    html += `
      <div class="col">
        <div class="product-card">
          <div class="card-top-frame">
            <div class="snack-particles-overlay">
              <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 70 L25 45 L30 52" stroke="#F5A623" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M45 60 L40 30 L50 38" stroke="#FBBF24" stroke-width="4" stroke-linecap="round"/>
                <path d="M70 50 L75 15 L80 28" stroke="#F5A623" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M95 55 L90 20 L100 32" stroke="#FCD34D" stroke-width="4" stroke-linecap="round"/>
                <path d="M120 65 L125 40 L130 48" stroke="#F5A623" stroke-width="3.5" stroke-linecap="round"/>
                <circle cx="35" cy="35" r="3.5" fill="#F5A623"/>
                <circle cx="65" cy="20" r="4" fill="#FCD34D"/>
                <circle cx="85" cy="12" r="3.5" fill="#FBBF24"/>
                <circle cx="110" cy="25" r="4" fill="#F5A623"/>
                <circle cx="135" cy="30" r="3" fill="#FCD34D"/>
              </svg>
            </div>
            <a href="product-detail.html?id=${p.id}">
              <img src="${p.image}" alt="${p.title}" class="product-card-img">
            </a>
          </div>
          <div class="product-card-body">
            <a href="product-detail.html?id=${p.id}" class="text-decoration-none">
              <h6 class="product-title">${p.title}</h6>
            </a>
            <div class="price-row-box">
              <span class="price-selling">₹${p.price.toFixed(2)}</span>
              <span class="price-mrp">₹${p.mrp.toFixed(2)}</span>
            </div>
            <span class="price-discount-pill">${p.discount}% OFF</span>
            <div class="weight-selector-box">
              <span class="weight-label-subtext">WEIGHT</span>
              <span class="weight-badge-pill">${p.weight}</span>
            </div>
            ${p.inStock ? 
              `<div class="card-qty-action-bar">
                 <button class="card-qty-btn" onclick="updateCartItemQty(${p.id}, -1)">-</button>
                 <span class="card-qty-val" id="card-qty-val-${p.id}">${currentQty || 1}</span>
                 <button class="card-qty-btn" onclick="updateCartItemQty(${p.id}, 1)">+</button>
               </div>` : 
              `<button class="btn-card-disabled" disabled>OUT OF STOCK</button>`}
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

// Product Detail Page
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const prodId = parseInt(urlParams.get('id')) || 104;
  const prod = SNACKY_PRODUCTS.find(p => p.id === prodId) || SNACKY_PRODUCTS[3];

  let selectedWeightMultiplier = 1;
  let selectedWeightText = prod.weight;
  let quantityVal = 1;

  document.getElementById('detail-title').textContent = prod.title;
  document.getElementById('detail-main-image').src = prod.image;
  document.getElementById('breadcrumb-category').textContent = prod.category.toUpperCase();
  document.getElementById('breadcrumb-title').textContent = prod.title;

  function updatePriceDisplay() {
    const currentPrice = prod.price * selectedWeightMultiplier;
    const currentMrp = prod.mrp * selectedWeightMultiplier;
    document.getElementById('detail-price-selling').textContent = `₹ ${(currentPrice * quantityVal).toFixed(2)}`;
    document.getElementById('detail-price-mrp').textContent = `₹ ${(currentMrp * quantityVal).toFixed(2)}`;
    document.getElementById('detail-discount-tag').textContent = `${prod.discount}% OFF`;
    document.getElementById('detail-unit-val').textContent = selectedWeightText;
  }

  const weightPills = document.querySelectorAll('.weight-pill-btn');
  weightPills.forEach(pill => {
    pill.addEventListener('click', () => {
      weightPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedWeightMultiplier = parseFloat(pill.dataset.mult) || 1;
      selectedWeightText = pill.dataset.weight;
      updatePriceDisplay();
    });
  });

  const minusBtn = document.getElementById('qty-minus');
  const plusBtn = document.getElementById('qty-plus');
  const qtyDisplay = document.getElementById('qty-val-display');

  if (minusBtn && plusBtn && qtyDisplay) {
    minusBtn.addEventListener('click', () => {
      if (quantityVal > 1) {
        quantityVal--;
        qtyDisplay.textContent = quantityVal;
        updatePriceDisplay();
      }
    });

    plusBtn.addEventListener('click', () => {
      quantityVal++;
      qtyDisplay.textContent = quantityVal;
      updatePriceDisplay();
    });
  }

  const detailAddToCartBtn = document.getElementById('detail-add-to-cart-btn');
  if (detailAddToCartBtn) {
    detailAddToCartBtn.addEventListener('click', () => {
      addToCart(prod.id, selectedWeightText, quantityVal);
    });
  }

  const thumbnails = document.querySelectorAll('.thumbnail-box');
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const img = thumb.querySelector('img');
      if (img) document.getElementById('detail-main-image').src = img.src;
    });
  });

  const pinBtn = document.getElementById('check-pin-btn');
  const pinInput = document.getElementById('pin-input');
  const pinResult = document.getElementById('pin-result');

  if (pinBtn && pinInput && pinResult) {
    pinBtn.addEventListener('click', () => {
      const code = pinInput.value.trim();
      if (/^\d{6}$/.test(code)) {
        pinResult.className = "small text-success mt-2 fw-bold";
        pinResult.innerHTML = `<i class="bi bi-truck me-1"></i> Delivery available at ${code}! Estimated: 2-3 Days.`;
      } else {
        pinResult.className = "small text-danger mt-2 fw-bold";
        pinResult.textContent = "Please enter a valid 6-digit PIN code.";
      }
    });
  }

  updatePriceDisplay();
}

// Offers Page
function initOffersPage() {
  let totalSeconds = 24 * 3600;
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMins = document.getElementById('timer-mins');
  const timerSecs = document.getElementById('timer-secs');

  setInterval(() => {
    if (totalSeconds <= 0) return;
    totalSeconds--;
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (timerDays) timerDays.textContent = String(d).padStart(2, '0');
    if (timerHours) timerHours.textContent = String(h).padStart(2, '0');
    if (timerMins) timerMins.textContent = String(m).padStart(2, '0');
    if (timerSecs) timerSecs.textContent = String(s).padStart(2, '0');
  }, 1000);

  const copyBtns = document.querySelectorAll('.btn-copy-code');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      if (navigator.clipboard) navigator.clipboard.writeText(code);
      const originalText = btn.textContent;
      btn.textContent = "Copied! ✓";
      btn.classList.replace('btn-outline-warning', 'btn-success');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.replace('btn-success', 'btn-outline-warning');
      }, 2000);
    });
  });
}

// Contact Page
function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstNameElem = document.getElementById('contact-first-name') || document.getElementById('contact-name');
    const firstName = firstNameElem ? firstNameElem.value.trim() : "Friend";
    showToast(`Thank you, ${firstName}! Your message has been sent successfully.`);
    form.reset();
  });
}

// Search Page
let searchState = { query: '', category: 'all', maxPrice: 200, tags: [], inStockOnly: false, sort: 'popularity' };

function initSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  const searchInput = document.getElementById('search-page-input');

  if (qParam && searchInput) {
    searchInput.value = qParam;
    searchState.query = qParam.toLowerCase();
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchState.query = e.target.value.toLowerCase().trim();
      renderSearchResults();
    });
  }

  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchState.query = '';
      renderSearchResults();
    });
  }

  const tagPills = document.querySelectorAll('.popular-tag-pill');
  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const tagText = pill.dataset.tag;
      if (searchInput) searchInput.value = tagText;
      searchState.query = tagText.toLowerCase();
      renderSearchResults();
    });
  });

  const priceSlider = document.getElementById('price-range-slider');
  const priceValDisplay = document.getElementById('price-slider-val');
  if (priceSlider && priceValDisplay) {
    priceSlider.addEventListener('input', (e) => {
      searchState.maxPrice = parseFloat(e.target.value);
      priceValDisplay.textContent = `₹${e.target.value}`;
      renderSearchResults();
    });
  }

  const catCheckboxes = document.querySelectorAll('.filter-category-checkbox');
  catCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checkedCats = Array.from(catCheckboxes).filter(c => c.checked).map(c => c.value);
      searchState.category = checkedCats.length === 1 ? checkedCats[0] : 'all';
      renderSearchResults();
    });
  });

  const sortSelect = document.getElementById('search-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      searchState.sort = e.target.value;
      renderSearchResults();
    });
  }

  renderSearchResults();
}

function renderSearchResults() {
  const container = document.getElementById('search-results-grid');
  const emptyState = document.getElementById('empty-search-state');
  const countEl = document.getElementById('search-results-count');
  if (!container) return;

  let results = SNACKY_PRODUCTS.filter(p => {
    const matchesQuery = !searchState.query || p.title.toLowerCase().includes(searchState.query) || p.category.toLowerCase().includes(searchState.query);
    const matchesCat = searchState.category === 'all' || p.category === searchState.category;
    const matchesPrice = p.price <= searchState.maxPrice;
    return matchesQuery && matchesCat && matchesPrice;
  });

  if (searchState.sort === 'price-low') results.sort((a, b) => a.price - b.price);
  if (searchState.sort === 'price-high') results.sort((a, b) => b.price - a.price);
  if (searchState.sort === 'discount') results.sort((a, b) => b.discount - a.discount);

  if (countEl) countEl.textContent = `${results.length} products found`;

  if (results.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  let html = '';
  results.forEach(p => {
    const currentQty = getCartItemQty(p.id);
    html += `
      <div class="col">
        <div class="product-card">
          <div class="card-top-frame">
            <a href="product-detail.html?id=${p.id}">
              <img src="${p.image}" alt="${p.title}" class="product-card-img">
            </a>
          </div>
          <div class="product-card-body">
            <a href="product-detail.html?id=${p.id}" class="text-decoration-none">
              <h6 class="product-title">${p.title}</h6>
            </a>
            <div class="price-row-box">
              <span class="price-selling">₹${p.price.toFixed(2)}</span>
              <span class="price-mrp">₹${p.mrp.toFixed(2)}</span>
            </div>
            <span class="price-discount-pill">${p.discount}% OFF</span>
            <div class="weight-selector-box">
              <span class="weight-label-subtext">WEIGHT</span>
              <span class="weight-badge-pill">${p.weight}</span>
            </div>
            ${p.inStock ? 
              `<div class="card-qty-action-bar">
                 <button class="card-qty-btn" onclick="updateCartItemQty(${p.id}, -1)">-</button>
                 <span class="card-qty-val" id="card-qty-val-${p.id}">${currentQty || 1}</span>
                 <button class="card-qty-btn" onclick="updateCartItemQty(${p.id}, 1)">+</button>
               </div>` : 
              `<button class="btn-card-disabled" disabled>OUT OF STOCK</button>`}
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

// Auth Page
function initAuthPage() {
  const phoneStep = document.getElementById('auth-step-phone');
  const otpStep = document.getElementById('auth-step-otp');
  const continuePhoneBtn = document.getElementById('auth-continue-phone-btn');
  const verifyOtpBtn = document.getElementById('auth-verify-otp-btn');
  const otpDigits = document.querySelectorAll('.otp-digit-input');
  const emailLoginBtn = document.getElementById('email-login-btn');

  let tempPhone = "";

  if (continuePhoneBtn && phoneStep && otpStep) {
    continuePhoneBtn.addEventListener('click', () => {
      const phoneInput = document.getElementById('auth-phone-input');
      if (phoneInput && phoneInput.value.trim().length >= 10) {
        tempPhone = phoneInput.value.trim();
        phoneStep.style.display = 'none';
        otpStep.style.display = 'block';
        if (otpDigits[0]) otpDigits[0].focus();
        showToast("OTP sent! (Use code 123456)");
      } else {
        showToast("Please enter a valid 10-digit mobile number.");
      }
    });
  }

  otpDigits.forEach((digitInput, idx) => {
    digitInput.addEventListener('keyup', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        if (idx < otpDigits.length - 1) otpDigits[idx + 1].focus();
      } else if (e.key === 'Backspace') {
        if (idx > 0) otpDigits[idx - 1].focus();
      }
    });
  });

  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', () => {
      const code = Array.from(otpDigits).map(d => d.value).join('');
      if (code === '123456' || code.length === 6) {
        localStorage.setItem('isLoggedIn', 'true');
        const phoneFormatted = tempPhone ? "+91 " + tempPhone : "+91 9876543210";
        snackyUser = {
          name: snackyUser.name || "Customer",
          phone: phoneFormatted,
          email: snackyUser.email || "user@snacky.com",
          dob: "1995-05-15"
        };
        localStorage.setItem('snacky_user', JSON.stringify(snackyUser));
        showToast("Login Successful! Creating your profile...");
        setTimeout(() => { window.location.href = 'profile.html'; }, 1000);
      } else {
        showToast("Invalid OTP. Try 123456.");
      }
    });
  }

  if (emailLoginBtn) {
    emailLoginBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('email-login-input');
      if (emailInput && emailInput.value.trim()) {
        const enteredEmail = emailInput.value.trim();
        localStorage.setItem('isLoggedIn', 'true');
        snackyUser = {
          name: enteredEmail.split('@')[0],
          email: enteredEmail,
          phone: snackyUser.phone || "+91 9876543210",
          dob: "1995-05-15"
        };
        localStorage.setItem('snacky_user', JSON.stringify(snackyUser));
        showToast("Login Successful! Creating your profile...");
        setTimeout(() => { window.location.href = 'profile.html'; }, 1000);
      } else {
        showToast("Please enter a valid email address.");
      }
    });
  }
}

// Profile Page
function initProfilePage() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    showToast("Please login first to access your profile.");
    setTimeout(() => {
      window.location.href = 'auth.html';
    }, 1200);
    return;
  }

  const nameInput = document.getElementById('profile-name-input');
  const emailInput = document.getElementById('profile-email-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarPhone = document.getElementById('sidebar-user-phone');
  const saveBtn = document.getElementById('profile-save-btn');
  const logoutBtn = document.getElementById('profile-logout-btn');

  if (sidebarName) sidebarName.innerText = snackyUser.name || "Customer Account";
  if (sidebarPhone) sidebarPhone.innerText = snackyUser.phone || snackyUser.email || "Verified User";

  if (nameInput) nameInput.value = snackyUser.name || "";
  if (emailInput) emailInput.value = snackyUser.email || "";
  if (phoneInput) phoneInput.value = snackyUser.phone || "";

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      snackyUser.name = nameInput.value.trim();
      snackyUser.email = emailInput.value.trim();
      snackyUser.phone = phoneInput.value.trim();
      localStorage.setItem('snacky_user', JSON.stringify(snackyUser));
      if (sidebarName) sidebarName.innerText = snackyUser.name || "Customer Account";
      if (sidebarPhone) sidebarPhone.innerText = snackyUser.phone || snackyUser.email || "";
      showToast("Profile details updated successfully!");
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('snacky_user');
      snackyUser = { name: "", email: "", phone: "", dob: "" };
      showToast("Logged out successfully.");
      setTimeout(() => { window.location.href = 'auth.html'; }, 1000);
    });
  }
}

// Payment Gateway Page
function initPaymentFlowPage() {
  const itemsContainer = document.getElementById('checkout-cart-items-list');
  const itemCountBadge = document.getElementById('checkout-item-count');
  const subtotalElem = document.getElementById('checkout-subtotal');
  const discountElem = document.getElementById('checkout-discount');
  const shippingElem = document.getElementById('checkout-shipping');
  const totalPriceElem = document.getElementById('checkout-total-price');
  const clearAllBtn = document.getElementById('checkout-clear-all-btn');

  const payBtnAmount = document.getElementById('pay-btn-amount');
  const payCardBtnAmount = document.getElementById('pay-card-btn-amount');
  const payCodBtnAmount = document.getElementById('pay-cod-btn-amount');

  window.renderCheckoutItems = function() {
    if (!itemsContainer) return;

    if (snackyCart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="text-center py-5">
          <div class="display-3 mb-3 text-muted">🛒</div>
          <h5 class="fw-bold text-navy mb-2">Your cart is empty</h5>
          <p class="text-muted small mb-4">Add your favorite delicious snacks to proceed to checkout.</p>
          <a href="products.html" class="btn btn-snacky-primary py-2 px-4">Browse Snacks <i class="bi bi-arrow-right"></i></a>
        </div>
      `;
      if (itemCountBadge) itemCountBadge.innerText = '0';
      if (subtotalElem) subtotalElem.innerText = '₹0.00';
      if (discountElem) discountElem.innerText = '-₹0.00';
      if (shippingElem) shippingElem.innerText = '₹0.00';
      if (totalPriceElem) totalPriceElem.innerText = '₹0.00';
      if (payBtnAmount) payBtnAmount.innerText = '₹0.00';
      if (payCardBtnAmount) payCardBtnAmount.innerText = '₹0.00';
      if (payCodBtnAmount) payCodBtnAmount.innerText = '₹0.00';
      return;
    }

    let subtotal = 0;
    const totalQty = snackyCart.reduce((sum, i) => sum + i.qty, 0);
    if (itemCountBadge) itemCountBadge.innerText = totalQty;

    itemsContainer.innerHTML = snackyCart.map((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="checkout-item-row">
          <img src="${item.image}" alt="${item.title}" class="checkout-item-img">
          <div class="flex-grow-1">
            <h6 class="fw-bold text-navy mb-1">${item.title}</h6>
            <span class="badge bg-light text-muted fw-normal border">${item.weight || '100g'}</span>
            <div class="d-flex align-items-center gap-2 mt-2">
              <button class="qty-control-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
              <span class="fw-bold px-2 text-navy">${item.qty}</span>
              <button class="qty-control-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
            </div>
          </div>
          <div class="text-end">
            <button class="btn btn-link text-danger p-0 border-0 mb-2" onclick="removeFromCart(${index})" title="Remove item">
              <i class="bi bi-x-lg"></i>
            </button>
            <div class="fw-extrabold text-navy fs-6">₹${itemTotal.toFixed(2)}</div>
          </div>
        </div>
      `;
    }).join('');

    const discount = subtotal > 199 ? 30 : 0;
    const shipping = subtotal >= 199 || subtotal === 0 ? 0 : 40;
    const finalTotal = Math.max(0, subtotal - discount + shipping);

    if (subtotalElem) subtotalElem.innerText = `₹${subtotal.toFixed(2)}`;
    if (discountElem) discountElem.innerText = discount > 0 ? `-₹${discount.toFixed(2)}` : '₹0.00';
    if (shippingElem) shippingElem.innerText = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    if (totalPriceElem) totalPriceElem.innerText = `₹${finalTotal.toFixed(2)}`;

    const formattedTotal = `₹${finalTotal.toFixed(2)}`;
    if (payBtnAmount) payBtnAmount.innerText = formattedTotal;
    if (payCardBtnAmount) payCardBtnAmount.innerText = formattedTotal;
    if (payCodBtnAmount) payCodBtnAmount.innerText = formattedTotal;
  };

  renderCheckoutItems();

  // Listen to cart changes
  window.addEventListener('storage', renderCheckoutItems);

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (snackyCart.length === 0) return;
      if (confirm("Are you sure you want to remove all items from your checkout?")) {
        snackyCart = [];
        saveCartState();
        renderCheckoutItems();
        showToast("Cart cleared.");
      }
    });
  }

  // Payment triggers
  function processCheckoutPayment(methodName) {
    if (snackyCart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }

    showToast(`Processing payment via ${methodName}...`);
    setTimeout(() => {
      snackyCart = [];
      saveCartState();
      showToast("Order Placed Successfully!");
      setTimeout(() => {
        window.location.href = 'track-order.html';
      }, 1000);
    }, 1500);
  }

  const payUpiBtn = document.getElementById('pay-now-btn');
  if (payUpiBtn) payUpiBtn.addEventListener('click', () => processCheckoutPayment("UPI / QR Code"));

  const payCardBtn = document.getElementById('pay-card-now-btn');
  if (payCardBtn) payCardBtn.addEventListener('click', () => processCheckoutPayment("Credit/Debit Card"));

  const payCodBtn = document.getElementById('pay-cod-now-btn');
  if (payCodBtn) payCodBtn.addEventListener('click', () => processCheckoutPayment("Cash on Delivery"));
}

// Track Order Page
function initTrackOrderPage() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const guestCard = document.getElementById('track-guest-access-card');
  const dashboardCard = document.getElementById('track-active-dashboard');

  if (!isLoggedIn) {
    if (guestCard) guestCard.style.display = 'block';
    if (dashboardCard) dashboardCard.style.display = 'none';
  } else {
    if (guestCard) guestCard.style.display = 'none';
    if (dashboardCard) dashboardCard.style.display = 'block';
  }
}
