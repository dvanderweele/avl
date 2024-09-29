import {
  AVL
} from "./avl.js"

const a = new AVL(Array.from({
  length:8
},(_,i)=>i))
console.log("post bulk load")
console.log(a.toString())
a.insert(9)
console.log("post ins 9")
console.log("-------")
a.ITER_UB = 10
console.log(a.toString())
a.remove(5)
console.log("post rem 5")
console.log("-------")
console.log(a.toString())
a.remove(7)
console.log("post rem 7")
console.log("-------")
console.log(a.toString())
a.insert(5)
console.log("post ins 5")
console.log("-------")
console.log(a.toString())
a.insert(10)
console.log("post ins 10")
console.log("-------")
console.log(a.toString())
a.remove(6)
console.log("post rem 6")
console.log("-------")
console.log(a.toString())

for(let i=20;i<30;i++) a.insert(i)

for(let j=20;j<30; j+=2) a.remove(j)
console.log("post 10 inserts then 5 removals")
console.log("-------")
console.log(a.toString())
a.remove(9)
console.log("post rem 9 (root)")
console.log("-------")
console.log(a.toString())
a.remove(4)
console.log("post rem 4")
console.log("-------")
console.log(a.toString())

console.log("\n\n==================\n")
console.log("==================\n")
console.log("==================\n\n")
const A = new AVL()
for(let i = 1;i<6;i++){
  A.insert(i)
  console.log(`ins ${i}`)
  A.ITER_UB = 7
  console.log(A.toString())
  console.log("\n+++\n")
} 
console.log("%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%")
console.log(`rem 2`)
A.remove(2)
console.log(A.toString()) 
console.log("%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%")

console.log(`rem 3`)
A.remove(3)
console.log(A.toString())
const B = new AVL()
for(let i = 1;i<20;i++){
  B.insert(i)
  console.log(`B→ins ${i}`)
  B.ITER_UB = 7
  console.log(B.toString())
  console.log("\n+++\n")
} 
console.log("%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%")

console.log("B→rem 12")
B.remove(12)
console.log(B.toString()) 
console.log("%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%")

console.log("B→rem 10")
B.remove(10)
console.log(B.toString())
 
console.log("%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%")

console.log("B→rem 8")
B.remove(8)
console.log("final B→rem 8",B.toString())
B[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LE
B.ITER_LB = -Infinity
B.ITER_UB = Infinity
console.log([...B].map(n=>n[1]))

console.log("%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%")

console.log("B→rem 9")
B.remove(9)
console.log("final B→rem 9",B.toString())
B[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LE
B.ITER_LB = -Infinity
B.ITER_UB = Infinity
console.log([...B].map(n=>n[1]))
console.log("$$$$$$$$$$$$$")
console.log("$$$$$$$$$$$$$")
