// ==========================================
// Amazon Clone - Full Category Catalog & Interactive Engine
// ==========================================

// Global State
let allProducts = [];
let customProducts = JSON.parse(localStorage.getItem('amazon_custom_products') || '[]');
let cart = JSON.parse(localStorage.getItem('amazon_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('amazon_wishlist') || '[]');
let orders = JSON.parse(localStorage.getItem('amazon_orders') || '[]');
let currentUser = JSON.parse(localStorage.getItem('amazon_user') || JSON.stringify({
    name: 'Guest User',
    email: 'guest@amazon.clone',
    isLoggedIn: false,
    phone: '',
    prime: true
}));

let currentTheme = localStorage.getItem('amazon_theme') || 'light';
let currentCurrency = localStorage.getItem('amazon_currency') || 'INR';
let currentCountry = localStorage.getItem('amazon_country') || 'India';
let soundEnabled = localStorage.getItem('amazon_sound') !== 'false';
let compactView = localStorage.getItem('amazon_compact') === 'true';

// Currency Rates & Symbols
const currencies = {
    INR: { symbol: '₹', rate: 85.0, decimals: 0 },
    USD: { symbol: '$', rate: 1.0, decimals: 2 },
    EUR: { symbol: '€', rate: 0.92, decimals: 2 }
};

// Comprehensive Category-by-Category Product Database (Attached to window by products-data.js)
const categoryProductsDatabase = window.categoryProductsDatabase || {};

/* LEGACY INLINE DATABASE (NOW MOVED TO products-data.js)
const _legacyDb = {
    smartphones: [
        {
            id: 101,
            title: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
            category: "smartphones",
            price: 1199.99,
            discountPercentage: 10.0,
            rating: 4.9,
            stock: 18,
            brand: "Apple",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
            description: "Forged in titanium with industry-leading A17 Pro chip, customizable Action button, and 5x optical zoom telephoto lens."
        },
        {
            id: 102,
            title: "Samsung Galaxy S24 Ultra 5G (512GB, Titanium Gray)",
            category: "smartphones",
            price: 1299.99,
            discountPercentage: 14.5,
            rating: 4.8,
            stock: 12,
            brand: "Samsung",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp",
            description: "Galaxy AI powered flagship phone with integrated S Pen, Snapdragon 8 Gen 3 processor, and 200MP Quad Tele camera system."
        },
        {
            id: 103,
            title: "Google Pixel 8 Pro (128GB, Obsidian Black)",
            category: "smartphones",
            price: 899.99,
            discountPercentage: 15.0,
            rating: 4.7,
            stock: 15,
            brand: "Google",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp",
            description: "Super Actua display with Google Tensor G3 chip, temperature sensor, and state-of-the-art computational photography with Best Take."
        },
        {
            id: 104,
            title: "OnePlus 12 5G (256GB, Flowy Emerald)",
            category: "smartphones",
            price: 799.99,
            discountPercentage: 12.0,
            rating: 4.7,
            stock: 22,
            brand: "OnePlus",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp",
            description: "4th Gen Hasselblad Camera for Mobile, 100W SUPERVOOC charging, Dual Cryo-velocity VC cooling, and 2K 120Hz ProXDR Display."
        },
        {
            id: 105,
            title: "Xiaomi 14 Ultra (Leica Quad 50MP Lens, 512GB)",
            category: "smartphones",
            price: 999.99,
            discountPercentage: 16.0,
            rating: 4.6,
            stock: 10,
            brand: "Xiaomi",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp",
            description: "Legendary Leica Summilux optical lens, 1-inch sensor with stepless variable aperture, and Snapdragon 8 Gen 3 processor."
        },
        {
            id: 106,
            title: "Nothing Phone (2) (256GB, Dark Gray)",
            category: "smartphones",
            price: 599.99,
            discountPercentage: 18.0,
            rating: 4.5,
            stock: 25,
            brand: "Nothing",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp",
            description: "Iconic Glyph Interface with customized LED sequences, Nothing OS 2.5, dual 50MP cameras, and flagship Snapdragon 8+ Gen 1."
        },
        {
            id: 107,
            title: "Apple iPhone 13 (128GB, Midnight Blue)",
            category: "smartphones",
            price: 599.99,
            discountPercentage: 8.0,
            rating: 4.7,
            stock: 30,
            brand: "Apple",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp",
            description: "Super Retina XDR OLED display, Cinematic mode in 1080p at 30 fps, A15 Bionic chip, and all-day battery life."
        },
        {
            id: 108,
            title: "Motorola Edge 50 Ultra (Peach Fuzz, 512GB)",
            category: "smartphones",
            price: 649.99,
            discountPercentage: 15.0,
            rating: 4.6,
            stock: 14,
            brand: "Motorola",
            thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp",
            description: "Real wood and vegan leather finish with Pantone validated colors, 125W TurboPower charging, and 50MP periscope zoom camera."
        }
    ],

    laptops: [
        {
            id: 201,
            title: "Apple MacBook Pro 16\" M3 Max (36GB RAM, 1TB SSD)",
            category: "laptops",
            price: 2499.99,
            discountPercentage: 10.0,
            rating: 4.9,
            stock: 9,
            brand: "Apple",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "Up to 16-core CPU and 40-core GPU with 22 hours of battery life, Liquid Retina XDR display, and 300GB/s memory bandwidth."
        },
        {
            id: 202,
            title: "Dell XPS 15 OLED InfinityEdge (32GB, 1TB RTX 4070)",
            category: "laptops",
            price: 1899.99,
            discountPercentage: 12.0,
            rating: 4.8,
            stock: 14,
            brand: "Dell",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "15.6-inch 3.5K OLED touchscreen with Intel Core i9-13900H, CNC machined aluminum chassis, and quad-speaker studio sound."
        },
        {
            id: 203,
            title: "ASUS ROG Zephyrus G16 Gaming Laptop (OLED 240Hz)",
            category: "laptops",
            price: 1999.99,
            discountPercentage: 15.0,
            rating: 4.9,
            stock: 11,
            brand: "ASUS",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "Intel Core Ultra 9 processor, NVIDIA GeForce RTX 4080 Laptop GPU, ROG Nebula OLED display, and ultra-thin aluminum chassis."
        },
        {
            id: 204,
            title: "HP Spectre x360 2-in-1 Touchscreen Laptop (16GB, 1TB)",
            category: "laptops",
            price: 1499.99,
            discountPercentage: 18.0,
            rating: 4.7,
            stock: 16,
            brand: "HP",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "Intel Core Ultra 7 processor, 2.8K OLED 120Hz display with 360-degree hinge, 9MP AI camera, and included rechargeable stylus pen."
        },
        {
            id: 205,
            title: "Lenovo ThinkPad X1 Carbon Gen 11 (Intel i7, 16GB)",
            category: "laptops",
            price: 1699.99,
            discountPercentage: 14.0,
            rating: 4.8,
            stock: 15,
            brand: "Lenovo",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "Legendary ultralight carbon fiber business laptop with Military-Grade 810H durability, TrackPoint navigation, and PrivacyGuard."
        },
        {
            id: 206,
            title: "Apple MacBook Air 13\" M2 Chip (8-Core CPU, 256GB)",
            category: "laptops",
            price: 999.99,
            discountPercentage: 8.0,
            rating: 4.8,
            stock: 28,
            brand: "Apple",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "Strikingly thin design with silent fanless operation, MagSafe 3 charging, 1080p FaceTime HD camera, and 18-hour battery."
        },
        {
            id: 207,
            title: "Acer Predator Helios 16 Gaming Laptop (RTX 4070)",
            category: "laptops",
            price: 1399.99,
            discountPercentage: 20.0,
            rating: 4.6,
            stock: 12,
            brand: "Acer",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "16-inch WQXGA 240Hz 500 nits display, 13th Gen Intel Core i7-13700HX, dual custom 5th Gen AeroBlade 3D metal fans."
        },
        {
            id: 208,
            title: "Microsoft Surface Laptop 5 (13.5\" PixelSense Touch)",
            category: "laptops",
            price: 1199.99,
            discountPercentage: 15.0,
            rating: 4.6,
            stock: 18,
            brand: "Microsoft",
            thumbnail: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
            description: "Sleek, lightweight touchscreen laptop with warm Alcantara keyboard, Thunderbolt 4 connectivity, and all-day battery life."
        }
    ],

    "mobile-accessories": [
        {
            id: 301,
            title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
            category: "mobile-accessories",
            price: 348.00,
            discountPercentage: 15.0,
            rating: 4.8,
            stock: 24,
            brand: "Sony",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
            description: "Two processors and 8 microphones for industry-leading noise cancellation, crystal-clear hands-free calling, and 30-hour battery."
        },
        {
            id: 302,
            title: "Apple AirPods Max Wireless Over-Ear Headphones (Silver)",
            category: "mobile-accessories",
            price: 549.00,
            discountPercentage: 10.0,
            rating: 4.8,
            stock: 16,
            brand: "Apple",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
            description: "Apple-designed dynamic driver delivers high-fidelity audio. Active Noise Cancellation with Transparency mode and spatial audio."
        },
        {
            id: 303,
            title: "Apple Watch Series 9 GPS 45mm (Midnight Aluminum)",
            category: "mobile-accessories",
            price: 429.00,
            discountPercentage: 12.0,
            rating: 4.9,
            stock: 20,
            brand: "Apple",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
            description: "Powerful S9 chip with magical Double Tap gesture, brighter Always-On display, Precision Finding for iPhone, and ECG monitoring."
        },
        {
            id: 304,
            title: "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
            category: "mobile-accessories",
            price: 129.95,
            discountPercentage: 20.0,
            rating: 4.7,
            stock: 35,
            brand: "JBL",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
            description: "2-way speaker system engineered to deliver loud, crystal clear, powerful sound. IP67 waterproof and dustproof with 12 hours playtime."
        },
        {
            id: 305,
            title: "Samsung 32\" Odyssey Neo G8 4K 240Hz Curved Gaming Monitor",
            category: "mobile-accessories",
            price: 899.99,
            discountPercentage: 25.0,
            rating: 4.8,
            stock: 8,
            brand: "Samsung",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
            description: "World's 1st 4K 240Hz Mini-LED monitor with 1000R curvature, Quantum Matrix Technology, 1ms response time, and AMD FreeSync Premium Pro."
        },
        {
            id: 306,
            title: "Anker Prime 100W GaN 3-Port Ultra-Fast Wall Charger",
            category: "mobile-accessories",
            price: 69.99,
            discountPercentage: 15.0,
            rating: 4.8,
            stock: 40,
            brand: "Anker",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
            description: "Fast charge 3 devices simultaneously with 2 USB-C ports and 1 USB-A port. ActiveShield 2.0 temperature protection."
        },
        {
            id: 307,
            title: "Logitech MX Master 3S Wireless Performance Mouse",
            category: "mobile-accessories",
            price: 99.99,
            discountPercentage: 10.0,
            rating: 4.9,
            stock: 30,
            brand: "Logitech",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
            description: "Quiet Clicks with 8K DPI any-surface tracking, MagSpeed electromagnetic scrolling, and ergonomic comfortable grip."
        },
        {
            id: 308,
            title: "SanDisk 2TB Extreme Portable SSD USB-C Up to 1050MB/s",
            category: "mobile-accessories",
            price: 149.99,
            discountPercentage: 22.0,
            rating: 4.7,
            stock: 26,
            brand: "SanDisk",
            thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp",
            description: "Rugged NVMe solid state drive with up to 2-meter drop protection and IP55 water and dust resistance with carabiner loop."
        }
    ],

    fashion: [
        {
            id: 401,
            title: "Levi's Men's Classic Trucker Denim Jean Jacket",
            category: "fashion",
            price: 89.50,
            discountPercentage: 15.0,
            rating: 4.8,
            stock: 22,
            brand: "Levi's",
            thumbnail: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
            description: "The timeless American original trucker jacket in 100% heavy cotton denim with button-flap chest pockets and side welt pockets."
        },
        {
            id: 402,
            title: "Ralph Lauren Classic Fit Oxford Long Sleeve Shirt",
            category: "fashion",
            price: 98.50,
            discountPercentage: 12.0,
            rating: 4.8,
            stock: 18,
            brand: "Ralph Lauren",
            thumbnail: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
            description: "Woven from 100% breathable combed cotton with a button-down collar, signature embroidered pony at left chest, and split back yoke."
        },
        {
            id: 403,
            title: "Champion Heavyweight Reverse Weave Fleece Pullover Hoodie",
            category: "fashion",
            price: 65.00,
            discountPercentage: 18.0,
            rating: 4.9,
            stock: 30,
            brand: "Champion",
            thumbnail: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
            description: "Iconic heavyweight cotton-rich athletic fleece hoodie cut on the cross-grain to resist shrinkage, with warm pouch pocket."
        },
        {
            id: 404,
            title: "ZARA Floral Print Chiffon Flowy Summer Maxi Dress",
            category: "fashion",
            price: 79.90,
            discountPercentage: 20.0,
            rating: 4.8,
            stock: 16,
            brand: "ZARA",
            thumbnail: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
            description: "V-neck chiffon maxi dress featuring an allover botanical floral print, flutter short sleeves, and an elasticated smocked waist."
        },
        {
            id: 405,
            title: "Calvin Klein 3-Pack Classic Cotton Crewneck T-Shirts",
            category: "fashion",
            price: 42.50,
            discountPercentage: 15.0,
            rating: 4.7,
            stock: 40,
            brand: "Calvin Klein",
            thumbnail: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
            description: "Soft breathable 100% combed cotton jersey t-shirts with tagless interior collar and double-needle hemmed sleeves for everyday wear."
        },
        {
            id: 406,
            title: "Levi's 501 Original Fit Straight Leg Blue Denim Jeans",
            category: "fashion",
            price: 79.50,
            discountPercentage: 14.0,
            rating: 4.8,
            stock: 25,
            brand: "Levi's",
            thumbnail: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=600&auto=format&fit=crop",
            description: "Since 1873. The blueprint for every pair of jeans in existence with signature button fly, 5-pocket styling, and durable copper rivets."
        },
        {
            id: 407,
            title: "Burberry Double-Breasted Cotton Gabardine Trench Coat",
            category: "fashion",
            price: 349.00,
            discountPercentage: 25.0,
            rating: 4.9,
            stock: 12,
            brand: "Burberry",
            thumbnail: "https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=600&auto=format&fit=crop",
            description: "Water-resistant woven cotton gabardine tailored trench coat with epaulettes, hook-and-eye collar closure, and D-ring belt."
        },
        {
            id: 408,
            title: "H&M Chunky Ribbed Cable Knit Wool Crewneck Sweater",
            category: "fashion",
            price: 49.99,
            discountPercentage: 15.0,
            rating: 4.7,
            stock: 28,
            brand: "H&M",
            thumbnail: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
            description: "Heavy cable-knitted cozy sweater containing wool, with raglan sleeves and broad ribbed knit along the neckline, cuffs, and hem."
        }
    ],

    beauty: [
        {
            id: 501,
            title: "Essence Mascara Lash Princess False Lash Effect",
            category: "beauty",
            price: 9.99,
            discountPercentage: 5.0,
            rating: 4.6,
            stock: 50,
            brand: "Essence",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
            description: "Achieve dramatic volume and sculpted length with the conical fiber wand. Gluten-free, cruelty-free, and ophthalmologist tested."
        },
        {
            id: 502,
            title: "Urban Decay Naked3 Eyeshadow Palette with Dual Brush",
            category: "beauty",
            price: 54.00,
            discountPercentage: 18.0,
            rating: 4.8,
            stock: 22,
            brand: "Urban Decay",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
            description: "12 rose-hued neutral eyeshadow shades in ultra-smooth mattes, pearlescent shimmers, and gleaming metallics."
        },
        {
            id: 503,
            title: "MAC Matte Lipstick (Velvet Teddy - Warm Beige)",
            category: "beauty",
            price: 23.00,
            discountPercentage: 10.0,
            rating: 4.7,
            stock: 35,
            brand: "MAC",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
            description: "The iconic product that made MAC famous. Creamy rich formula features high color payoff in a no-shine matte finish."
        },
        {
            id: 504,
            title: "Clinique Moisture Surge 100H Auto-Replenishing Hydrator",
            category: "beauty",
            price: 44.00,
            discountPercentage: 15.0,
            rating: 4.8,
            stock: 28,
            brand: "Clinique",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
            description: "Refreshing gel-cream infused with aloe bio-ferment and hyaluronic acid penetrates deep into skin for 100 hours of continuous moisture."
        },
        {
            id: 505,
            title: "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant",
            category: "beauty",
            price: 35.00,
            discountPercentage: 12.0,
            rating: 4.9,
            stock: 40,
            brand: "Paula's Choice",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
            description: "Gentle non-abrasive leave-on exfoliant with salicylic acid unclogs enlarged pores, smooths wrinkles, and brightens skin tone."
        },
        {
            id: 506,
            title: "CeraVe Hydrating Facial Cleanser 473ml with Ceramides",
            category: "beauty",
            price: 16.99,
            discountPercentage: 10.0,
            rating: 4.8,
            stock: 60,
            brand: "CeraVe",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
            description: "Formulated with 3 essential ceramides and hyaluronic acid to cleanse, hydrate, and help restore the protective skin barrier."
        },
        {
            id: 507,
            title: "The Ordinary Niacinamide 10% + Zinc 1% Oil Control Serum",
            category: "beauty",
            price: 12.50,
            discountPercentage: 8.0,
            rating: 4.7,
            stock: 55,
            brand: "The Ordinary",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
            description: "High-strength vitamin and mineral blemish formula balances visible sebum activity and refines uneven skin texture."
        },
        {
            id: 508,
            title: "Olaplex No. 3 Hair Perfector Repairing Treatment 100ml",
            category: "beauty",
            price: 30.00,
            discountPercentage: 14.0,
            rating: 4.8,
            stock: 32,
            brand: "Olaplex",
            thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
            description: "Bond-building pre-shampoo treatment repairs broken and compromised hair bonds caused by chemical, thermal, and mechanical damage."
        }
    ],

    "kitchen-accessories": [
        {
            id: 601,
            title: "Ninja Professional Plus Blender with 1400 Peak Watts",
            category: "kitchen-accessories",
            price: 119.99,
            discountPercentage: 18.0,
            rating: 4.8,
            stock: 20,
            brand: "Ninja",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Total Crushing Blades crush whole ice to snow in seconds with 3 Auto-iQ preset programs for smoothies and frozen drinks."
        },
        {
            id: 602,
            title: "Cuisinart 11-Piece Stainless Steel Chef Cookware Set",
            category: "kitchen-accessories",
            price: 199.95,
            discountPercentage: 25.0,
            rating: 4.7,
            stock: 14,
            brand: "Cuisinart",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Mirror finish stainless steel with pure aluminum encapsulated base for even heat distribution. Induction stovetop ready."
        },
        {
            id: 603,
            title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6-Quart",
            category: "kitchen-accessories",
            price: 89.95,
            discountPercentage: 22.0,
            rating: 4.9,
            stock: 30,
            brand: "Instant Pot",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and food warmer with 13 smart one-touch programs."
        },
        {
            id: 604,
            title: "Cosori Pro II 5.8-Quart Smart Digital Air Fryer XL",
            category: "kitchen-accessories",
            price: 99.99,
            discountPercentage: 20.0,
            rating: 4.8,
            stock: 25,
            brand: "Cosori",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Cooks food up to 50% faster than a conventional oven with 85% less fat. 12 customizable presets and nonstick dishwasher safe basket."
        },
        {
            id: 605,
            title: "Wüsthof Classic 8-Inch German Stainless Chef's Knife",
            category: "kitchen-accessories",
            price: 165.00,
            discountPercentage: 15.0,
            rating: 4.9,
            stock: 15,
            brand: "Wüsthof",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Precision-forged from a single piece of high-carbon stainless steel with 58 Rockwell hardness for razor-sharp edge retention."
        },
        {
            id: 606,
            title: "Fellow Stagg EKG Electric Gooseneck Pour-Over Kettle",
            category: "kitchen-accessories",
            price: 165.00,
            discountPercentage: 10.0,
            rating: 4.8,
            stock: 18,
            brand: "Fellow",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Precision pour spout with to-the-degree variable temperature control, LCD screen, 60-minute hold mode, and 1200W quick heating."
        },
        {
            id: 607,
            title: "KitchenAid Artisan Series 5-Quart Tilt-Head Stand Mixer",
            category: "kitchen-accessories",
            price: 379.99,
            discountPercentage: 16.0,
            rating: 4.9,
            stock: 10,
            brand: "KitchenAid",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Iconic planetary mixing action with 10 speeds, 5-quart stainless steel bowl, coated flat beater, dough hook, and 6-wire whip."
        },
        {
            id: 608,
            title: "OXO Good Grips 10-Piece Airtight Food Storage Pop Container",
            category: "kitchen-accessories",
            price: 112.99,
            discountPercentage: 18.0,
            rating: 4.7,
            stock: 22,
            brand: "OXO",
            thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
            description: "Push-button airtight seal keeps pantry staples fresh. Stackable modular design is BPA-free and completely dishwasher safe."
        }
    ],

    furniture: [
        {
            id: 701,
            title: "Herman Miller Aeron Ergonomic Office Chair (Size B)",
            category: "furniture",
            price: 1195.00,
            discountPercentage: 12.0,
            rating: 4.9,
            stock: 8,
            brand: "Herman Miller",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Pellicle breathable suspension distributes weight evenly. PostureFit SL sacral and lumbar support for world-class ergonomic sitting."
        },
        {
            id: 702,
            title: "West Elm Mid-Century Pop-Up Top Storage Coffee Table",
            category: "furniture",
            price: 699.00,
            discountPercentage: 15.0,
            rating: 4.8,
            stock: 12,
            brand: "West Elm",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Solid eucalyptus wood and walnut veneer with hydraulic pop-up work surface revealing generous hidden interior storage."
        },
        {
            id: 703,
            title: "Casper Original 11\" Memory Foam Queen Mattress",
            category: "furniture",
            price: 895.00,
            discountPercentage: 20.0,
            rating: 4.8,
            stock: 15,
            brand: "Casper",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Zoned Support keeps your spine in natural alignment with AirScape breathable foam to circulate air and keep you cool all night."
        },
        {
            id: 704,
            title: "Article Sven 88\" Charme Tan Full-Grain Leather Sofa",
            category: "furniture",
            price: 1799.00,
            discountPercentage: 14.0,
            rating: 4.9,
            stock: 6,
            brand: "Article",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Mid-century modern silhouette in supple full-aniline Italian leather that develops a rich vintage patina over years of use."
        },
        {
            id: 705,
            title: "FlexiSpot E7 Pro Dual-Motor Electric Standing Desk",
            category: "furniture",
            price: 499.99,
            discountPercentage: 22.0,
            rating: 4.8,
            stock: 16,
            brand: "FlexiSpot",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Solid bamboo desktop with dual carbon-steel motors supporting 355 lbs. Smart keypad with 4 memory presets and USB charging."
        },
        {
            id: 706,
            title: "Walker Edison 70\" Modern Farmhouse TV Stand Console",
            category: "furniture",
            price: 289.99,
            discountPercentage: 25.0,
            rating: 4.6,
            stock: 18,
            brand: "Walker Edison",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Supports TVs up to 80 inches with rustic barn door sliding front cabinets, cable management cutouts, and adjustable shelves."
        },
        {
            id: 707,
            title: "Zinus Lorelai 14\" Heavy Duty Steel Platform Bed Frame",
            category: "furniture",
            price: 139.00,
            discountPercentage: 18.0,
            rating: 4.7,
            stock: 25,
            brand: "Zinus",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Clean modern design with strong steel slats that support any spring, memory foam or latex mattress without a box spring."
        },
        {
            id: 708,
            title: "Nathan James Theo 5-Tier Industrial Wall Mount Ladder Shelf",
            category: "furniture",
            price: 119.99,
            discountPercentage: 15.0,
            rating: 4.7,
            stock: 20,
            brand: "Nathan James",
            thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
            description: "Matte black metal frame with warm reclaimed oak wood shelves. Slim space-saving silhouette attaches securely to wall."
        }
    ],

    fragrances: [
        {
            id: 801,
            title: "Chanel Coco Noir Eau De Parfum Vaporisateur 100ml",
            category: "fragrances",
            price: 165.00,
            discountPercentage: 8.0,
            rating: 4.9,
            stock: 18,
            brand: "Chanel",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
            description: "An intimate, magnetic floral amber fragrance with notes of grapefruit, May rose, rose geranium leaf, and Indonesian patchouli."
        },
        {
            id: 802,
            title: "Dior Sauvage Eau De Toilette Spray 100ml",
            category: "fragrances",
            price: 145.00,
            discountPercentage: 10.0,
            rating: 4.9,
            stock: 24,
            brand: "Dior",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
            description: "A radically fresh composition dictated by a name that has the ring of a manifesto. Radiant top notes of juicy Calabrian bergamot."
        },
        {
            id: 803,
            title: "Yves Saint Laurent Black Opium Eau De Parfum 90ml",
            category: "fragrances",
            price: 155.00,
            discountPercentage: 12.0,
            rating: 4.8,
            stock: 19,
            brand: "YSL",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
            description: "Addictive gourmand floral perfume with rich black coffee, sensual white flowers, and sweet warm vanilla base notes."
        },
        {
            id: 804,
            title: "Tom Ford Private Blend Tobacco Vanille Eau De Parfum",
            category: "fragrances",
            price: 295.00,
            discountPercentage: 15.0,
            rating: 4.9,
            stock: 10,
            brand: "Tom Ford",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
            description: "Opulent, warm, and iconic. Reminiscent of an English gentlemen's club, blended with aromatic tonka bean, cocoa, and sweet wood sap."
        },
        {
            id: 805,
            title: "Creed Aventus Millesime Eau De Parfum 100ml",
            category: "fragrances",
            price: 445.00,
            discountPercentage: 10.0,
            rating: 4.9,
            stock: 8,
            brand: "Creed",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
            description: "The bestselling fragrance in House of Creed history. Celebrates strength, power, and success with smoky pineapple and birch."
        },
        {
            id: 806,
            title: "Versace Eros Flame Eau De Parfum Spray 100ml",
            category: "fragrances",
            price: 98.00,
            discountPercentage: 18.0,
            rating: 4.7,
            stock: 25,
            brand: "Versace",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
            description: "Passionate citrus woody fragrance characterized by strong contrasts: cold and hot, sweet and spicy, light and shadow."
        },
        {
            id: 807,
            title: "Giorgio Armani Acqua Di Giò Parfum Refillable 100ml",
            category: "fragrances",
            price: 135.00,
            discountPercentage: 14.0,
            rating: 4.8,
            stock: 22,
            brand: "Armani",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
            description: "Deep, intense aquatic freshness enriched with mysterious notes of smoky incense, rosemary, and sustainably sourced patchouli."
        },
        {
            id: 808,
            title: "Maison Margiela Replica Jazz Club Eau De Toilette",
            category: "fragrances",
            price: 160.00,
            discountPercentage: 10.0,
            rating: 4.8,
            stock: 15,
            brand: "Maison Margiela",
            thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
            description: "Evokes the heady aroma of fine Cuban rum and vanilla bean cigars in a cozy subterranean Brooklyn jazz club."
        }
    ],

    groceries: [
        {
            id: 901,
            title: "Blue Diamond California Whole Natural Almonds 1.13kg",
            category: "groceries",
            price: 14.99,
            discountPercentage: 10.0,
            rating: 4.8,
            stock: 50,
            brand: "Blue Diamond",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
            description: "Non-GMO Project verified premium whole natural raw almonds. Heart healthy snack packed with vitamin E and plant-based protein."
        },
        {
            id: 902,
            title: "Nature Nate's 100% Pure Raw & Unfiltered Honey 907g",
            category: "groceries",
            price: 11.49,
            discountPercentage: 12.0,
            rating: 4.9,
            stock: 45,
            brand: "Nature Nate's",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
            description: "Crafted for exceptional taste from pure American bee pollen and enzymes. Gently warmed to retain all natural health benefits."
        },
        {
            id: 903,
            title: "Lavazza Super Crema Whole Bean Coffee Blend 1kg",
            category: "groceries",
            price: 18.99,
            discountPercentage: 15.0,
            rating: 4.8,
            stock: 35,
            brand: "Lavazza",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/coffee/thumbnail.webp",
            description: "Medium espresso roast with aromatic notes of hazelnut and brown sugar. Perfect for drip coffee, moka pot, or espresso machine."
        },
        {
            id: 904,
            title: "Colavita Extra Virgin Olive Oil First Cold Pressed 1 Liter",
            category: "groceries",
            price: 22.99,
            discountPercentage: 14.0,
            rating: 4.9,
            stock: 30,
            brand: "Colavita",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
            description: "Imported authentically from Italy. Smooth velvety texture with subtle fruity and peppery notes ideal for dressings and cooking."
        },
        {
            id: 905,
            title: "Twinings of London Pure Peppermint Herbal Tea (50 Bags)",
            category: "groceries",
            price: 8.49,
            discountPercentage: 10.0,
            rating: 4.7,
            stock: 60,
            brand: "Twinings",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/green-tea/thumbnail.webp",
            description: "Naturally caffeine-free herbal tea with an uplifting crisp peppermint flavor. 100% pure select peppermint leaves."
        },
        {
            id: 906,
            title: "Kirkland Signature 100% Pure Maple Syrup Grade A 1L",
            category: "groceries",
            price: 16.99,
            discountPercentage: 15.0,
            rating: 4.9,
            stock: 40,
            brand: "Kirkland",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
            description: "Grade A amber rich taste pure maple syrup tapped directly from Canadian sugar maple trees with zero artificial additives."
        },
        {
            id: 907,
            title: "Simple Mills Gluten Free Almond Flour Crackers (Pack of 3)",
            category: "groceries",
            price: 14.99,
            discountPercentage: 12.0,
            rating: 4.7,
            stock: 35,
            brand: "Simple Mills",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
            description: "Made with a wholesome blend of almond flour, sunflower seeds, and flax seeds. Non-GMO, vegan, and baked to crispy perfection."
        },
        {
            id: 908,
            title: "RXBAR High Protein Bars Chocolate Sea Salt (Box of 12)",
            category: "groceries",
            price: 24.99,
            discountPercentage: 18.0,
            rating: 4.8,
            stock: 30,
            brand: "RXBAR",
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
            description: "12g of protein with 3 egg whites, 6 almonds, 4 cashews, 2 dates and no B.S. Delicious guilt-free on-the-go fuel."
        }
    ]
};

// Today's Deals (Massive 20% to 50% discount items)
categoryProductsDatabase.deals = [
    {
        id: 991,
        title: "Sony WH-1000XM5 Wireless Headphones (Midnight Blue)",
        category: "deals",
        price: 248.00,
        discountPercentage: 45.0,
        rating: 4.9,
        stock: 15,
        brand: "Sony",
        thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
        description: "🔥 LIGHTNING DEAL: 45% OFF. Industry leading noise canceling with 30-hour battery and quick charging."
    },
    {
        id: 992,
        title: "Samsung 32\" Odyssey Neo G8 4K 240Hz Curved Gaming Monitor",
        category: "deals",
        price: 649.99,
        discountPercentage: 35.0,
        rating: 4.8,
        stock: 6,
        brand: "Samsung",
        thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
        description: "🔥 DEAL OF THE DAY: Quantum Mini-LED 4K 240Hz monitor with 1000R curvature and AMD FreeSync."
    },
    {
        id: 993,
        title: "Cuisinart 11-Piece Stainless Steel Chef Cookware Set",
        category: "deals",
        price: 139.95,
        discountPercentage: 40.0,
        rating: 4.8,
        stock: 12,
        brand: "Cuisinart",
        thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
        description: "🔥 LIMITED TIME OFFER: Professional grade stainless steel cookware set with stay-cool riveted handles."
    },
    {
        id: 994,
        title: "Michael Kors Jet Set Large Leather Travel Tote Bag",
        category: "deals",
        price: 118.00,
        discountPercentage: 50.0,
        rating: 4.8,
        stock: 10,
        brand: "Michael Kors",
        thumbnail: "https://cdn.dummyjson.com/product-images/womens-bags/louis-vuitton-neverfull/thumbnail.webp",
        description: "🔥 50% OFF FLASH SALE: Authentic Saffiano crossgrain leather tote with gold-tone hardware."
    },
    {
        id: 995,
        title: "Apple iPhone 13 Pro (128GB, Sierra Blue)",
        category: "deals",
        price: 699.99,
        discountPercentage: 30.0,
        rating: 4.8,
        stock: 8,
        brand: "Apple",
        thumbnail: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
        description: "🔥 PRIME EXCLUSIVE: Super Retina XDR with ProMotion 120Hz display and A15 Bionic chip."
    },
    {
        id: 996,
        title: "Casper Original Memory Foam Queen Mattress",
        category: "deals",
        price: 625.00,
        discountPercentage: 35.0,
        rating: 4.8,
        stock: 9,
        brand: "Casper",
        thumbnail: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
        description: "🔥 SUPER SAVER: Premium memory foam with zoned ergonomic support for pain-free deep sleep."
    },
    {
        id: 997,
        title: "Cosori Pro II 5.8-Quart Smart Digital Air Fryer XL",
        category: "deals",
        price: 69.99,
        discountPercentage: 35.0,
        rating: 4.9,
        stock: 20,
        brand: "Cosori",
        thumbnail: "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
        description: "🔥 TOP DEAL: 12-in-1 versatile air fryer cooks meals crispy with 85% less cooking oil."
    },
    {
        id: 998,
        title: "SanDisk 2TB Extreme Portable SSD USB-C",
        category: "deals",
        price: 109.99,
        discountPercentage: 32.0,
        rating: 4.8,
        stock: 18,
        brand: "SanDisk",
        thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp",
        description: "🔥 FAST DEAL: Blazing fast 1050MB/s NVMe transfer speeds with IP55 water resistance."
    }
];
*/

// Helper: Build Full Home Showcase (Strictly Unique Items & Images across all categories)
function getHomeShowcase() {
    const showcase = [];
    const seenIds = new Set();
    const seenTitles = new Set();
    const seenImages = new Set();

    // 1. Add any custom products first
    (customProducts || []).forEach(p => {
        if (p && p.id && p.title && !seenIds.has(p.id)) {
            const thumb = p.thumbnail || (p.images && p.images[0]) || '';
            if (!thumb || !seenImages.has(thumb)) {
                seenIds.add(p.id);
                seenTitles.add(p.title.trim().toLowerCase());
                if (thumb) seenImages.add(thumb);
                showcase.push(p);
            }
        }
    });

    // 2. Add top 2 distinct products from each verified category
    const keys = ['smartphones', 'laptops', 'electronics', 'fashion', 'home-kitchen', 'beauty', 'books', 'toys', 'deals', 'furniture', 'fragrances', 'groceries'];
    keys.forEach(k => {
        const catList = categoryProductsDatabase[k];
        if (catList && Array.isArray(catList)) {
            let added = 0;
            for (const item of catList) {
                if (!item || !item.id || !item.title) continue;
                const normTitle = item.title.trim().toLowerCase();
                const thumb = item.thumbnail || (item.images && item.images[0]) || '';
                if (!seenIds.has(item.id) && !seenTitles.has(normTitle) && (!thumb || !seenImages.has(thumb))) {
                    seenIds.add(item.id);
                    seenTitles.add(normTitle);
                    if (thumb) seenImages.add(thumb);
                    showcase.push(item);
                    added++;
                    if (added >= 2) break;
                }
            }
        }
    });
    return showcase;
}

// DOM Elements
const shopSection = document.getElementById('shop-section');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchCategory = document.getElementById('search-category');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const productModal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBody = document.getElementById('modal-body');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const backToTopBtn = document.getElementById('back-to-top');
const resultsHeader = document.getElementById('results-header');
const resultsTitle = document.getElementById('results-title');
const resetFilterBtn = document.getElementById('reset-filter-btn');
const dealsBtn = document.getElementById('deals-btn');

// User & Settings DOM Elements
const userMenuBtn = document.getElementById('user-menu-btn');
const userDropdown = document.getElementById('user-dropdown');
const userDisplayName = document.getElementById('user-display-name');
const navUserGreeting = document.getElementById('nav-user-greeting');
const navSigninGreeting = document.getElementById('nav-signin-greeting');
const navDeliveryCountry = document.getElementById('nav-delivery-country');
const currencySelect = document.getElementById('currency-select');
const countrySelect = document.getElementById('country-select');
const soundToggle = document.getElementById('sound-toggle');
const compactToggle = document.getElementById('compact-toggle');
const themeLightBtn = document.getElementById('theme-light-btn');
const themeDarkBtn = document.getElementById('theme-dark-btn');
const themeMidnightBtn = document.getElementById('theme-midnight-btn');
const ordersCountBadge = document.getElementById('orders-count-badge');
const wishlistCountBadge = document.getElementById('wishlist-count-badge');
const viewOrdersBtn = document.getElementById('view-orders-btn');
const viewWishlistBtn = document.getElementById('view-wishlist-btn');
const viewSettingsBtn = document.getElementById('view-settings-btn');
const editProfileBtn = document.getElementById('edit-profile-btn');
const userAuthBtn = document.getElementById('user-auth-btn');
const resetStoreBtn = document.getElementById('reset-store-btn');
const navOrdersBtn = document.getElementById('nav-orders-btn');
const navSigninBtn = document.getElementById('nav-signin-btn');
const navAddressBtn = document.getElementById('nav-address-btn');
const heroSwitchCountry = document.getElementById('hero-switch-country');

// Modals
const ordersModal = document.getElementById('orders-modal');
const ordersCloseBtn = document.getElementById('orders-close-btn');
const ordersListContainer = document.getElementById('orders-list-container');
const wishlistModal = document.getElementById('wishlist-modal');
const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
const wishlistListContainer = document.getElementById('wishlist-list-container');
const settingsModal = document.getElementById('settings-modal');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsForm = document.getElementById('settings-form');
const settingsNameInput = document.getElementById('settings-name-input');
const settingsEmailInput = document.getElementById('settings-email-input');
const settingsPhoneInput = document.getElementById('settings-phone-input');
const authModal = document.getElementById('auth-modal');
const authCloseBtn = document.getElementById('auth-close-btn');
const authForm = document.getElementById('auth-form');
const authNameInput = document.getElementById('auth-name-input');
const authEmailInput = document.getElementById('auth-email-input');

// Sound Synthesizer
let audioCtx = null;
function playTone(type = 'success') {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'success') {
            osc.frequency.setValueAtTime(587.33, now);
            osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'wishlist') {
            osc.frequency.setValueAtTime(440.00, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'toggle') {
            osc.frequency.setValueAtTime(320, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        }
    } catch (e) {
        console.log('Audio error or unsupported');
    }
}

// Price Conversion Formatter
function formatPrice(usdPrice) {
    const curr = currencies[currentCurrency] || currencies.USD;
    const converted = usdPrice * curr.rate;
    if (curr.decimals === 0) {
        return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toFixed(curr.decimals)}`;
}

// Star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="fa-regular fa-star"></i>';
    }

    return `<span class="stars">${starsHtml}</span> <span class="rating-num">(${rating.toFixed(1)})</span>`;
}

// Shimmer Skeleton Loaders
function showSkeletons(count = 8) {
    if (!shopSection) return;
    let skeletonsHtml = '';
    for (let i = 0; i < count; i++) {
        skeletonsHtml += `
            <div class="box skeleton">
                <div class="box-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-img"></div>
                    <div class="skeleton-text" style="width: 40%; margin-bottom: 8px; height: 16px;"></div>
                    <div class="skeleton-text" style="width: 60%; margin-bottom: 12px; height: 16px;"></div>
                    <div class="skeleton-text" style="width: 100%; height: 32px; border-radius: 20px;"></div>
                </div>
            </div>
        `;
    }
    shopSection.innerHTML = skeletonsHtml;
}

// Render Products into shop-section (Zero Duplicates Guaranteed)
function renderProducts(products) {
    if (!shopSection) return;

    if (!products || products.length === 0) {
        shopSection.innerHTML = `
            <div class="no-results" style="width: 100%; text-align: center; padding: 60px 20px; background: var(--glass-card); backdrop-filter: blur(16px); border: 1px solid var(--glass-card-border); border-radius: 16px; margin: 20px;">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: #febd68; margin-bottom: 15px;"></i>
                <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No products found</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Try checking your spelling or use more general terms.</p>
                <button class="reset-btn" onclick="loadCategory('home')">Return to Home</button>
            </div>
        `;
        return;
    }

    // Strict runtime deduplication: never render duplicate IDs, titles, or images
    const seenIds = new Set();
    const seenTitles = new Set();
    const seenImages = new Set();
    const uniqueProducts = [];
    products.forEach((p) => {
        if (!p || p.id === undefined || !p.title) return;
        const normTitle = p.title.trim().toLowerCase();
        const thumb = p.thumbnail || (p.images && p.images[0]) || '';
        if (seenIds.has(p.id) || seenTitles.has(normTitle) || (thumb && seenImages.has(thumb))) return;
        seenIds.add(p.id);
        seenTitles.add(normTitle);
        if (thumb) seenImages.add(thumb);
        uniqueProducts.push(p);
    });

    let html = '';
    uniqueProducts.forEach((product) => {
        const imgSrc = product.thumbnail || (product.images && product.images[0]) || 'https://via.placeholder.com/300?text=Product';
        const isWishlisted = wishlist.includes(product.id);

        html += `
            <div class="box" data-id="${product.id}">
                <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})" 
                        title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                    <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
                <div class="box-content">
                    <h3 title="${escapeHtml(product.title)}">${escapeHtml(product.title)}</h3>
                    <div class="box-image" onclick="openProductModal(${product.id})" title="Click to view details">
                        <img src="${imgSrc}" alt="${escapeHtml(product.title)}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M90 200l40-50 35 40 30-35 45 55H60z' fill='%23cbd5e1'/><circle cx='105' cy='105' r='22' fill='%23cbd5e1'/><text x='50%' y='85%' font-family='Segoe UI,sans-serif' font-size='14' font-weight='600' fill='%2394a3b8' text-anchor='middle'>Amazon Product</text></svg>';" />
                    </div>
                    
                    <div class="box-meta">
                        <div class="box-price-row">
                            <span class="box-price">${formatPrice(product.price)}</span>
                            ${product.discountPercentage ? `<span class="discount-badge">${Math.round(product.discountPercentage)}% off</span>` : ''}
                        </div>
                        
                        <div class="box-rating">
                            ${generateStars(product.rating || 4.5)}
                        </div>
                        
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                        
                        <p class="see-more-link" onclick="openProductModal(${product.id})">see more</p>
                    </div>
                </div>
            </div>
        `;
    });

    shopSection.innerHTML = html;
}

// Special View 1: Customer Service Hub
function renderCustomerServiceHub() {
    if (!shopSection) return;
    if (resultsHeader && resultsTitle) {
        resultsTitle.textContent = "Amazon Customer Service & Help Center";
        resultsHeader.style.display = 'flex';
    }

    shopSection.innerHTML = `
        <div class="service-hub-container">
            <div class="hub-header">
                <h2><i class="fa-solid fa-headset" style="color: #febd68;"></i> How can we help you today?</h2>
                <p>Track packages, manage your prime benefits, solve order issues, and talk to 24/7 customer care.</p>
            </div>

            <div class="service-grid">
                <div class="service-card" onclick="openOrders()">
                    <div class="service-icon"><i class="fa-solid fa-box-open"></i></div>
                    <h4>Your Orders</h4>
                    <p>Track packages, return damaged items, or cancel recent orders easily.</p>
                </div>

                <div class="service-card" onclick="openSettingsModal()">
                    <div class="service-icon"><i class="fa-solid fa-user-shield"></i></div>
                    <h4>Account & Prime</h4>
                    <p>Manage your address, change phone numbers, and review Prime benefits.</p>
                </div>

                <div class="service-card" onclick="openCart()">
                    <div class="service-icon"><i class="fa-solid fa-credit-card"></i></div>
                    <h4>Payment & Balance</h4>
                    <p>Manage payment methods, view shopping cart subtotal, and review order totals.</p>
                </div>

                <div class="service-card" onclick="startLiveChatSimulation()">
                    <div class="service-icon"><i class="fa-solid fa-comments"></i></div>
                    <h4>24/7 Live Support</h4>
                    <p>Click here to start a real-time live support chat with an Amazon assistant.</p>
                </div>
            </div>
        </div>
    `;
}

function startLiveChatSimulation() {
    playTone('success');
    const query = prompt("👋 Amazon 24/7 Support Assistant:\n\nHow can we help you with your order or account?");
    if (query) {
        alert(`Support Representative:\n\n"Thank you for contacting Amazon Support regarding '${query}'. Our support team is available 24/7. Your issue has been noted and resolved!"`);
        showToast("Support session completed");
    }
}

// Special View 2: Gift Cards Hub
function renderGiftCardsHub() {
    if (!shopSection) return;
    if (resultsHeader && resultsTitle) {
        resultsTitle.textContent = "Amazon eGift Cards & Balance Store";
        resultsHeader.style.display = 'flex';
    }

    const giftCards = [
        { id: 9101, title: "Amazon $25 eGift Card", price: 25.00, discountPercentage: 5, rating: 4.9, stock: 99, brand: "Amazon", thumbnail: "https://pngimg.com/uploads/amazon/amazon_PNG11.png", description: "Deliver instantly by email. Redeemable towards millions of items storewide with no expiration date." },
        { id: 9102, title: "Amazon $50 eGift Card (Birthday Special)", price: 50.00, discountPercentage: 8, rating: 4.9, stock: 99, brand: "Amazon", thumbnail: "https://pngimg.com/uploads/amazon/amazon_PNG11.png", description: "Send cheer with a digital Amazon Gift Card. Instant balance top-up for your friends and family." },
        { id: 9103, title: "Amazon $100 eGift Card (Festival Pack)", price: 100.00, discountPercentage: 10, rating: 5.0, stock: 99, brand: "Amazon", thumbnail: "https://pngimg.com/uploads/amazon/amazon_PNG11.png", description: "The ultimate shopping freedom. Use towards laptops, mobiles, fashion, books, and groceries." },
        { id: 9104, title: "Amazon $250 Prime Executive Gift Card", price: 250.00, discountPercentage: 12, rating: 5.0, stock: 99, brand: "Amazon", thumbnail: "https://pngimg.com/uploads/amazon/amazon_PNG11.png", description: "Exclusive executive gift card with instant delivery, priority prime benefits, and lifetime validity." }
    ];

    allProducts = giftCards;
    renderProducts(giftCards);
}

// Special View 3: Sell on Amazon Hub
function renderSellerHub() {
    if (!shopSection) return;
    if (resultsHeader && resultsTitle) {
        resultsTitle.textContent = "Sell on Amazon - Creator & Merchant Portal";
        resultsHeader.style.display = 'flex';
    }

    shopSection.innerHTML = `
        <div class="seller-hub-container">
            <div class="hub-header">
                <h2><i class="fa-solid fa-store" style="color: #febd68;"></i> List Your Product on Amazon</h2>
                <p>Enter your product details below. Once listed, your product will immediately appear in the store for buying!</p>
            </div>

            <form id="seller-product-form" class="seller-form" onsubmit="handleSellerPublish(event)">
                <div class="form-group">
                    <label>Product Title</label>
                    <input type="text" id="seller-title" class="form-input" required placeholder="e.g. Sony Gaming Console PS5 Pro">
                </div>

                <div class="form-group">
                    <label>Category</label>
                    <select id="seller-category" class="dropdown-select" style="padding: 10px; font-size: 0.9rem;">
                        <option value="smartphones">Mobiles</option>
                        <option value="laptops">Laptops</option>
                        <option value="mobile-accessories">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                        <option value="kitchen-accessories">Kitchen</option>
                        <option value="furniture">Furniture</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="groceries">Groceries</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Price in USD ($)</label>
                    <input type="number" id="seller-price" class="form-input" required min="1" step="0.01" placeholder="49.99">
                </div>

                <div class="form-group">
                    <label>Image URL (Optional)</label>
                    <input type="url" id="seller-img" class="form-input" placeholder="https://... (Leave empty for default)">
                </div>

                <div class="form-group">
                    <label>Product Description</label>
                    <textarea id="seller-desc" class="form-input" rows="3" placeholder="Describe the key features of your product..."></textarea>
                </div>

                <button type="submit" class="btn-primary" style="margin-top: 15px;">
                    <i class="fa-solid fa-plus-circle"></i> Publish Product Live
                </button>
            </form>
        </div>
    `;
}

function handleSellerPublish(e) {
    e.preventDefault();
    const title = document.getElementById('seller-title').value.trim();
    const category = document.getElementById('seller-category').value;
    const price = parseFloat(document.getElementById('seller-price').value) || 29.99;
    const imgUrl = document.getElementById('seller-img').value.trim() || 'https://via.placeholder.com/300?text=' + encodeURIComponent(title);
    const desc = document.getElementById('seller-desc').value.trim() || 'High quality certified product listed on Amazon Clone.';

    const newProduct = {
        id: Date.now(),
        title: title,
        category: category,
        price: price,
        discountPercentage: 10,
        rating: 5.0,
        stock: 25,
        brand: currentUser.name || "Amazon Partner",
        thumbnail: imgUrl,
        description: desc
    };

    customProducts.unshift(newProduct);
    localStorage.setItem('amazon_custom_products', JSON.stringify(customProducts));

    playTone('success');
    alert(`🎉 Congratulations!\n\n"${title}" has been successfully listed in the store under '${category}'.`);
    loadCategory(category);
    showToast("Product published live!");
}

// Master Category Loader: loads full complete items for ANY category
function loadCategory(categoryKey, categoryName = null) {
    // Update active state in panel
    document.querySelectorAll('.panel-option a').forEach(a => {
        const cat = a.getAttribute('data-category');
        a.classList.toggle('active', cat === categoryKey);
    });

    if (categoryKey === 'customer-service') {
        renderCustomerServiceHub();
        return;
    }
    if (categoryKey === 'gift-cards') {
        renderGiftCardsHub();
        return;
    }
    if (categoryKey === 'sell') {
        renderSellerHub();
        return;
    }

    let title = categoryName;
    if (!title) {
        const matchingLink = document.querySelector(`.panel-option a[data-category="${categoryKey}"]`);
        title = matchingLink ? matchingLink.textContent.trim() : 'Featured Products';
    }

    if (categoryKey === 'home' || categoryKey === 'all') {
        allProducts = getHomeShowcase();
        if (resultsHeader && resultsTitle) {
            resultsTitle.textContent = `Featured Store Products (${allProducts.length} Items)`;
            resultsHeader.style.display = 'flex';
        }
        renderProducts(allProducts);
        return;
    }

    // Direct Instant Load from Comprehensive categoryProductsDatabase (50-100+ items per category)
    let normKey = categoryKey;
    if (normKey === 'mobile-accessories') normKey = 'electronics';
    if (normKey === 'kitchen-accessories') normKey = 'home-kitchen';
    const categoryItems = categoryProductsDatabase[normKey] || categoryProductsDatabase[categoryKey] || [];
    const matchingCustom = customProducts.filter(p => p.category === categoryKey || p.category === normKey);
    allProducts = [...matchingCustom, ...categoryItems];

    if (allProducts.length > 0) {
        if (resultsHeader && resultsTitle) {
            resultsTitle.textContent = `${title} (${allProducts.length} Items)`;
            resultsHeader.style.display = 'flex';
        }
        renderProducts(allProducts);
        return;
    }

    // Fallback if category key is external: query API
    showSkeletons(8);
    if (resultsHeader && resultsTitle) {
        resultsTitle.textContent = title;
        resultsHeader.style.display = 'flex';
    }

    fetch(`https://dummyjson.com/products/category/${categoryKey}`)
        .then(res => res.json())
        .then(data => {
            const apiItems = data.products || [];
            allProducts = [...matchingCustom, ...apiItems];
            if (resultsHeader && resultsTitle) {
                resultsTitle.textContent = `${title} (${allProducts.length} Items)`;
            }
            renderProducts(allProducts);
        })
        .catch(() => {
            allProducts = matchingCustom;
            renderProducts(allProducts);
        });
}

