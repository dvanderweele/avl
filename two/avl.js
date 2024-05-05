class Node {
  #h = 1
  #k
  #l = null
  #r = null
  #p
  constructor(key, parent = null){
    this.#k = key
    this.#p = parent
  }
  get height(){
    return this.#h
  }
  set height(n){
    this.#h = n
  } 
  get key(){
    return this.#k
  }
  set key(n){
    this.#k = n
  }
  get left(){
    return this.#l
  }
  set left(n){
    this.#l = n
  }
  get right(){
    return this.#r
  }
  set right(n){
    this.#r = n
  }
  get parent(){
    return this.#p
  }
  set parent(n){
    this.#p = n
  }
}

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
          const n = new Node(
            sortedArray[MP],
            parent
          )
          sizeCounter++
          // left child
          n.left = LBI !== MP ? preorderBuild(
              LBI,
              MP - 1,
              n
            ) : null
          // right child
          n.right = RBI !== MP ? preorderBuild(
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
    const l = n.left
    const r = n.right
    n.height = 1 + Math.max(
        !l ? 0 : l.height,
        !r ? 0 : r.height
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
    let Z = X.right
    let zl = Z.left
    X.right = zl
    if(zl != null){
      zl.parent = X
    }
    let xp = X.parent
    Z.parent = xp
    if(xp == null){
      root = Z
    } else if (X == xp.left){
      xp.left = Z
    } else {
      xp.right = Z
    }
    Z.left = X
    X.parent = Z
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
    let Z = X.left
    let zr = Z.right
    X.left = zr
    if(zr != null){
      zr.parent = X
    }
    let xp = X.parent
    Z.parent = xp
    if(xp == null){
      root = Z
    } else if (X == xp.left){
      xp.left = Z
    } else {
      xp.right = Z
    }
    Z.right = X
    X.parent = Z
    return Z
  }
  #getBalanceFactor(n){
    return !n ? 0 : (
      (
        !n.left ? 0 : n.left.height
      ) - (
        !n.right ? 0 : n.right.height
      )
    )
  }
  search(key, searchRoot = this.#root){
    while (
      searchRoot != null && searchRoot.key != key
    ){
      if (key < searchRoot.key){
        searchRoot = searchRoot.left
      } else {
        searchRoot = searchRoot.right
      }
    }
    return searchRoot
  }
  insert(key, insertRoot = this.#root, parent = null){
    // iterative version
    for(; insertRoot != null;){
      if(key < insertRoot.key){
        parent = insertRoot
        insertRoot = insertRoot.left
      } else if (key > insertRoot.key){
        parent = insertRoot
        insertRoot = insertRoot.right
      } else {
        break
      }
    }
    let newNode = null
    if (parent != null){
      if(key < parent.key){
        newNode = new Node(key, parent)
        parent.left = newNode
        this.#size++
      } else if (key > parent.key){
        newNode = new Node(key, parent)
        parent.right = newNode
        this.#size++
      }
    } else {
      newNode = new Node(key)
      this.#root = newNode
      this.#size++
      return newNode
    }
    let last
    for(
      let current = newNode.parent;
      current != null; 
      current = current.parent
    ){
      const NBF = this.#getBalanceFactor(current)
      const LBF = this.#getBalanceFactor(current.left)
      const RBF = this.#getBalanceFactor(current.right)
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
        const B = E.left
        const C = B.right
        current.left = this.#leftRotate(B)
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
        const E = current.right
        const D = E.left
        current.right = this.#rightRotate(E)
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
    return !node || !node.left ? node : (
      this.getMinOfSubtree(
        node.left
      )
    )
  }
  getMaxOfSubtree(node = this.#root){
    return !node || !node.right ? node : (
      getMaxOfSubtree(
        node.right
      )
    )
  }
  successor(key, node = this.#root){
    let n = this.search(key, node)
    if(!n){
      return null
    }
    const r = n.right
    if(r){
      return this.getMinOfSubtree(r)
    }
    let p = n.parent
    while(
      p && 
      n.key === (
        p.right ? p.right.key : p.right
      )
    ){
      n = p
      p = p.parent
    }
    return !p ? null : p
  }
  predecessor(key, node = this.#root){
    let n = this.search(key, node)
    if(!n){
      return null
    }
    const l = n.left
    if(l){
      return this.getMaxOfSubtree(l)
    }
    let p = node.parent
    while(
      p && 
      n.key === (
        p.left ? p.left.key : p.right
      )
    ){
      n = p
      p = p.parent
    }
    return !p ? null : p
  }
  remove(key, node = this.#root){
    const match = this.search(key, node)
    if(!match){
      return null
    } else {
      const k = match.key
      const l = match.left
      const r = match.right
      let lastNode
      if(!l && !r){
        // leaf deletion case
        const p = match.parent
        lastNode = p
        if(!p){
          root = null
        } else {
          if(k < p.key){
            p.left = null
          } else {
            p.right = null
          }
        }
      } else if(!l || !r){
        // one child deletion case
        const p = match.parent
        const child = l ? l : r
        lastNode = child
        if(!p){
          root = child
        } else {
          if(k < p.key){
            p.left = child
          } else {
            p.right = child
          }
          child.parent = p
        }
      } else {
        // two child deletion case
        const s = this.successor(k, match)
        const sp = s.parent 
        lastNode = sp
        const sk = s.key
        const p = match.parent
        if(!p){
          root = s
          s.parent = null
        } else {
          if(sk < p.key){
            p.left = s
          } else {
            p.right = s
          }
          s.parent = p
        }
        if(sp){
          if(sk < sp.key){
            sp.left = null
          } else {
            sp.right = null
          }
        }
      }
      this.#size--
      // traverse to root
      let last
      for(
        let current = lastNode.parent ? lastNode.parent : this.#root; 
        current != null; 
        current = current.parent
      ){
        const NBF = this.#getBalanceFactor(current)
        const LBF = this.#getBalanceFactor(current.left)
        const RBF = this.#getBalanceFactor(current.right)
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
          const B = E.left
          const C = B.right
          current.left = this.#leftRotate(B)
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
          const E = current.right
          const D = E.left
          current.right = this.#rightRotate(E)
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
    if(node.left){
      yield *this.inorder(node.left)
    }
    yield node.key
    if(node.right){
      yield *this.inorder(node.right)
    }
  }
  visitAllInorder(callback, node = this.#root){
    const l = node.left
    const r = node.right
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
    ).key
    results[0] = lastYieldedKey
    let maxOfTree = getMaxOfSubtree(
      node
    ).key
    do {
      let nextYieldedKey = this.successor(
        lastYieldedKey
      )
      if(nextYieldedKey){
        results.push(nextYieldedKey ? nextYieldedKey.key : null)
      }
      lastYieldedKey = nextYieldedKey.key
      if(
        results.length >= pageSizeLimit || 
        !nextYieldedKey
      ){
        yield results
        results = []
        if(researchMax){
          maxOfTree = this.getMaxOfSubtree(
            node
          ).key
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
    (n) => aMembers.push(n.key)
  )
  const bMembers = []
  b.visitAllInorder(
    (n) => bMembers.push(n.key)
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
    (n) => aMembers.push(n.key)
  )
  const bMembers = []
  b.visitAllInorder(
    (n) => bMembers.push(n.key)
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
    n => bMembers.push(n.key)
  )
  const bSet = new Set(bMembers)
  const ab=[]
  a.visitAllInorder(
    n => !bSet.has(n.key) && ab.push(n.key)
  )
  return new AVL(ab)
}

export {
  Node,
  AVL,
  AVLunionAVL,
  AVLintersectAVL,
  AVLminusAVL
}