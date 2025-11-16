# AVL

This is an AVL, self-balancing binary search tree data structure in JavaScript! 

It supports:

* Standard set operations
* Compound Keys & Custom Comparator Functions (newest feature!)
* Bulk loading
* Order statistics — including percentile/quantile query/iteration methods
* Tukey fence calculator for outlier analysis 
* Multiple iterator (tree traversal) implementations, with bounding capabilities, and all compliant with JavaScript's native iteration protocol
* Nodes as arrays
* Handy `toString` function which prints ASCII representation of tree for debugging, including with an upper bound to avoid printing too many levels for large trees

Previously, I published several experiments with AVL tree style of data structure in JS and WASM. This project remedies several issues with those data structures and also improves things in various ways, so this is the one you should use!

If you do find any issues despite the testing I've done, do not hesitate to open an issue on GitHub.

This current version of this project is licensed under GPLv3. [Reach out to me if you need a different license](https://dvanderweele.com/contact).

## Documentation

See the tests in the repo for more examples of how the functions described in this document work.

You can create a new, empty instance of the `AVL` class like this:

```js
const myAVLTree = new AVL()
```

It is also possible to "bulk load" the data structure via the constructor if a sorted array is provided as an argument:

```js
const myAVLTree = new AVL([
  2,4,8,16,32,64
])
```

If each entry within the sorted array provided for bulk loading is itself an array, then the 0th indexed element will be interpreted as a key and the 1st indexed element will be interpreted as its associated value.

Subsequent parameters in the constructor are for providing custom comparator functions (in case, for example, your keys are compound data types that require custom comparison logic). Default values:

```js
constructor(
  sortedArray = null,
  comp_eq = AVL.COMP_EQ, // (a,b)=>a==b
  comp_lt = AVL.COMP_LT, // (a,b)=>a<b
  comp_le = AVL.COMP_LE, // (a,b)=>a<=b
  comp_gt = AVL.COMP_GT, // (a,b)=>a>b
  comp_ge = AVL.COMP_GE  // (a,b)=>a>=b
){
  // implementation...
}
```

Though not recommended, you can also swap out the implementations of these functions at anytime after instantiation. Just assign your own new function to the appropriate instance property:

* `COMP_EQ`
* `COMP_LT`
* `COMP_LE`
* `COMP_GT`
* `COMP_GE`

For quick debugging, you can build an ASCII representation of your tree by calling the `toString()` method on an AVL instance:

```js
console.log(myAVLTree.toString())
```

You can provide an upper bound for the number of tree levels to print; see the section below on **Modes of Iteration**.

Retrieve the number of nodes or keys stored in the tree by accessing the `size` property of the tree instance:

```js
myAVLTree.size
```

Retrieve the root node of the tree by accessing the `root` property of the tree instance:

```js
myAVLTree.root
```

Retrieve the tree's minimum or maximum values via the `min` and `max` properties respectively. Those properties are simply wrappers around the instance methods `getMinOfSubtree` and `getMaxOfSubtree` discussed below.


```js
myAVLTree.min
myAVLTree.max
```

Nodes are arrays, where the first five indices are:

* 0 - the height of subtree rooted at that node
* 1 - the key value
* 2 - the node's left child
* 3 - the node's right child
* 4 - the size of the subtree rooted at that node
* 5 ? the value if you are also storing values in your tree which are associated with the keys

### Instance Methods

#### `search`

A test of key membership which returns the matching node if found, otherwise null. 

Parameters:

* key - required - the key value being sought
* searchRoot - optional - the node in the tree from which to commence the search, default is root node.

#### `insert`

Insert a key and optionally a value into the tree. If non-null value argument provided, it is inserted at index 5 in the node array. Returns a reference to the inserted node.

Parameters:

* key - required - should be a number
* node - optional - node from which to start search for a slot to insert key, default is root node
* value - optional - value to store in the node, default is null in which case index 5 will not be used in the node array

#### `getMinOfSubtree`

Return the node from the tree with the smallest key value.

Parameters:

* node - optional - the node from which to start searching for minimum key value; default is root node

#### `getMaxOfSubtree`

Return the node from the tree with the largest key value.

Parameters:

* node - optional - the node from which to start searching for maximum key value; default is root node

#### `remove`

Remove a node from the tree which has the provided key value. 

Parameters:

* key - required -the key of the node designated for deletion
* node - optional - the node from which to start searching for the node to remove, default being root node

#### `minGreaterEqual`

Provided a search term (number), search for and return the node with the smallest key value greater than or equal to that search term, otherwise null.

#### `maxLesserEqual`

Provided a search term (number), search for and return the node with the largest key value less than or equal to that search term, otherwise null.

#### `minGreater`

Provided a search term (number), search for and return the node with the smallest key value greater than that search term, otherwise null.

#### `maxLesser`

Provided a search term (number), search for and return the node with the largest key value less than that search term, otherwise null.

#### `OSSelect`

An order statistic search function. Given a node `X` to start searching at (default is root node) and a positive integer `I` (default is 1), find and return the node with the *I*th smallest key value.

#### `OSRank`

An order statistic query function which returns the index or rank of a provided key in an inorder traversal of the tree.

#### `quantile`

Provide a quantile argument between 0 and 1, and the node at the corresponding rank is returned.

#### `percentile`

Same as `quantile` but provide an argument ranging between 0 and 100.

#### `tukeyFences`

Tukey fencing is a methodology for classifying outlying values in a dataset. This function works with numerical keys. It accepts as arguments a lower quantile (default is traditional 0.25), an upper quantile (default is traditonal 0.75), and a "k" value (default is traditonal 1.5). It returns a pair of "fence" figures. Keys in the tree below the lower fence value are considered low outliers, and keys above the upper fence value high outliers.

### Modes of Iteration

The AVL class comes with a variety of instance methods suitable for tree traversal. These methods return an iterable separate from the data structure itself. The returned iterable has closure over state variables required to iterate the tree correctly. While this makes it easier to use tree iteration functions in asynchronous situations, then you must be mindful when mutating the tree. The first parameter is the lower bound for iteration and second parameter is the upper bound. You can consume the returned iterable anywhere you'd use an iterable in JS (spread operator, `for...of` loops, etc).

It is possible to use this data structure with not just numeric but also string values. String values may also be sought via these iterators by providing lower and upper bound strings. It is also possible to search for a range of strings having a particular prefix by appropriately configuring these lower and upper bound values.

#### `ITER_FWD_GE_TO_LE`

An iterable yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound and upper bound are both inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_FWD_GE_TO_LE(32,63)].map(n=>n[1])
) 
// 32, 42
```

#### `ITER_FWD_GE_TO_LT`

An iterable yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound is inclusive, but the upper bound is exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_FWD_GE_TO_LT(32,64)].map(n=>n[1])
) 
// 32, 42
```

