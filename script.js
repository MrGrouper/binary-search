
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]


class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }

}

class Tree{
    constructor(array){
        this.root = buildTree(array);
    }
    insert(val){
        this.root = insertRec(this.root, val);
    }
    deleteVal(val){
        this.root = deleteRec(this.root, val);
    }
    find(val){
        this.root = findRec(this.root, val);
    }
    levelOrder(){
        return levelOrderQ(this.root);
    }

}

let tree = new Tree(array)


function buildTree(array){
    
    const uniqSorted = mergeSort(makeUniq(array))
    console.log(uniqSorted)
    const len = uniqSorted.length 
    return buildTreeHelper(uniqSorted, 0, len-1)

}


function buildTreeHelper(array, start, end){

    if (start > end){
        return null;
    }

    var mid = parseInt((start + end)/2);
    var node = new Node(array[mid])

    node.left = buildTreeHelper(array, start, mid-1);
    node.right = buildTreeHelper(array, mid+1, end)
    return node;

}

function makeUniq(arr){
    uniq = [...new Set(arr)];
    return uniq
}

function mergeSort(arr){
    if(arr.length<=1) return arr

    let mid = Math.floor(arr.length/2)

    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid))

    return merge(left,right)
}

function merge(left,right){
    let sortedArr = [];

    while(left.length && right.length){
        if((left)[0]<(right)[0]){
            sortedArr.push(left.shift())
        }else{
            sortedArr.push(right.shift())
        }
    }
    return[...sortedArr, ...left, ...right]
}



function insertRec(root, val){
    if(!root){
        root = new Node(val);
        return root;
    }

    if(val < root.val){
        root.left = insertRec(root.left, val);
    }
    else if(val > root.right, val){
        root.right = insertRec(root.right, val);
    }
    return root
}

function deleteRec(root, val){
    if(!root){
        return root;
    }
    if(val<root.val){
        root.left = deleteRec(root.left, val);
    }
    else if(val>root.val){
        root.right = deleteRec(root.right, val)
    }
    else{
        if(!root.left){
            return root.right;
        }
        else if(!root.right){
            return root.left
        }
        root.val = minValue(root.right);
        root.right = deleteRec(root.right, root.val)
    }
    return root
}

function minValue(root){
    let minVal = root.val;
    while(root.left){
        minVal = root.left.val;
        root = root.left;
    }
    return minVal;
}

function findRec(root, val){
    if(root.val == val){
        console.log(root)
        return root;
    }
    if(root.val>val){
        root.left = findRec(root.left, val);
    }
    else if(root.val<val){
        root.right = findRec(root.right, val);
    }
  
    return null;
    
}

function levelOrderQ(root){
    if(!root){
    return [];
    }

    const result = [];
    var q = [];
    q.push(root);

    while (q.length != 0){
        var arr = [];
        
        var node = q.shift();
        arr.push(node.val)
        if(node.left) {
            q.push(node.left);
            };
            if(node.right){
                q.push(node.right)
            }
        
        result.push(arr);
    }
    return result;
    
}

// function levelOrderIt(root, fn){

// }



const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  
  tree.insert(59);
  prettyPrint(tree.root, prefix = '', isLeft = true);
  tree.deleteVal(4);
  prettyPrint(tree.root, prefix = '', isLeft = true);

  console.log(tree.levelOrder());


  
  


