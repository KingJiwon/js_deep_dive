# 24. 클로저

- 클로저는 자바스크립트 고유의 개념이 아니다. 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용되는 중요한 특성이다. 클로저는 자바스크립트 고유의 개념이 아니므로 클로저의 정의가 ECMAScript 사양에 등장하지 않는다

- <b>클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.</b>
- 위 정의에서 이해해야 할 핵심 키워드는 <i>함수가 선언된 렉시컬 환경이다.</i>

```jsx
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();
```

- 1. outerFunc 함수 스코프가 innerFunc 함수 스코프의 상위 스코프이기 때문에 innerFunc에서 outerFunc 스코프에 선언된 변수를 참조할 수 있다.

- 2. 만약 innerFunc가 outerFunc 내부에 정의된 중첩 함수가 아니라면 innerFunc 스코프내에서 outerFunc 스코프에서 선언된 변수를 참조할 수 없다.

- 이 같은 현상이 발생하는 이유는 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.

### 24.1 렉시컬 스코프

- <b>자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프(정적 스코프)라 한다.</b>

```jsx
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();
bar();
```

- foo, bar 두 함수 모두 전역에서 정의된 전역 함수다. 따라서 두 함수의 상위 스코프는 전역이다. 함수를 어디서 호출하는지는 함수의 상위 스코프 결정에 어떠한 영향도 주지 못한다. 즉, 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않는다.

- 스코프의 실체는 실행 컨텍스트의 렉시컬 환경이다. 이 렉시컬 환경은 자신의 "외부 렉시컬 환경에 대한 참조를 통해 상위 렉시컬 환경과 연결된다. 이것이 바로 스코프 체인이다."

- 따라서 "함수의 상위 스코프를 결정한다"는 것은 "렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다"는 것과 같다. 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값이 바로 상위 렉시컬 환경에 대한 참조이며, 이것이 상위 스코프이기 때문이다. 이 개념을 반영해서 다시 한번 렉시컬 스코프를 정의해 보면 다음과 같다.

- <b>렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.</b>

### 24.2 함수 객체의 내부 슬롯 [[Environment]]

- 렉시컬 스코프가 가능하려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경, 즉 상위 스코프를 기억해야한다. 이를 위해 <b>함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.</b>

- 함수 정의가 평가되어 함수 객체를 생성할 때 자신이 정의된 환경에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 [[Environment]]에 저장한다. 이때 자신의 내부슬롯 [[Environment]]에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.
- 왜냐하면 함수 정의가 평가되어 함수 객체를 생성하는 시점은 함수가 정의된 환경, 즉 상위 함수가 평가 혹은 실행되고 있는 시점이며, 이때 현재 실행 중인 컨텍스트는 상위 함수의 실행 컨텍스트이기 때문이다.

- <예시1 - 전역에서 정의되었을 때> 전역에서 정의된 함수 선언문은 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성한다. 이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가되는 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.

- <예시2 - 함수 내부에서 정의되었을 때> 함수 내부에서 정의된 함수 표현식은 외부 함수 코드가 실행되는 시점에 평가되어 함수 객체를 생성한다. 이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가되는 시점, 즉 외부 함수 코드 실행 시점에 실행 중인 실행컨텍스트의 렉시컬 환경인 외부 함수 렉시컬 환경의 참조가 저장된다.

- <b>따라서 함수 객체의 내부 슬롯 [[Environment]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프다. 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장될 참조값이다. 함수 객체는 내부 슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.</b>

```jsx
const x = 1;

function foo() {
  const x = 10;
  //상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 [[Environment]]에 저장하여 기억한다.
function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

- 위 예제에서 foo 와 bar 함수는 모두 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성하고 전역 객체 window의 메서드가 된다. 이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가된 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.

- 함수가 호출되면 함수 내부로 코드의 제어권이 이동한다. 그리고 함수 코드를 평가하기 시작한다. 함수 코드 평가는 아래 순서로 진행된다.

  - 1. 함수 실행 컨텍스트 생성
  - 2. 함수 렉시컬 환경 생성
       - b-1. 함수 환경 레코드 생성
       - b-2. this 바인딩
       - b-3. 외부 렉시컬 환경에 대한 참조 결정

- 이때 함수 렉시컬 환경의 구성 요소인 <b>외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조가 할당된다.</b> 즉, 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조는 바로 함수의 상위 스코프를 의미한다. 이것이 바로 함수 정의 위치에 따라 상위 스코프를 결정하는 렉시컬 스코프의 실체다.

### 24.3 클로저와 렉시컬 환경

```jsx
const x = 1;

function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer();
innerFunc(); // 10;
```

- <b>외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다.</b>

- outer 함수의 실행이 종료하면 inner 함수를 반환하면서 outer 함수의 생명 주기가 종료된다. 즉 outer 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거된다. 이때 <b>outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.</b>

- outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문이다.

- 외부 함수 실행 컨텍스트의 생존 여부와 상관없이 자신이 정의된 위치에 의해 결정된 상위 스코프를 기억한다.

- 자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로는 모든 함수는 클로저다. 하지만 일반적으로 모든 함수를 클로저라고 하지 않는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;
        /**일반적으로 클로저라고 하지 않는다.*/
        function bar() {
          const z = 3;

          debugger;
          // 상위 스코프의 식별자를 참조하지 않는다.
          console.log(z);
        }
        return bar;
      }

      const bar = foo();
      bar();
    </script>
  </body>
</html>
```

- 위 예제 처럼 상위 스코프의 어떠한 식별자도 참조하지 않는 경우 대부분의 모던 브라우저는 최적화를 통해 다음 그림과 같이 상위 스코프를 기억하지 않는다. 따라서 bar 함수는 클로저라고 할 수 없다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;

        /** bar 함수는 클로저였지만 곧바로 소멸한다 */
        /** 이러한 함수는 일반적으로 클로저라고 하지 않는다.*/
        function bar() {
          debugger;
          // 상위 스코프의 식별자를 참조한다.
          console.log(x);
        }

        bar();
      }

      foo();
    </script>
  </body>
