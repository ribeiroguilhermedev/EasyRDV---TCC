import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { TextFieldReversalProps } from '../../types';

export const TextFieldReversal = ({ value, disabled, setValue }: TextFieldReversalProps) => {
    const [currentValue, setCurrentValue] = useState<number | null>(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target
        value = value.replace(/[^0-9.]+/g, '')

        const floatValue = parseFloat(value)

        if (isNaN(floatValue)) {
            setCurrentValue(null)
            return
        }

        setValue(floatValue)
        setCurrentValue(floatValue)
    }

    return (
        <TextField
            label="Valor a reembolsar"
            onChange={handleChange}
            disabled={disabled}
            value={currentValue}
            size="small"
            variant="outlined"
            InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
            sx={{
                width:'140px'
            }} />
    )
}