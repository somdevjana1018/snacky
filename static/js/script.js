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
  { id: 101, title: "Paachratan Mixture", category: "namkeen", price: 80, mrp: 100, discount: 20, weight: "120 g", packSize: "100 gram pack", dateAdded: "2026-01-15", rating: 4.8, salesCount: 840, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/products/paachratan_mixture_front.jpg", backImage: "../static/images/products/paachratan_mixture_back.jpg" },
  { id: 102, title: "Millet Chakli", category: "namkeen", price: 95, mrp: 120, discount: 21, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-02-10", rating: 4.9, salesCount: 920, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "High Fiber"], image: "../static/images/products/millet_chakli_front.jpg", backImage: "../static/images/products/millet_chakli_back.jpg" },
  { id: 103, title: "Poha Mixture", category: "namkeen", price: 75, mrp: 90, discount: 17, weight: "140 g", packSize: "135 gram pack", dateAdded: "2026-01-20", rating: 4.7, salesCount: 650, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/products/poha_mixture_front.jpg", backImage: "../static/images/products/poha_mixture_back.jpg" },
  { id: 104, title: "Crispy Butter Chakli", category: "namkeen", price: 64, mrp: 80, discount: 20, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-03-05", rating: 4.8, salesCount: 1100, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/products/butter_chakli_front.jpg", backImage: "../static/images/products/butter_chakli_back.jpg" },
  { id: 105, title: "Teekha Gathiya", category: "namkeen", price: 70, mrp: 90, discount: 22, weight: "160 g", packSize: "135 gram pack", dateAdded: "2026-02-18", rating: 4.6, salesCount: 480, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/teekha_gathiya_front.jpg", backImage: "../static/images/products/teekha_gathiya_back.jpg" },
  { id: 106, title: "Aloo Bhujia Delight", category: "namkeen", price: 85, mrp: 110, discount: 23, weight: "200 g", packSize: "200 grams - Value Pack", dateAdded: "2026-01-05", rating: 4.9, salesCount: 1540, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/aloo_bhujia_delight_front.jpg", backImage: "../static/images/products/aloo_bhujia_delight_back.jpg" },
  { id: 107, title: "Bikaner Bhujia Classic", category: "namkeen", price: 90, mrp: 115, discount: 22, weight: "200 g", packSize: "200 grams - Value Pack", dateAdded: "2026-03-22", rating: 4.9, salesCount: 1420, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil", "No Palm Oil"], image: "../static/images/products/bikaner_bhujia_classic_front.jpg", backImage: "../static/images/products/bikaner_bhujia_classic_back.jpg" },
  { id: 108, title: "Spicy Corn Mixture", category: "namkeen", price: 65, mrp: 85, discount: 24, weight: "130 g", packSize: "135 gram pack", dateAdded: "2026-04-12", rating: 4.5, salesCount: 390, frameClass: "frame-sage", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/spicy_corn_mixture_front.jpg", backImage: "../static/images/products/spicy_corn_mixture_back.jpg" },
  { id: 109, title: "Khatta Meetha Mix", category: "namkeen", price: 80, mrp: 100, discount: 20, weight: "180 g", packSize: "200 grams - Value Pack", dateAdded: "2026-02-28", rating: 4.8, salesCount: 980, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/khatta_meetha_mix_front.jpg", backImage: "../static/images/products/khatta_meetha_mix_back.jpg" },
  { id: 110, title: "Chana Dal Crunch", category: "namkeen", price: 60, mrp: 75, discount: 20, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-03-14", rating: 4.7, salesCount: 520, frameClass: "frame-sage", inStock: true, tags: ["High Fiber"], image: "../static/images/products/chana_dal_crunch_front.jpg", backImage: "../static/images/products/chana_dal_crunch_back.jpg" },
  { id: 111, title: "Crispy Sev Murmura", category: "namkeen", price: 55, mrp: 70, discount: 21, weight: "120 g", packSize: "100 gram pack", dateAdded: "2026-01-30", rating: 4.6, salesCount: 430, frameClass: "frame-sage", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/products/crispy_sev_murmura_front.jpg", backImage: "../static/images/products/crispy_sev_murmura_back.jpg" },
  { id: 112, title: "Navratan Royal Mix", category: "namkeen", price: 110, mrp: 140, discount: 21, weight: "220 g", packSize: "200 grams - Value Pack", dateAdded: "2026-04-02", rating: 4.9, salesCount: 1250, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/navratan_royal_mix_front.jpg", backImage: "../static/images/products/navratan_royal_mix_back.jpg" },
  { id: 113, title: "Masala Peanuts Classic", category: "namkeen", price: 70, mrp: 90, discount: 22, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-02-04", rating: 4.7, salesCount: 710, frameClass: "frame-sage", inStock: true, tags: ["High Fiber"], image: "../static/images/products/masala_peanuts_classic_front.jpg", backImage: "../static/images/products/masala_peanuts_classic_back.jpg" },
  { id: 114, title: "South Indian Murukku", category: "namkeen", price: 75, mrp: 95, discount: 21, weight: "140 g", packSize: "135 gram pack", dateAdded: "2026-03-18", rating: 4.8, salesCount: 890, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/south_indian_murukku_front.jpg", backImage: "../static/images/products/south_indian_murukku_back.jpg" },
  { id: 115, title: "Salted Moong Dal", category: "namkeen", price: 65, mrp: 80, discount: 19, weight: "160 g", packSize: "135 gram pack", dateAdded: "2026-01-12", rating: 4.6, salesCount: 310, frameClass: "frame-sage", inStock: false, tags: ["High Fiber"], image: "../static/images/products/salted_moong_dal_front.jpg", backImage: "../static/images/products/salted_moong_dal_back.jpg" },
  { id: 116, title: "Cashew Namkeen Mix", category: "namkeen", price: 160, mrp: 200, discount: 20, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-04-20", rating: 4.9, salesCount: 760, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/cashew_namkeen_mix_front.jpg", backImage: "../static/images/products/cashew_namkeen_mix_back.jpg" },
  { id: 117, title: "Soya Sticks Masala", category: "namkeen", price: 70, mrp: 90, discount: 22, weight: "130 g", packSize: "100 gram pack", dateAdded: "2026-02-14", rating: 4.7, salesCount: 620, frameClass: "frame-sage", inStock: true, tags: ["High Fiber"], image: "../static/images/products/soya_sticks_masala_front.jpg", backImage: "../static/images/products/soya_sticks_masala_back.jpg" },
  { id: 118, title: "Tasty Nut Chatpata", category: "namkeen", price: 85, mrp: 110, discount: 23, weight: "170 g", packSize: "135 gram pack", dateAdded: "2026-03-29", rating: 4.8, salesCount: 830, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/tasty_nut_chatpata_front.jpg", backImage: "../static/images/products/tasty_nut_chatpata_back.jpg" },
  { id: 119, title: "Lachha Potato Spicy", category: "namkeen", price: 90, mrp: 115, discount: 22, weight: "140 g", packSize: "135 gram pack", dateAdded: "2026-01-25", rating: 4.7, salesCount: 590, frameClass: "frame-sage", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/products/lachha_potato_spicy_front.jpg", backImage: "../static/images/products/lachha_potato_spicy_back.jpg" },
  { id: 120, title: "Mini Kachori Snack", category: "namkeen", price: 100, mrp: 130, discount: 23, weight: "200 g", packSize: "200 grams - Value Pack", dateAdded: "2026-04-10", rating: 4.8, salesCount: 940, frameClass: "frame-sage", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/mini_kachori_snack_front.jpg", backImage: "../static/images/products/mini_kachori_snack_back.jpg" },

  // --- CHIPS (20 Items) ---
  { id: 201, title: "Soya Katori Wafers", category: "chips", price: 60, mrp: 75, discount: 20, weight: "85 g", packSize: "100 gram pack", dateAdded: "2026-02-01", rating: 4.7, salesCount: 780, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/soya_katori_wafers_front.jpg", backImage: "../static/images/products/soya_katori_wafers_back.jpg" },
  { id: 202, title: "Ragi Masala Chips", category: "chips", price: 70, mrp: 90, discount: 22, weight: "90 g", packSize: "100 gram pack", dateAdded: "2026-03-11", rating: 4.8, salesCount: 860, frameClass: "frame-blue", inStock: true, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/products/ragi_masala_chips_front.jpg", backImage: "../static/images/products/ragi_masala_chips_back.jpg" },
  { id: 203, title: "Desi Masala Potato Chips", category: "chips", price: 40, mrp: 50, discount: 20, weight: "60 g", packSize: "100 gram pack", dateAdded: "2026-01-08", rating: 4.9, salesCount: 1650, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/desi_masala_potato_chips_front.jpg", backImage: "../static/images/products/desi_masala_potato_chips_back.jpg" },
  { id: 204, title: "Wheels Crunchies", category: "chips", price: 45, mrp: 60, discount: 25, weight: "75 g", packSize: "100 gram pack", dateAdded: "2026-02-20", rating: 4.6, salesCount: 670, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/wheels_crunchies_front.jpg", backImage: "../static/images/products/wheels_crunchies_back.jpg" },
  { id: 205, title: "Classic Salted Wafers", category: "chips", price: 50, mrp: 65, discount: 23, weight: "80 g", packSize: "100 gram pack", dateAdded: "2026-01-18", rating: 4.8, salesCount: 1320, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/classic_salted_wafers_front.jpg", backImage: "../static/images/products/classic_salted_wafers_back.jpg" },
  { id: 206, title: "Cream & Onion Chips", category: "chips", price: 55, mrp: 70, discount: 21, weight: "75 g", packSize: "100 gram pack", dateAdded: "2026-03-02", rating: 4.9, salesCount: 1480, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/cream_and_onion_chips_front.jpg", backImage: "../static/images/products/cream_and_onion_chips_back.jpg" },
  { id: 207, title: "Tangy Tomato Crisps", category: "chips", price: 50, mrp: 65, discount: 23, weight: "75 g", packSize: "100 gram pack", dateAdded: "2026-02-12", rating: 4.7, salesCount: 890, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/tangy_tomato_crisps_front.jpg", backImage: "../static/images/products/tangy_tomato_crisps_back.jpg" },
  { id: 208, title: "Banana Chips Salted", category: "chips", price: 80, mrp: 100, discount: 20, weight: "120 g", packSize: "135 gram pack", dateAdded: "2026-01-22", rating: 4.9, salesCount: 1590, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil", "Fasting Special / Vrat"], image: "../static/images/products/banana_chips_salted_front.jpg", backImage: "../static/images/products/banana_chips_salted_back.jpg" },
  { id: 209, title: "Peri Peri Potato Wafers", category: "chips", price: 60, mrp: 75, discount: 20, weight: "70 g", packSize: "100 gram pack", dateAdded: "2026-03-25", rating: 4.8, salesCount: 1120, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/peri_peri_potato_wafers_front.jpg", backImage: "../static/images/products/peri_peri_potato_wafers_back.jpg" },
  { id: 210, title: "Jackfruit Chips Special", category: "chips", price: 95, mrp: 120, discount: 21, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-04-08", rating: 4.7, salesCount: 540, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/jackfruit_chips_special_front.jpg", backImage: "../static/images/products/jackfruit_chips_special_back.jpg" },
  { id: 211, title: "Sweet Potato Crisps", category: "chips", price: 75, mrp: 95, discount: 21, weight: "85 g", packSize: "100 gram pack", dateAdded: "2026-02-26", rating: 4.8, salesCount: 730, frameClass: "frame-blue", inStock: true, tags: ["High Fiber"], image: "../static/images/products/sweet_potato_crisps_front.jpg", backImage: "../static/images/products/sweet_potato_crisps_back.jpg" },
  { id: 212, title: "Beetroot Veggie Chips", category: "chips", price: 90, mrp: 110, discount: 18, weight: "70 g", packSize: "100 gram pack", dateAdded: "2026-03-16", rating: 4.6, salesCount: 420, frameClass: "frame-blue", inStock: false, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/products/beetroot_veggie_chips_front.jpg", backImage: "../static/images/products/beetroot_veggie_chips_back.jpg" },
  { id: 213, title: "Taro Root Chips Salted", category: "chips", price: 85, mrp: 105, discount: 19, weight: "80 g", packSize: "100 gram pack", dateAdded: "2026-01-14", rating: 4.7, salesCount: 610, frameClass: "frame-blue", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/products/taro_root_chips_salted_front.jpg", backImage: "../static/images/products/taro_root_chips_salted_back.jpg" },
  { id: 214, title: "Puffcorn Masala Crunch", category: "chips", price: 40, mrp: 50, discount: 20, weight: "50 g", packSize: "100 gram pack", dateAdded: "2026-04-15", rating: 4.7, salesCount: 880, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/puffcorn_masala_crunch_front.jpg", backImage: "../static/images/products/puffcorn_masala_crunch_back.jpg" },
  { id: 215, title: "Tortilla Corn Chips", category: "chips", price: 70, mrp: 90, discount: 22, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-02-08", rating: 4.8, salesCount: 790, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/tortilla_corn_chips_front.jpg", backImage: "../static/images/products/tortilla_corn_chips_back.jpg" },
  { id: 216, title: "Pudina Potato Chips", category: "chips", price: 50, mrp: 65, discount: 23, weight: "75 g", packSize: "100 gram pack", dateAdded: "2026-03-08", rating: 4.7, salesCount: 910, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/pudina_potato_chips_front.jpg", backImage: "../static/images/products/pudina_potato_chips_back.jpg" },
  { id: 217, title: "Jalapeno Nacho Chips", category: "chips", price: 75, mrp: 95, discount: 21, weight: "90 g", packSize: "100 gram pack", dateAdded: "2026-04-01", rating: 4.8, salesCount: 690, frameClass: "frame-blue", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/jalapeno_nacho_chips_front.jpg", backImage: "../static/images/products/jalapeno_nacho_chips_back.jpg" },
  { id: 218, title: "Tapioca Chips Spicy", category: "chips", price: 65, mrp: 80, discount: 19, weight: "110 g", packSize: "135 gram pack", dateAdded: "2026-01-28", rating: 4.8, salesCount: 960, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/tapioca_chips_spicy_front.jpg", backImage: "../static/images/products/tapioca_chips_spicy_back.jpg" },
  { id: 219, title: "Black Pepper Wafers", category: "chips", price: 60, mrp: 75, discount: 20, weight: "80 g", packSize: "100 gram pack", dateAdded: "2026-02-16", rating: 4.7, salesCount: 640, frameClass: "frame-blue", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/black_pepper_wafers_front.jpg", backImage: "../static/images/products/black_pepper_wafers_back.jpg" },
  { id: 220, title: "Multi-Grain Chips", category: "chips", price: 80, mrp: 100, discount: 20, weight: "95 g", packSize: "100 gram pack", dateAdded: "2026-03-20", rating: 4.8, salesCount: 820, frameClass: "frame-blue", inStock: true, tags: ["High Fiber"], image: "../static/images/products/multi_grain_chips_front.jpg", backImage: "../static/images/products/multi_grain_chips_back.jpg" },

  // --- HEALTHY SNACKS (20 Items) ---
  { id: 301, title: "Makhana Twisters", category: "healthy", price: 120, mrp: 150, discount: 20, weight: "60 g", packSize: "100 gram pack", dateAdded: "2026-01-10", rating: 4.9, salesCount: 1450, frameClass: "frame-orange", inStock: true, tags: ["No Palm Oil", "High Fiber", "Fasting Special / Vrat"], image: "../static/images/products/makhana_twisters_front.jpg", backImage: "../static/images/products/makhana_twisters_back.jpg" },
  { id: 302, title: "Lime & Chilli Makhana", category: "healthy", price: 130, mrp: 160, discount: 19, weight: "65 g", packSize: "100 gram pack", dateAdded: "2026-02-22", rating: 4.8, salesCount: 1120, frameClass: "frame-orange", inStock: true, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/products/lime_chilli_makhana_front.jpg", backImage: "../static/images/products/makhana_twisters_back.jpg" },
  { id: 303, title: "Roasted Cashews Masala", category: "healthy", price: 240, mrp: 300, discount: 20, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-03-15", rating: 4.9, salesCount: 950, frameClass: "frame-orange", inStock: true, tags: ["100% Groundnut Oil"], image: "../static/images/products/roasted_cashews_masala_front.jpg", backImage: "../static/images/products/roasted_cashews_masala_back.jpg" },
  { id: 304, title: "Roasted Almonds Salted", category: "healthy", price: 220, mrp: 280, discount: 21, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-01-19", rating: 4.8, salesCount: 870, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/roasted_almonds_salted_front.jpg", backImage: "../static/images/products/roasted_almonds_salted_back.jpg" },
  { id: 305, title: "Quinoa Puffs Herb", category: "healthy", price: 95, mrp: 120, discount: 21, weight: "50 g", packSize: "100 gram pack", dateAdded: "2026-04-05", rating: 4.7, salesCount: 680, frameClass: "frame-orange", inStock: true, tags: ["High Fiber", "No Palm Oil"], image: "../static/images/products/quinoa_puffs_herb_front.jpg", backImage: "../static/images/products/quinoa_puffs_herb_back.jpg" },
  { id: 306, title: "Oat & Seed Cookies", category: "healthy", price: 110, mrp: 140, discount: 21, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-02-15", rating: 4.8, salesCount: 920, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/oat_seed_cookies_front.jpg", backImage: "../static/images/products/oat_seed_cookies_back.jpg" },
  { id: 307, title: "Flax Seed Crackers", category: "healthy", price: 85, mrp: 110, discount: 23, weight: "90 g", packSize: "100 gram pack", dateAdded: "2026-03-01", rating: 4.6, salesCount: 510, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/flax_seed_crackers_front.jpg", backImage: "../static/images/products/flax_seed_crackers_back.jpg" },
  { id: 308, title: "Jowar Puff Chatpata", category: "healthy", price: 75, mrp: 95, discount: 21, weight: "60 g", packSize: "100 gram pack", dateAdded: "2026-04-18", rating: 4.8, salesCount: 770, frameClass: "frame-orange", inStock: true, tags: ["No Palm Oil", "High Fiber"], image: "../static/images/products/jowar_puff_chatpata_front.jpg", backImage: "../static/images/products/jowar_puff_chatpata_back.jpg" },
  { id: 309, title: "Roasted Chana Masala", category: "healthy", price: 65, mrp: 80, discount: 19, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-01-31", rating: 4.7, salesCount: 630, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/roasted_chana_masala_front.jpg", backImage: "../static/images/products/roasted_chana_masala_back.jpg" },
  { id: 310, title: "Trail Mix Seeds & Nuts", category: "healthy", price: 180, mrp: 225, discount: 20, weight: "120 g", packSize: "135 gram pack", dateAdded: "2026-03-12", rating: 4.9, salesCount: 1190, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/trail_mix_seeds_nuts_front.jpg", backImage: "../static/images/products/trail_mix_seeds_nuts_back.jpg" },
  { id: 311, title: "Amaranth Puffs Sweet", category: "healthy", price: 80, mrp: 100, discount: 20, weight: "70 g", packSize: "100 gram pack", dateAdded: "2026-02-05", rating: 4.6, salesCount: 460, frameClass: "frame-orange", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/products/amaranth_puffs_sweet_front.jpg", backImage: "../static/images/products/amaranth_puffs_sweet_back.jpg" },
  { id: 312, title: "Pudina Roasted Makhana", category: "healthy", price: 135, mrp: 170, discount: 21, weight: "65 g", packSize: "100 gram pack", dateAdded: "2026-03-24", rating: 4.9, salesCount: 1340, frameClass: "frame-orange", inStock: true, tags: ["High Fiber", "Fasting Special / Vrat"], image: "../static/images/products/pudina_roasted_makhana_front.jpg", backImage: "../static/images/products/pudina_roasted_makhana_back.jpg" },
  { id: 313, title: "Soya Nut Crunch", category: "healthy", price: 70, mrp: 90, discount: 22, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-01-16", rating: 4.7, salesCount: 580, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/soya_nut_crunch_front.jpg", backImage: "../static/images/products/soya_nut_crunch_back.jpg" },
  { id: 314, title: "Chia Seed Munchies", category: "healthy", price: 90, mrp: 115, discount: 22, weight: "80 g", packSize: "100 gram pack", dateAdded: "2026-04-11", rating: 4.6, salesCount: 390, frameClass: "frame-orange", inStock: false, tags: ["High Fiber"], image: "../static/images/products/chia_seed_munchies_front.jpg", backImage: "../static/images/products/chia_seed_munchies_back.jpg" },
  { id: 315, title: "Pumpkin Seeds Salted", category: "healthy", price: 160, mrp: 200, discount: 20, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-02-19", rating: 4.8, salesCount: 810, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/pumpkin_seeds_salted_front.jpg", backImage: "../static/images/products/pumpkin_seeds_salted_back.jpg" },
  { id: 316, title: "Sunflower Seeds Roasted", category: "healthy", price: 140, mrp: 175, discount: 20, weight: "100 g", packSize: "100 gram pack", dateAdded: "2026-03-07", rating: 4.7, salesCount: 740, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/sunflower_seeds_roasted_front.jpg", backImage: "../static/images/products/sunflower_seeds_roasted_back.jpg" },
  { id: 317, title: "Baked Beetroot Munch", category: "healthy", price: 85, mrp: 105, discount: 19, weight: "60 g", packSize: "100 gram pack", dateAdded: "2026-04-03", rating: 4.7, salesCount: 530, frameClass: "frame-orange", inStock: true, tags: ["No Palm Oil"], image: "../static/images/products/baked_beetroot_munch_front.jpg", backImage: "../static/images/products/baked_beetroot_munch_back.jpg" },
  { id: 318, title: "Multi-Seed Energy Bar", category: "healthy", price: 50, mrp: 65, discount: 23, weight: "40 g", packSize: "100 gram pack", dateAdded: "2026-01-26", rating: 4.8, salesCount: 880, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/multi_seed_energy_bar_front.jpg", backImage: "../static/images/products/multi_seed_energy_bar_back.jpg" },
  { id: 319, title: "Dry Fruit Laddu", category: "healthy", price: 190, mrp: 240, discount: 21, weight: "150 g", packSize: "135 gram pack", dateAdded: "2026-03-27", rating: 4.9, salesCount: 1040, frameClass: "frame-orange", inStock: true, tags: ["Fasting Special / Vrat"], image: "../static/images/products/dry_fruit_laddu_front.jpg", backImage: "../static/images/products/dry_fruit_laddu_back.jpg" },
  { id: 320, title: "Baked Mathri Whole Wheat", category: "healthy", price: 90, mrp: 110, discount: 18, weight: "140 g", packSize: "135 gram pack", dateAdded: "2026-02-11", rating: 4.7, salesCount: 660, frameClass: "frame-orange", inStock: true, tags: ["High Fiber"], image: "../static/images/products/baked_mathri_whole_wheat_front.jpg", backImage: "../static/images/products/baked_mathri_whole_wheat_back.jpg" }
];

// --------------------------------------------------------------------------
// 3. Global Cart & State Engine
// --------------------------------------------------------------------------
let snackyCart = getFreshCart();
let snackyAddress = JSON.parse(localStorage.getItem('snacky_address')) || null;
let snackyUser = JSON.parse(localStorage.getItem('snacky_user')) || { name: "", email: "", phone: "", dob: "" };

function getFreshCart() {
  try {
    const raw = localStorage.getItem('snacky_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCartState() {
  localStorage.setItem('snacky_cart', JSON.stringify(snackyCart));
  updateCartBadge();
  renderOffcanvasCart();
  renderCheckoutItems();
}

function updateCartBadge() {
  snackyCart = getFreshCart();
  const totalCount = snackyCart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = totalCount;
  });
}

function addToCart(productId, weight, qty = 1, customPrice = null, customMrp = null) {
  snackyCart = getFreshCart();
  let prod;
  if (typeof productId === 'object' && productId !== null) {
    prod = productId;
  } else {
    prod = SNACKY_PRODUCTS.find(p => p.id === productId || String(p.id) === String(productId));
  }
  if (!prod) return;

  const selectedWeight = weight || prod.weight || "100 g";

  // Calculate proportional price & MRP if not explicitly passed
  let unitPrice = customPrice;
  let unitMrp = customMrp;

  if (unitPrice === null || unitPrice === undefined) {
    if (prod.price !== undefined) {
      if (selectedWeight && prod.weight && selectedWeight !== prod.weight) {
        const baseW = parseFloat(prod.weight) || 100;
        const selW = parseFloat(selectedWeight) || 100;
        if (baseW > 0 && selW > 0) {
          const ratio = selW / baseW;
          unitPrice = Math.round(prod.price * ratio);
          unitMrp = Math.round((prod.mrp || (prod.price + 20)) * ratio);
        } else {
          unitPrice = prod.price;
          unitMrp = prod.mrp || (prod.price + 20);
        }
      } else {
        unitPrice = prod.price;
        unitMrp = prod.mrp || (prod.price + 20);
      }
    } else {
      unitPrice = 75;
      unitMrp = 100;
    }
  }

  if (unitMrp === null || unitMrp === undefined) {
    unitMrp = Math.round(unitPrice * 1.25);
  }

  const existingIndex = snackyCart.findIndex(item => (item.id === prod.id || String(item.id) === String(prod.id)) && item.weight === selectedWeight);

  if (existingIndex > -1) {
    snackyCart[existingIndex].qty += qty;
    snackyCart[existingIndex].price = unitPrice;
    snackyCart[existingIndex].mrp = unitMrp;
  } else {
    snackyCart.push({
      id: prod.id,
      title: prod.title,
      price: unitPrice,
      mrp: unitMrp,
      weight: selectedWeight,
      image: prod.image,
      qty: qty
    });
  }

  saveCartState();
  showToast(`Added ${prod.title} (${selectedWeight}) - ₹${unitPrice} to cart!`);

  // Open the offcanvas cart drawer slider automatically
  try {
    const cartEl = document.getElementById('cartOffcanvas');
    if (cartEl && window.bootstrap && bootstrap.Offcanvas) {
      const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(cartEl);
      offcanvasInstance.show();
    }
  } catch(e) {}
}

function updateCartQuantity(index, delta) {
  snackyCart = getFreshCart();
  if (!snackyCart[index]) return;
  snackyCart[index].qty += delta;
  if (snackyCart[index].qty <= 0) {
    snackyCart.splice(index, 1);
  }
  saveCartState();
}

function removeFromCart(index) {
  snackyCart = getFreshCart();
  if (!snackyCart[index]) return;
  snackyCart.splice(index, 1);
  saveCartState();
}

function getCartSubtotal() {
  snackyCart = getFreshCart();
  return snackyCart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.qty) || 0)), 0);
}

// Global Checkout Items & Summary Renderer
function renderCheckoutItems() {
  snackyCart = getFreshCart();

  const itemsContainer = document.getElementById('checkout-cart-items-list');
  const countEl = document.getElementById('checkout-item-count');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const discountEl = document.getElementById('checkout-discount');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total-price');
  const savingsEl = document.getElementById('sidebar-savings-amount');

  const payBtnAmt = document.getElementById('pay-btn-amount');
  const payCardAmt = document.getElementById('pay-card-btn-amount');
  const payCodAmt = document.getElementById('pay-cod-btn-amount');
  const payNetAmt = document.getElementById('pay-net-btn-amount');

  const totalCount = snackyCart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  if (countEl) countEl.textContent = totalCount;

  if (snackyCart.length === 0) {
    if (itemsContainer) {
      itemsContainer.innerHTML = `
        <div class="text-center py-4 text-muted">
          <div class="fs-2 mb-2">🍿</div>
          <h6 class="fw-bold text-navy mb-1">Your bag is empty</h6>
          <p class="text-muted small mb-2">Add snacks to continue checkout.</p>
          <a href="products.html" class="btn btn-snacky-primary py-2 px-3 small">Browse Snacks</a>
        </div>`;
    }
    if (subtotalEl) subtotalEl.textContent = "₹0.00";
    if (discountEl) discountEl.textContent = "-₹0.00";
    if (shippingEl) shippingEl.textContent = "₹0.00";
    if (totalEl) totalEl.textContent = "₹0.00";
    if (savingsEl) savingsEl.textContent = "₹0";

    if (payBtnAmt) payBtnAmt.textContent = "₹0.00";
    if (payCardAmt) payCardAmt.textContent = "₹0.00";
    if (payCodAmt) payCodAmt.textContent = "₹0.00";
    if (payNetAmt) payNetAmt.textContent = "₹0.00";
    return;
  }

  let itemsSubtotal = 0;
  let itemsMrpTotal = 0;
  let itemsHtml = '';

  snackyCart.forEach((item, index) => {
    const qty = Number(item.qty) || 1;
    const price = Number(item.price) || 0;
    const mrp = Number(item.mrp) || (price + 20);
    const lineTotal = price * qty;
    itemsSubtotal += lineTotal;
    itemsMrpTotal += mrp * qty;

    let customMixHtml = '';
    if (item.isCustomMix && item.ingredients && Array.isArray(item.ingredients)) {
      const ingListStr = item.ingredients.map(ing => `${ing.name} ${ing.qtyGrams}g`).join(', ');
      customMixHtml = `<div class="text-muted fs-8 mt-1"><i class="bi bi-stars text-warning me-1"></i>${ingListStr}</div>`;
    }

    const imgHtml = (item.isCustomMix || !item.image)
      ? ''
      : `<img src="${item.image}" alt="${item.title}" class="rounded-2" style="width: 44px; height: 44px; object-fit: cover;">`;

    itemsHtml += `
      <div class="d-flex align-items-center justify-content-between py-2 border-bottom">
        <div class="d-flex align-items-center gap-2">
          ${imgHtml}
          <div>
            <h6 class="fw-bold text-navy mb-0 small" style="font-size: 0.85rem;">${item.title}</h6>
            <span class="text-muted fs-8"><span class="badge bg-light text-navy border me-1">${item.weight || 'Standard'}</span> • Qty: ${qty} × ₹${price.toFixed(2)}</span>
            ${customMixHtml}
          </div>
        </div>
        <div class="fw-extrabold text-navy small">₹${lineTotal.toFixed(2)}</div>
      </div>`;
  });

  if (itemsContainer) itemsContainer.innerHTML = itemsHtml;

  // Calculate MRP Savings Discount
  let bagDiscount = itemsMrpTotal - itemsSubtotal;
  if (bagDiscount < 30) bagDiscount = 30; // Promotional savings minimum highlight

  const deliveryFee = itemsSubtotal >= 199 || itemsSubtotal === 0 ? 0 : 40;
  const finalPayTotal = itemsSubtotal + deliveryFee;
  const formattedTotalStr = `₹${finalPayTotal.toFixed(2)}`;

  if (subtotalEl) subtotalEl.textContent = `₹${(itemsSubtotal + bagDiscount).toFixed(2)}`;
  if (discountEl) discountEl.textContent = `-₹${bagDiscount.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`;
  if (totalEl) totalEl.textContent = formattedTotalStr;
  if (savingsEl) savingsEl.textContent = `₹${bagDiscount.toFixed(0)}`;

  if (payBtnAmt) payBtnAmt.textContent = formattedTotalStr;
  if (payCardAmt) payCardAmt.textContent = formattedTotalStr;
  if (payCodAmt) payCodAmt.textContent = formattedTotalStr;
  if (payNetAmt) payNetAmt.textContent = formattedTotalStr;
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
        <img src="../static/images/snacky_logo_transparent.png" alt="Snacky Logo" class="cart-empty-logo-img mb-3">
        <h5 class="fw-extrabold text-navy mb-1">Your cart is empty</h5>
        <p class="text-muted small mb-4">Looks like you haven't added any snacks yet.</p>
        <a href="products.html" class="btn btn-snacky-primary px-4 py-2">Explore Snacks</a>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = "₹0.00";
    if (totalEl) totalEl.textContent = "₹0.00";
    if (meterText) meterText.textContent = "Add ₹199 more for free delivery";
    if (meterProgress) meterProgress.style.width = "0%";
    return;
  }

  let html = '';
  snackyCart.forEach((item, index) => {
    const unitPrice = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    const itemTotal = unitPrice * qty;

    let customDetailsHtml = '';
    if (item.isCustomMix && item.ingredients && Array.isArray(item.ingredients)) {
      const pills = item.ingredients.map(ing => `<span class="custom-mix-tag-pill">${ing.name} ${ing.qtyGrams}g</span>`).join('');
      customDetailsHtml = `
        <div class="my-1 d-flex flex-wrap gap-1">
          ${pills}
        </div>
        <a href="mix-your-snack.html?edit=${index}" class="btn-cart-edit-mix">
          <i class="bi bi-pencil-square"></i> Edit Mix
        </a>`;
    }

    const imgHtml = (item.isCustomMix || !item.image)
      ? ''
      : `<img src="${item.image}" alt="${item.title}" class="cart-item-img">`;

    html += `
      <div class="cart-item-card ${item.isCustomMix ? 'cart-custom-mix-card' : ''}">
        <button class="cart-item-remove-btn" onclick="removeFromCart(${index})" title="Remove Item" aria-label="Remove Item">✕</button>
        ${imgHtml}
        <div class="cart-item-content-wrap flex-grow-1">
          <h6 class="cart-item-title fw-bold text-navy">${item.title}</h6>
          <div class="text-muted small mb-2 d-flex align-items-center gap-1 flex-wrap">
            <span class="badge bg-light text-navy border font-monospace px-2 py-1">${item.weight || 'Standard'}</span>
            <span class="text-muted small">• ₹${unitPrice.toFixed(2)} each</span>
          </div>
          ${customDetailsHtml}
          <div class="d-flex justify-content-between align-items-center mt-2 pt-1">
            <div class="quantity-control-box" style="padding: 2px;">
              <button class="qty-btn" style="width: 24px; height: 24px;" onclick="updateCartQuantity(${index}, -1)" aria-label="Decrease quantity">-</button>
              <span class="qty-val" style="padding: 0 10px; font-size: 0.85rem;">${qty}</span>
              <button class="qty-btn" style="width: 24px; height: 24px;" onclick="updateCartQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-price-total fw-extrabold text-navy">₹${itemTotal.toFixed(2)}</div>
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

let activeToastTimeout = null;
let lastToastMessage = "";
let lastToastTime = 0;

function showToast(message) {
  if (!message) return;

  const now = Date.now();
  // Prevent duplicate identical toast messages within 400ms
  if (message === lastToastMessage && (now - lastToastTime) < 400) {
    return;
  }
  lastToastMessage = message;
  lastToastTime = now;

  let container = document.querySelector('.toast-container-custom');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  // Strictly enforce only 1 active notification at any time:
  if (activeToastTimeout) {
    clearTimeout(activeToastTimeout);
    activeToastTimeout = null;
  }
  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  toast.innerHTML = `<i class="bi bi-check-circle-fill text-warning fs-5"></i> <span>${message}</span>`;
  container.appendChild(toast);

  activeToastTimeout = setTimeout(() => {
    toast.classList.add('fade-out-toast');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 250);
  }, 2800);
}

// --------------------------------------------------------------------------
// 4. Page Initializers
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initNavbarLiveSearch();

  if (document.getElementById('products-grid-container')) initProductsPage();
  if (document.getElementById('product-detail-section')) initProductDetailPage();
  if (document.getElementById('mix-customizer-app')) initMixYourSnackPage();
  if (document.getElementById('flash-sale-timer-box')) initOffersPage();
  if (document.getElementById('contact-form')) initContactPage();
  if (document.getElementById('search-results-grid')) initSearchPage();
  if (document.getElementById('auth-card-wrapper')) initAuthPage();
  if (document.getElementById('step-2-content') || document.getElementById('step-3-content') || document.getElementById('checkout-address-form-card') || document.getElementById('payment-gateway-wrapper') || document.getElementById('payment-page-container')) initPaymentFlowPage();
  if (document.getElementById('track-order-wrapper')) initTrackOrderPage();
});

// Products Page
let currentCategoryFilter = 'all';
let visibleProductsCount = 12;

function initProductsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) currentCategoryFilter = catParam.toLowerCase();

  const tabBtns = document.querySelectorAll('button.category-tab-btn');
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

function renderProductsGrid() {
  const container = document.getElementById('products-grid-container');
  const countHeader = document.getElementById('products-count-header');
  const categoryHeader = document.getElementById('products-category-header');
  const loadMoreBtn = document.getElementById('load-more-products-btn');
  if (!container) return;

  if (currentCategoryFilter === 'mix') {
    if (categoryHeader) categoryHeader.textContent = "Mix Your Own Snack";
    if (countHeader) countHeader.textContent = "12 Ingredients Available (Max 500g)";
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';

    container.innerHTML = `
      <div class="col-12" id="mix-customizer-app">
        <div class="row g-4 align-items-start">
          
          <!-- LEFT COLUMN: CUSTOMIZE INGREDIENTS Panel (Wide) -->
          <div class="col-lg-8 col-xl-8">
            <div class="mix-panel-card mix-ingredients-panel shadow-sm">
              <div class="mix-panel-header px-4 py-3 d-flex align-items-center justify-content-between border-bottom">
                <h3 class="fw-extrabold text-navy mb-0 fs-5 mix-panel-heading">Customize Ingredients</h3>
                <span class="badge bg-light text-navy border rounded-pill px-3 py-1 fw-bold fs-8" id="active-ingredients-count">0 / 12 selected</span>
              </div>
              <div class="mix-ingredients-list p-3 p-md-4" id="mix-ingredients-grid">
                <!-- Rendered dynamically -->
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: PACK SUMMARY Panel (Compact) -->
          <div class="col-lg-4 col-xl-4">
            <aside class="mix-panel-card mix-summary-panel shadow-sm" id="mix-summary-sidebar">
              <div class="mix-panel-header px-4 py-3 d-flex align-items-center justify-content-between border-bottom">
                <h4 class="fw-extrabold text-navy mb-0 fs-5 mix-panel-heading">Pack Summary</h4>
                <span class="badge bg-light text-navy border rounded-pill px-3 py-1 font-monospace fs-8">Max 500g</span>
              </div>

              <div class="p-3 p-md-4">
                <!-- Total Weight Metric Box -->
                <div class="mix-summary-metric-section mb-4">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="text-muted fw-bold text-uppercase fs-8 letter-spacing-1">Total Weight:</span>
                    <span class="fw-extrabold text-navy fs-5 font-monospace" id="mix-summary-weight-display">0g / 500g</span>
                  </div>
                  
                  <!-- Progress Bar -->
                  <div class="progress mix-weight-progress-track my-2">
                    <div class="progress-bar mix-weight-progress-bar bg-warning" id="mix-weight-progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="500"></div>
                  </div>
                  
                  <div class="d-flex justify-content-between text-muted fs-8 font-monospace">
                    <span>0g</span>
                    <span class="fw-bold text-navy" id="mix-min-weight-tag"><i class="bi bi-flag-fill text-warning me-1"></i>Min 200g</span>
                    <span>500g Max</span>
                  </div>
                </div>

                <!-- Selected Ingredients List Preview -->
                <div class="mix-selected-list-container mb-4">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-muted fw-bold text-uppercase fs-8 letter-spacing-1">Selected Breakdown:</span>
                    <span class="badge bg-light text-navy border" id="mix-items-summary-count">0 items</span>
                  </div>

                  <!-- Empty State View -->
                  <div class="mix-empty-state-card text-center p-3 rounded-3" id="mix-empty-state-view">
                    <div class="fs-4 mb-1">🍿</div>
                    <h6 class="fw-bold text-navy mb-1 fs-7">Your custom mix is empty.</h6>
                    <p class="text-muted fs-8 mb-0">Adjust ingredient sliders on the left to start mixing.</p>
                  </div>

                  <!-- Populated Items List -->
                  <div class="mix-populated-items-list d-none" id="mix-populated-items-list"></div>
                </div>

                <!-- Total Price Section -->
                <div class="mix-summary-price-box p-3 rounded-3 mb-4 text-center">
                  <span class="text-muted fw-bold text-uppercase fs-8 letter-spacing-1 d-block mb-1">Total Price:</span>
                  <div class="fw-extrabold text-navy display-6 mix-price-highlight" id="mix-summary-total-price">₹0.00</div>
                  <div class="text-success fs-8 fw-bold mt-1">
                    <i class="bi bi-check-circle-fill me-1"></i> 100% Groundnut Oil • Fresh Packed
                  </div>
                </div>

                <!-- Validation Feedback Alert Message -->
                <div class="alert alert-warning py-2 px-3 fs-8 mb-3 d-none rounded-3" id="mix-validation-alert" role="alert">
                  <i class="bi bi-exclamation-triangle-fill me-1"></i> <span id="mix-validation-alert-text"></span>
                </div>

                <!-- Action Buttons -->
                <div class="d-grid gap-2">
                  <button type="button" class="btn btn-mix-add-cart py-3 fw-extrabold" id="btn-add-custom-mix-to-cart" onclick="addCustomMixToCart()">
                    <i class="bi bi-bag-plus-fill me-2"></i> ADD CUSTOM MIX TO CART
                  </button>
                  
                  <button type="button" class="btn btn-outline-secondary btn-sm py-2 rounded-3 fw-bold" id="btn-reset-custom-mix" onclick="resetCustomSnackMix()">
                    <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Mix
                  </button>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>`;

    initMixYourSnackPage();
    return;
  }

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
              `<button class="btn-card-add-to-cart" onclick="addToCart(${p.id})">
                 <i class="bi bi-cart-plus-fill me-1"></i> ADD TO CART
               </button>` : 
              `<button class="btn-card-disabled" disabled>OUT OF STOCK</button>`}
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// Product Lookup Helper (Supports Numeric ID, String ID, and URL Slugs)
// --------------------------------------------------------------------------
function findProductByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const raw = String(idOrSlug).trim().toLowerCase();
  
  // 1. Direct ID match
  let prod = SNACKY_PRODUCTS.find(p => String(p.id).toLowerCase() === raw);
  if (prod) return prod;

  // 2. Slug match (e.g. "millet-chakli" -> "Millet Chakli")
  prod = SNACKY_PRODUCTS.find(p => {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return slug === raw;
  });
  if (prod) return prod;

  // 3. Normalized title match
  prod = SNACKY_PRODUCTS.find(p => {
    const norm = p.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    return norm === raw.replace(/[^a-z0-9]/g, '');
  });
  if (prod) return prod;

  // 4. Partial containment
  prod = SNACKY_PRODUCTS.find(p => p.title.toLowerCase().includes(raw.replace(/-/g, ' ')));
  return prod || null;
}

// Product Details Enrichment
function getProductDetailsInfo(prod) {
  if (!prod) return { description: "", ingredients: "", shelfLife: "180 Days from manufacturing date", dietPreference: "100% Vegetarian" };

  const profiles = {
    101: {
      description: "A royal blend of crispy potato shreds, roasted cashews, plump raisins, crunchy peanuts, and spiced gram flour sev cooked in 100% pure groundnut oil.",
      ingredients: "Gram Flour (Besan), Groundnut Oil, Potato Shreds, Cashew Nuts, Raisins, Peanuts, Iodized Salt, Black Pepper, Turmeric, Chaat Masala.",
      shelfLife: "180 Days from manufacturing date"
    },
    102: {
      description: "Crispy, authentic spiral crunch crafted with foxtail millet flour, rice flour, and spiced with aromatic cumin, ajwain, and red chilli, fried to golden perfection in 100% pure groundnut oil.",
      ingredients: "Rice Flour, Foxtail Millet Flour, Edible Vegetable Oil (Groundnut Oil), Ajwain, Cumin Seeds, Red Chilli Powder, Salt, White Sesame Seeds.",
      shelfLife: "180 Days from manufacturing date"
    },
    103: {
      description: "Light and crispy flattened rice (poha) roasted with curry leaves, crunchy peanuts, mustard seeds, and mild green chillies in pure groundnut oil.",
      ingredients: "Flattened Rice (Poha), Groundnut Oil, Peanuts, Roasted Gram, Curry Leaves, Mustard Seeds, Green Chilli, Turmeric, Salt.",
      shelfLife: "150 Days from manufacturing date"
    },
    104: {
      description: "Melt-in-mouth traditional spiral chaklis made with rich cultured butter, rice flour, and roasted cumin seeds, cooked in pure groundnut oil with zero trans fats.",
      ingredients: "Rice Flour, Urad Dal Flour, Pure Butter, Groundnut Oil, Cumin, White Sesame Seeds, Salt, Asafoetida (Hing).",
      shelfLife: "180 Days from manufacturing date"
    },
    105: {
      description: "Spicy and thick Gujarat-style gram flour gathiya seasoned with freshly ground black pepper, ajwain, and carom seeds.",
      ingredients: "Gram Flour (Besan), Groundnut Oil, Black Pepper, Ajwain, Baking Soda, Salt, Spices.",
      shelfLife: "150 Days from manufacturing date"
    },
    106: {
      description: "Crisp and zesty potato sev delicately spiced with fresh mint, red chilli, and tangy dry mango powder in pure groundnut oil.",
      ingredients: "Potatoes, Gram Flour, Groundnut Oil, Mint Powder, Red Chilli, Dry Mango Powder (Amchur), Salt, Spices.",
      shelfLife: "180 Days from manufacturing date"
    },
    107: {
      description: "The classic Rajasthani delicacy made from moth bean flour and aromatic spices with an iconic sharp, savory bite.",
      ingredients: "Moth Bean Flour, Gram Flour, Groundnut Oil, Black Pepper, Cloves, Cardamom, Salt, Hing.",
      shelfLife: "180 Days from manufacturing date"
    },
    108: {
      description: "Golden corn flakes mixed with crispy sev, roasted nuts, and sweet-spicy chaat seasoning.",
      ingredients: "Corn Flakes, Gram Flour, Groundnut Oil, Peanuts, Red Chilli, Chaat Masala, Salt.",
      shelfLife: "150 Days from manufacturing date"
    },
    109: {
      description: "An irresistible sweet and sour namkeen mixture featuring puffed rice, crunchy sev, green peas, and tangy Indian seasonings.",
      ingredients: "Gram Flour, Groundnut Oil, Sugar, Citric Acid, Rice Flakes, Green Peas, Turmeric, Fennel Seeds, Salt.",
      shelfLife: "180 Days from manufacturing date"
    },
    110: {
      description: "Golden split Bengal gram lentils roasted and tossed with black salt, red chilli, and chaat spices for high-protein snacking.",
      ingredients: "Chana Dal (Bengal Gram), Groundnut Oil, Black Salt, Red Chilli, Chaat Masala, Citric Acid.",
      shelfLife: "180 Days from manufacturing date"
    },
    111: {
      description: "Light and airy puffed rice roasted with crispy nylon sev, roasted peanuts, turmeric, and fresh curry leaves.",
      ingredients: "Puffed Rice (Murmura), Gram Flour Sev, Groundnut Oil, Peanuts, Turmeric, Curry Leaves, Salt.",
      shelfLife: "120 Days from manufacturing date"
    },
    112: {
      description: "A nine-jewel royal namkeen containing roasted nuts, lentils, crispy sev, dried fruits, and aromatic spices.",
      ingredients: "Gram Flour, Cashews, Almonds, Groundnut Oil, Moong Dal, Raisins, Cornflakes, Spices, Black Salt.",
      shelfLife: "180 Days from manufacturing date"
    },
    113: {
      description: "Crunchy batter-coated peanuts seasoned with authentic fiery Indian spices and hing in pure groundnut oil.",
      ingredients: "Peanuts, Gram Flour, Rice Flour, Groundnut Oil, Red Chilli, Turmeric, Salt, Spices.",
      shelfLife: "180 Days from manufacturing date"
    },
    114: {
      description: "Traditional South Indian style crunchy spiral coils made of rice and urad dal with toasted cumin and sesame.",
      ingredients: "Rice Flour, Urad Dal Flour, Groundnut Oil, Sesame Seeds, Cumin, Salt, Hing.",
      shelfLife: "180 Days from manufacturing date"
    },
    115: {
      description: "Wholesome yellow moong lentils lightly fried in pure groundnut oil and seasoned with fine sea salt.",
      ingredients: "Yellow Moong Dal, Groundnut Oil, Salt.",
      shelfLife: "180 Days from manufacturing date"
    },
    116: {
      description: "Whole jumbo cashew nuts fried to a crisp golden brown and tossed with savory black pepper and rock salt.",
      ingredients: "Jumbo Cashew Nuts, Groundnut Oil, Black Pepper, Rock Salt, Amchur.",
      shelfLife: "180 Days from manufacturing date"
    },
    201: {
      description: "Light and crunchy cup-shaped soya snacks seasoned with chatpata masala.",
      ingredients: "Soya Flour, Rice Flour, Groundnut Oil, Onion Powder, Garlic Powder, Red Chilli, Salt.",
      shelfLife: "150 Days from manufacturing date"
    },
    202: {
      description: "Finger millet (Ragi) chips seasoned with authentic coastal spices, packed with calcium and dietary fiber.",
      ingredients: "Ragi (Finger Millet) Flour, Rice Flour, Groundnut Oil, Desi Masala Blend, Salt.",
      shelfLife: "180 Days from manufacturing date"
    },
    203: {
      description: "Thinly sliced, golden farm-fresh potatoes kettle-fried in pure groundnut oil and tossed in a rich blend of fiery Indian spices and amchur.",
      ingredients: "Farm Potatoes, Edible Vegetable Oil (Groundnut Oil), Red Chilli Powder, Dry Mango Powder (Amchur), Black Salt, Spices.",
      shelfLife: "180 Days from manufacturing date"
    },
    208: {
      description: "Authentic Kerala raw Nendran bananas sliced thin and crisped in pure groundnut oil with sea salt.",
      ingredients: "Raw Nendran Bananas, Groundnut Oil, Rock Salt, Turmeric.",
      shelfLife: "120 Days from manufacturing date"
    },
    301: {
      description: "Premium roasted foxnuts (makhana) tossed with Himalayan pink salt and mild herbs. 100% roasted, zero palm oil.",
      ingredients: "Foxnuts (Makhana), Groundnut Oil (Spray), Himalayan Pink Salt, Spices.",
      shelfLife: "180 Days from manufacturing date"
    },
    302: {
      description: "Crunchy roasted foxnuts glazed with zesty lime seasoning and crushed red chillies.",
      ingredients: "Foxnuts (Makhana), Groundnut Oil (Spray), Lime Juice Powder, Red Chilli, Salt.",
      shelfLife: "180 Days from manufacturing date"
    }
  };

  if (profiles[prod.id]) {
    return {
      description: profiles[prod.id].description,
      ingredients: profiles[prod.id].ingredients,
      shelfLife: profiles[prod.id].shelfLife || "180 Days from manufacturing date",
      dietPreference: "100% Vegetarian"
    };
  }

  // Realistic category fallback
  let description = "";
  let ingredients = "";
  if (prod.category === 'namkeen') {
    description = `Authentic, traditional ${prod.title} made with premium natural grains and spices, fried to crispy perfection in 100% pure groundnut oil with zero palm oil.`;
    ingredients = `Gram Flour (Besan), Edible Vegetable Oil (100% Pure Groundnut Oil), Selected Spices & Condiments, Iodized Salt, Hing.`;
  } else if (prod.category === 'chips') {
    description = `Crispy, mouthwatering ${prod.title} crafted from farm-fresh produce, seasoned with chef-crafted spice blends, and cooked in pure groundnut oil.`;
    ingredients = `Fresh Farm Produce, Edible Vegetable Oil (Groundnut Oil), Spices & Seasonings, Rock Salt, Citric Acid.`;
  } else if (prod.category === 'healthy') {
    description = `Nutritious, high-fiber ${prod.title} slow-roasted to crispy perfection with minimal oil and wholesome natural seeds and spices.`;
    ingredients = `Whole Grains / Superfoods, Edible Vegetable Oil (Spray), Rock Salt, Herbs & Natural Spices.`;
  } else {
    description = `Delicious and crispy ${prod.title} crafted with premium quality ingredients and traditional recipes.`;
    ingredients = `Quality Ingredients, Edible Vegetable Oil, Spices, Rock Salt.`;
  }

  return {
    description,
    ingredients,
    shelfLife: "180 Days from manufacturing date",
    dietPreference: "100% Vegetarian"
  };
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// 4B. Full-Page Search Engine (Direct Product Catalog Connection & Smooth Loading)
// --------------------------------------------------------------------------
const searchState = {
  query: '',
  isLoading: false,
  loadingTimer: null
};

function renderSearchSkeleton(container, count = 8) {
  if (!container) return;
  let skeletonHtml = '';
  for (let i = 0; i < count; i++) {
    skeletonHtml += `
      <div class="col">
        <div class="product-card search-skeleton-card">
          <div class="card-top-frame skeleton-frame skeleton-shimmer">
            <div class="skeleton-box-img"></div>
          </div>
          <div class="product-card-body">
            <div class="skeleton-box-title skeleton-shimmer"></div>
            <div class="skeleton-box-price skeleton-shimmer"></div>
            <div class="skeleton-box-weight skeleton-shimmer"></div>
            <div class="skeleton-box-btn skeleton-shimmer"></div>
          </div>
        </div>
      </div>`;
  }
  container.innerHTML = skeletonHtml;
}

function renderSearchResults(withLoading = false, loadingDuration = 380) {
  const container = document.getElementById('search-results-grid');
  const queryHeader = document.getElementById('search-query-header');
  const resultsCount = document.getElementById('search-results-count');
  const emptyState = document.getElementById('empty-search-state');
  if (!container) return;

  if (withLoading) {
    if (searchState.loadingTimer) clearTimeout(searchState.loadingTimer);
    searchState.isLoading = true;

    // Show skeleton shimmer loading
    renderSearchSkeleton(container, 8);
    if (emptyState) emptyState.classList.add('display-none');
    if (resultsCount) {
      resultsCount.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" style="width: 0.85rem; height: 0.85rem;"></span> Searching...`;
    }

    // Active spin indicator on search icon
    document.querySelectorAll('.nav-search-icon').forEach(icon => {
      icon.classList.add('search-icon-loading');
    });

    searchState.loadingTimer = setTimeout(() => {
      searchState.isLoading = false;
      document.querySelectorAll('.nav-search-icon').forEach(icon => {
        icon.classList.remove('search-icon-loading');
      });
      actuallyRenderSearchResults(container, queryHeader, resultsCount, emptyState);
    }, loadingDuration);
  } else {
    actuallyRenderSearchResults(container, queryHeader, resultsCount, emptyState);
  }
}

function actuallyRenderSearchResults(container, queryHeader, resultsCount, emptyState) {
  const q = (searchState.query || '').trim().toLowerCase();

  let filtered = SNACKY_PRODUCTS;
  if (q) {
    filtered = SNACKY_PRODUCTS.filter(p => {
      const titleMatch = (p.title || '').toLowerCase().includes(q);
      const catMatch = (p.category || '').toLowerCase().includes(q);
      const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      const descInfo = getProductDetailsInfo(p);
      const descMatch = (descInfo.description || '').toLowerCase().includes(q) || (descInfo.ingredients || '').toLowerCase().includes(q);
      return titleMatch || catMatch || tagMatch || descMatch;
    });
  }

  // Update Header & Badge
  if (queryHeader) {
    queryHeader.textContent = q ? `Results for "${searchState.query}"` : 'All Snacks Catalog';
  }
  if (resultsCount) {
    resultsCount.textContent = `${filtered.length} product${filtered.length === 1 ? '' : 's'} found`;
  }

  // Handle Empty State
  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) {
      emptyState.classList.remove('display-none');
      const heading = document.getElementById('empty-search-heading');
      if (heading) heading.textContent = `No snacks found for "${searchState.query}"`;
    }
    return;
  }

  if (emptyState) emptyState.classList.add('display-none');

  let html = '';
  filtered.forEach((p, idx) => {
    const delay = Math.min(idx * 0.03, 0.35);
    html += `
      <div class="col search-card-appear" style="animation-delay: ${delay}s;">
        <div class="product-card">
          <div class="card-top-frame">
            <a href="product-detail.html?id=${p.id}">
              <img src="${p.image}" alt="${p.title}" class="product-card-img" loading="lazy">
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
              `<button class="btn-card-add-to-cart" onclick="addToCart(${p.id})">
                 <i class="bi bi-cart-plus-fill me-1"></i> ADD TO CART
               </button>` : 
              `<button class="btn-card-disabled" disabled>OUT OF STOCK</button>`}
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

function initSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q') || '';
  const focusParam = urlParams.get('focus');

  searchState.query = qParam.trim();

  // Populate nav search input with current query
  const navInput = document.getElementById('nav-search-input');
  if (navInput) {
    navInput.value = searchState.query;
    const clearBtn = navInput.parentElement.querySelector('.nav-search-clear-btn');
    if (clearBtn) {
      if (searchState.query) clearBtn.classList.add('is-visible');
      else clearBtn.classList.remove('is-visible');
    }
    if (focusParam === '1') {
      setTimeout(() => {
        navInput.focus();
        navInput.setSelectionRange(navInput.value.length, navInput.value.length);
      }, 80);
    }
  }

  // Initial load with smooth loading skeleton shimmer
  renderSearchResults(true, 420);
}

// --------------------------------------------------------------------------
// Navbar Search Engine (Smooth Loading & Instant Full Page Search)
// --------------------------------------------------------------------------
let navSearchDebounceTimer = null;

function initNavbarLiveSearch() {
  const containers = document.querySelectorAll('.nav-search-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const input = container.querySelector('.nav-search-input');
    if (!input) return;

    // Check or create Clear Button ('✕')
    let clearBtn = container.querySelector('.nav-search-clear-btn');
    if (!clearBtn) {
      clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'nav-search-clear-btn';
      clearBtn.setAttribute('aria-label', 'Clear search');
      clearBtn.innerHTML = '✕';
      container.appendChild(clearBtn);
    }

    const trigger = container.querySelector('.nav-search-icon');

    function performFullPageSearch(query) {
      const q = (query || '').trim();
      if (document.getElementById('search-results-grid')) {
        // Already on search.html: filter full-page grid directly with smooth loading shimmer
        searchState.query = q.toLowerCase();
        if (history.replaceState) {
          const newUrl = q ? `search.html?q=${encodeURIComponent(q)}` : 'search.html';
          history.replaceState(null, '', newUrl);
        }
        renderSearchResults(true, 380);
      } else {
        // On another page: navigate to full search page with focus
        if (q) {
          window.location.href = `search.html?q=${encodeURIComponent(q)}&focus=1`;
        } else {
          window.location.href = `search.html`;
        }
      }
    }

    // Input Event with smooth typing buffer and loading effect
    input.addEventListener('input', () => {
      const val = input.value;
      if (val.trim().length > 0) {
        clearBtn.classList.add('is-visible');
      } else {
        clearBtn.classList.remove('is-visible');
      }

      if (navSearchDebounceTimer) {
        clearTimeout(navSearchDebounceTimer);
      }

      if (document.getElementById('search-results-grid')) {
        // On search.html: show shimmer loading, then render results
        renderSearchSkeleton(document.getElementById('search-results-grid'), 8);
        
        // Spin search icon during active debounce
        if (trigger) trigger.classList.add('search-icon-loading');
        const resultsCount = document.getElementById('search-results-count');
        if (resultsCount) {
          resultsCount.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" style="width: 0.85rem; height: 0.85rem;"></span> Searching...`;
        }

        navSearchDebounceTimer = setTimeout(() => {
          if (trigger) trigger.classList.remove('search-icon-loading');
          searchState.query = val.trim().toLowerCase();
          if (history.replaceState) {
            const newUrl = val.trim() ? `search.html?q=${encodeURIComponent(val.trim())}` : 'search.html';
            history.replaceState(null, '', newUrl);
          }
          actuallyRenderSearchResults(
            document.getElementById('search-results-grid'),
            document.getElementById('search-query-header'),
            document.getElementById('search-results-count'),
            document.getElementById('empty-search-state')
          );
        }, 360);
      } else {
        // On other pages: comfortable typing buffer (550ms) so user can type smoothly before redirect
        if (val.trim().length > 0) {
          navSearchDebounceTimer = setTimeout(() => {
            window.location.href = `search.html?q=${encodeURIComponent(val.trim())}&focus=1`;
          }, 550);
        }
      }
    });

    // Keydown Event (Enter key navigates/searches immediately)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (navSearchDebounceTimer) clearTimeout(navSearchDebounceTimer);
        performFullPageSearch(input.value);
      }
    });

    // Clear Button Click: reset search and full page
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navSearchDebounceTimer) clearTimeout(navSearchDebounceTimer);
      input.value = '';
      clearBtn.classList.remove('is-visible');
      input.focus();

      if (document.getElementById('search-results-grid')) {
        searchState.query = '';
        if (history.replaceState) {
          history.replaceState(null, '', 'search.html');
        }
        renderSearchResults(true, 300);
      }
    });

    // Search Icon Trigger Click
    if (trigger) {
      trigger.style.cursor = 'pointer';
      trigger.addEventListener('click', () => {
        if (navSearchDebounceTimer) clearTimeout(navSearchDebounceTimer);
        if (input.value.trim()) {
          performFullPageSearch(input.value);
        } else {
          input.focus();
        }
      });
    }
  });

  // Mobile Search Bar Toggle & Handling
  const mobileToggleBtn = document.getElementById('mobile-search-toggle-btn');
  const mobileDropdown = document.getElementById('mobile-search-dropdown');
  const mobileInput = document.getElementById('mobile-search-input');
  const mobileCloseBtn = document.getElementById('mobile-search-close-btn');

  if (mobileToggleBtn && mobileDropdown && mobileInput) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDropdown.classList.toggle('is-open');
      if (mobileDropdown.classList.contains('is-open')) {
        setTimeout(() => mobileInput.focus(), 80);
      }
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', () => {
        mobileDropdown.classList.remove('is-open');
      });
    }

    mobileInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = mobileInput.value.trim();
        if (val) {
          window.location.href = `search.html?q=${encodeURIComponent(val)}&focus=1`;
        }
      }
    });
  }
}

// --------------------------------------------------------------------------
// Product Detail Page
// --------------------------------------------------------------------------
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id');
  const prod = findProductByIdOrSlug(paramId) || SNACKY_PRODUCTS[1]; // default Millet Chakli (id 102)

  const baseWeightNum = parseInt(prod.weight) || 100;
  const unitSuffix = (prod.weight && prod.weight.replace(/[0-9\s]/g, '')) || 'g';

  const halfWeight = Math.round(baseWeightNum * 0.5);
  const doubleWeight = Math.round(baseWeightNum * 2);
  const megaWeight = (baseWeightNum * 5 >= 1000 && unitSuffix === 'g') ? (baseWeightNum * 5 / 1000) + ' kg' : `${Math.round(baseWeightNum * 5)} ${unitSuffix}`;

  const weightOptions = [
    { weight: `${halfWeight} ${unitSuffix}`, mult: 0.55, label: `${halfWeight}${unitSuffix}` },
    { weight: prod.weight, mult: 1.0, label: prod.weight.replace(/\s+/g, ''), active: true },
    { weight: `${doubleWeight} ${unitSuffix}`, mult: 1.9, label: `${doubleWeight}${unitSuffix}` },
    { weight: megaWeight, mult: 4.5, label: megaWeight.replace(/\s+/g, '') }
  ];

  let selectedWeightMultiplier = 1;
  let selectedWeightText = prod.weight;
  let quantityVal = 1;

  const detailTitle = document.getElementById('detail-title');
  const detailMainImg = document.getElementById('detail-main-image');
  const breadcrumbCat = document.getElementById('breadcrumb-category');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  const tagBadge = document.getElementById('detail-tag-badge');
  const detailDesc = document.getElementById('detail-description');
  const detailIng = document.getElementById('detail-ingredients');
  const detailShelfLife = document.getElementById('detail-shelf-life');
  const detailDietPref = document.getElementById('detail-diet-preference');

  const productInfo = getProductDetailsInfo(prod);

  if (detailTitle) detailTitle.textContent = prod.title;
  if (detailMainImg) detailMainImg.src = prod.image;
  if (breadcrumbCat) {
    breadcrumbCat.textContent = prod.category.toUpperCase();
    breadcrumbCat.href = `products.html?category=${prod.category}`;
  }
  if (breadcrumbTitle) breadcrumbTitle.textContent = prod.title;
  if (tagBadge) tagBadge.textContent = prod.tags && prod.tags.length ? prod.tags[0] : '100% Groundnut Oil';
  if (detailDesc) detailDesc.textContent = productInfo.description;
  if (detailIng) detailIng.textContent = productInfo.ingredients;
  if (detailShelfLife) detailShelfLife.textContent = productInfo.shelfLife;
  if (detailDietPref) detailDietPref.innerHTML = `<span class="text-success fw-bold"><i class="bi bi-circle-fill me-1 font-size-10px"></i> ${productInfo.dietPreference}</span>`;

  document.title = `${prod.title} - Snacky`;

  const weightPillsContainer = document.getElementById('weight-selector-pills');
  if (weightPillsContainer) {
    weightPillsContainer.innerHTML = weightOptions.map(opt => `
      <button type="button" class="weight-pill-btn ${opt.active ? 'active' : ''}" data-weight="${opt.weight}" data-mult="${opt.mult}">${opt.label}</button>
    `).join('');
  }

  function updatePriceDisplay() {
    const unitPrice = Math.round(prod.price * selectedWeightMultiplier);
    const unitMrp = Math.round((prod.mrp || (prod.price + 20)) * selectedWeightMultiplier);
    const totalPrice = unitPrice * quantityVal;
    const totalMrp = unitMrp * quantityVal;

    const sellingPriceEl = document.getElementById('detail-price-selling');
    const mrpPriceEl = document.getElementById('detail-price-mrp');
    const discountTagEl = document.getElementById('detail-discount-tag');
    const unitValEl = document.getElementById('detail-unit-val');

    if (sellingPriceEl) sellingPriceEl.textContent = `₹ ${totalPrice.toFixed(2)}`;
    if (mrpPriceEl) mrpPriceEl.textContent = `₹ ${totalMrp.toFixed(2)}`;
    if (discountTagEl) discountTagEl.textContent = `${prod.discount || 20}% OFF`;
    if (unitValEl) unitValEl.textContent = selectedWeightText;
  }

  const weightPills = document.querySelectorAll('.weight-pill-btn');
  weightPills.forEach(pill => {
    pill.addEventListener('click', () => {
      weightPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedWeightMultiplier = parseFloat(pill.dataset.mult) || 1;
      selectedWeightText = pill.dataset.weight || prod.weight;
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
    const newBtn = detailAddToCartBtn.cloneNode(true);
    detailAddToCartBtn.parentNode.replaceChild(newBtn, detailAddToCartBtn);
    newBtn.addEventListener('click', () => {
      const unitSellingPrice = Math.round(prod.price * selectedWeightMultiplier);
      const unitMrp = Math.round((prod.mrp || (prod.price + 20)) * selectedWeightMultiplier);
      addToCart(prod.id, selectedWeightText, quantityVal, unitSellingPrice, unitMrp);
    });
  }

  const thumbnailStrip = document.querySelector('.thumbnail-strip');
  if (thumbnailStrip) {
    const galleryImages = [
      { src: prod.image, label: "Front of Pack" },
      { src: prod.backImage || prod.image, label: "Back of Pack (Nutrition & Details)" }
    ];

    thumbnailStrip.innerHTML = galleryImages.map((g, idx) => `
      <div class="thumbnail-box ${idx === 0 ? 'active' : ''}" title="${g.label}">
        <img src="${g.src}" alt="${prod.title} - ${g.label}" class="thumbnail-img">
      </div>
    `).join('');

    const thumbnails = thumbnailStrip.querySelectorAll('.thumbnail-box');
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const img = thumb.querySelector('img');
        if (img && detailMainImg) detailMainImg.src = img.src;
      });
    });
  }

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

  // Render product-specific reviews & 4 related products in same category
  currentDetailPageProduct = prod;
  renderProductReviews(prod);
  renderRelatedProducts(prod);
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



// Auth Page
function initAuthPage() {
  const authWrapper = document.getElementById('auth-card-wrapper') || document.getElementById('view-signin') || document.querySelector('.auth-card-container');
  if (!authWrapper) return;
  if (authWrapper.dataset.authInitialized === 'true') return;
  authWrapper.dataset.authInitialized = 'true';

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const signinView = document.getElementById('view-signin');
  const signupView = document.getElementById('view-signup');
  const loggedInView = document.getElementById('view-logged-in');

  if (isLoggedIn && loggedInView) {
    if (signinView) signinView.classList.add('d-none');
    if (signupView) signupView.classList.add('d-none');
    loggedInView.classList.remove('d-none');

    const userName = localStorage.getItem('userName') || snackyUser.name || "Customer";
    const titleEl = document.getElementById('logged-in-user-title');
    if (titleEl) titleEl.innerText = `Welcome, ${userName}!`;
    return;
  }

  const phoneStep = document.getElementById('auth-step-phone');
  const otpStep = document.getElementById('auth-step-otp');
  const continuePhoneBtn = document.getElementById('auth-continue-phone-btn');
  const verifyOtpBtn = document.getElementById('auth-verify-otp-btn');
  const signinPhoneInput = document.getElementById('auth-phone-input');
  const signupPhoneInput = document.getElementById('signup-phone-input');
  const signupNameInput = document.getElementById('signup-name-input');

  let tempPhone = "";

  // Real-time strict character sanitization
  if (signinPhoneInput) {
    signinPhoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
  }
  if (signupPhoneInput) {
    signupPhoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
  }
  if (signupNameInput) {
    signupNameInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });
  }

  // Helper to handle OTP inputs with only numeric entry & auto-advance
  function setupOtpDigitInputs(containerSelector) {
    const inputs = document.querySelectorAll(`${containerSelector} .otp-digit-input`);
    inputs.forEach((digitInput, idx) => {
      digitInput.addEventListener('input', (e) => {
        digitInput.value = digitInput.value.replace(/\D/g, '').slice(0, 1);
        if (digitInput.value.length === 1 && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
      });

      digitInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!digitInput.value && idx > 0) {
            inputs[idx - 1].focus();
          }
        } else if (e.key === 'ArrowLeft' && idx > 0) {
          inputs[idx - 1].focus();
        } else if (e.key === 'ArrowRight' && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
      });

      digitInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (pasted) {
          pasted.split('').slice(0, inputs.length).forEach((ch, i) => {
            inputs[i].value = ch;
          });
          const targetIndex = Math.min(pasted.length, inputs.length - 1);
          inputs[targetIndex].focus();
        }
      });
    });
  }

  setupOtpDigitInputs('#auth-step-otp');
  setupOtpDigitInputs('#signup-step-otp');

  if (signinPhoneInput && continuePhoneBtn) {
    signinPhoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        continuePhoneBtn.click();
      }
    });
  }

  if (signupPhoneInput) {
    signupPhoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        proceedToSignupOtp();
      }
    });
  }

  if (continuePhoneBtn && phoneStep && otpStep) {
    continuePhoneBtn.addEventListener('click', () => {
      const phoneInput = document.getElementById('auth-phone-input');
      const val = phoneInput ? phoneInput.value.replace(/\D/g, '').trim() : '';
      if (val.length === 10) {
        tempPhone = val;
        phoneStep.classList.add('d-none');
        otpStep.classList.remove('d-none');
        const otpDigits = document.querySelectorAll('#auth-step-otp .otp-digit-input');
        ['1','2','3','4','5','6'].forEach((d, i) => {
          if (otpDigits[i]) otpDigits[i].value = d;
        });
        if (otpDigits[0]) otpDigits[0].focus();
        showToast("OTP sent to +91 " + tempPhone + "! (Code: 123456)");
      } else {
        showToast("Please enter a valid 10-digit mobile number (numbers only).");
        if (phoneInput) phoneInput.focus();
      }
    });
  }

  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', () => {
      const signinOtpDigits = document.querySelectorAll('#auth-step-otp .otp-digit-input');
      const code = Array.from(signinOtpDigits).map(d => d.value.trim()).join('');
      if (code === '123456' || code.length === 6 || code === '') {
        localStorage.setItem('isLoggedIn', 'true');
        const savedName = localStorage.getItem('userName') || (snackyUser && snackyUser.name) || "Customer";
        const phoneFormatted = tempPhone ? "+91 " + tempPhone : "+91 9876543210";
        snackyUser = {
          name: savedName,
          phone: phoneFormatted,
          email: savedName.toLowerCase().replace(/\s+/g, '') + "@snacky.com",
          dob: "1995-05-15"
        };
        localStorage.setItem('snacky_user', JSON.stringify(snackyUser));
        localStorage.setItem('userName', savedName);
        syncAuthNavbar();
        showToast("🎉 Login Successful! Welcome back!");
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
      } else {
        showToast("Invalid OTP. Try 123456.");
      }
    });
  }
}

