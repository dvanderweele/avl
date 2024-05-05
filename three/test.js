import {
  AVL,
  AVLunionAVL,
  AVLintersectAVL,
  AVLminusAVL
} from "./avl.js";
import {
  shuffleArray,
  expectation
} from "../utils.js";

const [expect, dump] = expectation();

/*
const a = avl()
a.insert(25)
expect("root to be 25", a.getRoot().getKey(), 25)
a.insert(20);
console.log(`root key log: ${a.getRoot().getKey()}`);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
a.insert(15);
console.log(`root key log: ${a.getRoot().getKey()}`);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
a.insert(30);
console.log(`root key log: ${a.getRoot().getKey()}`);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
a.insert(35);
console.log(`root key log: ${a.getRoot().getKey()}`);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
a.insert(10);
console.log(`root key log: ${a.getRoot().getKey()}`);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
console.log(
  a.successor(
    a.search(10).getKey()
  ).getKey()
)
console.log(
  a.successor(
  a.successor(
    a.search(10).getKey()
  ).getKey()).getKey()
)
console.log(
  a.successor(
  a.successor(
  a.successor(
    a.search(10).getKey()
  ).getKey()).getKey()).getKey()
)
console.log(
  a.successor(
  a.successor(
  a.successor(
  a.successor(
    a.search(10).getKey()
  ).getKey()).getKey()).getKey()).getKey()
)
console.log(
  a.successor(
  a.successor(
  a.successor(
  a.successor(
  a.successor(
    a.search(10).getKey()
  ).getKey()).getKey()).getKey()).getKey()).getKey()
)
console.log(
  a.successor(
  a.successor(
  a.successor(
  a.successor(
  a.successor(
  a.successor(
    a.search(10).getKey()
  ).getKey()).getKey()).getKey()).getKey()).getKey())
)
const pgr = a.pageInOrder(
  2
)
console.log(
  pgr.next()
)
console.log(
  pgr.next()
)
console.log(
  pgr.next()
)
console.log(
  pgr.next()
)
const pgr2 = a.pageInOrder(
  7
)
console.log(
  pgr2.next()
)
console.log(
  pgr2.next()
)
a.remove(25);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
a.remove(10);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
a.insert(27.5);
[...a].forEach(e => {
  console.log(`${e} bf${
    a.getBalanceFactor(
      a.search(e)
    )
  } pk${
    a.search(e).getParent() ? a.search(e).getParent().getKey() : null
  }`)
});
console.log(a.length())
a.remove(941);
console.log(a.length())
a.remove(27.5);
console.log(a.length())

*/
expect(true, false, "canary failure")

