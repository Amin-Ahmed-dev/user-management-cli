const yargs = require("yargs/yargs")
const y = yargs(process.argv.slice(2))

const crudLogic = require("./crudLogic.js")


// Add a new user command
y.command({
    command: "add",
    describe: "Add a new user data to users",
    builder: {
        firstname: {
            describe: "The firstname of a user",
            demandOption: true,
            type: "string"
        },
        lastname: {
            describe: "The lastname of a user",
            demandOption: true,
            type: "string"
        },
        age: {
            describe: "The age of a user",
            demandOption: true,
            type: "number"
        },
        city: {
            describe: "The city of a user",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        crudLogic.addNewUser(argv.firstname, argv.lastname, argv.age, argv.city)
    }
})


// Read all users data command

y.command({
    command: "read_all",
    describe: "Read all users data",
    handler: () => {
        crudLogic.readAllData()
    }
})


// Read data for a specific user command

y.command({
    command: "read",
    describe: "Read data for a specific user",
    builder: {
        id: {
            describe: "The id of a user",
            demandOption: true,
            type: "number"
        }
    },
    handler: (argv) => {
        crudLogic.readUserData(argv.id)
    }
})


// Delete all users data command

y.command({
    command: "delete_all",
    describe: "Delete all the users data",
    handler: () => {
        crudLogic.deleteAllData()
    }
})


// Delete data for a specific user command

y.command({
    command: "delete",
    describe: "Delete data for a specific user",
    builder: {
        id: {
            describe: "The id of a user",
            demandOption: true,
            type: "number"
        }
    },
    handler: (argv) => {
        crudLogic.deleteUserData(argv.id)
    }
})


// Update an existed user commnand

y.command({
    command: "update",
    describe: "Update an existed user",
    builder: {
        id: {
            describe: "The id of a user",
            demandOption: true,
            type: "number"
        },
        firstname: {
            describe: "The firstname of a user",
            demandOption: false,
            type: "string"
        },
        lastname: {
            describe: "The lastname of a user",
            demandOption: false,
            type: "string"
        },
        age: {
            describe: "The age of a user",
            demandOption: false,
            type: "number"
        },
        city: {
            describe: "The city of a user",
            demandOption: false,
            type: "string"
        }
    },
    handler: (argv) => {
        crudLogic.updateUser(argv.id, argv.firstname, argv.lastname, argv.age, argv.city)
    }
})


// Read specific data command
y.command({
    command: "read_some_data",
    describe: "Read specifc data from users",
    handler: () => {
        crudLogic.readSpecificData()
    }
})

y.parse()