const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    },
    fileFilter: (req,file,cb)=>{
        let ext=path.extname(file.originalname);
        
        if(ext!=='.jpg' && ext!=='.png' && ext!=='.jpeg'){
            cb(new Error('File type is not supported'),false);
            return;
        }
        cb(null,true);
    }
})

/*failed version 2 */
// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         console.log('Naming file...');
//         cb(null, file.fieldname + '-' + Date.now);
//     }
// })

// const fileFilter= function (req, file, cb) {
//     console.log("Filtering ...");
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//         cb(new Error("File type is not supported"), false);
//         return;
//     }
//     cb(null, true);
// }

// const upload = multer({
//     storage: storage,
//     limits: {fileSize: 1024*1024},
//     fileFilter: fileFilter,
// })

// module.exports = upload;

/*failed version 1 */
// module.exports = multer({
//     storage: multer.diskStorage({
//         filename: function (req, file, cb) {
//             console.log("Naming file ...");
//             cb(null, file.fieldname + '-' + Date.now);
//         }
//     }),

//     limit: {
//         fileSize: 1024*1024,
//     },

//     fileFilter: (req, file, cb) => {
//         console.log("Filtering ...");
//         let ext = path.extname(file.originalname);
//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//             cb(new Error("File type is not supported"), false);
//             return;
//         }
//         cb(null, true);
//     }
// })