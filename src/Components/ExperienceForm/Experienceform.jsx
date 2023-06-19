import React from 'react';
import './experienceform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addExperienceValue, removeExpFields, updateExpDescription } from '../../Store/Slices/formSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Experienceform = (props) => {
    const formData = useSelector(state => state.form);
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 50;
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean'],
        ],
    };
    const dispatch = useDispatch();

    const {
        field,
        index,
    } = props;

    const handleExperienceChange = async (index, event) => {
        const { name, value } = event.target;
        dispatch(addExperienceValue({ name, value, index }));
    }

    console.log("Form Data",formData);



    return (
        <div className="field-wrap">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="company">Company</label>
                    <input onChange={(event) => handleExperienceChange(index, event)} value={field.company} type="text" className="form-control" id="company" name='company' />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="designation">Designation</label>
                    <input onChange={(event) => handleExperienceChange(index, event)} value={field.designation} type="text" className="form-control" id="designation" name='designation' />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="sdate">Start Year</label>
                    <select
                        name="startYear"
                        value={field.startYear}
                        className='form-control'
                        onChange={(event) => handleExperienceChange(index, event)}
                    >
                        <option value="" disabled>Select Year</option>
                        {Array.from({ length: maxYear - 1900 + 1 }, (_, i) => (
                            <option key={i} value={maxYear - i}>
                                {maxYear - i}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="sdate">End Year</label>
                    <select
                        name="endYear"
                        value={field.endYear}
                        className='form-control'
                        onChange={(event) => handleExperienceChange(index, event)}
                    >
                        <option value="" disabled>Select Year</option>
                        {Array.from({ length: maxYear - 1995 + 1 }, (_, i) => (
                            <option key={i} value={maxYear - i}>
                                {maxYear - i}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="form-group">
                <label htmlFor="company">Description</label>
                <ReactQuill
                    value={field.description}
                    onChange={(value)=>{
                       dispatch(updateExpDescription({value,index})); 
                    }}
                    modules={modules}
                    placeholder="Describe About Your Job"
                />
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">

                </div>
                <div className="form-group col-md-4">

                </div>
                <div className="form-group col-sm-2">
                    <label htmlFor="email">Remove Field</label>
                    <button type="button" onClick={() => dispatch(removeExpFields(index))} className="btn btn-danger btn-block">Delete</button>
                </div>
            </div>

        </div>
    )
}

export default Experienceform