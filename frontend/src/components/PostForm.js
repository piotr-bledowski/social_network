import { useState } from "react";
import { useUser } from "../utils/hooks";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const [response, setResponse] = useState('');
    const user = useUser();

    const handleSubmit = () => {

        console.log(JSON.stringify({
            group: null,
            author: user,
            title: title,
            text: text,
            image: img
        }))

        fetch('api/create_post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                group: null,
                author: user,
                title: title,
                text: text,
                image: img
            })
        })
            .then(res => res.json())
            .then(setResponse);

        console.log(response)
    }

    return (
        <div className="post-form-div">
            <form onSubmit={handleSubmit} className="post-form">
                <input value={title} onChange={(e) => setTitle(e.target.value)} id='title-input' type='text' placeholder="Your post's title" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your post's body" />
                {/* <input value={img} onChange={(e) => setImg(e.target.value)} id='img-input' type='file' /> */}
                <input id='img-input' type='file' />
                <input class='btn-input' type='submit' value='Post' />
            </form>
        </div>
    )
}

export default PostForm;