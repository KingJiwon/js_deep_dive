# 25. 클래스

### 25.1 클래스는 프로토타입의 문법적 설탕인가?

- 자바스크립트는 프로토타입 기반 객체지향 언어이다. 프로토타입 객체지향 언어는 클래스가 필요 없는 객체지향 프로그래밍 언어다. ES5에서는 클래스 없이도 다음과 같이 생성자 함수와 프로토타입을 통해 객체지향 언어의 상속을 구현할 수 있다.

```jsx
var Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHi = function () {
    console.log(`Hi my name is ${this.name}`);
  };

  return Person;
})();

var me = new Person("yang");
me.sayHi(); // Hi my name is yang
```

- ES6에서 도입된 클래스는 기존 프로토타입 기반 객체지향 프로그래밍보다 자바나 C#과 같은 클래스 기반 객체지향 프로그래밍에 익숙한 프로그래머가 더욱 빠르게 학습할 수 있도록 클래스 기반 객체지향 프로그래밍 언어와 매우 흡사한 새로운 생성 메커니즘을 제시한다.

- 그렇다고 ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새롭게 클래스 기반 객체지향 모델을 제공하는 것은 아니다. 사실 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕이라고 볼 수도 있다.

- 단, 클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 않는다. 클래스는 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능도 제공한다.

- 클래스는 생성자 함수와 매우 유사하게 동작하지만 다음과 같이 몇 가지 차이가 있다.

  - 1. 클래스를 new 연산자 없이 호출하면 에러가 발생한다. 하지만 생성자 함수를 new 연산자 없이 호출하면 일반 함수로서 호출된다.
  - 2. 클래스는 상속을 지원하는 extends와 super 키워드를 제공한다. 하지만 생성자 함수는 extends와 super 키워드를 지원하지 않는다.
  - 3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다. 하지만 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자 함수는 변수 호이스팅이 발생한다.
  - 4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행되며 strict mode를 해제할 수 없다. 하지만 생성자 함수는 암묵적으로 strict mode가 지정되지 않는다.
  - 5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. 다시 말해, 열거되지 않는다.

- 생성자 함수와 클래스는 프로토타입 기반의 객체지향을 구현했다는 점에서 매우 유사하다. 하지만 클래스는 생성자 함수 기반의 객체 생성 방식보다 견고하고 명료하다. 특히 클래스의 extends와 super 키워드는 상속 관계 구현을 더욱 간결하고 명료하게 한다.

- 따라서 클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕이라고 보기보다는 <b>새로운 객체 생성 메커니즘</b>으로 보는 것이 좀 더 합당하다.

### 25.2 클래스 정의

- 클래스는 class 키워드를 사용하여 정의하며, 생성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적이다. 파스칼 케이스를 사용하지 않아도 에러가 발생하지는 않는다.

```jsx
class Person {}
```

- 일반적이지 않지만 함수와 마찬가지로 표현식으로 클래스를 정의할 수도 있다. 이때 클래스는 함수와 마찬가지로 이름을 가질 수도 있고, 갖지 않을 수도 있다.

```jsx
//익명 클래스 표현식
const Person = class {};

//기명 클래스 표현식
const Person = class MyClass {};
```

- 클래스를 표현식으로 정의할 수 있다는 것은 클래스가 값으로 사용할 수 있는 일급 객체라는 것을 의미한다. 즉, 클래스는 일급 객체로서 다음과 같은 특징을 가진다.

  - 1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
  - 2. 변수나 자료구조(객체, 개별 등)에 저장할 수 있다.
  - 3. 함수의 매개변수에게 전달할 수 있다.
  - 4. 함수의 반환값으로 사용할 수 있다.

- 좀 더 자세히 말하자면 클래스는 함수다. 따라서 클래스는 값처럼 사용할 수 있는 일급 객체다.

- 클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 constructor, 프로토타입 메서드, 정적 메서드의 세 가지가 있다.

```jsx
// 클래스 선언문
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public 하다.
  }

  //프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  //정적 메서드
  static sayHello() {
    console.log("Hello");
  }
}

//인스턴스 생성
const me = new Person("yang");

//인스턴스의 프로퍼티 참조
console.log(me.name); //yang
//프로토타입 메서드 호출
me.sayHi(); // Hi! My name is yang
//정적 메서드 호출
Person.sayHello(); //Hello!
```

