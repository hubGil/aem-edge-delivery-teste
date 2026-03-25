import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/aem-edge-delivery-teste/assets/image-1.DGxYuc3N.png";
const __pageData = JSON.parse('{"title":"Introdução","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"introduction.md","filePath":"introduction.md"}');
const _sfc_main = { name: "introduction.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="introducao" tabindex="-1">Introdução <a class="header-anchor" href="#introducao" aria-label="Permalink to &quot;Introdução&quot;">​</a></h1><p><a href="https://www.aem.live/developer/tutorial" target="_blank" rel="noreferrer"><img${ssrRenderAttr("src", _imports_0)} alt="iamgem do site da adobe"></a></p><p><strong>Nota:</strong> Você sempre pode seguir pela documentação oficial.</p><h2 id="o-que-e-adobe-edge-delivery-service" tabindex="-1">O que é Adobe Edge Delivery Service <a class="header-anchor" href="#o-que-e-adobe-edge-delivery-service" aria-label="Permalink to &quot;O que é Adobe Edge Delivery Service&quot;">​</a></h2><p>O Edge Delivery Service é uma estrutura moderna de entrega de conteúdo que recria como os sites são criados e entregues, otimizando a velocidade, a simplicidade e a escalabilidade. É uma parte essencial do Adobe Experience Manager e permite experiências digitais mais rápidas, aproximando a renderização e o delivery do usuário, na borda da rede ou seja o mais proximo possível do usuario final.</p><p>É importante ressaltar que não é uma substituição de uma CDN (Content Delivery Network), mas se integra perfeitamente à sua própria CDN.</p><h2 id="pre-requesitos" tabindex="-1">Pre-requesitos <a class="header-anchor" href="#pre-requesitos" aria-label="Permalink to &quot;Pre-requesitos&quot;">​</a></h2><p>O Adobe edge delivery é uma ferramenta que depende de alguns pre requisitos que ajudarão a compreender melhor a ferramenta.</p><ul><li>Ter uma conta no <a href="https://github.com/?locale=pt-BR" target="_blank" rel="noreferrer">Github</a></li><li>Ter conhecimentos sobre <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML" target="_blank" rel="noreferrer">HTML</a>, <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS" target="_blank" rel="noreferrer">CSS</a> e <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">Javascript</a></li><li>Ter uma versão do <a href="https://nodejs.org/pt-br" target="_blank" rel="noreferrer">Node/npm</a> instalada localmente</li><li>Ter configurado o <a href="https://github.com/apps/aem-code-sync" target="_blank" rel="noreferrer">Github Code Sync</a> no seu repositório, para isso acesse essa url: <a href="https://github.com/apps/aem-code-sync/installations/new" target="_blank" rel="noreferrer">https://github.com/apps/aem-code-sync/installations/new</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("introduction.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const introduction = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  introduction as default
};
