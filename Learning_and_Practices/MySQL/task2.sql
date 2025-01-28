use task2;

CREATE TABLE Worker (
    WORKER_ID INT PRIMARY KEY,
    FIRST_NAME VARCHAR(255),
    LAST_NAME VARCHAR(255),
    SALARY INT,
    JOINING_DATE DATETIME,
    DEPARTMENT VARCHAR(255)
);

CREATE TABLE Worker_Titles (
    WORKER_REF_ID INT,
    WORKER_TITLE VARCHAR(255),
    AFFECTED_FROM DATETIME
);

INSERT INTO Worker (WORKER_ID, FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT) VALUES
    (1, 'Monika', 'Patel', 100000, '2014-02-20 09:00:00', 'HR'),
    (2, 'Niharika', 'Verma', 80000, '2014-06-11 09:00:00', 'Admin'),
    (3, 'Vishal', 'Singhal', 300000, '2014-02-20 09:00:00', 'HR'),
    (4, 'Amitabh', 'Singh', 500000, '2014-02-20 09:00:00', 'Admin'),
    (5, 'Vivek', 'Bhatti', 500000, '2014-06-11 09:00:00', 'Admin'),
    (6, 'Vipul', 'Diwan', 200000, '2014-06-11 09:00:00', 'Account'),
    (7, 'Satish', 'Kumar', 75000, '2014-01-20 09:00:00', 'Account'),
    (8, 'Geetika', 'Chauhan', 90000, '2014-04-11 09:00:00', 'Admin');
    
INSERT INTO Worker_Titles (WORKER_REF_ID, WORKER_TITLE, AFFECTED_FROM) VALUES
    (1, 'Manager', '2016-02-20 00:00:00'),
    (2, 'Executive', '2016-06-11 00:00:00'),
    (8, 'Executive', '2016-06-11 00:00:00'),
    (5, 'Manager', '2016-06-11 00:00:00'),
    (4, 'Asst. Manager', '2016-06-11 00:00:00'),
    (7, 'Executive', '2016-06-11 00:00:00'),
    (6, 'Lead', '2016-06-11 00:00:00'),
    (3, 'Lead', '2016-06-11 00:00:00');

CREATE TABLE bonus (
    WORKER_REF_ID INT,
    BONUS_DATE DATETIME,
    BONUS_AMOUNT INT
);

INSERT INTO bonus (WORKER_REF_ID, BONUS_DATE, BONUS_AMOUNT) VALUES
    (1, '2016-02-20 00:00:00', 5000),
    (2, '2016-06-11 00:00:00', 3000),
    (3, '2016-02-20 00:00:00', 4000),
    (1, '2016-02-20 00:00:00', 4500),
    (2, '2016-06-11 00:00:00', 3500);

-- 1
select substring(FIRST_NAME, 1, 3) from worker;

-- 2
select * from (select *, row_number() over( order by worker_id) as row_num from worker) as nubered_rows where mod(row_num, 2) = 1;

-- 3
select * from worker where first_name like "%h" AND length(first_name) = 6;

-- 4
select count(*) from worker where DEPARTMENT = 'Admin';

-- 5
select * from worker where SALARY between 100000 and 500000;

-- 6
select * from worker where year(JOINING_DATE) = 2014 and month(joining_date) = 2;

-- 7
select upper(first_name) from worker;

-- 8
select * from worker where 50000 <= SALARY <= 100000;

-- 9
select * from worker w join worker_titles wt on w.WORKER_ID = wt.WORKER_REF_ID where wt.WORKER_TITLE = 'Manager';

-- 10
select distinct DEPARTMENT from worker;

-- 11
select * from (select *,row_number() over() as row_no from worker) as numbered_row where row_no <= (select count(*) / 2 from worker);

-- 12
select rtrim(first_name) from worker;

-- 13
select replace(first_name, "a", "A") from worker;

-- 14
-- select first_name | " " | last_name as COMPLETE_NAME from worker; // || Operator not Supported in MySQL;
select concat(first_name, " ", last_name) as COMPLETE_NAME from worker;

-- 15
select * from worker order by first_name asc, DEPARTMENT desc;

-- 16
select * from worker where FIRST_NAME not in ('Vipul', 'Satish');

-- 17
select now();

-- 18
select distinct salary from worker order by salary desc limit 1,1;

-- 19
select * from worker union all select * from worker group by WORKER_ID;

-- 20
select distinct * from worker w join bonus b on w.WORKER_ID = b.WORKER_REF_ID;