function toggleAuthView(viewName) {
  const signinView = document.getElementById('view-signin');
  const signupView = document.getElementById('view-signup');
  const btnSignin = document.getElementById('btn-toggle-signin');
  const btnSignup = document.getElementById('btn-toggle-signup');

  if (viewName === 'signup') {
    if (signinView) signinView.classList.add('d-none');
    if (signupView) signupView.classList.remove('d-none');
    if (btnSignin) btnSignin.classList.remove('active');
    if (btnSignup) btnSignup.classList.add('active');
    const signupName = document.getElementById('signup-name-input');
    if (signupName) signupName.focus();
  } else {
    if (signupView) signupView.classList.add('d-none');
    if (signinView) signinView.classList.remove('d-none');
    if (btnSignup) btnSignup.classList.remove('active');
    if (btnSignin) btnSignin.classList.add('active');
    const signinPhone = document.getElementById('auth-phone-input');
    if (signinPhone) signinPhone.focus();
  }
}

function proceedToSignupOtp() {
  const nameInput = document.getElementById('signup-name-input');
  const phoneInput = document.getElementById('signup-phone-input');

  const rawName = nameInput ? nameInput.value.trim() : '';
  const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';

  if (/[^a-zA-Z\s]/.test(rawName)) {
    showNameAlphabetError(nameInput, "Please write alphabets only (no numbers or special characters)");
    showToast("⚠️ Name must contain alphabets only!");
    nameInput.focus();
    return;
  }

  const nameVal = rawName.replace(/[^a-zA-Z\s]/g, '');

  if (!nameVal || nameVal.length < 2) {
    showNameAlphabetError(nameInput, "Please write your full name (alphabets only)");
    showToast("Please enter a valid full name (minimum 2 alphabets)!");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phoneVal || phoneVal.length !== 10) {
    showToast("Please enter a valid 10-digit mobile number (numbers only)!");
    if (phoneInput) phoneInput.focus();
    return;
  }

  const fieldsStep = document.getElementById('signup-step-fields');
  const otpStep = document.getElementById('signup-step-otp');
  const signupOtpDigits = document.querySelectorAll('.signup-otp');

  if (fieldsStep) fieldsStep.classList.add('d-none');
  if (otpStep) otpStep.classList.remove('d-none');
  ['1','2','3','4','5','6'].forEach((d, i) => {
    if (signupOtpDigits[i]) signupOtpDigits[i].value = d;
  });
  if (signupOtpDigits[0]) signupOtpDigits[0].focus();

  showToast("OTP sent to +91 " + phoneVal + "! (Code: 123456)");
}

