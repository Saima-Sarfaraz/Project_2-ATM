import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const creatUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 900000000),
            balance: 100000 * i,
        };
        users.push(user);
    }
    return users;
};
// atmMachine
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write pin code",
        name: "pin"
    });
    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("Invalid user pin");
};
// atm function
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        choices: ["Withdraw", "balance", "deposite", "exit"]
    });
    if (ans.select == "Withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter amount.",
            name: "rupee"
        });
        if (amount.rupee > user.balance) {
            return console.log("Insufficient balance..");
        }
        console.log(`withdraw amount: ${amount.rupee}`);
        console.log(`Balance: ${user.balance - amount.rupee}`);
    }
    if (ans.select == "balance") {
        console.log(`Balance: ${user.balance}`);
        return;
    }
    if (ans.select == "deposite") {
        const deposite = await inquirer.prompt({
            type: "number",
            message: "Deposite amount enter",
            name: "rupee"
        });
        console.log(`Deposite amount: ${deposite.rupee}`);
        console.log(`Total Balance : ${user.balance + deposite.rupee}`);
    }
    if (ans.select == "exit") {
        console.log("Thanks for using atm...");
    }
};
const users = creatUser();
atmMachine(users);
