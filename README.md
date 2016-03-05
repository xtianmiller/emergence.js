# Emergence.js
Emergence.js is a lightweight (<3KB), high-performance and dependency-free JS utility for manipulating elements when they appear in the viewport. It leverages HTML5 data-* attributes for ease, and works in IE8+.

## Get Started
The fastest way to get started is to reference to emergence.js just before your closing `</body>` tag, and then simply call `emergence.init`.

```html
<script src="path/to/emergence.min.js"></script>
<script>
	emergence.init();
</script>
```

You can grab the latest code from the following locations:

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

```html
<script>
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
		      console.log('Element has emerged.');
		    } else {
		      console.log('Element has reset.');
		    }
		}
	});
</script>
```

### Options Explained
#### container
It's possible to provide a custom container from within the DOM. For example, `document.querySelector('.wrapper');`. By default, `null` will pass `<html>` as the container.

#### throttle
Throttle is a method that prevents performance issues associated with scroll and resize events. The throttle will create a small timeout and steadily check element visibility every set amount of milliseconds during the event. The default is `250`.

#### reset
Determines whether the data-attribute state will reset after it's been revealed. Set to `false` to prevent the reset.

#### handheld
Don't want this utility to run on handheld devices such as iPhones, iPads, and Androids? Set this option to `false`.

#### elemCushion
The element cushion will determine how much of the element needs to be within the viewport to count as "visible". The default value of 0.15 incidates 15% of the element needs to be in the viewport.

#### offsetTop, offsetRight, offsetBottom, offsetLeft
Provide an offset on any edge of the viewport. This is useful if you have a fixed component such as a header, for which you can offset the same value as the height of the header.

#### callback
Useful for providing callbacks on when an element has become visible, and when it resets.
