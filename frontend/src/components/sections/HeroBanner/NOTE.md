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

`------------------------- MODULO (%) + SLIDER LOGIC NOTES -------------------------------`
STATE FLOW + HOW SLIDER WORKS

Initial setup:
we have state ie

```js
const [current, setCurrent] = useState(2);

current = 0
setCurrent = function to update it

this means:
we always start from slide index 0

---

ON PAGE LOAD

current = 0
slide = SLIDES[current]

-----> first slide is shown

---

USER INTERACTION (BUTTONS)

we have:

* next button
* prev button

when user clicks NEXT:

next = (prev + 1) % 4
(where prev = current = 0)

-------------- FLOW FOR NEXT -------------------

  user clicks next
    ↓
  next() runs
    ↓
  setCurrent((c) => (c + 1) % 4)
    ↓
  React takes current value (c)
    ↓
  calculates new value
    ↓
  updates state
    ↓
  component re-renders
    ↓
  new slide shows

----------------------------------------------

STEP-BY-STEP BREAKDOWN
----------------------------------------------

Case 1: prev = 0
next = (prev + 1) % 4
next = (0 + 1) % 4
next = 1 % 4
Math step:
1 ÷ 4 = 0 remainder 1 (1 can’t be divided by 4, so we just get 0 and 1 stays)
Result:
next = 1

-----> Move from slide 0 → 1

Case 2: prev = 1
next = (prev + 1) % 4
next = (1 + 1) % 4
next = 2 % 4
Math step:
2 ÷ 4 = 0 remainder 2 (2 can’t be divided by 4, so we just get 0 and 2 stays)
Result:
next = 2

-----> Move from slide 1 → 2

Case 3: prev = 2
next = (prev + 1) % 4
next = (2 + 1) % 4
next = 3 % 4
Math step:
3 ÷ 4 = 0 remainder 3 (3 can’t be divided by 4, so we just get 0 and 3 stays)
Result:
next = 3

-----> Move from slide 2 → 3

Case 4: prev = 3 (IMPORTANT WRAP CASE)
next = (prev + 1) % 4
next = (3 + 1) % 4
next = 4 % 4
Math step:
4 ÷ 4 = 1 remainder 0
Result:
next = 0

Wraps back: slide 3 → 0


----------------------------------------------
KEY IDEA (VERY IMPORTANT):
If the first number is smaller than the second,
the result is just the first number
----------------------------------------------

So:

1 % 4 = 1
2 % 4 = 2
3 % 4 = 3

(this is why normal movement works)

BUT:

4 % 4 = 0

(this is what resets the slider)

-----------------------------------------------

WHY THIS APPROACH IS GOOD

we are forcing the value to always stay within range:

0 → 1 → 2 → 3

which matches array indexes

without this:

3 + 1 = 4 
SLIDES[4] → undefined (bug)

WITH %:
when the value reaches arr.length (e.g. 4 % 4),
it resets back to 0 (initial state)

(3 + 1) % 4 = 0 
SLIDES[0] → valid 

----------------------------------------------

MENTAL MODEL

% = "keep value inside range"

if value is still within range → it stays
if value reaches the limit → it resets to 0

----------------------------------------------
