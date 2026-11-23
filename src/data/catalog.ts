export type ProductCategory = 'linha-18' | 'lacrados' | 'seminovos';

export interface ProductFinish {
  name: string;
  bodyColor: string;
  frameColor: string;
  lensRing: string;
  swatch: string;
}

export interface Product {
  id: string;
  name: string;
  series: string;
  condition: 'Lacrado' | 'Semi Novo';
  category: ProductCategory[];
  price: string;
  installmentHint: string;
  storages: string[];
  img?: string;
  cameraLayout: 'dual' | 'triple-pro';
  finishes: ProductFinish[];
  highlights: string[];
  warranty: string;
  featured?: boolean;
}

export const WHATSAPP_NUMBER = '5521967296969';

export const STORE_INFO = {
  name: 'Power Tec Maricá',
  street: 'Av. Vereador Francisco Sabino da Costa, 291',
  reference: 'Em frente ao Supermarket · Centro, Maricá - RJ',
  cep: '24900-100',
  hoursWeek: 'Segunda a Sexta · 09h às 18h',
  hoursSat: 'Sábado · 09h às 14h',
  phoneDisplay: '(21) 96729-6969',
  email: 'powertecmarica@gmail.com',
  instagram: '@_powertec',
  instagramUrl: 'https://www.instagram.com/_powertec',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Av.%20Vereador%20Francisco%20Sabino%20da%20Costa,%20291%20-%20Maric%C3%A1%20-%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed',
  googleMapsRouteUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Av.+Vereador+Francisco+Sabino+da+Costa,+291,+Maric%C3%A1+-+RJ,+24900-100',
  wazeRouteUrl:
    'https://waze.com/ul?q=Av.%20Vereador%20Francisco%20Sabino%20da%20Costa,%20291,%20Maric%C3%A1%20-%20RJ&navigate=yes',
};

