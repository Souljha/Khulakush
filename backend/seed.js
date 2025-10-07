const mockProducts = [
  // Edibles
  {
    name: 'Pineapple Halos', description: 'Delicious pineapple flavored edibles.', price: 340.00, imageUrl: '/images/Pineapple Halos.png', category: "The Food", subCategory: "Edibles", stock: 99
  },
  {
    name: 'Sour Space Worms', description: 'Tangy sour gummy worms with a cosmic twist.', price: 205.00, imageUrl: '/images/Sour Space Worms.png', category: "The Food", subCategory: "Edibles", stock: 99
  },
  {
    name: "Weedy O's", description: 'Crunchy cereal-style edibles.', price: 165.00, imageUrl: "/images/Weedy O's.png", category: "The Food", subCategory: "Edibles", stock: 99
  },
  // Breakfast
  {
    name: 'FARMSTYLE BREAKFAST', description: 'Grilled boerewors, streaky bacon, thyme mushrooms, zest tomatoes, chakalaka, eggs & 2 slices of toasted sourdough served with more berry jam & Farmstyle butter.', price: 165.00, imageUrl: '/images/Highgrounds Farmstyle Breakfast.webp', category: "The Food", subCategory: "Breakfast", stock: 99
  },
  {
    name: 'JAPANESE FRENCH TOAST', description: 'With mascarpone vanilla cream & mixed berry compote, served with Bacon (optional)', price: 145.00, imageUrl: '/images/Japanese milk bread french toast.jpg', category: "The Food", subCategory: "Breakfast", stock: 99
  },
  // Breakfast Add-ons / Build Your Own
  {
    name: 'AVO', description: 'Fresh avocado slices.', price: 25.00, imageUrl: 'https://picsum.photos/seed/avo/400/300', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'MIXED BERRY JAM', description: 'Sweet and tangy mixed berry jam.', price: 20.00, imageUrl: 'https://picsum.photos/seed/berryjam/400/300', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'BUTTER', description: 'Creamy farm-style butter.', price: 15.00, imageUrl: 'https://picsum.photos/seed/butter/400/300', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'EGG', description: 'Freshly cooked egg.', price: 16.00, imageUrl: 'https://picsum.photos/seed/egg/400/300', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'SOURDOUGH TOAST', description: 'Crispy sourdough toast.', price: 18.00, imageUrl: '/images/sourdoughtoast.jpg', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'BACON', description: 'Crispy streaky bacon.', price: 35.00, imageUrl: '/images/bacon.jpg', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'GRILLED BOERIE', description: 'Grilled boerewors sausage.', price: 35.00, imageUrl: '/images/grilledboerie.jpg', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'CHEDDAR CHEESE', description: 'Melted cheddar cheese.', price: 25.00, imageUrl: '/images/cheddarcheese.jpg', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  {
    name: 'THYME & GARLIC BUTTER MUSHROOMS', description: 'Sautéed mushrooms with thyme and garlic butter.', price: 20.00, imageUrl: '/images/garlicmushrooms.jpg', category: "The Food", subCategory: "Breakfast Add-ons / Build Your Own", stock: 99
  },
  // Tapas / Lunch
  {
    name: 'FISH TACOS', description: 'Panko crumbed hake, pineapple salsa, chimichurri & house tarter sauce in a soft grilled tortilla shell.', price: 175.00, imageUrl: '/images/Fish Tacos.jpg', category: "The Food", subCategory: "Tapas / Lunch", stock: 99
  },
  {
    name: 'ASIAN STYLE BBQ PORK RIBS', description: '400g Coriander BBQ (asian style) Ribs, marinated for 24hrs, garnished with sesame seeds & fresh spring onion.', price: 190.00, imageUrl: '/images/Asian Style Coriander BBQ Pork Ribs.jpg', category: "The Food", subCategory: "Tapas / Lunch", stock: 99
  },
  {
    name: 'RISOTTO ARANCHINI BALLS', description: 'Arenchini stuffed with a choice of Lamb meatballs or prawn', price: 145.00, imageUrl: '/images/Rissoto balls.jpg', category: "The Food", subCategory: "Tapas / Lunch", stock: 99
  },
  {
    name: 'GARLIC LEMON BBQ LAMB RIBS', description: '300g Chargrilled rosemary & garlic butter bbq lamb ribs, with mediterranean relish & chimichurri served on a flat lemon garlic butter naan & fresh tzatziki', price: 275.00, imageUrl: '/images/BBQ Lamb Ribs.jpg', category: "The Food", subCategory: "Tapas / Lunch", stock: 99
  },
  {
    name: 'BBQ WINGS WITH FRIES', description: 'Lemon peri bbq basted grilled wings, served with fresh housemade crinkle cut fries.', price: 145.00, imageUrl: '/images/Lemon Peri BBQ Wings With Fries.jpg', category: "The Food", subCategory: "Tapas / Lunch", stock: 99
  },
  {
    name: 'BEEF SHORT-RIB BIRRIA TACOS', description: 'Braised birria short-rib, chimichurri, fresh jalapeño in a soft Birria dipped tortilla shell, served with a side of birria dip sauce.', price: 160.00, imageUrl: '/images/Beef Short-Rib Birria Tacos.jpg', category: "The Food", subCategory: "Tapas / Lunch", stock: 99
  },
  // Burgers
  {
    name: 'OG BEEF BURGER WITH FRIES', description: 'Freshly made sesame seeded Japanese milk bun (butter toasted) with 150g pure beef pattie,chipotle mayo, wild rocket, cheddar slice & relish. Served with fresh housemade crinkle cut fries', price: 160.00, imageUrl: '/images/Phat Soul OG Beef Burger With Fries.jpg', category: "The Food", subCategory: "Burgers", stock: 99
  },
  {
    name: 'DOUBLE SMASH BURGER', description: 'Freshly made Japanese milk bun (butter toasted) with 2x 80g pure beef patties, double cheese, crunchita lettuce, special house sauce, onions & gherkins', price: 170.00, imageUrl: '/images/Highgrounds double smash burger.jpg', category: "The Food", subCategory: "Burgers", stock: 99
  },
  {
    name: 'DOUBLE CHICKEN BURGER', description: 'Freshly made sesame seeded Japanese milk bun (butter toasted) with 2x panko crumbed chicken breast patties, truffle mayo, rainbow slaw & double cheese.', price: 155.00, imageUrl: '/images/Greenfingaz double chicken burger.jpg', category: "The Food", subCategory: "Burgers", stock: 99
  },
  // Café Coffee
  {
    name: 'AMERICANO', description: '(All Coffees & Teas are Tall size)', price: 35.00, imageUrl: '/images/Black coffee.webp', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'CAPPUCCINO', description: '(All Coffees & Teas are Tall size)', price: 40.00, imageUrl: '/images/Cappuccino.jpg', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'FLAT WHITE', description: '(All Coffees & Teas are Tall size)', price: 35.00, imageUrl: '/images/Flat white.webp', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'LATTE', description: '(All Coffees & Teas are Tall size)', price: 28.00, imageUrl: '/images/Latte.webp', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'ESPRESSO (SINGLE)', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/images/Espresso.jpg', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'EARL GREY TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/images/Earl grey tea.jpg', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'ROOIBOS TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/images/Rooibos.png', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'GINGER TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/images/Ginger tea.webp', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  {
    name: 'BLACK TEA', description: '(All Coffees & Teas are Tall size)', price: 25.00, imageUrl: '/images/Black tea.jpg', category: "The Food", subCategory: "Cafe & Coffee", stock: 99
  },
  // Greendoor Flower
  {
    name: 'Purple Sunset', description: 'Helps with chronic pain, anxiety and seizures.', price: 145.00, imageUrl: '/images/Purple sunset.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Sativa - CBD 20% and THC 0-1%'
  },
  {
    name: 'Black Cherry', description: 'Helps with stress, anxiety and pain.', price: 145.00, imageUrl: '/images/Black cherry.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 12% and THC 1%'
  },
  {
    name: 'Gorilla Zkittles', description: 'Relaxation and pain relief.', price: 145.00, imageUrl: '/images/Gorilla skittles.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 18% and THC 0.3%'
  },
  {
    name: 'Smacked Man', description: 'Pain relief and inflammation without euphoria or intoxication', price: 145.00, imageUrl: '/images/Smacked man.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 22% and THC 1%'
  },
  {
    name: 'Slip Stream', description: 'Helps with stress, anxiety and pain.', price: 145.00, imageUrl: '/images/Slip stream.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 15% and THC 0.3%'
  },
  {
    name: 'Banana Kush', description: 'Helps with stress, anxiety and pain.', price: 145.00, imageUrl: '/images/Banana Daddy.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 15% and THC 0.3%'
  },
  {
    name: 'Holy Grail Kush', description: 'Helps with stress, anxiety and pain.', price: 145.00, imageUrl: '/images/Holy grail.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 15% and THC 0.3%'
  },
  {
    name: 'Gorilla Glue', description: 'Helps with stress, anxiety and pain.', price: 145.00, imageUrl: '/images/Granite.png', category: "The Flower", subCategory: "Greendoor Flower", stock: 10, details: 'Hybrid - CBD 15% and THC 0.3%'
  },
  // Indoor
  {
    name: 'Billy', description: 'Helps with stress, anxiety and depression.', price: 220.00, imageUrl: '/images/Billy.png', category: "The Flower", subCategory: "Indoor", stock: 10, details: 'Hybrid - CBD 0% and THC 21%'
  },
  {
    name: 'Prophecy', description: 'Helps with stress, depression and anxiety.', price: 230.00, imageUrl: '/images/Indoor Prophecy.png', category: "The Flower", subCategory: "Indoor", stock: 10, details: 'Sativa - CBD 1% and THC 19%'
  },
   {
    name: 'Monster Zkittles ', description: 'Classic strain for relaxation and euphoria.', price: 160.00, imageUrl: '/images/Monster Skittles.png', category: "The Flower", subCategory: "Indoor", stock: 10, details: 'Hybrid - THC 20%'
  },
  {
    name: 'Banana Daddy', description: 'Effects are dreamy, cerebral, fast-acting and energizing.', price: 240.00, imageUrl: '/images/Black cherry.png', category: "The Flower", subCategory: "Indoor", stock: 10, details: 'Hybrid - THC 19%'
  },
  {
    name: 'Blue Zushi', description: 'Classic strain for relaxation and euphoria.', price: 250.00, imageUrl: '/images/Blue Cheese.png', category: "The Flower", subCategory: "Indoor", stock: 10, details: 'Hybrid - THC 17%'
  },
  {
    name: 'Mellon Ballers', description: 'Classic strain for relaxation and euphoria.', price: 250.00, imageUrl: '/images/Melon baller.png', category: "The Flower", subCategory: "Indoor", stock: 10, details: 'Hybrid - THC 17%'
  },

  // Grow Club (Example)
  {
    name: 'Starter Kit', description: 'Everything you need to start growing.', price: 550.00, imageUrl: '/images/growkit.jpg', category: "Grow Club", stock: 5
  },
  // Accessories - Dabs
  {
    name: 'Diamonds', description: 'Premium quality diamond concentrates.', price: 810.00, imageUrl: '/images/Diamonds.png', category: "Accessories", subCategory: "Dabs", stock: 30
  },
  {
    name: 'Perm Marker Bebber', description: 'High-grade concentrate with unique flavor.', price: 745.00, imageUrl: '/images/Perm Marker Bebber.png', category: "Accessories", subCategory: "Dabs", stock: 30
  },
  {
    name: 'Fruity Pebb Crumble', description: 'Fruity flavored crumble concentrate.', price: 745.00, imageUrl: '/images/Fruity Pebb Crumble.png', category: "Accessories", subCategory: "Dabs", stock: 30
  },
  {
    name: 'Honey Pen', description: 'Smooth honey-like concentrate.', price: 810.00, imageUrl: '/images/Honey pen.png', category: "Accessories", subCategory: "Dabs", stock: 30
  },
  // Accessories - Vet Pro
  {
    name: 'Calming Oil', description: 'CBD oil for pets to help with anxiety and stress.', price: 405.00, imageUrl: '/images/Calming Oil.png', category: "Accessories", subCategory: "Vet Pro", stock: 30
  },
  {
    name: 'Calming Biscuits', description: 'CBD-infused biscuits for pet relaxation.', price: 340.00, imageUrl: '/images/Calming Biscuits.png', category: "Accessories", subCategory: "Vet Pro", stock: 30
  },
  // Accessories - General
  {
    name: 'Grinder', description: 'Essential for breaking down cannabis flower into a consistent, finer material.', price: 120.00, imageUrl: '/images/Grinder.webp', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Rolling Papers', description: 'For those who prefer to roll their own joints, papers are a must.', price: 20.00, imageUrl: '/images/rolling paper.webp', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Hemp Wick', description: 'Some prefer hemp wicks for a cleaner, butane-free flame that can enhance the flavor.', price: 80.00, imageUrl: '/images/Hemp Wick.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Lighters', description: 'A reliable flame source is obviously necessary.', price: 30.00, imageUrl: '/images/lighters.webp', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Airtight Storage Containers', description: 'To keep your cannabis fresh, potent, and prevent it from drying out.', price: 130.00, imageUrl: '/images/Airtight.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Smell-Proof Bag', description: 'For discreetly transporting or storing cannabis and its accessories,', price: 180.00, imageUrl: '/images/smell proof bag.webp', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Bong', description: 'Provides a smoother smoking experience by filtering the smoke through water.', price: 150.00, imageUrl: '/images/bong.jpg', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Hand Pipe', description: 'A portable and convenient option for quick smoking sessions, often made from glass, metal, or silicone.', price: 60.00, imageUrl: '/images/hand pipe.jpg', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Rolling Tray', description: 'Keeps your rolling area clean and organized, catching any stray bits of cannabis and making the rolling process easier.', price: 80.00, imageUrl: '/images/Rolling tray.jpg', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: '710 Vape carts', description: 'Heats cannabis to a temperature that releases cannabinoids and terpenes as vapor, rather than burning it', price: 675.00, imageUrl: '/images/Vape pen.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: '710 Disposable Vape', description: 'Convenient disposable vape for on-the-go use.', price: 975.00, imageUrl: '/images/Disposable Vape.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Ispire Vape', description: 'Premium quality vape device.', price: 1080.00, imageUrl: '/images/Ispire Vape.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Tyson Pre Rolls', description: 'Pre-rolled joints ready to enjoy.', price: 169.00, imageUrl: '/images/Tyson Pre Rolls.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Capital Hill Pre Rolls', description: 'Premium pre-rolled joints.', price: 205.00, imageUrl: '/images/Capital Hill Pre Rolls.png', category: "Accessories", subCategory: "General", stock: 30
  },
  {
    name: 'Dark Matter Pre Rolls', description: 'High-quality pre-rolled joints.', price: 234.00, imageUrl: '/images/Dark matter pre rolls.png', category: "Accessories", subCategory: "General", stock: 30
  },
];

module.exports = async (Product) => {
    console.log('MongoDB connected for seeding');
    await Product.deleteMany({});
    console.log('Existing products cleared');
    await Product.insertMany(mockProducts);
    console.log('Mock products inserted');
};
