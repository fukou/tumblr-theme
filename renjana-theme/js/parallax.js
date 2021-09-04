const parallax = 6;
const container = document.querySelector("header#hero");

window.addEventListener("scroll", () => {
	container.style.setProperty(
		"background-position-y",
		`${(window.scrollY / parallax) * -1}px`
	);
});
