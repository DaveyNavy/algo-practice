import { LinkedList } from "../linked-list/linked-list.mjs";

export class HashMap {
  #capacity;
  #loadFactor;
  #numEntries;
  #buckets;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#numEntries = 0;

    this.#buckets = [];
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(new LinkedList());
    }
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  #findKey(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let currNode = this.#buckets[index].head();
    while (currNode) {
      if (currNode.value.key == key) {
        return currNode;
      }
      currNode = currNode.nextNode;
    }
    return null;
  }

  set(key, value) {
    if (this.#findKey(key) != null) {
      this.#findKey(key).value.value = value;
      return;
    }
    const index = this.#hash(key);
    this.#buckets[index].append({ key, value });
    this.#numEntries++;

    if (this.#numEntries >= this.#loadFactor * this.#capacity) {
      // Double buckets capacity and migrate old data over
      const oldEntries = this.entries();
      this.#capacity *= 2;
      this.clear();
      oldEntries.forEach((e) => {
        this.set(e[0], e[1]);
      });
    }
  }

  get(key) {
    if (this.#findKey(key)) return this.#findKey(key).value.value;
    return null;
  }

  has(key) {
    return this.get(key) != null;
  }

  remove(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let currNode = this.#buckets[index].head();
    let listIndex = 0;
    while (currNode) {
      if (currNode.value.key == key) {
        this.#buckets[index].removeAt(listIndex);
        this.#numEntries--;
        return true;
      }
      listIndex++;
      currNode = currNode.nextNode;
    }
    return false;
  }

  length() {
    return this.#numEntries;
  }

  clear() {
    this.#numEntries = 0;
    this.#buckets = [];
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(new LinkedList());
    }
  }

  #iterateMap(callbackFn) {
    const arr = [];
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#buckets[i].head() != null) {
        let currNode = this.#buckets[i].head();
        while (currNode) {
          arr.push(callbackFn(currNode));
          currNode = currNode.nextNode;
        }
      }
    }
    return arr;
  }

  keys() {
    return this.#iterateMap((node) => {
      return node.value.key;
    });
  }

  values() {
    return this.#iterateMap((node) => {
      return node.value.value;
    });
  }

  entries() {
    return this.#iterateMap((node) => {
      return [node.value.key, node.value.value];
    });
  }
}
