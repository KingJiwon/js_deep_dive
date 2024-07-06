const url = "https://jsonplaceholder.typicode.com";

function promisetest() {
  return new Promise((resolve, reject) => {
    const data = fetch(url + "/posts");

    if (data) {
      resolve(data);
    } else {
      reject(data);
    }
  });
}

// promisetest()
//   .then((resolve) => resolve.json())
//   .then((d) => console.log(d));

const p = new Promise((res, rej) => {
  setTimeout(() => {
    res("promise 1");
  }, 5000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("promise 2");
  }, 1000);
});

async function pAllTest() {
  const [pro1, pro2] = await Promise.all([p, p2]);
  console.log("프로미스올", pro1, pro2);

  const d = await Promise.resolve(p);
  console.log("static resolve", d);
}

// pAllTest();

function test() {
  return Math.floor(Math.random() * 10);
}

function proTest() {
  const getRandNum = test();

  console.log("랜드넘:  ", typeof getRandNum);

  return Promise.resolve(getRandNum);
}

const ddd = new Promise((res, rej) => {
  setTimeout(() => {
    rej("rejected haha");
  }, 1000);
});

proTest();
console.log(":::   ", proTest());

/** 모든 Promise가 resolve 됐을때 Promise 객체 반환... */
Promise.allSettled([proTest(), ddd]).then((result) =>
  console.log("all settled   >>>> ", result)
);
/** 가장 먼저 처리된 Promise를 반환  */
Promise.race([proTest(), ddd]).then((result) =>
  console.log("race  >>> ", result)
);
