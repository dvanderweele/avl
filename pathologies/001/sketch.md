(H13 K454 L441 R466 P_ I294) 
852
886 
265             
965 
980 LL 410
1009 RL 441 
980 LL 454 
269
265 440 
379                                     
(H13 K454 L213 R466 P441 I299)

     454
     / \
   441 466
   / \
  L   R

## LL

const E = current
current = this.#rightRotate(current)
this.#reHeight(E)

// rightRotate(X)
let Z = X[2]                                      
let zr = Z[3]                                        
X[2] = zr
if(zr != null){                                      
  zr[4] = X
}
let xp = X[4]                                        
Z[4] = xp                                            
if(xp == null){                                      
  this.#root = Z                                     
} else if (X == xp[2]){                             
  xp[2] = Z                                         
} else {                                            
  xp[3] = Z                                         
}                                                 
Z[3] = X                                            
X[4] = Z                                          
Z[5] = X[5]                                         
X[5] = (
  X[2] ? X[2][5] : 0
) + (
  X[3] ? X[3][5] : 0
) + 1
return Z

// reHeight
const l = n[2]                                       
const r = n[3]                                       
n[0] = 1 + Math.max(                                 
  !l ? 0 : l[0],
  !r ? 0 : r[0]
)

## LR

const E = current                            
const B = E[2]                               
const C = B[3]                               
current[2] = this.#leftRotate(B)
this.#reHeight(B)                            
this.#reHeight(C)                            
current = this.#rightRotate(current)         
this.#reHeight(E)

// leftRotate(X)
let Z = X[3]                                         
let zl = Z[2]
X[3] = zl                                            
if(zl != null){                                      
  zl[4] = X
}                                                  
let xp = X[4]                                        
Z[4] = xp
if(xp == null){                                      
  this.#root = Z                                    
} else if (X == xp[2]){                             
  xp[2] = Z                                         
} else {                                            
  xp[3] = Z                                         
}
Z[2] = X                                           
X[4] = Z                                            
Z[5] = X[5]                                         
X[5] = (                                            
  X[2] ? X[2][5] : 0                                
) + (                                               
  X[3] ? X[3][5] : 0                               
) + 1                                               
return Z
