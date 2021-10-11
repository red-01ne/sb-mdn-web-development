import "./styles/global.css";
import "./styles/sample-container.css";

import sandboxSamplesList from "./sandbox-samples-list.json";
import {createSandboxSampleContainer} from "./scripts/create-sandbox-sample-container";

const main = document.createElement("main");
const mainHeader = document.createElement("header");
const mainHeaderTitle = document.createElement("h1");
const gridContainer = document.createElement("div");

mainHeaderTitle.textContent = "Sandbox Samples";

gridContainer.classList.add("grid-container")

sandboxSamplesList.reverse().forEach(({title, publicDirectory}) => {
    gridContainer.append(
        createSandboxSampleContainer(title, publicDirectory)
    );
});

mainHeader.append(mainHeaderTitle);
main.append(gridContainer);
document.body.append(mainHeader, main);


