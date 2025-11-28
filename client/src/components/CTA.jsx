import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import Button from './Button';

const CTA = () => {
    return (
        <section className="py-20 bg-primary relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
                        Ready to Start Your German Education Journey?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Don't let the complex application process hold you back. Let our experts guide you to your dream university.
                    </p>
                    <Link to="contact" smooth={true} duration={500}>
                        <Button variant="secondary" className="text-lg px-10 py-4 shadow-lg shadow-secondary/20">
                            Get Free Consultation
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
