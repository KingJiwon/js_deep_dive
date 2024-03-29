# 21. 빌트인 객체

### 21.1 자바스크립트 객체의 분류

- 자바스크립트 객체는 다음과 같이 크게 3개의 객체로 분류할 수 있다.
  - 1. 표준 빌트인 객체
    - 표준 빌트인 객체는 ECMAScript 사양에 정의된 객체를 말하며, 어플리케이션 전역의 공통 기능을 제공한다. 표준 빌트인 객체는 ECMAScript 사양에 정의된 객체이므로 자바스크립트 실행 환경 (브라우저 또는 Node.js 환경)과 관계없이 언제나 사용할 수 있다.
  - 2. 호스트 객체
    - 호스트 객체는 ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경(브라우저 또는 Node.js 환경)에서 추가로 제공하는 객체를 말한다. 브라우저 환경에서는 Web API를 호스트 객체로 제공하고, Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공한다.
  - 3. 사용자 정의 객체
    - 사용자 정의 객체는 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.

### 21.2 표준 빌트인 객체

- 자바스크립트는 40여 종의 표준 빌트인 객체를 제공한다. Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체이다. 생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공한다.

- new키워드와 함께 표준 빌트인 객체 생성자 함수로 만든 객체들의 프로토타입이 해당 표준 빌트인 객체의 프로토타입과 동일하다는 당연한 이야기와 예제 코드는 생략하였다.

- 다만...

```jsx
const str = "hello";
const num = 5;
const bool = true;
const arr = [];
const obj = {};
function func() {}

console.log(Object.getPrototypeOf(str) === String.prototype); //true
console.log(Object.getPrototypeOf(num) === Number.prototype); //true
console.log(Object.getPrototypeOf(bool) === Boolean.prototype); //true
console.log(Object.getPrototypeOf(arr) === Array.prototype); //true
console.log(Object.getPrototypeOf(obj) === Object.prototype); //true
console.log(Object.getPrototypeOf(func) === Function.prototype); //true
```

### 21.3 원시값과 래퍼 객체

- 문자열이나 숫자, 불리언 등의 원시값이 있는데도 이들의 객체를 생성하는 String, Number, Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유가 무엇일까?

- 원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없는데도 원시값인 문자열이 마치 객체처럼 동작한다.

- 이는 원시값인 문자열, 숫자 , 불리언 값의 경우 이들 원시값에 대해 마치 객체처럼 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진이 일시적으로 원시값을 객체로 변환해 주기 때문이다. 즉, 원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.

- 이처럼 <b>문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼(wrapper object)라 한다.</b>

- 예를 들어, 문자열에 대해 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 String 생성자 함수의 인스턴스가 생성되고 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.

```jsx
const str = "hi";

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str.length); //2
console.log(str.toUpperCase()); // hi

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str); // string
```

- 이때 문자열 래퍼 객체인 String 생성자 함수의 인스턴스는 String.prototype의 메서드를 상속받아 사용할 수 있다. 그 후 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값으로 원래의 상태, 즉 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.

```jsx
const str = "hello";

str.name = "Lee";

console.log(str.name); //undefined
console.log(typeof str, str); //string hello
```

- ES6에서 새롭게 도입된 원시값인 심벌도 래퍼 객체를 생성한다. 심벌은 일반적인 원시값과는 달리 리터럴 표기법으로 생성할 수 없고 Symbol 함수를 통해 생성해야 하므로 다른 원시값과는 차이가 있다.

- 이처럼 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해마치 객체처럼 사용할 수 있으며, 표준 빌트인 객체인 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 문자열, 숫자, 불리언 인스턴스를 생성할 필요가 없으며 권장하지도 않는다.

- 문자열, 숫자, 불리언, 심벌 이외의 원시값, 즉 null과 undefined는 래퍼 객체를 생성하지 않는다. 따라서 null과 undefined 값을 객체처럼 사용하면 에러가 발생한다.

### 21.4 전역 객체

- 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않은 최상위 객체이다.

#### globalThis

- ES11(ECMAScript11)에서 도입된 globalThis는 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자이다. globalThis는 표준 사양이므로 ECMAScript 표준 사양을 준수하는 모든 환경에서 사용할 수 있다.

