export class Modul {
    constructor(num, nom, hores) {
        this.nom = nom;
        this.num = num;
        this.hores = hores;
    }

    toString() {
        console.log('MP' + this.num + '. ' + this.nom + ' (' + this.hores + 'h)')
    }
}