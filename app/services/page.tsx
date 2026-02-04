import React from "react";
import AboutHeader from "@/components/AboutHeader";
import AboutSection from "@/components/AboutSection";
import ServiceCarousel from "@/components/ServiceCarousel";
import { Metadata } from "next";
import { MapPin, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Our Services",
    description: "Explore our comprehensive automotive services including new car sales, service & parts, rental, and used car sales.",
};

const locations = {
    honda: [
        {
            name: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
            email: "cs@bintangotoglobal.com",
            phone: "(P) +62 341 363499 or (f) +62 341 2995051"
        },
    ],
    service: [
        {
            name: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
            email: "cs@bintangotoglobal.com",
            phone: "(P) +62 341 363499 or (f) +62 341 2995051"
        },
    ],
    rental: [
        {
            name: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
            email: "cs@bintangotoglobal.com",
            phone: "(P) +62 341 363499 or (f) +62 341 2995051"
        },
    ],
    usedCars: [
        {
            name: "Honda Sukun Malang, S. Supriadi Street. No. 19-22 Sukun, Malang - East Java",
            email: "cs@bintangotoglobal.com",
            phone: "(P) +62 341 363499 or (f) +62 341 2995051"
        },
    ]
};

export default function ServicesPage() {
    return (
        <main className="flex flex-col items-center">
            {/* Header */}
            <div className="w-full">
                <AboutHeader
                    title="Learn More About Apollo Global Interactive"
                    subtitle="Comprehensive automotive solutions tailored to your needs, from purchasing to maintenance and beyond."
                    backgroundImage="https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?q=80&w=2070&auto=format&fit=crop"
                    targetId="services-content"
                    badge="Our Services"
                />
            </div>

            <div id="services-content" className="w-full px-4 md:px-10 scroll-mt-32 mt-[85px]">
                {/* New Car Sales */}
                <AboutSection
                    tag="New Car Sales"
                    title="New Car Sales"
                    imageSrc="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2072&auto=format&fit=crop"
                    imageAlt="New Car Showroom"
                    additionalContent={
                        <>
                            <p className="mt-4 font-semibold text-[#323441]">Our location and contact person :</p>
                            <ul className="mt-4 space-y-3">
                                {locations.honda.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <MapPin className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.name}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Mail className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.email}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Phone className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.phone}</span>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                            <p className="mt-6 text-base text-gray-500">
                                For further information or inquiries, please contact us through the details provided above.
                            </p>
                        </>
                    }
                >
                    <p>
                        Comprehensive sales and after-sales service solutions for new Honda vehicles, designed to deliver reliable support and long-term customer satisfaction.
                    </p>
                </AboutSection>

                {/* Car Rental */}
                <AboutSection
                    tag="Rental"
                    title="Car Rental Services"
                    isReversed
                    imageSrc="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
                    imageAlt="Car Rental Fleet"
                    additionalContent={
                        <>
                            <p className="mt-4 font-semibold text-[#323441]">Available at :</p>
                            <ul className="mt-4 space-y-3">
                                {locations.honda.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <MapPin className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.name}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Mail className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.email}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Phone className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.phone}</span>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                            <p className="mt-6 text-base text-gray-500">
                                For further information or inquiries, please contact us through the details provided above.
                            </p>
                        </>
                    }
                >
                    <p>
                        Flexible and reliable car rental solutions for individuals and businesses. Choose from a wide range of well-maintained vehicles for short-term or long-term needs, ensuring comfort and safety on every journey.
                    </p>
                </AboutSection>

                {/* Service Center */}
                <AboutSection
                    tag="Service & Maintenance"
                    title="Service Center"
                    imageSrc="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2080&auto=format&fit=crop" // Mechanic working
                    imageAlt="Mechanic Working"
                    additionalContent={
                        <>
                            <p className="mt-4 font-semibold text-[#323441]">Visit our workshops :</p>
                            <ul className="mt-4 space-y-3">
                                {locations.honda.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <MapPin className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.name}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Mail className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.email}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Phone className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.phone}</span>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                            <p className="mt-6 text-base text-gray-500">
                                For further information or inquiries, please contact us through the details provided above.
                            </p>
                        </>
                    }
                >
                    <p>
                        Professional maintenance and repair services utilizing state-of-the-art equipment and certified technicians. We ensure your vehicle performs at its best with efficient, high-quality service standards.
                    </p>
                </AboutSection>

                {/* Used Car Retailer */}
                <AboutSection
                    tag="Used Car Retailer"
                    title="Used Car Retailer"
                    isReversed
                    imageSrc="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop"
                    imageAlt="Used Car Showroom"
                    additionalContent={
                        <>
                            <p className="mt-4 font-semibold text-[#323441]">Visit our showroom :</p>
                            <ul className="mt-4 space-y-3">
                                {locations.honda.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <MapPin className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.name}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Mail className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.email}</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#323441]">
                                            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                                <Phone className="w-6 h-6 fill-[#5a80b9] text-white" />
                                            </span>
                                            <span className="font-medium text-[15px]">{item.phone}</span>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                            <p className="mt-6 text-base text-gray-500">
                                For further information or inquiries, please contact us through the details provided above.
                            </p>
                        </>
                    }
                >
                    <p>
                        We offer a wide selection of high-quality used cars that have passed rigorous inspection standards to ensure safety and comfort. Find your dream car at competitive prices with our trusted buy-back guarantee.
                    </p>
                </AboutSection>
            </div>

            {/* Used Cars Carousel */}
            <div className="w-full">
                <ServiceCarousel />
            </div>
        </main>
    );
}
