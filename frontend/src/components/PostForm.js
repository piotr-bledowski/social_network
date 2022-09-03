

const PostForm = () => {


    return (
        <div className="post-form-div">
            <form className="post-form">
                <input type='text' placeholder="Your post's title" />
                <textarea id='form-textarea' placeholder="Your post's body" />
                <div id='post-image'>
                    <h4>Image (optional): </h4>
                    <input type='file' />
                </div>
                <input type='submit' value='Post' />
            </form>
        </div>
    )
}

export default PostForm;