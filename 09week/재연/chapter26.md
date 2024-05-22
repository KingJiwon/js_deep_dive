# 26. ES6 함수의 추가 기능

### 26.1 함수의 구분

- ES6 이전까지 JS 함수는 별다른 구분 없이 다양한 목적으로 사용되었다. 자바스크립트의 함수는 일반적인 함수로서 호출할 수도 있고, new 연산자와 함께 호출하여 인스턴스를 생성할 수 있는 생성자 함수로서 호출할 수도 있으며, 객체에 바인딩되어 메서드로서 호출할 수도 있다. 이는 언뜻 보면 편리한 것 같지만 실수를 유발시킬 수 있으며 성능 면에서도 손해다.

```jsx
var foo = function () {
  return 1;
};

//일반적인 함수로서 호출
foo(); // 1

//생성자 함수로서 호출
new foo(); // foo {}

//메서드로서 호출
var obj = { foo: foo };
obj.foo(); // 1
```

- 이처럼 ES6 이전의 함수는 사용 목적에 따라 명확히 구분되지 않는다. 즉, <b>ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.</b> 다시 말해, ES6 이전의 모든 함수는 callable 이면서 constructor다.

- 주의할 것은 ES6 이전에 일반적으로 메서드라고 부르던 객체에 바인딩된 함수도 callable이며 constructor라는 것이다. 따라서 객체에 바인딩된 함수도 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출 할 수도 있다.

```jsx
var obj = {
    x:10,
    f:  function () {return this.x};
};

//메서드로서 호출
console.log(obj.f()); // 10
//일반 함수로서 호출
var bar = obj.f;
console.log(bar()); //undefined
//생성자 함수로서 호출
console.log(new obj.f()); // f{}
```

- 위 예제처럼 객체에 바인딩된 함수를 생성자 함수로 호출하는 경우가 흔치는 않겠지만 문법상 가능하다는 것은 문제가 있다. 그리고 이는 성능 면에서도 문제가 있다. 객체에 바인딩된 함수가 constructor라는 것은 객체에 바인딩된 함수가 prototype 프로퍼티를 가지며, 프로토타입 객체도 생성한다는 것을 의미하기 때문이다.

- 함수에 전달되어 보조 함수의 역할을 수행하는 콜백 함수도 마찬가지다. 콜백 함수도 constructor이기 때문에 불필요한 프로토타입 객체를 생성한다.

- ES6 이전의 모든 함수는 사용 목적에 따라 명확한 구분이 없으므로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다. 이는 혼란스러우며 실수를 유발할 가능성이 있고 성능에도 좋지 않다.

- 이러한 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 명확히 구분했다.

<table>
<th>
  <td><b>ES6 함수의 구분</b></td>
  <td><b>constructor</b></td>
  <td><b>prototype</b></td>
  <td><b>super</b></td>
  <td><b>arguments</b></td>
<th>  
<tr>
  <td>일반 함수(Normal)</td>
  <td>O</td>
  <td>O</td>
  <td>X</td>
  <td>O</td>
</tr>
<tr>
  <td>메서드(Method)</td>
  <td>X</td>
  <td>X</td>
  <td>O</td>
  <td>O</td>
</tr>
<tr>
  <td>화살표 함수(Arrow)</td>
  <td>X</td>
  <td>X</td>
  <td>X</td>
  <td>X</td>
</tr>
</table>

- 일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수를 말하며, ES6 이전의 함수와 차이가 없다. 하지만 ES6의 메서드와 화살표 함수는 ES6 이전의 함수와 명확한 차이가 있다.

- 일반 함수는 constructor이지만 ES6의 메서드와 화살표 함수는 non-constructor다.

### 26.2 메서드

- ES6 사양에서는 메서드에 대한 정의가 명확하게 규정되었다. <b>ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.</b>

```jsx
const obj = {
  x: 1,
  // foo는 메서드다.
  foo() {
    return this.x;
  },
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

- <b>ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-constructor다.</b> 따라서 ES6 메서드는 생성자 함수로서 호출할 수 없다.

```jsx
new obj.foo(); // TypeError: obj.foo is not a constructor
new obj.bar(); // bar {}
```

- ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
- 참고로 표준 빌트인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor다.

- <b>ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 가진다.</b> super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조하므로 내부 슬롯 [[HomeObject]]를 가지는 ES6 메서드는 super 키워드를 사용할 수 있다.

```jsx
const base = {
  name: "yang",
  sayHi() {
    return `Hi! ${this.name}`;
  },
};

