/* Hello world examples

const mainHeading = document.getElementById("main_heading");
mainHeading.textContent = "Hello World";

document.body.addEventListener("click", () => {
    alert("Ouch! Stop poking me!");
});

 */

const mainHeading = document.getElementById("main_heading");
const logoImg = document.getElementById("logo_img");
const changeUserButton = document.getElementById("change_user_button");

logoImg.addEventListener("click", e => {
    const img = e.target;
    const imgSrc = img.getAttribute("src");
    const olderLogo = "assets/mozilla-firefox-older-logo.png";
    const backgroundLightYellow = "background-light-yellow"
    const newerLogo = "assets/mozilla-firefox-newer-logo.png";
    const backgroundLightBlue = "background-light-blue";

    if (imgSrc === olderLogo) {
        img.setAttribute("src", newerLogo);
        img.classList.replace(backgroundLightYellow, backgroundLightBlue);
    } else {
        img.setAttribute("src", olderLogo);
        img.classList.replace(backgroundLightBlue, backgroundLightYellow);
    }
});

function setUserName() {
    const userName = prompt("Please enter your name.", "");

    if (userName) {
        localStorage.setItem("userName", userName);
        mainHeading.textContent = `Mozilla is cool, ${userName}`;
    } else if (!userName && userName !== null) {
        setUserName();
    }
}

changeUserButton.addEventListener("click", setUserName);

window.addEventListener("load", () => {
    const userName = localStorage.getItem("userName");

    if (userName) {
        mainHeading.textContent = `Mozilla is cool, ${userName}`;
    } else {
        setUserName();
    }
});
