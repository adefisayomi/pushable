import {Stack, Box} from '@mui/material'
import {TextMaxLine} from '../../../../components'
import {useSettings} from '../../../../hooks'
import {useTheme} from '@mui/material/styles'


export default function EventsComponent ({events}) {

    

    return (
        <Stack spacing= {1} sx={{width: '100%'}}>
            {events && events.map((event, index) => (
                <SingleEvent key= {index} event= {event} />
            ))}
        </Stack>
    )
}

function SingleEvent ({event}) {

    const {dispatchEvent} = useSettings()
    const theme = useTheme()

    const handleClick = () => {
        dispatchEvent({
            type: 'UPDATE',
            ...event, update: true
          })
    }

    return (
        <Box 
            onClick= {handleClick} 
            sx={{
                width: '100%', 
                p: .5, 
                bgcolor: event?.bgColor, 
                cursor: 'pointer',
                border: `1px solid ${theme.palette.divider}`
            }}
        >
            <TextMaxLine variant= 'overline' line= {1} sx= {{textTransform: 'capitalize', }}>
               {event?.title} 
            </TextMaxLine>
        </Box>
    )
}