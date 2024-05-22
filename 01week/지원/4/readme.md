- 4.  변수
  ## 변수가 왜 필요한가
  - 만약 다음과 같은 코드를 실행하면 자바스크립트 엔진은 먼저 + 연산자의 좌변과 우변의 숫자값(피연산자)를 기억한다. 컴퓨터는 CPU를 사용해 연산하고 메모리를 사용해 데이터를 기억한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/3617df45-a72d-4e37-a13b-ad760ca26b0c/Untitled.png?id=22d4ecfd-5664-4320-85b4-f30e66d9de37&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=25TLOop92OrfOgREtnZW6wMDH5deu_YBRDWZpFHvRfo&downloadName=Untitled.png)
  - 메모리는 데이터를 저장할 수 있는 메모리 셀의 집합체이고 메모리 셀 하나의 크기는 1바이트이며, 컴퓨터는 메모리 셀의 크기, 즉 1바이트 단위로 데이터를 저장하거나 읽어들인다.
  - 각 셀은 고유의 메모리 주소를 갖고 이 메모리 주소는 메모리 공간의 위치를 나타내며 0부터 시작해서 메모리의 크기만큼 정수로 표현된다.
  - 컴퓨터는 모든 데이터르 2진수로 처리하므로 메모리에 저장되는 데이터는 데이터의 종류에 상관없이 모두 2진수로 저장된다.(그림에는 보기 편하게 10진수로 표기됨)
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/ef919438-b217-4325-9e06-04bfab15e383/Untitled.png?id=c4c97451-3c2d-4061-aef3-7afeed10aa3a&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=jkT9cqrn5k7mmtgnjHgBS7mLVUVN6ACB71FQzoVl5Ak&downloadName=Untitled.png)
  - 따라서 위 예제의 숫자값 10과 20은 메모리 상의 임의의 메모리 주소에 저장되고 CPU는 이 값을 읽어들여 연산을 수행한다. 또한 연산 결과로 생성된 숫자 값 30도 메모리 상의 임의의 위치에 저장된다.
  - 이러한 과정을 통해 성공적으로 연산이 끝났고 결과도 메모리에 저장되었지만 CPU가 연산해 만들어낸 숫자인 30을 재사용 할 수 없는 문제가 생긴다. 메모리 주소에 직접 접근하여 재사용하는 방법이 있지만 이는 치명적 오류를 발생시킬 가능성이 매우 높은 위험한 일이다. 실수로 운영체제가 사용하고 있는 값을 변경하면 시스템을 멈추게 할 수 있기 때문에 자바스크립트에서는 개발자의 직접적인 메모리 제어를 허용하지 않는다.
  - 따라서 프로그래밍 언어에서는 기억하고 싶은 값을 메모리에 저장하고, 저장된 값을 읽어들여 재사용 하기 위해 변수라는 메커니즘을 제공한다.
  - 변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 말한다.
  ## 식별자
  - 변수 이름을 식별자 라고도 하며 식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다.
  - 식별자는 값이 저장되어 있는 메모리 주소와 매핑 관계를 맺으며 이 매핑 정보도 메모리에 저장된다.
  - 식별자는 값이 아니라 메모리 주소를 기억하고 있어서 식별자로 값을 구분해 식별한다는 것은 기억하고 있는 메모리 주소를 통해 메모리 공간에 저장된 값에 접근할 수 있다는 의미이다. 즉 식별자는 메모리 공간에 붙인 이름이라고 할 수 있다.
  ## 변수 선언
  - 아래 변수 선언문은 다음과 같이 변수 이름을 등록하고 값을 저장할 메모리 공간을 확보한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/285d63db-f84d-4e53-b773-b585b7508d47/Untitled.png?id=d515d6ce-73c4-4ac8-bae6-15b8431eedc9&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=4lLzdpMtGodeykWi7CuZz4n2-JD7vqjePbVWyQABAY4&downloadName=Untitled.png)
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/a9237b47-7a79-4784-9959-a9f857c00763/Untitled.png?id=7eccc1c1-773f-472d-9bed-6b4ccd435b95&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=mVK4ovl0PgJN5tSSs2e80EWtnMNBzuRMPEteBNt3Mjw&downloadName=Untitled.png)
  - 변수에 값을 할당하지 않으면 확보된 메모리 공간에는 자바스크립트 엔진에 의해 암묵적으로 undefined라는 값이 할당되어 초기화된다.
  - 자바스크립트 엔진은 변수 선언을 2가지 단계를 거쳐 수행한다.
    - 선언 단계 : 변수 이름을 등록해서 자바스크립트 엔진에 변수 존재를 알린다.
    - 초기화 단계 : 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화한다.
    - 일반적으로 초기화란 변수가 선언된 이후 최초로 값을 할당하는 것을 말한다.
  ## 값의 할당
  - 다음과 같이 변수에 값을 할당한다고 했을 때 변수의 선언과 값의 할당은 실행 시점이 다르다. 변수선언은 소스코드가 순차적으로 실행되는 시점인 런타임 이전에 먼저 실행되지만 값의 할당은 소스코드가 순차적으로 실행되는 시점인 런타임에 실행된다.
  - 런타임 이전에 변수 선언이 완료되어 undefined값으로 초기화 되어있어 첫 번째 console.log에서는 undefined값이 출력된다. 그 이후 런타임 과정에서 변수의 값을 할당해 두번째 console.log에서는 80이 찍히는 것을 볼 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/6e0e0c53-4bf9-4917-a215-fdd38f66e3d4/Untitled.png?id=5bcce5bd-2016-4a2c-93a2-46e20890392b&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=zcBIYfEJjox2fXfv0MxbJhLZbOO5gd9yFHlSP5vIppg&downloadName=Untitled.png)
  - 다만 변수에 값을 할당할 때에는 이전 값(undefined)을 지우고 그 메모리에 값을 저장하는 것이 아니라 새로운 메모리 공간을 확보하고 그곳에 할당 값을 저장한다는 점을 주의하자.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/d279ba79-71b9-4a15-b850-7a8fe9a237cf/Untitled.png?id=e8c79c40-dd51-4871-9824-5a2eccc6afb8&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=mrMmxvUdq0rQXEnj5kzO_TnYKpSUAU4MpiSsAMdvH-w&downloadName=Untitled.png)
  ## 호이스팅
  - 자바스크립트 엔진은 소스코드를 한 줄씩 순차적으로 실행하기 앞서 먼저 소스코드의 평가 과정을 거치면서 소스코드를 실행하기 위한 준비를 한다. 이 때 평가과정에서 자바스크립트 엔진은 변수 선언을 포함한 모든 선언문(함수,변수 선언문 등)을 소스코드에서 찾아내 먼저 실행한다. 그리고 소스코드의 평가과정이 끝나면 비로소 변수 선언을 포함한 모든 선언문을 제외하고 소스코드를 한 줄씩 순차적으로 실행한다.
  - 즉, 자바스크립트 엔진은 변수 선언이 어디에 있든 상관없이 다른 코드보다 먼저 실행되고 어디서든 변수를 참조할 수 있다.
  - 이처럼 변수 선언문(선언단계 + 초기화단계)이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징을 호이스팅이라 한다.
  ## 값의 재할당
  - 값을 재할당 하는 경우에도 새로운 메모리 공간을 확보하고 그 메모리 공간에 재할당값을 저장한다.
  - 할당 및 재할당을 통해 생긴 불필요한 값들은 가비지 콜렉터에 의해 메모리에서 자동 해제된다.
  - 가비지 콜렉터는 애플리케이션이 할당한 공간을 주기적으로 검사하여 더 이상 사용되지 않는 메모리를 해제한다.자바스크립트는 가비지 콜렉터를 내장하고 있는 매니지드 언어로서 가비지 콜렉터를 통해 메모리 누수를 방지한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/67651172-35d5-40d2-9df1-b1e59b259317/Untitled.png?id=92d287d7-8401-4310-9b13-0b17c4aefdb4&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=GplNQXpHCVjuOYJWN812PhZ1tBUOBOwnDEmUK4_XxQs&downloadName=Untitled.png)