### 25.3 클래스 호이스팅

- 클래스는 함수로 평가된다.

```jsx
class Person {}
console.log(typeof Person); // function
```

- 클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다. 이때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수, 즉 constructor이다. 생성자 함수로서 호출할 수 있는 함수는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다. 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

- <b>단, 클래스는 클래스 정의 이전에 참조할 수 없다.</b>

```jsx
console.log(Person);
//ReferenceError: Cannot access 'Person' before initialization

//클래스 선언문
class Person {}
```

- 클래스 선언문은 마치 호이스팅이 발생하지 않는 것처럼 보이나 그렇지 않다.

```jsx
const Person = "";
{
  //호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
  console.log(Person);
  //ReferenceError: Cannot access 'Person' before initialization

  class Person {}
}
```

- 클래스 선언문도 변수, 함수와 마찬가지로 호이스팅이 발생한다. 단 클래스는 let, const 키워드로 선언한 변수처럼 호이스팅된다. 따라서 클래스 선언문 이전에 일시적 사각지대에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

### 25.4 인스턴스 생성

- 클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

```jsx
class Person {}

//인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

- 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 한다.

### 25.5 메서드

#### 클래스 정의에 대한 새로운 제안 사양

    - ECMAScript 사양에 따르면 인스턴스 프로퍼티는 반드시 constructor 내부에서 정의해야 한다. 하지만 2021년 1월 현재, 클래스 몸체에 메서드뿐만이 아니라 프로퍼티를 직접 정의할 수 있는 새로운 표준 사양이 제안되어 있다.
    이 제안 사양에 의해 머지 않아 클래스 몸체에서 메서드뿐만 아니라 프로퍼티도 정의할 수 있게 될 것으로 보인다.

#### 25.5.1 contructor

- constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.

- 클래스도 함수 객체 고유의 프로퍼티를 모두 가지고 있다. 함수와 동일하게 프로토타입과 연결되어 있으며 자신의 스코프 체인을 구성한다.
- 모든 함수 객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티는 클래스 자신을 가키리고 있다. 이는 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다.
- 생성자 함수와 마찬가지로 constructor 내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다.
- constructor는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다. 다시 말해, 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다.

- #### 클래스의 constructor 메서드와 프로토타입의 constructor 프로퍼티

- 클래스의 contructor 메서드와 프로토타입의 constructor 프로퍼티는 이름이 같아 혼동하기 쉽지만 직접적인 관련이 없다. 프로토타입의 constructor 프로퍼티는 모든 프로토타입이 가지고 있는 프로퍼티이며, 생성자 함수를 가리킨다.

- constructor는 클래스 내에 최대 한 개만 존재할 수 있다.
- constructor는 생략할 수 있고, 생략한다면 클래스에 다음과 같이 빈 constructor가 암묵적으로 정의된다. constructor를 생략한 클래스는 빈 constructor에 의해 빈 객체를 생성한다.
- 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.
- 인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 다음과 같이 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달한다. 이때 초기값은 constructor의 매개변수에게 전달된다.

- 이처럼 constructor 내에서는 인스턴스 생성과 동시에 인스턴스 프로퍼티 추가를 통해 인스턴스의 초기화를 실행한다. 따라서 인스턴스를 초기화하려면 constructor를 생략해서는 안 된다.
- constructor는 별도의 반환문을 가지지 않아야 한다. new 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 this, 즉 인스턴스를 반환하기 때문이다. 만약 this가 아닌 다른 객체를 명시적으로 반환하면 this, 즉 인스턴스가 반환되지 못하고 return 문에 명시한 객체가 반환된다.

```jsx
class Person {
  constructor(name) {
    this.name = name;

    // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
    return {};
  }
}

