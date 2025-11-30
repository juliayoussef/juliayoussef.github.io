---
layout: page
title: Personal Art & Sketchbook
permalink: /art/personal/
---
{% for work in site.data.personal_art %}
  <figure class="gallery-item">
    <img src="/assets/img/art/personal/{{ work.file }}">
    <figcaption>
      <strong>{{ work.title }}</strong><br>
      {{ work.description }}
    </figcaption>
  </figure>
{% endfor %}