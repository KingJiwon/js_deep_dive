# 28. Number

### 28.1 Number 생성자 함수

- 표준 빌트인 객체 Number 객체는 생성자 함수이다. 따라서 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.

- Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다.
- [[NumberData]]는 ES5에서 [[PrimitiveValue]]라 불렀다.

- Number 생성자 함수의 인수로 숫자를 전달하면서 new 연산자와 함께 호출하면 [[NumberData]] 내부 슬롯에 인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성한다.

```jsx
const numObj = new Number(10);
console.log(numObj); // Number {[[PrimitiveValue]]: 10}
```

- Number 생성자 함수의 인수로 숫자가 아닌 값을 전달하면 인수를 숫자로 강제 변환한 후, [[NumberData]] 내부 슬롯에 변환된 숫자를 할당한 Number 래퍼 객체를 생성한다. 인수를 숫자로 변환할 수 없다면 NaN을 [[NumberData]] 내부 슬롯에 할당한 Number 래퍼 객체를 생성한다.

```jsx
const numObj = new Number("10");
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

const numObj = new Number("Hello");
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
```

- new 연산자를 사용하지 않고 Number 생성자 함수를 호출하면 Number 인스턴스가 아닌 숫자를 반환한다. 이를 이용하여 명시적으로 타입을 변환하기도 한다.

```jsx
// 문자열 타입 => 숫자 타입
Number("0"); // -> 0
Number("-1"); // -> 1
Number("10.53"); // -> 10.53

// 불리언 타입 => 숫자 타입
Number(true); // -> 1
Number(false); // -> 0
```

### 28.2 Number 프로퍼티

#### 28.2.1 Number.EPSILION

- ES6에서 도입된 Number.EPSILION은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다. Number.EPSILION은 약 2.2204460492503130808472633361816 x 10의 -16승 이다.

- 부동소수점 산술 연산은 정확한 결과를 기대하기 어렵다. 정수는 2진법으로 오차 없이 저장 가능하지만 부동소수점을 표현하기 위해 가장 널리 쓰이는 표준인 IEEE754는 2진법으로 변환했을 때 무한소수가 되어 미세한 오차가 발생할 수밖에 없는 구조적 한계가 있다.

```jsx
0.1 + 0.2; // -> 0.300000000000004
0.1 + 0.2 === 0.3; // false
```

- Number.EPSILION은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다. 다음 예제는 Number.EPSILION을 사용하여 부동소수점을 비교하는 함수다.

```jsx
function isEqual(a, b) {
  // a와 b를 뺀 값의 절대값이 Number.EPSILION보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILION;
}

isEqual(0.1 + 0.2, 0.3);
```

#### 28.2.2 Number.MAX_VALUE

- Number.MAX_VALUE는 자바스크립트에서 표현할 수 있는 가장 큰 양수 값이다. Number.MAX_VALUE보다 큰 숫자는 Infinity다.

#### 28.2.3 Number.MIN_VALUE

- Number.MIN_VALUE 자바스크립트에서 표현할 수 있는 가장 작은 양수 값이다. Number.MIN_VALUE보다 작은 숫자는 0이다.

#### 28.2.4 Number.MAX_SAFE_INTEGER

- Number.MAX_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값이다.

#### 28.2.5 Number.MIN_SAFE_INTEGER

- Number.MIN_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값이다.

#### 28.2.6 Number.POSITIVE_INFINITY

- Number.POSITIVE_INFINITY는 양의 무한대를 나타내는 숫자값 Infinity와 같다.

#### 28.2.7 Number.NEGATIVE_INFINITY

- Number.NEGATIVE_INFINITY는 음의 무한대를 나타내는 숫자값 -Infinity와 같다.

#### 28.2.8 Number.NaN

- Number.NaN은 숫자가 아님을 나타내는 숫자값이다. window.NaN과 같다.

### 28.3 Number 메서드

#### 28.3.1 Number.isFinite

