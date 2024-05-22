- 5.  표현식과 문
  ## 값
  - 값은 식이 평가되어 생성된 결과를 말한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/e139ea23-798c-402f-aebf-3068f98b39e7/Untitled.png?id=1588fc9f-6e2e-4087-8e4b-fa62b8fb3249&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=oyCtyZ22oZSPWUHYWfdtqPOGSPXneF-omJlz1Ou6tlo&downloadName=Untitled.png)
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/c84d48e5-b92a-4b00-8f32-b15c7b5c77b9/Untitled.png?id=afda604c-410e-4f85-9dfd-da8b4f6deab6&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=XviPQjASr_vZxrMmDJ5kRmeFfd0CGZUkLOZ4GTQzQaA&downloadName=Untitled.png)
  - 모든 값은 데이터 타입을 가지며 메모리에 2진수, 즉 비트의 나열로 저장된다.
  - 값은 다양한 방법으로 생성할 수 있으며 가장 기본적인 방법은 리터럴을 사용하는 것이다.
  ## 리터럴
  - 리터럴은 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법이다.
  - 사람이 이해할 수 있는 아라비아 숫자 3을 코드에 기술하면 자바스크립트 엔진은 이를 평가해 숫자 값 3을 생성한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/b6128f44-15c3-44fc-a801-630918fcd4a1/Untitled.png?id=5538e55f-789b-422f-a83a-d968d291c790&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=5pGqPpBJhDOXMJS_eNWzqwi59YZcVrRXUlgAamD4YA4&downloadName=Untitled.png)
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/f5ef0b87-2e3a-49cb-a6b1-a9ea4cceeef3/Untitled.png?id=6b3a116c-1c05-424e-869b-59205b746959&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=VBWzjMku1XsRKM3DA8h5NkT7AJWLTKkQegy4TGF1CLw&downloadName=Untitled.png)
  - 이처럼 리터럴은 사람이 이해할 수 있는 문자(아라비아 숫자, 알파벳, 한글 등) 또는 미리 약속된 기호 (’’,””,.,[],{},// 등)로 표기한 코드이다. 자바스크립트 엔진은 런타임에 리터러를 평가해 값을 생성한다. 즉 리터럴은 값을 생성하기 위해 미리 약속한 표기법이라고 할 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/478d51d4-0f46-4ad7-9d93-d1c662afa847/Untitled.png?id=42984e58-dad5-4184-b104-474f9861214c&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=j_qzlE4U8yX7O2TDR5AesPYvKsjsxo76syseEJTmi0Y&downloadName=Untitled.png)
  ## 표현식
  - 표현식은 값으로 평가될 수 있는 문이다. 즉, 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조한다.
  - 아래 예제의 100은 리터럴이며 리터럴 100은 자바스크립트 엔진에 의해 평가되어 값을 생성하므로 그 자체로 표현식 이라고 할 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/584a44cf-1465-4d6c-a9c9-cd9e10a43ea2/Untitled.png?id=e6b07b82-3091-479b-85c3-06e449732dc2&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=ZI7yPovmJXXZaFKGEjIPDyLpyJFZjxqBBK1UUDXQ91M&downloadName=Untitled.png)
  - 50+50은 리터럴과 연산자로 이루어져 있다. 하지만 50+50도 평가되어 100이라는 숫자값을 생성하므로 표현식이다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/bf34cbdb-429b-4036-a6b1-d15ba2234201/Untitled.png?id=558ef01d-ca3a-4123-9a65-56dbf42fa8b9&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=vQL0f7EKugGH1CADnhaId9T0q5fJmyCA-IFevT9Z7NY&downloadName=Untitled.png)
  - 변수 식별자를 참조하면 변수 값으로 평가된다. 식별자 참조는 값을 생성하지는 않지만 값으로 평가되므로 표현식이다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/d131c98c-80c3-467c-9720-cb129ffb4161/Untitled.png?id=1981f455-77a3-450f-a3ad-ae6296e0c68e&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=IOnFESEqd8_MJD563L4o8lUjFHkbjAEPAz_FJz9DRNs&downloadName=Untitled.png)
  - 이처럼 표현식은 리터럴, 식별자, 연산자, 함수 호출 등의 조합으로 이뤄질 수 있다. 값으로 평가될 수 있는 문은 모두 표현식이다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/902fb8a7-c9fe-410b-a3f8-e909eff60fda/Untitled.png?id=3bf7de9e-1cb9-45dc-af70-ba859c90cb03&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=lPXHZ1v7PswtyzEjyKVhub65yWW2-pzT66HhnvwQy9s&downloadName=Untitled.png)
  - 표현식은 값으로 평가되고 표현식과 평가된 값은 동등한 관계(동치)이다. 따라서 표현식은 값처럼 사용할 수 있다. 이것은 문법적으로 값이 위치할 수 있는 자리에는 표현식도 위치할 수 있다는 것을 말한다.
  ## 문
  - 문은 프로그램을 구성하는 기본 단위이자 최소 실행 단위이다. 문의 집합으로 이뤄진 것이 프로그램이며 문을 작성하고 순서에 맞게 나열하는 것이 프로그래밍이다.
  - 문은 여러 토큰으로 구성된다. 토큰이란 문법적인 의미를 가지며, 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소를 의미한다. 예를 들어 키워드. 식별자, 연산자, 리터럴, 세미콜론이나 마침표 등의 특수 기호는 문법적인 의미를 가지며 더 이상 나눌 수 없는 코드의 기본 요소이므로 모두 토큰이다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/050527b0-772b-45d2-832f-61d2ff4ee852/Untitled.png?id=5ad87ead-ae8b-4db6-82b6-80c7def8f5de&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=sW9O2kajqgZb321DWj5e2ldTkXB4sRsWNKTW2IKJRlI&downloadName=Untitled.png)
  - 문은 명령문 이라고도 부르며 컴퓨터에 내리는 명령이다. 문이 실행되면 명령이 실행되고 무슨 일인가가 일어나게 된다.
  - 문은 선언문, 할당문, 조건문, 반복문 등으로 구분할 수 있다. 변수 선언문을 실행하면 변수가 선언되고, 할당문을 실행하면 값이 할당된다. 조건문을 실행하면 지정한 조건에 따라 실행할 코드블록이 결정되어 실행되고, 반복문을 실행하면 특정 코드 블럭이 반복 실행된다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/a6a95192-fb50-445e-8fcb-a9017d5a3bb7/Untitled.png?id=a278aea8-7fe3-4cc9-96e9-0fbdab18e526&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=aRboLOdhqw2pUd88Y4EaWhcDPQSwdFtIjdHLwGw85nI&downloadName=Untitled.png)
  - 세미콜론(;)은 문의 종료를 나타내며 생략 가능하다. → 세미콜론 자동 삽입 기능이 암묵적으로 수행되는데 기능의 동작과 개발자의 예측이 일치하지 않는 경우가 있으니 주의해야 한다.
  ## 표현식인 문과 표현식이 아닌 문
  - 표현식은 문의 일부일 수도 있고 그 자체로 문이 될 수도 있다.
  - 표현식인 문은 값으로 평가될 수 있는 문이며 표현식이 아닌 문은 값으로 평가될 수 없는 문을 말한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/f9ae8b0c-5a4e-4076-a3b2-b9a560fc0438/Untitled.png?id=024ed2b7-1d98-4795-b954-7974929f8adf&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=oaHgOr43W_xl-17IfrDVNSgq_RI4WW4gUXqcBeL20qk&downloadName=Untitled.png)
  - 이를 구별하는 가장 간단한 방법은 변수에 할당해 보는 것이다. 표현식인 문은 값으로 평가되므로 변수에 할당할 수 있다. 하지만 표현식이 아닌 문은 값으로 평가할 수 없으므로 변수에 할당하면 에러가 발생한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/f580d79b-9683-4a2e-aee3-9b2e2d8f8dfd/Untitled.png?id=d954f1cd-9b06-48f2-8a55-9c3fb47427b4&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=e9zhpm_VyViSbXfRbVTeoHmMe9_XAw1dfjzLuSjlPAk&downloadName=Untitled.png)
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/42406385-ba2d-4ad6-9684-f81146482e65/Untitled.png?id=aaabd4a0-6167-4b5b-8d31-5d322f939c61&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=aXlod-u2sW34aJCNyafzjvQVIapGZtOC8Ht73hNnVBo&downloadName=Untitled.png)
  - 크롬 개발자 도구에서 표현식이 아닌 문을 실행하면 항상 undefined를 출력한다. 이를 완료값이라 하고 완료 값은 표현식의 평과 결과가 아니므로 변수에 할당할 수도 없고 참조할 수도 없다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/a0d71bcc-ea42-4058-bfac-efd4ec3a0d93/Untitled.png?id=9dbb5cdc-2464-4c1b-b368-dc2b8bcd2782&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=9L9a0Zw_ctQWiEU_2iLZ2EC8m8VkQHHRM2mHBiAfD74&downloadName=Untitled.png)
