# Emergence.js
Emergence.js is a lightweight (<3KB), high-performance, and dependency-free JavaScript utility for manipulating elements when they appear in the viewport. It includes plenty of options such as; custom container, throttle, reset, handheld detection, element cushioning, container offset, and callbacks. It leverages HTML5 data-* attributes for ease, and works in pretty much any device or browser (IE8+).

[View Demo](http://codepen.io/xtianmiller/pen/QpmGxL)

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

## How To Use
Add `data-emergence="hidden"` to any element you wish to watch:

```html
<div class="element" data-emergence="hidden"></div>
```

When the element becomes visible within the viewport, the attribute will change to `data-emergence="visible"`. Now you can leverage CSS, for example, to animate the element:

```css
.element[data-emergence=hidden] {
  /* Initial state */
}
.element[data-emergence=visible] {
  /* Do something */
}
```

## Custom Options
Emergence.js has a number of options you can customize. Below are the defaults:

```javascript
emergence.init({
  container: null,
  throttle: 250,
  reset: true,
  handheld: true,
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
By default, the visibility of elements will be determined by the root window's viewport dimensions and X/Y scroll position (when set to `null`). However, it's possible to change it to a custom container. For example:

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
Emergence will do a check for handheld devices such as an iPhones, iPads or Androids. When set to `false`, the plugin will not run on those devices. The default is `true`.

#### elemCushion
The element cushion will determine how much of the element needs to be within the viewport to count as "visible". A value of 0.5 would equate to 50% of the element needing to be visible. The default is `0.15`.

#### offsetTop, offsetRight, offsetBottom, offsetLeft
Provide an offset on any edge of the viewport. This is useful if you have a fixed component such as a header, for which you can offset the same value as the height of the header. The default for all is `0`.

#### callback
Useful for providing callbacks to determine when an element is visible, hidden and reset. The possible states are `visible`, `reset`, and `noreset`.