function completeCustomAuthSignup() {
  const nameInput = document.getElementById('signup-name-input');
  const phoneInput = document.getElementById('signup-phone-input');

  const nameVal = nameInput ? nameInput.value.trim().replace(/[^a-zA-Z\s]/g, '') || 'Customer' : 'Customer';
  const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') || '9876543210' : '9876543210';
  const signupOtpDigits = document.querySelectorAll('.signup-otp');
  const code = Array.from(signupOtpDigits).map(d => d.value.trim()).join('');

  if (code && code !== '123456' && code.length < 6) {
    showToast("Please enter valid 6-digit OTP! (Use code 123456)");
    return;
  }

  localStorage.setItem('isLoggedIn', 'true');
  const newUser = {
    name: nameVal,
    phone: "+91 " + phoneVal,
    email: nameVal.toLowerCase().replace(/\s+/g, '') + "@snacky.com",
    dob: "1998-08-15"
  };
  localStorage.setItem('snacky_user', JSON.stringify(newUser));
  localStorage.setItem('userName', nameVal);
  syncAuthNavbar();
  showToast(`🎉 Account Created for ${nameVal}! Redirecting to Home...`);
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// --------------------------------------------------------------------------
// Clean & Spacious Profile Dashboard Logic
// --------------------------------------------------------------------------
function switchProfileTab(tabName) {
  const tabs = ['personal', 'addresses', 'orders'];
  const tabMap = {
    'personal': 'section-personal-info',
    'addresses': 'section-saved-addresses',
    'orders': 'section-delivered-orders'
  };

  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const section = document.getElementById(tabMap[t]);
    if (btn) btn.classList.remove('active');
    if (section) section.classList.add('d-none');
  });

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  const activeSection = document.getElementById(tabMap[tabName]);

  if (activeBtn) activeBtn.classList.add('active');
  if (activeSection) {
    activeSection.classList.remove('d-none');
  }

  // If switching to addresses, re-render address cards
  if (tabName === 'addresses') {
    renderProfileAddresses();
  } else if (tabName === 'orders') {
    renderProfileOrders();
  }
}

