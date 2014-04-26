# ndarray-bundle

This module bundles up a bunch of useful [ndarray modules](https://www.npmjs.org/search?q=ndarray), and returns them as a replacement to the `ndarray` module.

It also includes code-generation, so you can generate your *own* version of the bundle (with the same structure) that only includes the modules you need, for use with Browserify.

## Inclusion via Node

When included as a Node module, the result is based on the [`ndarray`](https://www.npmjs.org/package/ndarray) package:

```javascript
var ndarray = require('ndarray-bundle');
var arr1 = ndarray(new Float32Array(100), [10, 10]);
```

However, other modules are included and added to this bundle, e.g.:

```javascript
var matrix = ndarray.zeros([4, 4]); // included from the "zeros" module
ndarray.fill(nd1, function (i, j) { // included from "ndarray-fill"
	return i + j;
});
```

Some of the modules are grouped together by functionality:

```javascript
assert(ndarray.signals.fft); // included from the "ndarray-fft" module
assert(ndarray.signals.convolve); // included from the "ndarray-convolve" module
```

The structure of the included modules is defined in `module-map.json`.

## Generating your own code

When bundling up using a tool like Browserify, you don't want to `require()` modules that you're not using.

As such, you can generate code that just includes the modules you need.  You'll probably do this as part of your build script (so `ndarray-bundle` is only a dev-dependency):

```javascript
var codeGen = require('ndarray-bundle/generate');

codeGen.generateFile('./my-ndarray-bundle.js'); // includes everything by default, writes to file
var jsCode = codeGen.generateString(); // or get as string
```

### Selecting certain packages

To select certain packages, you can specify the packages you need by supplying an object argument:
```javascript
codeGen.generateFile('./my-ndarray-bundle.js', {
	ops: true,
	complex: true,
	signal: true
});
```

The structure of this argument is recursive.  If you want to pick and choose from sub-groups, then you can supply an object instead of `true`:
```javascript
codeGen.generateFile('./my-ndarray-bundle.js', {
	ops: true,
	complex: true,
	signal: {
		fft: true
	}
});
```

You can also enhance this structure with other modules, by providing a string:
```javascript
codeGen.generateFile('./my-ndarray-bundle.js', {
	ops: true,
	myCustomModule: 'ndarray-my-custom-module'
});
```

The resulting code only references the modules you want, but it maintains the same data structure.  This means that if you only reference `my-ndarray-bundle.js`, then Browserify will only package up the modules you need.