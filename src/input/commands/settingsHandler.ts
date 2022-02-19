import { developerConsole } from '../../gui/developerConsole';
import { gameLoop } from '../../index';
import { player } from '../../player/player';

// Setting Variables
export let fov: number = 90;
export let fpsMax: number = 144;
export let sensitivity: number = 2.5;
export let gravity: number = 30;

const settingsHandler = (): any => {
  // Set default/initial settings.
  // let volume = 1;

  // let keybindings = {
  //   jump: "Space",
  //   mForward: "KeyW",
  //   mLeft: "KeyA",
  //   mRight: "KeyD",
  //   mBackward: "KeyS",
  //   use: "F"
  // };

  return {
    // get fpsMax() {
    //   return fpsMax;
    // },
    set fpsMax(value: number) {
      gameLoop.fps = fpsMax = value;
    },
    // get fov() {
    //   return fov;
    // },
    set fov(value: number) {
      player.fov = fov = value;
    },

    set sensitivity(value: number) {
      sensitivity = value;
    },

    attachConsole(): void {
      handleSettingsFromConsole();
    }
  };
};

const handleSettingsFromConsole = (): void => {
  // Mapping object used to define commands for our console.
  const commands: any = {
    fps_max: (value: number) => callSetter('fpsMax', value),
    fov: (value: number) => callSetter('fov', value),
    sensitivity: (value: number) => callSetter('sensitivity', value)
  };

  // Call a setter defined in out settings function.
  const callSetter = (property: string, value: number) => {
    settings[property] = value;
  };

  // Dom.
  const input = developerConsole.inputNode as HTMLInputElement;
  const button = developerConsole.buttonNode;
  // console.log(input)
  // Submit a console command.
  button?.addEventListener('click', () => {
    // extract command and value from input string
    const text = input.value;
    sendCommandStyle(text);

    const spaceIndex = text.indexOf(' ');
    const command = text.slice(0, spaceIndex);
    const value = text.slice(spaceIndex + 1);

    // make sure command and value is validated
    const commandFunction = commands[command];
    const commandIsValid = typeof commandFunction === 'function';
    const valueIsValidNumber = /^\d+$/.test(value);
    console.log(commandIsValid);
    console.log(valueIsValidNumber);
    if (commandIsValid && valueIsValidNumber) {
      // call "callSetter" through our mapping object
      commandFunction(Number(value));
    }
  });

  function sendCommandStyle(text: string) {
    input.value = '';

    if (text.length > 0 && text.trim().length > 0) {
      developerConsole.listNode?.insertAdjacentHTML(
        'afterbegin',
        `<li>${text}</li>`
      );
    }
  }
};

// Save our settings handler to a variable,
// export this variable so we can use in other scripts to see and change our settings.
export const settings = settingsHandler();
