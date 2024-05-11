# 31. RegExp

### 31.1 정규표현식이란?

- 정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어이다. 정규 표현식은 자바스크립트의 고유 문법이 아니며, 대부분의 프로그래밍 언어와 코드 에디터에 내장되어 있다. 자바스크립트는 펄(Perl)의 정규 표현식 문법을 ES3부터 도입했다.

- 정규 표현식은 문자열을 대상으로 <b>패턴 매칭 기능</b>을 제공한다. 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.

- 휴대폰 전화는 "숫자3개 + '-' + 숫자4개 + '-' + 숫자4개" 라는 일정한 패턴이 있다. 이 패턴을 정규 표현식으로 정의하고 사용자로부터 입력 받은 문자열이 이 휴대폰 전화번호 패턴에 매칭하는지 체크할 수 있다.

```jsx
// 입력 받은 번호
const tel = "010-1234-567팔";

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regex = /^\d{3}-\d{4}-\d{4}$/;

regex.test(tel); // -> false
```

### 31.2 정규 표현식의 생성

- 정규 표현식 객체를 생성하기 위해서는 정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있다. 일반적인 방법은 정규 표현식 리터럴을 사용하는 것이다. 일반적인 방법은 정규 표현식 리터럴을 사용하는 것이다.

- /pattern/flag -> /abcde/g

```jsx
const target = "Is this all there is?";
//플래그 i => 대소문자를 구별하지 않고 검색한다.
const regex = /is/i;

regex.test(target); // -> true
```

- RegExp 생성자 함수를 사용하여 RegExp 객체를 생성할 수도 있다.

```jsx
const target = "Is this all there is?";
//플래그 i => 대소문자를 구별하지 않고 검색한다.
const regex = new RegExp(/is/i);

regex.test(target); // -> true
```

### 31.3 RegExp 메서드

- 정규표현식을 사용하는 메서드는 exec,test, String.prototype.match, String.prototype.replace, String.prototype.search, String.prototype.split 등이 있다.

#### 31.3.1 RegExp.prototype.exec

- exec 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없는 경우 null을 반환한다.

```jsx
const target = "Is this all there is?";
const regex = /is/;

regex.exec(target);
// -> ["is", index:5, input:"Is this all there is?",groups:undefined]
```

#### 31.3.2 RegExp.prototype.test

- test 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

#### 31.3.3 String.prototype.match

- String 표준 빌트인 객체가 제공하는 match 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.

- exec 메서드는 문자열 내의 모든 패턴을 검색하는 g플래그를 지정해도 첫 번째 매칭 결과만을 반환한다. 하지만 String.prototype.match 메서드는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.

```jsx
const target = "Is this all there is?";
const regex = /is/g;

target.match(regex); // -> ["is", "is"]
```

### 31.4 플래그

- 패턴과 함께 정규 표현식을 구성하는 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다. 플래그는 총 6개가 있다. 그중 중요한 3개의 플래그를 살펴보자.

  - 1. i / ignore case / 대소문자를 구별하지 않고 패턴을 검색한다.
  - 2. g / global / 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 검색한다.
  - 3. m / Multi line / 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.

- 플래그는 옵션이므로 선택적으로 사용할 수 있으며, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다. 어떠한 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다. 그리고 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료한다.

### 31.5 패턴

#### 31.5.1 문자열 검색

```jsx
const target = "Is this all there is?";
const regex = /is/;

regex.test(target); // -> true

target.match(regex); // -> ["is", index:5, input:"Is this all there is?",groups:undefined]
```

#### 31.5.2 임의의 문자열 검색

```jsx
const target = "Is this all there is?";
const regex = /.../g;

target.match(regex); // -> ["Is", "this", "all", "there", "is?"]
```

#### 31.5.3 반복 검색

