import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { TextFieldReversalProps } from '../../types/types';

export const TextFieldReversal = ({ value, disabled }: TextFieldReversalProps) => {
    const [currentValue, setCurrentValue] = useState<number | null>(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target
        value = value.replace(/[^0-9.]+/g, '')

        const floatValue = parseFloat(value)

        if (isNaN(floatValue)) {
            setCurrentValue(null)
            return
        }

        setCurrentValue(floatValue)
    }

    return (
        <TextField
            label="Valor a reembolsar"
            onChange={handleChange}
            disabled={disabled}
            value={currentValue}
            variant="outlined" />
    )
}