</html>
```

- 위의 예제에서는 외부 함수 foo보다 중첩 함수 bar의 생명 주기가 더 짧다. 이런 경우 중첩 함수 bar는 클로저였지만 외부 함수보다 일찍 소멸되기 때문에 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;

        /** 클로저 */
        /** 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.*/
        function bar() {
          debugger;
          console.log(x);
        }
        return bar;
      }

      const bar = foo();
      bar();
    </script>
  </body>
</html>
```

- 위 예제에서는 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있고 외부 함수의 외부로 반환되어 외부 함수보다 더 오래 살아남는다. 이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다. <b>클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.</b>

- 다만 중첩 함수 bar는 상위 스코프의 식별자 중 x만 참조하고 있다. 이러한 경우 대부분의 모던 브라우저는 최적화를 통해 클로저가 참조하고 있는 식별자만을 기억한다.

- 클로저에 의해 참조되는 상위 스코프의 변수를 <b>자유 변수</b>라고 부른다. 클로저란 "함수가 자유 변수에 대해 닫혀있다."라는 의미다. 이를 좀 더 알기 쉽게 의역하자면 "자유 변수에 묶여 있는 함수"라고 할 수 있다.

### 24.4 클로저의 활용

- <b> 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다.</b> 다시 말해, 상태가 의도치 않게 변경되지 않도록 <b>상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용</b>하기 위해 사용한다.

- 함수가 호출될 때마다 호출된 횟수를 누적하여 출력하는 카운터를 만들어보자. 이 예제의 호출된 횟수(num 변수)가 바로 안전하게 변경하고 유지해야 할 상태다.

```jsx
//카운트 상태 변수
let num = 0;

// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태를 1만큼 증가시킨다.
  return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

- 위 코드는 잘 동작하지만 에러가 발생할 가능성을 내포하고 있는 안티 패턴이다. 그 이유는 위 코드가 바르게 동작하려면 다음의 전제 조건이 지켜져야 하기 때문이다.

  - a. 카운트 상태(num 변수의 값)는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
  - b. 이를 위해 카운트 상태(num 변수의 값)는 increase 함수만이 변경할 수 있어야 한다.

- 하지만 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다.이는 의도치 않게 상태가 변경될 수 있다는 것을 의미한다.

- 따라서 카운트 상태를 안전하게 변경하고 유지하기 위해서는 increase 함수 만이 num 변수를 참조하고 변경할 수 있게 하는 것이 바람직하다. 이를 위해 전역 변수 num을 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태 변경을 방지해보자.

```jsx
// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태 변수
  let num = 0;

  // 카운트 상태를 1만큼 증가시킨다.
  return ++num;
};

// 이전 상태를 유지하지 못한다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1
```

- 전역변수 num을 increase함수의 지역 변수로 변경하여 의도치 않은 상태 변경은 방지했다. 이제 num 변수의 상태는 increase 함수만이 변경할 수 있다.

- 하지만 increase 함수가 호출될 때마다 지역 변수 num은 다시 선언되고 0으로 초기화되기 때문에 출력 결과는 언제나 1이다. 이전 상태를 유지할 수 있도록 클로저를 활용해보자.

```jsx
const increase = function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가시킨다.
    return ++num;
  };
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

- 위 예제에서 즉시 실행 함수는 호출된 이후 소멸하지만 즉시 실행함수가 반환한 클로저는 increase 변수에 할당되어 호출된다. 이때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있다. 따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.

