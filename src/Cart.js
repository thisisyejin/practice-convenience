import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./inputView.js";
import Product from "./Product.js";
import Promotion from "./Promotion.js";

class Cart {
  static list;
  static updatedList;

  static async shopping() {
    try {
      const products = await InputView.readProducts();
      // 상품별 구매 가능 여부 확인
      products.forEach(product => Product.isAvailable(product));
      this.list = products;

    } catch (err) {
      MissionUtils.Console.print(err.message);
      return await this.shopping();
    }
  }

  static async adjust() {
    this.updatedList = [];
    for (let item of this.list) {
      // 프로모션 적용
      if (Promotion.isApplicable(item.name)) {
        const result = await Promotion.apply(item);
        this.updatedList.push({ name: item.name, promoNeed: result.promoNeed, regularNeed: result.regularNeed });
        continue;
      }

      // 프로모션 미적용
      const { regularStock } = Product.getQuantity(item.name);

      if (regularStock >= item.need)
        this.updatedList.push({ name: item.name, promoNeed: 0, regularNeed: item.need });
      else if (regularStock < item.need)
        this.updatedList.push({ name: item.name, promoNeed: item.need - regularStock, regularNeed: regularStock });
    }
    console.log(this.updatedList)
  }
}


export default Cart;