// constructor에서 명시적으로 반환한 객체가 반환된다.
const me = new Person("yang");
console.log(me); // {}
```

- 하지만 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.

#### 25.5.2 프로토타입 메서드

- 생성자 함수를 사용하여 인스턴스를 생성하는 경우 프로토타입 메서드를 생성하기 위해서는 명시적으로 프로토타입에 메서드를 추가해야 한다.
- 클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.
- 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.
- 결국 클래스는 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수라고 볼 수 있다. 다시 말해 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘이다.

#### 25.5.3 정적 메서드

- 생성자 함수의 경우 정적 메서드를 생성하기 위해서는 명시적으로 생성자 함수에 메서드를 추가해야 한다.
- 클래스에서는 메서드에 static 키워드를 붙이면 정적 메서드가 된다.
- 정적 메서든느 클래스에 바인딩 된 메서드가 된다. 클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드를 소유할 수 있다. 클래스는 클래스 정의가 평가되는 시점에 함수 객체가 되므로 인스턴스와 달리 별다른 생성 과정이 필요 없다. 따라서 정적 메서드는 클래스 정의 이후 인스턴스를 생성하지 않아도 호출할 수 있다.
- 인스턴스의 프로토타입 체인 상에는 클래스가 존재하지 않기 때문에 인스턴스로 클래스의 메서드를 상속받을 수 없다.

#### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

- 1.  정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
- 2.  정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
- 3.  정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

#### 25.5.5 클래스에서 정의한 메서드의 특징

- 클래스에서 정의한 메서드는 다음과 같은 특징을 가진다.
  - 1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
  - 2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
  - 3. 암묵적으로 strict mode로 실행된다.
  - 4. for...in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉, 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값을 가지는 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다.
  - 5. 내부 메서드 [[Contructor]]를 가지지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.

### 25.6 클래스의 인스턴스 생성 과정

- new 연산자와 함께 클래스를 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드 [[Constructor]]가 호출된다. 클래스는 new 연산자 없이 호출할 수 없다. 다음과 같은 과정을 거쳐 인스턴스가 생성된다.

  - 1. 인스턴스 생성과 this 바인딩
    - new 연산자와 함께 클래스를 호출하면 constructor 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다. 이 빈 객체가 바로 클래스가 생성한 인스턴스다. 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.
  - 2. 인스턴스 초기화
    - constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉 this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다. 만약 constructor가 생략되었다면 이 과정도 생략된다.
  - 3. 인스턴스 반환
    - 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

### 25.7 프로퍼티

#### 25.7.1 인스턴스 프로퍼티

- 인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다.
- 클래스의 인스턴스 생성 과정에서 이야기 했듯이 constructor 내부 코드가 실행되기 이전에 constructor 내부의 this에는 이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있다.
- constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다. 이로써 클래스가 암묵적으로 생성한 빈 객체, 즉 인스턴스에 프로퍼티가 추가되어 인스턴스가 초기화 된다.

#### 25.7.2 접근자 프로퍼티

- getter, setter에 대한 이야기....(생략)

#### 25.7.3 클래스 필드 정의 제안

- 클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어이다.
- 자바의 클래스 필드는 마치 클래스 내부에서 변수처럼 사용된다.
- JS 클래스 몸체에는 메서드만 선언할 수 있다(X). 따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생한다(아님)
- 클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안 된다. this는 클래스의 constructor와 메서드 내에서만 유효하다.
- 인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 constructor에서 클래스 필드를 초기화해야 한다.

```jsx
class Person {
  name;
  constructor(name) {
    this.name = name;
  }
}
const me = new Person("yang");
console.log(me); // Person {name:"yang"}
```

- 함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있다. 따라서 클래스 필드를 통해 메서드를 정의할 수도 있다.

```jsx
class Person {
  name = "yang";

  getName = function () {
    return this.name;
  };
}

const me = new Person();
console.log(me); //Person { name: 'yang', getName: [Function: getName] }
console.log(me.getName()); // yang
```

- 이처럼 클래스 필드에 함수를 할당하는 경우, 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다. 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문이다. 따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

#### 25.7.4 private 필드 정의 제안

- private 필드의 선두에는 #을 붙여준다. private 필드를 참조할 때도 #을 붙여주어야 한다.

```jsx
class Person {
  // private 필드 정의
  #name = "";

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }

  sayName() {
    console.log(this.#name);
  }

  get name() {
    return this.#name.trim();
  }
}

const me = new Person("yang");

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);

