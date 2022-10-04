import { useState } from "react";
import { imgApiPost } from "../../utils/helpers";
import { useUser } from "../../utils/hooks";

const GroupForm = () => {
    const [name, setName] = useState('');
    const [img, setImg] = useState(null);

    const user = useUser();

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('creator', user);
        formData.append('image', img);

        imgApiPost('create_group/', formData);
    }

    return (
        <div className="group-form-div">
            <form onSubmit={handleSubmit} className="group-form">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="group's name..." id="name-input" />
                <input onChange={(e) => setImg(e.target.files[0])} id='img-input' type='file' />
                <input className='btn-input' type='submit' value='Let there be new community!' />
            </form>
        </div>
    )
}

export default GroupForm;