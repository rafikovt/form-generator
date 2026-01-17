<template>
  <div class="form-generator">
    <form @submit.prevent="handleSubmit" class="form">
      <div
        v-for="field in config.fields"
        :key="field.name"
        class="form-field"
        :class="field.className"
      >
        <!-- Слот для кастомизации всего поля -->
        <slot :name="`field-${field.name}`" :field="field" :value="modelValue[field.name]" :update="updateField">
          <label :for="field.name" class="form-label">
            {{ field.label }}
            <span v-if="field.required" class="required">*</span>
          </label>

          <!-- Слот для кастомизации только инпута -->
          <slot :name="`input-${field.name}`" :field="field" :value="modelValue[field.name]" :update="updateField">
            <!-- Input -->
            <input
              v-if="field.type === 'input'"
              :id="field.name"
              :type="(field as InputFieldConfig).inputType || 'text'"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              :pattern="(field as InputFieldConfig).pattern"
              :minlength="(field as InputFieldConfig).minLength"
              :maxlength="(field as InputFieldConfig).maxLength"
              :value="modelValue[field.name]"
              @input="updateField(field.name, ($event.target as HTMLInputElement).value)"
              class="form-input"
            />

            <!-- Select -->
            <select
              v-else-if="field.type === 'select'"
              :id="field.name"
              :name="field.name"
              :required="field.required"
              :disabled="field.disabled"
              :multiple="(field as SelectFieldConfig).multiple"
              :value="modelValue[field.name]"
              @change="updateField(field.name, ($event.target as HTMLSelectElement).value)"
              class="form-select"
            >
              <option value="" disabled>Выберите вариант</option>
              <option
                v-for="option in (field as SelectFieldConfig).options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>

            <!-- Checkbox -->
            <div v-else-if="field.type === 'checkbox'" class="form-checkbox-wrapper">
              <input
                :id="field.name"
                type="checkbox"
                :name="field.name"
                :required="field.required"
                :disabled="field.disabled"
                :checked="modelValue[field.name]"
                @change="updateField(field.name, ($event.target as HTMLInputElement).checked)"
                class="form-checkbox"
              />
            </div>

            <!-- Textarea -->
            <textarea
              v-else-if="field.type === 'textarea'"
              :id="field.name"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              :rows="(field as TextareaFieldConfig).rows || 4"
              :cols="(field as TextareaFieldConfig).cols"
              :minlength="(field as TextareaFieldConfig).minLength"
              :maxlength="(field as TextareaFieldConfig).maxLength"
              :value="modelValue[field.name]"
              @input="updateField(field.name, ($event.target as HTMLTextAreaElement).value)"
              class="form-textarea"
            />
          </slot>
        </slot>
      </div>

      <!-- Слот для кастомизации кнопок -->
      <slot name="actions" :submit="handleSubmit" :cancel="handleCancel">
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            {{ config.submitButtonText || 'Сохранить' }}
          </button>
          <button type="button" @click="handleCancel" class="btn btn-secondary">
            {{ config.cancelButtonText || 'Отмена' }}
          </button>
        </div>
      </slot>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type {
  FormConfig,
  FormValues,
  InputFieldConfig,
  SelectFieldConfig,
  TextareaFieldConfig
} from '@/types/form';

interface Props {
  config: FormConfig;
  modelValue: FormValues;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: FormValues];
  'submit': [value: FormValues];
  'cancel': [];
}>();

const updateField = (fieldName: string, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [fieldName]: value
  });
};

const handleSubmit = () => {
  emit('submit', props.modelValue);
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style scoped lang="scss">
.form-generator {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form {
  background: $bg-white;
  padding: $spacing-xl;
  border-radius: $border-radius;
  box-shadow: $shadow-md;
}

.form-field {
  margin-bottom: $spacing-lg;

  &:last-of-type {
    margin-bottom: $spacing-xl;
  }
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

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  font-size: $font-size-base;
  transition: border-color $transition-speed, box-shadow $transition-speed;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }

  &:disabled {
    background-color: $bg-light;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: $text-secondary;
  }
}

.form-select {
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-checkbox-wrapper {
  display: flex;
  align-items: center;
}

.form-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: $primary-color;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.form-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: flex-end;
  padding-top: $spacing-md;
  border-top: 1px solid $border-color;
}

.btn {
  padding: $spacing-sm $spacing-lg;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $font-size-base;
  font-weight: 500;
  transition: all $transition-speed;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: $shadow-sm;
  }

  &:active {
    transform: translateY(0);
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
</style>

