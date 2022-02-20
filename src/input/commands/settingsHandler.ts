import { developerConsole } from '../../gui/developerConsole';
import { gameLoop } from '../../index';
import { player } from '../../player/player';
import { validateInteger } from './validateInteger';

// Setting Variables
export let fov: number = 90;
export let fps_max: number = 144;
export let sensitivity: number = 2.5;
export let gravity: number = 30;
export let bunnyhop: 0 | 1 = 0;

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
    // FPS MAX
    get fps_max() {
      return fps_max;
    },
    set fps_max(value: number) {
      gameLoop.fps = fps_max = value;
    },

    // FOV
    get fov() {
      return fov;
    },
    set fov(value: number) {
      player.fov = fov = value;
    },

    // SENSITIVITY
    get sensitivity() {
      return sensitivity;
    },
    set sensitivity(value: number) {
      sensitivity = value;
    },

    // BUNNYHOP
    get bunnyhop() {
      return bunnyhop;
    },
    set bunnyhop(value: 1 | 0) {
      bunnyhop = value;
    },

    attachConsole(): void {
      handleSettingsFromConsole();
    }
  };
};

const handleSettingsFromConsole = (): void => {
  const validateValue: any = {
    fps_max: (value: string) => validateInteger(value, 0, 999)
  };

  // Dom.
  const input = developerConsole.inputNode as HTMLInputElement;
  const button = developerConsole.buttonNode;
  // Submit a console command.
  button?.addEventListener('click', () => {
    // extract command and value from input string
    const text = input.value;

    const spaceIndex = text.indexOf(' ');
    const command = text.slice(0, spaceIndex);
    const value = text.slice(spaceIndex + 1);

    console.log(command);
    console.log(value);

    // All values for modifing settings are numbers
    if (typeof settings[command] === 'number') {
      const validateFunc = validateValue[command];
      if (!validateFunc) return commandNotFound();

      const validatedValue = validateFunc(value);
      console.log(validatedValue);
      if (
        validatedValue === false ||
        validatedValue === undefined ||
        isNaN(validatedValue)
      )
        return sendCommandStyle(`Usage: ${command} [number]`);

      settings[command] = validatedValue;
      sendCommandStyle(
        `${command} <span style="color: #7866ff;">${validatedValue}</span>`
      );
    } else {
      commandNotFound();
    }
  });

  function commandNotFound() {
    sendCommandStyle('Command not found');
  }

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

console.log(Object.entries(settings));
