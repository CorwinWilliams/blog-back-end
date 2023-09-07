import Sequelize from "sequelize";
import PostModel from "./post.js";
import CommentModel from "./Comment.js";

process.env.DATABSE_URL;

const db = new Sequelize("postgres://corwin@localhost:5432/blog");

const Post = PostModel(db);
const Comment = CommentModel(db);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connected to database");

        //Comment.belongsTo(Post, { foreignKey: "postID" });
        Post.hasMany(Comment, { foreignKey: "postID" });

        db.sync();
    } catch (error) {
        console.error(error);
        console.error("PANIC! DB ISSUE.");
    }
};

connectToDB();

export { db, Post, Comment };
