// Тестовые данные для демонстрации форм

import type { FormConfig } from '@/types/form';
import { COMMON_SELECT_OPTIONS } from '@/constants';

/**
 * Форма обратной связи
 */
export const contactFormConfig: FormConfig = {
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

/**
 * Форма регистрации
 */
export const registrationFormConfig: FormConfig = {
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
      options: COMMON_SELECT_OPTIONS.COUNTRIES
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

/**
 * Форма опроса
 */
export const surveyFormConfig: FormConfig = {
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
      options: COMMON_SELECT_OPTIONS.AGE_GROUPS
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

/**
 * Форма авторизации
 */
export const loginFormConfig: FormConfig = {
  fields: [
    {
      name: 'username',
      label: 'Имя пользователя или Email',
      type: 'input',
      inputType: 'text',
      placeholder: 'Введите имя пользователя',
      required: true
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'input',
      inputType: 'password',
      placeholder: 'Введите пароль',
      required: true
    },
    {
      name: 'remember',
      label: 'Запомнить меня',
      type: 'checkbox'
    }
  ],
  submitButtonText: 'Войти',
  cancelButtonText: 'Сбросить'
};

/**
 * Форма профиля пользователя
 */
export const profileFormConfig: FormConfig = {
  fields: [
    {
      name: 'firstName',
      label: 'Имя',
      type: 'input',
      inputType: 'text',
      required: true
    },
    {
      name: 'lastName',
      label: 'Фамилия',
      type: 'input',
      inputType: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      required: true
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'input',
      inputType: 'tel'
    },
    {
      name: 'gender',
      label: 'Пол',
      type: 'select',
      options: COMMON_SELECT_OPTIONS.GENDERS
    },
    {
      name: 'country',
      label: 'Страна',
      type: 'select',
      options: COMMON_SELECT_OPTIONS.COUNTRIES
    },
    {
      name: 'language',
      label: 'Предпочитаемый язык',
      type: 'select',
      options: COMMON_SELECT_OPTIONS.LANGUAGES
    },
    {
      name: 'bio',
      label: 'О себе',
      type: 'textarea',
      rows: 4,
      maxLength: 500
    },
    {
      name: 'notifications',
      label: 'Получать уведомления на email',
      type: 'checkbox'
    }
  ],
  submitButtonText: 'Сохранить изменения',
  cancelButtonText: 'Отменить'
};

/**
 * Форма заказа
 */
export const orderFormConfig: FormConfig = {
  fields: [
    {
      name: 'fullName',
      label: 'ФИО',
      type: 'input',
      inputType: 'text',
      placeholder: 'Иванов Иван Иванович',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      required: true
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'input',
      inputType: 'tel',
      placeholder: '+7 (999) 123-45-67',
      required: true
    },
    {
      name: 'deliveryType',
      label: 'Способ доставки',
      type: 'select',
      required: true,
      options: [
        { label: 'Курьерская доставка', value: 'courier' },
        { label: 'Самовывоз', value: 'pickup' },
        { label: 'Почта России', value: 'post' }
      ]
    },
    {
      name: 'address',
      label: 'Адрес доставки',
      type: 'textarea',
      placeholder: 'Город, улица, дом, квартира',
      rows: 3,
      required: true
    },
    {
      name: 'paymentMethod',
      label: 'Способ оплаты',
      type: 'select',
      required: true,
      options: [
        { label: 'Наличными при получении', value: 'cash' },
        { label: 'Банковской картой', value: 'card' },
        { label: 'Онлайн оплата', value: 'online' }
      ]
    },
    {
      name: 'comment',
      label: 'Комментарий к заказу',
      type: 'textarea',
      placeholder: 'Дополнительная информация',
      rows: 3
    },
    {
      name: 'agreeToTerms',
      label: 'Согласен с условиями доставки',
      type: 'checkbox',
      required: true
    }
  ],
  submitButtonText: 'Оформить заказ',
  cancelButtonText: 'Отменить'
};

