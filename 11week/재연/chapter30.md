# 30. Date

- 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.

- 현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시계에 의해 결정된다.

### 30.1 Date 생성자 함수

- Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 가진다. 이 값은 1970년 1월 1일 00:00:00(UTC)을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다.

- 현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우 Date 생성자 함수에 명시적으로 해당 날짜와 시간 정보를 인수로 지정한다.

#### 30.1.1 new Date()

- Date 생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다. 내부적으로 날짜와 시간을 나타내는 정수값을 가지지만 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력한다.

- new 연산자 없이 호출하면 Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환한다.

#### 30.1.2 new Date(milliseconds)

- Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.

#### 30.1.3 new Date(dateString)

- Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다. 이때 인수로 전달한 문자열은 Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.

```jsx
new Date("May 26, 2020 10:00:00");
// -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

new Date("2020/03/26/10:00:00");
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

#### 30.1.4 new Date(year, month[,day,hour,minute,second,millisecond])

- Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다. 이때 연, 월은 반드시 지정해야 한다. 지정하지 않은 옵션 정보는 0 또는 1로 초기화 된다.

```jsx
// 월을 나타내는 2는 3월을 의미한다.
new Date(2020, 2);
// -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미한다. 2020/3/26/10:00:00:00:00
new Date(2020, 2, 26, 10, 00, 00, 0);
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

### 30.2 Date 메서드

#### 30.2.1 Date.now

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

#### 30.2.2 Date.parse

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정
  시간까지의 밀리초를 숫자로 반환한다.

#### 30.2.3 Date.UTC

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정
  시간까지의 밀리초를 숫자로 반환한다. 인수를 new Date(year, month[,day,hour,minute,second,millisecond]) 형식으로 전달해야한다.

#### 30.2.4 Date.prototype.getFullYear

- Date 객체의 연도를 나타내는 정수를 반환한다.

```jsx
new Date("2020/07/24").getFullYear(); // -> 2020
```

#### 30.2.5 Date.prototype.setFullYear

- Date 객체에 연도를 나타내는 정수를 설정한다. 연도 이외에 옵션으로 월, 일도 설정할 수 있다.

```jsx
const today = new Date();

// 년도 지정
today.setFullYear(2000);
today.getFullYear(); // -> 2000

// 년도/월/일 지정
today.setFullYear(199, 0, 1);
today.getFullYear(); // -> 1900
```

#### 30.2.6 Date.prototype.getMonth

- Date 객체의 월을 나타내는 0~11의 정수를 반환한다. 1월은 0, 12월은 11이다.

#### 30.2.7 Date.prototype.setMonth

- Date 객체의 월을 나타내는 0~11의 정수를 설정한다. 1월은 0, 12월은 11이다. 월 이외에 옵션으로 일도 설정할 수 있다.

#### 30.2.8 Date.prototype.getDate

- Date 객체의 날짜 (1~31)를 나타내는 정수를 반환한다.

#### 30.2.9 Date.prototype.setDate

- Date 객체의 날짜 (1~31)를 나타내는 정수를 설정한다.

#### 30.2.10 Date.prototype.getDay

- Date 객체의 요일(0~6)을 나타내는 정수를 반환한다. 일요일은 0, 토요일은 6이다.

#### 30.2.11 Date.prototype.getHours

- Date 객체의 시간(0~23)을 나타내는 정수를 반환한다.

#### 30.2.12 Date.prototype.setHours

- Date 객체의 시간(0~23)을 나타내는 정수를 설정한다.

#### 30.2.13 Date.prototype.getMinutes

- Date 객체의 분(0~59)을 나타내는 정수를 반환한다.

#### 30.2.14 Date.prototype.setMinutes

- Date 객체의 분(0~59)을 나타내는 정수를 설정한다.

#### 30.2.15 Date.prototype.getSeconds

- Date 객체의 초(0~59)를 나타내는 정수를 반환한다.

#### 30.2.16 Date.prototype.setSeconds

- Date 객체의 초(0~59)를 나타내는 정수를 설정한다.

#### 30.2.17 Date.prototype.getMilliseconds

- Date 객체의 밀리초(0~59)를 나타내는 정수를 반환한다.

#### 30.2.17 Date.prototype.setMilliseconds

- Date 객체의 밀리초(0~59)를 나타내는 정수를 설정한다.

#### 30.2.19 Date.prototype.getTime

- 1970년 1월 1일 00:00:00(UTC)를 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환한다.

#### 30.2.20 Date.portotype.setTime

- Date 객체에 1970년 1월 1일 00:00:00(UTC)를 기점으로 경과된 밀리초를 설정한다.

#### 30.2.21 Date.prototype.getTimezoneOffset

- UTC와 Date 객체에 지정된 locale 시간과의 차이를 분 단위로 반환한다. KST는 UTC에 9시간을 더한 시간이다.

#### 30.2.22 Date.prototype.toDateString

- 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.

```jsx
const today = new Date("2020/7/24/12:30");

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900(대한민국 표준시)
today.toDateString(); // -> Fri Jul 24 2020
```

#### 30.2.23 Date.prototype.toTimeString

- 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열을 반환한다.

#### 30.2.24 Date.prototype.toISOString

- ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

#### 30.2.25 Date.prototype.toLocaleString

- 인수로 전달한 locale을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다. 인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 적용한다.

```jsx
const today = new Date("2020/7/24/12:30");

today.toLocaleString("ko-KR"); // -> 2020. 7. 24. 오후 12:30:00
```

#### 30.2.26 Date.prototype.toLocaleTimeString

- 인수로 전달한 locale을 기준으로 Date 객체의 시간을 표현한 문자열을 반환한다.

# 면접 예상 질문

## 💥 ...

# 이야기하고 싶은 것
