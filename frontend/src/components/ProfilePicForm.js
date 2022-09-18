import { imgApiPost } from "../utils/helpers";
import { useState } from "react";

const ProfilePicForm = ({ user }) => {
    const [img, setImg] = useState(null);

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('picture', img);
        if (img) imgApiRequest(`set_profile_pic/${user}`, formData); // prevent request from being made when no image is selected
    }

    return (
        <form className="profile-pic-form" onSubmit={handleSubmit}>
            <input id='profile-img-input' onChange={(e) => setImg(e.target.files[0])} type='file' />
            <input className='btn-input' type='submit' value='Change your profile picture' />
        </form>
    )
}

export default ProfilePicForm;