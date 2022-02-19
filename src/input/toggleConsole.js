import { developerConsole } from "../gui/developerConsole";
// import { settings } from "./commands/settingsHandler";

export const toggleConsole = () => {

  // console.log(settings)

  document.addEventListener("keydown", (event) => {

    if (event.code === "Backquote") {

      developerConsole.toggle()

    }

  })

  document.addEventListener("keyup", (event) => {

    if (event.code === "Backquote") {

      developerConsole.clearInput()

    }

  })

  developerConsole.exitNode.addEventListener("click", () => {
    developerConsole.exit()
  })

  developerConsole.formNode.addEventListener("submit", (event) => {
    event.preventDefault();
  })

}