const derived = {
  __proto__: base,
  // sayHi는 ES6메서드이므로 [[HomeObject]]를 가진다.
  // sayHi의 [[HomeObject]]는 derived.prototype을 가리키고
  // super는 sayHi의 [[HomeObject]]의 프로토타입인 base.prototype을 가리킨다.

  sayHi() {
    return `${super.sayHi()}. how are you doing?`;
  },
};

console.log(derived.sayHi()); // Hi! yang. how are you doing?
```

- 이처럼 ES6 메서드는 본연의 기능(super)을 추가하고 의미적으로 맞지 않는 기능(constructor)은 제거했다. 따라서 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋다.

### 26.3 화살표 함수

- 화살표 함수는 표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다. 특히 화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

#### 26.3.1 화살표 함수 정의

##### 함수 정의

- 선언문으로 정의할 수 없고 표현식으로 정의해야한다. 호출 방식은 기존 함수와 동일하다.

##### 매개변수 선언

- 매개변수가 여러 개인 경우 소괄호() 안에 매개변수를 선언한다.
- 매개변수가 하나인 경우 소괄호()를 생략할 수 있다.
- 매개변수가 없는 경우에는 소괄호를 생략할 수 없다.

##### 함수 몸체 정의

- 함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호{}를 생략할 수 있다. 이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.

```jsx
const power = (x) => x ** 2;
power(2); // 4
//위와 동일한 함수
const power = (x) => {
  return x ** 2;
};
```

- 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호()로 감싸 주어야 한다.

```jsx
const create = (id, content) => ({ id, content });
create(1, "javascript"); // {id:1, content:"javascript"};
```

- 함수 몸체가 여러 개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호{}를 생략할 수 없다. 이때 반환값이 있다면 명시적으로 반환해야 한다.
- 화살표 함수도 즉시 실행 함수로 사용할 수 있다.
- 화살표 함수도 일급 객체이므로 map, filter, reduce 같은 고차 함수에 인수로 전달할 수 있다. 이 경우 일반적인 함수 표현식보다 표현이 간결하고 가독성이 좋다.
- 이처럼 화살표 함수는 콜백 함수로서 정의할 때 유용하다. 일반 함수의 기능을 간략화 했으며 this도 편리하게 설계되었다.

#### 26.3.2 화살표 함수와 일반 함수의 차이

- 1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.
- 2. 중복된 매개변수 이름을 선언할 수 없다.
- 3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 가지지 않는다.
     - 따라서 화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 상위 스코프의 값을 참조한다. 만약 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 this, arguments, super, new.target 바인딩이 없으므로 스코프 체인상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this, arguments, super, new.target을 참조한다.

#### 26.3.3 this

- 화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this다. 그리고 화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많다.
- 화살표 함수의 this는 일반 함수와 다르게 동작한다. 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다.
- this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다. 다시 말해 , 함수를 정의할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다. 이때 주의할 것은 일반 함수로서 호출되는 콜백 함수의 경우다. 고차 함수의 인수로 전달 되어 고차 함수 내부에서 호출되는 콜백 함수도 중첩 함수라고 할 수 있다.

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // add메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
    // <1>
    return arr.map(function (item) {
      return this.prefix + item; // <2>
      // TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
```

- 위 예제를 실행했을 때 기대하는 결과는 ["-webkit-transition", "-webkit-user-select"]이다. 하지만 TypeError가 발생한다.

- 프로토타입 메서드 내부인 <1>에서 this는 메서드를 호출한 객체 prefixer를 가리킨다. 그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부인 <2>에서 this는 undefined를 가리킨다. <b>이는 Array.prototye.map 메서드가 콜백 함수를 일반 함수로서 호출하기 때문이다.</b>

- 일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에는 strict mode가 암묵적으로 적용된다. 따라서 Array.prototype.map 메서드의 콜백 함수에도 strict mode가 적용된다. strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this에는 전역 객체가 아니라 undefined가 바인딩 되므로 일반 함수로서 호출되는 Array.prototype.map 메서드의 콜백 함수 내부의 this에는 undefined가 바인딩된다.

