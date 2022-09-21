import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupPageHeader from "../components/GroupPageHeader";
import { useFetch, useGroup, useUser } from "../utils/hooks";
import PostList from '../components/posts/PostList';


const GroupPage = () => {
    const { name } = useParams();
    const user = useUser();
    const groupData = useFetch('/api/get_group/' + name).data;
    const data = useFetch(`/api/is_member/${user}/${name}`).data.member === 'yes' ? true : false; // this is messy, no idea why it works this way, state won't take the final (actual) value
    const { member, setMember } = useGroup();

    useEffect(() => {
        setMember(data);
    }, [data]); // useEffect kinda fixes this by updating member when data finally gets the actual value

    return (
        <>
            <GroupPageHeader group={groupData} member={member} setMember={setMember} />
            <PostList uri={'/api/get_group_posts/' + name} displayForm={member} />
        </>
    )
}

export default GroupPage;