- 3.  자바스크립트 개발 환경과 실행 방법
  ## 자바스크립트 실행 환경
  - 모든 브라우저는 자바스크립트를 해석하고 실행할 수 있는 자바스크립트 엔진을 내장하고 있으며 브라우저 뿐만 아니라 Node.js도 자바스크립트 엔진을 내장하고 있다.
  - 브라우저와 Node.js는 용도가 다른데 브라우저는 HTML,CSS,자바스크립트를 실행해 웹페이지를 화면에 렌더링 하는 것이 주된 목적 이지만 Node.js는 브라우저 외부에서 자바스크립트 실행 환경을 제공하는 것이 주된 목적이다.
  - 따라서 브라우저와 Node.js 모두 자바스크립트의 코어인 ECMAScript를 실행할 수 있지만 추가로 제공하는 기능은 호환되지 않는다.
  - 예를들어 브라우저는 DOM API를 기본적으로 제공하지만 Node.js에서는 제공하지 않는다.(브라우저 외부 환경에서는 HTML요소를 파싱해서 객체화 한 DOM을 직접 다룰 필요가 없기 때문이다)
  - 반대로 Node.js에서는 파일을 생성하고 수정할 수 있는 파일 시스템을 기본 제공하지만 브라우저는 이를 제공하지 않는다 만약 브러우저를 통해 다운로드 되는 자바스크립트가 사용자의 로컬 파일을 삭제하거나 수정할 수 있다면 보안상의 문제가 생기기 때문이다.
    → 브라우저는 ECMAScript와 DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimation Frame, SVG ,Wel Storage, Wel Component, Wel Worker 같은클라이언트사이드Web API 를지원 한다 Node.js는 클라이언트 사이드 Web API를 지원하지 않고 ECMAScript와 Node.js 고유 API를 지원한다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/b782f94b-38e7-448b-9a73-ebae6639bc65/Untitled.png?id=413b5c6b-c168-4a84-a599-12494d12eee5&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=mVtm2OmS_W4ZfpHcAdAZeKQPvoOcUjDo1znUzQaFl_M&downloadName=Untitled.png)
  ## 웹 브라우저
  ### 개발자 도구
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/4b43c091-0d3e-44e4-aca2-5c0e58ff2b43/Untitled.png?id=9ad1de1e-2ab9-4ee7-8d18-0f552427fd4e&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=GjuH9XE_bk7JxcKWG0BSnUsiFRlfvBhE3oFCGkd-tKo&downloadName=Untitled.png)
  ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/41b9a8cc-9b2f-4e0d-87c3-f25e8a8e27da/Untitled.png?id=27cea9d7-3c19-41f9-a2f7-ec30401c11f9&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=7D7FJNLm9W9Br2vv_6IyddRTCBA5V9dnv8JpC5EapeU&downloadName=Untitled.png)
  ### 디버깅
  - 에러 발생 시 콘솔에서 에러 발생 위치를 나타내는 링크를 클릭하면 Source 패널로 이동하고 브레이킹 포인트(1)를 걸고 다시 에러를 재현하기 위해 버튼을 클릭하면 디버깅 모드로 들어갈 수 있다.
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/d9043b27-17e5-474e-86c0-497499a25391/Untitled.png?id=5d2cb6ea-568f-4692-b6f3-80a8e5522219&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=GSqSjN4qfDX4EkUu-ZG4W0XSNTve08nOgU6PwNkK7kA&downloadName=Untitled.png)
    ![Untitled](https://file.notion.so/f/f/e3c7d456-8abb-4c53-9e1a-cfaa34716ac0/38c060c8-c068-4e13-900e-8afd5a6fd946/Untitled.png?id=1b6e0b07-2d84-443b-8959-96ac0cf6bc72&table=block&spaceId=e3c7d456-8abb-4c53-9e1a-cfaa34716ac0&expirationTimestamp=1705276800000&signature=Tb2Hstf1e7MagyAj8OH3EUfdnakSB_zj5TXySOw1zWI&downloadName=Untitled.png)
  ## Node.js
  - 클라이언트 사이드, 즉 브라우저에서 동작하는 간단한 웹 애플리케이션은 브라우저 만으로도 개발할 수 있다. 하지만 프로젝트의 규모가 커짐에 따라 React, Angular, Lodash와 같은 프레임워크 또는 라이브러리를 도입하거나 Babel,Webpack,Eslint등 여러가지 도구를 사용할 필요가 생기는데 이 때 Node.js와 npm이 필요하다.
    ### npm
    - npm(node package manager)은 자바스크립트 패키지 매니저이다. Node.js에서 사용할 수 있는 모듈들을 패키지화해서 모아둔 저장소 역할과 패키치 설치 및 관리를 위한 CLI(command line interface)를 제공한다. 자신이 작성한 패키지를 공개할 수 있고 필요한 패키지를 검색해 재사용할 수 있다.
