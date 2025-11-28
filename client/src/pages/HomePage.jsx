import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import CTA from '../components/CTA';
import EnquiryForm from '../components/EnquiryForm';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <CTA />
                <EnquiryForm />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
