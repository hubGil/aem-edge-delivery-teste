export default {
  lang: 'pt-BR',
  title: 'AEM Edge Delivery',
  description: 'Documentacao tecnica do projeto AEM Edge Delivery',
  base: '/aem-edge-delivery-teste/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Início', link: '/pt/' },
      { text: 'PT', link: '/pt/' },
      { text: 'EN', link: '/en/' },
    ],
    sidebar: {
      '/pt/': [
        {
          text: 'Visão Geral',
          collapsed: false,
          items: [
            { text: 'Início', link: '/pt/' },
            { text: 'Como instalar', link: '/pt/instalacao' },
            { text: 'Configuração do Adobe DA', link: '/pt/configuracao-da' },
            { text: 'Arquitetura do projeto', link: '/pt/arquitetura' },
            { text: 'paths.json e autoria', link: '/pt/paths-e-autoria' },
          ],
        },
        {
          text: 'Blocks',
          collapsed: false,
          items: [
            { text: 'Visão geral dos blocks', link: '/pt/blocks/visao-geral' },
            { text: 'Matriz dos blocks', link: '/pt/blocks/matriz' },
            { text: 'Accordion', link: '/pt/blocks/accordion' },
            { text: 'Bracket', link: '/pt/blocks/bracket' },
            { text: 'Cards', link: '/pt/blocks/cards' },
            { text: 'Carousel', link: '/pt/blocks/carousel' },
            { text: 'Columns', link: '/pt/blocks/columns' },
            { text: 'Fragment', link: '/pt/blocks/fragment' },
            { text: 'Header e Footer', link: '/pt/blocks/header-footer' },
            { text: 'Hero e Title', link: '/pt/blocks/hero-title' },
            { text: 'Standings', link: '/pt/blocks/standings' },
            { text: 'Video', link: '/pt/blocks/video' },
          ],
        },
      ],
      '/en/': [
        {
          text: 'English',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/en/' },
            { text: 'Work in progress', link: '/en/work-in-progress' },
          ],
        },
      ],
    },
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
