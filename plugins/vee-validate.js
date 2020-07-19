import { extend } from 'vee-validate'
import {
  required,
  confirmed,
  length,
  email,
  min,
  max,
  min_value as minValue,
  max_value as maxValue,
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
  params: ['length'],
  message: 'This field must have at least {length} characters',
})

extend('max', {
  ...max,
  params: ['length'],
  message: 'This field must have at most {length} characters',
})

extend('minValue', {
  ...minValue,
  validate(userVal, { value }) {
    return userVal >= value
  },
  params: ['value'],
  message: 'This field must be at least {value}',
})

extend('maxValue', {
  ...maxValue,
  validate(userVal, { value }) {
    return userVal <= value
  },
  params: ['value'],
  message: 'This field must be at most {value}',
})
