

const Group = ({ group }) => {
    const { name, picture } = group;
    return (
        <div className="group">
            <a href={`/group/${name}`}>
                <button> {/* this is here so I don't have to apply animation again to <a></a> */}
                    <img className="menu-group-pic" src={`http://127.0.0.1:8000${picture}`} />
                    <h3 className="menu-group-name">{name}</h3>
                </button>
            </a>
        </div>
    )
}

export default Group;