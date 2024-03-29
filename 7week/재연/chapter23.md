# 23. 실행 컨텍스트

### 23.1 소스코드의 타입

- ECMAScript 사양은 소스코드를 4가지 타입으로 구분한다. 4가지 타입의 소스코드는 실행 컨텍스트를 생성한다.

<table>
  <tbody>
    <th>
        <td>소스코드의 타입</td>
        <td>설명</td>
    </th>
    <tr>
        <td>전역 코드</td>
        <td>전역에 존재하는 소스코드를 말한다. 전역에 정의된 함수, 클래스 등의 내부 코드는 포함되지 않는다.</td>
    </tr>
    <tr>
        <td>함수 코드</td>
        <td>함수 내부에 존재하는 소스코드를 말한다. 함수 내부에 중첩된 함수 , 클래스 등의 내부 코드는 포함되지 않는다.</td>
    </tr>
    <tr>
        <td>eval 코드</td>
        <td>빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행하는 소스코드를 말한다.</td>
    </tr>
    <tr>
        <td>모듈 코드</td>
        <td>모듈 내부에 존재하는 소스코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함되지 않는다.</td>
    </tr>
  </tbody>  
</table>

- 소스코드의 타입에 따라 실행 컨텍스트를 생성하는 과정과 관리 내용이 다르다.

1. 전역 코드

   - 전역 코드는 전역 변수를 관리하기 위해 최상위 스코프인 전역 스코프를 생성해야 한다. 그리고 var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수를 전역 객체의 프로퍼티와 메서드로 바인딩하고 참조하기 위해 전역 객체와 연결되어야 한다. 이를 위해 전역 코드가 평가되면 전역 실행 컨텍스트가 생성된다.

2. 함수 코드

   - 함수 코드는 지역 스코프를 생성하고 지역 변수 , 매개변수, arguments 객체를 관리해야 한다. 그리고 생성한 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결해야 한다. 이를 위해 함수 코드가 평가되면 함수 실행 컨텍스트가 생성된다.

3. eval 코드

   - eval 코드는 strict mode 에서 자신만의 독자적인 스코프를 생성한다. 이를 위해 eval 코드가 평가되면 eval 실행 컨텍스트가 생성된다.

4. 모듈 코드
   - 모듈 코드는 모듈별로 독립적인 모듈 스코프를 생성한다. 이를 위해 모듈 코드가 평가되면 모듈 실행 컨텍스트가 생성된다.

### 23.2 소스코드의 평가와 실행

- 자바스크립트 엔진은 소스코드를 "소스코드의 평가"와 "소스코드의 실행" 과정으로 나누어 처리한다.

- 소스코드의 평가 과정에서는 실행 컨텍스트를 생성하고 변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프에 등록한다.

- 소스코드의 평가 과정이 끝나면 선언문을 제외한 소스코드가 순차적으로 실행되기 시작한다. 즉, 런타임이 시작된다. 이때 소스코드 실행에 필요한 정보인 변수나 함수의 참조를 실행 컨텍스트가 관리하는 스코프에서 검색해서 취득한다. 그리고 변수 값의 변경 등 소스코드의 실행 결과는 다시 실행 컨텍스트가 관리하는 스코프에 등록된다.

### 23.3 실행 컨텍스트의 역할

- 코드가 실행되려면 스코프, 식별자 , 코드 실행 순서 등의 관리가 필요하다.

  1. 선언에 의해 생성된 모든 식별자 (변수, 함수, 클래스 등)를 스코프를 구분하여 등록하고 상태 변화(식별자에 바인딩된 값의 변화)를 지속적으로 관리할 수 있어야한다.
  2. 스코프는 중첩 관계에 의해 스코프 체인을 형성해야 한다. 즉, 스코프 체인을 통해 상위 스코프로 이동하며 식별자를 검색할 수 있어야 한다.
  3. 현재 실행 중인 코드의 실행 순서를 변경(예를 들어, 함수 호출에 의한 실행 순서 변경) 할 수 있어야 하며 다시 되돌아갈 수도 있어야 한다.

- 이 모든 것을 관리하는 것이 바로 실행 컨텍스트이다. <b>실행 컨텍스트는 소스코드를 실행하는 데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.</b>
- 좀 더 구체적으로 말해, 실행 컨텍스트는 식별자를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 메커니즘으로, 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.
- 식별자와 스코프는 실행 컨텍스트의 렉시컬 환경으로 관리하고 코드 실행 순서는 실행 컨텍스트 스택으로 관리한다.

### 23.4 실행 컨텍스트 스택

- 생성된 실행 컨텍스트는 스택 자료구조로 관리된다. 이를 실행 컨텍스트 스택이라고 부른다. (후입 선출)

### 23.5 렉시컬 환경

- 렉시컬 환경은 식별자와 식별자에 바인딩된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트다. 실행 컨텍스트 스택이 코드의 실행 순서를 관리한다면 렉시컬 환경은 스코프와 식별자를 관리한다. 실행 컨텍스트 스택이 코드의 실행 순서를 관리한다면 렉시컬 환경은 스코프와 식별자를 관리한다.

