import PropTypes from 'prop-types';
import { memo } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  isSimple: PropTypes.bool,
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

function Logo({ onDark = false, isSimple = false, sx }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const PRIMARY_MAIN = theme.palette.primary.main;
  const LIGHT_COLOR = theme.palette.common.white;
  const DARK_COLOR = theme.palette.grey[800];

  return (
    <NextLink href="/" passHref>
      <Box
        sx={{
          width: 'fit-content',
          cursor: 'pointer',
          ...sx,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Typography 
          sx= {{  
            fontFamily: 'Fredoka One', 
            color: isLight ? DARK_COLOR : LIGHT_COLOR, 
            textTransform: 'capitalize',
            letterSpacing: '1px',
            fontSize: '25px',
            fontWeight: 'bolder'
          }}
        >
          Pushable
        </Typography>
      </Box>
    </NextLink>
  );
}

export default memo(Logo);