export function buildWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-18-pro-max',
    name: 'iPhone 18 Pro Max',
    series: 'Linha iPhone 18',
    condition: 'Lacrado',
    category: ['linha-18', 'lacrados'],
    price: 'Sob Consulta',
    installmentHint: 'Até 18x no cartão ou PIX com desconto',
    storages: ['256GB', '512GB', '1TB'],
    cameraLayout: 'triple-pro',
    featured: true,
    warranty: '1 ano de garantia oficial Apple + suporte Power Tec',
    finishes: [
      {
        name: 'Titânio Preto',
        bodyColor: '#1C1D20',
        frameColor: '#3A3C42',
        lensRing: '#52555E',
        swatch: '#26272B',
      },
      {
        name: 'Titânio Deserto',
        bodyColor: '#C4A88B',
        frameColor: '#DFC7AE',
        lensRing: '#9E8266',
        swatch: '#C9AD8F',
      },
      {
        name: 'Titânio Natural',
        bodyColor: '#9C9891',
        frameColor: '#BEB9B1',
        lensRing: '#78746E',
        swatch: '#A4A099',
      },
    ],
    highlights: [
      'Tela Super Retina XDR ProMotion 120Hz de 6.9"',
      'Sistema de câmera Pro tripla de 48MP com teleobjetiva',
      'Estrutura em Titânio aeroespacial e bateria de longa duração',
    ],
  },
  {
    id: 'iphone-18-pro',
    name: 'iPhone 18 Pro',
    series: 'Linha iPhone 18',
    condition: 'Lacrado',
    category: ['linha-18', 'lacrados'],
    price: 'Sob Consulta',
    installmentHint: 'Até 18x no cartão ou PIX com desconto',
    storages: ['256GB', '512GB', '1TB'],
    cameraLayout: 'triple-pro',
    featured: true,
    warranty: '1 ano de garantia oficial Apple + suporte Power Tec',
    finishes: [
      {
        name: 'Titânio Natural',
        bodyColor: '#9C9891',
        frameColor: '#BEB9B1',
        lensRing: '#78746E',
        swatch: '#A4A099',
      },
      {
        name: 'Titânio Deserto',
        bodyColor: '#C4A88B',
        frameColor: '#DFC7AE',
        lensRing: '#9E8266',
        swatch: '#C9AD8F',
      },
      {
        name: 'Titânio Preto',
        bodyColor: '#1C1D20',
        frameColor: '#3A3C42',
        lensRing: '#52555E',
        swatch: '#26272B',
      },
    ],
    highlights: [
      'Tela Super Retina XDR ProMotion 120Hz de 6.3"',
      'Chip série A Pro de última geração para desempenho extremo',
      'Gravação em vídeo 4K Dolby Vision e USB-C ultrarrápido',
    ],
  },
  {
    id: 'iphone-18',
    name: 'iPhone 18',
    series: 'Linha iPhone 18',
    condition: 'Lacrado',
    category: ['linha-18', 'lacrados'],
    price: 'Sob Consulta',
    installmentHint: 'Até 18x no cartão · Aceitamos seu usado',
    storages: ['128GB', '256GB', '512GB'],
    cameraLayout: 'dual',
    featured: true,
    warranty: '1 ano de garantia oficial Apple + suporte Power Tec',
    finishes: [
      {
        name: 'Meia-Noite',
        bodyColor: '#1D2330',
        frameColor: '#374156',
        lensRing: '#4B5770',
        swatch: '#232B3B',
      },
      {
        name: 'Estelar',
        bodyColor: '#DFDDD7',
        frameColor: '#F3F2EE',
        lensRing: '#BDBAB2',
        swatch: '#E5E3DD',
      },
      {
        name: 'Âmbar',
        bodyColor: '#B85928',
        frameColor: '#DF7A44',
        lensRing: '#8F411A',
        swatch: '#CC6631',
      },
    ],
    highlights: [
      'Design leve em alumínio aeroespacial com Ceramic Shield',
      'Sistema de câmera dupla avançada de 48MP com fotos espaciais',
      'Autonomia para o dia inteiro com recarga rápida USB-C',
    ],
  },
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    series: 'Linha Pro',
    condition: 'Lacrado',
    category: ['lacrados'],
    price: 'Sob Consulta',
    installmentHint: 'Pronta entrega · Consulte cores disponíveis',
    storages: ['256GB', '512GB'],
    img: '/AISelect_20260508_121856_WhatsApp.jpg',
    cameraLayout: 'triple-pro',
    warranty: '1 ano de garantia oficial Apple',
    finishes: [
      {
        name: 'Titânio Laranja',
        bodyColor: '#C7652A',
        frameColor: '#E38347',
        lensRing: '#8E441A',
        swatch: '#D97336',
      },
      {
        name: 'Titânio Preto',
        bodyColor: '#1E1F22',
        frameColor: '#3D3F46',
        lensRing: '#50535C',
        swatch: '#26272B',
      },
    ],
    highlights: [
      'Aparelho novo lacrado na caixa com procedência verificada',
      'Tela gigante de alta fidelidade e câmeras profissionais',
      'Configuração e transferência de dados feita na loja',
    ],
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    series: 'Linha Pro',
    condition: 'Lacrado',
    category: ['lacrados'],
    price: 'Sob Consulta',
    installmentHint: 'Pronta entrega em Maricá · Até 18x',
    storages: ['256GB', '512GB'],
    img: '/AISelect_20260508_121612_WhatsApp.jpg',
    cameraLayout: 'triple-pro',
    warranty: '1 ano de garantia oficial Apple',
    finishes: [
      {
        name: 'Titânio Deserto',
        bodyColor: '#C4A88B',
        frameColor: '#DFC7AE',
        lensRing: '#9E8266',
        swatch: '#C9AD8F',
      },
      {
        name: 'Titânio Natural',
        bodyColor: '#9C9891',
        frameColor: '#BEB9B1',
        lensRing: '#78746E',
        swatch: '#A4A099',
      },
    ],
    highlights: [
      'Câmera Fusion de 48MP com controle dedicado de captura',
      'Chip A18 Pro e bateria otimizada para uso intenso',
      'Retirada imediata na loja física ou entrega segura',
    ],
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    series: 'Seminovos Selecionados',
    condition: 'Semi Novo',
    category: ['seminovos'],
    price: 'Sob Consulta',
    installmentHint: 'Saúde de bateria revisada · Garantia Power Tec',
    storages: ['128GB', '256GB'],
    cameraLayout: 'triple-pro',
    warranty: 'Garantia documentada Power Tec + laudo de revisão',
    finishes: [
      {
        name: 'Titânio Azul',
        bodyColor: '#2B3442',
        frameColor: '#485569',
        lensRing: '#5A6980',
        swatch: '#344052',
      },
      {
        name: 'Titânio Natural',
        bodyColor: '#9C9891',
        frameColor: '#BEB9B1',
        lensRing: '#78746E',
        swatch: '#A4A099',
      },
    ],
    highlights: [
      'Acabamento em Titânio com botão de Ação e porta USB-C',
      'Revisado em 32 pontos no laboratório próprio Power Tec',
      'Excelente custo-benefício com cara e desempenho de novo',
    ],
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    series: 'Seminovos Selecionados',
    condition: 'Semi Novo',
    category: ['seminovos'],
    price: 'R$ 2.590',
    installmentHint: 'À vista no PIX ou parcelado em até 18x',
    storages: ['128GB', '256GB'],
    img: '/Screenshot_20260508_121257_Instagram.jpg',
    cameraLayout: 'dual',
    warranty: 'Garantia documentada Power Tec',
    finishes: [
      {
        name: 'Meia-Noite',
        bodyColor: '#1E2430',
        frameColor: '#364054',
        lensRing: '#495670',
        swatch: '#232B3B',
      },
      {
        name: 'Estelar',
        bodyColor: '#E2E0DA',
        frameColor: '#F3F2EE',
        lensRing: '#C2C0B8',
        swatch: '#E5E3DD',
      },
    ],
    highlights: [
      'Aparelho seminovo selecionado, sem marcas de uso',
      'Face ID, câmeras e bateria 100% testados em bancada',
      'Acompanha película e transferência de dados na hora',
    ],
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    series: 'Seminovos Selecionados',
    condition: 'Semi Novo',
    category: ['seminovos'],
    price: 'R$ 2.190',
    installmentHint: 'À vista no PIX ou parcelado em até 18x',
    storages: ['128GB', '256GB'],
    img: '/Screenshot_20260508_121352_Instagram.jpg',
    cameraLayout: 'dual',
    warranty: 'Garantia documentada Power Tec',
    finishes: [
      {
        name: 'Estelar',
        bodyColor: '#E2E0DA',
        frameColor: '#F3F2EE',
        lensRing: '#C2C0B8',
        swatch: '#E5E3DD',
      },
      {
        name: 'Meia-Noite',
        bodyColor: '#1E2430',
        frameColor: '#364054',
        lensRing: '#495670',
        swatch: '#232B3B',
      },
    ],
    highlights: [
      'O campeão de vendas pelo equilíbrio entre preço e potência',
      'Câmera dupla com Modo Cinema e chip A15 Bionic',
      'Pronta entrega com garantia real em Maricá',
    ],
  },
];

