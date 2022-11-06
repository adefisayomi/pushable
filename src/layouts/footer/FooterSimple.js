// @mui
import { Container, Typography } from '@mui/material';
// components
import { Logo } from '../../components';

// ----------------------------------------------------------------------

export default function FooterSimple() {
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="body3" sx={{ color: 'text.secondary' }}>
        © 2022. All rights reserved
      </Typography>
    </Container>
  );
}
