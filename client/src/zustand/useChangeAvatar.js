import {create} from 'zustand';

const useChangeAvatar = create((set) => ({
    avatar:null,
    setAvatar: (avatar) => set({avatar}),
 }))
 

export default useChangeAvatar;

