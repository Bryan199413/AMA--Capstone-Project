import Friend from "../Models/Friend.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const getAllFriends = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;

        const friends = await Friend.findOne({ userId: loggedInUserID }).populate({
            path: 'friends',
            select: 'userId avatar username _id'
        });

        const friendData = friends.friends.map(friend => ({
            userId: friend.userId,
            avatar: friend.avatar,
            username: friend.username,
            _id: friend._id
        }));

        res.status(200).json(friendData);
    } catch (error) {
        console.error('Error in getAllFriends:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const unfriend = async (req, res) => {
    try {
        const { id:friendId } = req.params;
        const loggedInUserID = req.user._id;

        await Friend.findOneAndUpdate(
            { userId: loggedInUserID },
            { $pull: { friends: friendId } }
        );

        await Friend.findOneAndUpdate(
            { userId: friendId },
            { $pull: { friends: loggedInUserID } }
        );
        
        const receiverSocketId = getReceiverSocketId(friendId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("unfriend", friendId);
        }

        res.status(200).json({ message: 'Successfully unfriended user.' });
    } catch (error) {
        console.error('Error in unfriend:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};