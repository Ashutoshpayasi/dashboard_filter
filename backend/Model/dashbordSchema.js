const mongoose=require("mongoose")

const dashSchema=mongoose.Schema({
    end_year: Number,
    intensity: Number,
    sector:String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
})

const Dashbord=mongoose.model("data",dashSchema)

module.exports=Dashbord