const mongoose=require("mongoose")
const stepCountSchema = new mongoose.Schema({
    steps: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});
module.exports=mongoose.model("stepCount",stepCountSchema);
