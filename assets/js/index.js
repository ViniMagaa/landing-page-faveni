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
const whyFaveniCarouselPrevButton = document.getElementById(
	"why-faveni-carousel-button-left"
);
const whyFaveniCarouselNextButton = document.getElementById(
	"why-faveni-carousel-button-right"
);
const whyFaveniCarousel = document.getElementById("why-faveni-carousel");

const testimonialsCarouselPrevButton = document.getElementById(
	"testimonials-carousel-button-left"
);
const testimonialsCarouselNextButton = document.getElementById(
	"testimonials-carousel-button-right"
);
const testimonialsCarousel = document.getElementById("testimonials-carousel");

const carouselScrollX = (carousel, width) => {
	carousel.scrollTo(carousel.scrollLeft + width, 0);
};

const carouselWhyFaveniScroll = (direction) => {
	const width = whyFaveniCarousel.style.width.replace("px", "");
	carouselScrollX(whyFaveniCarousel, direction * Number(width));
};

const updateWhyFaveniCarouselItemsWidth = (width) => {
	const inner = document.getElementById("why-faveni-carousel-inner");
	const items = document.querySelectorAll(
		"#why-faveni-carousel-inner > .carousel-item"
	);

	whyFaveniCarousel.style.width = width + "px";
	inner.style.width = items.length * 0.7 * width + "px";
};

const carouselTestimonialsScroll = (direction) => {
	const width = Number(testimonialsCarousel.style.width.replace("px", ""));
	carouselScrollX(testimonialsCarousel, direction * width);
};

const updateTestimonialsCarouselItemsWidth = (width) => {
	const inner = document.getElementById("testimonials-carousel-inner");
	const items = document.querySelectorAll(
		"#testimonials-carousel-inner >.carousel-item"
	);

	const newWidth = width >= 425 ? 425 : width;

	testimonialsCarousel.style.width = newWidth + "px";
	inner.style.width = items.length * newWidth + "px";
	items.forEach((item) => (item.style.width = newWidth - 2 * 16 + "px"));
};

const updateCarouselsWidth = () => {
	const whyFaveniwidth = window.innerWidth < 700 ? window.innerWidth : 700;
	updateWhyFaveniCarouselItemsWidth(whyFaveniwidth);

	const testimonialsWidth =
		window.innerWidth >= 1100
			? 0.5 * window.innerWidth - 4 * 48
			: window.innerWidth - 6 * 48;
	updateTestimonialsCarouselItemsWidth(testimonialsWidth);
};

// --- Global Handlers ---
const clickHandler = (e) => {
	if (!menu.contains(e.target) && !burgerButton.contains(e.target)) {
		deactivateMenu();
	}
};

const resizeHandler = () => {
	updateCarouselsWidth();
};

// --- Events ---
updateCarouselsWidth();

// --- Event Listeners ---

// - Carousels
// Why Faveni
whyFaveniCarouselPrevButton.addEventListener("click", () =>
	carouselWhyFaveniScroll(-0.7)
);
whyFaveniCarouselNextButton.addEventListener("click", () =>
	carouselWhyFaveniScroll(0.7)
);
// Testimonials
testimonialsCarouselPrevButton.addEventListener("click", () =>
	carouselTestimonialsScroll(-1)
);
testimonialsCarouselNextButton.addEventListener("click", () =>
	carouselTestimonialsScroll(1)
);

// Menu
burgerButton.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);

document.body.addEventListener("click", clickHandler);
window.onresize = resizeHandler;
