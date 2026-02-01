'use client';

import { motion } from 'framer-motion';
import { Car, Key, Wrench, Tag } from 'lucide-react';

const services = [
    {
        title: 'Dealership',
        description: 'Comprehensive sales and after sales service solutions for Honda brand new vehicles.',
        icon: Car,
    },
    {
        title: 'Auto Rental',
        description: 'Complete transportation solutions in the form of vehicle rentals.',
        icon: Key,
    },
    {
        title: 'Auto Service',
        description: 'Maintenance and repair facility solutions.',
        icon: Wrench,
    },
    {
        title: 'Used Car Retailer',
        description: 'Solution for buying and selling used cars.',
        icon: Tag,
    },
];

export default function Services() {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 px-4 md:px-10 overflow-hidden">
            <div className="mx-auto max-w-[1440px]">
                {/* Header Section */}
                <div className="flex flex-col gap-6 md:gap-10 mb-16 relative">
                    <div className="flex flex-col gap-4 items-start max-w-3xl">
                        <div className="inline-flex items-center justify-center rounded-full bg-[#f2f7ff] px-4 py-1.5 text-sm font-medium text-[#5a80b9] ring-1 ring-inset ring-[#5a80b9]/15">
                            Our Services
                        </div>

                        <h2 className="text-4xl md:text-[54px] font-semibold text-[#323441] leading-tight">
                            What We Can Do for You
                        </h2>

                        <p className="text-lg text-[#323441]/80 leading-relaxed max-w-2xl">
                            We deliver automotive solutions across sales, rental, service, and used car operations, focused on efficiency, reliability, and long-term value.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                            className="bg-white rounded-[32px] p-8 min-h-[320px] flex flex-col justify-between group hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] transition-shadow duration-300"
                        >
                            <div className="flex flex-col gap-6">
                                {/* Icon Container */}
                                <div className="w-14 h-14 bg-[#F2F7FF] rounded-2xl flex items-center justify-center group-hover:bg-[#5a80b9] transition-colors duration-300">
                                    <service.icon className="w-7 h-7 text-[#5a80b9] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold text-[#323441] group-hover:text-[#5a80b9] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#323441]/60 text-lg leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
