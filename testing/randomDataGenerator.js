const areas = require("./areasData").test_areas;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandomElements(arr, n) {
    // Make a shallow copy to avoid mutating the original array
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function generateMenteeData(no_of_mentees){
    let mentees = [];
    let maximumSelections = 15;

    for(let i=1;i<=no_of_mentees;i++){
        const areas_length = Math.floor(Math.random() * maximumSelections) + 1;
        const area_of_interest = getRandomElements(areas, areas_length);

        const mentee = {
            id: i,
            interests: area_of_interest
        }

        mentees.push(mentee);
    }

    return mentees;
}

function generateMentorData(no_of_mentors, maximum_mentee_capacity){
    let mentors = [];
    let maximumSelections = 15;

    for(let i=1;i<=no_of_mentors;i++){
        const areas_length = Math.floor(Math.random() * maximumSelections) + 1;

        const area_of_expertise = getRandomElements(areas, areas_length);

        const mentee_capacity = Math.floor(Math.random() * maximum_mentee_capacity) + 1;

        const mentor = {
            id: i,
            menteeCapacity: mentee_capacity,
            expertise: area_of_expertise
        }

        mentors.push(mentor);
    }

    return mentors;
}

module.exports = {generateMenteeData, generateMentorData};


// console.log(generateMenteeData(no_of_mentees));
// console.log(generateMentorData(10, 5));