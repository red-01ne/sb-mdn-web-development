const list = document.createElement("ul");
const info = document.createElement("p");
const container = document.createElement("section");

info.textContent = "Below is a dynamic list." +
    " Click anywhere inside this section and outside the list's items to add a new list item." +
    " Click an existing list item to change its text to something else.";

container.id = "dynamic_list_container"
container.onclick = function() {
    const listItem = document.createElement('li');
    const listContent = prompt('What content do you want the list item to have?');

    listItem.textContent = listContent;
    list.appendChild(listItem);

    listItem.onclick = function (e) {
        e.stopPropagation();
        const listContent = prompt('Enter new content for your list item');
        this.textContent = listContent;
    };
}

container.append(info, list);
document.querySelector("main").append(container);
