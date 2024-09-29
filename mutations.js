import {
  AVL
} from "./avl.js"
const A = new AVL()
console.log("non-root left leaf removal where parent is root")
A.insert(5)
let r = A.root
r[0] = 2
r[1] = 5
r[2] = [
  1, 3, null, null, 1
]
r[3] = null
r[4] = 2
console.log("before", A.toString(),"\n======")
A.remove(3)
console.log("after", A.toString(),"\n======")
const B = new AVL()
console.log("non-root right leaf removal where parent is root")
B.insert(5)
B.insert(8)
console.log("before", B.toString(),"\n======")
B.remove(8)
console.log("after",B.toString(),"\n======")

const C = new AVL()
console.log("non-root left leaf removal where parent is not root")
C.insert(5)
C.insert(3)
C.insert(7)
C.insert(2)
console.log("before", C.toString(),"\n======")
C.remove(2)
console.log("after", C.toString(),"\n======")

const D = new AVL()
console.log("non-root right leaf removal where parent is not root")
D.insert(5)
D.insert(7)
D.insert(3)
D.insert(9)
console.log("before", D.toString(),"\n======")
D.remove(9)
console.log("after", D.toString(),"\n======")

const E = new AVL()
console.log("root leaf removal")
E.insert(5)
console.log("before", E.toString(),"\n======")
E.remove(5)
console.log("after", E.toString(),"\n======")


const G = new AVL()
console.log("left only childed parent removal where target is root")
G.insert(5)
G.insert(3)
console.log("before", G.toString(),"\n======")
G.remove(5)
console.log("after", G.toString(),"\n======")


const H = new AVL()
console.log("left only childed parent removal where target is not root")
for(let n of [5,3,7,6]) H.insert(n)
console.log("before", H.toString(),"\n======")
H.remove(7)
console.log("after", H.toString(),"\n======")


const I = new AVL()
console.log("right only childed parent removal where target is root")
for(let n of [5,7]) I.insert(n)
console.log("before", I.toString(),"\n======")
I.remove(5)
console.log("after", I.toString(),"\n======")


const J = new AVL()
console.log("right only childed parent removal where target is not root")
for(let n of [5,3,7,9]) J.insert(n)
console.log("before", J.toString(),"\n======")
J.remove(7)
console.log("after", J.toString(),"\n======")



const K = new AVL()
console.log("two childed parent removal where min successor is right child and target is root")
for(let n of [5,3,7]) K.insert(n)
console.log("before", K.toString(),"\n======")
K.remove(5)
console.log("after", K.toString(),"\n======")


const L = new AVL()
console.log("two childed parent removal where min successor is right child and target is not root")
for(let n of [5,3,7,6,8]) L.insert(n)
console.log("before", L.toString(),"\n======")
L.remove(7)
console.log("after", L.toString(),"\n======")


const M = new AVL()
console.log("two childed parent removal where min successor is not right child and target is root, and successor has no right child")
for(let n of [5,3,7,6]) M.insert(n)
console.log("before", M.toString(),"\n======")
M.remove(5)
console.log("after", M.toString(),"\n======")


const N = new AVL()
console.log("N $")
for(let n of [5, 3,2, 9,7,11]) N.insert(n)
console.log("before", N.toString(),"\n======")
N.remove(9)
console.log("after", N.toString(),"\n======")


const O = new AVL([
  1,2,3,4,5,6,7,8,9
])
O.insert(6.5)
console.log("O - rem 5 - before", O.toString(),"\n======")
//console.log("two childed parent removal where min successor is not right child and target is root, and successor has a right child")
O.remove(5)
console.log("O - rem 5 - after", O.toString(),"\n======")

const P = new AVL([
  1,2,3,4,5,6,7,8,9
])
P.insert(7.5)
P.insert(7.75)
P.insert(7.85)
console.log("P - rem 8 - before", P.toString(),"\n======")
P.remove(8)
console.log("P - rem 8 - after", P.toString(),"\n======")
//console.log("two childed parent removal where min successor is not right child and target is not root, and successor has a right child")
