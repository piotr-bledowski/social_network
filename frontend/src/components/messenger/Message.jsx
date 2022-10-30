import { formatDate } from "../../utils/helpers";
import { useUser } from "../../utils/hooks";


const Message = ({ message }) => {
    const { sender, receiver, date, text } = message;

    const user = useUser();

    const my = user === sender;

    const userRelatedClass = my ? 'my-message' : 'their-message';

    return (
        <div className={userRelatedClass + ' message'}>
            <p className="message-date">{formatDate(date)}</p>
            <p className="message-text">
                {text}
            </p>
        </div>
    )
}

export default Message;