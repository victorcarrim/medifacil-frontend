import React from 'react'
import { InputContainer, InputStyle, LabelStyle } from './input.style.ts'

export const Input = ({ name, placeholder, label, type, htmlFor, ...props }) => {
    return (
        <InputContainer>
            <LabelStyle htmlFor={htmlFor}>{label}</LabelStyle>
            <InputStyle
                type={type}
                name={name}
                placeholder={placeholder}
                {...props}
            />
        </InputContainer>
    )
}
