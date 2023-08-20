import { createSlice } from "@reduxjs/toolkit"

const initialState={
    progress:0
}

const Progress=createSlice({
    name:"progressing",
    initialState:initialState,
    reducers: {
        setProgress: (state, action) => {
            return state.progress=action.payload;
        },
    },
})

export const  {setProgress} = Progress.actions
export default Progress.reducer