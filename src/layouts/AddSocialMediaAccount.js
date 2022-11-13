import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import { styled } from '@mui/material/styles';
import { Accordion, MenuItem, Stack, AccordionDetails, ListItemText, Divider } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddIcon from '@mui/icons-material/Add';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// ----------------------------------------------------------------------

// const RootStyle = styled(Stack)(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     paddingLeft: theme.spacing(10),
//   },
// }));

// ----------------------------------------------------------------------

SupportContent.propTypes = {
  contents: PropTypes.array.isRequired,
};

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props}/>
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export default function SupportContent() {

  const [expanded, setExpanded] = useState(false);

  const handleChange =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={ expanded ? <KeyboardArrowUpIcon sx={{ fontSize: '25px' }} /> : <AddIcon sx={{ fontSize: '25px' }} />}
            >
              <ListItemText>Add account</ListItemText>
            </AccordionSummary>

            <AccordionDetails
              sx= {{marginLeft: 3}}
            >
              <MenuList dense>
                <Stack
                  spacing= {1}
                  divider= {<Divider orientation='horizontal' flexItem />}
                >
                  <MenuItem selected>
                      <ListItemIcon>
                          <WhatsAppIcon fontSize= 'large' sx= {{color: 'green'}} />
                      </ListItemIcon>
                      <ListItemText>Whatsapp</ListItemText>
                  </MenuItem>

                  <MenuItem selected>
                      <ListItemIcon>
                          <LinkedInIcon fontSize= 'large' sx= {{color: '#0288d1'}} />
                      </ListItemIcon>
                      <ListItemText>Linkedin</ListItemText>
                  </MenuItem>
                  </Stack>
              </MenuList>
            </AccordionDetails>
          </Accordion>
  );
}
