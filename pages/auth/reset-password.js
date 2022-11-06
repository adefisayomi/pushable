import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Stack, Avatar } from '@mui/material';
// routes
import Routes from '../../src/routes';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, Image } from '../../src/components';
import { ResetPasswordForm } from '../../src/sections/auth';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {

  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('')

  return (
    <Page title="Reset Password">
      <RootStyle>
        <Box sx={{ maxWidth: 450 }}>
          {!sent ? (
            <>
              <Stack
                sx={{ pb: 7}}
                justifyContent= 'center'
                alignItems='center'
                direction= 'row'
              >
            
                <NextLink href='/' passHref>
                  <Avatar
                    src= '/logo.png'
                    alt= 'Logo-Image'
                    sx= {{width: 60, height: 'auto', cursor: 'pointer'}}
                    objectFit='contain'
                    variant='rounded'
                  />
                </NextLink>

            
          </Stack>

              <Typography variant="h3" paragraph>
                Forgot Your Password?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
                Enter the email address associated with your account and We will email you a
                link to reset your password.
              </Typography>

              <ResetPasswordForm
                setSent= {setSent}
                setEmail= {setEmail}
              />
            </>
          ) : (
            <>
              <Image
                alt="email sent"
                src="https://zone-assets-api.vercel.app/assets/icons/ic_email_sent.svg"
                sx={{
                  mb: 5,
                  height: 160,
                  width: 138,
                  mx: 'auto',
                }}
              />

              <Typography variant="h3" paragraph>
                Request Sent Successfully
              </Typography>
              <Typography>
                A password reset Link has been sent to: {''}
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <NextLink href={Routes.login} passHref>
                <Button size="large" variant="contained" sx={{ mt: 5 }}>
                  Back
                </Button>
              </NextLink>
            </>
          )}
        </Box>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
