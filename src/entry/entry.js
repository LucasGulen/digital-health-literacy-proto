export default class Entry {
    constructor(id, pathologie, themes, typeSource, lienSource, acces, societe, date, langue, population, verifie) {
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
        this.verifie = verifie;
    }

    equals(entry) {
        let found = false;        
        if (this.pathologie.toLowerCase().includes(entry.pathologie.toLowerCase())) {
            found = true;
        }
        this.themes.forEach((theme) => {
            if (theme.toLowerCase().includes(entry.themes[0].toLowerCase())) {
                found = true;
            }
        });
        if (found) {
            if ((entry.acces === 'Tous' || entry.acces === this.acces) 
                && (entry.langue === 'Toutes' || entry.langue === this.langue)
                && (entry.population === 'Toutes' || entry.population === this.population)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

}