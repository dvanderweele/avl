// nodes are arrays
// indexes:
// 0 = height
// 1 = key
// 2 = left
// 3 = right
// 4 = parent

class AVL  {
  #root = null
  #size = 0
  constructor(sortedArray = null){
    if(sortedArray instanceof Array && sortedArray.length > 0){
      let sizeCounter = 0
      this.#root = (
        function preorderBuild(
          LBI = 0,
          RBI = sortedArray.length - 1,
          parent = null
        ){
          const MP = LBI !== RBI ? LBI + Math.floor(
            (RBI - LBI) / 2
          ) : LBI
          const n = [
            1, 
            sortedArray[MP], 
            null, null, 
            parent
          ]
          sizeCounter++
          // left child
          n[2] = LBI !== MP ? preorderBuild(
              LBI,
              MP - 1,
              n
            ) : null
          // right child
          n[3] = RBI !== MP ? preorderBuild(
              MP + 1,
              RBI,
              n
            ) : null
          return n
        }
      )()
      this.#size += sizeCounter
    }
  }
  #reHeight(n){
    const l = n[2]
    const r = n[3]
    n[0] = 1 + Math.max(
        !l ? 0 : l[0],
        !r ? 0 : r[0]
      )
  }
  #leftRotate(X){
    /**
     *         X
     *        / \
     *       N   Z
     *          / \
     *         Y   N
     *           
     *         Z
     *        / \
     *       X   N
     *      / \   
     *     N   Y   
     */
    let Z = X[3]
    let zl = Z[2]
    X[3] = zl
    if(zl != null){
      zl[4] = X
    }
    let xp = X[4]
    Z[4] = xp
    if(xp == null){
      root = Z
    } else if (X == xp[2]){
      xp[2] = Z
    } else {
      xp[3] = Z
    }
    Z[2] = X
    X[4] = Z
    return Z
  }
  #rightRotate(X){
    /**
     *      
     *         X
     *        / \
     *       Z   N
     *      / \   
     *     N   Y   
     * 
     *         Z
     *        / \
     *       N   X
     *          / \
     *         Y   N
     */
    let Z = X[2]
    let zr = Z[3]
    X[2] = zr
    if(zr != null){
      zr[4] = X
    }
    let xp = X[4]
    Z[4] = xp
    if(xp == null){
      root = Z
    } else if (X == xp[2]){
      xp[2] = Z
    } else {
      xp[3] = Z
    }
    Z[3] = X
    X[4] = Z
    return Z
  }
  #getBalanceFactor(n){
    return !n ? 0 : (
      (
        !n[2] ? 0 : n[2][0]
      ) - (
        !n[3] ? 0 : n[3][0]
      )
    )
  }
  search(key, searchRoot = this.#root){
    while (
      searchRoot != null && searchRoot[1] != key
    ){
      if (key < searchRoot[1]){
        searchRoot = searchRoot[2]
      } else {
        searchRoot = searchRoot[3]
      }
    }
    return searchRoot
  }
  insert(key, insertRoot = this.#root, parent = null){
    // iterative version
    for(; insertRoot != null;){
      if(key < insertRoot[1]){
        parent = insertRoot
        insertRoot = insertRoot[2]
      } else if (key > insertRoot[1]){
        parent = insertRoot
        insertRoot = insertRoot[3]
      } else {
        break
      }
    }
    let newNode = null
    if (parent != null){
      if(key < parent[1]){
        newNode = [
          1, key,
          null, null,
          parent
        ]
        parent[2] = newNode
        this.#size++
      } else if (key > parent[1]){
        newNode = [
          1, key,
          null, null,
          parent
        ]
        parent[3] = newNode
        this.#size++
      }
    } else {
      newNode = [
        1, key,
        null, null,
        null
      ]
      this.#root = newNode
      this.#size++
      return newNode
    }
    let last
    for(
      let current = newNode[4];
      current != null; 
      current = current[4]
    ){
      const NBF = this.#getBalanceFactor(current)
      const LBF = this.#getBalanceFactor(current[2])
      const RBF = this.#getBalanceFactor(current[3])
      if (
        NBF > 1 && // LL - Left Child Tall due to Left Grandchild
        LBF >= 0
      ){
        const E = current
        current = this.#rightRotate(current)
        this.#reHeight(E)
        break
      } else if (
        NBF>1 && 
        LBF<0 // LR - Left Child Tall due to Right Grandchild
      ){
        const E = current
        const B = E[2]
        const C = B[3]
        current[2] = this.#leftRotate(B)
        this.#reHeight(B)
        this.#reHeight(C)
        current = this.#rightRotate()
        this.#reHeight(E)
        break
      } else if (
        NBF < -1 && // RR - Right Child Tall due to Right Grandchild
        RBF <= 0
      ){
        const B = current
        current = this.#leftRotate(current)
        this.#reHeight(B)
        break
      } else if (
        NBF < -1 && // RL - Right Child Tall due to Left Grandchild
        RBF > 0
      ){
        const B = current
        const E = current[3]
        const D = E[2]
        current[3] = this.#rightRotate(E)
        this.#reHeight(E)
        this.#reHeight(D)
        current = this.#leftRotate(current)
        this.#reHeight(B)
        break
      }
      last = current
    }
    this.#root = last
    return newNode
  }
  getMinOfSubtree(node = this.#root){
    return !node || !node[2] ? node : (
      this.getMinOfSubtree(
        node[2]
      )
    )
  }
  getMaxOfSubtree(node = this.#root){
    return !node || !node[3] ? node : (
      getMaxOfSubtree(
        node[3]
      )
    )
  }
  successor(key, node = this.#root){
    let n = this.search(key, node)
    if(!n){
      return null
    }
    const r = n[3]
    if(r){
      return this.getMinOfSubtree(r)
    }
    let p = n[4]
    while(
      p && 
      n[1] === (
        p[3] ? p[3][1] : p[3]
      )
    ){
      n = p
      p = p[4]
    }
    return !p ? null : p
  }
  predecessor(key, node = this.#root){
    let n = this.search(key, node)
    if(!n){
      return null
    }
    const l = n[2]
    if(l){
      return this.getMaxOfSubtree(l)
    }
    let p = node[4]
    while(
      p && 
      n[1] === (
        p[2] ? p[2][1] : p[3]
      )
    ){
      n = p
      p = p[4]
    }
    return !p ? null : p
  }
  remove(key, node = this.#root){
    const match = this.search(key, node)
    if(!match){
      return null
    } else {
      const k = match[1]
      const l = match[2]
      const r = match[3]
      let lastNode
      if(!l && !r){
        // leaf deletion case
        const p = match[4]
        lastNode = p
        if(!p){
          root = null
        } else {
          if(k < p[1]){
            p[2] = null
          } else {
            p[3] = null
          }
        }
      } else if(!l || !r){
        // one child deletion case
        const p = match[4]
        const child = l ? l : r
        lastNode = child
        if(!p){
          root = child
        } else {
          if(k < p[1]){
            p[2] = child
          } else {
            p[3] = child
          }
          child[4] = p
        }
      } else {
        // two child deletion case
        const s = this.successor(k, match)
        const sp = s[4] // possible to be match
        lastNode = sp
        const sk = s[1]
        const p = match[4]
        if(!p){
          root = s
          s[4] = null
        } else {
          if(sk < p[1]){
            p[2] = s
          } else {
            p[3] = s
          }
          s[4] = p
        }
        if(sp){
          if(sk < sp[1]){
            sp[2] = null
          } else {
            sp[3] = null
          }
        }
      }
      this.#size--
      // traverse to root
      let last
      for(
        let current = lastNode[4] ? lastNode[4] : this.#root; 
        current != null; 
        current = current[4]
      ){
        const NBF = this.#getBalanceFactor(current)
        const LBF = this.#getBalanceFactor(current[2])
        const RBF = this.#getBalanceFactor(current[3])
        if (
          NBF > 1 && // LL - Left Child Tall due to Left Grandchild
          LBF >= 0
        ){
          const E = current
          current = this.#rightRotate(current)
          this.#reHeight(E)
        } else if (
          NBF>1 && 
          LBF<0 // LR - Left Child Tall due to Right Grandchild
        ){
          const E = current
          const B = E[2]
          const C = B[3]
          current[2] = this.#leftRotate(B)
          this.#reHeight(B)
          this.#reHeight(C)
          current = this.#rightRotate(current)
          this.#reHeight(E)
        } else if (
          NBF < -1 && // RR - Right Child Tall due to Right Grandchild
          RBF <= 0
        ){
          const B = current
          current = this.#leftRotate(current)
          this.#reHeight(B)
        } else if (
          NBF < -1 && // RL - Right Child Tall due to Left Grandchild
          RBF > 0
        ){
          const B = current
          const E = current[3]
          const D = E[2]
          current[3] = this.#rightRotate(E)
          this.#reHeight(E)
          this.#reHeight(D)
          current = this.#leftRotate(current)
          this.#reHeight(B)
        }
        last = current
      }
      this.#root = last
      return k
    }
  }
  *inorder(node = this.#root){
    if(node[2]){
      yield *this.inorder(node[2])
    }
    yield node[1]
    if(node[3]){
      yield *this.inorder(node[3])
    }
  }
  visitAllInorder(callback, node = this.#root){
    const l = node[2]
    const r = node[3]
    if(l){
      this.visitAllInorder(callback, l)
    }
    callback(node)
    if(r){
      this.visitAllInorder(callback, r)
    }
  }
  *pageInOrder(
    pageSizeLimit, 
    researchMax = false,
    node = this.#root
  ){
    if(pageSizeLimit < 1){
      pageSizeLimit = 1
    }
    let results = []
    let lastYieldedKey = this.getMinOfSubtree(
      node
    )[1]
    results[0] = lastYieldedKey
    let maxOfTree = getMaxOfSubtree(
      node
    )[1]
    do {
      let nextYieldedKey = this.successor(
        lastYieldedKey
      )
      if(nextYieldedKey){
        results.push(nextYieldedKey ? nextYieldedKey[1] : null)
      }
      lastYieldedKey = nextYieldedKey[1]
      if(
        results.length >= pageSizeLimit || 
        !nextYieldedKey
      ){
        yield results
        results = []
        if(researchMax){
          maxOfTree = this.getMaxOfSubtree(
            node
          )[1]
        }
      }
    } while(
      lastYieldedKey < maxOfTree &&
      lastYieldedKey
    )
    if(results.length){
      yield results
    }
  }
  get root(){
    return this.#root
  }
  get length(){
    return this.#size
  }
  *[Symbol.iterator](){
    yield *this.inorder()
  }
}

