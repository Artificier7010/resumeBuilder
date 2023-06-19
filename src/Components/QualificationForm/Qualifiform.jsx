import React from 'react';
import './qualifiform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addQualificationValue, removeQualifiFields } from '../../Store/Slices/formSlice';

const Qualifiform = (props) => {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 50;
    const dispatch = useDispatch();

    const {
        field,
        index,
    } = props;

    const handleQualificationChange = async (index, event) => {
        const { name, value } = event.target;
        dispatch(addQualificationValue({ name, value, index }));
    }



    return (
        <div className="field-wrap">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="institute">Institue</label>
                    <input onChange={(event) => handleQualificationChange(index, event)} value={field.institute} type="text" className="form-control" id="institute" name='institute' />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="degree">Degree</label>
                    <select
                        name="degree"
                        value={field.degree}
                        className='form-control'
                        onChange={(event) => handleQualificationChange(index, event)}
                    >
                        <option value="" disabled>Select Degree</option>
                        <option value="Graduation">UG</option>
                        <option value="Post Graduation">PG</option>
                        <option value="Higher Secondary Education (12th Grade)">Higher Secondary Education (12th Grade)</option>
                        <option value="Secondary Education (10th Grade)">Secondary Education (10th Grade)</option>
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="sdate">Start Year</label>
                    <select
                        name="startYear"
                        value={field.startYear}
                        className='form-control'
                        onChange={(event) => handleQualificationChange(index, event)}
                    >
                        <option value="" disabled>Select Year</option>
                        {Array.from({ length: maxYear - 1995 + 1 }, (_, i) => (
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
                        onChange={(event) => handleQualificationChange(index, event)}
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

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="aggregate">Aggregate(if CGPA Covert It To Percentage)</label>
                    <input onChange={(event) => handleQualificationChange(index, event)} type="number" max={100} min={50} value={field.aggregate} className='form-control' id='aggregate' name='aggregate' />
                </div>
                <div className="form-group col-md-4">

                </div>
                <div className="form-group col-sm-2">
                    <label htmlFor="email">Remove Field</label>
                    <button type="button" onClick={() => dispatch(removeQualifiFields(index))} className="btn btn-danger btn-block">Delete</button>
                </div>
            </div>

        </div>
    )
}

export default Qualifiform;