// Universal "A to Z" Search Engine - Guarantees results for ANY search query
function handleSearch() {
    const query = searchInput ? searchInput.value.trim() : '';
    const category = searchCategory ? searchCategory.value : 'all';

    if (query) {
        showSkeletons(8);
        const lowerQ = query.toLowerCase();
        const tokens = lowerQ.split(/\s+/).filter(t => t.length > 0);

        // Common Synonyms & Hindi/Hinglish Keyword Mapping
        const synonymMap = {
            'phone': ['smartphones', 'iphone', 'galaxy', 'mobile', 'cell'],
            'mobile': ['smartphones', 'phone', 'cell'],
            'mobiles': ['smartphones', 'phone'],
            'laptop': ['laptops', 'macbook', 'notebook', 'computer', 'pc'],
            'laptops': ['laptops', 'macbook'],
            'computer': ['laptops', 'pc'],
            'shoe': ['shoes', 'sneakers', 'boots', 'oxford', 'heels', 'footwear'],
            'shoes': ['shoes', 'sneakers', 'boots', 'oxford', 'heels', 'footwear'],
            'juta': ['shoes', 'sneakers', 'boots'],
            'joota': ['shoes', 'sneakers', 'boots'],
            'sneaker': ['shoes', 'sneakers', 'nike', 'adidas'],
            'sneakers': ['shoes', 'sneakers', 'nike', 'adidas'],
            'kapde': ['fashion', 'shirt', 'dress', 'jeans', 'kurta', 'saree'],
            'kapda': ['fashion', 'shirt', 'dress', 'jeans'],
            'clothes': ['fashion', 'shirt', 'dress', 'jeans'],
            'clothing': ['fashion'],
            'dress': ['fashion', 'dress', 'anarkali', 'lehenga', 'saree'],
            'dresses': ['fashion', 'dress'],
            'saree': ['fashion', 'saree', 'silk'],
            'sari': ['fashion', 'saree'],
            'shirt': ['fashion', 'shirt', 'polo'],
            'shirts': ['fashion', 'shirt'],
            'tshirt': ['fashion', 'shirt', 'tee'],
            't-shirt': ['fashion', 'shirt', 'tee'],
            'pant': ['fashion', 'jeans', 'chinos'],
            'pants': ['fashion', 'jeans'],
            'jeans': ['fashion', 'jeans', 'levi'],
            'watch': ['electronics', 'apple watch', 'galaxy watch', 'fossil'],
            'watches': ['electronics', 'apple watch', 'galaxy watch', 'fossil'],
            'ghadi': ['electronics', 'watch'],
            'headphone': ['electronics', 'sony', 'bose', 'airpods', 'headphones'],
            'headphones': ['electronics', 'sony', 'bose', 'airpods', 'headphones'],
            'earbuds': ['electronics', 'airpods', 'earbuds'],
            'earphone': ['electronics', 'airpods', 'earbuds'],
            'tv': ['electronics', 'oled', 'smart tv', 'samsung'],
            'television': ['electronics', 'smart tv'],
            'camera': ['electronics', 'dji', 'camera', 'drone'],
            'drone': ['electronics', 'toys', 'dji', 'drone'],
            'speaker': ['electronics', 'marshall', 'bose', 'speaker'],
            'perfume': ['beauty', 'fragrances', 'sauvage', 'dior', 'chanel', 'versace'],
            'perfumes': ['beauty', 'fragrances', 'sauvage', 'dior', 'chanel'],
            'scent': ['beauty', 'fragrances'],
            'fragrance': ['beauty', 'fragrances'],
            'makeup': ['beauty', 'lipstick', 'blush', 'foundation'],
            'lipstick': ['beauty', 'lipstick', 'charlotte tilbury', 'mac'],
            'cream': ['beauty', 'moisturizer', 'cerave', 'kiehl'],
            'skincare': ['beauty', 'serum', 'ordinary', 'cerave'],
            'kitchen': ['home-kitchen', 'kitchen-accessories', 'cookware', 'air fryer'],
            'cooker': ['home-kitchen', 'instant pot'],
            'fryer': ['home-kitchen', 'air fryer', 'philips', 'ninja'],
            'blender': ['home-kitchen', 'vitamix', 'nutribullet', 'ninja'],
            'coffee': ['home-kitchen', 'groceries', 'nespresso', 'breville', 'lavazza'],
            'chair': ['home-kitchen', 'furniture', 'herman miller', 'armchair'],
            'desk': ['home-kitchen', 'furniture', 'standing desk'],
            'sofa': ['home-kitchen', 'furniture', 'sectional'],
            'bed': ['home-kitchen', 'furniture', 'mattress'],
            'book': ['books', 'reading', 'novel'],
            'books': ['books', 'novel'],
            'kitab': ['books'],
            'novel': ['books'],
            'toy': ['toys', 'lego', 'games', 'barbie', 'nerf'],
            'toys': ['toys', 'lego', 'games', 'barbie', 'nerf'],
            'khilona': ['toys'],
            'game': ['toys', 'board game', 'catan', 'monopoly'],
            'games': ['toys', 'board game'],
            'lego': ['toys', 'lego'],
            'deal': ['deals', 'discount', 'sale', 'off'],
            'deals': ['deals', 'discount', 'sale'],
            'offer': ['deals'],
            'offers': ['deals'],
            'discount': ['deals']
        };

        // Expand query terms with synonyms
        let searchKeywords = [...tokens];
        tokens.forEach(tok => {
            if (synonymMap[tok]) {
                searchKeywords.push(...synonymMap[tok]);
            }
        });
        searchKeywords = [...new Set(searchKeywords)];

        const localMatches = [];
        const seenIds = new Set();

        function checkItemMatch(item) {
            const t = (item.title || '').toLowerCase();
            const c = (item.category || '').toLowerCase();
            const b = (item.brand || '').toLowerCase();
            const d = (item.description || '').toLowerCase();
            const fullText = `${t} ${c} ${b} ${d}`;

            // 1. Direct substring match
            if (fullText.includes(lowerQ)) return true;

            // 2. Keyword/Synonym match
            for (let kw of searchKeywords) {
                if (fullText.includes(kw)) return true;
            }

            return false;
        }

        // Search custom products first
        customProducts.forEach(item => {
            if (checkItemMatch(item)) {
                localMatches.push(item);
                seenIds.add(item.id);
            }
        });

        // Search complete category database
        Object.values(categoryProductsDatabase).forEach(list => {
            if (Array.isArray(list)) {
                list.forEach(item => {
                    if (!seenIds.has(item.id) && checkItemMatch(item)) {
                        localMatches.push(item);
                        seenIds.add(item.id);
                    }
                });
            }
        });

        let finalMatches = localMatches;
        if (category && category !== 'all') {
            const catMatches = localMatches.filter(p => p.category === category);
            if (catMatches.length > 0) finalMatches = catMatches;
        }

        // Render local matches instantly for 0ms ultra-fast response
        if (finalMatches.length > 0) {
            displaySearchResults(query, finalMatches);
        }

        // Try DummyJSON search in background to add any external hits
        fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
            .then(r => r.json())
            .then(data => {
                const apiMatches = data.products || [];
                let addedNew = false;
                apiMatches.forEach(item => {
                    if (!seenIds.has(item.id)) {
                        finalMatches.push(item);
                        seenIds.add(item.id);
                        addedNew = true;
                    }
                });
                if (addedNew || finalMatches.length === 0) {
                    displaySearchResults(query, finalMatches);
                }
            })
            .catch(() => {
                displaySearchResults(query, finalMatches);
            });
    } else if (category && category !== 'all') {
        const categoryName = searchCategory.options[searchCategory.selectedIndex].text;
        loadCategory(category, categoryName);
    } else {
        loadCategory('home');
    }
}

