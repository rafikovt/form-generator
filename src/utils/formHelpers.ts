// Вспомогательные функции для работы с формами

import type { FormValues } from '@/types/form';

/**
 * Валидация email адреса
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валидация номера телефона (простая проверка)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Проверка силы пароля
 */
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (!password) return 'weak';
  
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
};

/**
 * Глубокое клонирование объекта
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Проверка, заполнены ли обязательные поля
 */
export const validateRequiredFields = (
  formData: FormValues,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    const value = formData[field];
    if (value === undefined || value === null || value === '' || value === false) {
      missingFields.push(field);
    }
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Форматирование номера телефона
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  
  return phone;
};

/**
 * Сохранение данных формы в localStorage
 */
export const saveFormToLocalStorage = (formId: string, data: FormValues): void => {
  try {
    localStorage.setItem(`form_${formId}`, JSON.stringify(data));
  } catch (e) {
    console.error('Ошибка сохранения формы:', e);
  }
};

/**
 * Загрузка данных формы из localStorage
 */
export const loadFormFromLocalStorage = (formId: string): FormValues | null => {
  try {
    const data = localStorage.getItem(`form_${formId}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Ошибка загрузки формы:', e);
    return null;
  }
};

/**
 * Удаление данных формы из localStorage
 */
export const removeFormFromLocalStorage = (formId: string): void => {
  try {
    localStorage.removeItem(`form_${formId}`);
  } catch (e) {
    console.error('Ошибка удаления формы:', e);
  }
};

/**
 * Очистка всех значений формы
 */
export const clearFormValues = (formData: FormValues): FormValues => {
  const clearedData: FormValues = {};
  
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    
    if (typeof value === 'boolean') {
      clearedData[key] = false;
    } else if (typeof value === 'number') {
      clearedData[key] = 0;
    } else if (Array.isArray(value)) {
      clearedData[key] = [];
    } else {
      clearedData[key] = '';
    }
  });
  
  return clearedData;
};

/**
 * Сравнение двух объектов данных формы
 */
export const isFormDataEqual = (data1: FormValues, data2: FormValues): boolean => {
  return JSON.stringify(data1) === JSON.stringify(data2);
};

/**
 * Получение списка измененных полей
 */
export const getChangedFields = (
  originalData: FormValues,
  currentData: FormValues
): string[] => {
  const changedFields: string[] = [];
  
  Object.keys(currentData).forEach(key => {
    if (JSON.stringify(originalData[key]) !== JSON.stringify(currentData[key])) {
      changedFields.push(key);
    }
  });
  
  return changedFields;
};

/**
 * Санитизация строки (удаление HTML тегов)
 */
export const sanitizeString = (str: string): string => {
  return str.replace(/<[^>]*>/g, '');
};

/**
 * Обрезка всех строковых значений в форме
 */
export const trimFormValues = (formData: FormValues): FormValues => {
  const trimmedData: FormValues = {};
  
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    trimmedData[key] = typeof value === 'string' ? value.trim() : value;
  });
  
  return trimmedData;
};

