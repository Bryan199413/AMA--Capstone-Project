import {create} from 'zustand';

const useBannedUsers = create((set) => ({
    bannedUsers:[],
    setBannedUsers: (bannedUsers) => set({bannedUsers}),
 }))
 
export default useBannedUsers;
