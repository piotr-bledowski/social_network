import { useState } from "react";
import { useUser } from "../../utils/hooks";
import GroupForm from "./GroupForm";
import GroupList from "./GroupList";


const GroupMenu = () => {
    const user = useUser();
    const [display, setDisplay] = useState(false);

    const handleClick = () => setDisplay(display ? false : true);

    return (
        <section className="group-menu">
            <button onClick={handleClick} className="group-form-display-btn">
                <h2>Create a new group</h2>
            </button>
            {display &&
                <GroupForm /> // GroupForm displayed when display state === true
            }
            <GroupList uri={'/api/get_users_groups/' + user} />
        </section>
    )
}

export default GroupMenu;