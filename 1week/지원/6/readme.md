- 6.  데이터 타입
  - 데이터 타입은 값의 종류를 나타내며 모든 값은 데이터 타입을 갖는다.
  - 자바스크립트(ES6)는 7개의 데이터 타입을 제공하며 원시타입과 객체타입으로 분류할 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/2613b895-19ec-421b-9629-b066ec10faff/Untitled.png?id=e131f9e7-6697-43ea-a3fd-ab356a6c4e3f&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=juOUxuykwhawHUmtyJ_IhrbOTLFd9tEtRNU5Aj_klxM&downloadName=Untitled.png)
  ## 숫자 타입
  - 자바스크립트에서 숫자 타입은 ECMAScript 사양에 따르면 모든 수를 실수로 처리하며 정수만을 표현하기 위한 타입이 별도로 존재하지 않는다.
  - 정수, 실수, 2진수, 8진수, 16진수 모두 메모리에 64비트 부동소수점 형식의 2진수로 저장된다. 자바스크립트는 2진수, 8진수, 16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 해석된다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/4534f665-44d0-4b88-b825-4857a7bd4dee/Untitled.png?id=5687a567-8f03-45db-9a47-aa3dfcc039c4&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=nG6nQ_NMcjPqtApK4wjNmPQNiGf9SpI-zLF3f9047vs&downloadName=Untitled.png)
  - 숫자 타입은 추가적으로 세가지 특별한 값도 표현할 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/d346aa7e-17d3-4c7d-a4c9-5ed59510cec0/Untitled.png?id=1ae7de2e-c34f-4c62-adb2-f68b16190d8f&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=c_xHuBaIFtFohLjveDLRtWWe8AGDrDvYA_6eoZ1W8C4&downloadName=Untitled.png)
  ## 문자열 타입
  - 문자열 타입은 텍스트 데이터를 나타내는데 사용한다. 문자열은 0개 이상의 16비트 유니코드 문자(UTF-16)의 집합으로 전 세계 대부분의 문자를 표현할 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/581fb3a7-0102-4ff0-8002-4de8426a647f/Untitled.png?id=54f688be-ed31-4d5f-ba2a-a8f6c3c86880&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=vRWMi9pFdM0WV3aXgZwRoVcPVhj4LSaOEM6SjFYDl-o&downloadName=Untitled.png)
  ## 템플릿 리터럴
  - ES6 부터 템플릿 리터럴이라고 하는 새로운 문자열 표기법이 도입되었다. 템플릿 리터럴은 멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등 편리한 문자열 처리 기능을 제공한다. 템플릿 리터럴은 런타임에 일반 문자열로 변환되어 처리된다.
  - 템플릿 리터럴은 백틱(``)을 사용해 표현한다.
    ### 멀티라인 문자열
    - 일반 문자열 내에서는 줄바꿈(개행)이 허용되지 않는다. 따라서 일반 문자열 내에서 줄바꿈 등의 공백을 표현하려면 백슬래시로 시작되는 이스케이프 시퀀스를 사용해야한다.
      ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/d3fa81e0-227e-43c3-9234-091fe8c58b5d/Untitled.png?id=35e30ae7-1c92-4c68-afbd-00ef95306e10&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=r496k8XCDsgSV7iU4-uqbDvxIwP-nZjk9SkLrIUdF8U&downloadName=Untitled.png)
    - 일반 문자열과 달리 템플릿 리터럴 내에서는 이스케이프 시퀀스를 사용하지 않고도 줄바꿈이 허용되며 모든 공백도 있는 그대로 적용된다.
      ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/52c4b4c5-89d8-4eb2-811d-b68a1531fc18/Untitled.png?id=9c21d565-1ce1-43b9-81b2-cc7b34676094&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=AvVbCWzTBPas8ofW2ZzxrsHNRNrco6mMiVzQ5EI1WuA&downloadName=Untitled.png)
    ### 표현식 삽입
    - 문자열은 문자열 연산자 + 를 사용하여 연결할 수 있다. + 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 작동한다. 그 외의 경우는 덧셈 연산자로 동작한다.
      ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/517c6a54-3de5-445a-823c-e60d60e0c99e/Untitled.png?id=11486038-af90-417b-a7ea-4163cfe0d97e&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=7JJOrHOnZ-kxzi7HmYF7stg8o-YF6zV38oO1a2J9M5g&downloadName=Untitled.png)
    - 템플릿 리터럴 내에서는 표현식 삽입을 통해 간단한 문자열을 삽입할 수 있다. 이를 통해 문자열 연산자보다 가독성 좋고 간편하게 문자열을 삽입할 수 있다.
      ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/8cb0351f-3d92-43f4-a7ba-f8d7ea6b935b/Untitled.png?id=b2396b58-fa36-4788-a386-d93826bc399b&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=gGl-0naYZGAq8oT_JkuT1FXtcBJ69ATFpLLEf656eSc&downloadName=Untitled.png)
  ## 불리언 타입
  - 참과 거짓을 나타내는 true와 false
  ## undefined 타입
  - undefined타입의 값은 undefined가 유일하다.
  - undefined타입은 개발자가 의도적으로 할당하기 위한 값이 아니라 자바스크립트 엔진이 변수를 초기화 할 때 사용하는 값이다. 변수를 참조했을 때 undefined가 반환된다면 참조한 변수가 선언 이후 값이 할당된 적이 없는, 즉 초기화 되지 않은 변수라는 것을 간파할 수 있다.
  ## null 타입
  - null타입의 값은 null이 유일하다.
  - 프로그래밍 언어에서 null은 변수에 값이 없다는 것을 의도적으로 명시할 때 사용한다. 변수에 null을 할당하는 것은 변수가 이전에 참조하던 값을 더 이상 참조하지 않겠다는 뜻이다.
  - 이는 이전에 할당되어 있던 값에 대한 참조를 명시적으로 제거하는 것을 의미하며, 자바스크립트 엔진은 누구도 참조하지 않는 메모리 공간에 대해 가비지 콜렉션을 수행할 것이다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/404ead07-8d95-4109-a5a5-29f70f24a509/Untitled.png?id=7da12f69-809e-46a7-b52e-4b486769743d&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=7jsgb2lH7JoxRjaYXQIdtmwuTjwwGqFqFud7TunoqTY&downloadName=Untitled.png)
  - 함수가 유효한 값을 반환할 수 없는 경우 명시적으로 null을 반환하기도 한다.
  ## 심벌 타입
  - 심벌은 ES6에서 추가된 7번째 타입으로 변경 불가능한 원시 타입의 값이다. 심벌 값은 다른 값과 중복되지 않는 유일무이한 값이다. 따라서 주로 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.
  - 심벌 이외의 원시 값은 리터럴을 통해 생성하지만 심벌은 Symbol 함수를 호출해 생성한다. 이 때 생성된 심벌 값은 외부에 노출되지 않는다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/6bd75fc0-7214-4562-9e89-19828126e972/Untitled.png?id=b1c7207b-4cf8-4d19-bb79-097725bac747&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=yfXoX8VdCOUIEeqQBNszjCXMU2n3Qz4qKipoMskqoKI&downloadName=Untitled.png)
  ## 객체 타입
  - 객체 Part 참조
  ## 데이터 타입의 필요성
  ### 데이터 타입에 의한 메모리 공간의 확보와 참조
  - 자바스크립트 엔진은 데이터 타입, 즉 값의 종류에 따라 정해진 크기의 메모리를 확보한다. 즉 변수에 할당되는 값의 데이터 타입에 따라 확보해야 할 메모리 공간의 크기가 결정된다.
  - 값을 참조하는 경우를 생각해보면 식별자를 통해 메모리 공간의 주소를 찾아갈 수 있다. 정확히 말하면 값이 저장되어 있는 메모리 공간의 선두 메모리 셀의 주소를 찾아갈 수 있다. 이 때 값을 참조하려면 한번에 읽어 들여야 할 메모리 공간의 크기, 즉 메모리 셀의 개수(바이트 수)를 알아야 한다.
  - 자바스크립트 엔진은 변수에 할당된 값의 타입을 인식해 특정 단위로 메모리 공간에 저장된 값을 읽어들인다.
  ### 데이터 타입에 의한 값의 해석
  - 메모리에서 읽어들인 2진수 값을 어떻게 해석하냐를 결정할 때 데이터 타입이 사용된다.
    - 예를들어 메모리에 저장된 2진수 값이 0100 0001 이면 숫자로 해석하면 65지만 문자로 해석하면 ‘A’이다.
  ## 동적 타이핑
  - C나 JAVA같은 정적 타입 언어는 컴파일 시점에 타입체크(선언한 데이터 타입에 맞는 값을 할당했는지 검사하는 처리)를 수행한다. 만약 타입체크를 통과하지 못했다면 에러를 발생시키고 실행 자체를 막는다. 이를 통해 타입의 일관성을 강제함으로써 더욱 안정적인 코드의 구현을 통해 런타임에 발생하는 에러를 줄인다.
  - 자바스크립트는 정적 타입 언어와 다르게 변수를 선언할 때 타입을 선언하지 않는다. 다만 var, const, let 키워드를 사용해 변수를 선언할 뿐이다. 자바스크립트의 변수는 어떠한 데이터 타입의 값이라도 자유롭게 할당할 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/8b5959bb-22ec-4806-ad13-366ad1e90c8e/Untitled.png?id=3f6b2058-9888-490b-bbb3-1fae4f00ac6b&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=PmlZiScqPftrw6Gq4FrOTz8jDDX_tFT9-E6dRw3g3iM&downloadName=Untitled.png)
  - 다시말해 자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정된다. 그리고 재할당에 의해 언제든 변수의 타입은 동적으로 변할 수 있다. 이러한 특징을 동적 타이핑이라 하며 자바스크립트는 동적 타입 언어에 속한다.
  - 동적 타입 언어는 어떤 데이터 타입도 변수에 할당할 수 있기 때문에 편리할 수 있지만 구조적인 단점이 있다. 변수 값은 언제든지 변경될 수 있기 때문에 복잡한 프로그램에서는 변화하는 변수 값을 추적하기 어려울 수 있다. 그 뿐 아니라 타입도 언제든지 변경될 수 있다. 따라서 동적 타입 언어는 값을 확인하기 이전에는 타입을 확신할 수 없다.
  - 더욱이 자바스크립트는 개발자의 의도와 상관없이 엔진에 의해 암묵적으로 타입이 자동으로 변환되기도 한다. 결국 동적 타입 언어는 유연성은 높지만 신뢰성은 떨어진다.
  - 이러한 이유로 안정적인 프로그램을 만들기 위해 변수를 사용하기 이전에 타입을 체크해야 하는 경우가 있는데 이는 매우 번거러울뿐더러 코드의 양도 증가한다. 따라서 변수를 사용할때 주의해서 사용해야한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/12327314-019b-4b48-a853-d5a7d2c67691/Untitled.png?id=cd86a4a5-dc85-400f-815d-9fe3dba3801e&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=QXrrVHv1VOXWxYZpdHsVB3c7Uy0XJIgu8zjn2QIaUN8&downloadName=Untitled.png)
    코드는 오해하지 않도록 작성해야한다. 오해는 커뮤니케이션을 어렵게 하는 대표적인 원인으로 생산성을 떨어트리고 팀의 사기를 저하 시킬 수 있다. 코드는 동작하는 것만이 존재 목적은 아니다. 코드는 개발자를 위한 문서이기도 하다. 따라서 사람이 이해할 수 있는 코드, 즉 가독성이 좋은 코드가 좋은 코드이다.
