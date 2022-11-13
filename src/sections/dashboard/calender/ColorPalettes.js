import {Stack, Box, Paper} from '@mui/material'
import { IconButtonAnimate } from '../../../components';
import PropTypes from 'prop-types'
import {blue, red, green, orange, purple, grey} from '@mui/material/colors'
import {useState} from 'react'

ColorPalette.prototype = {
    sx: PropTypes.object,
    small: PropTypes.bool
};


export default function ColorPalette ({sx, onChange}) {


    const [activeColor, setActiveColor] = useState('')

    const handleClick= (color, index) => {
        setActiveColor(index)
        onChange(color[100])
    }


    return (
        <Stack 
            direction= 'row' 
            spacing= {1} alignItems= 'center' justifyContent={'flex-start'} 
            sx= {{...sx, width: '100%', py: 2}} >
        {colorPalets.map((color, index) => (
          <IconButtonAnimate key= {index} size= 'small' onClick= {() => handleClick(color, index)}>
            <Paper
                variant= 'elevation'
                elevation= {5}
                sx= {{
                    borderRadius: '50%',
                    height: 20,
                    width: 20,
                    bgcolor: color && color[600],
                    border: !color && '2px solid grey',
                    '&:hover': {
                        opacity: 0.6
                    }
                }}
            />
            {
                 activeColor === index &&
                <Box 
                sx= {{
                    background: 'none',
                    border: `2px solid ${color[200]}`,
                    borderRadius: '100%', 
                    height: 30,
                    width: 30,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />}
          </IconButtonAnimate>
        ))}
        </Stack>
    )
}


const colorPalets = ['', blue, red, grey, green, orange, purple]