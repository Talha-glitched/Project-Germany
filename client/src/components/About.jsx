import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                            alt="Student studying"
                            className="relative rounded-2xl shadow-2xl w-full object-cover h-[600px]"
                        />
                        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-100">
                            <p className="text-primary font-medium italic">
                                "Built by a student who has navigated the journey, for students embarking on theirs."
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-heading">
                            Bridging the Gap to <span className="text-secondary">German Education</span>
                        </h2>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Pursuing education in Germany is an opportunity with high long-term payoff, but the path to get there is demanding. Public universities expect precision, complete documentation, and strict adherence to timelines. Relocation adds another layer of pressure: visas, housing, enrollment procedures, and cultural adjustment. Most students face this alone and lose time, confidence, or opportunities.
                            </p>

                            <p>
                                This consultancy was built by a student who has already navigated the full process. The service combines first-hand experience with structured guidance. It delivers a clear, dependable path from program selection to arrival. Applications are built correctly the first time. Requirements are translated into simple steps. Deadlines are tracked. Visa preparation, accommodation search, and pre-departure planning are handled with accuracy.
                            </p>

                            <p>
                                The approach is professional, direct, and personal. You speak with someone who has lived the same transition and understands the real challenges behind the paperwork. The objective is stable: reduce complexity, protect your time, and secure your entry into a German public university through a process that feels controlled rather than overwhelming.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-6">
                            <div className="border-l-4 border-secondary pl-4">
                                <h4 className="font-bold text-primary text-xl">First-Hand</h4>
                                <p className="text-gray-500">Experience based guidance</p>
                            </div>
                            <div className="border-l-4 border-secondary pl-4">
                                <h4 className="font-bold text-primary text-xl">Structured</h4>
                                <p className="text-gray-500">Clear, dependable path</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
