import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupPageHeader from "../components/GroupPageHeader";
import { useFetch, useGroup, useUser } from "../utils/hooks";
import PostList from '../components/posts/PostList';


const GroupPage = () => {
    const { name } = useParams();
    const user = useUser();
    const groupData = useFetch('/api/get_group/' + name).data;
    const data = useFetch(`/api/is_member/${user}/${name}`).data.member === 'yes' ? true : false; // useFetch needs to be here, not inside useEffect, cause hook rules
    const { member, setMember } = useGroup();

    useEffect(() => {
        setMember(data);
    }, [data]); // useEffect kinda fixes this by updating member when data finally gets the actual value

    return (
        <>
            <GroupPageHeader group={groupData} />
            <PostList uri={'/api/get_group_posts/' + name} displayForm={member} group={name} />
        </>
    )
}

export default GroupPage;