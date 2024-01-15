
import  {connect} from "@/dbconfig/dbconfig";
import Hospital from "@/model/hospitalDetails.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import multer from 'multer';

connect() 

export async function POST(request) {
    try {
      console.log("here 1")
        const reqBody = await request.formData();
        const data = reqBody
        console.log(data)
        console.log("here 2")
        console.log(data.get("registrationCertificateImage"))
        const hospital = await Hospital.findOne({email: data.email}) 
        
        if(hospital){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now()
          cb(null, uniqueSuffix + file.originalname)
        }
      })
      
      const upload = multer({ storage: storage })

      upload.single("registrationCertificateImage")

        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(data.password, salt)

        const newHospital = new Hospital ({
          hospitalName: data.hospitalName,
          email: data.email,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          hospitalResgistrationDate: data.hospitalResgistrationDate,
          ambulance: data.ambulance,
          contact: data.contact,
          hospitalResgistrationNumber: data.hospitalResgistrationNumber,
          emergencyWardNumber: data.emergencyWardNumber,
          registrationCertificateImage: data.registrationCertificateImage,
          password: hashedPassword,

        })

        const savedHospital = await newHospital.save()
        console.log(savedHospital)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedHospital
        })

    } catch (error) {
        console.error("Error:", error);  // Log the error to the console
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}