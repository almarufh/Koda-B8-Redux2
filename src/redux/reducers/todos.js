import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { 
        id: "1", 
        text: "Makan Malam", 
        completed: false 
    }
];

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        
        editTask: (state, action) => {
            const { id, text } = action.payload;
            const editTask = state.find(task => task.id === id);
            if (editTask) {
                editTask.text = text;
            }
        },
        
        removeTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        }
    }
});

export default todosSlice.reducer;
export const { 
    addTask, 
    editTask, 
    removeTask 
} = todosSlice.actions;