export default class Inventory {
  constructor() {
    this._start = null;
  }

  add(product) {
    if (this._start == null) {
      this._start = product;
      return true;
    } else if (!this.search(product.getCode()) && this._howMany() < 20) {
      this._addProduct(this._start, product);
      return true;
    }
    return false;
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

  insert(product, position) {
    /*ponemos la condicion de que el producto no exista, la posicion sea valida y 
    la cantidad de productos no exceda el limite (20)
    */
    if (
      this.search(product.getCode()) != null ||
      position > this._howMany() + 1 ||
      this._howMany() == 20
    ) {
      return false;
    }
    let count = 2;
    let aux = this._start;
    //Si la posicion es el primero, solo cambiamos el inicio y hacemos que apunte al antiguo inicio
    if (position == 1) {
      this._start = product;
      this._start._next = aux;
    }
    while (count <= position) {
      //cuando pos y count sean iguales, la insercion se quiere hacer en el .next del producto que tenemos fijado
      if (position == count) {
        // el producto se inserta despues del elemento que tenemos fijado en aux
        product._next = aux._next;
        aux._next = product;
      }
      aux = aux._next;
      count++;
    }
    return true;
  }

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
  _howMany() {
    let aux = this._start;
    let count = 0;
    while (aux != null) {
      count++;
      aux = aux._next;
    }
    return count;
  }
}
