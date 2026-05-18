/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import { 
  Smartphone, 
  Wrench, 
  ShieldCheck, 
  TrendingUp, 
  Instagram, 
  Mail, 
  MessageCircle, 
  MapPin 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Three.js Background Component ---
function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // Galaxy / Particles
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#FF5A00',
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Loop (Using performance.now() per instructions)
    let lastTime = performance.now();
    let animationId: number;

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      particlesMesh.rotation.y += deltaTime * 0.05;
      particlesMesh.rotation.x += deltaTime * 0.02;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.764-5.768zm3.393 8.167c-.145.405-.831.76-1.144.806-.29.044-.668.045-1.09-.092-.253-.082-.571-.196-.981-.373-1.726-.747-2.813-2.515-2.899-2.634-.086-.118-.702-.931-.702-1.774 0-.843.433-1.258.589-1.432.158-.174.346-.218.462-.218.116 0 .231.001.332.005.109.004.253-.041.397.302.145.344.492 1.198.535 1.285.044.088.073.19.015.306-.058.116-.088.19-.174.291-.087.102-.183.228-.261.306-.086.088-.177.184-.076.357.101.173.449.742.964 1.201.663.591 1.222.775 1.396.862.174.087.276.073.377-.044.101-.116.434-.506.55-.68.116-.173.232-.144.39-.087.158.058 1.013.478 1.187.565.174.087.29.13.332.203.044.072.044.419-.101.824z"/>
  </svg>
);

