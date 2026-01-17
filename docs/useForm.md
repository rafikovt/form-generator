# Использование композабла useForm

Композабл `useForm` предоставляет расширенную функциональность для работы с формами.

## Базовое использование

\`\`\`vue
<template>
  <div>
    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
    
    <div v-if="hasError" class="error">
      {{ errorMessage }}
    </div>
    
    <div v-if="isDirty" class="info">
      Форма содержит несохраненные изменения
    </div>
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue';
import { useForm } from '@/composables/useForm';

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

const {
  formData,
  isSubmitting,
  hasError,
  errorMessage,
  isDirty,
  handleSubmit,
  handleCancel
} = useForm(formConfig, {
  formId: 'my-form',
  initialValues: { email: '' },
  onSubmit: async (data) => {
    console.log('Отправка:', data);
    // await api.submitForm(data);
  }
});
</script>
\`\`\`

## Автосохранение

\`\`\`typescript
const form = useForm(formConfig, {
  formId: 'auto-save-form',
  autoSave: true,
  autoSaveDelay: 2000, // Сохранение каждые 2 секунды
  initialValues: { email: '' }
});
\`\`\`

## Работа с черновиками

\`\`\`vue
<template>
  <div>
    <button @click="saveDraft">💾 Сохранить черновик</button>
    <button @click="loadDraft">📂 Загрузить черновик</button>
    <button @click="clearDraft">🗑️ Очистить черновик</button>
    
    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm';

const {
  formData,
  handleSubmit,
  handleCancel,
  saveDraft,
  loadDraft,
  clearDraft
} = useForm(formConfig, {
  formId: 'draft-form',
  initialValues: {}
});
</script>
\`\`\`

## Отслеживание изменений

\`\`\`vue
<template>
  <div>
    <div v-if="isDirty">
      Изменены поля: {{ changedFields.join(', ') }}
    </div>
    
    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="reset"
    />
    
    <button @click="reset">Сбросить к исходным значениям</button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm';

const {
  formData,
  isDirty,
  changedFields,
  handleSubmit,
  reset
} = useForm(formConfig, {
  initialValues: { name: 'Иван', email: 'ivan@example.com' }
});
</script>
\`\`\`

## Программное управление значениями

\`\`\`vue
<script setup lang="ts">
import { useForm } from '@/composables/useForm';

const {
  formData,
  setFieldValue,
  setValues,
  getFieldValue
} = useForm(formConfig, {
  initialValues: {}
});

// Установка одного поля
const updateEmail = () => {
  setFieldValue('email', 'new@example.com');
};

// Установка нескольких полей
const fillForm = () => {
  setValues({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 999 123 45 67'
  });
};

// Получение значения поля
const currentEmail = getFieldValue('email');
</script>
\`\`\`

## Обработка ошибок

\`\`\`vue
<template>
  <div>
    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
    />
    
    <div v-if="hasError" class="error-message">
      ❌ {{ errorMessage }}
    </div>
    
    <div v-if="isSubmitting" class="loading">
      Отправка формы...
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm';

const {
  formData,
  isSubmitting,
  hasError,
  errorMessage,
  handleSubmit
} = useForm(formConfig, {
  onSubmit: async (data) => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Ошибка отправки формы');
    }
  },
  onError: (error) => {
    console.error('Произошла ошибка:', error);
    // Можно отправить в систему мониторинга
  }
});
</script>
\`\`\`

## Предупреждение о несохраненных изменениях

\`\`\`vue
<script setup lang="ts">
import { useForm } from '@/composables/useForm';
import { onBeforeRouteLeave } from 'vue-router';

const { formData, isDirty } = useForm(formConfig, {
  initialValues: {}
});

// Предупреждение при попытке покинуть страницу
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const answer = window.confirm(
      'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?'
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

// Предупреждение при закрытии вкладки
window.addEventListener('beforeunload', (e) => {
  if (isDirty.value) {
    e.preventDefault();
    e.returnValue = '';
  }
});
</script>
\`\`\`

## API композабла

### Возвращаемые значения

| Свойство | Тип | Описание |
|----------|-----|----------|
| `formData` | `Ref<FormValues>` | Реактивный объект с данными формы |
| `originalData` | `Ref<FormValues>` | Исходные данные формы |
| `isSubmitting` | `Ref<boolean>` | Флаг процесса отправки |
| `hasError` | `Ref<boolean>` | Флаг наличия ошибки |
| `errorMessage` | `Ref<string>` | Текст ошибки |
| `isTouched` | `Ref<boolean>` | Флаг взаимодействия с формой |
| `isDirty` | `ComputedRef<boolean>` | Флаг наличия изменений |
| `changedFields` | `ComputedRef<string[]>` | Список измененных полей |
| `handleSubmit` | `Function` | Обработчик отправки формы |
| `handleCancel` | `Function` | Обработчик отмены |
| `reset` | `Function` | Сброс к исходным значениям |
| `validate` | `Function` | Валидация формы |
| `setValues` | `Function` | Установка нескольких значений |
| `setFieldValue` | `Function` | Установка значения одного поля |
| `getFieldValue` | `Function` | Получение значения поля |
| `saveDraft` | `Function` | Сохранение черновика |
| `loadDraft` | `Function` | Загрузка черновика |
| `clearDraft` | `Function` | Очистка черновика |

### Опции

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `formId` | `string` | `'default-form'` | Уникальный ID формы |
| `initialValues` | `FormValues` | `{}` | Начальные значения |
| `autoSave` | `boolean` | `false` | Автоматическое сохранение |
| `autoSaveDelay` | `number` | `1000` | Задержка автосохранения (мс) |
| `onSubmit` | `Function` | - | Callback при отправке |
| `onCancel` | `Function` | - | Callback при отмене |
| `onError` | `Function` | - | Callback при ошибке |

