document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modalImage = document.getElementById("modalImage");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  let visibleItems = Array.from(galleryItems); // Array of currently visible images

  // Filtering logic
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Filter images
      visibleItems = Array.from(galleryItems).filter((item) => {
        if (filter === "all") {
          item.style.display = "block";
          return true;
        } else if (item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          return true;
        } else {
          item.style.display = "none";
          return false;
        }
      });

      // Update active button styling
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Modal functionality
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Only consider visible items
      currentIndex = visibleItems.indexOf(item);
      updateModalImage();
      const modal = new bootstrap.Modal(
        document.getElementById("galleryModal")
      );
      modal.show();
    });
  });

  prevBtn.addEventListener("click", () => {
    currentIndex =
      currentIndex === 0 ? visibleItems.length - 1 : currentIndex - 1;
    updateModalImage();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex =
      currentIndex === visibleItems.length - 1 ? 0 : currentIndex + 1;
    updateModalImage();
  });

  function updateModalImage() {
    modalImage.src = visibleItems[currentIndex].querySelector("img").src;
  }
});
