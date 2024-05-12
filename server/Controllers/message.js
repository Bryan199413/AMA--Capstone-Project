import Conversation from "../Models/Conversation.js";
import Message from "../Models/Message.js";
import User from "../Models/User.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		  
			const senderData = await User.findById(senderId);
			const receiverData = await User.findById(receiverId);

			const dataForReceiver = {
				_id:senderData._id,
				avatar:senderData.avatar,
				username:senderData.username
			}

			const dataForSender = {
				_id:receiverData._id,
				avatar:receiverData.avatar,
				username:receiverData.username
			}

			const senderSocketId = getReceiverSocketId(senderId);
			const receiverSocketId = getReceiverSocketId(receiverId);
			if (senderSocketId) {
				io.to(senderSocketId).emit("newConversationForSender",dataForSender);
			}
            if(receiverSocketId) {
				io.to(receiverSocketId).emit("newConversationForReceiver",dataForReceiver);
			}
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await conversation.save();
		await newMessage.save();

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// export const readMarkMessage = async (req,res) => {
// 	try {
// 		const {} = req.params
// 	} catch (error) {
// 		console.log("Error in readMarkMessage: ",error.message)
// 		res.status(500).json( {error : "Internal server error "})
// 	}
// }
