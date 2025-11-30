---
layout: page
title: Professional Illustration
permalink: /art/professional/
---

Below is a selection of my work, focusing on paleontology and biological anatomy.

{% for work in site.data.professional_art %}
  <figure class="gallery-item">
    <img src="/assets/img/art/professional/{{ work.file }}">
    <figcaption>
      <strong>{{ work.title }}</strong><br>
      {{ work.description }}
    </figcaption>
  </figure>
{% endfor %}