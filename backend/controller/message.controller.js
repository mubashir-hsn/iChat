import Conversation from "../models/conversation.model.js";  
import Message from "../models/message.model.js";
import { getReceiverSocketId ,io} from "../socketIO/server.js";
import axios from "axios";

export const sendMessage = async (req, res) => {

  const { id: receiverId } = req.params
  const senderId = req.user._id  // current logged in user.
  const { message } = req.body
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    })
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if (newMessage) {
      conversation.messages.push(newMessage)
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json(newMessage)

  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: chatUserId } = req.params;
    const senderId = req.user._id;  // current logged in user

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUserId] }
    }).populate('messages')

    if (!conversation) {
      return res.status(201).json([])
    }

    const messages = conversation.messages;
    res.status(201).json(messages)

  } catch (error) {
    console.log("Error in getMessage: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


