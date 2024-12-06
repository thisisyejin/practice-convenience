import { MissionUtils } from "@woowacourse/mission-utils";
import Product from "./Product.js";

const OutputView = {
  printStock() {
    MissionUtils.Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
    MissionUtils.Console.print(Product.list);
  }
}

export default OutputView;
