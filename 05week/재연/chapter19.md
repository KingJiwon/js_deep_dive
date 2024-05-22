# 19. 프로토타입

- 자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어이다.

- C++ 나 자바 같은 클래스 기반 객체지향 프로그래밍 언어의 특징인 클래스와 상속, 캡슐화를 위한 키워드인 public, private, protected 등이 없어서 자바스크립트는 객체지향 언어가 아니라고 오해를 받기도 하지만, 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 프로토타입 기반의 객체지향 프로그래밍 언어이다.

- 클래스(class)
  - ES6에서 클래스 문법이 도입되었지만, 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새로운 객체지향 모델을 제공하는 것은 아니다. 사실 클래스도 함수이며 프로토타입 기반 패턴의 문법적 설탕이라고 볼 수 있다.
  - 클래스와 생성자 함수 모두 프로토타입 기반의 인스턴스를 생성하지만 동일하게 동작하지는 않는다. 클래스는 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능도 제공한다. 따라서 클래스를 단순히 프로토타입 기반 패턴의 문법적 설탕이라고 보기 보다는 새로운 객체 생성 메커니즘으로 보는 것이 좀 더 합당하다고 볼 수 있다.
- 자바스크립트는 객체 기반의 프로그래밍 언어이며 <b>자바스크립트를 이루고 있는 거의 "모든 것"이 객체다.</b> 원시 타입의 값을 제외한 나머지 값들 (함수, 배열, 정규표현식 등)은 모두 객체이다.

### 19.1 객체지향 프로그래밍

- 객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

- 객체지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다. 실체는 특성이나 성질을 나타내는 <b>속성(attribute/property)</b>을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

- 사람에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 "이름"과 "주소"라는 속성에만 관심이 있다고 가정하자. 이처럼 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 <b>추상화(abstraction)</b>라고 한다.

```jsx
const person = {
  name: "Yang",
  address: "Daejeon",
};
console.log(person); // {name: "Yang", address: "Daejeon"}
```

- <b>속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조</b>를 객체라 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.

- 객체지향 프로그래밍은 객체의 <b>상태(state)</b>를 나타내는 데이터와 상태 데이터를 조작할 수 있는 <b>동작(be-havior)</b>을 하나의 논리적인 단위로 묶어 생각한다.
- 객체 === 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조
  객체의 상태를 프로퍼티(property), 동작을 메서드(method)라고 부른다.

### 19.2 상속과 프로토타입

- 상속(inheritance)은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

- 자바스크립트는 프로토타입 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다.

```jsx
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    //Math.PI는 원주율을 담은 상수
    return Math.PI * this.radius ** 2;
  };
}
const circle1 = new Circle(1);
const circle2 = new Circle(2);
/**
 Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
 getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
*/
console.log(circle1.getArea === circle2.getArea); // false
```

- 위 예제코드에서 getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하므로 단 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다. 그러나 Circle 생성자 함수는 인스턴스를 생서할 때마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.

- 상속을 통해 불필요한 중복을 제거해보자. 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

```jsx
function Circle(radius) {
  this.radius = radius;
}
/**
 Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
 공유해서 사용할 수 있도록 프로토타입에 추가한다.
 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
*/
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};
const circle1 = new Circle(1);
const circle2 = new Circle(2);
// Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); //true
```

- 상속은 코드의 재사용 관점에서 매우 유용하다. 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.

### 19.3 프로토타입 객체

- 프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다. 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체의 공유 프로퍼티(메서드 포함)를 제공한다.

