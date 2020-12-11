import {Container, ModalBody, ButtonCancel} from './styles';
import {MdCancel} from 'react-icons/md';

export default function ModalComponent({children, onCloseModal, action = 'create'}){
    const buttonColor = action === 'create' ? '#2c74b6' : '#dbb728';


    return (
        <Container buttonColor={buttonColor} >
            <ModalBody>
                <ButtonCancel>
                    <button onClick={() => onCloseModal()}><MdCancel color={buttonColor} size="20"></MdCancel></button>
                </ButtonCancel>
                {children}
            </ModalBody>
        </Container>
    )


}