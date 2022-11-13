import {Grid, Typography, Stack} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import { useEffect, useState } from 'react'
import {m} from 'framer-motion'
import dayjs from 'dayjs'
import { EventsComponent } from './events'
import {useSettings} from '../../../hooks'



export default function CalenderDayBox ({handleOpenCalenderModal, currDate}) {

   const {events} = useSettings()
    const theme = useTheme()
    const [daysList, setDayList] = useState([])
    // 
    const handleGetDaysList = () => {
        let startDayOfMonth = dayjs(currDate).startOf("month").get("day")
        startDayOfMonth = startDayOfMonth > 0 ? Array(startDayOfMonth).fill(null) : []
        let daysInMonth = Array.from(Array(dayjs(currDate).daysInMonth()).keys()).map(v => v + 1)
        daysInMonth = startDayOfMonth.concat(daysInMonth).map(day => {
            if (day) {
                const date = dayjs(currDate).set("D", day)
                return ({
                    day, date,
                    events: events.filter( event => dayjs(event.startDate).isSame(date, 'date'))
                })
            }
            return null
        })
        setDayList(prev => daysInMonth)
    }
    useEffect(() => {
        handleGetDaysList()
    }, [currDate, events])
    // 

    const sameDay = dayjs().get('D')
    const sameMonth = dayjs().get('M') === currDate.get("month")

    return (
        <Grid container>
            {
                daysList.map((data, index) => {

                    const day = data && data?.day >= 0 ? data?.day : ''
                    // const date = data && data?.date ? data?.date : ''

                    return (
                    <Grid 
                        md= {12/7}
                        xs= {12/7}
                        key= {index}
                        id= 'calender-box-parent'
                        onClick= {(e) => day && e.target.id === 'calender-box-parent' && handleOpenCalenderModal(day)}
                        item
                        sx= {{
                            minHeight: '120px',
                            borderRight: `1px solid ${theme.palette.divider}`,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'default',
                            flexDirection: 'column',
                            py: 4,
                            px: .5,
                            position: 'relative',
                        }}
                    >
                    <m.div
                        initial={{ opacity: 0, transform: 'translateX(-100%)'}}
                        whileInView={{ opacity: 1, transform: 'translateX(0%)'}}
                        viewport={{ once: true }}
                        key= {index}
                        style= {{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            padding: '5px'
                        }}
                    >
                        <Typography 
                            variant= 'subtitle2' 
                            id= {day}
                            sx= {{
                                textTransform: 'capitalize', 
                                border: sameDay === day && sameMonth && theme.palette.mode === 'dark' && `1px solid ${theme.palette.divider}`,
                                bgcolor: sameDay === day && sameMonth && theme.palette.mode === 'light' && theme.palette.grey[400],
                                height: '25px', width: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                }}
                                >
                            {day}
                        </Typography>
                    </m.div>
                                
                    <EventsComponent events= {data?.events} handleOpenCalenderModal= {handleOpenCalenderModal}/>
                    
                    </Grid>
                )})
            }
        </Grid>
    )
}