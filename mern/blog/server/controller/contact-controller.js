import Contact from '../model/contact.js';

export const contactUs = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        return res.status(200).json({
            message: "Message sent successfully"
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error while sending message"
        })
    }

}