me.sayName(); //yang
console.log(me.name); //yang
```

- 접근자 프로퍼티 혹은 메서드를 통해 간접적으로 private 프로퍼티에 접근하는 방법은 유효하다.
- private 필드는 반드시 클래스 몸체에 정의해야한다. private 필드를 직접 constructor에 정의하면 에러가 발생한다.

#### 25.7.5 static 필드 정의 제안

- ...

### 25.8 상속에 의한 클래스 확장

#### 25.8.1 클래스 상속과 생성자 함수 상속

- 상속에 의한 클래스 확장은 지금까지 살펴본 프로토타입 기반 상속과는 다른 개념이다. 프로토타입 기반 상속은 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 개념이지만 <b>상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의</b>하는 것이다.

- 클래스와 생성자 함수는 인스턴스를 생성하는 함수라는 점에서 매우 유사하다. 하지만 클래스는 상속을 통해 기존 클래스를 확장할 수 있는 문법이 기본적으로 제공되지만 생성자 함수는 그렇지 않다.

- 상속을 통해 부모 클래스를 확장한 예시

```jsx
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return "eat";
  }
  move() {
    return "move";
  }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() {
    return "fly";
  }
}

const bird = new Bird(1, 5);

console.log(bird); //Bird { age: 1, weight: 5 }
console.log(bird instanceof Bird); //true
console.log(bird instanceof Animal); //true

console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

#### 25.8.2 extends 키워드

- 상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의한다.

- 상속을 통해 확장된 클래스를 서브클래스라 부르고, 서브클래스에게 상속된 클래스를 수퍼클래스라 부른다. 서브클래스를 파생 클래스 또는 자식 클래스, 수퍼클래스를 베이스 클래스 또는 부모 클래스라고 부르기도 한다.

- extends 키워드의 역할은 수퍼클래스와 서브클래스 간의 상속 관계를 설정하는 것이다. 클래스도 프로토타입을 통해 상속 관계를 구현한다.
- 수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인뿐 아니라 클래스 간의 프로토타입 체인도 생성한다. 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.

#### 25.8.3 동적 상속

- extends 키워드는 클래스뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단 extends 키워드 앞에는 반드시 클래스가 와야한다.

```jsx
function Base(a) {
  this.a = a;
}
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

- extends 키워드 다음에는 클래스뿐만이 아니라 [[Contructor]] 내부 메서드를 가지는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

```jsx
function Base1() {}
class Base2 {}
let condition = true;
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}
console.log(derived intanceof Base1); //true
console.log(derived intanceof Base2); //false
```

#### 25.8.4 서브클래스의 constructor

- constructor를 생략하면 클래스에 비어있는 constructor가 암묵적으로 정의된다.

- 서브클래스에서 constructor를 생략하면 클래스에 다음과 같은 constructor가 암묵적으로 정의된다. args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트다.

```jsx
constructor(...args){super(...args)}
```

- 다음 예제를 살펴보자. 수퍼클래스와 서브클래스 모두 constructor를 생략했다.

```jsx
//수퍼클래스
class Base {}
//서브클래스
class Derived extends Base {}
```

- 위 예제의 클래스에는 다음과 같이 암묵적으로 constructor가 정의된다.

```jsx
//수퍼클래스
class Base {
  constructor() {}
}
//서브클래스
class Derived extends Base {
  constructor(...args) {
    super(...args);
  }
}

const derived = new Derived();
console.log(derived); // Derived {}
```

- 위 예제와 같이 수퍼클래스와 서브클래스 모두 constructor를 생략하면 빈 객체가 생성된다. 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에서 인스턴스에 프로퍼티를 추가해야 한다.

#### 25.8.5 super 키워드

- super 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드다. super는 다음과 같이 동작한다.
  - super를 호출하면 수퍼클래스의 constructor(super-constructor)를 호출한다.
  - super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

#### super 호출

- <b>super를 호출하면 수퍼클래스의 constructor(super-constructor)를 호출한다.</b>

- 다음 예제와 같이 수퍼클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 가지는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 있다. 이때 new 연산자와 함께 서브클래스를 호출하면서 전달한 인수는 모두 서브클래스에 암묵적으로 정의된 constructor의 super 호출을 통해 수퍼클래스의 constructor에 전달된다.

```jsx
//수퍼 클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
// 서브 클래스
class Derived extends Base {
  // 다음과 같이 암묵적으로 constructor가 정의된다.
  // constructor(...args){super(...args);}
}

