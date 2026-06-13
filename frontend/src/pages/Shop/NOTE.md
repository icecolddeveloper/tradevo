# Tradevo — Shop Page Notes

### Everything learned building the Shop page from scratch

---

## 1. WHERE STATE LIVES — The Core Question

When a user selects filters on the Shop page, those selections need to be
temporarily registered somewhere so the UI can read them and react.

The question that determines WHERE you store them is:
**Who needs to know about these selections?**

| Storage           | Who can see it                             |
| ----------------- | ------------------------------------------ |
| `useState`        | Only the component that owns it            |
| `useSearchParams` | The browser, the URL, anyone with the link |
| `FilterContext`   | Any component in the whole app             |

---

## 2. useState — AND ITS LIMITATION

```js
const [sortBy, setSortBy] = useState('newest');
```

`useState` only lives as long as the component is mounted.
The moment the user navigates away, the component unmounts and the state dies.

**The two problems:**

- User picks "Electronics", goes to a product detail page, hits back → filters are gone
- URL still just says `/shop` — no filter info in it, nothing shareable

These two problems are exactly what `useSearchParams` solves.

---

## 3. useSearchParams — THE URL AS STATE

The URL can carry information:

```
/shop?category=electronics&sort=price-asc&page=2
```

`useSearchParams` is React Router's hook that lets you read and write
that query string from inside your component.

**Mental model in one sentence:**

> `useSearchParams` turns your URL into the storage location for your
> filter state, instead of the component's memory.

**The advantages:**

- User goes back → URL still has those params → filters restore automatically
- User copies the URL → friend opens it → sees the exact same filtered view
- User refreshes → filters survive

---

## 4. THE READ PATTERN — Always use fallbacks

```js
// Numbers and strings — use || for fallback
const category = searchParams.get('category') || 'all';
const sortBy = searchParams.get('sort') || 'newest';
const page = Number(searchParams.get('page')) || 1;
const minPrice = Number(searchParams.get('minPrice')) || 0;
const maxPrice = Number(searchParams.get('maxPrice')) || 5000;

// Booleans — use === 'true', NOT ||
const isBrandNew = searchParams.get('isBrandNew') === 'true';
const isFairlyUsed = searchParams.get('isFairlyUsed') === 'true';
const inStock = searchParams.get('inStock') === 'true';
```

**IMPORTANT — Why booleans need === 'true' instead of ||:**

`searchParams.get()` always returns a STRING, never a real boolean.

When the param doesn't exist yet (initial state):

```js
null || false; // returns false correct
```

But after the user clicks and 'isBrandNew=true' is in the URL:

```js
'true' || false; // returns 'true' — a STRING, not a boolean ❌
```

So `!isBrandNew` becomes `!'true'` which is always `false` —
you can never toggle back because you're negating a string, not a boolean.

With `=== 'true'`:

```js
'true' === 'true'; // → true  
'false' === 'true'; // → false 
null === 'true'; // → false correct default (filter is off)
```

**Rule: Numbers need Number(), booleans need === 'true', strings use || directly.**

---

## 5. THE WRITE PATTERN — Always spread previous params

```js
setSearchParams((prev) => ({
  ...Object.fromEntries(prev), // keep all existing params
  sort: 'price-asc', // override just this one
  page: 1, // reset page when filters change
}));
```

**Why Object.fromEntries(prev)?**

`searchParams` is not a plain JS object — it's a special `URLSearchParams` object.
You can't spread it directly. `Object.fromEntries()` converts it to a plain object first:

```js
Object.fromEntries(prev);
// converts URLSearchParams → { sort: 'newest', category: 'fashion', page: '2' }
// then you can spread it and override individual keys
```

Without the spread, you'd lose all other params — only the one you set would remain.

---

## 6. RESET FILTERS

```js
function handleResetFilters() {
  setSearchParams({}); // empty object = no params in URL
}
```

Empty object means no params — everything falls back to defaults
via the `|| fallback` values in your read lines.

---

## 7. BACK BUTTON TEST — The proof useSearchParams works

1. Set sort to "Price: Low to High"
2. Click into a product detail page (component unmounts)
3. Hit the browser back button
4. Sort is still set 

**Why:** The URL survived the navigation. React Router restores the component
and `useSearchParams` reads the sort value from the URL — not from memory.
`useState` would have lost it the moment the component unmounted.

---

## 8. SWITCHING FROM useParams TO useSearchParams

**Before (useParams):**

```js
// Route: { path: 'shop/:category', element: <Shop /> }
const { category } = useParams();
// URL: /shop/electronics
```

**After (useSearchParams):**

```js
// Route: { path: 'shop', element: <Shop /> }
const category = searchParams.get('category') || '';
// URL: /shop?category=electronics
```

**What changes when you make this switch:**

1. Remove the `/:category` route — only keep `{ path: 'shop', element: <Shop /> }`
2. Update all `<Link to="/shop/electronics">` → `<Link to="/shop?category=electronics">`
3. Replace `useParams()` read with `searchParams.get('category')`

**Why useSearchParams wins:**
`useParams` only gives you one URL segment. `useSearchParams` lets you
combine unlimited filters in one URL:

```
/shop?category=electronics&sort=price-asc&minPrice=100&maxPrice=500&page=2
```

---

## 9. PAGE RESET ON FILTER CHANGE

