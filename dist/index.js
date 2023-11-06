"use strict";
/*Classes i typescript*/
/*1:a försöket
- Som vi gör i javascript, ej correct typescript
- Går ej p.g.a. klagar på att vi ej har title-typen i Movie-typen*/
// class Movie {
//     constructor(title:string, director:string) {
//         this.title = title;
//         this.director = director;
//     }
// }
/*********************************************************************** */
/*2:a försöket
- här skapar vi egenskaperna först*/
// class Movie {
//     //Skapar egenskaperna...
//     title: string;
//     director: string;
//     constructor(title:string, director:string) {
//         this.title = title;
//         this.director = director;
//     }
// }
/*********************************************************************** */
/*3:e försöket - med implicit typing(inference)
- vi sätter ett initieringsvärde på variabeln releaseYear, den blir då typad som ett number*/
// class Movie {
//     //Skapar egenskaperna...
//     title: string;
//     director: string;
//     releaseYear: number = 2023;
//     eller
//     releaseYear = 2023;  
//     constructor(title:string, director:string, releaseYear: number) {
//         this.title = title;
//         this.director = director;
//         this.releaseYear = releaseYear;
//     }
// }
// const taken = new Movie("taken", "Pierre Morel", 2003)
/*********************************************************************** */
/*4:e försöket
- readyonly, ett sätt att skydda vår egenskap,
vi kan då ej sätta ett annat värde än via constructorn.

Vi kan läsa det värdet men ej skriva till den,
även skyddad om vi skriver till den via en funktion.
Endast constructor funktionen får skriva till en readonly egenskap.

Egenskap för att vi får automatiskt en getter och setter i vår class Movie{}
- en setter för constructorn
- en getter för alla andra

Ex) vi vill kunna ta in titeln i constructorn,
men man ska ej kunna göra:
taken.title = "Taken 2" - detta vill vi ej ska kunna vara tillåtet.
Vi lägger då till nyckelordet readonly*/
/*********************************************************************** */
/*5:e försöket - public, private och #
public = vi kan läsa ut dem och manipulera

private = Privat i våra interna ts classer d.v.s. enbart tillgänlig inifrån min klass i ts.
Men om vi kompilerar, vet ej JS vad private är, så den bli då public.
Har alltså ej betydelse i JS, men har betydelse när vi skriver koden.
Enbart tillgänligt innifrån min klass i ts.

# privat internt i ts men även js
Sätter vi privat vill vi även använda
_ för att indikera att det är just privat egenskap*/
// class Movie {
//     //Skapar egenskaperna...
//     // public readonly title: string;
//     // public director: string;
//     // public releaseYear: number = 2023;
//     // private movieSecret: string;
//     /*Om dessa är privata, når vi dem via get movieTitle funktionen 
//     _ understrykning för att indikera att det är ett fält som vi
//     ej ska släppa utanför
//     # för att göra privat- privat både i ts och js*/
//     private readonly _title: string;
//     private _director: string;
//     private _releaseYear: number = 2023;
//     private _movieSecret: string;
//     #rating: number;
//     constructor(title:string, director:string, releaseYear: number, rating:number) {
//         this._title = title;
//         this._director = director;
//         this._releaseYear = releaseYear;
//         this._movieSecret = 'My secret';
//         this.#rating = rating;
//     }
//     get movieTitle() { return this._title }
//     get moviedirector() { return this._director }
//     get moviereleaseYear() { return this._releaseYear }
//     displaySecret(){
//         return this._movieSecret;
//     }
// }
// const taken = new Movie("taken", "Pierre Morel", 2003)
//detta går ej att göra då title är skyddad med readonly,
//vi kan alltså läsa den men ej skriva till den
// taken.title = "Taken 2"
//här når vi titeln via movieTitle funktionen.
//ej (), för vi har ordet get i classen
// const title = taken.movieTitle
// const dirrector = taken.moviedirector
// const releaseYear = taken.moviereleaseYear
//vi kan läsa ut denna m.h.a public
// const director = taken.director
//detta går ej att göra med private, vi kan ej komma åt den direkt
// const secret = taken.movieSecret
//men vi kan komma åt den via funktion, för vi använder den inuti klassen
//men om funktionen är private går det ej
// const secret2 = taken.displaySecret()
/*********************************************************************** */
/*6:e försöket - parameter shortcut(parameters properties)
- vi lägger till public/private i constructorn.
- # går ej att lägga in i constructorn, så den är kvar som tidigare*/
/*getters funktion för att kunna returnera de privata*/
// class Movie {
//     #rating: number;
//     constructor(
//         private _title:string, 
//         private _director:string, 
//         private _releaseYear: number, 
//         public length: number,
//         rating: number
//     ) {
//         this.#rating = rating;
//     }
//     get movieTitle() { return this._title }
//     get moviedirector() { return this._director }
//     get moviereleaseYear() { return this._releaseYear }
//     // displaySecret(){
//     //     return this._movieSecret;
//     // }
// }
// const taken = new Movie("taken", "Pierre Morel", 2003, 6.8, 134)
/*********************************************************************** */
/*Från Lektion 6 - arv

- en getter ser ut som en funktion, men vi anropar den ej som en funktion.

Så fort vi vill kontrollera ett värde, som ska sättas på en egenskap
- gör en setter av det, ex) men längden och settern till den.
*/
class Movie {
    constructor(title, director, releaseYear, _length) {
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this._length = _length;
    }
    get movieInfo() {
        return `${this.title} - ${this.director} - 
        ${this.releaseYear} - ${this.length}`;
    }
    set length(length) {
        if (length > 240) {
            throw new Error("Alldeles för lång, korta ned filmen");
        }
        else {
            this._length = length;
        }
    }
}
const taken = new Movie("taken", "Pierre Morel", 2008, 134);
taken.length = 240;
/*Om vi vill använda Movie som underlag för en annan typ av film-class.
Arv är till för att skapa något extra/en specialiserad klass utöver Movie-klassen/en annan klass

Movie är vår super/föräldrar/basklass, i horrormovie måste vi då ta in samma argument, i constructorn.
Och i constructor kroppen måste vi göra ett anrop till super,
inne i super skickar vi in dessa title, director, releaseYear och längd

längd i Movie är privat, vi kan då ej göra den privat i vår HorrorMovie.
Iom att length är privat i vår HorrorMovie- måste vi ha ett sätt att skicka med den
till vår super/förälder.

Vi ändrar då i Movie- deklarationen för length till protected, från private*/
var HorrorMovieEnum;
(function (HorrorMovieEnum) {
    HorrorMovieEnum[HorrorMovieEnum["Slasher"] = 0] = "Slasher";
    HorrorMovieEnum[HorrorMovieEnum["Teenage"] = 1] = "Teenage";
    HorrorMovieEnum[HorrorMovieEnum["Screamqueens"] = 2] = "Screamqueens";
})(HorrorMovieEnum || (HorrorMovieEnum = {}));
class HorrorMovie extends Movie {
    constructor(category, title, director, releaseYear, _length) {
        super(title, director, releaseYear, length);
        this.category = category;
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this._length = _length;
    }
    displayMovieInfo() {
        this._length = 194;
    }
}
const scream = new HorrorMovie(HorrorMovieEnum.Slasher, "Scream", "Wes Craven", 2005, 96);
scream.length = 108;
scream.displayMovieInfo();
/*protected betyder att egenskapen är skyddad, enbart tillgänlig
i en föräldrarclass(Movie) och en barnklass, härledd klass.

protected betyder att den är tillgänglig i denna klass och alla
klasser som ärver ifrån den. Men den är ej tillgänlig att utnyttja
från en klass-instans eller objekt-instans eller en annan klass
som inte ärver.

protected är enbart för arvskedjan
*/
/*********************************************************************** */
/*Abstrakta classer
- är idén om att definiera en idé för klassen
- man skapar en idé om vad klassen ska kunna erbjuda.
*/
/*Alla anställda har för och efternamn gemensamt

/*Om vi lägger till ordet abstract framför employee-klassen och skriver:
const sofie = new Employee() får vi:
- Cannot create an instance of an abstract class.

Det går ej att skapa ett objekt ifrån en abstrakt klass
Abstrakt klass är enbart till för att ärva

Man har en idé om hur ett objekt ska vara kontruerat,
vilka egenskaper och funktioner som ska vara tillgänliga

Likt interface.

En abstrakt klass är mer konkret än interface
- det ska finnas en constructor som tar in för och efternamn
- så vi skapar en ny klass - FullTimeEmployee,
*/
// interface IEmployee {
//     firstName: string;
//     lastName: string;
// }
// const sophie: IEmployee; //och sedan bygga upp vad den ska innehålla
/*Skillnaden mellan interface och abstrakta klasser
- abstrakta klasser kan ha abstrakta funktioner
- abstrakta funktioner är tvingande, alla som ärver måste skriva sin egen implementering

*/
class Employee {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    /*concrete functions with it´s own implementation
    Alla som ärver måste ha getSalary functionen
    Men här skapar vi en generell displayInfo,
    som returnerar för- och efternamn*/
    displayEmployeeInfo() {
        console.log(`${this.firstName} - ${this.lastName}`);
    }
}
//Concrete class
class FullTimeEmployee extends Employee {
    constructor(firstName, lastName, _salary) {
        super(firstName, lastName);
        this.firstName = firstName;
        this.lastName = lastName;
        this._salary = _salary;
    }
    //Concrete implementation of abstract function- genom quick fix
    //data hiding
    getSalary() {
        return this._salary;
    }
    //override - åsidosätter funktionen i föräldrarna  
    displayEmployeeInfo() {
        console.log(`Display employee info (FullTimeEmployee)${this.firstName} - ${this.lastName} - ${this._salary}`);
    }
}
//Concrete class
class PartTimeEmployee extends Employee {
    constructor(firstName, lastName, _hourlyRate, _workedHours) {
        super(firstName, lastName);
        this.firstName = firstName;
        this.lastName = lastName;
        this._hourlyRate = _hourlyRate;
        this._workedHours = _workedHours;
    }
    getSalary() {
        return this._hourlyRate * this._workedHours;
    }
    displayEmployeeInfo() {
        console.log(`Display employee info (PartTimeEmployee)${this.firstName} - ${this.lastName} - ${this._hourlyRate} - ${this._workedHours}`);
    }
}
// const sofie = new Employee()
const sophie = new FullTimeEmployee("Sophie", "Tiainen", 300000);
//denna metod kommer gå hela vägen upp till den abstrakta klassen och använda den metoden
sophie.displayEmployeeInfo();
const tobias = new PartTimeEmployee('Tobies', "Tobiasson", 800, 120);
tobias.displayEmployeeInfo();
const nisse = Employee = new FullTimeEmployee("nisse", "nilsson", 400);
//Polymorfism - denna går till FullTimeEmployee
nisse.displayEmployeeInfo();
