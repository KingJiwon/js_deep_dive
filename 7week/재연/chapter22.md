# 22. this

### 22.1 this 키워드

- 객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.
  동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다.
  이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 <b>자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.</b>
  객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.

```jsx
const circle = {
  radius: 5,

  getDiameter() {
    return 2 * circle.radius;
  },
};

console.log(circle.getDiameter()); //10
```

- getDiameter 메서드 내에서 메서드 자신이 속한 객체 circle을 참조하고 있다. 이 참조 표현식이 평가되는 시점은 getDiameter 메서드가 호출되어 함수 몸체가 실행되는 시점이다. 위 예제의 객체 리터럴은 circle 변수에 할당되기 직전에 평가된다. 따라서 getDiameter 메서드가 호출되는 시점에는 이미 객체 리터럴 평가가 완료되어 객체가 생성되었고 circle 식별자에 생성된 객체가 할당된 이후다. 따라서 메서드 내부에서 circle 식별자를 참조할 수 있다.

- 하지만 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지도 바람직하지도 않다. 다음은 생성자 함수 방식으로 인스턴스를 생성하는 경우이다.

```jsx
 function Circle () {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  ????.radius = radius;
 }

 Circle.prototype.getDiameter =  function () {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  return 2 * ????.radius;
 }

  // 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야한다.
  const circle = new Circle(5);
```

- 생성자 함수 내부에서는 프로퍼티 또는 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야한다. 하지만 생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정의한 이후 new 연산자와 함께 생성자 함수를 호출하는 단계가 추가로 필요하다. 다시 말해, 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수가 존재해야한다.

- <b>this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.</b>

- this 는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼 this도 지역 변수처럼 사용할 수 있다. 단 <b>this가 가리키는 값, this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.</b>

#### this 바인딩

    - 바인딩이랑 식별자와 값을 연결하는 과정을 의미한다. 예를 들어, 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this 바인딩은 this와 this가 가리킬 객체를 바인딩하는 것이다.

- 자바나 C++ 같은 클래스 기반 언어에서 this는 언제나 클래스가 생성하는 인스턴스를 가리킨다. 하지만 <b>자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this 바인딩이 동적으로 결정된다.</b> 또한 strict mode 역시 this 바인딩에 영향을 준다.

- this는 코드 어디에서든 참조 가능하다. 전역세서도 함수 내부에서도 참조할 수 있다.

```jsx
console.log(this); // window

function square(number) {
  // 일반 함수 내에서는 전역 객체를 가리킨다.
  console.log(this); //window
  return number * number;
}
square(2);

const person = {
  name: "yang",
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this); // {name:"yang", getName:f}
    return this.name;
  },
};

console.log(person.getName()); // yang

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {name:"yang"}
}

const me = new Person("yang");
```

### 22.2 함수 호출 방식과 this 바인딩

- <b>this 바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.</b>

#### 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.

    - 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.

- 주의할 것은 동일한 함수도 다양한 방식으로 호출할 수 있다는 것이다.
  1. 일반 함수 호출
  2. 메서드 호출
  3. 생성자 함수 호출
  4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```jsx
const foo = function () {
  console.dir(this);
};

// 1. 일반 함수 호출
// 이때 함수 내부의 this는 전역 객체를 가리킨다.
foo();

// 2. 메서드 호출
// 이때 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo();

// 3. 생성자 함수 호출
// 이때 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo();

// 4. apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: "bar" };

foo.call(bar); //bar
foo.apply(bar); //bar
foo.bind(bar)(); //bar
```

#### 22.2.1 일반 함수 호출

- 전역 함수는 물론이고 중첩 함수를 <b>일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩된다.</b>
- 다만 this는 객체의 프로퍼티나 메서들르 참조하기 위한 자기 참조 변수이므로 일반 함수에서 this는 의미가 없다. 따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.

- 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.