// Display Search Results with Guaranteed Non-Empty "A to Z" Fallback
function displaySearchResults(query, results) {
    if (!results || results.length === 0) {
        // Guaranteed A to Z results: If nothing matched exact tokens, show closest popular catalog items
        // plus create a dynamic verified match so the user NEVER sees an empty screen!
        const dynamicItem = {
            id: 999001 + Math.floor(Math.random() * 900),
            title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Prime Edition Deal`,
            category: "deals",
            price: 49.99,
            discountPercentage: 25.0,
            rating: 4.8,
            stock: 35,
            brand: "Amazon Choice",
            thumbnail: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M90 200l40-50 35 40 30-35 45 55H60z' fill='%23cbd5e1'/><circle cx='105' cy='105' r='22' fill='%23cbd5e1'/><text x='50%' y='85%' font-family='Segoe UI,sans-serif' font-size='14' font-weight='600' fill='%2394a3b8' text-anchor='middle'>Amazon Product</text></svg>",
            description: `Top rated ${query} item available with free Prime delivery, hassle-free returns, and 25% limited time savings.`
        };

        const popularShowcase = getHomeShowcase();
        results = [dynamicItem, ...popularShowcase];

        if (resultsHeader && resultsTitle) {
            resultsTitle.textContent = `Results for "${query}" (${results.length} Items Found)`;
            resultsHeader.style.display = 'flex';
        }
    } else {
        if (resultsHeader && resultsTitle) {
            resultsTitle.textContent = `Results for "${query}" (${results.length} Items Found)`;
            resultsHeader.style.display = 'flex';
        }
    }

    allProducts = results;
    renderProducts(allProducts);
}

// Open Product Modal
function openProductModal(productId) {
    let product = allProducts.find(p => p.id === productId);
    if (!product) {
        Object.values(categoryProductsDatabase).forEach(list => {
            const found = list.find(p => p.id === productId);
            if (found) product = found;
        });
    }
    if (!product || !productModal || !modalBody) return;

    const imgSrc = product.thumbnail || (product.images && product.images[0]);
    const isWishlisted = wishlist.includes(product.id);

    modalBody.innerHTML = `
        <div class="modal-img-col">
            <img src="${imgSrc}" alt="${escapeHtml(product.title)}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M90 200l40-50 35 40 30-35 45 55H60z' fill='%23cbd5e1'/><circle cx='105' cy='105' r='22' fill='%23cbd5e1'/><text x='50%' y='85%' font-family='Segoe UI,sans-serif' font-size='14' font-weight='600' fill='%2394a3b8' text-anchor='middle'>Amazon Product</text></svg>';" />
        </div>
        <div class="modal-info-col">
            <span class="modal-category">${escapeHtml(product.category || 'General')}</span>
            <h2 class="modal-title">${escapeHtml(product.title)}</h2>
            ${product.brand ? `<p style="font-size: 0.9rem; color: var(--text-secondary);">Brand: <strong>${escapeHtml(product.brand)}</strong></p>` : ''}
            
            <div class="modal-rating">
                ${generateStars(product.rating || 4.5)}
            </div>
            
            <div class="modal-price-box">
                <span class="modal-price">${formatPrice(product.price)}</span>
                ${product.discountPercentage ? `<span class="modal-discount">(${Math.round(product.discountPercentage)}% off)</span>` : ''}
                <div class="modal-stock" style="margin-top: 6px;">
                    <i class="fa-solid fa-check"></i> In Stock (${product.stock || 20} available)
                </div>
            </div>
            
            <p class="modal-description">${escapeHtml(product.description || 'No description available for this product.')}</p>
            
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button class="btn-add-cart" style="flex: 2; padding: 10px; font-size: 0.95rem;" onclick="addToCart(${product.id}); closeProductModal();">
                    <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
                <button class="btn-reset-store" style="flex: 1; border-radius: 20px; font-size: 0.85rem;" onclick="toggleWishlist(${product.id});">
                    <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart" style="color: #e11d48;"></i> ${isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
            </div>
        </div>
    `;

    productModal.style.display = 'flex';
}

function closeProductModal() {
    if (productModal) productModal.style.display = 'none';
}

// Cart Functionality
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = totalCount;
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    let product = allProducts.find(p => p.id === productId);
    if (!product) {
        Object.values(categoryProductsDatabase).forEach(list => {
            const found = list.find(p => p.id === productId);
            if (found) product = found;
        });
    }
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail || (product.images && product.images[0]),
            quantity: 1
        });
    }

    playTone('success');
    updateCartCount();
    showToast(`Added "${product.title.substring(0, 22)}..." to Cart`);
}

function changeQuantity(productId, delta) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        playTone('toggle');
        updateCartCount();
        renderCartItems();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    playTone('toggle');
    updateCartCount();
    renderCartItems();
    showToast('Item removed from Cart');
}

function renderCartItems() {
    if (!cartItemsContainer || !cartSubtotal) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty-msg">
                <i class="fa-solid fa-cart-arrow-down" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 12px;"></i>
                <h4>Your Amazon Cart is empty</h4>
                <p style="font-size: 0.85rem; margin-top: 6px;">Shop today's deals and add items to your cart!</p>
            </div>
        `;
        cartSubtotal.textContent = formatPrice(0);
        return;
    }

    let itemsHtml = '';
    let totalUsd = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalUsd += itemTotal;
        itemsHtml += `
            <div class="cart-item">
                <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" class="cart-item-img" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M90 200l40-50 35 40 30-35 45 55H60z' fill='%23cbd5e1'/><circle cx='105' cy='105' r='22' fill='%23cbd5e1'/><text x='50%' y='85%' font-family='Segoe UI,sans-serif' font-size='14' font-weight='600' fill='%2394a3b8' text-anchor='middle'>Amazon Product</text></svg>';" />
                <div class="cart-item-info">
                    <div class="cart-item-title">${escapeHtml(item.title)}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHtml;
    cartSubtotal.textContent = formatPrice(totalUsd);
}

function openCart() {
    renderCartItems();
    if (cartModal) cartModal.style.display = 'flex';
}

function closeCart() {
    if (cartModal) cartModal.style.display = 'none';
}

// Wishlist Functionality
function toggleWishlist(productId) {
    let product = allProducts.find(p => p.id === productId);
    if (!product) {
        Object.values(categoryProductsDatabase).forEach(list => {
            const found = list.find(p => p.id === productId);
            if (found) product = found;
        });
    }
    if (!product) return;

    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`Removed from Wishlist`);
    } else {
        wishlist.push(productId);
        playTone('wishlist');
        showToast(`Saved to Wishlist ❤️`);
    }

    localStorage.setItem('amazon_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderProducts(allProducts);
    if (wishlistModal && wishlistModal.style.display === 'flex') {
        renderWishlistItems();
    }
}

function updateWishlistBadge() {
    if (wishlistCountBadge) {
        wishlistCountBadge.textContent = wishlist.length;
    }
}

function renderWishlistItems() {
    if (!wishlistListContainer) return;

    if (wishlist.length === 0) {
        wishlistListContainer.innerHTML = `
            <div class="cart-empty-msg">
                <i class="fa-regular fa-heart" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 12px;"></i>
                <h4>Your Wishlist is empty</h4>
                <p style="font-size: 0.85rem; margin-top: 6px;">Click the heart icon on any product to save it here!</p>
            </div>
        `;
        return;
    }

    let html = '';
    wishlist.forEach(id => {
        let product = allProducts.find(p => p.id === id);
        if (!product) {
            Object.values(categoryProductsDatabase).forEach(list => {
                const found = list.find(p => p.id === id);
                if (found) product = found;
            });
        }
        if (product) {
            const imgSrc = product.thumbnail || (product.images && product.images[0]);
            html += `
                <div class="wishlist-item">
                    <img src="${imgSrc}" alt="${escapeHtml(product.title)}" class="wishlist-thumb" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M90 200l40-50 35 40 30-35 45 55H60z' fill='%23cbd5e1'/><circle cx='105' cy='105' r='22' fill='%23cbd5e1'/><text x='50%' y='85%' font-family='Segoe UI,sans-serif' font-size='14' font-weight='600' fill='%2394a3b8' text-anchor='middle'>Amazon Product</text></svg>';" />
                    <div class="wishlist-info">
                        <div class="wishlist-title">${escapeHtml(product.title)}</div>
                        <div class="wishlist-price">${formatPrice(product.price)}</div>
                    </div>
                    <div class="wishlist-actions">
                        <button class="btn-move-cart" onclick="addToCart(${product.id}); toggleWishlist(${product.id});">
                            <i class="fa-solid fa-cart-shopping"></i> Move to Cart
                        </button>
                        <button class="btn-remove-wishlist" onclick="toggleWishlist(${product.id})">Remove</button>
                    </div>
                </div>
            `;
        }
    });

    wishlistListContainer.innerHTML = html;
}

function openWishlist() {
    renderWishlistItems();
    if (wishlistModal) wishlistModal.style.display = 'flex';
    if (userDropdown) userDropdown.style.display = 'none';
}

function closeWishlist() {
    if (wishlistModal) wishlistModal.style.display = 'none';
}

// Orders Functionality
function updateOrdersBadge() {
    if (ordersCountBadge) {
        ordersCountBadge.textContent = orders.length;
    }
}

function renderOrdersList() {
    if (!ordersListContainer) return;

    if (orders.length === 0) {
        ordersListContainer.innerHTML = `
            <div class="cart-empty-msg">
                <i class="fa-solid fa-box-open" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 12px;"></i>
                <h4>No orders placed yet</h4>
                <p style="font-size: 0.85rem; margin-top: 6px;">Check out your favorite items to see them here.</p>
            </div>
        `;
        return;
    }

    let html = '';
    orders.forEach(order => {
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div class="order-product-item">
                    <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" class="order-product-thumb" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M90 200l40-50 35 40 30-35 45 55H60z' fill='%23cbd5e1'/><circle cx='105' cy='105' r='22' fill='%23cbd5e1'/><text x='50%' y='85%' font-family='Segoe UI,sans-serif' font-size='14' font-weight='600' fill='%2394a3b8' text-anchor='middle'>Amazon Product</text></svg>';" />
                    <div style="flex: 1;">
                        <div style="font-size: 0.85rem; font-weight: 600;">${escapeHtml(item.title)}</div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">Qty: ${item.quantity} × ${formatPrice(item.price)}</div>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <strong>Order #</strong> ${order.id} | <span style="font-size: 0.75rem;">${order.date}</span>
                    </div>
                    <div>
                        <span class="order-badge-status">${order.status}</span>
                    </div>
                </div>
                <div class="order-card-body">
                    ${itemsHtml}
                    <div style="text-align: right; margin-top: 8px; font-weight: 700; font-size: 0.95rem; border-top: 1px dashed var(--border-color); padding-top: 8px;">
                        Total: <span style="color: var(--price-color);">${order.totalFormatted}</span>
                    </div>
                </div>
            </div>
        `;
    });

    ordersListContainer.innerHTML = html;
}

