-- Initialize Roles (ID 1: ADMIN, 2: USER, 3: MANAGER)
INSERT INTO role (id, name, description) 
SELECT 1, 'ADMIN', 'Administrator with full access' FROM DUAL 
WHERE NOT EXISTS (SELECT 1 FROM role WHERE id = 1);

INSERT INTO role (id, name, description) 
SELECT 2, 'USER', 'Regular user with limited access' FROM DUAL 
WHERE NOT EXISTS (SELECT 1 FROM role WHERE id = 2);

INSERT INTO role (id, name, description) 
SELECT 3, 'MANAGER', 'Manager with elevated access' FROM DUAL 
WHERE NOT EXISTS (SELECT 1 FROM role WHERE id = 3);

-- Clean up existing data
DELETE FROM services;


-- Insert services with correct Vietnamese names, image paths, and durations
INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Rửa xe cơ bản', 'Rửa xe bên ngoài và lau khô', 'Rửa xe', 50000, '1766147887_4890621_cover_tet20_rua_xe_o-to_sach_an_toan.png', 30, 1);

INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Rửa xe cao cấp', 'Rửa xe + vệ vệ sinh nội thất', 'Rửa xe', 120000, '1767060893_rua-xe-o-to-bi-kip-giu-xe-cua-ban-luon-sach.png', 60, 1);

INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Thay nhớt', 'Thay dầu nhớt động cơ', 'Bảo dưỡng', 150000, '1766148550_508018506_122192536610301752_3577499174602859720_n.png', 45, 1);

INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Vệ sinh động cơ', 'Làm sạch khoang động cơ', 'Vệ sinh', 200000, '1766185779_kd1-1734516509036252761331.png', 90, 1);

INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Đánh bóng xe', 'Đánh bóng và làm mới sơn xe', 'Chăm sóc ngoại thất', 300000, '1766148550_509440695_122192536616301752_239412981932688480_n.png', 120, 1);

INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Phủ Nano', 'Phủ lớp nano bảo vệ sơn xe', 'Chăm sóc ngoại thất', 800000, '1767155535_nguyen-nhan-kinh-oto-bi-xuoc-1-.png', 180, 1);

INSERT INTO services (name, description, category, price, image_url, duration, active) 
VALUES ('Vệ sinh kim phun', 'Vệ sinh hệ thống kim phun xăng', 'Bảo dưỡng', 90000, '1772453532_2530075-d0bcd3d6ce25bca6bf742b34293e8339.png', 45, 1);
