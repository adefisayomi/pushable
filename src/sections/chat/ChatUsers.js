import PropTypes from 'prop-types';
// icons
import emailIcon from '@iconify/icons-carbon/email';
import chatIcon from '@iconify/icons-carbon/chat';
import mobileIcon from '@iconify/icons-carbon/mobile';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Tabs, Stack, Drawer, Typography, CardActionArea, Avatar, Divider, List, ListItemAvatar, ListItem, ListItemText } from '@mui/material';
import {useTheme} from '@mui/material/styles'
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { DRAWER_WIDTH } from '../../config';
// components
import { Scrollbar, Iconify, Image, TextMaxLine, IconButtonAnimate } from '../../components';
import {useRouter} from 'next/router'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'



// ----------------------------------------------------------------------

const ContactButtonStyle = styled((props) => (
  <CardActionArea sx={{ borderRadius: 1 }}>
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  border: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

AsideMenu.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onChangeTopic: PropTypes.func,
  onCloseSidebar: PropTypes.func,
  sidebarConfig: PropTypes.array,
  topic: PropTypes.string,
};

export default function AsideMenu ({
  menu,
  sidebarConfig,
  onChangeMenu,
  isOpenSidebar,
  onCloseSidebar,
}) {

  const router = useRouter()
  const isDesktop = useResponsive('up', 'md');
  const theme = useTheme()

  const renderContent = (
    <List sx={{ width: '100%' }}>
        <Stack spacing= {1}>
      {
        Array(20).fill(null).map((user, index) => (
            <ListItem alignItems="flex-start" key= {index} sx= {{px: 1, bgcolor: theme.palette.grey[200]}}>
                <ListItemAvatar>
                <Avatar />
                </ListItemAvatar>

                <Stack alignItems='flex-start' justifyContent='space-between'>
                    <Stack direction= 'row' alignItems='center' justifyContent='space-between' width= '100%'>
                        <Typography variant= 'body2' sx= {{textTransform: 'capitalize'}} >
                            dolapo oluwole
                        </Typography>
                        <Typography variant= 'body2' sx= {{fontSize: '10px'}}>
                            12:30 jun 2020
                        </Typography>
                    </Stack>
                    <TextMaxLine variant= 'body2' line= {1}>
                        — Wish I could come, but I'm out of town this…
                    </TextMaxLine>
                </Stack>

            
            </ListItem>
            ))
        }
      </Stack>
      {/* <Divider variant="inset" component="li" /> */}
      {/* <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem> */}
    </List>
  );

  return (
    <>
      {isDesktop ? (
        
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
            //   width: DRAWER_WIDTH,
              position: 'unset',
              bgcolor: 'background.default',
              minHeight: '100vh',
              border: 'none'
            },
          }}
        >

          {renderContent}

        </Drawer>
      ) : (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}


export function ChatHeader () {

    const theme = useTheme()

    return (
        <Stack direction= 'row' alignItems= 'center' sx= {{px: 1, py: 2, borderBottom: `solid 1px ${theme.palette.divider}`}}>
            <Avatar />

            <Box sx= {{flexGrow: 1}} />

            <Stack direction= 'row' alignItems= 'center' spacing= {1} divider= {<Divider orientation= 'vertical' flexItem />}>
                <IconButtonAnimate size= 'small'>
                    <KeyboardArrowLeftIcon />
                </IconButtonAnimate>

                <IconButtonAnimate size= 'small'>
                    <MoreVertIcon />
                </IconButtonAnimate>
            </Stack>
        </Stack>
    )
}