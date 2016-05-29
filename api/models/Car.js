var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    name:        String,
    brand:       String,
    model:       String,
    descritpion: String,
    year:        String,
    color:       String,
    imageSrc:    String,
    rating:      String,
    performance: Boolean,
    luxury:      Boolean,

    updated_at: { type: Date, default: Date.now },
}, { collection: 'cars' });

module.exports = mongoose.model('Car', CarSchema);