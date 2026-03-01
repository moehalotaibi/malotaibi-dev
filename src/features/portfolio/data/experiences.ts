import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "agile-advice",
    companyName: "Agile Advice",
    positions: [
      {
        id: "agile-ux-designer",
        title: "UX Designer",
        employmentPeriod: {
          start: "03.2026",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- Leading the end-to-end UX design process for Agile Advice's digital products and client-facing platforms.
- Creating wireframes, prototypes, and high-fidelity designs to deliver seamless user experiences.
- Collaborating with stakeholders to translate business requirements into intuitive, user-centered interfaces.
- Conducting user research and usability testing to continuously improve product design.`,
        skills: [
          "UI/UX Design",
          "Figma",
          "User Research",
          "Wireframing",
          "Prototyping",
          "Design Systems",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "elm",
    companyName: "ELM Company",
    companyLogo: "/images/elm.jpg",
    positions: [
      {
        id: "elm-coop",
        title: "COOP Trainee, Internship",
        employmentPeriod: {
          start: "08.2024",
          end: "04.2025",
        },
        employmentType: "Internship",
        icon: "design",
        description: `- Redesigned Elm Company's UI/UX using Figma and Spline, creating a modern, interactive interface with improved navigation and usability.
- Designed a landing page for the Ministry of Human Resources and Social Development, focusing on accessibility, clarity, and user-friendly layouts.
- Produced a motion graphic video for Elm Company, showcasing products, work culture, and challenges through engaging storytelling and animation.
- Led the full UI/UX design of Elm's product "OSTOUL", from research and wireframes to interactive prototypes, emphasizing user-centric design.
- Designed an AI application, simplifying human-AI interaction with intuitive flows and clean interface design.`,
        skills: [
          "UI/UX Design",
          "Figma",
          "Spline",
          "Wireframing",
          "Prototyping",
          "User Research",
          "Motion Graphics",
          "Design Thinking",
        ],
      },
    ],
  },
  {
    id: "freelance",
    companyName: "Freelance",
    positions: [
      {
        id: "freelance-designer",
        title: "Freelancer",
        employmentPeriod: {
          start: "07.2023",
          end: "02.2026",
        },
        employmentType: "Part-time",
        icon: "design",
        description: `Delivered professional logo designs for a variety of clients, such as the Business Services Company Agile Advice, the clothing brand and the AI startup "Rashid", and the startup business "ORO". Focused on translating each client's vision into a distinctive brand identity through creative concepts and modern design execution.`,
        skills: [
          "Logo Design",
          "Brand Identity",
          "Graphic Design",
          "Adobe Illustrator",
          "Adobe Photoshop",
          "Creativity",
        ],
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "imam-university",
        title: "Imam Mohammed Ibn Saud University",
        employmentPeriod: {
          start: "08.2021",
          end: "11.2024",
        },
        icon: "education",
        description: `Bachelor of Marketing and Communication`,
        skills: ["Marketing", "Communication", "Business", "Strategy"],
      },
      {
        id: "fullstack-bootcamp",
        title: "Full Stack Web Development Bootcamp",
        employmentPeriod: {
          start: "2025",
          end: "2026",
        },
        icon: "education",
        description: `- HTML, CSS, JavaScript
- Responsive Web Design
- UI Implementation from Design
- Project-Based Learning`,
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "Responsive Design",
          "Web Development",
        ],
      },
      {
        id: "udacity-nanodegree",
        title: "Udacity — User Experience Nanodegree Program",
        employmentPeriod: {
          start: "2026",
          end: "2026",
        },
        icon: "education",
        description: `- Completed end-to-end UX case studies including research, wireframing, prototyping, and usability testing.
- Built a comprehensive UX portfolio with real-world product design projects.`,
        skills: [
          "UX Research",
          "User Personas",
          "Wireframing",
          "Prototyping",
          "Usability Testing",
          "Information Architecture",
        ],
      },
    ],
  },
];
