import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('All fields are required!');
      setLoading(false);
      return;
    }

    try {
      // Simulate an API request
      setTimeout(() => {
        toast.success('Thank you for reaching out! We will get back to you soon.');
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-lg mb-8 text-center">
        We'd love to hear from you! Reach out to us with any inquiries, questions, or feedback.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-6 shadow-md rounded-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
