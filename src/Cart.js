import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "./inputView.js";
import Product from "./Product.js";
import Promotion from "./Promotion.js";

class Cart {
  static list;

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
    for (let item of this.list) {
      // 프로모션 적용
      if (Promotion.isApplicable(item.name)) {
        const result = await Promotion.apply(item);
        // item = { name: item.name };
        console.log(result);
        continue;
      }
      // 프로모션 미적용
      // 필요 정보: 구매 수량, 재고
      const { regularStock } = Product.getQuantity(item.name);

      // 일반 재고 충분
      if (regularStock >= item.need) {
        const result = { promoNeed: 0, regularNeed: item.need }; // 일반 상품만 구매
        console.log(result);
        continue;
      }
      // 일반 재고 불충분
      const result = { promoNeed: item.need - regularStock, regularNeed: regularStock };
      console.log(result);
    }
  }
}

export default Cart;
