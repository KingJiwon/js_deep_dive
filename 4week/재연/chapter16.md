# 16. 프로퍼티 어트리뷰트

### 16.1 내부 슬롯과 내부 메서드

- 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(pseudo property)와 의사 메서드(pseudo method)이다.
- 자바스크립트 엔진의 내부 로직이므로 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다. (일부 예외는 존재한다)

```jsx
    const o = {};
    // 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근불가
    o.[[Prototype]] // => Uncaught SyntaxError: Unexpected Token '['
    //단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
    o.__proto__ // Object.prototype
```

### 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

- 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

- 프로퍼티의 상태란?

  - 프로퍼티의 값 (value)
  - 값의 갱신 가능 여부 (writable)
  - 열거 가능 여부 (enumerable)
  - 재정의 가능 여부 (configurable)

- 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)인 내부 슬롯이다.
  - [[Value]],[[Writable]],[[Enumerable]],[[Configurable]]
  - 따라서 어트리뷰트에 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 통해서 간접적으로 확인할 수 있다.

```jsx
const person = {
  name: "Lee",
};

// 첫 번째 매개변수에는 객체의 참조를 전달하고, 두 번째 매개변수에는 프로퍼티 키를 문자열로 전달한다.
// 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined를 반환한다.

console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

- ES8 에서 도입된 모든 프로퍼티에 프로퍼티 어트리뷰트 정보를 제공하는 Object.getOwnPropertyDescriptors() 메서드

```jsx
const person = {
  name: "Lee",
};
//프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
/** 
 {
    name: {value: "Lee", writable: true, enumerable: true, configurable: true},
    age: {value: 20, writable: true, enumerable: true, configurable: true}
 }
*/
```

### 16.3 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티
  - 키와 값으로 구성된 일반적인 프로퍼티다, 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.
- 접근자 프로퍼티
  - 자체적으로는 값을 가지고 있지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)로 구성된 프로퍼티이다.

#### 16.3.1 데이터 프로퍼티

<table>
  <tr><th>프로퍼티<br/>어트리뷰트</th><th>프로퍼티<br/>디스크립터<br/>객체의<br/>프로퍼티</th><th>설명</th></tr>
  <tbody>
    <tr>
      <td>[[Value]]</td> <td>value</td> <td> 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값이다. <br/>프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당한다.<br/>이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장한다. </td> 
    </tr>
     <tr>
      <td>[[Writable]]</td> <td>writable</td> <td>프로퍼티 값의 변경 가능여부를 나타내며 불리언 값을 갖는다. <br/>값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.</td> 
    </tr>
     <tr>
      <td>[[Enumerable]]</td> <td>enumerable</td> <td>프로퍼티 열거 가능여부를 나타내며 불리언 값을 갖는다.<br/> 값이 false인 경우 해당 프로퍼티는 for...in문이나 Object.keys 메서드 등으로 열거할 수 없다.</td> 
    </tr>
     <tr>
      <td>[[Configurable]]</td> <td>configurable</td> <td>프로퍼티 재정의 가능여부를 나타내며 불리언 값을 갖는다.<br/> 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다.<br/>단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다.</td> 
    </tr>
  </tbody>
</table>

#### 16.3.1 접근자 프로퍼티

<table>
  <tr><th>프로퍼티<br/>어트리뷰트</th><th>프로퍼티<br/>디스크립터<br/>객체의<br/>프로퍼티</th><th>설명</th></tr>
  <tbody>
    <tr>
      <td>[[Get]]</td> <td>get</td> <td> 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수다. <br/>즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 [[Get]]의 값인 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.</td> 
    </tr>
     <tr>
      <td>[[Set]]</td> <td>set</td> <td>접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수다. <br/>즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 [[Set]]의 값인 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다. </td> 
    </tr>
     <tr>
      <td>[[Enumerable]]</td> <td>enumerable</td> <td>데이터 프로퍼티의 [[Enumerable]]과 같다.</td> 
    </tr>
     <tr>
      <td>[[Configurable]]</td> <td>configurable</td> <td>데이터 프로퍼티의 [[Configurable]]과 같다.</td> 
    </tr>
  </tbody>
</table>

- 접근자 프로퍼티 예제

```jsx
const person = {
  firstName : "Jaeyeon",
  lastName : "Yang",

  // get 키워드 뒤에 정의하는 함수가 getter 함수가 된다.
  get fullName(){
      return `${this.firstName}${this.lastName}`;
  }
  // set 키워드 뒤에 정의하는 함수가 getter 함수가 된다.
  set fullName(name){
      [this.firstName,this.lastName] = name.split(" ");
  }
}
```

- 내부 슬롯/메서드 관점에서 설명하자면 다음과 같다. <br/> 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]] 내부 메서드가 호출되어 다음과 같이 동작한다.
  1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심벌이어야 한다. 프로퍼티 키 "fullName"은 문자열이므로 유효한 프로퍼티 키다.
  2. 프로토타입 체인에서 프로퍼티를 검색한다. person 객체에 fullName 프로퍼티가 존재한다.
  3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. fullName 프로퍼티는 접근자 프로퍼티이다.
  4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값인 getter 함수를 호출하여 그 결과를 반환한다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는 프로퍼티 디스크립터 객체의 get 프로퍼티 값과 같다.

##### 프로토타입 (prototype)

프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속한다.
<br/>프로토타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용할 수 있다.
<br/>프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다.
<br/>객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례로 검색한다.

```jsx
// 일반 객체의 __proto__ 는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
// {get: f, set: f , enumerable: false , configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function () {}, "prototype");
// {value: {...}, writable: true , enumerable: false , configurable: false}
```

### 16.4 프로퍼티 정의

- 프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.
- Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다.
- 인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립터 객체를 전달한다.

```jsx
const person = {};

