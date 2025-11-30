---
layout: page
title: Professional Illustration
permalink: /art/professional/
---

Below is a selection of my work, focusing on paleontology and biological anatomy.

<div class="gallery">
{% for img in site.static_files %}
  {% if img.path contains 'assets/img/art/professional' %}
    <img src="{{ img.path }}" />
  {% endif %}
{% endfor %}
</div>
