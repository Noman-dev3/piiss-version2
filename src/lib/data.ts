
import { Users, GraduationCap, BookOpen, Trophy, Home, Info, FileText, BarChart2, GalleryVertical, HelpCircle, Phone, MapPin, Clock, Mail } from "lucide-react";
import React from "react";

export const navLinks = [
    { label: "Home", href: "/", icon: React.createElement(Home, { className: "w-5 h-5" }) },
    { label: "About", href: "/#about", icon: React.createElement(Info, { className: "w-5 h-5" }) },
    { label: "Admissions", href: "/admissions", icon: React.createElement(FileText, { className: "w-5 h-5" }) },
    { label: "Results", href: "/#results", icon: React.createElement(BarChart2, { className: "w-5 h-5" }) },
    { label: "Gallery", href: "/#gallery", icon: React.createElement(GalleryVertical, { className: "w-5 h-5" }) },
    { label: "FAQ", href: "/#faq", icon: React.createElement(HelpCircle, { className: "w-5 h-5" }) },
    { label: "Contact", href: "/#contact", icon: React.createElement(Phone, { className: "w-5 h-5" }) },
];

export const header = {
    logo: {
        title: "PIISS",
        description: "Excellence in Education",
    },
    searchPlaceholder: "Ask me anything...",
    mobileMenu: {
        user: {
            name: "Guest User",
            welcomeMessage: "Welcome to PIISS",
            avatar: {
                src: "https://placehold.co/80x80.png",
                alt: "Guest User",
                hint: "guest user",
            },
        },
    },
};

export const hero = {
    badge: {
        icon: "✨",
        text: "Welcome to the Future of Education",
    },
    title: "PIISS",
    subtitle: "Excellence in Education",
    primaryAction: {
        label: "Explore Programs",
        href: "/#about",
    },
    secondaryAction: {
        label: "Contact Us",
        href: "/#contact",
    },
};

export const featuresSection = {
    title: "Why Choose Us?",
    features: [
        {
            icon: React.createElement(Users, { className: "h-8 w-8 text-primary" }),
            title: "Expert Faculty",
        },
        {
            icon: React.createElement(GraduationCap, { className: "h-8 w-8 text-primary" }),
            title: "Holistic Learning",
        },
        {
            icon: React.createElement(BookOpen, { className: "h-8 w-8 text-primary" }),
            title: "Modern Curriculum",
        },
        {
            icon: React.createElement(Trophy, { className: "h-8 w-8 text-primary" }),
            title: "Top Achievements",
        },
    ]
};

export const about = {
    badge: "About Our School",
    title: "Our Story",
    description: "Pakistan Islamic International School System (PIISS) began with a vision: to provide quality education rooted in Islamic values and modern knowledge. At PIISS, learning goes beyond books. We guide our students to think deeply, act kindly, and aim high. Our classrooms inspire curiosity, our teachers nurture confidence, and our community fosters respect. We believe in shaping leaders of tomorrow — young minds ready to excel in academics, contribute to society, and live with faith and integrity.",
    image: {
        src: "https://placehold.co/600x450.png",
        alt: "Students in a classroom at PIISS",
        hint: "students classroom",
    },
};

export const toppersSection = {
    badge: "Our Achievers",
    title: "Our Star Performers",
    description: "Celebrating the outstanding achievements of our students who have excelled through hard work and dedication.",
    toppers: [
      {
        name: "Usman",
        grade: "Grade 8",
        score: "98.5%",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "student portrait",
        }
      },
      {
        name: "Aisha Khan",
        grade: "Grade 9",
        score: "97.8%",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "student portrait",
        }
      },
      {
        name: "Ali Ahmed",
        grade: "Grade 8",
        score: "97.2%",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "student portrait",
        }
      },
      {
        name: "Fatima Raza",
        grade: "Grade 9",
        score: "96.9%",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "student portrait",
        }
      },
      {
        name: "Hassan Ali",
        grade: "Grade 8",
        score: "96.5%",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "student portrait",
        }
      },
    ]
};

export const teachersSection = {
    badge: "Meet Our Faculty",
    title: "World-Class Educators",
    description: "Our passionate team of expert teachers brings decades of experience and innovative teaching methods to inspire and nurture every student.",
    viewAllButton: "View All Faculty",
    teachers: [
      {
        name: "Sajjad",
        role: "Teacher",
        subject: "English",
        experience: "3 Years",
        department: "English",
        qualification: "M.A. English",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "male teacher portrait",
        },
        isHead: true,
      },
      {
        name: "Ayesha Khan",
        role: "Teacher",
        subject: "Mathematics",
        experience: "5 Years",
        department: "Science",
        qualification: "M.Sc. Mathematics",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "female teacher portrait",
        },
        isHead: false,
      },
      {
        name: "Ahmed Ali",
        role: "Sr. Teacher",
        subject: "Physics",
        experience: "8 Years",
        department: "Science",
        qualification: "M.Sc. Physics",
        image: {
            src: "https://placehold.co/128x128.png",
            hint: "male teacher portrait",
        },
        isHead: false,
      },
    ]
};

