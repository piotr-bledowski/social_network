import { useState } from "react";
import { useParams } from "react-router-dom";
import GroupPageHeader from "../components/GroupPageHeader";
import { useFetch, useUser } from "../utils/hooks";
import PostList from '../components/posts/PostList';


const GroupPage = () => {
    const { name } = useParams();
    const user = useUser();
    const groupData = useFetch('/api/get_group/' + name).data;
    const data = useFetch(`/api/is_member/${user}/${name}`).data.member === 'yes' ? true : false; // this is messy, no idea why it works this way
    const [member, setMember] = useState(data); // so i only use setMember to re-render the thing upon change of membership status
    //console.log(useFetch(`/api/is_member/${user}/${name}`).data.member);
    console.log(data);

    return (
        <>
            <GroupPageHeader group={groupData} member={data} setMember={setMember} />
            <PostList uri={'/api/get_group_posts/' + name} />
        </>
    )
}

export default GroupPage;