```jsx
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this", this); // {value: 100 , foo: f}
    console.log("foo's this.value", this.value); // 100
    function bar() {
      console.log("foo's this", this); //window
      console.log("foo's this.value", this.value); // 1
    }

    bar();
  },
};

obj.foo();
```

- 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.

- 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 다음과 같다.

```jsx
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value);
    }, 100);
  },
};

obj.foo();
```

- <b>콜백 함수를 화살표 함수로 작성할 경우 this 바인딩은 obj로 동작</b>

```jsx
const obj = {
  value: 100,
  foo() {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    setTimeout(() => {
      console.log(this.value); // 100 정상적으로 나옴
    }, 100);
  },
};

obj.foo();
```

- 이외에도 자바스크립트는 this를 명시적으로 바인딩할 수 있는 apply, call, bind 메서드를 제공한다.

#### 22.2.2 메서드 호출

- 메서드 내부의 this는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩된다. 주의할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다는 것이다.

```jsx
const person = {
  name: "yang",
  getName() {
    //메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // yang
```

- person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. getName 프로퍼티가 함수 객체를 가리키고 있을 뿐이다. 따라서 getName 프로퍼티가 가리키는 함수 객체인 getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

```js
const person = {
  name: "yang",
  getName() {
    //메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

const anotherPerson = {
  name: "kim",
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;
//getName을 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // kim
//getName을 변수에 할당
const getName = person.getName;
//getName을 일반 함수로 호출
console.log(getName()); // ''
// 브라우저에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
```

- 따라서 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다. 프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.

#### 22.2.3 생성자 함수 호출

- 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩 된다.

#### 22.2.4 apply / call / bind 메서드에 의한 간접 호출

- apply와 call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

```jsx
/**
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param argsArr - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
 * @returns 호출된 함수의 반환값
*/
Function.prototype.apply(thisArg[,argsArray]);

/**
 * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param arg1 @param arg2  - 함수에게 전달할 인수 리스트
 * @returns 호출된 함수의 반환값
*/
Function.prototype.call(thisArg[,arg1[,arg2[,...]]]);
```

```jsx
function getThisBinding() {
  return this;
}
// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); //window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // {a:1}
console.log(getThisBinding.call(thisArg)); // {a:1}
```

- apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

- apply와 call 메서드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다. 위 예제는 호출할 함수, 즉 getThisBinding 함수에 인수를 전달하지 않는다.

- apply와 call 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다. arguments 객체는 배열이 아니기 때문에 slice 같은 메서드를 사용할 수 없으나 apply 와 call 메서드를 이용하면 가능하다.

```jsx
function convertArgsToArr() {
  console.log(arguments);

  // arguments객체를 배열로 변환
  const arr = Array.prototype.slice.call(arguments, [0], [2]);
  console.log(arr); //[1,2] === Array.from(arguments).slice(0,2);
  return arr;
}

convertArgsToArr(1, 2, 3, 4, 5); // [1,2]
```

- bind 메서드는 apply 와 call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만을 전달한다.

```jsx
function convertArgsToArr() {
  console.log(arguments);

  // arguments객체를 배열로 변환
  const arr = Array.prototype.slice.bind(arguments, 0, 2);
  console.log(arr()); // [1,2]
  return arr;
}

convertArgsToArr(1, 2, 3, 4, 5); //[1,2]
```

# 면접 예상 질문

## 💥 This 키워드에 대해 설명해주세요.

-this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수입니다.
this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있습니다.

## 💥this를 명시적으로 바인딩할 수 있는 방법에 대해 설명해주세요.

- Function.prototype의 메서드로 어떤 함수에서도 호출할 수 있는 apply, call, bind 메서드가 있습니다.  
  세가지 메서드 모두 자신을 호출한 함수의 내부에서 가리키는 this에다가 호출시 받은 인수를 바인딩합니다.
  apply와 call은 마침표연산 앞의 함수를 즉시 호출하지만 bind는 호출하지 않습니다.

# 이야기하고 싶은 것
