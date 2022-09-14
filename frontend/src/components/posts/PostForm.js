import { useState } from "react";
import { apiPost } from "../../utils/helpers";
import { useUser } from "../../utils/hooks";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const [response, setResponse] = useState('');
    const user = useUser();

    const handleSubmit = () => {
        apiPost('create_post', {
            group: null,
            author: user,
            title: title,
            text: text,
            image: img
        })
    }

    return (
        <div className="post-form-div">
            <form onSubmit={handleSubmit} className="post-form">
                <input value={title} onChange={(e) => setTitle(e.target.value)} id='title-input' type='text' placeholder="Your post's title" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your post's body" />
                {/* <input value={img} onChange={(e) => setImg(e.target.value)} id='img-input' type='file' /> */}
                <input id='img-input' type='file' />
                <input className='btn-input' type='submit' value='Post' />
            </form>
        </div>
    )
}

export default PostForm;