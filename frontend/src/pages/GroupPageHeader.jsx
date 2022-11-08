import { useUser } from '../utils/hooks'
import GroupMemberButton from '../components/buttons/GroupMemberButton';
import PictureForm from '../components/PictureForm';

const GroupPageHeader = ({ group }) => {
    const { name, creator, picture, members } = group;
    const user = useUser();

    const my = user === creator;

    return (
        <section className="group-page-header">
            <img className='group-page-img' src={`http://127.0.0.1:8000${picture}`} />
            {my &&
                <PictureForm type={'group'} name={name} />
            }
            <h1>{name}</h1>
            <a href={`/profile/${creator}`} >
                <h3>Initiated by: {creator}</h3>
            </a>
            <h3>{members} members</h3>
            <GroupMemberButton user={user} name={name} />
        </section>
    )
}

export default GroupPageHeader;