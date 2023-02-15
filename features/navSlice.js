import {createSlice} from "@reduxjs/toolkit"
const navSlice=createSlice({
    name:"nav",
    initialState:{
        origin:null,
        destination:null,
        travelTimeInformation:null
    },
    reducers:{
        setOrigin:(state,action)=>{
            state.origin=action.payload
        },
        setDestination:(state,action)=>{
            state.destination=action.payload
        },
        setTravelTimeInformation:(state,action)=>{
            state.travelTimeInformation=action.payload
        }
    }
})
export const {setOrigin,setDestination,setTravelTimeInformation}=navSlice.actions
export default navSlice.reducer