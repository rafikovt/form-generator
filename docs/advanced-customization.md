# Продвинутая кастомизация FormGenerator

Примеры расширенной кастомизации компонента через слоты.

## Кастомное поле с валидацией в реальном времени

\`\`\`vue
<template>
  <FormGenerator :config="formConfig" v-model="formData">
    <template #field-email="{ field, value, update }">
      <div class="custom-email-field">
        <label :for="field.name">
          {{ field.label }}
          <span v-if="field.required" class="required">*</span>
        </label>
        
        <input
          :id="field.name"
          type="email"
          :value="value"
          @input="handleEmailInput($event, field.name, update)"
          :class="{ 'invalid': !isEmailValid && value }"
          class="form-input"
        />
        
        <div v-if="value && !isEmailValid" class="error-hint">
          ⚠️ Некорректный email адрес
        </div>
        
        <div v-if="value && isEmailValid" class="success-hint">
          ✅ Email корректен
        </div>
      </div>
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isValidEmail } from '@/utils/formHelpers';

const isEmailValid = ref(true);

const handleEmailInput = (
  event: Event,
  fieldName: string,
  update: Function
) => {
  const value = (event.target as HTMLInputElement).value;
  isEmailValid.value = isValidEmail(value);
  update(fieldName, value);
};
</script>
\`\`\`

## Поле загрузки файла

\`\`\`vue
<template>
  <FormGenerator :config="formConfig" v-model="formData">
    <template #field-avatar="{ field, value, update }">
      <div class="file-upload-field">
        <label>{{ field.label }}</label>
        
        <div class="file-upload-area" @click="triggerFileInput">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload($event, field.name, update)"
            style="display: none"
          />
          
          <div v-if="!previewUrl" class="upload-placeholder">
            📁 Нажмите для выбора файла
          </div>
          
          <div v-else class="preview-container">
            <img :src="previewUrl" alt="Preview" class="preview-image" />
            <button @click.stop="clearFile(field.name, update)" class="clear-btn">
              ✕
            </button>
          </div>
        </div>
      </div>
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref('');

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (
  event: Event,
  fieldName: string,
  update: Function
) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    update(fieldName, file);
    
    // Создаем preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const clearFile = (fieldName: string, update: Function) => {
  update(fieldName, null);
  previewUrl.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

<style scoped lang="scss">
.file-upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #4a90e2;
    background: #f8f9fa;
  }
}

.upload-placeholder {
  text-align: center;
  color: #6c757d;
  padding: 20px;
}

.preview-container {
  position: relative;
  display: inline-block;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
}

.clear-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
\`\`\`

## Поле с автокомплитом

\`\`\`vue
<template>
  <FormGenerator :config="formConfig" v-model="formData">
    <template #field-city="{ field, value, update }">
      <div class="autocomplete-field">
        <label>{{ field.label }}</label>
        
        <input
          type="text"
          :value="value"
          @input="handleInput($event, field.name, update)"
          @focus="showSuggestions = true"
          @blur="hideSuggestions"
          class="form-input"
          placeholder="Начните вводить название города"
        />
        
        <ul v-if="showSuggestions && filteredCities.length > 0" class="suggestions">
          <li
            v-for="city in filteredCities"
            :key="city"
            @mousedown="selectCity(city, field.name, update)"
            class="suggestion-item"
          >
            {{ city }}
          </li>
        </ul>
      </div>
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const cities = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург',
  'Казань', 'Нижний Новгород', 'Челябинск', 'Самара',
  'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск'
];

const searchQuery = ref('');
const showSuggestions = ref(false);

const filteredCities = computed(() => {
  if (!searchQuery.value) return cities;
  
  return cities.filter(city =>
    city.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleInput = (event: Event, fieldName: string, update: Function) => {
  const value = (event.target as HTMLInputElement).value;
  searchQuery.value = value;
  update(fieldName, value);
};

const selectCity = (city: string, fieldName: string, update: Function) => {
  update(fieldName, city);
  searchQuery.value = city;
  showSuggestions.value = false;
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};
</script>

<style scoped lang="scss">
.autocomplete-field {
  position: relative;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.suggestion-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
}
</style>
\`\`\`

## Мультиселект с чипсами

\`\`\`vue
<template>
  <FormGenerator :config="formConfig" v-model="formData">
    <template #field-tags="{ field, value, update }">
      <div class="multi-select-field">
        <label>{{ field.label }}</label>
        
        <div class="chips-container">
          <div
            v-for="tag in selectedTags"
            :key="tag"
            class="chip"
          >
            {{ tag }}
            <button
              @click="removeTag(tag, field.name, value, update)"
              class="chip-remove"
            >
              ✕
            </button>
          </div>
        </div>
        
        <select
          @change="addTag($event, field.name, value, update)"
          class="form-select"
        >
          <option value="">Выберите тег</option>
          <option
            v-for="tag in availableTags"
            :key="tag"
            :value="tag"
            :disabled="selectedTags.includes(tag)"
          >
            {{ tag }}
          </option>
        </select>
      </div>
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const availableTags = [
  'JavaScript', 'TypeScript', 'Vue.js', 'React',
  'Angular', 'Node.js', 'Python', 'Java'
];

const selectedTags = ref<string[]>([]);

const addTag = (
  event: Event,
  fieldName: string,
  currentValue: any,
  update: Function
) => {
  const tag = (event.target as HTMLSelectElement).value;
  if (tag && !selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag);
    update(fieldName, selectedTags.value);
  }
  (event.target as HTMLSelectElement).value = '';
};

const removeTag = (
  tag: string,
  fieldName: string,
  currentValue: any,
  update: Function
) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);
  update(fieldName, selectedTags.value);
};
</script>

<style scoped lang="scss">
.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  min-height: 40px;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: #4a90e2;
  color: white;
  border-radius: 16px;
  font-size: 14px;
}

.chip-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  line-height: 1;
  
  &:hover {
    opacity: 0.8;
  }
}
</style>
\`\`\`

## Поле с маской для телефона

\`\`\`vue
<template>
  <FormGenerator :config="formConfig" v-model="formData">
    <template #input-phone="{ field, value, update }">
      <input
        type="tel"
        :value="formatPhone(value)"
        @input="handlePhoneInput($event, field.name, update)"
        @keydown="handlePhoneKeydown"
        :placeholder="field.placeholder"
        class="form-input"
        maxlength="18"
      />
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
const formatPhone = (value: string): string => {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 1) return `+${cleaned}`;
  if (cleaned.length <= 4) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1)}`;
  if (cleaned.length <= 7) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
  if (cleaned.length <= 9) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
};

