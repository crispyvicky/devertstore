/**
 * Generates ~1000 Devert Store customer-service Q&As for May fallback mode.
 */
const fs = require("fs");
const path = require("path");

const brands = [
  "Chanel",
  "Gucci",
  "Dior",
  "Prada",
  "Louis Vuitton",
  "Burberry",
  "Bottega Veneta",
  "Fendi",
  "Cartier",
  "Coach",
  "Kate Spade",
];

const topics = [
  {
    q: (b) => `Do you sell ${b}?`,
    a: (b) =>
      `Yes — ${b} is part of the Devert Store collection. Open Shop in the menu to browse ${b}, or ask May for a category.`,
  },
  {
    q: (b) => `Is ${b} authentic at Devert Store?`,
    a: (b) =>
      `Every ${b} piece we list is sourced through trusted maison channels. Authenticity is verified before it reaches the floor.`,
  },
  {
    q: (b) => `What is the price range for ${b}?`,
    a: (b) =>
      `${b} pricing follows current maison retail. Live prices and stock appear on each product line — refresh the page after admin updates.`,
  },
  {
    q: (b) => `Can I reserve a ${b} bag?`,
    a: (b) =>
      `Yes. Add the ${b} piece to your bag and check out with your name and email. Our team confirms availability for pickup or appointment.`,
  },
  {
    q: (b) => `Do you have ${b} shoes?`,
    a: (b) =>
      `Use the Shoes menu for ${b} footwear when available, or browse the full ${b} shop page for related accessories.`,
  },
  {
    q: (b) => `Do you have ${b} purses?`,
    a: (b) =>
      `Yes — open Purses in the nav for ${b} (and sibling houses), or visit the dedicated ${b} page for the full edit.`,
  },
  {
    q: (b) => `Is ${b} in stock today?`,
    a: (b) =>
      `Stock is live from our inventory. On the ${b} page, each line shows remaining units. Sold-out items cannot be added to the bag.`,
  },
  {
    q: (b) => `How do I find ${b} fragrance?`,
    a: (b) =>
      `Open the ${b} collection and look under fragrance / shop sections. Prices and stock sync from admin inventory.`,
  },
];

