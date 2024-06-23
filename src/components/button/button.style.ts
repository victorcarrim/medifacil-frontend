import styled from "styled-components";

type ButtonStyleProps = {
    color?: string;
    bgColor?: string;
    width?: string;
    disabled?: boolean;
}

export const ButtonStyle = styled.button<ButtonStyleProps>`
    background-color: ${props => props.disabled ? '#ccc' : (props.bgColor || "var(--red)")};
    color: ${props => props.disabled ? '#666' : (props.color || "var(--white)")};
    padding: .7rem 0;
    border-radius: var(--border-radius);
    font-weight: var(--semi-bold);
    width: ${props => props.width || "100%"};
    text-align: center;
    transition: all .3s;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    &:hover {
        filter: ${props => props.disabled ? 'none' : 'brightness(1.1)'};
    }
`;