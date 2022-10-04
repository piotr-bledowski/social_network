import { GroupProvider } from "../contexts/GroupContext"
import GroupPage from "./GroupPage";

// This exists so that GroupPage can use GroupContext
const GroupPageWrapper = () => {
    return (
        <GroupProvider>
            <GroupPage />
        </GroupProvider>
    )
}

export default GroupPageWrapper;