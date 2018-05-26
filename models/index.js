// Import Sequelize
const Sequelize = require("sequelize");

// User Files
const CONFIG = require("../config");

// Connect to Database
const db = new Sequelize(CONFIG.DB.DATABASE, CONFIG.DB.USER, CONFIG.DB.PASSWORD, {
	host: CONFIG.DB.HOST,
	dialect: "mysql"
});


// Import Models
const Branch = db.import("./branch");
const Customer = db.import("./customer");
const Trainer = db.import("./trainer");
const Equipment = db.import("./equipment");
const BranchEquipment = db.import("./branch_equipment");
const Allotment = db.import("./allotment");

// Associations
Customer.belongsTo(Branch);
Branch.hasMany(Customer);

Trainer.belongsTo(Branch);
Branch.hasMany(Trainer);

Branch.belongsToMany(Equipment, { through: BranchEquipment });
Equipment.belongsToMany(Branch, { through: BranchEquipment });

Allotment.belongsTo(Customer);
Customer.hasMany(Allotment);

Allotment.belongsTo(Trainer);
Trainer.hasMany(Allotment);

Allotment.belongsTo(Equipment);
Equipment.hasMany(Allotment);



db.sync({ force: true })
  .then(() => console.log("Database Ready!"))
  .catch(err => console.error(err));

// Export the Database and Connection
module.exports = { Branch, Customer, Trainer, Equipment, db };