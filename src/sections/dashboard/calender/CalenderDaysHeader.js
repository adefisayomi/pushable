import {Grid, Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {calenderDays} from './calenderStaticData'
import PropTypes from 'prop-types'



export default function CalenderDaysHeader ({days= calenderDays || [], currDate}) {

    const theme = useTheme()

    return (
        <Grid 
            container
            sx= {{
                borderTop: `1px solid ${theme.palette.divider}`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                cursor: 'default'
            }}
        >
            {
                days && days.map((day, index) => (
                    <Grid 
                        md= {12/7}
                        xs= {12/7}
                        key= {index}
                        id= {index}
                        value= {day}
                        item
                        sx= {{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: theme.palette.mode === 'dark' ? 1 : 2,
                            border: currDate.get('day') === index && theme.palette.mode === 'dark' && `1px solid ${theme.palette.divider}`,
                            bgcolor: currDate.get('day') === index && theme.palette.mode === 'light' &&  theme.palette.grey[300],
                            borderRadius: theme.palette.mode === 'dark' && '10px',
                            my: theme.palette.mode === 'dark' && 1
                        }}
                    >
                    <Typography 
                        variant= 'subtitle2' 
                        sx= {{
                            textTransform: 'capitalize',
                            }}>
                        {day}
                    </Typography>
                    </Grid>
                ))
            }
        </Grid>
    )
}

CalenderDaysHeader.prototype = {
    days: PropTypes.array.isRequired
}