- 즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일은 없을 것이다. 또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없기 때문에 더 안정적인 프로그래밍이 가능하다.

- <b>이처럼 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.</b>

```jsx
const counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

- 위 예제에서 즉시 실행 함수가 반환하는 객체 리터럴은 즉시 실행 함수의 실행 단계에서 평가되어 객체가 된다. 이때 객체의 메서드도 함수 객체로 생성된다. 객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.

- 위 예제에서 increase, decrease 메서드의 상위 스코프는 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다. -> 즉시 실행 함수 스코프의 식별자를 참조할 수 있다.

- 위 예제를 생성자 함수로 표현하면 다음과 같다.

```jsx
const Counter = (function () {
  //1. 카운트 상태 변수
  let num = 0;

  function Counter() {
    //this.num = 0; //2. 프로퍼티는 public 하므로 은닉되지 않는다.
  }

  Counter.prototype.increase = function () {
    return ++num;
  };

  Counter.prototype.decrease = function () {
    return num > 0 ? --num : 0;
  };

  return Counter;
})();

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

- 위 예제에서 num은 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티가 아니라 즉시 실행 함수 내에서 선언된 변수다. 만약 num이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티였다면 인스턴스를 통해 외부에서 접근이 자유로운 public 프로퍼티가 된다. 하지만 즉시 실행 함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수다.

- 생성자 함수 Counter는 프로토타입을 통해 increase,decrease 메서드를 상속받는 인스턴스를 생성한다. 두 메서드는 클로저이기 때문에 프로토타입을 통해 상속되는 프로토타입 메서드일지라도 즉시 실행 함수의 자유 변수 num을 참조할 수 있다. 다시 말해, num 변수의 값은 increase,decrease 메서드만이 변경할 수 있다.

- 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제

```jsx
//함수를 인수로 전달받고 함수를 반환하는 고차함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  //클로저를 반환
  return function () {
    //인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

//보조함수
function increase(n) {
  return ++n;
}

//보조함수
function decrease(n) {
  return --n;
}

//함수로 함수를 생성한다.
//makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 가지기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

- makeCounter 함수를 호출할때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문에 위 예제에서는 increaser과 decreaser의 상태가 연동하지 않는다.

- 연동하여 증감이 가능한 카운터를 만드려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야한다.

```jsx
// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (predicate) {
    // 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
})();

//보조함수
function increase(n) {
  return ++n;
}
//보조함수
function decrease(n) {
  return --n;
}

// 보조함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 2
```

### 24.5 캡슐화와 정보 은닉

- <b>캡슐화</b>는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.
- 정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성, 즉 결합도를 낮추는 효과가 있다.

- 대부분의 객체지향 프로그래밍 언어는 클래스를 정의하고 그 클래스를 구성하는 멤버(프로퍼티와 메서드)에 대하여 public,private,protected 같은 접근 제한자를 선언하여 공개 범위를 한정할 수 있다. public으로 선언된 프로퍼티와 메서드는 클래스 외부에서 참조할 수 있지만 private으로 선언된 경우는 클래스 외부에서 참조할 수 없다.

- 자바스크립트는 public, private, protected 같은 접근 제한자를 제공하지 않는다. 따라서 자바스크립트 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있다. 즉, 객체의 모든 프로퍼티와 메서드는 기본적으로 public하다.

```jsx
function Person(name, age) {
  this.name = name; //public
  let _age = age; //private

  this.sayHi = function () {
    console.log(`Hi my name is ${this.name}. I am ${_age}`);
  };
}

const me = new Person("yang", 29);
me.sayHi(); // Hi my name is yang. I am 29
console.log(me.name);
console.log(me._age);

const you = new Person("Kim", 30);
you.sayHi(); // Hi my name is Kim. I am 30
console.log(you.name); // Kim
console.log(you._age); // undefined
```

- 위 예제에서 name은 public 프로퍼티이기 때문에 참조하거나 변경이 가능하다. 하지만 \_age 변수는 Person 생성자 함수의 지역 변수이므로 Person 생성자 함수 외부에서 참조하거나 변경할 수 없다. 즉 \_age 변수는 private 하다.

- 하지만 위 예제의 sayHi 메서드는 인스턴스 메서드이므로 Person 객체가 생성될 때마다 중복 생성된다. sayHi 메서드를 프로토타입 메서드로 변경하여 sayHi 메서드의 중복 생성을 방지해 보자.

```jsx
function Person() {
  this.name = name; //public
  let _age = age; //private
}