- 이때 발생하는 문제가 바로 콜백 함수 내부의 this 문제다. 이를 해결하기 위해 ES6 이전에는 다음과 같은 방법을 사용했다.

  - 1. add 메서드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 후에 콜백 함수 내부에서 사용한다.

  ```jsx
  add(arr) {
      //this를 일단 회피시킨다.
      const that = this;
      return arr.map(function(item){
        //this 대신 that을 참조한다.
        return that.prefix + ' ' + item;
      });
  }
  ```

  - 2. Array.prototype.map의 두번째 인수로 add 메서드를 호출한 prefixer 객체를 가리키는 this를 전달한다. ES5에서 도입된 Array.prototype.map은 콜백 함수 내부의 this문제를 해결하기 위해 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.

  ```jsx
  add(arr) {
      return arr.map(function(item){
        return this.prefix + ' ' + item;
      },this); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
  }
  ```

  - 3. Function.prototype.bind 메서드를 사용하여 add 메서드를 호출한 prefixer 객체를 가리키는 this를 바인딩한다.

  ```jsx
  add(arr) {
      return arr.map(function(item){
        return this.prefix + ' ' + item;
      }).bind(this); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
  }
  ```

- ES6에서는 화살표 함수를 사용하여 콜백 함수 내부의 this 문제를 해결할 수 있다.

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("-webkit");
console.log(prefixer.add(["transition", "user-select"]));
// ["-webkit-transition", "-webkit-user-select"]
```

- <b>화살표 함수는 함수 자체의 this 바인딩을 가지지 않는다. 따라서 함수 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다.</b>

- 화살표 함수는 함수 자체의 this 바인딩을 가지지 않기 때문에 call, apply, bind 메서드를 사용해도 화살표 함수 내부의 this를 교체할 수 없다.

- 프로퍼티를 동적 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.

- 일반 함수가 아닌 ES6 메서드를 동적으로 추가하고 싶다면 다음과 같이 객체 리터럴을 바인딩하고 프로토타입의 constructor 프로퍼티와 생성자 함수 간의 연결을 재설정한다.

```jsx
function Person(name) {
  this.name = name;
}

Person.prototype = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
  constructor: Person,
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};

const person = new Person("yang");
person.sayHi(); //Hi yang
```

- 클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있다.

```jsx
// Bad
class Person {
  // 클래스 필드 정의 제안
  name = "yang";
  sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi yang
```

- 하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다. 따라서 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

#### 26.3.4 super

- 화살표 함수는 함수 자체의 super 바인딩을 가지지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.

- super는 내부 슬롯 [[HomeObject]]를 가지는 ES6 메서드 내에서만 사용할 수 있는 키워드다. sayHi 클래스 필드에 할당한 화살표 함수는 ES6 메서드는 아니지만 함수 자체의 super 바인딩을 가지지 않으므로 super를 참조해도 에러가 발생하지 않고 this와 마찬가지로 클래스 필들에 할당한 화살표 함수 내부에서 super를 참조하면 constructor 내부의 super 바인딩을 참조한다.

#### 26.3.5 arguments

- 화살표 함수는 함수 자체의 arguments 바인딩을 가지지는 않는다. 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.
- 화살표 함수에서는 arguments 객체를 사용할 수 없다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest파라미터를 사용해야한다.

### 26.4 Rest파라미터

- <b>Rest파라미터는 함수에 전달된 인수들의 목록을 배열로 전달 받는다.</b>
- 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.
- Rest 파라미터는 반드시 마지막 파라미터여야 한다.
- Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.
- arguments 객체는 유사배열 객체이기 때문에 배열 메서드를 사용하려면 배열로 변환해야하는 번거로움이 있는데, Rest 파라미터로 가변 인자 함수의 인수 목록을 배열로 전달 받는다면 이러한 번거로움을 해결할 수 있다.

### 26.5 매개변수 기본값

- 함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 바람직하지만 그렇지 않은 경우에도 에러가 발생하지 않는다. 이는 자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다. 인수가 전달되지 않은 매개변수의 값은 undefined다.

- ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화 할 수 있다.

- Rest 파라미터에는 기본값을 지정할 수 없다.
- 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 아무런 영향을 주지 않는다.

# 면접 예상 질문

## 💥 일반함수와 (ES6 메서드, 화살표 함수)의 차이점과 대해 설명해주세요.

- 일반 함수는 생성자 함수로서 호출할 수 있는 constructor이지만 ES6의 메서드와 화살표 함수는 생성자 함수로서 호출할 수 없는 non-constructor입니다. non-constructor이기 때문에 인스턴스를 생성하지 못하고 prototype 객체를 만들지도 않습니다. 또한 ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 가지기 때문에 super 키워드를 사용할 수 있습니다.

## 💥 화살표 함수의 this 바인딩에 대해 설명해주세요.

- 화살표 함수는 함수 자체의 this 바인딩을 가지고 있지 않기 때문에 항상 상위 스코프의 this를 참조합니다. 또한 위와 같은 이유로 call, apply, bind 메서드를 사용해도 화살표 함수 내부의 this를 교체할 수 없습니다.

# 이야기 하고 싶은 것
