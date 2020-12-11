import styled from 'styled-components';
import LogoPng from '../../assets/images/logo-easyadm-small.png';

export const Logo = styled.img.attrs({
    src: LogoPng
})`
    width: 50px;
    height: 50px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const LogoutButton = styled.button`
    background-color: #f54242;
    height: 25px;
    width: 100px;
    border: none;
    color: #fff;
    border-radius: 8px;
    
    :hover{
        background-color: #751c1c;
    }

`;