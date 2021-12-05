//  define variables , objects
const N = 20;
const inventroyCount = 1;
const intialMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

const tools = ["Axe", "Pickaxe", "Shovel"];
const worldElementsIndex = [
  "boardBackground",
  "cloud",
  "leaf",
  "wood",
  "rock",
  "grace",
  "dirt",
];
const worldElements = [
  ["boardBackground", "none"],
  ["cloud", "none"],
  ["leaf", tools[0]],
  ["wood", tools[0]],
  ["rock", tools[1]],
  ["grace", tools[2]],
  ["dirt", tools[2]],
];

let currentMatrix = intialMatrix.slice();
let currentTool = tools[0];
let lastElemnt = "";
const gameBoard = document.querySelector(".gameBoard");
const toolsBox = document.querySelector(".toolsbox");
const toolContainer = document.querySelector(".toolContainer");
const toolTxtDiv = document.querySelector(".toolTxtDiv");
const resetButton = document.querySelector(".resetBtn");
const demoButton = document.querySelector(".toTheGame");
const startButton = document.querySelector(".startButton");
const media = window.matchMedia("(max-width: 500px)");
const leftSideBox = document.querySelector(".left_side");
const checkBox = document.querySelector(".thememode");
const switchBox = document.querySelector(".switchBox");

function fillTheBoard(intialMatrix) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let worldElement = worldElements[intialMatrix[i][j]];
      createElement(worldElement[0]);
    }
  }
}
//------------------------------ create world element & add event listener --------------------------------------------
function createElement(type) {
  let initialDiv = document.createElement("div");
  initialDiv.classList.add("backgroundImage");
  initialDiv.classList.add(type);
  initialDiv.addEventListener("click", worldElementClick);
  gameBoard.appendChild(initialDiv);
}
function worldElementClick(e) {
  if (e.target.classList.contains(worldElements[0][0])) {
    if (currentTool === "inventory") construct(e);
    else illegalMove(e);
  } else {
    destruct(e);
  }
}
//------------define moves functions : constract , destract ,illegal moves
function illegalMove() {
  playSound("wrong");
  let tempSelctor = document.getElementById(currentTool);
  switch (currentTool) {
    case "inventory":
      tempSelctor.style.borderColor = "orange";
      setTimeout(() => {
        tempSelctor.style.borderColor = "blue";
      }, 500);
      break;

    default:
      tempSelctor.classList.add("wrongTool");
      setTimeout(() => {
        tempSelctor.classList.remove("wrongTool");
      }, 500);
  }
}
function construct(e) {
  if (lastElemnt === "") illegalMove(e);
  else {
    playSound("build");
    e.target.classList.remove(worldElements[0][0]);
    e.target.classList.add(lastElemnt);
    let tempSelctor = document.getElementById(currentTool);
    tempSelctor.classList.toggle(lastElemnt);
    lastElemnt = "";
  }
}

//------------------------------ create & fell tool elements & inventery & add event listener --------------------------------------------

function creatTooleElement(tool, output) {
  let initialDiv = document.createElement("div");
  initialDiv.classList.add("toolContainer");
  initialDiv.addEventListener("click", toolClick);
  initialDiv.classList.add("margin0padding");
  initialDiv.setAttribute("id", tool);
  initialDiv.innerHTML = output;
  toolsBox.appendChild(initialDiv);
}
function creatInventory(num) {
  let initialDiv = document.createElement("div");
  initialDiv.setAttribute("id", "inventory");
  initialDiv.classList.add("inventory");
  initialDiv.addEventListener("click", function (e) {
    playSound("click");
    e.target.style.borderColor = "blue";
    if (currentTool !== "" && currentTool !== "inventory") {
      let previousTool = document.getElementById(currentTool);
      previousTool.classList.remove("currentTool");
    }
    currentTool = "inventory";
  });
  toolsBox.appendChild(initialDiv);
}
function fillTools(tools) {
  resetButton.style.visibility = "visible";
  switchBox.style.visibility = "visible";
  let output = "";
  tools.forEach((element, i) => {
    output = `<div class='toolImgDiv ${element}' "></div> 
  <div class="toolTxtDiv">${element}</div> `;
    creatTooleElement(element, output);
  });
  creatInventory(inventroyCount);
  let defaultTool = toolsBox.childNodes;
  defaultTool[5].classList.add("currentTool");
}

