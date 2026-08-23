import { FoodItem } from '../types/food';

export const foodItems: FoodItem[] = [
  // Pizza Palace (res-1)
  {
    id: 'food-1',
    restaurantId: 'res-1',
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400',
    price: 299,
    category: 'Pizza',
    isVeg: true,
    rating: 4.5,
    isPopular: true,
    customizations: [
      {
        id: 'cust-1',
        title: 'Size',
        isRequired: true,
        options: [
          { id: 'opt-1', name: 'Regular', price: 0 },
          { id: 'opt-2', name: 'Medium', price: 150 },
          { id: 'opt-3', name: 'Large', price: 250 }
        ]
      },
      {
        id: 'cust-2',
        title: 'Extra Toppings',
        isRequired: false,
        maxSelection: 3,
        options: [
          { id: 'opt-4', name: 'Cheese', price: 50 },
          { id: 'opt-5', name: 'Olives', price: 30 },
          { id: 'opt-6', name: 'Jalapenos', price: 30 }
        ]
      }
    ]
  },
  {
    id: 'food-2',
    restaurantId: 'res-1',
    name: 'Pepperoni Passion',
    description: 'Loaded with extra pepperoni and mozzarella.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    price: 499,
    category: 'Pizza',
    isVeg: false,
    rating: 4.8,
    isPopular: true
  },
  {
      id: 'food-3',
      restaurantId: 'res-1',
      name: 'Farmhouse Pizza',
      description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.',
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400',
      price: 399,
      category: 'Pizza',
      isVeg: true,
      rating: 4.4
  },
  {
      id: 'food-4',
      restaurantId: 'res-1',
      name: 'Garlic Breadsticks',
      description: 'Freshly baked breadsticks with a hint of garlic.',
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400',
      price: 99,
      category: 'Starters',
      isVeg: true
  },
  {
      id: 'food-5',
      restaurantId: 'res-1',
      name: 'Choco Lava Cake',
      description: 'Warm chocolate cake with a gooey center.',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
      price: 129,
      category: 'Desserts',
      isVeg: true
  },

  // Burger Point (res-2)
  {
    id: 'food-6',
    restaurantId: 'res-2',
    name: 'Classic Veg Burger',
    description: 'Crispy veg patty with fresh lettuce and mayo.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
    price: 149,
    category: 'Burger',
    isVeg: true,
    rating: 4.2,
    isPopular: true
  },
  {
    id: 'food-7',
    restaurantId: 'res-2',
    name: 'Double Cheese Chicken Burger',
    description: 'Two juicy chicken patties with double cheddar cheese.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    price: 249,
    category: 'Burger',
    isVeg: false,
    rating: 4.6,
    isPopular: true
  },
  {
      id: 'food-8',
      restaurantId: 'res-2',
      name: 'Peri Peri Fries',
      description: 'Crispy fries tossed in spicy peri peri seasoning.',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
      price: 119,
      category: 'Sides',
      isVeg: true
  },
  {
      id: 'food-9',
      restaurantId: 'res-2',
      name: 'Chocolate Milkshake',
      description: 'Thick and creamy chocolate shake.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
      price: 179,
      category: 'Shakes',
      isVeg: true
  },

  // Royal Biryani (res-3)
  {
    id: 'food-10',
    restaurantId: 'res-3',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Authentic spice-infused biryani with tender chicken.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b11adbc936?w=400',
    price: 349,
    category: 'Biryani',
    isVeg: false,
    rating: 4.9,
    isPopular: true
  },
  {
      id: 'food-11',
      restaurantId: 'res-3',
      name: 'Paneer Dum Biryani',
      description: 'Slow-cooked biryani with marinated paneer cubes.',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
      price: 299,
      category: 'Biryani',
      isVeg: true,
      rating: 4.5
  },
  {
      id: 'food-12',
      restaurantId: 'res-3',
      name: 'Chicken 65',
      description: 'Spicy, deep-fried chicken pieces.',
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400',
      price: 259,
      category: 'Starters',
      isVeg: false
  },
  {
    id: 'food-13-1',
    restaurantId: 'res-3',
    name: 'Egg Biryani',
    description: 'Flavorful biryani with hard-boiled eggs and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&sig=egg-biryani',
    price: 249,
    category: 'Biryani',
    isVeg: false,
    rating: 4.3
  },
  {
    id: 'food-13-2',
    restaurantId: 'res-3',
    name: 'Mutton Dum Biryani',
    description: 'Rich and hearty biryani with slow-cooked tender mutton.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400',
    price: 499,
    category: 'Biryani',
    isVeg: false,
    rating: 4.8
  },
  {
    id: 'food-13-3',
    restaurantId: 'res-3',
    name: 'Veg Hyderabadi Biryani',
    description: 'Aromatic basmati rice cooked with assorted vegetables and spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b11adbc936?w=400&sig=veg-biryani',
    price: 279,
    category: 'Biryani',
    isVeg: true,
    rating: 4.4
  },
  {
    id: 'food-13-4',
    restaurantId: 'res-11',
    name: 'Lucknowi Chicken Biryani',
    description: 'Mildly spiced, fragrant biryani in the Awadhi style.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&sig=lucknowi-biryani',
    price: 369,
    category: 'Biryani',
    isVeg: false,
    rating: 4.6
  },
  {
    id: 'food-13-5',
    restaurantId: 'res-11',
    name: 'Kolkata Biryani',
    description: 'Unique biryani with potatoes and boiled eggs.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b11adbc936?w=400&sig=kolkata-biryani',
    price: 329,
    category: 'Biryani',
    isVeg: false,
    rating: 4.5
  },
  {
    id: 'food-13-6',
    restaurantId: 'res-19',
    name: 'Tandoori Chicken Biryani',
    description: 'Biryani served with juicy tandoori chicken pieces.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&sig=tandoori-biryani',
    price: 389,
    category: 'Biryani',
    isVeg: false,
    rating: 4.7
  },
  {
    id: 'food-13-7',
    restaurantId: 'res-19',
    name: 'Mushroom Biryani',
    description: 'Vegetarian delight with earthy mushrooms and long-grain rice.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b11adbc936?w=400&sig=mushroom-biryani',
    price: 269,
    category: 'Biryani',
    isVeg: true,
    rating: 4.2
  },
  {
    id: 'food-13-8',
    restaurantId: 'res-23',
    name: 'Afghani Pulao',
    description: 'Mildly sweet and nutty pulao with tender meat chunks.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&sig=afghani-pulao',
    price: 429,
    category: 'Biryani',
    isVeg: false,
    rating: 4.6
  },
  {
      id: 'food-13',
      restaurantId: 'res-3',
      name: 'Mutton Seekh Kebab',
      description: 'Succulent mutton mince kebabs grilled to perfection.',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
      price: 399,
      category: 'Starters',
      isVeg: false
  },

  // Green Kitchen (res-4)
  {
      id: 'food-14',
      restaurantId: 'res-4',
      name: 'Quinoa Salad',
      description: 'Fresh quinoa with mixed greens and lemon vinaigrette.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      price: 249,
      category: 'Healthy',
      isVeg: true,
      rating: 4.3
  },
  {
      id: 'food-15',
      restaurantId: 'res-4',
      name: 'Green Smoothie',
      description: 'Spinach, kale, apple, and ginger blend.',
      image: 'https://images.unsplash.com/photo-1515555233972-e2a4e5d436e6?w=400',
      price: 189,
      category: 'Healthy',
      isVeg: true
  },

  // Dragon Wok (res-5)
  {
      id: 'food-16',
      restaurantId: 'res-5',
      name: 'Kung Pao Chicken',
      description: 'Spicy stir-fry chicken with peanuts and vegetables.',
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400',
      price: 329,
      category: 'Chinese',
      isVeg: false,
      rating: 4.4,
      isPopular: true
  },
  {
      id: 'food-17',
      restaurantId: 'res-5',
      name: 'Veg Hakka Noodles',
      description: 'Classic street-style stir-fried noodles with veggies.',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
      price: 219,
      category: 'Chinese',
      isVeg: true
  },

  // Sweet Tooth (res-6)
  {
      id: 'food-18',
      restaurantId: 'res-6',
      name: 'Red Velvet Pastry',
      description: 'Rich and velvety pastry with cream cheese frosting.',
      image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400',
      price: 149,
      category: 'Desserts',
      isVeg: true,
      rating: 4.7,
      isPopular: true
  },

  // South Flavors (res-7)
  {
      id: 'food-19',
      restaurantId: 'res-7',
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spicy potato mash.',
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
      price: 129,
      category: 'South Indian',
      isVeg: true,
      rating: 4.6,
      isPopular: true
  }
];

// Helper to generate more items for the remaining restaurants
const generateMockFoodItems = () => {
  const categories = ['Main Course', 'Starters', 'Desserts', 'Beverages'];
  const baseItems = [...foodItems];

  for (let i = 8; i <= 30; i++) {
    const resId = `res-${i}`;
    categories.forEach((cat, index) => {
      baseItems.push({
        id: `food-${resId}-${index}`,
        restaurantId: resId,
        name: `${cat} Delight ${i}`,
        description: `A delicious ${cat.toLowerCase()} from restaurant ${i}.`,
        image: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&sig=${resId}${index}`,
        price: 200 + (i * 5) + (index * 20),
        category: cat,
        isVeg: i % 2 === 0,
        rating: 4.0 + (Math.random() * 0.9)
      });
    });
  }
  return baseItems;
};

export const allFoodItems = generateMockFoodItems();
