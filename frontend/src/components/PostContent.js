import { shortText } from "../utils/helpers"

const PostContent = ({ data }) => {
    const { img, text, detailed } = data;

    if (detailed) return (
        <div className="post-content">
            <p>{text}</p>
        </div>
    )

    return (
        <div className="post-content">
            {shortText(img, text)}
        </div>
    )
}

export default PostContent;