
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, ShoppingCart, CreditCard, AlertTriangle, UserCheck, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const DashboardStats = () => {
  const [stats, setStats] = useState<any>(null);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
   
    fetch('http://localhost:8000/api/admin/stats/')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div>Chargement...</div>;

  const cards = [
    {
      title: 'Artisans',
      value: stats.artisans,
      icon: UserCheck,
      route: '/admin/users?filter=artisans',
    },
    {
      title: 'Clients',
      value: stats.clients,
      icon: Users,
      route: '/admin/users?filter=clients',
    },
    {
      title: 'Produits en ligne',
      value: stats.products,
      icon: Package,
      route: '/admin/products',
    },
    {
      title: 'Commandes',
      value: stats.orders,
      icon: ShoppingCart,
      route: '/admin/orders',
    },
    {
      title: 'Paiements en attente',
      value: stats.pending_payments,
      icon: CreditCard,
      route: '/admin/payments?filter=pending',
    },
    {
      title: 'Litiges ouverts',
      value: stats.open_disputes,
      icon: AlertTriangle,
      route: '/admin/disputes?filter=open',
    },
  ];

  const cardStyles = [
    'bg-gradient-to-br from-green-100 to-green-50', // Artisans
    'bg-gradient-to-br from-blue-100 to-blue-50',  // Clients
    'bg-gradient-to-br from-purple-100 to-purple-50', // Produits
    'bg-gradient-to-br from-yellow-100 to-yellow-50', // Commandes
    'bg-gradient-to-br from-orange-100 to-orange-50', // Paiements
    'bg-gradient-to-br from-red-100 to-red-50', // Litiges
  ];
  const iconStyles = [
    'text-green-600',
    'text-blue-600',
    'text-purple-600',
    'text-yellow-600',
    'text-orange-600',
    'text-red-600',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((stat, index) => (
        <Card
          key={index}
          className={`relative group cursor-pointer border-0 shadow-none ${cardStyles[index]} transition-transform hover:scale-105 hover:shadow-lg`}
          onClick={() => navigate(stat.route)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${iconStyles[index]} group-hover:scale-110 transition-transform`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-gray-900 drop-shadow-sm">{stat.value}</div>
          </CardContent>
          <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gray-300 transition-all pointer-events-none"></div> 
        </Card>
      ))}
    </div>
  );
};
