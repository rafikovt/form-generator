import { ref, computed, watch, type Ref } from 'vue';
import type { FormConfig, FormValues } from '@/types/form';
import {
  saveFormToLocalStorage,
  loadFormFromLocalStorage,
  removeFormFromLocalStorage,
  clearFormValues,
  isFormDataEqual,
  getChangedFields,
  trimFormValues
} from '@/utils/formHelpers';

export interface UseFormOptions {
  formId?: string;
  initialValues?: FormValues;
  autoSave?: boolean;
  autoSaveDelay?: number;
  onSubmit?: (data: FormValues) => void | Promise<void>;
  onCancel?: () => void;
  onError?: (error: Error) => void;
}

export const useForm = (config: FormConfig, options: UseFormOptions = {}) => {
  const {
    formId = 'default-form',
    initialValues = {},
    autoSave = false,
    autoSaveDelay = 1000,
    onSubmit,
    onCancel,
    onError
  } = options;

  const formData = ref<FormValues>(initialValues);
  const originalData = ref<FormValues>({ ...initialValues });
  const isSubmitting = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');
  const isTouched = ref(false);

  const loadSavedData = () => {
    const savedData = loadFormFromLocalStorage(formId);
    if (savedData) {
      formData.value = savedData;
    }
  };

  const isDirty = computed(() => {
    return !isFormDataEqual(formData.value, originalData.value);
  });

  const changedFields = computed(() => {
    return getChangedFields(originalData.value, formData.value);
  });

  const validate = (): boolean => {
    const requiredFields = config.fields
      .filter(field => field.required)
      .map(field => field.name);

    for (const fieldName of requiredFields) {
      const value = formData.value[fieldName];
      if (value === undefined || value === null || value === '' || value === false) {
        errorMessage.value = `Поле "${config.fields.find(f => f.name === fieldName)?.label}" обязательно для заполнения`;
        hasError.value = true;
        return false;
      }
    }

    hasError.value = false;
    errorMessage.value = '';
    return true;
  };

  const handleSubmit = async () => {
    isTouched.value = true;

    if (!validate()) {
      return;
    }

    isSubmitting.value = true;
    hasError.value = false;

    try {
      const trimmedData = trimFormValues(formData.value);
      
      if (onSubmit) {
        await onSubmit(trimmedData);
      }

      originalData.value = { ...trimmedData };

      removeFormFromLocalStorage(formId);
    } catch (error) {
      hasError.value = true;
      errorMessage.value = error instanceof Error ? error.message : 'Произошла ошибка';
      
      if (onError) {
        onError(error as Error);
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleCancel = () => {
    formData.value = clearFormValues(formData.value);
    isTouched.value = false;
    hasError.value = false;
    errorMessage.value = '';
    removeFormFromLocalStorage(formId);

    if (onCancel) {
      onCancel();
    }
  };

  const reset = () => {
    formData.value = { ...originalData.value };
    isTouched.value = false;
    hasError.value = false;
    errorMessage.value = '';
  };

  const setValues = (values: Partial<FormValues>) => {
    formData.value = { ...formData.value, ...values };
  };

  const setFieldValue = (fieldName: string, value: any) => {
    formData.value = { ...formData.value, [fieldName]: value };
  };

  const getFieldValue = (fieldName: string) => {
    return formData.value[fieldName];
  };

  const saveDraft = () => {
    saveFormToLocalStorage(formId, formData.value);
  };

  const loadDraft = () => {
    loadSavedData();
  };

  const clearDraft = () => {
    removeFormFromLocalStorage(formId);
  };

  let autoSaveTimeout: NodeJS.Timeout | null = null;

  if (autoSave) {
    watch(
      formData,
      () => {
        if (autoSaveTimeout) {
          clearTimeout(autoSaveTimeout);
        }

        autoSaveTimeout = setTimeout(() => {
          saveDraft();
        }, autoSaveDelay);
      },
      { deep: true }
    );
  }

  return {
    formData,
    originalData,
    isSubmitting,
    hasError,
    errorMessage,
    isTouched,
    isDirty,
    changedFields,
    handleSubmit,
    handleCancel,
    reset,
    validate,
    setValues,
    setFieldValue,
    getFieldValue,
    saveDraft,
    loadDraft,
    clearDraft
  };
};

