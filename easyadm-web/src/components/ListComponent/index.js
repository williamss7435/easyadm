import {MdEdit, MdDelete} from 'react-icons/md';
import {List} from './styles';

export default function ListComponent({title, keyExtract, data, OnEdit, OnDelete = null, icon = null}){

    return (
        <List>
            <p>{title}</p>
            <ul>
                {
                    data.map(item => ( <li key={item.id}>
                        <div>
                            <span>{icon && icon}</span>
                            <span>{item[keyExtract]}</span>
                        </div>
                        <div>
                            <button onClick={() => OnEdit(item)}><MdEdit color="#c2c2c2"></MdEdit></button>
                            {OnDelete && <button onClick={() => OnDelete(item)}><MdDelete color="#c2c2c2"></MdDelete></button>}
                        </div>
                    </li>))
                }
            </ul>
    </List>

    )

}