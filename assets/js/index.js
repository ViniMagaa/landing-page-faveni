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

	const newWidth = width >= 500 ? 500 : width;

	testimonialsCarousel.style.width = newWidth + "px";
	inner.style.width = items.length * newWidth + "px";
	items.forEach((item) => (item.style.width = newWidth - 2 * 16 + "px"));
};

const updateCarouselsWidth = () => {
	const whyFaveniWidth = window.innerWidth < 700 ? window.innerWidth : 700;
	updateWhyFaveniCarouselItemsWidth(whyFaveniWidth);

	const testimonialsWidth =
		window.innerWidth >= 950
			? 0.5 * window.innerWidth - 4 * 48
			: window.innerWidth - 3 * 48;
	updateTestimonialsCarouselItemsWidth(testimonialsWidth);
};

// --- FAQ Acordeon ---
const faqAcordeon = document.getElementById("faq-acordeon");
const faqAcordeonItems = faqAcordeon.querySelectorAll("#faq-acordeon > .item");

const resetFaqAcordeonItems = () => {
	faqAcordeonItems.forEach((faqAcordeonItem) => {
		faqAcordeonItem.classList.remove("active");
		faqAcordeonItem.querySelector("p").style.display = "none";
		faqAcordeonItem.querySelector("i").style.display = "block";
	});
};

const toggleFaqAcordeonItemActive = (item) => {
	resetFaqAcordeonItems();
	item.classList.add("active");
	item.querySelector("p").style.display = "block";
	item.querySelector("i").style.display = "none";
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

const resizeHandler = () => {
	updateCarouselsWidth();
};

// --- Events ---
updateCarouselsWidth();
toggleFaqAcordeonItemActive(faqAcordeonItems[0]);

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

// - Menu
burgerButton.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);

// - FAQ Acordeon
faqAcordeonItems.forEach((faqAcordeonItem) =>
	faqAcordeonItem.children[0].addEventListener("click", (e) => {
		e.stopPropagation();
		toggleFaqAcordeonItemActive(faqAcordeonItem);
	})
);

window.onscroll = scrollHandler;
document.body.addEventListener("click", clickHandler);
window.onresize = resizeHandler;