function openOrders() {
    renderOrdersList();
    if (ordersModal) ordersModal.style.display = 'flex';
    if (userDropdown) userDropdown.style.display = 'none';
}

function closeOrders() {
    if (ordersModal) ordersModal.style.display = 'none';
}

// Theme Switching
function applyTheme(themeName) {
    currentTheme = themeName;
    localStorage.setItem('amazon_theme', themeName);

    document.body.classList.remove('dark-mode', 'midnight-mode');
    if (themeName === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (themeName === 'midnight') {
        document.body.classList.add('midnight-mode');
    }

    [themeLightBtn, themeDarkBtn, themeMidnightBtn].forEach(btn => {
        if (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === themeName);
        }
    });

    playTone('toggle');
    showToast(`Switched to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Mode`);
}

// User Profile & Authentication
function updateUserDataDisplay() {
    if (userDisplayName) userDisplayName.textContent = currentUser.name;
    if (navUserGreeting) navUserGreeting.textContent = `Hello, ${currentUser.name.split(' ')[0]}`;
    if (navSigninGreeting) navSigninGreeting.textContent = currentUser.isLoggedIn ? `Hello, ${currentUser.name.split(' ')[0]}` : 'Hello, sign in';
    if (userAuthBtn) {
        userAuthBtn.innerHTML = currentUser.isLoggedIn 
            ? '<i class="fa-solid fa-right-from-bracket"></i> Sign Out' 
            : '<i class="fa-solid fa-right-to-bracket"></i> Sign In / Register';
    }
}

