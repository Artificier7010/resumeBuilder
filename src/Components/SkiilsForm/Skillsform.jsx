import React, { useState } from 'react';
import './skillsform.scss';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addSkills } from '../../Store/Slices/formSlice';

const Skillsform = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [tags, setTags] = useState([]);
    const formData=useSelector(state=>state.form);
    const dispatch=useDispatch();

    const skills = [
        'Programming Languages',
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'C#',
        'Ruby',
        'PHP',
        'Swift',
        'Go',
        'Rust',
        'TypeScript',
        'Kotlin',
        'Scala',
        'Haskell',
        'Perl',
        'Shell Scripting',
        'SQL',
        'HTML',
        'CSS',
        'Frameworks/Libraries',
        'React',
        'Angular',
        'Vue.js',
        'Node.js',
        'Express.js',
        'Django',
        'Ruby on Rails',
        'Laravel',
        'Spring Boot',
        'ASP.NET',
        'Flutter',
        'Software/Tools',
        'Git',
        'GitHub',
        'GitLab',
        'Jira',
        'VS Code',
        'IntelliJ IDEA',
        'Eclipse',
        'Docker',
        'Kubernetes',
        'AWS',
        'Azure',
        'Google Cloud Platform (GCP)',
        'Heroku',
        'Firebase',
        'Database',
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Oracle',
        'Microsoft SQL Server',
        'Cloud Services',
        'Amazon Web Services (AWS)',
        'Microsoft Azure',
        'Google Cloud Platform (GCP)',
        'Firebase',
        'Serverless Computing',
        'Containerization',
        'Infrastructure as Code (IaC)',
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);


        // Filter skills based on user input
        const filteredSuggestions = skills.filter(skill =>
            skill.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleTagAdd = (tag) => {
       dispatch(addSkills(tag))
        setInputValue('');
        setSuggestions([]);
    };

    return (
        <div className='skillsForm'>

            <div className="skills-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter skills..."
                />
                {suggestions.length > 0 ? (
                    <ul className='suggestions-list'>
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleTagAdd(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                ) : null}
                {formData.skills.length > 0 ? (
                    <div className='tags'>
                        {formData.skills.map((tag, index) => (
                            <span key={index} className="tag">
                                {console.log(tag.substring(0, 8))}
                                {`${tag.substring(0, 8)}...`}
                                <button><FaTimes /></button>
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>


        </div>
    );
}

export default Skillsform;