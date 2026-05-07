import BeautyIcon from "../ui/icons/common/BeautyIcon";
import BooksIcon from "../ui/icons/common/BooksIcon";
import ElectronicsIcon from "../ui/icons/common/ElectronicsIcon";
import FashionIcon from "../ui/icons/common/FashionIcon";
import FoodDrinksIcon from "../ui/icons/common/FoodDrinksIcon";
import HomeLivingIcon from "../ui/icons/common/HomeLivingIcon";
import SportsIcon from "../ui/icons/common/SportsIcon";
import ToysKidsIcon from "../ui/icons/common/ToysKidsIcon";

export const CATEGORY_DATA = [
  {
    id: 'electronics', label: 'Electronics', emoji: '📱', icon: ElectronicsIcon, color: '#edeed8',
    items: ['Smartphones', 'Laptops', 'Headphones', 'Smartwatches', 'Cameras', 'Accessories'],
    featured: { label: 'Top Pick', name: 'ProSound Headphones X1', discount: '40% off' },
  },
  {
    id: 'fashion', label: 'Fashion', emoji: '👗', icon: FashionIcon, color: '#fbeaf0',
    items: ["Men's Clothing", "Women's Clothing", 'Shoes & Sneakers', 'Bags', 'Watches', 'Jewellery'],
    featured: { label: 'New In', name: 'Urban Oversized Hoodie', discount: '36% off' },
  },
  {
    id: 'home', label: 'Home & Living', emoji: '🏠', icon: HomeLivingIcon, color: '#eaf3de',
    items: ['Furniture', 'Kitchen', 'Bedding', 'Lighting', 'Storage', 'Decor'],
    featured: { label: 'Trending', name: 'Pour-Over Coffee Set', discount: '35% off' },
  },
  {
    id: 'beauty', label: 'Beauty', emoji: '✨', icon: BeautyIcon, color: '#faeeda',
    items: ['Skincare', 'Haircare', 'Fragrance', 'Makeup', 'Tools', "Men's Grooming"],
    featured: { label: 'Best Seller', name: 'Vitamin C Serum', discount: '36% off' },
  },
  {
    id: 'sports', label: 'Sports', emoji: '⚽', icon: SportsIcon, color: '#e1f5ee',
    items: ['Gym Equipment', 'Running', 'Yoga & Pilates', 'Outdoor', 'Team Sports', 'Recovery'],
    featured: { label: 'Hot Deal', name: 'Resistance Band Set', discount: '44% off' },
  },
  {
    id: 'books', label: 'Books', emoji: '📚', icon: BooksIcon, color: '#f3f2ef',
    items: ['Self Help', 'Business', 'Fiction', 'Science', 'Biography', "Children's"],
    featured: { label: 'Bestseller', name: 'Atomic Habits', discount: '35% off' },
  },
  {
    id: 'toys', label: 'Toys & Kids', emoji: '🧸', icon: ToysKidsIcon, color: '#fbeaf0',
    items: ['Educational', 'STEM Kits', 'Action Figures', 'Outdoor Play', 'Arts & Crafts', 'Baby'],
    featured: { label: 'Top Rated', name: 'STEM Robot Kit', discount: '38% off' },
  },
  {
    id: 'food', label: 'Food & Drinks', emoji: '🍫', icon: FoodDrinksIcon, color: '#faeeda',
    items: ['Coffee & Tea', 'Snacks', 'Health Foods', 'Beverages', 'Cooking', 'Gift Sets'],
    featured: { label: 'Premium', name: 'Matcha Starter Kit', discount: '33% off' },
  },
];