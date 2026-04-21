"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  DollarSign,
  PackageCheck,
  TrendingUp,
  Image as ImageIcon,
  Check,
  X,
  Layers,
  LogOut,
  Upload,
  Download,
  BarChart3,
  Users,
  Eye,
  Trash2,
  Edit3,
  ChevronRight,
  ClipboardList,
  CheckCircle2,
  Clock,
  Truck as TruckIcon,
  ArrowUpRight,
  ArrowDownRight,
  Archive,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { Category } from '@/data/categories';
import Image from 'next/image';

// Utility to compress images before saving to localStorage
const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      // Compress as JPEG with 0.7 quality
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
  });
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [currentCategories, setCurrentCategories] = useState<Category[]>([]);
  const [currentOrders, setCurrentOrders] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    setIsLoading(false);
    refreshData();
  }, []);

  const refreshData = async () => {
    const timestamp = Date.now();
    const [pRes, cRes, oRes] = await Promise.all([
      fetch(`/api/products?t=${timestamp}`, { cache: 'no-store' }),
      fetch(`/api/categories?t=${timestamp}`, { cache: 'no-store' }),
      fetch(`/api/orders?t=${timestamp}`, { cache: 'no-store' }),
    ]);
    if (pRes.ok) setCurrentProducts(await pRes.json());
    if (cRes.ok) setCurrentCategories(await cRes.json());
    if (oRes.ok) setCurrentOrders(await oRes.json());
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin');
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('add-product');
  };

  const startEditCategory = (category: Category) => {
    setEditingCategory(category);
    setActiveTab('add-category');
  };

  const toggleStock = async (productId: string) => {
    const product = currentProducts.find(p => p.id === productId);
    if (!product) return;
    const res = await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_rupture: product.isRupture ? 0 : 1 }),
    });
    if (!res.ok) alert('Erreur lors de la mise à jour du stock.');
    else refreshData();
  };

  const deleteProduct = async (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit de l\'archive ?')) {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) alert('Erreur lors de la suppression.');
      else refreshData();
    }
  };

  const deleteCategory = async (categoryId: string) => {
    const category = currentCategories.find(c => c.id === categoryId);
    if (!category) return;
    const productsInCategory = currentProducts.filter(p => p.category === category.slug);
    if (productsInCategory.length > 0) {
      alert(`Impossible de supprimer : ce pilier contient encore ${productsInCategory.length} produits.`);
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      const res = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
      if (!res.ok) alert('Erreur lors de la suppression.');
      else refreshData();
    }
  };

  const deleteOrder = async (orderId: number) => {
    if (confirm('Supprimer définitivement cette commande de l\'archive ?')) {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      if (!res.ok) alert('Erreur lors de la suppression.');
      else refreshData();
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) alert('Erreur lors de la mise à jour du statut.');
    else refreshData();
  };

  const exportDatabase = async () => {
    const [pRes, cRes] = await Promise.all([
      fetch('/api/products', { cache: 'no-store' }),
      fetch('/api/categories', { cache: 'no-store' }),
    ]);
    const data = {
      products: pRes.ok ? await pRes.json() : [],
      categories: cRes.ok ? await cRes.json() : [],
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monalisa-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  if (isLoading) return null;

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex font-sans overflow-hidden">
      {/* Sophisticated Sidebar */}
      <aside className="w-80 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col fixed h-full z-30 overflow-y-auto custom-scrollbar">
        <div className="p-10 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-luxury-red rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,0,0,0.3)] rotate-3 group cursor-pointer hover:rotate-12 transition-transform duration-500">
              <span className="text-white font-black text-2xl italic">M</span>
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none">Monaliza</h1>
              <span className="text-[10px] text-luxury-red font-black uppercase tracking-[0.4em] italic">Terminal Elite</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <div className="pb-4 opacity-30">
            <p className="text-[8px] uppercase tracking-[0.5em] font-black ml-4">Command & Control</p>
          </div>
          
          <NavItem 
            icon={BarChart3} 
            label="Vue d'Ensemble" 
            active={activeTab === 'dashboard'} 
            onClick={() => {setActiveTab('dashboard'); setEditingProduct(null);}} 
          />
          <NavItem 
            icon={ShoppingCart} 
            label="Commandes" 
            active={activeTab === 'orders'} 
            onClick={() => {setActiveTab('orders'); setEditingProduct(null);}} 
            badge={currentOrders.length > 0 ? currentOrders.length.toString() : null}
          />
          
          <div className="pt-10 pb-4 opacity-30">
            <p className="text-[8px] uppercase tracking-[0.5em] font-black ml-4">Inventory Management</p>
          </div>
          
          <NavItem 
            icon={Package} 
            label="Archive Produits" 
            active={activeTab === 'products'} 
            onClick={() => {setActiveTab('products'); setEditingProduct(null); setEditingCategory(null);}} 
          />
          <NavItem 
            icon={editingProduct ? Edit3 : Plus} 
            label={editingProduct ? "Modifier Produit" : "Cataloguer"} 
            active={activeTab === 'add-product'} 
            onClick={() => {setActiveTab('add-product'); setEditingProduct(null); setEditingCategory(null);}} 
          />
          <NavItem 
            icon={Layers} 
            label="Architecture" 
            active={activeTab === 'categories'} 
            onClick={() => {setActiveTab('categories'); setEditingProduct(null); setEditingCategory(null);}} 
          />
          <NavItem 
            icon={editingCategory ? Edit3 : Plus} 
            label={editingCategory ? "Modifier Pilier" : "Nouveau Pilier"} 
            active={activeTab === 'add-category'} 
            onClick={() => {setActiveTab('add-category'); setEditingProduct(null); setEditingCategory(null);}} 
          />
        </nav>

        <div className="p-8">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-white/40 hover:text-luxury-red transition-all text-[10px] uppercase tracking-[0.3em] font-black rounded-2xl border border-white/5 hover:border-luxury-red/30 hover:bg-luxury-red/5"
          >
            <LogOut size={18} />
            Terminer Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-80 relative h-screen overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-luxury-red/5 via-transparent to-transparent">
        {/* Header */}
        <header className="h-28 bg-black/20 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-16 sticky top-0 z-20">
          <div>
            <h2 className="text-[10px] font-black text-luxury-red uppercase tracking-[0.5em] mb-1">Système Opérationnel</h2>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <p className="text-sm font-bold uppercase tracking-widest">{activeTab.replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-4">
               <button 
                 onClick={exportDatabase}
                 className="flex items-center gap-3 px-6 h-12 rounded-xl bg-white/5 border border-white/5 hover:border-luxury-red/30 transition-all group"
                 title="Exporter la base de données"
               >
                  <Download size={16} className="text-luxury-red group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Backup</span>
               </button>
            </div>
            <div className="h-10 w-[1px] bg-white/5 hidden lg:block" />
            <div className="text-right hidden md:block">              <p className="text-xs font-black uppercase tracking-widest text-white/80">Othman Bennani</p>
              <p className="text-[9px] text-luxury-red uppercase tracking-[0.3em] font-black mt-1">Niveau d'Accès : Alpha</p>
            </div>
            <div className="w-14 h-14 rounded-2xl p-[1px] bg-gradient-to-br from-luxury-red/50 to-transparent shadow-2xl relative group cursor-pointer overflow-hidden">
               <div className="absolute inset-0 bg-black z-0" />
               <Image src="/images/logo.jpeg" alt="Admin" fill className="object-cover relative z-10 group-hover:scale-110 transition-transform duration-700 opacity-80" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'dashboard' && <DashboardOverview products={currentProducts} orders={currentOrders} />}
              {activeTab === 'orders' && (
                <OrdersTab 
                  orders={currentOrders} 
                  onDelete={deleteOrder} 
                  onUpdateStatus={updateOrderStatus} 
                />
              )}
              {activeTab === 'products' && (
                <ProductsArchive 
                  products={currentProducts} 
                  onToggleStock={toggleStock} 
                  onEdit={startEdit} 
                  onDelete={deleteProduct} 
                />
              )}
              {activeTab === 'add-product' && (
                <AddProductTab 
                  key={editingProduct?.id || 'new'}
                  categories={currentCategories} 
                  editingProduct={editingProduct}
                  onComplete={() => {
                    setEditingProduct(null);
                    setActiveTab('products'); 
                    refreshData();
                  }} 
                />
              )}
              {activeTab === 'categories' && (
                <CategoriesArchive 
                  categories={currentCategories} 
                  onEdit={startEditCategory} 
                  onDelete={deleteCategory} 
                />
              )}
              {activeTab === 'add-category' && (
                <AddCategoryTab 
                  key={editingCategory?.id || 'new'}
                  editingCategory={editingCategory}
                  onComplete={() => {
                    setEditingCategory(null);
                    setActiveTab('categories'); 
                    refreshData();
                  }} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-5 transition-all relative group rounded-2xl overflow-hidden ${active ? 'bg-luxury-red/10 text-white' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'}`}
    >
      <div className="flex items-center gap-5 relative z-10">
        <Icon size={20} className={`${active ? 'text-luxury-red' : 'text-white/20 group-hover:text-white/40'} transition-colors`} />
        <span className="text-[10px] uppercase tracking-[0.2em] font-black">{label}</span>
      </div>
      
      {badge && (
        <span className="bg-luxury-red text-white text-[8px] px-2.5 py-1 rounded-lg font-black shadow-[0_0_15px_rgba(139,0,0,0.4)] relative z-10">
          {badge}
        </span>
      )}

      {active && (
        <motion.div 
          layoutId="sidebarActive"
          className="absolute left-0 w-1 h-8 bg-luxury-red rounded-r-full" 
        />
      )}
    </button>
  );
}

function DashboardOverview({ products, orders }: { products: Product[], orders: any[] }) {
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const criticalStock = products.filter(p => p.isRupture).length;

  const stats = [
    { label: 'Revenu Archive', value: `${totalRevenue.toLocaleString()} MAD`, icon: DollarSign, trend: 'LIVE', isUp: true },
    { label: 'Flux Commandes', value: orders.length.toString(), icon: ShoppingCart, trend: 'LIVE', isUp: true },
    { label: 'Unités Rupture', value: criticalStock.toString(), icon: Package, trend: 'ALERT', isUp: criticalStock > 0 ? false : true },
    { label: 'Piliers Actifs', value: '8', icon: Users, trend: 'ALPHA', isUp: true },
  ];

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Performance <span className="red-gradient-text italic">Globale.</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Indicateurs Stratégiques en Temps Réel</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
           <button className="px-6 py-3 bg-luxury-red text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">Aujourd'hui</button>
           <button className="px-6 py-3 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Semaine</button>
           <button className="px-6 py-3 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Mois</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] relative group hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-luxury-red/10 transition-colors" />
            
            <div className="flex items-center justify-between mb-8">
               <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <stat.icon className="text-luxury-red" size={24} />
               </div>
               <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[9px] font-black ${stat.isUp ? 'text-green-400 bg-green-400/10' : 'text-luxury-red bg-luxury-red/10'}`}>
                  {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
               </div>
            </div>
            
            <span className="block text-[10px] uppercase tracking-[0.3em] text-white/30 font-black mb-2">{stat.label}</span>
            <span className="block text-3xl font-black tracking-tighter">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-xl font-black uppercase tracking-tighter">Flux de <span className="text-luxury-red italic">Capital.</span></h3>
               <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2">Rapport Complet <ChevronRight size={14} /></button>
            </div>
            <div className="h-80 flex items-end gap-4">
               {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85, 40, 75].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer">
                    <div className="w-full relative bg-white/[0.02] rounded-t-lg overflow-hidden h-64">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ delay: i * 0.05, duration: 1 }}
                         className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-luxury-red/40 to-luxury-red group-hover:from-luxury-red group-hover:to-red-400 transition-all shadow-[0_0_20px_rgba(139,0,0,0.3)]" 
                       />
                    </div>
                    <span className="text-[8px] font-black text-white/20 group-hover:text-white transition-colors">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] flex flex-col items-center justify-center text-center gap-8 group">
            <div className="relative w-48 h-48">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/[0.03]" />
                 <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="502" strokeDashoffset={502 * (1 - 0.78)} className="text-luxury-red transition-all duration-[2s] group-hover:text-red-400" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">78%</span>
                  <span className="text-[8px] uppercase tracking-widest text-white/30 font-black">Quota Atteint</span>
               </div>
            </div>
            <div>
               <h4 className="text-lg font-black uppercase tracking-tighter mb-2">Objectif <span className="text-luxury-red">Expansion.</span></h4>
               <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium leading-loose">
                  Croissance projetée pour <br /> le trimestre Q2 2026.
               </p>
            </div>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Optimiser Strategie</button>
         </div>
      </div>
    </div>
  );
}

function OrdersTab({ orders, onDelete, onUpdateStatus }: { orders: any[], onDelete: (id: number) => void, onUpdateStatus: (id: number, status: string) => void }) {
  const [search, setSearch] = useState('');
  
  const filtered = orders.filter(o => 
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_phone.includes(search)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expedie': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'livre': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'annule': return 'text-white/20 bg-white/5 border-white/10';
      default: return 'text-luxury-red bg-luxury-red/10 border-luxury-red/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expedie': return 'Expédié';
      case 'livre': return 'Livré';
      case 'annule': return 'Annulé';
      default: return 'En Attente';
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Journal des <span className="red-gradient-text italic">Transactions.</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Suivi en temps réel des {orders.length} flux de commande</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
          <input 
            type="text" 
            placeholder="RECHERCHER CLIENT / TEL..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-luxury-red transition-all w-80 shadow-2xl" 
          />
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((order) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] group hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-12">
              <div className="flex-1 space-y-8">
                <div className="flex flex-wrap items-center gap-6">
                  <div className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </div>
                  <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">ID: #ORD-{order.id}</span>
                  <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{new Date(order.created_at).toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-luxury-red font-black block">Information Client</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight">{order.customer_name}</h4>
                    <p className="text-sm font-bold text-white/60">{order.customer_phone}</p>
                    <p className="text-[10px] text-white/40 uppercase leading-relaxed max-w-sm">{order.customer_address}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-luxury-red font-black block">Composition Panier</span>
                    <div className="space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest p-3 bg-white/[0.02] rounded-xl border border-white/5">
                          <span className="text-white/60">{item.quantity}x {item.name}</span>
                          <span className="text-white/40">{item.price} MAD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-72 flex flex-col justify-between border-l border-white/5 pl-12 gap-8">
                <div className="text-right">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black block mb-2">Total Transaction</span>
                  <span className="text-4xl font-black tracking-tighter text-white">{order.total_amount} <span className="text-sm text-luxury-red">MAD</span></span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => onUpdateStatus(order.id, 'expedie')}
                      className="h-12 rounded-xl bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                    >
                      Expédier
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(order.id, 'livre')}
                      className="h-12 rounded-xl bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all border border-green-500/20"
                    >
                      Livré
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onUpdateStatus(order.id, 'annule')}
                      className="flex-1 h-12 rounded-xl bg-white/5 text-white/20 text-[8px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/10"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={() => onDelete(order.id)}
                      className="w-12 h-12 rounded-xl bg-luxury-red/10 text-luxury-red flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all border border-luxury-red/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ProductsArchiveProps {
  products: Product[];
  onToggleStock: (id: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductsArchive({ products, onToggleStock, onEdit, onDelete }: ProductsArchiveProps) {
  const [search, setSearch] = useState('');
  
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Archives <span className="red-gradient-text italic">Inventaire.</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Indexation des {products.length} Unités Cataloguées</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
          <input 
            type="text" 
            placeholder="RECHERCHER DANS L'ARCHIVE..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-luxury-red transition-all w-80 shadow-2xl" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 8) * 0.05 }}
            className={`bg-white/[0.02] border ${product.isRupture ? 'border-luxury-red/20' : 'border-white/5'} p-8 rounded-[2.5rem] group hover:bg-white/[0.04] transition-all duration-500 relative`}
          >
            {product.isRupture && (
              <div className="absolute top-6 left-6 z-20 bg-luxury-red text-white text-[7px] px-3 py-1.5 font-black uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg shadow-red-900/40">
                <AlertTriangle size={10} /> RUPTURE DE STOCK
              </div>
            )}

            <div className="absolute top-6 right-6 z-20 bg-green-500/10 backdrop-blur-md text-green-500 text-[7px] px-3 py-1.5 font-black uppercase tracking-widest rounded-lg flex items-center gap-2 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              DB
            </div>
            
            <div className="aspect-square relative rounded-3xl overflow-hidden bg-black/40 p-6 mb-6">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                unoptimized
                className={`object-contain p-6 transition-all duration-700 group-hover:scale-110 ${product.isRupture ? 'grayscale brightness-50' : 'grayscale group-hover:grayscale-0'}`} 
              />
              <div className="absolute inset-0 bg-luxury-red/0 group-hover:bg-luxury-red/5 transition-colors" />
            </div>
            
            <div className="space-y-4">
               <div className="flex justify-between items-start">
                  <span className="text-[8px] font-black uppercase tracking-widest text-luxury-red">{product.brand}</span>
                  <span className="text-xs font-black text-white">{product.price} MAD</span>
               </div>
               <h4 className="text-[11px] font-bold uppercase tracking-tight line-clamp-2 h-8 group-hover:text-white transition-colors">{product.name}</h4>
               
               <div className="pt-4 grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => onToggleStock(product.id)}
                    title={product.isRupture ? "Remettre en stock" : "Marquer comme rupture"}
                    className={`h-10 rounded-xl flex items-center justify-center transition-all ${product.isRupture ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white' : 'bg-white/5 text-white/40 hover:bg-luxury-red hover:text-white'}`}
                  >
                     {product.isRupture ? <PackageCheck size={16} /> : <Archive size={16} />}
                  </button>
                  <button 
                    onClick={() => onEdit(product)}
                    className="h-10 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                     <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="h-10 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all"
                  >
                     <Trash2 size={16} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface AddProductTabProps {
  categories: Category[];
  editingProduct: Product | null;
  onComplete: () => void;
}

function AddProductTab({ categories, editingProduct, onComplete }: AddProductTabProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    oldPrice: '',
    category: '',
    description: editingProduct ? editingProduct.description : '',
    benefits: editingProduct ? (editingProduct.benefits && editingProduct.benefits.length > 0 ? editingProduct.benefits : ['', '']) : ['', ''],
    specs: editingProduct ? (editingProduct.specs && editingProduct.specs.length > 0 ? editingProduct.specs : [{ label: 'Poids', value: '' }]) : [{ label: 'Poids', value: '' }],
    image: editingProduct ? editingProduct.image : '',
    images: editingProduct ? (editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.image]) : [] as string[]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        brand: editingProduct.brand,
        price: editingProduct.price.toString(),
        oldPrice: (editingProduct.oldPrice ?? editingProduct.old_price ?? '').toString(),
        category: editingProduct.category,
        description: editingProduct.description,
        benefits: editingProduct.benefits.length > 0 ? editingProduct.benefits : ['', ''],
        specs: editingProduct.specs.length > 0 ? editingProduct.specs : [{ label: 'Poids', value: '' }],
        image: editingProduct.image,
        images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.image]
      });
    }
  }, [editingProduct]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files).slice(0, 5 - formData.images.length);

      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          const compressed = await compressImage(base64);
          setFormData(prev => {
            const newImages = [...prev.images, compressed];
            return {
              ...prev,
              images: newImages,
              // Set main image to the first one if it's not set
              image: prev.image || newImages[0]
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: newImages,
        image: newImages[0] || ''
      };
    });
  };

  const setMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image: prev.images[index]
    }));
  };

  const handleAddBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || formData.images.length === 0) {
      alert("Veuillez sélectionner une catégorie et télécharger au moins une image.");
      return;
    }

    const productData = {
      name: formData.name,
      brand: formData.brand,
      price: parseInt(formData.price),
      old_price: formData.oldPrice ? parseInt(formData.oldPrice) : null,
      category: formData.category,
      image: formData.image,
      images: formData.images,
      description: formData.description,
      benefits: formData.benefits.filter(b => b.trim() !== ''),
      specs: formData.specs,
    };

    if (editingProduct) {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productData,
          slug: editingProduct.slug,
          is_rupture: editingProduct.isRupture ? 1 : 0,
        }),
      });
      if (!res.ok) {
        alert('Erreur lors de la mise à jour du produit.');
      } else {
        alert('Produit mis à jour avec succès.');
        onComplete();
      }
    } else {
      const id = `dp-${Date.now()}`;
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productData, id, slug, is_rupture: 0 }),
      });
      if (!res.ok) {
        alert('Erreur lors du catalogage du produit.');
      } else {
        alert('Produit catalogué avec succès.');
        onComplete();
      }
    }
  };

  return (
    <div className="max-w-6xl space-y-16">
      <div>
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
          {editingProduct ? "Modifier le" : "Cataloguer un"} <span className="red-gradient-text italic">Produit.</span>
        </h2>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">
          {editingProduct ? `PROTOCOLE DE MODIFICATION : ${editingProduct.id}` : "Protocole d'expansion d'inventaire stratégique"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Nom du Produit</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-sm font-bold transition-all rounded-[1.5rem]" 
                placeholder="EX: ISO 100 HYDROLYZED" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Marque</label>
                 <input 
                   required
                   type="text" 
                   value={formData.brand}
                   onChange={(e) => setFormData({...formData, brand: e.target.value})}
                   className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-sm font-bold transition-all rounded-[1.5rem]" 
                   placeholder="DYMATIZE" 
                 />
               </div>
               <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Classification</label>
                 <select 
                   required
                   value={formData.category}
                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                   className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-[10px] uppercase tracking-widest font-black transition-all appearance-none rounded-[1.5rem]"
                 >
                   <option value="" className="bg-black text-white">SELECT DEPT</option>
                   {categories.map(cat => (
                     <option key={cat.id} value={cat.slug} className="bg-black text-white">{cat.name}</option>
                   ))}
                 </select>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Investissement (MAD)</label>
                <input 
                  required
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-sm font-bold transition-all rounded-[1.5rem]" 
                  placeholder="950" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Ancien Prix (MAD)</label>
                <input 
                  type="number" 
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({...formData, oldPrice: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-sm font-bold transition-all rounded-[1.5rem]" 
                  placeholder="1200 (optionnel)" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Poids / Specs</label>
              <input 
                required
                value={formData.specs[0].value}
                onChange={(e) => setFormData({...formData, specs: [{ label: 'Poids', value: e.target.value }]})}
                className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-sm font-bold rounded-[1.5rem]" 
                placeholder="2.27KG" 
              />
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Galerie (Jusqu'à 5 photos)</label>
            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="aspect-square relative rounded-2xl overflow-hidden border border-white/10 group">
                  <Image src={img} alt={`Preview ${i}`} fill className="object-contain p-2" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setMainImage(i)}
                      className={`p-2 rounded-lg ${formData.image === img ? 'bg-luxury-red text-white' : 'bg-white/10 text-white/40 hover:text-white'}`}
                      title="Définir comme image principale"
                    >
                      <Check size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => removeImage(i)}
                      className="p-2 bg-luxury-red/20 text-luxury-red rounded-lg hover:bg-luxury-red hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  {formData.image === img && (
                    <div className="absolute top-2 left-2 bg-luxury-red text-white text-[6px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Principal</div>
                  )}
                </div>
              ))}
              
              {formData.images.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-white/5 bg-white/[0.02] hover:bg-luxury-red/[0.02] hover:border-luxury-red/30 transition-all flex flex-col items-center justify-center rounded-2xl group"
                >
                  <Upload size={24} className="text-white/20 group-hover:text-luxury-red transition-colors mb-2" />
                  <span className="text-[8px] uppercase tracking-widest text-white/20 font-black">Ajouter</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*" 
              multiple 
            />
            <p className="text-[8px] uppercase tracking-widest text-white/20 font-black ml-6">Optimisation : 800x800 WebP recommandé</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Description Narrative</label>
          <textarea 
            required
            rows={4} 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-8 text-sm font-bold transition-all resize-none rounded-[2rem]" 
            placeholder="DÉTAILS TECHNIQUES ET POSITIONNEMENT DU PRODUIT..." 
          />
        </div>

        <div className="space-y-6">
          <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Avantages de Performance</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.benefits.map((benefit, i) => (
              <input 
                key={i}
                type="text" 
                value={benefit}
                onChange={(e) => handleBenefitChange(i, e.target.value)}
                className="w-full bg-white/[0.01] border border-white/5 focus:border-luxury-red outline-none p-5 text-[11px] font-bold transition-all rounded-xl" 
                placeholder={`AVANTAGE 0${i+1}`} 
              />
            ))}
          </div>
          <button type="button" onClick={handleAddBenefit} className="text-[10px] uppercase tracking-[0.3em] text-luxury-red font-black flex items-center gap-3 hover:translate-x-3 transition-transform ml-6">
            <Plus size={14} /> Ajouter une Propriété
          </button>
        </div>

        <div className="pt-12 flex justify-end gap-6">
          {editingProduct && (
            <button 
              type="button" 
              onClick={onComplete}
              className="px-16 py-6 border border-white/10 text-white/40 text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:bg-white/5 transition-all"
            >
              Annuler
            </button>
          )}
          <button type="submit" className="px-16 py-6 bg-luxury-red text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:bg-red-500 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(139,0,0,0.3)]">
            {editingProduct ? "Confirmer Modifications" : "Cataloguer le Produit"}
          </button>
        </div>
      </form>
    </div>
  );
}

