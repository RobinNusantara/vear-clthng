import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  password: Yup.string()
      .required('Required'),
});

