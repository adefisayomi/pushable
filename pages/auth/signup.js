
import { styled } from '@mui/material/styles';
import { Stack, Divider, Typography, Avatar, Link } from '@mui/material';
// components
import { Page } from '../../src/components';
import { Logo } from '../../src/components';
import { AuthWithSocial, RegisterForm } from '../../src/sections/auth';
import { useFirebase } from '../../src/hooks';
import NextLink from 'next/link'

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

export default function RegisterCoverPage() {

  const {googleSignup} = useFirebase()


  return (
    <Page title="Signup ">
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
                objectFit='contain'
                variant='rounded'
              />
            </NextLink>

            
          </Stack>


          <RegisterForm />

          <Divider sx={{ py: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              OR
            </Typography>
          </Divider>

          <AuthWithSocial onClickAction= {googleSignup} />

          <Stack
            alignItems= 'center'
          >
          <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            I agree to
            <Link color="text.primary" href="#">
              {''} Terms of Service {''}
            </Link>
            and
            <Link color="text.primary" href="#">
              {''} Privacy Policy.
            </Link>
          </Typography>
          </Stack>
          
          
        </ContentStyle>
        
      </RootStyle>
    </Page>
  );
}
