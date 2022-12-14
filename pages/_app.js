// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
// next
import Head from 'next/head';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// contexts
import { SettingsProvider } from '../src/contexts/SettingsContext';
// theme
import ThemeProvider from '../src/theme';
// components
import RtlLayout from '../src/components/RtlLayout';
import ProgressBar from '../src/components/ProgressBar';
import ThemeColorPresets from '../src/components/ThemeColorPresets';
import MotionLazyContainer from '../src/components/animate/MotionLazyContainer';
import {SnackbarProvider} from 'notistack'
import {AlertCloseButton} from '../src/components'
import { SWRConfig } from 'swr'

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default function MyApp(props) {

  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
      <SnackbarProvider
        maxSnack={2}
        hideIconVariant
        action={(snackbarId) => <AlertCloseButton snackbarId= {snackbarId} />}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
      >
        <SWRConfig 
            value={{
              refreshInterval: 3000,
              revalidateOnFocus: true,
              revalidateOnReconnect: true,
              revalidateOnMount:true,
              fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
          >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SettingsProvider>
            <ThemeProvider>
              <ThemeColorPresets>
                <MotionLazyContainer>
                  <RtlLayout>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </RtlLayout>
                </MotionLazyContainer>
              </ThemeColorPresets>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
        </SWRConfig>
      </SnackbarProvider>
    </>
  );
}