- {m,n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다. 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의하기 바란다.

```jsx
const target = "A AA B BB Aa Bb AAA";

const regex = /A{1,2}/g;

target.match(regex); // -> ["A","AA","A","AA","A"]
```

- {n}은 앞선 패턴이 n번 반복되는 문자열을 의미한다. {n,n}과 동일하다.

- {n,}은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.

- +는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다. {1,}과 동일하다.

- ?는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열을 의미한다. 즉 ?는 {0,1}과 동일하다.

```jsx
const target = "color colour";
// 'colo'다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는
// 문자열 'color', 'colour'를 전역 검색한다.
const regex = /colou?r/g;

target.match(regExp); // -> ["color","colour"]
```

#### 31.5.4 OR 검색

- !은 or의 의미를 가진다.

```jsx
const target = "A AA B BB Aa Bb";

const regex = /A!B/g;

target.match(regex); // -> ["A","A","A","B","B","B","A","B"]
```

- 분해되지 않은 단어 레벨로 검색하기 위해서는 +를 함께 사용한다.

```jsx
const target = "A AA B BB Aa Bb";

const regex = /A!B+/g;

target.match(regex); // -> ["A","AA","B","BB","A","B"]
```

- [] 내의 문자는 or로 동작한다.

```jsx
const target = "A AA B BB Aa Bb";

const regex = /[AB]+/g;

target.match(regex); // -> ["A","AA","B","BB","A","B"]
```

- 범위를 지정하려면 [] 내에 -를 사용한다.

```jsx
const target = "A AA BB ZZ Aa Bb";
const regex = /[A-Z]+/g;
```

- 숫자를 검색하는 방법은 다음과 같다.

```jsx
const target = "AA BB 12,345";
const regex = /[0-9]+/g;

target.match(regex); // -> ["12","345"]
```

- 위 예제의 경우 쉼표 때문에 매칭 결과가 분리되므로 쉼표를 패턴에 포함시킨다.

```jsx
const target = "AA BB 12,345";
const regex = /[0-9,]+/g;

target.match(regex); // -> ["12,345"]
```

- [0-9] 는 \d 와 동일하고 숫자가 아닌 문자 검색에는 \D 를 이용한다.
- \w는 알파벳, 숫자, 언더스코어를 의미한다. [A-Za-z0-9_]와 같다. 이와 반대로 알파벳, 숫자, 언더스코어가 아닌 문자를 검색하는 \W가 있다.

#### 31.5.5 NOT 검색

- [...] 내의 ^은 not의 의미를 가진다. 예를 들어 [^0-9]는 숫자를 제외한 문자를 의미한다. 따라서 [0-9]와 같은 의미의 \d와 반대로 동작하는 \D는 [^0-9]와 같고 , [A-Za-z0-9_]와 같은 의미의 \w와 반대로 동작하는 \W는 [^A-Za-z0-9_]와 같다.

#### 31.5.6 시작 위치로 검색

- [...] 밖의 ^은 문자열의 시작을 의미한다.

#### 31.5.7 마지막 위치로 검색

- $는 문자열의 마지막을 의미한다.

```jsx
const target = "https://poiemaweb.com";

const regex = /com$/;

regex.test(target); // -> true
```

### 31.6 자주 사용하는 정규표현식

#### 31.6.1 특정 단어로 시작하는지 검사

- http:// 또는 https://로 시작하는지 검사

```jsx
const url = "https://example.com"
/^https?:\/\//.test(url);
```

#### 31.6.2 특정 단어로 끝나는지 검사

- html로 끝나는지 검사

```jsx
const fileName = "index.html";

/html$/.test(fileName); // -> true
```

#### 31.6.3 숫자로만 이루어진 문자열인지 검사

```jsx
const target = "12345";

/^\d+$/.test(target); // -> true
```

#### 31.6.4 하나 이상의 공백으로 시작하는지 검사

- \s는 여러 가지 공백 문자(스페이스, 탭 등)를 의미한다. [\t\r\n\v\f]와 동일하다.

```jsx
const target = " Hi!";
/^[\s]+/.test(target); // -> true
```

#### 31.6.5 아이디로 사용 가능한지 검사

- 다음 예제는 검색 대상이 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사한다.

```jsx
const id = "abc123";

/^[A-Za-z0-9]{4,10}$/.test(id); // -> true
```

#### 31.6.6 메일 주소 형식에 맞는지 검사

```jsx
const email = "test@gmail.com";

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
  email
); // -> true
```

#### 31.6.7 핸드폰 번호 형식에 맞는지 검사

```jsx
const cellphone = "010-1234-5678";

/^d{3}-d{3,4}-d{4}$/.test(cellphone); // -> true
```

#### 31.6.8 특수 문자 포함 여부 검사

- 특수 문자는 A-Za-z0-9 외의 문자다 --> 한글은 ?

```jsx
const target = "abc#123";
/[^A-Za-z0-9]/gi.test(target); // -> true
```

- 다음 방식으로 대체해 사용할 수도 있다. 이 방식은 특수 문자를 선택적으로 검사할 수 있다는 장점이 있다.

```jsx
/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi.test(target);
```

# 면접 예상 질문

## 💥 ...

# 이야기하고 싶은 것