// --- Main App Component ---
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Animations
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.utils.toArray('.reveal').forEach((elem: any) => {
        gsap.from(elem, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          }
        });
      });

      // Infinite Carousel for Customers
      if (carouselRef.current) {
        const carousel = carouselRef.current;
        const width = carousel.offsetWidth;
        
        gsap.to(carousel, {
          x: `-${width / 2}px`,
          duration: 30,
          ease: 'none',
          repeat: -1
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const products = [
    { name: "iPhone 14 128GB", price: "R$ 2.590", img: "/Screenshot_20260508_121257_Instagram.jpg", status: "Semi Novo" },
    { name: "iPhone 13 128GB", price: "R$ 2.190", img: "/Screenshot_20260508_121352_Instagram.jpg", status: "Semi Novo" },
    { name: "iPhone 16 Pro Max", price: "Sob Consulta", img: "/AISelect_20260508_121612_WhatsApp.jpg", status: "Lacrado" },
    { name: "iPhone 17 Pro Max", price: "Sob Consulta", img: "/AISelect_20260508_121856_WhatsApp.jpg", status: "Lacrado" },
  ];

  const clients = [
    "/AISelect_20260508_124523_Instagram.jpg",
    "/AISelect_20260508_124508_Instagram.jpg",
    "/AISelect_20260508_124455_Instagram.jpg",
    "/AISelect_20260508_124447_Instagram.jpg",
    "/AISelect_20260508_124438_Instagram.jpg",
    "/AISelect_20260508_122234_Instagram.jpg",
    "/AISelect_20260508_122212_Instagram.jpg",
    "/AISelect_20260508_122157_Instagram.jpg",
    "/AISelect_20260508_122139_Instagram.jpg",
  ];

  return (
    <div ref={containerRef} className="relative z-10">
      {/* --- Background Glows --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-orange opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-orange opacity-5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F5F5F7 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <ThreeBackground />

      {/* --- Header --- */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center nav-blur">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center font-bold text-black font-display">P</div>
          <div className="text-xl font-display font-bold tracking-tighter uppercase italic">
            POWER <span className="text-brand-orange">TEC</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#A1A1AA]">
          <a href="#hero" className="text-[#F5F5F7] hover:text-brand-orange transition-colors">Home</a>
          <a href="#servicos" className="hover:text-brand-orange transition-colors">Serviços</a>
          <a href="#vitrine" className="hover:text-brand-orange transition-colors">Catálogo</a>
          <a 
            href="https://api.whatsapp.com/send?phone=5521967296969" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-brand-orange text-black font-bold rounded-full transition-transform active:scale-95 flex items-center gap-2"
          >
            <WhatsAppIcon size={18} />
            VIM PELO SITE
          </a>
        </div>
      </nav>

      <main>
        {/* --- Hero Section --- */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-20 gap-16 overflow-hidden max-w-[1440px] mx-auto">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ zIndex: -1, opacity: 0.25 }}
          >
            <source src="/Cinematic_macro_close-up_of_a_202605181050.mp4" type="video/mp4" />
          </video>
          
          <div className="max-w-4xl space-y-7 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge mx-auto"
            >
              Top 1% Apple Specialist
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight text-gradient"
            >
              A Experiência <span className="text-brand-orange">Premium</span> <br />que o seu Apple Merece.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-[#A1A1AA] max-w-2xl leading-relaxed font-light mx-auto"
            >
              Especialistas em conserto e venda de iPhones em Maricá. Confiança, garantia e o padrão de excelência Power Tec.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2"
            >
              <a 
                href="https://api.whatsapp.com/send?phone=5521967296969&text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20atendimento."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Fale com um Especialista
              </a>
              
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  {clients.slice(0, 4).map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-matte-black overflow-hidden bg-neutral-800 shadow-xl">
                      <img 
                        src={src} 
                        alt={`Cliente ${i + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('public/')) {
                            target.src = '/public' + target.src.substring(target.src.lastIndexOf('/'));
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-bold text-white">+2.4k Clientes</span>
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest font-medium">Satisfeitos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Services Section --- */}
        <section id="servicos" className="py-24 px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-display font-bold mb-4">Nossos Serviços</h2>
            <p className="text-[#A1A1AA]">Excelência e tecnologia em cada detalhe.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="premium-card p-10 rounded-2xl reveal group">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-8 text-brand-orange group-hover:scale-110 transition-transform">
                <Smartphone size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Venda de iPhones</h3>
              <p className="text-[#A1A1AA] mb-6">
                Aparelhos novos, lacrados e seminovos com procedência e garantia total. 
                Seu upgrade seguro começa aqui.
              </p>
              <span className="text-brand-orange font-semibold">Valor: Sob consulta</span>
            </div>

            <div className="premium-card p-10 rounded-2xl reveal delay-100 group">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-8 text-brand-orange group-hover:scale-110 transition-transform">
                <Wrench size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Conserto de iPhone</h3>
              <p className="text-[#A1A1AA] mb-6">
                Reparos técnicos avançados, troca de tela, bateria e placas em laboratório 
                especializado de última geração.
              </p>
              <span className="text-brand-orange font-semibold">Valor: Sob consulta</span>
            </div>
          </div>
        </section>

        {/* --- Product Showcase --- */}
        <section id="vitrine" className="py-24 px-8 bg-matte-onyx/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
              <div>
                <h2 className="text-4xl font-display font-bold mb-4 text-gradient">Vitrine Premium</h2>
                <p className="text-[#A1A1AA]">Aparelhos selecionados com o mais alto rigor de qualidade.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div key={i} className="premium-card rounded-2xl overflow-hidden group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-bold text-brand-orange mb-2 tracking-widest uppercase">{product.status}</div>
                    <h3 className="text-xl font-display font-bold mb-2">{product.name}</h3>
                    <div className="text-2xl font-bold mb-6 text-[#F5F5F7]">{product.price}</div>
                    
                    <a 
                      href={`https://api.whatsapp.com/send?phone=5521967296969&text=Gostaria%20de%20saber%20mais%20sobre%20o%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-5 bg-[#25D366] text-white font-extrabold text-sm rounded-xl hover:bg-[#20ba5a] transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
                    >
                      Falar com o atendente
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Customer Carousel --- */}
        <section className="py-24 overflow-hidden border-y border-white/5 relative bg-matte-black">
          <div className="max-w-7xl mx-auto px-8 mb-16 reveal">
            <h2 className="text-4xl font-display font-bold text-center mb-4">O Padrão Power Tec</h2>
            <p className="text-[#A1A1AA] text-center max-w-2xl mx-auto">
              Nossa maior garantia é a satisfação dos nossos clientes. Junte-se aos milhares de usuários que confiam na Power Tec.
            </p>
          </div>
          
          <div className="flex relative items-center mb-16">
            <div ref={carouselRef} className="flex gap-6 whitespace-nowrap">
              {[...clients, ...clients].map((src, i) => (
                <div key={i} className="w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl">
                  <img 
                    src={src} 
                    alt={`Customer ${i}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback case if pathing remains an issue in specific build environments
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('public/')) {
                        target.src = '/public' + target.src.substring(target.src.lastIndexOf('/'));
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial CTA Button */}
          <div className="max-w-7xl mx-auto px-8 flex justify-center reveal">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://api.whatsapp.com/send?phone=5521967296969&text=Olá!%20Vi%20os%20clientes%20satisfeitos%20no%20site%20e%20gostaria%20de%20falar%20com%20um%20atendente."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-12 py-6 bg-[#25D366] text-white font-extrabold text-xl rounded-2xl shadow-[0_20px_50px_rgba(37,211,102,0.3)] hover:shadow-[0_20px_60px_rgba(37,211,102,0.5)] transition-all group"
            >
              <WhatsAppIcon size={32} className="text-white group-hover:rotate-12 transition-transform" />
              FALAR COM UM ATENDENTE
            </motion.a>
          </div>
        </section>

        {/* --- Trust Factors --- */}
        <section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4 reveal">
            <div className="mx-auto w-12 h-12 text-brand-orange"><ShieldCheck size={48} /></div>
            <h3 className="text-xl font-bold">Garantia Real</h3>
            <p className="text-[#A1A1AA]">Todos os nossos produtos e serviços possuem garantia documentada.</p>
          </div>
          <div className="text-center space-y-4 reveal delay-100">
            <div className="mx-auto w-12 h-12 text-brand-orange"><TrendingUp size={48} /></div>
            <h3 className="text-xl font-bold">Procedência Apple</h3>
            <p className="text-[#A1A1AA]">Trabalhamos apenas com peças e aparelhos de procedência verificada.</p>
          </div>
          <div className="text-center space-y-4 reveal delay-200">
            <div className="mx-auto w-12 h-12 text-brand-orange"><Smartphone size={48} /></div>
            <h3 className="text-xl font-bold">Suporte Vitalício</h3>
            <p className="text-[#A1A1AA]">Estamos sempre à disposição para tirar dúvidas e auxiliar pós-venda.</p>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="footer-blur py-16 px-10 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center font-bold text-black font-display">P</div>
              <div className="text-xl font-display font-bold tracking-tighter uppercase italic">
                POWER <span className="text-brand-orange">TEC</span>
              </div>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Elevando o conceito de assistência e venda Apple para um novo patamar de exclusividade e confiança em Maricá.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">CONTATOS</h4>
            <ul className="space-y-4 text-sm text-[#A1A1AA]">
              <li className="flex items-center gap-3">
                <WhatsAppIcon size={18} className="text-brand-orange" />
                (21) 96729-6969
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-orange" />
                powertecmarica@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-brand-orange" />
                @_powertec
              </li>
            </ul>
          </div>

          <div className="space-y-6 md:col-span-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">LOCALIZAÇÃO</h4>
            <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm">
              {/* Google Maps Iframe with Dark Filter */}
              <div className="w-full h-48 sm:h-64 relative grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                <iframe 
                  src="https://maps.google.com/maps?q=Av.%20vereador%20Francisco%20Sabino%20da%20Costa,%20291%20-%20Maric%C3%A1%20-%20RJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Floating Route Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Av.+vereador+Francisco+Sabino+da+Costa,+291+-+Maricá+-+RJ"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pointer-events-auto px-6 py-3 bg-brand-orange text-black font-bold text-xs uppercase tracking-widest rounded-full shadow-premium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2"
                >
                  <MapPin size={16} />
                  COMO CHEGAR / VER ROTA
                </a>
              </div>

              {/* Address Info Bar */}
              <div className="p-5 flex gap-4 items-start border-t border-white/5 bg-matte-onyx/50 backdrop-blur-md">
                <MapPin size={24} className="text-brand-orange flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm text-white font-medium">Power Tec Maricá</p>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Av. vereador Francisco Sabino da Costa n.291 <br />
                    (Em frente ao supermarket) - Maricá, RJ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-6 text-[10px] text-[#A1A1AA] uppercase tracking-widest">
            <span>© Power Tec 2026</span>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          </div>

          <div className="flex items-center space-x-2 text-[10px] text-[#A1A1AA]">
            <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,90,0,1)]"></div>
            <span className="uppercase tracking-tighter">Status: Laboratório Aberto</span>
          </div>

          <div className="text-[10px] text-[#A1A1AA] italic">
            powertecmarica@gmail.com
          </div>
        </div>
      </footer>

      {/* --- Side Floating Widget (Conversion) --- */}
      <div className="fixed bottom-10 right-8 z-50">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://api.whatsapp.com/send?phone=5521967296969"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-orange w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,90,0,0.4)] cursor-pointer"
        >
          <WhatsAppIcon size={32} className="text-black" />
        </motion.a>
      </div>
    </div>
  );
}
