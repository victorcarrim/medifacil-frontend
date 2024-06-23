import PropTypes from 'prop-types';
import { ButtonStyle } from './button.style.ts';

export const Button = ({ bgColor, color, width, text, disabled, ...props }) => {
    return (
        <ButtonStyle
            bgColor={bgColor}
            color={color}
            width={width}
            disabled={disabled}
            {...props}
        >{text}
        </ButtonStyle>
    )
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    width: PropTypes.string,
    disabled: PropTypes.bool
};