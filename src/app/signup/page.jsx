"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios';


function SignUpPage() {

  const router = useRouter();

  const [details, setDetails] = useState({
    hospitalName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    hospitalResgistrationDate: "",
    ambulance: "",
    contact: "",
    hospitalResgistrationNumber: "",
    emergencyWardNumber: "",
    registrationCertificateImage: {},
    password: "",
  })


  const onSubmit = async() => {
       console.log(details)
    try {
       const formData = new FormData();
       formData.append("hospitalName", details.hospitalName);
       formData.append("email", details.email);
       formData.append("password", details.password);

       formData.append("registrationCertificateImage", details.registrationCertificateImage);

       const response = await axios.post("/api/signup", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
        
            console.log(response);
            router.push("/login");
          } catch (error) {
            console.log("Signup failed", error.message);
          }
  }

  return (
    <div className='w-[60%] mx-auto mt-[1rem]'>
        <h1 className='text-xl p-[1rem]'>Signup Page</h1>
        <form className='flex flex-wrap items-center justify-between gap-2' encType='multipart/form-data'>
            <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Hospital Name'
                   value={details.hospitalName}
                   onChange={(e) => setDetails({...details, hospitalName: e.target.value})}
            />
            <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="email" 
                   placeholder='Email'
                   value={details.email}
                   onChange={(e) => setDetails({...details, email: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Address'
                   value={details.address}
                   onChange={(e) => setDetails({...details, address: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Phone number'
                   value={details.contact}
                   onChange={(e) => setDetails({...details, contact: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='City'
                   value={details.city}
                   onChange={(e) => setDetails({...details, city: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Hospital Registration Number'
                   value={details.hospitalResgistrationNumber}
                   onChange={(e) => setDetails({...details, hospitalResgistrationNumber: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='State'
                   value={details.state}
                   onChange={(e) => setDetails({...details, state: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Emergency Ward Number'
                   value={details.emergencyWardNumber}
                   onChange={(e) => setDetails({...details, emergencyWardNumber: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Pincode'
                   value={details.pincode}
                   onChange={(e) => setDetails({...details, pincode: e.target.value})}
            />
             <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="file" 
                   placeholder='Registration Cretificate'
                   value={details.registrationCertificateImage}
                   onChange={(e) => setDetails({...details, registrationCertificateImage: e.target.files[0]})}
            />
            <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Hospital Registration Date'
                   value={details.hospitalResgistrationDate}
                   onChange={(e) => setDetails({...details, hospitalResgistrationDate: e.target.value})}
            />
            <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Password'
                   value={details.password}
                   onChange={(e) => setDetails({...details, password: e.target.value})}
            />
            <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="number" 
                   placeholder='Number of Ambulance'
                   value={details.ambulance}
                   onChange={(e) => setDetails({...details, ambulance: e.target.value})}
            />
            <input className='w-[40%] border-2 border-gray-900 p-[0.5rem]' 
                   type="text" 
                   placeholder='Confirm Password'
            />
        </form>
        <button className='w-[30%] mx-auto bg-slate-800 text-white' onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default SignUpPage