import React from 'react'
import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Divider, Container } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive } from '../../hooks';
// routes
import Routes from '../../routes';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
import Searchbar from '../Searchbar';
import LanguagePopover from '../LanguagePopover';
import { NavMobile, NavDesktop, navConfig } from '../nav';
import { ToolbarStyle } from './HeaderToolbarStyle';

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
};

export default function Header({ transparent, ...others }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  return (
      <ToolbarStyle disableGutters transparent={transparent} scrolling={isScrolling}>
        <Container
          maxWidth= {false}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >

          {/* {isDesktop && (
            <NavDesktop
              isScrolling={isScrolling}
              isTransparent={transparent}
              navConfig={navConfig}
            />
          )} */}

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
            <Searchbar
              sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />

            <LanguagePopover
              sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />

            <Divider orientation="vertical" sx={{ height: 24 }} />

            {isDesktop && (
              <Stack direction="row" spacing={1}>
                <NextLink href={Routes.login} prefetch={false} passHref>
                  <Button
                    color="inherit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </NextLink>
              </Stack>
            )}
          </Stack>

          {!isDesktop && (
            <NavMobile
              navConfig={navConfig}
              sx={{
                ml: 1,
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />
          )}
        </Container>
      </ToolbarStyle>

  );
}
