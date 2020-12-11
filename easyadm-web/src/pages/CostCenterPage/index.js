
import HeaderComponent from '../../components/HeaderComponent';
import NavbarComponent from '../../components/NavbarComponent';
import ListComponent from '../../components/ListComponent';
import ModalComponent from '../../components/ModalComponent';
import LoadingComponent from '../../components/LoadingComponent';

import {toast} from 'react-toastify';

import {Container, CardBody, CardTitle, MainTitle, CreateButton} from './styles';
import { useEffect,useState } from 'react';
import CostCenterService from '../../services/CostCenterService';
import { MdBusiness } from 'react-icons/md';


export default function CostCenterPage(){
    const [costCentersList, setCostCenterList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [description, setDescription] = useState('');
    const [costCenterId, setCostCenterId] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    const [actionModal, setActionModal] = useState('');
    const [titleModal, setTitleModal] = useState('');

    async function loadCostCenter() {
        setLoading(true);
        const response =  await CostCenterService.getAll();
        
        if(response.success){
            setCostCenterList(response.data);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadCostCenter();
    }, []);

    async function createCostCenter(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!description || description.length < 3){
            toast.error("A descrição do Centro de custo deve ter caracteres");
        }

        setLoading(true);
        setShowModal(false);

        const response = await CostCenterService.create({
            description
        });

        if(response.success){
            loadCostCenter();
            toast.success("Centro de custo criado com sucesso!");

        }else{
            toast.error("Ocorreu um erro ao salvar o Centro de custo");
        }

        setDescription('');
        setLoading(false);
    }

    async function editCostCenter(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!description || description.length < 3){
            toast.error("A descrição do Centro de custo deve ter caracteres");
        }

        setLoading(true);
        setShowModal(false);

        const response = await CostCenterService.update({
            description,
            cost_center_id: costCenterId
        });

        if(response.success){
            loadCostCenter();
            toast.success("Centro de custo Editado com sucesso!");

        }else{
            toast.error("Ocorreu um erro ao salvar o Centro de custo");
        }

        setDescription('');
        setLoading(false);
    }

    function showModalCreate(){
        setTitleModal('Criar Novo Centro De Custo');
        setActionModal('create');
        setShowModal(true);

    }

    function OnEdit(costCenter){

        setTitleModal(`Editar Centro De Custo`);
        setActionModal('edit');
        setDescription(costCenter.description);
        setCostCenterId(costCenter.id);
        setShowModal(true);


    }

    async function OnDelete(costCenter){
        const confirm = window.confirm(
            `Tem Certeza que deseja deletar o Centro de Custo:  ${costCenter.description} ? 
            
            OBS: Todos os departamentos e usuários desse centro de custo serão deletados`);
        
        if(confirm){
            
            const response = await CostCenterService.delete(costCenter.id);

            if(response.success){

                const costCenterResponse = await CostCenterService.getAll();
                setCostCenterList(costCenterResponse.data);
                toast.success("Centro de custo deletado com sucesso!");

            }else{

                toast.error("Ocorreu um erro ao deletar o centro de custo");

            }

        }

    }
    
    return (
        <Container>
            <HeaderComponent/>
            <NavbarComponent activeItem="cost-center"/>
            {loading && <LoadingComponent/>}

            {showModal && 
                <ModalComponent action={actionModal} onCloseModal={() => {setDescription(''); setShowModal(false)}}>
                    <p>{titleModal}</p>
                    <form>
                        <label htmlFor="">Descrição</label>
                        <input type="text" value={description} onChange={event => setDescription(event.target.value)}/>
                        {actionModal === 'create' ? 
                            <button onClick={createCostCenter}>Criar</button> 
                            : 
                            <button onClick={editCostCenter}>Editar</button>}
                    </form>
                </ModalComponent>
            }

            <CardBody>
                <CardTitle>
                    <MainTitle>Centro De Custo</MainTitle>
                    <CreateButton onClick={showModalCreate}>Novo Centro de Custo</CreateButton>
                </CardTitle>
                <ListComponent 
                    title="Descrição"
                    keyExtract="description" 
                    data={costCentersList}
                    icon={<MdBusiness color="#2c74b6"></MdBusiness>}
                    OnEdit={OnEdit}
                    OnDelete={OnDelete}
                />
            </CardBody>
        </Container>
    )

}