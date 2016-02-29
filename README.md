# Emergence.js
Emergence.js is a lightweight (<3KB), high-performance and dependency-free JavaScript utility for manipulating elements when they appear in the viewport. It leverages HTML5 data-* attributes for ease, and works in IE8+.

Simply add a `data-emergence="hidden"` attribute to any element in the DOM. If the element is visible, the attribute will change to `data-emergence="visible"`.

```html
<body>
	<div class="element" data-emergence="hidden"></div>

	<script src="dist/emergence.min.js"></script>
	<script>
		emergence.init({
			container: null,
			throttle: 250,
			reset: true,
			handheld: true,
			elemCushion: 0.15,
			viewportOffset: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			callback: function(element, state) {
			    if (state === 'visible') {
			      console.log("Element has emerged.");
			    } else {
			      console.log("Element has reset.");
			    }
			}
		});
	</script>
</body>
```

## Options
Information on options coming soon.