// 프로토타입 메서드
Person.prototype.sayHi = function () {
  // Person 생성자 함수의 지역 변수 _age를 참조할 수 없다.
  console.log(`Hi my name is ${this.name}. I am ${_age}`);
};
```

- 이때 Person.prototype.sayHi 메서드 내에서 Person 생성자 함수의 지역 변수 \_age를 참조할 수 없는 문제가 발생한다. 따라서 다음과 같이 즉시 실행 함수를 사용하여 Person 생성자 함수와 Person.prototype.sayHi 메서드를 하나의 함수 내에 모아 보자.

```jsx
const Person = (function () {
  let _age = 0; //private

  // 생성자 함수
  function Person(name, age) {
    this.name = name; //public
    _age = age;
  }

  Person.prototype.sayHi = function () {
    console.log(`Hi my name is ${this.name}. I am ${_age}`);
  };

  return Person;
})();

const me = new Person("Lee", 20);
me.sayHi(); // Hi my name is yang. I am 29
console.log(me.name); // yang
console.log(me._age); // undefined
```

- 위 패턴을 사용하면 자바스크립트에서도 정보 은닉이 가능한 것처럼 보인다. 하지만 위 코드도 문제가 있다. Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 다음과 같이 \_age 변수의 상태가 유지되지 않는다는 것이다.

```jsx
const me = new Person("yang", 29);
me.sayHi(); // Hi my name is yang. I am 29

const you = new Person("Kim", 30);
you.sayHi(); // Hi my name is Kim. I am 30

// _age 변수 값이 변경된다.
me.sayHi(); // Hi my name is yang. I am 30
```

- 이는 Person.prototype.sayHi 메서드가 단 한번 생성되는 클로저이기 때문에 발생하는 현상이다. Person.prototype.sayHi 메서드는 즉시 실행 함수가 호출될 때 생성된다. 이때 Person.prototype.sayHi 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 [[Environment]]에 저장하여 기억한다. 따라서 Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 Person.prototype.sayHi 메서드의 상위 스코프는 어떤 인스턴스로 호출하여도 하나의 동일한 상위 스코프를 사용하게 된다. 이러한 이유로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 위와 같이 \_age 변수의 상태가 유지 되지 않는다.

- 이처럼 자바스크립트는 정보 은닉을 완전하게 지원하지 않는다. 인스턴스 메서드를 사용한다면 자유 변수를 통해 private을 흉내 낼 수는 있지만 프로토타입 메서드를 사용하면 이마저도 불가능해진다. ES6의 Symbol 또는 WeakMap을 사용하요 private한 프로퍼티를 흉내 내기도 했으나 근본적인 해결책이 되지는 않는다.

### 24.6 자주 발생하는 실수

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

- for 문의 변수 선언문에서 var 키워드로 선언한 i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수다. 전역 변수 i에는 0,1,2 가 순차적으로 할당된다. 따라서 funcs 배열의 요소로 추가한 함수를 호출하면 전역 변수 i를 참조하여 i의 값 3이 출력된다.

- 클로저를 사용해 위 예제를 바르게 동작하는 코드로 바꾸어보자.

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    return id;
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

- 위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 문의 변수 선언문에서 var 키워드로 선언한 변수가 전역 변수가 되기 때문에 발생하는 현상이다. ES6의 let키워드를 사용하면 이 같은 번거로움이 깔끔하게 해결된다.

- let이나 const 키워드를 사용하는 반복문은 코드 블록을 반복 실행할 때마다 새로운 렉시컬 환경을 생성하여 반복할 당시의 상태를 마치 스냅샷을 찍는 것처럼 저장한다. 단 이는 반복문의 코드 블록 내부에서 함수를 정의할 때 의미가 있다. 반복문의 코드 블록 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은 반복 직후, 아무도 참조하지 않기 때문에 가비지 컬렉션의 대상이 된다.

- 함수형 프로그래밍 기법인 고차 함수로 리팩토링.. (변수와 반복문의 사용을 억제할 수 있기 때문에 오류를 줄이고 가독성을 좋게 만든다.)

```jsx
const funcs = Array.from(new Array(3), (_, i) => () => i);
funcs.forEach((f) => console.log(f()));
```

# 면접 예상 질문

## 💥 클로저의 정의에 대해 설명해주세요.

- 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우 해당 함수를 클로저라고 부릅니다. 이때 클로저에 의해 참조 되고 있는 상위 스코프의 식별자는 자유 변수라고 부르고 클로저는 자유변수에 대하여 닫혀있는, 즉 자유 변수에 묶여 있는 함수라는 의미입니다.

## 💥 클로저를 어떤 상황에 활용하는지 설명해주세요.

- 상태(state)가 의도치 않게 변경되는 상황을 막고 상태를 안전하게 은닉하고 특정 함수만이 상태를 변경할 수 있도록 만들고 싶을때 사용합니다.

## 💥 캡슐화와 정보 은닉에 대해 설명해주세요.

- 캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말합니다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 합니다.
- 정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성, 즉 결합도를 낮추는 효과가 있습니다.

# 이야기하고 싶은 것
