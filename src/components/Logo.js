import PropTypes from 'prop-types';
import { memo } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image'

// ----------------------------------------------------------------------

Logo.propTypes = {
  isSimple: PropTypes.bool,
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

function Logo({ onDark = false, isSimple = false, sx }) {

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <NextLink href="/" passHref>
      <Box
        sx={{
          width: 100,
          cursor: 'pointer',
          ...sx,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >

        <Image
          src= '/logo3.png'
          alt= 'Logo'
          width= {400}
          height= {120}
          objectFit= 'cover'
        />
        
      </Box>
    </NextLink>
  );
}

export default memo(Logo);
