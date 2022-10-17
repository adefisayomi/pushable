import {IconButtonAnimate} from '.'
import { memo } from 'react'
import {useSnackbar} from 'notistack'
import CloseIcon from '@mui/icons-material/Close';


const AlertCloseButton = memo(function AlertCloseButton ({snackbarId}) {

    const {closeSnackbar} = useSnackbar()

    return (
        <IconButtonAnimate onClick={() => closeSnackbar(snackbarId)} size= 'small'>
            <CloseIcon fontSize='small' />
        </IconButtonAnimate>
    );
  });

  export default AlertCloseButton