export const eventsSection = {
    badge: "Our Events",
    title: "Upcoming Events",
    description: "Stay updated with our latest school activities and programs.",
    viewAllButton: "View All Events",
    events: [
      {
        title: "Independence Day",
        date: "July 14, 2025",
        description: "14 August Pakistan Born",
      },
      {
        title: "Annual Sports Gala",
        date: "October 22, 2025",
        description: "A day of fun, games, and healthy competition.",
      },
      {
        title: "Science Fair",
        date: "November 15, 2025",
        description: "Showcasing innovative projects from our bright students.",
      },
    ]
};

export const gallerySection = {
    badge: "Our Gallery",
    title: "School Life Gallery",
    description: "Glimpses of our vibrant school community and memorable moments.",
    viewAllButton: "View Full Gallery",
    galleryItems: [
      {
        title: "Save Environment",
        description: "A picture where Human Save earth.",
        image: {
            src: "https://placehold.co/600x450.png",
            hint: "hands holding tree",
        },
      },
      {
        title: "Student Life",
        description: "Our students engaged in learning.",
        image: {
            src: "https://placehold.co/600x450.png",
            hint: "student studying",
        },
      },
      {
        title: "Sports Day",
        description: "Annual sports competition.",
        image: {
            src: "https://placehold.co/600x450.png",
            hint: "children running race",
        },
      },
      {
        title: "Art Class",
        description: "Creativity in full swing.",
        image: {
            src: "https://placehold.co/600x450.png",
            hint: "children painting",
        },
      },
    ]
};

export const testimonialsSection = {
    badge: "Testimonials",
    title: "What Our Community Says",
    description: "Hear from parents, students, and alumni about their experiences at our school.",
    testimonials: [
      {
        name: "Jhon Doe",
        role: "Student",
        quote: "I love This School! The teachers are so supportive and the learning environment is amazing.",
        rating: 5,
      },
      {
        name: "Jane Smith",
        role: "Parent",
        quote: "PIISS has been a wonderful experience for our family. Our children are thriving academically and personally.",
        rating: 5,
      },
      {
        name: "Ahmed Ali",
        role: "Alumni",
        quote: "The foundation I received at PIISS prepared me for university and beyond. I'm forever grateful.",
        rating: 5,
      },
      {
        name: "Fatima Khan",
        role: "Parent",
        quote: "A fantastic school with a strong focus on both character development and academic excellence.",
        rating: 5,
      },
    ]
};

export const faqSection = {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our school, admissions, and programs.",
    faqs: [
        {
            question: "What are the school hours?",
            answer: "Our school hours are from 8:00 AM to 3:00 PM, Monday to Friday. The office is open until 5:00 PM.",
        },
        {
            question: "How can I apply for admission?",
            answer: "You can apply for admission through our online portal on the 'Admissions' page. You'll need to fill out the form and upload the required documents.",
        },
        {
            question: "What curriculum do you follow?",
            answer: "We follow a modern curriculum that blends with national standards with international best practices, focusing on holistic development.",
        },
        {
            question: "Do you offer extracurricular activities?",
            answer: "Yes, we offer a wide range of extracurricular activities, including sports, arts, debate, and science clubs to ensure the all-round development of our students.",
        },
    ]
};

export const contactInfo = {
    title: "Contact Information",
    items: [
        { icon: React.createElement(MapPin, { className: "w-6 h-6 text-primary" }), title: "Address", value: "123 Education Lane, Knowledge City" },
        { icon: React.createElement(Phone, { className: "w-6 h-6 text-primary" }), title: "Phone", value: "03191897942" },
        { icon: React.createElement(Mail, { className: "w-6 h-6 text-primary" }), title: "Email", value: "noman.dev3@gmail.com, admissions@piiss.edu" },
        { icon: React.createElement(Clock, { className: "w-6 h-6 text-primary" }), title: "Office Hours", value: "Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 2:00 PM" },
    ],
    image: {
        src: "https://placehold.co/600x400.png",
        alt: "PIISS Campus",
        hint: "school building"
    }
};

export const contactForm = {
    title: "Send us a Message",
    fields: {
        firstName: { label: "First Name", placeholder: "Enter your first name" },
        lastName: { label: "Last Name", placeholder: "Enter your last name" },
        email: { label: "Email Address", placeholder: "Enter your email" },
        phone: { label: "Phone Number", placeholder: "Enter your phone number" },
        subject: { 
            label: "Subject", 
            placeholder: "Select a subject",
            options: [
                { value: "admissions", label: "Admissions" },
                { value: "general", label: "General Inquiry" },
                { value: "feedback", label: "Feedback" },
                { value: "careers", label: "Careers" },
            ]
        },
        message: { label: "Message", placeholder: "Enter your message" },
    },
    submitButton: "Send Message",
};
