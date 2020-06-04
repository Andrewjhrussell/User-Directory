function start() {
    inquirer.prompt([{
      type: 'list',
      name: 'whatToDo',
      message: 'What would you like to do?',
      choices: ['View Employees', 'Add Employee', 'View Roles', 'quite']
    }]).then(what => {
      if (what.whatToDo === 'View Employees') viewEmp();else if (what.whatToDo === 'Add Employee') createEmployee();else if (what.whatToDo === 'View Roles') viewRole();else process.exit();
    });
  }
  
  function createEmployee() {
    connection.query('SELECT * FROM ROLES', (err, res) => {
      //console.log(res)
      var rolesList = res.map(role => {
        return {
          value: role.id,
          name: role.EMPOLYEE_TITLE
        };
      });
      connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        var managerList = res.map(emp => {
          return {
            value: emp.id,
            name: `${emp.FIRST_NAME} ${emp.LAST_NAME}`
          };
        });
        inquirer.prompt([{
          type: "input",
          name: "FIRST_NAME",
          message: "What is the first name?"
        }, {
          type: "input",
          name: "LAST_NAME",
          message: "What is the employees last name?"
        }, {
          type: "list",
          message: "What is the employees role?",
          name: 'ROLE_ID',
          choices: rolesList
        }, {
          type: "list",
          message: "Who is the employees manager?",
          name: 'MANAGER_ID',
          choices: managerList
        }]).then(function (userResponse) {
          console.log(userResponse);
          connection.query("INSERT INTO employees SET ?", userResponse, function (err, res) {
            if (err) throw err;
            start();
          });
        });
      });
    });
  }
  
  function viewEmp() {
    connection.query('SELECT FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID FROM employees', function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }
  
  function viewRole() {
    connection.query('SELECT * FROM ROLES', function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }