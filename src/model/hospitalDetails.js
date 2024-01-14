import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    hospitalResgistrationDate: String,
    ambulance: Number,
    contact: String,
    hospitalResgistrationNumber: String,
    emergencyWardNumber: String,
    registrationCertificateImage: String,
    password: String,

})

const hospitalDetails = mongoose.model("hospital", hospitalSchema);
export default hospitalDetails