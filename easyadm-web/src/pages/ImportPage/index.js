import HeaderComponent from '../../components/HeaderComponent';
import NavbarComponent from '../../components/NavbarComponent';
import ListComponent from '../../components/ListComponent';
import ModalComponent from '../../components/ModalComponent';
import LoadingComponent from '../../components/LoadingComponent';

import {toast} from 'react-toastify';

import {Container, CardBody, CardTitle, MainTitle, CreateButton, SaveButton} from './styles';
import { useEffect,useState } from 'react';

import DepartmentService from '../../services/DepartmentService';
import ListImportervice from '../../services/ListImportervice';

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
    
    const [showModal, setShowModal] = useState(false);
    const [actionModal, setActionModal] = useState('');
    const [titleModal, setTitleModal] = useState('');

    useEffect(() => {
        (async function loadDataPage() {
            setLoading(true);
            
            const response = await DepartmentService.getAll();

           
            if(response.success){
                if(response.data.length < 1){
                    alert("Antes De Cadastrar uma lista é necessário criar um departamento!")
                    history.push('cost-center');
                    return;
                }


                setDepartmentList(response.data);
            }
    
            setLoading(false);
        })();
    }, [history]);

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

        const list = userList;
        list.push({
            id: list.length,
            name, 
            office,
            department_id: departmentId 
        })
        setUserList(list);

        setName('');
        setOffice('');
        setDepartmentId('-1');
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


        const list = userList.map((user) => {

            if(user.id === userId){
                user.name = name;
                user.office = office;
                user.department_id= departmentId;
            }

            return {...user};
        });
        setUserList(list);

        setName('');
        setOffice('');
        setDepartmentId('-1');
        setLoading(false);
    }

    async function showModalCreate(){
       setDepartmentId('-1');
       setName('');
       setOffice('');

        setTitleModal('Adicionar Novo Usuário');
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

    async function saveList(){
        setLoading(true);

        const response = await ListImportervice.create({
            list: userList
        });

        if(response.success){
            toast.success("Lista Salva Com Sucesso!!");
        }else{
            toast.error("Erro ao salvar a lista");
        }
        
        setUserList([]);
        setLoading(false);
    }

    return (
        <Container>
            <HeaderComponent/>
            <NavbarComponent activeItem="import-list"/>
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
                    <MainTitle>Lista De Usuários</MainTitle>
                    <CreateButton onClick={showModalCreate}>Adicionar Novo Item A Lista</CreateButton>
                </CardTitle>
                <SaveButton disabled={userList.length < 1} onClick={saveList}>Salva Lista</SaveButton>
                <ListComponent 
                    title="Lista"
                    keyExtract="name" 
                    data={userList}
                    OnEdit={OnEdit}
                />
            </CardBody>
        </Container>
    )

}