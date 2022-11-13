import dayjs from 'dayjs'

export const initialEvent = {
    open: false,
    title: '',
    description: '',
    startDate: new Date(),
    endDate: dayjs().add(1, 'day').toDate(),
    bgColor: '',
    update: false
  }

  export function eventReducer (state= initialEvent, action) {
    if (action.type === 'OPEN') {
        const {type, ...data} = action
        return {...state, ...data, open: true}
    }
    if (action.type === 'CLOSE') {
        state = {...initialEvent}
        return state
    }

    if (action.type === 'UPDATE') {
        const {type, ...data} = action
        return {...state, ...data, open: true, update: true}
    }

    else return state
  }


