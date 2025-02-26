function toggleMenuIcon(button) {
    const img = button.querySelector("img");
    if (img.src.includes("menuIcon.svg")) {
        img.src = "assets/close.svg";
    } else {
        img.src = "assets/menuIcon.svg";
    }
}