const handlePhoneInput = (
  event: Event,
  fieldName: string,
  update: Function
) => {
  const input = event.target as HTMLInputElement;
  const cleaned = input.value.replace(/\D/g, '');
  update(fieldName, cleaned);
  
  // Устанавливаем отформатированное значение
  input.value = formatPhone(cleaned);
};

const handlePhoneKeydown = (event: KeyboardEvent) => {
  // Разрешаем только цифры и служебные клавиши
  const allowedKeys = [
    'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
    'ArrowLeft', 'ArrowRight', 'Home', 'End'
  ];
  
  if (
    !allowedKeys.includes(event.key) &&
    (event.key < '0' || event.key > '9')
  ) {
    event.preventDefault();
  }
};
</script>
\`\`\`

## Кастомные кнопки с иконками и состояниями

\`\`\`vue
<template>
  <FormGenerator :config="formConfig" v-model="formData">
    <template #actions="{ submit }">
      <div class="custom-actions">
        <button
          type="button"
          @click="handleDraft"
          class="btn btn-outline"
          :disabled="isProcessing"
        >
          <span class="btn-icon">💾</span>
          <span>Сохранить черновик</span>
        </button>
        
        <button
          type="button"
          @click="handlePreview"
          class="btn btn-secondary"
          :disabled="isProcessing"
        >
          <span class="btn-icon">👁️</span>
          <span>Предпросмотр</span>
        </button>
        
        <button
          type="submit"
          @click="submit"
          class="btn btn-primary"
          :disabled="isProcessing"
        >
          <span v-if="!isProcessing" class="btn-icon">✅</span>
          <span v-else class="btn-spinner">⏳</span>
          <span>{{ isProcessing ? 'Отправка...' : 'Отправить' }}</span>
        </button>
      </div>
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isProcessing = ref(false);

const handleDraft = () => {
  console.log('Сохранение черновика...');
};

const handlePreview = () => {
  console.log('Открытие предпросмотра...');
};
</script>

<style scoped lang="scss">
.custom-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-icon,
.btn-spinner {
  font-size: 18px;
}

.btn-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
\`\`\`

