import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Live inventory — source of truth for storefront prices & stock (synced from storefront catalog) */
const products = [
  {
    "name": "Andiamo Soft Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-ANDIAMO-SOFT-CLUTCH-001",
    "price": 3800,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Pocket Mini Tote",
    "brand": "Burberry",
    "sku": "BUR-POCKET-MINI-TOTE-002",
    "price": 1690,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Her Eau de Parfum",
    "brand": "Burberry",
    "sku": "BUR-HER-EAU-DE-PARFUM-003",
    "price": 168,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Classic Evening Look",
    "brand": "Chanel",
    "sku": "CHA-CLASSIC-EVENING-LOOK-004",
    "price": 11300,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Capucines MM",
    "brand": "Louis Vuitton",
    "sku": "LOU-CAPUCINES-MM-005",
    "price": 6800,
    "stock": 13,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Declaration Eau de Toilette",
    "brand": "Cartier",
    "sku": "CAR-DECLARATION-EAU-DE-TOILETTE-006",
    "price": 134,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Colorblock Pump",
    "brand": "Kate Spade",
    "sku": "KAT-COLORBLOCK-PUMP-007",
    "price": 178,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Coco Mademoiselle",
    "brand": "Chanel",
    "sku": "CHA-COCO-MADEMOISELLE-008",
    "price": 172,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Colibri Lite Sandal",
    "brand": "Fendi",
    "sku": "FEN-COLIBRI-LITE-SANDAL-009",
    "price": 950,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Rosso Ancora Jacket",
    "brand": "Gucci",
    "sku": "GUC-ROSSO-ANCORA-JACKET-010",
    "price": 2300,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne Look",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-LOOK-011",
    "price": 4200,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Re-Nylon Tailoring",
    "brand": "Prada",
    "sku": "PRA-RE-NYLON-TAILORING-012",
    "price": 2450,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Andiamo with Handle",
    "brand": "Bottega Veneta",
    "sku": "BOT-LARGE-ANDIAMO-WITH-HANDLE-013",
    "price": 8000,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Andiamo",
    "brand": "Bottega Veneta",
    "sku": "BOT-MEDIUM-ANDIAMO-014",
    "price": 5100,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Andiamo",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-ANDIAMO-015",
    "price": 4100,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Andiamo Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-ANDIAMO-CLUTCH-016",
    "price": 2650,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Andiamo Long Shoulder Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-ANDIAMO-LONG-SHOULDER-BAG-017",
    "price": 4500,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Andiamo Long",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-ANDIAMO-LONG-018",
    "price": 3900,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bottega Veneta Women's Intrecciato Lambskin Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-BOTTEGA-VENETA-WOMEN-S-INTRE-019",
    "price": 3600,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bottega Veneta The Pouch Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-BOTTEGA-VENETA-THE-POUCH-CLU-020",
    "price": 906.99,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "BOTTEGA VENETA Lauren 1980 Intrecciato Lambskin Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-BOTTEGA-VENETA-LAUREN-1980-I-021",
    "price": 3800,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Cabat",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-CABAT-022",
    "price": 4900,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Wallace",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-WALLACE-023",
    "price": 2200,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bottega Veneta Sardine Mini Leather Shoulder Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-BOTTEGA-VENETA-SARDINE-MINI--024",
    "price": 3600,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "BOTTEGA VENETA Mini Hop Shoulder Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-BOTTEGA-VENETA-MINI-HOP-SHOU-025",
    "price": 3400,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Parco Palladiano XV 100ml",
    "brand": "Bottega Veneta",
    "sku": "BOT-PARCO-PALLADIANO-XV-100ML-026",
    "price": 330,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Illusione for Her 75ml",
    "brand": "Bottega Veneta",
    "sku": "BOT-ILLUSIONE-FOR-HER-75ML-027",
    "price": 165,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knot Eau de Parfum 75ml",
    "brand": "Bottega Veneta",
    "sku": "BOT-KNOT-EAU-DE-PARFUM-75ML-028",
    "price": 175,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knot glossed-leather pumps",
    "brand": "Bottega Veneta",
    "sku": "BOT-KNOT-GLOSSED-LEATHER-PUMPS-029",
    "price": 1990,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sofia intrecciato leather",
    "brand": "Bottega Veneta",
    "sku": "BOT-SOFIA-INTRECCIATO-LEATHER-030",
    "price": 1890,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Canalazzo intrecciato leather pumps",
    "brand": "Bottega Veneta",
    "sku": "BOT-CANALAZZO-INTRECCIATO-LEATHE-031",
    "price": 2600,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Canalazzo striped intrecciato leather pumps",
    "brand": "Bottega Veneta",
    "sku": "BOT-CANALAZZO-STRIPED-INTRECCIAT-032",
    "price": 3900,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Drop Earrings (Small)",
    "brand": "Bottega Veneta",
    "sku": "BOT-DROP-EARRINGS-SMALL-033",
    "price": 820,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fin Ring in Silver",
    "brand": "Bottega Veneta",
    "sku": "BOT-FIN-RING-IN-SILVER-034",
    "price": 650,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Leather Trench Coat",
    "brand": "Bottega Veneta",
    "sku": "BOT-LEATHER-TRENCH-COAT-035",
    "price": 9800,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Oversized Wool Sweater",
    "brand": "Bottega Veneta",
    "sku": "BOT-OVERSIZED-WOOL-SWEATER-036",
    "price": 1450,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Puddle Boots",
    "brand": "Bottega Veneta",
    "sku": "BOT-PUDDLE-BOOTS-037",
    "price": 650,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Atomic Pump",
    "brand": "Bottega Veneta",
    "sku": "BOT-ATOMIC-PUMP-038",
    "price": 1100,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Haddock Boat Shoe",
    "brand": "Bottega Veneta",
    "sku": "BOT-HADDOCK-BOAT-SHOE-039",
    "price": 950,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lug Boot",
    "brand": "Bottega Veneta",
    "sku": "BOT-LUG-BOOT-040",
    "price": 1450,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bee Knee-High Boot",
    "brand": "Bottega Veneta",
    "sku": "BOT-BEE-KNEE-HIGH-BOOT-041",
    "price": 1650,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jack Flat Sandal",
    "brand": "Bottega Veneta",
    "sku": "BOT-JACK-FLAT-SANDAL-042",
    "price": 850,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Stretch Mule",
    "brand": "Bottega Veneta",
    "sku": "BOT-STRETCH-MULE-043",
    "price": 1050,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Ginger Sandal",
    "brand": "Bottega Veneta",
    "sku": "BOT-GINGER-SANDAL-044",
    "price": 950,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Punta Mule",
    "brand": "Bottega Veneta",
    "sku": "BOT-PUNTA-MULE-045",
    "price": 1150,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Intrecciato Duffel Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-INTRECCIATO-DUFFEL-BAG-046",
    "price": 5200,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Hop Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-LARGE-HOP-BAG-047",
    "price": 4400,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cassette Messenger",
    "brand": "Bottega Veneta",
    "sku": "BOT-CASSETTE-MESSENGER-048",
    "price": 2800,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Intrecciato Backpack",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-INTRECCIATO-BACKPACK-049",
    "price": 3500,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jet Set Suitcase",
    "brand": "Bottega Veneta",
    "sku": "BOT-JET-SET-SUITCASE-050",
    "price": 6500,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Belt Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-BELT-BAG-051",
    "price": 1950,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knot Minaudiere",
    "brand": "Bottega Veneta",
    "sku": "BOT-KNOT-MINAUDIERE-052",
    "price": 3800,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Kalimero Bucket",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-KALIMERO-BUCKET-053",
    "price": 3500,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Kalimero",
    "brand": "Bottega Veneta",
    "sku": "BOT-MEDIUM-KALIMERO-054",
    "price": 7500,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knot On Strap",
    "brand": "Bottega Veneta",
    "sku": "BOT-KNOT-ON-STRAP-055",
    "price": 2100,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Candy Kalimero",
    "brand": "Bottega Veneta",
    "sku": "BOT-CANDY-KALIMERO-056",
    "price": 2800,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Intrecciato Wide Belt",
    "brand": "Bottega Veneta",
    "sku": "BOT-INTRECCIATO-WIDE-BELT-057",
    "price": 950,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Horseshoe Slim Belt",
    "brand": "Bottega Veneta",
    "sku": "BOT-HORSESHOE-SLIM-BELT-058",
    "price": 550,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Double Knot Belt",
    "brand": "Bottega Veneta",
    "sku": "BOT-DOUBLE-KNOT-BELT-059",
    "price": 680,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Triangle Buckle Belt",
    "brand": "Bottega Veneta",
    "sku": "BOT-TRIANGLE-BUCKLE-BELT-060",
    "price": 590,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Intrecciato",
    "brand": "Bottega Veneta",
    "sku": "BOT-REVERSIBLE-INTRECCIATO-061",
    "price": 720,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Angle Rectangular Frames",
    "brand": "Bottega Veneta",
    "sku": "BOT-ANGLE-RECTANGULAR-FRAMES-062",
    "price": 440,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cat-Eye Acetate",
    "brand": "Bottega Veneta",
    "sku": "BOT-CAT-EYE-ACETATE-063",
    "price": 480,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Aviator Metal",
    "brand": "Bottega Veneta",
    "sku": "BOT-AVIATOR-METAL-064",
    "price": 520,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Square Oversized",
    "brand": "Bottega Veneta",
    "sku": "BOT-SQUARE-OVERSIZED-065",
    "price": 490,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "D-Frame Injection",
    "brand": "Bottega Veneta",
    "sku": "BOT-D-FRAME-INJECTION-066",
    "price": 410,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Men's Navigator",
    "brand": "Bottega Veneta",
    "sku": "BOT-MEN-S-NAVIGATOR-067",
    "price": 550,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Round Metal Opticals",
    "brand": "Bottega Veneta",
    "sku": "BOT-ROUND-METAL-OPTICALS-068",
    "price": 420,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Classic Geometric",
    "brand": "Bottega Veneta",
    "sku": "BOT-CLASSIC-GEOMETRIC-069",
    "price": 450,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Intrecciato Card Case",
    "brand": "Bottega Veneta",
    "sku": "BOT-INTRECCIATO-CARD-CASE-070",
    "price": 390,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cassette Zipped Wallet",
    "brand": "Bottega Veneta",
    "sku": "BOT-CASSETTE-ZIPPED-WALLET-071",
    "price": 750,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bi-fold Wallet",
    "brand": "Bottega Veneta",
    "sku": "BOT-BI-FOLD-WALLET-072",
    "price": 580,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Key Pouch",
    "brand": "Bottega Veneta",
    "sku": "BOT-KEY-POUCH-073",
    "price": 450,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Tri-fold Compact Wallet",
    "brand": "Bottega Veneta",
    "sku": "BOT-TRI-FOLD-COMPACT-WALLET-074",
    "price": 650,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Long Flap Wallet",
    "brand": "Bottega Veneta",
    "sku": "BOT-LONG-FLAP-WALLET-075",
    "price": 920,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Loop Camera Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-LOOP-CAMERA-BAG-076",
    "price": 2650,
    "stock": 16,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Wallace Leather Crossbody",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-WALLACE-LEATHER-CROSSBO-077",
    "price": 2100,
    "stock": 17,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Desiree Shoulder Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-DESIREE-SHOULDER-BAG-078",
    "price": 3200,
    "stock": 18,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Cobble Crossbody",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-COBBLE-CROSSBODY-079",
    "price": 2900,
    "stock": 19,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Gemelli Shoulder Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-GEMELLI-SHOULDER-BAG-080",
    "price": 3600,
    "stock": 20,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Candy Cassette Crossbody",
    "brand": "Bottega Veneta",
    "sku": "BOT-CANDY-CASSETTE-CROSSBODY-081",
    "price": 1250,
    "stock": 21,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Jodie with Gold-Finish Handle",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-JODIE-WITH-GOLD-FINISH--082",
    "price": 2800,
    "stock": 22,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Sardine with Metallic Handle",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-SARDINE-WITH-METALLIC-H-083",
    "price": 3100,
    "stock": 23,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Kalimero Bucket Bag",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-KALIMERO-BUCKET-BAG-084",
    "price": 5900,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Candy Wallace Gold Leather",
    "brand": "Bottega Veneta",
    "sku": "BOT-CANDY-WALLACE-GOLD-LEATHER-085",
    "price": 1950,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Pouch with Gold Chain",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-POUCH-WITH-GOLD-CHAIN-086",
    "price": 1750,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Knot Clutch in Gold",
    "brand": "Bottega Veneta",
    "sku": "BOT-MINI-KNOT-CLUTCH-IN-GOLD-087",
    "price": 2400,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Padded Cassette in Parakeet",
    "brand": "Bottega Veneta",
    "sku": "BOT-PADDED-CASSETTE-IN-PARAKEET-088",
    "price": 4500,
    "stock": 11,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Padded Cassette with Gold Chain",
    "brand": "Bottega Veneta",
    "sku": "BOT-PADDED-CASSETTE-WITH-GOLD-CH-089",
    "price": 5500,
    "stock": 12,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Padded Cassette Suede",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-PADDED-CASSETTE-SUEDE-090",
    "price": 3900,
    "stock": 13,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Padded Cassette Metallic Silver",
    "brand": "Bottega Veneta",
    "sku": "BOT-PADDED-CASSETTE-METALLIC-SIL-091",
    "price": 4700,
    "stock": 14,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Padded Tech Cassette Nylon",
    "brand": "Bottega Veneta",
    "sku": "BOT-PADDED-TECH-CASSETTE-NYLON-092",
    "price": 2500,
    "stock": 15,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Maxi Padded Cassette",
    "brand": "Bottega Veneta",
    "sku": "BOT-MAXI-PADDED-CASSETTE-093",
    "price": 4900,
    "stock": 16,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "The Lauren 1980 Intrecciato Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-THE-LAUREN-1980-INTRECCIATO--094",
    "price": 3400,
    "stock": 17,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Large Lauren Bag in Barolo",
    "brand": "Bottega Veneta",
    "sku": "BOT-LARGE-LAUREN-BAG-IN-BAROLO-095",
    "price": 4200,
    "stock": 18,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Lauren Suede Clutch",
    "brand": "Bottega Veneta",
    "sku": "BOT-SMALL-LAUREN-SUEDE-CLUTCH-096",
    "price": 2800,
    "stock": 19,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "The Lauren Metallic Weave",
    "brand": "Bottega Veneta",
    "sku": "BOT-THE-LAUREN-METALLIC-WEAVE-097",
    "price": 3900,
    "stock": 20,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Lauren Top Handle",
    "brand": "Bottega Veneta",
    "sku": "BOT-MEDIUM-LAUREN-TOP-HANDLE-098",
    "price": 4500,
    "stock": 21,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "The Lauren 1980 Snakeskin Edition",
    "brand": "Bottega Veneta",
    "sku": "BOT-THE-LAUREN-1980-SNAKESKIN-ED-099",
    "price": 5100,
    "stock": 22,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Classic Document Case in Fondant",
    "brand": "Bottega Veneta",
    "sku": "BOT-CLASSIC-DOCUMENT-CASE-IN-FON-100",
    "price": 2200,
    "stock": 23,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Large Zip Document Case",
    "brand": "Bottega Veneta",
    "sku": "BOT-LARGE-ZIP-DOCUMENT-CASE-101",
    "price": 2500,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Intrecciato Flat Pouch",
    "brand": "Bottega Veneta",
    "sku": "BOT-INTRECCIATO-FLAT-POUCH-102",
    "price": 1650,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Document Case with Wristlet",
    "brand": "Bottega Veneta",
    "sku": "BOT-DOCUMENT-CASE-WITH-WRISTLET-103",
    "price": 1900,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Business Document Folder",
    "brand": "Bottega Veneta",
    "sku": "BOT-BUSINESS-DOCUMENT-FOLDER-104",
    "price": 2400,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Tech Document Case",
    "brand": "Bottega Veneta",
    "sku": "BOT-TECH-DOCUMENT-CASE-105",
    "price": 1450,
    "stock": 11,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "The Kensington Long Heritage",
    "brand": "Burberry",
    "sku": "BUR-THE-KENSINGTON-LONG-HERITAGE-106",
    "price": 2590,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "The Chelsea Slim Fit",
    "brand": "Burberry",
    "sku": "BUR-THE-CHELSEA-SLIM-FIT-107",
    "price": 2590,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "The Waterloo Relaxed Fit",
    "brand": "Burberry",
    "sku": "BUR-THE-WATERLOO-RELAXED-FIT-108",
    "price": 2590,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "The Camden Heritage Car Coat",
    "brand": "Burberry",
    "sku": "BUR-THE-CAMDEN-HERITAGE-CAR-COAT-109",
    "price": 1990,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cotton Gabardine Hooded Trench",
    "brand": "Burberry",
    "sku": "BUR-COTTON-GABARDINE-HOODED-TREN-110",
    "price": 2100,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Detachable Hood Taffeta Trench",
    "brand": "Burberry",
    "sku": "BUR-DETACHABLE-HOOD-TAFFETA-TREN-111",
    "price": 1750,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Knight Bag",
    "brand": "Burberry",
    "sku": "BUR-MEDIUM-KNIGHT-BAG-112",
    "price": 3490,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Knight Bag",
    "brand": "Burberry",
    "sku": "BUR-SMALL-KNIGHT-BAG-113",
    "price": 2890,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knight Shoulder Bag in Shearling",
    "brand": "Burberry",
    "sku": "BUR-KNIGHT-SHOULDER-BAG-IN-SHEAR-114",
    "price": 3800,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Knight Crossbody",
    "brand": "Burberry",
    "sku": "BUR-MINI-KNIGHT-CROSSBODY-115",
    "price": 2150,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knight Pouch with Clip",
    "brand": "Burberry",
    "sku": "BUR-KNIGHT-POUCH-WITH-CLIP-116",
    "price": 1450,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Knight Duffel",
    "brand": "Burberry",
    "sku": "BUR-LARGE-KNIGHT-DUFFEL-117",
    "price": 4200,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium London Tote in Check",
    "brand": "Burberry",
    "sku": "BUR-MEDIUM-LONDON-TOTE-IN-CHECK-118",
    "price": 1850,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Shield Tote",
    "brand": "Burberry",
    "sku": "BUR-SMALL-SHIELD-TOTE-119",
    "price": 2350,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Chess Tote",
    "brand": "Burberry",
    "sku": "BUR-LARGE-CHESS-TOTE-120",
    "price": 2950,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Rocking Horse Bag",
    "brand": "Burberry",
    "sku": "BUR-MINI-ROCKING-HORSE-BAG-121",
    "price": 1950,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check E-canvas Beach Tote",
    "brand": "Burberry",
    "sku": "BUR-CHECK-E-CANVAS-BEACH-TOTE-122",
    "price": 1250,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Check Leather Tote",
    "brand": "Burberry",
    "sku": "BUR-REVERSIBLE-CHECK-LEATHER-TOT-123",
    "price": 2100,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Rocking Horse Bag",
    "brand": "Burberry",
    "sku": "BUR-MEDIUM-ROCKING-HORSE-BAG-124",
    "price": 2950,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Rocking Horse Bag",
    "brand": "Burberry",
    "sku": "BUR-SMALL-ROCKING-HORSE-BAG-125",
    "price": 2450,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rocking Horse Satchel",
    "brand": "Burberry",
    "sku": "BUR-ROCKING-HORSE-SATCHEL-126",
    "price": 3100,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rocking Horse Shoulder Bag in Suede",
    "brand": "Burberry",
    "sku": "BUR-ROCKING-HORSE-SHOULDER-BAG-I-127",
    "price": 2750,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Rocking Horse with Chain",
    "brand": "Burberry",
    "sku": "BUR-MINI-ROCKING-HORSE-WITH-CHAI-128",
    "price": 1850,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Leather Chelsea Boots",
    "brand": "Burberry",
    "sku": "BUR-LEATHER-CHELSEA-BOOTS-129",
    "price": 990,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Cotton Sneakers",
    "brand": "Burberry",
    "sku": "BUR-CHECK-COTTON-SNEAKERS-130",
    "price": 650,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Stirrup Leather Rain Boots",
    "brand": "Burberry",
    "sku": "BUR-STIRRUP-LEATHER-RAIN-BOOTS-131",
    "price": 750,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knight Buckle Sandals",
    "brand": "Burberry",
    "sku": "BUR-KNIGHT-BUCKLE-SANDALS-132",
    "price": 890,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Marsh High-Top Sneakers",
    "brand": "Burberry",
    "sku": "BUR-MARSH-HIGH-TOP-SNEAKERS-133",
    "price": 850,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "House Check Ballerinas",
    "brand": "Burberry",
    "sku": "BUR-HOUSE-CHECK-BALLERINAS-134",
    "price": 690,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Burberry Goddess Eau de Parfum",
    "brand": "Burberry",
    "sku": "BUR-BURBERRY-GODDESS-EAU-DE-PARF-135",
    "price": 168,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Burberry Her Elixir 100ml",
    "brand": "Burberry",
    "sku": "BUR-BURBERRY-HER-ELIXIR-100ML-136",
    "price": 172,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Burberry Hero Parfum 100ml",
    "brand": "Burberry",
    "sku": "BUR-BURBERRY-HERO-PARFUM-100ML-137",
    "price": 185,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mr. Burberry Indigo",
    "brand": "Burberry",
    "sku": "BUR-MR-BURBERRY-INDIGO-138",
    "price": 125,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "My Burberry Blush",
    "brand": "Burberry",
    "sku": "BUR-MY-BURBERRY-BLUSH-139",
    "price": 150,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Diamond Quilted Jacket",
    "brand": "Burberry",
    "sku": "BUR-DIAMOND-QUILTED-JACKET-140",
    "price": 1150,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Wool Blend Pea Coat",
    "brand": "Burberry",
    "sku": "BUR-CHECK-WOOL-BLEND-PEA-COAT-141",
    "price": 2350,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Nylon Hooded Puffer",
    "brand": "Burberry",
    "sku": "BUR-NYLON-HOODED-PUFFER-142",
    "price": 1890,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Check Down Jacket",
    "brand": "Burberry",
    "sku": "BUR-REVERSIBLE-CHECK-DOWN-JACKET-143",
    "price": 2100,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Corduroy Collar Barn Jacket",
    "brand": "Burberry",
    "sku": "BUR-CORDUROY-COLLAR-BARN-JACKET-144",
    "price": 1350,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Classic Check Cashmere Scarf",
    "brand": "Burberry",
    "sku": "BUR-CLASSIC-CHECK-CASHMERE-SCARF-145",
    "price": 620,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lightweight Check Wool Scarf",
    "brand": "Burberry",
    "sku": "BUR-LIGHTWEIGHT-CHECK-WOOL-SCARF-146",
    "price": 450,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Logo Detail Silk Square",
    "brand": "Burberry",
    "sku": "BUR-LOGO-DETAIL-SILK-SQUARE-147",
    "price": 480,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Check Poncho",
    "brand": "Burberry",
    "sku": "BUR-REVERSIBLE-CHECK-PONCHO-148",
    "price": 1150,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Personalized Heritage Scarf",
    "brand": "Burberry",
    "sku": "BUR-PERSONALIZED-HERITAGE-SCARF-149",
    "price": 750,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Monogram Silk Twill",
    "brand": "Burberry",
    "sku": "BUR-MONOGRAM-SILK-TWILL-150",
    "price": 320,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check E-canvas Wash Bag",
    "brand": "Burberry",
    "sku": "BUR-CHECK-E-CANVAS-WASH-BAG-151",
    "price": 550,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Check Duffel Bag",
    "brand": "Burberry",
    "sku": "BUR-LARGE-CHECK-DUFFEL-BAG-152",
    "price": 1950,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "London Check Passport Holder",
    "brand": "Burberry",
    "sku": "BUR-LONDON-CHECK-PASSPORT-HOLDER-153",
    "price": 320,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Nylon Backpack",
    "brand": "Burberry",
    "sku": "BUR-CHECK-NYLON-BACKPACK-154",
    "price": 1550,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Leather Card Case Lanyard",
    "brand": "Burberry",
    "sku": "BUR-LEATHER-CARD-CASE-LANYARD-155",
    "price": 450,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Travel Coffee Mug in Check",
    "brand": "Burberry",
    "sku": "BUR-TRAVEL-COFFEE-MUG-IN-CHECK-156",
    "price": 120,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Continental Wallet",
    "brand": "Burberry",
    "sku": "BUR-CHECK-CONTINENTAL-WALLET-157",
    "price": 720,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Compact Folded Wallet",
    "brand": "Burberry",
    "sku": "BUR-COMPACT-FOLDED-WALLET-158",
    "price": 550,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bifold Wallet with Coin Pocket",
    "brand": "Burberry",
    "sku": "BUR-BIFOLD-WALLET-WITH-COIN-POCK-159",
    "price": 490,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knight Card Case",
    "brand": "Burberry",
    "sku": "BUR-KNIGHT-CARD-CASE-160",
    "price": 380,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Leather Key Ring Charm",
    "brand": "Burberry",
    "sku": "BUR-LEATHER-KEY-RING-CHARM-161",
    "price": 290,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zippered Travel Organizer",
    "brand": "Burberry",
    "sku": "BUR-ZIPPERED-TRAVEL-ORGANIZER-162",
    "price": 850,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Detail Navigator",
    "brand": "Burberry",
    "sku": "BUR-CHECK-DETAIL-NAVIGATOR-163",
    "price": 320,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B Motif Square Sunglasses",
    "brand": "Burberry",
    "sku": "BUR-B-MOTIF-SQUARE-SUNGLASSES-164",
    "price": 380,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Iconic Shield Frames",
    "brand": "Burberry",
    "sku": "BUR-ICONIC-SHIELD-FRAMES-165",
    "price": 450,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Oversized Cat-Eye Opticals",
    "brand": "Burberry",
    "sku": "BUR-OVERSIZED-CAT-EYE-OPTICALS-166",
    "price": 310,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rimless Aviator Frames",
    "brand": "Burberry",
    "sku": "BUR-RIMLESS-AVIATOR-FRAMES-167",
    "price": 350,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Cotton Poplin Shirt",
    "brand": "Burberry",
    "sku": "BUR-CHECK-COTTON-POPLIN-SHIRT-168",
    "price": 620,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Logo Appliqué Cotton T-shirt",
    "brand": "Burberry",
    "sku": "BUR-LOGO-APPLIQU-COTTON-T-SHIRT-169",
    "price": 490,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cashmere Blend Cardigan",
    "brand": "Burberry",
    "sku": "BUR-CASHMERE-BLEND-CARDIGAN-170",
    "price": 1250,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Checked Wool Pleated Skirt",
    "brand": "Burberry",
    "sku": "BUR-CHECKED-WOOL-PLEATED-SKIRT-171",
    "price": 990,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Straight Fit Selvedge Denim",
    "brand": "Burberry",
    "sku": "BUR-STRAIGHT-FIT-SELVEDGE-DENIM-172",
    "price": 750,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Embroidered Logo Hoodie",
    "brand": "Burberry",
    "sku": "BUR-EMBROIDERED-LOGO-HOODIE-173",
    "price": 890,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check iPhone 15 Pro Case",
    "brand": "Burberry",
    "sku": "BUR-CHECK-IPHONE-15-PRO-CASE-174",
    "price": 350,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "AirPods Case in Check Leather",
    "brand": "Burberry",
    "sku": "BUR-AIRPODS-CASE-IN-CHECK-LEATHE-175",
    "price": 320,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Quilted Leather Tablet Sleeve",
    "brand": "Burberry",
    "sku": "BUR-QUILTED-LEATHER-TABLET-SLEEV-176",
    "price": 550,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "MagSafe Card Case",
    "brand": "Burberry",
    "sku": "BUR-MAGSAFE-CARD-CASE-177",
    "price": 310,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Apple Watch Band",
    "brand": "Burberry",
    "sku": "BUR-CHECK-APPLE-WATCH-BAND-178",
    "price": 290,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Kensington Trench",
    "brand": "Burberry",
    "sku": "BUR-MINI-KENSINGTON-TRENCH-179",
    "price": 1150,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baby Check Gift Set",
    "brand": "Burberry",
    "sku": "BUR-BABY-CHECK-GIFT-SET-180",
    "price": 450,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Kids Checked Wool Cape",
    "brand": "Burberry",
    "sku": "BUR-KIDS-CHECKED-WOOL-CAPE-181",
    "price": 650,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Logo Print Cotton Dress",
    "brand": "Burberry",
    "sku": "BUR-LOGO-PRINT-COTTON-DRESS-182",
    "price": 320,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Checked Changing Bag",
    "brand": "Burberry",
    "sku": "BUR-CHECKED-CHANGING-BAG-183",
    "price": 1250,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Plaque Buckle Belt",
    "brand": "Burberry",
    "sku": "BUR-REVERSIBLE-PLAQUE-BUCKLE-BEL-184",
    "price": 520,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Check Leather Belt",
    "brand": "Burberry",
    "sku": "BUR-CHECK-LEATHER-BELT-185",
    "price": 480,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knight Buckle Slim Belt",
    "brand": "Burberry",
    "sku": "BUR-KNIGHT-BUCKLE-SLIM-BELT-186",
    "price": 550,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Monogram Leather Belt",
    "brand": "Burberry",
    "sku": "BUR-MONOGRAM-LEATHER-BELT-187",
    "price": 490,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Equestrian Knight Silk Tie",
    "brand": "Burberry",
    "sku": "BUR-EQUESTRIAN-KNIGHT-SILK-TIE-188",
    "price": 250,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Maxi Classic Flap",
    "brand": "Chanel",
    "sku": "CHA-MAXI-CLASSIC-FLAP-189",
    "price": 12800,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jumbo Classic Flap",
    "brand": "Chanel",
    "sku": "CHA-JUMBO-CLASSIC-FLAP-190",
    "price": 12200,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Classic Flap",
    "brand": "Chanel",
    "sku": "CHA-MEDIUM-CLASSIC-FLAP-191",
    "price": 11300,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Classic Flap",
    "brand": "Chanel",
    "sku": "CHA-SMALL-CLASSIC-FLAP-192",
    "price": 10900,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Rectangular Flap",
    "brand": "Chanel",
    "sku": "CHA-MINI-RECTANGULAR-FLAP-193",
    "price": 5400,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Square Flap",
    "brand": "Chanel",
    "sku": "CHA-MINI-SQUARE-FLAP-194",
    "price": 5200,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Classic Wallet on Chain (WOC)",
    "brand": "Chanel",
    "sku": "CHA-CLASSIC-WALLET-ON-CHAIN-WOC-195",
    "price": 3500,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Boy Bag",
    "brand": "Chanel",
    "sku": "CHA-LARGE-BOY-BAG-196",
    "price": 8200,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "New Medium Boy Bag",
    "brand": "Chanel",
    "sku": "CHA-NEW-MEDIUM-BOY-BAG-197",
    "price": 7600,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Old Medium Boy Bag",
    "brand": "Chanel",
    "sku": "CHA-OLD-MEDIUM-BOY-BAG-198",
    "price": 6700,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Boy Bag",
    "brand": "Chanel",
    "sku": "CHA-SMALL-BOY-BAG-199",
    "price": 7000,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Boy Wallet on Chain",
    "brand": "Chanel",
    "sku": "CHA-BOY-WALLET-ON-CHAIN-200",
    "price": 3575,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel 22 Large Bag",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-22-LARGE-BAG-201",
    "price": 6700,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel 22 Medium Bag",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-22-MEDIUM-BAG-202",
    "price": 6200,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel 19 Large Bag",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-19-LARGE-BAG-203",
    "price": 7600,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel 19 Small Bag",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-19-SMALL-BAG-204",
    "price": 6900,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel 22 Mini Bag",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-22-MINI-BAG-205",
    "price": 5100,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lambskin Ballerina Flats",
    "brand": "Chanel",
    "sku": "CHA-LAMBSKIN-BALLERINA-FLATS-206",
    "price": 1025,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Two-Tone Slingback Pumps",
    "brand": "Chanel",
    "sku": "CHA-TWO-TONE-SLINGBACK-PUMPS-207",
    "price": 1150,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Grosgrain Ballet Flats",
    "brand": "Chanel",
    "sku": "CHA-GROSGRAIN-BALLET-FLATS-208",
    "price": 1325,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Patent Leather Mary Janes",
    "brand": "Chanel",
    "sku": "CHA-PATENT-LEATHER-MARY-JANES-209",
    "price": 1300,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "N°5 Eau de Parfum 100ml",
    "brand": "Chanel",
    "sku": "CHA-N-5-EAU-DE-PARFUM-100ML-210",
    "price": 172,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Les Exclusifs de Chanel - Coromandel",
    "brand": "Chanel",
    "sku": "CHA-LES-EXCLUSIFS-DE-CHANEL-CORO-211",
    "price": 500,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bleu de Chanel Parfum 100ml",
    "brand": "Chanel",
    "sku": "CHA-BLEU-DE-CHANEL-PARFUM-100ML-212",
    "price": 190,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Coco Mademoiselle 100ml",
    "brand": "Chanel",
    "sku": "CHA-COCO-MADEMOISELLE-100ML-213",
    "price": 172,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chance Eau Tendre 100ml",
    "brand": "Chanel",
    "sku": "CHA-CHANCE-EAU-TENDRE-100ML-214",
    "price": 172,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Alligator Small Flap",
    "brand": "Chanel",
    "sku": "CHA-ALLIGATOR-SMALL-FLAP-215",
    "price": 32000,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Python Medium Flap",
    "brand": "Chanel",
    "sku": "CHA-PYTHON-MEDIUM-FLAP-216",
    "price": 18500,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sequin Evening Bag",
    "brand": "Chanel",
    "sku": "CHA-SEQUIN-EVENING-BAG-217",
    "price": 6200,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Velvet Mini Flap",
    "brand": "Chanel",
    "sku": "CHA-VELVET-MINI-FLAP-218",
    "price": 4800,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Coco Handle",
    "brand": "Chanel",
    "sku": "CHA-LARGE-COCO-HANDLE-219",
    "price": 7500,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Coco Handle",
    "brand": "Chanel",
    "sku": "CHA-MEDIUM-COCO-HANDLE-220",
    "price": 6800,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Coco Handle",
    "brand": "Chanel",
    "sku": "CHA-SMALL-COCO-HANDLE-221",
    "price": 6200,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Extra Mini Coco Handle",
    "brand": "Chanel",
    "sku": "CHA-EXTRA-MINI-COCO-HANDLE-222",
    "price": 5400,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Quilted Lambskin Moccasins",
    "brand": "Chanel",
    "sku": "CHA-QUILTED-LAMBSKIN-MOCCASINS-223",
    "price": 1425,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lace-Up Combat Boots",
    "brand": "Chanel",
    "sku": "CHA-LACE-UP-COMBAT-BOOTS-224",
    "price": 2100,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chain Detail Ankle Boots",
    "brand": "Chanel",
    "sku": "CHA-CHAIN-DETAIL-ANKLE-BOOTS-225",
    "price": 1750,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sock Boots",
    "brand": "Chanel",
    "sku": "CHA-SOCK-BOOTS-226",
    "price": 1525,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spring Bowling Bag",
    "brand": "Chanel",
    "sku": "CHA-SPRING-BOWLING-BAG-227",
    "price": 5100,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Hobo Bag",
    "brand": "Chanel",
    "sku": "CHA-SMALL-HOBO-BAG-228",
    "price": 4900,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Heart Clutch with Chain",
    "brand": "Chanel",
    "sku": "CHA-HEART-CLUTCH-WITH-CHAIN-229",
    "price": 5500,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Star Evening Bag",
    "brand": "Chanel",
    "sku": "CHA-STAR-EVENING-BAG-230",
    "price": 7200,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dad Sandals (Quilted)",
    "brand": "Chanel",
    "sku": "CHA-DAD-SANDALS-QUILTED-231",
    "price": 1450,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Interlocking CC Slides",
    "brand": "Chanel",
    "sku": "CHA-INTERLOCKING-CC-SLIDES-232",
    "price": 1125,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cord & Leather Sandals",
    "brand": "Chanel",
    "sku": "CHA-CORD-LEATHER-SANDALS-233",
    "price": 1250,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Platform Thong Sandals",
    "brand": "Chanel",
    "sku": "CHA-PLATFORM-THONG-SANDALS-234",
    "price": 1350,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Large Filigree Vanity",
    "brand": "Chanel",
    "sku": "CHA-LARGE-FILIGREE-VANITY-235",
    "price": 6400,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Vanity Case with Chain",
    "brand": "Chanel",
    "sku": "CHA-SMALL-VANITY-CASE-WITH-CHAIN-236",
    "price": 5100,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Round Vanity Case",
    "brand": "Chanel",
    "sku": "CHA-MINI-ROUND-VANITY-CASE-237",
    "price": 3200,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Classic Quilted Backpack",
    "brand": "Chanel",
    "sku": "CHA-CLASSIC-QUILTED-BACKPACK-238",
    "price": 6100,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Duma Backpack",
    "brand": "Chanel",
    "sku": "CHA-DUMA-BACKPACK-239",
    "price": 5800,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel 22 Backpack",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-22-BACKPACK-240",
    "price": 5900,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chanel Duffle Bag",
    "brand": "Chanel",
    "sku": "CHA-CHANEL-DUFFLE-BAG-241",
    "price": 3600,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Oversized Square Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-OVERSIZED-SQUARE-SUNGLASSES-242",
    "price": 620,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Butterfly Chain Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-BUTTERFLY-CHAIN-SUNGLASSES-243",
    "price": 750,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Shield Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-SHIELD-SUNGLASSES-244",
    "price": 580,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cat Eye Opticals",
    "brand": "Chanel",
    "sku": "CHA-CAT-EYE-OPTICALS-245",
    "price": 495,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pilot Metal Frames",
    "brand": "Chanel",
    "sku": "CHA-PILOT-METAL-FRAMES-246",
    "price": 535,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Classic Flap Wallet",
    "brand": "Chanel",
    "sku": "CHA-CLASSIC-FLAP-WALLET-247",
    "price": 1250,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Boy Zip Coin Purse",
    "brand": "Chanel",
    "sku": "CHA-BOY-ZIP-COIN-PURSE-248",
    "price": 725,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Card Holder on Chain",
    "brand": "Chanel",
    "sku": "CHA-CARD-HOLDER-ON-CHAIN-249",
    "price": 1850,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Quilted Key Holder",
    "brand": "Chanel",
    "sku": "CHA-QUILTED-KEY-HOLDER-250",
    "price": 650,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Tabby Shoulder Bag 26",
    "brand": "Coach",
    "sku": "COA-TABBY-SHOULDER-BAG-26-251",
    "price": 450,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Soft Tabby Hobo",
    "brand": "Coach",
    "sku": "COA-SOFT-TABBY-HOBO-252",
    "price": 395,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pillow Tabby 18",
    "brand": "Coach",
    "sku": "COA-PILLOW-TABBY-18-253",
    "price": 350,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Tabby Wristlet",
    "brand": "Coach",
    "sku": "COA-TABBY-WRISTLET-254",
    "price": 225,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rogue Bag 25 in Regenerative Leather",
    "brand": "Coach",
    "sku": "COA-ROGUE-BAG-25-IN-REGENERATIVE-255",
    "price": 695,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rogue Top Handle",
    "brand": "Coach",
    "sku": "COA-ROGUE-TOP-HANDLE-256",
    "price": 595,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rogue Briefcase",
    "brand": "Coach",
    "sku": "COA-ROGUE-BRIEFCASE-257",
    "price": 795,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Willow Tote 24",
    "brand": "Coach",
    "sku": "COA-WILLOW-TOTE-24-258",
    "price": 295,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Market Tote in Polished Pebble",
    "brand": "Coach",
    "sku": "COA-MARKET-TOTE-IN-POLISHED-PEBB-259",
    "price": 350,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Willow Shoulder Bag",
    "brand": "Coach",
    "sku": "COA-WILLOW-SHOULDER-BAG-260",
    "price": 395,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Brooklyn Shoulder Bag 39",
    "brand": "Coach",
    "sku": "COA-BROOKLYN-SHOULDER-BAG-39-261",
    "price": 495,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Empire Carryall 40",
    "brand": "Coach",
    "sku": "COA-EMPIRE-CARRYALL-40-262",
    "price": 750,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Brooklyn Bag 28",
    "brand": "Coach",
    "sku": "COA-BROOKLYN-BAG-28-263",
    "price": 295,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Leah Platform Loafer",
    "brand": "Coach",
    "sku": "COA-LEAH-PLATFORM-LOAFER-264",
    "price": 195,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Irene Mule",
    "brand": "Coach",
    "sku": "COA-IRENE-MULE-265",
    "price": 150,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Hanna Loafer",
    "brand": "Coach",
    "sku": "COA-HANNA-LOAFER-266",
    "price": 165,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "C301 High Top Sneaker",
    "brand": "Coach",
    "sku": "COA-C301-HIGH-TOP-SNEAKER-267",
    "price": 225,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Coach Love Eau de Parfum 90ml",
    "brand": "Coach",
    "sku": "COA-COACH-LOVE-EAU-DE-PARFUM-90M-268",
    "price": 112,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Coach Dreams Moonlight",
    "brand": "Coach",
    "sku": "COA-COACH-DREAMS-MOONLIGHT-269",
    "price": 108,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Coach Wild Rose 90ml",
    "brand": "Coach",
    "sku": "COA-COACH-WILD-ROSE-90ML-270",
    "price": 112,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cary Shoulder Bag",
    "brand": "Coach",
    "sku": "COA-CARY-SHOULDER-BAG-271",
    "price": 395,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cassie Crossbody 19",
    "brand": "Coach",
    "sku": "COA-CASSIE-CROSSBODY-19-272",
    "price": 295,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cary Crossbody",
    "brand": "Coach",
    "sku": "COA-CARY-CROSSBODY-273",
    "price": 295,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Charter Backpack",
    "brand": "Coach",
    "sku": "COA-CHARTER-BACKPACK-274",
    "price": 550,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gotham Backpack in Signature Canvas",
    "brand": "Coach",
    "sku": "COA-GOTHAM-BACKPACK-IN-SIGNATURE-275",
    "price": 595,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "League Flap Backpack",
    "brand": "Coach",
    "sku": "COA-LEAGUE-FLAP-BACKPACK-276",
    "price": 650,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Stina Bootie",
    "brand": "Coach",
    "sku": "COA-STINA-BOOTIE-277",
    "price": 275,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Moto Boot",
    "brand": "Coach",
    "sku": "COA-MOTO-BOOT-278",
    "price": 295,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Shearling Aviator Jacket",
    "brand": "Coach",
    "sku": "COA-SHEARLING-AVIATOR-JACKET-279",
    "price": 1200,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Signature Trench Coat",
    "brand": "Coach",
    "sku": "COA-SIGNATURE-TRENCH-COAT-280",
    "price": 550,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Swinger Bag with Zip",
    "brand": "Coach",
    "sku": "COA-SWINGER-BAG-WITH-ZIP-281",
    "price": 295,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Penn Shoulder Bag",
    "brand": "Coach",
    "sku": "COA-PENN-SHOULDER-BAG-282",
    "price": 250,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Studio Baguette Bag",
    "brand": "Coach",
    "sku": "COA-STUDIO-BAGUETTE-BAG-283",
    "price": 350,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Udele Slide",
    "brand": "Coach",
    "sku": "COA-UDELE-SLIDE-284",
    "price": 95,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Natalee Jelly Sandal",
    "brand": "Coach",
    "sku": "COA-NATALEE-JELLY-SANDAL-285",
    "price": 95,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Juliet Sandal",
    "brand": "Coach",
    "sku": "COA-JULIET-SANDAL-286",
    "price": 185,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Metropolitan Portfolio",
    "brand": "Coach",
    "sku": "COA-METROPOLITAN-PORTFOLIO-287",
    "price": 450,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Kennedy Briefcase",
    "brand": "Coach",
    "sku": "COA-KENNEDY-BRIEFCASE-288",
    "price": 550,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Charter Slim Case",
    "brand": "Coach",
    "sku": "COA-CHARTER-SLIM-CASE-289",
    "price": 350,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Wyn Small Wallet",
    "brand": "Coach",
    "sku": "COA-WYN-SMALL-WALLET-290",
    "price": 150,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Billfold Wallet",
    "brand": "Coach",
    "sku": "COA-BILLFOLD-WALLET-291",
    "price": 125,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zip Card Case",
    "brand": "Coach",
    "sku": "COA-ZIP-CARD-CASE-292",
    "price": 95,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Essential Card Case",
    "brand": "Coach",
    "sku": "COA-ESSENTIAL-CARD-CASE-293",
    "price": 75,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sculpted C Square Sunglasses",
    "brand": "Coach",
    "sku": "COA-SCULPTED-C-SQUARE-SUNGLASSES-294",
    "price": 185,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Horse and Carriage Aviators",
    "brand": "Coach",
    "sku": "COA-HORSE-AND-CARRIAGE-AVIATORS-295",
    "price": 165,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cat Eye Frames",
    "brand": "Coach",
    "sku": "COA-CAT-EYE-FRAMES-296",
    "price": 175,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Harness Buckle Belt",
    "brand": "Coach",
    "sku": "COA-HARNESS-BUCKLE-BELT-297",
    "price": 125,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Signature Chain Link Bracelet",
    "brand": "Coach",
    "sku": "COA-SIGNATURE-CHAIN-LINK-BRACELE-298",
    "price": 95,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Tea Rose Stud Earrings",
    "brand": "Coach",
    "sku": "COA-TEA-ROSE-STUD-EARRINGS-299",
    "price": 65,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lady Dior My ABCDior Bag",
    "brand": "Dior",
    "sku": "DIO-LADY-DIOR-MY-ABCDIOR-BAG-300",
    "price": 6000,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lady D-Joy Bag",
    "brand": "Dior",
    "sku": "DIO-LADY-D-JOY-BAG-301",
    "price": 5100,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Bag with Strap",
    "brand": "Dior",
    "sku": "DIO-SADDLE-BAG-WITH-STRAP-302",
    "price": 4400,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Pouch",
    "brand": "Dior",
    "sku": "DIO-SADDLE-POUCH-303",
    "price": 2450,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Dior Book Tote",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-DIOR-BOOK-TOTE-304",
    "price": 3350,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Book Tote",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-BOOK-TOTE-305",
    "price": 3100,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne Avenue Bag",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-AVENUE-BAG-306",
    "price": 3700,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne Box Bag",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-BOX-BAG-307",
    "price": 3500,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Miss Dior Eau de Parfum 100ml",
    "brand": "Dior",
    "sku": "DIO-MISS-DIOR-EAU-DE-PARFUM-100M-308",
    "price": 175,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sauvage Elixir 60ml",
    "brand": "Dior",
    "sku": "DIO-SAUVAGE-ELIXIR-60ML-309",
    "price": 180,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Poison Girl Eau de Parfum 100ml",
    "brand": "Dior",
    "sku": "DIO-DIOR-POISON-GIRL-EAU-DE-PARF-310",
    "price": 180,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B23 High-Top Sneaker",
    "brand": "Dior",
    "sku": "DIO-B23-HIGH-TOP-SNEAKER-311",
    "price": 1200,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B23 Low-Top Sneaker",
    "brand": "Dior",
    "sku": "DIO-B23-LOW-TOP-SNEAKER-312",
    "price": 1100,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bois de Rose Ring",
    "brand": "Dior",
    "sku": "DIO-BOIS-DE-ROSE-RING-313",
    "price": 2350,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rose des Vents Necklace",
    "brand": "Dior",
    "sku": "DIO-ROSE-DES-VENTS-NECKLACE-314",
    "price": 10500,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior 8 Cargo Pants",
    "brand": "Dior",
    "sku": "DIO-DIOR-8-CARGO-PANTS-315",
    "price": 2100,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior 8 Hooded Cardigan",
    "brand": "Dior",
    "sku": "DIO-DIOR-8-HOODED-CARDIGAN-316",
    "price": 2550,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B27 Low-Top Sneaker",
    "brand": "Dior",
    "sku": "DIO-B27-LOW-TOP-SNEAKER-317",
    "price": 1100,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B27 High-Top Sneaker",
    "brand": "Dior",
    "sku": "DIO-B27-HIGH-TOP-SNEAKER-318",
    "price": 1250,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B20 Line High Performance Tech Sneaker",
    "brand": "Dior",
    "sku": "DIO-B20-LINE-HIGH-PERFORMANCE-TE-319",
    "price": 1250,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B33 Line with Dior Gravity Leather",
    "brand": "Dior",
    "sku": "DIO-B33-LINE-WITH-DIOR-GRAVITY-L-320",
    "price": 1185,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "B57 Line classic basketball silhouette",
    "brand": "Dior",
    "sku": "DIO-B57-LINE-CLASSIC-BASKETBALL--321",
    "price": 1200,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "D-Connect Sneaker",
    "brand": "Dior",
    "sku": "DIO-D-CONNECT-SNEAKER-322",
    "price": 1050,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "D-Connect Sandal",
    "brand": "Dior",
    "sku": "DIO-D-CONNECT-SANDAL-323",
    "price": 975,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Dioract Lambskin Sandal",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-DIORACT-LAMBSKI-324",
    "price": 1200,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Dioract Platform Lambskin Sandal",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-DIORACT-PLATFOR-325",
    "price": 1350,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Lingot 22 Bag",
    "brand": "Dior",
    "sku": "DIO-DIOR-LINGOT-22-BAG-326",
    "price": 2350,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Messenger Bag",
    "brand": "Dior",
    "sku": "DIO-SADDLE-MESSENGER-BAG-327",
    "price": 2900,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Men's CD Icon Zipped Messenger Bag",
    "brand": "Dior",
    "sku": "DIO-DIOR-MEN-S-CD-ICON-ZIPPED-ME-328",
    "price": 2900,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Men's Saddle Messenger Bag",
    "brand": "Dior",
    "sku": "DIO-DIOR-MEN-S-SADDLE-MESSENGER--329",
    "price": 2900,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Men's Safari Bag in Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-DIOR-MEN-S-SAFARI-BAG-IN-DIO-330",
    "price": 2600,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Men's Rider 2.0 Zipped Messenger Bag",
    "brand": "Dior",
    "sku": "DIO-DIOR-MEN-S-RIDER-2-0-ZIPPED--331",
    "price": 2600,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "CD Signature Hobo Bag",
    "brand": "Dior",
    "sku": "DIO-CD-SIGNATURE-HOBO-BAG-332",
    "price": 3300,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "CD Signature Oval Bag",
    "brand": "Dior",
    "sku": "DIO-CD-SIGNATURE-OVAL-BAG-333",
    "price": 2100,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's CD Signature Hobo Mini Bag in Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-CD-SIGNATURE-HO-334",
    "price": 1895,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Diorstar Hobo Bag in Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-DIORSTAR-HOBO-B-335",
    "price": 2500,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Miss Caro Hobo Mini Bag in Lambskin",
    "brand": "Dior",
    "sku": "DIO-DIOR-MISS-CARO-HOBO-MINI-BAG-336",
    "price": 2750,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Reversible Saddle Calfskin Belt",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-REVERSIBLE-SADD-337",
    "price": 740,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Saddle Belt in Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-SADDLE-BELT-IN--338",
    "price": 680,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Saddle Calfskin Belt",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-SADDLE-CALFSKIN-339",
    "price": 680,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne Belt",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-BELT-340",
    "price": 710,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Belt",
    "brand": "Dior",
    "sku": "DIO-SADDLE-BELT-341",
    "price": 650,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "DiorMidnight S1I",
    "brand": "Dior",
    "sku": "DIO-DIORMIDNIGHT-S1I-342",
    "price": 450,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "DiorClub M1U",
    "brand": "Dior",
    "sku": "DIO-DIORCLUB-M1U-343",
    "price": 710,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior 30MONTAIGNE S10F Square Ladies Sunglasses",
    "brand": "Dior",
    "sku": "DIO-DIOR-30MONTAIGNE-S10F-SQUARE-344",
    "price": 580,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's DiorSignature B1U Butterfly Sunglasses",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-DIORSIGNATURE-B-345",
    "price": 590,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Christian Dior Women's B2I Butterfly Sunglasses",
    "brand": "Dior",
    "sku": "DIO-CHRISTIAN-DIOR-WOMEN-S-B2I-B-346",
    "price": 500,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Clover S2U Gradient Square Sunglasses",
    "brand": "Dior",
    "sku": "DIO-DIOR-CLOVER-S2U-GRADIENT-SQU-347",
    "price": 630,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior DiorB23 S1I DM40052I Sunglasses Men",
    "brand": "Dior",
    "sku": "DIO-DIOR-DIORB23-S1I-DM40052I-SU-348",
    "price": 480,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "DIOR - Diorblacksuit Ri Black Pantos Sunglasses Men",
    "brand": "Dior",
    "sku": "DIO-DIOR-DIORBLACKSUIT-RI-BLACK--349",
    "price": 490,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lady Dior 5-Gusset Card Holder",
    "brand": "Dior",
    "sku": "DIO-LADY-DIOR-5-GUSSET-CARD-HOLD-350",
    "price": 550,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Lotus Wallet",
    "brand": "Dior",
    "sku": "DIO-SADDLE-LOTUS-WALLET-351",
    "price": 650,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Women Dior Dior Freesia Card Holder",
    "brand": "Dior",
    "sku": "DIO-WOMEN-DIOR-DIOR-FREESIA-CARD-352",
    "price": 430,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Saddle Lotus Grained Calfskin Wallet",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-SADDLE-LOTUS-GR-353",
    "price": 680,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Lady Dior Bloom Card Holder in Cannage Lambskin",
    "brand": "Dior",
    "sku": "DIO-DIOR-LADY-DIOR-BLOOM-CARD-HO-354",
    "price": 530,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dior Women's Caro Dahlia Cannage Calfskin Wallet",
    "brand": "Dior",
    "sku": "DIO-DIOR-WOMEN-S-CARO-DAHLIA-CAN-355",
    "price": 680,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Dior Book Tote Black Macrocannage Calfskin",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-DIOR-BOOK-TOTE-BLACK--356",
    "price": 4400,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Dior Book Tote Black Calfskin",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-DIOR-BOOK-TOTE-BLACK--357",
    "price": 3450,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Large Dior Toujours Bag Black Macrocannage Calfskin",
    "brand": "Dior",
    "sku": "DIO-LARGE-DIOR-TOUJOURS-BAG-BLAC-358",
    "price": 4700,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Dior Toujours Bag Olive Taupe Calfskin",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-DIOR-TOUJOURS-BAG-OLI-359",
    "price": 4300,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Toujours Vertical Tote Bag Black Calfskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-TOUJOURS-VERTICAL-360",
    "price": 3600,
    "stock": 11,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium D-Journey Bag Black Flat Macrocannage",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-D-JOURNEY-BAG-BLACK-F-361",
    "price": 4700,
    "stock": 12,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Bag with Strap Black Grained Calfskin",
    "brand": "Dior",
    "sku": "DIO-SADDLE-BAG-WITH-STRAP-BLACK--362",
    "price": 4700,
    "stock": 13,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Bag with Strap Blue Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-SADDLE-BAG-WITH-STRAP-BLUE-D-363",
    "price": 4700,
    "stock": 14,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Bag with Strap Black Ultramatte Calfskin",
    "brand": "Dior",
    "sku": "DIO-SADDLE-BAG-WITH-STRAP-BLACK--364",
    "price": 4700,
    "stock": 15,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Saddle Bag with Strap Latte Grained Calfskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-SADDLE-BAG-WITH-STRAP--365",
    "price": 4400,
    "stock": 16,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Saddle Bag with Strap Blue and Tobacco Oblique Denim",
    "brand": "Dior",
    "sku": "DIO-SADDLE-BAG-WITH-STRAP-BLUE-A-366",
    "price": 5000,
    "stock": 17,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Saddle Bag with Strap Black Grained Calfskin",
    "brand": "Dior",
    "sku": "DIO-MINI-SADDLE-BAG-WITH-STRAP-B-367",
    "price": 4200,
    "stock": 18,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Lady D-Joy Bag Latte Cannage Lambskin",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-LADY-D-JOY-BAG-LATTE--368",
    "price": 5800,
    "stock": 19,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Lady D-Joy Bag Black Cannage Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-LADY-D-JOY-BAG-BLACK-C-369",
    "price": 5200,
    "stock": 20,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Lady D-Joy Bag Trench Cannage Lambskin",
    "brand": "Dior",
    "sku": "DIO-MINI-LADY-D-JOY-BAG-TRENCH-C-370",
    "price": 4950,
    "stock": 21,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Lady Dior My ABCDior Bag Black Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-LADY-DIOR-MY-ABCDIOR-B-371",
    "price": 5700,
    "stock": 22,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Lady Dior Bag Blue Oblique Canvas",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-LADY-DIOR-BAG-BLUE-OB-372",
    "price": 6500,
    "stock": 23,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "My Dior Mini Bag Black Cannage Lambskin",
    "brand": "Dior",
    "sku": "DIO-MY-DIOR-MINI-BAG-BLACK-CANNA-373",
    "price": 3250,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne Bag Blue Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-BAG-BLUE-DIOR-O-374",
    "price": 4100,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne Chain Bag Blue Dior Oblique Jacquard",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-CHAIN-BAG-BLUE--375",
    "price": 4000,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "30 Montaigne East-West Bag with Chain Black Calfskin",
    "brand": "Dior",
    "sku": "DIO-30-MONTAIGNE-EAST-WEST-BAG-W-376",
    "price": 3600,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Dior Caro Small Bag Black Supple Cannage Calfskin",
    "brand": "Dior",
    "sku": "DIO-DIOR-CARO-SMALL-BAG-BLACK-SU-377",
    "price": 4100,
    "stock": 11,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Dior Caro Medium Bag Blush Cannage Calfskin",
    "brand": "Dior",
    "sku": "DIO-DIOR-CARO-MEDIUM-BAG-BLUSH-C-378",
    "price": 4500,
    "stock": 12,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Dior Voyage Bag Latte Flat Macrocannage Calfskin",
    "brand": "Dior",
    "sku": "DIO-DIOR-VOYAGE-BAG-LATTE-FLAT-M-379",
    "price": 4600,
    "stock": 13,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Bow Bag Rose Songe Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-BOW-BAG-ROSE-SONG-380",
    "price": 4400,
    "stock": 14,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Bow Bag Black Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-BOW-BAG-BLACK-LAM-381",
    "price": 4400,
    "stock": 15,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Dior Bow Bag Black Lambskin",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-DIOR-BOW-BAG-BLACK-LA-382",
    "price": 4900,
    "stock": 16,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Bow Bag Latte Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-BOW-BAG-LATTE-LAM-383",
    "price": 4400,
    "stock": 17,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Bow Bag Buttercup Yellow Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-BOW-BAG-BUTTERCUP-384",
    "price": 4200,
    "stock": 18,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Small Dior Bow Bag Hermitage Pink Lambskin",
    "brand": "Dior",
    "sku": "DIO-SMALL-DIOR-BOW-BAG-HERMITAGE-385",
    "price": 4200,
    "stock": 19,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Dior Trianon Bag with Chain Black Macrocannage",
    "brand": "Dior",
    "sku": "DIO-DIOR-TRIANON-BAG-WITH-CHAIN--386",
    "price": 4500,
    "stock": 20,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Large Diorly Bag Chocolate Suede Calfskin",
    "brand": "Dior",
    "sku": "DIO-LARGE-DIORLY-BAG-CHOCOLATE-S-387",
    "price": 4900,
    "stock": 21,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Diorly Bag Sabbia Suede Calfskin",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-DIORLY-BAG-SABBIA-SUE-388",
    "price": 4500,
    "stock": 22,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Dior Jolie Top Handle Mini Bag Black Lambskin",
    "brand": "Dior",
    "sku": "DIO-DIOR-JOLIE-TOP-HANDLE-MINI-B-389",
    "price": 3050,
    "stock": 23,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Dior Book Tote Literary Classics 'Dracula' Edition",
    "brand": "Dior",
    "sku": "DIO-DIOR-BOOK-TOTE-LITERARY-CLAS-390",
    "price": 3900,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Medium Lady D-Joy Bag Powder Pink Cannage",
    "brand": "Dior",
    "sku": "DIO-MEDIUM-LADY-D-JOY-BAG-POWDER-391",
    "price": 5800,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Large in FF Canvas",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-LARGE-IN-FF-CANVAS-392",
    "price": 3750,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Chain Midi",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-CHAIN-MIDI-393",
    "price": 3290,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Pouch with Handle",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-POUCH-WITH-HANDLE-394",
    "price": 2150,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Embroidery",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-EMBROIDERY-395",
    "price": 4300,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Mini with Fringe",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-MINI-WITH-FRINGE-396",
    "price": 2850,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sequined Baguette 1997",
    "brand": "Fendi",
    "sku": "FEN-SEQUINED-BAGUETTE-1997-397",
    "price": 4900,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Medium",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-MEDIUM-398",
    "price": 5400,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Small",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-SMALL-399",
    "price": 4600,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo Cut in Python",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-CUT-IN-PYTHON-400",
    "price": 6800,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo X-Lite",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-X-LITE-401",
    "price": 4200,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo Petite with Crystals",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-PETITE-WITH-CRYSTAL-402",
    "price": 5900,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo Soft Leather Tote",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-SOFT-LEATHER-TOTE-403",
    "price": 5200,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Medium Clutch",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-MEDIUM-CLUTCH-404",
    "price": 3950,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Small in Nappa",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SMALL-IN-NAPPA-405",
    "price": 3100,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Sunshine Medium Tote",
    "brand": "Fendi",
    "sku": "FEN-FENDI-SUNSHINE-MEDIUM-TOTE-406",
    "price": 3100,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Sunshine Shopper Mini",
    "brand": "Fendi",
    "sku": "FEN-FENDI-SUNSHINE-SHOPPER-MINI-407",
    "price": 1750,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Sight Bag",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SIGHT-BAG-408",
    "price": 2850,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Monogram Canvas Tote",
    "brand": "Fendi",
    "sku": "FEN-FF-MONOGRAM-CANVAS-TOTE-409",
    "price": 2450,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mon Tresor Bucket Bag Small",
    "brand": "Fendi",
    "sku": "FEN-MON-TRESOR-BUCKET-BAG-SMALL-410",
    "price": 1950,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Origami Medium",
    "brand": "Fendi",
    "sku": "FEN-FENDI-ORIGAMI-MEDIUM-411",
    "price": 2950,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mon Tresor FF Jacquard Mini",
    "brand": "Fendi",
    "sku": "FEN-MON-TRESOR-FF-JACQUARD-MINI-412",
    "price": 1850,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Origami Mini",
    "brand": "Fendi",
    "sku": "FEN-FENDI-ORIGAMI-MINI-413",
    "price": 2100,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mon Tresor with Fur Trim",
    "brand": "Fendi",
    "sku": "FEN-MON-TRESOR-WITH-FUR-TRIM-414",
    "price": 2600,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Leather Slingbacks",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-LEATHER-SLINGBAC-415",
    "price": 1350,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Colibrì Lite Mesh Pumps",
    "brand": "Fendi",
    "sku": "FEN-COLIBR-LITE-MESH-PUMPS-416",
    "price": 1150,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Match Sneakers",
    "brand": "Fendi",
    "sku": "FEN-FENDI-MATCH-SNEAKERS-417",
    "price": 930,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Heel Sandals",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-HEEL-SANDALS-418",
    "price": 1250,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Domino Low-Tops",
    "brand": "Fendi",
    "sku": "FEN-FENDI-DOMINO-LOW-TOPS-419",
    "price": 795,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zucca Print Biker Boots",
    "brand": "Fendi",
    "sku": "FEN-ZUCCA-PRINT-BIKER-BOOTS-420",
    "price": 1450,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Furiosa Eau de Parfum",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FURIOSA-EAU-DE-PARFUM-421",
    "price": 145,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fan di Fendi 100ml",
    "brand": "Fendi",
    "sku": "FEN-FAN-DI-FENDI-100ML-422",
    "price": 130,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi L'Acquarossa Parfum",
    "brand": "Fendi",
    "sku": "FEN-FENDI-L-ACQUAROSSA-PARFUM-423",
    "price": 155,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Theorema",
    "brand": "Fendi",
    "sku": "FEN-FENDI-THEOREMA-424",
    "price": 180,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Palazzo",
    "brand": "Fendi",
    "sku": "FEN-FENDI-PALAZZO-425",
    "price": 140,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Monogram Cashmere Sweater",
    "brand": "Fendi",
    "sku": "FEN-FF-MONOGRAM-CASHMERE-SWEATER-426",
    "price": 1850,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Silk FF Karligraphy Shirt",
    "brand": "Fendi",
    "sku": "FEN-SILK-FF-KARLIGRAPHY-SHIRT-427",
    "price": 1450,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Shearling FF Jacket",
    "brand": "Fendi",
    "sku": "FEN-SHEARLING-FF-JACKET-428",
    "price": 6500,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Mink Fur Coat",
    "brand": "Fendi",
    "sku": "FEN-REVERSIBLE-MINK-FUR-COAT-429",
    "price": 18000,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Nappa Leather Pencil Skirt",
    "brand": "Fendi",
    "sku": "FEN-NAPPA-LEATHER-PENCIL-SKIRT-430",
    "price": 3200,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Cashmere Scarf",
    "brand": "Fendi",
    "sku": "FEN-FF-CASHMERE-SCARF-431",
    "price": 850,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Silk Karligraphy Wrap",
    "brand": "Fendi",
    "sku": "FEN-SILK-KARLIGRAPHY-WRAP-432",
    "price": 450,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fox Fur Stole",
    "brand": "Fendi",
    "sku": "FEN-FOX-FUR-STOLE-433",
    "price": 2800,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Silk Twilly",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-SILK-TWILLY-434",
    "price": 220,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Logo Print Poncho",
    "brand": "Fendi",
    "sku": "FEN-LOGO-PRINT-PONCHO-435",
    "price": 1350,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Personalized Wool Wrap",
    "brand": "Fendi",
    "sku": "FEN-PERSONALIZED-WOOL-WRAP-436",
    "price": 950,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Cabin Suitcase",
    "brand": "Fendi",
    "sku": "FEN-FF-CABIN-SUITCASE-437",
    "price": 3800,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zucca Canvas Duffel Bag",
    "brand": "Fendi",
    "sku": "FEN-ZUCCA-CANVAS-DUFFEL-BAG-438",
    "price": 2450,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Passport Cover",
    "brand": "Fendi",
    "sku": "FEN-FENDI-PASSPORT-COVER-439",
    "price": 420,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Nylon Backpack",
    "brand": "Fendi",
    "sku": "FEN-FF-NYLON-BACKPACK-440",
    "price": 2100,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Logo Luggage Tag",
    "brand": "Fendi",
    "sku": "FEN-LOGO-LUGGAGE-TAG-441",
    "price": 250,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Travel Set in Silk",
    "brand": "Fendi",
    "sku": "FEN-FENDI-TRAVEL-SET-IN-SILK-442",
    "price": 850,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Continental Wallet",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-CONTINENTAL-WALLET-443",
    "price": 850,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Micro Tri-fold Wallet",
    "brand": "Fendi",
    "sku": "FEN-FF-MICRO-TRI-FOLD-WALLET-444",
    "price": 590,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo Card Case",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-CARD-CASE-445",
    "price": 450,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Coin Purse",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-COIN-PURSE-446",
    "price": 650,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Key Ring",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-KEY-RING-447",
    "price": 420,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "O’Lock Zip Wallet",
    "brand": "Fendi",
    "sku": "FEN-O-LOCK-ZIP-WALLET-448",
    "price": 790,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Square Sunglasses",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SQUARE-SUNGLASSE-449",
    "price": 520,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Metal Aviators",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-METAL-AVIATORS-450",
    "price": 480,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Monogram Cat-Eye",
    "brand": "Fendi",
    "sku": "FEN-FF-MONOGRAM-CAT-EYE-451",
    "price": 450,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "O'Lock Oval Frames",
    "brand": "Fendi",
    "sku": "FEN-O-LOCK-OVAL-FRAMES-452",
    "price": 410,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Sky Opticals",
    "brand": "Fendi",
    "sku": "FEN-FENDI-SKY-OPTICALS-453",
    "price": 390,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Logo Dog Leash",
    "brand": "Fendi",
    "sku": "FEN-FF-LOGO-DOG-LEASH-454",
    "price": 450,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zucca Canvas Pet Carrier",
    "brand": "Fendi",
    "sku": "FEN-ZUCCA-CANVAS-PET-CARRIER-455",
    "price": 2600,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Casa Silk Pillow",
    "brand": "Fendi",
    "sku": "FEN-FENDI-CASA-SILK-PILLOW-456",
    "price": 550,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Motif Dog Collar",
    "brand": "Fendi",
    "sku": "FEN-FF-MOTIF-DOG-COLLAR-457",
    "price": 380,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cashmere Pet Blanket",
    "brand": "Fendi",
    "sku": "FEN-CASHMERE-PET-BLANKET-458",
    "price": 1150,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Casa Velvet Throw",
    "brand": "Fendi",
    "sku": "FEN-FENDI-CASA-VELVET-THROW-459",
    "price": 1450,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "O’Lock Bracelet in Gold Finish",
    "brand": "Fendi",
    "sku": "FEN-O-LOCK-BRACELET-IN-GOLD-FINI-460",
    "price": 590,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "F Is Fendi Stud Earrings",
    "brand": "Fendi",
    "sku": "FEN-F-IS-FENDI-STUD-EARRINGS-461",
    "price": 350,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Monogram Ring",
    "brand": "Fendi",
    "sku": "FEN-FF-MONOGRAM-RING-462",
    "price": 320,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Chain Necklace",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-CHAIN-NECKLACE-463",
    "price": 750,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "O'Lock Hair Clip",
    "brand": "Fendi",
    "sku": "FEN-O-LOCK-HAIR-CLIP-464",
    "price": 420,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Monster Eyes Leather Booties",
    "brand": "Fendi",
    "sku": "FEN-MONSTER-EYES-LEATHER-BOOTIES-465",
    "price": 380,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zucca Print Changing Bag",
    "brand": "Fendi",
    "sku": "FEN-ZUCCA-PRINT-CHANGING-BAG-466",
    "price": 1550,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Kids FF Down Jacket",
    "brand": "Fendi",
    "sku": "FEN-KIDS-FF-DOWN-JACKET-467",
    "price": 1100,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Monster Eyes Cotton Tee",
    "brand": "Fendi",
    "sku": "FEN-MONSTER-EYES-COTTON-TEE-468",
    "price": 220,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baby FF Gift Set",
    "brand": "Fendi",
    "sku": "FEN-BABY-FF-GIFT-SET-469",
    "price": 450,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "FF Baguette Reversible Belt",
    "brand": "Fendi",
    "sku": "FEN-FF-BAGUETTE-REVERSIBLE-BELT-470",
    "price": 620,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "F Is Fendi Slim Belt",
    "brand": "Fendi",
    "sku": "FEN-F-IS-FENDI-SLIM-BELT-471",
    "price": 490,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "O’Lock Buckle Belt",
    "brand": "Fendi",
    "sku": "FEN-O-LOCK-BUCKLE-BELT-472",
    "price": 550,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zucca Fabric Belt",
    "brand": "Fendi",
    "sku": "FEN-ZUCCA-FABRIC-BELT-473",
    "price": 450,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Chain Belt",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-CHAIN-BELT-474",
    "price": 850,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Baguette White Shearling with FF Embroidery",
    "brand": "Fendi",
    "sku": "FEN-MINI-BAGUETTE-WHITE-SHEARLIN-475",
    "price": 3290,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Small Pink Shearling",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-SMALL-PINK-SH-476",
    "price": 5800,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Small Nut-Colored Mink Fur",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SMALL-NUT-COLORE-477",
    "price": 7200,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Fox Fur with FF Metallic Buckle",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-FOX-FUR-WITH-FF-MET-478",
    "price": 4500,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Medium Brown Shearling",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-MEDIUM-BROWN--479",
    "price": 6400,
    "stock": 11,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Nano Fendigraphy Shearling Micro Bag",
    "brand": "Fendi",
    "sku": "FEN-NANO-FENDIGRAPHY-SHEARLING-M-480",
    "price": 1450,
    "stock": 12,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Multi-Colored FF Fabric Embroidery",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-MULTI-COLORED-FF-FA-481",
    "price": 3750,
    "stock": 13,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Petite Gradient Sunset Leather",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-PETITE-GRADIE-482",
    "price": 4300,
    "stock": 14,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Small Acid Green Python",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SMALL-ACID-GREEN-483",
    "price": 5200,
    "stock": 15,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Baguette Sequined Kaleidoscope Pattern",
    "brand": "Fendi",
    "sku": "FEN-MINI-BAGUETTE-SEQUINED-KALEI-484",
    "price": 4300,
    "stock": 16,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "C'mon Mini Bright Fuchsia Leather",
    "brand": "Fendi",
    "sku": "FEN-C-MON-MINI-BRIGHT-FUCHSIA-LE-485",
    "price": 2450,
    "stock": 17,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendigraphy Small Turquoise Calfskin",
    "brand": "Fendi",
    "sku": "FEN-FENDIGRAPHY-SMALL-TURQUOISE--486",
    "price": 2550,
    "stock": 18,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Medium Black Soft Nappa Leather",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-MEDIUM-BLACK-SOFT-N-487",
    "price": 3750,
    "stock": 19,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Large Brown FF Fabric Jacquard",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-LARGE-BROWN-FF-FABR-488",
    "price": 3300,
    "stock": 20,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Mini Baguette Chain Dove Gray Leather",
    "brand": "Fendi",
    "sku": "FEN-MINI-BAGUETTE-CHAIN-DOVE-GRA-489",
    "price": 2850,
    "stock": 21,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Re-Edition 1997 Purple Sequins",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-RE-EDITION-1997-PUR-490",
    "price": 4100,
    "stock": 22,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Pouch with Strap Sand Leather",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-POUCH-WITH-STRAP-SA-491",
    "price": 1950,
    "stock": 23,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Phone Pouch FF Canvas",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-PHONE-POUCH-FF-CANV-492",
    "price": 1350,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Medium Black Selleria Leather",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-MEDIUM-BLACK--493",
    "price": 5400,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Small Cuoio Romano Gray",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-SMALL-CUOIO-R-494",
    "price": 4800,
    "stock": 9,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Forty8 FF Fabric Pattern",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-FORTY8-FF-FAB-495",
    "price": 4100,
    "stock": 10,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Mini Blue Grainy Leather",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-MINI-BLUE-GRA-496",
    "price": 3950,
    "stock": 11,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Light Moss Green Calfskin",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-LIGHT-MOSS-GR-497",
    "price": 5200,
    "stock": 12,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Peekaboo ISeeU Messenger Bag Black Grain",
    "brand": "Fendi",
    "sku": "FEN-PEEKABOO-ISEEU-MESSENGER-BAG-498",
    "price": 3650,
    "stock": 13,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Medium Caramel Nappa Leather",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-MEDIUM-CARAMEL-N-499",
    "price": 3950,
    "stock": 14,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Small Black Leather with Gold Hardware",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SMALL-BLACK-LEAT-500",
    "price": 3450,
    "stock": 15,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Origami Medium Black Grainy Leather",
    "brand": "Fendi",
    "sku": "FEN-FENDI-ORIGAMI-MEDIUM-BLACK-G-501",
    "price": 2750,
    "stock": 16,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Origami Mini Dove Gray Calfskin",
    "brand": "Fendi",
    "sku": "FEN-FENDI-ORIGAMI-MINI-DOVE-GRAY-502",
    "price": 1950,
    "stock": 17,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Small Silver Laminated Leather",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SMALL-SILVER-LAM-503",
    "price": 3750,
    "stock": 18,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Origami Small Light Blue Leather",
    "brand": "Fendi",
    "sku": "FEN-FENDI-ORIGAMI-SMALL-LIGHT-BL-504",
    "price": 2450,
    "stock": 19,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "C'mon Medium Black Polished Leather",
    "brand": "Fendi",
    "sku": "FEN-C-MON-MEDIUM-BLACK-POLISHED--505",
    "price": 2950,
    "stock": 20,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "C'mon Small Dove Gray Leather Shoulder Bag",
    "brand": "Fendi",
    "sku": "FEN-C-MON-SMALL-DOVE-GRAY-LEATHE-506",
    "price": 2650,
    "stock": 21,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendigraphy Small Black Leather Hobo",
    "brand": "Fendi",
    "sku": "FEN-FENDIGRAPHY-SMALL-BLACK-LEAT-507",
    "price": 2550,
    "stock": 22,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendigraphy Medium FF Fabric Hobo Bag",
    "brand": "Fendi",
    "sku": "FEN-FENDIGRAPHY-MEDIUM-FF-FABRIC-508",
    "price": 2950,
    "stock": 23,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "C'mon Nano Black Leather with FF Charm",
    "brand": "Fendi",
    "sku": "FEN-C-MON-NANO-BLACK-LEATHER-WIT-509",
    "price": 1250,
    "stock": 24,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendigraphy Small Metallic Silver Leather",
    "brand": "Fendi",
    "sku": "FEN-FENDIGRAPHY-SMALL-METALLIC-S-510",
    "price": 2750,
    "stock": 8,
    "category": "Purses",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Leather Slingback",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-LEATHER-SLINGBAC-511",
    "price": 1450,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Colibrì Lite Mesh Pump",
    "brand": "Fendi",
    "sku": "FEN-COLIBR-LITE-MESH-PUMP-512",
    "price": 1150,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Baguette FF Mirror Heel",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-FF-MIRROR-HEEL-513",
    "price": 1290,
    "stock": 11,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Filo Leather Pump",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FILO-LEATHER-PUMP-514",
    "price": 1100,
    "stock": 12,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Metallic Sandal",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-METALLIC-SANDAL-515",
    "price": 1350,
    "stock": 13,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Colibrì Medium Heel Bootie",
    "brand": "Fendi",
    "sku": "FEN-COLIBR-MEDIUM-HEEL-BOOTIE-516",
    "price": 1250,
    "stock": 14,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Motif Rubber Slide",
    "brand": "Fendi",
    "sku": "FEN-FF-MOTIF-RUBBER-SLIDE-517",
    "price": 450,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Feel Leather Slide",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FEEL-LEATHER-SLIDE-518",
    "price": 850,
    "stock": 16,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Baguette FF Buckle Sandal",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-FF-BUCKLE-SANDAL-519",
    "price": 950,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Canvas Flat Mule",
    "brand": "Fendi",
    "sku": "FEN-FF-CANVAS-FLAT-MULE-520",
    "price": 790,
    "stock": 18,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Shearling Slide",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-SHEARLING-SLIDE-521",
    "price": 1150,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Leather Slide Sandal",
    "brand": "Fendi",
    "sku": "FEN-FF-LEATHER-SLIDE-SANDAL-522",
    "price": 1050,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Platform Sandal",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-PLATFORM-SANDAL-523",
    "price": 1390,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Wedge Sandal",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-WEDGE-SANDAL-524",
    "price": 1250,
    "stock": 22,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Sunshine FF Platform Mule",
    "brand": "Fendi",
    "sku": "FEN-SUNSHINE-FF-PLATFORM-MULE-525",
    "price": 990,
    "stock": 23,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Leather Chunky Sandal",
    "brand": "Fendi",
    "sku": "FEN-FF-LEATHER-CHUNKY-SANDAL-526",
    "price": 1100,
    "stock": 24,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Filo Platform Heel",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FILO-PLATFORM-HEEL-527",
    "price": 1450,
    "stock": 8,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Motif Espadrille Wedge",
    "brand": "Fendi",
    "sku": "FEN-FF-MOTIF-ESPADRILLE-WEDGE-528",
    "price": 890,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Biker II FF Leather Boot",
    "brand": "Fendi",
    "sku": "FEN-BIKER-II-FF-LEATHER-BOOT-529",
    "price": 1350,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Ankle Boot",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-ANKLE-BOOT-530",
    "price": 1750,
    "stock": 11,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Canvas Over-the-Knee Boot",
    "brand": "Fendi",
    "sku": "FEN-FF-CANVAS-OVER-THE-KNEE-BOOT-531",
    "price": 2100,
    "stock": 12,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Delfina FF Leather Bootie",
    "brand": "Fendi",
    "sku": "FEN-DELFINA-FF-LEATHER-BOOTIE-532",
    "price": 1490,
    "stock": 13,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Filo Tall Boot",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FILO-TALL-BOOT-533",
    "price": 2450,
    "stock": 14,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Baggy FF Biker Boot",
    "brand": "Fendi",
    "sku": "FEN-BAGGY-FF-BIKER-BOOT-534",
    "price": 1550,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Felt Moon Boot",
    "brand": "Fendi",
    "sku": "FEN-FF-FELT-MOON-BOOT-535",
    "price": 1250,
    "stock": 16,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendigraphy Rain Boot",
    "brand": "Fendi",
    "sku": "FEN-FENDIGRAPHY-RAIN-BOOT-536",
    "price": 950,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Shearling Snow Boot",
    "brand": "Fendi",
    "sku": "FEN-FF-SHEARLING-SNOW-BOOT-537",
    "price": 1450,
    "stock": 18,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Baguette Leather Chelsea Boot",
    "brand": "Fendi",
    "sku": "FEN-BAGUETTE-LEATHER-CHELSEA-BOO-538",
    "price": 1390,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi First Fur-Lined Bootie",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FIRST-FUR-LINED-BOOTIE-539",
    "price": 1850,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Lug Sole Combat Boot",
    "brand": "Fendi",
    "sku": "FEN-FF-LUG-SOLE-COMBAT-BOOT-540",
    "price": 1290,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Flow Suede Sneaker",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FLOW-SUEDE-SNEAKER-541",
    "price": 950,
    "stock": 22,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Match Leather Low-Top",
    "brand": "Fendi",
    "sku": "FEN-FENDI-MATCH-LEATHER-LOW-TOP-542",
    "price": 930,
    "stock": 23,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF Mesh Tech Sneaker",
    "brand": "Fendi",
    "sku": "FEN-FF-MESH-TECH-SNEAKER-543",
    "price": 890,
    "stock": 24,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Faster Knit Sneaker",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FASTER-KNIT-SNEAKER-544",
    "price": 1100,
    "stock": 8,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "FF O'Lock Runner Sneaker",
    "brand": "Fendi",
    "sku": "FEN-FF-O-LOCK-RUNNER-SNEAKER-545",
    "price": 1050,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Fendi Flow Mixed Media Sneaker",
    "brand": "Fendi",
    "sku": "FEN-FENDI-FLOW-MIXED-MEDIA-SNEAK-546",
    "price": 990,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Bamboo 1947 Small Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-BAMBOO-1947-SMALL-BAG-547",
    "price": 4500,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Bamboo 1947 Mini Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-BAMBOO-1947-MINI-BAG-548",
    "price": 3200,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Horsebit 1955 Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-HORSEBIT-1955-SHOULDER-549",
    "price": 3250,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Horsebit 1955 Mini Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-HORSEBIT-1955-MINI-BAG-550",
    "price": 1450,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Marmont Mini Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-GG-MARMONT-MINI-SHOULDER-BAG-551",
    "price": 1550,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Gg Marmont Leather Camera Crossbody Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-GG-MARMONT-LEATHER-CAM-552",
    "price": 1050,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci GG Marmont Small Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-GG-MARMONT-SMALL-SHOUL-553",
    "price": 2600,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci GG-Marmont Quilted Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-GG-MARMONT-QUILTED-SHO-554",
    "price": 2800,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Medium Ophidia GG Tote",
    "brand": "Gucci",
    "sku": "GUC-MEDIUM-OPHIDIA-GG-TOTE-555",
    "price": 1750,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Ophidia GG Tote",
    "brand": "Gucci",
    "sku": "GUC-SMALL-OPHIDIA-GG-TOTE-556",
    "price": 1550,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Marmont Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-GG-MARMONT-SHOULDER-BAG-557",
    "price": 2550,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Marmont Small Matelassé Bag",
    "brand": "Gucci",
    "sku": "GUC-GG-MARMONT-SMALL-MATELASS-BA-558",
    "price": 1900,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Flora Gorgeous Gardenia 100ml",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-FLORA-GORGEOUS-GARDENI-559",
    "price": 168,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Guilty Elixir de Parfum",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-GUILTY-ELIXIR-DE-PARFU-560",
    "price": 183,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Bloom Eau de Parfum 100ml",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-BLOOM-EAU-DE-PARFUM-10-561",
    "price": 165,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Men's Re-Web Low-Top Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-RE-WEB-LOW-TOP-SNEAKER-562",
    "price": 890,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Women's Re-Web Sneaker",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-RE-WEB-SNEAKER-563",
    "price": 890,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Icon 18k Thin Band",
    "brand": "Gucci",
    "sku": "GUC-ICON-18K-THIN-BAND-564",
    "price": 950,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Interlocking G Pendant Necklace",
    "brand": "Gucci",
    "sku": "GUC-INTERLOCKING-G-PENDANT-NECKL-565",
    "price": 1850,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Ancora Wool Cardigan",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-ANCORA-WOOL-CARDIGAN-566",
    "price": 2300,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cotton Jersey Hooded Sweatshirt",
    "brand": "Gucci",
    "sku": "GUC-COTTON-JERSEY-HOODED-SWEATSH-567",
    "price": 1450,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Ace Sneaker with Web",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-ACE-SNEAKER-WITH-WEB-568",
    "price": 850,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Screener GG Sneaker",
    "brand": "Gucci",
    "sku": "GUC-SCREENER-GG-SNEAKER-569",
    "price": 930,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Men's MAC80 Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-MAC80-SNEAKER-570",
    "price": 950,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Basket High-Top Sneaker",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-BASKET-HIGH-TOP-SNEAKE-571",
    "price": 1100,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Run Sneaker",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-RUN-SNEAKER-572",
    "price": 920,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Women's Platform Perforated Slide",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-PLATFORM-PERFORATED--573",
    "price": 620,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Interlocking G Rubber Slide",
    "brand": "Gucci",
    "sku": "GUC-INTERLOCKING-G-RUBBER-SLIDE-574",
    "price": 450,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Men's Horsebit Leather Slipper",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-HORSEBIT-LEATHER-SLIPP-575",
    "price": 890,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Women's GG Matelassé Slide",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-GG-MATELASS-SLIDE-576",
    "price": 750,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Ophidia GG Suitcase",
    "brand": "Gucci",
    "sku": "GUC-OPHIDIA-GG-SUITCASE-577",
    "price": 3980,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Savoy Duffel Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-SAVOY-DUFFEL-BAG-578",
    "price": 2450,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Men's GG Supreme Messenger",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-GG-SUPREME-MESSENGER-579",
    "price": 1300,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Ophidia Small Backpack",
    "brand": "Gucci",
    "sku": "GUC-OPHIDIA-SMALL-BACKPACK-580",
    "price": 2100,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Porter Cabin Trolley",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-PORTER-CABIN-TROLLEY-581",
    "price": 3500,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Supreme Belt Bag",
    "brand": "Gucci",
    "sku": "GUC-GG-SUPREME-BELT-BAG-582",
    "price": 1150,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Jackie 1961 Small Bag",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-JACKIE-1961-SMALL-BAG-583",
    "price": 2950,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dionysus Small Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-DIONYSUS-SMALL-SHOULDER-BAG-584",
    "price": 3100,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jackie 1961 Mini Bag",
    "brand": "Gucci",
    "sku": "GUC-JACKIE-1961-MINI-BAG-585",
    "price": 2400,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dionysus GG Super Mini",
    "brand": "Gucci",
    "sku": "GUC-DIONYSUS-GG-SUPER-MINI-586",
    "price": 1100,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Aphrodite Small Shoulder Bag",
    "brand": "Gucci",
    "sku": "GUC-APHRODITE-SMALL-SHOULDER-BAG-587",
    "price": 1980,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Marmont Wide Leather Belt",
    "brand": "Gucci",
    "sku": "GUC-GG-MARMONT-WIDE-LEATHER-BELT-588",
    "price": 520,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Horsebit Slim Belt",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-HORSEBIT-SLIM-BELT-589",
    "price": 490,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Interlocking G Web Belt",
    "brand": "Gucci",
    "sku": "GUC-INTERLOCKING-G-WEB-BELT-590",
    "price": 490,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Blondie Leather Belt",
    "brand": "Gucci",
    "sku": "GUC-BLONDIE-LEATHER-BELT-591",
    "price": 590,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible GG Belt",
    "brand": "Gucci",
    "sku": "GUC-REVERSIBLE-GG-BELT-592",
    "price": 620,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Rectangular Sunglasses",
    "brand": "Gucci",
    "sku": "GUC-GG-RECTANGULAR-SUNGLASSES-593",
    "price": 420,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mask Sunglasses with Web",
    "brand": "Gucci",
    "sku": "GUC-MASK-SUNGLASSES-WITH-WEB-594",
    "price": 565,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Aviator Metal Sunglasses",
    "brand": "Gucci",
    "sku": "GUC-AVIATOR-METAL-SUNGLASSES-595",
    "price": 535,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Oversized Square Sunglasses",
    "brand": "Gucci",
    "sku": "GUC-OVERSIZED-SQUARE-SUNGLASSES-596",
    "price": 495,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cat-eye Injection Sunglasses",
    "brand": "Gucci",
    "sku": "GUC-CAT-EYE-INJECTION-SUNGLASSES-597",
    "price": 400,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Men's Navigator Sunglasses",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-NAVIGATOR-SUNGLASSES-598",
    "price": 510,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Round Frame Metal Glasses",
    "brand": "Gucci",
    "sku": "GUC-ROUND-FRAME-METAL-GLASSES-599",
    "price": 435,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Square Frame Opticals",
    "brand": "Gucci",
    "sku": "GUC-SQUARE-FRAME-OPTICALS-600",
    "price": 450,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Marmont Card Case",
    "brand": "Gucci",
    "sku": "GUC-GG-MARMONT-CARD-CASE-601",
    "price": 320,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Ophidia GG Key Case",
    "brand": "Gucci",
    "sku": "GUC-OPHIDIA-GG-KEY-CASE-602",
    "price": 430,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Horsebit 1955 Card Case Wallet",
    "brand": "Gucci",
    "sku": "GUC-HORSEBIT-1955-CARD-CASE-WALL-603",
    "price": 550,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dionysus GG Coin Purse",
    "brand": "Gucci",
    "sku": "GUC-DIONYSUS-GG-COIN-PURSE-604",
    "price": 590,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gucci Blondie Compact Wallet",
    "brand": "Gucci",
    "sku": "GUC-GUCCI-BLONDIE-COMPACT-WALLET-605",
    "price": 690,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "GG Supreme Zip Wallet",
    "brand": "Gucci",
    "sku": "GUC-GG-SUPREME-ZIP-WALLET-606",
    "price": 750,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Women's Interlocking G Slide Sandal",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-INTERLOCKING-G-SLIDE-607",
    "price": 550,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Horsebit Leather Sandal",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-HORSEBIT-LEATHER-SAN-608",
    "price": 990,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Thong Sandal with Double G",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-THONG-SANDAL-WITH-DO-609",
    "price": 880,
    "stock": 22,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Slide Sandal with Horsebit",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-SLIDE-SANDAL-WITH-HO-610",
    "price": 770,
    "stock": 23,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Platform Sandal with Double G",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-PLATFORM-SANDAL-WITH-611",
    "price": 1390,
    "stock": 24,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Crystal Bombshell Slide",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-CRYSTAL-BOMBSHELL-SL-612",
    "price": 1650,
    "stock": 8,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Jordaan Horsebit Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-JORDAAN-HORSEBIT-LOA-613",
    "price": 1090,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Brixton Leather Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-BRIXTON-LEATHER-LOAF-614",
    "price": 1090,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Ragazzo GG Canvas Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-RAGAZZO-GG-CANVAS-LO-615",
    "price": 1090,
    "stock": 11,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Horsebit 1953 Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-HORSEBIT-1953-LOAFER-616",
    "price": 1090,
    "stock": 12,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Lug-Sole Horsebit Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-LUG-SOLE-HORSEBIT-LO-617",
    "price": 1270,
    "stock": 13,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's GG Crystal Jordaan Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-GG-CRYSTAL-JORDAAN-L-618",
    "price": 1590,
    "stock": 14,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Signora Leather Bootie",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-SIGNORA-LEATHER-BOOT-619",
    "price": 1650,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's GG Monogram Combat Boots",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-GG-MONOGRAM-COMBAT-B-620",
    "price": 1550,
    "stock": 16,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Bombshell GG Canvas Boot",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-BOMBSHELL-GG-CANVAS--621",
    "price": 2500,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Horsebit Suede Ankle Boot",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-HORSEBIT-SUEDE-ANKLE-622",
    "price": 1550,
    "stock": 18,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Vittoria Leather Bootie",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-VITTORIA-LEATHER-BOO-623",
    "price": 1700,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Pointed-Toe Knee-High Boot",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-POINTED-TOE-KNEE-HIG-624",
    "price": 1724,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Ace Leather Sneaker with Web",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-ACE-LEATHER-SNEAKER-WI-625",
    "price": 830,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Stretch Leather Low-Top Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-STRETCH-LEATHER-LOW-TO-626",
    "price": 980,
    "stock": 22,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Re-Web Mixed Media Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-RE-WEB-MIXED-MEDIA-SNE-627",
    "price": 1190,
    "stock": 23,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Screener GG Canvas Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-SCREENER-GG-CANVAS-SNE-628",
    "price": 1060,
    "stock": 24,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Rhyton Logo Leather Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-RHYTON-LOGO-LEATHER-SN-629",
    "price": 1166,
    "stock": 8,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Interlocking G Mesh Sneaker",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-INTERLOCKING-G-MESH-SN-630",
    "price": 920,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Horsebit 1953 Leather Loafer",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-HORSEBIT-1953-LEATHER--631",
    "price": 1090,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Jordaan Horsebit Loafer",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-JORDAAN-HORSEBIT-LOAFE-632",
    "price": 1050,
    "stock": 11,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Terenze Horsebit Loafer",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-TERENZE-HORSEBIT-LOAFE-633",
    "price": 1150,
    "stock": 12,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's GG Supreme Leather Loafer",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-GG-SUPREME-LEATHER-LOA-634",
    "price": 1100,
    "stock": 13,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's William Penny Loafer",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-WILLIAM-PENNY-LOAFER-635",
    "price": 1190,
    "stock": 14,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Men's Next Studded Horsebit Loafer",
    "brand": "Gucci",
    "sku": "GUC-MEN-S-NEXT-STUDDED-HORSEBIT--636",
    "price": 1690,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Horsebit Mid-Heel Pump",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-HORSEBIT-MID-HEEL-PU-637",
    "price": 990,
    "stock": 16,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Blondie Interlocking G Sandal",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-BLONDIE-INTERLOCKING-638",
    "price": 960,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Loafer Pump with Horsebit",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-LOAFER-PUMP-WITH-HOR-639",
    "price": 1120,
    "stock": 18,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's GG-Patterned Heeled Loafer",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-GG-PATTERNED-HEELED--640",
    "price": 990,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's 75mm Leather Pump",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-75MM-LEATHER-PUMP-641",
    "price": 1490,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Women's Crystal Embellished Mesh Heel",
    "brand": "Gucci",
    "sku": "GUC-WOMEN-S-CRYSTAL-EMBELLISHED--642",
    "price": 1250,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Declaration Men Eau De Toilette 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-DECLARATION-MEN-EAU--643",
    "price": 134,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Declaration Parfum 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-DECLARATION-PARFUM-3-644",
    "price": 155,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Declaration Haute Fraicheur 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-DECLARATION-HAUTE-FR-645",
    "price": 134,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Pasha De Cartier Eau De Toilette 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PASHA-DE-CARTIER-EAU-646",
    "price": 134,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Pasha de Cartier Limited Edition 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PASHA-DE-CARTIER-LIM-647",
    "price": 168,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Pasha De Cartier Edition Noire 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PASHA-DE-CARTIER-EDI-648",
    "price": 134,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pasha De Edition Noire Sport Cartier 3.3 fl oz",
    "brand": "Chanel",
    "sku": "CHA-PASHA-DE-EDITION-NOIRE-SPORT-649",
    "price": 134,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pasha De Cartier 5.1 oz",
    "brand": "Chanel",
    "sku": "CHA-PASHA-DE-CARTIER-5-1-OZ-650",
    "price": 196,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier La Panthère Eau de Parfum 1.6 oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-LA-PANTH-RE-EAU-DE-P-651",
    "price": 131,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Must de Cartier Parfum 1.6 oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-MUST-DE-CARTIER-PARF-652",
    "price": 177,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rivières de Cartier Allègresse 3.3 oz",
    "brand": "Chanel",
    "sku": "CHA-RIVI-RES-DE-CARTIER-ALL-GRES-653",
    "price": 118,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Women’s Discovery Set 3 x 10 ml",
    "brand": "Chanel",
    "sku": "CHA-WOMEN-S-DISCOVERY-SET-3-X-10-654",
    "price": 117,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Baiser Volé 5.1oz",
    "brand": "Chanel",
    "sku": "CHA-BAISER-VOL-5-1OZ-655",
    "price": 180,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rivieres de Cartier Luxuriance by Cartier 3.3 oz",
    "brand": "Chanel",
    "sku": "CHA-RIVIERES-DE-CARTIER-LUXURIAN-656",
    "price": 116,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Panthère CT0596S Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PANTH-RE-CT0596S-SUN-657",
    "price": 1295,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-SUNGLASSES-658",
    "price": 1295,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Eyewear Panthère De Cartier Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-EYEWEAR-PANTH-RE-DE--659",
    "price": 1495,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Santos Evolution Pilot Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-SANTOS-EVOLUTION-PIL-660",
    "price": 1745,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Santos de Cartier Men's Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-SANTOS-DE-CARTIER-ME-661",
    "price": 1495,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier CT0393S Sunglasses Men",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-CT0393S-SUNGLASSES-M-662",
    "price": 1595,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Eyewear Signature C Decor Cat-eye",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-EYEWEAR-SIGNATURE-C--663",
    "price": 1295,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Eyewear Santos de Cartier Aviator-Style Sunglasses",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-EYEWEAR-SANTOS-DE-CA-664",
    "price": 1195,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Panthère de Mini Cross-Body Bag",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PANTH-RE-DE-MINI-CRO-665",
    "price": 2950,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Panthère Double de Top-Handle Bag",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PANTH-RE-DOUBLE-DE-T-666",
    "price": 4950,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Panthère C Bag",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PANTH-RE-C-BAG-667",
    "price": 4330,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Panthère Double Hobo Bag",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PANTH-RE-DOUBLE-HOBO-668",
    "price": 5550,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Micro Panthère C Bag",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-MICRO-PANTH-RE-C-BAG-669",
    "price": 2090,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "70s / 80s Chloe for Cartier",
    "brand": "Chanel",
    "sku": "CHA-70S-80S-CHLOE-FOR-CARTIER-670",
    "price": 799,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Vintage 1960s Jacque Cartier Silk Suit",
    "brand": "Chanel",
    "sku": "CHA-VINTAGE-1960S-JACQUE-CARTIER-671",
    "price": 105,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier 1960s Gina Teresa Wool Mod Two-Piece",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-1960S-GINA-TERESA-WO-672",
    "price": 88,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jacques Cartier Women's Fux Fur Jacket",
    "brand": "Chanel",
    "sku": "CHA-JACQUES-CARTIER-WOMEN-S-FUX--673",
    "price": 120,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Panthère Greenhouse Silk-twill Bandeau",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PANTH-RE-GREENHOUSE--674",
    "price": 250,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier 90 scarf",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-90-SCARF-675",
    "price": 620,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Bandeau with Panthere Dots",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-BANDEAU-WITH-PANTHER-676",
    "price": 230,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Precious Mundanity Bandeau",
    "brand": "Chanel",
    "sku": "CHA-PRECIOUS-MUNDANITY-BANDEAU-677",
    "price": 250,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Strapless Convertible Dress",
    "brand": "Chanel",
    "sku": "CHA-STRAPLESS-CONVERTIBLE-DRESS-678",
    "price": 2700,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pallas Couture",
    "brand": "Chanel",
    "sku": "CHA-PALLAS-COUTURE-679",
    "price": 3200,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Revitalizing Facial Skincare + Tonifyng All Over",
    "brand": "Chanel",
    "sku": "CHA-REVITALIZING-FACIAL-SKINCARE-680",
    "price": 24.99,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Alastin C-Radical Defense Antioxidant Serum",
    "brand": "Chanel",
    "sku": "CHA-ALASTIN-C-RADICAL-DEFENSE-AN-681",
    "price": 41.15,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Les Bases a Perfumer Crème 6.76 oz",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-LES-BASES-A-PERFUMER-682",
    "price": 179.95,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jacques Cartier Paris Fit & Flare Swing Faux Fur",
    "brand": "Chanel",
    "sku": "CHA-JACQUES-CARTIER-PARIS-FIT-FL-683",
    "price": 189,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Blue Wool Vintage Coat",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-BLUE-WOOL-VINTAGE-CO-684",
    "price": 302,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Silk Artistic Tree Print Long Coat",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-SILK-ARTISTIC-TREE-P-685",
    "price": 100,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jacques Cartier Paris Persian Lamb Swing Coat",
    "brand": "Chanel",
    "sku": "CHA-JACQUES-CARTIER-PARIS-PERSIA-686",
    "price": 179,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Tank Must watch wsta0136",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-TANK-MUST-WATCH-WSTA-687",
    "price": 3800,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Tank Française Watch Large",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-TANK-FRAN-AISE-WATCH-688",
    "price": 6750,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Tank Louis Rose Gold Diamond Watch",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-TANK-LOUIS-ROSE-GOLD-689",
    "price": 47400,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Love ring small",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-LOVE-RING-SMALL-690",
    "price": 1420,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LOVE ring, classic model",
    "brand": "Chanel",
    "sku": "CHA-LOVE-RING-CLASSIC-MODEL-691",
    "price": 2260,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LOVE Wedding Band",
    "brand": "Chanel",
    "sku": "CHA-LOVE-WEDDING-BAND-692",
    "price": 1170,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Vintage Pasha De Cartier After Shave 100ml ",
    "brand": "Chanel",
    "sku": "CHA-VINTAGE-PASHA-DE-CARTIER-AFT-693",
    "price": 242.98,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Declaration After Shave Lotion",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-DECLARATION-AFTER-SH-694",
    "price": 86,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Roadster Aftershave Lotion",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-ROADSTER-AFTERSHAVE--695",
    "price": 199.5,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Pasha Noir De Absolu Parfum Men",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-PASHA-NOIR-DE-ABSOLU-696",
    "price": 142.8,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Declaration Men Eau De Toilette",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-DECLARATION-MEN-EAU--697",
    "price": 134,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Santos De Cartier",
    "brand": "Chanel",
    "sku": "CHA-SANTOS-DE-CARTIER-698",
    "price": 289.9,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier - Trinity ring, Small Model - Ring",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-TRINITY-RING-SMALL-M-699",
    "price": 1700,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Trinity ring, classic model",
    "brand": "Chanel",
    "sku": "CHA-TRINITY-RING-CLASSIC-MODEL-700",
    "price": 2350,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Trinity ring, large model, paved",
    "brand": "Chanel",
    "sku": "CHA-TRINITY-RING-LARGE-MODEL-PAV-701",
    "price": 4100,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Juste un Clou, Small Model Nail Bracelet",
    "brand": "Chanel",
    "sku": "CHA-JUSTE-UN-CLOU-SMALL-MODEL-NA-702",
    "price": 3850,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Juste un Clou, Classic Model Bracelet",
    "brand": "Chanel",
    "sku": "CHA-JUSTE-UN-CLOU-CLASSIC-MODEL--703",
    "price": 8050,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Juste un Clou Diamond Necklace",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-JUSTE-UN-CLOU-DIAMON-704",
    "price": 4950,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Juste Un Clou Pendant Necklace",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-JUSTE-UN-CLOU-PENDAN-705",
    "price": 5328,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier Clash de Cartier Necklace",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-CLASH-DE-CARTIER-NEC-706",
    "price": 4800,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier d'Amour pendant, diamond, mini model",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-D-AMOUR-PENDANT-DIAM-707",
    "price": 1230,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier d'Amour Yellow Gold Diamond Necklace",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-D-AMOUR-YELLOW-GOLD--708",
    "price": 1530,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cartier d'Amour pendant, brilliant-cut diamond",
    "brand": "Chanel",
    "sku": "CHA-CARTIER-D-AMOUR-PENDANT-BRIL-709",
    "price": 2490,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Medium Shoulder Bag",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-MEDIUM-SHOULDER-BAG-710",
    "price": 348,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Large Tote",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-LARGE-TOTE-711",
    "price": 398,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Commuter Bag",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-COMMUTER-BAG-712",
    "price": 398,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Medium Saddle Bag",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-MEDIUM-SADDLE-BAG-713",
    "price": 298,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Mini Crossbody",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-MINI-CROSSBODY-714",
    "price": 198,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Zip Slim Wallet",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-ZIP-SLIM-WALLET-715",
    "price": 148,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sam Icon Nylon Small Tote",
    "brand": "Kate Spade",
    "sku": "KAT-SAM-ICON-NYLON-SMALL-TOTE-716",
    "price": 248,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sam Icon Leather Mini Tote",
    "brand": "Kate Spade",
    "sku": "KAT-SAM-ICON-LEATHER-MINI-TOTE-717",
    "price": 248,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sam Icon Crystal Embellished Mini",
    "brand": "Kate Spade",
    "sku": "KAT-SAM-ICON-CRYSTAL-EMBELLISHED-718",
    "price": 448,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sam Icon Patent Leather Shoulder Bag",
    "brand": "Kate Spade",
    "sku": "KAT-SAM-ICON-PATENT-LEATHER-SHOU-719",
    "price": 348,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sam Icon Embroidered Floral Tote",
    "brand": "Kate Spade",
    "sku": "KAT-SAM-ICON-EMBROIDERED-FLORAL--720",
    "price": 378,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sam Icon Spazzolato Box Bag",
    "brand": "Kate Spade",
    "sku": "KAT-SAM-ICON-SPAZZOLATO-BOX-BAG-721",
    "price": 328,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spade Flower Monogram Manhattan Tote",
    "brand": "Kate Spade",
    "sku": "KAT-SPADE-FLOWER-MONOGRAM-MANHAT-722",
    "price": 398,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spade Flower Coated Canvas Case",
    "brand": "Kate Spade",
    "sku": "KAT-SPADE-FLOWER-COATED-CANVAS-C-723",
    "price": 128,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spade Flower Hobo Bag",
    "brand": "Kate Spade",
    "sku": "KAT-SPADE-FLOWER-HOBO-BAG-724",
    "price": 358,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spade Flower Jacquard Drum Bag",
    "brand": "Kate Spade",
    "sku": "KAT-SPADE-FLOWER-JACQUARD-DRUM-B-725",
    "price": 298,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spade Flower Card Holder",
    "brand": "Kate Spade",
    "sku": "KAT-SPADE-FLOWER-CARD-HOLDER-726",
    "price": 78,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Katy Textured Leather Shoulder Bag",
    "brand": "Kate Spade",
    "sku": "KAT-KATY-TEXTURED-LEATHER-SHOULD-727",
    "price": 358,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Katy Medium Top-Handle Bag",
    "brand": "Kate Spade",
    "sku": "KAT-KATY-MEDIUM-TOP-HANDLE-BAG-728",
    "price": 398,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Morgan Card Holder",
    "brand": "Kate Spade",
    "sku": "KAT-MORGAN-CARD-HOLDER-729",
    "price": 78,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Morgan Compact Wallet",
    "brand": "Kate Spade",
    "sku": "KAT-MORGAN-COMPACT-WALLET-730",
    "price": 148,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Morgan Flap Crossbody",
    "brand": "Kate Spade",
    "sku": "KAT-MORGAN-FLAP-CROSSBODY-731",
    "price": 198,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Morgan Zip-Around Continental Wallet",
    "brand": "Kate Spade",
    "sku": "KAT-MORGAN-ZIP-AROUND-CONTINENTA-732",
    "price": 198,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Veronica Ballet Flats",
    "brand": "Kate Spade",
    "sku": "KAT-VERONICA-BALLET-FLATS-733",
    "price": 198,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Maren Leather Pumps",
    "brand": "Kate Spade",
    "sku": "KAT-MAREN-LEATHER-PUMPS-734",
    "price": 228,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Keds x Kate Spade Glitter Sneakers",
    "brand": "Kate Spade",
    "sku": "KAT-KEDS-X-KATE-SPADE-GLITTER-SN-735",
    "price": 95,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pizazz Bow Sandals",
    "brand": "Kate Spade",
    "sku": "KAT-PIZAZZ-BOW-SANDALS-736",
    "price": 148,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Amelia Jewel Mules",
    "brand": "Kate Spade",
    "sku": "KAT-AMELIA-JEWEL-MULES-737",
    "price": 178,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fete Platform Sandals",
    "brand": "Kate Spade",
    "sku": "KAT-FETE-PLATFORM-SANDALS-738",
    "price": 198,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Kate Spade New York Eau de Parfum 100ml",
    "brand": "Kate Spade",
    "sku": "KAT-KATE-SPADE-NEW-YORK-EAU-DE-P-739",
    "price": 99,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bloom Eau de Toilette 100ml",
    "brand": "Kate Spade",
    "sku": "KAT-BLOOM-EAU-DE-TOILETTE-100ML-740",
    "price": 85,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cherish Eau de Parfum 100ml",
    "brand": "Kate Spade",
    "sku": "KAT-CHERISH-EAU-DE-PARFUM-100ML-741",
    "price": 105,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sparkle Intense Parfum",
    "brand": "Kate Spade",
    "sku": "KAT-SPARKLE-INTENSE-PARFUM-742",
    "price": 110,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Kate Spade Body Lotion",
    "brand": "Kate Spade",
    "sku": "KAT-KATE-SPADE-BODY-LOTION-743",
    "price": 45,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Hudson Medium Messenger",
    "brand": "Kate Spade",
    "sku": "KAT-HUDSON-MEDIUM-MESSENGER-744",
    "price": 298,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gramercy Medium Flap Shoulder Bag",
    "brand": "Kate Spade",
    "sku": "KAT-GRAMERCY-MEDIUM-FLAP-SHOULDE-745",
    "price": 398,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Hudson Convertible Crossbody",
    "brand": "Kate Spade",
    "sku": "KAT-HUDSON-CONVERTIBLE-CROSSBODY-746",
    "price": 248,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gramercy Textured Leather Mini Bag",
    "brand": "Kate Spade",
    "sku": "KAT-GRAMERCY-TEXTURED-LEATHER-MI-747",
    "price": 278,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Hudson Large Work Tote",
    "brand": "Kate Spade",
    "sku": "KAT-HUDSON-LARGE-WORK-TOTE-748",
    "price": 348,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Manhattan Large Tote",
    "brand": "Kate Spade",
    "sku": "KAT-MANHATTAN-LARGE-TOTE-749",
    "price": 498,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chelsea Weekender Duffle",
    "brand": "Kate Spade",
    "sku": "KAT-CHELSEA-WEEKENDER-DUFFLE-750",
    "price": 328,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Universal 15-inch Laptop Sleeve",
    "brand": "Kate Spade",
    "sku": "KAT-UNIVERSAL-15-INCH-LAPTOP-SLE-751",
    "price": 98,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Chelsea Nylon Backpack",
    "brand": "Kate Spade",
    "sku": "KAT-CHELSEA-NYLON-BACKPACK-752",
    "price": 248,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Staci Travel Wallet",
    "brand": "Kate Spade",
    "sku": "KAT-STACI-TRAVEL-WALLET-753",
    "price": 188,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Jeweled Luggage Tag",
    "brand": "Kate Spade",
    "sku": "KAT-JEWELED-LUGGAGE-TAG-754",
    "price": 35,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pizza Slice 3D Clutch",
    "brand": "Kate Spade",
    "sku": "KAT-PIZZA-SLICE-3D-CLUTCH-755",
    "price": 448,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Champagne Bottle Crossbody",
    "brand": "Kate Spade",
    "sku": "KAT-CHAMPAGNE-BOTTLE-CROSSBODY-756",
    "price": 498,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pitter Patter Heart Bag",
    "brand": "Kate Spade",
    "sku": "KAT-PITTER-PATTER-HEART-BAG-757",
    "price": 398,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lemon Drop Straw Tote",
    "brand": "Kate Spade",
    "sku": "KAT-LEMON-DROP-STRAW-TOTE-758",
    "price": 348,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Wicker Elephant Bag",
    "brand": "Kate Spade",
    "sku": "KAT-WICKER-ELEPHANT-BAG-759",
    "price": 398,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Boxcar 3D Bag",
    "brand": "Kate Spade",
    "sku": "KAT-BOXCAR-3D-BAG-760",
    "price": 498,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Heritage Spade Thin Bangle",
    "brand": "Kate Spade",
    "sku": "KAT-HERITAGE-SPADE-THIN-BANGLE-761",
    "price": 98,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Candy Shop Pearl Drop Earrings",
    "brand": "Kate Spade",
    "sku": "KAT-CANDY-SHOP-PEARL-DROP-EARRIN-762",
    "price": 78,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Park Row Silicone Watch",
    "brand": "Kate Spade",
    "sku": "KAT-PARK-ROW-SILICONE-WATCH-763",
    "price": 150,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Social Butterfly Pendant",
    "brand": "Kate Spade",
    "sku": "KAT-SOCIAL-BUTTERFLY-PENDANT-764",
    "price": 128,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pave Heart Ring",
    "brand": "Kate Spade",
    "sku": "KAT-PAVE-HEART-RING-765",
    "price": 68,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Scallop Apple Watch Band",
    "brand": "Kate Spade",
    "sku": "KAT-SCALLOP-APPLE-WATCH-BAND-766",
    "price": 100,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Gayla Square Oversized",
    "brand": "Kate Spade",
    "sku": "KAT-GAYLA-SQUARE-OVERSIZED-767",
    "price": 160,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Adelais Cat Eye Frames",
    "brand": "Kate Spade",
    "sku": "KAT-ADELAIS-CAT-EYE-FRAMES-768",
    "price": 185,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zonno Gradient Aviators",
    "brand": "Kate Spade",
    "sku": "KAT-ZONNO-GRADIENT-AVIATORS-769",
    "price": 175,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Fayanne Round Frames",
    "brand": "Kate Spade",
    "sku": "KAT-FAYANNE-ROUND-FRAMES-770",
    "price": 160,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Ayleen Rectangular Sunglasses",
    "brand": "Kate Spade",
    "sku": "KAT-AYLEEN-RECTANGULAR-SUNGLASSE-771",
    "price": 150,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Staci Bifold Wallet",
    "brand": "Kate Spade",
    "sku": "KAT-STACI-BIFOLD-WALLET-772",
    "price": 158,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Madison Zip Around Wallet",
    "brand": "Kate Spade",
    "sku": "KAT-MADISON-ZIP-AROUND-WALLET-773",
    "price": 188,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Spencer Card Holder",
    "brand": "Kate Spade",
    "sku": "KAT-SPENCER-CARD-HOLDER-774",
    "price": 68,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Dumont Passport Holder",
    "brand": "Kate Spade",
    "sku": "KAT-DUMONT-PASSPORT-HOLDER-775",
    "price": 98,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Knott Key Pouch",
    "brand": "Kate Spade",
    "sku": "KAT-KNOTT-KEY-POUCH-776",
    "price": 88,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Morgan L-Zip Wristlet",
    "brand": "Kate Spade",
    "sku": "KAT-MORGAN-L-ZIP-WRISTLET-777",
    "price": 118,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "iPhone 15 MagSafe Flower Case",
    "brand": "Kate Spade",
    "sku": "KAT-IPHONE-15-MAGSAFE-FLOWER-CAS-778",
    "price": 55,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "AirPods Pro Silicone Case",
    "brand": "Kate Spade",
    "sku": "KAT-AIRPODS-PRO-SILICONE-CASE-779",
    "price": 45,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Scallop Laptop Bag",
    "brand": "Kate Spade",
    "sku": "KAT-SCALLOP-LAPTOP-BAG-780",
    "price": 148,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "MagSafe Wallet Stand",
    "brand": "Kate Spade",
    "sku": "KAT-MAGSAFE-WALLET-STAND-781",
    "price": 45,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "iPad Pro Folio Case",
    "brand": "Kate Spade",
    "sku": "KAT-IPAD-PRO-FOLIO-CASE-782",
    "price": 85,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Larabee Dot Crystal Vase",
    "brand": "Kate Spade",
    "sku": "KAT-LARABEE-DOT-CRYSTAL-VASE-783",
    "price": 75,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Take Note Journal Set",
    "brand": "Kate Spade",
    "sku": "KAT-TAKE-NOTE-JOURNAL-SET-784",
    "price": 24,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Insulated Tumbler with Straw",
    "brand": "Kate Spade",
    "sku": "KAT-INSULATED-TUMBLER-WITH-STRAW-785",
    "price": 20,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Polka Dot Picture Frame",
    "brand": "Kate Spade",
    "sku": "KAT-POLKA-DOT-PICTURE-FRAME-786",
    "price": 45,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Scallop Serving Bowl",
    "brand": "Kate Spade",
    "sku": "KAT-SCALLOP-SERVING-BOWL-787",
    "price": 65,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Reversible Spade Leather Belt",
    "brand": "Kate Spade",
    "sku": "KAT-REVERSIBLE-SPADE-LEATHER-BEL-788",
    "price": 88,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Silk Square Floral Scarf",
    "brand": "Kate Spade",
    "sku": "KAT-SILK-SQUARE-FLORAL-SCARF-789",
    "price": 98,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bow Skinny Belt",
    "brand": "Kate Spade",
    "sku": "KAT-BOW-SKINNY-BELT-790",
    "price": 68,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Signature Spade Poncho",
    "brand": "Kate Spade",
    "sku": "KAT-SIGNATURE-SPADE-PONCHO-791",
    "price": 148,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cashmere Blend Beanie",
    "brand": "Kate Spade",
    "sku": "KAT-CASHMERE-BLEND-BEANIE-792",
    "price": 78,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bunnie Suede Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BUNNIE-SUEDE-PUMP-793",
    "price": 278,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Deco Bow Ballet Pump",
    "brand": "Kate Spade",
    "sku": "KAT-DECO-BOW-BALLET-PUMP-794",
    "price": 248,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bowdie Cap Toe Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BOWDIE-CAP-TOE-PUMP-795",
    "price": 228,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bowdie Slingback Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BOWDIE-SLINGBACK-PUMP-796",
    "price": 268,
    "stock": 22,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bunnie Crinkle Patent Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BUNNIE-CRINKLE-PATENT-PUMP-797",
    "price": 278,
    "stock": 23,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Renata Bow Pump",
    "brand": "Kate Spade",
    "sku": "KAT-RENATA-BOW-PUMP-798",
    "price": 257,
    "stock": 24,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Lover Slingback Kitten Heel",
    "brand": "Kate Spade",
    "sku": "KAT-LOVER-SLINGBACK-KITTEN-HEEL-799",
    "price": 238,
    "stock": 8,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Rue Slingback Mid Heel",
    "brand": "Kate Spade",
    "sku": "KAT-RUE-SLINGBACK-MID-HEEL-800",
    "price": 248,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Deco Bow Slingback Pump",
    "brand": "Kate Spade",
    "sku": "KAT-DECO-BOW-SLINGBACK-PUMP-801",
    "price": 238,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Happily Slingback Pump",
    "brand": "Kate Spade",
    "sku": "KAT-HAPPILY-SLINGBACK-PUMP-802",
    "price": 248,
    "stock": 11,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Marseille Dress Pump",
    "brand": "Kate Spade",
    "sku": "KAT-MARSEILLE-DRESS-PUMP-803",
    "price": 198,
    "stock": 12,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Carolina Kitten Heel",
    "brand": "Kate Spade",
    "sku": "KAT-CAROLINA-KITTEN-HEEL-804",
    "price": 198,
    "stock": 13,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Maren Pointed Toe Pump",
    "brand": "Kate Spade",
    "sku": "KAT-MAREN-POINTED-TOE-PUMP-805",
    "price": 228,
    "stock": 14,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bunnie Pointed Toe Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BUNNIE-POINTED-TOE-PUMP-806",
    "price": 278,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Halo Mary Jane High Heel",
    "brand": "Kate Spade",
    "sku": "KAT-HALO-MARY-JANE-HIGH-HEEL-807",
    "price": 228,
    "stock": 16,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Maren Ankle Strap Pump",
    "brand": "Kate Spade",
    "sku": "KAT-MAREN-ANKLE-STRAP-PUMP-808",
    "price": 228,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Veronica Pointed Toe Pump",
    "brand": "Kate Spade",
    "sku": "KAT-VERONICA-POINTED-TOE-PUMP-809",
    "price": 124,
    "stock": 18,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bianca High Heel Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BIANCA-HIGH-HEEL-PUMP-810",
    "price": 268,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Halo Mary Jane Pump",
    "brand": "Kate Spade",
    "sku": "KAT-HALO-MARY-JANE-PUMP-811",
    "price": 228,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Renata Metallic Mary Jane",
    "brand": "Kate Spade",
    "sku": "KAT-RENATA-METALLIC-MARY-JANE-812",
    "price": 328,
    "stock": 21,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Deco Bow Loafer Pump",
    "brand": "Kate Spade",
    "sku": "KAT-DECO-BOW-LOAFER-PUMP-813",
    "price": 248,
    "stock": 22,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bowdie Block Heel Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BOWDIE-BLOCK-HEEL-PUMP-814",
    "price": 268,
    "stock": 23,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Renata Sling High Heel",
    "brand": "Kate Spade",
    "sku": "KAT-RENATA-SLING-HIGH-HEEL-815",
    "price": 298,
    "stock": 24,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Amelia Block Heel Pump",
    "brand": "Kate Spade",
    "sku": "KAT-AMELIA-BLOCK-HEEL-PUMP-816",
    "price": 198,
    "stock": 8,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bridal Satin Evening Pump",
    "brand": "Kate Spade",
    "sku": "KAT-BRIDAL-SATIN-EVENING-PUMP-817",
    "price": 198,
    "stock": 9,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Happily Ivory Bridal Pump",
    "brand": "Kate Spade",
    "sku": "KAT-HAPPILY-IVORY-BRIDAL-PUMP-818",
    "price": 248,
    "stock": 10,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bridal Sparkle Heels",
    "brand": "Kate Spade",
    "sku": "KAT-BRIDAL-SPARKLE-HEELS-819",
    "price": 198,
    "stock": 11,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Marseille Bow Pump",
    "brand": "Kate Spade",
    "sku": "KAT-MARSEILLE-BOW-PUMP-820",
    "price": 198,
    "stock": 12,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Valerie Embroidered Pump",
    "brand": "Kate Spade",
    "sku": "KAT-VALERIE-EMBROIDERED-PUMP-821",
    "price": 248,
    "stock": 13,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Bridal Satin Bow Slingback",
    "brand": "Kate Spade",
    "sku": "KAT-BRIDAL-SATIN-BOW-SLINGBACK-822",
    "price": 257,
    "stock": 14,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Lover Heart-Detail Pump",
    "brand": "Kate Spade",
    "sku": "KAT-LOVER-HEART-DETAIL-PUMP-823",
    "price": 238,
    "stock": 15,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "60mm Lover Heart Heel",
    "brand": "Kate Spade",
    "sku": "KAT-60MM-LOVER-HEART-HEEL-824",
    "price": 360,
    "stock": 16,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Treasure Embellished Pump",
    "brand": "Kate Spade",
    "sku": "KAT-TREASURE-EMBELLISHED-PUMP-825",
    "price": 328,
    "stock": 17,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Perfect Pair Heart Heel",
    "brand": "Kate Spade",
    "sku": "KAT-PERFECT-PAIR-HEART-HEEL-826",
    "price": 298,
    "stock": 18,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Renata Crystal Buckle Pump",
    "brand": "Kate Spade",
    "sku": "KAT-RENATA-CRYSTAL-BUCKLE-PUMP-827",
    "price": 328,
    "stock": 19,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Pearl Accent Pump",
    "brand": "Kate Spade",
    "sku": "KAT-PEARL-ACCENT-PUMP-828",
    "price": 228,
    "stock": 20,
    "category": "Shoes",
    "lowStockAt": 5
  },
  {
    "name": "Keepall Bandoulière 50",
    "brand": "Louis Vuitton",
    "sku": "LOU-KEEPALL-BANDOULI-RE-50-829",
    "price": 2570,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Christopher Backpack",
    "brand": "Louis Vuitton",
    "sku": "LOU-CHRISTOPHER-BACKPACK-830",
    "price": 3450,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Neverfull PM",
    "brand": "Louis Vuitton",
    "sku": "LOU-NEVERFULL-PM-831",
    "price": 1400,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Pocket Organizer",
    "brand": "Louis Vuitton",
    "sku": "LOU-POCKET-ORGANIZER-832",
    "price": 460,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Slender Wallet",
    "brand": "Louis Vuitton",
    "sku": "LOU-SLENDER-WALLET-833",
    "price": 555,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Multiple Wallet",
    "brand": "Louis Vuitton",
    "sku": "LOU-MULTIPLE-WALLET-834",
    "price": 525,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Neverfull MM",
    "brand": "Louis Vuitton",
    "sku": "LOU-NEVERFULL-MM-835",
    "price": 2030,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Speedy Bandoulière 25",
    "brand": "Louis Vuitton",
    "sku": "LOU-SPEEDY-BANDOULI-RE-25-836",
    "price": 1820,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Onthego GM",
    "brand": "Louis Vuitton",
    "sku": "LOU-ONTHEGO-GM-837",
    "price": 3100,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Capucines Mini",
    "brand": "Louis Vuitton",
    "sku": "LOU-CAPUCINES-MINI-838",
    "price": 6100,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Capucines BB",
    "brand": "Louis Vuitton",
    "sku": "LOU-CAPUCINES-BB-839",
    "price": 6750,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "L'Immensité",
    "brand": "Louis Vuitton",
    "sku": "LOU-L-IMMENSIT-840",
    "price": 320,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Matière Noire",
    "brand": "Louis Vuitton",
    "sku": "LOU-MATI-RE-NOIRE-841",
    "price": 320,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Rose des Vents",
    "brand": "Louis Vuitton",
    "sku": "LOU-ROSE-DES-VENTS-842",
    "price": 320,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Trainer Sneaker",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-TRAINER-SNEAKER-843",
    "price": 1220,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Ollie Sneaker",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-OLLIE-SNEAKER-844",
    "price": 1010,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Luxembourg",
    "brand": "Louis Vuitton",
    "sku": "LOU-LUXEMBOURG-845",
    "price": 935,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Street Diver",
    "brand": "Louis Vuitton",
    "sku": "LOU-STREET-DIVER-846",
    "price": 5750,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Horizon Light Up",
    "brand": "Louis Vuitton",
    "sku": "LOU-HORIZON-LIGHT-UP-847",
    "price": 3600,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Tambour Slim",
    "brand": "Louis Vuitton",
    "sku": "LOU-TAMBOUR-SLIM-848",
    "price": 3150,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Takashi Murakami Alma",
    "brand": "Louis Vuitton",
    "sku": "LOU-TAKASHI-MURAKAMI-ALMA-849",
    "price": 2230,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Murakami Speedy 30",
    "brand": "Louis Vuitton",
    "sku": "LOU-MURAKAMI-SPEEDY-30-850",
    "price": 7620,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Lodge PM",
    "brand": "Louis Vuitton",
    "sku": "LOU-LODGE-PM-851",
    "price": 1640,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Empreinte Ring",
    "brand": "Louis Vuitton",
    "sku": "LOU-EMPREINTE-RING-852",
    "price": 1980,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Volt Multi Ring",
    "brand": "Louis Vuitton",
    "sku": "LOU-VOLT-MULTI-RING-853",
    "price": 3950,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Idylle Blossom",
    "brand": "Louis Vuitton",
    "sku": "LOU-IDYLLE-BLOSSOM-854",
    "price": 2420,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Masters Speedy 30",
    "brand": "Louis Vuitton",
    "sku": "LOU-MASTERS-SPEEDY-30-855",
    "price": 2890,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Da Vinci Neverfull",
    "brand": "Louis Vuitton",
    "sku": "LOU-DA-VINCI-NEVERFULL-856",
    "price": 3299,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Montaigne MM",
    "brand": "Louis Vuitton",
    "sku": "LOU-MONTAIGNE-MM-857",
    "price": 3420,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Horizon 55 Suitcase",
    "brand": "Louis Vuitton",
    "sku": "LOU-HORIZON-55-SUITCASE-858",
    "price": 3650,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Keepall Monogram",
    "brand": "Louis Vuitton",
    "sku": "LOU-KEEPALL-MONOGRAM-859",
    "price": 1980,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Onthego Reverse",
    "brand": "Louis Vuitton",
    "sku": "LOU-ONTHEGO-REVERSE-860",
    "price": 3200,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Time Out Sneaker",
    "brand": "Louis Vuitton",
    "sku": "LOU-TIME-OUT-SNEAKER-861",
    "price": 1450,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Sneakerina",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-SNEAKERINA-862",
    "price": 1250,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Archlight Sneaker",
    "brand": "Louis Vuitton",
    "sku": "LOU-ARCHLIGHT-SNEAKER-863",
    "price": 2620,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Initiales 40mm",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-INITIALES-40MM-864",
    "price": 590,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Pont 9 35mm",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-PONT-9-35MM-865",
    "price": 710,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Pyramide",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-PYRAMIDE-866",
    "price": 625,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "1.1 Millionaires",
    "brand": "Louis Vuitton",
    "sku": "LOU-1-1-MILLIONAIRES-867",
    "price": 890,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cyclone Sunglasses",
    "brand": "Louis Vuitton",
    "sku": "LOU-CYCLONE-SUNGLASSES-868",
    "price": 850,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "LV Waimea L",
    "brand": "Louis Vuitton",
    "sku": "LOU-LV-WAIMEA-L-869",
    "price": 620,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Zippy Wallet",
    "brand": "Louis Vuitton",
    "sku": "LOU-ZIPPY-WALLET-870",
    "price": 850,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Victorine Wallet",
    "brand": "Louis Vuitton",
    "sku": "LOU-VICTORINE-WALLET-871",
    "price": 575,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Sarah Wallet",
    "brand": "Louis Vuitton",
    "sku": "LOU-SARAH-WALLET-872",
    "price": 720,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Galleria Saffiano Bag",
    "brand": "Prada",
    "sku": "PRA-GALLERIA-SAFFIANO-BAG-873",
    "price": 4100,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Small Saffiano Tote",
    "brand": "Prada",
    "sku": "PRA-SMALL-SAFFIANO-TOTE-874",
    "price": 3500,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Re-Edition 2005",
    "brand": "Prada",
    "sku": "PRA-RE-EDITION-2005-875",
    "price": 1950,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Re-Nylon Backpack",
    "brand": "Prada",
    "sku": "PRA-RE-NYLON-BACKPACK-876",
    "price": 2350,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cleo Shoulder Bag",
    "brand": "Prada",
    "sku": "PRA-CLEO-SHOULDER-BAG-877",
    "price": 2700,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Mini Cleo Bag",
    "brand": "Prada",
    "sku": "PRA-MINI-CLEO-BAG-878",
    "price": 2300,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Symbole Jacquard Tote",
    "brand": "Prada",
    "sku": "PRA-SYMBOLE-JACQUARD-TOTE-879",
    "price": 3300,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Symbole Shoulder Bag",
    "brand": "Prada",
    "sku": "PRA-SYMBOLE-SHOULDER-BAG-880",
    "price": 2600,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Paradoxe EDP 90ml",
    "brand": "Prada",
    "sku": "PRA-PARADOXE-EDP-90ML-881",
    "price": 165,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Paradoxe Intense",
    "brand": "Prada",
    "sku": "PRA-PARADOXE-INTENSE-882",
    "price": 175,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Monolith Boots",
    "brand": "Prada",
    "sku": "PRA-MONOLITH-BOOTS-883",
    "price": 1550,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Monolith Loafers",
    "brand": "Prada",
    "sku": "PRA-MONOLITH-LOAFERS-884",
    "price": 1150,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Eternal Gold Ring",
    "brand": "Prada",
    "sku": "PRA-ETERNAL-GOLD-RING-885",
    "price": 2800,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Eternal Gold Necklace",
    "brand": "Prada",
    "sku": "PRA-ETERNAL-GOLD-NECKLACE-886",
    "price": 12400,
    "stock": 10,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Technical Fabric Jacket",
    "brand": "Prada",
    "sku": "PRA-TECHNICAL-FABRIC-JACKET-887",
    "price": 2450,
    "stock": 11,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Nylon Sneakers",
    "brand": "Prada",
    "sku": "PRA-NYLON-SNEAKERS-888",
    "price": 975,
    "stock": 12,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Original Patent",
    "brand": "Prada",
    "sku": "PRA-ORIGINAL-PATENT-889",
    "price": 850,
    "stock": 13,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Matte Bike Sneaker",
    "brand": "Prada",
    "sku": "PRA-MATTE-BIKE-SNEAKER-890",
    "price": 850,
    "stock": 14,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cloudbust High-Top",
    "brand": "Prada",
    "sku": "PRA-CLOUDBUST-HIGH-TOP-891",
    "price": 1150,
    "stock": 15,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cloudbust Knit",
    "brand": "Prada",
    "sku": "PRA-CLOUDBUST-KNIT-892",
    "price": 1070,
    "stock": 16,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Brique Shoulder Bag",
    "brand": "Prada",
    "sku": "PRA-BRIQUE-SHOULDER-BAG-893",
    "price": 2300,
    "stock": 17,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saffiano Briefcase",
    "brand": "Prada",
    "sku": "PRA-SAFFIANO-BRIEFCASE-894",
    "price": 3600,
    "stock": 18,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Triangle Shoulder Bag",
    "brand": "Prada",
    "sku": "PRA-TRIANGLE-SHOULDER-BAG-895",
    "price": 2500,
    "stock": 19,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Triangle Mini Bag",
    "brand": "Prada",
    "sku": "PRA-TRIANGLE-MINI-BAG-896",
    "price": 1700,
    "stock": 20,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Saffiano Belt",
    "brand": "Prada",
    "sku": "PRA-SAFFIANO-BELT-897",
    "price": 575,
    "stock": 21,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Logo Plaque Belt",
    "brand": "Prada",
    "sku": "PRA-LOGO-PLAQUE-BELT-898",
    "price": 625,
    "stock": 22,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Symbole Sunglasses",
    "brand": "Prada",
    "sku": "PRA-SYMBOLE-SUNGLASSES-899",
    "price": 520,
    "stock": 23,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Cinema Frames",
    "brand": "Prada",
    "sku": "PRA-CINEMA-FRAMES-900",
    "price": 480,
    "stock": 24,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Card Holder",
    "brand": "Prada",
    "sku": "PRA-CARD-HOLDER-901",
    "price": 450,
    "stock": 8,
    "category": "Shop",
    "lowStockAt": 5
  },
  {
    "name": "Bifold Wallet",
    "brand": "Prada",
    "sku": "PRA-BIFOLD-WALLET-902",
    "price": 675,
    "stock": 9,
    "category": "Shop",
    "lowStockAt": 5
  }
] as const;

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@devert.store";
  const password = process.env.ADMIN_PASSWORD || "devert123";
  const name = process.env.ADMIN_NAME || "Devert Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash, role: "ADMIN" },
  });

  const keepSkus: string[] = [];

  for (const p of products) {
    const existing =
      (await prisma.product.findUnique({ where: { sku: p.sku } })) ||
      (await prisma.product.findFirst({
        where: { brand: p.brand, name: p.name },
      }));

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          brand: p.brand,
          sku: existing.sku,
          price: p.price,
          // Keep live stock — only admin / storefront orders change it
          category: p.category,
          lowStockAt: p.lowStockAt ?? 5,
          active: true,
        },
      });
      keepSkus.push(existing.sku);
    } else {
      await prisma.product.create({
        data: {
          name: p.name,
          brand: p.brand,
          sku: p.sku,
          price: p.price,
          stock: p.stock,
          category: p.category,
          lowStockAt: p.lowStockAt ?? 5,
          active: true,
        },
      });
      keepSkus.push(p.sku);
    }
  }

  // Hide legacy SKUs that are no longer in the storefront catalog
  await prisma.product.updateMany({
    where: { sku: { notIn: keepSkus } },
    data: { active: false },
  });

  console.log("Seeded admin:", email);
  console.log("Seeded / refreshed products:", products.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
