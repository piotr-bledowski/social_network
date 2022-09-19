import { useUser } from "../../utils/hooks";
import GroupForm from "./GroupForm";
import GroupList from "./GroupList";


const GroupMenu = () => {
    const user = useUser();

    return (
        <section className="group-menu">
            <GroupForm />
            <GroupList uri={'/api/get_users_groups/' + user} />
        </section>
    )
}

export default GroupMenu;