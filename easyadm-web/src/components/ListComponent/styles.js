import styled from 'styled-components';


export const List = styled.div`
width: 100%;
height: 100px;
padding: 5px 16px;
margin-top: 8px;

p {
    background: #f1f1f1;
    padding: 8px;
    font-weight: bold;
}

ul {
    padding: 8px;
    margin-top: 8px;

    button {
        background: none;
        border: none;
        width: 30px;
    }

    span {
        margin-left: 5px;
    }

    li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;  
    border-bottom: 1px solid #c2c2c2;
    padding-bottom: 5px;
    margin-top: 10px;
    }
}

`;