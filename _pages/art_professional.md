---
layout: page
title: "Professional Art & Illustration"
permalink: /art/professional/
---

Work produced for scientific outreach, paleoart, commissioned illustration, and academic projects.

<div id="filter-buttons">
  <button data-filter="all" class="active">All</button>
  <button data-filter="paleo">Paleoart</button>
  <button data-filter="ink">Ink</button>
  <button data-filter="digital">Digital</button>
  <button data-filter="commission">Commission</button>
</div>

<div class="masonry-grid">
{% for work in site.data.art.professional %}
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

<div id="lightbox">
  <img id="lightbox-img">
</div>

<script src="/assets/js/art-gallery.js"></script>
