import PostList from "../components/posts/PostList";
import { useState } from "react";


const HomePage = () => {
    const [display, setDisplay] = useState(false);

    const handleClick = () => setDisplay(display ? false : true);

    return (
        <>
            <button onClick={handleClick} className="form-display-btn"><h2>Share your thoughts</h2></button>
            <PostList uri={'/api/get_all_posts/'} displayForm={display} />
        </>
    )
}

export default HomePage;