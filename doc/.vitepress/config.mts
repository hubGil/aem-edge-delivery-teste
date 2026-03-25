export default {
  lang: 'pt-BR',
  title: 'AEM - Edge Delivery Service',
  description: 'Documentacao para iniciar um projeto com AEM Edge Delivery',
  base: '/aem-edge-delivery-teste/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introducao', link: '/introduction' },
      { text: 'Exemplos', link: '/api-examples' },
    ],
    sidebar: [
      {
        text: 'Introducao',
        collapsed: false,
        items: [
          {
            text: 'O que e Adobe Edge Delivery Service',
            link: '/introduction#o-que-e-adobe-edge-delivery-service',
          },
          { text: 'Pre-requisitos', link: '/introduction#pre-requesitos' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hubGil/aem-edge-delivery-teste' },
    ],
    editLink: {
      pattern: 'https://github.com/hubGil/aem-edge-delivery-teste/edit/main/doc/:path',
      text: 'Editar esta pagina no GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2026 Gil Santana',
    },
  },
};
