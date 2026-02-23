# JavaScript Interview Questions & Answers :

## 1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll
- `getElementById` → selects a single element by its **ID**.
- `getElementsByClassName` → selects multiple elements by their **class name** (returns a live HTMLCollection).
- `querySelector` → selects the **first element** matching any CSS selector.
- `querySelectorAll` → selects **all elements** matching a CSS selector (returns a static NodeList).

---

## 2. How do you create and insert a new element into the DOM?
- Use `document.createElement()` to create a new element, then insert it with methods like `appendChild()` or `prepend()`.

---

## 3. What is Event Bubbling? And how does it work?
- Event Bubbling is the process where an event triggered on a child element first runs its handler, then propagates upward through its parent elements until reaching the root, allowing multiple levels of elements to respond.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?
- Event Delegation means attaching a single event listener to a parent element so that events on its child elements are handled through bubbling.
- It is useful because it reduces code, improves performance, and works even for dynamically added elements.

---
