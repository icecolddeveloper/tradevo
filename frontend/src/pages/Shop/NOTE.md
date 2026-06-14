# Tradevo Shop Page — My Notes

---

## 1. WHERE STATE LIVES — The Core Question

When a user selects filters on the Shop page, those choices need to be
temporarily registered somewhere so the UI can read them and respond.

The question that determines where you put them is:
**Who needs to know about these selections?**

Step 1 — understand that each option has a different reach:

- useState → only the component that owns it knows
- useSearchParams → the browser knows, the URL knows, anyone with the link knows
- FilterContext → any component in the whole app can know

Step 2 — ask yourself: does the user need to share this? Does the back button need to restore it?
That answer tells you which option to pick.

---

## 2. useState — AND ITS LIMITATION

Step 1 — useState stores a value inside the component:

```js
const [sortBy, setSortBy] = useState('newest');
```

Step 2 — the problem is that useState only lives as long as the component is mounted.
The moment the user navigates away, the component unmounts and the state is gone.

Step 3 — think about what happens:

- User picks "Price: Low to High"
- User clicks a product to view it
- User hits the browser back button
- The sort is gone because the component remounted with fresh state

Step 4 — also the URL still just says /shop.
Nothing about the user's selections is in there, so they can't share it with anyone.

These two problems are exactly what useSearchParams solves.

---

## 3. useSearchParams — THE URL AS STATE

Step 1 — understand what the query string is.
You have seen this before on other websites:

```
google.com/search?q=nike+shoes
youtube.com/results?search_query=react+tutorial
```

That ? and everything after it is called the query string. It is just key = value pairs in the URL.

Step 2 — useSearchParams is React Router's hook that lets you read and write
those key=value pairs from inside your component.

Step 3 — how to set it up from start to finish:

First — in your component, import and call the hook:

```js
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();
```

Second — in your router, no special setup needed. Just a normal route with no :param:

```js
{ path: 'shop', element: <Shop /> }
```

Third — when navigating to Shop with a filter already set, build the URL in the Link:

```jsx
<Link to="/shop?category=electronics">Electronics</Link>
<Link to="/shop?category=fashion">Fashion</Link>
<Link to="/shop">All Products</Link>  // no params = all products
```

Fourth — inside Shop, read those params with .get():

```js
const category = searchParams.get('category') || '';
// if URL is /shop?category=electronics -> returns 'electronics'
// if URL is /shop -> returns null -> fallback kicks in -> returns ''
```

Fifth — when the user interacts, write back to the URL:

```js
setSearchParams((prev) => ({
  ...Object.fromEntries(prev),
  category: 'fashion',
}));
// URL updates to /shop?category=fashion — no page reload, component re-renders
```

Step 4 — so instead of your filter selections dying when the component unmounts,
they live in the URL:

```
/shop?category=electronics&sort=price-asc&page=2
```

Step 4 — what this means practically:

- User goes back → URL still has those params → filters restore automatically
- User copies the URL and sends to a friend → friend sees exact same filtered view
- User refreshes the page → filters survive

Mental model in one sentence:
useSearchParams turns the URL into the storage location for filter state,
instead of the component's memory.

---

## 4. THE READ PATTERN — Always use fallbacks

Step 1 — use .get() to read each param from the URL by its key name:

```js
searchParams.get('sort'); // reads ?sort=newest
searchParams.get('category'); // reads ?category=electronics
```

Step 2 — when the param does not exist yet (first page load), .get() returns null.
Use || to give it a fallback default:

```js
const category = searchParams.get('category') || 'all';
const sortBy = searchParams.get('sort') || 'newest';
```

Step 3 — for numbers, wrap with Number() because .get() always returns a string:

```js
const currentPage = Number(searchParams.get('page')) || 1;
const minPrice = Number(searchParams.get('minPrice')) || 0;
const maxPrice = Number(searchParams.get('maxPrice')) || 5000;
```

Step 4 — for booleans, do NOT use ||. Use === 'true' instead (see section 5 for why):

```js
const isBrandNew = searchParams.get('isBrandNew') === 'true';
const isFairlyUsed = searchParams.get('isFairlyUsed') === 'true';
const inStock = searchParams.get('inStock') === 'true';
```

Rule to remember:

- Strings → use || directly
- Numbers → wrap with Number(), then use ||
- Booleans → use === 'true', no ||

