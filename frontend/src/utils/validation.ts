export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

export function validateMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength
}

export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateFormField(
  value: string,
  rules: {
    required?: boolean
    email?: boolean
    minLength?: number
    maxLength?: number
  },
): ValidationResult {
  if (rules.required && !validateRequired(value)) {
    return {isValid: false, error: 'This field is required'}
  }

  if (rules.email && value && !validateEmail(value)) {
    return {isValid: false, error: 'Please enter a valid email address'}
  }

  if (rules.minLength && value && !validateMinLength(value, rules.minLength)) {
    return {isValid: false, error: `Minimum ${rules.minLength} characters required`}
  }

  if (rules.maxLength && value && !validateMaxLength(value, rules.maxLength)) {
    return {isValid: false, error: `Maximum ${rules.maxLength} characters allowed`}
  }

  return {isValid: true}
}