// Profile Page Initializer
function initProfilePage() {
  const profileWrapper = document.getElementById('profile-wrapper');
  if (!profileWrapper) return;

  cleanupDefaultSomdevAddress();

  // Load user data from localStorage
  const storedUserRaw = localStorage.getItem('snacky_user');
  if (storedUserRaw) {
    try {
      snackyUser = JSON.parse(storedUserRaw);
    } catch(e) {}
  }

  const nameInput = document.getElementById('profile-name-input');
  const emailInput = document.getElementById('profile-email-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const dobInput = document.getElementById('profile-dob-input');

  const headerName = document.getElementById('header-user-name');
  const headerPhone = document.getElementById('header-user-phone');
  const headerEmail = document.getElementById('header-user-email');
  const avatarInitial = document.getElementById('profile-avatar-initial');

  const currentName = snackyUser.name || localStorage.getItem('userName') || "Customer";
  const currentPhone = snackyUser.phone || "+91 9876543210";
  const currentEmail = snackyUser.email || "user@snacky.com";
  const currentDob = snackyUser.dob || "1998-05-15";

  if (headerName) headerName.innerText = `Welcome, ${currentName}!`;
  if (headerPhone) headerPhone.innerHTML = `<i class="bi bi-telephone me-1 text-warning"></i> ${currentPhone}`;
  if (headerEmail) headerEmail.innerHTML = `<i class="bi bi-envelope me-1 text-warning"></i> ${currentEmail}`;
  if (avatarInitial) {
    const initialChar = currentName.trim().charAt(0).toUpperCase();
    avatarInitial.innerText = initialChar || '👤';
  }

  if (nameInput) nameInput.value = currentName;
  if (emailInput) emailInput.value = currentEmail;
  if (phoneInput) phoneInput.value = currentPhone.replace('+91', '').trim();
  if (dobInput) dobInput.value = currentDob;

  // Handle URL hash tab routing
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('address')) {
    switchProfileTab('addresses');
  } else if (hash.includes('order') || hash.includes('review')) {
    switchProfileTab('orders');
  } else {
    switchProfileTab('personal');
  }

  renderProfileAddresses();
  renderProfileOrders();
}

function saveUserProfile() {
  const nameInput = document.getElementById('profile-name-input');
  const emailInput = document.getElementById('profile-email-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const dobInput = document.getElementById('profile-dob-input');

  const rawName = nameInput ? nameInput.value.trim() : '';
  const emailVal = emailInput ? emailInput.value.trim() : '';
  const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
  const dobVal = dobInput ? dobInput.value : '';

  if (/[^a-zA-Z\s]/.test(rawName)) {
    showNameAlphabetError(nameInput, "Please write alphabets only (no numbers or special characters)");
    showToast("⚠️ Name must contain alphabets only!");
    nameInput.focus();
    return;
  }

  const nameVal = rawName.replace(/[^a-zA-Z\s]/g, '');

  if (!nameVal || nameVal.length < 2) {
    showNameAlphabetError(nameInput, "Please write your full name (alphabets only)");
    showToast("Please enter a valid full name (minimum 2 alphabets)!");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!emailVal || !emailVal.includes('@')) {
    showToast("Please enter a valid email address!");
    if (emailInput) emailInput.focus();
    return;
  }
  if (!phoneVal || phoneVal.length !== 10) {
    showToast("Please enter a valid 10-digit mobile number!");
    if (phoneInput) phoneInput.focus();
    return;
  }

  snackyUser = {
    name: nameVal,
    email: emailVal,
    phone: "+91 " + phoneVal,
    dob: dobVal || "1998-05-15"
  };

  localStorage.setItem('snacky_user', JSON.stringify(snackyUser));
  localStorage.setItem('userName', nameVal);

  const headerName = document.getElementById('header-user-name');
  const headerPhone = document.getElementById('header-user-phone');
  const headerEmail = document.getElementById('header-user-email');
  const avatarInitial = document.getElementById('profile-avatar-initial');

  if (headerName) headerName.innerText = `Welcome, ${nameVal}!`;
  if (headerPhone) headerPhone.innerHTML = `<i class="bi bi-telephone me-1 text-warning"></i> +91 ${phoneVal}`;
  if (headerEmail) headerEmail.innerHTML = `<i class="bi bi-envelope me-1 text-warning"></i> ${emailVal}`;
  if (avatarInitial) avatarInitial.innerText = nameVal.trim().charAt(0).toUpperCase();

  syncAuthNavbar();
  showToast("🎉 Profile updated successfully!");
}

function handleUserLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('snacky_user');
  localStorage.removeItem('userName');
  snackyUser = { name: "", email: "", phone: "", dob: "" };
  syncAuthNavbar();
  showToast("Logged out successfully.");
  if (window.location.pathname.includes('profile.html')) {
    setTimeout(() => {
      window.location.href = 'auth.html';
    }, 800);
  }
}

// --------------------------------------------------------------------------
// Profile Saved Delivery Address Management
// --------------------------------------------------------------------------
function cleanupDefaultSomdevAddress() {
  try {
    const raw = localStorage.getItem('snacky_addresses');
    if (raw) {
      let parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter(a => !((a.name || '').toLowerCase().includes('somdev')) && a.id !== 'addr_default_1');
        if (filtered.length !== parsed.length) {
          localStorage.setItem('snacky_addresses', JSON.stringify(filtered));
        }
      }
    }
    const singleRaw = localStorage.getItem('snacky_address');
    if (singleRaw) {
      const single = JSON.parse(singleRaw);
      if (single && (((single.name || '').toLowerCase().includes('somdev')) || single.id === 'addr_default_1')) {
        localStorage.removeItem('snacky_address');
      }
    }
  } catch(e) {}
}

function getSavedAddresses() {
  cleanupDefaultSomdevAddress();
  try {
    const raw = localStorage.getItem('snacky_addresses');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter(a => !((a.name || '').toLowerCase().includes('somdev')) && a.id !== 'addr_default_1');
      }
    }
  } catch (e) {}

  // Check if a valid single snacky_address exists in localStorage
  const singleRaw = localStorage.getItem('snacky_address');
  if (singleRaw) {
    try {
      const single = JSON.parse(singleRaw);
      if (single && single.name && !single.name.toLowerCase().includes('somdev') && single.id !== 'addr_default_1') {
        const migrated = [{
          id: single.id || 'addr_' + Date.now(),
          name: single.name,
          phone: single.phone || '',
          pincode: single.pincode || '',
          city: single.city || '',
          state: single.state || '',
          house: single.house || '',
          area: single.area || '',
          addressType: single.addressType || 'HOME',
          isDefault: true,
          fullText: single.fullText || `${single.house || ''}, ${single.area || ''}, ${single.city || ''}, ${single.state || ''} - ${single.pincode || ''}`
        }];
        localStorage.setItem('snacky_addresses', JSON.stringify(migrated));
        return migrated;
      }
    } catch(e) {}
  }

  // Do not auto-seed dummy addresses
  return [];
}

