import {
  AVL,
} from "./avl.js";
import {
  shuffleArray,
  expectation
} from "./utils.js";
import {writeFileSync} from "fs"

const [expect, dump] = expectation(true);

expect(true, false, "canary failure")

function testing123(){
  const uniqueIntegers = Array.from({ length: 500 }, (_, index) => index);

  // Unsorting the uniqueIntegers array
  shuffleArray(uniqueIntegers);
  /*writeFileSync(
    "dbgIntegers.json",
    JSON.stringify(uniqueIntegers),
    {encoding:"utf8"}
  );*/
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
    let r2
    try{
    r2 = expect(
      avlTree.search(uniqueIntegers[i])[1],
      uniqueIntegers[i],
      `key ${
        uniqueIntegers[i]
      } in tree`,
    )
    } catch(e){
      console.log(avlTree.toString())
      throw e
    }
    if (!r2) falses++
    let n
    try{
      n = avlTree.search(uniqueIntegers[i])
    }catch(e){
      throw e
    }
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
  for(let i = 0; i < uniqueIntegers.length; i = i + 2){
    avlTree.remove(uniqueIntegers[i])
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
  [...bulkAVL.ITER_FWD_GE_TO_LE(-Infinity,Infinity)].forEach(
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
  const u = AVL.union(ua.ITER_FWD_GE_TO_LE(-Infinity,Infinity), ub.ITER_FWD_GE_TO_LE(-Infinity,Infinity));
  const ue = [...u.ITER_FWD_GE_TO_LE(-Infinity,Infinity)]
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
  const i = AVL.intersect(ia.ITER_FWD_GE_TO_LE(-Infinity,Infinity), ib.ITER_FWD_GE_TO_LE(-Infinity,Infinity));
  const ie = [...i.ITER_FWD_GE_TO_LE(-Infinity,Infinity)]
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
  const d = AVL.difference(da.ITER_FWD_GE_TO_LE(-Infinity,Infinity), db.ITER_FWD_GE_TO_LE(-Infinity,Infinity))
  const de = [...d.ITER_FWD_GE_TO_LE(-Infinity,Infinity)]
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
    [...it1.ITER_FWD_GE_TO_LE(-Infinity,Infinity)].map(v=>v[1]).join("~"),
    "1~2~3~4~5~6~7~8~9~10",
    "default iteration"
  )
  expect(
    [...it1.ITER_FWD_GE_TO_LE(5,7)].map(v=>v[1]).join("~"),
    "5~6~7",
    "ITER_FWD_GE_TO_LE 1"
  )  
  expect(
    [...it1.ITER_FWD_GE_TO_LE(5,5)].map(v=>v[1]).join("~"),
    "5",
    "ITER_FWD_GE_TO_LE 2"
  )  
  expect(
    [...it1.ITER_FWD_GE_TO_LT(5,7)].map(v=>v[1]).join("~"),
    "5~6",
    "ITER_FWD_GE_TO_LT 1"
  )  
  expect(
    [...it1.ITER_FWD_GE_TO_LT(5,6)].map(v=>v[1]).join("~"),
    "5",
    "ITER_FWD_GE_TO_LT 2"
  )  
  expect(
    [...it1.ITER_FWD_GT_TO_LE(5,7)].map(v=>v[1]).join("~"),
    "6~7",
    "ITER_FWD_GT_TO_LE 1"
  )  
  expect(
    [...it1.ITER_FWD_GT_TO_LE(6,7)].map(v=>v[1]).join("~"),
    "7",
    "ITER_FWD_GT_TO_LE 2"
  )  
  expect(
    [...it1.ITER_FWD_GT_TO_LT(5,7)].map(v=>v[1]).join("~"),
    "6",
    "ITER_FWD_GT_TO_LT"
  )  
  expect(
    [...it1.ITER_REV_LE_TO_GE(5,7)].map(v=>v[1]).join("~"),
    "7~6~5",
    "ITER_REV_LE_TO_GE 1"
  )  
  expect(
    [...it1.ITER_REV_LE_TO_GE(5,5)].map(v=>v[1]).join("~"),
    "5",
    "ITER_REV_LE_TO_GE 2"
  )  
  expect(
    [...it1.ITER_REV_LE_TO_GT(5,7)].map(v=>v[1]).join("~"),
    "7~6",
    "ITER_REV_LE_TO_GT 1"
  )  
  expect(
    [...it1.ITER_REV_LE_TO_GT(6,7)].map(v=>v[1]).join("~"),
    "7",
    "ITER_REV_LE_TO_GT 2"
  )  
  expect(
    [...it1.ITER_REV_LT_TO_GE(5,7)].map(v=>v[1]).join("~"),
    "6~5",
    "ITER_REV_LT_TO_GE 1"
  )  
  expect(
    [...it1.ITER_REV_LT_TO_GE(6,7)].map(v=>v[1]).join("~"),
    "6",
    "ITER_REV_LT_TO_GE 2"
  )  
  expect(
    [...it1.ITER_REV_LT_TO_GT(5,7)].map(v=>v[1]).join("~"),
    "6",
    "ITER_REV_LT_TO_GT 1"
  )  
  expect(
    [...it1.ITER_REV_LT_TO_GT(5,8)].map(v=>v[1]).join("~"),
    "7~6",
    "ITER_REV_LT_TO_GT 2"
  )  
  expect(
    [...it1.ITER_LEVEL_ORDER()].map(
      l=>l.map(
        n=>n[1]
      ).join("&")
    ).join("|"),
    "5|2&8|1&3&6&9|4&7&10",
    "level order"
  )  
  expect(
    [...it1.ITER_PREORDER()].map(v=>v[1]).join("~"),
    "5~2~1~3~4~8~6~7~9~10",
    "preorder"
  )  
  expect(
    [...it1.ITER_POSTORDER()].map(v=>v[1]).join("~"),
    "1~4~3~2~7~6~10~9~8~5",
    "postorder"
  )  
  expect(
    [...it1.ITER_REV_PREORDER()].map(v=>v[1]).join("~"),
    "5~8~9~10~6~7~2~3~4~1",
    "reverse preorder"
  )  
  expect(
    [...it1.ITER_REV_POSTORDER()].map(v=>v[1]).join("~"),
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
  const T = new AVL([
    ...(Array.from({
      length: 1000
    },(_,i)=>i+1))
  ])
  expect(
    [...T.ITER_FWD_GE_TO_LE(-Infinity,Infinity)].map(n=> n[1] == T.OSRank(n[1])).reduce(
      (a,c)=> c ? a+1 : a,
      0
    ),
    1000,
    "expect rank of each num is correct in bulk loaded tree"
  )
  const OS = new AVL([
    ...(Array.from({
      length: 1000
    },(_,i)=>i+1))
  ])
  for(let i = 2; i < 1002;i+=2) OS.remove(i)
  expect(
    [...OS.ITER_FWD_GE_TO_LE(-Infinity,Infinity)].map(
      n=>Math.ceil(n[1]/2) == OS.OSRank(n[1])
    ).reduce(
      (a,c) => c ? a+1 : 0,
      0
    ),
    500,
    "expect OS ranks correct in bulk loaded tree after removal of even keys"
  )
  expect(OS.OSSelect(0),null,"OSSelect of 0th is null")
  expect(OS.OSSelect(1)[1],1,"OSSelect of 1st is 1")
  expect(OS.OSSelect(2)[1],3,"OSSelect of 2nd is 3")
  const ckAVL = new AVL([
    [1,2],[1,3],
    [2,1],[3,7],
    [4,1],[4,4],
    [5,2],[5,5]
  ].map((v,i)=>[v,i]),
  (a,b)=>a[0]==b[0]&&a[1]==b[1],//eq
  (a,b)=>a[0]==b[0]?a[1]<b[1]:a[0]<b[0],//lt
  (a,b)=>a[0]==b[0]?a[1]<=b[1]:a[0]<=b[0],//le
  (a,b)=>a[0]==b[0]?a[1]>b[1]:a[0]>b[0],//gt
  (a,b)=>a[0]==b[0]?a[1]>=b[1]:a[0]>=b[0] //ge
  ) 
  expect(
    [...ckAVL.ITER_FWD_GE_TO_LE([0,0],[20,20])].map(v=>v[5]).join("|"),
    "0|1|2|3|4|5|6|7",
    "compound key select all"
  ) 
  ckAVL.ITER_LB = [1,2.5]
  ckAVL.ITER_UB = [5,3] 
  expect(
    [...ckAVL.ITER_FWD_GE_TO_LE([1,2.5],[5,3])].map(v=>v[5]).join("|"),
    "1|2|3|4|5|6",
    "compound key select range"
  ) 
}
for(let k = 0; k < 100000;k++){
  console.log(k)
  testing123()
}
dump(true)
