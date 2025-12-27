export type UXProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: "operational" | "building" | "completed";
  link?: string;
  figmaUrl?: string;
  detailedDescription?: string;
  challenges?: string[];
  solutions?: string[];
  gallery?: string[];
};

