import { useFetch } from "../../utils/hooks";

const PostProfileLink = ({ author }) => {
    const { data } = useFetch(`/api/get_profile_pic/${author}`);

    return (
        <a href={'/profile/' + author} >
            <img className="profile-pic" src={`http://127.0.0.1:8000${data.picture}`} />
            <h4 className="post-author">{author}</h4>
        </a>
    )
}

export default PostProfileLink;