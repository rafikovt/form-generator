// Константы для приложения

export const APP_NAME = 'Генератор Форм';
export const APP_VERSION = '1.0.0';

// Настройки форм
export const FORM_CONFIG = {
  AUTO_SAVE_DELAY: 2000, // мс
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // Валидация
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  
  // Сообщения
  MESSAGES: {
    REQUIRED_FIELD: 'Это поле обязательно для заполнения',
    INVALID_EMAIL: 'Некорректный email адрес',
    INVALID_PHONE: 'Некорректный номер телефона',
    PASSWORD_TOO_SHORT: 'Пароль слишком короткий',
    PASSWORD_TOO_LONG: 'Пароль слишком длинный',
    PASSWORDS_NOT_MATCH: 'Пароли не совпадают',
    FILE_TOO_LARGE: 'Размер файла превышает допустимый',
    INVALID_FILE_TYPE: 'Недопустимый тип файла',
    FORM_SUBMIT_SUCCESS: 'Форма успешно отправлена',
    FORM_SUBMIT_ERROR: 'Ошибка при отправке формы',
    DRAFT_SAVED: 'Черновик сохранен',
    DRAFT_LOADED: 'Черновик загружен',
  }
};

// Регулярные выражения для валидации
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  URL: /^https?:\/\/.+/,
  USERNAME: /^[a-zA-Z0-9_-]+$/,
};

// Опции для селектов
export const COMMON_SELECT_OPTIONS = {
  COUNTRIES: [
    { label: 'Россия', value: 'ru' },
    { label: 'Украина', value: 'ua' },
    { label: 'Беларусь', value: 'by' },
    { label: 'Казахстан', value: 'kz' },
    { label: 'Другая', value: 'other' }
  ],
  
  AGE_GROUPS: [
    { label: 'До 18', value: 'under18' },
    { label: '18-25', value: '18-25' },
    { label: '26-35', value: '26-35' },
    { label: '36-45', value: '36-45' },
    { label: '46-55', value: '46-55' },
    { label: '56+', value: '56plus' }
  ],
  
  LANGUAGES: [
    { label: 'Русский', value: 'ru' },
    { label: 'English', value: 'en' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Français', value: 'fr' },
    { label: 'Español', value: 'es' }
  ],
  
  GENDERS: [
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
    { label: 'Не указан', value: 'other' }
  ]
};

// Настройки localStorage
export const STORAGE_KEYS = {
  FORM_PREFIX: 'form_',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
};

// Роуты приложения
export const ROUTES = {
  HOME: '/',
  CONTACT: '/contact',
  REGISTRATION: '/registration',
  SURVEY: '/survey',
};

