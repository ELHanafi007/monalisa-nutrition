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
    setIsLoading(false);
    refreshData();
  }, []);

  const refreshData = () => {
    setCurrentProducts(getProducts());
    setCurrentCategories(getCategories());
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin');
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-black flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20 shadow-xl">
        <div className="p-10 border-b border-gray-50">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-luxury-red rounded-2xl flex items-center justify-center shadow-lg shadow-red-100 rotate-3">
              <span className="text-white font-black text-xl italic">M</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter">Monaliza <span className="text-luxury-red italic">Admin</span></h1>
          </div>
          <p className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-black">Terminal v.0.1.0-ELITE</p>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-8">
          <NavItem 
            icon={ShoppingCart} 
            label="Commandes" 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
            badge="12"
          />
          <div className="pt-8 pb-4">
            <p className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-black ml-4">Gestion Inventaire</p>
          </div>
          <NavItem 
            icon={Package} 
            label="Ajouter Produit" 
            active={activeTab === 'add-product'} 
            onClick={() => setActiveTab('add-product')} 
          />
          <NavItem 
            icon={Layers} 
            label="Ajouter Catégorie" 
            active={activeTab === 'add-category'} 
            onClick={() => setActiveTab('add-category')} 
          />
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-gray-400 hover:text-luxury-red transition-all text-[10px] uppercase tracking-widest font-black rounded-2xl hover:bg-red-50"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black text-luxury-red uppercase tracking-[0.3em]">
              Protocole {activeTab.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-widest">Terminal Administrateur</p>
              <p className="text-[8px] text-luxury-red uppercase tracking-[0.4em] font-black">Autorisation Absolue</p>
            </div>
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden relative shadow-inner">
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
      className={`w-full flex items-center justify-between px-4 py-4 transition-all relative group rounded-2xl ${active ? 'bg-red-50 text-luxury-red' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
        <span className="text-[10px] uppercase tracking-widest font-black">{label}</span>
      </div>
      {badge && (
        <span className="bg-luxury-red text-white text-[8px] px-2 py-0.5 rounded-full font-black shadow-lg shadow-red-100">{badge}</span>
      )}
      {active && (
        <motion.div 
          layoutId="sidebarActive"
          className="absolute left-[-24px] w-1.5 h-8 bg-luxury-red rounded-r-full" 
        />
      )}
    </button>
  );
}

function OrdersTab() {
  const orders = [
    { id: '#M-4022', customer: 'Othman Bennani', city: 'Casablanca', total: '1,200 MAD', status: 'En Transit', date: '2026-03-20' },
    { id: '#M-4021', customer: 'Yasmine Kadiri', city: 'Rabat', total: '850 MAD', status: 'Livré', date: '2026-03-19' },
    { id: '#M-4020', customer: 'Mehdi Alami', city: 'Marrakech', total: '2,400 MAD', status: 'En Attente', date: '2026-03-19' },
    { id: '#M-4019', customer: 'Sami Tazi', city: 'Tanger', total: '450 MAD', status: 'Annulé', date: '2026-03-18' },
    { id: '#M-4018', customer: 'Layla Mansouri', city: 'Fès', total: '1,100 MAD', status: 'Livré', date: '2026-03-18' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Gestion des <span className="red-gradient-text italic">Commandes.</span></h2>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-black">Protocole Logistique Royaume</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden shadow-2xl rounded-[2.5rem]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">ID Protocole</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">Client</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">Ville</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">Investissement</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">Statut</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">Date</th>
              <th className="p-8 text-[10px] uppercase tracking-widest font-black text-luxury-red">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-8 text-[10px] font-black tracking-widest text-black">{order.id}</td>
                <td className="p-8 text-sm font-bold">{order.customer}</td>
                <td className="p-8 text-[10px] uppercase tracking-widest text-gray-400 font-black">{order.city}</td>
                <td className="p-8 text-sm font-black text-black">{order.total}</td>
                <td className="p-8">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${
                    order.status === 'Livré' ? 'border-green-100 text-green-600 bg-green-50' :
                    order.status === 'En Transit' ? 'border-blue-100 text-blue-600 bg-blue-50' :
                    order.status === 'Annulé' ? 'border-red-100 text-red-600 bg-red-50' :
                    'border-orange-100 text-orange-600 bg-orange-50'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-8 text-[10px] text-gray-400 font-black">{order.date}</td>
                <td className="p-8">
                  <button className="text-gray-300 hover:text-black transition-colors">
                    <MoreVertical size={18} />
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
    specs: [{ label: 'Poids', value: '' }],
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
      alert("Veuillez sélectionner une catégorie et télécharger une image.");
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

    alert("Produit catalogué avec succès.");
    onComplete();
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Cataloguer un <span className="red-gradient-text italic">Produit.</span></h2>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-black">Protocole d'expansion d'inventaire</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Nom du Produit</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-sm font-bold transition-all rounded-2xl shadow-sm" 
                placeholder="ex: ISO 100 Hydrolyzed" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Marque</label>
              <input 
                required
                type="text" 
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-sm font-bold transition-all rounded-2xl shadow-sm" 
                placeholder="ex: Dymatize" 
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Prix (MAD)</label>
                <input 
                  required
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-sm font-bold transition-all rounded-2xl shadow-sm" 
                  placeholder="950" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Classification</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-[10px] uppercase tracking-widest font-black transition-all appearance-none rounded-2xl shadow-sm"
                >
                  <option value="">Sélectionner</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Manifestation Visuelle</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-gray-100 bg-white hover:bg-red-50/30 hover:border-luxury-red/30 transition-all cursor-pointer flex flex-col items-center justify-center p-8 relative overflow-hidden rounded-[2.5rem] shadow-sm"
            >
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-contain p-8" />
              ) : (
                <>
                  <Upload size={40} className="text-gray-200 mb-4" />
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center leading-relaxed font-black">
                    Télécharger PNG/WebP <br /> Recommandé 800x800
                  </p>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Description Narrative</label>
          <textarea 
            required
            rows={4} 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-sm font-bold transition-all resize-none rounded-2xl shadow-sm" 
            placeholder="Détails techniques de l'isolat..." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Avantages Clés</label>
            {formData.benefits.map((benefit, i) => (
              <input 
                key={i}
                type="text" 
                value={benefit}
                onChange={(e) => handleBenefitChange(i, e.target.value)}
                className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-4 text-xs font-bold transition-all rounded-xl shadow-sm" 
                placeholder={`Avantage 0${i+1}`} 
              />
            ))}
            <button type="button" onClick={handleAddBenefit} className="text-[10px] uppercase tracking-widest text-luxury-red font-black flex items-center gap-2 hover:translate-x-2 transition-transform ml-4">
              <Plus size={14} /> Ajouter une Propriété
            </button>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Specs Techniques</label>
            <div className="flex gap-4">
               <input 
                 readOnly 
                 value="Poids" 
                 className="w-1/3 bg-gray-50 border border-gray-100 p-4 text-[10px] uppercase tracking-widest font-black rounded-xl" 
               />
               <input 
                 required
                 value={formData.specs[0].value}
                 onChange={(e) => setFormData({...formData, specs: [{ label: 'Poids', value: e.target.value }]})}
                 className="flex-1 bg-white border border-gray-100 focus:border-luxury-red outline-none p-4 text-xs font-bold rounded-xl shadow-sm" 
                 placeholder="ex: 2.27kg" 
               />
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button type="submit" className="luxury-button !px-20 py-6 rounded-2xl">
            Cataloguer le Produit
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
      alert("Veuillez télécharger une image de couverture.");
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

    alert("Catégorie établie avec succès.");
    onComplete();
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Établir un Nouveau <span className="red-gradient-text italic">Pilier.</span></h2>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-black">Protocole d'expansion structurelle</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Nom de la Catégorie</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-sm font-bold transition-all rounded-2xl shadow-sm" 
                placeholder="ex: Vitamines & Essentiels" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Description Stratégique</label>
              <textarea 
                required
                rows={4} 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white border border-gray-100 focus:border-luxury-red outline-none p-5 text-sm font-bold transition-all resize-none rounded-2xl shadow-sm" 
                placeholder="Définition de cette ligne de produits..." 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-4">Image de Couverture</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/3] border-2 border-dashed border-gray-100 bg-white hover:bg-red-50/30 hover:border-luxury-red/30 transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden rounded-[2.5rem] shadow-sm"
            >
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-cover opacity-60" />
              ) : (
                <>
                  <Upload size={40} className="text-gray-200 mb-4" />
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center leading-relaxed font-black">
                    Télécharger Arrière-plan <br /> Recommandé 1200x800
                  </p>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button type="submit" className="luxury-button !px-20 py-6 rounded-2xl">
            Établir la Catégorie
          </button>
        </div>
      </form>
    </div>
  );
}
