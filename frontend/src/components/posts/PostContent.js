import { shortText } from "../../utils/helpers"

const PostContent = ({ data }) => {
    const { id, image, text, detailed } = data;

    console.log(`http://127.0.0.1:8000${image}`);

    if (detailed) return (
        <div className="post-content">
            <p>{text}</p>
            {image &&
                <img src={image} />
            }
        </div>
    )

    return (
        <div className="post-content">
            {shortText(id, image, text)}
            {image &&
                <img src={`http://127.0.0.1:8000${image}`} />
            }
        </div>
    )
}

export default PostContent;