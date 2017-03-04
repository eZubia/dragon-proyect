/**
 * Created by erikzubia on 3/1/17.
 */
var mongoose = require('./../configDB/MongooseConfig').getInstance();
var Schema = mongoose.Schema;
var Proyecto = mongoose.model("Proyecto");

var metaSchema = new Schema({
    claveMeta:{type:Number, required:true},
    descripcionMeta:{type:String, required:true},
    prioridad: {type: String, enum: ['Alta.', 'Baja', 'Media']},
    activa:{type:Boolean, required:true},
    proyecto:{type: Schema.ObjectId, ref: "Proyecto", required: true},

});

var Meta = mongoose.model("Meta", metaSchema);
module.exports = Meta;
// module.exports.listOfMetas = function(id) {
//      Meta.find({"proyecto": mongoose.Types.ObjectId(id)})
//     .exec(function (err, obj) {
//         if(err) {
//             throwError();
//         } else {
//             console.log("obj");
//             console.log(obj);
//             return obj;
//         }
//     });
// };
// // GOOD
// exports.listUsers = function(User) {
//     return function(req, res) {
//         User.find({}, function(error, users) {
//             res.render('list_users', { users : users });
//         });
//     }
// };