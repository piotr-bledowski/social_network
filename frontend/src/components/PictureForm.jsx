import { useState } from "react";
import { imgApiPost } from "../utils/helpers";

// type is either 'profile' or 'group'
const PictureForm = ({type, name}) => {
    const [img, setImg] = useState(null);

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('picture', img);
        if (img) imgApiPost(`set_${type}_pic/${name}`, formData); // prevent request from being made when no image is selected
    }

    return (
        <form className={`${type}-pic-form`} onSubmit={handleSubmit}>
            <input id={`${type}-img-input`} onChange={(e) => setImg(e.target.files[0])} type='file' />
            <input className='btn-input' type='submit' value={`Change ${type} picture`} />
        </form>
    )
}

export default PictureForm;