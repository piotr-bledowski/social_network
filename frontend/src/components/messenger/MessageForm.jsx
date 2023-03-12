import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { apiPost } from "../../utils/helpers";
import { useUser } from "../../utils/hooks";
import { useState } from "react";

const MessageForm = ({ user, trigger, setTrigger }) => {
    const currentUser = useUser();

    const [text, setText] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setText('');
        apiPost('send_message/', 'application/json', { sender: currentUser, receiver: user, text: text, read: false });
        setTimeout(() => setTrigger(trigger ? false : true), 100);

    };

    return (
        <div className="message-form-div">
            <form onSubmit={handleSubmit} className="message-form">
                <input value={text} onChange={(e) => setText(e.target.value)} type='text' className="message-field" />
                {/* INPUT CANNOT HAVE CHILDREN, IN CASE LIKE THIS, REPLACE IT WUTH BUTTON!!!!!!! */}
                <button type='submit' className="message-send-btn">
                    <FontAwesomeIcon className="send-icon" icon={faPaperPlane} />
                </button>
            </form>
        </div>
    )
}

export default MessageForm;