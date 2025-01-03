import { Node } from "./node.mjs";

export class LinkedList {
  #head;
  #tail;
  #size;
  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  append(value) {
    const newNode = new Node();
    newNode.value = value;
    if (this.#size == 0) {
      this.#head = newNode;
      this.#tail = this.#head;
    } else {
      this.#tail.nextNode = newNode;
      this.#tail = this.#tail.nextNode;
    }
    this.#size++;
  }

  preappend(value) {
    const newNode = new Node();
    newNode.value = value;
    if (this.#size == 0) {
      this.#head = newNode;
      this.#tail = this.#head;
    } else {
      newNode.nextNode = this.#head;
      this.#head = newNode;
    }
    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head;
  }

  tail() {
    return this.#tail;
  }

  at(index) {
    if (index < 0 || index >= this.#size) return null;

    let currNode = this.#head;
    for (let i = 0; i < index; i++) {
      currNode = currNode.nextNode;
    }
    return currNode;
  }

  pop() {
    if (!this.#head) return;
    if (!this.#head.nextNode) {
      this.#head = null;
      this.#tail = null;
      this.#size--;
      return;
    }
    let currNode = this.#head;
    while (currNode.nextNode && currNode.nextNode.nextNode) {
      currNode = currNode.nextNode;
    }
    this.#tail = currNode;
    this.#tail.nextNode = null;
    this.#size--;
  }

  contains(value) {
    let currNode = this.#head;
    while (currNode) {
      if (currNode.value == value) {
        return true;
      }
      currNode = currNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currNode = this.#head;
    while (currNode) {
      if (currNode.value == value) {
        return currNode;
      }
      currNode = currNode.nextNode;
    }
    return null;
  }

  toString() {
    let string = "";
    let currNode = this.#head;
    while (currNode) {
      string += `( ${currNode.value} ) -> `;
      currNode = currNode.nextNode;
    }
    string += "null";
    return string;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.#size) return;

    let currNode = this.#head;
    let dummy = new Node();
    dummy.nextNode = this.#head;
    let prevNode = dummy;

    prevNode.nextNode = this.#head;
    for (let i = 0; i < index; i++) {
      currNode = currNode.nextNode;
      prevNode = prevNode.nextNode;
    }

    const newNode = new Node();
    newNode.value = value;
    prevNode.nextNode = newNode;
    newNode.nextNode = currNode;

    this.#head = dummy.nextNode;
    if (index == this.#size) {
      this.#tail = newNode;
    }
    this.#size++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) return;

    let currNode = this.#head;
    let dummy = new Node();
    dummy.nextNode = this.#head;
    let prevNode = dummy;

    for (let i = 0; i < index; i++) {
      currNode = currNode.nextNode;
      prevNode = prevNode.nextNode;
    }

    prevNode.nextNode = currNode.nextNode;
    this.#head = dummy.nextNode;
    if (index == this.#size - 1) {
      this.#tail = prevNode;
    }
    this.#size--;
  }
}
