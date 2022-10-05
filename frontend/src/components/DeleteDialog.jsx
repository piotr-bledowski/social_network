import { hideDialog } from "../utils/helpers";


const DeleteDialog = ({uri, type}) => {

    const handleClickYes = () => {
        fetch(uri, {method: 'DELETE'});
        hideDialog();
    }

    const handleClickNo = () => {
        hideDialog();
    }

    return (
        <>
            <div id="screen-darkener" className="screen-darkener"></div>
            <div id="dialog-div" className="dialog-div">
                <h3>Are you sure you want to delete this?</h3>
                <div className="dialog-btns">
                    <button onClick={handleClickYes}>
                        <h4>Yes</h4>
                    </button>
                    <button onClick={handleClickNo}>
                        <h4>No</h4>
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteDialog;