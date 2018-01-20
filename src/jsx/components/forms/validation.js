

const required = value => (value ? undefined : 'שדה חובה')
const maxLength = max => value =>
  value && value.length > max ? ` צריך להכיל פחות מ ${max} תווים ` : undefined
const maxLength50 = maxLength(50)
export const minLength = min => value =>
  value && value.length < min ? ` צריך להכיל לפחות  ${min} תווים ` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'מספרים בלבד' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'כתובת מייל לא חוקית'
    : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value => (value ? undefined : 'מומלץ להכניס כתובת מייל')
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9א-ת ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/i.test(value)
    ? 'מס טלפון לא תקין'
    : undefined
