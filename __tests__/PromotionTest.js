import Promotion from "../src/Promotion.js";
import Product from "../src/Product.js";

describe('프로모션 테스트', () => {
  Promotion.initialize();
  Product.initialize();

  test.each([
    ['프로모션 재고가 있고, 현재 프로모션 진행중이면 true를 반환한다.', '콜라', true],
    ['프로모션 재고가 없거나, 현재 프로모션 기간이 아니라면 false를 반환한다.', '감자칩', false],
  ])('%s', (_, productName, result) => {
    expect(Promotion.isApplicable(productName)).toBe(result);
  });

  test.each([
    ['프로모션 재고는 충분하나 추가 증정은 못 받는 경우', { name: '콜라', need: 6, }, { promoNeed: 6, regularNeed: 0 }],
  ])('%s', async (_, item, result) => {
    expect(await Promotion.apply(item)).toEqual(result);
  });
});
