import Group from "./Group";
import { useFetch } from "../../utils/hooks";

const GroupList = ({ uri }) => {
    const { loading, data, error } = useFetch(uri);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="group-list">
            <h2>Your groups</h2>
            {data.map(group =>
                <Group group={{ ...group }} />
            )}
        </div>
    )
}

export default GroupList;