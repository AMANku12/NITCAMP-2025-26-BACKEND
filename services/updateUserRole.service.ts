import User from "../models/User.model";

export const updateUser = async(user: any, role: string)=>{

    try {
        const updatedUser = await User.update({role: role}, {where: {id: user.id}, returning: true});
        console.log("User updated:", updatedUser[1][0].toJSON());
        
        // Check if the update was successful and user was returned
        if (updatedUser[1] && updatedUser[1][0]) {
            const userInstance = updatedUser[1][0];
            // Try toJSON, fallback to dataValues if toJSON doesn't exist
            return userInstance.toJSON ? userInstance.toJSON() : userInstance.dataValues;
        } else {
            throw new Error("User update failed - no user returned");
        }

    } catch (error) {
        console.error("Error in updateUser service:", error);
        throw error;
    }
}
