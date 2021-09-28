document.body.addEventListener("submit", e => e.preventDefault());

const uglyFileInput = document.querySelector("#ugly_file");
const uglyFileList = document.querySelector("#ugly_file_list");
const styledUglyFileInput = document.querySelector("#styled_ugly_file");
const styledUglyFileList = document.querySelector("#styled_ugly_file_list");

[{
    fileInput: uglyFileInput,
    fileList: uglyFileList
}, {
    fileInput: styledUglyFileInput,
    fileList: styledUglyFileList
}]
    .forEach(({fileInput, fileList}) => {
        fileInput.addEventListener("change", () => updateFileList(fileInput, fileList))
    });

function updateFileList(fileInput, fileList) {
    while(fileList.firstChild) {
        fileList.removeChild(fileList.firstChild);
    }

    let curFiles = fileInput.files;

    if(!(curFiles.length === 0))  {
        // console.log('test');

        for (let i = 0; i < curFiles.length; i++) {
            const listItem = document.createElement("li");

            listItem.textContent = `file name: ${curFiles[i].name}; file size: ${returnFileSize(curFiles[i].size)};`;
            fileList.appendChild(listItem);
        }
    }
}

function returnFileSize(number) {
    if(number < 1024) {
        return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
    }
}
