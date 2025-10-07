import { Product, ProductCategory, FlowerType, FoodType, SubscriptionTier } from './types';

export const HIGHGROUNDSBLVD_VENDOR_NAME = "Highgroundsblvd";

export const MOCK_PRODUCTS: Product[] = [
  // Breakfast
  {
    _id: 'breakfast1', id: 'breakfast1', name: 'HIGHGROUNDS FARMSTYLE BREAKFAST', description: 'Grilled boerewors, streaky bacon, thyme mushrooms, zest tomatoes, chakalaka, eggs & 2 slices of toasted sourdough served with more berry jam & Farmstyle butter.', price: 165.00, imageUrl: '/public/images/Highgrounds Farmstyle Breakfast.webp', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'breakfast2', id: 'breakfast2', name: 'JAPANESE FRENCH TOAST', description: 'With mascarpone vanilla cream & mixed berry compote, served with Bacon (optional)', price: 145.00, imageUrl: '/public/images/Japanese milk bread french toast.jpg', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  // Breakfast Add-ons / Build Your Own
  {
    _id: 'addon1', id: 'addon1', name: 'AVO', description: '', price: 25.00, imageUrl: 'https://picsum.photos/seed/avo/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon2', id: 'addon2', name: 'MIXED BERRY JAM', description: '', price: 20.00, imageUrl: 'https://picsum.photos/seed/berryjam/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon3', id: 'addon3', name: 'BUTTER', description: '', price: 15.00, imageUrl: 'https://picsum.photos/seed/butter/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon4', id: 'addon4', name: 'EGG', description: '', price: 16.00, imageUrl: 'https://picsum.photos/seed/egg/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon5', id: 'addon5', name: 'SOURDOUGH TOAST', description: '', price: 18.00, imageUrl: 'https://picsum.photos/seed/sourdoughtoast/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon6', id: 'addon6', name: 'BACON', description: '', price: 35.00, imageUrl: 'https://picsum.photos/seed/bacon/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon7', id: 'addon7', name: 'GRILLED BOERIE', description: '', price: 35.00, imageUrl: 'https://picsum.photos/seed/grilledboerie/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon8', id: 'addon8', name: 'CHEDDAR CHEESE', description: '', price: 25.00, imageUrl: 'https://picsum.photos/seed/cheddarcheese/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'addon9', id: 'addon9', name: 'THYME & GARLIC BUTTER MUSHROOMS', description: '', price: 20.00, imageUrl: 'https://picsum.photos/seed/garlicmushrooms/400/300', category: ProductCategory.FOOD, subCategory: FoodType.BREAKFAST_ADD_ONS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  // Tapas / Lunch
  {
    _id: 'tapas1', id: 'tapas1', name: 'FISH TACOS', description: 'Panko crumbed hake, pineapple salsa, chimichurri & house tarter sauce in a soft grilled tortilla shell.', price: 175.00, imageUrl: '/public/images/Fish Tacos.jpg', category: ProductCategory.FOOD, subCategory: FoodType.TAPAS_LUNCH, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'tapas2', id: 'tapas2', name: 'ASIAN STYLE CORIANDER BBQ PORK RIBS', description: '400g Coriander BBQ (asian style) Ribs, marinated for 24hrs, garnished with sesame seeds & fresh spring onion.', price: 190.00, imageUrl: '/public/images/Asian Style Coriander BBQ Pork Ribs.jpg', category: ProductCategory.FOOD, subCategory: FoodType.TAPAS_LUNCH, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'tapas3', id: 'tapas3', name: 'RISOTTO ARANCHINI BALLS', description: 'Arenchini stuffed with a choice of Lamb meatballs or prawn', price: 145.00, imageUrl: '/public/images/Rissoto balls.jpg', category: ProductCategory.FOOD, subCategory: FoodType.TAPAS_LUNCH, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'tapas4', id: 'tapas4', name: 'ROSEMARY & GARLIC LEMON BUTTER BBQ LAMB RIBS', description: '300g Chargrilled rosemary & garlic butter bbq lamb ribs, with mediterranean relish & chimichurri served on a flat lemon garlic butter naan & fresh tzatziki', price: 275.00, imageUrl: '/public/images/BBQ Lamb Ribs.jpg', category: ProductCategory.FOOD, subCategory: FoodType.TAPAS_LUNCH, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'tapas5', id: 'tapas5', name: 'LEMON PERI BBQ WINGS WITH FRIES', description: 'Lemon peri bbq basted grilled wings, served with fresh housemade crinkle cut fries.', price: 145.00, imageUrl: '/public/images/Lemon Peri BBQ Wings With Fries.jpg', category: ProductCategory.FOOD, subCategory: FoodType.TAPAS_LUNCH, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'tapas6', id: 'tapas6', name: 'BEEF SHORT-RIB BIRRIA TACOS', description: 'Braised birria short-rib, chimichurri, fresh jalapeño in a soft Birria dipped tortilla shell, served with a side of birria dip sauce.', price: 160.00, imageUrl: '/public/images/Beef Short-Rib Birria Tacos.jpg', category: ProductCategory.FOOD, subCategory: FoodType.TAPAS_LUNCH, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  // Burgers
  {
    _id: 'burger1', id: 'burger1', name: 'PHAT SOUL OG BEEF BURGER WITH FRIES', description: 'Freshly made sesame seeded Japanese milk bun (butter toasted) with 150g pure beef pattie,chipotle mayo, wild rocket, cheddar slice & relish. Served with fresh housemade crinkle cut fries', price: 160.00, imageUrl: '/public/images/Phat Soul OG Beef Burger With Fries.jpg', category: ProductCategory.FOOD, subCategory: FoodType.BURGERS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'burger2', id: 'burger2', name: 'HIGHGROUNDS DOUBLE SMASH BURGER', description: 'Freshly made Japanese milk bun (butter toasted) with 2x 80g pure beef patties, double cheese, crunchita lettuce, special house sauce, onions & gherkins', price: 170.00, imageUrl: '/public/images/Highgrounds Double Smash Burger.jpg', category: ProductCategory.FOOD, subCategory: FoodType.BURGERS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'burger3', id: 'burger3', name: 'GREENFINGAZ DOUBLE CHICKEN BURGER', description: 'Freshly made sesame seeded Japanese milk bun (butter toasted) with 2x panko crumbed chicken breast patties, truffle mayo, rainbow slaw & double cheese.', price: 155.00, imageUrl: '/public/images/Greenfingaz Double Chicken Burger.jpg', category: ProductCategory.FOOD, subCategory: FoodType.BURGERS, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  // Café Coffee
  {
    _id: 'coffee1', id: 'coffee1', name: 'AMERICANO', description: '(All Coffees & Teas are Tall size)', price: 35.00, imageUrl: '/public/images/Black coffee.webp', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee2', id: 'coffee2', name: 'CAPPUCCINO', description: '(All Coffees & Teas are Tall size)', price: 40.00, imageUrl: '/public/images/Cappuccino.jpg', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee3', id: 'coffee3', name: 'FLAT WHITE', description: '(All Coffees & Teas are Tall size)', price: 35.00, imageUrl: '/public/images/Flat white.webp', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee4', id: 'coffee4', name: 'LATTE', description: '(All Coffees & Teas are Tall size)', price: 28.00, imageUrl: '/public/images/Latte.webp', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee5', id: 'coffee5', name: 'ESPRESSO (SINGLE)', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/public/images/Espresso.jpg', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee6', id: 'coffee6', name: 'EARL GREY TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/public/images/Earl grey tea.jpg', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee7', id: 'coffee7', name: 'ROOIBOS TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/public/images/Rooibos.png', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee8', id: 'coffee8', name: 'GINGER TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/public/images/Ginger tea.webp', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'coffee9', id: 'coffee9', name: 'BLACK TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/public/images/Black tea.jpg', category: ProductCategory.FOOD, subCategory: FoodType.CAFE_COFFEE, stock: 99, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  // CBD Flower
  {
    _id: 'flower1', id: 'flower1', name: 'CharlottesWeb', description: 'Helps with chronic pain, anxiety and seizures.', price: 160.00, imageUrl: '/public/images/CharlottesWeb.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.CBD, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Sativa - CBD 20% and THC 0-1%'
  },
  {
    _id: 'flower2', id: 'flower2', name: 'Cherry Wine', description: 'Helps with stress, anxiety and pain.', price: 180.00, imageUrl: '/public/images/CherryWine.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.CBD, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - CBD 12% and THC 1%'
  },
  {
    _id: 'flower3', id: 'flower3', name: 'Cake Berry', description: 'Relaxation and pain relief.', price: 120.00, imageUrl: '/public/images/Cakeberry.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.CBD, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - CBD 18% and THC 0.3%'
  },
  {
    _id: 'flower4', id: 'flower4', name: 'Harle-Tsu', description: 'Pain relief and inflammation without euphoria or intoxication', price: 220.00, imageUrl: '/public/images/HarleTsu.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.CBD, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - CBD 22% and THC 1%'
  },
  {
    _id: 'flower5', id: 'flower5', name: 'Ringos Gift', description: 'Helps with stress, anxiety and pain.', price: 240.00, imageUrl: '/public/images/RingosGift.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.CBD, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - CBD 15% and THC 0.3%'
  },
  // THC Flower
  {
    _id: 'flower6', id: 'flower6', name: 'Blue Dream', description: 'Helps with stress, anxiety and depression.', price: 36.81, imageUrl: '/public/images/Blue Dream.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.THC, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - CBD 0% and THC 21%'
  },
  {
    _id: 'flower7', id: 'flower7', name: 'Durban Poison', description: 'Helps with stress, depression and anxiety.', price: 27.75, imageUrl: '/public/images/DurbanPoison.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.THC, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Sativa - CBD 1% and THC 19%'
  },
   {
    _id: 'flower8', id: 'flower8', name: 'OG Kush', description: 'Classic strain for relaxation and euphoria.', price: 33.50, imageUrl: '/public/images/OG Kush.png', category: ProductCategory.FLOWER, subCategory: FlowerType.THC, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - THC 20%'
  },
  {
    _id: 'flower9', id: 'flower9', name: 'Sour Diesel', description: 'Effects are dreamy, cerebral, fast-acting and energizing.', price: 130.00, imageUrl: '/public/images/SourDiesel.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.THC, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - THC 19%'
  },
  {
    _id: 'flower10', id: 'flower10', name: 'Skunk', description: 'Classic strain for relaxation and euphoria.', price: 90.00, imageUrl: '/public/images/Skunk.jpg', category: ProductCategory.FLOWER, subCategory: FlowerType.THC, stock: 10, vendor: HIGHGROUNDSBLVD_VENDOR_NAME, details: 'Hybrid - THC 17%'
  },

  // Grow Club (Example)
  {
    _id: 'grow1', id: 'grow1', name: 'Starter Kit', description: 'Everything you need to start growing.', price: 550.00, imageUrl: 'https://picsum.photos/seed/growkit/400/300', category: ProductCategory.GROW_CLUB, stock: 5, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  // Accessories (Example)
  {
    _id: 'acc1-grinder', id: 'acc1', name: 'Grinder', description: 'Essential for breaking down cannabis flower into a consistent, finer material.', price: 120.00, imageUrl: '/public/images/Grinder.webp', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-rolling-papers', id: 'acc1', name: 'Rolling Papers', description: 'For those who prefer to roll their own joints, papers are a must.', price: 20.00, imageUrl: '/public/images/rolling paper.webp', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-hemp-wick', id: 'acc1', name: 'Hemp Wick', description: 'Some prefer hemp wicks for a cleaner, butane-free flame that can enhance the flavor.', price: 80.00, imageUrl: '/public/images/Hemp Wick.png', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-lighters', id: 'acc1', name: 'Lighters', description: 'A reliable flame source is obviously necessary.', price: 30.00, imageUrl: '/public/images/lighters.webp', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-storage', id: 'acc1', name: 'Airtight Storage Containers', description: 'To keep your cannabis fresh, potent, and prevent it from drying out.', price: 130.00, imageUrl: '/public/images/Airtight.png', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-smell-proof-bag', id: 'acc1', name: 'Smell-Proof Bag', description: 'For discreetly transporting or storing cannabis and its accessories,', price: 180.00, imageUrl: '/public/images/smell proof bag.webp', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-bong', id: 'acc1', name: 'Bong', description: 'Provides a smoother smoking experience by filtering the smoke through water.', price: 150.00, imageUrl: '/public/images/bong.jpg', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-hand-pipe', id: 'acc1', name: 'Hand Pipe', description: 'A portable and convenient option for quick smoking sessions, often made from glass, metal, or silicone.', price: 60.00, imageUrl: '/public/images/hand pipe.jpg', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-rolling-tray', id: 'acc1', name: 'Rolling Tray', description: 'Keeps your rolling area clean and organized, catching any stray bits of cannabis and making the rolling process easier.', price: 80.00, imageUrl: '/public/images/Rolling tray.jpg', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
  {
    _id: 'acc1-vaporizer', id: 'acc1', name: 'Vaporizer', description: 'Heats cannabis to a temperature that releases cannabinoids and terpenes as vapor, rather than burning it', price: 220.00, imageUrl: '/public/images/Vape pen.png', category: ProductCategory.ACCESSORIES, stock: 30, vendor: HIGHGROUNDSBLVD_VENDOR_NAME
  },
];

export const CATEGORIES_ORDER: ProductCategory[] = [
  ProductCategory.FOOD,
  ProductCategory.FLOWER,
  ProductCategory.GROW_CLUB,
  ProductCategory.ACCESSORIES,
];

// Light Theme Colors
export const KHULA_KUSH_GREEN = '#006400'; // Main accent green
export const KHULA_KUSH_YELLOW = '#FFD700'; // Accent yellow / gold
export const KHULA_KUSH_BG_LIGHT = '#FFFFFF'; // Main background
export const KHULA_KUSH_SURFACE_LIGHT = '#F3F4F6'; // Cards, inputs (Tailwind gray-100)
export const KHULA_KUSH_SURFACE_LIGHTER = '#E5E7EB'; // Borders, dividers (Tailwind gray-200)
export const KHULA_KUSH_TEXT_HEADING = '#1F2937'; // Headings (Tailwind gray-800)
export const KHULA_KUSH_TEXT_BODY = '#374151'; // Body text (Tailwind gray-700)
export const KHULA_KUSH_TEXT_MUTED = '#6B7280'; // Muted text, placeholders (Tailwind gray-500)
export const KHULA_KUSH_TEXT_ON_GREEN = '#FFFFFF'; // Text on green buttons/backgrounds


export const LOGO_URL = '/public/images/Khula Kush Logo 2.png';

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'tier1',
    level: 'Level 1',
    pricePerMonth: 250,
    benefits: [
      "5g p/m of flower",
      "5 sweet treats of your choice",
      "You get 1 seed to grow with us"
    ],
    productSummary: { flower: "5g", treats: "5", seeds: "1" }
  },
  {
    id: 'tier2',
    level: 'Level 2',
    pricePerMonth: 550,
    benefits: [
      "10g p/m of flower",
      "10 sweet treats of your choice",
      "You get 2 seeds to grow with us"
    ],
    productSummary: { flower: "10g", treats: "10", seeds: "2" }
  },
  {
    id: 'tier3',
    level: 'Level 3',
    pricePerMonth: 950,
    benefits: [
      "20g p/m of flower",
      "20 sweet treats of your choice", // Interpreted from "Double the 10 sweet treats"
      "You get 3 seeds to grow with us"
    ],
    productSummary: { flower: "20g", treats: "20", seeds: "3" }
  }
];
