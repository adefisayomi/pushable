import PropTypes from 'prop-types';
import {useResponsive} from '../hooks'
import {Box, Grid} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import Aside from '../sections/Aside'
import {Logo} from '../components'
// next
import dynamic from 'next/dynamic';
import { Scrollbar } from '../components';
//
const Header = dynamic(() => import('./header/Header'), { ssr: false });
const HeaderSimple = dynamic(() => import('./header/HeaderSimple'), { ssr: false });

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node,
  disabledFooter: PropTypes.bool,
  disabledHeader: PropTypes.bool,
  simpleFooter: PropTypes.bool,
  simpleHeader: PropTypes.bool,
  transparentHeader: PropTypes.bool,
  hideSideBar: PropTypes.bool,
};

export default function Layout({
  children,
  transparentHeader,
  disabledHeader,
  disabledFooter,
  simpleHeader= false,
  hideSideBar= false
}) {

  const isDesktop = useResponsive('up', 'md');
  const theme = useTheme()

  return (
    <>
      <Grid 
        container
        px= {3}
      >
        {!hideSideBar && isDesktop &&
        
          <Grid item xs={2.5}
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
            <Box py={3}>
              <Logo />
            </Box>

            <Scrollbar
              sx={{
                py: { xs: 3, md: 0 },
              }}
            >
              <Aside />
            </Scrollbar>
            
          </Grid>
        }
        
        <Grid 
          item 
          xs={ !hideSideBar && isDesktop ? 9.5 : 12}
        >
          <>
            {disabledHeader ? null : simpleHeader ? <HeaderSimple /> : <Header transparent={transparentHeader} />}

            {children}

            {/* {disabledFooter ? null : <FooterSimple />} */}
          </>
        </Grid>
      </Grid>
    
  </>
  );
}
