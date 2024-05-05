function node(key, parent = null){
  let height = 1
  let k = key
  let left = null
  let right = null
  let p = parent
  function getKey(){
    return k
  }
  function getLeft(){
    return left
  }
  function getRight(){
    return right
  }
  function getParent(){
    return p
  }
  function getHeight(){
    return height
  }
  function setKey(key){
    k = key
  }
  function setHeight(h){
    height = h
  }
  function setLeft(l){
    left = l
  }
  function setRight(r){
    right = r
  }
  function setParent(parent){
    p = parent
  }
  return {
    getKey,
    getLeft,
    getRight,
    getParent,
    getHeight,
    setKey,
    setHeight,
    setLeft,
    setRight,
    setParent
  }
}

function avl(sortedArray = null){
  let root = null
  let size = 0
  if(sortedArray instanceof Array && sortedArray.length > 0){
    root = (
      function preorderBuild(
        LBI = 0,
        RBI = sortedArray.length - 1,
        parent = null
      ){
        const MP = LBI !== RBI ? LBI + Math.floor(
          (RBI - LBI) / 2
        ) : LBI
        const n = node(
          sortedArray[MP],
          parent
        )
        size++
        // left child
        n.setLeft(
          LBI !== MP ? preorderBuild(
            LBI,
            MP - 1,
            n
          ) : null
        )
        // right child
        n.setRight(
          RBI !== MP ? preorderBuild(
            MP + 1,
            RBI,
            n
          ) : null
        )
        return n
      }
    )()
  }
  function reHeight(n){
    const l = n.getLeft()
    const r = n.getRight()
    n.setHeight(
      1 + Math.max(
        !l ? 0 : l.getHeight(),
        !r ? 0 : r.getHeight()
      )
    )
  }
  function leftRotate(X){
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
    let Z = X.getRight()
    let zl = Z.getLeft()
    X.setRight(zl)
    if(zl != null){
      zl.setParent(X)
    }
    let xp = X.getParent()
    Z.setParent(xp)
    if(xp == null){
      root = Z
    } else if (X == xp.getLeft()){
      xp.setLeft(Z)
    } else {
      xp.setRight(Z)
    }
    Z.setLeft(X)
    X.setParent(Z)
    return Z
  }
  function rightRotate(X){
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
    let Z = X.getLeft()
    let zr = Z.getRight()
    X.setLeft(zr)
    if(zr != null){
      zr.setParent(X)
    }
    let xp = X.getParent()
    Z.setParent(xp)
    if(xp == null){
      root = Z
    } else if (X == xp.getLeft()){
      xp.setLeft(Z)
    } else {
      xp.setRight(Z)
    }
    Z.setRight(X)
    X.setParent(Z)
    return Z
  }
  function getBalanceFactor(n){
    return !n ? 0 : (
      (
        !n.getLeft() ? 0 : n.getLeft().getHeight()
      ) - (
        !n.getRight() ? 0 : n.getRight().getHeight()
      )
    )
  }
  function search(key, searchRoot = root){
    while (
      searchRoot != null && searchRoot.getKey() != key
    ){
      if (key < searchRoot.getKey()){
        searchRoot = searchRoot.getLeft()
      } else {
        searchRoot = searchRoot.getRight()
      }
    }
    return searchRoot
  }
  function insert(key, insertRoot = root, parent = null){
    // iterative version
    for(; insertRoot != null;){
      if(key < insertRoot.getKey()){
        parent = insertRoot
        insertRoot = insertRoot.getLeft()
      } else if (key > insertRoot.getKey()){
        parent = insertRoot
        insertRoot = insertRoot.getRight()
      } else {
        break
      }
    }
    let newNode = null
    if (parent != null){
      if(key < parent.getKey()){
        newNode = node(key, parent)
        parent.setLeft(newNode)
        size++
      } else if (key > parent.getKey()){
        newNode = node(key, parent)
        parent.setRight(newNode)
        size++
      }
    } else {
      newNode = node(key)
      root = newNode
      size++
      return newNode
    }
    let last
    for(
      let current = newNode.getParent(); 
      current != null; 
      current = current.getParent()
    ){
      const NBF = getBalanceFactor(current)
      const LBF = getBalanceFactor(current.getLeft())
      const RBF = getBalanceFactor(current.getRight())
      if (
        NBF > 1 && // LL - Left Child Tall due to Left Grandchild
        LBF >= 0
      ){
        const E = current
        current = rightRotate(current)
        reHeight(E)
        break
      } else if (
        NBF>1 && 
        LBF<0 // LR - Left Child Tall due to Right Grandchild
      ){
        const E = current
        const B = E.getLeft()
        const C = B.getRight()
        current.setLeft(
          leftRotate(B)
        )
        reHeight(B)
        reHeight(C)
        current = rightRotate()
        reHeight(E)
        break
      } else if (
        NBF < -1 && // RR - Right Child Tall due to Right Grandchild
        RBF <= 0
      ){
        const B = current
        current = leftRotate(current)
        reHeight(B)
        break
      } else if (
        NBF < -1 && // RL - Right Child Tall due to Left Grandchild
        RBF > 0
      ){
        const B = current
        const E = current.getRight()
        const D = E.getLeft()
        current.setRight(
          rightRotate(E)
        )
        reHeight(E)
        reHeight(D)
        current = leftRotate(current)
        reHeight(B)
        break
      }
      last = current
    }
    root = last
    return newNode
  }
  function getMinOfSubtree(node = root){
    return !node || !node.getLeft() ? node : (
      getMinOfSubtree(
        node.getLeft()
      )
    )
  }
  function getMaxOfSubtree(node = root){
    return !node || !node.getRight() ? node : (
      getMaxOfSubtree(
        node.getRight()
      )
    )
  }
  function successor(key, node = root){
    let n = search(key, node)
    if(!n){
      return null
    }
    const r = n.getRight()
    if(r){
      return getMinOfSubtree(r)
    }
    let p = n.getParent()
    while(
      p && 
      n.getKey() === (
        p.getRight() ? p.getRight().getKey() : p.getRight()
      )
    ){
      n = p
      p = p.getParent()
    }
    return !p ? null : p
  }
  function predecessor(key, node = root){
    let n = search(key, node)
    if(!n){
      return null
    }
    const l = n.getLeft()
    if(l){
      return getMaxOfSubtree(l)
    }
    let p = node.getParent()
    while(
      p && 
      n.getKey() === (
        p.getLeft() ? p.getLeft().getKey() : p.getRight()
      )
    ){
      n = p
      p = p.getParent()
    }
    return !p ? null : p
  }
  function remove(key, node = root){
    const match = search(key, node)
    if(!match){
      return null
    } else {
      const k = match.getKey()
      const l = match.getLeft()
      const r = match.getRight()
      let lastNode
      if(!l && !r){
        // leaf deletion case
        const p = match.getParent()
        lastNode = p
        if(!p){
          root = null
        } else {
          if(k < p.getKey()){
            p.setLeft(null)
          } else {
            p.setRight(null)
          }
        }
      } else if(!l || !r){
        // one child deletion case
        const p = match.getParent()
        const child = l ? l : r
        lastNode = child
        if(!p){
          root = child
        } else {
          if(k < p.getKey()){
            p.setLeft(child)
          } else {
            p.setRight(child)
          }
          child.setParent(p)
        }
      } else {
        // two child deletion case
        const s = successor(k, match)
        const sp = s.getParent() 
        lastNode = sp
        const sk = s.getKey()
        const p = match.getParent()
        if(!p){
          root = s
          s.setParent(null)
        } else {
          if(sk < p.getKey()){
            p.setLeft(s)
          } else {
            p.setRight(s)
          }
          s.setParent(p)
        }
        if(sp){
          if(sk < sp.getKey()){
            sp.setLeft(null)
          } else {
            sp.setRight(null)
          }
        }
      }
      size--
      // traverse to root
      let last
      for(
        let current = lastNode.getParent() ? lastNode.getParent() : root; 
        current != null; 
        current = current.getParent()
      ){
        const NBF = getBalanceFactor(current)
        const LBF = getBalanceFactor(current.getLeft())
        const RBF = getBalanceFactor(current.getRight())
        if (
          NBF > 1 && // LL - Left Child Tall due to Left Grandchild
          LBF >= 0
        ){
          const E = current
          current = rightRotate(current)
          reHeight(E)
        } else if (
          NBF>1 && 
          LBF<0 // LR - Left Child Tall due to Right Grandchild
        ){
          const E = current
          const B = E.getLeft()
          const C = B.getRight()
          current.setLeft(
            leftRotate(B)
          )
          reHeight(B)
          reHeight(C)
          current = rightRotate(current)
          reHeight(E)
        } else if (
          NBF < -1 && // RR - Right Child Tall due to Right Grandchild
          RBF <= 0
        ){
          const B = current
          current = leftRotate(current)
          reHeight(B)
        } else if (
          NBF < -1 && // RL - Right Child Tall due to Left Grandchild
          RBF > 0
        ){
          const B = current
          const E = current.getRight()
          const D = E.getLeft()
          current.setRight(
            rightRotate(E)
          )
          reHeight(E)
          reHeight(D)
          current = leftRotate(current)
          reHeight(B)
        }
        last = current
      }
      root = last
      return k
    }
  }
  function *inorder(node = root){ 
    if(node.getLeft()){
      yield *inorder(node.getLeft())
    }
    yield node.getKey()
    if(node.getRight()){
      yield *inorder(node.getRight())
    }
  }
  function visitAllInorder(callback, node = root){
    const l = node.getLeft()
    const r = node.getRight()
    if(l){
      visitAllInorder(callback, l)
    }
    callback(node)
    if(r){
      visitAllInorder(callback, r)
    }
  }
  function *pageInOrder(
    pageSizeLimit, 
    researchMax = false,
    node = root
  ){
    if(pageSizeLimit < 1){
      pageSizeLimit = 1
    }
    let results = []
    let lastYieldedKey = getMinOfSubtree(
      node
    ).getKey()
    results[0] = lastYieldedKey
    let maxOfTree = getMaxOfSubtree(
      node
    ).getKey()
    do {
      let nextYieldedKey = successor(
        lastYieldedKey
      )
      if(nextYieldedKey){
        results.push(nextYieldedKey ? nextYieldedKey.getKey() : null)
      }
      lastYieldedKey = nextYieldedKey.getKey()
      if(
        results.length >= pageSizeLimit || 
        !nextYieldedKey
      ){
        yield results
        results = []
        if(researchMax){
          maxOfTree = getMaxOfSubtree(
            node
          ).getKey()
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
  function getRoot(){
    return root
  }
  function length(){
    return size
  }
  return {
    search,
    insert,
    getMinOfSubtree,
    getMaxOfSubtree,
    successor,
    predecessor,
    remove,
    pageInOrder,
    inorder,
    getBalanceFactor,
    visitAllInorder,
    getRoot,
    length,
    [Symbol.iterator]: function*(){
      yield *inorder()
    }
  }
}

function AVLunionAVL(a, b){ 
  const aMembers = []
  a.visitAllInorder(
    (n) => aMembers.push(n.getKey())
  )
  const bMembers = []
  b.visitAllInorder(
    (n) => bMembers.push(n.getKey())
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
  return avl(ab)
}

function AVLintersectAVL(a, b){
  const aMembers = []
  a.visitAllInorder(
    (n) => aMembers.push(n.getKey())
  )
  const bMembers = []
  b.visitAllInorder(
    (n) => bMembers.push(n.getKey())
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
  return avl(ab)
}

function AVLminusAVL(a, b){
  const bMembers = []
  b.visitAllInorder(
    n => bMembers.push(n.getKey())
  )
  const bSet = new Set(bMembers)
  const ab=[]
  a.visitAllInorder(
    n => !bSet.has(n.getKey()) && ab.push(n.getKey())
  )
  return avl(ab)
}

export {
  node,
  avl,
  AVLunionAVL,
  AVLintersectAVL,
  AVLminusAVL
}