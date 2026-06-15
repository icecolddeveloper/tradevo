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
    items: [
      { id: 'headphones',   label: 'Headphones & Earbuds' },
      { id: 'smartwatches', label: 'Smartwatches' },
      { id: 'smartphones',  label: 'Smartphones' },
      { id: 'laptops',      label: 'Laptops' },
      { id: 'cameras',      label: 'Cameras' },
      { id: 'accessories',  label: 'Accessories' },
    ],
    featured: { label: 'Top Pick', name: 'ProSound Headphones X1', discount: '40% off' },
  },
  {
    id: 'fashion', label: 'Fashion', emoji: '👗', icon: FashionIcon, color: '#fbeaf0',
    items: [
      { id: 'mens-clothing',   label: "Men's Clothing" },
      { id: 'womens-clothing', label: "Women's Clothing" },
      { id: 'shoes-sneakers',  label: 'Shoes & Sneakers' },
      { id: 'bags',            label: 'Bags' },
      { id: 'watches',         label: 'Watches' },
      { id: 'accessories',     label: 'Accessories' },
    ],
    featured: { label: 'New In', name: 'Urban Oversized Hoodie', discount: '36% off' },
  },
  {
    id: 'home', label: 'Home & Living', emoji: '🏠', icon: HomeLivingIcon, color: '#eaf3de',
    items: [
      { id: 'kitchen',         label: 'Kitchen' },
      { id: 'bedding',         label: 'Bedding' },
      { id: 'furniture',       label: 'Furniture' },
      { id: 'storage',         label: 'Storage' },
      { id: 'decor',           label: 'Decor' },
      { id: 'home-appliances', label: 'Home Appliances' },
    ],
    featured: { label: 'Trending', name: 'Pour-Over Coffee Set', discount: '35% off' },
  },
  {
    id: 'beauty', label: 'Beauty', emoji: '✨', icon: BeautyIcon, color: '#faeeda',
    items: [
      { id: 'skincare', label: 'Skincare' },
      { id: 'haircare', label: 'Haircare' },
      { id: 'makeup',   label: 'Makeup' },
      { id: 'tools',    label: 'Tools' },
      { id: 'fragrance',     label: 'Fragrance' },
      { id: 'mens-grooming', label: "Men's Grooming" },
    ],
    featured: { label: 'Best Seller', name: 'Vitamin C Serum', discount: '36% off' },
  },
  {
    id: 'sports', label: 'Sports', emoji: '⚽', icon: SportsIcon, color: '#e1f5ee',
    items: [
      { id: 'gym-equipment', label: 'Gym Equipment' },
      { id: 'running',       label: 'Running' },
      { id: 'yoga-pilates',  label: 'Yoga & Pilates' },
      { id: 'recovery',      label: 'Recovery' },
      { id: 'outdoor',       label: 'Outdoor' },
      { id: 'team-sports',   label: 'Team Sports' },
    ],
    featured: { label: 'Hot Deal', name: 'Resistance Band Set', discount: '44% off' },
  },
  {
    id: 'books', label: 'Books', emoji: '📚', icon: BooksIcon, color: '#f3f2ef',
    items: [
      { id: 'self-help', label: 'Self Help' },
      { id: 'business',  label: 'Business' },
      { id: 'fiction',   label: 'Fiction' },
      { id: 'science',   label: 'Science' },
      { id: 'biography', label: 'Biography' },
      { id: 'childrens', label: "Children's" },
    ],
    featured: { label: 'Bestseller', name: 'Atomic Habits', discount: '35% off' },
  },
  {
    id: 'toys', label: 'Toys & Kids', emoji: '🧸', icon: ToysKidsIcon, color: '#fbeaf0',
    items: [
      { id: 'educational',    label: 'Educational' },
      { id: 'stem-kits',      label: 'STEM Kits' },
      { id: 'action-figures', label: 'Action Figures' },
      { id: 'outdoor-play',   label: 'Outdoor Play' },
      { id: 'arts-crafts',    label: 'Arts & Crafts' },
      { id: 'baby',           label: 'Baby' },
    ],
    featured: { label: 'Top Rated', name: 'STEM Robot Kit', discount: '38% off' },
  },
  {
    id: 'food', label: 'Food & Drinks', emoji: '🍫', icon: FoodDrinksIcon, color: '#faeeda',
    items: [
      { id: 'coffee-tea',   label: 'Coffee & Tea' },
      { id: 'snacks',       label: 'Snacks' },
      { id: 'cooking',      label: 'Cooking' },
      { id: 'gift-sets',    label: 'Gift Sets' },
      { id: 'health-foods', label: 'Health Foods' },
      { id: 'beverages',    label: 'Beverages' },
    ],
    featured: { label: 'Premium', name: 'Matcha Starter Kit', discount: '33% off' },
  },
];