import { useGroup } from "../../utils/hooks";

const GroupMemberButton = ({ user, name }) => {
    const { member, setMember } = useGroup();

    const handleClick = () => {
        if (member) {
            fetch(`/api/leave_group/${user}/${name}`, {
                method: 'DELETE'
            });
            setMember(false);
        }
        else {
            fetch(`/api/join_group/${user}/${name}`, {
                method: 'POST'
            });
            setMember(true);
        }
    }

    return (
        <button className="group-member-btn" onClick={handleClick}>
            <h3>{member ? 'Leave' : 'Join'}</h3>
        </button>
    )
}

export default GroupMemberButton;