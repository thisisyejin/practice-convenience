import InputView from "./inputView.js";

class Product {
  name;
  price;
  quantity;
  promotion;
  static #list;

  constructor({ name, price, quantity, promotion }) {
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
    this.promotion = promotion;
  }

  static initialize() {
    const productList = InputView.readCSV('./public/products.md');
    this.#list = [];
    productList.forEach(product =>
      this.#list.push(new Product(product))
    );
  }

  static get list() { // 재고 출력용
    return this.#list;
  }

  static search(name) {
    return this.#list.filter(product => product.name == name);
  }

  static searchPromotion(name) {
    const search = this.search(name).find(product =>
      // 프로모션이 존재하고, 프로모션 재고가 1 이상인 상품 검색
      (product.promotion !== 'null') && (product.quantity > 0));
    if (search !== undefined) return search.promotion;
  }

  static isAvailable({ name, need }) {
    const products = this.search(name);
    if (products.length === 0) throw Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');

    const quantity = products.map(product => product.quantity);
    const entireQuantity = quantity.reduce((acc, quantity) => acc + quantity);
    if (entireQuantity < need) throw Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');

    return quantity;
  }
}

export default Product;