export const CLIENT_PHOTOS = [
  '/AISelect_20260508_124523_Instagram.jpg',
  '/AISelect_20260508_124508_Instagram.jpg',
  '/AISelect_20260508_124455_Instagram.jpg',
  '/AISelect_20260508_124447_Instagram.jpg',
  '/AISelect_20260508_124438_Instagram.jpg',
  '/AISelect_20260508_122234_Instagram.jpg',
  '/AISelect_20260508_122212_Instagram.jpg',
  '/AISelect_20260508_122157_Instagram.jpg',
  '/AISelect_20260508_122139_Instagram.jpg',
];

export const FAQ_ITEMS = [
  {
    q: 'Os iPhones possuem garantia?',
    a: 'Sim. Todos os aparelhos lacrados contam com 1 ano de garantia oficial Apple, e todos os seminovos selecionados passam por revisão de 32 pontos e saem com garantia documentada da Power Tec.',
  },
  {
    q: 'Vocês aceitam meu iPhone usado como parte do pagamento?',
    a: 'Sim! Avaliamos seu iPhone usado na hora pelo WhatsApp ou presencialmente na nossa loja em Maricá para abater diretamente no valor do seu novo aparelho.',
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Aceitamos PIX com condição especial à vista, cartão de crédito em até 18x e pagamento combinado (entrada no PIX ou aparelho usado + restante no cartão).',
  },
  {
    q: 'Vocês fazem a transferência de todos os meus dados?',
    a: 'Sim. Fazemos a migração completa de fotos, contatos, WhatsApp e aplicativos com segurança total enquanto você toma um café na nossa loja.',
  },
];
