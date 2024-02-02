// --- Navbar ---
const navBar = document.getElementById("navbar");

const toggleNavBarActive = (isActive) => {
	if (isActive) {
		navBar.classList.remove("hide");
		navBar.classList.add("active");
		return;
	}
	navBar.classList.add("hide");
	navBar.classList.remove("active");
};

const resetNavBar = () => {
	navBar.classList.remove("hide");
	navBar.classList.remove("active");
};

// --- Menu ---
const burgerButton = document.querySelector("#burger");
const burgerIcon = burgerButton.querySelector("i");
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

// --- Global Handlers ---
let scrollY = window.scrollY;

const scrollHandler = () => {
	if (window.scrollY < scrollY) {
		toggleNavBarActive(true);
	} else {
		if (menu.classList.contains("active")) return;
		toggleNavBarActive(false);
	}
	if (window.scrollY <= 200) {
		resetNavBar();
	}
	scrollY = window.scrollY;
};

const clickHandler = (e) => {
	if (!menu.contains(e.target) && !burgerButton.contains(e.target)) {
		deactivateMenu();
	}
};

// --- Event Listeners ---
burgerButton.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);
document.body.addEventListener("click", clickHandler);

window.onscroll = scrollHandler;
