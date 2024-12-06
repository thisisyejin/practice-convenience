# 🏪 편의점
우테코 프리코스 - 편의점 결제 구현 연습
## 객체 정의
### *Product*
상품 재고 현황을 관리한다.

#### - 메서드
상품이 구매 가능한지 확인한다.   

#### - 속성
상품 이름 `name`   
가격 `price`   
수량 `quantity`   
프로모션 이름 `promotion`   
전체 `Product` 목록 `list`

---
### *Promotion*
프로모션 목록을 관리한다.

#### - 메서드
특정 프로모션이 현재 행사 기간인지 확인한다.   
특정 상품에 프로모션 적용이 가능한지 확인한다.   
프로모션 추가 증정이 가능한지 확인한다.   
재고 부족으로 인해 일부 상품에 프로모션이 미적용되는지 확인한다.

#### - 속성
프로모션 이름 `name`   
`buy`   
`get`   
행사 시작 일자 `start_date`   
행사 종료 일자 `end_date`   
전체 `Promotion` 목록 `list`

---
### *Cart*
구매 목록을 관리한다.

#### - 메서드
사용자에게 구매할 상품 목록을 묻는다.  
구매할 상품 목록의 수량을 `재고 현황`과 `프로모션 적용 여부`에 따라 조정한다.

---
### *Payment*
할인을 적용하고 금액을 계산한다.

#### - 메서드
프로모션 할인 적용 금액을 계산한다.   
멤버십 할인 적용 금액을 계산한다.   
총 지불 금액을 계산한다.

<br>

## 편의점 결제 프로세스
### 1. 상품 목록과 재고 목록을 초기화한다.
`products.md` 파일과 `promotions.md` 파일을 쉼표 단위로 파싱하고, 각각 상품 목록과 프로모션 목록으로 저장한다.
> #### 1-1. 상품 목록을 출력한다.
> 재고가 0개인 경우, `재고 없음`으로 출력한다.   
> 프로모션 재고만 있고 일반 재고는 없는 경우, 일반 재고를 `재고 없음`으로 출력한다.
### 2. 사용자로부터 구매할 상품을 입력받는다.
> 2-1. 구매할 상품 목록은 `[상품명-수량],[상품명-수량]` 형식으로 파싱한다.   
> 2-2. 올바른 형식으로 입력되었는지 확인하고, 올바른 형식이 아니면 2로 돌아간다.   
> 2-3. 구매가 가능한지 확인하고, 구매가 불가능하면 2로 돌아간다.
### 3. 구매할 상품마다 아래의 조건을 확인한다.
#### 현재 행사 기간에 해당하는 프로모션이 있는가?
> #### T : 프로모션 재고가 충분한가?
>> #### T : 추가 증정 상품을 받을 수 있는가?
>>> **프로모션 재고만 차감한다.**  
>>> T : 증정 상품 수량을 추가한다.  
>>> F : 프로모션 상품만 구매한다.
>> #### F : 수량 부족으로 인해 일부 상품에 대해 프로모션 혜택이 적용되지 않아도 괜찮은가?   
>>> **프로모션 재고를 우선 차감한다.**  
>>> T : 프로모션 재고가 부족한 만큼 일반 재고로 대신한다.   
>>> F : 프로모션 재고가 부족한 만큼 구매 수량에서 제외한다.  
> #### F : 일반 재고가 충분한가?
>> T : 일반 재고만 차감한다.    
>> F : 일반 재고가 부족한 만큼 프로모션 재고로 대신한다.  
### 4. 멤버십 할인 적용 여부를 확인한다.
멤버십 할인 적용 시, 프로모션 할인 미적용 금액에 대해 30% 할인된 가격을 계산한다.   
이때, 최대 할인 금액은 8000원을 초과할 수 없다.
### 5. 금액을 계산하고 영수증을 출력한다.
### 6. 상품 목록을 갱신한다.
구매 목록의 수량만큼 상품 목록에서 차감한다.
### 7. 추가 구매 여부를 확인한다.
추가 구매 시, **1-1**로 돌아간다.