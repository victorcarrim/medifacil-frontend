import { PrimaryLayout } from '../../components/layout/primary-layout/primary-layout'
import { HomeContainer, HomeMain } from './home.style.ts'
import { SearchInput } from '../../components/Input/search-input.jsx'
import { CardPaciente } from '../../components/card-paciente/card-paciente.jsx'
import { Button } from '../../components/button/button.jsx'
import { SearchContainer } from '../../components/card-paciente/card-paciente.style.ts'
import { useFetchUsers } from '../../hooks/useFetchUsers.js'
import moment from 'moment';


export const Home = () => {
    const { users } = useFetchUsers('api/user/');
    return (
        <PrimaryLayout>
            <HomeContainer>
                <SearchContainer>
                    <SearchInput />
                    <a href="/cadastro-paciente">
                        <Button
                            text={'Cadastrar Paciente'}
                            width={'100%'} />
                    </a>
                </SearchContainer>
                <HomeMain>
                    {users.map((user) => {
                        return (
                            <CardPaciente
                            name={user.name ? user.name : 'Nome não informado'} 
                            birthDate={moment(user.birthDate).format('DD/MM/YYYY')}
                            cpf={user.cpf}
                            key={user.id}>
                            </CardPaciente>
                        )
                    })}
                </HomeMain>

            </HomeContainer>
        </PrimaryLayout>
    )
}
