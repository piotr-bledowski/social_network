import { useState } from "react"
import { imgApiPost } from "../utils/helpers";

const GroupPicForm = ({ name }) => {
    const [img, setImg] = useState(null);

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('picture', img);
        if (img) imgApiPost(`set_group_pic/${name}`, formData);
    }

    return (
        <form className="group-pic-form" onSubmit={handleSubmit}>
            <input id='group-img-input' onChange={(e) => setImg(e.target.files[0])} type='file' />
            <input className='btn-input' type='submit' value="Change the group's picture" />
        </form>
    )
}

export default GroupPicForm;