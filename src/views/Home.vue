<template>
  <div class="container">
    <div class="home">
      <h1>Добро пожаловать в Генератор Форм</h1>
      <p class="subtitle">
        Универсальный компонент для создания динамических форм на Vue 3 + TypeScript
      </p>

      <div class="examples">
        <h2>Примеры форм</h2>
        <div class="example-links">
          <router-link to="/contact" class="example-link">
            <span class="link-icon">✉️</span>
            <span class="link-text">Форма обратной связи</span>
          </router-link>
          <router-link to="/registration" class="example-link">
            <span class="link-icon">👤</span>
            <span class="link-text">Форма регистрации</span>
          </router-link>
          <router-link to="/survey" class="example-link">
            <span class="link-icon">📊</span>
            <span class="link-text">Форма опроса</span>
          </router-link>
        </div>
      </div>

      <div class="code-example">
        <h2>Пример использования</h2>
        <pre><code>&lt;template&gt;
  &lt;FormGenerator
    :config="formConfig"
    v-model="formData"
    @submit="handleSubmit"
    @cancel="handleCancel"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import FormGenerator from '@/components/FormGenerator.vue';
import { ref } from 'vue';

const formConfig = {
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      required: true
    }
  ]
};

const formData = ref({ email: '' });

const handleSubmit = (data) => {
  console.log('Submitted:', data);
};
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  padding: $spacing-xl;
}

h1 {
  font-size: 3rem;
  color: $primary-color;
  margin-bottom: $spacing-md;
}

.subtitle {
  font-size: $font-size-lg;
  color: $text-secondary;
  margin-bottom: $spacing-xl;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-lg;
  margin: $spacing-xl 0;
}

.feature-card {
  background: $bg-white;
  padding: $spacing-xl;
  border-radius: $border-radius;
  box-shadow: $shadow-md;
  transition: transform $transition-speed, box-shadow $transition-speed;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: $spacing-md;
}

.feature-card h3 {
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.feature-card p {
  color: $text-secondary;
  margin-bottom: 0;
}

.examples {
  margin: $spacing-xl * 2 0;
}

.examples h2 {
  margin-bottom: $spacing-xl;
  color: $text-primary;
}

.example-links {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  max-width: 500px;
  margin: 0 auto;
}

.example-link {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: $bg-white;
  border-radius: $border-radius;
  box-shadow: $shadow-sm;
  transition: all $transition-speed;
  text-decoration: none;
  color: $text-primary;

  &:hover {
    transform: translateX(10px);
    box-shadow: $shadow-md;
    color: $primary-color;
  }
}

.link-icon {
  font-size: 2rem;
}

.link-text {
  font-size: $font-size-lg;
  font-weight: 500;
}

.code-example {
  margin-top: $spacing-xl * 2;
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.code-example h2 {
  text-align: center;
  margin-bottom: $spacing-xl;
}

pre {
  background: $bg-dark;
  color: #f8f8f2;
  padding: $spacing-lg;
  border-radius: $border-radius;
  overflow-x: auto;
  box-shadow: $shadow-md;

  code {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
</style>

