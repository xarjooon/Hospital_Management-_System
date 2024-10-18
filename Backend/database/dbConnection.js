import mongoose from 'mongoose'

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONG0_URI).then(()=>{
        console.log("mongoDB connected successfully...")
    }).catch((err)=>{
        console.log(`Some error occured while connecting to the Database: ${err}`)
    });
}