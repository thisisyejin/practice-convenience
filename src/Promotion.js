import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Product from "./Product.js";

class Promotion {
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

  #isDuration() {
    const start = this.start_date;
    const end = this.end_date;
    const now = MissionUtils.DateTimes.now();

    if (start <= now && now <= end) return true;
    return false;
  }

  // static isApplicable(productName) {
  //   const promoName = Product.searchPromotion(productName);
  //   if (promoName == undefined) return false;
  //   if (!this.search(promoName).#isDuration()) return false;
  //   return true;
  // }

  // static async apply({ name: name, need: need }) {
  //   // 필요 정보: 구매 수량, 재고, buy, get
  //   const { promoStock } = Product.getQuantity(name);
  //   const { buy, get } = this.search(Product.searchPromotion(name));

  //   // 프로모션 재고가 충분한지
  //   if (promoStock >= need) {
  //     // 추가 증정이 가능한지
  //     if (promoStock >= need + 1 && need % (buy + get) == buy) {
  //       const result = await InputView.askYesOrNo(`\n현재 ${name}은(는) ${get}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
  //       if (result) return { promoNeed: need + 1, regularNeed: 0 }; // 증정 추가
  //     }
  //     return { promoNeed: need, regularNeed: 0 }; // 프로모션 상품만 구매
  //   }
  //   // 프로모션 재고 불충분
  //   const shortage = need - Math.floor(promoStock / (buy + get)) * (buy + get);
  //   const result = await InputView.askYesOrNo(`\n현재 ${name} ${shortage}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`);
  //   if (result) return { promoNeed: promoStock, regularNeed: need - promoStock };
  //   return { promoNeed: Math.floor(promoStock / (buy + get)) * (buy + get), regularNeed: 0 };
  // }
}

export default Promotion;
