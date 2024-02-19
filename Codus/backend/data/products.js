const products = [
  {
    name: 'Organic Apples (per kg)',
    image: 'https://source.unsplash.com/300x200/?apples',
    description: 'Fresh organic apples, crisp and sweet',
    brand: 'GreenMart',
    category: 'Grocery',
    price: Math.floor(Math.random() * (200 - 100 + 1)) + 100, // Random price between 100 and 200 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Whole Wheat Bread',
    image: 'https://source.unsplash.com/300x200/?bread',
    description: 'Nutritious whole wheat bread slices',
    brand: 'GreenMart',
    category: 'Grocery',
    price: Math.floor(Math.random() * (150 - 50 + 1)) + 50, // Random price between 50 and 150 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Cage-Free Eggs (per dozen)',
    image: 'https://source.unsplash.com/300x200/?eggs',
    description: 'Dozen cage-free brown eggs',
    brand: 'GreenMart',
    category: 'Grocery',
    price: Math.floor(Math.random() * (80 - 50 + 1)) + 50, // Random price between 50 and 80 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Greek Yogurt',
    image: 'https://source.unsplash.com/300x200/?yogurt',
    description: 'Creamy Greek yogurt, assorted flavors',
    brand: 'GreenMart',
    category: 'Dairy',
    price: Math.floor(Math.random() * (120 - 80 + 1)) + 80, // Random price between 80 and 120 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Organic Spinach (per bunch)',
    image: 'https://source.unsplash.com/300x200/?spinach',
    description: 'Organic baby spinach leaves',
    brand: 'GreenMart',
    category: 'Produce',
    price: Math.floor(Math.random() * (70 - 40 + 1)) + 40, // Random price between 40 and 70 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Grass-Fed Beef (per kg)',
    image: 'https://source.unsplash.com/300x200/?beef',
    description: 'Lean grass-fed ground beef',
    brand: 'GreenMart',
    category: 'Meat',
    price: Math.floor(Math.random() * (600 - 400 + 1)) + 400, // Random price between 400 and 600 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Quinoa (per kg)',
    image: 'https://source.unsplash.com/300x200/?quinoa',
    description: 'White quinoa, rich in protein',
    brand: 'GreenMart',
    category: 'Grains',
    price: Math.floor(Math.random() * (300 - 200 + 1)) + 200, // Random price between 200 and 300 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Avocado (per piece)',
    image: 'https://source.unsplash.com/300x200/?avocado',
    description: 'Ripe Hass avocado, ready to eat',
    brand: 'GreenMart',
    category: 'Produce',
    price: Math.floor(Math.random() * (100 - 70 + 1)) + 70, // Random price between 70 and 100 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Almond Milk (per liter)',
    image: 'https://source.unsplash.com/300x200/?almondmilk',
    description: 'Unsweetened almond milk',
    brand: 'GreenMart',
    category: 'Dairy',
    price: Math.floor(Math.random() * (150 - 100 + 1)) + 100, // Random price between 100 and 150 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Organic Tomatoes (per kg)',
    image: 'https://source.unsplash.com/300x200/?tomatoes',
    description: 'Vine-ripened organic tomatoes',
    brand: 'GreenMart',
    category: 'Produce',
    price: Math.floor(Math.random() * (120 - 80 + 1)) + 80, // Random price between 80 and 120 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Whole Grain Pasta',
    image: 'https://source.unsplash.com/300x200/?pasta',
    description: 'Whole grain penne pasta',
    brand: 'GreenMart',
    category: 'Pasta',
    price: Math.floor(Math.random() * (90 - 60 + 1)) + 60, // Random price between 60 and 90 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Organic Broccoli (per bunch)',
    image: 'https://source.unsplash.com/300x200/?broccoli',
    description: 'Fresh organic broccoli florets',
    brand: 'GreenMart',
    category: 'Produce',
    price: Math.floor(Math.random() * (100 - 70 + 1)) + 70, // Random price between 70 and 100 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Wild Salmon Fillet (per kg)',
    image: 'https://source.unsplash.com/300x200/?salmon',
    description: 'Wild-caught salmon fillet',
    brand: 'GreenMart',
    category: 'Seafood',
    price: Math.floor(Math.random() * (800 - 600 + 1)) + 600, // Random price between 600 and 800 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sweet Potatoes (per kg)',
    image: 'https://source.unsplash.com/300x200/?sweetpotatoes',
    description: 'Organic sweet potatoes',
    brand: 'GreenMart',
    category: 'Produce',
    price: Math.floor(Math.random() * (90 - 60 + 1)) + 60, // Random price between 60 and 90 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Green Tea (per box)',
    image: 'https://source.unsplash.com/300x200/?greentea',
    description: 'Organic green tea bags',
    brand: 'GreenMart',
    category: 'Beverages',
    price: Math.floor(Math.random() * (120 - 80 + 1)) + 80, // Random price between 80 and 120 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Bananas (per dozen)',
    image: 'https://source.unsplash.com/300x200/?bananas',
    description: 'Fresh bananas, ripe and delicious',
    brand: 'GreenMart',
    category: 'Produce',
    price: Math.floor(Math.random() * (60 - 30 + 1)) + 30, // Random price between 30 and 60 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'White Rice (per kg)',
    image: 'https://source.unsplash.com/300x200/?rice',
    description: 'Premium quality white rice grains',
    brand: 'GreenMart',
    category: 'Grains',
    price: Math.floor(Math.random() * (80 - 50 + 1)) + 50, // Random price between 50 and 80 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Red Lentils (per kg)',
    image: 'https://source.unsplash.com/300x200/?lentils',
    description: 'Nutritious red lentils, rich in protein',
    brand: 'GreenMart',
    category: 'Grains',
    price: Math.floor(Math.random() * (70 - 40 + 1)) + 40, // Random price between 40 and 70 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Dark Chocolate (per bar)',
    image: 'https://source.unsplash.com/300x200/?chocolate',
    description: 'Rich and indulgent dark chocolate bar',
    brand: 'GreenMart',
    category: 'Snacks',
    price: Math.floor(Math.random() * (100 - 50 + 1)) + 50, // Random price between 50 and 100 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Orange Juice (per liter)',
    image: 'https://source.unsplash.com/300x200/?orangejuice',
    description: 'Freshly squeezed orange juice',
    brand: 'GreenMart',
    category: 'Beverages',
    price: Math.floor(Math.random() * (80 - 40 + 1)) + 40, // Random price between 40 and 80 INR
    countInStock: Math.floor(Math.random() * 99) + 2,
    rating: 0,
    numReviews: 0,
  },
];


export default products;
