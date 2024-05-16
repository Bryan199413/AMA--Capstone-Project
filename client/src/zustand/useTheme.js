import {create} from 'zustand';

const storedTheme = localStorage.getItem("theme") || "light";

const useTheme = create((set) => ({
    theme:storedTheme,
    setTheme: (theme) => set({theme}),  
 }))
 
export default useTheme;
