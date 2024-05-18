# 33. 7번째 데이터 타입 Symbol

### 33.1 심벌이란 ?

- 자바스크립트에는 6개의 타입 즉, 문자열, 숫자, 불리언, undefined, null, 객체 타입이 있었다.

- 심벌은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값이다. 심벌 값은 다른 값과 중복되지 않는 유일무이한 값이다. 따라서 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

### 33.2 심벌 값의 생성

#### 33.2.1 Symbol 함수

- 심벌 값은 Symbol 함수를 호출하여 생성한다. 다른 원시값, 즉 문자열, 숫자, 불리언, undefined, null 타입의 값은 리터럴 표기법을 통해 값을 생성할 수 있지만 심벌 값은 Symbol 함수를 호출하여 생성해야 한다. 이때 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며, <b>다른 값과 절대 중복되지 않는 유일무이한 값이다.</b>

```jsx
const mySymbol = Symbol();

console.log(typeof mySymbol); //symbol

//심벌 값은 외부로 노출되지 않아 확인할 수 없다.
console.log(mySymbol); // Symbol()
```

- 생성자 함수로 객체를 생성하는 것처럼 보이지만 Symbol 함수는 String,Number, Boolean 생성자 함수와는 달리 new 연산자와 함께 호출하지 않는다. new 연산자와 함께 생성자 함수 또는 클래스를 호출하면 객체가 생성되지만 심벌 값은 변경 불가능한 원시 값이다.

```jsx
new Symbol(); // TypeError: Symbol is not a constructor
```

- Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다. 이 문자열은 생성된 심벌 값에 대한 설명으로 디버깅 용도로만 사용되며, 심벌 값 생성에 어떠한 영향도 주지 않는다. 즉 심벌 값에 대한 설명이 같더라도 생성된 심벌 값은 유일무이한 값이다.

- 심벌 값도 문자열, 숫자, 불리언과 같이 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성한다. 다음 예제의 decription 프로퍼티와 toString 메서드는 Symbol.prototype의 프로퍼티다.

```jsx
const mySymbol = Symbol("mySymbol");

console.log(mySymbol.decription); // mySymbol
console.log(mySymbol.toString()); // Symbol(mySymbol)
```

- 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.

```jsx
const mySymbol = Symbol();

console.log(mySymbol + ""); // TypeError: Cannot convert a Symbol value to a String
console.log(+mySymbol); // TypeError: Cannot convert a Symbol value to a String
```

- 단, 불리언 타입으로는 암묵적으로 타입 변환된다. 이를 통해 if문 등에서 존재 확인이 가능하다.

```jsx
const mySymbol = Symbol();

console.log(!!mySymbol); //true

if (mySymbol) console.log("mySymbol is not empty.");
```

#### 33.2.2 Symbol.for . Symbol.keyFor 메서드

- Symbol.for 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.
  - 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환한다.
  - 검색에 실패하면 새로운 심벌 값을 생성하여 Symbol.fo 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환한다.

```jsx
// 전역 심벌 레지스트릴에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for("mySymbol");
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for("mySymbol");

console.log(s1 === s1); // true
```

- Symbol 함수는 호출될 때마다 유일무이한 심벌 값을 생성한다. 이때 자바스크립트 엔진이 관리하는 심벌 값 저장소인 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로 전역 심벌 레지스트리에 등록되어 관리되지 않는다. 하지만 Symbol.for 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.

- Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

```jsx
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for("mySymbol");
Symbol.keyFor(s1); // -> mySymbol
// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s2 = Symbol("foo");
Symbol.keyFor(s2); // -> undefined
```

### 33.3 심벌과 상수

```jsx
const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log("you are going up");
}
```

- 위 예제와 같이 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우가 있다. 이때 문제는 상수 값 1,2,3,4가 변경될 수 있으며, 다른 변수 값과 중복될 수도 있다는 것이다. 이러한 경우 변경/중복될 가능성이 있는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

```jsx
const Direction = {
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log("you are going up");
}
```

#### enum

- enum은 명명된 숫자 상수(named numeric constant)의 집합으로 열거형(enumerated type)이라고 부른다. 자바스크립트는 enum을 지원하지 않지만, C, 자바 파이썬 등 여러 프로그래밍 언어와 자바스크립트 상위 확장인 타입스크립트에서는 enum을 지원한다. 자바스크립트에서 enum을 흉내 내어 사용하려면 다음과 같이 객체의 변경을 방지하기 위해 객체를 동결하는 Object.freeze 메서드와 심벌 값을 사용한다.

```jsx
// Direction 객체는 불변 객체이며 프로퍼티 값은 유일무이한 값이다.
const Direction = Object.freeze({
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
});

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log("you are going up");
}
```

### 33.4 심벌과 프로퍼티 키

- 객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열 또는 심벌 값으로 만들 수 있으며, 동적으로 생성할 수도 있다.

- 심벌 값으로 프로퍼티 키를 동적 생성하여 프로퍼티를 만들어 보자. 심벌 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심벌 값에 대괄호를 사용해야 한다. 프로퍼티에 접근할 때도 마찬가지로 대괄호를 사용해야 한다.

```jsx
const obj = {
  [Symbol.for("mySymbol")]: 1,
};
obj[Symbol.for("mySymbol")]; // -> 1
```

- <b>심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.</b> 기존 프로퍼티 키와 충돌하지 않는 것은 물론, 미래에 추가될 어떤 프로퍼티 키와도 충돌할 위험이 없다.

### 33.5 심벌과 프로퍼티 은닉

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for ... in 문이나 Object.keys, Object.getOwnPropertyNames 메서드로 찾을 수 없다. 이처럼 심벌 값을 프로퍼티 키로 사용하여 프로퍼티를 생성하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

- 하지만 프로퍼티를 완전하게 숨길 수 있는 것은 아니다. ES6에서 도입된 Object.getOwnPropertySymbols 메서드를 사용하면 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있다.

### 33.6 심벌과 표준 빌트인 객체 확장

- 일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않는다. 왜냐하면 사용자가 직접 추가한 메서드와 미래에 표준 사양으로 추가될 메서드의 이름이 중복될 수 있기 때문이다.

- 하지만 중복될 가능성이 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는 것은 물론, 표준 사양의 버전이 올라감에 따라 추가될지 모르는 어떤 프로퍼티 키와도 충돌할 위험이 없어 안전하게 표준 빌트인 객체를 확장할 수 있다.

### 33.7 Well-known Symbol

- 자바스크립트가 기본 제공하는 빌트인 심벌 값이 있다. 빌트인 심벌 값은 Symbol 함수의 프로퍼티에 할당되어 있다. 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 Well-known Symbol이라 부른다. 이는 자바스크립트 엔진의 내부 알고리즘에 사용된다. -> Symbol.iterator

- Symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 ECMAScript 사양에 규정되어 있다. 빌트인 이터러블은 이러한 규정을 뜻하는 이터레이션 프로토콜을 준수한다.

- 만약 빌트인 이터러블이 아닌 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다. Well-known Symbol인 Symbol.iterator를 키로 가지는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면 그 객체는 이터러블이 된다.

```jsx
const iterable = {
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      },
    };
  },
};

for (const num of iterable) {
  console.log(num);
}
```

- 이터레이션 프로토콜을 준수하기 위해 일반 객체에 추가해야 하는 메서드의 키 Symbol.iterator는 기존 프로퍼티 키 또는 미래에 추가될 프로퍼티 키와 절대로 중복되지 않을 것이다.
- 이처럼 심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었다.

# 면접 예상 질문

## 💥

# 이야기하고 싶은 것