Object.defineProperty(person, "firstName", {
  value: "jaeyeon",
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person, "lastName", {
  value: "yang",
  /**지금처럼 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다.
   생략한 어트리뷰트는 다음과 같은 기본값이 적용된다.
   value => undefined
   get => undefined
   set => undefined
   writable => false
   enumerable => false
   configurable => false
  */
});
```

- Object.defineProperties 메서드를 사용하면 여러개의 프로퍼티를 한번에 정의할 수 있다.

### 16.5 객체 변경 방지

- 객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다.

#### 16.5.1 객체 확장 금지

- Object.preventExtensions 메서드는 객체의 확장을 금지한다.
- 프로퍼티의 추가를 금지하는 것을 뜻한다.
- 프로퍼티 동적 추가와 Object.defineProperty 메서드를 통한 추가 모두 금지된다.
- Object.isExtensible() 메서드로 확장이 가능한 객체인지 확인 가능하다.

#### 16.5.2 객체 밀봉

- Object.seal 메서드는 객체를 밀봉한다.
- 객체 밀봉이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미한다. (읽기와 쓰기만 가능하다.)
- Object.isSealed 메서드로 확인 가능하다.

#### 16.5.3 객체 동결

- Object.freeze 메서드는 객체를 동결한다.
- 객체 동결이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미한다. (읽기만 가능하다.)
- 객체의 동결 여부는 Object.isFrozen 메서드로 확인할 수 있다.

#### 16.5.4 불변 객체

- 객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 <br/>객체를 값으로 갖는 모든 프로퍼티에 재귀적으로 Object.freeze 메서드를 호출해야한다.

# 면접 예상 질문

## 💥데이터 프로퍼티와 접근자 프로퍼티에 대해 설명해주세요.

- ...

## 💥프로토타입 객체에 대해 설명해주세요.

- ...

## 💥불변 객체를 만드는 방법에 대해 설명해주세요.

- ...

# 이야기하고 싶은 것
