# Dropdown — Complete Reference Guide. ()check hooks for the custom hook)

---

## 1. Why functions lose their reference on re-render

In JavaScript, functions are objects.
Objects are **reference values** — the variable doesn't hold the function directly, it just points to where the function lives in memory.

```txt
First render:
closeDropdown ──► [ memory address: 0x001 ] ──► function body

Re-render:
closeDropdown ──► [ memory address: 0x002 ] ──► function body  ← new address, React sees new function
```

Every re-render = new address = React thinks it's a different function.

This matters for `useEffect` — if a function is in the dependency array and its address changes every render, the effect re-runs every render. That causes bugs like duplicate event listeners piling up.

---

## 2. useCallback — how we fix the reference problem

`useCallback` memoizes a function — holds onto the same memory address across renders.

```js
const closeDropdown = useCallback(() => {
  setDropdownOpen(false);
  setActiveId(null);
}, []); // empty array = created once, same address forever
```

```txt
First render:
closeDropdown ──► [ memory address: 0x001 ]

Re-render:
closeDropdown ──► [ memory address: 0x001 ]  ← same address, React sees same function
```

Empty `[]` = no dependencies = function is created once on first render and never recreated.

So when `useEffect` checks its dependency array — same reference every time — effect stays stable, no unnecessary re-runs.

**Rule of thumb:** if you pass a function into a `useEffect` dependency array, wrap that function in `useCallback`.

---

## 3. document vs window for event listeners

Think of it as layers — events live at different levels:

```txt
window          ← outermost, scroll and resize live here
  └── document  ← the HTML page, mousedown and click live here
        └── body
              └── your section
                    └── your dropdown
```

- `mousedown` / `click` → attach to `document`
- `scroll` / `resize` → attach to `window`

---

## 4. onMouseLeave vs click outside — they solve different problems

```txt
  DESKTOP USER                        MOBILE USER

  mouse hovers button                 finger taps button
  dropdown opens                      dropdown opens
  mouse drifts away                   finger taps elsewhere
  onMouseLeave fires ✅               onMouseLeave fires synthetic event ✅
  scheduleClose runs                  scheduleClose runs
  dropdown closes                     dropdown closes
```

|                           | What triggers it              | Who it's for        |
| ------------------------- | ----------------------------- | ------------------- |
| `onMouseLeave`            | Mouse drifts off the element  | Desktop hover users |
| Click outside `useEffect` | Tap or click anywhere on page | Mobile users        |

On mobile there is no real mouse. But the browser fires a **synthetic** `mouseleave` when the user taps somewhere else after previously tapping a button. So `onMouseLeave` ends up covering mobile too — making a separate click outside `useEffect` redundant in this project.

---

## 5. Always clean up event listeners

Every listener you attach inside `useEffect` must be removed when the component unmounts or the effect re-runs. Without cleanup, old listeners pile up — memory leak.

```txt
Without cleanup:

render 1 → attach listener A
render 2 → attach listener B  (A still running)
render 3 → attach listener C  (A and B still running)

All three fire on every event. Bug.
```

```txt
With cleanup:

render 1 → attach listener A
render 2 → cleanup removes A → attach listener B
render 3 → cleanup removes B → attach listener C

Only one listener active at a time. Clean.
```

```js
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll); // cleanup
}, [dropdownOpen, closeDropdown]);
```

The `return` function runs automatically before the next effect run or when the component unmounts.

---

## 6. useEffect dependency array rules

| Dependency array                | When effect runs                                 |
| ------------------------------- | ------------------------------------------------ |
| `[]`                            | Once on first render only                        |
| `[someState]`                   | Every time `someState` changes                   |
| `[dropdownOpen, closeDropdown]` | Every time either of those changes               |
| no array at all                 | Every single render — almost never what you want |

**Rule:** put everything the effect uses that could change into the dependency array. Functions too — but wrap them in `useCallback` first.

---

## 7. Dropdown left position logic

### What it does

Places the dropdown under the clicked button, but prevents it from overflowing outside the container.

```txt
Goal:
  dropdown follows the clicked button
  but never overflows the container's right edge
```

---

### How getBoundingClientRect().left works

`getBoundingClientRect().left` always measures from the **left edge of the browser viewport** — not from any parent element.

```txt
Browser viewport

0px        120px                 360px                              1440px
|----------|----------------------|----------------------------------|
           container starts       button starts
           ^                      ^
           containerPosition      buttonPosition
           .left = 120px          .left = 360px
```

Both values are measured from `0px` — the far left of the viewport.

---

### Finding the button's position inside the container

Since both values start from the viewport, subtract to get the button's position relative to the container:

```txt
Browser viewport

0px        120px                 360px
|----------|----------------------|
           container starts       button starts

buttonLeftInsideContainer = 360 - 120 = 240px
```

```txt
Inside the container:

0px                         240px
|----------------------------|
container left edge          button starts here
```

```js
buttonLeftInsideContainer = buttonPosition.left - containerPosition.left;
```