---

## 5. WHY BOOLEANS NEED === 'true' INSTEAD OF ||

Step 1 — understand the problem. searchParams.get() always returns a STRING, never a real boolean.

Step 2 — when the page first loads and there is no isBrandNew in the URL:

```js
searchParams.get('isBrandNew'); // returns null
null || false; // returns false — correct default
```

So || works fine on first load.

Step 3 — but after the user clicks the checkbox and isBrandNew=true is in the URL:

```js
searchParams.get('isBrandNew'); // returns the STRING 'true'
'true' || false; // returns 'true' — a STRING, not a boolean
```

Step 4 — now when you try to toggle it back:

```js
!isBrandNew; // becomes !'true' which is always false
```

You can never toggle back because you are negating a string, not a boolean.

Step 5 — === 'true' fixes this by converting the string into a real boolean every time:

```js
'true' === 'true'; // → true  (correct)
'false' === 'true'; // → false (correct)
null === 'true'; // → false (correct default, filter is off)
```

Rule: Everything in a URL is a string. Booleans need special handling.

---

## 6. THE WRITE PATTERN — Always spread previous params

Step 1 — when you want to update one param without losing the others, use the callback form:

```js
setSearchParams((prev) => ({
  ...Object.fromEntries(prev), // keep all existing params
  sort: 'price-asc', // override just this one
  page: 1, // reset page when filters change
}));
```

Step 2 — understand why Object.fromEntries(prev) is needed.
searchParams is not a plain JS object. It is a special URLSearchParams object.
You cannot spread it directly like ...prev.

Step 3 — Object.fromEntries() converts it into a plain object first:

```js
Object.fromEntries(prev);
// URLSearchParams → { sort: 'newest', category: 'fashion', page: '2' }
// now you can spread it and override individual keys
```

Step 4 — without the spread, you would lose all other params:

```js
// Wrong — only sort survives, category and page are gone
setSearchParams({ sort: 'price-asc' });

// Correct — everything survives, only sort changes
setSearchParams((prev) => ({ ...Object.fromEntries(prev), sort: 'price-asc' }));
```

---

## 7. BACK BUTTON TEST — The proof useSearchParams works

Step 1 — set sort to "Price: Low to High" on the Shop page.

Step 2 — click into any product detail page.
The Shop component unmounts. With useState the sort would be gone.

Step 3 — hit the browser back button.

Step 4 — the sort is still set. The URL still says ?sort=price-asc.
React Router restores the component and useSearchParams reads the sort from the URL.

This is the core advantage over useState — the URL survives navigation, useState does not.

---

## 8. SWITCHING FROM useParams TO useSearchParams

Step 1 — understand the difference:

- useParams reads from the URL path: /shop/electronics → category is 'electronics'
- useSearchParams reads from the query string: /shop?category=electronics

Step 2 — useParams only gives you one URL segment.
useSearchParams lets you combine unlimited filters:

```
/shop?category=electronics&sort=price-asc&minPrice=100&maxPrice=500&page=2
```

Step 3 — what changes in your code when you switch:

In the router — remove the :category param route:

```js
// Before
{ path: 'shop/:category', element: <Shop /> }

// After — just one clean route
{ path: 'shop', element: <Shop /> }
```

In the navigation links — update how you build the URL:

```jsx
// Before
<Link to={`/shop/${categoryObj.id}`}>

// After
<Link to={`/shop?category=${categoryObj.id}`}>
```

In the component — replace useParams with searchParams.get():

```js
// Before
const { category } = useParams();

// After
const category = searchParams.get('category') || '';
```

---

## 9. PAGE RESET ON FILTER CHANGE

Step 1 — understand why this matters.
If the user is on page 3 of Electronics and switches to Fashion,
page 3 might not exist in Fashion. The user would see an empty grid.

Step 2 — always reset page to 1 when any filter changes:

```js
function handleSortChange(e) {
  setSearchParams((prev) => ({
    ...Object.fromEntries(prev),
    sort: e.target.value,
    page: 1, // new sort = start from page 1
  }));
}
```

Step 3 — this applies to every filter handler — category, sort, condition, stock.
The only handler that does NOT reset page is handlePageChange itself.

---

## 10. PAGINATION MATH

