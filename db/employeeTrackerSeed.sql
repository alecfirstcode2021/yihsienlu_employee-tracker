INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Akira", "Rukawakaede", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Akagi", "Takenori", 2, "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Miyagi", "Ryota", 3, "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Toyota", "Lu", 4, "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Honda", "Yo", 5, "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Otani", "Brown", 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Suzuki", 2, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 5, "6");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hanna", "Lauth", 3, "3");


INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Marketing');
INSERT INTO department (department_name)
VALUES ('Accounting');
INSERT INTO department (department_name)
VALUES ('Support');
INSERT INTO department (department_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 90000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Assistance', 40000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 75000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CTO', 250000, null);

