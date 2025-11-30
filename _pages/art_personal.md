---
layout: page
title: "Personal Art & Sketchbook"
permalink: /art/personal/
---

Below is a selection of more informal, experimental, or sketchbook work.

<!-- FILTER BUTTONS -->
<div id="filter-buttons">
  <button data-filter="all" class="active">All</button>
  <button data-filter="digital">Digital</button>
  <button data-filter="charcoal">Charcoal</button>
  <button data-filter="acrylic">Acrylic</button>
  <button data-filter="sketchbook">Sketchbook</button>
</div>

<!-- MASONRY GRID -->
<div class="masonry-grid">
  {% for work in site.data.art.personal %}
  <div class="masonry-item" data-tags="{{ work.tags | join: ' ' }}">
    <div class="img-wrapper">
      <img src="{{ work.image }}" alt="{{ work.alt }}" data-full="{{ work.image }}">
    </div>
    <h3>{{ work.title }}</h3>
    <p>{{ work.medium }} · {{ work.year }}</p>
    <p>{{ work.description }}</p>
  </div>
  {% endfor %}
</div>

<!-- LIGHTBOX -->
<div id="lightbox">
  <img id="lightbox-img">
</div>

<script src="/assets/js/art-gallery.js"></script>
