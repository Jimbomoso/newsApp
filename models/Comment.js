// Require mongoose
const mongoose = require("mongoose");

// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const CommentSchema = new Schema({
	// title is a require string
	title: {
		type: String,
		require: true
	},
	// Link is a require string
	body: {
		type: String,
		require: true
	},
	
});

// Create the Article model with the ArticleSchema
const Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;