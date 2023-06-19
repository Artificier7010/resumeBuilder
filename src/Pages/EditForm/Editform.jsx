import React, { useEffect, useState } from 'react';
import './editform.scss';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import Qualifiform from '../../Components/QualificationForm/Qualifiform';
import { useDispatch, useSelector } from 'react-redux';
import { addMoreExpFields, addMoreQualifiFields, updateField } from '../../Store/Slices/formSlice';
import Experienceform from '../../Components/ExperienceForm/Experienceform';
import Skillsform from '../../Components/SkiilsForm/Skillsform';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { FaPhone } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMailSharp } from 'react-icons/io5';
import config from '../../config.json';

const Editform = () => {
    const [formData,setFormData]=useState({});
    // const []
    // const formData = useSelector((state) => state.form);
    const {id} =useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(preval=>{
            return {
                ...preval,
                [name]: value
            }
        })
    }

    useEffect(()=>{
        fetchResumeDetails();
    },[id])

    const fetchResumeDetails = async () => {

      axios.post(`${config.apiUrl}/resumebyid`, {refId:id})
        .then(res => {
            dispatch()
        }).catch(err => {
          console.log(err);
        });

    }


    const updateResume=async (updatedData)=>{

        axios.post(`${config.apiUrl}/put/resume`, {id:updatedData._id,updatedData:updatedData})
        .then(res => {
            navigate(`user/preview/${id}`);
        }).catch(err => {
          console.log(err);
        });

        

    }


    console.log("ftredsff",formData);






    return (
        <div className='Editform'>
            <div className="formpage-wrap">

                <div className="heading">
                    <h1>Welcome To Resume Builder</h1>
                </div>

                <div className="form-wrap">


                    <div className="form-section">

                        {/* Personal Details */}
                        {/* ********************** */}
                        <div className="form-title">
                            <h3>Lets Get Started With your Header</h3>
                        </div>

                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="firstname">First Name</label>
                                    <input onChange={(event) => handleFormChange(event)} value={formData.firstname} name='firstname' type="text" className="form-control" id="firstname" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input onChange={(event) => handleFormChange(event)} value={formData.lastname} name='lastname' type="text" className="form-control" id="lastname" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input onChange={(event) => handleFormChange(event)} value={formData.address} name='address' type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input onChange={(event) => handleFormChange(event)} value={formData.phonenumber} name='phonenumber' type="tel" className="form-control" id="phone" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="email">Email</label>
                                    <input onChange={(event) => handleFormChange(event)} value={formData.email} name='email' type="email" className="form-control" id="email" />
                                </div>
                            </div>
                        </form>
                        {/* ################## */}


                        {/* QualiFication Details */}
                        {/* ************************** */}
                        <div className="form-title">
                            <h3>Give Us About Your Qualifications</h3>
                        </div>

                        <form>
                            {formData.qualifications?.map((field, index) => {
                                return (<Qualifiform key={index} field={field} index={index} />)
                            })}
                            <br />
                            <div className="form-row">
                                <div className="form-group col-sm-6">

                                </div>
                                <div className="form-group col-sm-6">
                                    <button type='button' onClick={() => { dispatch(addMoreQualifiFields()) }} className='btn btn-success btn-block'>Add More Fields <BsFillPlusSquareFill /></button>
                                </div>
                            </div>
                        </form>
                        {/* ################## */}


                        {/* Experience Details */}
                        {/* *************************** */}
                        <div className="form-title">
                            <h3>Tell Us About Your Experience</h3>
                        </div>

                        <form>
                            {formData.experiences?.map((field, index) => {
                                return (<Experienceform key={index} field={field} index={index} />)
                            })}
                            <br />
                            <div className="form-row">
                                <div className="form-group col-sm-6">

                                </div>
                                <div className="form-group col-sm-6">
                                    <button type='button' onClick={() => { dispatch(addMoreExpFields()) }} className='btn btn-success btn-block'>Add More Fields <BsFillPlusSquareFill /></button>
                                </div>
                            </div>
                        </form>
                        {/* ################## */}


                        {/* Skills Details */}
                        <div className="form-title">
                            <h3>Skills</h3>
                        </div>

                        <form>
                            <Skillsform />
                        </form>

                        <br /><br />
                        <button onClick={()=>updateResume(formData)} className='btn btn-success btn-block'>Update</button>

                    </div>



                    <div className="preview-section">
                        <h3>Preview</h3>

                        <div className="preview-box">
                            <div className="page">
                                <div className="page-header">
                                    <h4>{`${formData.firstname} ${formData.lastname}`}</h4>
                                    <div className="cont-det">
                                        <p>{formData.address}</p>
                                        <p><FaPhone /> {formData.phonenumber}</p>
                                        <p><IoMailSharp /> {formData.email}</p>
                                    </div>

                                </div>
                                <div className="page-content">
                                    <div className="left">
                                        {formData.skills?.length > 0 ? (
                                            <>
                                                <div className="cat-title">SKILLS</div>

                                                <div className="skillswrp">
                                                    {formData.skills.map((skill, index) => {
                                                        return (
                                                            <span key={index}>{skill} , </span>
                                                        )
                                                    })}

                                                </div>

                                            </>
                                        ) : null}

                                    </div>
                                    <div className="right">
                                        {formData.qualifications?.length > 0 ? (
                                            <>
                                                <div className="cat-title">QUALIFICATIONS</div>
                                                <div className="qualifiwrp">
                                                    {formData.qualifications.map((qual, index) => {
                                                        return (
                                                            <div key={index} className="quali-cont">
                                                                <div className="institute">{qual.degree}</div>
                                                                <p>{qual.institute}</p>
                                                                <p>{`${qual.startYear}-${qual.endYear}`}</p>
                                                                <p>{`${qual.aggregate} %`}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        ) : null}

                                        {formData.experiences?.length > 0 ? (
                                            <>
                                                <div className="cat-title">Experiences</div>
                                                <div className="expwrp">
                                                    {formData.experiences.map((exp, index) => {
                                                        return (
                                                            <div key={index} className="exp-cont">
                                                                <div className="company">{exp.company}</div>
                                                                <p>{exp.designation}</p>
                                                                <p>{`${exp.startYear}-${exp.endYear}`}</p>
                                                                <p>Description :</p>
                                                                <div className="descr" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>

                                        ) : null}

                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Editform;