import { useEffect } from 'react';
import { useSocketContext } from '../../context/SocketContext';
import useLogout from '../useLogout';

const useListenBanUser = () => {
    const { socket } = useSocketContext();
    const { logout } = useLogout();

    useEffect(() => {
        socket?.on("banUser", () => {
            console.log("user")
            logout();
        });    
    
        return () => socket?.off("banUser");
    }, [socket, logout]);
}

export default useListenBanUser;
