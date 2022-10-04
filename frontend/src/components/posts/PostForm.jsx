import { useState } from "react";
import { useUser } from "../../utils/hooks";
import { imgApiPost } from "../../utils/helpers";


const PostForm = ({ group }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [submitBtnText, setSubmitBtnText] = useState(group ? 'for the group members' : 'for your friends');
    const user = useUser();

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('group', group);
        formData.append('author', user);
        formData.append('title', title);
        formData.append('text', text);
        formData.append('image', img);
        formData.append('public', isPublic);

        imgApiPost('create_post/', formData);
    }

    const handleClick = (e) => {
        e.preventDefault(); // This prevents the form from hiding on click / resetting

        if (isPublic) {
            setIsPublic(false);
            if (group) {
                setSubmitBtnText('for the group members');
            }
            else {
                setSubmitBtnText('for your friends');
            }
        }
        else {
            setIsPublic(true);
            setSubmitBtnText('for everyone');
        }
    }

    return (
        <div className="post-form-div">
            <form onSubmit={handleSubmit} className="post-form">
                <input value={title} onChange={(e) => setTitle(e.target.value)} id='title-input' type='text' placeholder="Your post's title" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your post's body" />
                <input onChange={(e) => setImg(e.target.files[0])} id='img-input' type='file' />
                <button onClick={handleClick} className="public-private-button">{isPublic ? 'Make it private' : 'Make it public'}</button>
                <input className='btn-input' type='submit' value={`Post ${submitBtnText}`} />
            </form>
        </div>
    )
}

export default PostForm;