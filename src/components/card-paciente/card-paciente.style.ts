import styled from "styled-components";

export const CardPacienteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--dark-blue);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    width: 100%;
    font-weight: var(--medium);
`

export const SearchContainer = styled.div`
    display: flex;
    gap: 2rem;

    a{
        width: 30%;
        text-decoration: none;
    }
`

export const CardPacienteInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;

    span{
        color: #474747;
    }
`

export const CardPacienteButtons = styled.div`
    display: grid;
    gap: 1rem;
    width: 20%;
    margin: 0 1rem;
`