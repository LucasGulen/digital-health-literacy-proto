export default class Entry {
    constructor(id, pathologie, themes, typeSource, lienSource, acces, societe, date, langue, population) {
        this.id = id;
        this.pathologie = pathologie;
        this.themes = themes;
        this.typeSource = typeSource;
        this.lienSource = lienSource;
        this.acces = acces;
        this.societe = societe;
        this.date = date;
        this.langue = langue;
        this.population = population;
    }
}