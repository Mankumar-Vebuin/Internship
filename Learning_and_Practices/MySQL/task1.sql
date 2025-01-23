use task1;

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    job_title VARCHAR(50),
    manager_id INT,
    hire_date DATE,
    salary DECIMAL(10 , 2 ),
    commission DECIMAL(10 , 2 ),
    dept_no INT,
    address_street VARCHAR(100),
    address_city VARCHAR(50)
);


CREATE TABLE Department (
    dept_no INT PRIMARY KEY,
    dept_name VARCHAR(50),
    location VARCHAR(50)
);

INSERT INTO Department (dept_no, dept_name, location)
VALUES
    (10, 'HR', 'New York'),
    (20, 'Finance', 'San Francisco'),
    (30, 'Sales', 'Chicago'),
    (40, 'IT', 'Seattle'),
    (50, 'First Bank Corporation', 'Dallas');

INSERT INTO Employee (emp_id, emp_name, job_title, manager_id, hire_date, salary, commission, dept_no, address_street, address_city)
VALUES
    (1, 'Alice', 'Manager', NULL, '2021-01-15', 12000.00, 0.00, 50, '123 Elm St', 'Dallas'),
    (2, 'Bob', 'Clerk', 1, '2021-02-20', 2500.00, 100.00, 10, '456 Oak St', 'New York'),
    (3, 'Charlie', 'Analyst', 1, '2020-11-25', 4000.00, 0.00, 20, '789 Pine St', 'San Francisco'),
    (4, 'Diana', 'Salesman', 1, '2022-07-10', 3000.00, 500.00, 30, '101 Maple St', 'Chicago'),
    (5, 'Eve', 'President', NULL, '2019-03-05', 8000.00, 0.00, 40, '202 Birch St', 'Seattle'),
    (6, 'Frank', 'Clerk', 3, '2021-12-15', 2200.00, 0.00, 20, '303 Cedar St', 'San Francisco'),
    (7, 'Grace', 'Manager', NULL, '2020-08-30', 5500.00, 0.00, 30, '404 Ash St', 'Chicago'),
    (8, 'Hank', 'Salesman', 7, '2023-05-18', 3200.00, 600.00, 30, '505 Walnut St', 'Chicago'),
    (9, 'Ivy', 'Clerk', 5, '2022-10-20', 2600.00, 0.00, 40, '606 Willow St', 'Seattle'),
    (10, 'Jack', 'Analyst', 5, '2021-06-22', 4100.00, 0.00, 20, '707 Palm St', 'San Francisco'),
    (11, 'Kim', 'Manager', NULL, '2003-05-15', 6000.00, 0.00, 10, '108 Spruce St', 'New York'),
    (12, 'Luke', 'Salesman', 7, '2023-12-01', 2800.00, 200.00, 30, '909 Cypress St', 'Chicago');
    
INSERT INTO Employee (emp_id, emp_name, job_title, manager_id, hire_date, salary, commission, dept_no, address_street, address_city)
VALUES
    (13, 'MaM', 'President', NULL, '2019-03-05', 8000.00, 0.00, 40, '202 Birch St', 'Seattle');
    

-- 1  
SELECT 
    *
FROM
    Employee E
        JOIN
    Department D ON E.dept_no = D.dept_no
WHERE
    D.dept_name = 'First Bank Corporation'
        AND E.salary > 10000;

-- 2
SELECT 
    *
FROM
    Employee E
        JOIN
    Department D ON E.dept_no = D.dept_no
WHERE
    D.dept_no = 30;

-- 3
SELECT 
    E.emp_name, D.dept_name
FROM
    Employee E
        JOIN
    Department D ON E.dept_no = D.dept_no
WHERE
    E.job_title = 'Clerk';

-- 4
SELECT 
    D.dept_no, E.emp_name
FROM
    Employee E
        JOIN
    Department D ON E.dept_no = D.dept_no
WHERE
    D.dept_no > 20
ORDER BY E.dept_no ASC;

-- 5
SELECT 
    *
FROM
    employee
WHERE
    commission > salary;

-- 6
SELECT 
    *
FROM
    employee
WHERE
    commission > salary * 0.6;

-- 7
SELECT 
    emp_name, job_title, salary
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    D.dept_no = 20 AND E.salary > 2000;

-- 8
SELECT 
    emp_name, job_title, salary
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    D.dept_no = 30 AND E.salary > 1500;

-- 9
SELECT 
    *
FROM
    employee
