const MOCK_DATA = [
  { text: "변경된 텍스트1", img: "./imgs/JS.png" },
  { text: "변경된 텍스트2", img: "./imgs/CORS  플로우 도식화.png" },
  {
    text: "변경된 텍스트3",
    img: "./imgs/과제 개요서 양식(프로젝트 적용가능).png",
  },
];

/** 컴포넌트를 넣을 영역 */
const bindingArea = document.querySelector("#app_main");

/** case1. 같은 html파일에 가지고 있는 경우 */
function case1() {
  const tempTag = document.querySelector("#some_template");

  MOCK_DATA.forEach((item) => {
    /** 템플릿 태그안에서 꺼내오기 */
    const component = document.importNode(tempTag.content, true);
    /** 데이터 바인딩 영역 DOM*/
    const text = component.querySelector("span");
    const img = component.querySelector("img");

    /** 데이터 바인딩 하기 */
    text.innerText = item.text;
    img.src = item.img;

    bindingArea.append(component);
  });
}

// case1();
// -----------------------------------------------------------------------------------------------------------------------------------

/**case2. 그냥 바로 querySelector*/
function case2() {
  const comp2 = document.querySelector(".component");
  bindingArea.append(comp2);
}

// case2();
// -----------------------------------------------------------------------------------------------------------------------------------

/** case3. 다른 파일로 분리한 템플릿 태그 가져오기 */
function case3() {
  fetch("./template.html")
    .then((res) => {
      return res.text();
    })
    .then((htmlText) => {
      const domParser = new DOMParser();
      const result = domParser.parseFromString(htmlText, "text/html");
      const tempTag = result.querySelector("#some_template_apart");

      MOCK_DATA.forEach((item) => {
        const component = document.importNode(tempTag.content, true);

        const div = component.querySelector("div");
        const text = component.querySelector("span");
        const img = component.querySelector("img");

        div.classList.add("component");

        img.src = item.img;
        text.innerText = item.text;

        bindingArea.append(component);
      });
    });
}

// case3();

// 번외 1
// 숫자로 시작하는 css 선택자를 querySelector로 선택하는 방법

// 만약 id가 0xT1 인 경우

const t1EventSection = document.querySelector("#" + CSS.escape(0) + "xT1");
console.log(t1EventSection);

// 번외 2
// DOMParser.prototype.parseFromString의 반대로는 XMLSerializer.prototype.serializeToString메서드가 존재

//Element: insertAdjacentHTML() 메서드
//Element 인터페이스의 insertAdjacentHTML(position, htmlText) 메서드는 지정된 텍스트를 HTML 혹은 XML로 파싱하고 결과 노드들을 지정된 위치의 DOM 트리에 삽입합니다.

// 기준이 되는 Element를 querySelector로 선택한 상태에서 메서드 체이닝으로 호출

// 인수1 - position (htmlText 파싱되어 들어가길 바라는 위치)
/**  
 1. "beforebegin" - 요소 이전에 위치합니다. 오직 요소가 DOM 트리에 있고 부모 요소를 가지고 있을 때만 유효합니다
 2. "afterbegin" - 요소 바로 안에서 처음 자식 이전에 위치합니다.
 3. "beforeend" - 요소 바로 안에서 마지막 자식 이후에 위치합니다.
 4. "afterend" - 요소 이후에 위치합니다. 오직 요소가 DOM 트리에 있고 부모 요소를 가지고 있을 때만 유효합니다.
*/
// 인수2 - htmlText (text형식으로 날라온 html 양식)
