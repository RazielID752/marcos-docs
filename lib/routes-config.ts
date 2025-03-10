// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  // {
  //   title: "Getting Started",
  //   href: "/getting-started",
  //   noLink: true,
  //   items: [
  //     { title: "Introduction", href: "/introduction" },
  //     {
  //       title: "Installation",
  //       href: "/installation",
  //     },
  //     { title: "Quick Start Guide", href: "/quick-start-guide" },
  //     {
  //       title: "Project Structure",
  //       href: "/project-structure",
  //     },
  //     {
  //       title: "Components",
  //       href: "/components",
  //       items: [
  //         { title: "Stepper", href: "/stepper" },
  //         { title: "Tabs", href: "/tabs" },
  //         { title: "Note", href: "/note" },
  //         { title: "Code Block", href: "/code-block" },
  //         { title: "Image & Link", href: "/image-link" },
  //         { title: "Custom", href: "/custom" },
  //       ],
  //     },
  //     { title: "Themes", href: "/themes" },
  //     {
  //       title: "Customize",
  //       href: "/customize",
  //     },
  //   ],
  // },
  {
    title: "Front-End",
    href: "/front-end",
    noLink: true,
    items: [
      {
        title: "In tecnologia da informação",
        href: "/tecnologia",
        items: [
          { title: "Hadware vs Software", href: "/hadware-vs-software" },
          { title: "O que é software", href: "/o-que-e-software" },
          { title: "Redes", href: "/redes" },
          { title: "Area de trabalho", href: "/area-de-trabalho" },
          { title: "Manipular Pastas e Arquivos", href: "/manipular-pasta-so" },
          { title: "Aspectos éticos e Legais", href: "/aspectos-legais-websites" },
          { title: "Introducão a gestão de projeto", href: "/introducao-a-gestao-de-projeto" },
          { title: "Requisitos para dev site", href: "/requisitos-para-dev-site" },
          { title: "O que é Git?", href: "/o-que-e-git" },
          { title: "O que é Docker?", href: "/o-que-e-docker" },
        ],
      },
      {
        title: "lógica de programação",
        href: "/logica-de-programacao",
        items: [
          { title: "Diagramas", href: "/diagramas" },
          { title: "Pseudocódigo", href: "/pseudocodigo" },
          { title: "lógica de programação", href: "/logica-de-progamacao" },
          { title: "Operadores", href: "/operadores" },
          { title: "Linguagem C", href: "/linguagem-c" },
          { title: "O que é lógicas e aritméticas?", href: "/logica-aritimetica" },
          { title: "O que é abstração lógica?", href: "/abstracao-logica" },
          { title: "O que é álgebra Booleana?", href: "/algebra-booleana" },
          { title: "Tipo de dados", href: "/tipo-de-dados" },
          { title: "Estruturas de controle e repetição", href: "/estutura-de-controle" },
          { title: "Estruturas de dados heterogêneas", href: "/estrutura-de-dados" },
          { title: "Ferramentas para elaboração de algoritmos", href: "/ferramentas-algoritmos" },
          { title: "Estruturas de dados homogêneas (vetores, matrizes);", href: "/estrutura-de-homogeneas" },
          { title: "Funções, procedimentos, métodos, teste de mesa", href: "/funcoes-procedimentos" },
          { title: "Estruturas de dados", href: "/estruturas-de-dados" },
        ],
      },
      {
        title: "FrontEnd Essencial",
        href: "/frontend-essencial",
        items: [
          { title: "O que é HTML", href: "/o-que-e-html" },
          { title: "Formato do HTML", href: "/formato-do-html" },
          { title: "Tags do HTML", href: "/tags-html" },
        ],
      },
      {
        title: "Desenvolvimento Web",
        href: "/desenvolvedor-web",
        items: [
          { title: "Introdução ao JavaScript", href: "/Introdu-javascript" },
          { title: "Javascript, comandos metodos e funções", href: "/comandos-javascript" },
          { title: "Projetos simples com javascript", href: "/projetos-simples" },
        ],
      },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