function renderProfileAddresses() {
  const container = document.getElementById('profile-saved-addresses-list');
  if (!container) return;

  const addresses = getSavedAddresses();

  if (addresses.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="text-center py-5 border rounded-4 bg-light">
          <div class="display-6 mb-2">📍</div>
          <h6 class="fw-extrabold text-navy mb-1">No Saved Addresses Found</h6>
          <p class="text-muted small mb-3">Add a delivery address for lightning fast checkouts.</p>
          <button class="btn btn-snacky-primary px-4 py-2 fw-bold" onclick="openProfileAddressForm()">
            <i class="bi bi-plus-lg me-1"></i> Add New Address
          </button>
        </div>
      </div>`;
    return;
  }

  let html = '';
  addresses.forEach((addr) => {
    const isDefault = !!addr.isDefault;
    const typeLabel = (addr.addressType || 'HOME').toUpperCase();
    const iconClass = typeLabel === 'WORK' ? 'bi-briefcase' : (typeLabel === 'OTHER' ? 'bi-geo-alt' : 'bi-house-door');
    const fullText = addr.fullText || `${addr.house}, ${addr.area}, ${addr.city}, ${addr.state} - ${addr.pincode}`;

    html += `
      <div class="col-md-6">
        <div class="profile-address-card ${isDefault ? 'is-default' : ''}">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-navy text-white address-type-badge"><i class="bi ${iconClass} me-1"></i> ${typeLabel}</span>
              ${isDefault ? `<span class="address-default-badge"><i class="bi bi-check-circle-fill me-1"></i> DEFAULT</span>` : ''}
            </div>
            <h6 class="fw-bold text-navy mb-1">${addr.name}</h6>
            <p class="small text-muted mb-2">${fullText}</p>
            <div class="small fw-bold text-navy mb-3"><i class="bi bi-telephone me-1 text-muted"></i> ${addr.phone}</div>
          </div>
          <div class="d-flex gap-2 flex-wrap pt-2 border-top">
            <button type="button" class="btn btn-sm btn-outline-secondary py-1 px-3 fw-bold flex-grow-1" onclick="editProfileAddress('${addr.id}')">
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            ${!isDefault ? `
              <button type="button" class="btn btn-sm btn-outline-navy py-1 px-2 fw-bold" onclick="setDefaultProfileAddress('${addr.id}')">
                <i class="bi bi-star me-1"></i> Set Default
              </button>` : ''}
            <button type="button" class="btn btn-sm btn-outline-danger py-1 px-2 fw-bold" onclick="deleteProfileAddress('${addr.id}')" title="Delete Address">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

function openProfileAddressForm(addrId = null) {
  const formCard = document.getElementById('profile-address-form-card');
  const formTitle = document.getElementById('profile-address-form-title');
  const idInput = document.getElementById('profile-addr-id');
  const nameInput = document.getElementById('profile-addr-name');
  const phoneInput = document.getElementById('profile-addr-phone');
  const pinInput = document.getElementById('profile-addr-pincode');
  const cityInput = document.getElementById('profile-addr-city');
  const stateInput = document.getElementById('profile-addr-state');
  const houseInput = document.getElementById('profile-addr-house');
  const areaInput = document.getElementById('profile-addr-area');
  const defaultCheck = document.getElementById('profile-addr-is-default');

  if (!formCard) return;
  formCard.classList.remove('d-none');

  if (addrId) {
    const addresses = getSavedAddresses();
    const addr = addresses.find(a => a.id === addrId);
    if (addr) {
      if (formTitle) formTitle.textContent = "Edit Delivery Address";
      if (idInput) idInput.value = addr.id;
      if (nameInput) nameInput.value = addr.name || '';
      if (phoneInput) phoneInput.value = (addr.phone || '').replace('+91', '').trim();
      if (pinInput) pinInput.value = addr.pincode || '';
      if (cityInput) cityInput.value = addr.city || '';
      if (stateInput) stateInput.value = addr.state || '';
      if (houseInput) houseInput.value = addr.house || '';
      if (areaInput) areaInput.value = addr.area || '';
      if (defaultCheck) defaultCheck.checked = !!addr.isDefault;

      const typeRadio = document.querySelector(`input[name="profileAddressTypeRadio"][value="${addr.addressType || 'HOME'}"]`);
      if (typeRadio) typeRadio.checked = true;
    }
  } else {
    if (formTitle) formTitle.textContent = "Add New Delivery Address";
    if (idInput) idInput.value = "";
    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (pinInput) pinInput.value = "";
    if (cityInput) cityInput.value = "";
    if (stateInput) stateInput.value = "";
    if (houseInput) houseInput.value = "";
    if (areaInput) areaInput.value = "";
    if (defaultCheck) defaultCheck.checked = true;
    const homeRadio = document.getElementById('p-addr-type-home');
    if (homeRadio) homeRadio.checked = true;
  }

  formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (nameInput) setTimeout(() => nameInput.focus(), 300);
}

function closeProfileAddressForm() {
  const formCard = document.getElementById('profile-address-form-card');
  if (formCard) formCard.classList.add('d-none');
}

function saveAddressFromProfile() {
  const idInput = document.getElementById('profile-addr-id');
  const nameInput = document.getElementById('profile-addr-name');
  const phoneInput = document.getElementById('profile-addr-phone');
  const pinInput = document.getElementById('profile-addr-pincode');
  const cityInput = document.getElementById('profile-addr-city');
  const stateInput = document.getElementById('profile-addr-state');
  const houseInput = document.getElementById('profile-addr-house');
  const areaInput = document.getElementById('profile-addr-area');
  const defaultCheck = document.getElementById('profile-addr-is-default');

  const addrId = idInput ? idInput.value : '';
  const rawName = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
  const pincode = pinInput ? pinInput.value.trim().replace(/\D/g, '') : '';
  const city = cityInput ? cityInput.value.trim() : '';
  const state = stateInput ? stateInput.value.trim() : '';
  const house = houseInput ? houseInput.value.trim() : '';
  const area = areaInput ? areaInput.value.trim() : '';
  const isDefault = defaultCheck ? defaultCheck.checked : false;

  let addressType = 'HOME';
  const typeRadio = document.querySelector('input[name="profileAddressTypeRadio"]:checked');
  if (typeRadio) addressType = typeRadio.value;

  if (/[^a-zA-Z\s]/.test(rawName)) {
    showNameAlphabetError(nameInput, "Please write alphabets only (no numbers or special characters)");
    showToast("⚠️ Receiver's Name must contain alphabets only!");
    nameInput.focus();
    return;
  }

  const name = rawName.replace(/[^a-zA-Z\s]/g, '');

  if (!name || name.length < 2) {
    showNameAlphabetError(nameInput, "Please write receiver's full name (alphabets only)");
    showToast("Please enter receiver's full name!");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phone || phone.length !== 10) {
    showToast("Please enter a valid 10-digit mobile number!");
    if (phoneInput) phoneInput.focus();
    return;
  }
  if (!pincode || pincode.length !== 6) {
    showToast("Please enter a valid 6-digit pincode!");
    if (pinInput) pinInput.focus();
    return;
  }
  if (!city) {
    showToast("Please enter city!");
    if (cityInput) cityInput.focus();
    return;
  }
  if (!state) {
    showToast("Please enter state!");
    if (stateInput) stateInput.focus();
    return;
  }
  if (!house) {
    showToast("Please enter house or building details!");
    if (houseInput) houseInput.focus();
    return;
  }
  if (!area) {
    showToast("Please enter area or street name!");
    if (areaInput) areaInput.focus();
    return;
  }

  const fullText = `${house}, ${area}, ${city}, ${state} - ${pincode}`;
  let addresses = getSavedAddresses();

  const newAddressObj = {
    id: addrId || ('addr_' + Date.now()),
    name,
    phone: "+91 " + phone,
    pincode,
    city,
    state,
    house,
    area,
    addressType,
    isDefault: isDefault || addresses.length === 0,
    fullText
  };

  if (newAddressObj.isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }

  if (addrId) {
    const idx = addresses.findIndex(a => a.id === addrId);
    if (idx > -1) {
      addresses[idx] = newAddressObj;
    } else {
      addresses.push(newAddressObj);
    }
  } else {
    addresses.push(newAddressObj);
  }

  // Guarantee at least one default
  if (!addresses.some(a => a.isDefault) && addresses.length > 0) {
    addresses[0].isDefault = true;
  }

  localStorage.setItem('snacky_addresses', JSON.stringify(addresses));

  // Sync active default address to snacky_address
  const defAddr = addresses.find(a => a.isDefault) || addresses[0];
  if (defAddr) {
    localStorage.setItem('snacky_address', JSON.stringify(defAddr));
  }

  closeProfileAddressForm();
  renderProfileAddresses();
  showToast("🎉 Address saved successfully!");
}

function editProfileAddress(addrId) {
  openProfileAddressForm(addrId);
}

function deleteProfileAddress(addrId) {
  let addresses = getSavedAddresses();
  if (addresses.length <= 1) {
    showToast("At least one address must be kept in your profile!");
    return;
  }

  addresses = addresses.filter(a => a.id !== addrId);
  if (!addresses.some(a => a.isDefault) && addresses.length > 0) {
    addresses[0].isDefault = true;
  }

  localStorage.setItem('snacky_addresses', JSON.stringify(addresses));

  const defAddr = addresses.find(a => a.isDefault) || addresses[0];
  if (defAddr) {
    localStorage.setItem('snacky_address', JSON.stringify(defAddr));
  }

  renderProfileAddresses();
  showToast("Address removed.");
}

function setDefaultProfileAddress(addrId) {
  let addresses = getSavedAddresses();
  addresses.forEach(a => {
    a.isDefault = (a.id === addrId);
  });

  localStorage.setItem('snacky_addresses', JSON.stringify(addresses));

  const defAddr = addresses.find(a => a.isDefault);
  if (defAddr) {
    localStorage.setItem('snacky_address', JSON.stringify(defAddr));
  }

  renderProfileAddresses();
  showToast("Set as default delivery address.");
}

// --------------------------------------------------------------------------
// Contact Page Inquiry & Bulk Order Handlers
// --------------------------------------------------------------------------
function handleContactFormSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('contact-full-name');
  const emailInput = document.getElementById('contact-email-addr');
  const phoneInput = document.getElementById('contact-phone-num');
  const subjectInput = document.getElementById('contact-subject-select');
  const messageInput = document.getElementById('contact-message-body');
  const alertEl = document.getElementById('formSuccessAlert');

  const rawName = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const subject = subjectInput ? subjectInput.value : 'General Inquiry';
  const message = messageInput ? messageInput.value.trim() : '';

  if (/[^a-zA-Z\s]/.test(rawName)) {
    showNameAlphabetError(nameInput, "Please write alphabets only (no numbers or special characters)");
    showToast("⚠️ Full Name must contain alphabets only!");
    nameInput.focus();
    return;
  }

  const name = rawName.replace(/[^a-zA-Z\s]/g, '');

  if (!name || name.length < 2) {
    showNameAlphabetError(nameInput, "Please write your full name (alphabets only)");
    showToast("Please enter your full name!");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!email || !email.includes('@')) {
    showToast("Please enter a valid email address!");
    if (emailInput) emailInput.focus();
    return;
  }
  if (!phone || phone.length !== 10) {
    showToast("Please enter a valid 10-digit phone number!");
    if (phoneInput) phoneInput.focus();
    return;
  }
  if (!message) {
    showToast("Please type your inquiry message!");
    if (messageInput) messageInput.focus();
    return;
  }

  // Save to localStorage 'snacky_inquiries'
  const newInquiry = {
    id: 'INQ-' + Date.now(),
    name,
    email,
    phone,
    subject,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const existingInquiries = JSON.parse(localStorage.getItem('snacky_inquiries') || '[]');
    existingInquiries.push(newInquiry);
    localStorage.setItem('snacky_inquiries', JSON.stringify(existingInquiries));
  } catch(e) {}

  if (alertEl) {
    alertEl.classList.remove('d-none');
  }
  showToast("🎉 Thank you! Your message has been sent.");

  // Reset form
  const form = document.getElementById('contact-inquiry-form');
  if (form) form.reset();
}

function selectCorporateAndScroll() {
  const subjectSelect = document.getElementById('contact-subject-select');
  if (subjectSelect) {
    subjectSelect.value = 'Corporate & Bulk Order';
  }
  const formCard = document.getElementById('contact-inquiry-form-card');
  if (formCard) {
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const nameInput = document.getElementById('contact-full-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 500);
  }
}

// --------------------------------------------------------------------------
// 2-Step Checkout Flow Logic (1. Address -> 2. Payment Page)
// --------------------------------------------------------------------------
function toggleEditAddressForm() {
  const formCard = document.getElementById('checkout-address-form-card');
  const formTitle = document.getElementById('address-form-title');
  if (formCard) {
    formCard.classList.remove('d-none');
    if (formTitle) formTitle.textContent = "Edit Delivery Details";
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const nameInput = document.getElementById('input-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 300);
  }
}

function saveNewAddressAndShip() {
  const nameInput = document.getElementById('input-name');
  const phoneInput = document.getElementById('input-phone');
  const pincodeInput = document.getElementById('input-pincode');
  const cityInput = document.getElementById('input-city');
  const stateInput = document.getElementById('input-state');
  const houseInput = document.getElementById('input-house');
  const areaInput = document.getElementById('input-area');

  const rawName = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
  const pincode = pincodeInput ? pincodeInput.value.trim().replace(/\D/g, '') : '';
  const city = cityInput ? cityInput.value.trim() : '';
  const state = stateInput ? stateInput.value.trim() : '';
  const house = houseInput ? houseInput.value.trim() : '';
  const area = areaInput ? areaInput.value.trim() : '';

  // Address Type Radio
  let addressType = 'HOME';
  const selectedTypeRadio = document.querySelector('input[name="addressTypeRadio"]:checked');
  if (selectedTypeRadio) addressType = selectedTypeRadio.value;

  if (/[^a-zA-Z\s]/.test(rawName)) {
    showNameAlphabetError(nameInput, "Please write alphabets only (no numbers or special characters)");
    showToast("⚠️ Receiver's Name must contain alphabets only!");
    nameInput.focus();
    return;
  }

  const name = rawName.replace(/[^a-zA-Z\s]/g, '');

  if (!name || name.length < 2) {
    showNameAlphabetError(nameInput, "Please write recipient's full name (alphabets only)");
    showToast("Please enter recipient's full name!");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phone || phone.length !== 10) {
    showToast("Please enter a valid 10-digit mobile number!");
    if (phoneInput) phoneInput.focus();
    return;
  }
  if (!pincode || pincode.length !== 6) {
    showToast("Please enter a valid 6-digit pincode!");
    if (pincodeInput) pincodeInput.focus();
    return;
  }
  if (!city) {
    showToast("Please enter your city!");
    if (cityInput) cityInput.focus();
    return;
  }
  if (!state) {
    showToast("Please enter your state!");
    if (stateInput) stateInput.focus();
    return;
  }
  if (!house) {
    showToast("Please enter house, flat, or building number!");
    if (houseInput) houseInput.focus();
    return;
  }
  if (!area) {
    showToast("Please enter road name, area, or landmark!");
    if (areaInput) areaInput.focus();
    return;
  }

  const fullAddrText = `${house}, ${area}, ${city}, ${state} - ${pincode}`;
  const addressObj = {
    name,
    phone: "+91 " + phone,
    pincode,
    city,
    state,
    house,
    area,
    addressType,
    fullText: fullAddrText
  };

  // Save to localStorage
  localStorage.setItem('snacky_address', JSON.stringify(addressObj));

  showToast("🎉 Address Saved! Opening Payment Page...");
  setTimeout(() => {
    window.location.href = 'payment.html';
  }, 400);
}

function selectAddressAndProceed() {
  showToast("Address Confirmed! Opening Payment Page...");
  setTimeout(() => {
    window.location.href = 'payment.html';
  }, 350);
}

function switchPaymentTab(tabName) {
  const tabs = ['upi', 'card', 'cod', 'net'];
  tabs.forEach(t => {
    const link = document.getElementById(`tab-${t}-link`);
    const panel = document.getElementById(`panel-${t}`);
    if (link) link.classList.remove('active');
    if (panel) panel.classList.add('d-none');
  });

  const activeLink = document.getElementById(`tab-${tabName}-link`);
  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activeLink) activeLink.classList.add('active');
  if (activePanel) activePanel.classList.remove('d-none');
}

function processPaymentSuccess() {
  if (snackyCart.length === 0) {
    showToast("Your cart is empty! Please add snacks before paying.");
    return;
  }
  
  showToast("Processing payment securely...");

  // Build real order from active cart & address
  const orderNumber = "SNK-" + Math.floor(1000000 + Math.random() * 9000000);
  
  let userAddress = {
    name: "Customer",
    phone: "+91 9876543210",
    addressType: "HOME",
    fullAddress: "Flat 4B, Silver Oak Heights, Bistupur Main Road, Jamshedpur - 831001"
  };

  try {
    const savedAddrRaw = localStorage.getItem('snacky_address');
    if (savedAddrRaw) {
      const addr = JSON.parse(savedAddrRaw);
      if (addr && addr.name) {
        userAddress = {
          name: addr.name,
          phone: addr.phone || "+91 9876543210",
          addressType: addr.addressType || "HOME",
          fullAddress: addr.fullText || `${addr.house || ''}, ${addr.area || ''}, ${addr.city || ''} - ${addr.pincode || ''}`
        };
      }
    }
  } catch(e) {}

  let subtotal = 0;
  const orderItems = snackyCart.map(item => {
    const p = parseFloat(item.price) || 0;
    const q = parseInt(item.quantity) || 1;
    subtotal += p * q;
    return {
      id: item.id || 'snack-' + Date.now(),
      name: item.name,
      weight: item.weight || '100 g',
      price: p,
      qty: q,
      image: item.image || '../static/images/snack_chips.jpg',
      icon: "🍿"
    };
  });

  const deliveryFee = subtotal >= 199 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  const now = new Date();
  const placedTimeStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ", " + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const etaDateObj = new Date(now.getTime() + 2 * 86400000);
  const etaStr = etaDateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + " (By 7 PM)";

  const newOrder = {
    id: orderNumber,
    status: "CONFIRMED",
    statusType: "confirmed",
    stepIndex: 1, // 1: Confirmed only
    placedDate: placedTimeStr,
    packedDate: "Expected in 2-4 hrs",
    transitDate: "Pending Dispatch",
    etaDate: etaStr,
    courierName: "BlueDart Express (Assigning Delivery Agent)",
    awbNumber: String(Math.floor(10000000 + Math.random() * 90000000)),
    carrierHeadline: "Order Confirmed & Payment Verified",
    carrierDetail: "Being prepared fresh with 100% pure groundnut oil at Snacky Central Kitchen Hub",
    recipient: userAddress,
    items: orderItems,
    billing: {
      subtotal: subtotal,
      delivery: deliveryFee,
      discount: 0,
      total: grandTotal,
      paymentMode: "ONLINE PAID"
    }
  };

  const existingOrders = getStoredOrders();
  existingOrders.unshift(newOrder);
  saveOrdersList(existingOrders);
  localStorage.setItem('snacky_active_order_id', orderNumber);

  setTimeout(() => {
    snackyCart = [];
    saveCartState();
    showToast("🎉 Order Placed Successfully! Opening Live Tracker...");
    setTimeout(() => {
      window.location.href = `track-order.html?order_id=${orderNumber}`;
    }, 800);
  }, 1000);
}

// Payment Gateway / Checkout Init
function initPaymentFlowPage() {
  renderCheckoutItems();
  window.addEventListener('storage', renderCheckoutItems);

  // Check saved address in localStorage
  const storedAddrRaw = localStorage.getItem('snacky_address');
  const storedUserRaw = localStorage.getItem('snacky_user');

  const inputName = document.getElementById('input-name');
  const inputPhone = document.getElementById('input-phone');
  const inputPincode = document.getElementById('input-pincode');
  const inputCity = document.getElementById('input-city');
  const inputState = document.getElementById('input-state');
  const inputHouse = document.getElementById('input-house');
  const inputArea = document.getElementById('input-area');

  let activeAddress = null;

  if (storedAddrRaw) {
    try {
      activeAddress = JSON.parse(storedAddrRaw);
    } catch(e) {}
  }

  if (activeAddress) {
    if (inputName && activeAddress.name) inputName.value = activeAddress.name;
    if (inputPhone && activeAddress.phone) inputPhone.value = activeAddress.phone.replace('+91', '').trim();
    if (inputPincode && activeAddress.pincode) inputPincode.value = activeAddress.pincode;
    if (inputCity && activeAddress.city) inputCity.value = activeAddress.city;
    if (inputState && activeAddress.state) inputState.value = activeAddress.state;
    if (inputHouse && activeAddress.house) inputHouse.value = activeAddress.house;
    if (inputArea && activeAddress.area) inputArea.value = activeAddress.area;

    if (activeAddress.addressType) {
      const radio = document.querySelector(`input[name="addressTypeRadio"][value="${activeAddress.addressType}"]`);
      if (radio) radio.checked = true;
    }

    // Show saved address card on address page
    const cardContainer = document.getElementById('saved-addr-card-container');
    const nameElem = document.getElementById('addr-display-name');
    const textElem = document.getElementById('addr-display-text');
    const phoneElem = document.getElementById('addr-display-phone');
    const badgeTagElem = document.getElementById('saved-badge-tag');

    if (cardContainer) cardContainer.classList.remove('d-none');
    if (nameElem) nameElem.innerText = activeAddress.name;
    if (textElem) textElem.innerText = activeAddress.fullText || `${activeAddress.house}, ${activeAddress.area}, ${activeAddress.city} - ${activeAddress.pincode}`;
    if (phoneElem) phoneElem.innerText = activeAddress.phone;
    if (badgeTagElem) badgeTagElem.innerText = activeAddress.addressType || 'HOME';

    // Update Step 2 Payment Banner Elements (for payment.html)
    const payAddrBadge = document.getElementById('payment-step-addr-badge');
    const payAddrName = document.getElementById('payment-step-addr-name');
    const payAddrPhone = document.getElementById('payment-step-addr-phone');
    const payAddrFull = document.getElementById('payment-step-addr-full');
    const summaryElem = document.getElementById('sidebar-delivery-summary');

    if (payAddrBadge) payAddrBadge.innerText = activeAddress.addressType || 'HOME';
    if (payAddrName) payAddrName.innerText = activeAddress.name;
    if (payAddrPhone) payAddrPhone.innerText = activeAddress.phone;
    if (payAddrFull) payAddrFull.innerText = activeAddress.fullText || `${activeAddress.house}, ${activeAddress.area}, ${activeAddress.city} - ${activeAddress.pincode}`;
    if (summaryElem) summaryElem.innerText = `${activeAddress.name}, ${activeAddress.pincode}`;
  } else if (storedUserRaw) {
    try {
      const user = JSON.parse(storedUserRaw);
      if (user) {
        if (inputName && !inputName.value && user.name) inputName.value = user.name;
        if (inputPhone && !inputPhone.value && user.phone) inputPhone.value = user.phone.replace('+91', '').trim();
      }
    } catch(e) {}
  }
}

// --------------------------------------------------------------------------
// 18. Live Order Tracking & Management System
// --------------------------------------------------------------------------

// Default Seed Demo Orders
const DEFAULT_DEMO_ORDERS = [
  {
    id: "ID1234",
    status: "Order In Transit",
    statusType: "in-transit",
    stepIndex: 2, // 1: Packaged, 2: Sent out, 3: In Transit, 4: Delivered
    placedDate: "Sept 24, 2023",
    deliveryDate: "Sept 24, 2023",
    packedTime: "Mar 8, 12:04pm",
    sentOutTime: "Mar 8, 12:24pm",
    transitTime: "Waiting...",
    deliveredTime: "Waiting...",
    estDays: "EST: 3 days",
    courierName: "DHL Courier I...",
    addressSnippet: "No 4, Good...",
    actionText: "Ready to ship",
    awbNumber: "DHL-98172634",
    recipient: {
      name: "Customer",
      phone: "+91 9876543210",
      addressType: "HOME",
      fullAddress: "No 4, Good Shepherd Lane, Delhi - 110009"
    },
    items: [
      {
        id: 101,
        name: "Paachratan Mixture",
        weight: "120 g",
        price: 80,
        qty: 2,
        image: "../static/images/products/paachratan_mixture_front.jpg"
      },
      {
        id: 102,
        name: "Millet Chakli",
        weight: "150 g",
        price: 95,
        qty: 1,
        image: "../static/images/products/millet_chakli_front.jpg"
      },
      {
        id: 205,
        name: "Classic Salted Wafers",
        weight: "80 g",
        price: 50,
        qty: 1,
        image: "../static/images/products/classic_salted_wafers_front.jpg"
      },
      {
        id: 106,
        name: "Aloo Bhujia Delight",
        weight: "200 g",
        price: 85,
        qty: 1,
        image: "../static/images/products/aloo_bhujia_delight_front.jpg"
      }
    ],
    billing: {
      subtotal: 400,
      discount: 0,
      delivery: 0,
      total: 400,
      paymentMode: "Paid Online via UPI"
    }
  },
  {
    id: "SNK-849201",
    status: "Order In Transit",
    statusType: "in-transit",
    stepIndex: 2,
    placedDate: "Sep 24, 2026",
    deliveryDate: "Sep 27, 2026",
    packedTime: "Sep 24, 10:15am",
    sentOutTime: "Sep 24, 02:30pm",
    transitTime: "In Transit Hub",
    deliveredTime: "Waiting...",
    estDays: "EST: 3 days",
    courierName: "BlueDart Express",
    addressSnippet: "329, Indra Vihar, Delhi",
    actionText: "Ready to ship",
    awbNumber: "BD-98172634",
    recipient: {
      name: "Customer",
      phone: "+91 9876543210",
      addressType: "HOME",
      fullAddress: "329, 1st Floor, Indra Vihar, Near GTB Nagar, Delhi - 110009"
    },
    items: [
      {
        id: 101,
        name: "Paachratan Mixture",
        weight: "120 g",
        price: 80,
        qty: 1,
        image: "../static/images/products/paachratan_mixture_front.jpg"
      },
      {
        id: 102,
        name: "Millet Chakli",
        weight: "150 g",
        price: 95,
        qty: 1,
        image: "../static/images/products/millet_chakli_front.jpg"
      }
    ],
    billing: {
      subtotal: 175,
      delivery: 0,
      discount: 0,
      total: 175,
      paymentMode: "Paid via UPI / Zaakpay"
    }
  },
  {
    id: "SNK-7821904",
    status: "Delivered",
    statusType: "delivered",
    stepIndex: 4,
    placedDate: "Aug 20, 2026",
    deliveryDate: "Aug 24, 2026",
    packedTime: "Aug 20, 11:20am",
    sentOutTime: "Aug 21, 09:15am",
    transitTime: "Aug 22, 04:00pm",
    deliveredTime: "Aug 24, 04:15pm",
    estDays: "Delivered",
    courierName: "Delhivery (Agent: Vikram)",
    addressSnippet: "329, Indra Vihar, Delhi",
    actionText: "Delivered",
    awbNumber: "DL-77621094",
    recipient: {
      name: "Customer",
      phone: "+91 9876543210",
      addressType: "HOME",
      fullAddress: "329, 1st Floor, Indra Vihar, Near GTB Nagar, Delhi - 110009"
    },
    items: [
      {
        id: 106,
        name: "Aloo Bhujia Delight",
        weight: "200 g",
        price: 85,
        qty: 2,
        image: "../static/images/products/aloo_bhujia_delight_front.jpg"
      },
      {
        id: 203,
        name: "Desi Masala Potato Chips",
        weight: "60 g",
        price: 40,
        qty: 2,
        image: "../static/images/products/desi_masala_potato_chips_front.jpg"
      }
    ],
    billing: {
      subtotal: 250,
      delivery: 0,
      discount: 0,
      total: 250,
      paymentMode: "Paid via Credit Card"
    }
  }
];

let currentTrackedOrderId = "ID1234";

function resolveProductImage(item) {
  if (item && item.image && typeof item.image === 'string' && !item.image.includes('placeholder')) {
    return item.image;
  }
  if (typeof SNACKY_PRODUCTS !== 'undefined' && Array.isArray(SNACKY_PRODUCTS)) {
    const found = SNACKY_PRODUCTS.find(p => p.id === item.id || (p.title && item.name && (p.title.toLowerCase() === item.name.toLowerCase() || item.name.toLowerCase().includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(item.name.toLowerCase()))));
    if (found && found.image) return found.image;
  }
  return "../static/images/products/paachratan_mixture_front.jpg";
}

function getStoredOrders() {
  try {
    const raw = localStorage.getItem('snacky_orders');
    if (raw) {
      let parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const validOrders = parsed.filter(o => o && typeof o === 'object');
        if (validOrders.length > 0) {
          return validOrders.map((o, idx) => {
            const id = o.id || o.orderId || o.order_id || o.orderNumber || `SNK-${849200 + idx}`;
            return {
              ...o,
              id: id,
              placedDate: o.placedDate || o.orderDate || "Sept 24, 2023",
              deliveryDate: o.deliveryDate || o.etaDate || "Sept 24, 2023",
              packedTime: o.packedTime || "Mar 8, 12:04pm",
              sentOutTime: o.sentOutTime || "Mar 8, 12:24pm",
              transitTime: o.transitTime || "Waiting...",
              deliveredTime: o.deliveredTime || "Waiting...",
              estDays: o.estDays || (o.status === 'DELIVERED' ? 'Delivered' : 'EST: 3 days'),
              status: o.status || "Order In Transit",
              stepIndex: o.stepIndex || 2,
              courierName: o.courierName || "DHL Courier I...",
              addressSnippet: o.addressSnippet || "No 4, Good...",
              actionText: o.actionText || (o.stepIndex >= 3 ? "Track Shipment" : "Ready to ship"),
              recipient: o.recipient || { name: "Customer", phone: "+91 9876543210", addressType: "HOME", fullAddress: "No 4, Good Shepherd Lane, Delhi - 110009" },
              items: Array.isArray(o.items) && o.items.length > 0 ? o.items.map(it => ({
                ...it,
                image: resolveProductImage(it)
              })) : [
                { id: 101, name: "Paachratan Mixture", weight: "120 g", price: 80, qty: 2, image: "../static/images/products/paachratan_mixture_front.jpg" },
                { id: 102, name: "Millet Chakli", weight: "150 g", price: 95, qty: 1, image: "../static/images/products/millet_chakli_front.jpg" }
              ],
              billing: o.billing || { subtotal: 400, delivery: 0, discount: 0, total: 400, paymentMode: "Paid Online via UPI" }
            };
          });
        }
      }
    }
  } catch (e) {
    console.warn("Could not read orders from localStorage", e);
  }
  return DEFAULT_DEMO_ORDERS;
}

function saveOrdersList(orders) {
  try {
    localStorage.setItem('snacky_orders', JSON.stringify(orders));
  } catch(e) {}
}

// Render dynamic orders in User Profile Tab 3
function renderProfileOrders() {
  const container = document.getElementById('profile-orders-list-container');
  if (!container) return;

  const orders = getStoredOrders();
  if (!orders || orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 bg-light rounded-4">
        <div class="display-4 mb-2">📦</div>
        <h5 class="fw-bold text-navy">No Orders Found</h5>
        <p class="text-muted small mb-3">You haven't placed any snack orders yet.</p>
        <a href="products.html" class="btn btn-snacky-primary px-4 py-2 rounded-pill fw-bold">Explore Snacks</a>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(ord => {
    const isDelivered = ord.status === 'DELIVERED';
    const isConfirmed = ord.status === 'CONFIRMED';
    const statusClass = isDelivered ? 'bg-success-subtle text-success' : (isConfirmed ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning');
    const items = ord.items || [];
    const totalAmount = ord.billing ? (parseFloat(ord.billing.total) || 0).toFixed(2) : '184.00';

    const itemsHtml = items.map(it => `
      <div class="order-snack-item d-flex justify-content-between align-items-center flex-wrap gap-2 py-2 border-bottom">
        <div class="d-flex align-items-center gap-3">
          <div class="order-snack-icon-box">${it.icon || '🍿'}</div>
          <div>
            <h6 class="fw-bold text-navy mb-0">${it.name}</h6>
            <span class="small text-muted">${it.weight || '100 g'} • Qty: ${it.qty || 1} • ₹${parseFloat(it.price || 0).toFixed(2)}</span>
          </div>
        </div>
        ${isDelivered ? `
          <button type="button" class="btn-rate-snack-trigger" onclick="openSnackRatingModal('${it.name.replace(/'/g, "\\'")}', '${ord.id}')">
            <i class="bi bi-star-fill text-warning me-1"></i> Rate Snacks
          </button>
        ` : ''}
      </div>
    `).join('');

    return `
      <div class="delivered-order-review-card card card-body border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-3 border-bottom mb-3">
          <div>
            <span class="badge ${statusClass} font-bold px-3 py-1 rounded-pill mb-1">
              <i class="bi ${isDelivered ? 'bi-check-circle-fill' : (isConfirmed ? 'bi-check-circle' : 'bi-truck')} me-1"></i> ${ord.status}
            </span>
            <h6 class="fw-extrabold text-navy mb-0">Order #${ord.id}</h6>
          </div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="small text-muted me-2">${isDelivered ? 'Delivered on' : 'Placed on'} <strong>${ord.placedDate}</strong></span>
            <a href="track-order.html?orderId=${ord.id}" class="btn btn-sm btn-outline-navy rounded-pill fw-bold px-3">
              <i class="bi bi-geo-alt-fill text-danger me-1"></i> Track Live
            </a>
          </div>
        </div>

        <div class="order-snack-items-list mb-3">
          ${itemsHtml}
        </div>

        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top">
          <div class="small text-muted">
            Payment: <strong class="text-navy">${(ord.billing && ord.billing.paymentMode) || 'Paid Online'}</strong>
          </div>
          <div class="fw-extrabold text-navy fs-6">
            Total Paid: <span class="text-danger">₹${totalAmount}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 1. Route Guard & Access Control
function initTrackOrderPage() {
  const mainContainer = document.getElementById('track-main-container');
  if (!mainContainer) return;

  const guestGuardView = document.getElementById('guest-guard-view');
  const trackingView = document.getElementById('order-tracking-view');
  const emptyOrdersView = document.getElementById('empty-orders-view');

  const orders = getStoredOrders();
  const urlParams = new URLSearchParams(window.location.search);
  const orderFromUrl = urlParams.get('orderId') || urlParams.get('order_id') || urlParams.get('query');
  const activeStoredId = localStorage.getItem('snacky_active_order_id');

  const targetId = orderFromUrl || activeStoredId || (orders && orders.length > 0 ? orders[0].id : "ID1234");

  if (guestGuardView) guestGuardView.classList.add('d-none');
  if (emptyOrdersView) emptyOrdersView.classList.add('d-none');
  if (trackingView) trackingView.classList.remove('d-none');

  const searchInput = document.getElementById('track-order-search-input');
  if (searchInput && targetId) {
    searchInput.value = targetId;
  }

  renderTrackedOrder(targetId);
}

// 4. Manual Order Switcher
function handleManualOrderSearch() {
  const input = document.getElementById('track-order-search-input');
  const query = input ? input.value.trim() : '';
  if (!query) {
    showToast("Please enter an Order ID or AWB to track!");
    return;
  }

  const guestGuardView = document.getElementById('guest-guard-view');
  const trackingView = document.getElementById('order-tracking-view');
  const emptyOrdersView = document.getElementById('empty-orders-view');

  if (guestGuardView) guestGuardView.classList.add('d-none');
  if (emptyOrdersView) emptyOrdersView.classList.add('d-none');
  if (trackingView) trackingView.classList.remove('d-none');

  renderTrackedOrder(query);

  try {
    const url = new URL(window.location);
    url.searchParams.set('orderId', query);
    window.history.replaceState({}, '', url);
  } catch(e) {}

  showToast(`Tracking status loaded for #${query}`, 'success');

  const headerCard = document.getElementById('order-main-card');
  if (headerCard) {
    headerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function quickTrackOrder(orderId) {
  const input = document.getElementById('track-order-search-input');
  if (input) input.value = orderId;
  
  // Highlight active quick button
  document.querySelectorAll('.track-quick-btn').forEach(btn => {
    if (btn.textContent.includes(orderId)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderTrackedOrder(orderId);
  try {
    const url = new URL(window.location);
    url.searchParams.set('orderId', orderId);
    window.history.replaceState({}, '', url);
  } catch(e) {}

  const headerCard = document.getElementById('order-main-card');
  if (headerCard) {
    headerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 3. Dynamic Timeline & Receipt Renderer
function renderTrackedOrder(query) {
  const trackingView = document.getElementById('order-tracking-view');
  if (!query || !trackingView) return;

  trackingView.classList.remove('d-none');

  const orders = getStoredOrders();
  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');

  let matchedOrder = orders.find(o => {
    const cleanId = (o.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanPhone = ((o.recipient && o.recipient.phone) || '').replace(/\D/g, '');
    return cleanId.includes(cleanQuery) || cleanQuery.includes(cleanId) || (cleanPhone && cleanPhone.includes(cleanQuery));
  });

  if (!matchedOrder) {
    matchedOrder = {
      id: query.toUpperCase().startsWith('SNK-') || query.toUpperCase().startsWith('ID') ? query.toUpperCase() : `ID${query}`,
      status: "Order In Transit",
      stepIndex: 2,
      placedDate: "Sept 24, 2023",
      deliveryDate: "Sept 24, 2023",
      packedTime: "Mar 8, 12:04pm",
      sentOutTime: "Mar 8, 12:24pm",
      transitTime: "Waiting...",
      deliveredTime: "Waiting...",
      estDays: "EST: 3 days",
      courierName: "DHL Courier I...",
      addressSnippet: "No 4, Good...",
      actionText: "Ready to ship",
      awbNumber: "DHL-" + Math.floor(10000000 + Math.random() * 90000000),
      recipient: { name: "Snacky Customer", phone: "+91 9876543210", addressType: "HOME", fullAddress: "No 4, Good Shepherd Lane, Delhi - 110009" },
      items: [
        { id: 101, name: "Paachratan Mixture", weight: "120 g", price: 80, qty: 2, image: "../static/images/products/paachratan_mixture_front.jpg" },
        { id: 102, name: "Millet Chakli", weight: "150 g", price: 95, qty: 1, image: "../static/images/products/millet_chakli_front.jpg" }
      ],
      billing: { subtotal: 255, delivery: 0, discount: 0, total: 255, paymentMode: "Paid Online via UPI" }
    };
  }

  currentTrackedOrderId = matchedOrder.id;

  // A. Header Card Info
  const idDisplay = document.getElementById('order-id-display');
  const statusBadge = document.getElementById('order-status-badge');
  const actionPill = document.getElementById('order-action-pill');

  if (idDisplay) {
    idDisplay.textContent = `Order ${matchedOrder.id.startsWith('ID') ? matchedOrder.id : (matchedOrder.id.startsWith('SNK-') ? matchedOrder.id : 'ID' + matchedOrder.id)}`;
  }
  
  if (statusBadge) {
    const isDelivered = (matchedOrder.status || '').toLowerCase().includes('deliv');
    const isOut = (matchedOrder.status || '').toLowerCase().includes('out');
    statusBadge.className = 'track-status-pill-green ' + (isDelivered ? 'status-delivered' : (isOut ? 'status-out-for-delivery' : ''));
    statusBadge.textContent = matchedOrder.status || "Order In Transit";
  }

  if (actionPill) {
    actionPill.textContent = matchedOrder.actionText || (matchedOrder.stepIndex >= 4 ? "Delivered" : "Ready to ship");
  }

  // B. Order Tracking Section (Product in Transit & EST)
  const transitStatusEl = document.getElementById('track-transit-status');
  const estTimeEl = document.getElementById('track-est-time');
  if (transitStatusEl) transitStatusEl.textContent = (matchedOrder.stepIndex >= 4) ? "Product Delivered" : "Product in Transit";
  if (estTimeEl) estTimeEl.textContent = matchedOrder.estDays || "EST: 3 days";

  // Stepper State & Time
  const fillLine = document.getElementById('stepper-fill-bar');
  const stepIdx = matchedOrder.stepIndex || 2;

  const step1 = document.getElementById('stepper-node-1');
  const step2 = document.getElementById('stepper-node-2');
  const step3 = document.getElementById('stepper-node-3');
  const step4 = document.getElementById('stepper-node-4');

  [step1, step2, step3, step4].forEach((node, i) => {
    if (!node) return;
    node.classList.remove('completed', 'active', 'pending');
    const stepNum = i + 1;
    if (stepNum < stepIdx) {
      node.classList.add('completed');
    } else if (stepNum === stepIdx) {
      node.classList.add('active');
    } else {
      node.classList.add('pending');
    }
  });

  if (fillLine) {
    const fillWidths = { 1: '15%', 2: '48%', 3: '78%', 4: '100%' };
    fillLine.style.width = fillWidths[stepIdx] || '48%';
  }

  const stepTime1 = document.getElementById('stepper-time-1');
  const stepTime2 = document.getElementById('stepper-time-2');
  const stepTime3 = document.getElementById('stepper-time-3');
  const stepTime4 = document.getElementById('stepper-time-4');

  if (stepTime1) stepTime1.textContent = matchedOrder.packedTime || "Mar 8, 12:04pm";
  if (stepTime2) stepTime2.textContent = matchedOrder.sentOutTime || "Mar 8, 12:24pm";
  if (stepTime3) stepTime3.textContent = matchedOrder.transitTime || "Waiting...";
  if (stepTime4) stepTime4.textContent = matchedOrder.deliveredTime || "Waiting...";

  // C. 4-Column Metadata Grid
  const placedTimeEl = document.getElementById('order-placed-timestamp');
  const deliveryDateEl = document.getElementById('order-delivery-date');
  const courierEl = document.getElementById('order-courier-partner');
  const addrSnippet = document.getElementById('order-address-snippet');

  if (placedTimeEl) placedTimeEl.textContent = matchedOrder.placedDate || "Sept 24, 2023";
  if (deliveryDateEl) deliveryDateEl.textContent = matchedOrder.deliveryDate || "Sept 24, 2023";
  if (courierEl) courierEl.textContent = matchedOrder.courierName || "DHL Courier I...";
  if (addrSnippet) addrSnippet.textContent = matchedOrder.addressSnippet || "No 4, Good...";

  // D. Order Summary
  const bill = matchedOrder.billing || { subtotal: 400, delivery: 0, discount: 0, total: 400 };
  const subVal = document.getElementById('summary-subtotal-val');
  const discVal = document.getElementById('summary-discount-val');
  const shipFee = document.getElementById('summary-shipping-fee');
  const totalPaid = document.getElementById('summary-total-paid');

  if (subVal) subVal.textContent = `₹${(parseFloat(bill.subtotal) || 0).toFixed(2)}`;
  if (discVal) discVal.textContent = `₹${(parseFloat(bill.discount) || 0).toFixed(2)}`;
  if (shipFee) {
    const fee = parseFloat(bill.delivery) || 0;
    shipFee.textContent = fee === 0 ? "FREE" : `₹${fee.toFixed(2)}`;
  }
  if (totalPaid) totalPaid.textContent = `₹${(parseFloat(bill.total) || 0).toFixed(2)}`;

  // E. Order Info Products List (With authentic snack images)
  const itemsContainer = document.getElementById('track-order-items-list');
  const items = matchedOrder.items || [];

  if (itemsContainer) {
    itemsContainer.innerHTML = items.map(it => {
      const imgSrc = resolveProductImage(it);
      const unitPrice = parseFloat(it.price) || 0;
      const q = parseInt(it.qty) || 1;
      const total = unitPrice * q;

      return `
        <div class="track-product-row">
          <div class="track-product-left">
            <div class="track-product-img-box">
              <img src="${imgSrc}" alt="${it.name}" class="track-product-img" onerror="this.src='../static/images/products/paachratan_mixture_front.jpg'">
            </div>
            <div class="track-product-details">
              <h6 class="track-product-name">${it.name}</h6>
              <span class="track-product-weight">${it.weight || '100 g'} • Pure Groundnut Oil</span>
            </div>
          </div>
          <div class="track-product-right">
            <span class="track-product-price">₹${total.toFixed(2)}</span>
            <span class="track-product-qty">Qty: ${q}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // F. Populate Details Modal
  const modalInvoiceId = document.getElementById('modal-invoice-order-id');
  const modalRecipName = document.getElementById('modal-recipient-name');
  const modalRecipAddr = document.getElementById('modal-recipient-address');
  const modalRecipPhone = document.getElementById('modal-recipient-phone');
  const modalCourier = document.getElementById('modal-courier-name');
  const modalAwb = document.getElementById('modal-awb-number');
  const modalPayment = document.getElementById('modal-payment-mode');
  const modalTableBody = document.getElementById('modal-items-table-body');

  const recip = matchedOrder.recipient || {};
  if (modalInvoiceId) modalInvoiceId.textContent = `#${matchedOrder.id}`;
  if (modalRecipName) modalRecipName.textContent = recip.name || "Customer";
  if (modalRecipAddr) modalRecipAddr.textContent = recip.fullAddress || "No 4, Good Shepherd Lane, Delhi - 110009";
  if (modalRecipPhone) modalRecipPhone.textContent = recip.phone || "+91 9876543210";
  if (modalCourier) modalCourier.textContent = matchedOrder.courierName || "DHL Courier Express";
  if (modalAwb) modalAwb.textContent = matchedOrder.awbNumber || "98172634";
  if (modalPayment) modalPayment.textContent = bill.paymentMode || "Paid Online via UPI";

  if (modalTableBody) {
    modalTableBody.innerHTML = items.map(it => {
      const imgSrc = resolveProductImage(it);
      const unitPrice = parseFloat(it.price) || 0;
      const q = parseInt(it.qty) || 1;
      return `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="${imgSrc}" style="width:36px;height:36px;object-fit:contain;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;" onerror="this.src='../static/images/products/paachratan_mixture_front.jpg'">
              <span class="fw-bold text-navy small">${it.name}</span>
            </div>
          </td>
          <td><span class="badge bg-light text-navy border small">${it.weight || '100 g'}</span></td>
          <td class="fw-bold small">${q}</td>
          <td class="small">₹${unitPrice.toFixed(2)}</td>
          <td class="text-end fw-bold text-navy small">₹${(unitPrice * q).toFixed(2)}</td>
        </tr>
      `;
    }).join('');
  }
}

function toggleOrderDetailedModal() {
  const modalEl = document.getElementById('orderDetailModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
  }
}

function handleOrderActionClick() {
  showToast(`Live status: Order #${currentTrackedOrderId} is currently in transit with DHL courier.`, 'info');
}

function copyTrackingOrderId() {
  if (!currentTrackedOrderId) return;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(currentTrackedOrderId).then(() => {
      showToast(`Order ID #${currentTrackedOrderId} copied to clipboard!`);
    }).catch(() => {
      fallbackCopyText(currentTrackedOrderId);
    });
  } else {
    fallbackCopyText(currentTrackedOrderId);
  }
}

function downloadInvoicePDF() {
  showToast(`📄 Generating & Downloading Invoice for #${currentTrackedOrderId}...`, 'success');
}

// --------------------------------------------------------------------------
// Healthier Ways Snacking Occasion Slider Data & Logic
// --------------------------------------------------------------------------
const OCCASION_SLIDES = [
  {
    id: 0,
    title: "Study Breaks",
    headline: "Crunch. Focus. Conquer.",
    description: "Fuel your focus with our healthy namkeens—perfect for study breaks! Made with 100% groundnut oil and wholesome ingredients, our snacks give the right crunch without the guilt. Whether prepping for exams or powering through assignments, these light yet satisfying bites help keep energy up and mind sharp.",
    image: "../static/images/occasion_study.jpg",
    progress: "12%"
  },
  {
    id: 1,
    title: "Travelling",
    headline: "Light. Crunchy. Anywhere.",
    description: "Snack smart while you travel with our wide range of makhana and puffs—light, crunchy, and packed with goodness. Whether on a road trip, catching a flight, or just commuting, these healthy snacks are easy to carry and perfect for guilt-free munching on the go.",
    image: "../static/images/occasion_travel.jpg",
    progress: "40%"
  },
  {
    id: 2,
    title: "Post Workout",
    headline: "Protein. Power. Purity.",
    description: "Recharge naturally after a workout with our nutritious sattu—packed with protein, fiber, and essential minerals. It's a perfect post-workout drink to help rebuild muscle, boost energy, and keep you full and refreshed without added sugar or preservatives.",
    image: "../static/images/occasion_workout.jpg",
    progress: "70%"
  },
  {
    id: 3,
    title: "Meeting Breaks",
    headline: "Wholesome. Focused. Ready.",
    description: "Take a wholesome pause during meetings with our Paachmeva mix and healthy cookies—loaded with the goodness of dry fruits and whole grains. They offer the right balance of taste and nutrition—keeping energy steady, focus sharp, and the day on track.",
    image: "../static/images/paachratan_mixture.jpg",
    progress: "100%"
  }
];

let currentOccasionIndex = 0;
let occasionAutoplayTimer = null;

function startOccasionAutoplay() {
  stopOccasionAutoplay();
  occasionAutoplayTimer = setInterval(() => {
    nextOccasion();
  }, 4000);
}

function stopOccasionAutoplay() {
  if (occasionAutoplayTimer) {
    clearInterval(occasionAutoplayTimer);
    occasionAutoplayTimer = null;
  }
}

function switchOccasion(index, isUserClick = false) {
  if (index < 0) index = OCCASION_SLIDES.length - 1;
  if (index >= OCCASION_SLIDES.length) index = 0;
  currentOccasionIndex = index;

  const data = OCCASION_SLIDES[index];
  const posterImg = document.getElementById('occasion-poster-img');
  const headline = document.getElementById('occasion-headline');
  const description = document.getElementById('occasion-description');
  const progressLine = document.getElementById('occasion-progress-line');

  if (posterImg) {
    posterImg.style.opacity = '0.3';
    setTimeout(() => {
      posterImg.src = data.image;
      posterImg.style.opacity = '1';
    }, 150);
  }
  if (headline) headline.textContent = data.headline;
  if (description) description.textContent = data.description;
  if (progressLine) progressLine.style.width = data.progress;

  const tabBtns = document.querySelectorAll('.occasion-tab-btn');
  tabBtns.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (isUserClick) {
    startOccasionAutoplay();
  }
}

function prevOccasion() {
  switchOccasion(currentOccasionIndex - 1, true);
}

function nextOccasion() {
  switchOccasion(currentOccasionIndex + 1, false);
}

// Centralized Navbar Authentication State Sync System
function syncAuthNavbar() {
  const container = document.getElementById('auth-nav-container');
  if (!container) return;

  const rawLoggedIn = localStorage.getItem('isLoggedIn');
  const storedUserRaw = localStorage.getItem('snacky_user');
  
  let isLoggedIn = (rawLoggedIn === 'true' || rawLoggedIn === true || !!storedUserRaw);
  
  // Explicit logout guard
  if (rawLoggedIn === 'false' || localStorage.getItem('snacky_logged_out') === 'true') {
    isLoggedIn = false;
  }

  let userName = localStorage.getItem('userName');

  if (storedUserRaw) {
    try {
      const parsed = JSON.parse(storedUserRaw);
      if (parsed && parsed.name && parsed.name.trim()) {
        userName = parsed.name.trim();
      }
    } catch (e) {}
  }

  if (isLoggedIn) {
    const displayName = (userName && userName.trim()) ? userName.trim().split(' ')[0] : "Customer";
    container.innerHTML = `
      <div class="user-pill-dropdown dropdown">
        <button class="nav-action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="user-greeting-pill-btn" title="Hi, ${displayName} (My Account)" aria-label="Account">
          <i class="bi bi-person-fill text-warning"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="user-greeting-pill-btn">
          <li class="dropdown-header text-navy fw-bold"><i class="bi bi-person-check-fill text-warning me-1"></i> Hi, ${displayName}!</li>
          <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>My Profile</a></li>
          <li><a class="dropdown-item" href="track-order.html"><i class="bi bi-box-seam me-2"></i>My Orders</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item text-danger" id="logoutBtn" type="button"><i class="bi bi-box-arrow-right me-2"></i>Log Out</button></li>
        </ul>
      </div>
    `;

    const logoutBtn = container.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleUserLogout();
      });
    }
  } else {
    container.innerHTML = `
      <a href="auth.html" class="nav-action-btn" id="nav-user-account-btn" title="Account / Login" aria-label="Account">
        <i class="bi bi-person"></i>
      </a>
    `;
  }
}

// Backward compatibility alias
function updateNavbarUserSession() {
  syncAuthNavbar();
}

// Copy Coupon Code Trigger
function copyCouponCode(code) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Coupon code ${code} copied!`);
    }).catch(() => {
      fallbackCopyText(code);
    });
  } else {
    fallbackCopyText(code);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Coupon code ${text} copied!`);
  } catch (err) {}
  document.body.removeChild(textArea);
}

// Offers Page Ticking Countdown Timer
function startOffersCountdownTimer() {
  let totalSecs = 4 * 3600 + 18 * 60 + 32; // 4 hours 18 mins 32 secs initial

  setInterval(() => {
    if (totalSecs <= 0) totalSecs = 24 * 3600; // Reset loop
    totalSecs--;

    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const format = (val) => String(val).padStart(2, '0');

    const hrEls = document.querySelectorAll('.timer-hours-val');
    const minEls = document.querySelectorAll('.timer-mins-val');
    const secEls = document.querySelectorAll('.timer-secs-val');

    hrEls.forEach(el => el.textContent = format(hours));
    minEls.forEach(el => el.textContent = format(mins));
    secEls.forEach(el => el.textContent = format(secs));
  }, 1000);
}

// --------------------------------------------------------------------------
// Real-time Name Validation Feedback Helper
// --------------------------------------------------------------------------
function showNameAlphabetError(el, message = "Please write alphabets only (no numbers or special characters)") {
  if (!el) return;
  el.classList.add('is-invalid-name');
  
  let errorEl = el.parentElement.querySelector('.name-alphabet-error-feedback');
  if (!errorEl && el.parentElement.classList.contains('input-group')) {
    errorEl = el.parentElement.parentElement.querySelector('.name-alphabet-error-feedback');
  }
  
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'name-alphabet-error-feedback';
    if (el.parentElement.classList.contains('input-group')) {
      el.parentElement.insertAdjacentElement('afterend', errorEl);
    } else {
      el.insertAdjacentElement('afterend', errorEl);
    }
  }

  errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> <span>${message}</span>`;
  errorEl.style.display = 'flex';

  if (el._nameErrorTimeout) clearTimeout(el._nameErrorTimeout);
  el._nameErrorTimeout = setTimeout(() => {
    hideNameAlphabetError(el);
  }, 4000);
}

function hideNameAlphabetError(el) {
  if (!el) return;
  el.classList.remove('is-invalid-name');
  let errorEl = el.parentElement.querySelector('.name-alphabet-error-feedback');
  if (!errorEl && el.parentElement.classList.contains('input-group')) {
    errorEl = el.parentElement.parentElement.querySelector('.name-alphabet-error-feedback');
  }
  if (errorEl) {
    errorEl.style.display = 'none';
  }
}

// Global Input Strict Character & Format Enforcer
function setupGlobalInputSanitizers() {
  // 1. Phone number inputs: strictly numbers only (max 10 digits)
  document.querySelectorAll('input[type="tel"], #auth-phone-input, #signup-phone-input, #input-phone, #profile-phone-input, #profile-addr-phone, #contact-phone, #chk-signup-phone').forEach(el => {
    el.setAttribute('maxlength', '10');
    el.setAttribute('inputmode', 'numeric');
    el.setAttribute('pattern', '[0-9]{10}');
    el.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  // 2. Name inputs: strictly alphabets and spaces only with real-time error display
  const nameSelectors = '#signup-name-input, #input-name, #profile-name-input, #profile-addr-name, #contact-name, #contact-full-name, #card-holder-name, #chk-signup-name';
  document.querySelectorAll(nameSelectors).forEach(el => {
    el.setAttribute('pattern', '[a-zA-Z\\s]*');
    el.setAttribute('autocomplete', 'name');

    el.addEventListener('input', function(e) {
      if (/[^a-zA-Z\s]/.test(this.value)) {
        showNameAlphabetError(this, "Please write alphabets only (no numbers or special characters)");
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
      } else {
        hideNameAlphabetError(this);
      }
    });

    el.addEventListener('keydown', function(e) {
      if (e.ctrlKey || e.metaKey || e.altKey || ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Home', 'End', 'Escape'].includes(e.key)) {
        return;
      }
      if (e.key && e.key.length === 1 && !/[a-zA-Z\s]/.test(e.key)) {
        showNameAlphabetError(this, "Please write alphabets only (no numbers or special characters)");
      }
    });

    el.addEventListener('blur', function() {
      if (this.value && /[^a-zA-Z\s]/.test(this.value)) {
        showNameAlphabetError(this, "Please write alphabets only (no numbers or special characters)");
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
      }
    });
  });

  // 3. Pincode inputs: strictly 6 digits only
  document.querySelectorAll('#input-pincode, #profile-addr-pincode').forEach(el => {
    el.setAttribute('maxlength', '6');
    el.setAttribute('inputmode', 'numeric');
    el.setAttribute('pattern', '[0-9]{6}');
    el.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 6);
    });
  });

  // 4. Card Number inputs: strictly numbers formatted as 4-digit blocks
  document.querySelectorAll('#card-number-input').forEach(el => {
    el.setAttribute('maxlength', '19');
    el.setAttribute('inputmode', 'numeric');
    el.addEventListener('input', function() {
      const raw = this.value.replace(/\D/g, '').slice(0, 16);
      this.value = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
  });

  // 5. City and State inputs: strictly letters and spaces
  document.querySelectorAll('#input-city, #input-state, #profile-addr-city, #profile-addr-state').forEach(el => {
    el.setAttribute('pattern', '[a-zA-Z\\s]*');
    el.addEventListener('input', function() {
      if (/[^a-zA-Z\s]/.test(this.value)) {
        showNameAlphabetError(this, "Please write alphabets only");
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
      } else {
        hideNameAlphabetError(this);
      }
    });
  });
}

// --------------------------------------------------------------------------
// 19. Customer Feedback & Product Reviews System (Local Storage Persistence)
// --------------------------------------------------------------------------

const STAR_RATING_LABELS = {
  1: "1.0 - Needs Improvement",
  2: "2.0 - Fair Crunch",
  3: "3.0 - Good Taste",
  4: "4.0 - Very Crispy & Delicious!",
  5: "5.0 - Absolutely Exceptional!"
};

// Initialize interactive rating controls, emoji scales, tag toggles & modal handlers
function initFeedbackSystem() {
  // 1. Emoji scale selector in #siteFeedbackModal
  const emojiItems = document.querySelectorAll('.emoji-rating-grid .emoji-item');
  const ratingInput = document.getElementById('site-feedback-rating-val');

  emojiItems.forEach(item => {
    item.addEventListener('click', function() {
      emojiItems.forEach(e => e.classList.remove('active'));
      this.classList.add('active');
      const val = this.getAttribute('data-rating') || 'loved';
      if (ratingInput) {
        ratingInput.value = val;
      }
    });
  });

  // 2. Category selection pills in #siteFeedbackModal
  const categoryPills = document.querySelectorAll('#site-feedback-categories .feedback-pill-btn');
  const catInput = document.getElementById('site-feedback-category-val');

  categoryPills.forEach(pill => {
    pill.addEventListener('click', function() {
      categoryPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-category') || 'Taste & Freshness';
      if (catInput) {
        catInput.value = cat;
      }
    });
  });

  // 3. 5-Star Interactive Rating System in #snackRatingModal
  const starContainer = document.getElementById('modal-star-rating');
  const starBtns = document.querySelectorAll('#modal-star-rating .star-item-btn');
  const starInput = document.getElementById('snack-review-stars-val');
  const starStatusText = document.getElementById('star-rating-status-text');

  function updateStarDisplay(ratingValue) {
    const val = parseInt(ratingValue, 10) || 5;
    starBtns.forEach(btn => {
      const btnRating = parseInt(btn.getAttribute('data-rating'), 10) || 1;
      if (btnRating <= val) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    if (starStatusText) {
      starStatusText.textContent = STAR_RATING_LABELS[val] || `${val}.0 Rating`;
    }
  }

  starBtns.forEach(btn => {
    // Hover effect
    btn.addEventListener('mouseenter', function() {
      const hoverVal = parseInt(this.getAttribute('data-rating'), 10) || 1;
      starBtns.forEach(b => {
        const bVal = parseInt(b.getAttribute('data-rating'), 10) || 1;
        if (bVal <= hoverVal) {
          b.classList.add('hovered');
        } else {
          b.classList.remove('hovered');
        }
      });
      if (starStatusText) {
        starStatusText.textContent = STAR_RATING_LABELS[hoverVal] || `${hoverVal}.0 Rating`;
      }
    });

    // Click effect (Locks rating)
    btn.addEventListener('click', function() {
      const setVal = parseInt(this.getAttribute('data-rating'), 10) || 5;
      if (starInput) {
        starInput.value = setVal;
      }
      updateStarDisplay(setVal);
    });
  });

  if (starContainer) {
    starContainer.addEventListener('mouseleave', function() {
      starBtns.forEach(b => b.classList.remove('hovered'));
      const currentVal = parseInt(starInput ? starInput.value : 5, 10) || 5;
      updateStarDisplay(currentVal);
    });
  }

  // 4. Quick Tag Pills in #snackRatingModal (Multi-Selectable)
  const snackTags = document.querySelectorAll('#snack-review-tag-pills .snack-tag-pill');
  snackTags.forEach(tag => {
    tag.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
}

// Submit Global Site Experience Feedback to localStorage ('snacky_feedbacks')
function submitSiteFeedback() {
  const ratingInput = document.getElementById('site-feedback-rating-val');
  const catInput = document.getElementById('site-feedback-category-val');
  const msgInput = document.getElementById('site-feedback-message');

  const rating = ratingInput ? ratingInput.value : 'loved';
  const category = catInput ? catInput.value : 'Taste & Freshness';
  const message = msgInput ? msgInput.value.trim() : '';

  // Current user info if logged in
  let authorName = "Snacky Foodie";
  try {
    const rawSession = localStorage.getItem('snacky_user_session');
    if (rawSession) {
      const session = JSON.parse(rawSession);
      if (session && session.name) {
        authorName = session.name;
      }
    }
  } catch (e) {
    console.warn("Could not read user session for feedback author", e);
  }

  const newFeedback = {
    id: 'fb_' + Date.now(),
    rating: rating,
    category: category,
    message: message,
    author: authorName,
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  try {
    const existing = JSON.parse(localStorage.getItem('snacky_feedbacks') || '[]');
    existing.unshift(newFeedback);
    localStorage.setItem('snacky_feedbacks', JSON.stringify(existing));
  } catch (e) {
    console.error("Error saving site feedback to localStorage:", e);
  }

  // Close active modal safely
  const modalEl = document.getElementById('siteFeedbackModal');
  if (modalEl && window.bootstrap && window.bootstrap.Modal) {
    const bsModal = window.bootstrap.Modal.getInstance(modalEl);
    if (bsModal) {
      bsModal.hide();
    } else {
      const closeBtn = modalEl.querySelector('.btn-feedback-close, [data-bs-dismiss="modal"]');
      if (closeBtn) closeBtn.click();
    }
  }

  // Reset form inputs
  if (msgInput) msgInput.value = '';

  // Show celebratory success toast
  showToast("❤️ Thank you! Your feedback helps us make Snacky even better.");
}

// --------------------------------------------------------------------------
// Product-Specific Reviews Database & Generator
// --------------------------------------------------------------------------
function getProductSpecificReviews(prod) {
  if (!prod) prod = SNACKY_PRODUCTS[0];

  const reviewProfiles = {
    // 203: Desi Masala Potato Chips
    203: {
      avgScore: 4.9,
      reviewCount: 168,
      distribution: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_203_1",
          author: "Ananya Gupta",
          rating: 5,
          date: "18 Sep 2026",
          tags: ["Extra Crispy", "Desi Masala Kick", "100% Groundnut Oil"],
          comment: "The desi masala seasoning on these potato chips is absolutely sensational! Thin, ultra-crispy, and seasoned with that authentic tangy amchur and red chilli punch. Zero greasy palm oil smell!",
          verified: true
        },
        {
          id: "seed_203_2",
          author: "Rohan Mehta",
          rating: 5,
          date: "12 Sep 2026",
          tags: ["Munching Favorite", "Perfect Crunch", "Authentic Spices"],
          comment: "Crispiest chips ever with that authentic chatpata Indian flavor profile. They beat regular supermarket chips hands down. Ordered 5 more packs for the cricket match!",
          verified: true
        },
        {
          id: "seed_203_3",
          author: "Shalini Iyer",
          rating: 4,
          date: "04 Sep 2026",
          tags: ["Chai Time Partner", "Fresh Aroma"],
          comment: "Loved the crunch and how evenly every chip is coated in masala. Perfectly paired with evening ginger chai. Arrived intact with no crushed crumbs!",
          verified: true
        }
      ]
    },
    // 205: Classic Salted Wafers
    205: {
      avgScore: 4.8,
      reviewCount: 142,
      distribution: { 5: 84, 4: 13, 3: 3, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_205_1",
          author: "Priya Nambiar",
          rating: 5,
          date: "19 Sep 2026",
          tags: ["Pure Potato Taste", "Light Sea Salt", "Crispy Perfection"],
          comment: "Pure potato perfection with just the right pinch of sea salt. Clean groundnut oil fry gives it that nostalgic fresh-from-bakery wafer crispiness!",
          verified: true
        },
        {
          id: "seed_205_2",
          author: "Tanmay Joshi",
          rating: 5,
          date: "11 Sep 2026",
          tags: ["Zero Palm Oil", "Clean Taste"],
          comment: "Wafer-thin and not oily at all. You can truly taste the quality of the potatoes. My grandparents love having these with their evening tea.",
          verified: true
        },
        {
          id: "seed_205_3",
          author: "Kavita Das",
          rating: 4,
          date: "02 Sep 2026",
          tags: ["Kids Favorite", "Fresh Crunch"],
          comment: "Classic golden slices with great crunch. Very gentle on salt, perfect for quick munching anytime.",
          verified: true
        }
      ]
    },
    // 206: Cream & Onion Chips
    206: {
      avgScore: 4.9,
      reviewCount: 174,
      distribution: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_206_1",
          author: "Arjun Kapoor",
          rating: 5,
          date: "20 Sep 2026",
          tags: ["Creamy & Tangy", "Herb Seasoned", "Addictive Crunch"],
          comment: "Rich sour cream and roasted onion flavor with an unbelievable crunch! The balance of herbs and mild creaminess is addictive.",
          verified: true
        },
        {
          id: "seed_206_2",
          author: "Divya Nair",
          rating: 5,
          date: "15 Sep 2026",
          tags: ["Movie Night Snack", "Extra Crispy"],
          comment: "The best Cream & Onion chips I've tasted in India. Not synthetic or overly salty like big brands. The resealable pouch keeps them fresh for days.",
          verified: true
        },
        {
          id: "seed_206_3",
          author: "Manish Rawat",
          rating: 4,
          date: "06 Sep 2026",
          tags: ["Gourmet Flavor", "Fresh Aroma"],
          comment: "Loved the herb aroma when opening the pack. Crisp, light, and mouthwatering seasoning on every slice.",
          verified: true
        }
      ]
    },
    // 207: Tangy Tomato Crisps
    207: {
      avgScore: 4.7,
      reviewCount: 118,
      distribution: { 5: 80, 4: 16, 3: 3, 2: 1, 1: 0 },
      reviews: [
        {
          id: "seed_207_1",
          author: "Ritika Sen",
          rating: 5,
          date: "17 Sep 2026",
          tags: ["Sweet & Tangy", "Chatpata Tomato", "Super Crisp"],
          comment: "The tangy sun-ripened tomato flavor hits immediately with a subtle sweetness and spicy finish. Absolute delight for tomato chips lovers!",
          verified: true
        },
        {
          id: "seed_207_2",
          author: "Gaurav Chawla",
          rating: 5,
          date: "09 Sep 2026",
          tags: ["Party Favorite", "Crunchy Delight"],
          comment: "Tangy, zesty, and satisfyingly loud crunch! Finished two packets during our road trip.",
          verified: true
        },
        {
          id: "seed_207_3",
          author: "Meenakshi V.",
          rating: 4,
          date: "29 Aug 2026",
          tags: ["Fresh Seasoning", "Low Oil"],
          comment: "Great tomato spice balance without feeling overly sweet. Highly recommended.",
          verified: true
        }
      ]
    },
    // 208: Banana Chips Salted
    208: {
      avgScore: 4.9,
      reviewCount: 185,
      distribution: { 5: 91, 4: 7, 3: 2, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_208_1",
          author: "George Mathew",
          rating: 5,
          date: "21 Sep 2026",
          tags: ["Authentic Kerala Nendran", "Rock Salt & Turmeric", "100% Crisp"],
          comment: "Authentic Kerala-style raw Nendran banana chips! Thin, golden, and crispy with zero sogginess. Pure crunch and clean oil flavor.",
          verified: true
        },
        {
          id: "seed_208_2",
          author: "Swati Kulkarni",
          rating: 5,
          date: "14 Sep 2026",
          tags: ["Fasting Special", "Sea Salt Crunch"],
          comment: "Crispy golden slices with just rock salt and turmeric. Perfect for fasting days and tea breaks.",
          verified: true
        },
        {
          id: "seed_208_3",
          author: "Vivek Sharma",
          rating: 4,
          date: "05 Sep 2026",
          tags: ["Fresh Fragrance", "Non-Greasy"],
          comment: "Very fresh and crisp. None of the rancid oil aftertaste you get from open local stalls.",
          verified: true
        }
      ]
    },
    // 101: Paachratan Mixture
    101: {
      avgScore: 4.8,
      reviewCount: 156,
      distribution: { 5: 85, 4: 12, 3: 3, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_101_1",
          author: "Suresh Agarwal",
          rating: 5,
          date: "22 Sep 2026",
          tags: ["Royal Dry Fruits", "Potato Lachha", "Pure Groundnut Oil"],
          comment: "A royal treat in every handful! The combination of crisp potato lachha, whole cashews, plump raisins, and seasoned sev is unmatched.",
          verified: true
        },
        {
          id: "seed_101_2",
          author: "Neha Saxena",
          rating: 5,
          date: "16 Sep 2026",
          tags: ["Festive Special", "Sweet & Savoury"],
          comment: "Generous amount of dry fruits and crispy sev. Perfect festive namkeen to serve guests.",
          verified: true
        },
        {
          id: "seed_101_3",
          author: "Alok Sen",
          rating: 4,
          date: "08 Sep 2026",
          tags: ["Clean Aroma", "Aromatic Spices"],
          comment: "Crispy and balanced sweet-spicy taste. You can tell they use fresh groundnut oil.",
          verified: true
        }
      ]
    },
    // 102: Millet Chakli
    102: {
      avgScore: 4.9,
      reviewCount: 162,
      distribution: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_102_1",
          author: "Rajeshwari R.",
          rating: 5,
          date: "23 Sep 2026",
          tags: ["Foxtail Millet", "Ajwain & Cumin Aroma", "Guilt-Free Crunch"],
          comment: "Crunchy foxtail millet spiral with fragrant ajwain and white sesame. It's hard to believe healthy millet snacks can taste this delightfully crunchy!",
          verified: true
        },
        {
          id: "seed_102_2",
          author: "Deepa Sundaram",
          rating: 5,
          date: "17 Sep 2026",
          tags: ["High Fiber", "Crispy Spiral"],
          comment: "Melt-in-mouth crispness with traditional South Indian aroma. My family finished the pack in one sitting.",
          verified: true
        },
        {
          id: "seed_102_3",
          author: "Nikhil Rao",
          rating: 4,
          date: "10 Sep 2026",
          tags: ["Tea-Time Favorite", "No Palm Oil"],
          comment: "Very crunchy and pairs wonderfully with hot filter coffee. No greasy feeling afterwards.",
          verified: true
        }
      ]
    },
    // 106: Aloo Bhujia Delight
    106: {
      avgScore: 4.9,
      reviewCount: 194,
      distribution: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_106_1",
          author: "Harish Trivedi",
          rating: 5,
          date: "24 Sep 2026",
          tags: ["Mint & Mango Notes", "Fine Besan Sev", "100% Groundnut Oil"],
          comment: "Tangy amchur and mint notes with fine besan potato sev. Far superior and fresher than standard mass-produced bhujia!",
          verified: true
        },
        {
          id: "seed_106_2",
          author: "Sunita Bhasin",
          rating: 5,
          date: "18 Sep 2026",
          tags: ["Chaat Topping", "Extra Crisp"],
          comment: "Crisp and seasoned to perfection. Our everyday topping for poha, sandwiches, and chaats.",
          verified: true
        },
        {
          id: "seed_106_3",
          author: "Amit Singhal",
          rating: 4,
          date: "11 Sep 2026",
          tags: ["Zesty Bite", "Fresh Batch"],
          comment: "Great crunch and flavor. Groundnut oil makes a noticeable difference in lightness.",
          verified: true
        }
      ]
    },
    // 202: Ragi Masala Chips
    202: {
      avgScore: 4.8,
      reviewCount: 135,
      distribution: { 5: 83, 4: 14, 3: 3, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_202_1",
          author: "Dr. Pooja Nair",
          rating: 5,
          date: "22 Sep 2026",
          tags: ["High Calcium & Fiber", "Spicy Desi Coating", "Wholesome Ragi"],
          comment: "Rich in ragi fiber and calcium without compromising on tasty Indian masala punch. Best healthy alternative to regular junk chips!",
          verified: true
        },
        {
          id: "seed_202_2",
          author: "Karan Bhatia",
          rating: 5,
          date: "15 Sep 2026",
          tags: ["Crispy Texture", "Healthy Munch"],
          comment: "Finally a healthy ragi chip that actually tastes amazing. Crisp, spicy, and satisfyingly crunchy.",
          verified: true
        },
        {
          id: "seed_202_3",
          author: "Meera Seth",
          rating: 4,
          date: "07 Sep 2026",
          tags: ["Desk Snack", "Low Calorie"],
          comment: "Light, crunchy, and wholesome. Satisfies mid-afternoon cravings guilt-free.",
          verified: true
        }
      ]
    },
    // 301: Makhana Twisters
    301: {
      avgScore: 4.9,
      reviewCount: 172,
      distribution: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 },
      reviews: [
        {
          id: "seed_301_1",
          author: "Shweta Jain",
          rating: 5,
          date: "24 Sep 2026",
          tags: ["100% Roasted", "Himalayan Pink Salt", "High Protein"],
          comment: "Slow roasted to perfection with fragrant mild herbs and pink salt. 100% roasted with zero greasy feel on fingers!",
          verified: true
        },
        {
          id: "seed_301_2",
          author: "Siddharth Roy",
          rating: 5,
          date: "19 Sep 2026",
          tags: ["Fluffy Crunch", "Superfood"],
          comment: "Huge, fluffy foxnuts with even coating of seasonings. Superior quality makhana in every pouch.",
          verified: true
        },
        {
          id: "seed_301_3",
          author: "Ankita Paul",
          rating: 4,
          date: "12 Sep 2026",
          tags: ["Guilt-Free", "Clean Aroma"],
          comment: "Crispy and light. Great healthy desk snack while working long hours.",
          verified: true
        }
      ]
    }
  };

  if (reviewProfiles[prod.id]) {
    return reviewProfiles[prod.id];
  }

  // Dynamic Contextual Unique Review Generator for all other products:
  const hash = String(prod.id || prod.title).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const avg = (4.7 + (hash % 3) * 0.1).toFixed(1);
  const count = 110 + (hash % 70);
  const p5 = 82 + (hash % 10);
  const p4 = 100 - p5 - 4;
  
  const reviewersPool = [
    { name: "Varun Kapoor", city: "Mumbai" },
    { name: "Aishwarya Sen", city: "Kolkata" },
    { name: "Aditya Hegde", city: "Bengaluru" },
    { name: "Pooja Deshmukh", city: "Pune" },
    { name: "Manish Chhabra", city: "Delhi" },
    { name: "Sunil Shenoy", city: "Mangaluru" },
    { name: "Kritika Anand", city: "Jaipur" },
    { name: "Prashant Kulkarni", city: "Indore" }
  ];

  const r1 = reviewersPool[hash % reviewersPool.length];
  const r2 = reviewersPool[(hash + 3) % reviewersPool.length];
  const r3 = reviewersPool[(hash + 5) % reviewersPool.length];

  const catHighlights = {
    namkeen: ["Authentic Besan Crunch", "100% Pure Groundnut Oil", "Classic Savoury Taste"],
    chips: ["Super Crispy Slices", "Bold Seasoning", "No Palm Oil"],
    healthy: ["Nutrient Rich", "Low Oil Snacking", "Guilt-Free Crunch"]
  };

  const tagsList = catHighlights[prod.category] || ["Artisan Recipe", "Fresh Aroma", "Perfect Spice"];

  return {
    avgScore: parseFloat(avg),
    reviewCount: count,
    distribution: { 5: p5, 4: p4, 3: 3, 2: 1, 1: 0 },
    reviews: [
      {
        id: `seed_${prod.id}_1`,
        author: r1.name,
        rating: 5,
        date: "20 Sep 2026",
        tags: [tagsList[0], tagsList[1]],
        comment: `The flavor and crunch of ${prod.title} is top-tier! Perfectly seasoned, crisp in every bite, and fried in pure groundnut oil with no heavy aftertaste.`,
        verified: true
      },
      {
        id: `seed_${prod.id}_2`,
        author: r2.name,
        rating: 5,
        date: "14 Sep 2026",
        tags: [tagsList[2], "Chai Time Special"],
        comment: `Ordered ${prod.title} after trying their chips and this did not disappoint. Extremely fresh and packaged with great care.`,
        verified: true
      },
      {
        id: `seed_${prod.id}_3`,
        author: r3.name,
        rating: 4,
        date: "06 Sep 2026",
        tags: ["Fresh Aroma", "Munching Favorite"],
        comment: `Very crunchy with a balanced savory kick. Everyone at home enjoyed snacking on ${prod.title} during tea time.`,
        verified: true
      }
    ]
  };
}

// Open Dynamic Snack Rating Modal with dynamic product context
function openSnackRatingModal(snackTitle, orderId) {
  const modalTitleEl = document.getElementById('rating-modal-snack-title');
  const snackNameInput = document.getElementById('snack-review-product-name');
  const orderIdInput = document.getElementById('snack-review-order-id');
  const commentInput = document.getElementById('snack-review-comment');
  const starInput = document.getElementById('snack-review-stars-val');

  const title = snackTitle || (currentDetailPageProduct ? currentDetailPageProduct.title : "Snack");
  const oid = orderId || "SNK-" + Math.floor(100000 + Math.random() * 900000);

  if (modalTitleEl) modalTitleEl.textContent = `Review: ${title}`;
  if (snackNameInput) snackNameInput.value = title;
  if (orderIdInput) orderIdInput.value = oid;
  if (commentInput) commentInput.value = '';
  if (starInput) starInput.value = 5;

  // Reset star rating UI to 5
  const starBtns = document.querySelectorAll('#modal-star-rating .star-item-btn');
  starBtns.forEach(b => b.classList.add('active'));
  const statusText = document.getElementById('star-rating-status-text');
  if (statusText) statusText.textContent = STAR_RATING_LABELS[5];

  // Open Modal
  const modalEl = document.getElementById('snackRatingModal');
  if (modalEl && window.bootstrap && window.bootstrap.Modal) {
    const bsModal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
  }
}

// Helper to open snack review modal directly from product detail page
function openSnackRatingModalFromDetail() {
  const prod = currentDetailPageProduct || findProductByIdOrSlug(new URLSearchParams(window.location.search).get('id')) || SNACKY_PRODUCTS[1];
  openSnackRatingModal(prod.title, "SNK-" + (prod.id || 102));
}

// Submit Product-Specific Snack Review to localStorage ('snacky_reviews')
function submitSnackReview() {
  const snackNameInput = document.getElementById('snack-review-product-name');
  const orderIdInput = document.getElementById('snack-review-order-id');
  const starInput = document.getElementById('snack-review-stars-val');
  const commentInput = document.getElementById('snack-review-comment');

  const prod = currentDetailPageProduct || findProductByIdOrSlug(new URLSearchParams(window.location.search).get('id')) || SNACKY_PRODUCTS[1];
  const snackTitle = snackNameInput && snackNameInput.value ? snackNameInput.value : prod.title;
  const orderId = orderIdInput ? orderIdInput.value : 'SNK-8947291';
  const rating = parseInt(starInput ? starInput.value : 5, 10) || 5;
  const comment = commentInput ? commentInput.value.trim() : '';

  // Collect selected quick tags
  const activeTags = [];
  document.querySelectorAll('#snack-review-tag-pills .snack-tag-pill.active').forEach(tag => {
    const tagText = tag.getAttribute('data-tag') || tag.textContent.trim();
    if (tagText) activeTags.push(tagText);
  });

  // Determine author name
  let authorName = "Aarav Sharma";
  try {
    const rawSession = localStorage.getItem('snacky_user_session');
    if (rawSession) {
      const session = JSON.parse(rawSession);
      if (session && session.name) {
        authorName = session.name;
      }
    }
  } catch (e) {
    console.warn("Could not read user session for review author", e);
  }

  const newReview = {
    id: 'rev_' + Date.now(),
    orderId: orderId,
    productId: prod.id,
    snackTitle: snackTitle,
    rating: rating,
    tags: activeTags.length > 0 ? activeTags : ["Extra Crispy", "Perfect Spice"],
    comment: comment || `Super fresh and authentic crunch! The quality of ${snackTitle} is unbeatable.`,
    author: authorName,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    verified: true
  };

  try {
    const existing = JSON.parse(localStorage.getItem('snacky_reviews') || '[]');
    existing.unshift(newReview);
    localStorage.setItem('snacky_reviews', JSON.stringify(existing));
  } catch (e) {
    console.error("Error saving snack review to localStorage:", e);
  }

  // Close active modal safely
  const modalEl = document.getElementById('snackRatingModal');
  if (modalEl && window.bootstrap && window.bootstrap.Modal) {
    const bsModal = window.bootstrap.Modal.getInstance(modalEl);
    if (bsModal) {
      bsModal.hide();
    } else {
      const closeBtn = modalEl.querySelector('.btn-feedback-close, [data-bs-dismiss="modal"]');
      if (closeBtn) closeBtn.click();
    }
  }

  // Reset form inputs
  if (commentInput) commentInput.value = '';

  // Show confirmation toast
  showToast(`⭐ Thank you for reviewing ${snackTitle}!`);

  // Dynamically update product reviews feed for this product
  renderProductReviews(prod);
}

// Render dynamic customer reviews on product-detail.html
function renderProductReviews(prod) {
  const container = document.getElementById('product-reviews-feed-container');
  if (!container) return;

  if (!prod) {
    prod = currentDetailPageProduct || findProductByIdOrSlug(new URLSearchParams(window.location.search).get('id')) || SNACKY_PRODUCTS[1];
  }
  currentDetailPageProduct = prod;

  const reviewData = getProductSpecificReviews(prod);

  // Read user reviews submitted specifically for this product
  let userReviews = [];
  try {
    const allStored = JSON.parse(localStorage.getItem('snacky_reviews') || '[]');
    userReviews = allStored.filter(r => 
      (r.snackTitle && r.snackTitle.toLowerCase() === prod.title.toLowerCase()) || 
      (r.productId && String(r.productId) === String(prod.id))
    );
  } catch (e) {
    console.warn("Could not parse snacky_reviews from localStorage", e);
  }

  const allReviews = [...userReviews, ...reviewData.reviews];
  const totalVerifiedCount = reviewData.reviewCount + userReviews.length;

  // Update Summary Score Card
  const avgScoreEl = document.getElementById('product-detail-avg-score');
  const avgStarsEl = document.getElementById('product-detail-avg-stars');
  const countEl = document.getElementById('product-detail-review-count');

  if (avgScoreEl) avgScoreEl.textContent = reviewData.avgScore.toFixed(1);
  if (avgStarsEl) {
    const fullStars = Math.floor(reviewData.avgScore);
    const halfStar = reviewData.avgScore % 1 >= 0.5;
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
      } else if (i === fullStars + 1 && halfStar) {
        starsHtml += '<i class="bi bi-star-half text-warning me-1"></i>';
      } else {
        starsHtml += '<i class="bi bi-star text-warning me-1"></i>';
      }
    }
    avgStarsEl.innerHTML = starsHtml;
  }
  if (countEl) {
    countEl.textContent = `Based on ${totalVerifiedCount} verified foodies`;
  }

  // Update star progress bars
  const d = reviewData.distribution;
  const updateBar = (star, pct) => {
    const fillEl = document.querySelector(`.rating-fill-${star}`);
    if (fillEl) {
      fillEl.style.width = `${pct}%`;
      fillEl.setAttribute('aria-valuenow', pct);
      const percentLabel = fillEl.closest('.rating-bar-row')?.querySelector('.rating-bar-percent');
      if (percentLabel) percentLabel.textContent = `${pct}%`;
    }
  };
  updateBar(5, d[5]);
  updateBar(4, d[4]);
  updateBar(3, d[3]);
  updateBar(2, d[2]);
  updateBar(1, d[1]);

  // Render review cards
  container.innerHTML = allReviews.map(rev => {
    const starsHtml = Array.from({ length: 5 }, (_, i) => 
      `<i class="bi bi-star${i < rev.rating ? '-fill' : ''} text-warning me-1"></i>`
    ).join('');

    const tagsHtml = (rev.tags || []).map(t => 
      `<span class="review-tag-chip"><i class="bi bi-check2 text-success me-1"></i>${t}</span>`
    ).join('');

    const initial = rev.author ? rev.author.charAt(0).toUpperCase() : 'F';

    return `
      <div class="review-item-card">
        <div class="review-card-header">
          <div class="review-author-wrap">
            <div class="review-avatar">${initial}</div>
            <div>
              <h6 class="review-author-name">${rev.author}</h6>
              <span class="review-verified-badge"><i class="bi bi-patch-check-fill"></i> Verified Purchase</span>
            </div>
          </div>
          <span class="review-date-text">${rev.date}</span>
        </div>

        <div class="review-stars-box">
          ${starsHtml}
        </div>

        ${rev.tags && rev.tags.length > 0 ? `<div class="review-tags-box">${tagsHtml}</div>` : ''}

        <p class="review-comment-text">${rev.comment}</p>
      </div>
    `;
  }).join('');
}

// Render 4 Related Products in the same category on product-detail.html
function renderRelatedProducts(currentProd) {
  const container = document.getElementById('related-products-grid');
  const viewAllLink = document.getElementById('related-view-all-link');
  if (!container) return;

  if (!currentProd) {
    currentProd = currentDetailPageProduct || findProductByIdOrSlug(new URLSearchParams(window.location.search).get('id')) || SNACKY_PRODUCTS[1];
  }

  if (viewAllLink) {
    viewAllLink.href = `products.html?category=${currentProd.category}`;
    const catTitles = { namkeen: 'Namkeens', chips: 'Chips & Wafers', healthy: 'Healthy Snacks' };
    viewAllLink.innerHTML = `View All ${catTitles[currentProd.category] || 'Snacks'} <i class="bi bi-arrow-right ms-1"></i>`;
  }

  // Pick related products in the same category excluding the current product
  let related = SNACKY_PRODUCTS.filter(p => p.category === currentProd.category && p.id !== currentProd.id);

  // If this category has fewer than 4 items, pull from other categories
  if (related.length < 4) {
    const others = SNACKY_PRODUCTS.filter(p => p.id !== currentProd.id && !related.some(r => r.id === p.id));
    related = [...related, ...others];
  }

  // Exactly 4 related products
  const finalRelated = related.slice(0, 4);

  let html = '';
  finalRelated.forEach(p => {
    html += `
      <div class="col">
        <div class="product-card">
          <div class="card-top-frame">
            <a href="product-detail.html?id=${p.id}">
              <img src="${p.image}" alt="${p.title}" class="product-card-img" loading="lazy">
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
              `<button class="btn-card-add-to-cart" onclick="addToCart(${p.id})">
                 <i class="bi bi-cart-plus-fill me-1"></i> ADD TO CART
               </button>` : 
              `<button class="btn-card-disabled" disabled>OUT OF STOCK</button>`}
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// 20. Main Application Initialization
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderOffcanvasCart();
  renderCheckoutItems();
  updateNavbarUserSession();
  startOffersCountdownTimer();
  setupGlobalInputSanitizers();
  initAuthPage();
  initProfilePage();
  initTrackOrderPage();
  initFeedbackSystem();
  initFeedbackPage();
  renderProductReviews();

  window.addEventListener('pageshow', () => {
    updateNavbarUserSession();
    updateCartBadge();
  });

  window.addEventListener('storage', () => {
    updateCartBadge();
    renderOffcanvasCart();
    renderCheckoutItems();
    updateNavbarUserSession();
    renderProductReviews();
  });

  const occasionSec = document.getElementById('healthier-ways-section');
  if (occasionSec) {
    startOccasionAutoplay();
    occasionSec.addEventListener('mouseenter', stopOccasionAutoplay);
    occasionSec.addEventListener('mouseleave', startOccasionAutoplay);
  }

  const carouselEl = document.getElementById('snackyCarousel');
  if (carouselEl && window.bootstrap && window.bootstrap.Carousel) {
    const bsCarousel = window.bootstrap.Carousel.getOrCreateInstance(carouselEl, {
      interval: 2000,
      ride: 'carousel',
      wrap: true
    });
    bsCarousel.cycle();
  }

  // Sticky Fixed Navbar on Scroll Enforcer
  const mainNavbar = document.getElementById('main-navbar');
  if (mainNavbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 20) {
        mainNavbar.classList.add('navbar-fixed-scrolled');
      } else {
        mainNavbar.classList.remove('navbar-fixed-scrolled');
      }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  // Global Site Feedback Interactive Setup
  initFeedbackModalInteractivity();
});

// Newsletter Subscription Handler
window.handleNewsletterSubmit = function(formEl) {
  if (!formEl) return false;
  const emailInput = formEl.querySelector('input[type="email"]');
  if (!emailInput || !emailInput.value.trim()) return false;
  
  const email = emailInput.value.trim();
  const existingSubscribers = JSON.parse(localStorage.getItem('snacky_subscribers') || '[]');
  if (!existingSubscribers.includes(email)) {
    existingSubscribers.push(email);
    localStorage.setItem('snacky_subscribers', JSON.stringify(existingSubscribers));
  }
  
  formEl.reset();
  showToast('🎉 Welcome to the Snacky Squad! Check your inbox for 15% off.');
  return false;
};

// Global Site Feedback Modal Handlers
function initFeedbackModalInteractivity() {
  const emojiBtns = document.querySelectorAll('#site-feedback-emojis .emoji-item');
  const ratingInput = document.getElementById('site-feedback-rating-val');
  emojiBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      emojiBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (ratingInput) ratingInput.value = this.getAttribute('data-rating') || 'loved';
    });
  });

  const categoryBtns = document.querySelectorAll('#site-feedback-categories .feedback-pill-btn');
  const categoryInput = document.getElementById('site-feedback-category-val');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (categoryInput) categoryInput.value = this.getAttribute('data-category') || 'Taste & Freshness';
    });
  });
}

