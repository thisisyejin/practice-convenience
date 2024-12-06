import { MissionUtils } from "@woowacourse/mission-utils";
import fs from 'fs';

const InputView = {
  readCSV(path) {
    const data = fs.readFileSync(path, 'utf8', (err, data) => {
      if (err) {
        MissionUtils.Console.print(err.message);
        reject(err);
        return;
      }
      resolve(data);
    });

    const lines = data.trim().split('\r\n');
    const columns = lines[0].split(',');
    const rows = lines.slice(1).map(row => {
      const values = row.split(',');
      const product = {};
      columns.forEach((column, index) =>
        product[column] = values[index]
      );
      return product;
    });
    return rows;
  },

  async readProducts() {
    // 입력 & 형식 검증
    const input = await MissionUtils.Console.readLineAsync('\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
    const regex = /^\[([^\[\]-]+)-([0-9]+)\]$/;

    const shoppingList = input.split(',')
      .map(product => {
        if (!regex.test(product)) throw Error('[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.');
        return { name: product.match(regex)[1], need: Number(product.match(regex)[2]), }
      });
    // // 수량이 0일 때 예외 처리
    // shoppingList.forEach(product => {
    //   if (Number(product.need) < 1) throw Error('[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.');
    // });
    // // 중복 처리
    // const result = [];
    // shoppingList.forEach((obj) => {
    //   const existing = result.find(item => item.name === obj.name);
    //   if (existing) existing.need += obj.need;
    //   if (!existing) result.push({ ...obj });
    // });
    // return result;
    return shoppingList;
  },

  async askYesOrNo(askMessage) {
    try {
      const input = await MissionUtils.Console.readLineAsync(askMessage);
      if (input === 'y' || input === 'Y') return true;
      else if (input === 'n' || input === 'N') return false;
      throw Error('[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.');

    } catch (err) {
      MissionUtils.Console.print(err.message);
      return await this.askYesOrNo(askMessage);
    }
  },
}

export default InputView;
