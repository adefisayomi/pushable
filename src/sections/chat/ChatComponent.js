import PropTypes from 'prop-types';
import {Box, Grid} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {useState, useEffect} from 'react'
import Routes from '../../routes'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Scrollbar } from '../../components';
import ChatUsers, {ChatHeader} from './ChatUsers'

// ----------------------------------------------------------------------


export default function Chat () {

  const theme = useTheme()
  const [menu, setMenu] = useState('chat');
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleChangeMenu = (event, newValue) => {
        setMenu(newValue);
    };

    useEffect(() => {
        if (mobileOpen) {
        setMobileOpen(false);
        }
    }, [menu]);

  return (
      <Grid container >
        
        <Grid 
          item
          md= {3.5}
          sx= {{
            position: 'sticky',
            top: 0,
            left: 0,
            height: '100vh',
            maxHeight: '100vh',
            overflowX: 'hidden',
            overflowY: 'hidden',
            borderRight: `solid 1px ${theme.palette.divider}`
          }}
        >
              <ChatHeader />

              <Scrollbar
                sx={{
                    py: { xs: 3, md: 0 },
                }}
                >
              <ChatUsers
                sidebarConfig={TOPICS}
                menu={menu}
                isOpenSidebar={mobileOpen}
                onChangeMenu={handleChangeMenu}
                onCloseSidebar={() => setMobileOpen(false)}
            />
            </Scrollbar>
          
        </Grid>
        
        <Grid 
          item
          md= {8.5}
        >
          main
        </Grid>

      </Grid>
  );
}

const TOPICS = [
    {
      title: 'chat',
      icon: <MarkUnreadChatAltIcon sx= {{color: 'green', fontSize: '25px'}} />,
      url: Routes.dashboard.chat
    },
    {
      title: 'mail',
      icon: <MarkEmailUnreadIcon sx= {{color: 'orange', fontSize: '25px'}}/>,
      url: Routes.dashboard.mail,
    },
    {
      title: 'calender',
      icon: <CalendarMonthIcon sx= {{color: 'secondary', fontSize: '25px'}}/>,
      url: Routes.dashboard.calender
    }
  ];