- 정적 메서드이고 인수로 전달된 숫자값이 정상적인 유한수, 즉 Infinity 또는 -Infinity가 아닌지 검사하여 그 결과를 불리언 값으로 반환한다.

- 빌트인 전역 함수 isFinite와 차이가 있다. 빌트인 전역 함수 isFinite는 전달 받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행하지만 Number.isFinite는 전달받은 인수를 숫자로 암묵적 타입 변환하지 않는다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false다.

```jsx
Number.isFinite(null); // -> false

isFinite(null); // -> true
```

#### 28.3.2 Number.isInteger

- ES6에서 도입된 Number.isInteger 정적 메서드는 인수로 전달된 숫자값이 정수인지 검사하여 그 결과 값을 불리언 값으로 반환한다. 검사하기 전에 인수를 숫자로 암묵적 타입 변환하지 않는다.

#### 28.3.3 Number.isNaN

- 정적 메서드로 인수로 전달된 숫자값이 NaN인지 검사하여 그 결과를 불리언 값으로 반환한다.

- 빌트인 전역 함수 isNaN과 차이가 있다. 빌트인 전역 함수 isNaN은 전달받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행하지만 Number.isNaN 메서드는 전달받은 인수를 숫자로 암묵적 타입 변환하지 않는다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false다.

#### 28.3.4 Number.isSafeInteger

- 정적 메서드로 인수로 전달된 숫자값이 안전한 정수인지 검사하여 그 결과를 불리언 값으로 반환한다. 검사전에 인수를 숫자로 암묵적 타입 변환하지 않는다.

#### 28.3.5 Number.prototype.toExponential

- toExponential 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다. 지수 표기법이란 매우 크거나 작은 숫자를 표기할 때 주로 사용하며 e 앞에 있는 숫자에 10의 n승을 곱하는 형식으로 수를 나타내는 방식이다. 인수로 소수점 이하로 표현할 자릿수를 전달할 수 있다.

```jsx
(77.1234).toExponential(); // -> "7.71234e+1"
(77.1234).toExponential(4); // -> "7.7123e+1"
(77.1234).toExponential(2); // -> "7.71e+1"
```

- 참고로 다음과 같이 숫자 리터럴과 함께 Number 프로토타입 메서드를 사용할 경우 에러가 발생한다.

```jsx
77.toExponential(); // -> SyntaxError: Invalid or unexpected token
```

- 숫자 뒤의 .은 의미가 모호하다. 부동 소수점 숫자의 소수 구분 기호일 수도 있고 객체 프로퍼티에 접근하기 위한 프로퍼티 접근 연산자일 수도 있다. 자바스크립트 엔진은 숫자 뒤의 .을 부동 수소점 숫자의 소수 구분 기호로 해석한다. 그러나 여기서 77은 Number 래퍼 객체다. 따라서 77 뒤의 .을 소수 구분 기호로 해석하면 뒤에 이어지는 toExponential을 프로퍼티로 해석할 수 없으므로 에러가 발생한다.

- 자바스크립트 숫자는 정수 부분과 소수 부분 사이에 공백을 포함할 수 없기 때문에 정수 뒤에 공백을 사용하면 .을 프로퍼티 접근 연산자로 해석한다.

#### 28.3.6 Number.prototype.toFixed

- toFixed 메서드는 숫자를 반올림하여 문자열로 반환한다. 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 기본값 0이 지정된다.

#### 28.3.7 Number.prototype.toPrecision

- toPrecision 메서드는 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다. 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과를 반환한다.

- 전체 자릿수를 나타내는 0 ~ 21 사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 기본값 0이 지정된다.

#### 28.3.8 Number.prototype.toString

- toString 메서드는 숫자를 문자열로 변환하여 반환한다. 진법을 나타내는 2 ~ 36 사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 기본값 10진법이 지정된다.

# 면접 예상 질문

## 💥 

# 이야기 하고 싶은 것
