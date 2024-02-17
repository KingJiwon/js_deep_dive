# 17. 생성자 함수에 의한 객체 생성

### 17.1 Object 생성자 함수

- new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다.
- 빈 객체를 생성하여 프로퍼티나 메서드를 동적으로 추가하여 객체를 완성할 수 있다.

```jsx
const person = new Object();

person.name = "jaeyeon";
person.sayHello = function () {
  console.log(`hi my name is ${this.name}`);
};

console.log(person); // => {name:"jaeyeon", sayHello: f}
person.sayHello; // => "hi my name is jaeyeon"
```

- 생성자 함수란 new 연산자와 함께 호출되어 객체(인스턴스)를 생성하는 함수를 말한다.
- 생성자 함수에 의해 생성된 객체를 인스턴스라고 칭한다.
- 다양한 생성자 함수 => String, Number, Boolean, Function, Array, Date, RegExp, Promise
- 생성자 함수를 이용한 객체 생성보다는 객체 리터럴을 통한 정의가 더 간편하다.

### 17.2 생성자 함수

#### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

- 단 하나의 객체만을 생성하기 때문에 같은 프로퍼티를 가진 객체를 여러개 만들 때에는 비효율적이다.

#### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

- 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼
  <br/>생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```jsx
function circlr(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

##### this 란 ?

- this는 객체(인스턴스) 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수다.(self-referencing value)
- this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

<table>
    <tr> 
      <th>함수 호출 방식</th> 
      <th>this가 가리키는 값<br/>(this 바인딩)</th> 
    </tr>
    <tr>
      <td>일반 함수로서 호출</td>
      <td> 전역 객체</td>
    </tr>
    <tr>
      <td>메서드로서 호출</td>
      <td>메서드를 호출한 객체(마침표 앞의 객체)</td>
    </tr>
       <tr>
      <td>생성자 함수로서 호출</td>
      <td>생성자 함수가 (미래에) 생성할 인스턴스</td>
    </tr>
</table>

- new 연산자와 함께 호출할 경우에만 생성자 함수로 동작하고 그 이외의 호출에는 일반 함수로 동작한다.

#### 17.2.3 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여
  <br/>인스턴스를 생성하는 것과 생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)하는 것이다.
- 인스턴스를 생성하는 것은 필수이고, 생성된 인스턴스를 초기화 하는 것은 옵션이다.

1. 인스턴스 생성과 this 바인딩

- 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다.
  #### 바인딩이란?
  - 식별자와 값을 연결하는 과정을 뜻한다.
  - 변수 선언은 식별자와 확보된 메모리 공간의 주소를 바인딩 한다면, this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다.)와 this가 가리킬 객체를 바인딩하는 것이다.

2. 인스턴스 초기화

- 생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.(이 처리는 개발자가 기술한다.)

3. 인스턴스 반환

- 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

```jsx
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // return 100; => 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.
  // return {}; => 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
}
```

- 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본적인 동작을 훼손하기 때문에 지양해야한다.

#### 17.2.4 내부 메서드 [[Call]]과 [[Construct]]

- 함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로도 호출 가능하고 생성자 함수로도 호출할 수 있다.

- 함수는 객체이므로 일반 객체와 동일하게 동작할 수 있다. 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문이다.

- 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다 (???)
- 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 [[Environment]], [[FormalParameters]] 등의 내부 슬롯과 [[Call]],[[Construct]] 같은 내부 메서드를 추가로 가지고 있다.
- 일반 함수로서 호출되면 내부 메서드 [[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 [[Construct]] 가 호출된다.

#### 17.2.5 constructor와 non-constructor의 구분

    - 자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분한다.
        - constructor: 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
        - non-constructor: 메서드(ES6 메서드 축약 표현), 화살표 함수

#### 17.2.6 new 연산자

- 일반 함수와 생성자 함수에 특별한 형식적 차이는 없다. new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다.
- 반대로 new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출된다.
- 생성자 함수는 파스칼 케이스로 명명하도록 지향한다.

#### 17.2.7 new.target

- new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티(???)라고 부른다.

- 함수 내부에서 new.target을 사용하면 new 연산자와 함게 생성자 함수로서 호출되었는지 확인할 수 있다.

- new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined 이다.

##### 스코프 세이프 생성자 패턴?

    - new.target은 ES6에서 도입된 최신 문법으로 IE같은 레거시 환경에서는 지원되지 않을 수 있다. new.target을 사용할 수 없는 상황이라면 스코프 세이프 생성자 패턴을 사용할 수 있다.

```jsx
function Circle(radius) {
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

- 참고로 대부분의 빌트인 생성자 함수는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.
- Object와 Function 생성자 함수는 new 연산자 없이 호출하여도 new 연산자와 함께 호출했을 때와 동일하게 동작한다.
- 하지만 String,Number,Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 String, Number, Boolean 객체를 생성하여 반환하지만 new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환한다

```jsx
console.log(Number("123")); // => 123
console.log(new Number("123")); // => [Number: 123]
```

# 면접 예상 질문

## 💥생성자 함수가 무엇인가요?

- 생성자 함수란 new 연산자와 함께 호출되어 객체(인스턴스)를 생성하는 함수를 말합니다.

## 💥객체 리터럴에 의한 객체 생성과 객체 생성자 함수에 의한 객체 생성, 각각의 장단점을 설명해주세요.

- 객체 리터럴에 의한 객체 생성은 단 하나의 객체만을 생성하기 때문에 같은 프로퍼티를 가진 객체를 여러개 만들 때에는 비효율적입니다.
  반면에 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있습니다.

## 💥this 대해 설명해주세요.

- this는 객체(인스턴스) 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이며(self-referencing value) this의 바인딩은 함수 호출 방식에 따라 동적으로 결정됩니다.

# 이야기하고 싶은 것

### 읽을거리

1. <a href="https://www.howdy-mj.me/javascript/prototype-and-proto">
      프로토타입: [[Prototype]], __proto__, prototype 프로퍼티     
   </a>

2. <a href="https://www.howdy-mj.me/javascript/why-does-typeof-function-return-function">왜 함수의 타입은 object가 아닌 function을 반환할까?</a>
