

const GroupPageHeader = ({ group }) => {
    const { name, creator, picture } = group;

    return (
        <section className="group-page-header">
            <img src={`http"//127.0.0.1:8000${picture}`} />
        </section>
    )
}

export default GroupPageHeader;