import {
  AVL,
} from "../../avl.js";
import {
  shuffleArray,
  expectation
} from "../../../utils.js";
import {readFileSync} from "fs"

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
  const uniqueIntegers = JSON.parse(
    readFileSync(
      "./dbgIntegers.json",
      {encoding:"utf8"}
    )
  )
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
        const n = avlTree.search(e[1])
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
  //console.log(avlTree.toString())
  function LRP(level, limit = 0){
    if(limit > 0) return
    else {
      let tmp = []
      const l = level.map(n => {
        if(n[2]) tmp.push(n[2])
        if(n[3]) tmp.push(n[3])
        return `(H${
            n[0]
          } K${
            n[1]
          } L${
            n[2] ? n[2][1] : "_"
          } R${
            n[3] ? n[3][1] : "_"
          } P${
            n[4] ? n[4][1] : "_"
          } I${
            n[5]
          })`
      }).join("  ")
      console.log(l)
      console.log("\t↓")
      LRP(tmp,limit++)
    }
  }
  for(let i = 0; i < uniqueIntegers.length; i = i + 2){
    //console.log("\n\n\nREMOVAL TEST LOOP\n\n",265, i, uniqueIntegers[i])
    if(i ==0 || i==2){ //412 BUG 112.L = 113 and 112.R = 113 even much earlier than 412; by time of rem i == 104, already 112.L = 113 and 112.R = 114
      /**
       * at i == 4, a bad subtree like this
       *       (4H118K113←114→9S111↑)
       *(2H113K112←_→2S118↑) (3H114K113←116→6S118↑)
       *
       * at i == 0 and k = 110
       * (11H303K188←426→499S_↑)
       * (10H188K103←233→302S303↑)
       * (9H103K65←131→187S188↑)
       * (8H131K118←157→84S103↑)
       * (6H118K110←126→27S131↑)
       * (5H110K107←113→14S118↑)
       * (4H113K111←116→7S110↑)
       * (2H111K_←112→2S113↑) (3H116K114←117→4S113↑)
       * (1H112K_←_→1S111↑) (2H114K_←115→2S116↑)
       *
       * 130     130
       * 188     188
       * 103     103
       * 131     157
       * 118     131
       * 110     111
       * 113     118
       * 111,116,113,114
       * 112,114
       *
       * at i == 2 and k = 172
       * (11H303K188←426→488S_↑)
       * (10H188K103←233→291S303↑)
       * (9H103K65←157→176S188↑)
       * (8H157K131←170→73S103↑)
       * (7H131K111←142→42S157↑)
       * (5H111K107←118→16S131↑)
       * (4H118K113←114→9S111↑)
       * (2H113K112←_→2S118↑) (3H114K113←116→6S118↑)
       *
       */
      //avlTree.ITER_UB = 9
      //console.log(avlTree.toString())
    }
    //console.log(267)
    avlTree.remove(uniqueIntegers[i])
    //console.log(269)
    if(i % 500 === 0 && i > 1){
      let j, k
      for(j = i; j > i - 50; j--){
        avlTree.insert(uniqueIntegers[j])
      }
      [...avlTree].forEach(e => {
        const n = avlTree.search(e[1])
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
    bulkAVL.root[4],
    1000,
    `bulk insert of 1000 unique integers into an empty AVL tree has size 1000`,
  );
  if (!r) falses++
  [...bulkAVL].forEach(
    e => {
      const n = bulkAVL.search(e[1])
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
  const u = AVL.union(ua, ub);
  const ue = [...u]
  const ru1 = expect(
    ue.length,
    5,
    `union::size of 5`,
  )
  if(!ru1) falses++
  const ru2 = expect(
    ue[0][1],
    1,
    "union::0->1",
  )
  if(!ru2) falses++
  const ru3 = expect(
    ue[1][1],
    2,
    "union::1->2",
  )
  if(!ru3) falses++
  const ru4 = expect(
    ue[2][1],
    3,
    "union::2->3",
  )
  if(!ru4) falses++
  const ru5 = expect(
    ue[3][1],
    4,
    "union::3->4",
  )
  if(!ru5) falses++
  const ru6 = expect(
    ue[4][1],
    5,
    "union::4->5",
  )
  if(!ru6) falses++
  // intersect
  const ia = new AVL([1,2,3,4])
  const ib = new AVL([2,3,4,5])
  const i = AVL.intersect(ia, ib);
  const ie = [...i]
  const ri1 = expect(
    ie.length,
    3,
    `intersect::size of 3`,
  )
  if(!ri1) falses++
  const ri2 = expect(
    ie[0][1],
    2,
    `intersect::0->2`,
  )
  if(!ri2) falses++
  const ri3 = expect(
    ie[1][1],
    3,
    `intersect::1->3`,
  )
  if(!ri3) falses++
  const ri4 = expect(
    ie[2][1],
    4,
    `intersect::2->4`,
  )
  if(!ri4) falses++
  // difference
  const da = new AVL([1,2,3,4])
  const db = new AVL([2,3,4,5])
  const d = AVL.difference(da, db)
  const de = [...d]
  const rd1 = expect(
    de.length,
    1,
    `difference::size of 1`,
  )
  if(!rd1) falses++
  const rd2 = expect(
    de[0][1],
    1,
    `difference::0->1`,
  )
  if(!rd2) falses++
  const it1 = new AVL([1,2,3,4,5,6,7,8,9,10]);
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "1~2~3~4~5~6~7~8~9~10",
    "default iteration"
  )
  it1[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LE
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5~6~7",
    "ITER_FWD_GE_TO_LE 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LE
  it1.ITER_LB = 5
  it1.ITER_UB = 5
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5",
    "ITER_FWD_GE_TO_LE 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LT
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5~6",
    "ITER_FWD_GE_TO_LT 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_FWD_GE_TO_LT
  it1.ITER_LB = 5
  it1.ITER_UB = 6
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5",
    "ITER_FWD_GE_TO_LT 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_FWD_GT_TO_LE
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "6~7",
    "ITER_FWD_GT_TO_LE 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_FWD_GT_TO_LE
  it1.ITER_LB = 6
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "7",
    "ITER_FWD_GT_TO_LE 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_FWD_GT_TO_LT
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "6",
    "ITER_FWD_GT_TO_LT"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LE_TO_GE
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "7~6~5",
    "ITER_REV_LE_TO_GE 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LE_TO_GE
  it1.ITER_LB = 5
  it1.ITER_UB = 5
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5",
    "ITER_REV_LE_TO_GE 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LE_TO_GT
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "7~6",
    "ITER_REV_LE_TO_GT 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LE_TO_GT
  it1.ITER_LB = 6
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "7",
    "ITER_REV_LE_TO_GT 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LT_TO_GE
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "6~5",
    "ITER_REV_LT_TO_GE 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LT_TO_GE
  it1.ITER_LB = 6
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "6",
    "ITER_REV_LT_TO_GE 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LT_TO_GT
  it1.ITER_LB = 5
  it1.ITER_UB = 7
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "6",
    "ITER_REV_LT_TO_GT 1"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_LT_TO_GT
  it1.ITER_LB = 5
  it1.ITER_UB = 8
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "7~6",
    "ITER_REV_LT_TO_GT 2"
  )  
  it1[Symbol.iterator] = AVL.ITER_LEVEL_ORDER
  expect(
    [...it1].map(
      l=>l.map(
        n=>n[1]
      ).join("&")
    ).join("|"),
    "5|2&8|1&3&6&9|4&7&10",
    "level order"
  )  
  it1[Symbol.iterator] = AVL.ITER_PREORDER
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5~2~1~3~4~8~6~7~9~10",
    "preorder"
  )  
  it1[Symbol.iterator] = AVL.ITER_POSTORDER
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "1~4~3~2~7~6~10~9~8~5",
    "postorder"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_PREORDER
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "5~8~9~10~6~7~2~3~4~1",
    "reverse preorder"
  )  
  it1[Symbol.iterator] = AVL.ITER_REV_POSTORDER
  expect(
    [...it1].map(v=>v[1]).join("~"),
    "10~9~7~6~8~4~3~1~2~5",
    "reverse postorder"
  )
/**
 *
(5)::L:2&R:8
  ↓
(2)::L:1&R:3 | (8)::L:6&R:9
  ↓
(1)::L:_&R:_ | (3)::L:_&R:4 | (6)::L:_&R:7 | (9)::L:_&R:10
  ↓
(4)::L:_&R:_ | (7)::L:_&R:_ | (10)::L:_&R:_

      (5)
      / \
    (2) (8)
   _/_| |_\_
  /  |   |  \
(1) (3) (6) (9)
      \   \   \
      (4) (7) (10)
Preorder:          root, (left), (right)
Preorder: 5, 2, 1, 3, 4, 8, 6, 7, 9, 10
Postorder:         (left), (right), root
Postorder: 1, 4, 3, 2, 7, 6, 10, 9, 8 ,5
Reverse preorder:  root, (right), (left)
Reverse preorder: 5, 8, 9, 10, 6, 7, 2, 3, 4, 1
Reverse postorder: (right), (left), root
Reverse postorder: 10, 9, 7, 6, 8, 4, 3, 1, 2, 5
 */
  const st = new AVL(
    Array.from(
      {
        length: 50
      }, (_, index) => index
    )
  )
  expect(
    st.root[4],
    50,
    "bulk loaded tree has right size at root after instantiation"
  )
  for(let i = 0; i < 50; i+=2) {
    st.remove(i)
  }
  expect(
    st.root[4],
    25,
    "bulk loaded tree has right size after removals"
  )
  /**
  console.log(st.toString())
  const ot = new AVL(
    Array.from(
      {
        length: 10
      }, (_, index) => index
    )
  )
  console.log(ot.toString())
  ot.remove(2)
  console.log(
    `
~~~
    `
  )
  console.log(ot.toString())
  console.log("\n~~~\n")
  ot.insert(11)
  console.log(ot.toString())
  */
}
testing123()
dump(true)
