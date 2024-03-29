# 14. 전역 변수의 문제점

### 변수의 생명주기

#### 지역 변수의 생명주기

- 변수는 선언에 의해 생성되고 할당을 통해 값을 갖는다.

- 함수 내부에서 선언된 지역 변수는 함수 호출시 생성되고 함수가 종료되면 소멸된다.
  (지역 변수의 생명 주기는 함수의 생명 주기와 일치한다.)

- 함수 내부에서 선언된 지역 변수가 함수보다 오래 생존하는 경우
  (변수가 등록된 스코프를 다른 곳에서 계속 참조하고 있는 경우)

#### 전역 변수의 생명주기

- 전역 변수의 생명 주기는 애플리케이션 생명 주기와 같다.
- 명시적인 호출 없이 실행된다.
- var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다.
  (전역 변수 생명주기 === 전역 객체 생명주기 )
- 전역객체 (브라우저 => window), (Node => global)

#### 호이스팅

- 호이스팅은 스코프를 단위로 동작한다.
- 호이스팅은 변수 선언이 스코프의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징

### 전역 변수의 문제점

- 1. 암묵적 결합 - <모든 코드가 참조하고 변경할 수 있음을 뜻함>
     - 변수의 유효 범위가 크면 클수록 가독성이 나빠지고 의도치 않은 상태 변경 가능성이 높아짐
- 2. 긴 생명 주기
     - 생명 주기가 길기 때문에 메모리 리소스의 소비도 오랜 기간 지속, 상태가 변경 될 수 있는 시간도 길어지고 기회도 많음.
- 3. 스코프 체인 상에서 종점에 존재
     - 스코프 체인을 하위에서 상위 방향으로 탐색하기 때문에 전역 변수의 검색 속도가 가장 느리다.
- 4. 네임스페이스 오염
     - 자바스크립트는 파일이 분리되어 있다 해도 하나의 전역 스코프를 공유한다, 따라서 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과가 발생할 수 있다.

### 전역 변수의 사용을 억제하는 방법

1.  즉시 실행 함수
2.  네임 스페이스 객체 생성

- 전역에 네임 스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방식

3.  모듈 패턴

- 클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만드는 방식
- 클로저를 기반으로 동작하며, 전역 변수의 억제와 캡슐화까지 구현할 수 있다.
- 예제 => 특정 변수에 즉시실행 함수를 할당하여 그 안에 private 필드로 구현하고 싶은 기능은 그냥 작성, public 필드로 구현하고 싶은 기능은 return문 안에 작성하여 반환한다.

* <캡슐화>

- 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.

4. ES6 모듈

- 파일 자체의 독자적인 스코프를 제공하기 때문에 더는 전역 변수를 사용할 수 없다.
- 모듈 내에서 var 키워드로 선언한 변수는 더 이상 전역 변수도 아니고 전역 객체의 프로퍼티도 아님

# 면접 예상 질문

## 💥전역 변수와 지역 변수의 생명주기에 대해 설명해주세요.

- 함수 내부에서 선언된 지역 변수는 함수 호출시 생성되고 함수가 종료되면 소멸되고 전역 변수의 경우는 전역 객체의 생명 주기와 동일합니다. 즉, 클라이언트 측면의 전역 객체인 window 객체, 서버 측면의 전역 객체인 global 객체와 동일합니다.

## 💥전역 변수를 사용할 때 발생할 수 있는 문제점에 대해 설명해주세요.

- 변수의 유효 범위가 크기 때문에 가독성이 나빠지고, 모든 코드가 참조하고 변경할 수 있는 암묵적 결합이 허용되기 때문에 개발자의 예상에서 벗어난 상태 변경 가능성이 높아집니다.또한 생명주기가 길기 때문에 그만큼 메모리 리소스의 소비가 오랜 시간 지속되고 스코프 체인상에서 종점에 위치하기 때문에 변수 검색 속도가 느립니다. 마지막으로 자바스크립트는 분리된 파일 끼리도 하나의 전역 스코프를 공유하기 때문에 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과가 발생할 수 있습니다.

# 이야기하고 싶은 것