function handleUserAuth() {
    if (currentUser.isLoggedIn) {
        currentUser.isLoggedIn = false;
        currentUser.name = 'Guest User';
        currentUser.email = 'guest@amazon.clone';
        localStorage.setItem('amazon_user', JSON.stringify(currentUser));
        updateUserDataDisplay();
        playTone('toggle');
        showToast('Signed out successfully');
        if (userDropdown) userDropdown.style.display = 'none';
    } else {
        if (authModal) {
            authNameInput.value = '';
            authEmailInput.value = '';
            authModal.style.display = 'flex';
        }
        if (userDropdown) userDropdown.style.display = 'none';
    }
}

// Settings Modal
function openSettingsModal() {
    if (settingsModal) {
        if (settingsNameInput) settingsNameInput.value = currentUser.name === 'Guest User' ? '' : currentUser.name;
        if (settingsEmailInput) settingsEmailInput.value = currentUser.email === 'guest@amazon.clone' ? '' : currentUser.email;
        if (settingsPhoneInput) settingsPhoneInput.value = currentUser.phone || '';
        settingsModal.style.display = 'flex';
    }
    if (userDropdown) userDropdown.style.display = 'none';
}

function closeSettingsModal() {
    if (settingsModal) settingsModal.style.display = 'none';
}

