import mongoose from "mongoose";

const blockedUserSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        blockedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
    },
    { timestamps: true }
);

const BlockedUser = mongoose.model("BlockedUser", blockedUserSchema);

export default BlockedUser;
