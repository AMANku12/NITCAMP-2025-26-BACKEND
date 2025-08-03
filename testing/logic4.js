const {generateMenteeData, generateMentorData} = require("./randomDataGenerator");

function createScoreMatrix(mentees, mentors) {
    const rows = mentees.length;
    const cols = mentors.length;
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = calculateScore(mentees[i].interests, mentors[j].expertise);
        }
    }
    return matrix;
}

function calculateScore(menteeAreas, mentorAreas) {
    return menteeAreas.filter(area => mentorAreas.includes(area)).length;
}

function getCommonAreas(menteeAreas, mentorAreas) {
    return menteeAreas.filter(area => mentorAreas.includes(area));
}

function findFirstMax(matrix) {
    let max = [0, -1, -1];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] > max[0]) {
                max[0] = matrix[i][j];
                max[1] = i;
                max[2] = j;
            }
        }
    }
    return max;
}

function matchMenteesAndMentors(mentees, mentors, matrix) {
    const matchedResults = [];
    while (true) {
        let [score, menteeIdx, mentorIdx] = findFirstMax(matrix);
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function matchUsers(no_of_mentees, no_of_mentors, maximum_mentee_capacity){
    const mentees = generateMenteeData(no_of_mentees);
    // console.log(mentees);

    const mentors = generateMentorData(no_of_mentors, maximum_mentee_capacity);
    // console.log(mentors);

    shuffleArray(mentees);
    shuffleArray(mentors);

    const matrix = createScoreMatrix(mentees, mentors);

    const matchedResults = matchMenteesAndMentors(mentees, mentors,matrix);

    const percentage_unmatched = ((mentees.length - matchedResults.length) / mentees.length) * 100;

    return percentage_unmatched;
}

function get_statistics(run, no_of_mentees, no_of_mentors, maximum_mentee_capacity){
    const results = [];
    for(let i=0;i<run;i++){
        results.push(matchUsers(no_of_mentees, no_of_mentors, maximum_mentee_capacity));
    }

    return results;
}

console.log("statistics:-", get_statistics(10, 100, 200, 2));

