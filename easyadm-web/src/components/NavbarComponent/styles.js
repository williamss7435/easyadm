import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    padding-left: 20px;

    a {
        transition: 0.3s;

        :hover{
            filter: brightness(90%);
        }
    }

`;

export const Button = styled(Link)`
    background: ${(props) => props.active ? '#c1c1c1' : "#2c74b6"};
    border: none;
    margin-left: 2px;
    padding: 8px;
    color: ${(props) => props.active ? '#888888' : "#fff"};
`;