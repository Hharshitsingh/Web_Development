import Comment from "../model/comment.js";

export const addComment = async (req, res) => {
    let id = req.body.postId
    try {
        const comment = new Comment(req.body)
        await comment.save()
        return res.status(200).json({
            isSuccess: true,
            data: comment,
            message: "Comment added successfully"
        })
    }
    catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).sort({_id: -1})
        return res.status(200).json({
            isSuccess: true,
            data: comments,
            message: "Comments found successfully"
        })
    }
    catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            isSuccess: true,
            message: "Comment deleted successfully"
        })
    }
    catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}