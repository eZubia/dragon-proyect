var mongoose = require('./../configDB/MongooseConfig').getInstance();
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
    clave:{type:String, required:true},
    nombreProyecto:{type:String, required:true},
    fechaInicio:{type:Date, required:true},
    fechaFin:{type:Date, required:true},
    descripcionProy:{type:String, required:true},
    abierto:{type:Boolean, required:true}
});

proyectoSchema.virtual("initialFormatDate").get(function(){
    var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
    return this.fechaInicio.getDate()+"/"+ monthNames[this.fechaInicio.getMonth()]+"/"+this.fechaInicio.getFullYear();
});

proyectoSchema.virtual("finishFormatDate").get(function(){
    var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
    return this.fechaFin.getDate()+"/"+ monthNames[this.fechaFin.getMonth()]+"/"+this.fechaFin.getFullYear();
});

proyectoSchema.methods.findMetasByProyecto = function (Meta, cb) {
    return Meta.find({"proyecto": mongoose.Types.ObjectId(this._id)})
        .exec(function (err, data) {
            cb(err,data);
        });
};

proyectoSchema.methods.safeToDelete = function (Meta, cb) {
    this.findMetasByProyecto(Meta, function (err, obj) {
            if(err) {
                cb(throwError());
            } else {
                cb(obj.length <= 0);
            }
        });
};

proyectoSchema.pre('remove', function(next) {
    var Meta = require('./Meta');
    this.safeToDelete(Meta, function (data) {
        console.log("data");
        console.log(data);
        if(data) {
            return next();
        } else {
            console.log("Entre al false?");
            return next(new Error("InvalidStateToDeleteException"));
        }

    })
});

var Proyecto = mongoose.model("Proyecto", proyectoSchema);
module.exports = Proyecto;

