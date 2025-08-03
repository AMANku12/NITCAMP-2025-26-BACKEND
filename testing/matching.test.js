// --- Mentor Pool: 10 mentors with their areas of expertise ---
const mentors = [
  {
    id: 1,
    name: "Priya Sharma",
    expertise: ["Web Development", "React.js", "Node.js", "MERN Stack"],
    menteeCapacity: 1
  },
  {
    id: 2,
    name: "Rohit Verma",
    expertise: ["Data Science", "Python", "Machine Learning", "Pandas"],
    menteeCapacity: 5
  },
  {
    id: 3,
    name: "Aisha Khan",
    expertise: ["UI/UX Design", "Figma", "Adobe XD", "User Research"],
    menteeCapacity: 2
  },
  {
    id: 4,
    name: "Vikram Singh",
    expertise: ["Cloud Computing", "AWS", "DevOps", "Docker", "Kubernetes"],
    menteeCapacity: 4
  },
  {
    id: 5,
    name: "Sneha Patel",
    expertise: ["Cybersecurity", "Ethical Hacking", "Network Security"],
    menteeCapacity: 3
  },
  {
    id: 6,
    name: "Aditya Rao",
    expertise: ["Mobile Development", "Flutter", "Dart", "Android"],
    menteeCapacity: 1
  },
  {
    id: 7,
    name: "Kavita Joshi",
    expertise: ["Blockchain", "Ethereum", "Solidity", "Smart Contracts"],
    menteeCapacity: 2
  },
  {
    id: 8,
    name: "Manish Gupta",
    expertise: ["AI Ethics", "Natural Language Processing", "TensorFlow"],
    menteeCapacity: 5
  },
  {
    id: 9,
    name: "Neha Desai",
    expertise: ["Sustainability", "Chemical Process Engineering", "CO2 Sequestration"],
    menteeCapacity: 1
  },
  {
    id: 10,
    name: "Rahul Mehta",
    expertise: ["Data Visualization", "D3.js", "Tableau", "Power BI"],
    menteeCapacity: 4
  }
];

// --- Mentee Interests: 20 different arrays of areas of interest ---
const mentees = [
  { id: 1, name: "Aarav Singh", interests: ["Web Development", "React.js", "UI/UX Design"] },
  { id: 2, name: "Isha Gupta", interests: ["Data Science", "Machine Learning", "Python"] },
  { id: 3, name: "Devansh Patel", interests: ["Blockchain", "Smart Contracts", "Cryptography"] },
  { id: 4, name: "Tanya Sharma", interests: ["Cybersecurity", "Network Security"] },
  { id: 5, name: "Rohan Das", interests: ["Cloud Computing", "Docker", "Kubernetes", "DevOps"] },
  { id: 6, name: "Megha Nair", interests: ["Mobile Development", "Android", "iOS"] },
  { id: 7, name: "Kunal Reddy", interests: ["AI Ethics", "NLP", "TensorFlow"] },
  { id: 8, name: "Nisha Verma", interests: ["MERN Stack", "Node.js", "Express.js"] },
  { id: 9, name: "Ananya Pillai", interests: ["Data Visualization", "D3.js", "Tableau"] },
  { id: 10, name: "Yuvraj Singh", interests: ["Chemical Process Engineering", "Sustainability"] },
  { id: 11, name: "Simran Kapoor", interests: ["Ethical Hacking", "Penetration Testing"] },
  { id: 12, name: "Manav Bhatia", interests: ["Figma", "User Research", "Prototyping"] },
  { id: 13, name: "Avni Joshi", interests: ["Python", "Pandas", "Data Cleaning"] },
  { id: 14, name: "Ritika Rao", interests: ["Flutter", "Dart", "UI/UX Design"] },
  { id: 15, name: "Sahil Mehta", interests: ["Ethereum", "Solidity", "Decentralized Apps"] },
  { id: 16, name: "Tanvi Iyer", interests: ["Power BI", "Tableau", "Business Intelligence"] },
  { id: 17, name: "Kartik Sinha", interests: ["AWS", "Serverless", "Cloud Architecture"] },
  { id: 18, name: "Jiya Khan", interests: ["Android", "Kotlin", "Mobile Development"] },
  { id: 19, name: "Abhinav Roy", interests: ["Machine Learning", "Computer Vision"] },
  { id: 20, name: "Palak Chaudhary", interests: ["React Native", "Mobile Development", "JavaScript"] }
];


module.exports = { mentors, mentees };
