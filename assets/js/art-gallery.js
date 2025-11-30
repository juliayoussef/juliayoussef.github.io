// ---------- FILTERING ----------
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#filter-buttons button");
  const items = document.querySelectorAll(".masonry-item");

  if (buttons.length && items.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        items.forEach(item => {
          const tags = item.dataset.tags.split(" ");
          if (filter === "all" || tags.includes(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // ---------- LIGHTBOX ----------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".img-wrapper img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.dataset.full;
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
});
