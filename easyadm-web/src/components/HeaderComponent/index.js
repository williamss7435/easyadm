import { useHistory } from 'react-router-dom';
import {Container, Logo, LogoutButton} from './styles';

export default function HeaderComponent(){
    const history = useHistory();
    function logouthandler(){
        sessionStorage.clear();
        history.push('/');
    }

    return (
        <Container>
            <Logo/>
            <LogoutButton onClick={logouthandler}>
                Sair
            </LogoutButton>
        </Container>
    )

}