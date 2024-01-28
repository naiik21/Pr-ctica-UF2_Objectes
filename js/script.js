import { Cicle } from "./cicle.js";
import { Modul } from "./modul.js";

let llistatCicles = [];

document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);

function afegirCicle() {
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;
    let idX = document.getElementById("editCicle").value;
    //let cicle = { nom: nom, categoria: categoria, numAlumnes: numAlumnes, abreviatura: abreviatura }
    let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura)

    cicle.toString()

    if (idX === "-1") {
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
    } else {
        //Editar cicle
        llistatCicles[idX].nom = nom
        llistatCicles[idX].categoria = categoria
        llistatCicles[idX].numAlumnes = numAlumnes
        llistatCicles[idX].abreviatura = abreviatura
    }

    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value = -1;
}

function afegirModul() {
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    //let modul = { cicle: cicle, nom: modul_nom, num: modul_num, hores: modul_hores }
    let modul = new Modul(modul_nom, modul_num, modul_hores)
    modul.toString()
    llistatCicles[cicle].addModul(modul);


    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}

//Funció per llistar els cicles
function printLlistat(llistat) {
    let str = "";
    llistat.forEach(function (element, index) {
        const btnEditId = `btnEditCicle${index}`;
        const btnRemoveCicle = `btnRemoveCicle${index}`;
        const btnCalculHores = `btnCalculHores${index}`;
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>

                    <button type="button" id="${btnRemoveCicle}" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" id="${btnEditId}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" id="${btnCalculHores}" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>


                </div>`;
    });

    document.getElementById("llistat").innerHTML = str;

    // Agregar eventos después de haber establecido el contenido en el llistat
    llistat.forEach(function (element, index) {
        const btnEditId = `btnEditCicle${index}`;
        const btnRemoveCicle = `btnRemoveCicle${index}`;
        const btnCalculHores = `btnCalculHores${index}`;
        document.getElementById(btnEditId).addEventListener("click", function () {
            editCicle(index);
            llistatCicles[index].setNumEdicions()
        });

        document.getElementById(btnRemoveCicle).addEventListener("click", function () {
            removeCicle(index)
        });

        document.getElementById(btnCalculHores).addEventListener("click", function () {
            llistatCicles[index].calculHores()
        });
    });
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector() {
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function (element, index) {
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i) {
    llistatCicles.splice(i, 1)
    printLlistat(llistatCicles)
}

//Funció per editar un cicle
function editCicle(i) {
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value = i;
}

//Funció per netejar els formularis
function netejarFormularis() {
    var inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    document.getElementById("editCicle").value = -1;
    var selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}