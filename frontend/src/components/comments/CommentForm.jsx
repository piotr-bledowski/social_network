import { useState } from "react";
import { apiPost } from "../../utils/helpers";
import { useUser } from "../../utils/hooks";

const CommentForm = ({ post }) => {
    const [text, setText] = useState('');
    const user = useUser();

    const handleSubmit = () => apiPost('create_comment/', 'application/json', { post: post, author: user, text: text, read: false });

    return (
        <div className="comment-form-div">
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='...' />
                <input className='btn-input' type='submit' value='Comment' />
            </form>
        </div>
    )
}

export default CommentForm;