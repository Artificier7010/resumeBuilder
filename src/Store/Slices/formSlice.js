import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        firstname: "",
        lastname: "",
        address: "",
        phonenumber: "",
        email: "",
        qualifications: [
            { institute: "", degree: "", startYear: "", endYear: "" ,aggregate:""}
        ],
        experiences:[
            {company:"",designation:"",startYear:"",endYear:"", description:""}
        ],
        skills:[]
    },
    reducers: {
        updateField(state, action) {
            const { name, value } = action.payload;
            state[name] = value;
        },
        addQualificationValue(state, action) {
            const { name, value, index } = action.payload;
            state.qualifications[index][name] = value;
        },
        addMoreQualifiFields(state, action) {
            const field = { institute: "", degree: "", startYear: "", endYear: "",aggregate:"" };
            const updatedQualifications = [...state.qualifications, field];
            state.qualifications = updatedQualifications;
        },
        removeQualifiFields(state, action) {
            state.qualifications.splice(action.payload, 1);
        },
        addExperienceValue(state, action) {
            const { name, value, index } = action.payload;
            state.experiences[index][name] = value;
        },
        addMoreExpFields(state, action) {
            const field = {company:"",designation:"",startYear:"",endYear:"", description:""};
            const updatedExperiences = [...state.experiences, field];
            state.experiences = updatedExperiences;
        },
        removeExpFields(state, action) {
            state.experiences.splice(action.payload, 1);
        },
        updateExpDescription(state,action){
            const {index,value}=action.payload;
            state.experiences[index].description=value;
        },
        addSkills(state,action){
            state.skills=[...state.skills,action.payload]
        },
        removeSkills(state,action){
            state.skills.splice(action.payload, 1);
        },
        resetFormData(state,action){
            return {
                firstname: "",
                lastname: "",
                address: "",
                phonenumber: "",
                email: "",
                qualifications: [
                    { institute: "", degree: "", startYear: "", endYear: "" ,aggregate:""}
                ],
                experiences:[
                    {company:"",designation:"",startYear:"",endYear:"", description:""}
                ],
                skills:[]
            }
        }

    }
})

export default formSlice.reducer;
export const { updateField, resetFormData, addQualificationValue,addSkills,removeSkills, addMoreQualifiFields,removeQualifiFields,addExperienceValue,addMoreExpFields,removeExpFields,updateExpDescription } = formSlice.actions;