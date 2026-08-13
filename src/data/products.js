export const products = [
  // WOMEN (12 Products)
  {
    id: 'w1',
    title: "High-Rise Straight Jeans",
    price: 649.00,
    oldPrice: 1499.00,
    category: 'women', // keeping women so the w1 route still works as expected by user
    isBestseller: true,
    image1: '/product/1.png',
    image2: '/product/2.png',
    image3: '/product/3.png',
    description: 'Designed with precision and crafted from the finest denim, this piece embodies the Sagasa commitment to modern luxury and everyday wearability.'
  },
  {
    id: 'w2',
    title: 'Tailored Linen Trousers',
    price: 120.00,
    category: 'women',
    image1: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'High-waisted linen trousers with a wide leg.'
  },
  {
    id: 'w3',
    title: 'Oversized Wool Blazer',
    price: 150.00,
    oldPrice: 210.00,
    category: 'women',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Structured yet oversized wool blazer. A modern take on classic tailoring.'
  },
  {
    id: 'w4',
    title: 'Silk Midi Slip Dress',
    price: 195.00,
    category: 'women',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant silk slip dress with delicate straps.'
  },
  {
    id: 'w5',
    title: 'Chunky Knit Cardigan',
    price: 85.00,
    oldPrice: 130.00,
    category: 'women',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Cozy oversized cardigan for cooler evenings.'
  },
  {
    id: 'w6',
    title: 'Classic White Button-Down',
    price: 65.00,
    category: 'women',
    image1: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Crisp cotton poplin shirt with a relaxed fit.'
  },
  {
    id: 'w7',
    title: 'High-Rise Straight Jeans',
    price: 110.00,
    category: 'women',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Vintage-inspired denim with a flattering high waist.'
  },
  {
    id: 'w8',
    title: 'Cashmere Turtleneck',
    price: 165.00,
    oldPrice: 220.00,
    category: 'women',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Luxuriously soft 100% cashmere sweater.'
  },
  {
    id: 'w9',
    title: 'Pleated Midi Skirt',
    price: 95.00,
    category: 'women',
    image1: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Flowy accordion-pleat skirt.'
  },
  {
    id: 'w10',
    title: 'Leather Chelsea Boots',
    price: 210.00,
    category: 'women',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Classic leather boots with elastic side panels.'
  },
  {
    id: 'w11',
    title: 'Minimalist Leather Tote',
    price: 145.00,
    oldPrice: 185.00,
    category: 'women',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Spacious leather tote with a clean interior.'
  },
  {
    id: 'w12',
    title: 'Double-Breasted Trench Coat',
    price: 280.00,
    category: 'women',
    image1: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A timeless silhouette for transitional weather.'
  },

  // MEN (12 Products)
  {
    id: 'm1',
    title: 'Ribbed Knit Sweater',
    price: 95.00,
    category: 'men',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight ribbed knit sweater. Exceptionally warm.'
  },
  {
    id: 'm2',
    title: 'Classic Denim Jacket',
    price: 110.00,
    oldPrice: 140.00,
    category: 'men',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Vintage-washed denim jacket with a relaxed fit.'
  },
  {
    id: 'm3',
    title: 'Oxford Cloth Button-Down',
    price: 75.00,
    category: 'men',
    image1: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'The definitive everyday shirt.'
  },
  {
    id: 'm4',
    title: 'Slim Fit Chinos',
    price: 85.00,
    category: 'men',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Versatile cotton chinos with a hint of stretch.'
  },
  {
    id: 'm5',
    title: 'Wool Blend Topcoat',
    price: 260.00,
    oldPrice: 320.00,
    category: 'men',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A sharp outer layer for the colder months.'
  },
  {
    id: 'm6',
    title: 'Premium Crewneck Sweatshirt',
    price: 60.00,
    category: 'men',
    image1: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight French terry cotton.'
  },
  {
    id: 'm7',
    title: 'Straight Leg Selvedge Denim',
    price: 150.00,
    category: 'men',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Raw selvedge denim that ages beautifully.'
  },
  {
    id: 'm8',
    title: 'Merino Wool Polo',
    price: 70.00,
    oldPrice: 95.00,
    category: 'men',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Breathable, temperature-regulating merino wool.'
  },
  {
    id: 'm9',
    title: 'Camp Collar Linen Shirt',
    price: 80.00,
    category: 'men',
    image1: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Relaxed fit linen shirt for high summer.'
  },
  {
    id: 'm10',
    title: 'Leather Minimalist Sneakers',
    price: 180.00,
    category: 'men',
    isBestseller: true,
    image1: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Italian leather sneakers with a clean profile.'
  },
  {
    id: 'm11',
    title: 'Quilted Vest',
    price: 105.00,
    oldPrice: 140.00,
    category: 'men',
    isSale: true,
    image1: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight warmth for layering.'
  },
  {
    id: 'm12',
    title: 'Corduroy Overshirt',
    price: 90.00,
    category: 'men',
    image1: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A rugged layering piece in fine-wale corduroy.'
  }
];