function testing123(){
  const uniqueIntegers = Array.from({ length: 5000 }, (_, index) => index);

  // Unsorting the uniqueIntegers array
  shuffleArray(uniqueIntegers);

  // Creating an AVL tree from the uniqueIntegers array
  const avlTree = new AVL()
  let falses = 0
  for (let i = 3; i < uniqueIntegers.length; i = i + 2) {
    const r1 = expect(
      avlTree.search(uniqueIntegers[i]),
      null,
      `key ${
        uniqueIntegers[i]
      } not in tree`,
    )
    if (!r1) falses++
    avlTree.insert(uniqueIntegers[i])
    const r2 = expect(
      avlTree.search(uniqueIntegers[i])[1],
      uniqueIntegers[i],
      `key ${
        uniqueIntegers[i]
      } in tree`,
    )
    if (!r2) falses++
    const n = avlTree.search(uniqueIntegers[i])
    if(n) {const nl = n[2]
    const nr = n[3]
    const nlh = nl ? nl[0] : 0
    const nrh = nr ? nr[0] : 0
    const bf = nlh - nrh
    const r3 = expect(
      [1, -1, 0].includes(bf),
      true,
      `balance factor of node with key ${
        uniqueIntegers[i]
      } is in set: 1, -1, 0`,
    )
    if(!r3) falses++}
  }
  let auditBF = 0
  for (let i = 0; i < uniqueIntegers.length; i = i + 2) {
    const r1 = expect(
      avlTree.search(uniqueIntegers[i]),
      null,
      `key ${
        uniqueIntegers[i]
      } not in tree`,
    )
    if (!r1) falses++
    avlTree.insert(uniqueIntegers[i])
    const r2 = expect(
      avlTree.search(uniqueIntegers[i])[1],
      uniqueIntegers[i],
      `key ${
        uniqueIntegers[i]
      } in tree`,
    )
    if (!r2) falses++
    auditBF++
    if(auditBF === 499){
      [...avlTree].forEach(e => {
        const n = avlTree.search(e)
        const nl = n[2]
        const nr = n[3]
        const nlh = nl ? nl[0] : 0
        const nrh = nr ? nr[0] : 0
        const bf = nlh - nrh
        let r = expect(
          [1, -1, 0].includes(bf),
          true,
          ` 1 - balance factor of node with key ${
            n[1]
          } is in set: 1, -1, 0`,
        )
        if(!r) falses++
      })
      auditBF = 0
    }
  }
  for(let i = 0; i < uniqueIntegers.length; i = i + 2){
    avlTree.remove(uniqueIntegers[i])
    if(i % 500 === 0 && i > 1){
      let j, k
      for(j = i; j > i - 50; j--){
        avlTree.insert(uniqueIntegers[j])
      }
      [...avlTree].forEach(e => {
        const n = avlTree.search(e)
        const nl = n[2]
        const nr = n[3]
        const nlh = nl ? nl[0] : 0
        const nrh = nr ? nr[0] : 0
        const bf = nlh - nrh
        let r = expect(
          [1, -1, 0].includes(bf),
          true,
          `2 - balance factor of node with key ${
            n[1]
          } is in set: 1, -1, 0`,
        )
        if(!r) falses++
      });
      for(k = j; k < i+1; k++){
        avlTree.remove(uniqueIntegers[k])
      }
    }
  }
  const bulkAVL = new AVL(Array.from({ length: 1000 }, (_, index) => index));
  let r = expect(
    bulkAVL.length,
    1000,
    `bulk insert of 1000 unique integers into an empty AVL tree has size 1000`,
  );
  if (!r) falses++
  [...bulkAVL].forEach(
    e => {
      const n = bulkAVL.search(e)
      const nl = n[2]
      const nr = n[3]
      const nlh = nl ? nl[0] : 0
      const nrh = nr ? nr[0] : 0
      const bf = nlh - nrh
      let r = expect(
        [1, -1, 0].includes(bf),
        true,
        `3 - balance factor of node with key ${
          n[1]
        } is in set: 1, -1, 0`,
      )
      if(!r) falses++
    }
  );
  // union
  const ua = new AVL([1,2,3,4])
  const ub = new AVL([2,3,4,5])
  const u = AVLunionAVL(ua, ub);
  const ue = [...u]
  const ru1 = expect(
    ue.length,
    5,
    `union::size of 5`,
  )
  if(!ru1) falses++
  const ru2 = expect(
    ue[0],
    1,
    "union::0->1",
  )
  if(!ru2) falses++
  const ru3 = expect(
    ue[1],
    2,
    "union::1->2",
  )
  if(!ru3) falses++
  const ru4 = expect(
    ue[2],
    3,
    "union::2->3",
  )
  if(!ru4) falses++
  const ru5 = expect(
    ue[3],
    4,
    "union::3->4",
  )
  if(!ru5) falses++
  const ru6 = expect(
    ue[4],
    5,
    "union::4->5",
  )
  if(!ru6) falses++
  // intersect
  const ia = new AVL([1,2,3,4])
  const ib = new AVL([2,3,4,5])
  const i = AVLintersectAVL(ia, ib);
  const ie = [...i]
  const ri1 = expect(
    ie.length,
    3,
    `intersect::size of 3`,
  )
  if(!ri1) falses++
  const ri2 = expect(
    ie[0],
    2,
    `intersect::0->2`,
  )
  if(!ri2) falses++
  const ri3 = expect(
    ie[1],
    3,
    `intersect::1->3`,
  )
  if(!ri3) falses++
  const ri4 = expect(
    ie[2],
    4,
    `intersect::2->4`,
  )
  if(!ri4) falses++
  // difference
  const da = new AVL([1,2,3,4])
  const db = new AVL([2,3,4,5])
  const d = AVLminusAVL(da, db)
  const de = [...d]
  const rd1 = expect(
    de.length,
    1,
    `difference::size of 1`,
  )
  if(!rd1) falses++
  const rd2 = expect(
    de[0],
    1,
    `difference::0->1`,
  )
  if(!rd2) falses++
}
testing123()
dump(true)