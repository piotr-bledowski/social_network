import { useState } from "react";
import { useParams } from "react-router-dom";
import GroupPageHeader from "../components/GroupPageHeader";
import { useFetch } from "../utils/hooks";
import PostList from '../components/posts/PostList';


const GroupPage = () => {
    const [groupData, setGroupData] = useState(null);
    const { groupName } = useParams();
    setGroupData(useFetch('/api/get_group/' + groupName).data);

    return (
        <>
            <GroupPageHeader group={groupData} />
            <PostList uri={'/api/get_group_posta/' + groupName} />
        </>
    )
}

export default GroupPage;