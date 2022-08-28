import Post from "../model/post.js"

export const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save()
        return res.status(200).json({
            isSuccess: true,
            message: "Post created successfully"
        })
    } catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Something went wrong"
        })
    }
}

export const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let username = req.query.usernam;
    let posts;
    try {
        if (category) {
            posts = await Post.find({ category: category }).sort({_id: -1});
        }else if(username){
            posts = await Post.find({ username: username }).sort({_id: -1});
        }else {
            posts = await Post.find({}).sort({_id: -1});
        }
        return res.status(200).json({
            isSuccess: true,
            data: posts,
            count: posts.length
        })
    } catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}

export const getPost = async (req, res) => {
    let id = req.params.id;
    try {
        const post = await Post.findById(id);
        return res.status(200).json({
            isSuccess: true,
            data: post
        })
    } catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}

export const updatePost = async (req, res) => {
    let id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                isSuccess: false,
                message: "Post not found"
            })
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        return res.status(200).json({
            isSuccess: true,
            data: updatedPost,
            message: "Post updated successfully"
        })
    } catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}

export const deletePost = async (req, res) => {
    let id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                isSuccess: false,
                message: "Post not found"
            })
        }
        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            isSuccess: true,
            message: "Post deleted successfully"
        })
    } catch (e) {
        return res.status(500).json({
            isSuccess: false,
            message: "Try Again"
        })
    }
}


