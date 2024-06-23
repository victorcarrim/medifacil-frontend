import { NavContainer, NavList } from './nav-bar.style.ts'
import LogoSm from '../../assets/logo-sm.png'
import { Button } from '../button/button.jsx';
import { useContext } from 'react';
import { AuthContext } from '../../assets/api/context/authContext.jsx';

export const Navbar = () => {
  const { isLogged, Logout } = useContext(AuthContext);

  return (
    <NavContainer>
      <div>
        <a href="/home">
          <img src={LogoSm} alt="" />
        </a>
      </div>
      <NavList>
        <a href="/home">
          <li>Home</li>
        </a>
        <a href="/receitas">
          <li>Receitas</li>
        </a>
        <a href="/cadastro-receita">
          <li>Cadastrar Receitas</li>
        </a>

        {isLogged ?
          <Button
            onClick={Logout}
            width='120px'
            text='Sair' />
          : null}
      </NavList>
    </NavContainer>
  )
}
