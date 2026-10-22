import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import Button from './Button';
import Input from './Input';
import { API_ENDPOINTS } from '../config/api';

const WHATSAPP_PHONE = '4915216463427'; // Project Germany WhatsApp Number (+49 1521 646 3427)

const buildWhatsAppUrl = (data) => {
    const text = [
        `*New Enquiry - Project Germany*`,
        ``,
        `*Name:* ${data.name || ''}`,
        `*Phone:* ${data.phone || ''}`,
        `*Email:* ${data.email || ''}`,
        `*Interested In:* ${data.interest || ''}`,
        `*Message:* ${data.message?.trim() ? data.message : 'N/A'}`
    ].join('\n');

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'German Consultancy',
        message: '',
    });

    const [status, setStatus] = useState({ type: '', message: '', whatsappUrl: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🔵 [EnquiryForm] Form submitted', formData);

        // 1. Generate WhatsApp direct link with user input
        const whatsappUrl = buildWhatsAppUrl(formData);

        // 2. Open WhatsApp immediately to stay within the direct user gesture
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        setIsSubmitting(true);
        setStatus({
            type: 'info',
            message: 'Opening WhatsApp chat and submitting enquiry...',
            whatsappUrl,
        });

        // 3. Save enquiry to database for Admin Dashboard
        const url = API_ENDPOINTS.ENQUIRIES.BASE;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Thank you! Your enquiry has been submitted and WhatsApp has opened.',
                    whatsappUrl,
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    interest: 'German Consultancy',
                    message: '',
                });
            } else {
                setStatus({
                    type: 'success',
                    message: 'WhatsApp chat opened with your enquiry details.',
                    whatsappUrl,
                });
            }
        } catch (error) {
            console.warn('Backend enquiry save warning:', error);
            setStatus({
                type: 'success',
                message: 'WhatsApp chat opened with your enquiry details.',
                whatsappUrl,
            });
        } finally {
            setIsSubmitting(false);
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
                                    <h4 className="text-lg font-semibold text-gray-900">Phone & WhatsApp</h4>
                                    <p className="text-gray-600">
                                        <a href="https://wa.me/4915216463427" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors inline-flex items-center gap-1.5">
                                            <FaWhatsapp className="text-green-500 flex-shrink-0" /> +49 1521 646 3427
                                        </a>
                                    </p>
                                    <p className="text-gray-600">
                                        <a href="https://wa.me/971586108361" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors inline-flex items-center gap-1.5">
                                            <FaWhatsapp className="text-green-500 flex-shrink-0" /> +971 58 610 8361
                                        </a>
                                    </p>
                                    <p className="text-gray-600">
                                        <a href="https://wa.me/923328809001" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors inline-flex items-center gap-1.5">
                                            <FaWhatsapp className="text-green-500 flex-shrink-0" /> +92 332 8809001
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600">info@projectgermany.com</p>
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
                                <div className={`mb-5 p-4 rounded-xl text-sm ${
                                    status.type === 'success' 
                                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                                        : status.type === 'error' 
                                        ? 'bg-red-50 text-red-700 border border-red-200' 
                                        : 'bg-blue-50 text-blue-900 border border-blue-200'
                                }`}>
                                    <p className="font-medium">{status.message}</p>
                                    {status.whatsappUrl && (
                                        <a
                                            href={status.whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline"
                                        >
                                            <FaWhatsapp className="text-base" />
                                            Click here if WhatsApp didn't open automatically
                                        </a>
                                    )}
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="whatsapp"
                                className="w-full flex items-center justify-center gap-2.5 text-base md:text-lg font-semibold py-3.5 shadow-lg shadow-green-500/20"
                                disabled={isSubmitting}
                            >
                                <FaWhatsapp className="text-2xl" />
                                <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send Enquiry via WhatsApp'}</span>
                            </Button>
                            <p className="text-xs text-gray-500 text-center mt-3">
                                Opens WhatsApp directly with your details and saves your enquiry.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EnquiryForm;