const derived = new Derived(1, 2);
console.log(derived); //Derived {a:1, b:2}
```

- 다음 예제와 같이 수퍼클래스에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티를 가지는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 없다. 이때 new 연산자와 함께 서브클래스를 호출하면서 전달한 인수 중에서 수퍼클래스의 constructir에 전달할 필요가 있는 인수는 서브클래스의 constructor에서 호출하는 super를 통해 전달한다.

```jsx
//수퍼클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
//서브클래스
class Derived extends Base {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived {a:1, b:2, c:3}
```

- new 연산자와 함께 Derived 클래스를 호출하면서 전달한 인수 1,2,3은 Derived클래스의 constructor에 전달되고 super 호출을 통해 Base클래스의 constructor에 일부가 전달된다. 이처럼 인스턴스 초기화를 위해 전달한 인수는 수퍼클래스와 서브클래스에 분배되고 상속 관계의 두 클래스는 서로 협력하여 인스턴스를 생성한다.

- super를 호출할 때 주의할 사항은 다음과 같다.
  - 서브클래스에서 constructor를 생략하지 않는 경우 서브클래스의 constructor에서는 반드시 super를 호출해야 한다.
  - 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
  - super는 반드시 서브클래스의 constructor에서만 호출한다. 서브클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생한다.

#### super 참조

- <b>메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.</b>

```jsx
//수퍼클래스
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi ${this.name}`;
  }
}
//서브클래스
class Derived extends Base {
  sayHiyo() {
    //super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킨다.
    return `${super.sayHi()}. how are you doing?`;
  }
}

const derived = new Derived("yang");
console.log(derived.sayHiyo()); //Hi yang. how are you doing?
console.log(derived.sayHi()); // Hi yang
```

- super는 자신을 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입을 가리킨다. 따라서 super.sayHi는 Base.prototype.sayHi를 가리킨다. 단, super.sayHi 즉 Base.prototype.sayHi를 호출할 때 call 메서드를 사용해 this를 전달해야한다.

- call 메서드를 사용해 this를 전달하지 않고 그대로 호출하면 Base.prototype.sayHi메서드 내부의 this는 Base.prototype을 가리킨다. Base.prototype.sayHi 메서드는 프로토타입 메서드이기 때문에 내부의 this는 인스턴스를 가리켜야 한다. name 프로퍼티는 인스턴스에 존재하기 때문이다.

- 이처럼 super 참조가 동작하기 위해서는 super를 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입을 찾을 수 있어야 한다. 이를 위해 메서드는 내부 슬롯 [[HomeObject]]를 가지며, 자신을 바인딩하고 있는 객체를 가리킨다.

- [[HomeObject]]를 가지는 함수만이 super 참조를 할 수 있다. 따라서 [[HomeObject]]를 가지는 ES6의 메서드 축약 표현으로 정의된 함수만이 super 참조를 할 수 있다. 단, super 참조는 수퍼클래스의 메서드를 참조하기 위해 사용하므로 서브클래스의 메서드에서 사용해야한다.

- super 참조는 클래스의 전유물이 아니다. 객체 리터럴에서도 super 참조를 사용할 수 있다. 단, ES6의 메서드 축약 표현으로 정의된 함수만 가능하다.

```jsx
const base = {
  name: "yang",
  sayHi() {
    return `Hi ${this.name}`;
  },
};

const derived = {
  __proto__: base,
  //ES6 메서드 축약 표현으로 정의한 메서드 -> [[HomeObject]]를 가진다.
  sayHiyo() {
    return `${super.sayHi()}. how are you doing?`;
  },
};

console.log(derived.sayHi()); //Hi yang. how are you doing?
```

- 서브클래스의 정적 메서드 내에서 super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다.

#### 25.8.6 상속 클래스의 인스턴스 생성 과정

```jsx
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width=${this.width}, height=${this.height}`;
  }
}

class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, "red");
console.log(colorRectangle); //ColorRectangle { width: 2, height: 4, color: 'red' }

