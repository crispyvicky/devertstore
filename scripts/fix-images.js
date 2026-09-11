const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "src", "storefront");
const files = fs.readdirSync(dir).filter((f) => /\.(jsx|js)$/.test(f));

for (const f of files) {
  const full = path.join(dir, f);
  let t = fs.readFileSync(full, "utf8");
  const before = t;

  t = t.replace(
    /import\s+(\w+)\s+from\s+["']\.\/([^"']+\.(?:jpg|jpeg|png|webp))["'];?/g,
    (_m, name, file) => `const ${name} = "/storefront/${file}";`
  );

  // Ensure mediaUrl helper on RevealImage / img tags that still use objects
  if (!t.includes('from "./media"') && !t.includes("from './media'")) {
    if (t.includes("<img") || t.includes("backgroundImage: `url(\"${project.img}\")`") || t.includes("RevealImage")) {
      // add import after use client
      if (t.startsWith('"use client"')) {
        t = t.replace(
          '"use client";',
          '"use client";\n\nimport { mediaUrl } from "./media";'
        );
      }
    }
  }

  t = t.replace(/src=\{src\}/g, "src={mediaUrl(src)}");
  t = t.replace(/src=\{project\.img\}/g, "src={mediaUrl(project.img)}");
  t = t.replace(
    /backgroundImage:\s*`url\("\$\{project\.img\}"\)`/g,
    'backgroundImage: `url("${mediaUrl(project.img)}")`'
  );
  t = t.replace(
    /image=\{project\.img\}/g,
    "image={mediaUrl(project.img)}"
  );

  if (t !== before) {
    fs.writeFileSync(full, t);
    console.log("patched", f);
  }
}

// CartUI
const cart = path.join(dir, "CartUI.jsx");
let c = fs.readFileSync(cart, "utf8");
if (!c.includes("./media")) {
  c = c.replace(
    '"use client";',
    '"use client";\n\nimport { mediaUrl } from "./media";'
  );
}
c = c.replace(
  /url\("\$\{item\.image\}"\)/g,
  'url("${mediaUrl(item.image)}")'
);
fs.writeFileSync(cart, c);
console.log("patched CartUI.jsx");