- 렉시컬 환경은 키와 값을 갖는 객체 형태의 스코프(전역, 함수, 블록 스코프)를 생성하여 식별자를 키로 등록하고 식별자에 바인딩된 값을 관리한다. 즉, 렉시컬 환경은 스코프를 구분하여 식별자를 등록하고 관리하는 저장소 역할을 하는 렉시컬 스코프의 실체다.

- 렉시컬 환경은 다음과 같이 두 개의 컴포넌트로 구성된다
  1. 환경 레코드
  - 스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소다. 환경 레코드는 소스코드의 타입에 따라 관리하는 내용에 차이가 있다.
  2. 외부 렉시컬 환경에 대한 참조
  - 외부 렉시컬 환경에 대한 참조는 상위 스코프를 가리킨다. 이때 상위 스코프란 외부 렉시컬 환경,즉 해당 실행 컨텍스트를 생성한 소스코드를 포함하는 상위 코드의 렉시컬 환경을 말한다. 외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.

### 23.6 실행 컨텍스트의 생성과 식별자 검색 과정

#### 23.6.1 전역 객체 생성

- 전역 객체는 전역 코드가 평가되기 이전에 생성된다. 이때 전역 객체에는 빌트인 전역 프로퍼티와 빌트인 전역 함수, 그리고 표준 빌트인 객체가 추가되며 동작 환경에 따라 클라이언트사이드 Web API 또는 특정 환경을 위한 호스트 객체를 포함한다. 전역 객체도 Object.prototype을 상속받는다. 즉, 전역 객체도 프로토타입 체인의 일원이다.

#### 23.6.2 전역 코드 평가

- 소스코드가 로드되면 자바스크립트 엔진은 전역 코드를 평가한다. 전역 코드 평가는 다음과 같은 순서로 진행된다.

  1. 전역 실행 컨텍스트 생성
  2. 전역 렉시컬 환경 생성

     - 2.1 전역 레코드 환경 생성
       - 2.1.1 객체 환경 레코드 생성
       - 2.1.2 선언적 환경 레코드 생성
     - 2.2 this 바인딩
     - 2.3 외부 렉시컬 환경에 대한 참조 결정

  - 1. 전역 실행 컨텍스트 생성
       - 먼저 비어있는 전역 실행 컨텍스트를 생성하여 실행 컨텍스트 스택에 푸시한다. 이때 전역 실행 컨텍스트는 실행 컨텍스트 스택의 최상위, 즉 실행 중인 실행 컨텍스트가 된다.
  - 2.  전역 렉시컬 환경 생성

        - 전역 렉시컬 환경을 생성하고 전역 실행 컨텍스트에 바인딩한다.

          2.1. 전역 환경 레코드 생성

                - 전역 렉시컬 환경을 관리하는 전역 환경 레코드는 전역 변수를 관리하는 전역 스코프, 전역 객체의 빌트인 전역 프로퍼티와 빌트인 전역 함수, 표준 빌트인 객체를 제공한다..
                - var 키워드로 선언한 전역 변수와 let, const 키워드로 선언한 전역 변수를 구분하여 관리하기 위해 전역 스코프 역할을 하는 <b>전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 구성되어 있다.</b>
                - 객체 환경 레코드는 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의한 전역 함수, 빌트인 전역 프로퍼티와 빌트인 전역 함수, 표준 빌트인 객체를 관리하고, 선언적 환경 레코드는 let, const 키워드로 선언한 전역 변수를 관리한다. 즉, 전역 환경 레코드의 객체 환경 레코드와 선언적 환경 레코드는 서로 협력하여 전역 스코프와 전역 객체(전역 변수의 전역 객체 프로퍼티화)를 관리한다.

          2.1.1. 객체 환경 레코드 생성

                - 전역 환경 레코드를 구성하는 컴포넌트인 객체 환경 레코드는 BindingObject라고 부르는 전역 객체와 연결된다.
                - <b>전역 코드 평가 과정에서 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 환경 레코드의 객체 환경 레코드에 연결된 BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다.</b>
                - 그리고 이때 등록된 식별자를 전역 환경 레코드의 객체 환경 레코드에서 검색하면 전역 객체의 프로퍼티를 검색하여 반환한다.
                - 이것이 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수가 전역 객체의 프로퍼티와 메서드가 되고 전역 객체를 가리키는 식별자(window) 없이 전역 객체의 프로퍼티를 참조할 수 있는 메커니즘이다.
                - var 키워드로 선언한 변수는 ‘선언 단계’와 ‘초기화 단계’가 동시에 진행된다.
                - 다시 말해, 전역 코드 평가 시점에 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 변수 식별자로 키를 등록한 다음, 암묵적으로 undefined를 바인딩한다. var 키워드로 선언한 변수에 할당한 함수 표현식도 이와 동일하게 동작한다.
                - 함수 선언문으로 정의한 함수가 평가되면 함수 이름과 동일한 이름의 식별자를 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 키로 등록하고 생성된 함수 객체를 즉시 할당한다.

          2.1.2 선언적 환경 레코드 생성

                - let, const 키워드로 선언한 전역 변수는 선언적 환경 레코드에 등록되고 관리된다. 해당 키워드로 선언한 변수는 ‘선언 단계’와 ‘초기화 단계’가 분리되어 진행한다. 따라서 초기화 단계, 즉 런타임에 실행 흐름이 변수 선언문에 도달하기 전까지 <b>일시적 사각지대(Temporal Dead Zone: TDZ)</b>에 빠지게 된다.

          2.2. this 바인딩

                - 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에 this가 바인딩된다. 일반적으로 전역 코드에서 this는 전역 객체를 가리키므로 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에는 전역 객체가 바인딩된다. 따라서 전역 코드에서 this를 참조하면 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에 바인딩 되어 있는 객체가 반환된다.

          2.3. 외부 렉시컬 환경에 대한 참조 결정

                 - 외부 렉시컬 환경에 대한 참조는 현재 평가 중인 소스코드를 포함하는 외부 소스코드의 렉시컬 환경, 즉 상위 스코프를 가리킨다. 이를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.

                 - 전역 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 null이 할당된다. 이는 전역 렉시컬 환경이 스코프 체인의 종점에 존재함을 의미한다.

