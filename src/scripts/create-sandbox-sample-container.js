function createSandboxSampleContainer(title, publicDirectory) {
    const container = document.createElement("section");
    const containerHeader = document.createElement("header");
    const containerHeaderTitle = document.createElement("h2");
    const contractExpandButton = document.createElement("button");
    const sample = document.createElement("iframe");

    container.classList.add("sample-container", "contracted");
    contractExpandButton.classList.add("contract-expand");
    sample.classList.add("sample");

    containerHeaderTitle.textContent = title;

    contractExpandButton.addEventListener("click", () => {
        container.classList.toggle("contracted");
        const isExpanded = container.classList.toggle("expanded");

        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    sample.src = `sandbox/${publicDirectory}/index.html`;

    containerHeader.append(containerHeaderTitle, contractExpandButton)
    container.append(containerHeader, sample);

    return container;
}

export {createSandboxSampleContainer};
