import {create} from 'zustand';

const useFriend = create((set) => ({
    friendRequests:[],
    setFriendRequests: (friendRequests) => set({friendRequests}),
    requested:null,
    setRequested:(requested) => set({requested})
 }))
 
export default useFriend;
