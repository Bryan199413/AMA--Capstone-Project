import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
        ],
    },
    { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
