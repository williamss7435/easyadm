import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingComponent from '../../components/LoadingComponent';
import LoginService from '../../services/LoginService';
import {Container, LoginBox, Input, SubmitButton, LogoPng, Message} from './styles';
import { useHistory } from "react-router-dom";

export default function LoginPage(){
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    async function loginHandler(event){
        event.preventDefault();
        event.stopPropagation();
        
        setLoading(true);

        if(login === ''){
            toast.error("Login inválido");
            setLoading(false);
            return;
        }

        if(password === ''){
            toast.error("Senha inválida");
            setLoading(false);
            return;
        }

        const response = await LoginService.login({login, password});
        
        if(response.success){
            sessionStorage.setItem('token', response.data.token);
            setLoading(false);
            history.push('/cost-center');
        }else{
            setLoading(false);
            toast.error("Login Ou Senha Inválido");
        }

    }

    return (
        <Container>
            <Message>
                <p>Login e Senha Genérico</p>
                <p>Login: admin / Senha: admin</p>
            </Message>
            {loading && <LoadingComponent/>}
            <LoginBox>
                <LogoPng/>
                <Input 
                    value={login}
                    onChange={(event) => setLogin(event.target.value)} 
                    placeholder="Digite o seu login"
                />
                <Input 
                    type="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} 
                    placeholder="Digite a sua senha"
                />
                <SubmitButton onClick={loginHandler}>ENTRAR</SubmitButton>
            </LoginBox>
        </Container>
    )

}