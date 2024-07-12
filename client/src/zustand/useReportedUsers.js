import {create} from 'zustand';

const useReportedUsers = create((set) => ({
    reportedUsers:[],
    setReportedUsers: (reportedUsers) => set({reportedUsers}),
 }))
 
export default useReportedUsers;
