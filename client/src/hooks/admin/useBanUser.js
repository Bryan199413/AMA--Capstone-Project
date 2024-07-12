import { useState } from 'react';
import { toast } from 'sonner'
import useReportedUsers from '../../zustand/useReportedUsers'

const useBanUser = () => {
    const [loadingBan,setLoading] = useState(false);
    const {reportedUsers,setReportedUsers} = useReportedUsers();

    const banUser = async (userId,reason,description,username,reportedBy) => {
        setLoading(true);
        try {
           const ban = await fetch(`api/users/ban/${userId}`,{
               method:"POST",
               headers:{"Content-Type" : "application/json"},
               body:JSON.stringify({ reason, description, username, reportedBy })
           })
           
           if(ban.ok) {
            setReportedUsers(reportedUsers.filter(user => user.userId !== userId));
            toast.success('User banned successfully');
           }
        } catch (error) {
            toast.error(error.error);
        } finally {
            setLoading(false)
        }
    }
    return {loadingBan,banUser};
}

export default useBanUser
