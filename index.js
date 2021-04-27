const mysql = require('mysql');
const inquirer = require('inquirer');
// const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "alecfirstcode2021",
  database: "employeeTracker1_DB",
});

connection.connect((err) => {
    if (err) throw err;

    connection.query("SELECT * from role", function (err, res) {
        selectroles = res.map(role => ({ name: role.title, value: role.id }))

      })
    
    connection.query("SELECT * from employee", function (err, res) {
        currentemployees = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))

      })

    connection.query("SELECT * from department", function (error, res) {
        selectdepartment = res.map(department => ({ name: department.name, value: department.id }))
      })

    runStart();
  });

  function runStart() {
    inquirer
      .prompt(
        {
          type: "list",
          message: "What would you like to do?",
          name: "choices",
          choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add Employees',
            'Add Departments',
            'Add Roles',
            'Update Employee Role',
            'Exit'          
            ] 
        })
        .then ((answer) =>{

        switch (answer.choices) {
            case 'View Employees':
                Viewemployee();
                break;

            case 'View Departments':
                Viewdepartment();
                    break;
            
            case 'View Roles':
                Viewroles();
                    break;
            
            case 'Add Employees':
                Addemployee();
                    break

            case 'Add Departments':
                Adddepartments();
                    break
            
            case 'Add Roles':
                Addrole();
                    break

            case 'Update Employee Role':
                Updaterole();
                     break
            
            case 'Exit':
                connection.end();
        
        };})
}

const Viewemployee = function () {
    console.log('Employee List');
    let query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if(err) throw err;
        let employeeArray = [];
        res.forEach (employee => employeeArray.push(employee));
        console.table(employeeArray);
        runStart();
    })
};

const Viewdepartment = function () {
    console.log('Department List');
    let query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if(err) throw err;
        let departmentArray = [];
        res.forEach (department => departmentArray.push(department));
        console.table(departmentArray);
        runStart();
    })
};

const Viewroles = function () {
    console.log('Roles List');
    let query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if(err) throw err;
        let rolesArray = [];
        res.forEach (role => rolesArray.push(role));
        console.table(rolesArray);
        runStart();
    })
};


const Addemployee = function () {
    console.log('Add a new employee');
     
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of this Employee?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of this Employee?'
        },
        
        {
            type: "list",
            message: "What is the employee's title?",
            name: "title",
            choices: selectroles
          },

          {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager",
            choices: currentemployees,
          }
    ])
    .then((answer) => {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          'INSERT INTO employee SET ?',
         
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.title,
            manager_id: answer.manager
          },
          (err) => {
            if (err) throw err;
            console.log('New employee was created successfully!');
            // re-prompt the user for what they want to view
            runStart();
          }
        );
      });
}


const Adddepartments = function () {
    console.log('Add a new department');
     
    inquirer.prompt([
        {
            name: 'nameOFdept',
            type: 'input',
            message: 'What is the name of your new department?'
        },

    ])
    .then((answer) => {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          'INSERT INTO department SET ?',
         
          {
            department_name: answer.nameOFdept
          },
          (err) => {
            if (err) throw err;
            console.log('New department was created successfully!');
            // re-prompt the user for what they want to view
            runStart();
          }
        );
      });
}

// add new role(s)
const Addrole = function () {
  console.log('Add a new role');
   
  inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the name of the new role?'
            },
        {
              name: 'salary',
              type: 'input',
              message: 'How much salary will be paid for this role?'
          },
        {
            name: 'departmentId',
            type: 'list',
            message: 'What department of this role?',
            choices: selectdepartment
        }
  ])
  .then((answer) => {
      // when finished prompting, insert a new role into the db with that info
      connection.query(
        'INSERT INTO role SET ?',
       
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId
        },
        (err) => {
          if (err) throw err;
          console.log('New role was created successfully!');
          // re-prompt the user for what they want to view
          runStart();
        }
      );
    });
}

//  Update role(s)
const Updaterole = function () {
  console.log('Update a new role');
   
  inquirer.prompt([
        {
          name: 'employeeID',
          type: 'list',
          message: 'Select employee you want to adjust?',
          choices: currentemployees

            },
        {
           type: "list",
           message: "What is the employee's new role?",
           name: "titleID",
           choices: selectroles
        }
  ])

  .then((answer) => {
      // when finished prompting, insert a new role into the db with that info
      connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
          {
            role_id: answer.titleID,
          },
          {
            id: answer.employeeID,
          },
        ],
        (err) => {
          if (err) throw err;
          console.log('Update role successfully!');
          // re-prompt the user for what they want to view
          runStart();
        }
      );
    });
}