Whenever a filter changes, always reset page to 1:

```js
function handleSortChange(e) {
  setSearchParams((prev) => ({
    ...Object.fromEntries(prev),
    sort: e.target.value,
    page: 1, // ← always reset
  }));
}
```

**Why:** If the user is on page 3 of Electronics and switches to Fashion,
page 3 might not exist in Fashion. Always start from page 1 on filter change.

---

## 10. PAGINATION MATH

```js
// Page 1 → slice(0, 6)  | Page 2 → slice(6, 12) | Page 3 → slice(12, 18)
const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
const start = (currentPage - 1) * ITEMS_PER_PAGE;
const end = start + ITEMS_PER_PAGE;
const currentPageItems = sorted.slice(start, end);
```

- `Math.ceil` rounds up so the last partial page is never lost
- `page` lives in the URL — not useState — so back button restores position
- Arrays are 0-indexed so page 1 starts at index 0, hence `(page - 1) * n`

---

## 11. THE FILTER CHAIN — Order matters

```js
// Step 1 — get products for selected category
const categoryItems = getCategoryItems(category);

// Step 2 — filter by price range
const productsInRange = categoryItems.filter(
  (p) => p.price >= minPrice && p.price <= maxPrice,
);

// Step 3 — filter by condition (only when checkbox is checked)
const brandNewItems = isBrandNew
  ? productsInRange.filter((p) => p.isBrandNew)
  : productsInRange; // pass through unchanged when filter is off

const fairlyUsedItems = isFairlyUsed
  ? brandNewItems.filter((p) => p.isFairlyUsed)
  : brandNewItems; // ← must chain from previous, NOT from productsInRange

// Step 4 — filter by stock
const inStockItems = inStock
  ? fairlyUsedItems.filter((p) => p.inStock)
  : fairlyUsedItems; // ← must chain from previous

// Step 5 — sort the fully filtered result
const sorted = sortProducts(inStockItems, sortBy);

// Step 6 — paginate
const currentPageItems = sorted.slice(start, end);
```

**Critical:** Each step must receive the result of the previous step,
not fall back to an earlier list. Breaking the chain undoes previous filters.

---

## 12. FUNCTIONS OUTSIDE THE COMPONENT

If a function doesn't use state or props — move it outside the component.

```js
// Outside — not recreated on every render
function sortProducts(products, sortBy) { ... }

// Inside — recreated from scratch on every render (unnecessary cost)
function Shop() {
  function sortProducts(products, sortBy) { ... }
}
```

**Rule:** Pure utility functions that only take inputs and return outputs
belong outside the component. Same applies to static constants and
Framer Motion variant objects.

---

## 13. rc-slider — DUAL RANGE SLIDER

Install: `npm install rc-slider`

```jsx
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // required

<Slider
  range // makes it dual-thumb
  min={0}
  max={5000}
  step={10}
  value={[minPrice, maxPrice]} // controlled — must pass current values
  onChange={(newRange) => handlePriceChange(newRange)} // receives [min, max]
/>;
```

- `range` prop = two thumbs (min + max)
- `value` must be an array of two numbers
- `onChange` receives the full updated array `[120, 400]`
- Wrap in `<div style={{ touchAction: 'none' }}>` to fix mobile drag issues
- Override styles in global CSS (not CSS Modules) since rc-slider classes are external

---

## 14. BODY SCROLL LOCK

Lock body scroll when sidebar is open so the background doesn't scroll:

```js
useEffect(() => {
  document.body.style.overflow = sideBarOpen ? 'hidden' : '';
  return () => {
    document.body.style.overflow = '';
  }; // cleanup on unmount
}, [sideBarOpen]);
```

Using `useEffect` is cleaner than adding the logic to every close handler —
one effect handles it all automatically when `sideBarOpen` changes.

---

## 15. FRAMER MOTION — AnimatePresence for exit animations

Without `AnimatePresence`, React removes elements instantly — no exit animation possible.
`AnimatePresence` watches its children and lets them play an `exit` animation
before being removed from the DOM.

```jsx
<AnimatePresence>
  {sideBarOpen && (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      ...
    </motion.aside>
  )}
</AnimatePresence>
```

**Variants should be defined OUTSIDE the component:**

```js
// ✅ Outside — not recreated on every render
const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.4 } },
  exit: { x: '-100%', transition: { duration: 0.3 } },
};
```

**Grid fade on filter change — use key prop:**

```jsx
<motion.div
  key={category + sortBy + currentPage}  // changes = Framer replays animation
  variants={gridVariants}
  initial="hidden"
  animate="visible"
>
```

When `key` changes, Framer Motion treats it as a new element and replays
the animation — so every filter/page change fades the grid in fresh.

---

## 16. WHY FilterContext WAS SKIPPED

FilterContext + useReducer is useful when:

- Multiple components need the same filter state simultaneously
- Computed filter logic needs to be shared across the app

But `useSearchParams` already handles everything:

- State persists across navigation (URL survives unmounts)
- Any component can read the URL with `useSearchParams()`
- No extra setup needed

**Decision:** Keep filters in `useSearchParams`. Add FilterContext later
only if multiple components need the same computed filter logic.

**Note:** FilterContext uses `initialState` on every mount — meaning if the
user navigates away and comes back, context resets to defaults. The URL does not.
This was the deciding factor.

---