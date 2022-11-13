import {forwardRef, memo} from 'react';
import {Button, Stack, Dialog, DialogActions, Box, DialogTitle, Slide, DialogContent, Typography, TextField, Divider,InputAdornment, Tooltip} from '@mui/material'
import {IconButtonAnimate} from '../../../components'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import EventNoteIcon from '@mui/icons-material/EventNote';
import dayjs from 'dayjs'
import {useSettings} from '../../../hooks'
import ColorPalette from './ColorPalettes'
import {eventFormSchema} from './../../yup-schema/calender'
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';





const CalenderEvent = () => {

    // 
    const {events, setEvents, dispatchEvent, event} = useSettings()
    const {reset, control, handleSubmit} = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(eventFormSchema),
        defaultValues: {
            title: event?.title || '',
            description: event?.description || '',
            startDate: event?.startDate,
            endDate: event?.endDate
        }
    })

  const handleCloseEvent = () => {
    dispatchEvent({type: 'CLOSE'})
    reset()
  }
//   submitting event
const onSubmit = (data) => {
    const newEvents = [...events, data]
    setEvents(prev => newEvents)
    handleCloseEvent()
}

  

  return (
      <Dialog
        open={event?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEvent}
        maxWidth= 'xs'
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <Box>
        <DialogTitle>
            <Stack
                direction= 'row'
                alignItems= 'center'
                // sx= {{mb: 4}}
                justifyContent= 'space-between'
            >
                <Typography variant= 'subtitle1'>
                    Add Event
                </Typography>

                <IconButtonAnimate onClick= {handleCloseEvent}>
                    <ClearIcon />
                </IconButtonAnimate>
            </Stack>
        </DialogTitle>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <Stack spacing={3} alignItems="flex-end">
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                        {...field}
                        fullWidth
                        size='large'
                        variant='outlined'
                        label="Event title"
                        error={Boolean(error)}
                        helperText={error?.message}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                        {...field}
                        fullWidth
                        size='large'
                        label="Description"
                        rows= {5}
                        multiline
                        error={Boolean(error)}
                        helperText={error?.message}
                        />
                    )}
                />

                <Controller
                    name="bgColor"
                    control={control}
                    render={({ field}) => (
                        <ColorPalette 
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                        />
                    )}
                />

                <Stack
                    spacing= {3}
                    sx= {{width: '100%'}}
                    divider= {<Divider orientation= 'horizontal' flexItem />}
                >
                    <Controller
                        name= 'startDate'
                        control= {control}
                        render= {({field, fieldState: {error}}) => (
                            <MobileDateTimePicker
                                {...field}
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                label="Start Date"
                                // onError={console.log}
                                minDate={dayjs('2018-01-01T00:00')}
                                inputFormat="YYYY/MM/DD hh:mm a"
                                mask="____/__/__ __:__ _M"
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                <IconButtonAnimate>
                                                    <EventNoteIcon/>
                                                </IconButtonAnimate>
                                                </InputAdornment>
                                            ),
                                            }}
                                    />
                                )}
                            />
                        )}
                    />
                    <Controller
                        name= 'endDate'
                        control= {control}
                        render= {({field, fieldState: {error}}) => (
                            <MobileDateTimePicker
                                {...field}
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                label="End Date"
                                // onError={console.log}
                                minDate={dayjs('2018-01-01T00:00')}
                                inputFormat="YYYY/MM/DD hh:mm a"
                                mask="____/__/__ __:__ _M"
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                <IconButtonAnimate>
                                                    <EventNoteIcon />
                                                </IconButtonAnimate>
                                                </InputAdornment>
                                            ),
                                            }}
                                    />
                                )}
                            />
                        )}
                    />
                </Stack>
            </Stack>
        
        </DialogContent>
        
        <DialogActions>
            {
                event.update && 
                <Tooltip title="Delete">
                <IconButtonAnimate sx= {{color: 'red'}} size= 'small'>
                    <DeleteIcon />
                </IconButtonAnimate>
                </Tooltip>
            }

            <Box sx={{flexGrow: 1}} />
          <Button onClick= {handleCloseEvent} variant= 'outlined' size= 'small'>cancel</Button>
          <Button type= 'submit' variant= 'contained' size= 'small'>
            {event?.update ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
        </form>
      </Dialog>
  );
}

export default memo(CalenderEvent)



const Transition = forwardRef(function Transition(props,ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });