import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpster } from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "../DeleteDialog";
import { showDialog } from "../../utils/helpers";

const DeleteButton = ({ type, id }) => {
    const handleClick = () => {
        showDialog();
    }

    return (
        <>
            <button className="delete-btn" onClick={handleClick}>
                <h2>
                    <FontAwesomeIcon icon={faDumpster} />
                </h2>
            </button>
            <DeleteDialog uri={`/api/delete_${type}/${id}`} type={type} />
        </>
    )
}

export default DeleteButton;