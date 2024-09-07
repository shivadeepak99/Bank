create database dbmsproject;
-- Bank Table
CREATE TABLE Bank (
    name VARCHAR(100),
    address VARCHAR(255),
    code INT PRIMARY KEY
);

-- Branch Table
CREATE TABLE Branch (
    branch_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255),
    bank_code INT,
    FOREIGN KEY (bank_code) REFERENCES Bank(code)
);

-- Account Table
CREATE TABLE Account (
    account_no INT PRIMARY KEY,
    balance DECIMAL(15, 2),
    acc_type VARCHAR(50),
    min_limit DECIMAL(10, 2),
    branch_id INT,
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);

-- Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    phone_no VARCHAR(15)
);

-- Loans Table
CREATE TABLE Loans (
    loan_type VARCHAR(50),
    amount DECIMAL(15, 2),
    interest DECIMAL(5, 2),
    branch_id INT,
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);

-- Passbook Table
CREATE TABLE Passbook (
    account_no INT,
    transaction_history TEXT,
    PRIMARY KEY (account_no),
    FOREIGN KEY (account_no) REFERENCES Account(account_no)
);

-- Fixed Deposit Table
CREATE TABLE Fixed_Deposit (
    fd_id INT PRIMARY KEY,
    interest DECIMAL(5, 2),
    account_no INT,
    FOREIGN KEY (account_no) REFERENCES Account(account_no)
);

-- Held-By Relationship (Customer holds an account)
CREATE TABLE Held_By (
    account_no INT,
    customer_id INT,
    PRIMARY KEY (account_no, customer_id),
    FOREIGN KEY (account_no) REFERENCES Account(account_no),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Availed-By Relationship (Customer avails a loan)
CREATE TABLE Availed_By (
    loan_type VARCHAR(50),
    customer_id INT,
    PRIMARY KEY (loan_type, customer_id),
    FOREIGN KEY (loan_type) REFERENCES Loans(loan_type),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Deposits-In Relationship (Customer deposits in Fixed Deposit)
CREATE TABLE Deposits_In (
    fd_id INT,
    customer_id INT,
    PRIMARY KEY (fd_id, customer_id),
    FOREIGN KEY (fd_id) REFERENCES Fixed_Deposit(fd_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Insert into Bank
INSERT INTO Bank (name, address, code) VALUES ('XYZ Bank', '123 Main St', 101);

-- Insert into Branch
INSERT INTO Branch (branch_id, name, address, bank_code) VALUES (1, 'Main Branch', '123 Main St', 101);

-- Insert into Account
INSERT INTO Account (account_no, balance, acc_type, min_limit, branch_id) VALUES (1001, 5000.00, 'Savings', 1000.00, 1);

-- Insert into Customers
INSERT INTO Customers (customer_id, name, phone_no) VALUES (1, 'John Doe', '1234567890');

-- Insert into Loans
INSERT INTO Loans (loan_type, amount, interest, branch_id) VALUES ('Home Loan', 50000.00, 3.5, 1);

-- Insert into Passbook
INSERT INTO Passbook (account_no, transaction_history) VALUES (1001, 'Deposit: 5000');

-- Insert into Fixed_Deposit
INSERT INTO Fixed_Deposit (fd_id, interest, account_no) VALUES (1, 5.0, 1001);

-- Insert into Held-By
INSERT INTO Held_By (account_no, customer_id) VALUES (1001, 1);

-- Insert into Availed-By
INSERT INTO Availed_By (loan_type, customer_id) VALUES ('Home Loan', 1);

-- Insert into Deposits-In
INSERT INTO Deposits_In (fd_id, customer_id) VALUES (1, 1);










