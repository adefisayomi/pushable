import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: 0,
          elevation: 0,
          borderRadius: Number(theme.shape.borderRadius) * 0.5,
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
        },
      },
    },
  };
}
