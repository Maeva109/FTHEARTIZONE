import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const PaymentMobileMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const total = location.state?.total || 0;
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const { clearCart } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clearCart();
      // Simulate sending email notification here (in real app, call backend)
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#EDF0E0] flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center py-8 pt-24">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-8 mt-8 min-h-[350px] flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#405B35] mb-6 text-center">Paiement Mobile Money</h1>
          {processing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-10 w-10 text-[#405B35] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <div className="text-[#405B35] text-lg font-semibold">Traitement du paiement...</div>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center justify-center py-8">
              <svg className="h-12 w-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-green-700 text-xl font-bold mb-2">Paiement réussi !</div>
              <div className="text-gray-700 text-center mb-2">Vous recevrez un email de confirmation.<br/>Votre commande sera expédiée sous 2 jours ouvrés.</div>
              <div className="text-[#405B35] text-sm">Redirection vers l'accueil...</div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold mb-1" htmlFor="phone">Numéro Mobile Money *</label>
                <input id="phone" type="tel" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="password">Mot de passe Mobile Money *</label>
                <input id="password" type="password" className="w-full border rounded px-3 py-2" required />
              </div>
              <div className="font-bold text-lg text-center text-[#405B35] mb-2">
                Montant à payer : {total.toLocaleString()} FCFA
              </div>
              <Button type="submit" className="w-full bg-[#405B35] text-white font-semibold text-lg py-3 mt-4 rounded-lg shadow-sm transition-all">
                Confirmer le paiement
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentMobileMoney;
