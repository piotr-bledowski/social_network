import { useState } from "react";
import { useParams } from "react-router-dom";
import GroupPageHeader from "../components/GroupPageHeader";
import { useFetch } from "../utils/hooks";
import PostList from '../components/posts/PostList';


const GroupPage = () => {
    const { name } = useParams();
    const groupData = useFetch('/api/get_group/' + name).data;

    return (
        <>
            <GroupPageHeader group={groupData} />
            <PostList uri={'/api/get_group_posts/' + name} />
        </>
    )
}

export default GroupPage;