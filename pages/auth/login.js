import { styled } from '@mui/material/styles';
import { Stack, Divider, Typography, Avatar, Paper } from '@mui/material';
// components
import { Page} from '../../src/components';
// sections
import { AuthWithSocial, LoginForm } from '../../src/sections/auth';
import NextLink from 'next/link';
import { useFirebase } from '../../src/hooks';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    overflow: 'hidden',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(5, 2.5),
  [theme.breakpoints.up('md')]: {
    maxWidth: 550,
    padding: theme.spacing(8, 10),
  },
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '10px'
}));

// ----------------------------------------------------------------------

export default function Login() {

  const {googleLogin} = useFirebase()

  return (
    <Page title="Login">
      <RootStyle>
        <ContentStyle>
          
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
                variant='rounded'
              />
            </NextLink>

            
          </Stack>
          <LoginForm />

          <Divider sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              OR
            </Typography>
          </Divider>

          <AuthWithSocial onClickAction= {googleLogin} />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}