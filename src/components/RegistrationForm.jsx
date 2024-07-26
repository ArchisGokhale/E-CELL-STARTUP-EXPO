import React, { useState } from 'react';
import Image from 'next/image';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', phone: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch('http://localhost:8080/api/userregister/new', {  // Replace with your API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'xxQ1EcOYOQheMvCWo1uR/XlpkNJRJqfK'
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus('Registration successful!');
          setFormData({ name: '', email: '', phone: '' });  // Reset form data
          setErrors({ name: '', email: '', phone: '' }); // Clear errors
        } else {
          // Set errors based on the backend response
          setErrors({
            name: result.errors?.name || '',
            email: result.errors?.email || '',
            phone: result.errors?.phone || '',
          });
          setSubmitStatus('Registration failed. Please check your inputs.');
        }
      } catch (error) {
        setSubmitStatus('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-retro-gradient text-white p-4">
        {/* <div className="pb-5">
          <Image 
            src="/media/logos/ECELL-LOGO.png" 
            alt="Ecell logo" 
            width={250} 
            height={250} 
            className="mx-auto rounded-lg object-contain"
          />
        </div> */}
      <div className="w-full max-w-md border-4 border-white bg-black p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-lg mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-lg mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className='text-center'>
            <button
              type="submit"
              className="w-full border-4 border-white bg-transparent text-white px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Register
            </button>
          </div>
        </form>
        {submitStatus && <p className="mt-4 text-center">{submitStatus}</p>}
      </div>
    </div>
  );
};

export default RegistrationForm;
