import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import AboutSection from "@/components/AboutSection";

type ServiceItem = {
    id: string;
    image: string;
    title: string;
    desc: string;
    location: string;
    contact: string[];
    email: string[];
    quote: string;
};

// Component to render the list of services with dynamic layout
// It automatically alternates the layout (left/right) based on the index
export default function ServiceList({ services, lang }: { services: ServiceItem[], lang: string }) {
    const isId = lang === "id";
    const labels = {
        location: isId ? "Lokasi dan narahubung kami :" : "Our location and contact person :",
    }

    // Dynamic handling: If no services, return null or empty fragment
    if (!services || services.length === 0) return null;

    return (
        <div id="services-content" className="w-full px-4 md:px-10 scroll-mt-32 mt-[85px]">
            {services.map((service, index) => (
                <AboutSection
                    key={service.id}
                    tag={service.title}
                    title={service.title}
                    // Dynamic Layout: Alternate based on index (Even: Left-to-Right, Odd: Right-to-Left)
                    isReversed={index % 2 !== 0}
                    imageSrc={service.image}
                    imageAlt={service.title}
                    additionalContent={
                        <>
                            <p className="mt-4 font-semibold text-[#323441]">{labels.location}</p>
                            <ul className="mt-4 space-y-3">
                                {/* Location */}
                                <li className="flex items-start gap-4 text-[#323441]">
                                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                        <MapPin className="w-6 h-6 fill-[#5a80b9] text-white" />
                                    </span>
                                    <span className="font-medium text-[15px]">{service.location}</span>
                                </li>

                                {/* Emails - Dynamic List */}
                                {service.email?.map((email, i) => (
                                    <li key={`email-${i}`} className="flex items-start gap-4 text-[#323441]">
                                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                            <Mail className="w-6 h-6 fill-[#5a80b9] text-white" />
                                        </span>
                                        <a href={`mailto:${email}`} className="font-medium text-[15px] hover:text-[#5a80b9] transition-colors">{email}</a>
                                    </li>
                                ))}

                                {/* Contacts - Dynamic List */}
                                {service.contact?.map((contact, i) => (
                                    <li key={`contact-${i}`} className="flex items-start gap-4 text-[#323441]">
                                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#5a80b9]">
                                            <Phone className="w-6 h-6 fill-[#5a80b9] text-white" />
                                        </span>
                                        <a href={`tel:${contact.replace(/[^0-9+]/g, '')}`} className="font-medium text-[15px] hover:text-[#5a80b9] transition-colors">{contact}</a>
                                    </li>
                                ))}
                            </ul>

                            {service.quote && (
                                <p className="mt-6 text-base text-gray-500">
                                    {service.quote}
                                </p>
                            )}
                        </>
                    }
                >
                    <p>{service.desc}</p>
                </AboutSection>
            ))}
        </div>
    );
}

// Export the type so it can be used in page.tsx if needed
export type { ServiceItem };
