---
layout: page
title: art
permalink: /art/
description: selected work and process
nav: true
nav_order: 5
---

A place to host my science-related artistic content. For more general work, see my site on Fourthwall: (in progress)

Click each work to see full-screen along with any metadata and progress notes. 

<style>
  #art-gallery.masonry-grid {
    column-count: 3 !important;
    column-gap: 1rem !important;
  }

  @media (max-width: 1000px) {
    #art-gallery.masonry-grid {
      column-count: 2 !important;
    }
  }

  @media (max-width: 600px) {
    #art-gallery.masonry-grid {
      column-count: 1 !important;
    }
  }

  #art-gallery .masonry-item {
    display: inline-block !important;
    width: 100% !important;
    margin: 0 0 1rem 0 !important;
    vertical-align: top !important;
    break-inside: avoid !important;
    -webkit-column-break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  .art-tags {
    border-bottom: 0;
    margin-bottom: 1.75rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .art-tags ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem 0.55rem;
    align-items: center;
  }

  .art-tags li {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
  }

  .art-tag-filter {
    appearance: none;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    background: var(--global-card-bg-color);
    padding: 0.35rem 0.7rem;
    color: var(--global-theme-color);
    cursor: pointer;
    text-decoration: none;
    line-height: 1.1;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;
  }

  .art-tag-filter:hover,
  .art-tag-filter.is-active {
    background: var(--global-hover-color);
    border-color: var(--global-hover-color);
    color: var(--global-footer-text-color);
    text-decoration: none;
  }

  .art-tag-separator {
    opacity: 0.7;
  }

  #art-gallery .masonry-item[hidden] {
    display: none !important;
  }

  .art-card-link {
    display: block;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }

  .img-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    background: #111;
  }

  .img-wrapper img {
    display: block;
    width: 100%;
    height: auto;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.28) 56%, rgba(0, 0, 0, 0.08)),
      rgba(0, 0, 0, 0.18);
    color: #f7f4ea;
    opacity: 0;
    transition: opacity 0.2s ease;
    display: flex;
    align-items: end;
  }

  .img-wrapper:hover .overlay,
  .img-wrapper:focus-within .overlay {
    opacity: 1;
  }

  .overlay-text {
    width: 100%;
    padding: 0.95rem;
    box-sizing: border-box;
    color: #f7f4ea;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  }

  .overlay-text h3,
  .overlay-text .art-meta,
  .overlay-text .art-description {
    color: inherit;
  }

  .overlay-text h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    line-height: 1.2;
  }

  .art-meta {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.25;
    opacity: 0.96;
  }

  .art-description {
    margin-top: 0.4rem;
    font-size: 0.88rem;
    line-height: 1.3;
    opacity: 0.98;
  }
</style>

{% assign sorted_art = site.art | sort: "importance" %}
{% assign all_tags = "" | split: "" %}

{% for piece in sorted_art %}
  {% if piece.tags %}
    {% assign all_tags = all_tags | concat: piece.tags %}
  {% endif %}
{% endfor %}

{% assign unique_tags = all_tags | uniq | sort %}

<div class="art-tags">
  <ul>
    <li>
      <a class="art-tag-filter" href="{{ '/art/' | relative_url }}" data-art-tag="">
        all
      </a>
    </li>
    {% for tag in unique_tags %}
      <li>
        <span class="art-tag-separator">&middot;</span>
        {% assign tag_slug = tag | slugify %}
        <a class="art-tag-filter" href="{{ '/art/' | relative_url }}?tag={{ tag_slug }}" data-art-tag="{{ tag_slug }}">
          # {{ tag }}
        </a>
      </li>
    {% endfor %}
  </ul>
</div>

<div class="masonry-grid" id="art-gallery">
  {% for piece in sorted_art %}
    {% capture piece_tags %}{% if piece.tags %}{% for tag in piece.tags %}{{ tag | slugify }} {% endfor %}{% endif %}{% endcapture %}

    <div class="masonry-item art-filter-item" data-tags="{{ piece_tags | strip }}">
      <a href="{{ piece.url | relative_url }}" class="art-card-link">
        <div class="img-wrapper">
          <img src="{{ piece.image | relative_url }}" alt="{{ piece.title }}">
          <div class="overlay">
            <div class="overlay-text">
              <h3>{{ piece.title }}</h3>

              {% if piece.year %}
                <p class="art-meta">{{ piece.year }}</p>
              {% endif %}

              {% if piece.medium %}
                <p class="art-meta">{{ piece.medium }}</p>
              {% endif %}

              {% if piece.description %}
                <p class="art-description">{{ piece.description }}</p>
              {% endif %}
            </div>
          </div>
        </div>
      </a>
    </div>
  {% endfor %}
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const items = Array.from(document.querySelectorAll(".art-filter-item"));
  const filterButtons = Array.from(document.querySelectorAll(".art-tag-filter"));

  if (!items.length || !filterButtons.length) {
    return;
  }

  const normalizeTag = (value) =>
    (value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const readTagFromUrl = () => normalizeTag(new URLSearchParams(window.location.search).get("tag"));

  const updateUrl = (tag) => {
    const url = new URL(window.location.href);

    if (tag) {
      url.searchParams.set("tag", tag);
    } else {
      url.searchParams.delete("tag");
    }

    history.replaceState({}, "", url);
  };

  const applyFilter = (tag, syncUrl) => {
    items.forEach((item) => {
      const tags = (item.dataset.tags || "").split(/\s+/).filter(Boolean);
      item.hidden = tag !== "" && !tags.includes(tag);
    });

    filterButtons.forEach((button) => {
      const buttonTag = button.dataset.artTag || "";
      const isActive = buttonTag === tag;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });

    if (syncUrl) {
      updateUrl(tag);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedTag = button.dataset.artTag || "";
      applyFilter(selectedTag, true);
    });
  });

  window.addEventListener("popstate", () => {
    applyFilter(readTagFromUrl(), false);
  });

  applyFilter(readTagFromUrl(), false);
});
</script>
