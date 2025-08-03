// --- Mentor Pool: 20 mentors with their areas of expertise ---
const mentors = [
  {
    id: 1,
    name: "Priya Sharma",
    expertise: ["Web Development", "React.js", "Node.js", "MERN Stack"],
    menteeCapacity: 3
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
    menteeCapacity: 2
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
    menteeCapacity: 4
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
    menteeCapacity: 3
  },
  {
    id: 11,
    name: "Arjun Nair",
    expertise: ["Game Development", "Unity", "C#", "3D Modeling"],
    menteeCapacity: 2
  },
  {
    id: 12,
    name: "Deepika Iyer",
    expertise: ["Product Management", "Agile", "Scrum", "User Stories"],
    menteeCapacity: 4
  },
  {
    id: 13,
    name: "Sanjay Kumar",
    expertise: ["Backend Development", "Java", "Spring Boot", "Microservices"],
    menteeCapacity: 3
  },
  {
    id: 14,
    name: "Ritu Agarwal",
    expertise: ["IoT", "Arduino", "Raspberry Pi", "Embedded Systems"],
    menteeCapacity: 2
  },
  {
    id: 15,
    name: "Karan Thakur",
    expertise: ["Database Management", "SQL", "MongoDB", "PostgreSQL"],
    menteeCapacity: 3
  },
  {
    id: 16,
    name: "Pooja Reddy",
    expertise: ["Quality Assurance", "Test Automation", "Selenium", "Jest"],
    menteeCapacity: 2
  },
  {
    id: 17,
    name: "Abhishek Sharma",
    expertise: ["Computer Vision", "OpenCV", "Image Processing", "Deep Learning"],
    menteeCapacity: 2
  },
  {
    id: 18,
    name: "Meera Pillai",
    expertise: ["Content Strategy", "Technical Writing", "Documentation", "SEO"],
    menteeCapacity: 3
  },
  {
    id: 19,
    name: "Nitin Bansal",
    expertise: ["Robotics", "ROS", "Automation", "Control Systems"],
    menteeCapacity: 1
  },
  {
    id: 20,
    name: "Swati Gupta",
    expertise: ["Digital Marketing", "Analytics", "Social Media", "Growth Hacking"],
    menteeCapacity: 2
  }
];

