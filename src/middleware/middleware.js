// signup.js

import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import hospitalDetails from "@/model/hospitalDetails";
import bcryptjs from "bcryptjs";
import multer from "multer";

connect();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await upload.single("registrationCertificateImage")(req, res);

    // Use req.body directly instead of JSON.parse
    const reqBody = req.body;
    console.log(reqBody);

    const hospital = await hospitalDetails.findOne({ email: reqBody.email });

    if (hospital) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(reqBody.password, salt);

    const newHospital = new hospitalDetails({
      hospitalName: reqBody.hospitalName,
      email: reqBody.email,
      address: reqBody.address,
      city: reqBody.city,
      state: reqBody.state,
      pincode: reqBody.pincode,
      hospitalResgistrationDate: reqBody.hospitalResgistrationDate,
      ambulance: reqBody.ambulance,
      contact: reqBody.contact,
      hospitalResgistrationNumber: reqBody.hospitalResgistrationNumber,
      emergencyWardNumber: reqBody.emergencyWardNumber,
      registrationCertificateImage: req.file.buffer.toString("base64"),
      password: hashedPassword,
    });

    const savedHospital = await newHospital.save();
    console.log(savedHospital);

    res.json({
      message: "Hospital created successfully",
      success: true,
      savedHospital,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