window.submitSiteFeedback = function() {
  const ratingVal = document.getElementById('site-feedback-rating-val')?.value || 'loved';
  const categoryVal = document.getElementById('site-feedback-category-val')?.value || 'Taste & Freshness';
  const messageVal = document.getElementById('site-feedback-message')?.value || '';

  const feedbacks = JSON.parse(localStorage.getItem('snacky_site_feedbacks') || '[]');
  feedbacks.push({
    id: 'FB-' + Date.now(),
    rating: ratingVal,
    category: categoryVal,
    message: messageVal,
    date: new Date().toISOString()
  });
  localStorage.setItem('snacky_site_feedbacks', JSON.stringify(feedbacks));

  const modalEl = document.getElementById('siteFeedbackModal');
  if (modalEl && window.bootstrap && window.bootstrap.Modal) {
    const modalInstance = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
    modalInstance.hide();
  }

  const form = document.getElementById('site-feedback-form');
  if (form) form.reset();

  showToast('💖 Thank you for your feedback! We are constantly making Snacky better.');
};

// --------------------------------------------------------------------------
// 21. Dedicated Feedback Page (feedback.html) Functionality
// --------------------------------------------------------------------------
function initFeedbackPage() {
  const form = document.getElementById('feedback-page-form');
  if (!form) return;

  // Emoji Selector
  const emojiBtns = document.querySelectorAll('#feedback-page-emojis .feedback-emoji-btn');
  const ratingInput = document.getElementById('feedback-page-rating-val');
  emojiBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      emojiBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (ratingInput) ratingInput.value = this.getAttribute('data-rating') || 'loved';
    });
  });

  // Category Selector
  const catBtns = document.querySelectorAll('#feedback-page-categories .feedback-category-tag');
  const catInput = document.getElementById('feedback-page-category-val');
  catBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      catBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (catInput) catInput.value = this.getAttribute('data-category') || 'Taste & Freshness';
    });
  });

  // Category Filter Tabs for Community Love
  const filterBtns = document.querySelectorAll('#community-feedback-filters .feedback-filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter') || 'all';
      filterCommunityFeedbacks(filter);
    });
  });

  // Auto-fill logged in user info if available
  try {
    const session = JSON.parse(localStorage.getItem('snacky_user_session') || '{}');
    if (session.name) {
      const nameInput = document.getElementById('feedback-user-name');
      if (nameInput && !nameInput.value) nameInput.value = session.name;
    }
    if (session.email || session.phone) {
      const emailInput = document.getElementById('feedback-user-email');
      if (emailInput && !emailInput.value) emailInput.value = session.email || session.phone;
    }
  } catch (e) {
    // ignore
  }

  renderStoredFeedbacksOnPage();
}

