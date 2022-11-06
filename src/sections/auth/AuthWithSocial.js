import PropTypes from 'prop-types'
import {Stack, Typography, Paper } from '@mui/material';
// components
import { Image } from '../../components';

// ----------------------------------------------------------------------
AuthWithSocial.prototype = {
  onClickAction: PropTypes.func
};

export default function AuthWithSocial({onClickAction}) {

  return (
    <Paper variant= 'outlined'>
      <Stack
        spacing={2}
        direction= 'row'
        alignItems='center'
        justifyContent='center'
        sx={{ bgcolor: 'grey.50024', '&:hover': { bgcolor: 'grey.50048', cursor: 'pointer' }, p: 1.5, borderRadius: 1 }}
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
    </Paper>
  );
}
