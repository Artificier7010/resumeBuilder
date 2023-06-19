import React, { useEffect, useState } from 'react';
import './homepage.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config.json';

const Homepage = () => {
    const [email, setEmail] = useState("");
    const [works, setWorks] = useState([]);


    const fetchResumes = async () => {
        axios.post(`${config.apiUrl}/getallresumes`, { email: email, limit: 5 })
            .then(response => {
                console.log(response);
                setWorks(response.data);
            }).catch(error => {

            })
    }



    return (
        <div className='Homepage'>
            <div className="homepage-wrap">
                {/* heading */}
                <div class="heading">
                    <h1>Resume Builder</h1>
                    <p>BY ANIMESH VERMA</p>
                </div>

                <div className="banner">
                    <div className="banner-title">
                        <h1>Unlock Your Potential with Our Cutting-Edge Resume Builder</h1>
                        <h3>Craft Your Perfect Resume Today!</h3>
                    </div>

                    <div className="btns">
                        <Link to={'/build'}>Get Started</Link>
                    </div>

                </div>

                <div className="your-resumes">
                    <div className="yr-resumes-wrap">
                        <label htmlFor="">Enter Your Email To See Your Previous Works</label><br />
                        <input onChange={(event) => setEmail(event.target.value)} type="text" className='form-control' placeholder='Enter Email To See Your Projects' name='email' />
                        <br />
                        <button onClick={fetchResumes} className='btn btn-success btn-block'>See My Works</button>
                    </div>

                    <div className="works-wrap">

                        {works.length > 0 ? works.map((work, index) => {
                            return (
                                <div key={index} className="prev-card">
                                    <Link to={`/user/preview/${work.refId}`}>
                                        <img src="https://ik.imagekit.io/dexo68yudb/No_Pic_Added.png?updatedAt=1678054229672" alt="html" />
                                        <p>{work.createdAt}Animesh</p>
                                    </Link>
                                </div>
                            )
                        }) : null}

                    </div>
                </div>

                <div className="foot">
                    <h1>Powered by Impress.ai</h1>

                </div>
            </div>
        </div>
    )
}

export default Homepage