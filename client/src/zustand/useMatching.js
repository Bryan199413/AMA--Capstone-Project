import {create} from 'zustand';

const useMatching = create((set) => ({
    room:null,
    setRoom: (room) => set({room}),
 }))
 

export default useMatching;