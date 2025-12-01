// -------------------- FILTER BUTTONS --------------------
const filterButtons = document.querySelectorAll("#filter-buttons button");
const items = document.querySelectorAll(".masonry-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
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

// -------------------- LIGHTBOX --------------------
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lb.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
