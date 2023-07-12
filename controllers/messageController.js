const Messages = require("../models/messageModel");




//from receivemessage Route
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });    // Sorting in ascending order

   
    const projectedMessages = messages.map((msg) => {
      return {                                            //Each message is creating an object with two property: fromSelf and message
        fromSelf: msg.sender.toString() === from,           //fromSelf is a bollean exprsssion
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};




module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
