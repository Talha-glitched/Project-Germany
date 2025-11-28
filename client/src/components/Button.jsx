import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-gray-800 focus:ring-primary",
        secondary: "bg-secondary text-white hover:bg-amber-600 focus:ring-secondary",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
        white: "bg-white text-primary hover:bg-gray-100 focus:ring-white",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default Button;
