import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [giftCard, setGiftCard] = useState('');
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step state for progress bar
  const navigate = useNavigate();

  // Use real cart data from context
  const { cartItems } = useCart();
  // All calculations are in FCFA
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.product?.price) || 0) * item.quantity, 0);
  const delivery = 2500;
  const total = subtotal + delivery;

  // Get payment method from location state (if coming from cart)
  const location = useLocation();
  const selectedPaymentMethod = location.state?.selectedPaymentMethod || '';

  const handleProceed = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }
    // Save email to localStorage for later use (e.g., sending confirmation email after payment)
    localStorage.setItem('checkoutEmail', email);
    setStep(2); // Move to next step (Livraison)
    setTimeout(() => {
      navigate('/checkout/shipping', { state: { selectedPaymentMethod } });
    }, 400); // Animate before redirect
  };

  return (
    <div className="min-h-screen bg-[#EDF0E0] flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center py-8">
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
                <BreadcrumbPage>Commande</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-full max-w-4xl mx-auto mb-4">
          <h1 style={{zIndex: 10, position: 'relative'}} className="text-3xl md:text-4xl font-bold text-[#405B35] mb-4 mt-2 text-center block">Finaliser ma commande</h1>
        </div>
        {/* Progress Bar */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2 text-[#405B35] text-sm font-semibold">
            <span className={step === 1 ? 'font-bold' : ''}>Contact</span>
            <span className={step === 2 ? 'font-bold' : ''}>Livraison</span>
            <span className={step === 3 ? 'font-bold' : ''}>Paiement</span>
            <span className={step === 4 ? 'font-bold' : ''}>Confirmation</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-[#405B35] rounded transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact Form */}
          <form className="bg-white rounded-xl shadow p-8 space-y-6" onSubmit={handleProceed}>
            {/* Info Message Instead of Gift Card */}
            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded p-3 text-sm flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
                className="flex-shrink-0"
              >
                <circle cx="10" cy="10" r="10" fill="#D1FADF" />
                <path
                  d="M7.5 10.5l2 2 3-4"
                  stroke="#16A34A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Profitez de la livraison rapide et d’un service client réactif sur Artizone !
            </div>

            {/* Contact */}
            <div className="mb-6 space-y-4">
              <div className="bg-gray-100 p-4 rounded text-center mb-4">
                Vous avez déjà un compte ?{' '}
                <span
                  className="text-[#405B35] underline cursor-pointer"
                  onClick={() => navigate('/login?redirect=/checkout')}
                >
                  Se connecter
                </span>
              </div>
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300" />
                <span className="mx-4 text-gray-500">Ou continuer ci-dessous</span>
                <div className="flex-1 border-t border-gray-300" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-[#405B35] mt-4" htmlFor="email">
                    Adresse e-mail *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className={`mb-1 ${error ? 'border-red-500' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                  <div className="text-xs text-gray-500 mb-2">
                    Le numéro de commande et le reçu seront envoyés à cette adresse e-mail.
                  </div>
                </div>
                
              </div>
             
          
            </div>
            <Button
              type="submit"
              className="w-full bg-[#405B35] hover:bg-green-700 text-white font-semibold text-lg py-3 mt-4 rounded-lg shadow-sm transition-all"
            >
              Procéder à l’expédition
            </Button>
          </form>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="font-bold text-lg mb-4 text-[#405B35]">
              RÉCAPITULATIF DE LA COMMANDE
            </h2>
            <div className="mb-4">
              {cartItems.length === 0 ? (
                <div className="text-gray-500 text-center">Votre panier est vide.</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mb-2">
                    <img
                      src={item.product?.image || '/placeholder.png'}
                      alt={item.product?.name || 'Produit'}
                      className="w-14 h-14 rounded object-cover border"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-[#405B35]">{item.product?.name}</div>
                      <div className="text-xs text-gray-500">Magasin: {item.product?.shop || 'N/A'}</div>
                      <div className="text-xs text-gray-500">Quantité: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-[#405B35]">{Number(item.product?.price ?? 0).toFixed(2)} FCFA</div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-[#405B35]">Sous-total</span>
                <span className="text-[#405B35]">{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#405B35]">Livraison</span>
                <span className="text-[#405B35]">
                  {delivery ? delivery.toLocaleString() + ' FCFA' : '--'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span className="text-[#405B35]">TOTAL</span>
                <span className="text-[#405B35]">{total.toLocaleString()} FCFA</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-red-100 text-red-700 border-red-200"
              onClick={() => navigate('/contact')}
            >
              Un problème ? Contactez-nous !
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;