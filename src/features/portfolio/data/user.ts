import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "Mohammed",
  lastName: "Alotaibi",
  displayName: "Mohammed Alotaibi",
  username: "moe",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "UX Designer/Front-End Dev",
  ],
  address: "Riyadh, Saudi Arabia",
  phoneNumber: "Kzk2NjU1MzAxMjgyNQ==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "bW9lLmhhbG90YWliaUBnbWFpbC5jb20=", // base64 encoded
  website: "malotaibi.dev",
  jobTitle: "UX Designer/Front-End Dev",
  jobs: [] as { title: string; company: string; website: string }[],
  about: `
Front-End Developer and UX Designer with hands-on experience in designing and building user-centered digital interfaces. Strong
ability to translate UX research, wireframes, and prototypes into responsive and accessible front-end experiences. Experienced in working
on enterprise and government digital platforms, with a solid foundation in design thinking, usability, and modern UI development
`,
  avatar: "/images/mohammed-avatar.jpg",
  ogImage:
    "img src='/images/mohammed-og-image.jpg'",
  namePronunciationUrl: "/audio/chanhdai.mp3",
  timeZone: "Asia/Riyadh",
  keywords: [
    "moe",
    "mohammed alotaibi",
    "mohammed",
    "alotaibi",
    "ux designer",
    "front-end dev",
    "open source contributor",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
} satisfies User;
