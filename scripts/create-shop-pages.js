const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "..", "src", "app", "(shop)");

const routes = [
  { route: "", component: "home", css: null, title: "Devert Store" },
  { route: "chanel", component: "chanel", css: "chanel.css", title: "Chanel | Devert Store" },
  { route: "gucci", component: "gucci", css: "gucci.css", title: "Gucci | Devert Store" },
  { route: "burberry", component: "burberry", css: "burberry.css", title: "Burberry | Devert Store" },
  { route: "bottega", component: "bottega", css: "bottega.css", title: "Bottega Veneta | Devert Store" },
  { route: "bottegapurses", component: "bottegapurses", css: "bottega.css", title: "Bottega Purses | Devert Store" },
  { route: "coach", component: "coach", css: "coach.css", title: "Coach | Devert Store" },
  { route: "dior", component: "dior", css: "dior.css", title: "Dior | Devert Store" },
  { route: "diorpurses", component: "diorpurses", css: "dior.css", title: "Dior Purses | Devert Store" },
  { route: "fendi", component: "fendi", css: "fendi.css", title: "Fendi | Devert Store" },
  { route: "fendipurses", component: "fendipurses", css: "fendi.css", title: "Fendi Purses | Devert Store" },
  { route: "fendishoes", component: "fendishoes", css: "fendi.css", title: "Fendi Shoes | Devert Store" },
  { route: "guccishoes", component: "guccishoes", css: "guccishoes.css", title: "Gucci Shoes | Devert Store" },
  { route: "katespade", component: "katespade", css: "katespade.css", title: "Kate Spade | Devert Store" },
  { route: "katespadeshoes", component: "katespadeshoes", css: "katespadeshoes.css", title: "Kate Spade Shoes | Devert Store" },
  { route: "louis", component: "louis", css: "style.css", title: "Louis Vuitton | Devert Store" },
  { route: "prada", component: "prada", css: "prada.css", title: "Prada | Devert Store" },
];

// Check which component export names exist by reading first export default
function pageContent(r) {
  const cssImport = r.css
    ? `import "@/storefront/styles/${r.css}";\n`
    : `import "@/storefront/home-landing.css";\n`;
  return `"use client";

${cssImport}import App from "@/storefront/${r.component}";

export default function Page() {
  return <App />;
}
`;
}

for (const r of routes) {
  const dir = r.route ? path.join(appDir, r.route) : appDir;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.jsx"), pageContent(r));
  console.log("wrote", r.route || "/");
}

console.log("routes", routes.length);