#### 23.6.3 전역 코드 실행

- 변수 할당문 또는 함수 호출문을 실행하려면 먼저 변수 또는 함수 이름이 선언된 식별자인지 확인해야 한다. 선언되지 않는 식별자는 참조할 수 없으므로 할당이나 호출도 할 수 없기 때문이다. 또한 식별자는 스코프가 다르면 같은 이름을 가질 수 있다. 즉, 동일한 이름의 식별자가 다른 스코프에 여러 개 존재할 수도 있다. 따라서 어느 스코프의 식별자를 참조하면 되는지 결정할 필요가 있다. 이를 <b>식별자 결정</b>이라 한다.
- <b>식별자 결정을 위해 식별자를 검색할 때는 실행 중인 실행 컨텍스트에서 식별자를 검색하기 시작한다.</b> 선언된 식별자는 실행 컨텍스트의 렉시컬 환경의 환경 레코드에 등록되어 있다.
- 만약 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색할 수 없으면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경, 즉 상위 스코프로 이동하여 식별자를 검색한다.
- 이것이 바로 스코프 체인의 동작 원리다. 하지만 전역 렉시컬 환경은 스코프 체인의 종점이므로 전역 렉시컬 환경에서 검색할 수 없는 식별자는 참조 에러를 발생시킨다. 식별자 결정에 실패했기 때문이다.

# 면접 예상 질문

## 💥 실행 컨텍스트에 대해 설명해주세요.

- 실행 컨텍스트는 식별자(변수, 함수, 클래스 등의 이름)를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 메커니즘으로, 모든 코드는 실행 컨텍스트를 통해 실행되고 관리됩니다.

## 💥 전역 코드 평가 과정에서 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수가 전역 객체의 프로퍼티와 메서드가 되고 전역 객체를 가리키는 식별자 없이 전역 객체의 프로퍼티를 참조할 수 있는 이유에 대해 설명해주세요.

- 전역 코드 평가 과정에서 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 환경 레코드의 객체 환경 레코드에 연결된 BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 됩니다. 그리고 이때 등록된 식별자를 전역 환경 레코드의 객체 환경 레코드에서 검색하면 전역 객체의 프로퍼티를 검색하여 반환해줍니다.

## 💥 변수 호이스팅과 함수 호이스팅의 차이에 대해 설명해주세요.

- var 키워드로 선언한 변수는 전역 코드 평가 시점에 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 변수 식별자로 키를 등록한 다음, 암묵적으로 undefined를 바인딩합니다.
- 함수 선언문으로 정의한 함수가 평가되면 함수 이름과 동일한 이름의 식별자를 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 키로 등록하고 생성된 함수 객체를 <b>즉시</b> 할당합니다.

## 💥 동일한 이름의 식별자가 다른 스코프에 여러 개 존재할 수도 있기 때문에 벌어지는 동작은 무엇이며 해당동작의 구체적인 원리를 설명해주세요.

- 어느 스코프의 식별자를 참조하면 되는지 결정할 필요가 있기 때문에 식별자 결정이 이루어지고 식별자 결정을 위해 식별자를 검색할 때는 실행 중인 실행 컨텍스트에서 식별자를 검색하기 시작한뒤 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색할 수 없으면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경, 즉 상위 스코프로 이동하여 식별자를 검색합니다. 최종적으로 스코프 체인의 종점인 전역 렉시컬 환경에서까지 검색할 수 없는 식별자는 참조 에러를 발생시킵니다.

---

# 이야기하고 싶은 것
