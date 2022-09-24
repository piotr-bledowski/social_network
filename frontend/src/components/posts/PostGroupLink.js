import { useFetch } from "../../utils/hooks";


const PostGroupLink = ({ group }) => {
    const { data } = useFetch(`/api/get_group/${group}`);

    return (
        <a href={`/group/${group}`}>
            <img className="post-group-pic" src={`http://127.0.0.1:8000${data.picture}`} />
            <h4 className="post-group">{group}</h4>
        </a>
    )
}

export default PostGroupLink;