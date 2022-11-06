import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { useFirebase } from '../../hooks';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('That is not an email'),
});

ResetPasswordForm.propTypes = {
  onGetEmail: PropTypes.func,
  onSent: PropTypes.func,
};

export default function ResetPasswordForm({ setSent, setEmail }) {


  const {sendResetPasswordLink} = useFirebase()

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'submit',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    const res = await sendResetPasswordLink(data.email)
    if (res.success) {
      setSent(true)
      setEmail(prev => data.email)
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant= 'outlined'
              size= 'large'
              label="Email address"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Reset Password
        </LoadingButton>
      </Stack>
    </form>
  );
}
