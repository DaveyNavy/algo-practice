import { Node } from "./node.mjs";

export class Tree {
  root;
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  #buildTreeHelper(arr) {
    if (arr.length <= 0) return null;
    const mid = Math.floor(arr.length / 2);
    const treeRoot = new Node(arr[mid]);
    treeRoot.left = this.#buildTreeHelper(arr.slice(0, mid));
    treeRoot.right = this.#buildTreeHelper(arr.slice(mid + 1));
    return treeRoot;
  }

  buildTree(arr) {
    arr = arr
      .sort((a, b) => a - b)
      .filter((item, pos, a) => {
        return !pos || item != a[pos - 1];
      });
    return this.#buildTreeHelper(arr);
  }

  insert(value) {
    let currNode = this.root;
    while (currNode) {
      if (currNode.value > value) {
        if (currNode.left == null) {
          currNode.left = new Node(value);
          return;
        }
        currNode = currNode.left;
      } else if (currNode.value < value) {
        if (currNode.right == null) {
          currNode.right = new Node(value);
          return;
        }
        currNode = currNode.right;
      } else {
        // Disallow duplicates
        return;
      }
    }
  }

  delete(value) {
    let toDelete = this.find(value);
    if (!toDelete) return;

    if (!toDelete.left && !toDelete.right) {
      // If deleted node is a leaf node, just make it null
      toDelete.value = null;
    } else if (!toDelete.left || !toDelete.right) {
      // If deleted node has only one child, replace deleted node with that child
      if (toDelete.left) {
        const left = toDelete.left;
        toDelete.value = left.value;
        toDelete.left = left.left;
        toDelete.right = left.right;
      } else {
        const right = toDelete.right;
        toDelete.value = right.value;
        toDelete.left = right.left;
        toDelete.right = right.right;
      }
    } else {
      // If both children are non null, find the inorder predecessor
      // and replace the deleted node with it
      let temp = toDelete.left;
      while (temp.right) {
        temp = temp.right;
      }
      const tempVal = temp.value;
      this.delete(tempVal);
      toDelete.value = tempVal;
    }

    // Clean up null-valued nodes
    this.inorder(function (e) {
      if (e.left && e.left.value == null) e.left = null;
      if (e.right && e.right.value == null) e.right = null;
    });
  }

  find(value) {
    let currNode = this.root;
    while (currNode) {
      if (currNode.value == value) {
        return currNode;
      } else if (currNode.value > value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback is required!");
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const currItem = queue.shift();
      callback(currItem);
      if (currItem.left) queue.push(currItem.left);
      if (currItem.right) queue.push(currItem.right);
    }
  }

  #inorderHelper(root, callback) {
    if (!root) return;
    this.#inorderHelper(root.left, callback);
    callback(root);
    this.#inorderHelper(root.right, callback);
  }

  inorder(callback) {
    if (!callback) throw new Error("Callback is required!");
    this.#inorderHelper(this.root, callback);
  }

  #preorderHelper(root, callback) {
    if (!root) return;
    callback(root);
    this.#preorderHelper(root.left, callback);
    this.#preorderHelper(root.right, callback);
  }

  preorder(callback) {
    if (!callback) throw new Error("Callback is required!");
    this.#preorderHelper(this.root, callback);
  }

  #postorderHelper(root, callback) {
    if (!root) return;
    this.#postorderHelper(root.left, callback);
    this.#postorderHelper(root.right, callback);
    callback(root);
  }

  postorder(callback) {
    if (!callback) throw new Error("Callback is required!");
    this.#postorderHelper(this.root, callback);
  }

  height(node) {
    if (!node) return 0;
    if (!node.left && !node.right) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {
    let currDepth = 0;
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let s = queue.length;
      for (let i = 0; i < s; i++) {
        const currItem = queue.shift();

        if (currItem == node) return currDepth;
        if (currItem.left) queue.push(currItem.left);
        if (currItem.right) queue.push(currItem.right);
      }
      currDepth++;
    }
  }

  isBalanced() {
    return (
      Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1
    );
  }

  rebalance() {
    const sortedArr = [];
    this.inorder((e) => sortedArr.push(e.value));
    this.root = this.buildTree(sortedArr);
  }
}
