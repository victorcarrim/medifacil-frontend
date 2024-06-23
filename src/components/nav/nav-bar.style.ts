import styled from "styled-components";

export const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1.5rem;
    background: var(--light-blue);
`
export const NavList = styled.ul`
    display: flex;
    gap: 1rem;

    a{all: unset;}

    li {
        list-style: none;
        padding: 1rem;
        font-weight: var(--semi-bold);
        border-radius: var(--border-radius);
        transition: all .3s;

        &:hover {
            cursor: pointer;
            background-color: var(--dark-blue);
        }
    }
`