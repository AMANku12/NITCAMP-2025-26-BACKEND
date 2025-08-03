const { mentors, mentees } = require("./matching.test");

// 1. Build global area list
const allAreas = new Set();
mentors.forEach(m => m.expertise.forEach(a => allAreas.add(a)));
mentees.forEach(m => m.interests.forEach(a => allAreas.add(a)));
const areaList = Array.from(allAreas);
const areaMap = Object.fromEntries(areaList.map((area, i) => [area, i]));

// 2. Turn area lists into binary vectors
function toVector(areas) {
  const vec = new Array(areaList.length).fill(0);
  areas.forEach(area => {
    if (areaMap[area] !== undefined) vec[areaMap[area]] = 1;
  });
  return vec;
}

// 3. Cosine similarity
function cosine(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-9);
}

// 4. Preprocess mentor/mentee vectors
mentors.forEach(m => m.vec = toVector(m.expertise));
mentees.forEach(m => m.vec = toVector(m.interests));

// 5. Compute similarity matrix
const similarityMatrix = mentees.map(mentee =>
  mentors.map(mentor => cosine(mentee.vec, mentor.vec))
);

console.log(similarityMatrix);

// 6. Sort mentees by max similarity (to favor high-match first)
const menteeOrder = mentees
  .map((mentee, i) => ({
    index: i,
    maxScore: Math.max(...similarityMatrix[i])
  }))
  .sort((a, b) => b.maxScore - a.maxScore)
  .map(entry => entry.index);

// 7. Greedy assignment
const assignments = [];

menteeOrder.forEach(menteeIdx => {
  const mentee = mentees[menteeIdx];
  const mentorRankings = mentors
    .map((mentor, j) => ({
      mentor,
      score: similarityMatrix[menteeIdx][j]
    }))
    .sort((a, b) => b.score - a.score);

  for (const { mentor, score } of mentorRankings) {
    if (mentor.menteeCapacity > 0) {
      assignments.push({
        menteeId: mentee.id,
        menteeName: mentee.name,
        mentorId: mentor.id,
        mentorName: mentor.name,
        score: +score.toFixed(3)
      });
      mentor.menteeCapacity -= 1;
      break;
    }
  }
});

// 8. Output
console.log("🎯 Mentor-Mentee Match Results:\n");
assignments.forEach(({ menteeName, mentorName, score }) => {
  console.log(`👉 ${menteeName} → ${mentorName} (Score: ${score})`);
});

const unmatched = mentees.length - assignments.length;
if (unmatched > 0) {
  console.log(`\n⚠️  ${unmatched} mentee(s) could not be matched due to capacity limits.`);
}


// � Rohan Das → Vikram Singh (Score: 0.894)
// � Isha Gupta → Rohit Verma (Score: 0.866)
// � Ananya Pillai → Rahul Mehta (Score: 0.866)
// � Tanya Sharma → Sneha Patel (Score: 0.816)
// � Yuvraj Singh → Neha Desai (Score: 0.816)
// � Kunal Reddy → Manish Gupta (Score: 0.667)
// � Aarav Singh → Priya Sharma (Score: 0.577)
// � Devansh Patel → Kavita Joshi (Score: 0.577)
// � Megha Nair → Aditya Rao (Score: 0.577)
// � Nisha Verma → Rohit Verma (Score: 0)
// � Manav Bhatia → Aisha Khan (Score: 0.577)
// � Avni Joshi → Rohit Verma (Score: 0.577)
// � Ritika Rao → Aisha Khan (Score: 0.289)
// � Sahil Mehta → Kavita Joshi (Score: 0.577)
// � Tanvi Iyer → Rahul Mehta (Score: 0.577)
// � Jiya Khan → Rohit Verma (Score: 0)
// � Simran Kapoor → Sneha Patel (Score: 0.408)
// � Abhinav Roy → Rohit Verma (Score: 0.354)
// � Palak Chaudhary → Vikram Singh (Score: 0)
// � Kartik Sinha → Vikram Singh (Score: 0.258)