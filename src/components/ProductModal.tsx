import { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';
import { Product, buildWhatsAppUrl } from '../data/catalog';
import { WhatsAppIcon, PhoneStudioVisual } from './Icons';

interface ProductModalProps {
  product: Product | null;
  initialStorage?: string;
  initialFinishIdx?: number;
  onClose: () => void;
}

export function ProductModal({
  product,
  initialStorage,
  initialFinishIdx = 0,
  onClose,
}: ProductModalProps) {
  const [selectedStorage, setSelectedStorage] = useState(
    initialStorage || product?.storages[0] || ''
  );
  const [finishIdx, setFinishIdx] = useState(initialFinishIdx);

  useEffect(() => {
    if (product) {
      setSelectedStorage(initialStorage || product.storages[0]);
      setFinishIdx(initialFinishIdx);
    }
  }, [product, initialStorage, initialFinishIdx]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeFinish = product.finishes[finishIdx] || product.finishes[0];
  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Vim pelo site da Power Tec e quero consultar o ${product.name} (${selectedStorage}, cor ${activeFinish.name} - ${product.condition}).`
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#111113] border border-white/10 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left visual */}
        <div className="aspect-[4/5] md:aspect-auto md:min-h-[440px] bg-[#0B0B0D] relative overflow-hidden">
          {product.img ? (
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <PhoneStudioVisual
              modelName={product.name}
              finish={activeFinish}
              cameraLayout={product.cameraLayout}
            />
          )}
        </div>

        {/* Right details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FF7A29] tracking-wide">
                <span>{product.series}</span>
                <span aria-hidden="true">·</span>
                <span>{product.condition}</span>
              </div>
              <h3
                id="modal-product-title"
                className="text-2xl sm:text-3xl font-display font-bold text-white mt-1"
              >
                {product.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tabular-nums">
                  {product.price}
                </span>
                <span className="text-xs text-[#A1A1AA]">{product.installmentHint}</span>
              </div>
            </div>

            {/* Storage selector */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#A1A1AA]">Armazenamento</p>
              <div className="flex flex-wrap gap-2">
                {product.storages.map((cap) => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setSelectedStorage(cap)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                      selectedStorage === cap
                        ? 'bg-[#FF7A29] text-black'
                        : 'bg-white/5 text-[#D4D4D8] border border-white/10 hover:border-white/25'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish selector */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#A1A1AA]">
                Acabamento: <span className="text-white">{activeFinish.name}</span>
              </p>
              <div className="flex items-center gap-2.5">
                {product.finishes.map((fin, idx) => (
                  <button
                    key={fin.name}
                    type="button"
                    onClick={() => setFinishIdx(idx)}
                    title={fin.name}
                    aria-label={`Selecionar acabamento ${fin.name}`}
                    className={`w-7 h-7 rounded-full transition-transform cursor-pointer border-2 ${
                      idx === finishIdx
                        ? 'border-[#FF7A29] scale-110'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: fin.swatch }}
                  />
                ))}
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-2 pt-1 border-t border-white/10">
              {product.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#D4D4D8]">
                  <Check size={16} className="text-[#FF7A29] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Buying assurances */}
            <div className="grid grid-cols-1 gap-2 text-xs text-[#A1A1AA] pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#FF7A29] shrink-0" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={15} className="text-[#FF7A29] shrink-0" />
                <span>Parcelamento em até 18x ou desconto no PIX</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={15} className="text-[#FF7A29] shrink-0" />
                <span>Aceitamos seu iPhone usado na troca</span>
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-[#FF7A29] hover:bg-[#FF8C42] text-black font-bold text-sm rounded-xl transition-all shadow-[0_12px_30px_rgba(255,122,41,0.3)]"
          >
            <WhatsAppIcon size={20} />
            Garantir {product.name} ({selectedStorage})
          </a>
        </div>
      </div>
    </div>
  );
}