Step 1 — the idea. You have 60 products and 6 per page. That gives you 10 pages.
Each page is just a slice of the full sorted array.

Step 2 — see the pattern with concrete numbers:

```
Page 1 → slice(0,  6)
Page 2 → slice(6,  12)
Page 3 → slice(12, 18)
```

Step 3 — the formula that produces those numbers automatically:

```js
// Math.ceil rounds up so the last partial page is never lost
const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

// Arrays are 0-indexed so page 1 starts at index 0, hence page - 1
const start = (currentPage - 1) * ITEMS_PER_PAGE;
const end = start + ITEMS_PER_PAGE;

// Cut out only the products for the current page
const currentPageItems = sorted.slice(start, end);
```

Step 4 — page lives in the URL, not useState.
If the user is on page 3, goes to a product detail, and hits back,
the URL still says page=3 so the list restores correctly.

---

## 11. THE FILTER CHAIN — Order and chaining correctly

Step 1 — filtering and sorting are two different operations:

- Filter removes products that do not match
- Sort reorders what remains after filtering

Step 2 — always filter first, then sort:

```js
// Step 1 — get products for the selected category
const categoryItems = getCategoryItems(category);

// Step 2 — filter by price range
const productsInRange = categoryItems.filter(
  (p) => p.price >= minPrice && p.price <= maxPrice,
);

// Step 3 — filter by condition (only active when checkbox is checked)
const brandNewItems = isBrandNew
  ? productsInRange.filter((p) => p.isBrandNew)
  : productsInRange;

// Step 4 — chain from the previous result, not back to productsInRange
const fairlyUsedItems = isFairlyUsed
  ? brandNewItems.filter((p) => p.isFairlyUsed)
  : brandNewItems;

// Step 5 — filter by stock
const inStockItems = inStock
  ? fairlyUsedItems.filter((p) => p.inStock)
  : fairlyUsedItems;

// Step 6 — sort the fully filtered result
const sorted = sortProducts(inStockItems, sortBy);
```

Step 3 — the critical rule:
Each step must receive the result of the previous step.
If you fall back to productsInRange in the fairlyUsed step,
you undo the brandNew filter. The chain breaks.

Step 4 — when a checkbox is unchecked (false), the filter passes everything through unchanged.
When checked (true), it filters. Default is false = filter off = show all.

---

## 12. FUNCTIONS OUTSIDE THE COMPONENT

Step 1 — every time a component re-renders, everything inside it is recreated.
That includes functions defined inside the component body.

Step 2 — if a function does not use state or props, it does not need to be inside.
It is just a pure utility that takes inputs and returns an output.

Step 3 — move it outside:

```js
// Outside — created once, never recreated
function sortProducts(products, sortBy) {
  switch (sortBy) { ... }
}

function Shop() {
  // component body — sortProducts is available here
}
```

Step 4 — same rule applies to:

- Static constant arrays like SORT_OPTIONS and CATEGORIES
- Framer Motion variant objects
- Any function that only takes arguments and returns a value

Rule: if it does not touch state or props, it belongs outside the component.

---

## 13. rc-slider — DUAL RANGE SLIDER

Step 1 — install it in your frontend folder:

```bash
npm install rc-slider
```

Step 2 — import the component and its required CSS:

```js
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // required — without this it renders unstyled
```

Step 3 — use the range prop to make it dual-thumb (two handles):

```jsx
<Slider
  range // this is what makes it two handles instead of one
  min={0}
  max={5000}
  step={10}
  value={[minPrice, maxPrice]} // controlled — pass current values
  onChange={handlePriceChange} // receives [min, max] array on change
/>
```

Step 4 — the onChange gives you back a full array:

```js
function handlePriceChange(newRangeArr) {
  const [min, max] = newRangeArr; // destructure the array
  setSearchParams((prev) => ({
    ...Object.fromEntries(prev),
    minPrice: min,
    maxPrice: max,
  }));
}
```

Step 5 — fix mobile drag issues by wrapping in a div with touchAction none:

```jsx
<div style={{ touchAction: 'none' }}>
  <Slider ... />
</div>
```

Step 6 — to override rc-slider styles, put them in your global CSS file
(not a CSS Module) because rc-slider's classes are outside your module scope.
Add !important if the overrides are not taking effect.

---

## 14. BODY SCROLL LOCK

