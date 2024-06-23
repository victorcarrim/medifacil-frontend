import styled from "styled-components";
import background from '../../../assets/background.jpg';

export const LayoutBg = styled.div`
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
`

export const LayoutBgContainer = styled.div`
    width: inherit;
    height: inherit;
    background-color: rgba(116, 189, 232, .8);
`
export const LayoutLogoContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    img{
        width: 60%;
        margin: 0 auto;
        margin-top: 100px;
    }

    p {
        font-weight: var(--medium);
        font-size: 20px;
        transform: translate(210px, -64px);
        width: 50%;
    }
`
