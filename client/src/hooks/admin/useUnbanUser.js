import { useState } from 'react';
import { toast } from 'sonner'; 
import useBannedUsers from '../../zustand/useBannedUsers';

const useUnbanUser = () => {
    const [loading, setLoading] = useState(false);
    const {bannedUsers,setBannedUsers} = useBannedUsers();
    const unbanUser = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/users/unban/${userId}`, {
                method: 'DELETE', 
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to unban user');
            }

            toast.success('User successfully unbanned');
            setBannedUsers(bannedUsers.filter(user => user.userId !== userId));
        } catch (error) {
            toast.error(error.message || 'Failed to unban user');
        } finally {
            setLoading(false);
        }
    };

    return { loading, unbanUser };
};

export default useUnbanUser;
