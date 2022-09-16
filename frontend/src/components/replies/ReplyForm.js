import { useState } from "react"
import { apiPost } from "../../utils/helpers";
import { useUser } from "../../utils/hooks";


const ReplyForm = ({ comment }) => {
    const [text, setText] = useState('');
    const user = useUser();

    const handleSubmit = () => apiPost('create_reply', 'application/json', { comment: comment, author: user, text: text });

    return (
        <div className="reply-form-div">
            <form onSubmit={handleSubmit} className="reply-form">
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='...' />
                <input className="btn-input" type='submit' value='Reply' />
            </form>
        </div>
    )
}

export default ReplyForm;