[![Emergence.js - detect element visibility in the browser](https://xtianmiller.github.io/emergence.js/dist/images/emergence-title.png#2)](https://xtianmiller.github.io/emergence.js)

Emergence.js is a lightweight, high-performance JS plugin for detecting and manipulating elements in the browser.

[![Emergence.js - detect element visibility in the browser](https://xtianmiller.github.io/emergence.js/dist/images/emergence-hero.png#2)](https://xtianmiller.github.io/emergence.js)

***

[![License: MIT](https://img.shields.io/badge/license-MIT-00ddd0.svg)](https://opensource.org/licenses/MIT)
[![NPM version](https://img.shields.io/badge/npm-v1.1.2-00ddd0.svg)](https://www.npmjs.com/package/emergence.js)

- Dependancy-free
- IE8+ and all modern browsers
- 1KB minified and gzipped

**[View Demo](https://xtianmiller.github.io/emergence.js)**

***

## Why Use It?
This plugin is designed to allow manipulation on elements depending on their visibility in the browser. It gives the developer the freedom to use their own CSS or JS to determine what happens; whether it's animation or a change in state. It leverages HTML5 data-* attributes instead of classes for ease and developer clarity. Emergence.js is one of the lightest and most compatible plugins of its kind.

***

## Getting Started
Reference emergence.js just before your closing `</body>` tag, then simply call `emergence.init`.

```html
<script src="path/to/emergence.min.js"></script>
<script>
  emergence.init();
</script>
```

Grab the latest code from the following locations:

- [Download from Github](https://github.com/xtianmiller/emergence.js/archive/master.zip)
- `npm install emergence.js`
- `bower install emergence.js`

***

## How To Use
Add `data-emergence="hidden"` to any element you wish to watch:

```html
<div class="element" data-emergence="hidden"></div>
```

When the element becomes visible within the viewport, the attribute will change to `data-emergence="visible"`. Now you can leverage CSS, for example, to animate the element:

```css
.element[data-emergence=hidden] {
  /* Hidden state */
}
.element[data-emergence=visible] {
  /* Visible state */
}
```

***

## Custom Options
Emergence.js has a number of options you can customize. Below are the defaults:

```javascript
emergence.init({
  container: window,
  reset: true,
  handheld: true,
  throttle: 250,
  elemCushion: 0.15,
  offsetTop: 0,
  offsetRight: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  callback: function(element, state) {
    if (state === 'visible') {
      console.log('Element is visible.');
    } else if (state === 'reset') {
      console.log('Element is hidden with reset.');
    } else if (state === 'noreset') {
      console.log('Element is hidden with NO reset.');
    }
  }
});
```

### Options Explained
#### container
By default, the visibility of elements will be determined by the window's viewport dimensions and X/Y scroll position (when set to `window`). However, it's possible to change it to a custom container. For example:

```javascript
var customContainer = document.querySelector('.wrapper');

emergence.init({
  container: customContainer
});
```

#### throttle
Throttle is a method that prevents performance issues associated with scroll and resize events. The throttle will create a small timeout and steadily check element visibility every set amount of milliseconds during the event. The default is `250`.

#### reset
Determines whether the data-attribute state will reset after it's been revealed. Set reset to `false` if you wish for the element to stay in its revealed state even after leaving the viewport. The default is `true`.

#### handheld
Emergence will do a check for most handheld device models such as phones and tablets. When set to `false`, the plugin will not run on those devices. The default is `true`.

#### elemCushion
The element cushion will determine how much of the element needs to be within the viewport to count as "visible". A value of 0.5 would equate to 50% of the element needing to be visible. The default is `0.15`.

#### offsetTop, offsetRight, offsetBottom, offsetLeft
Provide an offset (in pixels) on any edge of the viewport. This is useful if you have a fixed component such as a header, for which you can offset the same value as the height of the header. A value of `100` applied to `offsetTop` will mean elements will only count as visible when they are greater than 100 pixels from the top of the viewport. The default for all is `0`.

#### callback
Useful for providing callbacks to determine when an element is visible, hidden and reset. The possible states are `visible`, `reset`, and `noreset`.

***

## Advanced
### Engage
If you want to refire visibility checks outside of the load, scroll and resize events already baked into the plugin, use the following:
```javascript
emergence.engage();
```

### Disengage
If you want to disable Emergence, use the following:
```javascript
emergence.disengage();
```

***

## Browser Support
Emergence.js is dependent on the following browser APIs:

- [querySelectorAll](http://caniuse.com/#feat=queryselector)
  - For support in IE8, ensure standards mode

***

## Issues & Contributions
Issues can be resolved quicker if they are descriptive and include both a minimal test case and a set of steps to reproduce.

While new features are welcome, any contributions that can fix bugs, maximize compatibility, and improve performance are preferred.

***

## Release history

- 1.1.2
  - Added handheld detection for Kindle Fire and PlayBook
  - Updated comments
  - Updated npm packages
  - Optimized animations on demo
  - Optimized responsive styles on demo
  - Added release history to README.md
