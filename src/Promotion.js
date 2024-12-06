import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./inputView.js";
import Product from "./Product.js";

class Promotion {
  name;
  buy;
  get;
  start_date;
  end_date;
  static #list;

  constructor({ name, buy, get, start_date, end_date }) {
    this.name = name;
    this.buy = Number(buy);
    this.get = Number(get);
    this.start_date = new Date(start_date);
    this.end_date = new Date(end_date);
  }

  static initialize() {
    const promotionList = InputView.readCSV('./public/promotions.md');
    this.#list = [];
    promotionList.forEach(promotion =>
      this.#list.push(new Promotion(promotion))
    );
  }

  static search(name) {
    return this.#list.find(promotion => promotion.name == name);
  }

  isDuration() {
    const start = this.start_date;
    const end = this.end_date;
    const now = MissionUtils.DateTimes.now();

    if (start <= now && now <= end) return true;
    return false;
  }

  static isApplicable(productName) {
    const promoName = Product.searchPromotion(productName);
    if (promoName == undefined) return false;
    if (!this.search(promoName).isDuration()) return false;
    return true;
  }

  static apply({ name: name, need: need }) {
    // const promotion = this.search(Product.searchPromotion(name));
    if (Product.isAvailable(name)[0] > need) console.log('충분!');
  }
}

export default Promotion;
