# Enhanced Accordion Component

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [HTML Structure](#html-structure)
6. [CSS](#css)
7. [JavaScript Initialization](#javascript-initialization)
8. [Configuration Options](#configuration-options)
9. [HTML Attributes](#html-attributes)
10. [JavaScript API](#javascript-api)
11. [Events](#events)
12. [Arrow Animation](#arrow-animation)
13. [Content Animation](#content-animation)
14. [Keyboard Navigation](#keyboard-navigation)
15. [Accessibility](#accessibility)
16. [Browser Support](#browser-support)
17. [Examples](#examples)
18. [Troubleshooting](#troubleshooting)
19. [Contributing](#contributing)
20. [License](#license)
21. [Codepen Demo] (#demo)

## Introduction

The Enhanced Accordion Component is a lightweight, accessible, and feature-rich accordion implementation built with vanilla JavaScript. It provides a flexible and customizable way to create expandable/collapsible content sections on your web page.

## Features

- Smooth animations for opening and closing accordion items
- Customizable arrow indicator animation
- Keyboard navigation support
- Accessibility features with proper ARIA attributes
- Deep linking support
- State persistence (saving open/closed states)
- Customizable animation duration
- Option to allow multiple open items
- Event callbacks for open and close actions
- Nested accordions support

## Installation

To use the Enhanced Accordion Component in your project, include the following files:

```html
<link rel="stylesheet" href="path/to/accordion.css">
<script src="path/to/accordion.js"></script>
```

## Basic Usage

1. Add the necessary HTML structure (see [HTML Structure](#html-structure) section).
2. Include the CSS (see [CSS](#css) section).
3. Initialize the accordion with JavaScript (see [JavaScript Initialization](#javascript-initialization) section).

## HTML Structure

```html
<div class="accordion" fl-accordion>
  <div class="accordion-item" fl-accordion-item>
    <div class="accordion-header" fl-accordion-header>
      <h3>Section 1</h3>
      <svg fl-accordion-arrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </div>
    <div class="accordion-content" fl-accordion-content>
      <p>Content for Section 1</p>
    </div>
  </div>
  <!-- Add more accordion items as needed -->
</div>
```

## CSS

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition-property: max-height, padding, opacity;
}

.accordion-content.active {
  max-height: 1000px; /* Adjust this value as needed */
  opacity: 1;
}

[fl-accordion-arrow] {
  transition: transform 0.3s ease;
}

.accordion-header[aria-expanded="true"] [fl-accordion-arrow] {
  transform: rotate(180deg);
}
```

## JavaScript Initialization

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const accordions = document.querySelectorAll('[fl-accordion]');
  accordions.forEach(accordion => new Accordion(accordion));
});
```

## Configuration Options

You can customize the accordion behavior by passing a configuration object when initializing:

```javascript
const config = {
  allowMultipleOpen: false,
  animationDuration: 300,
  enableAnimation: true,
  saveState: false,
  deepLinking: false
};

new Accordion(accordionElement, config);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowMultipleOpen` | boolean | `false` | If `true`, multiple accordion items can be open simultaneously. |
| `animationDuration` | number | `300` | Duration of open/close animations in milliseconds. |
| `enableAnimation` | boolean | `true` | If `false`, animations will be disabled. |
| `saveState` | boolean | `false` | If `true`, the open/closed state of items will be saved in localStorage. |
| `deepLinking` | boolean | `false` | If `true`, allows opening specific items using URL hash. |

## HTML Attributes

You can also configure the accordion using HTML attributes:

| Attribute | Description |
|-----------|-------------|
| `fl-accordion` | Identifies the main accordion container. |
| `fl-accordion-item` | Identifies an accordion item. |
| `fl-accordion-header` | Identifies the clickable header of an accordion item. |
| `fl-accordion-content` | Identifies the content area of an accordion item. |
| `fl-accordion-arrow` | Identifies the arrow element for animation. |
| `fl-accordion-allow-multiple-open` | Allows multiple items to be open simultaneously. |
| `fl-accordion-animation-duration="500"` | Sets the animation duration (in ms). |
| `fl-accordion-disable-animation` | Disables animations. |
| `fl-accordion-save-state` | Enables state persistence. |
| `fl-accordion-deep-linking` | Enables deep linking. |

## JavaScript API

The `Accordion` class provides the following methods:

- `openItem(item)`: Opens a specific accordion item.
- `closeItem(item)`: Closes a specific accordion item.
- `toggleItem(item)`: Toggles the state of a specific accordion item.

## Events

The accordion component triggers the following events:

- `beforeOpen`: Fired before an item is opened.
- `afterOpen`: Fired after an item is opened.
- `beforeClose`: Fired before an item is closed.
- `afterClose`: Fired after an item is closed.

You can listen to these events like this:

```javascript
accordionElement.addEventListener('beforeOpen', function(e) {
  console.log('Item is about to open:', e.detail.item);
});
```

## Arrow Animation

The arrow animation is controlled by CSS. You can customize it by modifying the following CSS:

```css
[fl-accordion-arrow] {
  transition: transform 0.3s ease;
}

.accordion-header[aria-expanded="true"] [fl-accordion-arrow] {
  transform: rotate(180deg);
}
```

To customize:
1. Change the `transition` duration to adjust animation speed.
2. Modify the `rotate(180deg)` value to change rotation amount.
3. Use any HTML element with the `fl-accordion-arrow` attribute as the arrow indicator.

## Content Animation

Content animation is controlled by CSS and JavaScript:

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition-property: max-height, padding, opacity;
}

.accordion-content.active {
  max-height: 1000px; /* Adjust this value as needed */
  opacity: 1;
}
```

The `animationDuration` configuration option sets the duration of this transition.

## Keyboard Navigation

The accordion supports the following keyboard controls:

- `Enter` or `Space`: Toggle the focused accordion item.
- `Arrow Down`: Move focus to the next accordion header.
- `Arrow Up`: Move focus to the previous accordion header.
- `Home`: Move focus to the first accordion header.
- `End`: Move focus to the last accordion header.

## Accessibility

The accordion component is built with accessibility in mind:

- Proper ARIA attributes are used (`aria-expanded`, `aria-controls`, `aria-labelledby`).
- Keyboard navigation is supported for all functions.
- Screen reader-friendly structure and announcements.

## Browser Support

This accordion component should work in all modern browsers that support ES6 features. For older browser support, consider using a transpiler like Babel.

## Examples

1. Basic accordion:

```html
<div class="accordion" fl-accordion>
  <!-- Accordion items -->
</div>
```

2. Accordion with multiple open items and custom animation duration:

```html
<div class="accordion" 
     fl-accordion 
     fl-accordion-allow-multiple-open 
     fl-accordion-animation-duration="500">
  <!-- Accordion items -->
</div>
```

3. Accordion with state persistence and deep linking:

```html
<div class="accordion" 
     fl-accordion 
     fl-accordion-save-state
     fl-accordion-deep-linking>
  <!-- Accordion items -->
</div>
```

## Troubleshooting

- If animations aren't working, check if `enableAnimation` is set to `true` and that you haven't used the `fl-accordion-disable-animation` attribute.
- For issues with state persistence, ensure that localStorage is available and not full in the user's browser.
- If deep linking isn't working, make sure the URL hash matches the ID of an accordion item's content area.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Codepen demo

(https://codepen.io/Elin-Huseynli/pen/eYwWWJE)