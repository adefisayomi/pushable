
import { styled } from '@mui/material/styles';
import { Stack, Divider, Typography } from '@mui/material';
// components
import { Page, Logo } from '../../src/components';
// sections
import { AuthWithSocial, LoginForm } from '../../src/sections/auth';
import { useFirebase } from '../../src/hooks';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    overflow: 'hidden',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(5, 2.5),
  [theme.breakpoints.up('md')]: {
    maxWidth: 550,
    padding: theme.spacing(8, 10),
  },
}));

// ----------------------------------------------------------------------

export default function LoginCoverPage() {

  const {googleAuthLogin} = useFirebase()

  return (
    <Page title="Login">
      <RootStyle>
        <ContentStyle>
          

          <Stack
            sx={{
              pb: 2,
              pt: { xs: 5, md: 10 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {/* <Typography variant="h3" paragraph>
              Login
            </Typography> */}
            <Logo sx={{ display: { xs: 'block', md: 'inline-block' } }} />

            
          </Stack>

          <AuthWithSocial onClickAction= {googleAuthLogin} />

          <Divider sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              OR
            </Typography>
          </Divider>

          <LoginForm />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
