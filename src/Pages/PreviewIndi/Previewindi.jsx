import React, { useEffect, useState } from 'react';
import './previewindi.scss';
import { FaPhone } from 'react-icons/fa';
import { IoMailSharp } from 'react-icons/io5';
import axios from 'axios';
import config from '../../config.json';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Previewindi = () => {
    const [formData, setFormData] = useState([]);

    const { id } = useParams();


    useEffect(() => {
        fetchResume();
    }, [id]);

    const fetchResume = async () => {
        axios.post(`${config.apiUrl}/resumebyid`, { refId: id })
            .then(res => {
                console.log(res);
                setFormData(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const generatePDF = () => {
        const input = document.getElementById('pdf-content');

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('generated.pdf');
        });
    };



    return (
        <div className='PreviewIndi'>
             <button onClick={generatePDF} style={{ top: "30px" }} className='btn btn-info'>Generate</button>
            <button style={{ top: "100px" }} className='btn btn-info'>Edit</button>
            <div className="prevw-wrap">
                <div className="prew-page" id='pdf-content'>

                    <div className="page-pr-header">
                        <h1>{`${formData.firstname} ${formData.lastname}`}</h1>
                        <div className="cont-details">
                            <p>{formData.address}</p>
                            <p><FaPhone /> {formData.phonenumber}</p>
                            <p><IoMailSharp /> {formData.email} </p>
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
                                    <div className="cat-title">EXPERIENCES</div>
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
    )
}

export default Previewindi;