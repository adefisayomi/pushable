import Layout from '../../src/layouts';
import { Page } from '../../src/components';
import {useState} from 'react';
import dayjs from 'dayjs';
import {Paper} from '@mui/material';
import {CalenderEvent, CalenderActionBar, CalenderDaysHeader,  CalenderDayBox} from '../../src/sections/dashboard'
import {useSettings} from '../../src/hooks'


export default function Calender() {

    const {event, dispatchEvent} = useSettings()
    const [currDate, setCurrDate] = useState(dayjs(new Date()))
    const handleOpenEvent = (day) => {
      dispatchEvent({
        type: 'OPEN', 
        startDate: dayjs(currDate).set('D', day),
        endDate: dayjs(currDate).set('D', day).add(1, 'day')
      })
    }

    

  return (
    <Page title= "Calender">
      <Paper variant= 'outlined' sx= {{py: 2}}>
        <CalenderActionBar currDate= {currDate} setCurrDate= {setCurrDate} />
        <CalenderDaysHeader currDate= {currDate} />

        <CalenderDayBox currDate= {currDate} handleOpenCalenderModal= {handleOpenEvent} />

        {event?.open && <CalenderEvent />}

      </Paper>
    </Page>
  );
}



// ----------------------------------------------------------------------

Calender.getLayout = (page) => <Layout>{page}</Layout>



