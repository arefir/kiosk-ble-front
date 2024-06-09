'use server';

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var dbFilePath;

const readData = () => {
    if (!fs.existsSync(dbFilePath)) {
        return [];
    }
    console.log(dbFilePath);
    const jsonData = fs.readFileSync(dbFilePath, 'utf-8');
    console.log(jsonData);
    return JSON.parse(jsonData);
};

const writeData = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

const saveOrder = (item) => {
    dbFilePath = path.join(__dirname, "orderHistory.json");
    const data = readData();
    data.push(item);
    writeData(data);
};

const getOrder = () => {
    dbFilePath = path.join(__dirname, "orderHistory.json");
    return readData();
};

const addToCart = (item) => {
    dbFilePath = path.join(__dirname, "cart.json");
    const data = readData();
    data.push(item);
    writeData(data);
};

const getCart = () => {
    dbFilePath = path.join(__dirname, "cart.json");
    return readData();
};

const emptyCart = () => {
    dbFilePath = path.join(__dirname, "cart.json");
    writeData([]);
};

export { saveOrder, getOrder, addToCart, getCart, emptyCart };