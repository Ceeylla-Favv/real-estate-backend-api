const hotelModel = require('../model/Hotel');

const createHotel = async(req, res)=>{
    const {hotelName, address, price} = req.body
    if(!hotelName, !address, !price){
        res.json({error: "please fill all credentials"})
    }


    try {
         // to upload the main image
         let hotelImage;
         let uploadPath;
         let fileName;
 
         if (!req.files || Object.keys(req.files).length === 0) {
             return res.status(400).send('No files were uploaded.');
         }
 
         hotelImage = req.files.image;
         fileName = "/uploads/" + new Date().getTimezoneOffset() + hotelImage.name
 
         uploadPath = __dirname + '/uploads/' + hotelImage.name;
 
         hotelImage.mv(uploadPath, function(err) {
             if (err) {
               return res.status(500).json({err: "New Error: " + err.message});
             }
 
         })
    //   to upload other images 
    // const otherImage = []
    // req.files.otherImage = !req.files.otherImage.length
    // ? [req.files.otherImage]
    // :req.files.otherImage

    // for(let i=0; i < req.files.otherImage.filePath; i++){
    //     const otherImage = req.files.otherImage[1]
    //     let otherImagePath = __dirname + '/uploads/' + otherImage.name

    //     await new Promise((resolve)=>{
    //         otherImage.mv(otherImagePath, (err)=>{
    //             if (err) throw err;
    //             console.log(otherImage)
    //             if(!err) otherImage.push(`uploads${otherImage.name}`);
    //             resolve(true)
    //         })
    //     })
    // }


    const createHotel = new hotelModel({image: fileName , hotelName, address, price, owner:req.user._id})
    if(!createHotel){
        res.status(500).json({error: "unable to upload new estate"})
    }
    res.json({message: "hotel added successfully", createHotel})

    } catch (error) {
        console.log(error.message);
        
    }
}

// getting all hotels
const getAllHotels = async(req, res)=>{
    const getAll = await hotelModel.find()
    if(!getAll){
        return res.status(404).json({error: "unable to get all apartment"})
    }
    res.json({hotels: getAll})
}

// get one hotel
const getOneHotel = async(req, res)=>{
    const {hotelName} = req.params
    const findHotel = await hotelModel.findOne({hotelName})
    if(!findHotel){
       return res.status(404).json({error: "this hotel is not available"})
    }
    res.json({findHotel})
}

// delete uploaded hotel
const deleteHotel = async(req, res)=>{
    const {hotelName} =req.params
        const deleteHotel = await hotelModel.findOneAndDelete({hotelName})
        if(!deleteHotel){
           return res.json({error: "unable to delete apartment"})
        }
        res.json({message: "apartment was deleted successfully"})
}

// update hotel
const updateHotel = async(req, res)=>{
    const {hotelName} = req.params;
    const updateHotel = await hotelModel.findOneAndUpdate({hotelName}, req.body, {runValidator: true , new: true})
    if(!updateHotel){
       return res.json({error: "unable to update"}, req.body, {runValidator: true , new: true})
    }
    res.json({message: "apartment was updated successfully", updateHotel})
}
module.exports = {
    createHotel, 
    getAllHotels,
    getOneHotel,
    deleteHotel,
    updateHotel
}