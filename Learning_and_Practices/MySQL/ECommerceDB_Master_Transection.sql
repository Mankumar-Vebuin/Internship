use ecommercedb;

CREATE TABLE m_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    phone_no VARCHAR(10) UNIQUE, 
    full_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    referral_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean
);

CREATE TABLE m_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    icon_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean
);

INSERT INTO m_categories (name, icon_url)
VALUES
    ('Foods', 'path/to/foods_icon.png'),
    ('Gift', 'path/to/gift_icon.png'),
    ('Fashion', 'path/to/fashion_icon.png'),
    ('Gadget', 'path/to/gadget_icon.png'),
    ('Computer', 'path/to/computer_icon.png'),
    ('Souvenir', 'path/to/souvenir_icon.png');

CREATE TABLE m_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
	category int,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    rating DECIMAL(3, 2),
    reviews_count INT DEFAULT 0,
    description TEXT,
    available_stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean,
    FOREIGN KEY (category) REFERENCES m_categories(id)
);

INSERT INTO m_products (category, name, price, rating, reviews_count, description, available_stock)
VALUES (
	1,
    'TMA–2HD Wireless',
    1500000,
    4.6,
    86,
    'The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter, and stronger than regular PET speaker units...',
    250
);

create table m_product_images (
	id INT AUTO_INCREMENT PRIMARY KEY,
    product int not null,
    icon_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean,
    FOREIGN KEY (product) REFERENCES m_products(id)
);

create table t_product_items (
	id INT AUTO_INCREMENT PRIMARY KEY,
    product int not null,
    color varchar(20),
    type varchar(30),
    prise decimal(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean,
    FOREIGN KEY (product) REFERENCES m_products(id)
);

insert into m_product_items (product, color, type, prise) values (1, "Black", "Headphone", 1200);
insert into m_product_items (product, color, type, prise) values (1, "red", "Headphone", 1000);
insert into m_product_items (product, color, type, prise) values (1, "white", "Headphone", 1100);

create table t_reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user int not null,
    product int not null,
    description text not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean,
    FOREIGN KEY (user) REFERENCES m_users(user_id),
    FOREIGN KEY (product) REFERENCES m_products(id)
);

create table t_cart (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user int not null,
    product int not null,
    quantity int not null,
    address varchar(200) not null,
    total_amount decimal(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean,
    FOREIGN KEY (user) REFERENCES m_users(user_id),
    FOREIGN KEY (product) REFERENCES m_products(id)
);

create table t_orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user int not null,
    product int not null,
    status enum ("Placed","Shipped","Delivered"),
    address varchar(200) not null,
    total_amount decimal(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean,
    FOREIGN KEY (user) REFERENCES m_users(user_id),
    FOREIGN KEY (product) REFERENCES m_products(id)
);

create table m_news(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) not null,
    description varchar(300) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    is_deleted boolean
);

