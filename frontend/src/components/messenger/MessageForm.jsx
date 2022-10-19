import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MessageForm = ({user}) => {


    const handleSubmit = () => {

    }

    return (
        <div className="message-form-div">
            <form className="message-form">
                <input type='text' className="message-field" />
                {/* INPUT CANNOT HAVE CHILDREN, IN CASE LIKE THIS, REPLACE IT WUTH BUTTON!!!!!!! */}
                <button type='submit' className="message-send-btn">
                    <FontAwesomeIcon className="send-icon" icon={faPaperPlane} />
                </button>
            </form>
        </div>
    )
}

export default MessageForm;