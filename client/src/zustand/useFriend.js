import {create} from 'zustand';

const useFriend = create((set) => ({
    friendRequests:[],
    setFriendRequests: (friendRequests) => set({friendRequests}),
    requested:null,
    setRequested:(requested) => set({requested}),
    friends:[],
    setFriends:(friends) => set({friends},)
 }))
 
export default useFriend;