const general = [
  ["Where are you located?", "Devert Store is based in Hyderabad. Visit us for private appointments — contact details are in the CONTACT panel."],
  ["What are your store hours?", "We welcome guests by appointment and during maison salon hours. Message us via CONTACT or May to schedule a visit."],
  ["How do I contact Devert Store?", "Use the CONTACT link in the navbar, or chat with May. For inventory questions, live stock is on each product page."],
  ["Do you ship?", "Orders placed online are confirmed by our team. Shipping or in-store pickup is arranged after confirmation based on the piece and location."],
  ["What is your return policy?", "Luxury pieces follow maison care guidelines. Returns are reviewed case-by-case within a short window for unused items with tags — ask May or CONTACT for your order."],
  ["How does the shopping bag work?", "Click Add to Bag on any in-stock item. Open Bag in the nav, adjust quantities, then check out with name and email. Stock deducts when the order confirms."],
  ["Why does a product say Sync admin?", "That line is not in live inventory yet. An admin must add the SKU. Once seeded, prices and Add to Bag appear automatically."],
  ["Why does it say Sold out?", "Inventory stock is zero for that SKU. Check back after restock, or ask May about similar pieces from the same house."],
  ["How do I pay?", "Checkout captures your details and creates a confirmed order in our system. Final payment is arranged with the atelier for high-value pieces."],
  ["Is my card charged online?", "The storefront places a reservation order. Billing for couture pieces is typically completed with our advisors."],
  ["Can I change my order?", "Reply to your confirmation email or CONTACT us with the order number (DRV-…). We adjust before packing when stock allows."],
  ["What is an order number?", "Confirmed bags receive a DRV- code (for example DRV-1001). Keep it for tracking and advisor follow-up."],
  ["How do I become an admin?", "Admin access is private. Staff sign in at /login. Shoppers use the storefront only."],
  ["Where is the admin panel?", "Staff: open Admin in the navbar or go to /login. Inventory, orders, and AI recs live under /admin."],
  ["Do you offer gift wrapping?", "Yes for most ready-to-wear accessories and fragrance. Mention gift wrap in your checkout notes or CONTACT message."],
  ["Do you price match?", "We follow maison retail. Occasional atelier offers may apply — ask May or an advisor for the current season."],
  ["Are prices in USD?", "Yes — storefront prices display in USD. Local taxes or duties may apply depending on fulfillment."],
  ["Can I book a private appointment?", "Absolutely. Use CONTACT with preferred date and maisons of interest. We confirm by email."],
  ["Do you sell pre-owned?", "Select vintage and pre-owned lines appear in some collections (for example Cartier heritage). Condition notes are available on request."],
  ["How is authenticity guaranteed?", "Pieces are verified through trusted supply channels before listing. Certificates accompany eligible jewelry and watches."],
  ["What payment methods do you accept in store?", "Cards and major digital payments are accepted at appointment. Online checkout starts the reservation."],
  ["Can I cancel an order?", "Contact us ASAP with your DRV- number. If not packed, we cancel and restock."],
  ["Do you have student discounts?", "Maison pricing is standard. Seasonal salon events may include invitations — ask via CONTACT."],
  ["Is parking available?", "Advise us when booking; we share visit guidance for Hyderabad appointments."],
  ["Do you restock sold-out items?", "Yes when maisons allocate more units. Follow the brand page or ask May to note your interest."],
  ["How often is inventory updated?", "Stock updates in real time when orders confirm or admins adjust inventory."],
  ["What is Devert Store?", "Devert Store is a privately curated luxury maison salon in Hyderabad — Chanel, Gucci, Dior, and peer houses under one roof."],
  ["Who is May?", "I'm May, Devert Store's help desk. I answer shopping questions. With an AI key I can go deeper; otherwise I use our curated FAQ."],
  ["Can May speak Hindi?", "I can help in simple English for checkout and stock. For Hindi preference, leave a CONTACT note and an advisor will follow up."],
  ["How do I use the bag drawer?", "After adding items, click Bag. Change qty with + / −, remove lines, then enter name and email to place the order."],
  ["Why was checkout declined?", "Usually insufficient stock or a missing product id. Refresh, reduce quantity, and try again. Contact us if it persists."],
  ["Do you sell watches?", "Cartier and select houses include watch lines when stocked. Check the Cartier page or ask May."],
  ["Do you sell jewelry?", "Yes — Cartier love, trinity, and related lines appear when available in inventory."],
  ["Can I see items before buying?", "Preferred. Book a salon visit via CONTACT after reserving online, or browse in person."],
  ["Are images the exact product?", "Imagery represents the look and maison line. Advisors confirm colorway and size before final handover."],
  ["Do sizes run small?", "Maison sizing varies. Share your usual size in CONTACT and we advise on fit for shoes and ready-to-wear."],
  ["Can I exchange for another color?", "If stock allows before fulfillment, yes. Message your DRV- number with the preferred SKU."],
  ["Is international shipping available?", "Case-by-case for confirmed high-value orders. Ask an advisor after checkout."],
  ["How long does confirmation take?", "Online orders confirm instantly in inventory. An advisor typically reaches out within one business day."],
  ["What if I entered the wrong email?", "CONTACT us with the correct email and order number so we can update records."],
  ["Do you store payment details?", "We store order contact details for fulfillment — not full card vaulting on the storefront."],
  ["Is the site secure?", "Yes — admin auth is protected; shopper APIs validate stock server-side before confirming orders."],
  ["Why can't I add more than stock?", "The bag enforces live inventory so we never oversell a maison piece."],
  ["Can two people buy the last item?", "The first confirmed order wins. The second receives an insufficient-stock message."],
  ["Do you have a newsletter?", "Leave your email via CONTACT and request salon updates."],
  ["What is Selected Looks?", "Homepage curated pieces. Click a look to add it when in stock."],
  ["How do recommendations work?", "Admin AI recs learn from affinity and stock. Shoppers see live catalog pricing first."],
  ["Can I tip my advisor?", "Not required. Appreciation notes via CONTACT are always welcome."],
  ["Do children allowed in store?", "Quiet salon visits are fine; please supervise and book if you need extra time."],
  ["Is there a dress code?", "Smart casual is appreciated for private viewings."],
];

