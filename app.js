const contactsService =require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction =async({action, id,name, email, phone}) =>{
switch(action){
    case 'list':
        const allContacts = await contactsService.listContacts();
        return console.table(allContacts);   
    case 'get':
         const oneContacts = await contactsService.getContactById(id);
        return console.log(oneContacts);
    case 'add':
        const newContacts = await contactsService.addContact({name, email, phone});
        return console.log(newContacts);
    case 'remove':
            const removeContact = await contactsService.removeContact(id);
            return console.log(removeContact);
  
    default:
         console.log('Unknow action');
}
}

invokeAction(argv)


