const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임 오버";
    div.className = "gameover";
    document.body.appendChild(div);
  };

  const displayAnswer = () => {
    const div = document.createElement("div");
    div.innerText = "정답입니다.";
    div.className = "thisIsAnswer";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const keyboardCheck = (입력한_글자) => {
    const 키보드정답 = document.querySelector(
      `.key-block[data-key='${입력한_글자}']`
    );
    키보드정답.style = "background-color:#6aaa64; color:white;";
  };

  const handleEnterKey = async () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        keyboardCheck(입력한_글자);
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
      block.style.fontSize = "25px";
      block.style.fontWeight = "900";
    }

    if (맞은_갯수 === 5) {
      gameover();
      displayAnswer();
    } else if (맞은_갯수 !== 5 && attempts === 5) {
      gameover();
      displayGameover();
    } else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  document
    .querySelectorAll(".key-block, .key-enter, .key-backspace")
    .forEach((key) => {
      key.addEventListener("click", () => {
        const keyValue = key.getAttribute("data-key").toUpperCase();

        if (keyValue === "ENTER") {
          if (index === 5) {
            handleEnterKey();
          }
        } else if (keyValue === "BACKSPACE") {
          handleBackspace();
        } else {
          if (index < 5) {
            const thisBlock = document.querySelector(
              `.board-column[data-index='${attempts}${index}']`
            );
            thisBlock.innerText = keyValue;
            index += 1;
          }
        }
      });
    });

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
