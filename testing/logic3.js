const {mentors, mentees} = require("./matching.test");

const rows = mentees.length;
const cols = mentors.length;

const matrix = Array.from({length: rows}, ()=> Array(cols).fill(0));


function calculateScore(menteeAreas, mentorAreas){
    let score = 0;
    for(let area of menteeAreas){
        if(mentorAreas.includes(area)){
            score++;
        }
    }
    return score;
}

let i = 0;
for (let mentee of mentees) {
    let menteeAreas = mentee.interests;
	let m1 = Array(cols).fill(0);
    let j=0;

    for(let mentor of mentors){
        let mentorAreas = mentor.expertise;
        let score = calculateScore(menteeAreas, mentorAreas);
        m1[j] = score;
        j++;
    }
    matrix[i] = m1;
    i++;
}

// console.log(matrix);

function findLastMax(matrix){
    let maxiMentee = [0,-1,-1];
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            if(matrix[i][j] >= maxiMentee[0]){
                maxiMentee[0] = matrix[i][j];
                maxiMentee[1] = i;
                maxiMentee[2] = j;
            }
        }
    }
    return maxiMentee;
}

function getCommonAreas(menteeAreas, mentorAreas) {
    return menteeAreas.filter(area => mentorAreas.includes(area));
}

// console.log(findLastMax(matrix));

const matchedResults = [];

while(true){
    let maxiMentee = findLastMax(matrix);
    if(maxiMentee[0]==0){
        break;
    }
    
    for(let j=0;j<matrix[maxiMentee[1]].length;j++){
        matrix[maxiMentee[1]][j] = -1;
    }
    mentees[maxiMentee[1]].menteeCapacity -= 1;
    const mentee = mentees[maxiMentee[1]];
    const mentor = mentors[maxiMentee[2]];
    const commonAreas = getCommonAreas(mentee.interests, mentor.expertise);
    matchedResults.push({
        mentee: { name: mentee.name, id: mentee.id },
        mentor: { name: mentor.name, id: mentor.id },
        score: maxiMentee[0],
        commonAreas // <-- add this to your result
    });
    if(mentee.menteeCapacity<=0){
        for(let i=0;i<maxiMentee[1].length;i++){
            matrix[i][maxiMentee[2]] = -1;
        }
    }
}
// console.log(matrix);
matchedResults.sort((a, b) => a.mentee.id - b.mentee.id);
console.log(matchedResults);