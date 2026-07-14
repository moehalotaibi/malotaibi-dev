import type { UXProject } from "../types/ux-projects";

export const UX_PROJECTS: UXProject[] = [
  {
    id: "labvision-academy",
    title: "LABvision Academy",
    description:
      "Arabic e-learning platform for medical laboratory sciences, helping students and professionals prepare for the Saudi laboratory licensing exam (SLLE) with specialized courses, a 200+ question bank, mock exams, and a dedicated lab job board.",
    image: "/images/projects/labvision.jpg",
    technologies: ["UI/UX Design", "Web Development", "EdTech", "Arabic RTL"],
    status: "live",
    link: "https://labvision-academy.vercel.app/",
    screenshots: [
      {
        src: "/images/projects/labvision.jpg",
        alt: "LABvision Academy homepage",
      },
    ],
  },
  {
    id: "agile-advice",
    title: "Agile Advice",
    description:
      "Complete brand identity and website design for Agile Advice, a business services company. Created a cohesive visual language and user-friendly digital experience.",
    image: "/images/projects/agile-advice-hero.jpg",
    technologies: [
      "UI/UX Design",
      "Figma",
      "Brand Identity",
      "Logo Design",
      "Web Design",
    ],
    status: "live",
    link: "https://www.agileadvice.sa/",
    figmaUrl:
      "https://www.figma.com/design/Z42CiJPCD5zpJKKfRHZicS/Untitled?node-id=0-1&t=eCzJFj9No5239VG8-1",
  },
  {
    id: "Ostoul",
    title: "OSTOUL Product Design",
    description:
      "Full UI/UX design of Elm's product 'OSTOUL', from research and wireframes to interactive prototypes, emphasizing user-centric design.",
    image: "/images/projects/ostoul.png",
    technologies: ["Figma", "Wireframing", "User Research", "Design Thinking"],
    status: "completed",
    figmaUrl:
      "https://www.figma.com/design/KrMgwhqKHqUAdwn9NqS1ly/Untitled?node-id=0-21311&t=6xInwYovn7QhM64e-1",
    screenshots: [
      {
        src: "/images/projects/ostoul-screenshot-1.png",
        alt: "Ostoul car marketplace page",
      },
    ],
  },
  {
    id: "Keeta-redesign",
    title: "Keeta Redesign",
    description:
      "Modern redesign of Keeta application, focusing on improved user experience, intuitive navigation, and contemporary visual design.",
    image: "/images/projects/keeta.png",
    technologies: ["Figma", "UI/UX Design", "Mobile Design"],
    status: "finalizing",
    figmaUrl:
      "https://www.figma.com/design/wAHgbCdJWZPm9n5V3Zr1rj/Untitled?node-id=0-1&t=UFMSMIZnHj3d69J2-1",
    screenshots: [
      {
        src: "/images/projects/keeta-screenshot-1.png",
        alt: "Keeta home screen redesign",
      },
      {
        src: "/images/projects/keeta-screenshot-2.png",
        alt: "Keeta McDonald's restaurant page",
      },
    ],
  },
  {
    id: "snb-mobile",
    title: "SNB Mobile",
    description:
      "Mobile banking application design project focusing on user-friendly financial interfaces and secure, accessible digital banking experience.",
    image: "/images/projects/snb-mobile.jpg",
    technologies: ["Figma", "Mobile Design", "Financial UX"],
    status: "building",
    screenshots: [],
  },
];
