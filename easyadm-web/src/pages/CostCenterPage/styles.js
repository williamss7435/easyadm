import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    width: 80%;
    height: 100%;
`;

export const CardBody = styled.div`
    background: #fff;
    min-height: 600px;
    box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.4);
    border-radius: 2px;
`;

export const CardTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 16px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
`;

export const MainTitle = styled.p`
    font-size: 24px;
    font-weight: bold;
`;

export const CreateButton = styled.button`
    background: #2c74b6;
    color: #fff;
    border: none;
    padding: 8px;
    border-radius: 4px;
`;

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

export const ListBody = styled.div`

`;