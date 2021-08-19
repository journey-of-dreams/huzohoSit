export const handleSlide = () => {

    const images = document.querySelectorAll(".slide-in");

    function checkSlide() {
        images.forEach(image => {
            const scorlled = window.scrollY + window.innerHeight;
            const imageHalf = image.offsetTop + (image.getBoundingClientRect().height / 2);
            const imageBottom = image.offsetTop + image.getBoundingClientRect().height;
            const isHalfShow = scorlled > imageHalf;
            const isNotScollPast = imageBottom > window.scrollY;
            if (isHalfShow && isNotScollPast) {
                image.classList.add("active");
            } else {
                // image.classList.remove("active");
            }
        })
    }

    window.addEventListener("scroll", checkSlide);
}