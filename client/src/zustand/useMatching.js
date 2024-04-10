import {create} from 'zustand';

const useMatching = create((set) => ({
    room:null,
    setRoom: (room) => set({room}),
    roomMessages:[],
    setRoomMessages: (newMessage) => set((state) => ({ roomMessages: [...state.roomMessages, newMessage] })),
    deleteRoomMessages: () => set({ roomMessages: [] }),
 }))
 

export default useMatching;