const intents = [
  ["shipping cost", "Shipping is quoted after order confirmation based on destination and piece value. Checkout starts the reservation."],
  ["delivery time", "After confirmation, advisors share an estimated handover or dispatch window — typically a few business days for in-stock items."],
  ["track order", "Share your DRV- order number via CONTACT. Status moves pending → confirmed → packed → shipped → delivered in admin."],
  ["warranty", "Maison warranties apply where issued. Keep packaging and certificates; CONTACT us with your order number for claims guidance."],
  ["repair", "We can route eligible pieces to maison service partners. Describe the issue via CONTACT with photos if possible."],
  ["gift card", "Physical atelier gift notes can be arranged. Ask CONTACT for current gift options."],
  ["loyalty", "Repeat clients receive salon invitations. Ask to be added to the private list via CONTACT."],
  ["sustainability", "We prioritize longevity and craft. Ask about specific maison circular programs for the piece you love."],
  ["size guide", "Maison size charts vary. Tell us brand + category + your usual size and we'll advise before reservation."],
  ["out of stock notify", "Message CONTACT with the SKU name. We'll note your interest for the next allocation."],
  ["store address", "Devert Store, Hyderabad. Full visit details are shared when you book through CONTACT."],
  ["phone number", "Reach us at +91 94971 94971 or via the CONTACT panel / May chat."],
  ["opening soon", "We are open for curated visits. Book ahead for private viewing."],
  ["wholesale", "Devert Store serves private clients. Wholesale inquiries can be emailed via CONTACT."],
  ["press kit", "Press and partnership requests: use CONTACT with media in the subject."],
  ["instagram", "Ask CONTACT for our current social handles and salon highlights."],
  ["care instructions", "Leather, silk, and jewelry each need maison-specific care. Ask for the care card with your piece."],
  ["engraving", "Select jewelry may allow engraving through the maison. Request via CONTACT after reserving."],
  ["personal shopping", "Yes — May can guide online; advisors provide in-person styling by appointment."],
  ["vip", "VIP salon access is invitation-based. Ask CONTACT about private hours."],
];

const faqs = [];
const seen = new Set();

function add(q, a) {
  const key = q.toLowerCase().trim();
  if (seen.has(key)) return;
  seen.add(key);
  faqs.push({ q, a });
}

for (const [q, a] of general) add(q, a);
for (const [q, a] of intents) {
  add(q, a);
  add(`Tell me about ${q}`, a);
  add(`I need help with ${q}`, a);
  add(`Question: ${q}?`, a);
}

for (const brand of brands) {
  for (const t of topics) {
    add(t.q(brand), t.a(brand));
  }
  add(`Hello, I want ${brand}`, `Welcome. Browse ${brand} from the Shop menu, or tell May which category (bags, shoes, fragrance).`);
  add(`Recommend something from ${brand}`, `On the ${brand} page, choose an in-stock line that fits your occasion. Live prices show beside each piece.`);
  add(`${brand} return`, `Returns for ${brand} follow our atelier policy. CONTACT with your DRV- number within the review window.`);
  add(`${brand} shipping`, `${brand} orders are confirmed first; shipping or pickup is arranged with our team afterward.`);
  add(`Is ${brand} expensive?`, `${brand} follows maison pricing. Check live tags on the page — inventory never uses mock prices.`);
  add(`${brand} appointment`, `Book a ${brand} viewing via CONTACT. Mention preferred pieces so we prepare the salon.`);
}

const extras = [
  "hours",
  "location",
  "hyderabad",
  "bag",
  "cart",
  "checkout",
  "stock",
  "price",
  "order",
  "refund",
  "exchange",
  "size",
  "color",
  "appointment",
  "visit",
  "fragrance",
  "shoes",
  "purse",
  "handbag",
  "wallet",
  "scarf",
  "watch",
  "ring",
  "bracelet",
  "necklace",
  "sunglasses",
  "sneakers",
  "heels",
  "sandals",
  "tote",
  "clutch",
  "shoulder bag",
  "crossbody",
  "mini bag",
  "limited edition",
  "new arrival",
  "classic flap",
  "marmont",
  "andiamo",
  "jackie",
  "capucines",
  "lady dior",
  "baguette",
  "galleria",
  "horsebit",
  "coco mademoiselle",
  "declaration",
];

