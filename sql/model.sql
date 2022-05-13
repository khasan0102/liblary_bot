CREATE DATABASE liblary_bot;

\c liblary_bot

CREATE TABLE users (
    chat_id BIGINT NOT NULL PRIMARY KEY,
    username VARCHAR(64),
    phone_number VARCHAR(32),
    role SMALLINT DEFAULT 2,
    step SMALLINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users role
-- 1 -> admin
-- 2 -> user
-- 3 -> books

CREATE TABLE languages(
    language_id SERIAL NOT NULL PRIMARY KEY,
    language VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories(
    category_id SERIAL NOT NULL PRIMARY KEY,
    category_name VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE authors (
    author_id SERIAL NOT NULL PRIMARY KEY,
    author_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    book_id SERIAL NOT NULL PRIMARY KEY,
    book_name VARCHAR(32) NOT NULL,
    book_price BIGINT,
    book_description TEXT,
    book_image VARCHAR(128),
    book_author INT NOT NULL REFERENCES authors(author_id),
    book_language INT NOT NULL REFERENCES languages(language_id),
    book_category INT NOT NULL REFERENCES categories(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);