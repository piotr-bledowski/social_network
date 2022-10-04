import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumpster } from "@fortawesome/free-solid-svg-icons"

const DeleteButton = ({ type, id }) => {
    const handleClick = () => {
        fetch(`/api/delete_${type}/${id}`, {
            method: 'DELETE'
        });
    }

    return (
        <button className="delete-btn" onClick={handleClick}>
            <h2>
                <FontAwesomeIcon icon={faDumpster} />
            </h2>
        </button>
    )
}

export default DeleteButton;