import { hideConvo } from "../../utils/helpers";


const Conversation = ({friend}) => {
    const {id} = friend;

    const handleClickClose = () => {
        hideConvo(id);
    }

    return (
        <div id={`convo-${id}`} className="convo">
            <section className="convo-top-bar">
                <button onClick={handleClickClose} className="convo-close-btn">x</button>
            </section>
        </div>
    )
}

export default Conversation;