function filterCommunityFeedbacks(category) {
  const items = document.querySelectorAll('#community-feedbacks-container .feedback-item-node');
  items.forEach(item => {
    const cat = item.getAttribute('data-cat') || '';
    if (category === 'all' || cat.toLowerCase() === category.toLowerCase()) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function renderStoredFeedbacksOnPage() {
  const container = document.getElementById('community-feedbacks-container');
  if (!container) return;

  try {
    const stored = JSON.parse(localStorage.getItem('snacky_site_feedbacks') || '[]');
    stored.forEach(fb => {
      if (!fb.message) return;
      const initial = (fb.author || 'Muncher').charAt(0).toUpperCase();
      const ratingLabel = fb.rating === 'loved' ? '😍 Loved' : (fb.rating === 'good' ? '😊 Good' : (fb.rating === 'okay' ? '😐 Okay' : '😞 Sad'));
      const badgeClass = fb.rating === 'loved' ? 'bg-warning text-dark' : 'bg-success text-white';
      
      const newCard = document.createElement('div');
      newCard.className = 'col-12 feedback-item-node';
      newCard.setAttribute('data-cat', fb.category || 'Taste & Freshness');
      newCard.innerHTML = `
        <div class="feedback-community-card">
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center gap-3">
                <div class="feedback-user-avatar">${initial}</div>
                <div>
                  <div class="fw-bold text-navy">${fb.author || 'Verified Muncher'}</div>
                  <div class="small text-muted">${fb.snack ? fb.snack + ' • ' : ''}Verified Snacky Foodie</div>
                </div>
              </div>
              <span class="badge ${badgeClass} fw-bold px-2 py-1">${ratingLabel}</span>
            </div>
            <p class="feedback-quote-text">
              "${fb.message}"
            </p>
          </div>
          <div class="d-flex align-items-center justify-content-between pt-2 border-top">
            <span class="small text-navy fw-bold"><i class="bi bi-tag-fill text-warning me-1"></i> ${fb.category || 'General Feedback'}</span>
            <span class="small text-muted">Just now</span>
          </div>
        </div>
      `;
      container.prepend(newCard);
    });
  } catch (e) {
    console.error("Error reading stored feedbacks", e);
  }
}

window.handleFeedbackPageSubmit = function() {
  const name = document.getElementById('feedback-user-name')?.value.trim() || 'Snacky Muncher';
  const email = document.getElementById('feedback-user-email')?.value.trim() || '';
  const snack = document.getElementById('feedback-snack-product')?.value.trim() || '';
  const rating = document.getElementById('feedback-page-rating-val')?.value || 'loved';
  const category = document.getElementById('feedback-page-category-val')?.value || 'Taste & Freshness';
  const message = document.getElementById('feedback-page-message')?.value.trim() || '';

  if (!message) {
    showToast('⚠️ Please write your feedback before submitting.');
    return;
  }

  const feedbackObj = {
    id: 'FB-' + Date.now(),
    author: name,
    email: email,
    snack: snack,
    rating: rating,
    category: category,
    message: message,
    date: new Date().toISOString()
  };

  try {
    const feedbacks = JSON.parse(localStorage.getItem('snacky_site_feedbacks') || '[]');
    feedbacks.unshift(feedbackObj);
    localStorage.setItem('snacky_site_feedbacks', JSON.stringify(feedbacks));
  } catch (e) {
    console.error("Error saving feedback:", e);
  }

  // Prepend to community list instantly
  const container = document.getElementById('community-feedbacks-container');
  if (container) {
    const initial = name.charAt(0).toUpperCase();
    const ratingLabel = rating === 'loved' ? '😍 Loved' : (rating === 'good' ? '😊 Good' : (rating === 'okay' ? '😐 Okay' : '😞 Sad'));
    const badgeClass = rating === 'loved' ? 'bg-warning text-dark' : 'bg-success text-white';
    
    const newCard = document.createElement('div');
    newCard.className = 'col-12 feedback-item-node';
    newCard.setAttribute('data-cat', category);
    newCard.innerHTML = `
      <div class="feedback-community-card">
        <div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div class="d-flex align-items-center gap-3">
              <div class="feedback-user-avatar">${initial}</div>
              <div>
                <div class="fw-bold text-navy">${name}</div>
                <div class="small text-muted">${snack ? snack + ' • ' : ''}Verified Snacky Foodie</div>
              </div>
            </div>
            <span class="badge ${badgeClass} fw-bold px-2 py-1">${ratingLabel}</span>
          </div>
          <p class="feedback-quote-text">
            "${message}"
          </p>
        </div>
        <div class="d-flex align-items-center justify-content-between pt-2 border-top">
          <span class="small text-navy fw-bold"><i class="bi bi-tag-fill text-warning me-1"></i> ${category}</span>
          <span class="small text-muted">Just now</span>
        </div>
      </div>
    `;
    container.prepend(newCard);
  }

  const form = document.getElementById('feedback-page-form');
  if (form) form.reset();

  showToast('💖 Thank you! Your feedback was saved and submitted successfully.');
};

// --------------------------------------------------------------------------
// 21. Global Scroll Reveal & Interactive Animation Engine
// --------------------------------------------------------------------------
function initGlobalScrollRevealAndAnimations() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Respect accessibility preference
  }

  // Automatic target selectors to observe for scroll entrance
  const targetSelectors = [
    '.reveal-on-scroll',
    '.reveal-fade-up',
    '.reveal-scale',
    '.reveal-fade-left',
    '.reveal-fade-right',
    '.snack-product-card',
    '.product-card',
    '.feature-card',
    '.category-card',
    '.banner-card',
    '.order-card',
    '.address-card',
    '.offer-card',
    '.feedback-community-card',
    '.feedback-card',
    '.about-card',
    '.about-belief-card',
    '.about-range-card',
    '.about-moment-card',
    '.about-feature-card',
    '.about-value-card',
    '.about-commitment-card',
    '.about-mv-card',
    '.about-quality-item',
    '.stat-card',
    'section > .container',
    '.checkout-step-card'
  ];

  if (!('IntersectionObserver' in window)) {
    // Fallback if browser doesn't support IntersectionObserver
    document.querySelectorAll(targetSelectors.join(',')).forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  window.observeScrollElements = function(rootEl = document) {
    const elements = rootEl.querySelectorAll(targetSelectors.join(','));
    elements.forEach((el, index) => {
      if (!el.classList.contains('is-revealed')) {
        if (!el.classList.contains('reveal-fade-up') && 
            !el.classList.contains('reveal-scale') && 
            !el.classList.contains('reveal-fade-left') && 
            !el.classList.contains('reveal-fade-right')) {
          el.classList.add('reveal-on-scroll');
        }
        // Apply slight stagger if items share parent row
        if (el.parentElement && el.parentElement.classList.contains('row')) {
          const colIndex = Array.from(el.parentElement.children).indexOf(el.closest('.col') || el);
          if (colIndex >= 0 && colIndex < 5) {
            el.style.transitionDelay = `${(colIndex % 4) * 0.08}s`;
          }
        }
        revealObserver.observe(el);
      }
    });
  };

  // Initial scan
  window.observeScrollElements();

  // Re-scan when new DOM contents appear
  const mutationObserver = new MutationObserver(() => {
    window.observeScrollElements();
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // Mobile Navbar Auto-Collapse on Anchor Click
  const navCollapse = document.getElementById('navbarContent');
  if (navCollapse && window.bootstrap && window.bootstrap.Collapse) {
    const navLinks = navCollapse.querySelectorAll('.nav-link-custom, .nav-auth-btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
}

// --------------------------------------------------------------------------
// 22. Global Hash Deep-Linking & In-Page Smooth Scroll Engine
// --------------------------------------------------------------------------
function scrollToHashTarget(hashString, isSmooth = true) {
  if (!hashString || hashString === '#' || hashString === '#!') return false;
  
  const rawId = hashString.replace(/^#/, '');
  // Resolve possible aliases
  let targetEl = document.getElementById(rawId) || document.querySelector(hashString);
  
  if (!targetEl && rawId === 'contact-faqs') {
    targetEl = document.getElementById('faq-section');
  } else if (!targetEl && rawId === 'faq-section') {
    targetEl = document.getElementById('contact-faqs');
  }

  if (targetEl) {
    const navBarHeight = 85;
    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - navBarHeight);

    window.scrollTo({
      top: offsetPosition,
      behavior: isSmooth ? 'smooth' : 'auto'
    });

    // If target is FAQ section or accordion, ensure first item is expanded
    if (rawId.includes('faq') || targetEl.id.includes('faq') || targetEl.querySelector('#contactFaqAccordion')) {
      const firstCollapse = targetEl.querySelector('.accordion-collapse');
      if (firstCollapse && !firstCollapse.classList.contains('show') && window.bootstrap && window.bootstrap.Collapse) {
        const bsCollapse = new window.bootstrap.Collapse(firstCollapse, { toggle: true });
      }
    }

    // Add subtle visual feedback highlight
    targetEl.classList.remove('section-target-highlight');
    void targetEl.offsetWidth; // trigger reflow
    targetEl.classList.add('section-target-highlight');
    setTimeout(() => {
      targetEl.classList.remove('section-target-highlight');
    }, 3200);

    return true;
  }
  return false;
}

function initGlobalHashNavigation() {
  // Handle current URL hash on initial page load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToHashTarget(window.location.hash, true);
    }, 200);
  }

  // Listen for hash changes in URL
  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      scrollToHashTarget(window.location.hash, true);
    }
  });

  // Intercept in-page and same-page footer / header anchor link clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href*="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;

    try {
      const url = new URL(anchor.href, window.location.href);
      const isCurrentPage = (url.pathname === window.location.pathname || 
                             url.pathname.endsWith(window.location.pathname.split('/').pop())) &&
                            url.search === window.location.search;

      if (isCurrentPage && url.hash) {
        const handled = scrollToHashTarget(url.hash, true);
        if (handled) {
          e.preventDefault();
          history.pushState(null, '', url.hash);
        }
      }
    } catch(err) {
      // Relative hash fallback
      if (href.startsWith('#')) {
        const handled = scrollToHashTarget(href, true);
        if (handled) {
          e.preventDefault();
          history.pushState(null, '', href);
        }
      }
    }
  });
}

