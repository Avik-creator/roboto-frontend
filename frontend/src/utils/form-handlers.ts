'use client'

import {useState, useCallback} from 'react'
import {validateEmail} from './validation'

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface NewsletterFormState {
  email: string
  agreed: boolean
  status: FormStatus
  errorMessage: string
}

export function useNewsletterForm() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = useCallback((): {valid: boolean; error: string} => {
    if (!email.trim()) {
      return {valid: false, error: 'Please enter your email address'}
    }

    if (!validateEmail(email)) {
      return {valid: false, error: 'Please enter a valid email address'}
    }

    if (!agreed) {
      return {valid: false, error: 'Please agree to our Privacy Policy'}
    }

    return {valid: true, error: ''}
  }, [email, agreed])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setErrorMessage('')

      const validation = validateForm()
      if (!validation.valid) {
        setErrorMessage(validation.error)
        setStatus('error')
        return
      }

      setStatus('loading')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStatus('success')
      setEmail('')
      setAgreed(false)
    },
    [validateForm],
  )

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      if (status === 'error') {
        setStatus('idle')
        setErrorMessage('')
      }
    },
    [status],
  )

  const handleAgreementChange = useCallback(() => {
    setAgreed((prev) => !prev)
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }, [status])

  const resetForm = useCallback(() => {
    setEmail('')
    setAgreed(false)
    setStatus('idle')
    setErrorMessage('')
  }, [])

  return {
    email,
    agreed,
    status,
    errorMessage,
    handleSubmit,
    handleEmailChange,
    handleAgreementChange,
    resetForm,
  }
}

export interface SearchFormState {
  query: string
  isSubmitting: boolean
}

export function useSearchForm(onClose: () => void) {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        setIsSubmitting(true)
        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
      }
    },
    [query],
  )

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const resetSearch = useCallback(() => {
    setQuery('')
    setIsSubmitting(false)
  }, [])

  return {
    query,
    isSubmitting,
    handleSubmit,
    handleQueryChange,
    resetSearch,
    setQuery,
  }
}
