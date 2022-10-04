import { shortText } from "../../utils/helpers"

const PostContent = ({ data }) => {
    const { id, image, text, detailed } = data;

    if (detailed) return (
        <div className="post-content">
            <p>{text}</p>
            {image &&
                <img className="post-img" src={`http://127.0.0.1:8000${image}`} />
            }
        </div>
    )

    return (
        <div className="post-content">
            {shortText(id, image, text)}
            {image &&
                <img className="post-img" src={`http://127.0.0.1:8000${image}`} loading='lazy' />
            }
        </div>
    )
}

export default PostContent;