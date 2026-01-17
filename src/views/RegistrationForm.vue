<template>
  <div class="container">
    <div class="page-header">
      <h1>Форма регистрации</h1>
      <p>Пример формы с кастомизацией через слоты</p>
    </div>

    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <!-- Кастомизация поля пароля с индикатором силы -->
      <template #input-password="{ field, value, update }">
        <input
          :id="field.name"
          type="password"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :value="value"
          @input="update(field.name, ($event.target as HTMLInputElement).value)"
          class="form-input"
        />
        <div class="password-strength" v-if="value">
          <div class="strength-bar" :class="passwordStrength"></div>
          <span class="strength-text">Сила пароля: {{ passwordStrengthText }}</span>
        </div>
      </template>

      <!-- Кастомизация чекбокса согласия -->
      <template #field-terms="{ field, value, update }">
        <div class="terms-field">
          <label class="terms-label">
            <input
              type="checkbox"
              :checked="value"
              @change="update(field.name, ($event.target as HTMLInputElement).checked)"
              class="form-checkbox"
            />
            <span>
              Я согласен с 
              <a href="#" @click.prevent="showTerms = true">условиями использования</a> 
              и 
              <a href="#" @click.prevent="showPrivacy = true">политикой конфиденциальности</a>
              <span class="required">*</span>
            </span>
          </label>
        </div>
      </template>
    </FormGenerator>

    <div v-if="submitted" class="success-message">
      <h3>🎉 Регистрация успешна!</h3>
      <p>Добро пожаловать, {{ submittedData.username }}!</p>
      <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>

    <div v-if="showTerms" class="modal" @click="showTerms = false">
      <div class="modal-content" @click.stop>
        <h2>Условия использования</h2>
        <p>Здесь будут условия использования...</p>
        <button @click="showTerms = false" class="btn btn-primary">Закрыть</button>
      </div>
    </div>

    <div v-if="showPrivacy" class="modal" @click="showPrivacy = false">
      <div class="modal-content" @click.stop>
        <h2>Политика конфиденциальности</h2>
        <p>Здесь будет политика конфиденциальности...</p>
        <button @click="showPrivacy = false" class="btn btn-primary">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import FormGenerator from '@/components/FormGenerator.vue';
import type { FormConfig, FormValues } from '@/types/form';

const formConfig: FormConfig = {
  fields: [
    {
      name: 'username',
      label: 'Имя пользователя',
      type: 'input',
      inputType: 'text',
      placeholder: 'Выберите имя пользователя',
      required: true,
      minLength: 3,
      maxLength: 20
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      placeholder: 'your@email.com',
      required: true
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'input',
      inputType: 'password',
      placeholder: 'Минимум 6 символов',
      required: true,
      minLength: 6
    },
    {
      name: 'confirmPassword',
      label: 'Подтвердите пароль',
      type: 'input',
      inputType: 'password',
      placeholder: 'Повторите пароль',
      required: true
    },
    {
      name: 'country',
      label: 'Страна',
      type: 'select',
      required: true,
      options: [
        { label: 'Россия', value: 'ru' },
        { label: 'Украина', value: 'ua' },
        { label: 'Беларусь', value: 'by' },
        { label: 'Казахстан', value: 'kz' },
        { label: 'Другая', value: 'other' }
      ]
    },
    {
      name: 'bio',
      label: 'О себе',
      type: 'textarea',
      placeholder: 'Расскажите немного о себе',
      rows: 3
    },
    {
      name: 'newsletter',
      label: 'Получать новости и обновления',
      type: 'checkbox'
    },
    {
      name: 'terms',
      label: 'Согласие с условиями',
      type: 'checkbox',
      required: true
    }
  ],
  submitButtonText: 'Зарегистрироваться',
  cancelButtonText: 'Сбросить'
};

const formData = ref<FormValues>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  bio: '',
  newsletter: false,
  terms: false
});

const submitted = ref(false);
const submittedData = ref<FormValues>({});
const showTerms = ref(false);
const showPrivacy = ref(false);

const passwordStrength = computed(() => {
  const password = formData.value.password as string;
  if (!password) return '';
  
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
});

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 'weak': return 'Слабый';
    case 'medium': return 'Средний';
    case 'strong': return 'Сильный';
    default: return '';
  }
});

const handleSubmit = (data: FormValues) => {
  if (data.password !== data.confirmPassword) {
    alert('Пароли не совпадают!');
    return;
  }

  console.log('Регистрация:', data);
  submittedData.value = data;
  submitted.value = true;
  
  setTimeout(() => {
    submitted.value = false;
  }, 7000);
};

const handleCancel = () => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    bio: '',
    newsletter: false,
    terms: false
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

.password-strength {
  margin-top: $spacing-sm;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: all $transition-speed;
  margin-bottom: $spacing-xs;

  &.weak {
    width: 33%;
    background-color: $danger-color;
  }

  &.medium {
    width: 66%;
    background-color: $warning-color;
  }

  &.strong {
    width: 100%;
    background-color: $success-color;
  }
}

.strength-text {
  font-size: $font-size-sm;
  color: $text-secondary;
}

.terms-field {
  margin-top: $spacing-md;
  padding: $spacing-md;
  background: $bg-light;
  border-radius: $border-radius-sm;
}

.terms-label {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  cursor: pointer;

  span {
    flex: 1;
  }

  a {
    color: $primary-color;
    text-decoration: underline;

    &:hover {
      color: $primary-hover;
    }
  }

  .required {
    color: $danger-color;
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
    margin-bottom: $spacing-sm;
  }

  p {
    font-size: $font-size-lg;
    color: $text-primary;
  }

  pre {
    background: $bg-white;
    padding: $spacing-md;
    border-radius: $border-radius-sm;
    text-align: left;
    overflow-x: auto;
    max-width: 600px;
    margin: $spacing-md auto 0;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: $bg-white;
  padding: $spacing-xl;
  border-radius: $border-radius;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;

  h2 {
    margin-bottom: $spacing-md;
    color: $primary-color;
  }

  p {
    margin-bottom: $spacing-lg;
    color: $text-secondary;
  }
}

.btn {
  padding: $spacing-sm $spacing-lg;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-speed;
}

.btn-primary {
  background-color: $primary-color;
  color: white;

  &:hover {
    background-color: $primary-hover;
  }
}
</style>

