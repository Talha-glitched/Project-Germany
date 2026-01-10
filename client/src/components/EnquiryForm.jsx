import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Input from './Input';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';

const EnquiryForm = () => {
    const createEnquiry = useMutation(api.enquiries.create);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'German Consultancy',
        message: '',
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🔵 [EnquiryForm] Form submitted');
        console.log('🔵 [EnquiryForm] Form data:', formData);

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        console.log('🔵 [EnquiryForm] Submitting enquiry via Convex');
        console.log('🔵 [EnquiryForm] Form data:', formData);

        try {
            const enquiry = await createEnquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                interest: formData.interest,
                message: formData.message || undefined,
            });

            console.log('✅ [EnquiryForm] Success! Enquiry submitted:', enquiry);
            setStatus({ type: 'success', message: 'Thank you! Your enquiry has been submitted successfully.' });
            setFormData({
                name: '',
                email: '',
                phone: '',
                interest: 'German Consultancy',
                message: '',
            });
        } catch (error) {
            console.error('🔴 [EnquiryForm] Error:', error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
            console.log('🔵 [EnquiryForm] Form submission completed');
        }
    };

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-heading">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Have questions about studying in Germany? Fill out the form and our expert consultants will get back to you within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">+49 152 1646 3427</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600">mhndxb3@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 890"
                                    required
                                />
                            </div>

                            <Input
                                label="Email Address"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />

                            <div className="mb-4">
                                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                                    Interested In
                                </label>
                                <select
                                    id="interest"
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-white"
                                >
                                    <option>German Consultancy</option>
                                    <option>University Selection</option>
                                    <option>Application Assistance</option>
                                    <option>Visa Support</option>
                                    <option>Accommodation</option>
                                    <option>Language Courses</option>
                                    <option>Career Guidance</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <Input
                                label="Message"
                                type="textarea"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your goals..."
                                rows={4}
                            />

                            {status.message && (
                                <div className={`mb-4 p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {status.message}
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EnquiryForm;