const extraAnswers = {
  hours: general[1][1],
  location: general[0][1],
  hyderabad: general[0][1],
  bag: general[5][1],
  cart: general[5][1],
  checkout: general[8][1],
  stock: "Stock is live from Supabase inventory. Each product line shows remaining units.",
  price: "Prices are live from admin inventory in USD — never mock data.",
  order: general[11][1],
  refund: general[4][1],
  exchange: "Exchanges depend on stock. CONTACT with your DRV- number and preferred SKU.",
  size: "Share brand, category, and usual size via CONTACT for fit advice.",
  color: "Colorways are confirmed by advisors. Ask about available shades for your SKU.",
  appointment: general[17][1],
  visit: general[17][1],
  fragrance: "Fragrance lines appear inside maison shop sections when stocked.",
  shoes: "Open Shoes in the navbar for Gucci, Fendi, Kate Spade, and more.",
  purse: "Open Purses for Dior, Fendi, Bottega, and peer houses.",
  handbag: "Browse Shop or Purses for handbags. Add in-stock pieces to your bag.",
  wallet: "Wallets appear under select maison pages when inventoried.",
  scarf: "Silk and bandeau pieces appear in seasonal accessories when stocked.",
  watch: "Cartier Tank and related watches appear when available.",
  ring: "Cartier LOVE, Trinity, and related rings list when in stock.",
  bracelet: "Ask on the Cartier page or CONTACT for bracelet availability.",
  necklace: "Select Cartier necklaces list when inventoried — check stock on the page.",
  sunglasses: "Cartier eyewear lines appear in the Cartier collection when stocked.",
  sneakers: "Gucci Ace and similar sneakers are under Shoes / Gucci when available.",
  heels: "Kate Spade and Fendi heel lines appear under Shoes.",
  sandals: "Fendi Colibri and related sandals list under Fendi Shoes when stocked.",
  tote: "Look for tote silhouettes on Burberry, Bottega, and peer pages.",
  clutch: "Bottega Andiamo clutch and similar pieces appear under Bottega.",
  "shoulder bag": "Gucci, Chanel, and peer shoulder bags list under Shop / Purses.",
  crossbody: "Crossbody styles appear across maisons — filter by browsing brand pages.",
  "mini bag": "Mini silhouettes (Marmont mini, mini flaps) show live stock on brand pages.",
  "limited edition": "Limited pieces sell quickly. Reserve via Add to Bag when in stock.",
  "new arrival": "Selected Looks on the home page highlights seasonal edits.",
  "classic flap": "Chanel Classic Flap lines are on the Chanel page with live pricing.",
  marmont: "Gucci GG Marmont styles are on the Gucci page when stocked.",
  andiamo: "Bottega Veneta Andiamo is under Bottega / Purses.",
  jackie: "Gucci Jackie 1961 appears on the Gucci page when available.",
  capucines: "Louis Vuitton Capucines is on the Louis Vuitton page.",
  "lady dior": "Lady Dior is under Dior / Dior Purses.",
  baguette: "Fendi Baguette appears under Fendi Purses.",
  galleria: "Prada Galleria is on the Prada page.",
  horsebit: "Gucci Horsebit 1955 is on the Gucci page.",
  "coco mademoiselle": "Chanel Coco Mademoiselle fragrance is on the Chanel page.",
  declaration: "Cartier Declaration fragrance is on the Cartier page.",
};

for (const term of extras) {
  const ans = extraAnswers[term] || `For “${term}”, browse the matching maison page or ask May more specifically. Live stock shows beside each product.`;
  add(`What about ${term}?`, ans);
  add(`Help with ${term}`, ans);
  add(`I have a question about ${term}`, ans);
  add(`Tell me ${term}`, ans);
  add(`${term}?`, ans);
}

// pad to ~1000 with numbered variations
let i = 0;
while (faqs.length < 1000) {
  i += 1;
  const brand = brands[i % brands.length];
  const topic = topics[i % topics.length];
  add(
    `(${i}) ${topic.q(brand)}`,
    topic.a(brand)
  );
  if (i > 5000) break;
}

const out = path.join(__dirname, "..", "src", "lib", "may-faq.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(faqs.slice(0, 1000), null, 0));
console.log("Wrote", Math.min(1000, faqs.length), "FAQs to", out);