console.log(colorRectangle.getArea()); //8
console.log(colorRectangle.toString()); // width=2, height=4, color = red
```

- 1. 서브클래스의 super 호출

  - 자바스크립트 엔진은 클래스를 평가할때 수퍼클래스와 서브클래스를 구분하기 위해 "base" 또는 "derived"를 값으로 가지는 내부 슬롯 [[Constructorkind]]를 가진다. 다른 클래스를 상속받지 않는 클래스는 내부 슬롯 [[Constructorkind]]의 값이 "base"로 설정되지만 다른 클래스를 상속받는 서브클래스는 내부 슬롯 [[Constructorkind]]의 값이 "derived"로 설정된다. 이를 통해 수퍼클래스와 서브클래스는 new 연산자와 함께 호출되었을 때의 동작이 구분된다.
  - 다른 클래스를 상속받지 않는 클래스는 new 연산자와 함께 호출되었을 때 암묵적으로 빈 객체, 즉 인스턴스를 생성하고 이를 this에 바인딩한다. 하지만 <b>서브클래스는 자신이 직접 인스턴스를 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다. 이것이 바로 서브클래스의 constructor에서 반드시 super를 호출해야하는 이유다.</b>
  - 서브클래스가 new 연산자와 함께 호출되면 서브클래스 constructor 내부의 super 키워드가 함수처럼 호출된다. super가 호출되면 수퍼클래스의 constructor(super-constructor)가 호출된다. 좀 더 정확히 말하자면 수퍼클래스가 평가되어 생성된 함수 객체의 코드가 실행되기 시작한다.
  - 만약 서브클래스 constructor 내부에 super 호출이 없으면 에러가 발생한다. 실제로 인스턴스를 생성하는 주체는 수퍼클래스이므로 수퍼클래스의 constructor를 호출하는 super가 호출되지 않으면 인스턴스를 생성할 수 없기 때문이다.

- 2. 수퍼클래스의 인스턴스 생성과 this 바인딩

  - 수퍼클래스의 constructor 내부의 코드가 실행되기 이전에 암묵적으로 빈 객체를 생성한다. 이 빈 객체가 바로 인스턴스이고 this에 바인딩된다. 따라서 수퍼클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다.
  - 이때 인스턴스는 수퍼클래스가 생성한 것이다. 하지만 new연산자와 함께 호출된 클래스가 서브클래스라는 것이 중요하다. 즉 new 연산자와 함께 호출된 함수를 가리키는 new.target은 서브클래스를 가리킨다. 따라서 <b>인스턴스는 new.target이 가리키는 서브클래스가 생성한 것으로 처리된다.</b>
  - 따라서 생성된 인스턴스의 프로토타입은 수퍼클래스의 prototype 프로퍼티가 가리키는 객체가 아니라 new.target, 즉 서브클래스의 prototype 프로퍼티가 가리키는 객체다.

- 3. 수퍼클래스의 인스턴스 초기화
  - 수퍼클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩 되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 추가한다.
- 4. 서브클래스 constructor로의 복귀와 this 바인딩

  - super 호출이 종료되고 제어 흐름이 서브클래스 constructor로 돌아온다. <b>이때 super가 반환한 인스턴스가 this에 바인딩된다. 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다.</b>
  - <b>이처럼 super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없다. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 이유가 바로 이 때문이다.</b>

- 5. 서브클래스의 인스턴스 초기화
  - super 호출 이후, 서브클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행된다. 즉, this에 바인딩 되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.
- 6. 인스턴스 반환
  - 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

#### 25.8.7 표준 빌트인 생성자 함수 확장

- extends 키워드 다음에는 클래스뿐만이 아니라 [[Construct]] 내부 메서드를 가지는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. String, Number, Array 같은 표준 빌트인 객체도 [[Construct]] 내부 메서드를 가지는 생성자 함수이므로 extends 키워드를 사용하여 확장 할 수 있다.

# 면접 예상 질문

## 💥 수퍼클래스를 상속받은 서브클래스의 constructor에서 super를 반드시 호출해야하는 이유를 설명하여 주세요.

- 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다는 것이 주요한 원인입니다. 따라서 super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없기 때문에 서브클래스의 constructor 내에서 super를 호출하기 이전에는 this를 참조할 수 없게 됩니다.

## 💥 

# 이야기하고 싶은 것
