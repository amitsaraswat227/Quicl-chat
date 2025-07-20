import { create } from 'zustand'


const sawConversation = create((set) => ({
  selectedConversation: null,
   setselectedConversation: (selectedConversation) => set({ selectedConversation}), 
messages:[],
setMessages:(messages)=>set({messages})
}));
export default sawConversation;
