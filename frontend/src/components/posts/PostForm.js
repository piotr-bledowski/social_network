import { useState } from "react";
import { useUser } from "../../utils/hooks";
import { imgApiPost } from "../../utils/helpers";


const PostForm = ({ group }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const user = useUser();

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('group', group);
        formData.append('author', user);
        formData.append('title', title);
        formData.append('text', text);
        formData.append('image', img);

        imgApiPost('create_post/', formData);
    }

    return (
        <div className="post-form-div">
            <form onSubmit={handleSubmit} className="post-form">
                <input value={title} onChange={(e) => setTitle(e.target.value)} id='title-input' type='text' placeholder="Your post's title" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your post's body" />
                <input onChange={(e) => setImg(e.target.files[0])} id='img-input' type='file' />
                <input className='btn-input' type='submit' value='Post' />
            </form>
        </div>
    )
}

export default PostForm;