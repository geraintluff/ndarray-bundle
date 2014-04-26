# ndarray-bundle

Tools for both including a bunch of useful [ndarray modules](https://www.npmjs.org/search?q=ndarray), and generating code for your own

## Inclusion via Node

When included as a Node module, the result is based on the [`ndarray`](https://www.npmjs.org/package/ndarray) package:

```javascript
var ndarray = require('ndarray-bundle');
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
assert(ndarray.pixels.get); // included from the "get-pixels" module
assert(ndarray.pixels.save); // included from the "save-pixels" module
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

If you want to pick and choose from sub-groups, then you can supply an object instead of `true`:
```javascript
codeGen.generateFile('./my-ndarray-bundle.js', {
	ops: true,
	complex: true,
	signal: {
		fft: true
	}
});
```

The resulting code only references the modules you want, but it maintains the same data structure.  This means that if you only reference `my-ndarray-bundle.js`, then Browserify will only package up the modules you need.