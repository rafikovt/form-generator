<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">📋 Генератор Форм</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/contact" class="nav-link">Контакты</router-link>
          <router-link to="/registration" class="nav-link">Регистрация</router-link>
          <router-link to="/survey" class="nav-link">Опрос</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import '@/styles/global.scss';

.navbar {
  background-color: $bg-white;
  box-shadow: $shadow-sm;
  padding: $spacing-md 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: $font-size-xl;
  font-weight: 600;
  color: $primary-color;
  text-decoration: none;

  &:hover {
    color: $primary-hover;
  }
}

.nav-links {
  display: flex;
  gap: $spacing-lg;
}

.nav-link {
  color: $text-primary;
  text-decoration: none;
  font-weight: 500;
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-sm;
  transition: all $transition-speed;

  &:hover {
    background-color: $bg-light;
    color: $primary-color;
  }

  &.router-link-active {
    color: $primary-color;
    background-color: rgba($primary-color, 0.1);
  }
}

.main-content {
  padding: $spacing-xl 0;
  min-height: calc(100vh - 80px);
}
</style>

