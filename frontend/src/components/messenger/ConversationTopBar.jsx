import { useFetch } from "../../utils/hooks";
import { hideConvo } from "../../utils/helpers";

const ConversationTopBar = ({username}) => {
    const { data } = useFetch(`/api/get_profile_pic/${username}`);

    const handleClickClose = () => {
        hideConvo(username);
    }

    return (
        <section className="convo-top-bar">
            <a href={`/profile/${username}`}>
                <div className="convo-profile-link">
                    <img className="convo-profile-pic" src={`http://127.0.0.1:8000${data.picture}`} />
                    <h3>{username}</h3>
                </div>
            </a>
            <button onClick={handleClickClose} className="convo-close-btn">x</button>
        </section>
    )
}

export default ConversationTopBar;