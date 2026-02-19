// Require modules
const fs = require("fs")
const validator = require("validator")


// Common functions

const fetchData = () => {
    try {
        const fileDataJson = fs.readFileSync("data.json").toString()
        return JSON.parse(fileDataJson)
    } catch {
        return []
    }
}

const appendData = (fileData) => {
    const fileDataJson = JSON.stringify(fileData)
    fs.writeFileSync("data.json", fileDataJson)
}

const validateUserField = (value, type, fieldName) => {
    if (value === null || value === undefined) return true

    let isValid = false

    switch (type) {
        case "alpha":
            isValid = validator.isAlpha(value)
            break
        case "int":
            isValid = validator.isInt(value.toString())
            break
        default:
            isValid = false
    }

    if (!isValid) {
        console.log(`=> Invalid ${fieldName}! ❌`)
    }

    return isValid
}


// Add a new user

const addNewUser = (firstname, lastname, age, city) => {
    const fileData = fetchData()

    const lastItem = fileData[fileData.length - 1]
    let newId = lastItem ? lastItem.id + 1 : 1

    const validations = [
        validateUserField(firstname, "alpha", "first name"),
        validateUserField(lastname, "alpha", "last name"),
        validateUserField(age, "int", "age"),
        validateUserField(city, "alpha", "city")
    ]

    if (validations.includes(false)) return

    fileData.push({
        id: newId,
        firstname: firstname,
        lastname: lastname,
        age: age,
        city: city
    })

    appendData(fileData)
    console.log("User data is added successfully! ✅")
}


// Read all users data

const readAllData = () => {
    const fileData = fetchData()
    console.log(fileData)
}


// Read data for a specific user

const readUserData = (id) => {
    const fileData = fetchData()

    if (!validateUserField(id, "int", "user id")) return

    const userData = fileData.find(user => user.id === id)

    if (userData) {
        console.log(userData)
    } else {
        console.log(`The user id ${id} is not found! ❌`)
    }
}


// Delete all the users data

const deleteAllData = () => {
    const fileData = fetchData()
    fileData.length = 0

    appendData(fileData)
    console.log("All the users data deleted successfully! ✅")
}


// Delete data for a specific user

const deleteUserData = (id) => {
    const fileData = fetchData()

    if (!validateUserField(id, "int", "user id")) return

    const userDataIndex = fileData.findIndex(user => user.id === id)

    if (userDataIndex === -1) {
        console.log(`The user id ${id} is not found! ❌`)
        return
    }

    fileData.splice(userDataIndex, 1)
    appendData(fileData)
    console.log(`The user data with id ${id} is deleted successfully! ✅`)
}


// Update an existed user

const updateUser = (id, firstname, lastname, age, city) => {
    const fileData = fetchData()

    const validations = [
        validateUserField(firstname, "alpha", "first name"),
        validateUserField(lastname, "alpha", "last name"),
        validateUserField(age, "int", "age"),
        validateUserField(city, "alpha", "city")
    ]

    if (validations.includes(false)) return
       
    const userDataIndex = fileData.findIndex(user => user.id === id)

    if (userDataIndex === -1) {
        console.log(`The user id ${id} is not found! ❌`)
        return
    }
    
    fileData[userDataIndex] = {
        id: id,
        firstname: firstname ?? fileData[userDataIndex].firstname,
        lastname: lastname ?? fileData[userDataIndex].lastname,
        age: age ?? fileData[userDataIndex].age,
        city: city ?? fileData[userDataIndex].city
    }

    appendData(fileData)
    console.log(`The user data with id ${id} is updated successfully! ✅`)
    console.log(fileData[userDataIndex])

}


// Read specific data

const readSpecificData = () => {
    const fileData = fetchData()

    fileData.forEach(user => {
        console.log(`=> Fullname: ${user.firstname} ${user.lastname}\n=> City: ${user.city}\n`)
    })
}


// module.exports

module.exports = {
    addNewUser,
    readAllData,
    readUserData,
    deleteAllData,
    deleteUserData,
    updateUser,
    readSpecificData
}