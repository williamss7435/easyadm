
import HeaderComponent from '../../components/HeaderComponent';
import NavbarComponent from '../../components/NavbarComponent';
import ListComponent from '../../components/ListComponent';
import ModalComponent from '../../components/ModalComponent';
import LoadingComponent from '../../components/LoadingComponent';

import {toast} from 'react-toastify';

import {Container, CardBody, CardTitle, MainTitle, CreateButton, Filter} from './styles';
import { useEffect,useState } from 'react';

import DepartmentService from '../../services/DepartmentService';
import UserService from '../../services/UserService';

import { useHistory } from 'react-router-dom';

export default function DepartmentPage(){
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [departmentList, setDepartmentList] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const [name, setName] = useState('');
    const [userId, setUserId] = useState(-1);
    const [office, setOffice] = useState('');
    const [departmentId, setDepartmentId] = useState("-1");
    const [filterDepartment, setFilterDepartment] = useState("-1");
    

    const [showModal, setShowModal] = useState(false);
    const [actionModal, setActionModal] = useState('');
    const [titleModal, setTitleModal] = useState('');

    useEffect(() => {
        (async function loadDataPage() {
            setLoading(true);
            
            const [responseUser, responseDepartments] = await Promise.all([
                UserService.getAll("-1"),
                DepartmentService.getAll(),
            ]);
     
            if(responseUser.success && responseDepartments.success){

                if(responseDepartments.data.length < 1){
                    alert("Antes De Cadastrar um usuário é necessário criar um departamento!")
                    history.push('cost-center');
                    return;
                }

                setUserList(responseUser.data);
                setDepartmentList(responseDepartments.data);
            }
    
            setLoading(false);
        })();
    }, [history]);

    useEffect(() => {
        (async function loadDataPage() {
            setLoading(true);
            
            const response = await UserService.getAll(filterDepartment)     
            if(response.success){
                setUserList(response.data);
            }
    
            setLoading(false);
        })();
    }, [filterDepartment]);

    async function createUser(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!name || name.length < 3){
            toast.error("O nome do usuário deve ter pelo menos 3 caracteres");
            return;
        }

        if(!office || office.length < 3){
            toast.error("O cargo do usuário deve ter pelo menos 3 caracteres");
            return;
        }
       
        if(!departmentId || departmentId === "-1"){
            toast.error("Escolha um departamento");
            return;
        }

        setLoading(true);
        setShowModal(false);

        const response = await UserService.create({
            name,
            office,
            department_id: departmentId,
        });

        if(response.success){
            const userResponse = await UserService.getAll(filterDepartment);
            setUserList(userResponse.data);
            toast.success("usuário criado com sucesso!");

        }else{
            toast.error("Ocorreu um erro ao salvar o usuário");
        }

        setName('');
        setOffice('');
        setLoading(false);
    }

    async function editUser(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!name || name.length < 3){
            toast.error("O nome do usuário deve ter pelo menos 3 caracteres");
            return;
        }

        if(!office || office.length < 3){
            toast.error("O cargo do usuário deve ter pelo menos 3 caracteres");
            return;
        }

        setLoading(true);
        setShowModal(false);

        const response = await UserService.update({
            user_id: userId,
            name,
            office,
            department_id: departmentId,
        });

        if(response.success){
            const userResponse = await UserService.getAll(filterDepartment);
            setUserList(userResponse.data);
            toast.success("Centro de custo Editado com sucesso!");

        }else{
            toast.error("Ocorreu um erro ao salvar o Centro de custo");
        }

        setName('');
        setOffice('');
        setLoading(false);
    }

    async function showModalCreate(){
       setDepartmentId('-1');
       setName('');
       setOffice('');

        setTitleModal('Criar Novo Usuário');
        setActionModal('create');
        setShowModal(true);
       
    }

    async function OnEdit(user){

        setTitleModal(`Editar Usuário`);
        setActionModal('edit');
        setName(user.name);
        setUserId(user.id);
        setOffice(user.office);
        setDepartmentId(user.department_id);
        setShowModal(true);
      
    }

    async function OnDelete(user){
        const confirm = window.confirm(`Tem Certeza que deseja deletar o usuário: ${user.name}`);
        
        if(confirm){
            setLoading(true);

            const response = await UserService.delete(user.id);

            if(response.success){

                const userResponse = await UserService.getAll(filterDepartment);
                setUserList(userResponse.data);
                toast.success("Usuário deletado com sucesso!");

            }else{

                toast.error("Ocorreu um erro ao deletar o Usuário");

            }


            setLoading(false);
        }

    }
    return (
        <Container>
            <HeaderComponent/>
            <NavbarComponent activeItem="user"/>
            {loading && <LoadingComponent/>}

            {showModal && 
                <ModalComponent action={actionModal} onCloseModal={() => {setName(''); setShowModal(false)}}>
                    <p>{titleModal}</p>
                    <form>
                        <label htmlFor="">Nome</label>
                        <input type="text" value={name} onChange={event => setName(event.target.value)}/>
                        <label htmlFor="">Cargo</label>
                        <input type="text" value={office} onChange={event => setOffice(event.target.value)}/>
                        <label htmlFor="">Centro De Custo</label>
                        <select value={departmentId} onChange={(event) => setDepartmentId(event.target.value)}>
                            <option value="-1">Escolha um Departamento</option>
                            {departmentList && departmentList.map(costCenter => (
                                <option key={costCenter.id} value={costCenter.id}>{costCenter.name}</option>
                            ))}
                        </select>
                        {actionModal === 'create' ? 
                            <button onClick={createUser}>Criar</button> 
                            : 
                            <button onClick={editUser}>Editar</button>}
                    </form>
                </ModalComponent>
            }

            <CardBody>
                <CardTitle>
                    <MainTitle>Usuário</MainTitle>
                    <CreateButton onClick={showModalCreate}>Novo Usuário</CreateButton>
                </CardTitle>
                <Filter>
                    Departamento
                    <select value={filterDepartment} onChange={(event) => setFilterDepartment(event.target.value)}>
                        <option value="-1">Todos</option>
                        {departmentList && departmentList.map(costCenter => (
                            <option key={costCenter.id} value={costCenter.id}>{costCenter.name}</option>
                        ))}
                    </select>
                </Filter>
                <ListComponent 
                    title="Descrição"
                    keyExtract="nameFormated" 
                    data={userList}
                    OnEdit={OnEdit}
                    OnDelete={OnDelete}
                />
            </CardBody>
        </Container>
    )

}