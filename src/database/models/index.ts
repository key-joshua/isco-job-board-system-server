import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model, ModelStatic, Dialect } from 'sequelize';

export interface DBInterface {
	[key: string]: any;
	sequelize: Sequelize;
	Sequelize: typeof Sequelize;
}

export interface DBConfigInterface {
	url?: string;
	host: string;
	dialect: Dialect;
	storage?: string;
	username: string;
	password: string;
	database: string;
	logging?: boolean | ((sql: string, timing?: number) => void);
}

const db: Partial<DBInterface> = {};
let sequelize: Sequelize;
const basename = path.basename(__filename);
const config = require('../../configs/config') as DBConfigInterface;

if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    if ( !config.database || !config.username || !config.password) {
        throw new Error('Database configuration is incomplete.');
    }
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
    })
    .forEach((file: string) => {
        const modelPath = path.join(__dirname, file);
        const modelDefiner = require(modelPath).default as (sequelize: Sequelize, dataTypes: typeof DataTypes) => ModelStatic<Model>;

        if (typeof modelDefiner === 'function') {
            const model = modelDefiner(sequelize, DataTypes);
            db[model.name] = model;
        } else {
            if (file !== 'interfaces.ts')
                console.error(`The file ${file} does not export a function.`);
        }
    });

Object.keys(db).forEach((modelName) => {
    const model = db[modelName] as ModelStatic<Model> & { associate?: (db: DBInterface) => void };
    if (model.associate) {
        model.associate(db as DBInterface);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db as DBInterface;
