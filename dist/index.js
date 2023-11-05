"use strict";
/*Classes i typescript*/
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Movie_rating;
/*1:a försöket
Som vi gör i javascript, ej correct typescript */
// class Movie {
//     constructor(title:string, director:string) {
//         this.title = title;
//         this.director = director;
//     }
// }
/*2:a försöket*/
// class Movie {
//     //Skapar egenskaperna...
//     title: string;
//     director: string;
//     constructor(title:string, director:string) {
//         this.title = title;
//         this.director = director;
//     }
// }
/*3:e försöket - med implicit typing(inference)*/
// class Movie {
//     //Skapar egenskaperna...
//     title: string;
//     director: string;
//     releaseYear: number = 2023;
//     constructor(title:string, director:string, releaseYear: number) {
//         this.title = title;
//         this.director = director;
//         this.releaseYear = releaseYear;
//     }
// }
// const taken = new Movie("taken", "Pierre Morel", 2003)
/*Säg att vi vill kunna ta in titeln i konsturktorn,
men man ska ej kunna göra:
taken.title = "Taken 2" - detta vill vi ej ska kunna vara tillåtet.
Vi lägger till nyckelordet readonly

public = vi kan läsa ut dem

private = privat i våra interna ts classer

# privat internt i ts men även js*/
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
//detta går ej att göra
taken.title = "Taken 2";
//här når vi titeln via movieTitle funktionen.
//ej (), för vi har ordet get i classen
const title = taken.movieTitle;
const dirrector = taken.moviedirector;
const releaseYear = taken.moviereleaseYear;
//vi kan läsa ut denna m.h.a public
const director = taken.director;
//detta går ej att görsa med private, vi kan ej komma åt den direkt
const secret = taken.movieSecret;
//men vi kan komma åt den via funktion, för vi använder den inuti klassen
//men om funktionen är private går det ej
const secret2 = taken.displaySecret();
/*6:e försöket - parameter shortcut(parameters properties)
-Vi lägger till public/private i constructorn.
- # går ej att lägga in i constructorn,
så den är kvar som tidigare*/
class Movie {
    constructor(_title, _director, _releaseYear, length, rating) {
        this._title = _title;
        this._director = _director;
        this._releaseYear = _releaseYear;
        this.length = length;
        _Movie_rating.set(this, void 0);
        __classPrivateFieldSet(this, _Movie_rating, rating, "f");
    }
    get movieTitle() { return this._title; }
    get moviedirector() { return this._director; }
    get moviereleaseYear() { return this._releaseYear; }
}
_Movie_rating = new WeakMap();
const taken = new Movie("taken", "Pierre Morel", 2003, 6.8, 134);
