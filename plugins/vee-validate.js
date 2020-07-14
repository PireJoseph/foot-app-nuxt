import { extend } from 'vee-validate'
import {
  required,
  confirmed,
  length,
  email,
  min,
  max,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'This email is not valid',
})

extend('confirmed', {
  ...confirmed,
  message: 'This field confirmation does not match',
})

extend('length', {
  ...length,
  message: 'This field must have 2 options',
})

extend('min', {
  ...min,
  validate(value, { length }) {
    return value.length >= length
  },
  params: ['length'],
  message: 'This field must have at least {length} characters',
})

extend('max', {
  ...max,
  validate(value, { length }) {
    return value.length <= length
  },
  params: ['length'],
  message: 'This field must have at most {length} characters',
})