```jsx
// 브라우저 환경
globalThis === this; //true
globalThis === window; //true
globalThis === self; //true
globalThis === frames; //true

// Node.js 환경 (12.0.0 이상)
globalThis === this; //true
globalThis === global; //true
```

- 전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체, 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 가진다.

- 즉, 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체다. 전역 객체가 최상위 객체라는 것은 프로토타입 상속 관계상에서 최상위 객체라는 의미가 아니다. 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 것을 말한다.

- 전역 객체의 특징은 다음과 같다.

  - 전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다.
  - 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다.
  - 전역 객체는 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
  - var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.
    - let 이나 const로 선언된 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재하게 된다.
  - 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유한다. 여러 개의 script 태그를 통해 자바스크립트 코드를 분리해도 하나의 전역 객체 window를 공유하는 것은 변함이 없다.

#### 21.4.1 빌트인 전역 프로퍼티

- 빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공한다.
  - Infinity
    - 무한대를 나타내는 숫자값 Infinity를 가진다.
  - NaN
    - 숫자가 아님을 나타내는 숫자값 NaN을 가진다. Number.NaN 프로퍼티와 같다.
  - undefined
    - 원시 타입 undefined를 값으로 가진다.

#### 21.4.2 빌트인 전역 함수

- 빌트인 전역 함수는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드다.

  - eval

    - 자바스크립트 코드를 나타내는 문자열을 인수로 전달받는다. 전달받은 문자열 코드가 표현식이라면 eval 함수는 문자열 코드를 런타임에 평가하여 값을 생성하고, 전달받은 인수가 표현식이 아닌 문이라면 eval 함수는 문자열 코드를 런타임에 실행한다. 문자열 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 실행한다.

    ```jsx
    eval("1+2;"); // -> 3
    eval("var x = 5;"); // -> undefined

    console.log(x); // 5
    const o = eval("({a : 1})");
    console.log(o); // {a : 1}

    const f = eval("(function () { return 1; })");
    console.log(f()); // 1
    ```

    - 인수로 전달받은 문자열 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 실행한 다음, 마지막 결과값을 반환한다.
    - eval 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정한다.

    ```jsx
    const x = 1;

    function foo() {
      eval("var x = 2;");
      console.log(x); //2
    }
    foo();
    console.log(x); //1
    ```

    - eval 함수의 사용은 금지해야 한다.

  - isFinite
    - 전달받은 인수가 정상적인 유한수인지 검사하여 유한수이면 true를 반환하고, 무한수이면 false를 반환한다.
  - isNaN
    - 전달받은 인수가 NaN인지 검사하여 그 결과를 불리언 타입으로 반환한다.
  - parseFloat
    - 전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.
  - parseInt
    - 전달받은 문자열 인수를 정수로 해석하여 반환한다.
  - 기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하고 싶다면 Number.prototype.toString 메서드를 사용한다.
  - encodeURI / decodeURI
    - encodeURI는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다. 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다. 이스케이프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.
    - decodeURI는 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩한다.
  - encodeURIComponent / decodeURIComponent
    - encodeURIComponent URI 구성 요소를 인수로 전달받아 인코딩한다.
    - decodeURIComponent 전달된 URI 구성 요소를 디코딩한다.

#### 21.4.3 암묵적 전역

- 암묵적 전역 현상으로 전역 변수 처럼 사용할 수 있는 변수(?)는 변수 선언 없이 전역 객체의 프로퍼티로 추가되었을 뿐이기 때문에 변수 호이스팅이 발생하지 않는다.

# 면접 예상 질문

## 💥string, number, boolean 같은 원시값이 있는데도 이들의 객체를 생성하는 String, Number, Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유가 무엇인가요?

- 원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없는데도 원시값인 문자열이 마치 객체처럼 동작한다. 이는 원시값인 문자열, 숫자 , 불리언 값의 경우 이들 원시값에 대해 마치 객체처럼 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진이 일시적으로 원시값을 객체로 변환해 주기 때문이다. 즉, 원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.

# 이야기하고 싶은 것
