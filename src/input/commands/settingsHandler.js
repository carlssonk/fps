import { developerConsole } from "../../gui/developerConsole";
import { gameLoop } from "../../index"

const settingsHandler = () => {
  // Set default/initial settings.
  let sensetivity = 2;
  let volume = 1;
  // let maxFps = 144;
  let keybindings = {
    jump: "Space",
    mForward: "KeyW",
    mLeft: "KeyA",
    mRight: "KeyD",
    mBackward: "KeyS",
    use: "F"
  };

  return {
    // get fps() {
    //   return gameLoop.fps;
    // },
    // set fps(value) {
    //   gameLoop.fps = value;
    // },
    get volume() {
      return volume;
    },
    set volume(value) {
      volume = value;
    },

    attachConsole() {
      handleSettingsFromConsole();
    }

  };
};


const handleSettingsFromConsole = () => {

  // Mapping object used to define commands for our console.
  const commands = {
    fps_max: (value) => gameLoop.fps = value,
    // fps_max: (value) => callSetter("fps", value)
  };

  // Call a setter defined in out settings function.
  const callSetter = (property, value) => {
    console.log(property, value)
    settings[property] = value;
  };

  // Dom.
  const input = developerConsole.inputNode
  const button = developerConsole.buttonNode;
  // console.log(input)
  // Submit a console command.
  button.addEventListener("click", () => {
    // extract command and value from input string
    const text = input.value;
    sendCommandStyle(text)

    const spaceIndex = text.indexOf(" ");
    const command = text.slice(0, spaceIndex);
    const value = text.slice(spaceIndex + 1);

    // make sure command and value is validated
    const commandFunction = commands[command];
    const commandIsValid = typeof commandFunction === "function";
    const valueIsValidNumber = /^\d+$/.test(value);
    console.log(commandIsValid)
    console.log(valueIsValidNumber)
    if (commandIsValid && valueIsValidNumber) {
      // call "callSetter" through our mapping object
      commandFunction(Number(value));

    }
  });



  function sendCommandStyle(text) {
    input.value = "";

    if (text.length > 0 && text.trim().length > 0) {
      developerConsole.listNode.insertAdjacentHTML("afterbegin", `<li>${text}</li>`)
    }
  }

}

// Save our settings handler to a variable,
// export this variable so we can use in other scripts to see and change our settings.
export const settings = settingsHandler();