import { configureStore } from '@reduxjs/toolkit';
import formSlice from './Slices/formSlice';
import updateSlice from './Slices/updateSlice';


const store = configureStore({
    reducer: {
        form: formSlice,
        update:updateSlice
    }
});

export default store;