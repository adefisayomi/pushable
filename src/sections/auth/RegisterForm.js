import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Link, TextField, IconButton, InputAdornment } from '@mui/material';
// components
import { Iconify } from '../../components';
import { useFirebase } from '../../hooks';
import NextLink from 'next/link';
import Routes from '../../routes';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(6, 'Mininum 6 characters')
    .max(30, 'Maximum (30) characters'),
  email: Yup.string().required('Email is required').email('That is not an email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be of minimum 6 characters length')
});

export default function RegisterForm() {

  const {signupWithEmailAndPassword} = useFirebase()
  const [showPassword, setShowPassword] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'submit',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    const res = await signupWithEmailAndPassword(data)
    if (res.success) {
      return reset()
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size='large'
              variant='outlined'
              label="Full Name"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size='large'
              variant='outlined'
              fullWidth
              label="Email address"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              size='large'
              variant='outlined'
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end" size='small'>
                      <Iconify icon={showPassword ? viewIcon : viewOff} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Stack
          direction='row'
          justifyContent= 'space-between'
          alignItems= 'center'
          width= '100%'
        >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account? 
              <NextLink href={Routes.login} passHref>
                <Link variant="subtitle2" color="primary">
                  {' '} Login
                </Link>
              </NextLink>
            </Typography>

            <NextLink href={Routes.resetPassword} passHref>
              <Link variant="body3" underline="always" color="text.secondary">
                Forgot password?
              </Link>
            </NextLink>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create Account
        </LoadingButton>
      </Stack>
    </form>
  );
}
