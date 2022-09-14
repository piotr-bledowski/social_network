import { shortText } from "../../utils/helpers"

const PostContent = ({ data }) => {
    const { id, img, text, detailed } = data;

    if (detailed) return (
        <div className="post-content">
            <p>{text}</p>
        </div>
    )

    return (
        <div className="post-content">
            {shortText(id, img, text)}
        </div>
    )
}

export default PostContent;