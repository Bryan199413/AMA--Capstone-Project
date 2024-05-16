import {create} from 'zustand';

const useBlockedUsers = create((set) => ({
    blockedUsers:[],
    setBlockedUsers: (blockedUsers) => set({blockedUsers}),
 }))
 
export default useBlockedUsers;
