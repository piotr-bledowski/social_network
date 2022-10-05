import { hideDialog } from "../utils/helpers";


const DeleteDialog = ({uri, type, id}) => {

    const handleClickYes = () => {
        fetch(uri, {method: 'DELETE'});
        hideDialog(id);
    }

    const handleClickNo = () => {
        hideDialog(id);
    }

    return (
        <div id={`dialog-div-${id}`} className="dialog-div">
            <h3>Are you sure you want to delete this {type}?</h3>
            <div className="dialog-btns">
                <button onClick={handleClickYes}>
                    <h4>Yes</h4>
                </button>
                <button onClick={handleClickNo}>
                    <h4>No</h4>
                </button>
            </div>
        </div>
    )
}

export default DeleteDialog;