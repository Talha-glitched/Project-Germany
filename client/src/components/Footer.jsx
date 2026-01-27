import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/Project_Germany.png';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-4">
                            <img 
                                src={logo} 
                                alt="Project Germany Logo" 
                                className="h-16 md:h-20 w-auto"
                            />
                        </div>
                        <p className="mt-4 text-gray-400 text-sm">
                            Your gateway to world-class education in Germany. We help you navigate the path to your dream career.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">Services</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>University Selection</li>
                            <li>Visa Support</li>
                            <li>Accommodation</li>
                            <li>Career Guidance</li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={20} /></a>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                            <p>
                                Email: <a href="mailto:projectgermany@gmail.com" className="text-gray-400 hover:text-white transition-colors">projectgermany@gmail.com</a>
                            </p>
                            <p>
                                Phone: <a href="tel:+4915216463427" className="text-gray-400 hover:text-white transition-colors">+49 1521 646 3427</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Project Germany. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
