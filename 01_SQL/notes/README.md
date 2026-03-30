# 📘 SQL Notes (Data Engineering Journey)

## 📌 About

This repository contains my structured SQL learning notes as part of my Data Engineering journey.
It includes core concepts, advanced techniques, and practical query patterns used in real-world data workflows.

---

## 📂 Topics Covered

### 🔹 Basic SQL

* **DDL (Data Definition Language)**
  Used to define database structure (CREATE, ALTER, DROP, TRUNCATE).
* **DML (Data Manipulation Language)**
  Used to modify data inside tables (INSERT, UPDATE, DELETE, MERGE).
* **DQL (Data Query Language)**
  Used to retrieve data using SELECT queries with filtering and conditions.
* **Datatypes**
  Defines the type of data stored (INT, VARCHAR, DATE, etc.).
* **Constraints & Differnts Keys**
  Ensures data integrity (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL).

---

### 🔹 Intermediate SQL

* **Filtering (WHERE / HAVING)**
  Used to filter data based on conditions.
  WHERE filters rows before aggregation, HAVING filters after aggregation.

* **Operators**
  Used for conditions inside queries:

  * Comparison → =, >, <, >=, <=
  * Logical → AND, OR, NOT
  * Special → IN, BETWEEN, LIKE, IS NULL

* **Group By**
  Groups data for aggregation (e.g., total sales per category).

* **Order By**
  Sorts query results (ASC / DESC).

* **Limit / Top**
  Restricts number of rows returned.

* **Distinct**
  Removes duplicate values from result set.

---

### 🔹 Joins (Data Combining)

* **Inner Join**
  Returns matching records from both tables.

* **Left Join**
  Returns all records from left table + matched from right.

* **Right Join**
  Returns all records from right table + matched from left.

* **Full Join**
  Returns all records when there is a match in either table.

* **Self Join**
  Joins a table with itself.

* **Cross Join**
  Produces Cartesian product (all combinations).

---

### 🔹 Advanced Join Types

* **Left Anti Join**
  Returns rows from left table with no match in right.

* **Right Anti Join**
  Returns rows from right table with no match in left.

* **Semi Join**
  Returns rows that have a match (without duplication).

* **Left/Right Semi Join**
  Variant used in distributed systems (like Spark SQL).

---

### 🔹 Query Enhancements

* **Aliases (AS)**
  Used to rename columns or tables for readability.

* **Subqueries**
  Queries inside another query for filtering or transformation.

* **CASE Statements**
  Conditional logic inside SQL (like if-else).

---

### 🔹 Set Operations

* **UNION** → Combines results (removes duplicates)
* **UNION ALL** → Combines results (keeps duplicates)
* **INTERSECT** → Returns common records
* **EXCEPT** → Returns records present in one but not another


### 🔹 Advanced SQL 🚧

* **Window Functions**
  Perform calculations across rows (RANK, ROW_NUMBER, PARTITION BY).
* **CTEs (Common Table Expressions)**
  Temporary result sets for cleaner and modular queries.
* **Stored Procedures**
  Reusable SQL logic for automation and performance.
* **Views**
  Virtual tables to simplify complex queries.
* **Indexes**
  Improve query performance by optimizing data access.
* **Frame Clause**
  Defines row range for window functions.
* **Query Optimization**
  Writing efficient queries for large datasets.

---

### 🔹 Data Engineering SQL 🚀

* **External vs Managed Tables**
  Understanding data storage in modern data lakes/warehouses.
* **Spark SQL**
  Querying large-scale distributed data using Apache Spark.
* **Jinja Templates**
  Writing dynamic SQL (commonly used in tools like dbt).
* **Partitioning & Bucketing 🚧**
  Optimizing large datasets for faster queries.

---

## 📄 Notes & Resources

* `sql_ddl_dml_commands.pdf`
  → Covers foundational SQL concepts, commands, datatypes, constraints, and keys

* *(More structured notes and diagrams will be added as learning progresses)*

---

## 🧠 What I Learned

* Writing structured and optimized SQL queries
* Understanding how relational databases work internally
* Handling real-world data scenarios using joins and aggregations
* Improving performance using indexing and query optimization
* Applying SQL in Data Engineering workflows (Spark, dynamic queries)

---

## 🛠️ Practical Exposure

* Practiced writing queries on structured datasets
* Built table schemas with constraints and relationships
* Solved real-world query problems (filtering, joins, aggregations)
* Explored query optimization techniques
* Started working with big data SQL (Spark SQL)

---

## 🎯 Goals

* Master SQL for Data Engineering roles
* Build scalable and efficient data pipelines
* Strengthen problem-solving using real datasets
* Transition from SQL learner → Data Engineer

---

## 📌 Future Improvements

* Add query practice sets in `tasks/`
* Add real-world projects in `project/`
* Include architecture diagrams in `diagrams/`

---

💡 This repository is continuously evolving as I learn, practice, and build real-world data solutions.
