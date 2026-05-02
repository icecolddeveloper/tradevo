What this component is REALLY doing
`---------------------------------------------------------------------------------------`

At a high level:

- It’s a carousel (slider)
- With auto-play (setInterval)
- With manual controls (next, prev, dots)
- With animation (framer-motion)
- With state controlling everything

```js
APP LOADS
   |
   |-- useState(current = 0)
   |-- useState(direction = 1)
   |
   |-- useEffect runs
          |
          |-- setInterval(next, 5500)
          |
          |-- every 5.5s → next()
                      |
                      |-- setCurrent(c => (c + 1) % SLIDES.length)
                      |-- setDirection(1)
                      |
                      |-- triggers re-render
                                   |
                                   |-- new slide = SLIDES[current]
                                   |
                                   |-- AnimatePresence detects change
                                              |
                                              |-- old slide exits
                                              |-- new slide enters
                                              |-- animation uses direction
```

`---------------------------------------------------------------------------------------`

When USER clicks buttons

## NEXT button

```js
click next
   |
   |-- next()
          |
          |-- setDirection(1)
          |-- setCurrent(next index)
          |
          |-- re-render → animation slides LEFT
```

## PREV button

```js
click prev
   |
   |-- prev()
          |
          |-- setDirection(-1)
          |-- setCurrent(previous index)
          |
          |-- re-render → animation slides RIGHT
```

## DOT click

```js
click dot
   |
   |-- goTo(index, dir)
          |
          |-- dir = (index > current ? 1 : -1)
          |-- setDirection(dir)
          |-- setCurrent(index)
```

`---------------------------------------------------------------------------------------`
Why useCallback IS USED

## Without useCallback:

Every render → next becomes a new function with a new reference.
Since useEffect depends on next, React compares the previous next function with the new next function.
Recall that functions are reference types, so even if the code looks the same, React sees them as different because they have different memory addresses.

## So on every re-render:

React thinks next has changed
It runs the cleanup → i.e. clearInterval
Then runs the effect again → creates a new setInterval

So basically the interval keeps resetting on every render instead of running smoothly.

## In summary, even though to us it looks like:

() => { /_ same code _/ }

React sees it like:
Render 1 → next = fn1 (address 1 = 0X111)
Render 2 → next = fn2 (address 2 = 0X222)
Render 3 → next = fn3 (address 3 = 0X333)

So React goes:
“this is not the same function”
rerun effect

## With useCallback:

Instead of creating a new next function on every render, React keeps (memoize) the same function reference.

## So even when the component re-renders:

Our next function is still the same function (same memory address)
React compares it and sees no change

## So for useEffect:

it runs once
sets the interval
and that interval keeps running normally

It does not keep clearing and restarting like before.

React sees it like:
Render 1 → next = fn1 (address 1 = 0X111)
Render 2 → next = fn1 (address 2 = 0X111) NOTICE: Still address 1
Render 3 → next = fn1 (address 3 = 0X111) NOTICE: Still address 1

So React goes:
nothing changed
don’t rerun effect

In Summary for useCallback()
We use useCallback to keep the same function reference across renders.

So when the component re-renders, React doesn’t see the function as a new one, because the reference (memory address) hasn’t changed.

Because of that:
useEffect won’t keep re-running unnecessarily
things like setInterval won’t keep resetting

## STEPS FOR IMPLEMENTING STATIC UI

STEP 1
Freeze the UI. Pick ONE slide manually

```js
const slide = SLIDES[0];
```

STEP 2
We build the layout using that freezed slide.


```
SECTION
 ├── Background Image
 ├── Overlay
 ├── Content
 │     ├── Eyebrow - sits above the “eyes” (headline)
 │     ├── Headline - main message
 │     ├── Subtext - explanation
 │     ├── Buttons
 │     └── Stats
 └── Badge
```

