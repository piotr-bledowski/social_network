import PostList from "../components/posts/PostList";


const HomePage = () => {
    return (
        <>
            <PostList uri={'api/get_all_posts/'} />
        </>
    )
}

export default HomePage;