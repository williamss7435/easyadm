import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    top: 0;
    right: 0;

    display: flex;
    justify-content: center;


    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;
        padding: 5px 15px;

        label {
            color: #888;
            font-size: 13px;
            margin-bottom: 3px;
            margin-top: 10px; 
        }

        input, textarea, select {
            border: 1px solid #c2c2c2;
            height: 25px;
            width: 100%;
            padding-left: 8px;
            margin-top: 5px;
        }

        button {
            color: #fff;
            background: ${(props) => props.buttonColor};
            padding: 8px;
            border-radius: 8px;
            border: none;
            margin-top: 10px;
        }

    }


`;

export const ModalBody = styled.div`
   width: 500px;
   height: 350px;
   background: white;
   box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.4);
   margin-top: 8%;
    p {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
        color: #888;
    }

`;

export const ButtonCancel = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: end;
    padding: 5px 10px;

    button {
        background: none;
        border: none;
    }

`;