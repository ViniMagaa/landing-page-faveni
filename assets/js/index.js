const burgerButton = document.querySelector("#burger");
const burgerIcon = burgerButton.querySelector("i"); // Assuming the icon is an <i> element
const menu = document.querySelector("#menu");

const activateMenu = () => {
	menu.classList.add("active");
	burgerIcon.classList.replace("fa-bars", "fa-xmark");
	burgerButton.style.position = "fixed";
};

const deactivateMenu = () => {
	menu.classList.remove("active");
	burgerIcon.classList.replace("fa-xmark", "fa-bars");
	burgerButton.style.position = "absolute";
};

const toggleMenu = () => {
	menu.classList.contains("active") ? deactivateMenu() : activateMenu();
};

const bodyClickHandler = (e) => {
	if (!menu.contains(e.target) && !burgerButton.contains(e.target)) {
		deactivateMenu();
	}
};

burgerButton.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);

document.body.addEventListener("click", bodyClickHandler);
