
import {Container, Button} from './styles';

export default function MenuComponent({activeItem}){

    return (
        <Container>
            <Button to="/cost-center" active={activeItem === "cost-center"}>CENTRO DE CUSTO</Button>
            <Button to="/department" active={activeItem === "department"}>DEPARTAMENTO</Button>
            <Button to="/user" active={activeItem === "user"}>USUÁRIO</Button>
            <Button to="/import-list" active={activeItem === "import-list"}>IMPORTAR USUÀRIOS</Button>
        </Container>
    )
}