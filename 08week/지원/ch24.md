# 핵심 내용 정리

# 24. 클로저

- 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

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

- outerFunc 함수 내부에서 innerFunc가 정의되고 호출되었는데 이때 중첩 함수 innerFunc의 상위 스코프는 외부 함수 outerFunc의 스코프다. 따라서 중첩함수 innerFunc 내부에서 자신을 포함하고 있는 외부 함수 outerFunc의 x 변수에 접근할 수 있다.
- 만약 innerFunc 함수가 outerFunc 함수의 내부에서 정의된 중첩 함수가 아니라면 innerFunc 함수를 outerFunc 함수의 내부에서 호출한다 하더라도 outerFunc 함수의 변수에 접근할 수 없다.
- 이같은 현사이 발생하는 이유는 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어기 때문이다.

## 24.1 렉시컬 스코프

- 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정하는데 이를 렉시컬 스코프라한다.
- 스코프의 실체는 실행 컨텍스트의 렉시컬 환경이고 이 렉시컬 환경은 자신의 “외부 렉시켤 환경에 대한 참조”를 통해 상위 렉시컬 환경과 연결된다. 이것이 바로 스코프 체인이다.
- 따라서 상위 스코프를 결정한다는 것은 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다는 것과 같다. 이 개념을 반영해서 다시 한번 렉시컬 스코프를 정의해보면 다음과 같다.
- **렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.**

## 24.2 함수 객체의 내부 슬롯 \[[Environment]]

