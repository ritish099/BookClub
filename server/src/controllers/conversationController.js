import Conversation from "../models/Conversation.js";

//new conv

const newConversationController = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

//get conv of a user

const getConversationController = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get conv includes two userId

const getConversationTwoUserController = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        console.log(conversation);
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json({
            message: "No such convertations found"
        });
    }
};

export {
    newConversationController,
    getConversationController,
    getConversationTwoUserController
};