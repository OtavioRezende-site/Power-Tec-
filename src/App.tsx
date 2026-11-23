import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import {
  Smartphone,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Instagram,
  Mail,
  MapPin,
  Clock,
  Navigation,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  CreditCard,
  Award,
  Eye,
  Menu,
  X,
} from 'lucide-react';
import {
  PRODUCTS,
  CLIENT_PHOTOS,
  FAQ_ITEMS,
  STORE_INFO,
  Product,
  ProductCategory,
  buildWhatsAppUrl,
  assetUrl,
} from './data/catalog';
import { WhatsAppIcon, WazeIcon, PhoneStudioVisual } from './components/Icons';
import { ProductModal } from './components/ProductModal';

// --- Lightweight Three.js Ambient Particles ---
function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Skip heavy WebGL background on mobile devices for instant load & 60fps scrolling
    if (prefersReduced || window.innerWidth < 768) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const particlesCount = 750;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.006,
      color: '#FF7A29',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let lastTime = performance.now();
    let animationId = 0;

    const animate = () => {
      if (!document.hidden) {
        const currentTime = performance.now();
        const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        particlesMesh.rotation.y += deltaTime * 0.04;
        particlesMesh.rotation.x += deltaTime * 0.015;
        renderer.render(scene, camera);
      } else {
        lastTime = performance.now();
      }
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

type FilterOption = 'todos' | ProductCategory;

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: 'todos', label: 'Todos os Modelos' },
  { id: 'linha-18', label: 'Linha iPhone 18' },
  { id: 'lacrados', label: 'Lacrados' },
  { id: 'seminovos', label: 'Seminovos' },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('todos');
  const [cardSelections, setCardSelections] = useState<
    Record<string, { storage: string; finishIdx: number }>
  >({});
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Trade-in estimator state
  const [tradeModel, setTradeModel] = useState('iPhone 14');
  const [tradeStorage, setTradeStorage] = useState('128GB');
  const [tradeCondition, setTradeCondition] = useState('Excelente estado (sem marcas)');
  const [tradeTarget, setTradeTarget] = useState('iPhone 18 Pro Max');

  const filteredProducts =
    activeFilter === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category.includes(activeFilter));

  const getSelection = (product: Product) => {
    return (
      cardSelections[product.id] || {
        storage: product.storages[0],
        finishIdx: 0,
      }
    );
  };

  const updateSelection = (
    productId: string,
    patch: Partial<{ storage: string; finishIdx: number }>,
    product: Product
  ) => {
    setCardSelections((prev) => {
      const current = prev[productId] || {
        storage: product.storages[0],
        finishIdx: 0,
      };
      return {
        ...prev,
        [productId]: { ...current, ...patch },
      };
    });
  };

  const tradeInWhatsAppUrl = buildWhatsAppUrl(
    `Olá! Vim pelo site da Power Tec e quero avaliar meu aparelho usado na troca:\n• Meu aparelho: ${tradeModel} (${tradeStorage})\n• Estado: ${tradeCondition}\n• Interesse em trocar por: ${tradeTarget}`
  );

  return (
    <div className="relative z-10 min-h-screen">
      {/* Subtle Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[560px] h-[560px] bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[420px] h-[420px] bg-brand-orange/5 rounded-full blur-[110px]" />
      </div>

      <ThreeBackground />

      {/* --- Top Navigation (3-Zone Contract) --- */}
      <header className="fixed top-0 inset-x-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            className="flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-linear-to-br from-[#FF7A29] to-[#FF5A00] rounded-lg flex items-center justify-center font-extrabold text-black font-display text-base sm:text-lg">
              P
            </div>
            <span className="text-lg sm:text-xl font-display font-bold tracking-tight uppercase italic text-white">
              POWER <span className="text-[#FF7A29]">TEC</span>
            </span>
          </a>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]">
            <a
              href="#hero"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Início
            </a>
            <a
              href="#vitrine"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Vitrine
            </a>
            <a
              href="#troca"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Troca de Usado
            </a>
            <a
              href="#servicos"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Serviços
            </a>
            <a
              href="#localizacao"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Localização
            </a>
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={buildWhatsAppUrl(
                'Olá! Vim pelo site da Power Tec e gostaria de falar com um atendente.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF7A29]/15 border border-[#FF7A29]/60 text-[#FF8C42] hover:bg-[#FF7A29] hover:text-black font-semibold text-sm rounded-full transition-all whitespace-nowrap shrink-0"
            >
              <WhatsAppIcon size={18} />
              Atendimento
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-matte-black/95 backdrop-blur-xl px-5 py-5 space-y-4">
            <nav className="flex flex-col space-y-1 text-base font-medium text-[#D4D4D8]">
              {[
                { href: '#hero', label: 'Início' },
                { href: '#vitrine', label: 'Vitrine iPhone 18' },
                { href: '#troca', label: 'Troca de Usado' },
                { href: '#servicos', label: 'Serviços' },
                { href: '#localizacao', label: 'Localização' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 hover:text-[#FF7A29] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={buildWhatsAppUrl(
                'Olá! Vim pelo site da Power Tec e gostaria de atendimento.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3.5 bg-[#FF7A29] text-black font-bold rounded-xl"
            >
              <WhatsAppIcon size={19} />
              Falar no WhatsApp
            </a>
          </div>
        )}
      </header>

      <main>
        {/* --- 1. Full-Bleed Hero Section --- */}
        <section
          id="hero"
          className="relative isolate w-full min-h-[100dvh] flex flex-col justify-between pt-20 pb-8 sm:pt-28 sm:pb-10 px-4 sm:px-10 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full min-w-full min-h-full object-cover object-center opacity-35"
            >
              <source
                src={assetUrl('Cinematic_macro_close-up_of_a_202605181050.mp4')}
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-linear-to-b from-matte-black/65 via-matte-black/30 to-matte-black" />
          </div>

          <div className="my-auto w-full max-w-4xl mx-auto text-center space-y-5 sm:space-y-7 relative z-10 py-6 sm:py-10">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] sm:text-sm font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#FF8C42]"
            >
              Especialistas Apple em Maricá · Linha iPhone 18
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[2.15rem] sm:text-6xl lg:text-7xl font-display font-bold leading-[1.06] sm:leading-[1.02] tracking-tight text-gradient"
            >
              A Experiência <span className="text-[#FF7A29]">Premium</span>{' '}
              que o seu Apple Merece.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-[15px] sm:text-lg lg:text-xl text-[#D4D4D8] max-w-2xl mx-auto leading-relaxed"
            >
              iPhones lacrados de última geração, seminovos revisados com garantia documentada e avaliação justa do seu usado na troca.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              <a
                href={buildWhatsAppUrl(
                  'Olá, vim pelo site da Power Tec e gostaria de falar com um especialista sobre os iPhones disponíveis.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[48px] text-sm sm:text-base whitespace-nowrap"
              >
                <WhatsAppIcon size={21} />
                Fale com um Especialista
              </a>

              <a
                href="#vitrine"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 min-h-[48px] rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-white font-semibold text-sm sm:text-base transition-colors w-full sm:w-auto whitespace-nowrap"
              >
                Explorar Vitrine
                <ArrowRight size={18} />
              </a>
            </motion.div>

            {/* Real Client Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-3 pt-1 sm:pt-2"
            >
              <div className="flex -space-x-2.5">
                {CLIENT_PHOTOS.slice(0, 4).map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-matte-black overflow-hidden bg-neutral-800"
                  >
                    <img
                      src={src}
                      alt={`Cliente Power Tec ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs sm:text-sm font-bold text-white tabular-nums">
                  +2.400 clientes atendidos
                </p>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA]">
                  Referência em iPhones em Maricá
                </p>
              </div>
            </motion.div>
          </div>

          {/* 4-Column Store Highlights Strip */}
          <div className="relative z-10 max-w-7xl w-full mx-auto pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
              <Smartphone size={18} className="text-[#FF7A29] shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Linha iPhone 18</p>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA]">18, 18 Pro e Pro Max</p>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
              <RefreshCw size={18} className="text-[#FF7A29] shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Troca Facilitada</p>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA]">Seu usado vale entrada</p>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
              <CreditCard size={18} className="text-[#FF7A29] shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Até 18x no Cartão</p>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA]">Ou desconto no PIX</p>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
              <ShieldCheck size={18} className="text-[#FF7A29] shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Garantia Real</p>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA]">Procedência verificada</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. Interactive Vitrine Premium (Sales Core) --- */}
        <section id="vitrine" className="py-16 sm:py-24 px-4 sm:px-10 bg-[#0A0A0D] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
              <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7A29]">
                  Catálogo Atualizado · Geração 18
                </p>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-gradient">
                  Vitrine Premium Power Tec
                </h2>
                <p className="text-[#A1A1AA] text-sm sm:text-base">
                  Escolha o modelo, a capacidade e o acabamento ideal. Consulte disponibilidade em tempo real direto com nossa equipe.
                </p>
              </div>

              {/* Functional Category Filter Tabs (Swipeable single row on mobile) */}
              <div
                className="flex items-center gap-1.5 p-1.5 bg-matte-onyx border border-white/10 rounded-xl max-w-full overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Filtrar aparelhos por categoria"
              >
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-3.5 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#FF7A29] text-black'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => {
                const selection = getSelection(product);
                const activeFinish =
                  product.finishes[selection.finishIdx] || product.finishes[0];
                const whatsappMessage = `Olá! Vim pelo site da Power Tec e quero consultar o ${product.name} (${selection.storage} · ${activeFinish.name} · ${product.condition}).`;

                return (
                  <article
                    key={product.id}
                    className="premium-card rounded-2xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Visual (Click opens quick-view modal) */}
                      <button
                        type="button"
                        onClick={() => setModalProduct(product)}
                        className="relative block w-full aspect-[4/4] sm:aspect-[4/5] overflow-hidden bg-[#0E0E11] text-left cursor-pointer"
                        aria-label={`Ver detalhes do ${product.name}`}
                      >
                        {product.img ? (
                          <img
                            src={product.img}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <PhoneStudioVisual
                            modelName={product.name}
                            finish={activeFinish}
                            cameraLayout={product.cameraLayout}
                          />
                        )}

                        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white inline-flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Eye size={13} />
                          Detalhes
                        </span>
                      </button>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5 space-y-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#FF7A29]">
                            <span>{product.condition}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#A1A1AA]">{product.series}</span>
                          </div>
                          <h3 className="text-xl font-display font-bold text-white mt-1">
                            {product.name}
                          </h3>
                          <div className="mt-1.5">
                            <p className="text-2xl font-bold text-white tabular-nums">
                              {product.price}
                            </p>
                            <p className="text-xs text-[#A1A1AA] mt-0.5">
                              {product.installmentHint}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Storage Options */}
                        <div className="flex flex-wrap gap-2">
                          {product.storages.map((cap) => (
                            <button
                              key={cap}
                              type="button"
                              onClick={() =>
                                updateSelection(product.id, { storage: cap }, product)
                              }
                              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-md text-xs sm:text-[11px] font-semibold tabular-nums transition-colors cursor-pointer ${
                                selection.storage === cap
                                  ? 'bg-white text-black'
                                  : 'bg-white/[0.05] text-[#A1A1AA] hover:text-white border border-white/10'
                              }`}
                            >
                              {cap}
                            </button>
                          ))}
                        </div>

                        {/* Interactive Finish Swatches */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2.5 sm:gap-2">
                            {product.finishes.map((fin, idx) => (
                              <button
                                key={fin.name}
                                type="button"
                                onClick={() =>
                                  updateSelection(product.id, { finishIdx: idx }, product)
                                }
                                title={fin.name}
                                aria-label={`Cor ${fin.name}`}
                                className={`w-6 h-6 sm:w-5 sm:h-5 rounded-full border-2 transition-transform cursor-pointer ${
                                  selection.finishIdx === idx
                                    ? 'border-[#FF7A29] scale-110'
                                    : 'border-white/20 hover:scale-105'
                                }`}
                                style={{ backgroundColor: fin.swatch }}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setModalProduct(product)}
                            className="text-xs font-medium text-[#A1A1AA] hover:text-[#FF7A29] py-1 transition-colors cursor-pointer"
                          >
                            Ficha técnica
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card CTA */}
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                      <a
                        href={buildWhatsAppUrl(whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full min-h-[46px] py-3.5 px-4 bg-[#FF7A29]/12 border border-[#FF7A29]/60 text-[#FF8C42] font-bold text-sm rounded-xl hover:bg-[#FF7A29] hover:text-black transition-all"
                      >
                        <WhatsAppIcon size={19} />
                        Falar com o atendente
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- 3. Interactive Trade-In Section (High-Converting Sales Funnel) --- */}
        <section id="troca" className="py-16 sm:py-24 px-4 sm:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-stretch bg-matte-onyx border border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7A29]">
                  Upgrade Inteligente
                </p>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                  Seu iPhone usado vale entrada na hora.
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  Quer migrar para a linha iPhone 18 ou fazer upgrade para um modelo Pro? Informe os dados do seu aparelho atual e receba uma pré-avaliação rápida pelo WhatsApp.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-sm text-[#D4D4D8]">
                <p className="flex items-center gap-2.5">
                  <Award size={18} className="text-[#FF7A29] shrink-0" />
                  Avaliação transparente e sem burocracia
                </p>
                <p className="flex items-center gap-2.5">
                  <RefreshCw size={18} className="text-[#FF7A29] shrink-0" />
                  Transferimos 100% dos seus dados na hora
                </p>
                <p className="flex items-center gap-2.5">
                  <CreditCard size={18} className="text-[#FF7A29] shrink-0" />
                  Parcele a diferença em até 18x no cartão
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0B0B0D] border border-white/[0.07] rounded-2xl p-4 sm:p-8 flex flex-col justify-between gap-5 sm:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-semibold text-[#A1A1AA]">
                    Qual é o seu iPhone atual?
                  </span>
                  <select
                    value={tradeModel}
                    onChange={(e) => setTradeModel(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl bg-matte-onyx border border-white/10 text-white text-base sm:text-sm focus:outline-none focus:border-[#FF7A29]"
                  >
                    {[
                      'iPhone 11',
                      'iPhone 12 / 12 Pro',
                      'iPhone 13 / 13 Pro',
                      'iPhone 14 / 14 Pro',
                      'iPhone 15 / 15 Pro',
                      'iPhone 16 / 16 Pro',
                      'iPhone 17 / 17 Pro',
                    ].map((m) => (
                      <option key={m} value={m} className="bg-matte-onyx">
                        {m}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-semibold text-[#A1A1AA]">
                    Armazenamento do seu aparelho
                  </span>
                  <select
                    value={tradeStorage}
                    onChange={(e) => setTradeStorage(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl bg-matte-onyx border border-white/10 text-white text-base sm:text-sm focus:outline-none focus:border-[#FF7A29]"
                  >
                    {['64GB', '128GB', '256GB', '512GB', '1TB'].map((s) => (
                      <option key={s} value={s} className="bg-matte-onyx">
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-semibold text-[#A1A1AA]">
                    Estado de conservação
                  </span>
                  <select
                    value={tradeCondition}
                    onChange={(e) => setTradeCondition(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl bg-matte-onyx border border-white/10 text-white text-base sm:text-sm focus:outline-none focus:border-[#FF7A29]"
                  >
                    {[
                      'Excelente estado (sem marcas)',
                      'Bom estado (marcas leves de uso)',
                      'Tela ou traseira trincada',
                    ].map((c) => (
                      <option key={c} value={c} className="bg-matte-onyx">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-semibold text-[#A1A1AA]">
                    Qual modelo você quer levar?
                  </span>
                  <select
                    value={tradeTarget}
                    onChange={(e) => setTradeTarget(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl bg-matte-onyx border border-white/10 text-white text-base sm:text-sm focus:outline-none focus:border-[#FF7A29]"
                  >
                    {[
                      'iPhone 18 Pro Max',
                      'iPhone 18 Pro',
                      'iPhone 18',
                      'iPhone 17 Pro Max',
                      'iPhone 16 Pro Max',
                      'iPhone 15 Pro (Seminovo)',
                      'Outro modelo',
                    ].map((t) => (
                      <option key={t} value={t} className="bg-matte-onyx">
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <a
                href={tradeInWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2.5 w-full min-h-[48px] text-sm sm:text-base text-center"
              >
                <WhatsAppIcon size={21} />
                Avaliar meu {tradeModel} no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* --- 4. Services & Trust Pillars --- */}
        <section id="servicos" className="py-16 sm:py-20 px-4 sm:px-10 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7A29]">
              Solução Completa Apple
            </p>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
              Venda e Assistência com Padrão de Excelência
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-14">
            <div className="premium-card p-6 sm:p-10 rounded-2xl space-y-4 sm:space-y-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF7A29]/12 rounded-xl flex items-center justify-center text-[#FF7A29]">
                <Smartphone size={26} />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Venda de iPhones Lacrados e Seminovos
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Catálogo selecionado desde o iPhone 13 até a nova geração iPhone 18. Todos os aparelhos passam por inspeção rigorosa, procedência garantida e entrega segura em Maricá.
              </p>
              <a
                href="#vitrine"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF7A29] hover:text-[#FF984F] transition-colors py-1"
              >
                Ver modelos disponíveis
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="premium-card p-6 sm:p-10 rounded-2xl space-y-4 sm:space-y-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF7A29]/12 rounded-xl flex items-center justify-center text-[#FF7A29]">
                <Wrench size={26} />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Laboratório Técnico Especializado Apple
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Troca de tela, bateria, conector, vidro traseiro, Face ID e reparos avançados em placa com equipamentos de precisão e diagnóstico transparente.
              </p>
              <a
                href={buildWhatsAppUrl(
                  'Olá! Vim pelo site da Power Tec e preciso de um orçamento para conserto de iPhone.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF7A29] hover:text-[#FF984F] transition-colors py-1"
              >
                Solicitar orçamento técnico
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-white/[0.07]">
            <div className="space-y-2">
              <ShieldCheck size={28} className="text-[#FF7A29]" />
              <h3 className="text-lg font-display font-bold text-white">Garantia Documentada</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Compra e reparo com recibo e termo de garantia claros, para você usar seu aparelho com tranquilidade total.
              </p>
            </div>
            <div className="space-y-2">
              <TrendingUp size={28} className="text-[#FF7A29]" />
              <h3 className="text-lg font-display font-bold text-white">Procedência Verificada</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Trabalhamos exclusivamente com aparelhos homologados e peças de alto padrão de qualidade.
              </p>
            </div>
            <div className="space-y-2">
              <Smartphone size={28} className="text-[#FF7A29]" />
              <h3 className="text-lg font-display font-bold text-white">Suporte Pós-Venda</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Migração de dados na loja e equipe sempre pronta no WhatsApp para tirar qualquer dúvida após a compra.
              </p>
            </div>
          </div>
        </section>

        {/* --- 5. Real Customers Marquee --- */}
        <section className="py-16 sm:py-24 overflow-hidden border-y border-white/[0.06] bg-[#08080A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-10 mb-10 sm:mb-14 text-center space-y-2.5 sm:space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7A29]">
              Clientes Reais em Maricá
            </p>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
              O Padrão Power Tec
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto">
              Mais de 2.400 clientes já escolheram a Power Tec para comprar ou cuidar do seu iPhone.
            </p>
          </div>

          <div className="relative flex overflow-hidden mb-10 sm:mb-14">
            <div className="flex gap-4 sm:gap-6 animate-marquee w-max">
              {[...CLIENT_PHOTOS, ...CLIENT_PHOTOS].map((src, i) => (
                <div
                  key={i}
                  className="w-[220px] sm:w-[290px] h-[290px] sm:h-[380px] shrink-0 rounded-2xl overflow-hidden border border-white/[0.07] bg-matte-onyx"
                >
                  <img
                    src={src}
                    alt={`Cliente satisfeito Power Tec ${(i % CLIENT_PHOTOS.length) + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
            <a
              href={buildWhatsAppUrl(
                'Olá! Vi os clientes satisfeitos no site da Power Tec e gostaria de falar com um atendente.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-12 py-4 sm:py-5 min-h-[52px] bg-[#FF7A29]/12 border-2 border-[#FF7A29] text-[#FF8C42] hover:bg-[#FF7A29] hover:text-black font-extrabold text-sm sm:text-lg rounded-2xl shadow-[0_14px_40px_rgba(255,122,41,0.22)] hover:shadow-[0_18px_50px_rgba(255,122,41,0.4)] transition-all"
            >
              <WhatsAppIcon size={24} />
              FALAR COM UM ATENDENTE
            </a>
          </div>
        </section>

        {/* --- 6. Buyer FAQ --- */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 space-y-2.5 sm:space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7A29]">
              Tire suas dúvidas
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full min-h-[44px] flex items-center justify-between gap-4 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] sm:text-lg font-semibold text-white leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#FF7A29] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed pr-4 sm:pr-8">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 7. Dedicated Location Section (Separate from Footer, Waze + Google Maps) --- */}
        <section
          id="localizacao"
          className="py-16 sm:py-24 px-4 sm:px-10 bg-[#0A0A0D] border-t border-white/[0.06]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7A29]">
                Visite nossa loja física
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
                Onde Estamos em Maricá
              </h2>
              <p className="text-[#A1A1AA] text-sm sm:text-base">
                Venha conhecer os aparelhos de perto, testar o seu próximo iPhone e traçar a rota direta pelo Waze ou Google Maps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Interactive Google Maps */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-matte-onyx h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[430px]">
                <iframe
                  title="Mapa da Loja Power Tec Maricá"
                  src={STORE_INFO.mapsEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Address Details + Direct Waze & Google Maps Route Buttons */}
              <div className="lg:col-span-5 bg-matte-onyx border border-white/[0.08] rounded-2xl p-5 sm:p-9 flex flex-col justify-between gap-6 sm:gap-8">
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FF7A29]/12 text-[#FF7A29] flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-display font-bold text-white">
                        {STORE_INFO.name}
                      </h3>
                      <p className="text-sm text-[#D4D4D8] leading-relaxed">
                        {STORE_INFO.street}
                      </p>
                      <p className="text-xs sm:text-sm text-[#A1A1AA]">
                        {STORE_INFO.reference} · CEP {STORE_INFO.cep}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 sm:gap-4 pt-5 border-t border-white/[0.07]">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FF7A29]/12 text-[#FF7A29] flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white">
                        Horário de Atendimento
                      </h4>
                      <p className="text-sm text-[#D4D4D8]">{STORE_INFO.hoursWeek}</p>
                      <p className="text-sm text-[#A1A1AA]">{STORE_INFO.hoursSat}</p>
                    </div>
                  </div>
                </div>

                {/* Route Buttons: Waze + Google Maps */}
                <div className="space-y-3 pt-4 border-t border-white/[0.07]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                    Traçar rota até a loja
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={STORE_INFO.wazeRouteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 min-h-[48px] py-3.5 px-4 rounded-xl bg-[#33CCFF]/15 border border-[#33CCFF]/50 text-[#7CE0FF] hover:bg-[#33CCFF] hover:text-black font-bold text-sm transition-all whitespace-nowrap"
                    >
                      <WazeIcon size={20} />
                      Abrir no Waze
                    </a>

                    <a
                      href={STORE_INFO.googleMapsRouteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 min-h-[48px] py-3.5 px-4 rounded-xl bg-[#FF7A29] hover:bg-[#FF8C42] text-black font-bold text-sm transition-all whitespace-nowrap"
                    >
                      <Navigation size={18} />
                      Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Clean Footer (Without Map/Location Widget) --- */}
      <footer className="bg-matte-black py-14 sm:py-16 pb-24 sm:pb-16 px-4 sm:px-10 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-linear-to-br from-[#FF7A29] to-[#FF5A00] rounded-lg flex items-center justify-center font-extrabold text-black font-display">
                P
              </div>
              <span className="text-xl font-display font-bold tracking-tight uppercase italic text-white">
                POWER <span className="text-[#FF7A29]">TEC</span>
              </span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xs">
              Venda de iPhones lacrados, seminovos selecionados e assistência técnica especializada Apple em Maricá.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Navegação</h4>
            <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#vitrine" className="hover:text-white transition-colors">
                  Vitrine iPhone 18
                </a>
              </li>
              <li>
                <a href="#troca" className="hover:text-white transition-colors">
                  Avaliar Usado na Troca
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Serviços e Assistência
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">
                  Localização e Rotas
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Contatos</h4>
            <ul className="space-y-3 text-sm text-[#A1A1AA]">
              <li>
                <a
                  href={buildWhatsAppUrl('Olá! Vim pelo site da Power Tec.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-white transition-colors"
                >
                  <WhatsAppIcon size={18} className="text-[#FF7A29]" />
                  {STORE_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="inline-flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail size={18} className="text-[#FF7A29]" />
                  {STORE_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Instagram size={18} className="text-[#FF7A29]" />
                  {STORE_INFO.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 sm:mt-12 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#A1A1AA] text-center sm:text-left">
          <span>© 2026 Power Tec Maricá. Todos os direitos reservados.</span>
          <span>Maricá · Rio de Janeiro</span>
        </div>
      </footer>

      {/* --- Floating WhatsApp Bubble (Speech Bubble with Centered Outline Icon) --- */}
      <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:bottom-8 sm:right-8 z-50">
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          href={buildWhatsAppUrl(
            'Olá! Vim pelo site da Power Tec e quero falar com um atendente.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full rounded-br-sm bg-linear-to-br from-[#FF8C42] via-[#FF7321] to-[#FF5A00] text-white shadow-[0_12px_32px_rgba(255,115,33,0.55)] hover:shadow-[0_14px_42px_rgba(255,130,50,0.75)] ring-2 ring-white/25 transition-shadow cursor-pointer"
        >
          <WhatsAppIcon size={30} className="relative z-10 text-white sm:w-[34px] sm:h-[34px]" />
        </motion.a>
      </div>

      {/* --- Product Quick-View Modal --- */}
      <ProductModal
        product={modalProduct}
        initialStorage={
          modalProduct ? getSelection(modalProduct).storage : undefined
        }
        initialFinishIdx={
          modalProduct ? getSelection(modalProduct).finishIdx : 0
        }
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
