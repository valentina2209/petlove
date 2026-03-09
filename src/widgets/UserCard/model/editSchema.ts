import * as Yup from 'yup';

export const editSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .test('is-present', 'Photo or link is required', (value) => {
      // Перевіряємо, щоб значення не було порожнім рядком, null або undefined
      if (!value) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      return true;
    })
    .nullable()
    .required('Avatar is required'),
  name: Yup.string()
    .min(2, 'Name too short')
    .required('Name is required'),
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+38\d{10}$/, 'Format: +380XXXXXXXXX')
    .required('Phone is required'),
});