- 함수가 정의된 환경과 호출되는 환경은 다를 수 있다. 따라서 렉시컬 스코프가 가능하려면 함수는 자신이 정의된 환경, 즉 상위 스코프를 기억해야 한다. 이를 위해 **함수는 자신의 내부 슬롯 \[[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.**
- 다시 말해, 함수 정의가 평가되어 함수 객체를 생성할 때 자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 \[[Environment]]에 저장하고 이때 자신의 내부 슬롯 \[[Environment]]에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.
- 예를 들어 전역에서 정의된 함수 선언문은 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성한다. 이때 생성된 함수 객체의 내부 슬롯 \[[Environment]]에는 함수 정의가 평가되는 시점, 즉 전역 코드 평가 시점에 실행중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.
- **따라서 함수 객체 내부 슬롯 \[[Environment]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프다. 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장될 참조값이다. 함수 객체는 내부 슬롯 \[[Environment]]에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.**

```jsx
const x = 1;

function foo() {
  const x = 10;
  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 \[[Environment]]에 저장하여 기억한다.
function bar() {
  console.log(x);
}

foo();
bar();
```

- foo 함수와 bar 함수는 모두 전역에서 함수 선언문으로 정의되었기 때문에 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성하고 전역 객체 window의 메서드가 된다.
- 이 때 생성된 함수 객체의 내부 슬롯 \[[Environment]]에는 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.
- 함수가 호출되면 함수 내부로 코드의 제어권이 이동하고 함수 코드를 평가하기 시작한다.

  1. 함수 실행 컨텍스트 생성
  2. 함수 렉시컬 환경 생성

     2.1 함수 환경 레코드 생성

     2.2 this 바인딩

     2.3 외부 렉시컬 환경에 대한 참조 결정

- 이 때 함수 렉시컬 환경의 구성 요소인 **외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯\[[Environment]]에 저장된 렉시컬 환경의 참조가 할당된다**. 즉, 함수 객체 내부 슬롯 \[[Environment]]에 저장된 렉시컬 환경의 참조는 바로 함수의 상위 스코프를 의미한다. 이것이 바로 함수 정의 위치에 따라 상위 스코프를 결정하는 렉시컬 스코프의 실체이다.
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/d4409732-2b7a-44db-9535-bc333254d061/Untitled.png?id=8143e8f6-a360-41fd-ac5b-3ea6a33bae1c&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1713096000000&signature=kshGzP151ToSOH6--bAQNKwJlXrw2PH-zYCJOa0qthY&downloadName=Untitled.png)

## 24.3 클로저와 렉시컬 환경

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
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop되어 제거된다.
const innerFunc = outer();
innerFunc(); // 10
```

- outer 함수를 호출하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기를 마감한다. 즉, outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거된다.
- 이때 outer 함수의 지역 변수 x와 변수 값 10을 저장하고 있던 outer 함수의 실행 컨텍스트가 제거되었으므로 outer 함수의 지역 변수 x 또한 생명 주기를 마감하여 outer 함수의 지역 변수 x는 더는 유효하지 않을 것처럼 보이지만 실행 결과는 지역 변수 x가 다시 부활이라도 한듯이 10으로 동작한다.
- 이처럼 **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다.**
- “클로저는 그 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다”라는 정의에서 “그 함수가 선언된 렉시컬 환경”이란 함수가 정의된 위치의 스코프, 즉 상위 스코프를 의미하는 실행 컨텍스트의 렉시컬 환경을 말한다.
- 자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다고 했다. 모든 함수가 기억하는 상위 스코프는 함수를 어디서 호출하든 상관없이 유지된다. 따라서 함수를 어디서 호출하든 상관없이 함수는 언제나 자신이 기억하는 상위 스코프의 식별자를 참조할 수 있으며 식별자에 바인딩된 값을 변경할 수도 있다.
- 위 예제에서 inner 함수는 자신이 평가될 때 자신이 정의된 위치에 의해 결정된 상위 스코프를 \[[Environment]] 내부 슬롯에 저장한다. 이때 저장된 상위 스코프는 함수가 존재하는 한 유지된다.
- outer 함수가 평가되어 함수 객체를 생성할 때 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 전역 렉시컬 환경을 outer 함수 객체의 \[[Environment]] 내부 슬롯에 상위 스코프로서 저장한다.
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/cb5b794a-f87a-4424-9dc8-97a0157e2d2f/Untitled.png?id=ad30fa67-a214-4607-9763-ddd5dfbccd2e&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1713096000000&signature=5Fr2FW8NK4PYHy5SYXNVOJBM_BoqgH1FTmolj_zGanU&downloadName=Untitled.png)
- outer 함수를 호출하면 outer 함수의 렉시컬 환경이 생성되고 앞서 outer 함수 객체의 \[[Environment]] 내부 슬롯에 저장된 전역 렉시컬 환경을 outer 함수 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 할당한다.
- 그리고 중첩 함수 inner가 평가된다.( inner 함수는 함수 표현식으로 정의했기 때문에 런타임에 평가된다.) 이때 중첩 함수 inner는 자신의 \[[Evnironment]] 내부 슬롯에 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 outer 함수의 렉시컬 환경을 상위 스코프로서 저장한다.
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/8c770f51-17d2-44f2-9eab-b778ff6840f8/Untitled.png?id=9f8b6078-37a4-4b4f-87f5-3c747c0d3416&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1713096000000&signature=ylbvZOCYxTPznzo_toMuKjfUHRZ0wxqieV4C1RH7ouQ&downloadName=Untitled.png)
- outer 함수의 실행이 종료되면 inner 함수를 반환하면서 outer 함수의 생명주기가 종료된다. 즉 outer 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거된다. **이때 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.**
- outer 함수의 렉시컬 환경은 inner 함수의 \[[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문이다. 가비지 컬렉터는 누군가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다.
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/e506de8a-869d-439c-b43f-86d883c9b463/Untitled.png?id=88419c24-9091-44c2-939a-9502da8686ce&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1713096000000&signature=9rlCeoT2mrTO9skFaB4voGitrYkeckXldrtdr9a1sv8&downloadName=Untitled.png)
- outer 함수가 반환한 inner 함수를 호출하면 inner 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 푸시된다. 그리고 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에는 inner 함수 객체의 \[[Environment]] 내부 슬롯에 저장되어 있는 참조값이 할당된다.
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/55ec8d86-c94d-4d28-84cd-57a758373469/Untitled.png?id=e11e8bcc-fb68-42e6-be39-7607ff20c910&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1713096000000&signature=-ba4GQR5Cmoocv8OvwY5HH43J59u5dlkTJ2j6HkZ6OE&downloadName=Untitled.png)
- 중첩 함수 inner는 외부 함수 outer보다 더 오래 생존했다. 이때 외부 함수보다 더 오래 생존한 중첩 함수는 외부 함수의 생존 여부와 상관없이 자신이 정의된 위치에 의해 결정된 상위 스코프를 기억한다. 이처럼 중첩 함수 inner의 내부에서는 상위 스코프를 참조할 수 있으므로 상위 스코프의 식별자를 참조할 수 있고 식별자의 값을 변경할 수도 있다.
- 자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저다. 하지만 일반적으로 모든 함수를 클로저라고 하지는 않는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;
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

![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/4ac6cc74-ec94-4dad-9913-dc56298c726d/Untitled.png?id=ab64f06d-6817-4a72-86ae-aafc54977b45&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1713096000000&signature=bALPQrbLkaqK6j8t63061CqgMG4frjRiaSCqW8O-3hU&downloadName=Untitled.png)

- 위 예제의 중첩 함수 bar는 외부 함수 foo보다 더 오래 유지되지만 상위 스코프의 어떤 식별자도 참조하지 않는다. 이처럼 상위 스코프의 어떤 식별자도 참조하지 않는 경우 대부분의 모던 브라우저는 최적화를 통해 다음 그림과 같이 상위 스코프를 기억하지 않는다. 따라서 bar 함수는 클로저라고 할 수 없다. 다른 예제를 살펴보자

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;

        // bar 함수는 클로저였지만 곧바로 소멸한다.
        // 이러한 함수는 일반적으로 클로저라고 하지 않는다.
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

- bar 함수는 상위 스코프의 식별자를 참조하고 있으므로 클로저다. 하지만 foo 함수의 외부로 중첩 함수 bar가 반환되지 않아 외부함수 foo보다 중첩함수 bar의 생명주기가 짧다. 이런 경우 중첩함수 bar는 클로저였지만 외부 함수보다 일찍 소멸되기 때문에 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;
        // 클로저
        // 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.
        function bar() {
          debugger;
          // 상위 스코프의 식별자를 참조한다.
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

- 위 예제의 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있고 외부 함수의 외부로 반환되어 외부 함수보다 더 오래 살아남으므로 클로저다.
- **클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.**
- 다만 클로저인 중첩함수 bar는 상위 스코프의 x, y 식별자중 x만 참조하고 있는데 이러한 경우 대부분의 모던 브라우저는 최적화를 통해 상위 스코프의 식별자 중에서 클로저가 참조하고 있는 식별자만을 기억한다.
- 클로저에 의해 참조되는 상위 스코프의 변수(x)를 **자유변수라고 부른다.** 클로저란 “함수가 자유변수에 대해 닫혀있다”라는 의미다.

## 24.4 클로저의 활용

- 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다. 즉, 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

```jsx
// 카운트 상태 변수
let num = 0;

// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태를 1만큼 증가시킨다.
  return ++num;
};

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

- 이 예제의 num 변수(호출된 횟수)가 안전하게 변경하고 유지해야 할 상태다.
- 위 코드는 잘 동작하지만 오류를 발생시킬 가능성을 내포하고 있는 좋지 않은 코드다. 그 이유는 위 예제가 바르게 동작하려면 다음의 전제 조건이 지켜져야 하기 때문이다.
  - 카운트 상태(num 변수의 값)는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
  - 이를 위해 카운트 상태는 increase 함수만이 변경할 수 있어야 한다.
- 하지만 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제드닞 누구나 접근할 수 있고 변경할 수 있다(암묵적 결합). 이는 의도치 않게 상태가 변경될 수 있다는 것을 의미한다.
- 따라서 카운트 상태를 안전하게 변경하고 유지하기 위해서는 increase 함수만이 num 변수를 참조하고 변경할 수 있게 하는 것이 바람직하다. 이를 위해 전역 변수 num을 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태 변경을 방지해보자.

```jsx
// 카운트 상태 변경 함수
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;
  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가시킨다.
    return ++num;
  };
})();

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

- increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저다.
- 즉시 실행 함수는 호출된 이후 소멸되지만 반환한 클로저는 increase 변수에 할당되어 호출된다. 이때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있다. 따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.
- 즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일은 없을 것이다. 또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없기 때문에 더 안정적인 프로그래밍이 가능하다.
- **이처럼 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.**
- 감소시키는 기능도 추가해보자.

```jsx
// 카운트 상태 변경 함수
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;
  // 클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

- 객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다. 위 예제의 increase, decrease 메서드의 상위 스코프는 increase, decrease 메서드 평가되는 시점에 실행중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다.
- 따라서 increase, decrease 메서드가 언제 어디서 호출되든 상관없이 즉시실행 함수의 스코프의 식별자를 참조할 수 있다. 위 예제를 생성자 함수로 표현하면 다음과 같다.

```jsx
const Counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  function Counter() {
    // this.num = 0; // 프로퍼티는 public 하므로 은닉되지 않는다.
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

- 만약 num이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티라면 인스턴스를 통해 외부에서 접근이 자유로운 public 프로퍼티가 된다. 하지만 즉시 실행 함수 내에 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수다.
- 생성자 함수 Counter는 프로토타입을 통해 increase, decrease 메서드를 상속받는 인스턴스를 생성한다. increase, decrease 메서드는 모두 자신의 함수 정의가 평가되어 함수 객체가 될 때 실행중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저다.
- 변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적인 원인이 될 수 있다. 외부 상태 변경이나 가변데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.
- 다음은 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제이다.

```jsx
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 반환한다.
const increaser = makeCounter(increase);
console.log(increaser()); //1
console.log(increaser()); //2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

- makeCounter가 반환하는 함수는 자신이 생성됬을 떄의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저다.
- makeCounter 함수는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다. 이때 주의해야 할 것은 **makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것이다**. 이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.
- 위 예제에서 전역변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다. 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두번 호출하지 않아야 한다.

```jsx
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
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

// 보조 함수
function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); //1
console.log(counter(increase)); //2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

## 24.5 캡슐화와 정보 은닉

- 캡슐화는 객체 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.
- 정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성, 즉 결합도를 낮추는 효과가 있다.
- 대부분의 객체지향 프로그래밍 언어는 클래스를 정의하고 그 클래스를 구성하는 멤버에 대하여 public, private, protected 같은 접근 제한자를 선언하여 공개 범위를 한정할 수 있다.
- 자바스크립트는 접근 제한자를 제공하지 않는다. 따라서 자바스크립트 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있다. 즉, 객체의 모든 프로퍼티와 메서드는 기본적으로 public하다.

```jsx
const Person = (function () {
  let _age = 0; // private

  // 생성자 함수
  function Person(name, age) {
    this.name = name; // public
    _age = age;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

- 위 패턴을 사용하면 자바스크립트에서도 정보 은닉이 가능한 것처럼 보인다.
- 즉시 실행 함수가 반환하는 Person 생성자 함수와 Person 생성자 함수의 인스턴스가 상속받아 호출할 Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출된다. 하지만 Person 생성자 함수와 sayHi 메서드는 이미 종료되어 소멸한 즉시 실행 함수의 지역 변수 \_age를 참조할 수 있는 클로저다.
- 하지만 위 코드도 문제가 있다. Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 다음과 같이 \_age 변수의 상태가 유지되지 않는다는 것이다.

```jsx
const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다.
me.sayHi(); // Hi! My name is Lee. I am 30.
```

- Person.prototype.sayHi 메서드가 단 한 번 생성되는 클로저이기 때문에 발생하는 현상이다.
- Person.prototype.sayHi 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 \[[Environment]]에 저장하여 기억한다. 따라서 Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 Person.prototype.sayHi 메서드의 상위 스코프는 어떤 인스턴스로 호출하더라도 하나의 동일한 상위 스코프를 사용하게 된다.
- 이러한 이유로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 위와 같이 \_age 변수의 상태가 유지되지 않는다.
- 이처럼 자바스크립트는 정보 은닉을 완전하게 지원하지 않는다. 인스턴스의 메서드를 사용하면 자유 변수를 통해 private을 흉내 낼 수 있지만 프로토타입 메서드를 사용하면 이마저도 불가능해진다. ES6의 Symbol, WeakMap을 사용하여 private한 프로퍼티를 흉내 내기도 했으나 근본적인 해결책이 되지 않는다.
- 다행히도 TC39 프로세스의 stage 3에는 클래스에 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어있고 최신브라우저와 Node.js에 이미 구현되어 있다.

## 24.6 자주 발생하는 실수

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

- for 문의 변수 선언문에서 var 키워드로 선언한 i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수다. 전역 변수 i에는 0, 1, 2가 순차적으로 할당된다. 따라서 funcs 배열의 요소로 추가한 함수를 호출하면 전역 변수 i를 참조하여 i의 값 3이 출력된다.
- 클로저를 사용해 위 예제를 바르게 동작하는 코드로 만들어보자 또한, 자바스크립트의 함수레벨 스코프특성으로 인해 일어난 현상이기 때문에 ES6의 let 키워드를 사용해 해결할 수도 있다.

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    // 1
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

- 1에서 즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개변수 id에 할당한 후 중첩 함수를 반환하고 종료된다. 즉시 실행 함수가 반환한 함수는 funcs 배열에 순차적으로 저장된다.
- 이때 즉시 실행 함수의 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수의 상위 스코프에 존재한다. 즉시 실행 함수가 반환한 중첩 함수는 자신의 상위 스코프를 기억하는 클로저고, 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수에 묶여있는 자유 변수가 되어 그 값이 유지된다.

```jsx
var funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (let j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // 0 1 2
}
```

- for문의 변수 선언문에서 let 키워드로 선언한 초기화 변수를 사용한 for문이 평가되면 먼저 새로운 렉시컬 환경을 생성하고 초기화 변수 식별자와 값을 등록한다. 그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체한다.
- for문의 코드 블록이 반복 실행되기 시작하면 새로운 렉시컬 환경을 생성하고 for문 코드 블록 내의 식별자와 값을 등록한다. 그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체한다.
- for문의 코드 블록의 반복 실행이 모두 종료되면 for 문이 실행되기 이전의 렉시컬 환경을 실행 중인 실행 컨텍스트의 렉시컬 환경으로 되돌린다.

- 이처럼 let이나 const 키워드를 사용하는 반복문은 코드블록을 반복 실행할 때마다 새로운 렉시컬 환경을 생성하여 반복할 당시의 상태를 바치 스냅샷을 찍는 것처럼 저장한다.
- 단, 이는 반복문의 코드 블록 내부에서 함수를 정의할 때 의미가 있다. 반복문의 코드 블록 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은 반복 직후, 아무도 참조하지 않기 때문에 가비지 컬렉션의 대상이된다.
- 또 다른 방법으로 함수형 프로그래밍의 기법인 고차 함수를 사용하는 방법이 있다. 이 방법은 변수와 반복문의 사용을 억제할 수 있기 때문에 오류를 줄이고 가독성을 좋게 만든다.

```jsx
// 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
// 배열의 요소로 추가된 함수들은 모두 클로저다.
const funcs = Array.from(new Array(3), (_, i) => () => i); // (3) [f, f, f]

// 배열의 요소로 추가된 함수들을 순차적으로 호출한다.
funcs.foreEach((f) => console.log(f())); // 0 1 2
```

---

# 면접 예상 질문

## 💥 클로저란?

외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다. 또한 클로저가 참조하는 상위 스코프의 변수를 자유 변수라고 부른다.

## 💥 클로저는 상위 스코프를 어떻게 참조할 수 있는가?

함수 정의가 평가되어 함수 객체를 생성할 때 자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 \[[Environment]]에 저장하고 이 참조값을 함수가 호출되었을 때 생성될 함수 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장한다.

## 💥 캡슐화, 정보은닉이란?

캡슐화는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말하며 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.

---
