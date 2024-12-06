import Promotion from "../src/Promotion.js";
import Product from "../src/Product.js";

describe('프로모션 테스트', () => {
  Promotion.initialize();
  Product.initialize();

  test.each([
    ['프로모션이 진행중이면 true를 반환한다.', '탄산2+1', true],
    ['프로모션 기간이 아니면 false를 반환한다.', '반짝할인', false],
  ])('%s', (_, promoName, result) => {
    expect(Promotion.search(promoName).isDuration()).toBe(result);
  });

  test.each([
    ['프로모션 재고가 있고, 현재 프로모션 진행중이면 true를 반환한다.', '콜라', true],
    ['프로모션 재고가 없거나, 현재 프로모션 기간이 아니라면 false를 반환한다.', '감자칩', false],
  ])('%s', (_, productName, result) => {
    expect(Promotion.isApplicable(productName)).toBe(result);
  });
});
