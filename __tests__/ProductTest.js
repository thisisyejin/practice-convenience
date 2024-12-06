import Product from "../src/Product.js";

describe('상품 테스트', () => {
  Product.initialize();

  test.each([
    // 입력 받은 상품이 구매 가능한지 확인한다.
    ['입력 받은 상품이 존재하지 않으면 에러를 발생시킨다.', { name: '환타', need: 3, }],
    ['입력 받은 수량이 재고를 초과하면 에러를 발생시킨다.', { name: '콜라', need: 100, }],
  ])('%s', (_, item) => {
    expect(() => Product.isAvailable(item)).toThrow('[ERROR]');
  });

  test.each([
    ['프로모션 재고가 있으면 해당 프로모션의 이름을 반환한다.', '감자칩', '반짝할인'],
    ['해당하는 프로모션이 없으면 반환하지 않는다.', '정식도시락', undefined]
  ])('%s', (_, productName, promotionName) => {
    expect(Product.searchPromotion(productName)).toBe(promotionName);
  });

  test.each([
    ['프로모션이 있는 경우, 재고를 길이가 2인 배열 형식으로 반환한다.', '콜라', { promoStock: 10, regularStock: 10 }],
    ['프로모션이 없는 경우, 재고를 길이가 1인 배열 형식으로 반환한다.', '정식도시락', { promoStock: 0, regularStock: 8 }],
  ])('%s', (_, productName, result) => {
    expect(Product.getQuantity(productName)).toEqual(result);
  });
});
