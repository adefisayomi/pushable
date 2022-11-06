// @mui
import { alpha, styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../config';

// ----------------------------------------------------------------------

export const ToolbarStyle = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'transparent' && prop !== 'scrolling',
})(({ transparent, scrolling, theme }) => ({
  height: HEADER_MOBILE_HEIGHT,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
  width: '100%',
  position: 'sticky',
  top: 0,
  right: 0,
  zIndex: 2,
  // alignSelf: 'flex-end',
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP_HEIGHT,
  }
}));