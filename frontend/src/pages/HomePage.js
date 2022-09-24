import PostList from "../components/posts/PostList";
import { useState } from "react";
import { useUser } from "../utils/hooks";


const HomePage = () => {
    const [display, setDisplay] = useState(false);
    const user = useUser();

    const handleClick = () => setDisplay(display ? false : true);

    return (
        <>
            <button onClick={handleClick} className="form-display-btn"><h2>Share your thoughts</h2></button>
            <PostList uri={`/api/get_feed/${user}`} displayForm={display} group={null} />
        </>
    )
}

export default HomePage;