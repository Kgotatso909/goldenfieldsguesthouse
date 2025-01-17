document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const logo = document.getElementById("logo");
    if (window.innerWidth <= 991) {
      {
        logo.src = "assets/images/logo/original.png";
      }
    }

    if (window.innerWidth >= 991) {
      if (window.scrollY >= 50) {
        navbar.classList.add("scrolled", "navbar-light");
        logo.src = "assets/images/logo/black_on_white.png";
      } else {
        navbar.classList.remove("scrolled", "navbar-light");
        logo.src = "assets/images/logo/original.png";
      }
    }
  });

  let offset = 300,
    offset_opacity = 1200,
    scroll_top_duration = 700,
    $back_to_top = $(".go-top");
  $(window).on("scroll", function () {
    $(this).scrollTop() > offset
      ? $back_to_top.addClass("go-top-visible")
      : $back_to_top.removeClass("go-top-visible go-top-fade-out");
    if ($(this).scrollTop() > offset_opacity) {
      $back_to_top.addClass("go-top-fade-out");
    }
  });

  $back_to_top.on("click", function (event) {
    event.preventDefault();
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      scroll_top_duration
    );
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Use data-src for lazy loading
        observer.unobserve(img); // Stop observing once loaded
      }
    });
  });

  lazyImages.forEach((img) => {
    observer.observe(img);
  });
});
console.log("pass");
// Toggle descriptions
function toggleDescription(header) {
  const description = header.nextElementSibling;
  const arrow = header.querySelector(".arrow");

  description.classList.toggle("show");
  header.classList.toggle("active");
}
