module.exports = {
    dialect: 'sqlite',
    storage: '../database/sqlite/database.sqlite',
    define: {
        underscored: true,
        underscoredAll: true,
        freezeTableName: true,
      },
}