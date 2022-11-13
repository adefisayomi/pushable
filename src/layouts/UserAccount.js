import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, Popover, Avatar} from '@mui/material';
import { IconButtonAnimate } from '../components/animate';
import { useFirebase, useSettings } from '../hooks';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import AddSocialMediaAccount from './AddSocialMediaAccount'


// ----------------------------------------------------------------------

UserAccount.propTypes = {
  sx: PropTypes.object,
};


export default function UserAccount({ sx }) {

  const {user} = useSettings()

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);

  return (
    <>
      
        <IconButtonAnimate onClick={handleOpen} sx={sx} size= 'small' >
          <Avatar
            src= {user?.photoURL}
            alt= {user?.displayName}
            sx={{ width: 30, height: 30 }}
          />
        </IconButtonAnimate>
      
      

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { px: 1, width: '100%', maxWidth: '300px' }
        }}
      >
        <UserListMenu />
      </Popover>
    </>
  );
}






function UserListMenu () {

    const {signOut} = useFirebase()
    const {themeMode, onToggleMode} = useSettings()

  return (
    <MenuList dense>
        {/* <MenuItem>
            <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
            <Check />
            </ListItemIcon>
            Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem>
            <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
         */}
        <AddSocialMediaAccount />

        <Divider sx= {{my: 1}} />
        <Paper variant= 'outlined'>
            <MenuItem onClick= {onToggleMode}>
                <ListItemText>{themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}</ListItemText>
            </MenuItem>
        </Paper>

        <MenuItem onClick= {signOut}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
        </MenuItem>
    </MenuList>
  );
}
