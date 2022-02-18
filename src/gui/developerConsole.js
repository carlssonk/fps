import "../styles/console.css"
import { waitForElement } from "../utils"

const GUI = document.querySelector("#gui")


export const developerConsole = async () => {

  const DOM = /*html*/`
    <div class="console">
      <div class="console__dragBar"><span>Console</span><span class="console__exit"></span></div>
      <ul class="console__list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
        <li>5</li>
      </ul>
      <div class="console__inputContainer">
        <input class="console__input" type="text">
        <button class="console__button">Submit</button>
      </div>
    </div>
  `
  GUI.innerHTML = DOM

  // Always wait for a node right after inserting it to the dom
  const consoleNode = await waitForElement(".console")
  const dragNode = document.querySelector(".console__dragBar")

  handleDrag(consoleNode, dragNode)
}


const handleDrag = (element, dragBar) => {
  // Make the DIV element draggable:
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (dragBar) {
    // if present, the header is where you move the DIV from:
    dragBar.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

