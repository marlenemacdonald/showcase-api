var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	userId: String,
    name: String,
    completed: {
    	type: Boolean,
    	default: false
    },
    updated_at: {
        type: Date, 
        default: Date.now 
    }
}, { collection: "todos" });

module.exports = mongoose.model('Task', TaskSchema);