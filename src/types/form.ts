// Типы для полей формы
export type FieldType = 'input' | 'select' | 'checkbox' | 'textarea';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface InputFieldConfig extends BaseFieldConfig {
  type: 'input';
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: SelectOption[];
  multiple?: boolean;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  cols?: number;
  minLength?: number;
  maxLength?: number;
}

export type FieldConfig = 
  | InputFieldConfig 
  | SelectFieldConfig 
  | CheckboxFieldConfig 
  | TextareaFieldConfig;

export interface FormConfig {
  fields: FieldConfig[];
  submitButtonText?: string;
  cancelButtonText?: string;
}

export type FormValues = Record<string, any>;

