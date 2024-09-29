import {
  AVL
} from "./avl.js"

const a = new AVL(Array.from({length:25},(_,i)=>i))

console.log(a.toString())
for(let i = 0; i<25; i+=2){
  console.log("$$ rem ",i)
  a.remove(i)
}
console.log("-------")
console.log(a.toString())
