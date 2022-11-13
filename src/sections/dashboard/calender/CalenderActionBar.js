import {Stack, Typography, Button, Drawer} from '@mui/material'
import {IconButtonAnimate} from '../../../components'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {calenderMonths} from './calenderStaticData'
import {useState, useEffect, memo} from 'react'
import {DRAWER_WIDTH} from '../../../config'
import dayjs from 'dayjs'
import {m} from 'framer-motion'


const CalenderActionBar = ({currDate, setCurrDate, months= calenderMonths || []}) => {

    // 
    const nextDate = () => setCurrDate(currDate.add(1, 'month'))
    const prevDate = () => setCurrDate(currDate.subtract(1, 'month'))
    const goToToday = () => setCurrDate(dayjs(new Date()))
    // 
    const [openEventList, setOpenEventList] = useState(false)
    const handleOpenEventList = () => setOpenEventList(true)
    const handleCloseEventList = () => setOpenEventList(false)

    // 
    const [dateTitle, setDateTitle] = useState({})
    useEffect(() => {
        setDateTitle({
            day: '01',
            month: currDate.get("month"),
            year: currDate.get("year"),
        })
    }, [currDate])

    return (
        <Stack
            direction= 'row'
            alignItems='center'
            justifyContent= 'space-between'
            m= {2}
        >
            <Stack spacing= {2} alignItems= 'center' direction= 'row'>
                <IconButtonAnimate>
                    <MoreVertIcon />
                </IconButtonAnimate>

                <Button variant= 'contained' onClick= {goToToday}>
                    today
                </Button>

            </Stack>
            

            <Stack
                spacing= {2}
                direction= 'row'
                alignItems= 'center'
            >
                <IconButtonAnimate onClick= {prevDate}>
                    <KeyboardArrowLeftIcon />
                </IconButtonAnimate>

                <m.div
                    initial={{ opacity: 0, transform: 'translateY(-100%)'}}
                    whileInView={{ opacity: 1, transform: 'translateY(0%)'}}
                    viewport={{ once: true }}
                    key= {Math.random()}
                >
                   <Typography variant= 'body1' sx= {{textTransform: 'capitalize', fontWeight: 700, color: 'primary'}}>
                        {`${dateTitle.day} / ${months[dateTitle.month]} ${dateTitle.year}`}
                    </Typography>
                </m.div>

                <IconButtonAnimate onClick= {nextDate}>
                    <KeyboardArrowRightIcon />
                </IconButtonAnimate>
            </Stack>

            
            <IconButtonAnimate onClick= {handleOpenEventList}>
                <EventNoteIcon />
            </IconButtonAnimate>

            {/*  */}
            <Drawer
                open={openEventList}
                anchor= 'right'
                onClose={handleCloseEventList}
                ModalProps={{ keepMounted: true }}
                PaperProps={{
                    sx: { width: DRAWER_WIDTH },
                }}
            >
                hi
            </Drawer>

            </Stack>
    )
}

export default memo(CalenderActionBar)