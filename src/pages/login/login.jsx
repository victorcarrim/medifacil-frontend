import { useState, useTransition, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, TextField } from '@mui/material';
import { SecondaryLayout } from '../../components/layout/secondary-layout/secondary-layout';
import { ButtonsContainer, LoginContainer, LoginForm } from './login.style.ts';
import { Button } from '../../components/button/button.jsx';
import { AuthContext } from '../../assets/api/context/authContext.jsx';

export const Login = () => {
  const [formData, setFormData] = useState({ cpf: '', password: '' });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { UserLogin, isLogged } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await UserLogin({
          cpf: formData.cpf,
          password: formData.password
        });

        if ((response.status === 200 || response.status === 204) && response.data.token) {
          setSuccess('Usuário logado com sucesso!');
        } else {
          setError('Erro ao logar o usuário. Tente novamente.');
          
        }
      } catch (error) {
        console.error('Erro ao logar o usuário:', error);
        setError('Erro ao logar o usuário. Tente novamente.');
      }
    });
  };

  if (isLogged) return <Navigate to={'/home'} />;
  return (
    <SecondaryLayout>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              htmlFor={'cpf'}
              label={'CPF'}
              placeholder={'Digite seu CPF'}
              name={'cpf'}
              type={'text'}
              sx={{ width: '100%', backgroundColor: 'var(--blueish-gray)', borderRadius: 'var(--border-radius)' }}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              htmlFor={'senha'}
              label={'Senha'}
              placeholder={'Digite sua senha'}
              name={'password'}
              type={'password'}
              sx={{ width: '100%', backgroundColor: 'var(--blueish-gray)', borderRadius: 'var(--border-radius)' }}
              onChange={handleChange}
            />
          </div>
          <ButtonsContainer>
            <Button
              type="submit"
              text={'Entrar'}
              disabled={isPending}
            />
            <Button
              text={'Cadastro Profissional de Saúde'}
              onClick={() => navigate('/cadastro-saude')}
            />
          </ButtonsContainer>

          {success && <Alert severity='success'>{success}</Alert>}
          {error && <Alert severity='error'>{error}</Alert>}
        </LoginForm>
      </LoginContainer>
    </SecondaryLayout>
  );
};