---

### What maxLeftPosition means

The maximum left value the dropdown can start at before it overflows the container.

```txt
container width = 1000px
dropdown width  = 360px

maxLeftPosition = 1000 - 360 = 640px
```

```txt
0px                                          640px       1000px
|---------------------------------------------|-----------|
                                              ^           ^
                                    dropdown starts    container ends
                                    640 + 360 = 1000   fits exactly
```

If the dropdown started at 700px:

```txt
700px + 360px = 1060px  ← overflows by 60px
```

---

### Why Math.min is used

```js
const dropdownLeftPosition = Math.min(
  buttonLeftInsideContainer,
  maxLeftPosition,
);
```

```txt
Use the button's position if it is safe.
If it is too far right, use the maximum safe position instead.

Example:
buttonLeftInsideContainer = 820px
maxLeftPosition            = 640px

Math.min(820, 640) = 640  ← pulled back to safe position
```

---

### Quick summary

```txt
buttonLeftInsideContainer
  = where the clicked button starts inside the container

maxLeftPosition
  = the furthest right the dropdown can start without overflowing

dropdownLeftPosition
  = final safe position returned by the function

The dropdown follows the button, but never moves past the safe maximum.
```

---

## 8. The scroll effect — how it works

When the dropdown opens, take a snapshot of the current scroll position. On every scroll after that, measure how far the user has moved from that snapshot. If the distance is greater than the threshold — close the dropdown.

```txt
Page scroll positions (in pixels from top of page):

User opens dropdown here:
┌─────────────────────────┐
│  scroll position: 200px │  ← scrollYWhenOpened = 200  (snapshot, frozen)
│  [dropdown opens]       │
└─────────────────────────┘

User scrolls down:
┌─────────────────────────┐
│  scroll position: 450px │  ← window.scrollY = 450  (live)
└─────────────────────────┘

Distance = |450 - 200| = 250px  → below threshold, stay open

User scrolls more:
┌─────────────────────────┐
│  scroll position: 620px │  ← window.scrollY = 620  (live)
└─────────────────────────┘

Distance = |620 - 200| = 420px  → above 380px threshold, close ✅
```

`scrollYWhenOpened` and `window.scrollY` look the same but are not:

```txt
scrollYWhenOpened  → frozen at the moment dropdown opened, never changes
window.scrollY     → live, updates on every scroll
```

```js
useEffect(
  function () {
    if (!dropdownOpen) return; // exit immediately if dropdown is closed

    const scrollYWhenOpened = window.scrollY; // snapshot — frozen at open moment

    function handleScroll() {
      // Math.abs handles both scroll up and scroll down
      if (Math.abs(window.scrollY - scrollYWhenOpened) > 380) {
        closeDropdown();
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  },
  [dropdownOpen, closeDropdown],
);
```

`{ passive: true }` tells the browser this listener won't block scrolling — performance hint.

---

## 9. The 7-step mental model for any dropdown or open/close UI

Every time you build a dropdown, modal, drawer, or any open/close element — answer these before writing any code:

```txt
1. What are my states?
   → open / closed

2. How does it open?
   → click, hover, tap

3. How does it close? Think per device:
   → desktop: mouse drifts away
   → mobile: tap elsewhere, scroll away

4. What tool handles each closing behavior?
   → onMouseLeave, useEffect + scroll, useEffect + mousedown

5. Do any overlap? Remove the redundant ones.
   → in this project, onMouseLeave covered mobile tap-outside
   → click outside useEffect was removed

6. Does every listener have cleanup?
   → always return () => removeEventListener(...)

7. When should each effect re-run?
   → [] once, [state] on state change, [state, fn] when both could change
```

---

## 10. Final closing behavior in this project

```txt
User action                          Handled by
─────────────────────────────────────────────────────────────
Mouse drifts off button (desktop)  → onMouseLeave → scheduleClose
Mouse drifts off dropdown (desktop)→ onMouseLeave → scheduleClose
Tap anywhere outside (mobile)      → synthetic mouseleave → scheduleClose
Scroll away on any device          → scroll useEffect
```

No click outside `useEffect` needed — `onMouseLeave` covers that job on both desktop and mobile in this specific setup.

---

## 11. iPad / touch device — click outside inconsistency

onMouseLeave fires a synthetic mouseleave on mobile/iPad when the user
taps elsewhere. But on iPadOS Safari this is inconsistent — sometimes
it fires, sometimes it does not. That is why the dropdown only closed
sometimes on iPad.

Fix: add a separate useEffect that listens to touchend on the document.
touchend is the real native tap event on all touch devices — always fires,
no synthetic behavior involved.

document.addEventListener('touchend', handleTouchOutside);

Why touchend and not mousedown:

mousedown → reliable on desktop, inconsistent on iPad Safari
touchend → native tap event on touch devices, always reliable

The check inside is the same pattern — if the tapped element is outside
the section ref, close the dropdown.

Rule: for touch device outside-tap detection, always use touchend
not mousedown.
