import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  ArrowLeft,
  Search,
  Check,
  Eye,
  EyeOff,
  Lock,
  User,
  Upload,
  RefreshCw,
  AlertTriangle,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import {
  getStoredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetToDefaults,
  DEFAULT_CATEGORIES,
  verifyAdminCredentials,
  checkAdminAuth,
  setAdminAuth,
  ADMIN_USERNAME,
  ADMIN_PASSWORD
} from '../utils/productStore';

export default function AdminPanel({ onExitAdmin, onOpenPreview }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Products State
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = new item, object = edit
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

  // File input ref for image upload
  const fileInputRef = useRef(null);

  // Form State
  const initialFormData = {
    id: '',
    title: '',
    category: 'bedcovers',
    customCategory: '',
    specs: '',
    desc: '',
    tc: '',
    size: 'King (90" x 108")',
    feel: 'Silky & Fluid',
    warmth: 'All Seasons',
    price: 'NPR 8,500',
    img: '/stack-cushions.jpg',
    stock: 'In Stock · Shop 141'
  };
  const [formData, setFormData] = useState(initialFormData);

  // Check auth and load products on mount
  useEffect(() => {
    const auth = checkAdminAuth();
    setIsAuthenticated(auth);
    loadProducts();

    const handleStorageUpdate = () => {
      loadProducts();
    };
    window.addEventListener('harmony-products-updated', handleStorageUpdate);
    return () => window.removeEventListener('harmony-products-updated', handleStorageUpdate);
  }, []);

  const loadProducts = () => {
    setProducts(getStoredProducts());
  };

  const showToastNotification = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (verifyAdminCredentials(loginUser, loginPass)) {
      setAdminAuth(true, true);
      setIsAuthenticated(true);
      showToastNotification(`Welcome, ${ADMIN_USERNAME}! Master Atelier access granted.`);
    } else {
      setLoginError('Invalid credentials. Check username or password and retry.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setAdminAuth(false);
    setIsAuthenticated(false);
    setLoginPass('');
    showToastNotification('Logged out successfully from Admin Panel.', 'info');
  };

  // Open Form for Adding New Item
  const handleOpenAddForm = () => {
    setEditingItem(null);
    const generatedId = `G-${Math.floor(100 + Math.random() * 900)}`;
    setFormData({
      ...initialFormData,
      id: generatedId
    });
    setIsFormOpen(true);
  };

  // Open Form for Editing Existing Item
  const handleOpenEditForm = (item) => {
    setEditingItem(item);
    const isStandardCat = DEFAULT_CATEGORIES.some(c => c.key === item.category && c.key !== 'all');
    setFormData({
      id: item.id || '',
      title: item.title || '',
      category: isStandardCat ? item.category : 'custom',
      customCategory: isStandardCat ? '' : (item.category || ''),
      specs: item.specs || '',
      desc: item.desc || '',
      tc: item.tc || '',
      size: item.size || '',
      feel: item.feel || '',
      warmth: item.warmth || '',
      price: item.price || '',
      img: item.img || '/stack-cushions.jpg',
      stock: item.stock || 'In Stock'
    });
    setIsFormOpen(true);
  };

  // Image Upload Handler (Convert to Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToastNotification('Image exceeds 2MB limit. Please choose a smaller file.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData(prev => ({ ...prev, img: uploadEvent.target?.result }));
        showToastNotification('Custom image loaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submission (Add or Update)
  const handleSaveItem = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToastNotification('Please provide a title for the textile piece.', 'error');
      return;
    }

    const finalCategory = formData.category === 'custom'
      ? (formData.customCategory.trim().toLowerCase() || 'other')
      : formData.category;

    const itemPayload = {
      ...formData,
      title: formData.title.trim(),
      category: finalCategory,
      price: formData.price.trim() || 'NPR 0',
      specs: formData.specs.trim() || 'Handcrafted Boutique Textile',
      desc: formData.desc.trim() || 'Bespoke textile from Harmony Home Textiles Shop 141.',
      stock: formData.stock.trim() || 'In Stock',
      img: formData.img || '/stack-cushions.jpg'
    };

    if (editingItem) {
      updateProduct(editingItem.id, itemPayload);
      showToastNotification(`Updated "${itemPayload.title}" successfully!`);
    } else {
      addProduct(itemPayload);
      showToastNotification(`Added "${itemPayload.title}" to catalog!`);
    }

    setIsFormOpen(false);
    loadProducts();
  };

  // Delete Item Handler
  const handleConfirmDelete = () => {
    if (deleteConfirmItem) {
      deleteProduct(deleteConfirmItem.id);
      showToastNotification(`Removed "${deleteConfirmItem.title}" from catalog.`, 'info');
      setDeleteConfirmItem(null);
      loadProducts();
    }
  };

  // Reset Catalog Handler
  const handleConfirmReset = () => {
    resetToDefaults();
    showToastNotification('Catalog restored to default 12 boutique items.', 'info');
    setShowResetConfirm(false);
    loadProducts();
  };

  // Available unique categories from both defaults and loaded items
  const dynamicCategories = [
    { key: 'all', label: 'All Goods' },
    ...DEFAULT_CATEGORIES.filter(c => c.key !== 'all')
  ];

  // Also include any custom categories that items might have
  products.forEach(p => {
    if (p.category && !dynamicCategories.some(c => c.key === p.category)) {
      dynamicCategories.push({
        key: p.category,
        label: p.category.charAt(0).toUpperCase() + p.category.slice(1)
      });
    }
  });

  // Filter & Sort Products
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      item.title?.toLowerCase().includes(query) ||
      item.id?.toLowerCase().includes(query) ||
      item.desc?.toLowerCase().includes(query) ||
      item.specs?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'newest') return 0;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'price-low') {
      const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0', 10);
      const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0', 10);
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0', 10);
      const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0', 10);
      return priceB - priceA;
    }
    return 0;
  });

  // --- 1. LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-[#25080c] select-none text-[#ffe79a] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9e1822]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e5901c]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative z-10 glass-regal-dark rounded-3xl p-8 sm:p-10 border border-[#e5901c]/45 shadow-2xl space-y-6">
          {/* Sacred Blessing & Crest */}
          <div className="text-center space-y-2">
            <span className="font-serif text-xs text-[#e5901c] tracking-widest font-semibold block">
              ।। ॐ श्री गणेशाय नमः ।।
            </span>
            <div className="flex justify-center py-2">
              <img
                src="/harmony-logo.png"
                alt="Harmony Home Textiles"
                className="h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(229,144,28,0.35)]"
              />
            </div>
            <h1 className="font-editorial-title text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Atelier Admin Portal
            </h1>
            <p className="text-xs text-[#f3e5ab]/80 font-sans">
              Shop 141, China Town Shopping Complex, Kathmandu<br />
              <span className="text-[10px] font-mono text-[#e5901c]">Route: /admin2151</span>
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center space-x-2 animate-shake">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-sans uppercase tracking-widest text-[#f3e5ab] font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#e5901c]" />
                Username
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="harmonyadmin"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-[#e5901c] focus:ring-1 focus:ring-[#e5901c] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-sans uppercase tracking-widest text-[#f3e5ab] font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#e5901c]" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-[#e5901c] focus:ring-1 focus:ring-[#e5901c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#e5901c] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9e1822] via-[#b51c27] to-[#770f17] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-red-900/50 hover:brightness-110 active:scale-[0.99] transition-all border border-[#e5901c]/50 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-[#ffe79a]" />
              <span>Unlock Master Panel</span>
            </button>
          </form>

          {/* Return to website */}
          <div className="pt-2 text-center border-t border-[#e5901c]/25">
            <button
              type="button"
              onClick={onExitAdmin}
              className="text-xs text-[#e5901c] hover:text-white transition-colors inline-flex items-center space-x-1.5 font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Showroom</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. LOGGED-IN ADMIN PANEL ---
  return (
    <div className="min-h-screen text-[#2c0b0e] bg-[#fbf1e2] py-8 px-4 sm:px-8 select-none z-10 relative">
      
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-semibold backdrop-blur-md transition-all duration-300 animate-slide-in ${
          toast.type === 'error'
            ? 'bg-red-900/90 text-red-100 border border-red-500'
            : toast.type === 'info'
            ? 'bg-amber-900/90 text-amber-100 border border-[#e5901c]'
            : 'bg-emerald-900/90 text-emerald-100 border border-emerald-400'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-4 h-4 text-red-300" /> : <Check className="w-4 h-4 text-emerald-300" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <div className="max-w-7xl mx-auto pb-6 border-b border-[#e5901c]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Mode */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-full glass-crystal hover:bg-white/[0.2] text-[#9e1822] text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-1.5"
            title="Go to website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>

          <img
            src="/harmony-logo.png"
            alt="Harmony"
            className="h-9 w-auto object-contain"
          />

          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#9e1822] text-[#ffe79a] border border-[#e5901c]/50">
            Admin /admin2151
          </span>
        </div>

        {/* User Status & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs font-sans text-[#5c2419] px-3.5 py-1.5 rounded-full glass-amber-box">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Proprietor Master (<strong>{ADMIN_USERNAME}</strong>)</span>
          </div>

          <button
            onClick={handleOpenAddForm}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white text-xs font-bold tracking-wider uppercase shadow-sm hover:shadow-md hover:brightness-105 transition-all flex items-center space-x-1.5 border border-[#e5901c]/40 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#ffe79a]" />
            <span>Add New Item</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-full glass-crystal hover:bg-red-100 text-[#9e1822] text-xs font-semibold tracking-wider transition-colors flex items-center space-x-1 cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </div>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto pt-8 space-y-8">
        
        {/* Top Header & Metrics Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#e5901c] uppercase block">
              Boutique Operations // China Town Shop 141
            </span>
            <h1 className="font-editorial-title text-3xl sm:text-4xl font-bold text-[#9e1822] mt-1">
              Textile Catalog & Inventory Ledger
            </h1>
            <p className="text-xs sm:text-sm text-[#5c2419] font-light mt-1">
              Manage listed products, assign categories, modify pricing, edit specifications, or add new bespoke collections.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl glass-amber-box text-center min-w-[100px]">
              <span className="text-[10px] text-[#854a39] uppercase font-bold tracking-wider block">Items Listed</span>
              <span className="font-editorial-title text-2xl font-bold text-[#9e1822]">{products.length}</span>
            </div>
            <div className="p-3.5 rounded-2xl glass-amber-box text-center min-w-[100px]">
              <span className="text-[10px] text-[#854a39] uppercase font-bold tracking-wider block">Categories</span>
              <span className="font-editorial-title text-2xl font-bold text-[#e5901c]">{dynamicCategories.length - 1}</span>
            </div>
          </div>
        </div>

        {/* Filter, Search & Controls Bar */}
        <div className="glass-regal rounded-2xl p-5 border border-white/20 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#854a39] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, specs, ID (e.g. G-101), material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-amber-box text-xs text-[#2c0b0e] placeholder-[#854a39] outline-none focus:ring-1 focus:ring-[#9e1822] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#854a39] hover:text-[#2c0b0e]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Action Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 text-xs text-[#5c2419]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#e5901c]" />
                <span className="font-semibold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1.5 px-3 rounded-lg glass-amber-box text-xs text-[#2c0b0e] outline-none border-none font-semibold cursor-pointer"
                >
                  <option value="newest">Default Order</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-1.5 rounded-lg glass-crystal hover:bg-[#fae2b8]/80 text-[#854a39] hover:text-[#9e1822] text-[11px] font-semibold tracking-wider transition-colors flex items-center space-x-1 cursor-pointer"
                title="Restore original 12 items"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Factory Catalog</span>
              </button>
            </div>

          </div>

          {/* Category Filter Chips */}
          <div className="pt-2 border-t border-[#e5901c]/20 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-[#854a39] mr-1">
              Category:
            </span>
            {dynamicCategories.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white shadow-xs border border-[#e5901c]/40'
                    : 'glass-amber-box text-[#2c0b0e] hover:bg-[#fae2b8]/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(item => (
            <div
              key={item.id}
              className="glass-regal rounded-2xl p-4 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 border border-white/25 shadow-sm hover:shadow-md relative overflow-hidden"
            >
              <div>
                {/* Photo with Overlay Badges */}
                <div className="h-48 rounded-xl overflow-hidden mb-3.5 relative bg-[#fae2b8]/40 border border-[#e5901c]/25">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c0b0e]/70 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-[#9e1822]/90 text-[#ffe79a] border border-[#e5901c]/40 backdrop-blur-xs">
                    {item.category}
                  </span>

                  {/* Stock Tag */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-sans font-semibold bg-black/60 text-white backdrop-blur-xs">
                    {item.stock}
                  </span>

                  {/* Thread Count / Fill Weight */}
                  <span className="absolute bottom-2 left-2.5 text-[10px] font-mono font-bold text-white drop-shadow-md">
                    {item.tc}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#e5901c] font-bold">
                    <span>{item.id}</span>
                    <span>{item.size}</span>
                  </div>

                  <h3 className="font-editorial-title text-lg font-bold text-[#9e1822] leading-tight line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-[#e5901c] font-medium">
                    {item.specs}
                  </p>

                  <p className="text-xs text-[#5c2419] line-clamp-2 leading-relaxed font-light pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#e5901c]/25 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#854a39] uppercase font-semibold block">Price</span>
                    <span className="font-editorial-title text-base font-bold text-[#2c0b0e]">{item.price}</span>
                  </div>
                  
                  <button
                    onClick={() => onOpenPreview && onOpenPreview(item)}
                    className="text-[10px] text-[#e5901c] hover:text-[#9e1822] uppercase tracking-wider font-bold inline-flex items-center gap-1 cursor-pointer"
                    title="Preview full modal"
                  >
                    <span>View Spec</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditForm(item)}
                    className="py-1.5 px-3 rounded-lg glass-amber-box hover:bg-[#fae2b8] text-[#9e1822] text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmItem(item)}
                    className="py-1.5 px-3 rounded-lg bg-red-100/60 hover:bg-red-200/80 text-red-900 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1 border border-red-300/40 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3 text-red-700" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 glass-regal rounded-3xl p-8 max-w-md mx-auto space-y-4">
            <Package className="w-12 h-12 text-[#e5901c] mx-auto opacity-70" />
            <h3 className="font-editorial-title text-2xl font-bold text-[#9e1822]">No items match</h3>
            <p className="text-xs text-[#5c2419]">
              No textiles found under category "{selectedCategory}" with query "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-full bg-[#9e1822] text-white text-xs font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* --- ADD / EDIT ITEM MODAL --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#200a10]/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-regal-dark max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#e5901c]/50 shadow-2xl relative text-white my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e5901c]/30">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e5901c] font-bold block">
                  {editingItem ? `EDIT ITEM // ${editingItem.id}` : 'NEW TEXTILE ENTRY // ATELIER LEDGER'}
                </span>
                <h2 className="font-editorial-title text-2xl sm:text-3xl font-bold text-white mt-0.5">
                  {editingItem ? 'Edit Listed Product' : 'Add New Textile Item'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f3e5ab] text-lg flex items-center justify-center border border-[#e5901c]/40 transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveItem} className="space-y-4 pt-4">
              
              {/* Row 1: Item ID & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Product ID
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g. G-103"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white font-mono text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Textile Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Imperial Silk Embroidered Quilt"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>
              </div>

              {/* Row 2: Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Category Selection *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  >
                    <option value="bedcovers">Bedcovers</option>
                    <option value="sheets">Bedsheets</option>
                    <option value="quilts">Luxury Quilts</option>
                    <option value="blankets">Blankets</option>
                    <option value="cushions">Cushion Covers</option>
                    <option value="carpets">Carpets & Rugs</option>
                    <option value="towels">Bath Towels</option>
                    <option value="custom">+ Create Custom Category</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Boutique Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. NPR 12,500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>
              </div>

              {/* Custom Category Input if selected */}
              {formData.category === 'custom' && (
                <div className="space-y-1 p-3 rounded-xl bg-amber-950/40 border border-[#e5901c]/30 animate-fade-in">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Custom Category Identifier
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customCategory}
                    onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                    placeholder="e.g. curtains, runners, pashmina"
                    className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-[#e5901c]/40 text-white text-xs"
                  />
                </div>
              )}

              {/* Row 3: Specifications & Thread Count / GSM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Fabric Specifications
                  </label>
                  <input
                    type="text"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    placeholder="e.g. 600 TC Egyptian Combed Cotton"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Thread Count / Density / GSM
                  </label>
                  <input
                    type="text"
                    value={formData.tc}
                    onChange={(e) => setFormData({ ...formData, tc: e.target.value })}
                    placeholder="e.g. 600 Thread Count or 450 GSM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>
              </div>

              {/* Row 4: Dimensions & Stock Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Dimensions / Size
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder='e.g. King (90" x 108") or Double'
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Stock & Availability Badge
                  </label>
                  <input
                    type="text"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="e.g. In Stock · Shop 141 or Limited Edition"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>
              </div>

              {/* Row 5: Feel & Season */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Tactile Feel
                  </label>
                  <input
                    type="text"
                    value={formData.feel}
                    onChange={(e) => setFormData({ ...formData, feel: e.target.value })}
                    placeholder="e.g. Silky, Cool & Fluid"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                    Warmth / Season
                  </label>
                  <input
                    type="text"
                    value={formData.warmth}
                    onChange={(e) => setFormData({ ...formData, warmth: e.target.value })}
                    placeholder="e.g. All Seasons or Mountain Winter"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c]"
                  />
                </div>
              </div>

              {/* Row 6: Image Selection / Upload */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-black/40 border border-[#e5901c]/30">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#e5901c]" />
                    Product Photography
                  </label>
                  <span className="text-[10px] text-amber-200/60">Preset, URL, or File Upload</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Thumbnail Preview */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#e5901c]/40 bg-black/60 shrink-0">
                    <img
                      src={formData.img || '/stack-cushions.jpg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={formData.img}
                      onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                      placeholder="Image URL or choose preset below"
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-[#e5901c]/40 text-white text-xs"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-[#ffe79a] text-[10px] font-semibold border border-[#e5901c]/40 cursor-pointer flex items-center space-x-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Custom Photo</span>
                      </button>

                      {/* Presets */}
                      <span className="text-[10px] text-amber-200/50">Presets:</span>
                      {[
                        { label: 'Cushions', url: '/stack-cushions.jpg' },
                        { label: 'Hero Bed', url: '/hero-bed.jpg' },
                        { label: 'Ganesh Wide', url: '/ganesh-wide.jpg' },
                        { label: 'Amber Texture', url: '/texture-amber.jpg' }
                      ].map(preset => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFormData({ ...formData, img: preset.url })}
                          className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                            formData.img === preset.url
                              ? 'bg-[#e5901c] text-black font-bold'
                              : 'bg-white/10 hover:bg-white/20 text-[#ffe79a]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 7: Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-sans uppercase tracking-wider text-[#ffe79a] font-semibold">
                  Detailed Boutique Description
                </label>
                <textarea
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Describe weave, softness, artisanal significance, and care instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#e5901c]/40 text-white text-xs focus:outline-none focus:border-[#e5901c] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#e5901c]/30">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9e1822] via-[#b51c27] to-[#770f17] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 border border-[#e5901c]/50 cursor-pointer flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-[#ffe79a]" />
                  <span>{editingItem ? 'Save Changes' : 'Create & List Product'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#200a10]/80 backdrop-blur-md">
          <div className="glass-regal-dark max-w-md w-full rounded-3xl p-6 sm:p-8 border border-red-500/50 shadow-2xl relative text-white space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-editorial-title text-xl font-bold">Confirm Deletion</h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Are you sure you want to remove <strong>"{deleteConfirmItem.title}"</strong> ({deleteConfirmItem.id}) from the active catalog? This change will immediately affect the public store showroom.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RESET FACTORY CATALOG CONFIRMATION MODAL --- */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#200a10]/80 backdrop-blur-md">
          <div className="glass-regal-dark max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#e5901c]/50 shadow-2xl relative text-white space-y-4">
            <div className="flex items-center space-x-3 text-[#e5901c]">
              <RefreshCw className="w-6 h-6 shrink-0" />
              <h3 className="font-editorial-title text-xl font-bold">Restore Default Catalog</h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              This will reset the entire product catalog back to the original 12 handcrafted items from China Town Shop 141. Any custom items added will be overwritten.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md border border-[#e5901c]/40"
              >
                Restore Factory Defaults
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
