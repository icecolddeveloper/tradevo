# Dropdown Left Position Logic — Quick Reference

## What this function does

This function calculates the dropdown's **left position** when a category button is clicked.

The goal is simple:

```txt
Place the dropdown near the clicked button, but do not let it overflow outside the container.
```

---

## Final Function

```js
function calculateDropdownLeftPosition(e) {
  const isDesktopScreen = window.matchMedia('(min-width: 1020px)').matches;

  if (!isDesktopScreen) return 0;

  const clickedCategoryButton = e.currentTarget;

  const categoryContainer = clickedCategoryButton.closest(
    `.${styles.main__container}`,
  );

  if (!categoryContainer) return 0;

  const containerPosition = categoryContainer.getBoundingClientRect();
  const buttonPosition = clickedCategoryButton.getBoundingClientRect();

  const dropdownWidth = 360;

  const buttonLeftInsideContainer =
    buttonPosition.left - containerPosition.left;

  const maxLeftPosition = Math.max(containerPosition.width - dropdownWidth, 0);

  const dropdownLeftPosition = Math.min(
    buttonLeftInsideContainer,
    maxLeftPosition,
  );

  return dropdownLeftPosition;
}
```

---

## Key idea

## Important Note About `getBoundingClientRect().left`

When you use:

```js
element.getBoundingClientRect().left;
```

the `left` value is measured from the left edge of the browser viewport always starting at 0px.

The viewport is the visible browser screen and the far left of the viewport is treated as:

```txt
0px
```

Example:

```txt
  Browser viewport

  0px                                                        1440px
  |-------------------------------------------------------------|
  |                                                             |
  |        category container                                   |
  |        |--------------------------------------------|       |
  |        ^                                                    |
  |        containerPosition.left = 120px                       |
  |                                                             |
  |                         clicked button                      |
  |                         |-----------|                       |
  |                         ^                                   |
  |                         buttonPosition.left = 360px         |
  |                                                             |
  |-------------------------------------------------------------|
```

So:

```js
containerPosition.left = 120;
buttonPosition.left = 360;
```

Thus:

`getBoundingClientRect().left` measures from the **browser viewport**, not from the parent container housing the buttons.

The viewport starts at:

```txt
0px
```

Example:

```txt
Browser viewport

0px        120px                 360px
|----------|----------------------|--------------------------|-------------------------|
           container starts       clicked btn starts         Btn ends here             Container ends
```

So:

```js
containerPosition.left = 120;
buttonPosition.left = 360;
```

To find the button's position **inside the container**:

Example:

```txt
Browser viewport

0px        120px                 360px
|----------|----------------------|
           container starts       button starts
```

Inside the container, the button is not at `360px`.

It is at:

```txt
360px - 120px = 240px
```

So inside the container:

```txt
0px                         240px
|----------------------------|
container left               clicked button starts
```

Therefore:

```js
buttonLeftInsideContainer = 240;
```

---

## What `maxLeftPosition` means

`maxLeftPosition` is the **maximum left value** the dropdown can have before it overflows.

Example:

```txt
container width = 1000px
dropdown width  = 360px
```

```js
maxLeftPosition = 1000 - 360;
maxLeftPosition = 640;
```

This means:

```txt
The dropdown must not start after 640px.
```

Why?

```txt
640px + 360px = 1000px
```

So the dropdown ends exactly at the container's right edge.

If it started at `700px`:

```txt
700px + 360px = 1060px
```

That would overflow outside the container.

---

## Why `Math.min()` is used

```js
const dropdownLeftPosition = Math.min(
  buttonLeftInsideContainer,
  maxLeftPosition,
);
```

This means:

```txt
Use the clicked button's position if it is safe.
If it is too far right, use the maximum safe left position instead.
```

Example:

```js
buttonLeftInsideContainer = 820;
maxLeftPosition = 640;

dropdownLeftPosition = 640;
```

The button is too far right, so the dropdown is pulled back to `640px`.

---

## Quick summary

```txt
buttonLeftInsideContainer
= where the clicked button starts inside the container

maxLeftPosition
= the maximum safe left position for the dropdown

dropdownLeftPosition
= the final safe left position returned by the function
```

Final memory:

```txt
The dropdown follows the clicked button, but never moves beyond the safe maximum left position.
```
