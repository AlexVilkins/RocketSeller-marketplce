import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  minPrice: Yup.number().typeError('Должно быть числом').min(0, 'Мин. < 0'),
  // .required('Обязательно'),
  maxPrice: Yup.number()
    .typeError('Должно быть числом')
    .min(0, 'Макс. < 0')
    .moreThan(Yup.ref('minPrice'), 'Макс. < мин.'),
  // .required('Обязательно'),
});
