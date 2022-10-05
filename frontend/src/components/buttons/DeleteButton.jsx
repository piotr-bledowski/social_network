import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpster } from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "../DeleteDialog";
import { showDialog } from "../../utils/helpers";

const DeleteButton = ({ type, id }) => {
    const handleClick = () => {
        showDialog(id);
    }

    return (
        <>
            <button className="delete-btn" onClick={handleClick}>
                <h2>
                    <FontAwesomeIcon icon={faDumpster} />
                </h2>
            </button>
            <DeleteDialog uri={`/api/delete_${type}/${id}`} type={type} id={id} />
        </>
    )
}

export default DeleteButton;