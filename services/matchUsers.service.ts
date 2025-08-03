import { shuffle } from "lodash";
import Mentor from "../models/mentor.model";

function calculateScore(interests: any, expertise: any){
    var score = 0;
    for (let i = 0; i < interests.length; i++) {
        if (expertise.includes(interests[i])) {
            score++;
        }
    }
    return score;
}

function createScoreMatrix(mentees: any, mentors: any){
    const rows = mentees.length;
    const cols = mentors.length;
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var combinedMenteesInterests = mentees[i].broad_area_of_interest.concat(mentees[i].narrow_area_of_interest);

            var combinedMentorExpertise = mentors[j].broad_area_of_expertise.concat(mentors[j].narrow_area_of_expertise);

            matrix[i][j] = calculateScore(combinedMenteesInterests, combinedMentorExpertise);
        }
    }
    return matrix;
}

function findFirstMax(matrix: any){
    let max = [0, -1, -1];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > max[0]) {
                max = [matrix[i][j], i, j];
            }
        }
    }
    return max;
}

function getCommonAreas(menteeAreas: any, mentorAreas: any){
    return menteeAreas.filter((area: any) => mentorAreas.includes(area));
}

async function matchMenteesAndMentors(mentees: any, mentors: any, matrix: any){
    const matchedResults = [];
    while (true) {
        let [score, menteeIdx, mentorIdx] = findFirstMax(matrix);
        if (score === 0) break;

        // Mark this mentee as matched (set entire row to -1)
        matrix[menteeIdx].fill(-1);
        // console.log("matrix updated");
        // printMatrix(matrix);

        // Decrease mentor capacity
        mentors[mentorIdx].mentee_capacity -= 1;
        await Mentor.update({ mentee_capacity: mentors[mentorIdx].mentee_capacity }, { where: { user_id: mentors[mentorIdx].user_id } });

        const mentee = mentees[menteeIdx];
        const mentor = mentors[mentorIdx];

        const menteeInterests = mentee.broad_area_of_interest.concat(mentee.narrow_area_of_interest);
        const mentorExpertise = mentor.broad_area_of_expertise.concat(mentor.narrow_area_of_expertise);

        const common_areas = getCommonAreas(menteeInterests, mentorExpertise);

        matchedResults.push({
            mentee_user_id: mentee.user_id ,
            mentor_user_id: mentor.user_id ,
            common_areas
        });

        // If mentor has no capacity left, mark entire column as -1
        if (mentors[mentorIdx].mentee_capacity <= 0) {
            for (let i = 0; i < matrix.length; i++) {
                matrix[i][mentorIdx] = -1;
            }
        }
    }
    return matchedResults;
}

export const matchUsers = async(Mentees: any, Mentors: any)=>{
    try {
        Mentees = shuffle(Mentees);
        Mentors = shuffle(Mentors);

        const matrix = createScoreMatrix(Mentees, Mentors);

        console.log("Matrix created:", matrix);

        const matchedResults = await matchMenteesAndMentors(Mentees, Mentors,matrix);
        
        return matchedResults;

    } catch (error) {
        throw error;
    }
}