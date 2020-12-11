import styled from 'styled-components';

import Logo from '../../assets/images/logo-easyadm-white.png';

export const LogoPng = styled.img.attrs({
    src: Logo
})`
    width: 30%;
    display: flex;
    align-self: center;
    margin-bottom: 16px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height:100vh;

    background: #0c3050;

`;

export const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    border-radius: 8px;
    padding: 5px 15px;
`;

export const Input = styled.input`
    background: rgba(0, 0, 0, 0.5);    
    border: none;
    border-radius: 8px;
    height: 40px;
    color: #fff;
    padding-left: 8px;
    margin-bottom: 8px;
`;

export const SubmitButton = styled.button`
    background: #3316F5;
    border: none;
    height: 40px;
    border-radius: 8px;
    color: #fff;
    box-shadow: 1px 3px 3px rgba(0, 0, 0 , 0.6);
    margin-top: 6px;
    transition: 0.6s;

    &:hover{
        background: #3b2aaf;
        color: #cecece;
    }

`;

export const Message = styled.div`
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    margin-top: 15px;
    color: #fff;
    border-radius: 8px;
    padding: 8px;
    font-size: 16px;
    text-align: center;
`;
