export class Cicle {
    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.numEdicions = 0;
        this.moduls = [];
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
    }

    toString() {
        let str = 'Cicle: ' + this.nom + '[' + this.abreviatura + '], de la categoria ' + this.categoria + ' amb ' + this.numAlumnes + ' alumnes. Els seus moduls son: '
        this.moduls.forEach(function (modul) {
            console.log(modul.toString())
            str += modul.toString() + ","
        })
        console.log(str)
    }

    setNumEdicions() {
        this.numEdicions += 1;
        let data = new Date();
        console.log(this.numEdicions)
        console.log(data)

    }

    addModul(modul) {
        this.moduls.push(modul);
    }

    calculHores() {
        let horesTotals = 0;
        let count = 0
        this.moduls.forEach(function (modul) {
            horesTotals += parseInt(modul.hores)
            count += 1
        });
        console.log(horesTotals)
        console.log(count)
        let mitjana = horesTotals / count;
        console.log(mitjana)
        alert(mitjana);
    }

}