function AVLunionAVL(a, b){
  const aMembers = []
  a.visitAllInorder(
    (n) => aMembers.push(n[1])
  )
  const bMembers = []
  b.visitAllInorder(
    (n) => bMembers.push(n[1])
  )
  const ab = []
  for(let i = 0, j = 0; i < aMembers.length || j < bMembers.length;){
    if(i < aMembers.length && i < bMembers.length){
      if(aMembers[i] < bMembers[j]){
        ab.push(aMembers[i])
        i++
      } else if (aMembers[i] > bMembers[j]){
        ab.push(bMembers[j])
        j++
      } else {
        ab.push(bMembers[j])
        j++
        i++
      }
    } else if(i < aMembers.length){
      ab.push(aMembers[i])
      i++
    } else {
      ab.push(bMembers[j])
      j++
    }
  }
  return new AVL(ab)
}

function AVLintersectAVL(a, b){
  const aMembers = []
  a.visitAllInorder(
    (n) => aMembers.push(n[1])
  )
  const bMembers = []
  b.visitAllInorder(
    (n) => bMembers.push(n[1])
  )
  const ab = []
  for(let i = 0, j = 0; i < aMembers.length && j < bMembers.length;){
    if(aMembers[i] < bMembers[j]){
      i++
    } else if (aMembers[i] > bMembers[j]){
      j++
    } else if(aMembers[i] === bMembers[j]) {
      ab.push(bMembers[j])
      i++
      j++
    }
  }
  return new AVL(ab)
}

function AVLminusAVL(a, b){
  const bMembers = []
  b.visitAllInorder(
    n => bMembers.push(n[1])
  )
  const bSet = new Set(bMembers)
  const ab=[]
  a.visitAllInorder(
    n => !bSet.has(n[1]) && ab.push(n[1])
  )
  return new AVL(ab)
}

export {
  AVL,
  AVLunionAVL,
  AVLintersectAVL,
  AVLminusAVL
}