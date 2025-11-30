---
layout: page
title: "Professional Illustration"
permalink: /art/professional/
---

Below is a selection of my scientific & anatomically-focused illustration work.

<div class="grid">
{% for work in site.data.art.professional %}
  <div class="grid-item">
    <img src="{{ work.image }}" alt="{{ work.alt }}">
    <h3>{{ work.title }}</h3>
    <p>{{ work.medium }} · {{ work.year }}</p>
    <p>{{ work.description }}</p>
  </div>
{% endfor %}
</div>