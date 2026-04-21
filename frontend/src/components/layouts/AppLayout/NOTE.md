Open Markdown preview: Ctrl + Shift + V

<Suspence> </Suspence>
Suspense is basically a “loading wrapper”. It is built into React by the React team.
It tells React: “If something inside this is still loading, show a fallback UI instead.”

**Picture it this way:**

You’re waiting for food in a restaurant
While food is being prepared
You get a “Waiting…” screen

That “Waiting…” screen = Suspense fallback

**What YOU control vs React controls**

- React controls:
  When something is “not ready yet”
  How lazy components are loaded
  When to pause rendering

- YOU control:
  What to show while waiting (fallback)
  Where to place Suspense (around routes, components, etc.)

**Think of React Suspense like a machine:**

- React:
  "This component is loading... I will pause rendering"
- You:
  "While you wait, show this UI (spinner, loading text, etc.)"

**In our code**

```js
<Suspense fallback={<PageLoader />}>
  <Outlet />
</Suspense>
```

Means:

- React is loading a page (Shop, Cart, etc.)
- Until it's ready → show PageLoader
- When ready → show real page

**ROOT LAYOUT (Mobile Phone Structure)**

```
┌──────────────────────────────┐
│          NAVBAR              │  ← CONSTANT (always visible)
├──────────────────────────────┤
│                              │
│          OUTLET              │  ← DYNAMIC (changes based on URL)
│   /shop       → Shop Page    │
│   /cart       → Cart Page    │
│   /dashboard  → Dashboard    │
│                              │
├──────────────────────────────┤
│          FOOTER              │  ← CONSTANT (always visible)
└──────────────────────────────┘
```

**LAZY LOADING (React Router + React)**

Lazy loading means:

- Pages are NOT loaded immediately when the app starts
- They are only loaded when the user visits that page

This improves performance because the app doesn’t load everything at once.

## Without Lazy Loading

- App loads ALL pages at startup
- Slower initial load
- Bigger bundle size

Example:
Home + Shop + Cart + Checkout + Dashboard -----> all load immediately

---

## With Lazy Loading

- Pages load ONLY when needed
- Faster initial app load
- Better performance for large apps

Example:
User opens `/shop` -----> Shop page loads only at that moment

---

## How it works

```js
const Shop = lazy(() => import('../pages/Shop'));
```

**NOTE:**
AppRouter is the file where we define all routes.
Inside it, we use createBrowserRouter to create a router object, and then we pass that router into RouterProvider to activate routing in the app.

```
  AppRouter
    ↓
  createBrowserRouter (route tree)
    ↓
  RouterProvider (activates router in the app)
    ↓
  RootLayout (UI shell)
    ↓
  Outlet (where pages appear)
    ↓
  Lazy pages (Shop, Cart, etc.)
    ↓
  Suspense (loading fallback while pages load)

```

**So the idea**
**STEP 1 - Replace normal imports with lazy way**

A. Normal way (eager loading)

```js
import Shop from '../pages/Shop'; // this loads immediately when an app starts
```

B. Lazy way (correct wiring)

```js
import { lazy } from 'react';

const Shop = lazy(() => import('../pages/Shop'));
```

WHAT THIS MEANS

You are telling React:
“Don’t load Shop now. Just know it exists. Load it later when needed.”

**STEP 2 — Wire it into Router**

Now you connect it here:

```js
{
  path: 'shop',
  element: <Shop />
}
```

React Router now knows:

- URL = /shop
- Component = lazy-loaded Shop page

**STEP 3 — ALWAYS wrap with Suspense**

Because lazy pages are delayed:

```js
<Suspense fallback={<PageLoader />}>
  <Outlet />
</Suspense>
```

This is the “waiting screen system”
