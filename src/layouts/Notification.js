import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, Box, Popover, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButtonAnimate } from '../components/animate';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'German',
    value: 'de',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/flags/ic_flag_de.svg',
  },
  {
    label: 'French',
    value: 'fr',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/flags/ic_flag_fr.svg',
  },
];

// ----------------------------------------------------------------------

Notification.propTypes = {
  sx: PropTypes.object,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#0288d1'
  },
}));

export default function Notification({ sx }) {
  const [currentLang, setCurrentLang] = useState('en');

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLang = (newLang) => {
    handleClose();
    setCurrentLang(newLang);
  };

  return (
    <>
      
        <IconButtonAnimate color="inherit" onClick={handleOpen} sx={sx} size= 'small'>
          <StyledBadge color="primary" badgeContent={2} showZero>
            <NotificationsActiveIcon />
          </StyledBadge >
        </IconButtonAnimate>
      
      

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { px: 1, width: '100%', maxWidth: '300px' },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang}
            onClick={() => handleChangeLang(option.value)}
            sx={{ my: 1 }}
          >
            <Box
              component="img"
              alt={option.label}
              src={option.icon}
              sx={{ borderRadius: '50%', width: 28, height: 28, objectFit: 'cover', mr: 1 }}
            />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}