interface CategoriesArchiveProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

function CategoriesArchive({ categories, onEdit, onDelete }: CategoriesArchiveProps) {
  const [search, setSearch] = useState('');
  
  const filtered = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Architecture <span className="red-gradient-text italic">Sections.</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Indexation des {categories.length} Piliers du Catalogue</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
          <input 
            type="text" 
            placeholder="RECHERCHER UNE CATÉGORIE..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-luxury-red transition-all w-80 shadow-2xl" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((category, i) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 8) * 0.05 }}
            className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] group hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
          >
            <div className="aspect-video relative rounded-3xl overflow-hidden bg-black/40 mb-6">
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                unoptimized
                className="object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="space-y-4">
               <h4 className="text-lg font-black uppercase tracking-tighter group-hover:text-luxury-red transition-colors">{category.name}</h4>
               <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium line-clamp-2 h-10">{category.description}</p>
               
               <div className="pt-4 flex gap-4">
                  <button 
                    onClick={() => onEdit(category)}
                    className="flex-1 h-12 rounded-xl bg-white/5 text-white/40 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                     <Edit3 size={16} /> Modifier
                  </button>
                  <button 
                    onClick={() => onDelete(category.id)}
                    className="w-12 h-12 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all"
                    title="Supprimer (Seulement si dynamique)"
                  >
                     <Trash2 size={16} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AddCategoryTab({ editingCategory, onComplete }: { editingCategory: Category | null, onComplete: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
        image: editingCategory.image
      });
      setPreview(editingCategory.image);
    }
  }, [editingCategory]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const compressed = await compressImage(base64);
        setPreview(compressed);
        setFormData({ ...formData, image: compressed });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Veuillez télécharger une image de couverture.");
      return;
    }

    if (editingCategory) {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: editingCategory.slug,
          description: formData.description,
          image: formData.image,
        }),
      });
      if (!res.ok) {
        alert('Erreur lors de la mise à jour de la catégorie.');
      } else {
        alert('Pilier Architectural Mis à Jour.');
        onComplete();
      }
    } else {
      const id = `dc-${Date.now()}`;
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: formData.name, slug, description: formData.description, image: formData.image }),
      });
      if (!res.ok) {
        alert("Erreur lors de l'établissement de la catégorie.");
      } else {
        alert('Pilier Architectural Établi.');
        onComplete();
      }
    }
  };

  return (
    <div className="max-w-5xl space-y-16">
      <div>
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
          {editingCategory ? "Modifier le" : "Établir un Nouveau"} <span className="red-gradient-text italic">Pilier.</span>
        </h2>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">
          {editingCategory ? `PROTOCOLE DE MODIFICATION : ${editingCategory.id}` : "Protocole d'expansion structurelle du catalogue"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Nom de la Catégorie</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-6 text-sm font-bold transition-all rounded-[1.5rem]" 
                placeholder="EX: VITAMINES & ESSENTIELS" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Description Stratégique</label>
              <textarea 
                required
                rows={5} 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red outline-none p-8 text-sm font-bold transition-all resize-none rounded-[2rem]" 
                placeholder="DÉFINITION ET POSITIONNEMENT DE CETTE LIGNE..." 
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-6">Image Architecturelle</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video border-2 border-dashed border-white/5 bg-white/[0.02] hover:bg-luxury-red/[0.02] hover:border-luxury-red/30 transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden rounded-[3rem] group"
            >
              {preview ? (
                <Image src={preview} alt="Preview" fill unoptimized className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]" />
              ) : (
                <div className="text-center space-y-4">
                   <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto border border-white/10 group-hover:border-luxury-red/50 transition-colors">
                      <ImageIcon size={28} className="text-white/20 group-hover:text-luxury-red transition-colors" />
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-white/30 font-black">
                     Background de Section <br /> <span className="text-white/10">1200x800 Recommandé</span>
                   </p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        <div className="pt-12 flex justify-end gap-6">
          {editingCategory && (
            <button 
              type="button" 
              onClick={onComplete}
              className="px-16 py-6 border border-white/10 text-white/40 text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:bg-white/5 transition-all"
            >
              Annuler
            </button>
          )}
          <button type="submit" className="px-16 py-6 bg-luxury-red text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:bg-red-500 transition-all shadow-xl">
            {editingCategory ? "Confirmer Modifications" : "Établir la Catégorie"}
          </button>
        </div>
      </form>
    </div>
  );
}
