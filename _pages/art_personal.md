---
layout: page
title: "Personal Art & Sketchbook"
permalink: /art/personal/
---

Below is a selection of more informal, experimental, or sketchbook work.

<div class="masonry-grid">
  {% for work in site.data.art.personal %}
  <div class="masonry-item">
    <div class="img-wrapper">
      <img src="{{ work.image }}" alt="{{ work.alt }}">
    </div>
    <h3>{{ work.title }}</h3>
    <p>{{ work.medium }} · {{ work.year }}</p>
    <p>{{ work.description }}</p>
  </div>
  {% endfor %}
</div>

<script src="/assets/js/masonry-init.js"></script>
