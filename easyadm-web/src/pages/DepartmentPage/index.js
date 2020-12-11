
import HeaderComponent from '../../components/HeaderComponent';
import NavbarComponent from '../../components/NavbarComponent';
import ListComponent from '../../components/ListComponent';
import ModalComponent from '../../components/ModalComponent';
import LoadingComponent from '../../components/LoadingComponent';

import {toast} from 'react-toastify';

import {Container, CardBody, CardTitle, MainTitle, CreateButton, Filter} from './styles';
import { useEffect,useState } from 'react';
import CostCenterService from '../../services/CostCenterService';
import { MdBusiness } from 'react-icons/md';
import DepartmentService from '../../services/DepartmentService';
import { useHistory } from 'react-router-dom';


export default function DepartmentPage(){
    const history = useHistory();

    const [departmentList, setDepartmentList] = useState([]);
    const [costCenterList, setCostCenterList] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [name, setName] = useState('');
    const [costCenterId, setCostCenterId] = useState("-1");
    const [departmentId, setDepartmentId] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    const [actionModal, setActionModal] = useState('');
    const [titleModal, setTitleModal] = useState('');

    const [filterCostCenterList, setFilterDepartment] = useState("-1");

   
    useEffect(() => {
        (async function loadDataPage() {
            setLoading(true);
            
            const [responseCost, responseDepartments] = await Promise.all([
                CostCenterService.getAll("-1"),
                DepartmentService.getAll(),
            ]);
            

            if(responseCost.success && responseDepartments.success){

                if(responseCost.data.length < 1){
                    alert("Antes De Cadastrar um Departamento é necessário criar um centro de custo!")
                    history.push('cost-center');
                    return;
                }

                setCostCenterList(responseCost.data);
                setDepartmentList(responseDepartments.data);
            }
    
            setLoading(false);
        })();
    }, [history]);

    useEffect(() => {
        (async function loadDataPage() {
            setLoading(true);
            
            const response = await DepartmentService.getAll(filterCostCenterList)     
            if(response.success){
                setDepartmentList(response.data);
            }
    
            setLoading(false);
        })();
    }, [filterCostCenterList]);

    async function createDepartment(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!name || name.length < 3){
            toast.error("O nome do departamento deve ter pelo menos 3 caracteres");
            return;
        }
       
        if(!costCenterId || costCenterId === "-1"){
            toast.error("Escolha um departamento");
            return;
        }

        setLoading(true);
        setShowModal(false);

        const response = await DepartmentService.create({
            name,
            cost_center_id: costCenterId,
        });

        if(response.success){
            const userResponse = await DepartmentService.getAll(filterCostCenterList);
            setDepartmentList(userResponse.data);
            toast.success("Departamento criado com sucesso!");

        }else{
            toast.error("Ocorreu um erro ao salvar o departamento");
        }

        setName('');
        setLoading(false);
    }

    async function editDepartment(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!name || name.length < 3){
            toast.error("A descrição do Centro de custo deve ter caracteres");
            return;
        }

        setLoading(true);
        setShowModal(false);

        const response = await DepartmentService.update({
            department_id: departmentId,
            name,
            cost_center_id: costCenterId
        });

        if(response.success){
            const userResponse = await DepartmentService.getAll(filterCostCenterList);
            setDepartmentList(userResponse.data);
            toast.success("Centro de custo Editado com sucesso!");

        }else{
            toast.error("Ocorreu um erro ao salvar o Centro de custo");
        }

        setName('');
        setLoading(false);
    }

    async function loadCostCenter(){
        setLoading(true);

        const response = await CostCenterService.getAll();

        if(response.success){
            setCostCenterList(response.data);
            setLoading(false);
            return true;
        }else{
            setLoading(false);
            return false;
        }

    }

    async function showModalCreate(){
       setCostCenterId('-1');
       setName('');

       if(costCenterList == null){
            setLoading(true);
        

            if(await loadCostCenter()){

                setTitleModal('Criar Novo Departamento');
                setActionModal('create');
                setShowModal(true);
                
            }else{
                toast.error('Erro ao carregar as informações');
            }

       }else{
            setTitleModal('Criar Novo Departamento');
            setActionModal('create');
            setShowModal(true);
       }
        

    }

    async function OnEdit(department){

        if(costCenterList == null){
            setLoading(true);
        

            if(await loadCostCenter()){

                setTitleModal(`Editar Departamento`);
                setActionModal('edit');
                setName(department.name);
                setCostCenterId(department.cost_center_id);
                setDepartmentId(department.id);
                setShowModal(true);
                
            }else{
                toast.error('Erro ao carregar as informações');
            }

       }else{
            setTitleModal(`Editar Departamento`);
            setActionModal('edit');
            setName(department.name);
            setCostCenterId(department.cost_center_id);
            setDepartmentId(department.id);
            setShowModal(true);
       }

    }

    async function OnDelete(department){
        const confirm = window.confirm(
            `Tem Certeza que deseja deletar o departamento:  ${department.name} ? 
            
            OBS: Todos os usuários desse departamento serão deletados`);
        
        if(confirm){
            
            const response = await DepartmentService.delete(department.id);

            if(response.success){

                const departmentResponse = await DepartmentService.getAll(filterCostCenterList);
                setDepartmentList(departmentResponse.data);
                toast.success("Departamento deletado com sucesso!");

            }else{

                toast.error("Ocorreu um erro ao deletar o departamento");

            }

        }

    }
    return (
        <Container>
            <HeaderComponent/>
            <NavbarComponent activeItem="department"/>
            {loading && <LoadingComponent/>}

            {showModal && 
                <ModalComponent action={actionModal} onCloseModal={() => {setName(''); setShowModal(false)}}>
                    <p>{titleModal}</p>
                    <form>
                        <label htmlFor="">Nome</label>
                        <input type="text" value={name} onChange={event => setName(event.target.value)}/>
                        <label htmlFor="">Centro De Custo</label>
                        <select value={costCenterId} onChange={(event) => setCostCenterId(event.target.value)}>
                            <option value="-1">Escolha um Centro De Custo</option>
                            {costCenterList && costCenterList.map(costCenter => (
                                <option key={costCenter.id} value={costCenter.id}>{costCenter.description}</option>
                            ))}
                        </select>
                        {actionModal === 'create' ? 
                            <button onClick={createDepartment}>Criar</button> 
                            : 
                            <button onClick={editDepartment}>Editar</button>}
                    </form>
                </ModalComponent>
            }

            <CardBody>
                <CardTitle>
                    <MainTitle>Departamento</MainTitle>
                    <CreateButton onClick={showModalCreate}>Novo Departamento</CreateButton>
                </CardTitle>
                <Filter>
                    Centro De Custo
                    <select value={filterCostCenterList} onChange={(event) => setFilterDepartment(event.target.value)}>
                            <option value="-1">Todos</option>
                            {costCenterList && costCenterList.map(costCenter => (
                                <option key={costCenter.id} value={costCenter.id}>{costCenter.description}</option>
                            ))}
                        </select>
                </Filter>
                <ListComponent 
                    title="Nome"
                    keyExtract="name" 
                    data={departmentList}
                    icon={<MdBusiness color="#2c74b6"></MdBusiness>}
                    OnEdit={OnEdit}
                    OnDelete={OnDelete}
                />
            </CardBody>
        </Container>
    )

}