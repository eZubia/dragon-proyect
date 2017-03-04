var mongoose = require('./../configDB/MongooseConfig').getInstance();
var Proyecto =  require("./../models/Proyecto");
var Meta =  require("./../models/Meta");

var assert = require('assert');

describe('Proyecto', function() {
    beforeEach(function() {
        console.log('before every test in every file');
    });
    describe('Crud Basico de un proyecto', function() {
        it('Condiciones correctas del salvado', function(done) {
            var pro = new Proyecto({
                clave:"TEST1",
                nombreProyecto: "Prueba Proyecto",
                fechaInicio: Date.now(),
                fechaFin: Date.now(),
                descripcionProy: "Esta es una prueba nada mas",
                abierto: true,
            });
            pro.save(function(err) {
                if (err) done(err);
                else done();
            });
        });

        it('condiciones incorrectas del salvado', function(done) {
            var pro = new Proyecto({
                clave:"TEST1",
                fechaInicio: Date.now(),
                fechaFin: Date.now(),
                descripcionProy: "Esta es una prueba nada mas",
                abierto: true,
            });
            pro.save(function(err) {
                if (err) done();
                else done(err);
            });
        });

        it('Se debe de actualizar el proyecto creado.', function(done) {
            Proyecto.findOne({clave:"TEST1"}, function (err, proyecto) {
                proyecto.clave = "TEST2"
                proyecto.save(function (err, data) {
                    var itPassTest = true;
                    Proyecto.count({clave:"TEST2"}, function (err, proyecto) {
                        itPassTest = proyecto == 1;
                    });
                    Proyecto.count({clave:"TEST1"}, function (err, proyecto) {
                        itPassTest = proyecto == 0;
                    });
                    if(itPassTest) done()
                    else done(err);
                });
            });
        });

        it('Se debe de poder elimnar un proyecto si existen referencias a metas', function(done) {
            var pro = new Proyecto({
                clave:"TEST1",
                nombreProyecto: "Prueba Proyecto",
                fechaInicio: Date.now(),
                fechaFin: Date.now(),
                descripcionProy: "Esta es una prueba nada mas",
                abierto: true,
            });
            pro.save(function(err) {
                if (err) {
                    done(err);
                } else {
                    Proyecto.remove({clave:"TEST1"}, function (err, proyecto) {
                       if(proyecto == 1) donde();
                       else done(err);
                    });
                };
            });
        });

        it('No se debe de poder elimnar un proyecto si existen referencias a metas', function(done) {
            var pro = new Proyecto({
                clave:"TEST1",
                nombreProyecto: "Prueba Proyecto",
                fechaInicio: Date.now(),
                fechaFin: Date.now(),
                descripcionProy: "Esta es una prueba nada mas",
                abierto: true,
            });
            pro.save(function(err) {
                if (err) {
                    done(err);
                } else {
                    Proyecto.findOne({clave:"TEST1"}, function (err, proyecto) {
                        new Meta({
                            claveMeta:1,
                            descripcionMeta:"Descripcion de una meta",
                            prioridad:Meta.schema.path('prioridad').enumValues[0],
                            activa:true,
                            proyecto:mongoose.Types.ObjectId(proyecto._id),
                        }).save(function (err, data) {
                            if(err) {
                                done(err);
                            } else {
                                proyecto.remove(function (err) {
                                    if(err) done();
                                    else done(new Error("Existian cosas que no permitian borrar"));
                                });
                            }
                        })
                    });
                };
            });
        });

        it('Se debe de poder elimnar un proyecto si las metas hijas son eliminadas', function(done) {
            Proyecto.findOne({clave:"TEST1"}, function (err, proyecto) {
                proyecto.findMetasByProyecto(Meta, function (err, metas) {
                    metas.forEach(function (m) {
                        m.remove();
                    });
                    proyecto.remove(function (err) {
                        if(err) done(new Error("No existian cosas que no permitian borrar"));
                        else done();
                    });
                });
            });
        });
    });

    after(function () {

    })
});