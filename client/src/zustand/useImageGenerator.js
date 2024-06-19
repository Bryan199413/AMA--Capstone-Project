import {create} from 'zustand';

const useImageGenerator = create((set) => ({
    isOpenImageGenerator:false,
    setIsOpenImageGenerator: (isOpenImageGenerator) => set({isOpenImageGenerator}),
   
 }))
 
export default useImageGenerator;
