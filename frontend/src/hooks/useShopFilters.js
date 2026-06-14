import { useSearchParams } from 'react-router-dom';
import { getCategoryItems } from '../data/mockProducts';

const ITEMS_PER_PAGE = 6;

function sortProducts(categoryItems, sortBy) {
  switch (sortBy) {
    case 'newest': {
      return [...categoryItems].sort((a, b) => b.createdAt - a.createdAt); // timestamp difference
    }

    case 'price-asc': {
      return [...categoryItems].sort((a, b) => a.price - b.price);
    }

    case 'price-desc': {
      return [...categoryItems].sort((a, b) => b.price - a.price);
    }

    default: {
      return [...categoryItems];
    }
  }
}

function useShopFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // IMPORTANT
  // Whenever a filter value isn't in the URL yet, read it with .get() and use || operator
  // to  provide a fallback default so the app always has a valid starting value.
  const sortBy = searchParams.get('sort') || 'newest';
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 5000;
  const isBrandNew = searchParams.get('isBrandNew') === 'true'; // initial: null === 'true' returns false
  const isFairlyUsed = searchParams.get('isFairlyUsed') === 'true'; // initial: null === 'true' returns false
  const inStock = searchParams.get('inStock') === 'true'; // initial: null === 'true' returns false

  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const capitalizedSubCategory =
    subcategory.charAt(0).toUpperCase() + subcategory.slice(1);

  const categoryItems = getCategoryItems(category);

  // First filter price range
  const productsInRange = categoryItems.filter(
    (catObj) => catObj.price >= minPrice && catObj.price <= maxPrice,
  );

  const brandNewItems = isBrandNew
    ? productsInRange.filter((prodObj) => prodObj.isBrandNew)
    : productsInRange;

  const fairlyUsedItems = isFairlyUsed
    ? brandNewItems.filter((prodObj) => prodObj.isFairlyUsed)
    : brandNewItems;

  const inStockItems = inStock
    ? fairlyUsedItems.filter((prodObj) => prodObj.inStock)
    : fairlyUsedItems;

  const sorted = sortProducts(inStockItems, sortBy);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  // Page 1 → start = 0,  end = 20  → slice(0, 20)
  // Page 2 → start = 20, end = 40  → slice(20, 40)
  // Page 3 → start = 40, end = 60  → slice(40, 60)
  // Pattern: start = (page - 1) * 20, end = start + 20
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // Only render products that belong to the current page
  const currentPageItems = sorted.slice(start, end);

  function handlePageChange(result) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: result,
    }));
  }

  function handleSortChange(e) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      sort: e.target.value,
      page: 1, // reset to first page on category change
    }));
  }

  function handlePriceChange(newArrRange) {
    const [min, max] = newArrRange;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      minPrice: min,
      maxPrice: max,
    }));
  }

  function handleCategoryChange(categoryId) {
    const id = categoryId === 'all' ? '' : categoryId;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev), // converts URL object to { sort: 'newest', category: 'fashion', page: '2' }
      page: 1, // reset to first page on category change
      category: id,
    }));
  }

  function handleBrandNewToggle() {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev), // converts URL object to { sort: 'newest', category: 'fashion', page: '2' }
      page: 1, // reset to first page on category change
      isBrandNew: !isBrandNew,
    }));
  }

  function handleUsedToggle() {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev), // converts URL object to { sort: 'newest', category: 'fashion', page: '2' }
      page: 1, // reset to first page on category change
      isFairlyUsed: !isFairlyUsed,
    }));
  }
  function handleInStockToggle() {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev), // converts URL object to { sort: 'newest', category: 'fashion', page: '2' }
      page: 1, // reset to first page on category change
      inStock: !inStock,
    }));
  }

  function handleResetFilters() {
    setSearchParams({});
  }

  return {
    // Filter values from URL
    category,
    sortBy,
    currentPage,
    minPrice,
    maxPrice,
    isBrandNew,
    isFairlyUsed,
    inStock,

    // Derived values
    categoryItems,
    currentPageItems,
    totalPages,
    capitalizedCategory,
    capitalizedSubCategory,

    // Handlers
    handleSortChange,
    handleCategoryChange,
    handlePriceChange,
    handleBrandNewToggle,
    handleUsedToggle,
    handleInStockToggle,
    handlePageChange,
    handleResetFilters,
  };
}

export default useShopFilters;
