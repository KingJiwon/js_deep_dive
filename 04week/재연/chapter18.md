# 18. 함수와 일급 객체

### 18.1 일급 객체

- 일급 객체의 정의

  1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
  2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
  3. 함수의 매개변수에 전달할 수 있다.
  4. 함수의 반환값으로 사용할 수 있다.

- 자바스크립트의 함수는 위의 조건을 모두 만족하므로 일급 객체이다.
- 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미
- 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.
- 일급 객체로서 함수가 가지는 가장 큰 특징은 일반 객체와 같이 함수의 매개변수에 전달할 수 있으며, 함수의 반환값으로 사용할 수도 있다는 것
  - 이는 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점 중 하나이다.
- 함수와 일반 객체와의 차이는 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있다는 점, 그리고 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다는 점

### 18.2 함수 객체의 프로퍼티

- 어떠한 함수를 정의하고 해당 함수를 console.dir를 통해 검사하면 함수 객체의 프로퍼티를 확인할 수 있다.
  - [함수 객체의 고유 프로퍼티]
    - arguments
    - caller
    - length
    - name
    - prototype

#### 18.2.1 arguments 프로퍼티

- 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 <b>유사 배열</b> 객체이며, 함수 내부에서 <b>지역 변수</b>처럼 사용된다.
- 함수를 정의할 때 선언한 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급된다.

  - 함수 호출 --> 암묵적으로 매개변수 선언 --> undefined로 초기화 --> 인수 할당

- arguments 객체의 Symbol(Symbol.iterator) 프로퍼티
  - arguments 객체를 순회 가능한 자료구조인 이터러블(iterable)로 만들기 위한 프로퍼티이다. Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하는 것에 의해 이터러블이 된다.

```jsx
function multipliy(x, y) {
  //이터레이터
  const iterator = arguments[Symbol.iterator]();

  //이터레이터의 next 메서드를 호출하여 이터러블 객체 arguments를 순회
  console.log(iterator.next()); //{value:1, done:false}
  console.log(iterator.next()); //{value:2, done:false}
  console.log(iterator.next()); //{value:3, done:false}
  console.log(iterator.next()); //{value:undefined, done:true}

  return x * y;
}

multiply(1, 2, 3);
```

- arguments 객체는 매개변수의 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

- 유사 배열 객체와 이터러블

  - ES6에서 도입된 이터레이션 프로토콜을 준수하면 순회 가능한 자료구조인 이터러블이 된다. 이터러블 개념이 없던 ES5에서 arguments 객체는 유사 배열 객체로 구분되었다.<br>하지만 이터러블이 도입된 ES6부터 arguments 객체는 유사 배열 객체이면서 동시에 이터러블이다.

- 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생한다.(스니펫에도 안뜸) 따라서 배열 메서드를 사용하려면 Function.prototype.call , Function.prototype.apply를 사용해 간접 호출해야 하는 번거로움이 있다.

```jsx
function sum() {
  const array = Array.prototype.slice.call(arguments); // [...arguments] , Array(...arguments), Array.from(arguments) 와 동일함
  return array.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3, 4, 5)); //15
```

- 이러한 번거로움을 해결하기 위해 ES6에서는 Rest 파라미터를 도입했다.

```jsx
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3, 4, 5)); //15
```

#### 18.2.2 caller 프로퍼티

- ECMAScript 사양에 포함되지 않은 비표준 프로퍼티이다.
- 함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

#### 18.2.3 length 프로퍼티

- 함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
- arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티의 값은 다를 수 있으므로 주의해야 한다.
- arguments 객체의 length 프로퍼티는 인자의 개수를 가리키고 함수 객체의 length 프로퍼티는 매개 변수의 개수를 가리킨다.

#### 18.2.4 name 프로퍼티

- 함수 객체의 name 프로퍼티는 함수 이름을 나타낸다.

#### 18.2.5 **proto** 접근자 프로퍼티

- 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 갖는다. [[Prototype]] 내부 슬롯은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.
- **proto** 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티이다.
  <br> 내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근할 수 있다.

```jsx
const obj = { a: 1 };
//객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype 이다.
console.log(obj.__proto__ === Object.prototype); //true

//객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
//hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty("a")); //true
console.log(obj.hasOwnProperty("__proto__")); //false
```

- hasOwnProperty 메서드
  - hasOwnProperty는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

#### 18.2.6 prototype 프로퍼티

- 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티이다.
- 일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없다.
- 함수가 객체를 생성하는 생성자 함수로 호출 될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

# 면접 예상 질문

## 💥일급 객체란 무엇인가요?

- 런타임에 생성이 가능하며 변수나 자료구조(객체, 배열 등)에 저장할 수 있고, 함수의 매개변수에 전달 가능하며 함수의 반환 값으로 사용할 수 있는 객체를 뜻합니다.

## 💥함수 객체의 arguments 프로퍼티에 대해 설명해주세요.

- 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용됩니다.
  <br> arguments 객체는 매개변수의 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용합니다.

# 이야기하고 싶은 것
