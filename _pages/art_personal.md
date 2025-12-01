---
layout: page
title: "Personal Art & Sketchbook"
permalink: /art/personal/
---

Below is a selection of more informal, experimental, or sketchbook work.

<!-- FILTER BUTTONS -->
<div id="filter-buttons">
  <button class="active" data-filter="all">All</button>
  {% assign tags = site.data.art.personal | map: "tags" | uniq %}
  {% for t in tags %}
    <button data-filter="{{ t }}">{{ t }}</button>
  {% endfor %}
</div>

<!-- MASONRY GRID -->
<div class="masonry-grid">
  {% for work in site.data.art.personal %}
  <div class="masonry-item" data-tags="{{ work.tags | join: ' ' }}">
    <div class="img-wrapper">
      <img 
        src="{{ work.image }}" 
        alt="{{ work.alt | default: work.title }}" 
        loading="lazy"
        onclick="openLightbox('{{ work.image }}')"
      >

      <!-- HOVER OVERLAY -->
      <div class="overlay">
        <h3>{{ work.title }}</h3>
        <p>{{ work.medium }} · {{ work.year }}</p>
      </div>
    </div>
  </div>
  {% endfor %}
</div>

<!-- LIGHTBOX -->
<div id="lightbox" onclick="closeLightbox()">
  <img id="lightbox-img">
</div>