function closeAuthModal() {
    if (authModal) authModal.style.display = 'none';
}

// Reset Store Data
function resetAllStoreData() {
    if (confirm('Are you sure you want to reset all data (Cart, Wishlist, Orders, Settings)?')) {
        localStorage.clear();
        cart = [];
        wishlist = [];
        orders = [];
        customProducts = [];
        currentUser = {
            name: 'Guest User',
            email: 'guest@amazon.clone',
            isLoggedIn: false,
            phone: '',
            prime: true
        };
        currentTheme = 'light';
        currentCurrency = 'INR';
        currentCountry = 'India';
        soundEnabled = true;
        compactView = false;

        applyTheme('light');
        document.body.classList.remove('compact-grid');
        if (compactToggle) compactToggle.checked = false;
        if (soundToggle) soundToggle.checked = true;
        if (currencySelect) currencySelect.value = 'INR';
        if (countrySelect) countrySelect.value = 'India';
        if (navDeliveryCountry) navDeliveryCountry.textContent = 'India';

        updateCartCount();
        updateWishlistBadge();
        updateOrdersBadge();
        updateUserDataDisplay();
        loadCategory('home');

        if (userDropdown) userDropdown.style.display = 'none';
        showToast('All store data has been reset');
    }
}

// Toast Notifications
let toastTimeout;
function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.style.display = 'flex';

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

// Escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ==========================================
// Hero Carousel Controller (5 Automatic Slides)
// ==========================================
let currentSlideIndex = 0;
let heroSlideTimer = null;

function showHeroSlide(index) {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    if (!heroSlides || heroSlides.length === 0) return;

    if (index >= heroSlides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = heroSlides.length - 1;
    else currentSlideIndex = index;

    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });

    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function nextHeroSlide() {
    showHeroSlide(currentSlideIndex + 1);
}

function prevHeroSlide() {
    showHeroSlide(currentSlideIndex - 1);
}

function startHeroAutoSlide() {
    stopHeroAutoSlide();
    heroSlideTimer = setInterval(nextHeroSlide, 4500);
}

function stopHeroAutoSlide() {
    if (heroSlideTimer) {
        clearInterval(heroSlideTimer);
        heroSlideTimer = null;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // User Menu Dropdown Toggle
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (userDropdown) {
                userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    // Close Dropdown on outside click
    document.addEventListener('click', (e) => {
        if (userDropdown && userDropdown.style.display === 'block') {
            if (!userDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        }
    });

    // Theme Switcher Buttons
    if (themeLightBtn) themeLightBtn.addEventListener('click', () => applyTheme('light'));
    if (themeDarkBtn) themeDarkBtn.addEventListener('click', () => applyTheme('dark'));
    if (themeMidnightBtn) themeMidnightBtn.addEventListener('click', () => applyTheme('midnight'));

    // Currency Selector
    if (currencySelect) {
        currencySelect.value = currentCurrency;
        currencySelect.addEventListener('change', () => {
            currentCurrency = currencySelect.value;
            localStorage.setItem('amazon_currency', currentCurrency);
            playTone('toggle');
            renderProducts(allProducts);
            renderCartItems();
            renderWishlistItems();
            renderOrdersList();
            showToast(`Currency changed to ${currentCurrency}`);
        });
    }

    // Country Selector
    if (countrySelect) {
        countrySelect.value = currentCountry;
        if (navDeliveryCountry) navDeliveryCountry.textContent = currentCountry;
        countrySelect.addEventListener('change', () => {
            currentCountry = countrySelect.value;
            localStorage.setItem('amazon_country', currentCountry);
            if (navDeliveryCountry) navDeliveryCountry.textContent = currentCountry;
            playTone('toggle');
            showToast(`Delivery location updated to ${currentCountry}`);
        });
    }

    // Sound Toggle
    if (soundToggle) {
        soundToggle.checked = soundEnabled;
        soundToggle.addEventListener('change', () => {
            soundEnabled = soundToggle.checked;
            localStorage.setItem('amazon_sound', soundEnabled.toString());
            playTone('toggle');
            showToast(`Audio sound ${soundEnabled ? 'Enabled' : 'Disabled'}`);
        });
    }

    // Compact View Toggle
    if (compactToggle) {
        compactToggle.checked = compactView;
        if (compactView) document.body.classList.add('compact-grid');
        compactToggle.addEventListener('change', () => {
            compactView = compactToggle.checked;
            localStorage.setItem('amazon_compact', compactView.toString());
            document.body.classList.toggle('compact-grid', compactView);
            playTone('toggle');
            showToast(`Compact grid ${compactView ? 'Enabled' : 'Disabled'}`);
        });
    }

    // Quick Access Links
    if (viewOrdersBtn) viewOrdersBtn.addEventListener('click', (e) => { e.preventDefault(); openOrders(); });
    if (navOrdersBtn) navOrdersBtn.addEventListener('click', openOrders);
    if (ordersCloseBtn) ordersCloseBtn.addEventListener('click', closeOrders);

    if (viewWishlistBtn) viewWishlistBtn.addEventListener('click', (e) => { e.preventDefault(); openWishlist(); });
    if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', closeWishlist);

    if (viewSettingsBtn) viewSettingsBtn.addEventListener('click', (e) => { e.preventDefault(); openSettingsModal(); });
    if (editProfileBtn) editProfileBtn.addEventListener('click', (e) => { e.preventDefault(); openSettingsModal(); });
    if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettingsModal);

    // Auth Buttons
    if (userAuthBtn) userAuthBtn.addEventListener('click', handleUserAuth);
    if (navSigninBtn) navSigninBtn.addEventListener('click', handleUserAuth);
    if (authCloseBtn) authCloseBtn.addEventListener('click', closeAuthModal);

    // Settings Form Submission
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = settingsNameInput.value.trim();
            const email = settingsEmailInput.value.trim();
            const phone = settingsPhoneInput.value.trim();

            if (name) {
                currentUser.name = name;
                currentUser.email = email || currentUser.email;
                currentUser.phone = phone;
                currentUser.isLoggedIn = true;
                localStorage.setItem('amazon_user', JSON.stringify(currentUser));
                updateUserDataDisplay();
                closeSettingsModal();
                playTone('success');
                showToast('Account details updated successfully');
            }
        });
    }

    // Auth Form Submission
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = authNameInput.value.trim();
            const email = authEmailInput.value.trim();

            if (name && email) {
                currentUser.name = name;
                currentUser.email = email;
                currentUser.isLoggedIn = true;
                localStorage.setItem('amazon_user', JSON.stringify(currentUser));
                updateUserDataDisplay();
                closeAuthModal();
                playTone('success');
                showToast(`Welcome back, ${name}!`);
            }
        });
    }

    // Reset Store Data Button
    if (resetStoreBtn) resetStoreBtn.addEventListener('click', resetAllStoreData);

    // Hero Switch Country Link
    if (heroSwitchCountry) {
        heroSwitchCountry.addEventListener('click', (e) => {
            e.preventDefault();
            currentCountry = 'India';
            currentCurrency = 'INR';
            localStorage.setItem('amazon_country', 'India');
            localStorage.setItem('amazon_currency', 'INR');
            if (countrySelect) countrySelect.value = 'India';
            if (currencySelect) currencySelect.value = 'INR';
            if (navDeliveryCountry) navDeliveryCountry.textContent = 'India';
            renderProducts(allProducts);
            renderCartItems();
            playTone('success');
            showToast('Switched to Amazon India (INR)');
        });
    }

    // Search input & button
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);

    // Search Category change
    if (searchCategory) {
        searchCategory.addEventListener('change', () => {
            const category = searchCategory.value;
            loadCategory(category);
        });
    }

    // Cart Button & Drawer
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

    // Clear Cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
                cart = [];
                updateCartCount();
                renderCartItems();
                playTone('toggle');
                showToast('Cart cleared');
            }
        });
    }

    // Checkout (Places real order)
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            const totalUsd = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderId = 'ODR-' + Math.floor(100000 + Math.random() * 900000);
            const newOrder = {
                id: orderId,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                items: [...cart],
                totalFormatted: formatPrice(totalUsd),
                status: 'Arriving Tomorrow'
            };

            orders.unshift(newOrder);
            localStorage.setItem('amazon_orders', JSON.stringify(orders));

            cart = [];
            updateCartCount();
            updateOrdersBadge();
            closeCart();

            playTone('success');
            alert(`🎉 Order Placed Successfully!\n\nOrder ID: ${orderId}\nTotal: ${newOrder.totalFormatted}\nDelivery: ${currentCountry}\n\nCheck 'Your Orders' in the User Menu to track your package.`);
            showToast('Order confirmed! View in Orders.');
        });
    }

    // Product Modal Close
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);

    // Close Modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
        if (e.target === cartModal) closeCart();
        if (e.target === ordersModal) closeOrders();
        if (e.target === wishlistModal) closeWishlist();
        if (e.target === settingsModal) closeSettingsModal();
        if (e.target === authModal) closeAuthModal();
    });

    // Back to top
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Reset filter button
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (searchCategory) searchCategory.value = 'all';
            loadCategory('home');
        });
    }

    // Panel Links Filter (Every link in panel line)
    document.querySelectorAll('.panel-option a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            if (category) {
                loadCategory(category, link.textContent.trim());
            }
        });
    });

    // Panel All Button
    const panelAllBtn = document.getElementById('panel-all-btn');
    if (panelAllBtn) {
        panelAllBtn.addEventListener('click', () => {
            loadCategory('home');
        });
    }

    // Deals in Electronics button in panel
    if (dealsBtn) {
        dealsBtn.addEventListener('click', () => {
            loadCategory('mobile-accessories', 'Deals in Electronics');
        });
    }

    // Logo click: reload all
    document.querySelectorAll('.logo').forEach(logo => {
        logo.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (searchCategory) searchCategory.value = 'all';
            loadCategory('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    // Hero Carousel Controls
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroSliderContainer = document.getElementById('hero-slider-container');

    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index'));
            showHeroSlide(idx);
            startHeroAutoSlide();
        });
    });

    if (heroSliderContainer) {
        heroSliderContainer.addEventListener('mouseenter', stopHeroAutoSlide);
        heroSliderContainer.addEventListener('mouseleave', startHeroAutoSlide);
    }
}

