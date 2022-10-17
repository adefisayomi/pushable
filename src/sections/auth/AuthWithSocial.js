import PropTypes from 'prop-types'
import {Stack, Typography } from '@mui/material';
// components
import { Image } from '../../components';

// ----------------------------------------------------------------------
AuthWithSocial.prototype = {
  onClickAction: PropTypes.func
};

export default function AuthWithSocial({onClickAction}) {

  return (
      <Stack
        spacing={2}
        direction= 'row'
        alignItems='center'
        justifyContent='center'
        sx={{ bgcolor: 'grey.5008', '&:hover': { bgcolor: 'grey.50024', cursor: 'pointer' }, p: 1, borderRadius: 1 }}
        onClick= {onClickAction}
      >
        <Image
          alt="google icon"
          src="https://zone-assets-api.vercel.app/assets/icons/ic_google.svg"
          sx={{ width: 30, height: 30 }}
        />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Continue with google
        </Typography>
      </Stack>
  );
}
