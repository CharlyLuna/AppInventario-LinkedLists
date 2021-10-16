export default class Inventory {
  constructor() {
    this._start = null;
  }

  add(product) {
    if (this._start == null) {
      this._start = product;
      return true;
    } else {
      this._addProduct(this._start, product);
      console.log(this._start);
      return true;
    }
  }
  _addProduct(node, product) {
    if (node._next == null) {
      node._next = product;
    } else {
      this._addProduct(node._next, product);
    }
  }
  search(code) {
    let aux = this._start;
    while (aux != null) {
      if (aux.getCode() == code) {
        return aux;
      }
      aux = aux._next;
    }
    return null;
  }

  list() {
    if (this._start == null) {
      return "No se han encontrado productos";
    } else {
      return this._listProducts(this._start);
    }
  }

  _listProducts(node) {
    if (node._next == null) {
      return node.infoHtml();
    } else {
      return `${node.infoHtml()} ${this._listProducts(node._next)}`;
    }
  }

  inverseList() {
    if (this._start == null) {
      return "No se han encontrado productos";
    } else {
      return this._listProductsInv(this._start);
    }
  }

  _listProductsInv(node) {
    if (node._next == null) {
      return node.infoHtml();
    } else {
      return `${this._listProductsInv(node._next)} ${node.infoHtml()}`;
    }
  }

  /*
  insert(product, position) {
    if (position && position <= this._products.length && this.add(product)) {
      let i = this._products.length - 1;
      let j = i - 1;
      for (; i >= position; i--, j--) {
        let value = this._products[i];
        this._products[i] = this._products[j];
        this._products[j] = value;
      }
      return this._products;
    }
    return false;
  } */

  delete(code) {
    let deleted = null;
    if (code == this._start.getCode()) {
      deleted = this._start;
      this._start = this._start._next;
      deleted._next = null;
      return deleted;
    }
    let aux = this._start;
    while (aux._next != null && deleted == null) {
      if (aux._next.getCode() == code) {
        deleted = aux._next;
        aux._next = aux._next._next;
        deleted._next = null;
      } else {
        aux = aux._next;
      }
    }
    return deleted;
  }
}
