# AVL

This is an AVL, self-balancing binary search tree data structure in JavaScript! 

It supports:

* Standard set operations
* Compound Keys & Custom Comparator Functions (newest feature!)
* Bulk loading
* Order statistics
* Multiple hot-swappable iterator (tree traversal) implementations, with bounding capabilities, and all compliant with JavaScript's native iteration protocol
* Nodes as arrays
* Handy `toString` function which prints ASCII representation of tree for debugging, including with an upper bound to avoid printing too many levels for large trees

Previously, I published several experiments with AVL tree style of data structure in JS and WASM. This project remedies several issues with those data structures and also improves things in various ways, so this is the one you should use!

If you do find any issues despite the testing I've done, do not hesitate to open an issue on GitHub.

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

You can also swap out the implementations of these functions at anytime after instantiation. Just assign your own new function to the appropriate instance property:

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

### Modes of Iteration

The AVL class comes with a variety of static methods suitable for tree traversal. The general workflow to configure an AVL instance's iteration behavior before iterating:

1. Assign to the instance's `[Symbol.iterator]` property the static method corresponding to the iteration or tree traversal desired.
2. If needed, assign a numerical lower bound to the instance property `ITER_LB`.
3. If needed, assign a numerical upper bound to the instance property `ITER_UB`.

After that, you're ready to use the tree instance anywhere you'd use an iterable in JS (spread operator, `for...of` loops, etc).

**One warning.** The `toString` method is just a wrapper around the level order traversal iterator (discussed more below). So, after using the `toString` function, the subsequent iteration behavior could surprise you. It's best practice to explicitly set the iteration properties before every iteration unless you're *very* sure you've kept track of how your AVL tree's iteration properties are configured.

#### `AVL.ITER_FWD_GE_TO_LE`

A generator function yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound and upper bound are both inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LE
T.ITER_LB = 32
T.ITER_UB = 63
console.log(
  [...T].map(n=>n[1])
) 
// 32, 42
```

#### `AVL.ITER_FWD_GE_TO_LT`

A generator function yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound is inclusive, but the upper bound is exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LT
T.ITER_LB = 32
T.ITER_UB = 64
console.log(
  [...T].map(n=>n[1])
) 
// 32, 42
```

#### `AVL.ITER_FWD_GT_TO_LE`

A generator function yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound is exclusive, but the upper bound is inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_FWD_GT_TO_LE
T.ITER_LB = 32
T.ITER_UB = 64
console.log(
  [...T].map(n=>n[1])
) 
// 42, 64
```

#### `AVL.ITER_FWD_GT_TO_LT`

A generator function yielding nodes from the tree according to a bounded, inorder traversal of the nodes according to their key values. The lower bound is exclusive, but the upper bound is exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_FWD_GT_TO_LT
T.ITER_LB = 16
T.ITER_UB = 64
console.log(
  [...T].map(n=>n[1])
) 
// 32 42
```

#### `AVL.ITER_REV_LE_TO_GE`

A generator function yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound and upper bound are both inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_REV_LE_TO_GE
T.ITER_LB = 32
T.ITER_UB = 63
console.log(
  [...T].map(n=>n[1])
) 
// 42, 32
```

#### `AVL.ITER_REV_LE_TO_GT`

A generator function yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound is exclusive, but the upper bound is inclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_REV_LE_TO_GT
T.ITER_LB = 32
T.ITER_UB = 64
console.log(
  [...T].map(n=>n[1])
) 
// 64, 42
```

#### `AVL.ITER_REV_LT_TO_GE`

A generator function yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound is inclusive, but the upper bound is exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_REV_LT_TO_GE
T.ITER_LB = 32
T.ITER_UB = 64
console.log(
  [...T].map(n=>n[1])
) 
// 42, 32
```

#### `AVL.ITER_REV_LT_TO_GT`

A generator function yielding nodes from the tree according to a bounded, reverse inorder traversal of the nodes according to their key values. The lower bound and upper bound are both exclusive.

```js
const T = new AVL([
  2, 4, 8, 16, 32, 42, 64
]);
T[Symbol.iterator] = AVL.ITER_REV_LT_TO_GT
T.ITER_LB = 16
T.ITER_UB = 64
console.log(
  [...T].map(n=>n[1])
) 
// 42, 32
```

#### `AVL.ITER_LEVEL_ORDER`

A generator function that yields arrays of nodes, where each array corresponds to one level in the tree, starting from the root. Obeys the value of `ITER_UB` property and will stop yielding levels once it reaches that limit. This function is used by the `toString` function, so reset the value of `[Symbol.iterator]` after using that function if needed.

#### `AVL.ITER_PREORDER`

A generator function yielding nodes from the tree according to a preorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.

#### `AVL.ITER_POSTORDER`

A generator function yielding nodes from the tree according to a postorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.


#### `AVL.ITER_REV_PREORDER`

A generator function yielding nodes from the tree according to a reverse preorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.


#### `AVL.ITER_REV_POSTORDER`

A generator function yielding nodes from the tree according to a reverse postorder traversal of the nodes according to their key values. The lower bound and upper bound are both ignored.

### Set Operations

All three of these are static methods on the AVL class.

If you are storing values in your nodes, then in union and intersect cases where a key is present in both input trees, the values associated with the key in both trees will be put into an array which is assigned to the key's value in the result tree.

#### `union`

Given two AVL tree instances, `a` and `b`, generate a new AVL tree instance containing the all keys from either `a` or `b`, deduplicated. 

#### `intersect`

Given two AVL tree instances, `a` and `b`, generate a new AVL tree instance containing each key which is in both `a` and `b`, deduplicated.

#### `difference`

Given two AVL tree instances, `a` and `b`, generate a new AVL tree instance containing the all keys which are in `a` but not in `b`.

The last argument is a function which will be used to convert keys to a format suitable for insertion into a JavaScript `Set`. The default is `JSON.stringify`.
