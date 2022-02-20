import { developerConsole } from '../../gui/developerConsole';
import { gameLoop } from '../../index';
import { player } from '../../player/player';
import { validateInteger } from './validateInteger';
import { validateFloat } from './validateFloat';
import { validateBoolean } from './validateBoolean';

// Setting Variables
export let fov: number = 90;
export let fps_max: number = 144;
export let sensitivity: number = 2.5;
export let gravity: number = 30;
export let bunnyhop: 0 | 1 = 0;

interface SettingMethodsInterface {
  fps_max: number | ((value: string) => number | false);
  fov: number | ((value: string) => number | false);
  sensitivity: number | ((value: string) => number | false);
  bunnyhop: number | ((value: string) => number | false);
  attachConsole: () => void;
}

// Ignore "attachConsole" since this is not a valid command
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type CommandsInterface = Omit<SettingMethodsInterface, 'attachConsole'>;

const settingsHandler = (): any => {
  const commands: SettingMethodsInterface = {
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

  return commands;
};

const handleSettingsFromConsole = (): void => {
  const validateValue: CommandsInterface = {
    fps_max: (value: string) => validateInteger(value, 0, 9999),
    fov: (value: string) => validateInteger(value, 1, 170),
    sensitivity: (value: string) => validateFloat(value, 0, 999),
    bunnyhop: (value: string) => validateBoolean(value)
  };

  // Dom.
  const input = developerConsole.inputNode as HTMLInputElement;
  const button = developerConsole.buttonNode;
  // Submit a console command.
  button?.addEventListener('click', () => {
    // extract command and value from input string
    const text: string = input.value;

    const spaceIndex: number = text.indexOf(' ');
    const command: string = text.slice(0, spaceIndex);
    const value: string = text.slice(spaceIndex + 1);

    console.log(command);
    console.log(value);

    // Check if command exists
    if (typeof settings[command] === 'number') {
      const validateFunc: any =
        validateValue[command as keyof CommandsInterface];

      const validatedValue = validateFunc(value);

      // If user typed wrong value
      if (validatedValue === false || validatedValue === undefined) {
        return sendCommandStyle(`Usage: ${command} [number]`);
      }

      settings[command] = validatedValue;
      sendCommandStyle(
        `${command} <span style="color: #7866ff;">${validatedValue}</span>`
      );
    } else {
      // If user types command without a value
      if (typeof settings[text] === 'number')
        return sendCommandStyle(`Usage: ${text} [number]`);

      commandNotFound(text);
    }
  });

  console.log(input);
  input.addEventListener('change', (event) => {
    console.log(event);
  });

  function commandNotFound(command: string) {
    sendCommandStyle(`Unknown command "${command}"`);
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
