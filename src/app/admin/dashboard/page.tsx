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
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, Product } from '@/data/products';
import { getCategories, Category } from '@/data/categories';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoading, setIsLoading] = useState(true);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [currentCategories, setCurrentCategories] = useState<Category[]>([]);

  useEffect(() => {
    // The middleware handles redirecting if not logged in.
    // We just need to load the data now.
    setIsLoading(false);
    refreshData();
  }, []);

  const refreshData = () => {
    setCurrentProducts(getProducts());
    setCurrentCategories(getCategories());
  };

  const handleLogout = () => {
    // Clear the admin session cookie
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin');
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xs">M</span>
            </div>
            <h1 className="text-xl font-serif italic tracking-wider">Monalisa <span className="text-gold">Admin</span></h1>
          </div>
          <p className="text-[8px] uppercase tracking-[0.4em] text-text-muted">Terminal v.0.1.0-ELITE</p>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-8">
          <NavItem 
            icon={ShoppingCart} 
            label="Orders" 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
            badge="12"
          />
          <div className="pt-8 pb-4">
            <p className="text-[8px] uppercase tracking-[0.4em] text-text-muted font-bold ml-4">Inventory Protocols</p>
          </div>
          <NavItem 
            icon={Package} 
            label="Add Product" 
            active={activeTab === 'add-product'} 
            onClick={() => setActiveTab('add-product')} 
          />
          <NavItem 
            icon={Layers} 
            label="Add Category" 
            active={activeTab === 'add-category'} 
            onClick={() => setActiveTab('add-category')} 
          />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-text-muted hover:text-red-500 transition-colors text-[10px] uppercase tracking-widest font-bold"
          >
            <LogOut size={16} />
            Termination Ritual
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-24 bg-black/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-12 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-serif italic text-gold uppercase tracking-[0.2em]">
              {activeTab.replace('-', ' ')} protocol
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest">Admin Terminal</p>
              <p className="text-[8px] text-gold uppercase tracking-[0.4em]">Absolute Authorization</p>
            </div>
            <div className="w-12 h-12 bg-surface border border-gold/20 rounded-full overflow-hidden relative">
               <Image src="/images/logo.jpeg" alt="Admin" fill className="object-cover" />
            </div>
          </div>
        </header>

        <div className="p-12">
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'add-product' && <AddProductTab categories={currentCategories} onComplete={() => {setActiveTab('orders'); refreshData();}} />}
          {activeTab === 'add-category' && <AddCategoryTab onComplete={() => {setActiveTab('orders'); refreshData();}} />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-4 transition-all relative group ${active ? 'text-gold' : 'text-text-muted hover:text-white'}`}
    >
      <div className="flex items-center gap-4">
        <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
        <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
      </div>
      {badge && (
        <span className="bg-gold/10 text-gold text-[8px] px-2 py-0.5 rounded-full font-bold">{badge}</span>
      )}
      {active && (
        <motion.div 
          layoutId="sidebarActive"
          className="absolute left-0 w-1 h-6 bg-gold rounded-r-full" 
        />
      )}
    </button>
  );
}

function OrdersTab() {
  const orders = [
    { id: '#M-4022', customer: 'Othman Bennani', city: 'Casablanca', total: '1,200 MAD', status: 'In Transit', date: '2026-03-20' },
    { id: '#M-4021', customer: 'Yasmine Kadiri', city: 'Rabat', total: '850 MAD', status: 'Delivered', date: '2026-03-19' },
    { id: '#M-4020', customer: 'Mehdi Alami', city: 'Marrakech', total: '2,400 MAD', status: 'Pending', date: '2026-03-19' },
    { id: '#M-4019', customer: 'Sami Tazi', city: 'Tangier', total: '450 MAD', status: 'Cancelled', date: '2026-03-18' },
    { id: '#M-4018', customer: 'Layla Mansouri', city: 'Fes', total: '1,100 MAD', status: 'Delivered', date: '2026-03-18' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-serif italic mb-2">Order Management.</h2>
          <p className="text-text-muted text-[10px] uppercase tracking-[0.4em]">Kingdom Logistics Protocol</p>
        </div>
      </div>

      <div className="bg-black border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Protocol ID</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Artifact Holder</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Dispatch City</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Investment</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Fulfillment</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Date</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-bold text-gold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-light">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="p-8 text-[10px] font-bold tracking-widest text-white">{order.id}</td>
                <td className="p-8 text-sm">{order.customer}</td>
                <td className="p-8 text-[10px] uppercase tracking-widest text-text-muted">{order.city}</td>
                <td className="p-8 text-sm font-bold text-gold">{order.total}</td>
                <td className="p-8">
                  <span className={`text-[8px] uppercase tracking-widest px-3 py-1 border ${
                    order.status === 'Delivered' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                    order.status === 'In Transit' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' :
                    order.status === 'Cancelled' ? 'border-red-500/20 text-red-500 bg-red-500/5' :
                    'border-gold/20 text-gold bg-gold/5'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-8 text-[10px] text-text-muted">{order.date}</td>
                <td className="p-8">
                  <button className="text-text-muted hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddProductTab({ categories, onComplete }: { categories: Category[], onComplete: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
    description: '',
    benefits: ['', ''],
    specs: [{ label: 'Weight', value: '' }],
    image: ''
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setFormData({ ...formData, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.image) {
      alert("Please select a category and upload an image.");
      return;
    }

    const newProduct: Product = {
      id: `dp-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/ /g, '-'),
      brand: formData.brand,
      price: parseInt(formData.price),
      category: formData.category,
      image: formData.image,
      description: formData.description,
      benefits: formData.benefits.filter(b => b.trim() !== ''),
      specs: formData.specs
    };

    const saved = localStorage.getItem('monalisa_dynamic_products');
    const dynamicProducts = saved ? JSON.parse(saved) : [];
    localStorage.setItem('monalisa_dynamic_products', JSON.stringify([...dynamicProducts, newProduct]));

    alert("Artifact Cataloged Successfully.");
    onComplete();
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h2 className="text-4xl font-serif italic mb-2">Catalog New Artifact.</h2>
        <p className="text-text-muted text-[10px] uppercase tracking-[0.4em]">Inventory expansion protocol</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Artifact Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" 
                placeholder="e.g. ISO 100 Hydrolyzed" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Brand Entity</label>
              <input 
                required
                type="text" 
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" 
                placeholder="e.g. Dymatize" 
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Investment (MAD)</label>
                <input 
                  required
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" 
                  placeholder="950" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Classification</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-[10px] uppercase tracking-widest font-light transition-all appearance-none italic"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Visual Manifestation</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 transition-all cursor-pointer flex flex-col items-center justify-center p-8 relative overflow-hidden"
            >
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-contain p-8" />
              ) : (
                <>
                  <Upload size={32} className="text-text-muted mb-4" />
                  <p className="text-[8px] uppercase tracking-widest text-text-muted text-center leading-relaxed">
                    Upload transparent PNG/WebP <br /> Recommended 800x800
                  </p>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Narrative Description</label>
          <textarea 
            required
            rows={4} 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all resize-none italic" 
            placeholder="Technical details of the isolate..." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Key Benefits</label>
            {formData.benefits.map((benefit, i) => (
              <input 
                key={i}
                type="text" 
                value={benefit}
                onChange={(e) => handleBenefitChange(i, e.target.value)}
                className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-4 text-xs font-light transition-all italic" 
                placeholder={`Benefit 0${i+1}`} 
              />
            ))}
            <button type="button" onClick={handleAddBenefit} className="text-[8px] uppercase tracking-widest text-gold font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
              <Plus size={12} /> Add Property
            </button>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Technical Specs</label>
            <div className="flex gap-4">
               <input 
                 readOnly 
                 value="Weight" 
                 className="w-1/3 bg-white/5 border border-white/5 p-4 text-[10px] uppercase tracking-widest font-bold" 
               />
               <input 
                 required
                 value={formData.specs[0].value}
                 onChange={(e) => setFormData({...formData, specs: [{ label: 'Weight', value: e.target.value }]})}
                 className="flex-1 bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-4 text-xs font-light italic" 
                 placeholder="e.g. 2.27kg" 
               />
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button type="submit" className="luxury-button !px-20">
            Catalog Artifact
          </button>
        </div>
      </form>
    </div>
  );
}

function AddCategoryTab({ onComplete }: { onComplete: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setFormData({ ...formData, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a category cover image.");
      return;
    }

    const newCategory: Category = {
      id: `dc-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/ /g, '-'),
      description: formData.description,
      image: formData.image
    };

    const saved = localStorage.getItem('monalisa_dynamic_categories');
    const dynamicCats = saved ? JSON.parse(saved) : [];
    localStorage.setItem('monalisa_dynamic_categories', JSON.stringify([...dynamicCats, newCategory]));

    alert("Category Established Successfully.");
    onComplete();
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h2 className="text-4xl font-serif italic mb-2">Establish New Pillar.</h2>
        <p className="text-text-muted text-[10px] uppercase tracking-[0.4em]">Structural expansion protocol</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Category Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" 
                placeholder="e.g. Vitamins & Essentials" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Strategic Description</label>
              <textarea 
                required
                rows={4} 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all resize-none italic" 
                placeholder="Definition of this product line..." 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Cover Imagery</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/3] border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden"
            >
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-cover opacity-60" />
              ) : (
                <>
                  <Upload size={32} className="text-text-muted mb-4" />
                  <p className="text-[8px] uppercase tracking-widest text-text-muted text-center leading-relaxed">
                    Upload Cinematic Background <br /> Recommended 1200x800
                  </p>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button type="submit" className="luxury-button !px-20">
            Establish Category
          </button>
        </div>
      </form>
    </div>
  );
}
