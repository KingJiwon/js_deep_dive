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
      /** result는 html태그부터 시작함 */
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

// 번외
// 숫자로 시작하는 css 선택자를 querySelector로 선택하는 방법

// 만약 id가 0xT1 인 경우

const t1EventSection = document.querySelector("#" + CSS.escape(0) + "xT1");
console.log(t1EventSection);
