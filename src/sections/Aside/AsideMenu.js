import PropTypes from 'prop-types';
// icons
import emailIcon from '@iconify/icons-carbon/email';
import chatIcon from '@iconify/icons-carbon/chat';
import mobileIcon from '@iconify/icons-carbon/mobile';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Tabs, Stack, Drawer, Typography, CardActionArea } from '@mui/material';
import {useTheme} from '@mui/material/styles'
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { DRAWER_WIDTH } from '../../config';
// components
import { Scrollbar, Iconify, Image, Logo } from '../../components';
import {useRouter} from 'next/router'


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
    <Scrollbar
      sx={{
        py: { xs: 3, md: 0 },
      }}
    >
      <Tabs
        value={menu}
        onChange={onChangeMenu}
        orientation="vertical"
        sx={{
          pl: { xs: 2.5, md: 0 },
        }}
      >
        {sidebarConfig.map((menu, index) => (
          <Tab
            key= {index}
            value={menu.title}
            label={menu.title}
            onClick= {() => router.push(menu.url)}
            icon={menu.icon}
            sx={{
              height: 35,
              typography: 'body2',
              fontSize: '14px',
              width: '100%',
              px: 1,
              borderRadius: 1,
              justifyContent: 'flex-start',
              '&.Mui-selected': { 
                typography: 'subtitle2', 
                bgcolor: theme.palette.mode === 'light' && theme.palette.grey[200],
                border: theme.palette.mode === 'dark' && `1px solid ${theme.palette.divider}`,
              },
            }}
          />
        ))}
      </Tabs>

      {/* <Box
        sx={{
          mt: { xs: 2.5, md: 5 },
          pl: { xs: 2.5, md: 0 },
          pr: { xs: 2.5, md: 5 },
        }}
      >
        <Typography variant="h4" paragraph>
          Do you still need help?
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          Always support whenever you need (24/7).
        </Typography>

        <Stack spacing={2}>
          <ContactButtonStyle>
            <Iconify icon={emailIcon} sx={{ width: 24, height: 24 }} />
            <Typography variant="subtitle2">Email</Typography>
          </ContactButtonStyle>

          <ContactButtonStyle>
            <Iconify icon={chatIcon} sx={{ width: 24, height: 24 }} />
            <Typography variant="subtitle2">Chat Now</Typography>
          </ContactButtonStyle>

          <ContactButtonStyle>
            <Iconify icon={mobileIcon} sx={{ width: 24, height: 24 }} />
            <Typography variant="subtitle2">
              Call{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                552-917-1454
              </Box>
            </Typography>
          </ContactButtonStyle>
        </Stack>
      </Box> */}
    </Scrollbar>
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
