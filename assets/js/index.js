// --- Menu ---
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

// --- Carousels ---
const carouselPrevButton = document.getElementById(
	"why-faveni-carousel-button-left"
);
const carouselNextButton = document.getElementById(
	"why-faveni-carousel-button-right"
);
const carouselWhyFaveni = document.getElementById("why-faveni-carousel");

const carouselWhyFaveniScroll = (direction) => {
	const width = carouselWhyFaveni.style.width.replace("px", "");
	carouselScrollX(direction * Number(width));
};

const updateCarouselsItemsWidth = (width) => {
	const items = document.getElementsByClassName("carousel-item");
	const inner = document.getElementsByClassName("carousel-inner");

	inner[0].style.width = items.length * 0.7 * width + "px";
};

const updateWhyFaveniCarouselWidth = () => {
	const width = window.innerWidth < 700 ? window.innerWidth : 700;
	carouselWhyFaveni.style.width = width + "px";

	updateCarouselsItemsWidth(width);
};

const carouselScrollX = (width) => {
	carouselWhyFaveni.scrollTo(carouselWhyFaveni.scrollLeft + width, 0);
};

// --- Global Handlers ---
const clickHandler = (e) => {
	if (!menu.contains(e.target) && !burgerButton.contains(e.target)) {
		deactivateMenu();
	}
};

const resizeHandler = () => {
	updateWhyFaveniCarouselWidth();
};

// --- Events ---
updateWhyFaveniCarouselWidth();

// --- Event Listeners ---

// Carousel
carouselPrevButton.addEventListener("click", () =>
	carouselWhyFaveniScroll(-0.7)
);
carouselNextButton.addEventListener("click", () =>
	carouselWhyFaveniScroll(0.7)
);

// Menu
burgerButton.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);

document.body.addEventListener("click", clickHandler);
window.onresize = resizeHandler;
