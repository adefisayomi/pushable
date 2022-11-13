import PropTypes from 'prop-types';
import { createContext, useState, useEffect, useReducer } from 'react';
// hooks
import { useLocalStorage } from '../hooks';
// utils
import getColorPresets, { colorPresets } from '../utils/getColorPresets';
// config
import { defaultSettings } from '../config';
import { useSnackbar } from 'notistack';
import {useFirebase} from '../hooks'
import { onAuthStateChanged } from "firebase/auth"
import dayjs from 'dayjs'
import { initialEvent, eventReducer } from './calenderReducer';

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onToggleMode: () => {},
  onToggleDirection: () => {},
  onChangeColorPresets: () => {},
  onResetSetting: () => {},
  setColor: colorPresets[0],
  colorOption: [],
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    ...defaultSettings,
  });

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'ltr' ? 'rtl' : 'ltr',
    });
  };

  const onChangeColorPresets = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onResetSetting = () => {
    setSettings({
      ...defaultSettings,
    });
  };

  // alert------------------------
  const {enqueueSnackbar} = useSnackbar()
  const setAlert = (message, type) => (
    enqueueSnackbar(
      message, { variant: type == 'error' ? 'error' : 'info' }
      )
  )
  // -------------USER---------------------
  const {auth} = useFirebase()
  const [user, setUser] = useState(auth.currentUser)
  useEffect(() => {
    onAuthStateChanged(auth, res => setUser(res ? res : null))
  }, [user, auth])
  // 
  const [events, setEvents] = useState([
    {description: 'this is event 1', title: 'event 1 this is ti make it big', startDate: new Date(), endDate: new Date(), bgColor: 'red'},
    {description: 'this is event 2', bgColor: 'green', title: 'event 2 this is ti make it big', startDate: dayjs().add(4, 'day').toDate(), endDate: new Date()},
    {description: 'this is event 3', bgColor: 'blue',  title: 'event 3 this is ti make it big', startDate: dayjs().add(7, 'day').toDate(), endDate: new Date()},
])
const [event, dispatchEvent] = useReducer(eventReducer, initialEvent)
// const [openEventModal, setOpenEventModal] = useState({
//   open: false,
//   title: '',
//   description: '',
//   startDate: new Date(),
//   endDate: dayjs().add(1, 'day').toDate()
// })

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onToggleMode,

        // Direction
        onToggleDirection,

        // Color Presets
        onChangeColorPresets,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          primary: color.primary.main,
          secondary: color.secondary.main,
        })),

        // Reset Setting
        onResetSetting,
        // ----
        user,
        setAlert,
        events, setEvents,
        event, dispatchEvent
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
