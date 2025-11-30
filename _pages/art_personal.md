---
layout: page
title: "Personal Art & Sketchbook"
permalink: /art/personal/
---

Below is a selection of more informal, experimental, or sketchbook work.

<div class="grid">
{% for work in site.data.art.personal %}
  <div class="grid-item">
    <img src="{{ work.image }}" alt="{{ work.alt }}">
    <h3>{{ work.title }}</h3>
    <p>{{ work.medium }} · {{ work.year }}</p>
    <p>{{ work.description }}</p>
  </div>
{% endfor %}
</div>