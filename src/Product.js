import InputView from "./InputView.js";
import Promotion from "./Promotion.js";

class Product {
  static #list;

  constructor({ name, price, quantity, promotion }) {
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
    this.promotion = Promotion.search(promotion); // 참조
  }

  static initialize() {
    const productList = InputView.readCSV('./public/products.md');
    const products = [];
    productList.forEach(product =>
      products.push(new Product(product))
    );

    // 프로모션 상품만 있으면 일반 상품 재고 0으로 하여 추가
    this.#list = products.reduce((acc, product, idx, arr) => {
      acc.push(product);
      if (product.promotion !== undefined && (!arr[idx + 1] || product.name !== arr[idx + 1].name))
        acc.push(new Product({ name: product.name, price: product.price, quantity: 0 }));
      return acc;
    }, []);
  }

  static get list() { // 재고 출력용
    const stock = this.#list.reduce((acc, product) => {
      let quantity = `${product.quantity}개`;
      if (quantity === '0개') quantity = '재고 없음';
      let promotion = ''
      if (product.promotion !== undefined) promotion = product.promotion.name;

      return acc + `- ${product.name} ${product.price.toLocaleString()}원 ${quantity} ${promotion}\n`
    }, '');
    return stock;
  }

  static #search(name) {
    return this.#list.filter(product => product.name == name);
  }

  // static searchPromotion(name) {
  //   const search = this.#search(name).find(product =>
  //     // 프로모션이 존재하고, 프로모션 재고가 1 이상인 상품 검색
  //     (product.promotion !== 'null') && (product.quantity > 0));
  //   if (search !== undefined) return search.promotion;
  // }

  static isAvailable({ name, need }) {
    // 존재하는 상품인지
    const products = this.#search(name);
    if (products.length === 0) throw Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
    // 재고 수량이 충분한지
    const entireQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
    if (entireQuantity < need) throw Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
  }

  // static getQuantity(name) {
  //   const quantity = this.#search(name).map(product => product.quantity);
  //   if (quantity.length === 2) return { promoStock: quantity[0], regularStock: quantity[1] };
  //   if (quantity.length === 1) return { promoStock: 0, regularStock: quantity[0] };
  // }
}

export default Product;
