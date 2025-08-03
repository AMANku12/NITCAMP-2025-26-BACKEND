export const newMenteeRegistered = (name: string)=>{
    return {
        subject: "Your account has been registered for NITCamp mentoring program",
        text: `Hello ${name},\n\nYour account has been registered for NITCamp mentoring program. We will get back to you soon when we have matched you with a mentor.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    }
}

export const newMentorRegistered = (name: string)=>{
    return {
        subject: "Your account has been registered for NITCamp mentoring program",
        text: `Hello ${name},\n\nYour account has been registered for NITCamp mentoring program. We will get back to you soon when we have matched you with your mentees.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    }
}

export const matchedMenteeEmail = (name: string, mentorName: string)=>{
    return {
        subject: "You have been matched with a mentor",
        text: `Hello ${name},\n\nYou have been matched with a mentor ${mentorName} please check your dashboard for more details.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    }
}

export const matchedMentorEmail = (name: string)=>{
    return {
        subject: "You have been matched with a mentee",
        text: `Hello ${name},\n\nYou have been matched with your mentees please check your dashboard for more details.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    }
}