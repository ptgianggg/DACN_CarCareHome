-- Clean up existing data
DELETE FROM services;

-- Insert services with correct Vietnamese names, image paths, and durations
INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Rửa xe cơ bản', 'Rửa xe bên ngoài và lau khô', 50000, 60000, 17, '1766147887_4890621_cover_tet20_rua_xe_o-to_sach_an_toan.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '30 phút', 1);

INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Rửa xe cao cấp', 'Rửa xe + vệ vệ sinh nội thất', 120000, 150000, 20, '1767060893_rua-xe-o-to-bi-kip-giu-xe-cua-ban-luon-sach.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '60 phút', 1);

INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Thay nhớt', 'Thay dầu nhớt động cơ', 150000, 180000, 16, '1766148550_508018506_122192536610301752_3577499174602859720_n.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '45 phút', 1);

INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Vệ sinh động cơ', 'Làm sạch khoang động cơ', 200000, 250000, 20, '1766185779_kd1-1734516509036252761331.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '90 phút', 1);

INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Đánh bóng xe', 'Đánh bóng và làm mới sơn xe', 300000, 400000, 25, '1766148550_509440695_122192536616301752_239412981932688480_n.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '120 phút', 1);

INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Phủ Nano', 'Phủ lớp nano bảo vệ sơn xe', 800000, 1000000, 20, '1767155535_nguyen-nhan-kinh-oto-bi-xuoc-1-.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '180 phút', 1);

INSERT INTO services (name, description, price, original_price, discount_percentage, image_url, store_name, store_address, duration, active) 
VALUES ('Vệ sinh kim phun', 'Vệ sinh hệ thống kim phun xăng', 90000, 100000, 10, '1772453532_2530075-d0bcd3d6ce25bca6bf742b34293e8339.png', 'CarCare Center', 'Số 123 Đường ABC, HCM', '45 phút', 1);
