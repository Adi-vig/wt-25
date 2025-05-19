class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else if (newNode.value > node.value) {
      if (!node.right) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  search(value, node = this.root) {
    if (!node) return false;
    if (value === node.value) return true;
    return value < node.value
      ? this.search(value, node.left)
      : this.search(value, node.right);
  }

  display() {
    const lines = [];
    this._buildTreeDisplay(this.root, "", true, lines);
    return lines;
  }
  
  _buildTreeDisplay(node, prefix, isTail, lines) {
    if (node === null) return; // Add null check to prevent error
  
    // Recurse for right child (draw right subtree first)
    if (node.right) {
      this._buildTreeDisplay(node.right, prefix + (isTail ? "│   " : "    "), false, lines);
    }
  
    // Add the current node to the lines array
    lines.push(prefix + (isTail ? "└── " : "┌── ") + node.value);
  
    // Recurse for left child (draw left subtree last)
    if (node.left) {
      this._buildTreeDisplay(node.left, prefix + (isTail ? "    " : "│   "), true, lines);
    }
  }
  
  
}

const bst = new BST();

function insertValue() {
    document.getElementById("treeStructure").innerText = bst.display().join("\n");
    const value = parseInt(document.getElementById("valueInput").value);
    if (!isNaN(value)) {
    bst.insert(value);
    document.getElementById("inOrderResult").innerText = JSON.stringify(bst.inOrderTraversal());
    document.getElementById("treeStructure").innerText = bst.display().join("\n");
    document.getElementById("searchResult").innerText = "";
  }
  document.getElementById("valueInput").value = "";
}

function searchValue() {
  const value = parseInt(document.getElementById("searchInput").value);
  console.log(value);
  const found = bst.search(value);
  document.getElementById("searchResult").innerText = found
    ? `✅ ${value} found in tree.`
    : `❌ ${value} not found.`;
}


