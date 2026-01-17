<template>
  <div class="container">
    <div class="page-header">
      <h1>Опрос удовлетворенности</h1>
      <p>Помогите нам стать лучше - заполните короткий опрос</p>
    </div>

    <FormGenerator
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <!-- Кастомизация поля рейтинга через слот -->
      <template #field-rating="{ field, value, update }">
        <div class="rating-field">
          <label class="form-label">
            {{ field.label }}
            <span v-if="field.required" class="required">*</span>
          </label>
          <div class="star-rating">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              class="star"
              :class="{ active: star <= (value || 0) }"
              @click="update(field.name, star)"
            >
              ★
            </button>
          </div>
          <div class="rating-text" v-if="value">
            Ваша оценка: {{ value }} из 5
          </div>
        </div>
      </template>

      <!-- Кастомизация кнопок -->
      <template #actions="{ submit, cancel }">
        <div class="custom-actions">
          <button 
            type="button" 
            @click="saveDraft" 
            class="btn btn-outline"
          >
            💾 Сохранить черновик
          </button>
          <button 
            type="button" 
            @click="cancel" 
            class="btn btn-secondary"
          >
            Отмена
          </button>
          <button 
            type="submit" 
            @click="submit" 
            class="btn btn-primary"
          >
            Отправить опрос
          </button>
        </div>
      </template>
    </FormGenerator>

    <div v-if="draftSaved" class="info-message">
      💾 Черновик сохранен
    </div>

    <div v-if="submitted" class="success-message">
      <h3>🎉 Спасибо за участие в опросе!</h3>
      <p>Ваши ответы помогут нам улучшить наш сервис</p>
      <div class="survey-summary">
        <h4>Сводка ответов:</h4>
        <ul>
          <li><strong>Имя:</strong> {{ submittedData.name }}</li>
          <li><strong>Email:</strong> {{ submittedData.email }}</li>
          <li><strong>Возраст:</strong> {{ submittedData.age }}</li>
          <li><strong>Как узнали:</strong> {{ getHowHeardLabel(submittedData.howHeard) }}</li>
          <li><strong>Оценка:</strong> {{ submittedData.rating }} ⭐</li>
          <li><strong>Рекомендация:</strong> {{ submittedData.recommend ? 'Да' : 'Нет' }}</li>
        </ul>
      </div>
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
      placeholder: 'your@email.com',
      required: true
    },
    {
      name: 'age',
      label: 'Возрастная группа',
      type: 'select',
      required: true,
      options: [
        { label: 'До 18', value: 'under18' },
        { label: '18-25', value: '18-25' },
        { label: '26-35', value: '26-35' },
        { label: '36-45', value: '36-45' },
        { label: '46-55', value: '46-55' },
        { label: '56+', value: '56plus' }
      ]
    },
    {
      name: 'howHeard',
      label: 'Как вы о нас узнали?',
      type: 'select',
      required: true,
      options: [
        { label: 'Поисковая система', value: 'search' },
        { label: 'Социальные сети', value: 'social' },
        { label: 'Рекомендация друзей', value: 'friend' },
        { label: 'Реклама', value: 'ad' },
        { label: 'Другое', value: 'other' }
      ]
    },
    {
      name: 'rating',
      label: 'Оцените наш сервис',
      type: 'input',
      inputType: 'number',
      required: true
    },
    {
      name: 'feedback',
      label: 'Ваши комментарии и предложения',
      type: 'textarea',
      placeholder: 'Поделитесь своим мнением...',
      rows: 5
    },
    {
      name: 'recommend',
      label: 'Порекомендуете ли вы нас друзьям?',
      type: 'checkbox'
    }
  ],
  submitButtonText: 'Отправить',
  cancelButtonText: 'Очистить'
};

const formData = ref<FormValues>({
  name: '',
  email: '',
  age: '',
  howHeard: '',
  rating: 0,
  feedback: '',
  recommend: false
});

const submitted = ref(false);
const submittedData = ref<FormValues>({});
const draftSaved = ref(false);

const getHowHeardLabel = (value: string) => {
  const option = formConfig.fields
    .find(f => f.name === 'howHeard' && f.type === 'select')
    ?.options?.find(o => o.value === value);
  return option?.label || value;
};

const handleSubmit = (data: FormValues) => {
  console.log('Отправка опроса:', data);
  submittedData.value = data;
  submitted.value = true;

  localStorage.removeItem('surveyDraft');
  
  setTimeout(() => {
    submitted.value = false;
  }, 10000);
};

const handleCancel = () => {
  if (confirm('Вы уверены, что хотите очистить форму?')) {
    formData.value = {
      name: '',
      email: '',
      age: '',
      howHeard: '',
      rating: 0,
      feedback: '',
      recommend: false
    };
    submitted.value = false;
  }
};

const saveDraft = () => {
  localStorage.setItem('surveyDraft', JSON.stringify(formData.value));
  draftSaved.value = true;
  
  setTimeout(() => {
    draftSaved.value = false;
  }, 3000);
};

const loadDraft = () => {
  const draft = localStorage.getItem('surveyDraft');
  if (draft) {
    try {
      const parsedDraft = JSON.parse(draft);
      if (confirm('Найден сохраненный черновик. Загрузить его?')) {
        formData.value = parsedDraft;
      }
    } catch (e) {
      console.error('Ошибка загрузки черновика:', e);
    }
  }
};

loadDraft();
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

.rating-field {
  margin-bottom: $spacing-lg;
}

.form-label {
  display: block;
  margin-bottom: $spacing-sm;
  font-weight: 500;
  color: $text-primary;

  .required {
    color: $danger-color;
    margin-left: 2px;
  }
}

.star-rating {
  display: flex;
  gap: $spacing-xs;
  margin-bottom: $spacing-sm;
}

.star {
  background: none;
  border: none;
  font-size: 2rem;
  color: $border-color;
  cursor: pointer;
  transition: all $transition-speed;
  padding: 0;

  &:hover,
  &.active {
    color: $warning-color;
    transform: scale(1.1);
  }
}

.rating-text {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin-top: $spacing-sm;
}

.custom-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: flex-end;
  padding-top: $spacing-md;
  border-top: 1px solid $border-color;
  flex-wrap: wrap;
}

.btn {
  padding: $spacing-sm $spacing-lg;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-speed;

  &:hover {
    transform: translateY(-1px);
    box-shadow: $shadow-sm;
  }
}

.btn-primary {
  background-color: $primary-color;
  color: white;

  &:hover {
    background-color: $primary-hover;
  }
}

.btn-secondary {
  background-color: $secondary-color;
  color: white;

  &:hover {
    background-color: $secondary-hover;
  }
}

.btn-outline {
  background-color: transparent;
  color: $primary-color;
  border: 2px solid $primary-color;

  &:hover {
    background-color: $primary-color;
    color: white;
  }
}

.info-message {
  margin-top: $spacing-lg;
  padding: $spacing-md;
  background: lighten($info-color, 45%);
  border: 2px solid $info-color;
  border-radius: $border-radius;
  text-align: center;
  color: darken($info-color, 20%);
  font-weight: 500;
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
    margin-bottom: $spacing-lg;
  }
}

.survey-summary {
  background: $bg-white;
  padding: $spacing-lg;
  border-radius: $border-radius-sm;
  text-align: left;
  max-width: 600px;
  margin: 0 auto;

  h4 {
    color: $primary-color;
    margin-bottom: $spacing-md;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: $spacing-sm 0;
      border-bottom: 1px solid $border-color;

      &:last-child {
        border-bottom: none;
      }

      strong {
        color: $text-primary;
      }
    }
  }
}
</style>

