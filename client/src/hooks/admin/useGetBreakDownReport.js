import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGetBreakDownReport = (userId) => {
    const [loadingBreakDown, setLoading] = useState(false);
    const [breakDown, setBreakDown] = useState(null);

    useEffect(() => {
        if (!userId) return;
        
        const getBreakDownReport = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/users/breakdownReport/${userId}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setBreakDown(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        getBreakDownReport();
    }, [userId]);

    return { loadingBreakDown, breakDown };
};

export default useGetBreakDownReport;
