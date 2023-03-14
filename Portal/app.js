let serverURL = `http://127.0.0.1:1500/Router`;

//DOM content loaded
window.addEventListener('DOMContentLoaded', function(e){
    fetchEmployees();
});

let fetchEmployees = () => {
    let url =  `${serverURL}/employees`;
    axios.get(url).then((response)=>{
        let employees = response.data;
        let employeeRows = ``;
        for(let employee of employees){
            employeeRows += `<tr>
                                <td>${employee.id}</td>
                                <td>${employee.first_name}</td>
                                <td>${employee.last_name}</td>
                                <td>${employee.email}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.ip_address}</td>
                                <td>
                                    <button class="btn mt-2 btn-secondary btn-sm update">Update</button>
                                    <button class="btn mt-2 btn-danger btn-sm delete">Delete</button>
                                </td>
                            </tr>`;
        }
        document.querySelector('#table-body').innerHTML= employeeRows;
    }).catch((err)=> {
        console.log(err);

    });

    //ADD employee form
let addEmployeeForm = document.querySelector('#add-employee-form');
addEmployeeForm.addEventListener('submit', function(e){
    e.preventDefault();
    $('#add-employee-modal').modal('hide');

    let employee= {
        first_name: document.querySelector('#add-first-name').value,
        last_name: document.querySelector('#add-last-name').value,
        email: document.querySelector('#add-email').value,
        gender: document.querySelector('#add-gender').value,
        ip_address: document.querySelector('#add-ip-address').value
    };
    let url = `${serverURL}/employees`;
    axios.post(url, employee).then((response)=>{
        console.log(response.data);
        fetchEmployees();
    }).catch((err)=>{
        console.log(err);
    });
    clearFormFields();
});


};


let clearFormFields = () => {
    document.querySelector('#add-first-name').value ='',
    document.querySelector('#add-last-name').value='',
    document.querySelector('#add-email').value='',
    document.querySelector('#add-gender').value='',
    document.querySelector('#add-ip-address').value=''
};


//click on table body
let tableBody = document.querySelector('#table-body');
tableBody.addEventListener('click', function(e){
    let targetElement = e.target;
    //delete button
    if(targetElement.classList.contains('delete')){
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let url = `${serverURL}/employees/${selectedID}`;
        axios.delete(url).then((response)=>{
            console.log(response.data);
            fetchEmployees();
        }).catch((err)=>{
            console.log(err);
        });
    }

    // update button 
    if(targetElement.classList.contains('update')){
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let url = `${serverURL}/employees`;
        axios.get(url).then((response)=>{
            let employees = response.data;
            let selectedEmployee = employees.find((employee)=> {
                return employee.id === selectedID.trim();
            });
            populateUpdateEmployeeModal(selectedEmployee);
        }).catch((err)=>{
            console.log(err)
        });
    }
});

let populateUpdateEmployeeModal = (selectedEmployee)=>{
    document.querySelector('#update-emp-id').value = selectedEmployee.id;
    document.querySelector('#update-first-name').value = selectedEmployee.first_name;
    document.querySelector('#update-last-name').value = selectedEmployee.last_name;
    document.querySelector('#update-email').value = selectedEmployee.email;
    document.querySelector('#update-gender').value = selectedEmployee.gender;
    document.querySelector('#update-ip-address').value = selectedEmployee.ip_address;

    $('#update-employee-modal').modal('show');
};


// update modal
let updateEmployeeForm = document.querySelector('#update-employee-form');
updateEmployeeForm.addEventListener('submit', function(){
    let updateEmployeeID = document.querySelector('#update-emp-id').value;
    let url = `${serverURL}/employees/${updateEmployeeID}`;
    let employee= {
        first_name: document.querySelector('#update-first-name').value,
        last_name: document.querySelector('#update-last-name').value,
        email: document.querySelector('#update-email').value,
        gender: document.querySelector('#update-gender').value,
        ip_address: document.querySelector('#update-ip-address').value
    };
    axios.put(url,employee).then((response)=> {
        console.log( response.data);
        fetchEmployees();
    }).catch((err)=>{
        console.log(err);
    });
});