<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navbar bd-navbar sticky-top bg-body-tertiary">
    <nav class="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-permit"
          aria-controls="navbar-permit" aria-expanded="false" aria-label="Open/Close Menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Permit Project</a>
        <div class="collapse navbar-collapse" id="navbar-permit">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Permit</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div class="container-xxl bd-gutter bd-layout">
    <RouterView />
  </div>
</template>