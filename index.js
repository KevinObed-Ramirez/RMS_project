
// function setFormMessage(formElement, type, message) {
//     const messageElement = formElement.querySelector(".form__message");

//     messageElement.textContent = message;
//     messageElement.classList.remove("form__message--success", "form__message--error");
//     messageElement.classList.add(`form__message--${type}`);
// }

// function setInputError(inputElement, message) {
//     inputElement.classList.add("form__input--error");
//     inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
// }

// function clearInputError(inputElement) {
//     inputElement.classList.remove("form__input--error");
//     inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.querySelector("#login");
//     const createAccountForm = document.querySelector("#createAccount");

//     document.querySelector("#linkCreateAccount").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.add("form--hidden");
//         createAccountForm.classList.remove("form--hidden");
//     });

//     document.querySelector("#linkLogin").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.remove("form--hidden");
//         createAccountForm.classList.add("form--hidden");
//     });

//     loginForm.addEventListener("submit", e => {
//         e.preventDefault();

//         // Perform your AJAX/Fetch login

//         setFormMessage(loginForm, "error", "Invalid username/password combination");
//     });

//     document.querySelectorAll(".form__input").forEach(inputElement => {
//         inputElement.addEventListener("blur", e => {
//             if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
//                 setInputError(inputElement, "Username must be at least 10 characters in length");
//             }
//         });

//         inputElement.addEventListener("input", e => {
//             clearInputError(inputElement);
//         });
//     });
// });


// #! /usr/bin/env node

console.log('This script populates some test incidents, peoples, and vehicles to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var Incident = require('./models/incident')
var People = require('./models/people')
var Vehicle = require('./models/vehicle')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var peoples = []
var vehicles = []
var incidents = []


function peopleCreate(first_name, last_name, d_birth, d_death, cb) {
    people_detail = { first_name: first_name, last_name: last_name }
    if (d_birth != false) people_detail.date_of_birth = d_birth
    if (d_death != false) people_detail.date_of_death = d_death

    var people = new People(people_detail);

    people.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Person: ' + people);
        peoples.push(people)
        cb(null, people)
    });
}

function vehicleCreate(name, cb) {
    var vehicle = new Vehicle({ name: name });

    vehicle.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Vehicle: ' + vehicle);
        vehicles.push(vehicle)
        cb(null, vehicle);
    });
}

function incidentCreate(title, summary, isbn, people, vehicle, cb) {
    inc_detail = {
        title: title,
        summary: summary,
        people: people,
        isbn: isbn
    }
    if (vehicle != false) inc_detail.vehicle = vehicle

    var incident = new Incident(inc_detail);
    incident.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Book: ' + book);
        // incidets.push(bookincident)
        cb(null, incident)
    });
}


// function bookInstanceCreate(book, imprint, due_back, status, cb) {
//     bookinstancedetail = {
//         book: book,
//         imprint: imprint
//     }
//     if (due_back != false) bookinstancedetail.due_back = due_back
//     if (status != false) bookinstancedetail.status = status

//     var bookinstance = new BookInstance(bookinstancedetail);
//     bookinstance.save(function (err) {
//         if (err) {
//             console.log('ERROR CREATING BookInstance: ' + bookinstance);
//             cb(err, null)
//             return
//         }
//         console.log('New BookInstance: ' + bookinstance);
//         bookinstances.push(bookinstance)
//         cb(null, book)
//     });
// }


// function createGenreAuthors(cb) {
//     async.series([
//         function (callback) {
//             authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
//         },
//         function (callback) {
//             authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
//         },
//         function (callback) {
//             authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
//         },
//         function (callback) {
//             authorCreate('Bob', 'Billings', false, false, callback);
//         },
//         function (callback) {
//             authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
//         },
//         function (callback) {
//             genreCreate("Fantasy", callback);
//         },
//         function (callback) {
//             genreCreate("Science Fiction", callback);
//         },
//         function (callback) {
//             genreCreate("French Poetry", callback);
//         },
//     ],
//         // optional callback
//         cb);
// }


// function createIncs(cb) {
//     async.parallel([
//         function (callback) {
//             incCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], callback);
//         },
//         function (callback) {
//             incCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
//         },
//         function (callback) {
//             incCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
//         },
//         function (callback) {
//             incCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
//         },
//         function (callback) {
//             incCreate("Death Wave", "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
//         },
//         function (callback) {
//             incCreate('Test Incident 1', 'Summary of test incident 1', 'ISBN111111', authors[4], [genres[0], genres[1]], callback);
//         },
//         function (callback) {
//             incCreate('Test Incident 2', 'Summary of test incident 2', 'ISBN222222', authors[4], false, callback)
//         }
//     ],
//         // optional callback
//         cb);
// }


// function creaInstances(cb) {
//     async.parallel([
//         function (callback) {
//             bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
//         },
//         function (callback) {
//             bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
//         }
//     ],
//         // Optional callback
//         cb);
// }



// async.series([
//     createGenreAuthors,
//     createBooks,
//     createBookInstances
// ],
    // Optional callback
    // function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Incident: ' + incident);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    // });



