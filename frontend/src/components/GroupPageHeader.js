import { useUser } from '../utils/hooks'
import GroupPicForm from './GroupPicForm';

const GroupPageHeader = ({ group }) => {
    const { name, creator, picture } = group;
    const user = useUser();

    const my = user === creator;

    return (
        <section className="group-page-header">
            <img className='group-page-img' src={`http://127.0.0.1:8000${picture}`} />
            {my &&
                <GroupPicForm name={name} />
            }
            <h1>{name}</h1>
            <a href={`/profile/${creator}`} >
                <h3>Initiated by: {creator}</h3>
            </a>
        </section>
    )
}

export default GroupPageHeader;