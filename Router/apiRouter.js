const express = require('express');
const router = express.Router();


//Employees data
let employees = [
    {
        id: '001',
        first_name: 'Laura',
        last_name: 'Dey',
        email: 'laura@gmail.com',
        gender: 'Female',
        ip_address: '127.0.0.1'
    },
    {
        id: '002',
        first_name: 'Sam',
        last_name: 'Batra',
        email: 'sam@gmail.com',
        gender: 'Male',
        ip_address: '9854.56.0.32'
    }
];

//get id
let getID = ()=> {
    return '_'+ Math.random().toString(36).substr(2,9);
};
                //REST API CONFIG
//GET Employees
router.get('/employees', (request,response)=> {
    console.log(`Get received at server.. ${new Date().toLocaleDateString()}`);
    response.json(employees);
});

//Post request
router.post('/employees', (request, response) => {
    let employee  = {
        id: getID(),
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        ip: request.body.ip_address
    };
    employees.push(employee);
    console.log(`post received at server.. ${new Date().toLocaleDateString()}`);
    response.json({msg: 'POST Request is Success.'});
});


//Put Request
router.put('/employees/:id', (request, response) => {
    let empId = request.params.id;
    let updateEmployee = {
        id: empId,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        ip_address: request.body.ip_address
    };
    let existingEmployee = employees.find((employee) => {
        return employee.id === empId;
    });

    employees.splice(employees.indexOf(existingEmployee), 1, updateEmployee);
    console.log(`PUT received at server.. ${new Date().toLocaleDateString()}`);
    response.json({msg: 'PUT Request is Success.'});

});

//DELETE Request
router.delete('/employees/:id', (request,response)=> {
    let empId = request.params.id;
    employees = employees.filter((employee) =>{
        return employee.id !== empId;
    });
    console.log(`DELETE received at server.. ${new Date().toLocaleDateString()}`);
    response.json({msg: 'DELETE Request is Success.'});

});


module.exports = router;