#### `ITER_FWD_GT_TO_LE`

An iterable yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound is exclusive, but the upper bound is inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_FWD_GT_TO_LE(32,64)].map(n=>n[1])
) 
// 42, 64
```

#### `ITER_FWD_GT_TO_LT`

An iterable yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound is exclusive, but the upper bound is exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_FWD_GT_TO_LT(16,64)].map(n=>n[1])
) 
// 32 42
```

#### `ITER_REV_LE_TO_GE`

An iterable yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound and upper bound are both inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_REV_LE_TO_GE(32,63)].map(n=>n[1])
) 
// 42, 32
```

#### `ITER_REV_LE_TO_GT`

An iterable yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound is exclusive, but the upper bound is inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_REV_LE_TO_GT(32,64)].map(n=>n[1])
) 
// 64, 42
```

#### `ITER_REV_LT_TO_GE`

An iterable yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound is inclusive, but the upper bound is exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_REV_LT_TO_GE(32,64)].map(n=>n[1])
) 
// 42, 32
```

#### `ITER_REV_LT_TO_GT`

An iterable yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound and upper bound are both exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
console.log(
  [...T.ITER_REV_LT_TO_GT(16,64)].map(n=>n[1])
) 
// 42, 32
```

#### `ITER_LEVEL_ORDER`

An iterable that yields arrays of nodes, where each array corresponds to one level in the tree, starting from the root. 

#### `ITER_PREORDER`

An iterable yielding nodes from the tree according to a preorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.

#### `ITER_POSTORDER`

An iterable yielding nodes from the tree according to a postorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.

#### `ITER_REV_PREORDER`

An iterable yielding nodes from the tree according to a reverse preorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.

#### `ITER_REV_POSTORDER`

An iterable yielding nodes from the tree according to a reverse postorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.

#### `ITER_FWD_FROM_QTL`

Provide a quantile from which to start iterating in forward direction.

#### `ITER_FWD_TO_QTL`

Provide a quantile to iterate unto from the low end of the tree.

#### `ITER_REV_FROM_QTL`

Provide a quantile from which to start iterating in reverse direction.

#### `ITER_REV_TO_QTL`

Provide a quantile to iterate unto from the high end of the tree.

#### `ITER_FWD_BETWEEN_QTLs`

Provide a lower and upper quantile to iterate between in forward direction.

#### `ITER_REV_BETWEEN_QTLs`

Provide a lower and upper quantile to iterate between in reverse direction.

### Set Operations

All three of these are static methods on the AVL class.

If you are storing values in your nodes, then in union and intersect cases where a key is present in both input trees, the values associated with the key in both trees will be put into an array which is assigned to the key's value in the result tree.

These methods do not accept AVL tree instances as arguments, but rather iterables returned by the above discussed instance methods. Only the iterables returned by instance methods starting with `ITER_FWD_` should be used.

#### `union`

Given two AVL tree iterables, `a` and `b`, generate a new AVL tree instance containing all keys from either `a` or `b`, deduplicated. 

#### `intersect`

Given two AVL tree iterables, `a` and `b`, generate a new AVL tree instance containing each key which is in both `a` and `b`, deduplicated.

#### `difference`

Given two AVL tree iterables, `a` and `b`, generate a new AVL tree instance containing the all keys which are in `a` but not in `b`.

The last argument is a function which will be used to convert keys to a format suitable for insertion into a JavaScript `Set`. The default is `JSON.stringify`.
