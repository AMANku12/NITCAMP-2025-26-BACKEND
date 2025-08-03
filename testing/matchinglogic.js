const { get } = require("http");

const mentors = require("./matching.test.js").mentors;
const mentees = require("./matching.test.js").mentees;

function getCommonAreas(menteeInterests, mentorExpertise) {
    let commonAreas = [];
    for(let i of menteeInterests) {
        if(mentorExpertise.includes(i)) {
            commonAreas.push(i);
        }
    }
    return commonAreas;
}

const matchedResults = [];

for (let mentee of mentees){
    let menteeId = mentee.id;
    let menteeInterests = mentee.interests;
    let menteeName = mentee.name;
    let maxScore = 0; 
    let matchedMentor = {};
    let matchedAreas = [];

    for(let mentor of mentors){
        let mentorId = mentor.id;
        let mentorExpertise = mentor.expertise;
        let score = 0;
        if(mentor.menteeCapacity <= 0) {
            // console.log(`Mentor: ${mentor.name} (ID: ${mentorId}) has no capacity left.`);
            continue;
        }else{
            let commonAreas = getCommonAreas(menteeInterests, mentorExpertise);
            score = commonAreas.length;
            if(score > maxScore) {
                maxScore = score;
                matchedMentor = mentor;
                matchedAreas = commonAreas;
            }
        }
    }
        if(maxScore > 0) {
            matchedMentor.menteeCapacity -= 1;
            matchedResults.push({
                menteeId: menteeId,
                menteeName: menteeName,
                mentorId: matchedMentor.id,
                mentorName: matchedMentor.name,
                score: maxScore,
                matchedAreas: matchedAreas
            });
        } else {
            console.log(`No suitable mentor found for Mentee: ${menteeName} (ID: ${menteeId})`);
        }
}

console.log("Matched Results:");
matchedResults.forEach(result => {
    console.log(`Mentee: ${result.menteeName} (ID: ${result.menteeId}) is matched with <--> Mentor: ${result.mentorName} with common areas: [${result.matchedAreas.join(", ")}]`);
});



// No suitable mentor found for Mentee: Nisha Verma (ID: 8)
// No suitable mentor found for Mentee: Jiya Khan (ID: 18)
// No suitable mentor found for Mentee: Palak Chaudhary (ID: 20)
// Matched Results:
// Mentee: Aarav Singh (ID: 1) is matched with <--> Mentor: Priya Sharma with common areas: [Web Development, React.js]
// Mentee: Isha Gupta (ID: 2) is matched with <--> Mentor: Rohit Verma with common areas: [Data Science, Machine Learning, Python]
// Mentee: Devansh Patel (ID: 3) is matched with <--> Mentor: Kavita Joshi with common areas: [Blockchain, Smart Contracts]
// Mentee: Tanya Sharma (ID: 4) is matched with <--> Mentor: Sneha Patel with common areas: [Cybersecurity, Network Security]
// Mentee: Rohan Das (ID: 5) is matched with <--> Mentor: Vikram Singh with common areas: [Cloud Computing, Docker, Kubernetes, DevOps]
// Mentee: Megha Nair (ID: 6) is matched with <--> Mentor: Aditya Rao with common areas: [Mobile Development, Android]
// Mentee: Kunal Reddy (ID: 7) is matched with <--> Mentor: Manish Gupta with common areas: [AI Ethics, TensorFlow]
// Mentee: Ananya Pillai (ID: 9) is matched with <--> Mentor: Rahul Mehta with common areas: [Data Visualization, D3.js, Tableau]
// Mentee: Yuvraj Singh (ID: 10) is matched with <--> Mentor: Neha Desai with common areas: [Chemical Process Engineering, Sustainability]
// Mentee: Simran Kapoor (ID: 11) is matched with <--> Mentor: Sneha Patel with common areas: [Ethical Hacking]
// Mentee: Manav Bhatia (ID: 12) is matched with <--> Mentor: Aisha Khan with common areas: [Figma, User Research]
// Mentee: Avni Joshi (ID: 13) is matched with <--> Mentor: Rohit Verma with common areas: [Python, Pandas]
// Mentee: Ritika Rao (ID: 14) is matched with <--> Mentor: Aisha Khan with common areas: [UI/UX Design]
// Mentee: Sahil Mehta (ID: 15) is matched with <--> Mentor: Kavita Joshi with common areas: [Ethereum, Solidity]
// Mentee: Tanvi Iyer (ID: 16) is matched with <--> Mentor: Rahul Mehta with common areas: [Power BI, Tableau]
// Mentee: Kartik Sinha (ID: 17) is matched with <--> Mentor: Vikram Singh with common areas: [AWS]
// Mentee: Abhinav Roy (ID: 19) is matched with <--> Mentor: Rohit Verma with common areas: [Machine Learning]

