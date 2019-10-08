import {Sequelize} from 'sequelize-typescript'

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    //database: 'andromeda_db',
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    //storage: "database.sqlite",
    models: [ __dirname + '/data-layer/models/*.model.js' ],
    logQueryParameters: true
})
var Role = sequelize.model("Role")
sequelize.sync({ force: false })
.then(() => {
    return Role.findAndCountAll()
})
.then(result => {
    if(result.count == 0) {
        return Role.bulkCreate([
            { id: 1, description: "Nuclear Technician" },
            { id: 2, description: "Power Plant Manager" },
            { id: 3, description: "Console Operator" }
        ])
    }
})
.then(rowsInserted => {
    if(rowsInserted)
        console.log("Inserted "+rowsInserted.length+" default roles")
})
.catch(error => {
    console.error(error)
    console.error("There was an error syncing the database:", error.toString())
    
})

export default sequelize