//---------------------tool onclick----------------------------

function toolClick(e) {
  playSound("click");

  let previousTool = document.getElementById(currentTool);
  previousTool.classList.remove("currentTool");
  if (currentTool == "inventory") previousTool.style.borderColor = "white";

  currentTool = e.currentTarget.getAttribute("id");
  e.currentTarget.classList.add("currentTool");
}
//---------------------wordElement  onclick----------------------------
function destruct(e) {
  let ElementClassesList = e.target.className.split(" ");
  let clickedElement = ElementClassesList[1];
  let correctTool =
    worldElements[worldElementsIndex.indexOf(clickedElement)][1];

  if (correctTool == currentTool) {
    const inventorySelcetor = document.getElementById("inventory");
    if (lastElemnt !== "") {
      if (!checkBox.checked) e.target.style.backgroundColor = "#3F3351";
      inventorySelcetor.classList.remove(lastElemnt);
      //if(!checkBox.checked)e.target.style.backgroundColor ="#3F3351"
    }
    inventorySelcetor.classList.add(clickedElement);
    e.target.classList.remove(clickedElement);
    lastElemnt = clickedElement;
    e.target.classList.add(worldElements[0][0]);
    playSound(currentTool);
  } else illegalMove();
}

// place sound when play

function playSound(event) {
  let toolSound;
  switch (event) {
    case tools[0]:
      toolSound = new Audio("/assets/sounds/axe1.mp3");
      break;
    case tools[1]:
      toolSound = new Audio("/assets/sounds/wet_grass3.ogg");
      break;
    case tools[2]:
      toolSound = new Audio("/assets/sounds/stone1.ogg");
      break;
    case "click":
      toolSound = new Audio("/assets/sounds/click-tool.mp3");
      break;
    case "wrong":
      toolSound = new Audio(
        "/assets/sounds/mixkit-cartoon-insect-buzzing-31.wav"
      );
      break;
    case "reset":
      toolSound = new Audio("/assets/sounds/reset.mp3");
      break;
    case "build":
      toolSound = new Audio("/assets/sounds/build.ogg");
      break;
    case "demo":
      toolSound = new Audio("/assets/sounds/mixkit-arcade-game-opener-222.wav");
      break;
    case "start":
      toolSound = new Audio(
        "/assets/sounds/mixkit-retro-arcade-casino-notification-211.wav"
      );
      break;
  }
  toolSound.play();
}
//------------on click game main button : start , demo , reset , them -------------

startButton.addEventListener("click", function () {
  playSound("start");
  document.querySelector(".startPage").style.visibility = "hidden";
  document.querySelector(".demo").style.visibility = "visible";
});
//-----------------mobile
function isMobile(media) {
  if (media.matches) {
    // If media query matches
    toolsBox.style.visibility = "visible";
    leftSideBox.style.height = "90%";
  }
}

demoButton.addEventListener("click", function () {
  document.querySelector(".demo").style.visibility = "hidden";
  document.querySelector(".gameBoardBox").style.visibility = "visible";
  fillTheBoard(intialMatrix);
  fillTools(tools);
  isMobile(media);
  playSound("demo");
});

resetButton.addEventListener("click", function () {
  gameBoard.innerHTML = "";
  if (lastElemnt !== "")
    document.getElementById("inventory").classList.toggle(lastElemnt);
  lastElemnt = "";
  fillTheBoard(intialMatrix);
  playSound("reset");
  checkBox.checked;
});
checkBox.addEventListener("change", function (e) {
  let temp = document.getElementsByClassName("boardBackground");

  if (e.target.checked) {
    changeBGColor(true);
  } else {
    changeBGColor(false);
  }
  playSound("click");
});
function changeBGColor(checked) {
  let backgroundCol = document.querySelectorAll(".boardBackground");
  for (i = 0; i < backgroundCol.length; i++) {
    if (checked) backgroundCol[i].style.backgroundColor = "#96D6EF";
    else backgroundCol[i].style.backgroundColor = "#3F3351";
  }
}
