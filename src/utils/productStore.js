// Local product storage and category management for Harmony Home Textiles

export const INITIAL_GOODS = [
  // 1. Bedcovers & Sets
  {
    id: "G-101",
    title: "Royal Sateen Quilted Bedcover",
    category: "bedcovers",
    specs: "600 TC Egyptian Combed Cotton",
    desc: "Delicately quilted with geometric diamond stitching and velvet piping. Breathable comfort for all seasons.",
    tc: "600 Thread Count",
    size: "King (90\" x 108\")",
    feel: "Silky, Cool & Fluid",
    warmth: "All Seasons",
    price: "NPR 9,500",
    img: "/stack-cushions.jpg",
    stock: "In Stock · Shop 141"
  },
  {
    id: "G-102",
    title: "Imperial Jacquard Woven Bedcover",
    category: "bedcovers",
    specs: "Damask Weave with Golden Zari Trims",
    desc: "Heirloom jacquard bedcover crafted for festive and sacred bedroom aesthetics in Kathmandu.",
    tc: "Heavyweight Jacquard",
    size: "Queen / King",
    feel: "Substantial & Regal",
    warmth: "Mid-Season",
    price: "NPR 11,200",
    img: "/hero-bed.jpg",
    stock: "Available at Boutique"
  },

  // 2. Bedsheets
  {
    id: "G-201",
    title: "Egyptian Combed Cotton Sheet Set",
    category: "sheets",
    specs: "600 TC Percale Crisp Weave",
    desc: "Includes 1 flat sheet, 1 fitted sheet, and 2 pillow covers. Hypoallergenic and exceptionally soft.",
    tc: "600 Thread Count",
    size: "King Fitted Set",
    feel: "Crisp & Breathable",
    warmth: "Summer / Cool",
    price: "NPR 6,800",
    img: "/stack-cushions.jpg",
    stock: "In Stock"
  },
  {
    id: "G-202",
    title: "Lustrous Sateen Striped Bed Sheet",
    category: "sheets",
    specs: "800 TC Hotel Luxe Sateen",
    desc: "Subtle satin shadow stripe weave offering a five-star hotel drape and buttery hand-feel.",
    tc: "800 Thread Count",
    size: "King (108\" x 108\")",
    feel: "Liquid Silk Smooth",
    warmth: "All Seasons",
    price: "NPR 8,200",
    img: "/hero-bed.jpg",
    stock: "In Stock"
  },

  // 3. Quilts
  {
    id: "G-301",
    title: "Himalayan Hollow-Microfiber Quilt",
    category: "quilts",
    specs: "450 GSM Baffled Box Insulation",
    desc: "Engineered specifically for cool Kathmandu mountain evenings. Featherweight loft without down allergens.",
    tc: "450 GSM Fill",
    size: "Double (90\" x 100\")",
    feel: "Plush, Cloud-Loft",
    warmth: "Sub-Zero Mountain Rated",
    price: "NPR 12,800",
    img: "/hero-bed.jpg",
    stock: "High Demand"
  },
  {
    id: "G-302",
    title: "Summer Breeze Lightweight Quilt",
    category: "quilts",
    specs: "250 GSM Pure Cotton Wadding",
    desc: "Ultra-breathable summer coverlet with hand-stitched kantha detailing. Cool and peaceful sleep.",
    tc: "250 GSM Pure Cotton",
    size: "Single / Double",
    feel: "Lightweight & Airy",
    warmth: "Mild Climates",
    price: "NPR 7,400",
    img: "/stack-cushions.jpg",
    stock: "In Stock"
  },

  // 4. Blankets
  {
    id: "G-401",
    title: "Dual-Ply Cloud Fleece Blanket",
    category: "blankets",
    specs: "550 GSM Double-Layered Fleece",
    desc: "Weightless pressure-relief blanket with tailored burgundy velvet binding and anti-pilling brushed finish.",
    tc: "Dual-Ply 550 GSM",
    size: "King (85\" x 95\")",
    feel: "Velvety & Enveloping",
    warmth: "High Thermal Index",
    price: "NPR 6,200",
    img: "/stack-cushions.jpg",
    stock: "In Stock"
  },
  {
    id: "G-402",
    title: "Pure Mountain Wool Blend Blanket",
    category: "blankets",
    specs: "Himalayan Highland Sheep Wool",
    desc: "Traditional dense weave offering natural moisture wicking and organic insulating warmth.",
    tc: "100% Wool Blend",
    size: "Double (80\" x 90\")",
    feel: "Rustic & Deep Warmth",
    warmth: "Extreme Cold",
    price: "NPR 9,800",
    img: "/hero-bed.jpg",
    stock: "Artisanal Reserve"
  },

  // 5. Cushion Covers
  {
    id: "G-501",
    title: "Zari Embroidered Velvet Cushion Covers",
    category: "cushions",
    specs: "Set of 5 · Traditional Zari Trims",
    desc: "Rich jewel-toned velvet cushion covers with metallic embroidery and hidden brass zippers.",
    tc: "Heavyweight Velvet",
    size: "16\" x 16\" (Set of 5)",
    feel: "Opulent & Textured",
    warmth: "Decorative Layer",
    price: "NPR 4,500",
    img: "/stack-cushions.jpg",
    stock: "In Stock"
  },
  {
    id: "G-502",
    title: "Raw Mulberry Silk Accent Cushion",
    category: "cushions",
    specs: "Handloom Slub Silk Weave",
    desc: "Organic textured slub silk in saffron and terracotta hues, providing an earthy artisanal aesthetic.",
    tc: "Pure Slub Silk",
    size: "18\" x 18\" (Set of 2)",
    feel: "Textured Raw Silk",
    warmth: "Decorative Layer",
    price: "NPR 3,800",
    img: "/hero-bed.jpg",
    stock: "In Stock"
  },

  // 6. Carpets & Rugs
  {
    id: "G-601",
    title: "Kathmandu Valley Hand-Knotted Carpet",
    category: "carpets",
    specs: "80 Knots · Mountain Wool",
    desc: "Authentic living room runner featuring traditional geometric borders and plush wool pile.",
    tc: "80 Knots per sq. in.",
    size: "5' x 7' Area Rug",
    feel: "Dense & Cushioned",
    warmth: "Insulating Floor Base",
    price: "NPR 18,500",
    img: "/stack-cushions.jpg",
    stock: "Limited Edition"
  },

  // 7. Towels
  {
    id: "G-701",
    title: "Zero-Twist Spa Bath Towel Collection",
    category: "towels",
    specs: "700 GSM Combed Ring-Spun Cotton",
    desc: "Extra-absorbent luxury bath towels offering instant cloud softness and rapid drying.",
    tc: "700 GSM Zero-Twist",
    size: "Bath Sheet + Hand Towel",
    feel: "Ultra-Plush & Absorbent",
    warmth: "Bathroom Essential",
    price: "NPR 3,200",
    img: "/hero-bed.jpg",
    stock: "In Stock"
  }
];

