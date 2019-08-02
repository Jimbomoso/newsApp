// Require mongoose
const mongoose = require("mongoose");

// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const ArticleSchema = new Schema({
	// title is a require string
	title: {
		type: String,
		require: true
	},
	// Link is a require string
	link: {
		type: String,
		require: true
	},
	// This only saves one comment's ObjectId, ref refers to the comment model
	comment: [{
    type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

// Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;