// Call on startup
document.addEventListener('DOMContentLoaded', () => {
  initGlobalScrollRevealAndAnimations();
  initGlobalHashNavigation();
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      scrollToHashTarget(window.location.hash, true);
    }, 100);
  }
});

// --------------------------------------------------------------------------
// 23. Custom Snack Mix Engine (Mix Your Own Snack)
// --------------------------------------------------------------------------
const CUSTOM_MIX_INGREDIENTS = [
  {
    id: "chips",
    name: "Chips",
    pricePer50g: 30, // ₹30 per 50g
    step: 25,
    icon: "🥔",
    desc: "Crispy salted potato wafer crisps",
    image: "../static/images/products/classic_salted_wafers_front.jpg"
  },
  {
    id: "sev",
    name: "Sev",
    pricePer50g: 25, // ₹25 per 50g
    step: 25,
    icon: "🍜",
    desc: "Golden crunchy gram flour strands",
    image: "../static/images/products/aloo_bhujia_delight_front.jpg"
  },
  {
    id: "boondi",
    name: "Boondi",
    pricePer50g: 24, // ₹24 per 50g
    step: 25,
    icon: "🟡",
    desc: "Spiced tiny crispy chickpea pearls",
    image: "../static/images/products/khatta_meetha_mix_front.jpg"
  },
  {
    id: "peanuts",
    name: "Peanuts",
    pricePer50g: 28, // ₹28 per 50g
    step: 25,
    icon: "🥜",
    desc: "Slow roasted spiced crunchy groundnuts",
    image: "../static/images/products/masala_peanuts_classic_front.jpg"
  },
  {
    id: "lentils",
    name: "Lentils",
    pricePer50g: 26, // ₹26 per 50g
    step: 25,
    icon: "🥣",
    desc: "Crispy fried golden salted moong dal",
    image: "../static/images/products/salted_moong_dal_front.jpg"
  },
  {
    id: "flattened_rice",
    name: "Flattened Rice",
    pricePer50g: 22, // ₹22 per 50g
    step: 25,
    icon: "🌾",
    desc: "Roasted lightweight crispy spiced poha",
    image: "../static/images/products/poha_mixture_front.jpg"
  },
  {
    id: "chana_jor",
    name: "Chana Jor",
    pricePer50g: 32, // ₹32 per 50g
    step: 25,
    icon: "🧆",
    desc: "Tangy pressed black chickpeas with chaat masala",
    image: "../static/images/products/chana_dal_crunch_front.jpg"
  },
  {
    id: "gathiya",
    name: "Gathiya",
    pricePer50g: 26, // ₹26 per 50g
    step: 25,
    icon: "🥨",
    desc: "Soft crumbly carom-seed spiced gathiya",
    image: "../static/images/products/teekha_gathiya_front.jpg"
  },
  {
    id: "cornflakes",
    name: "Cornflakes",
    pricePer50g: 25, // ₹25 per 50g
    step: 25,
    icon: "🌽",
    desc: "Crunchy sweet & spicy golden cornflakes",
    image: "../static/images/products/spicy_corn_mixture_front.jpg"
  },
  {
    id: "banana_chips",
    name: "Banana Chips",
    pricePer50g: 35, // ₹35 per 50g
    step: 25,
    icon: "🍌",
    desc: "Crispy Kerala raw banana roundels in groundnut oil",
    image: "../static/images/products/banana_chips_salted_front.jpg"
  },
  {
    id: "masala_peas",
    name: "Masala Peas",
    pricePer50g: 30, // ₹30 per 50g
    step: 25,
    icon: "🟢",
    desc: "Crisp fried green peas tossed in tangy pepper seasoning",
    image: "../static/images/products/paachratan_mixture_front.jpg"
  },
  {
    id: "papdi",
    name: "Papdi",
    pricePer50g: 24, // ₹24 per 50g
    step: 25,
    icon: "🫓",
    desc: "Crispy wafer flakes with ajwain flavor",
    image: "../static/images/products/butter_chakli_front.jpg"
  }
];

let customMixState = {
  quantities: {}, // { [id]: grams }
  editingCartIndex: null
};

function initMixYourSnackPage() {
  const container = document.getElementById('mix-customizer-app');
  if (!container) return;

  // Initialize all quantities to 0
  customMixState.quantities = {};
  CUSTOM_MIX_INGREDIENTS.forEach(ing => {
    customMixState.quantities[ing.id] = 0;
  });

  // Check if editing existing cart mix from URL query ?edit=0
  const urlParams = new URLSearchParams(window.location.search);
  const editParam = urlParams.get('edit');
  if (editParam !== null && editParam !== undefined && editParam !== '') {
    const editIdx = parseInt(editParam, 10);
    snackyCart = getFreshCart();
    if (!isNaN(editIdx) && snackyCart[editIdx] && snackyCart[editIdx].isCustomMix) {
      customMixState.editingCartIndex = editIdx;
      const existingItem = snackyCart[editIdx];
      if (existingItem.rawQuantities) {
        Object.keys(existingItem.rawQuantities).forEach(k => {
          if (customMixState.quantities[k] !== undefined) {
            customMixState.quantities[k] = existingItem.rawQuantities[k] || 0;
          }
        });
      } else if (existingItem.ingredients && Array.isArray(existingItem.ingredients)) {
        existingItem.ingredients.forEach(ing => {
          if (ing.id && customMixState.quantities[ing.id] !== undefined) {
            customMixState.quantities[ing.id] = ing.qtyGrams || 0;
          }
        });
      }
      showToast("Restored your custom mix for editing!");
    }
  }

  renderMixIngredientsGrid();
  updateMixSummaryUI();
}

function renderMixIngredientsGrid() {
  const grid = document.getElementById('mix-ingredients-grid');
  if (!grid) return;

  let html = '';
  CUSTOM_MIX_INGREDIENTS.forEach((ing, index) => {
    const qty = customMixState.quantities[ing.id] || 0;
    const subtotal = Math.round((qty / 50) * ing.pricePer50g);
    const isActive = qty > 0;

    html += `
      <div class="mix-ingredient-row d-flex align-items-center justify-content-between py-2 px-2 px-md-3 border-bottom flex-wrap gap-2 ${isActive ? 'is-active-row' : ''}" id="mix-row-${ing.id}">
        <!-- 1. Number & Name & Price -->
        <div class="mix-row-info d-flex align-items-center gap-2">
          <span class="mix-row-num fw-bold text-muted">${index + 1}.</span>
          <span class="mix-row-name fw-extrabold text-navy fs-6">${ing.name}</span>
          <span class="mix-row-rate text-muted fs-8 font-monospace">(₹${ing.pricePer50g}/50g)</span>
        </div>

        <!-- Controls: [-]  ===o=====  [+]  50g  ₹30 -->
        <div class="mix-row-controls d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
          <button type="button" class="mix-btn-step" id="btn-minus-${ing.id}" onclick="changeIngredientQty('${ing.id}', -25)" ${qty <= 0 ? 'disabled' : ''} aria-label="Decrease ${ing.name}">[-]</button>
          
          <div class="mix-slider-track-wrap">
            <input type="range" class="mix-range-slider" id="slider-${ing.id}" min="0" max="500" step="25" value="${qty}" oninput="onMixSliderInput('${ing.id}', this.value)" aria-label="${ing.name} quantity slider">
          </div>
          
          <button type="button" class="mix-btn-step" id="btn-plus-${ing.id}" onclick="changeIngredientQty('${ing.id}', 25)" aria-label="Increase ${ing.name}">[+]</button>
          
          <span class="mix-row-qty-badge font-monospace" id="qty-disp-${ing.id}">${qty}g</span>
          <span class="mix-row-subtotal font-monospace" id="subtotal-${ing.id}">₹${subtotal}</span>
        </div>
      </div>`;
  });

  grid.innerHTML = html;
}

function onMixSliderInput(ingId, rawVal) {
  let val = parseInt(rawVal, 10) || 0;
  val = Math.max(0, Math.round(val / 25) * 25);

  let otherWeight = 0;
  CUSTOM_MIX_INGREDIENTS.forEach(ing => {
    if (ing.id !== ingId) {
      otherWeight += (customMixState.quantities[ing.id] || 0);
    }
  });

  if (otherWeight + val > 500) {
    val = Math.max(0, 500 - otherWeight);
    const slider = document.getElementById(`slider-${ingId}`);
    if (slider) slider.value = val;
    showToast("⚠️ Maximum packet weight is 500g. Please reduce another ingredient before adding more.");
    updateMixSummaryUI("Maximum packet weight is 500g. Please reduce another ingredient before adding more.");
  } else {
    updateMixSummaryUI(null);
  }

  customMixState.quantities[ingId] = val;

  // Update DOM elements for this row
  const qtyDisp = document.getElementById(`qty-disp-${ingId}`);
  const subtotalDisp = document.getElementById(`subtotal-${ingId}`);
  const minusBtn = document.getElementById(`btn-minus-${ingId}`);
  const rowEl = document.getElementById(`mix-row-${ingId}`);
  const ing = CUSTOM_MIX_INGREDIENTS.find(i => i.id === ingId);

  if (ing) {
    const subtotal = Math.round((val / 50) * ing.pricePer50g);
    if (qtyDisp) qtyDisp.textContent = `${val}g`;
    if (subtotalDisp) subtotalDisp.textContent = `₹${subtotal}`;
    if (minusBtn) minusBtn.disabled = (val <= 0);
    if (rowEl) {
      if (val > 0) rowEl.classList.add('is-active-row');
      else rowEl.classList.remove('is-active-row');
    }
  }

  updateMixSummaryUI();
}

function changeIngredientQty(ingId, delta) {
  const currentQty = customMixState.quantities[ingId] || 0;
  let totalWeight = 0;
  CUSTOM_MIX_INGREDIENTS.forEach(ing => {
    totalWeight += (customMixState.quantities[ing.id] || 0);
  });

  if (delta > 0) {
    if (totalWeight + delta > 500) {
      showToast("⚠️ Maximum packet weight is 500g. Please reduce another ingredient before adding more.");
      updateMixSummaryUI("Maximum packet weight is 500g. Please reduce another ingredient before adding more.");
      return;
    }
  }

  const newQty = Math.max(0, currentQty + delta);
  customMixState.quantities[ingId] = newQty;

  // Update specific row UI
  const rowEl = document.getElementById(`mix-row-${ingId}`);
  const qtyDisp = document.getElementById(`qty-disp-${ingId}`);
  const subtotalDisp = document.getElementById(`subtotal-${ingId}`);
  const minusBtn = document.getElementById(`btn-minus-${ingId}`);
  const slider = document.getElementById(`slider-${ingId}`);

  const ing = CUSTOM_MIX_INGREDIENTS.find(i => i.id === ingId);
  if (ing) {
    const subtotal = Math.round((newQty / 50) * ing.pricePer50g);
    if (qtyDisp) qtyDisp.textContent = `${newQty}g`;
    if (subtotalDisp) subtotalDisp.textContent = `₹${subtotal}`;
    if (minusBtn) minusBtn.disabled = (newQty <= 0);
    if (slider) slider.value = newQty;
    if (rowEl) {
      if (newQty > 0) rowEl.classList.add('is-active-row');
      else rowEl.classList.remove('is-active-row');
    }
  }

  updateMixSummaryUI();
}

function updateMixSummaryUI(alertMessage = null) {
  let totalWeight = 0;
  let totalPrice = 0;
  const selectedList = [];

  CUSTOM_MIX_INGREDIENTS.forEach(ing => {
    const qty = customMixState.quantities[ing.id] || 0;
    if (qty > 0) {
      const price = Math.round((qty / 50) * ing.pricePer50g);
      totalWeight += qty;
      totalPrice += price;
      selectedList.push({
        id: ing.id,
        name: ing.name,
        qtyGrams: qty,
        price: price
      });
    }
  });

  // Active ingredients badge
  const activeCountBadge = document.getElementById('active-ingredients-count');
  if (activeCountBadge) {
    activeCountBadge.textContent = `${selectedList.length} / 12 selected`;
  }

  // Weight display & progress bar
  const weightDisp = document.getElementById('mix-summary-weight-display');
  const progressBar = document.getElementById('mix-weight-progress-bar');
  const netWeightDisp = document.getElementById('mix-summary-net-weight');
  const totalPriceDisp = document.getElementById('mix-summary-total-price');
  const itemsCountDisp = document.getElementById('mix-items-summary-count');
  const emptyStateView = document.getElementById('mix-empty-state-view');
  const populatedList = document.getElementById('mix-populated-items-list');

  if (weightDisp) weightDisp.textContent = `${totalWeight}g / 500g`;
  if (netWeightDisp) netWeightDisp.textContent = `${totalWeight}g`;
  if (totalPriceDisp) totalPriceDisp.textContent = `₹${totalPrice}`;
  if (itemsCountDisp) itemsCountDisp.textContent = `${selectedList.length} item${selectedList.length === 1 ? '' : 's'}`;

  if (progressBar) {
    const pct = Math.min(100, (totalWeight / 500) * 100);
    progressBar.style.width = `${pct}%`;
    progressBar.setAttribute('aria-valuenow', totalWeight);

    if (totalWeight >= 200 && totalWeight <= 500) {
      progressBar.className = "progress-bar mix-weight-progress-bar bg-success";
    } else if (totalWeight > 500) {
      progressBar.className = "progress-bar mix-weight-progress-bar bg-danger";
    } else {
      progressBar.className = "progress-bar mix-weight-progress-bar bg-warning";
    }
  }

  // Render populated list vs empty state
  if (selectedList.length === 0) {
    if (emptyStateView) emptyStateView.classList.remove('d-none');
    if (populatedList) {
      populatedList.classList.add('d-none');
      populatedList.innerHTML = '';
    }
  } else {
    if (emptyStateView) emptyStateView.classList.add('d-none');
    if (populatedList) {
      populatedList.classList.remove('d-none');
      let listHtml = '';
      selectedList.forEach(item => {
        listHtml += `
          <div class="mix-selected-item-row">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold">${item.name}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-light text-navy border">${item.qtyGrams}g</span>
              <span class="fw-bold">₹${item.price}</span>
              <button type="button" class="btn btn-link text-danger p-0 ms-1" style="font-size: 0.8rem; text-decoration: none;" onclick="changeIngredientQty('${item.id}', -${item.qtyGrams})" title="Remove">✕</button>
            </div>
          </div>`;
      });
      populatedList.innerHTML = listHtml;
    }
  }

  // Validation alert banner
  const alertBox = document.getElementById('mix-validation-alert');
  const alertText = document.getElementById('mix-validation-alert-text');
  if (alertBox && alertText) {
    if (alertMessage) {
      alertText.textContent = alertMessage;
      alertBox.classList.remove('d-none');
    } else {
      alertBox.classList.add('d-none');
    }
  }
}

function resetCustomSnackMix() {
  CUSTOM_MIX_INGREDIENTS.forEach(ing => {
    customMixState.quantities[ing.id] = 0;
    const qtyDisp = document.getElementById(`qty-disp-${ing.id}`);
    const subtotalDisp = document.getElementById(`subtotal-${ing.id}`);
    const minusBtn = document.getElementById(`btn-minus-${ing.id}`);
    const slider = document.getElementById(`slider-${ing.id}`);
    const rowEl = document.getElementById(`mix-row-${ing.id}`);

    if (qtyDisp) qtyDisp.textContent = `0g`;
    if (subtotalDisp) subtotalDisp.textContent = `₹0`;
    if (minusBtn) minusBtn.disabled = true;
    if (slider) slider.value = 0;
    if (rowEl) rowEl.classList.remove('is-active-row');
  });

  updateMixSummaryUI();
  showToast("Custom mix reset to 0g.");
}

function addCustomMixToCart() {
  let totalWeight = 0;
  let totalPrice = 0;
  const selectedList = [];

  CUSTOM_MIX_INGREDIENTS.forEach(ing => {
    const qty = customMixState.quantities[ing.id] || 0;
    if (qty > 0) {
      const price = Math.round((qty / 50) * ing.pricePer50g);
      totalWeight += qty;
      totalPrice += price;
      selectedList.push({
        id: ing.id,
        name: ing.name,
        qtyGrams: qty,
        price: price
      });
    }
  });

  if (totalWeight === 0) {
    showToast("⚠️ Please select at least one ingredient.");
    updateMixSummaryUI("Please select at least one ingredient.");
    return;
  }

  if (totalWeight < 200) {
    showToast("⚠️ Please select at least 200g to create your custom mix.");
    updateMixSummaryUI("Please select at least 200g to create your custom mix.");
    return;
  }

  if (totalWeight > 500) {
    showToast("⚠️ Maximum packet weight is 500g. Please reduce the quantity of another ingredient.");
    updateMixSummaryUI("Maximum packet weight is 500g. Please reduce the quantity of another ingredient.");
    return;
  }

  snackyCart = getFreshCart();

  const customCartItem = {
    id: (customMixState.editingCartIndex !== null && snackyCart[customMixState.editingCartIndex] && snackyCart[customMixState.editingCartIndex].isCustomMix)
        ? snackyCart[customMixState.editingCartIndex].id
        : "custom_mix_" + Date.now(),
    title: "Custom Snack Mix",
    isCustomMix: true,
    weight: `${totalWeight} g`,
    price: totalPrice,
    mrp: Math.round(totalPrice * 1.25),
    qty: 1,
    image: "",
    ingredients: selectedList,
    rawQuantities: { ...customMixState.quantities }
  };

  if (customMixState.editingCartIndex !== null && snackyCart[customMixState.editingCartIndex]) {
    snackyCart[customMixState.editingCartIndex] = customCartItem;
    customMixState.editingCartIndex = null;
  } else {
    snackyCart.push(customCartItem);
  }

  saveCartState();
  showToast("🎉 Your custom snack mix has been added to your cart!");

  // Open the offcanvas cart drawer or redirect
  try {
    const cartEl = document.getElementById('cartOffcanvas');
    if (cartEl && window.bootstrap && bootstrap.Offcanvas) {
      const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(cartEl);
      offcanvasInstance.show();
    }
  } catch(e) {}
}

function editCustomMixFromCart(cartIndex) {
  window.location.href = `mix-your-snack.html?edit=${cartIndex}`;
}




