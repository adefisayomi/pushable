import * as Yup from 'yup';

export const eventFormSchema = Yup.object().shape({
    title: Yup.string().required('Title of the event is required').min(3),

    description: Yup.string().required('Event description is required').min(10),

    startDate: Yup.date().required('Event start date is required!').min(new Date(), () => (
        'Event start date cannot be less than today"s date!'
    )),

    endDate: Yup.date().required().min( Yup.ref('startDate'), () => (
        `Event end date needs to be after the start date!`
    )),
    bgColor: Yup.string()
  });