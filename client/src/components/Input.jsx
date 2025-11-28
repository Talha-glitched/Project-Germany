import React from 'react';

const Input = ({ label, type = 'text', id, name, value, onChange, placeholder, required = false, rows }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={rows || 4}
                    placeholder={placeholder}
                    required={required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none resize-none"
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none"
                />
            )}
        </div>
    );
};

export default Input;
