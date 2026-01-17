<template>
  <div class="container">
    <div class="page-header">
      <h1>Форма обратной связи</h1>
      <p>Пример простой формы с различными типами полей</p>
    </div>

    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <div v-if="submitted" class="success-message">
      <h3>✅ Форма успешно отправлена!</h3>
      <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from '@/components/FormGenerator.vue';
import type { FormConfig, FormValues } from '@/types/form';

const formConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'Ваше имя',
      type: 'input',
      inputType: 'text',
      placeholder: 'Введите ваше имя',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      placeholder: 'example@mail.com',
      required: true
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'input',
      inputType: 'tel',
      placeholder: '+7 (999) 123-45-67'
    },
    {
      name: 'subject',
      label: 'Тема обращения',
      type: 'select',
      required: true,
      options: [
        { label: 'Общий вопрос', value: 'general' },
        { label: 'Техническая поддержка', value: 'support' },
        { label: 'Предложение', value: 'suggestion' },
        { label: 'Жалоба', value: 'complaint' }
      ]
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'textarea',
      placeholder: 'Введите ваше сообщение',
      rows: 5,
      required: true
    },
    {
      name: 'subscribe',
      label: 'Подписаться на новости',
      type: 'checkbox'
    }
  ],
  submitButtonText: 'Отправить',
  cancelButtonText: 'Очистить'
};

const formData = ref<FormValues>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  subscribe: false
});

const submitted = ref(false);
const submittedData = ref<FormValues>({});

const handleSubmit = (data: FormValues) => {
  console.log('Отправка формы:', data);
  submittedData.value = data;
  submitted.value = true;

  setTimeout(() => {
    submitted.value = false;
  }, 5000);
};

const handleCancel = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    subscribe: false
  };
  submitted.value = false;
};
</script>

<style scoped lang="scss">
.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  h1 {
    color: $primary-color;
    font-size: 2.5rem;
  }

  p {
    color: $text-secondary;
    font-size: $font-size-lg;
  }
}

.success-message {
  margin-top: $spacing-xl;
  padding: $spacing-lg;
  background: lighten($success-color, 45%);
  border: 2px solid $success-color;
  border-radius: $border-radius;
  text-align: center;

  h3 {
    color: darken($success-color, 10%);
    margin-bottom: $spacing-md;
  }

  pre {
    background: $bg-white;
    padding: $spacing-md;
    border-radius: $border-radius-sm;
    text-align: left;
    overflow-x: auto;
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>

