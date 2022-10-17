import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// next
import NextLink from 'next/link';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Link, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
// routes
import Routes from '../../routes';
// components
import { Iconify } from '../../components';
import {useFirebase} from '../../hooks'

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('That is not an email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be of minimum 6 characters length'),
});

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);
  const {loginWithEmailAndPassword} = useFirebase()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    const res = await loginWithEmailAndPassword(data)
    if (res.success) {
      reset()
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-end">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              variant='outlined'
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
              size='small'
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
              <NextLink href={Routes.signup} passHref>
                <Link variant="subtitle2" color="primary">
                  {''} create an account
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
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
}
