const cloudinary =require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dsura6mor', 
    api_key: '231872737377194', 
    api_secret: 'IJTcMVRCsYTrSnDzSirbOtoLPBA',
    secure:true
});

module.exports= cloudinary