import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducerSlice';

const store = configureStore({
    reducer: {
        auth: reducer
    }
})


export default store;