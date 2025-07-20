
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Durand',
    date: '15 Mars 2024',
    rating: 5,
    text: 'Magnifique collier traditionnel ! La qualité est exceptionnelle et l\'artisan a su capturer l\'essence de l\'art camerounais.',
    productImage: '/lovable-uploads/saty.jpg',
    avatar: '/lovable-uploads/WhatsApp Image 2025-07-20 à 04.20.17_e9b63eed.jpg'
  },
  {
    id: 2,
    name: 'Michel Kouam',
    date: '8 Mars 2024',
    rating: 5,
    text: 'Service client excellent et livraison rapide. Je recommande vivement cette plateforme pour découvrir l\'artisanat local.',
    productImage: '/lovable-uploads/shoes.jpg',
    avatar: '/lovable-uploads/WhatsApp Image 2025-07-20 à 04.21.47_4f1a1b2c.jpg'
  },
  {
    id: 3,
    name: 'Aminata Sow',
    date: '2 Mars 2024',
    rating: 5,
    text: 'Les produits sont authentiques et de grande qualité. C\'est formidable de pouvoir soutenir les artisans locaux.',
    productImage: '/lovable-uploads/tam.jpg',
    avatar: '/lovable-uploads/WhatsApp Image 2025-07-20 à 04.21.22_a9e55a0c.jpg'
  },
  {
    id: 4,
    name: 'Jeanny Mballa',
    date: '25 Février 2024',
    rating: 5,
    text: 'Une plateforme exceptionnelle qui valorise nos artisans. Les créations sont uniques et pleines d\'histoire.',
    productImage: '/lovable-uploads/te.jpg',
    avatar: '/lovable-uploads/WhatsApp Image 2025-07-20 à 04.20.41_45ec3996.jpg'
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#405B35] mb-4">
            Témoignages / Avis clients & artisans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de ceux qui ont choisi Artizone
          </p>
        </div>

        {/* Carousel for mobile */}
        <div className="block md:hidden mb-8">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="hover:shadow-lg transition-shadow duration-200 rounded-full p-1 bg-gradient-to-br from-orange-100 to-green-100 max-w-xs mx-auto">
                  <div className="bg-white rounded-full p-6 h-full flex flex-col justify-center items-center text-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <img 
                        src={testimonial.productImage} 
                        alt="Product"
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{testimonial.name}</h4>
                    <div className="flex justify-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-orange-400">⭐</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic mb-2">"{testimonial.text}"</p>
                    <span className="text-xs text-gray-500">{testimonial.date}</span>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <style>{`
            .testimonials-swiper .swiper-button-next,
            .testimonials-swiper .swiper-button-prev {
              color: #405B35;
              top: 40%;
              width: 2.5rem;
              height: 2.5rem;
              background: #EDF0E0;
              border-radius: 9999px;
              box-shadow: 0 2px 8px 0 rgba(64,91,53,0.08);
              transition: background 0.2s;
            }
            .testimonials-swiper .swiper-button-next:hover,
            .testimonials-swiper .swiper-button-prev:hover {
              background: #d1e7c6;
            }
            .testimonials-swiper .swiper-button-next:after,
            .testimonials-swiper .swiper-button-prev:after {
              font-size: 1.5rem;
              font-weight: bold;
            }
          `}</style>
        </div>

        {/* Grid for desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-200 rounded-full p-1 bg-gradient-to-br from-orange-100 to-green-100">
              <div className="bg-white rounded-full p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <img 
                    src={testimonial.productImage} 
                    alt="Product"
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{testimonial.name}</h4>
                <div className="flex justify-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-orange-400">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic mb-2">"{testimonial.text}"</p>
                <span className="text-xs text-gray-500">{testimonial.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
