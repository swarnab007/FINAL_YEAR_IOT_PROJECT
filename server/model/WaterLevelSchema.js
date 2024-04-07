const mongoose=require("mongoose")
const waterLevelSchema = new mongoose.Schema({
    distance: Number,
    timestamp: { type: Date, default: Date.now }
});
module.exports=mongoose.model("waterLevel",waterLevelSchema);
