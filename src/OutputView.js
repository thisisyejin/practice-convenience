import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
  printStock(list) {
    MissionUtils.Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
    list.forEach(stock => {
      // TODO: 프로모션 재고만 있는 경우, 일반 재고를 0으로 출력하도록 처리 필요
      if (stock.promotion === 'null') {
        MissionUtils.Console.print(`- ${stock.name} ${stock.price.toLocaleString()}원 ${stock.quantity}개`);
      }
      MissionUtils.Console.print(`- ${stock.name} ${stock.price.toLocaleString()}원 ${stock.quantity}개 ${stock.promotion}`);
    });
  }
}

export default OutputView;
