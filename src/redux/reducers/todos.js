import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        
        editTask: (state, action) => {
            const { id, text, completed } = action.payload;
            const targetTask = state.find(task => task.id === id);
            
            if (targetTask) {
                if (text !== undefined) targetTask.text = text;
                if (completed !== undefined) targetTask.completed = completed;
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