// Populate search category dropdown
function populateSearchDropdown() {
    if (!searchCategory) return;
    const cats = [
        { value: 'all', text: 'All Categories' },
        { value: 'deals', text: "Today's Deals" },
        { value: 'smartphones', text: 'Mobiles' },
        { value: 'laptops', text: 'Laptops' },
        { value: 'mobile-accessories', text: 'Electronics' },
        { value: 'fashion', text: 'Fashion' },
        { value: 'beauty', text: 'Beauty' },
        { value: 'kitchen-accessories', text: 'Kitchen' },
        { value: 'books', text: 'Books' },
        { value: 'toys', text: 'Toys & Games' },
        { value: 'furniture', text: 'Furniture' },
        { value: 'fragrances', text: 'Fragrances' },
        { value: 'groceries', text: 'Groceries' }
    ];

    searchCategory.innerHTML = '';
    cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.value;
        opt.textContent = c.text;
        searchCategory.appendChild(opt);
    });
}

// Initialise App
function init() {
    applyTheme(currentTheme);
    updateUserDataDisplay();
    updateCartCount();
    updateWishlistBadge();
    updateOrdersBadge();
    populateSearchDropdown();
    setupEventListeners();
    startHeroAutoSlide();
    loadCategory('home');
}

document.addEventListener('DOMContentLoaded', init);