export const DEFAULT_CATEGORIES = [
  { key: "all", label: "All Goods" },
  { key: "bedcovers", label: "Bedcovers" },
  { key: "sheets", label: "Bedsheets" },
  { key: "quilts", label: "Luxury Quilts" },
  { key: "blankets", label: "Blankets" },
  { key: "cushions", label: "Cushion Covers" },
  { key: "carpets", label: "Carpets & Rugs" },
  { key: "towels", label: "Bath Towels" }
];

const STORAGE_KEY = 'harmony_goods_v1';
const AUTH_KEY = 'harmony_admin_auth_v1';

export function getStoredProducts() {
  if (typeof window === 'undefined') return INITIAL_GOODS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GOODS));
      return INITIAL_GOODS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_GOODS;
  } catch (err) {
    console.error("Failed to read products from localStorage:", err);
    return INITIAL_GOODS;
  }
}

export function saveProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('harmony-products-updated', { detail: products }));
  } catch (err) {
    console.error("Failed to save products to localStorage:", err);
  }
}

export function addProduct(newProduct) {
  const current = getStoredProducts();
  const id = newProduct.id?.trim() || `G-${Date.now().toString().slice(-4)}`;
  const itemToAdd = {
    ...newProduct,
    id,
    img: newProduct.img || '/stack-cushions.jpg'
  };
  const updated = [itemToAdd, ...current];
  saveProducts(updated);
  return itemToAdd;
}

export function updateProduct(id, updatedFields) {
  const current = getStoredProducts();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, ...updatedFields };
    }
    return item;
  });
  saveProducts(updated);
  return updated;
}

export function deleteProduct(id) {
  const current = getStoredProducts();
  const updated = current.filter(item => item.id !== id);
  saveProducts(updated);
  return updated;
}

export function resetToDefaults() {
  saveProducts(INITIAL_GOODS);
  return INITIAL_GOODS;
}

// Authentication Helpers
export const ADMIN_USERNAME = 'harmonyadmin';
export const ADMIN_PASSWORD = 'harmony@Admin';

export function checkAdminAuth() {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(AUTH_KEY) === 'authenticated' || localStorage.getItem(AUTH_KEY) === 'authenticated';
  } catch (e) {
    return false;
  }
}

export function setAdminAuth(authenticated, persist = true) {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      if (persist) {
        localStorage.setItem(AUTH_KEY, 'authenticated');
      }
    } else {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (e) {
    console.error("Auth error:", e);
  }
}

export function verifyAdminCredentials(user, pass) {
  return user?.trim() === ADMIN_USERNAME && pass === ADMIN_PASSWORD;
}
