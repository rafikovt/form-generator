# Генератор Форм на Vue 3 + TypeScript

Универсальное приложение для создания динамических форм с использованием Vue.js 3, TypeScript, Vuex, Vue Router и Sass/SCSS.

## 🚀 Возможности

- ✅ **Переиспользуемый компонент** - единый компонент `FormGenerator` для создания любых форм
- ✅ **Поддержка различных типов полей**: input, select, checkbox, textarea
- ✅ **Гибкая кастомизация** через слоты Vue
- ✅ **Полная типизация** с TypeScript
- ✅ **Двусторонняя привязка данных** через v-model
- ✅ **Обработка событий** submit и cancel
- ✅ **Современный дизайн** с использованием Sass/SCSS
- ✅ **Демонстрационные страницы** с примерами использования

## 📋 Технологический стек

- **Vue.js 3** - прогрессивный JavaScript-фреймворк
- **TypeScript** - типизированный JavaScript
- **Vite** - быстрый сборщик проектов
- **Vuex** - управление состоянием
- **Vue Router** - маршрутизация
- **Sass/SCSS** - препроцессор CSS

## 🛠️ Установка и запуск

### Установка зависимостей

\`\`\`bash
npm install
\`\`\`

### Запуск в режиме разработки

\`\`\`bash
npm run dev
\`\`\`

### Сборка для продакшена

\`\`\`bash
npm run build
\`\`\`

### Предварительный просмотр сборки

\`\`\`bash
npm run preview
\`\`\`

## 📖 Использование

### Базовый пример

\`\`\`vue
<template>
  <FormGenerator
    :config="formConfig"
    v-model="formData"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/FormGenerator.vue';
import type { FormConfig, FormValues } from '@/types/form';

const formConfig: FormConfig = {
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      placeholder: 'your@email.com',
      required: true
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'textarea',
      placeholder: 'Ваше сообщение',
      rows: 5
    }
  ],
  submitButtonText: 'Отправить',
  cancelButtonText: 'Очистить'
};

const formData = ref<FormValues>({
  email: '',
  message: ''
});

const handleSubmit = (data: FormValues) => {
  console.log('Данные формы:', data);
};

const handleCancel = () => {
  formData.value = { email: '', message: '' };
};
</script>
\`\`\`

### Конфигурация полей

#### Input

\`\`\`typescript
{
  name: 'username',
  label: 'Имя пользователя',
  type: 'input',
  inputType: 'text', // 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder: 'Введите имя',
  required: true,
  minLength: 3,
  maxLength: 20
}
\`\`\`

#### Select

\`\`\`typescript
{
  name: 'country',
  label: 'Страна',
  type: 'select',
  required: true,
  options: [
    { label: 'Россия', value: 'ru' },
    { label: 'Украина', value: 'ua' }
  ]
}
\`\`\`

#### Checkbox

\`\`\`typescript
{
  name: 'subscribe',
  label: 'Подписаться на новости',
  type: 'checkbox'
}
\`\`\`

#### Textarea

\`\`\`typescript
{
  name: 'message',
  label: 'Сообщение',
  type: 'textarea',
  placeholder: 'Ваш текст',
  rows: 5,
  minLength: 10,
  maxLength: 500
}
\`\`\`

## 🎨 Кастомизация через слоты

### Кастомизация всего поля

\`\`\`vue
<FormGenerator :config="formConfig" v-model="formData">
  <template #field-username="{ field, value, update }">
    <div class="custom-field">
      <label>{{ field.label }}</label>
      <input 
        :value="value" 
        @input="update(field.name, $event.target.value)"
      />
    </div>
  </template>
</FormGenerator>
\`\`\`

### Кастомизация только инпута

\`\`\`vue
<FormGenerator :config="formConfig" v-model="formData">
  <template #input-password="{ field, value, update }">
    <input 
      type="password"
      :value="value"
      @input="update(field.name, $event.target.value)"
    />
    <div class="password-strength">Сила пароля: {{ strength }}</div>
  </template>
</FormGenerator>
\`\`\`

### Кастомизация кнопок

\`\`\`vue
<FormGenerator :config="formConfig" v-model="formData">
  <template #actions="{ submit, cancel }">
    <button @click="saveDraft">Сохранить черновик</button>
    <button @click="cancel">Отмена</button>
    <button @click="submit">Отправить</button>
  </template>
</FormGenerator>
\`\`\`

## 📱 Демонстрационные страницы

Приложение включает три демонстрационные страницы:

1. **Форма обратной связи** (`/contact`) - простая контактная форма
2. **Форма регистрации** (`/registration`) - форма с кастомизацией через слоты
3. **Форма опроса** (`/survey`) - опрос с рейтингом и сохранением черновика

## 📂 Структура проекта

\`\`\`
generator-form/
├── src/
│   ├── components/
│   │   └── FormGenerator.vue      # Основной компонент генератора
│   ├── views/
│   │   ├── Home.vue               # Главная страница
│   │   ├── ContactForm.vue        # Форма обратной связи
│   │   ├── RegistrationForm.vue   # Форма регистрации
│   │   └── SurveyForm.vue         # Форма опроса
│   ├── types/
│   │   └── form.ts                # TypeScript типы
│   ├── store/
│   │   └── index.ts               # Vuex store
│   ├── router/
│   │   └── index.ts               # Vue Router
│   ├── styles/
│   │   ├── variables.scss         # SCSS переменные
│   │   └── global.scss            # Глобальные стили
│   ├── App.vue                    # Корневой компонент
│   └── main.ts                    # Точка входа
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
\`\`\`

## 🎯 API компонента FormGenerator

### Props

| Prop | Тип | Описание |
|------|-----|----------|
| `config` | `FormConfig` | Конфигурация формы с описанием полей |
| `modelValue` | `FormValues` | Объект с значениями полей (v-model) |

### Events

| Event | Параметры | Описание |
|-------|-----------|----------|
| `update:modelValue` | `FormValues` | Обновление значений формы |
| `submit` | `FormValues` | Отправка формы |
| `cancel` | - | Отмена / очистка формы |

### Slots

| Slot | Props | Описание |
|------|-------|----------|
| `field-{fieldName}` | `{ field, value, update }` | Кастомизация всего поля |
| `input-{fieldName}` | `{ field, value, update }` | Кастомизация только инпута |
| `actions` | `{ submit, cancel }` | Кастомизация кнопок действий |

## 🔧 TypeScript типы

\`\`\`typescript
type FieldType = 'input' | 'select' | 'checkbox' | 'textarea';

interface FormConfig {
  fields: FieldConfig[];
  submitButtonText?: string;
  cancelButtonText?: string;
}

type FormValues = Record<string, any>;
\`\`\`

## 📝 Лицензия

ISC

## 👨‍💻 Автор

Создано для демонстрации возможностей Vue 3 + TypeScript