WHERE
    job_title = 'Manager'
        OR job_title = 'President';

-- 10
SELECT 
    *
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    E.job_title = 'Manager'
        AND D.dept_no != 30;

-- 11
SELECT 
    *
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    (E.job_title = 'Manager'
        OR E.job_title = 'Clerk')
        AND D.dept_no = 10;

-- 12
SELECT 
    *
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    E.job_title = 'Manager'
        OR (E.job_title = 'Clerk' AND D.dept_no = 10);

-- 13
SELECT 
    *
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    (E.job_title = 'Manager'
        AND D.dept_no = 10)
        AND (E.job_title = 'Clerk' AND D.dept_no = 20)
        AND ((E.job_title != 'Clerk'
        OR E.job_title = 'Manager')
        AND E.salary > 2000);

-- 14
SELECT 
    *
FROM
    employee E
        JOIN
    department D ON E.dept_no = D.dept_no
WHERE
    D.dept_no = 20
        AND (E.job_title = 'Clerk' AND D.dept_no = 20);

-- 15
SELECT 
    *
FROM
    employee E
WHERE
    E.salary >= 1200 AND E.salary <= 1400;

-- 16
SELECT 
    *
FROM
    employee E
WHERE
    E.job_title IN ('Clerk' , 'Analyst', 'Salesman');

-- 17
SELECT 
    *
FROM
    employee E
WHERE
    E.job_title NOT IN ('Clerk' , 'Analyst', 'Salesman');

-- 18
SELECT 
    *
FROM
    employee E
WHERE
    E.commission = NULL OR E.commission = 0;

-- 19
SELECT DISTINCT
    job_title
FROM
    employee E
WHERE
    E.commission != NULL
        OR E.commission != 0;

-- 20
SELECT 
    *
FROM
    employee E
WHERE
    E.commission = NULL OR E.commission = 0
        OR E.commission < 100;

-- 21
SELECT 
    emp_id,
    emp_name,
    salary,
    commission,
    CASE
        WHEN commission = 0 OR commission IS NULL THEN salary + 250
        ELSE salary + commission
    END AS net_earnings
FROM
    Employee;

-- 22
SELECT 
    emp_id,
    emp_name,
    salary,
    commission,
    CASE
        WHEN commission = 0 OR commission IS NULL THEN salary + 250
        ELSE salary + commission
    END AS net_earnings
FROM
    Employee
where 
	CASE
        WHEN commission = 0 OR commission IS NULL THEN salary + 250
        ELSE salary + commission
    END > 2000;
    
-- 23
select * from employee where emp_name like "M%" or "%M";

-- 25
select *, length(emp_name) from employee where length(emp_name) > 15 AND emp_name like "__R%";

-- 24
select * from employee where emp_name like "%M%" or "%m%";

-- 26
select * from employee where month(hire_date) = 2;

-- 27
select * from employee where (day(hire_date) = 30 or day(hire_date) = 31) OR (month(hire_date) = 2 AND day(hire_date) = 28);

-- 28
SELECT emp_name, hire_date
FROM Employee
WHERE hire_date <= CURDATE() - INTERVAL 2 YEAR;

-- 29
select * from employee where job_title = "Manager" and year(hire_date) = 2003;

-- 30
SELECT CONCAT(emp_name, ' ', job_title) AS name_and_job FROM Employee;

-- 31
select lpad(emp_name,15," ") as right_align_name from employee;

-- 32
select lpad(emp_name,15,"*") as right_padding from employee;

-- 33
select emp_name from employee where emp_name not like "A%";

-- 34
select emp_name from  employee where emp_name not like "%R";

-- 35
SELECT CONCAT(SUBSTRING(emp_name, 1, 3), ' ', SUBSTRING(emp_name, LENGTH(emp_name) - 2, 3)) AS first_last_3 FROM Employee;

-- 36
select replace(emp_name, 'a', 'A') from employee;

-- 37
select emp_name,instr(emp_name, "ar") as possition from employee;

-- 38
select floor((salary + 999) / 1000) * 1000 from employee;

-- 39
select * from employee order by job_title, salary desc;

-- 40
select * from employee E join department D on E.dept_no = D.dept_no where E.hire_date <= CURDATE() - INTERVAL 1 YEAR;

-- 41
SELECT emp_name, job_title, salary
FROM Employee
ORDER BY job_title DESC, salary ASC;

-- 42
select * from employee where year(hire_date) = 2003 order by month(hire_date), day(hire_date);



