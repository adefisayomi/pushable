import PropTypes from 'prop-types';
import Head from 'next/head';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{ title ? `${title} | Pushable` : 'Pushable' }</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Page;

// import PropTypes from 'prop-types'
// import {Grid, Box} from '@mui/material';
// import Aside from '../sections/Aside';
// import { useResponsive } from '../hooks';
// import Head from 'next/head';
// import { forwardRef } from 'react';



// // ----------------------------------------------------------------------

// const Page = forwardRef(({ children, meta, title, ...other }, ref) => {

//   const isDesktop = useResponsive('up', 'md');

//   return (
  //   <>
  //   <Head>
  //     <title>{ title ? `${title} | Pushable` : 'Pushable' }</title>
  //     {meta}
  //   </Head>
  
  //   <Box ref={ref} {...other}>
  //     <Grid 
  //       container 
  //       spacing={2} 
  //       px= {3}
  //     >
  //       {isDesktop &&
  //         <Grid item xs={2.5}>
  //           <Aside />
  //         </Grid>
  //       }
        
  //       <Grid 
  //         item 
  //         xs={ isDesktop ? 9.5 : 12}
  //       >
  //         {children}
  //       </Grid>
  //     </Grid>
  //   </Box>
    
  // </>
//   )
// });

// Page.propTypes = {
//   children: PropTypes.node.isRequired,
//   meta: PropTypes.node,
//   title: PropTypes.string.isRequired,
// };

// export default Page
