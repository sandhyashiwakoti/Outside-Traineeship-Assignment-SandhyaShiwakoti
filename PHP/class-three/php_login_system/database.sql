-- This SQL File is run on phpMyAdmin SQL tab to create the database and users table for the login system
-- First, create the database
CREATE DATABASE IF NOT EXISTS login_system;

-- Switch to that database
USE login_system;

-- Create the users table with 3 columns: id, username, password
CREATE TABLE IF NOT EXISTS users (
    id       INT AUTO_INCREMENT PRIMARY KEY,  -- unique number for each user, goes up automatically
    username VARCHAR(50) NOT NULL UNIQUE,     -- unique username (no duplicates)
    password VARCHAR(255) NOT NULL            -- hashed password (255 chars because hashes are long)
);