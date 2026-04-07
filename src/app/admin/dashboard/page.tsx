"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  TrendingUp,
  DollarSign,
  PackageCheck,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '@/data/products';
import { categories } from '@/data/categories';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
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
            icon={LayoutDashboard} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <NavItem 
            icon={ShoppingCart} 
            label="Orders" 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
            badge="12"
          />
          <NavItem 
            icon={Package} 
            label="Products" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <NavItem 
            icon={Users} 
            label="Customers" 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')} 
          />
          <div className="pt-8 pb-4">
            <p className="text-[8px] uppercase tracking-[0.4em] text-text-muted font-bold ml-4">System Protocols</p>
          </div>
          <NavItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
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
        {/* Top Header */}
        <header className="h-24 bg-black/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-12 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search artifacts, orders, or clients..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-3 pl-12 pr-6 text-xs font-light focus:border-gold/30 outline-none transition-all"
            />
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
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'products' && <ProductsTab />}
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

function OverviewTab() {
  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-serif italic mb-2">Performance Dashboard.</h2>
          <p className="text-text-muted text-[10px] uppercase tracking-[0.4em]">Real-time logistics analytics</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:border-gold/30 transition-all">
            <Filter size={14} /> Protocol Filter
          </button>
          <button className="luxury-button !py-3 !px-8 flex items-center gap-2">
            <Plus size={14} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard icon={DollarSign} label="Total Revenue" value="124,500 MAD" trend="+12.5%" />
        <StatCard icon={ShoppingCart} label="Daily Orders" value="18" trend="+4.2%" />
        <StatCard icon={PackageCheck} label="Fulfillment Rate" value="98.2%" trend="+0.5%" />
        <StatCard icon={TrendingUp} label="Conversion" value="3.4%" trend="+1.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-black border border-white/5 p-10 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg uppercase tracking-widest font-bold font-serif">Revenue Protocol</h3>
            <select className="bg-transparent border-none text-[10px] uppercase tracking-widest text-gold font-bold outline-none">
              <option>Last 30 Cycles</option>
              <option>Last 7 Cycles</option>
            </select>
          </div>
          <div className="h-[300px] w-full bg-gradient-to-t from-gold/5 to-transparent border-b border-white/10 flex items-end justify-between px-4 pb-4">
             {[40, 60, 45, 80, 55, 90, 75, 85, 65, 95].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: `${h}%` }}
                 transition={{ duration: 1, delay: i * 0.1 }}
                 className="w-8 bg-gold/20 hover:bg-gold/40 transition-all cursor-pointer relative group"
               >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-gold/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                     <p className="text-[8px] font-bold text-gold">{h * 100} MAD</p>
                  </div>
               </motion.div>
             ))}
          </div>
          <div className="flex justify-between text-[8px] uppercase tracking-[0.4em] text-text-muted pt-4">
            <span>Cycle 01</span>
            <span>Cycle 05</span>
            <span>Cycle 10</span>
          </div>
        </div>

        <div className="bg-black border border-white/5 p-10 space-y-8">
          <h3 className="text-lg uppercase tracking-widest font-bold font-serif">Recent Operations</h3>
          <div className="space-y-6">
            <ActivityItem label="New Acquisition" time="2m ago" detail="Order #M-4022" />
            <ActivityItem label="Logistics Update" time="15m ago" detail="Dispatch #D-901" />
            <ActivityItem label="Client Protocol" time="1h ago" detail="Support Ticket #S-11" />
            <ActivityItem label="Artifact Depleted" time="3h ago" detail="ISO 100 Isolate" />
          </div>
          <button className="w-full py-4 border border-white/5 text-[8px] uppercase tracking-widest font-bold text-gold/60 hover:text-gold transition-colors">
            View Protocol Log
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }: any) {
  return (
    <div className="bg-black border border-white/5 p-8 group hover:border-gold/20 transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-white/5 border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-bold text-green-500 tracking-widest">{trend}</span>
      </div>
      <p className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{label}</p>
      <p className="text-3xl font-serif italic text-white">{value}</p>
    </div>
  );
}

function ActivityItem({ label, time, detail }: any) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">{label}</p>
        <p className="text-[8px] text-text-muted uppercase tracking-widest">{detail}</p>
      </div>
      <span className="text-[8px] text-text-muted italic">{time}</span>
    </div>
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

function ProductsTab() {
  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-serif italic mb-2">Artifact Archive.</h2>
          <p className="text-text-muted text-[10px] uppercase tracking-[0.4em]">Supply Chain Integrity</p>
        </div>
        <button className="luxury-button flex items-center gap-2">
           <Plus size={14} /> Catalog New Isolate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-black border border-white/5 p-6 group hover:border-gold/30 transition-all">
            <div className="aspect-square bg-surface border border-white/5 mb-6 relative overflow-hidden p-8 flex items-center justify-center">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className={`object-contain mix-blend-lighten p-8 transition-transform duration-700 group-hover:scale-110 ${product.isRupture ? 'grayscale' : ''}`}
              />
              {product.isRupture && (
                <div className="absolute top-4 left-4 z-10">
                   <span className="bg-red-600 text-white text-[8px] px-2 py-1 uppercase font-bold tracking-widest">Rupture</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-1">{product.brand}</p>
                <h4 className="text-sm font-serif line-clamp-1">{product.name}</h4>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold">{product.price} MAD</p>
                <button className="text-[8px] uppercase tracking-widest font-bold border-b border-white/10 hover:border-gold hover:text-gold transition-all">
                  Edit Artifact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