Step 1 — when the sidebar opens on mobile, the background page should not scroll.

Step 2 — use useEffect to watch sideBarOpen and toggle the body overflow:

```js
useEffect(() => {
  document.body.style.overflow = sideBarOpen ? 'hidden' : '';
  return () => {
    document.body.style.overflow = '';
  }; // cleanup on unmount
}, [sideBarOpen]);
```

Step 3 — why useEffect is better than adding the logic to every close handler:
One effect handles it automatically whenever sideBarOpen changes.
You do not need to remember to add it to the overlay click, the close button, etc.

---

## 15. FRAMER MOTION — AnimatePresence for exit animations

Step 1 — understand the problem.
Without AnimatePresence, React removes elements instantly — no exit animation possible.

Step 2 — AnimatePresence watches its children.
When a child is removed from the DOM (like when sideBarOpen becomes false),
it lets that child play an exit animation before actually removing it.

Step 3 — the pattern:

```jsx
<AnimatePresence>
  {sideBarOpen && (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit" // plays when sideBarOpen becomes false
    >
      ...
    </motion.aside>
  )}
</AnimatePresence>
```

Step 4 — define variants outside the component so they are not recreated on every render:

```js
const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.4 } },
  exit: { x: '-100%', transition: { duration: 0.3 } },
};
```

Step 5 — grid fade on filter change. Use the key prop:

```jsx
<motion.div
  key={category + sortBy + currentPage}
  variants={gridVariants}
  initial="hidden"
  animate="visible"
>
```

When key changes, Framer Motion treats it as a brand new element and replays
the animation. So every time category, sort, or page changes the grid fades in fresh.

---

## 16. WHY FilterContext WAS SKIPPED

Step 1 — FilterContext + useReducer is useful when:

- Multiple components need the same filter state at the same time
- You have complex computed logic that needs to be shared across the app

Step 2 — but useSearchParams already handles everything we need:

- State persists across navigation because the URL survives component unmounts
- Any component can read the URL by calling useSearchParams()
- No extra setup or provider needed

Step 3 — the deciding factor:
FilterContext resets to initialState on every mount.
So if the user navigates away and comes back, the context loses all filter selections.
The URL does not lose them.

Step 4 — when to add FilterContext later:
If multiple components across the app need the same computed filter results,
extract logic into a custom hook first. If that hook is needed in many places,
wrap it in a context then.

---

## 17. COMPONENT STRUCTURE — Clean top-to-bottom flow

Step 1 — always organize a React component in this order:

```
1. Imports
2. Constants (ITEMS_PER_PAGE, SORT_OPTIONS)
3. Framer Motion variants — outside component
4. Utility functions — outside component (sortProducts etc.)
5. Component function
   a. State declarations (useState, useSearchParams)
   b. URL filter reads (.get() with fallbacks)
   c. Derived values (filter chain, pagination math)
   d. Effects (useEffect)
   e. Handler functions (handleX)
   f. Return JSX
```

Step 2 — why this order makes sense:

- State first because everything else depends on it
- Derived values after state because they compute from state
- Effects after derived values because they may depend on them
- Handlers after derived values because they update state and use derived values
- JSX last because it just reads everything above it

---

## 18. CUSTOM HOOK EXTRACTION — useShopFilters

Step 1 — when a component has too much logic, extract it into a custom hook.
A custom hook is just a function that starts with use and can call other hooks.

Step 2 — what goes into useShopFilters:

- All searchParams.get() reads
- All derived filter chain (productsInRange, brandNewItems, etc.)
- All handler functions
- Pagination math

Step 3 — what stays in Shop:

- sideBarOpen state and handleSideBarToggle
- useEffect for scroll lock
- Framer Motion variants
- All JSX

Step 4 — the hook returns everything Shop needs:

```js
export function useShopFilters() {
  // ... all the logic ...

  return {
    category,
    sortBy,
    currentPage,
    minPrice,
    maxPrice,
    isBrandNew,
    isFairlyUsed,
    inStock,
    categoryItems,
    currentPageItems,
    totalPages,
    capitalizedCategory,
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
```

Step 5 — Shop then becomes clean:

```js
function Shop() {
  const filters = useShopFilters();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  // only UI state and JSX remain
}
```

Rule: Extract into a custom hook when the component has too much logic.
Extract into a context when multiple components need the same hook.

---
