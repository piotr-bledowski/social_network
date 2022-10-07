

const Friend = ({friend}) => {
    const {username} = friend;

    const handleClick = () => {
        
    }

    return (
        <div className="friend">
            <button onClick={handleClick}>
                <img className="friend-pic" />
                <h3 className="friend-name">{username}</h3>
            </button>
        </div>
    )
}

export default Friend;