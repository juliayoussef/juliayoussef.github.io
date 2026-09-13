document.addEventListener("DOMContentLoaded", () => {
  // -------------------- NOTES PAGE SEARCH --------------------
  const notesIndex = document.querySelector("[data-notes-index]");
  if (notesIndex) {
    const searchInput = notesIndex.querySelector("[data-notes-search-input]");
    const searchItems = Array.from(notesIndex.querySelectorAll("[data-notes-search-item]"));
    const searchGroups = Array.from(notesIndex.querySelectorAll("[data-notes-search-group]"));
    const resultSections = Array.from(notesIndex.querySelectorAll("[data-notes-results-section]"));
    const emptyMessage = notesIndex.querySelector("[data-notes-empty]");

    const normalize = (value) => value.toLowerCase().trim().replace(/\s+/g, " ");

    const filterNotes = () => {
      const terms = normalize(searchInput?.value || "")
        .split(" ")
        .filter(Boolean);
      let visibleItemCount = 0;

      searchItems.forEach((item) => {
        const searchText = normalize(item.dataset.notesSearchText || item.textContent || "");
        const isVisible = terms.every((term) => searchText.includes(term));
        item.hidden = !isVisible;

        if (isVisible) {
          visibleItemCount += 1;
        }
      });

      searchGroups.forEach((group) => {
        const hasVisibleItems = Array.from(group.querySelectorAll("[data-notes-search-item]")).some(
          (item) => !item.hidden
        );
        group.hidden = !hasVisibleItems;
      });

      resultSections.forEach((section) => {
        const hasVisibleItems = Array.from(section.querySelectorAll("[data-notes-search-item]")).some(
          (item) => !item.hidden
        );
        section.hidden = !hasVisibleItems;
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleItemCount > 0;
      }
    };

    searchInput?.addEventListener("input", filterNotes);
    filterNotes();
  }

  // -------------------- FILTER BUTTONS --------------------
  const filterButtons = document.querySelectorAll("#filter-buttons button");
  const items = document.querySelectorAll(".masonry-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const tags = item.dataset.tags.split(" ");
        item.style.display = filter === "all" || tags.includes(filter) ? "block" : "none";
      });
    });
  });

  // -------------------- WRITINGS PAGE --------------------
  const writingsLayout = document.querySelector(".writings-layout-row");
  if (writingsLayout) {
    const writingsItems = Array.from(document.querySelectorAll("[data-writings-item]"));
    const pagination = document.querySelector("[data-writings-pagination]");
    const pageButtons = document.querySelector("[data-writings-pages]");
    const prevButton = document.querySelector("[data-writings-prev]");
    const nextButton = document.querySelector("[data-writings-next]");
    const writingsPageSize = parseInt(writingsLayout.dataset.writingsPageSize || "4", 10);
    const totalPages = Math.max(1, Math.ceil(writingsItems.length / writingsPageSize));
    let currentPage = 1;

    const renderWritingsPage = (page) => {
      currentPage = Math.min(Math.max(page, 1), totalPages);
      const startIndex = (currentPage - 1) * writingsPageSize;
      const endIndex = startIndex + writingsPageSize;

      writingsItems.forEach((item, index) => {
        item.hidden = index < startIndex || index >= endIndex;
      });

      if (pageButtons) {
        pageButtons.innerHTML = "";

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "writings-pagination-page";
          button.textContent = String(pageNumber);
          button.disabled = pageNumber === currentPage;

          if (pageNumber === currentPage) {
            button.classList.add("is-active");
          }

          button.addEventListener("click", () => renderWritingsPage(pageNumber));
          pageButtons.appendChild(button);
        }
      }

      if (prevButton) {
        prevButton.disabled = currentPage === 1;
      }

      if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
      }
    };

    if (pagination && writingsItems.length > writingsPageSize) {
      pagination.hidden = false;

      prevButton?.addEventListener("click", () => renderWritingsPage(currentPage - 1));
      nextButton?.addEventListener("click", () => renderWritingsPage(currentPage + 1));
    }

    renderWritingsPage(1);

    const snippetItems = Array.from(document.querySelectorAll("[data-snippet-item]"));
    const snippetsLoadMoreButton = document.querySelector("[data-snippets-load-more]");
    const snippetsInitialCount = parseInt(writingsLayout.dataset.snippetsInitialCount || "4", 10);
    const snippetsLoadIncrement = parseInt(writingsLayout.dataset.snippetsLoadIncrement || "3", 10);
    let visibleSnippetsCount = snippetsInitialCount;

    const renderSnippets = () => {
      snippetItems.forEach((item, index) => {
        item.hidden = index >= visibleSnippetsCount;
      });

      if (snippetsLoadMoreButton) {
        snippetsLoadMoreButton.hidden = visibleSnippetsCount >= snippetItems.length;
      }
    };

    snippetsLoadMoreButton?.addEventListener("click", () => {
      visibleSnippetsCount = Math.min(visibleSnippetsCount + snippetsLoadIncrement, snippetItems.length);
      renderSnippets();
    });

    renderSnippets();
  }
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
