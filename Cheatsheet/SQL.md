# SQL Cheat Sheet

## 📑 Table of Contents
- [What is a Database? Why?](#what-is-a-database-why)
- [DBMS (Database Management System)](#dbms-database-management-system)
- [SQL vs NoSQL](#sql-vs-nosql)
  - [SQL Data Example (Table-Based)](#sql-data-example-table-based)
  - [NoSQL Data Example (JSON-Based)](#nosql-data-example-json-based)
- [SQL vs MySQL](#sql-vs-mysql)
- [SQL Case Sensitivity](#sql-case-sensitivity)
- [Introduction to SQL](#introduction-to-sql)
- [SQL Data Types with Ranges](#sql-data-types-with-ranges)
  - [Numeric Data Types](#numeric-data-types)
  - [String Data Types](#string-data-types)
  - [Date & Time Data Types](#date--time-data-types)
  - [Boolean Data Type](#boolean-data-type)
- [Basic SQL Commands](#basic-sql-commands)
  - [1. Creating a Database](#1-creating-a-database)
  - [2. Using a Database](#2-using-a-database)
  - [3. Creating a Table](#3-creating-a-table)
  - [4. Inserting Data](#4-inserting-data)
  - [5. Selecting Data](#5-selecting-data)
  - [6. Updating Data](#6-updating-data)
  - [7. Deleting Data](#7-deleting-data)
- [🔹 ALTER (Modify Table Schema)](#alter-modify-table-schema)
- [🔹 TRUNCATE (Remove All Records)](#truncate-remove-all-records)
  - [TRUNCATE vs DROP](#truncate-vs-drop)
  - [DROP (Remove Entire Table)](#drop-remove-entire-table)
- [Intermediate SQL](#intermediate-sql)
  - [🔹 1. Constraints](#-1-constraints)
    - [UNIQUE](#unique-constraint)
    - [PRIMARY KEY](#primary-key-constraint)
    - [FOREIGN KEY](#foreign-key-constraint)
    - [CHECK](#check-constraint)
    - [NOT NULL](#not-null-constraint)
- [SQL Relationships](#🔗-sql-relationships)

---

## What is a Database? Why?
A database is a structured collection of data that allows efficient storage, retrieval, and manipulation. It helps in managing large amounts of data efficiently.

## DBMS (Database Management System)
A software that interacts with databases to store, retrieve, and manipulate data (e.g., MySQL, PostgreSQL, MongoDB, etc.).

## SQL vs NoSQL
| Feature        | SQL (Relational)        | NoSQL (Non-Relational) |
|----------------|-------------------------|------------------------|
| Data Structure | Tables (Rows & Columns) | JSON, Key-Value, Graph, Column-family |
| Schema         | Fixed schema            | Dynamic schema |
| Scalability    | Vertical scaling        | Horizontal scaling |
| Examples       | MySQL, PostgreSQL       | MongoDB, Redis |

### SQL Data Example (Table-Based)
```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);
```
    Users
--------------
name  |  email
--------------
a     |  a.com
b     |  b.com
c     |  c.com


### NoSQL Data Example (JSON-Based)
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

## SQL vs MySQL
- **SQL** is a language for managing data.
- **MySQL** is a database management system that uses SQL.

## SQL Case Sensitivity
- **SQL keywords** are case-insensitive (`SELECT` = `select`).
- **Table & column names** are case-sensitive in some DBMS (MySQL: depends on OS).

---

## **Introduction to SQL**
SQL (Structured Query Language) is used to manage and manipulate relational databases.

# SQL Data Types with Ranges

## Numeric Data Types

| Data Type    | Storage (Bytes) | Range |
|-------------|---------------|-------|
| **TINYINT** | 1             | -128 to 127 (Signed) / 0 to 255 (Unsigned) |
| **INT**     | 4             | -2,147,483,648 to 2,147,483,647 (Signed) / 0 to 4,294,967,295 (Unsigned) |
| **BIGINT**  | 8             | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (Signed) / 0 to 18,446,744,073,709,551,615 (Unsigned) |
| **BIT**     | 1             | 0 or 1 (Boolean-like values) |
| **FLOAT**   | 4             | Approx. ±3.4E+38 |
| **DOUBLE**  | 8             | Approx. ±1.8E+308 |

## String Data Types

| Data Type    | Storage | Description |
|-------------|---------|-------------|
| **CHAR(N)**  | 0-255 bytes | Fixed-length string (N characters) |
| **VARCHAR(N)** | 0-65,535 bytes | Variable-length string (depends on row size) |
| **BLOB**    | 0-65,535 bytes | Binary large object (for storing binary data) |

## Date & Time Data Types

| Data Type   | Storage (Bytes) | Range |
|------------|---------------|-------|
| **DATE**   | 3             | '1000-01-01' to '9999-12-31' |
| **YEAR**   | 1             | 1901 to 2155 |

## Boolean Data Type

| Data Type  | Storage | Description |
|------------|---------|-------------|
| **BOOLEAN / BOOL** | 1 byte | Alias for TINYINT(1), where 0 = false, 1 = true |

---

# **Basic SQL Commands**

### 📝 **1. Creating a Database**
```sql
CREATE DATABASE my_database;
```

### 📝 **2. Using a Database**
```sql
USE my_database;
```

```sql
CREATE DATABASE IF NOT EXISTS my_database;
```

```sql
DROP DATABASE IF EXISTS my_database;
```

```sql
SHOW DATABASES;
```

```sql
SHOW TABLES;
```

### 📝 **3. Creating a Table**
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 18)
);
```
*Col_Name & datatype are required, constraints are optional

### **4. Inserting Data**
```sql
INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 25);
```

### 📝 **5. Selecting Data**
```sql
SELECT * FROM users;
SELECT name, email FROM users WHERE age > 20;
```

### 📝 **6. Updating Data**
```sql
UPDATE users SET age = 30 WHERE name = 'John Doe';
```

### 📝 **7. Deleting Data**
```sql
DELETE FROM users WHERE name = 'John Doe';
```

## ALTER (Modify Table Schema)
The `ALTER` statement is used to change the structure of an existing table, including modifying column names, data types, and constraints.

### ✅ Rename a Column
```sql
ALTER TABLE users RENAME COLUMN old_name TO new_name;
```

### ✅ Change Data Type of a Column
```sql
ALTER TABLE users MODIFY age INT;
```

### ✅ Add a New Column
```sql
ALTER TABLE users ADD email VARCHAR(255);
```

### ✅ Delete a Column
```sql
ALTER TABLE users DROP COLUMN email;
```

### ✅ Modify a Column Constraint
```sql
ALTER TABLE users MODIFY name VARCHAR(100) NOT NULL;
```

### ✅ Add a Constraint
```sql
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
```

### ✅ Drop a Constraint
```sql
ALTER TABLE users DROP CONSTRAINT unique_email;
```

## TRUNCATE (Remove All Records)
The `TRUNCATE` statement removes all rows from a table but keeps its structure intact.
```sql
TRUNCATE TABLE users;
```

### 🔥 TRUNCATE vs DROP
| Feature         | TRUNCATE | DROP |
|---------------|---------|------|
| Removes Data? | ✅ Yes  | ✅ Yes |
| Keeps Schema? | ✅ Yes  | ❌ No  |
| Rollback Possible? | ❌ No | ❌ No |
| Resets Auto-Increment? | ✅ Yes | ✅ Yes |
| Faster than DELETE? | ✅ Yes | N/A |

### ✅ DROP (Remove Entire Table)
Removes the table along with its schema.
```sql
DROP TABLE users;
```



---
# **Intermediate SQL**


## 🔹 **1. Constraints**

### ✅ UNIQUE Constraint
Ensures that all values in a column are unique.
```sql
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
```

### ✅ PRIMARY KEY Constraint
Uniquely identifies each record in a table.
```sql
ALTER TABLE users ADD CONSTRAINT pk_user_id PRIMARY KEY (id);
```

### ✅ FOREIGN KEY Constraint
Ensures referential integrity by linking to a column in another table.
```sql
ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
```

### ✅ CHECK Constraint
Ensures that values in a column meet a specific condition.
```sql
ALTER TABLE users ADD CONSTRAINT check_age CHECK (age >= 18);
```

### ✅ NOT NULL Constraint
Ensures that a column cannot have NULL values.
```sql
ALTER TABLE users MODIFY name VARCHAR(255) NOT NULL;
```

### ✅ DEFAULT Constraint
Assigns a default value if no value is provided.
```sql
ALTER TABLE users ALTER COLUMN status SET DEFAULT 'active';
```

### ✅ INDEX Constraint
Speeds up searches on a column.
```sql
CREATE INDEX idx_email ON users(email);
```


## 🔹 **2. Joins**
SQL Joins are used to combine rows from two or more tables based on a related column between them.

### ✅ INNER JOIN
Returns only the matching rows between the tables.
```sql
SELECT users.name, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id;
```

### ✅ LEFT JOIN (OUTER JOIN)
Returns all records from the left table and matched records from the right table. If no match is found, NULL values are returned for columns from the right table.
```sql
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

### ✅ RIGHT JOIN (OUTER JOIN)
Returns all records from the right table and matched records from the left table. If no match is found, NULL values are returned for columns from the left table.
```sql
SELECT users.name, orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```

### ✅ FULL JOIN (FULL OUTER JOIN)
Returns all records from both tables, filling in NULLs for non-matching rows.
```sql
SELECT users.name, orders.amount
FROM users
FULL JOIN orders ON users.id = orders.user_id;
```

### ✅ CROSS JOIN
Returns the Cartesian product of both tables, meaning each row from the first table is combined with each row from the second table.
```sql
SELECT users.name, orders.amount
FROM users
CROSS JOIN orders;
```

### ✅ SELF JOIN
A join where a table is joined with itself.
```sql
SELECT A.name AS Employee, B.name AS Manager
FROM employees A
JOIN employees B ON A.manager_id = B.id;
```


## 🔹 **3. Aggregation Functions**
```sql
SELECT COUNT(*) FROM users;
SELECT SUM(age) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(age) FROM users;
```


## 🔹 **4. Clauses**
SQL clauses define conditions and constraints in queries to filter, group, or order data efficiently.

### ✅ WHERE Clause
Filters records based on a specific condition.
```sql
SELECT * FROM users WHERE age > 18;
```
All arithematic, comparision, logical, bitwise operators can be used.

### ✅ ORDER BY Clause
Sorts query results in ascending or descending order.
```sql
SELECT name, age FROM users ORDER BY age DESC;
SELECT id FROM users ORDER BY age ASC;
```

### ✅ GROUP BY Clause
Groups rows sharing the same values in specified columns.
```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

### ✅ HAVING Clause
Filters grouped records based on a condition (used with GROUP BY).
```sql
SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;
```

### ✅ LIMIT Clause
Restricts the number of records returned.
```sql
SELECT * FROM products LIMIT 10;
```

### ✅ OFFSET Clause
Skips a specific number of rows before returning results (used with LIMIT).
```sql
SELECT * FROM products LIMIT 10 OFFSET 5;
```

### ✅ DISTINCT Clause
Returns unique values by removing duplicates.
```sql
SELECT DISTINCT city FROM customers;
```

### ✅ JOIN Clause
Combines rows from multiple tables based on related columns.
```sql
SELECT users.name, orders.amount FROM users JOIN orders ON users.id = orders.user_id;
```

General Order of Clauses-
```sql
SELECT col(s)
FROM table_name
Where <condition>
GROUP BY column(s)
HAVING <condition>
ORDER BY column(s) ASC;
```





---
## **Using SQL with Node.js**

### 🔹 **1. Installing MySQL package**
```bash
npm install mysql2
```

### 🔹 **2. Connecting to MySQL**
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_database'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});
```

### 🔹 **3. Running Queries**
```javascript
connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});
```

### 🔹 **4. Inserting Data**
```javascript
const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
const values = ['Alice', 'alice@example.com', 28];

connection.query(sql, values, (err, results) => {
    if (err) throw err;
    console.log('User added!', results.insertId);
});
```

### 🔹 **5. Closing Connection**
```javascript
connection.end();
```




# SQL Pagination Explained

## 🔹 What is Pagination?
Pagination in SQL helps in retrieving a subset of results from a large dataset, typically for displaying data in pages on an application.

## ✅ Using `LIMIT` and `OFFSET`
Most SQL databases support `LIMIT` and `OFFSET` for pagination.

```sql
SELECT * FROM users LIMIT 10 OFFSET 20;
```
- `LIMIT 10` → Fetches 10 records.
- `OFFSET 20` → Skips the first 20 records.

### 🔥 Example: Paginate Through Users Table
Fetching the first 10 users (Page 1):
```sql
SELECT * FROM users LIMIT 10 OFFSET 0;
```
Fetching the next 10 users (Page 2):
```sql
SELECT * FROM users LIMIT 10 OFFSET 10;
```

## ✅ Using `ROW_NUMBER()` (For SQL Servers)
Some databases like SQL Server and PostgreSQL use `ROW_NUMBER()` for pagination.

```sql
SELECT * FROM (
    SELECT ROW_NUMBER() OVER (ORDER BY id) AS row_num, * FROM users
) AS numbered_users
WHERE row_num BETWEEN 11 AND 20;
```

## ✅ Using `FETCH NEXT` (For SQL Server)
```sql
SELECT * FROM users ORDER BY id
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```

## 🔹 Best Practices
- Use indexing on the column used for sorting to optimize performance.
- Avoid high `OFFSET` values as they can slow down queries on large datasets.
- Consider cursor-based pagination for better efficiency in large datasets.

---

## 🔗 SQL Relationships

### 🧍‍♂️ One-to-One (1x1)
Each row in **Table A** is related to **one and only one** row in **Table B**.

#### Example: `Person` & `Passport`
- Each person has **one** passport.
- Each passport belongs to **one** person.

```sql
CREATE TABLE Person (
  person_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE Passport (
  passport_id INT PRIMARY KEY,
  person_id INT UNIQUE,
  FOREIGN KEY (person_id) REFERENCES Person(person_id)
);
```

---

### 🧍‍♂️➡️👥 One-to-Many (1xN)
A single row in **Table A** can be related to **multiple rows** in **Table B**, but not vice versa.

#### Example: `Author` & `Books`
- One author can write **many** books.
- Each book has **only one** author.

```sql
CREATE TABLE Author (
  author_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE Book (
  book_id INT PRIMARY KEY,
  title VARCHAR(100),
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES Author(author_id)
);
```

---

### 👥🔁👥 Many-to-Many (NxN)
Rows in **Table A** can be associated with **multiple rows** in **Table B**, and vice versa.  
A **junction table** is used to handle this relationship.

#### Example: `Students` & `Courses`
- A student can enroll in **many** courses.
- A course can have **many** students.

```sql
CREATE TABLE Student (
  student_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE Course (
  course_id INT PRIMARY KEY,
  title VARCHAR(100)
);

CREATE TABLE Enrollment (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES Student(student_id),
  FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
```