import {create} from 'zustand';

const useNotifications = create((set) => ({
    sounds:true,
    setSounds: (sounds) => set({sounds}),
    popUp:true,
    setPopUp: (popUp) => set({popUp}),
    termOfUse:false,
    setTermOfUse: (termOfUse) => set({termOfUse}),
    chatRules:false,
    setChatRules: (chatRules) => set({chatRules}),
 }))
 
export default useNotifications;