// --- Mentee Interests: 50 mentees with diverse interests including edge cases ---
const mentees = [
  // Perfect matches
  { id: 1, name: "Aarav Singh", interests: ["Web Development", "React.js", "UI/UX Design"] },
  { id: 2, name: "Isha Gupta", interests: ["Data Science", "Machine Learning", "Python"] },
  { id: 3, name: "Devansh Patel", interests: ["Blockchain", "Smart Contracts", "Cryptography"] },
  { id: 4, name: "Tanya Sharma", interests: ["Cybersecurity", "Network Security"] },
  { id: 5, name: "Rohan Das", interests: ["Cloud Computing", "Docker", "Kubernetes", "DevOps"] },
  
  // Good matches
  { id: 6, name: "Megha Nair", interests: ["Mobile Development", "Android", "iOS"] },
  { id: 7, name: "Kunal Reddy", interests: ["AI Ethics", "NLP", "TensorFlow"] },
  { id: 8, name: "Nisha Verma", interests: ["MERN Stack", "Node.js", "Express.js"] },
  { id: 9, name: "Ananya Pillai", interests: ["Data Visualization", "D3.js", "Tableau"] },
  { id: 10, name: "Yuvraj Singh", interests: ["Chemical Process Engineering", "Sustainability"] },
  
  // Medium matches
  { id: 11, name: "Simran Kapoor", interests: ["Ethical Hacking", "Penetration Testing"] },
  { id: 12, name: "Manav Bhatia", interests: ["Figma", "User Research", "Prototyping"] },
  { id: 13, name: "Avni Joshi", interests: ["Python", "Pandas", "Data Cleaning"] },
  { id: 14, name: "Ritika Rao", interests: ["Flutter", "Dart", "UI/UX Design"] },
  { id: 15, name: "Sahil Mehta", interests: ["Ethereum", "Solidity", "Decentralized Apps"] },
  
  // Additional regular matches
  { id: 16, name: "Tanvi Iyer", interests: ["Power BI", "Tableau", "Business Intelligence"] },
  { id: 17, name: "Kartik Sinha", interests: ["AWS", "Serverless", "Cloud Architecture"] },
  { id: 18, name: "Jiya Khan", interests: ["Android", "Kotlin", "Mobile Development"] },
  { id: 19, name: "Abhinav Roy", interests: ["Machine Learning", "Computer Vision"] },
  { id: 20, name: "Palak Chaudhary", interests: ["React Native", "Mobile Development", "JavaScript"] },
  
  // Game Development enthusiasts
  { id: 21, name: "Varun Agarwal", interests: ["Game Development", "Unity", "C#"] },
  { id: 22, name: "Priyanka Jain", interests: ["Unity", "3D Modeling", "Animation"] },
  
  // Product Management focused
  { id: 23, name: "Harsh Gupta", interests: ["Product Management", "Agile", "User Stories"] },
  { id: 24, name: "Divya Sharma", interests: ["Scrum", "Project Management", "Agile"] },
  
  // Backend Development
  { id: 25, name: "Ravi Kumar", interests: ["Backend Development", "Java", "Spring Boot"] },
  { id: 26, name: "Shreya Patel", interests: ["Java", "Microservices", "Spring Boot"] },
  
  // IoT and Embedded Systems
  { id: 27, name: "Akash Verma", interests: ["IoT", "Arduino", "Raspberry Pi"] },
  { id: 28, name: "Nidhi Singh", interests: ["Embedded Systems", "Arduino", "Sensors"] },
  
  // Database enthusiasts
  { id: 29, name: "Gaurav Mishra", interests: ["Database Management", "SQL", "MongoDB"] },
  { id: 30, name: "Anjali Rao", interests: ["PostgreSQL", "Database Design", "SQL"] },
  
  // QA and Testing
  { id: 31, name: "Siddharth Joshi", interests: ["Quality Assurance", "Test Automation", "Selenium"] },
  { id: 32, name: "Kavya Desai", interests: ["Jest", "Testing", "Quality Assurance"] },
  
  // Computer Vision
  { id: 33, name: "Arun Nair", interests: ["Computer Vision", "OpenCV", "Image Processing"] },
  { id: 34, name: "Swara Iyer", interests: ["Deep Learning", "Computer Vision", "AI"] },
  
  // Technical Writing
  { id: 35, name: "Rajesh Kumar", interests: ["Technical Writing", "Documentation", "Content Strategy"] },
  { id: 36, name: "Madhuri Pillai", interests: ["SEO", "Content Strategy", "Digital Marketing"] },
  
  // Robotics
  { id: 37, name: "Vikash Singh", interests: ["Robotics", "ROS", "Automation"] },
  
  // Digital Marketing
  { id: 38, name: "Preeti Agarwal", interests: ["Digital Marketing", "Analytics", "Social Media"] },
  { id: 39, name: "Rohit Sharma", interests: ["Growth Hacking", "Analytics", "Marketing"] },
  
  // Edge Case: No matching interests
  { id: 40, name: "Arpit Bansal", interests: ["Quantum Computing", "Cryptography", "Theoretical Physics"] },
  { id: 41, name: "Nisha Thakur", interests: ["Biotechnology", "Genetics", "Bioinformatics"] },
  { id: 42, name: "Akshay Reddy", interests: ["Aerospace Engineering", "Satellite Technology", "Space Systems"] },
  
  // Edge Case: Single interest
  { id: 43, name: "Deepak Mehta", interests: ["Python"] },
  { id: 44, name: "Priya Joshi", interests: ["React.js"] },
  
  // Edge Case: Very broad interests
  { id: 45, name: "Ankit Gupta", interests: ["Web Development", "Data Science", "Machine Learning", "Cloud Computing", "Blockchain"] },
  
  // Edge Case: Partial matches with uncommon combinations
  { id: 46, name: "Riya Kapoor", interests: ["UI/UX Design", "Machine Learning", "Sustainability"] },
  { id: 47, name: "Nikhil Agarwal", interests: ["Cybersecurity", "Game Development", "Robotics"] },
  
  // Edge Case: Common tech stack combinations
  { id: 48, name: "Pooja Singh", interests: ["React.js", "Node.js", "MongoDB"] },
  { id: 49, name: "Karthik Iyer", interests: ["Python", "Django", "PostgreSQL"] },
  { id: 50, name: "Sneha Reddy", interests: ["Flutter", "Firebase", "Mobile Development"] }
];

module.exports = { mentors, mentees };

