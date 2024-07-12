import React, { useState } from 'react';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormWithYup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is Required"),
        lastName: Yup.string().required("Last Name is Required"),
        email: Yup.string().required("Email is Required").email("Invalid email format"),
        phoneNumber: Yup.string().required("Phone Number is required").matches(/^\+[1-9]\d{1,14}$/, "Phone number is not valid"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        age: Yup.number()
            .typeError("Age must be a number")
            .min(18, "You must be at least 18 years old")
            .max(100, "You cannot be older than 100 years")
            .required("Age is required"),
        gender: Yup.string().required("Gender is required"),
        interests: Yup.array().min(1, "Select at least one interest").required("Select at least one interest"),
        birthDate: Yup.date().required("Date of birth is required"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            
            console.log(formData);
            // If validation succeeds, send data to backend
            const response = await axios.post('/api/user/submit-form', formData); 
            console.log('Form Submitted successfully:', response.data);
            navigate("/");

        }

        catch (error) {
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phoneNumber: `+${value}`,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updatedInterests = [...formData.interests];
        if (checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter((interest) => interest !== name);
        }
        setFormData({
            ...formData,
            interests: updatedInterests,
        });
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Enter your first name"
                        onChange={handleChange}
                    />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Enter your last name"
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label>Phone Number:</label>
                    <PhoneInput
                        country={'us'}
                        value={formData.phoneNumber.replace('+', '')}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: '100%' }}
                    />
                    {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        placeholder="Confirm your password"
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        placeholder="Enter your age"
                        onChange={handleChange}
                    />
                    {errors.age && <div className="error">{errors.age}</div>}
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="error">{errors.gender}</div>}
                </div>
                <div>
                    <label>Interests:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="coding"
                            checked={formData.interests.includes("coding")}
                            onChange={handleCheckboxChange}
                        />
                        Coding
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="sports"
                            checked={formData.interests.includes("sports")}
                            onChange={handleCheckboxChange}
                        />
                        Sports
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="reading"
                            checked={formData.interests.includes("reading")}
                            onChange={handleCheckboxChange}
                        />
                        Reading
                    </label>
                    {errors.interests && <div className="error">{errors.interests}</div>}
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        placeholder="Enter your date of birth"
                        onChange={handleChange}
                    />
                    {errors.birthDate && <div className="error">{errors.birthDate}</div>}
                </div>
                <button className="btn"  type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormWithYup;
