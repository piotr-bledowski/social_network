import { useParams } from "react-router-dom";
import GroupPageHeader from "../components/GroupPageHeader";
import { useUser } from "../utils/hooks";


const GroupPage = () => {
    const { group } = useParams();
    const user = useUser();

    return (
        <>
            <GroupPageHeader group={group} />
        </>
    )
}

export default GroupPage;