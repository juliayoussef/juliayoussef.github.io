---
layout: page
title: Personal Art & Sketchbook
permalink: /art/personal/
---

<div class="gallery">
{% for img in site.static_files %}
  {% if img.path contains 'assets/img/art/personal' %}
    <img src="{{ img.path }}" />
  {% endif %}
{% endfor %}
</div>
