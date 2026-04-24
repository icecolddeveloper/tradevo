MEGA MENU DROPDOWN (CLEAR UNDERSTANDING)

We have a website with a dropdown (mega menu) inside the navigation bar.

To control when the dropdown shows or hides, we use:
- onMouseEnter
- onMouseLeave

These functions update state, which decides if the dropdown is visible or not.


1. SHOWING THE DROPDOWN (BUTTON HOVER)

When the user moves the mouse to the category button:
- onMouseEnter is triggered
- We update the state to true
- The dropdown becomes visible

Meaning:
When the user enters the category button, we show the dropdown by setting state to true.


2. PROBLEM WHEN USER LEAVES THE BUTTON

When the dropdown is open and the user moves the mouse away from the category button:
- onMouseLeave is triggered
- It immediately sets state to false
- The dropdown closes instantly

Problem:
The user may not have enough time to move into the dropdown before it disappears.


3. SOLUTION — ADD A DELAY BEFORE CLOSING

To fix this, we do NOT close immediately.

Instead:
- When onMouseLeave happens, we start a timer using setTimeout
- This timer waits for a short delay before closing the dropdown

Meaning:
We give the user time to move from the button into the dropdown.


4. DROPDOWN ALSO HAS ITS OWN EVENTS

The dropdown itself also has:
- onMouseEnter
- onMouseLeave

So when the user enters the dropdown:
- onMouseEnter is triggered again
- This means the user is still interacting with the menu

At this point, we do NOT want the dropdown to close.


5. WHY WE USE clearTimeout

When the user enters the dropdown, there may already be a close timer running from when they left the button.

So we must:
- Call clearTimeout to cancel the scheduled closing function

Because:
If we don’t clear it, the timer will still finish and the dropdown will close even while the user is inside it.


FINAL FLOW

1. User enters category button → dropdown opens
2. User leaves button → setTimeout starts (close scheduled)
3. User enters dropdown → clearTimeout cancels closing
4. Dropdown stays open while user is interacting
5. Only when user leaves both button and dropdown → timer completes and dropdown closes


ONE-LINE SUMMARY

We delay closing the dropdown when the user leaves, and we cancel that delay when the user enters the dropdown, so it only closes when the user fully stops interacting with both areas.