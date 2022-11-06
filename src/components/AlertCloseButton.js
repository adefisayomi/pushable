import {IconButtonAnimate} from '.'
import { memo } from 'react'
import {useSnackbar} from 'notistack'
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types'


const AlertCloseButton = memo(function AlertCloseButton ({snackbarId}) {

    const {closeSnackbar} = useSnackbar()

    return (
        <IconButtonAnimate onClick={() => closeSnackbar(snackbarId)} size= 'small' color= 'inherit'>
            <CloseIcon />
        </IconButtonAnimate>
    );
  });

AlertCloseButton.prototype = {
    snackbarId: PropTypes.string.isRequired
}

  export default AlertCloseButton