- 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있음)다. [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 즉 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다.

- 객체 리터럴에 의해 생서된 객체의 프로토타입은 Object.prototype이고 생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체이다.

- 모든 객체는 하나의 프로토타입을 가진다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.

#### 19.3.1 **proto** 접근자 프로퍼티

- 모든 객체는 **proto** 접근자 프로퍼티를 통해 자신의 프로토타입, 즉[[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.

- Object.prototype의 접근자 프로퍼티인 **proto** 를 통해 프로토타입에 접근하면 내부적으로 **proto** 접근자 프로퍼티의 getter 함수인 [[Get]]이 호출된다. **proto** 접근자 프로퍼티를 통해 새로운 프로토타입을 할당하면 **proto** 접근자 프로퍼티의 setter 함수인 [[Set]]이 호출된다.

```jsx
const obj = {};
const parent = { x: 1 };

//getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
//setter 함수인 set __proto__가 호출되오 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```

- **proto** 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티이다. 모든 객체는 상속을 통해 Object.prototype.**proto** 접근자 프로퍼티를 사용할 수 있다.

- Object.prototype

  - 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다. 자바스크립트 엔진은 객체의 프로퍼티에 접근 하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 **proto** 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
    프로토타입 체인의 종점, 프로토타입 체인의 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속된다.

- **proto** 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
- [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.

```jsx
const parent = {};
const child = {};
//child의 프로토타입을 parent로 설정
child.__proto__ = parent;
//parent의 프로토타입을 childe로 설정
parent.__proto__ = child; //TypeError: Cyclic __proto__ value
```

- 프로토타입 체인은 단반향 연결 리스트로 구현되어야 한다. 즉 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야하지만 위 예제처럼 서로가 자신의 프로토타입이 되는 순환 참조하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠지게 된다. 따라서 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 **proto** 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체할 수 있도록 구현되어 있다.

- **proto** 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다. 왜냐하면 모든 객체가 **proto** 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다. 직접 상속을 통해 다음과 같이 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문에 **proto** 접근자 프로퍼티를 사용할 수 없는 경우가 있다.

```jsx
//obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);
// obj는 Object.__proto__ 를 상속받을 수 없다.
console.log(obj.__proto__); // undefined
// 따라서 __proto__ 보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

- 따라서 **proto** 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.

```jsx
const obj = {};
const parent = { x: 1 };

Object.getPrototypeOf(obj); //obj.__proto__;
Object.setPrototypeOf(obj, parent); //obj.__proto__ = parent;

console.log(obj.x); // 1
```

#### 19.3.2 함수 객체의 prototype 프로퍼티

- <b>함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.</b>

```jsx
(function () {}).hasOwnProperty("prototype"); // -> true
({}).hasOwnProperty("prototype"); // -> false
```

- 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

- 생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없다.

- <b>모든 객체가 가지고 있는 (Object.prototype 으로부터 상속받은) **proto** 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다. 하지만 프로퍼티를 사용하는 주체가 다른다.</b>

<table>
   <tbody>
   <tr>
     <td>구분</td><td>소유</td><td>값</td><td>사용 주체</td><td>사용 목적</td>
   </tr>
    <tr>
        <td>__proto__ 접근자 프로퍼티</td>
        <td>모든 객체</td>
        <td>프로토타입의 참조</td>
        <td>모든 객체</td>
        <td>객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용</td>
    </tr>
    <tr>
        <td>prototype 프로퍼티</td>
        <td>constructor</td>
        <td>프로토타입의 참조</td>
        <td>생성자 함수</td>
        <td>생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용</td>
    </tr>
   </tbody> 
</table>

```jsx
function Person(name) {
  this.name = name;
}
const me = new Person("Yang");
//Person.prototype 과 me.__proto__ 는 결국 동일한 프로토타입을 가리킨다.
```

#### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

- 모든 프로토타입은 constructor 프로퍼티를 가진다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.
  이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.

```jsx
function Person(name) {
  this.name = name;
}
const me = new Person("Yang");
// me 객체의 생성자 함수는 Person 이다.
console.log(me.constructor === Person); // true
```

### 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

- 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

- 리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재한다. 하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

```jsx
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true;
```

- 그렇다면 객체 리터럴에 의해 생성된 객체는 사실 Object 생성자 함수로 생성되는 것은 아닐까?

  - Object 생성자 함수에 인수를 전달하지 않거나 undefined 혹은 null을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 OrdinaryObjectCreate를 호출하여 Object.prototype을 프로토타입으로 가지는 빈 객체를 생성한다.

- 추상연산

  - 추상 연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것이다. ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사코드라고 이해해야한다.

- Function 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않는다. 따라서 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Function 생성자 함수가 아니다. 하지만 constructor 프로퍼티를 통해 확인해보면 foo 함수의 생성자 함수는 Function 생성자 함수다.

```jsx
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

- 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 가진다.
  프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다. 다시 말해 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

- 리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니다. 하지만 큰 틀에서는 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없다.

- 따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 무리는 없다.

### 19.5 프로토타입의 생성 시점

- 객체는 리터럴 표기법 또는 생성자 함수에 의해 생서되므로 결국 모든 객체는 생성자 함수와 연결되어 있다.

- Object.create 메서드와 클래스에 의한 객체 생성

  - Object.create 메서드와 클래스로 객체를 생성하는 방법도 있다. Object.create 메서드와 클래스로 생성한 객체도 생성자 함수와 연결되어 있다.

- <b>프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.</b> 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

- 생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본적으로 제공하는 빌트인 생성자 함수로 구분할 수 있다.

#### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

- 내부 메서드 [[Constructor]]를 가지는 함수 객체, 즉 화살표 함수나 ES6의 메서드 축약 표현으로 정의하지 않고 일반 함수(함수 선언무, 함수 표현식)로 정의한 함수 객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있다.

- <b>생성자 함수로섯 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.</b>

```jsx
//함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: f}

function Person(name) {
  this.name = name;
}

const Person2 = (name) => {
  this.name = name;
};
// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person2.prototype); // undefined
```

- 함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다. 따라서 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다. 이때 프로토타입도 더불어 생성된다. 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩된다.

- 생성된 프로토타입은 오로지 constructor 프로퍼티만을 가지는 객체이다. 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 가진다. 생성된 프로토타입의 프로토타입은 Object.prototype 이다.
  빌트인 생성자가 함수가 아닌 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체롤 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype 이다.

#### 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점

- 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

- 전역객체

  - 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체다. 전역 객체는 표준 빌트인 객체들과 환경에 따른 호스트 객체(클라이언트 Web API 또는 Node.js의 호스트 API) 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 가진다. Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수다.

- 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. <b>이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다.</b> 이로써 생성된 객체는 프로토타입을 상속받는다.

### 19.6 객체 생성 방식과 프로토타입 결정

- 객체는 다음과 같이 다양한 생성 방법이 있다.
    <ul>
       <li>객체 리터럴</li>
       <li>Object 생성자 함수</li>  
       <li>생성자 함수 (사용자 정의)</li> 
       <li>Object.create 메서드</li> 
       <li>클래스 (ES6)</li> 
    </ul>
- 이처럼 다양한 방식으로 생성된 모든 객체는 각 방식마다 세부적인 객체 생성 방식의 차이는 있으나 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다.
- 추상 연산 OrdinaryObjectCreate는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달 받는다. 그리고 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다. 추상 연산 OrdinaryObjectCreate는 빈 객체를 생성한 후, 객체에 추가할 프로퍼티 목록이 인수로 전달도니 경우 프로퍼티를 객체에 추가한다. 그리고 인수롤 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당한 다음, 생성한 객체를 반환한다.
  즉, 프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다. 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

#### 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

- 자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate를 호출한다. 이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 Object.prototype이다. 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.

#### 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

- Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다. Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 OrdinaryObjectCreate가 호출된다. 이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 Object.prototype이다. 즉, Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.

#### 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입

- new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate가 호출 된다. 이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다. 즉, 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.

### 19.7 프로토타입 체인

```jsx
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Yang");
//hasOwnProperty는 Object.prototype의 메서드이다.
console.log(me.hasOwnProperty("name")); //true
```

- Person 생성자 함수에 의해 생성된 me 객체는 Object.prototype의 메서드인 hasOwnProperty를 호출할 수 있다. 이것은 me 객체가 Person.prototype뿐만 아니라 Object.prototype도 상속받았다는 것을 의미한다. me 객체의 프로토타입은 Person.prototype이다.

- Person.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다.

- <b>자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라한다. 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.</b>

- 프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서 모든 객체는 Object.prototype을 상속받는다. <b>Object.prototype을 프로토타입 체인의 종점</b>이라고 한다. Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 null 이다.

- 프로토타입 체인의 종점인 Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다. 이때 에러가 발생하지 않는다.

- <b>프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이라고 정의할 수 있다.</b> 이에 반해 프로퍼티가 아닌 식별자는 스코프 체인에서 검색한다. 다시 말해, 자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색한다. 따라서 <b>스코프 체인은 식별자 검색을 위한 메커니즘</b>이라고 할 수 있다.

```jsx
me.hasOwnProperty("name");
```

- 위 예제의 경우, 먼저 스코프 체인에서 me 식별자를 검색한다. me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색된다. me 식별자를 검색한 다음, me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색한다.

- 이처럼 <b>스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다.</b>

### 19.8 오버라이딩과 프로퍼티 섀도잉

```jsx
const Person = (function () {
  //생성자 함수
  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  return Person;
})();

const me = new Person("Yang");

//인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

me.sayHello(); // Hey! My name is Lee
```

- 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다. 이때 인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 오버라이딩했고 프로토타입 메서드 sayHello는 가려진다. 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라고 한다.

- 오버라이딩
  - 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식이다.
- 오버로딩 (???)

  - 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식이다. 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있다.

- 프로퍼티를 삭제하는 경우도 마찬가지다.
- delete 키워드를 통해 me.sayHello를 삭제하면 인스턴스의 sayHello 메서드가 삭제되지만 이를 다시 한번 더 시도한다고 해서 프로토타입의 sayHello 메서드가 삭제 되지는 않는다.

- 이와 같이 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다. 다시 말해 하위 객체를 통해 프로토타입에 get 엑세스는 허용되나 set 엑세스는 허용되지 않는다.

- 프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 한다.

### 19.9 프로토타입의 교체

- 프로토타입은 동적으로 임의의 다른 객체로 변경할 수 있고 이러한 특징을 활용하여 객체 간의 상속 관계를 동적으로 변경할 수 있다. 프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있다.

#### 19.9.1 생성자 함수에 의한 프로토타입 교체

- 프로토타입을 임의의 객체 리터럴로 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 이 연결을 되살리려면 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 이전 생성자 함수를 값으로 부여하면 된다.

#### 19.9.2 인스턴스에 의한 프로토타입 교체

- 프로토타입은 인스턴스의 **proto** 접근자 프로퍼티(혹은 Object.getPrototypeOf 메서드)를 통해 접근할 수 있다. 따라서 인스턴스의 **proto** 접근자 프로퍼티를 통해 프로토타입을 교체할 수 있다.

- 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다. **proto** 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.

- 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 꽤나 번거로워, 프로토타입은 직접 교체하지 않는 것이 좋다. 상속 관계를 인위적으로 설정하려면 직접 상속이 더 편리하고 안전하다. 혹은 ES6에서 도입된 클래스를 사용하면 간편하고 직관적으로 상속관계를 구현할 수 있다. (\*super)

### 19.10 instanceof 연산자

- 이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 만약 우변의 피연산자가 함수가 아닌 경우 TypeError가 발생한다.

- <b>우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고, 그렇지 않은 경우에는 false로 평가된다.</b>

- instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 <b>생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.</b>

### 19.11 직접 상속

#### 19.11.1 Object.create.에 의한 직접 상속

- Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다. Object.create 메서드도 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출한다.

- Object.create 메서드의 첫 번째 매개변수에는 생서할 객체의 프로토타입으로 지정할 객체를 전달한다. 두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이루어진 객체를 전달한다. 이 객체의 형식은 Object.defineProperties 메서드의 두 번째 인수와 동일하다. 두 번째 인수는 옵션이므로 생략 가능하다.

```jsx
/**
 * 지정된 프로토타입 및 프로퍼티를 가지는 새로운 객체를 생성하여 반환한다.
 * @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
 * @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 가지는 객체
 * @returns {Object} 지정된 프로토타입 및 프로퍼티를 가지는 새로운 객체
 */
Object.create(prototype, [propertiesObject]);
// 프로토타입이 null 인 객체를 생성, 생성된 객체는 프로토타입 체인의 종점에 위치한다. obj -> null
let obj = Objecet.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
//Object.prototype을 상속받지 못한다.
console.log(obj.toString()); //TypeError: obj.toString is not a function

// obj -> Object.prototype -> null
// obj = {}; 와 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); //true

// obj -> Object.prototype -> null
// obj = {x: 1 }; 와 동일하다.
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
// 위 코드는 아래와 동일하다.
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); //true

const myProto = { x: 10 };
//임의의 객체를 직접 상속받는다.
//obj -> myProto -> Object.prototype -> null
obj = Object.create(myProto);
console.log(obj.x); //10
console.log(Object.getPrototypeOf(obj) === myProto); // true

//생성자 함수
function Person(name) {
  this.name = name;
}
// obj -> Person.prototype -> Object.prototype -> null
// obj = new Person("Yang")과 동일하다.
obj = Object.create(Person.prototype);
obj.name = "Yang";
console.log(obj.name); // Yang
console.log(Object.getPrototypeOf(obj) === Person.prototype); //true
```

- Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다. 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것이다.

- 이 메서드의 장점은 아래와 같다.

  - 1. new 연산자가 없어도 객체를 생성할 수 있다.
  - 2. 프로토타입을 지정하면서 객체를 생성할 수 있다.
  - 3. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

- ESLint 에서는 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않는다. 그 이유는 Object.create 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문이다. 프로토타입 체인의 종점에 위치하는 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없다.

- 따라서 Object.prototype의 빌트인 메서드는 다음과 같이 간접적으로 호출하는 것이 좋다.

```jsx
// 프로토타입이 null인 객체를 생성한다.
const obj = Object.create(null);
obj.a = 1;
// console.log(obj.hasOwnProperty("a"));
// TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않는다.
console.log(Object.prototype.hasOwnProperty.call(obj, "a")); //true
```

#### 19.11.2 객체 리터럴 내부에서 **proto**에 의한 직접 상속

- Object.create 메서드에 의한 직접 상속은 앞에서 다룬 것과 같이 여러 장점이 있다. 하지만 두 번째 인자로 프로퍼티를 정의하는 것은 번거롭다. 일단 객체를 생성한 이후 프로퍼티를 추가하는 방법도 있으나 이 또한 깔끔한 방법은 아니다.

- ES6에서는 객체 리터럴 내부에서 **proto** 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

```jsx
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  //객체를 직접 상속받는다.
  // obj -> myProto -> Object.prototype -> null
  __proto__: myProto,
};
/** 위 코드는 아래와 동일하다. 
 const obj = Object.create(myProto, {
    y:{value: 20, writable: true, enumerable: true, configurable: true}
 });
*/
console.log(obj.x, obj.y); //10 20
console.log(Object.getPrototypeOf(obj) === Myproto); //true
```

### 19.12 정적 프로퍼티/메서드

- 정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다.

```jsx
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};
// 정적 프로퍼티
Person.staticProp = "static prop";
// 정적 메서드
Person.staticMethod = function () {
  console.log("staticMethod");
};

const me = new Person("Yang");

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); //TypeError: me.staticMethod is not a function
```

- Person 생성자 함수는 객체이므로 자신의 프로퍼티/메서드를 소유할 수 있다. Person 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 한다. 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.

- 생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있다. 하지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없다.

- Object.create 메서드는 Object 생성자 함수의 정적 메서드이고 Object.prototype.hasOwnProperty 메서드는 Object.prototype의 메서드다. 따라서 Object.create 메서드는 인스턴스, 즉 Object 생성자 함수가 생성한 객체로 호출할 수 없다. 하지만 Object.prototype.hasOwnProperty 메서드는 모든 객체의 프로토타입 체인의 종점, 즉 Object.prototype의 메서드이므로 모든 객체가 호출할 수 있다.

```jsx
// Object.create는 정적 메서드다.
const obj = Object.create({ name: "Yang" });

// Object.prototype.hasOwnProperty는 프로토타입 메서드다.
obj.hasOwnProperty("name"); // -> false
```

- 만약 인스턴스/프로토타입 메서드 내에서 this를 사용하지 않는다면 그 메서드는 정적 메서드로 변경할 수 있다. 인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 this는 인스턴스를 가리킨다. 메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경하여도 동작한다. 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 하지만 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.

```jsx
function Foo() {}

// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메서드는 정적 메서드로 변경하여도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
  console.log("x");
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); //x

// 정적 메서드
Foo.x = function () {
  console.log("x");
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x();
```

### 19.13 프로퍼티 존재 확인

#### 19.13.1 in 연산자

- in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다. in 연산자의 사용법은 다음과 같다.

```jsx
/**
 * key: 프로퍼티 키를 나타내는 문자열
 * object: 객체로 평가되는 표현식
 */
// key in object;
const person = {
  name: "Yang",
  address: "Seoul",
};

//Person 객체에 name 프로퍼티가 존재한다.
console.log("name" in person); //true
console.log("address" in person); // true
console.log("age" in person); // false
```

- in 연산자는 확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인하므로 주의가 필요하다. person 객체에는 toString이라는 프로퍼티가 없지만 다음 코드의 실행 결과는 true 다.

```jsx
console.log("toString" in person); //true
```

- in 연산자 대신 ES6에서 도입된 Reflect.has 메서드를 사용할 수도 있다. Reflect.has 메서드는 in 연산자와 동일하게 동작한다.

```jsx
const person = { name: "Yang" };

console.log(Reflect.has(person, "name")); // true
console.log(Reflect.has(person, "toString")); //true
```

#### 19.13.2 Object.prototype.hasOwnProperty 메서드

- Object.prototype.hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

### 19.14 프로퍼티 열거

#### 19.14.1 for...in 문

- 객체의 모든 프로퍼티를 순회하며 열거하려면 for...in 문을 사용한다.
- 객체의 프로퍼티 개수만큼 순회하며 for...in문의 변수 선언문에서 선언한 변수에 프로퍼티키를 할당한다. in 연산자처럼 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다.
- 하지만 프로퍼티 어트리뷰트의 [[Enumerable]]의 값이 true인 것만 열거되기 때문에 Object.prototype로부터 상속받은 프로퍼티들은 대부분 열거되지 않는다.
- <b>객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거한다.</b>
- 상속받은 프로퍼티를 제외하고 객체 자신의 고유한 프로퍼티만 열거하려면 Object.prototype.hasOwnProperty 메서드를 사용하여 확인한다.

```jsx
const person = {
  name: "Yang",
  address: "Seoul",
  __proto__: { age: 20 },
};

for (const key in person) {
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ":" + person[key]);
}
// name: Yang
// address: Seoul
```

- for...in 문은 프로퍼티를 열거할 때 순서를 보장하지 않으므로 주의해야한다. 하지만 대부분의 모던 브라우저는 순서를 보장하고 숫자(사실은 문자열)인 프로퍼티 키에 대해서는 정렬을 실시한다.

#### 19.14.2 Object.keys/values/entries

- 객체 자신의 고유 프로퍼티만 열거하기 위해서는 for...in 문을 사용하기 보다는 Object.keys/values/entries 메서드를 사용하는 것을 권장한다.

```jsx
const person = {
  name: "Yang",
  address: "Seoul",
  __proto__: { age: 20 },
};
console.log(Object.keys(person)); // ["name", "address"]
console.log(Object.values(person)); // ["Yang", "Seoul"]
console.log(Object.entries(person)); // [["name","Yang"], ["address", "Seoul"]]

Object.entries(person).forEach(([key,value]=> console.log(key,value)))
/** name Lee
 address Seoul
 */
```

# 면접 예상 질문

## 💥 자바스크립트는 객체지향 프로그래밍 언어가 아닌가요?.

- 그것은 public, private 등 클래스와 상속, 캡슐화를 위한 키워드를 제공하지 않기(자바스크립트의 superset인 typescript에서 제공함) 때문에 생기는 오해이고, 자바스크립트는 클래스 기반의 패턴이 아닌 더 효율적이며 강력한 프로토타입 기반의 객체지향 프로그래밍 패턴을 제공한다.

## 💥객체지향 프로그래밍에 대해 설명해주세요.

- 프로그램을 명령어 또는 함수의 목록으로 보는 절차지향적 프로그래밍의 관점에서 벗어나 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

## 💥 Object.create 메서드로 객체를 만들었을 때의 장단점을 설명해주세요.

- 1.  new 연산자가 없어도 객체를 생성할 수 있다.
- 2. 프로토타입을 지정하면서 객체를 생성할 수 있다.
- 3. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

- 단점이라면 두 번째 인수로 프로토타입을 지정하는것이 번거롭다는 점이 있다.

## 💥 프로토타입 객체에 대해서 설명해주세요.

- 프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다. 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체의 공유 프로퍼티(메서드 포함)를 제공한다.

# 이야기하고 싶은 것
