
import React, { useState, useEffect, useContext } from "react";
import { GlobalStateContext } from "../UseContextComponents/GlobalStateProvider";
import Select from 'react-select';
import useGet from "../../Hooks/UseGet";
import UsePost from "../../Hooks/UsePost";
import {  showPopup } from "../../Components/Notification";
import Payment from "../../Hooks/Payment";

const Register = () => {
    const { showRegisterForm, closeRegisterForm, bootcampId, setBootcampId } = useContext(GlobalStateContext);
    const { fetchData, data } = useGet(`${process.env.REACT_APP_BACKEND_URL}/data/bootcampOption`);
    const { post: checkRegister } = UsePost(`${process.env.REACT_APP_BACKEND_URL}/data/registerCheck`);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bootcamp, setBootCamp] = useState('');
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [amount,setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchData();
    }, [showRegisterForm]);

    useEffect(() => {
        if (data) {
            const formattedOptions = data.map((i) => ({
                label: i.title,
                value: i.id,
                amount:i.amount
            }));
            setOptions(formattedOptions);
            if (bootcampId !== 0) {
                const selectedBootcamp = formattedOptions.find((x) => x.value === bootcampId);
                setBootCamp(selectedBootcamp);
                setAmount(selectedBootcamp.amount)
            }
        }
    }, [data]);
   

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#22c55e' : '#d1d5db',
            outline: 'none',
            boxShadow: 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#22c55e' : '#d1d5db'
            },
            borderWidth: '2px',
            paddingTop: '0.8rem',
            paddingBottom: '0.8rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            borderRadius: '0.375rem'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#000000'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#d1d5db'
        })
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = "Invalid email address";
        }
        if (!validatePhone(phone)) {
            newErrors.phone = "Invalid phone number";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsLoading(true);
                const responseData = await checkRegister({
                    email,
                    bootcampId: bootcamp.value
                });
                if (responseData.success) {
                    Payment({
                        name,
                        email,
                        phone,
                        bootcampId: bootcamp.value
                    }, (messages) => {
                       
                        showPopup({success:true,message:messages.data.message})
                        resetForm();
                        closeRegisterForm();
                        setIsLoading(false);
                    }, (errorMessage) => {
                        showPopup({success:false,message:errorMessage})
                        setIsLoading(false);
                        
                    });
                } else {
                    newErrors.email = "Email address already registered";
                    setErrors(newErrors);
                    setIsLoading(false);
                }
            } catch (error) {
                setErrors({ general: 'Registration failed' });
                setIsLoading(false);
            }
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setBootCamp('');
        setErrors({});
        setBootcampId(0);
    };

    return (
        <>
           
            {
                showRegisterForm ? (
                    <div className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                        <form onSubmit={handleRegister} className="bg-white w-full h-max sm:w-[580px]  rounded-lg p-6 font-redhat flex flex-col space-y-4 slide-in-left">
                            <span className="text-[#545454] font-semibold text-base">REGISTER FORM</span>
                            <label className="relative">
                                <input
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full py-4 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500 transition-colors duration-200"
                                />
                                <span className={`text-xl absolute text-gray-300 left-0 top-4 mx-6 px-2 transition duration-200 name ${name !== '' ? "bg-white transform -translate-y-7 -translate-x-4 scale-75" : ""}`}>
                                    Name
                                </span>
                            </label>
                            <label className="relative">
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full py-4 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500 transition-colors duration-200"
                                />
                                <span className={`text-xl absolute text-gray-300 left-0 top-4 mx-6 px-2 transition duration-200 name ${email !== '' ? "bg-white transform -translate-y-7 -translate-x-4 scale-75" : ""}`}>
                                    Email
                                </span>
                                {errors.email && <p className="text-red-500">{errors.email}</p>}
                            </label>
                            <label className="relative">
                                <input
                                    name="phone"
                                    type="text"
                                    value={phone}
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full py-4 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500 transition-colors duration-200"
                                />
                                <span className={`text-xl absolute text-gray-300 left-0 top-4 mx-6 px-2 transition duration-200 name ${phone !== '' ? "bg-white transform -translate-y-7 -translate-x-4 scale-75" : ""}`}>
                                    Phone
                                </span>
                                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                            </label>
                            <label className="relative">
                                <Select
                                    placeholder="Select a bootcamp"
                                    value={bootcamp}
                                    onChange={(selectedOption) => {setBootCamp(selectedOption);setAmount(selectedOption.amount)}}
                                    options={options}
                                    isDisabled={bootcampId!==0}
                                    required
                                    styles={customStyles}
                                />
                                {errors.bootcamp && <p className="text-red-500">{errors.bootcamp}</p>}
                            </label>
                            <label className="relative">
                                <input
                                    name="amount"
                                    type="text"
                                    value={amount}
                                    disabled
                                    required
                                    className="w-full py-4 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500 transition-colors duration-200"
                                />
                                <span className={`text-xl absolute text-gray-300 left-0 top-4 mx-6 px-2 transition duration-200 name ${amount !== '' ? "bg-white transform -translate-y-7 -translate-x-4 scale-75" : ""}`}>
                                   Amount
                                </span>
                                
                            </label>
                            <div className="flex space-x-4 font-semibold">
                      <button type="button" onClick={() => { closeRegisterForm(); resetForm(); }} disabled={isLoading} className="w-full py-4 bg-white text-gray-500 hover:bg-gray-100 border-2 border-gray-300 rounded-lg">CANCEL</button>
                      <button className="w-full py-4 bg-line text-white border-2 border-line hover:text-line hover:bg-white rounded-lg" type="submit" disabled={isLoading}>{isLoading ? 'Processing...' : 'REGISTER'}</button>
                  </div>
                            {errors.payment && <p className="text-red-500">{errors.payment}</p>}
                        </form>
                    </div>
                ) : null
            }
        </>
    );  
};

export default Register;
