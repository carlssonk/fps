import { developerConsole } from '../../gui/developerConsole';
import { gameLoop } from '../../index';
import { player } from '../../player/player';
import { validateInteger } from './validateInteger';
import { validateFloat } from './validateFloat';
import { validateBoolean } from './validateBoolean';

// Setting Variables
export let fov: number = 70;
export let fps_max: number = 144;
export let sensitivity: number = 2.5;
export let gravity: number = 15;
export let bunnyhop: 0 | 1 = 0;
export let damping: number = 10;

interface SettingMethodsInterface {
  fps_max: number | ((value: string) => number | false);
  fov: number | ((value: string) => number | false);
  sensitivity: number | ((value: string) => number | false);
  bunnyhop: number | ((value: string) => number | false);
  damping: number | ((value: string) => number | false);
  gravity: number | ((value: string) => number | false);
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

    // DAMPING
    get damping() {
      return damping;
    },
    set damping(value: number) {
      damping = value;
    },

    // GRAVITY
    get gravity() {
      return gravity;
    },
    set gravity(value: number) {
      gravity = value;
    },

    attachConsole(): void {
      handleSettingsFromConsole();
    }
  };

  return commands;
};

const handleSettingsFromConsole = (): void => {
  // Validate values
  // This obj is also used to compare user input to find matches
  const validateValue: CommandsInterface = {
    fps_max: (value: string) => validateInteger(value, 0, 9999),
    fov: (value: string) => validateInteger(value, 1, 170),
    sensitivity: (value: string) => validateFloat(value, 0, 999),
    bunnyhop: (value: string) => validateBoolean(value),
    damping: (value: string) => validateFloat(value, 0, 999),
    gravity: (value: string) => validateFloat(value, -30, 9999)
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

    // Check if command exists
    if (typeof settings[command] === 'number') {
      const validateFunc: any =
        validateValue[command as keyof CommandsInterface];

      const validatedValue = validateFunc(value);

      // If user typed wrong value
      if (validatedValue === false || validatedValue === undefined) {
        return sendCommandStyle(`Usage: ${command} [number]`);
      }

      // Update setting
      settings[command] = validatedValue;
      // Update array of all settings
      commandsArray = Object.entries(settings);
      // Send command to console
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

  const matchesContainer = developerConsole.matchesNode as HTMLDivElement;

  // Listen for keystrokes
  input.addEventListener('input', (event) => {
    const element = event.target as HTMLInputElement;
    const inputValue = element?.value;

    if (inputValue.length === 0) return (matchesContainer.innerHTML = '');

    // Find commands that matches current inputValue
    const matches = commandsArray.filter((item) => {
      const value = inputValue.toLocaleLowerCase().trim();

      return item[0] in validateValue && item[0].includes(value);
    });

    // List out available commands that matcehs current inputValue
    matchesContainer.innerHTML = `
      ${matches
        .map(
          (item) =>
            `<button tabindex="0" class="console__matchesButton" data-key=${item[0]}>${item[0]} ${item[1]}</button>`
        )
        .join('')}
    `;
  });

  // When user focuses a command from the list
  matchesContainer.addEventListener('focusin', function (event) {
    const element = event.target as HTMLInputElement;
    const command = element.dataset.key;

    input.value = `${command} `;
  });

  // When user clicks a command from the list
  matchesContainer.addEventListener('click', function (event) {
    const element = event.target as HTMLInputElement;

    input.value = element.innerText;
    input.focus();
    matchesContainer.innerHTML = '';
  });

  function commandNotFound(command: string) {
    sendCommandStyle(`Unknown command "${command}"`);
  }

  // Send text to console
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

let commandsArray = Object.entries(settings);
