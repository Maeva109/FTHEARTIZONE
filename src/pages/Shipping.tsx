import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const Shipping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const delivery = 2500; // All calculations are in FCFA
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.product.price) || 0) * item.quantity, 0);
  const total = subtotal + delivery;
  // Get payment method from location state or localStorage
  let selectedPaymentMethod = location.state?.selectedPaymentMethod;
  if (!selectedPaymentMethod) {
    selectedPaymentMethod = localStorage.getItem('selectedPaymentMethod') || '';
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // Save selectedPaymentMethod to localStorage for next page
    if (selectedPaymentMethod) {
      localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod);
    }
    // Redirect to the correct payment page based on selectedPaymentMethod
    if (selectedPaymentMethod === 'Orange Money') {
      navigate('/payment/orange-money', { state: { total } });
    } else if (selectedPaymentMethod === 'Mobile Money') {
      navigate('/payment/mobile-money', { state: { total } });
    } else if (selectedPaymentMethod === 'Carte Bancaire') {
      navigate('/payment/carte-bancaire', { state: { total } });
    } else {
      alert('Aucun moyen de paiement sélectionné.');
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF0E0] flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center py-8 pt-32">
        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-4xl mx-auto mb-2 mt-20 md:mt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cart">Panier</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/checkout">Commande</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Livraison</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Shipping Form */}
          <div>
            <h1 className="text-2xl font-bold text-[#405B35] mb-6 text-center">Informations de livraison</h1>
            <form className="space-y-4" onSubmit={handleShippingSubmit}>
              <div>
                <label className="block font-semibold mb-1" htmlFor="name">Nom complet *</label>
                <input id="name" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="address">Adresse *</label>
                <input id="address" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="city">Ville *</label>
                <input id="city" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              {/* Code postal removed for Cameroon */}
              <div>
                <label className="block font-semibold mb-1" htmlFor="phone">Téléphone *</label>
                <input id="phone" type="tel" className="w-full border rounded px-3 py-2" required />
              </div>
              <Button type="submit" className="w-full bg-green-200 hover:bg-green-300 text-[#405B35] font-semibold text-lg py-3 mt-4">
                Continuer vers le paiement
              </Button>
            </form>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/checkout')}>
              Retour au panier
            </Button>
          </div>
          {/* Right: Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-lg mb-4">RÉCAPITULATIF DE LA COMMANDE</h2>
            <div className="mb-4">
              {cartItems.length === 0 ? (
                <div className="text-gray-500 text-center">Votre panier est vide.</div>
              ) : (
                cartItems.map((item: any) => {
                  const price = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price);
                  return (
                    <div key={item.id} className="flex items-center gap-3 mb-2">
                      <img src={item.product.image || '/placeholder.png'} alt={item.product.name} className="w-14 h-14 rounded object-cover border" />
                      <div className="flex-1">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-xs text-gray-500">Magasin: {item.product.shopName || 'N/A'}</div>
                      </div>
                      <div className="font-bold">{Number(price).toLocaleString()} FCFA</div>
                      <div className="ml-2 text-xs">x{item.quantity}</div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{delivery ? delivery.toLocaleString() + ' FCFA' : '--'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>TOTAL</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* No modal, now redirecting to payment page */}
    </div>
  );
};

export default Shipping;
