// const { mentors, mentees } = require("./matching.test");

const mentors = [
  { id: 1, name: "Mentor A", expertise: ["JavaScript", "React", "Node.js"], menteeCapacity: 2 },
  { id: 2, name: "Mentor B", expertise: ["Python", "Data Science", "Machine Learning"], menteeCapacity: 1 },
  { id: 3, name: "Mentor C", expertise: ["UI/UX Design", "Figma", "User Research"], menteeCapacity: 1 }
];

const mentees = [
  { id: 1, name: "Mentee 1", interests: ["React", "UI/UX Design"] },
  { id: 2, name: "Mentee 2", interests: ["Python", "Machine Learning"] },
  { id: 3, name: "Mentee 3", interests: ["Node.js", "JavaScript", "Cloud Computing"] },
  { id: 4, name: "Mentee 4", interests: ["Figma", "Prototyping"] }
];

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

function createScoreMatrix(mentees, mentors) {
    const rows = mentees.length;
    const cols = mentors.length;
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = calculateScore(mentees[i].interests, mentors[j].expertise);
        }
    }
    // printMatrix(matrix);
    return matrix;
}

function calculateScore(menteeAreas, mentorAreas) {
    return menteeAreas.filter(area => mentorAreas.includes(area)).length;
}

function getCommonAreas(menteeAreas, mentorAreas) {
    return menteeAreas.filter(area => mentorAreas.includes(area));
}

function findLastMax(matrix) {
    let max = [0, -1, -1];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] >= max[0]) {
                max[0] = matrix[i][j];
                max[1] = i;
                max[2] = j;
            }
        }
    }
    // console.log(max);
    return max;
}

function matchMenteesAndMentors(mentees, mentors, matrix) {
    const matchedResults = [];
    while (true) {
        let [score, menteeIdx, mentorIdx] = findLastMax(matrix);
        if (score === 0) break;

        // Mark this mentee as matched (set entire row to -1)
        matrix[menteeIdx].fill(-1);
        // console.log("matrix updated");
        // printMatrix(matrix);

        // Decrease mentor capacity
        mentors[mentorIdx].menteeCapacity -= 1;

        const mentee = mentees[menteeIdx];
        const mentor = mentors[mentorIdx];
        const commonAreas = getCommonAreas(mentee.interests, mentor.expertise);

        matchedResults.push({
            mentee_id: mentee.id ,
            mentor_id: mentor.id ,
            score,
            commonAreas
        });

        // If mentor has no capacity left, mark entire column as -1
        if (mentors[mentorIdx].menteeCapacity <= 0) {
            for (let i = 0; i < matrix.length; i++) {
                matrix[i][mentorIdx] = -1;
            }
        }
    }
    return matchedResults;
}

function groupMatchesByScore(matchedResults) {
    const scoreGroups = {};
    matchedResults.forEach(match => {
        if (!scoreGroups[match.score]) scoreGroups[match.score] = [];
        scoreGroups[match.score].push(match);
    });
    return scoreGroups;
}

module.exports = {matchMenteesAndMentors, createScoreMatrix};

// function printResults(mentees, mentors, matchedResults) {
//     matchedResults.sort((a, b) => a.mentee.id - b.mentee.id);

//     console.log("=== MENTOR-MENTEE MATCHING RESULTS ===");
//     console.log(`Total Mentees: ${mentees.length}`);
//     console.log(`Total Mentors: ${mentors.length}`);
//     console.log(`Total Matches: ${matchedResults.length}`);
//     console.log(`Unmatched Mentees: ${mentees.length - matchedResults.length}\n`);

//     // Group by score for analysis
//     const scoreGroups = groupMatchesByScore(matchedResults);
//     console.log("=== MATCH QUALITY ANALYSIS ===");
//     Object.keys(scoreGroups).sort((a, b) => b - a).forEach(score => {
//         console.log(`Score ${score}: ${scoreGroups[score].length} matches`);
//     });
//     console.log();

//     console.log("=== DETAILED MATCHES ===");
//     matchedResults.forEach(match => {
//         console.log(`${match.mentee.name} (ID: ${match.mentee.id}) -> ${match.mentor.name} (ID: ${match.mentor.id})`);
//         console.log(`  Score: ${match.score}, Common Areas: [${match.commonAreas.join(', ')}]`);
//     });
//     console.log();

//     console.log("=== UNMATCHED MENTEES ===");
//     const matchedMenteeIds = new Set(matchedResults.map(m => m.mentee.id));
//     const unmatchedMentees = mentees.filter(mentee => !matchedMenteeIds.has(mentee.id));
//     unmatchedMentees.forEach(mentee => {
//         console.log(`${mentee.name} (ID: ${mentee.id}) - Interests: [${mentee.interests.join(', ')}]`);
//     });
//     console.log();

//     console.log("=== MENTOR CAPACITY UTILIZATION ===");
//     mentors.forEach(mentor => {
//         const used = matchedResults.filter(m => m.mentor.id === mentor.id).length;
//         const originalCapacity = mentor.menteeCapacity + used;
//         console.log(`${mentor.name}: ${used}/${originalCapacity} capacity used`);
//     });
// }

// Main execution
const matrix = createScoreMatrix(mentees, mentors);
const matchedResults = matchMenteesAndMentors(mentees, mentors, matrix);
// printResults(mentees, mentors, matchedResults);
// console.log(matchedResults);


