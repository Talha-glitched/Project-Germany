import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaFileAlt, FaPassport, FaHome, FaLanguage, FaBriefcase } from 'react-icons/fa';

const services = [
    {
        icon: <FaUniversity className="w-8 h-8" />,
        title: 'University Selection',
        description: 'Expert guidance in choosing the right public university and program that matches your career goals.',
    },
    {
        icon: <FaFileAlt className="w-8 h-8" />,
        title: 'Application Assistance',
        description: 'Comprehensive support with university applications, ensuring all documents meet German standards.',
    },
    {
        icon: <FaPassport className="w-8 h-8" />,
        title: 'Visa Support',
        description: 'Step-by-step guidance through the student visa process, including interview preparation.',
    },
    {
        icon: <FaHome className="w-8 h-8" />,
        title: 'Accommodation',
        description: 'Help finding suitable student housing or private accommodation before you arrive.',
    },
    {
        icon: <FaLanguage className="w-8 h-8" />,
        title: 'Language Courses',
        description: 'Connection to top-rated German language schools to meet university requirements.',
    },
    {
        icon: <FaBriefcase className="w-8 h-8" />,
        title: 'Career Guidance',
        description: 'Advice on part-time work opportunities and post-study career paths in Germany.',
    },
];

const ServiceCard = ({ icon, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        >
            <div className="w-16 h-16 bg-neutral rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
};

const Services = () => {
    return (
        <section id="services" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading"
                    >
                        Our Comprehensive Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        We provide end-to-end support to ensure your transition to studying in Germany is smooth and successful.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
