import * as Yup from 'yup';

export const addPetSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  name: Yup.string().required('Name is required'),
  imgURL: Yup.string()
    .required('Photo is required'),
    // .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, 'Invalid image URL')
    // .required('Image URL is required'),
  species: Yup.string().required('Species is required'),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD')
    .required('Birthday is required'),
  sex: Yup.string().oneOf(['female', 'male', 'multiple']).required('Sex is required'),
});