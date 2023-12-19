import mongoose from "mongoose";
// name, email, mobile, address, message
const contectSchema = new mongoose.Schema({
    
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      mobile: {
        type: String,
      },
      address: {
        type: String,
      },
      message: {
        type: String,
      },
   
    
});

const ContectModel = mongoose.model("contect", contectSchema);
export default ContectModel;
