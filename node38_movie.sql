/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cum_rap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(225) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `cum_rap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `he_thong_rap` (`ma_he_thong_rap`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dat_ve` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` int DEFAULT NULL,
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_ghe` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `tai_khoan` (`tai_khoan`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `dat_ve_ibfk_1` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `lich_chieu` (`ma_lich_chieu`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dat_ve_ibfk_2` FOREIGN KEY (`tai_khoan`) REFERENCES `nguoi_dung` (`tai_khoan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dat_ve_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `ghe` (`ma_ghe`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(100) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `he_thong_rap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(225) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `lich_chieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_rap` (`ma_rap`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `lich_chieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lich_chieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1234339 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(225) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `so_dt` varchar(225) DEFAULT NULL,
  `mat_khau` varchar(225) DEFAULT NULL,
  `loai_nguoi_dung` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=14568 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(225) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rap_phim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(225) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `rap_phim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cum_rap` (`ma_cum_rap`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(1, 9, 'Banner1.jpg');
INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(2, 10, 'Banner2.jpg');
INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3, 3, 'Banner3.jpg');
INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(4, 4, 'Banner4.jpg'),
(5, 5, 'Banner5.jpg'),
(6, 6, 'Banner6.jpg'),
(7, 7, 'Banner7.jpg'),
(8, 8, 'Banner8.jpg'),
(9, 9, 'Banner9.jpg'),
(10, 10, 'Banner10.jpg');

INSERT INTO `cum_rap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'Cum Rap CGV 1', 'Dia Chi 1', 1);
INSERT INTO `cum_rap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'Cum Rap BHD 1', 'Dia Chi 2', 2);
INSERT INTO `cum_rap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'Cum Rap LOTTE 1', 'Dia Chi 3', 3);
INSERT INTO `cum_rap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'Cum Rap MEGA GS 1', 'Dia Chi 4', 4),
(5, 'Cum Rap GALAXY', 'Dia Chi 5', 5),
(6, 'Cum Rap CINER STAR', 'Dia Chi 6', 6),
(7, 'Cum Rap CGV 2', 'Dia Chi 7', 1),
(8, 'Cum Rap BHD 2', 'Dia Chi 8', 2),
(9, 'Cum Rap LOTTE 2', 'Dia Chi 9', 3),
(10, 'Cum Rap MEGA GS 2', 'Dia Chi 10', 4);

INSERT INTO `dat_ve` (`id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(65, 3, 3, 13);
INSERT INTO `dat_ve` (`id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(66, 4, 4, 14);
INSERT INTO `dat_ve` (`id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(67, 5, 5, 15);
INSERT INTO `dat_ve` (`id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(70, 8, 8, 18),
(71, 9, 9, 19),
(72, 2, 1, 20),
(81, 145, 1, 11),
(82, 145, 1, 17);

INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(11, 'Ghe 1', 'VIP', 1);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(12, 'Ghe 2', 'Thuong', 2);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(13, 'Ghe 3', 'VIP', 3);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(14, 'Ghe 4', 'Thuong', 4),
(15, 'Ghe 5', 'VIP', 5),
(16, 'Ghe 6', 'Thuong', 6),
(17, 'Ghe 7', 'VIP', 1),
(18, 'Ghe 8', 'Thuong', 2),
(19, 'Ghe 9', 'VIP', 3),
(20, 'Ghe 10', 'Thuong', 4);

INSERT INTO `he_thong_rap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'CGV CINEMA', 'Logo1.jpg');
INSERT INTO `he_thong_rap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'BHD CINEMA', 'Logo2.jpg');
INSERT INTO `he_thong_rap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'LOTTE CINEMA', 'Logo3.jpg');
INSERT INTO `he_thong_rap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'MEGA GS', 'Logo4.jpg'),
(5, 'GALAXY CINEMA', 'Logo5.jpg'),
(6, 'CINER STAR CINEMA', 'Logo6.jpg');

INSERT INTO `lich_chieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 11, '2024-02-10 14:30:00', 100000);
INSERT INTO `lich_chieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 3, 3, '2024-02-11 10:00:00', 90000);
INSERT INTO `lich_chieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 4, 4, '2024-02-11 14:30:00', 110000);
INSERT INTO `lich_chieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(5, 5, 5, '2024-02-12 18:15:00', 130000),
(6, 6, 6, '2024-02-12 20:30:00', 95000),
(7, 1, 7, '2024-02-13 12:00:00', 105000),
(8, 2, 8, '2024-02-13 16:45:00', 125000),
(9, 3, 9, '2024-02-14 19:00:00', 115000),
(10, 4, 10, '2024-02-14 21:15:00', 135000),
(111, 4, 18, '2024-01-24 03:38:03', 1055000),
(1234338, 4, 18, '2024-01-24 03:38:03', 1055000);

INSERT INTO `nguoi_dung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'prisma async', 'abc@gmail.com', 'abc', '$2b$10$hZgbPC660RzpqQadHliFgev3B7jmPbgzz5UZIK8TwoBzqQzk5zQk2', 'QuanTri');
INSERT INTO `nguoi_dung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'Tran Thi B', 'tran.b@example.com', '0987654321', 'hashed_password_2', 'KhachHang');
INSERT INTO `nguoi_dung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(3, 'Le Van C', 'le.c@example.com', '0123456789', 'hashed_password_3', 'KhachHang');
INSERT INTO `nguoi_dung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'Pham Thi D', 'pham.d@example.com', '0987654321', 'hashed_password_4', 'KhachHang'),
(5, 'Hoang Van E', 'hoang.e@example.com', '0123456789', 'hashed_password_5', 'KhachHang'),
(7, 'Tran Van G', 'tran.g@example.com', '0123456789', 'hashed_password_7', 'KhachHang'),
(8, 'prisma ei', 'le.h@example.com', '0987654321', 'hashed_password_8', 'QuanTri'),
(9, 'Pham Van I', 'pham.i@example.com', '0123456789', 'hashed_password_9', 'QuanTri'),
(145, 'Khoi', 'khoidang@gmail.com', '0987654321', '$2b$10$rqFyT71i2Hgga.9.brY/V.jI4gSZe1p8.l9Bo1pDMAVZnLoWO14g.', 'QuanTri'),
(1456, 'prisma async', 'abcd@gmail.com', '0909090909', '$2b$10$MZBqTnDPpAfOfAEv/agtVu4iHq.jUaNnKDwOiszC9OiiEbiehnA3G', 'KhachHang'),
(14565, 'prisma async', 'abcde@gmail.com', '0909090909', '$2b$10$1DuI2puoOvrDbYrS3AOgpu0J2f.hKA/3S8HUvFTeHdJPnE1BhYYGW', 'KhachHang');

INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'magene', 'do not have trailer', 'http://res.cloudinary.com/dlqjmymt5/image/upload/v1706704179/xuyhstre4evurabe6pv5.jpg', 'abc', '2024-01-24', 5, 1, 1, 1);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'aaa', 'bbb', 'http://res.cloudinary.com/dlqjmymt5/image/upload/v1706682011/sugc2sk78laetapmkx6a.jpg', 'bbb', '2024-01-24', 3, 1, 1, 1);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'Phim 4', 'Trailer 4', 'http://res.cloudinary.com/dlqjmymt5/image/upload/v1706683144/u0a8bh5pbvunwngtidjs.jpg', 'Mo ta phim 4', '2024-01-22', 5, 0, 0, 0);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(5, 'Phim 5', 'Trailer 5', 'HinhAnh5.jpg', 'Mo ta phim 5', '2024-01-23', 3, 1, 1, 1),
(6, 'Phim 6', 'Trailer 6', 'HinhAnh6.jpg', 'Mo ta phim 6', '2024-01-24', 4, 0, 0, 0),
(7, 'Phim 7', 'Trailer 7', 'HinhAnh7.jpg', 'Mo ta phim 7', '2024-01-25', 2, 1, 1, 1),
(8, 'Phim 8', 'Trailer 8', 'HinhAnh8.jpg', 'Mo ta phim 8', '2024-01-26', 5, 0, 0, 0),
(9, 'Phim 9', 'Trailer 9', 'HinhAnh9.jpg', 'Mo ta phim 9', '2024-01-27', 3, 1, 1, 1),
(10, 'Phim 10', 'Trailer 10', 'HinhAnh10.jpg', 'Mo ta phim 10', '2024-01-28', 4, 0, 0, 0),
(11, 'Phim 11', 'Trailer 11', 'HinhAnh11.jpg', 'Mo ta phim 11', '2024-01-29', 2, 1, 1, 1),
(13, 'Phim 13', 'Trailer 13', 'HinhAnh13.jpg', 'Mo ta phim 13', '2024-01-31', 3, 1, 1, 1),
(15, 'Phim 15', 'Trailer 15', 'http://res.cloudinary.com/dlqjmymt5/image/upload/v1706703189/pit3svcr48cqcjni1exx.jpg', 'Mo ta phim 15', '2024-02-02', 2, 1, 1, 1),
(16, 'Phim 16', 'Trailer 16', 'HinhAnh16.jpg', 'Mo ta phim 16', '2024-02-03', 4, 0, 0, 0),
(17, 'Phim 17', 'Trailer 17', 'HinhAnh17.jpg', 'Mo ta phim 17', '2024-02-04', 3, 1, 1, 1),
(18, 'Phim 18', 'Trailer 18', 'HinhAnh18.jpg', 'Mo ta phim 18', '2024-02-05', 5, 0, 0, 0),
(20, 'stringgg', 'string', 'string', 'string', '2024-01-24', 4, 1, 1, 1),
(33, 'aaa', 'aaa', 'http://res.cloudinary.com/dlqjmymt5/image/upload/v1706682125/qsh9of4tgm96qjrwrgua.jpg', 'aaa', '2024-01-24', 3, 1, 1, 1);

INSERT INTO `rap_phim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'CGV 1 - Rap Phim 1', 1);
INSERT INTO `rap_phim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'BHD 1 - Rap Phim 2', 2);
INSERT INTO `rap_phim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'LOTTE 1 - Rap Phim 3', 3);
INSERT INTO `rap_phim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'MEGA GS 1 - Rap Phim 4', 4),
(5, 'GALAXY - Rap Phim 5', 5),
(6, 'CINER STAR - Rap Phim 6', 6),
(7, 'CGV 1 - Rap Phim 7', 1),
(8, 'BHD 1 - Rap Phim 8', 2),
(9, 'LOTTE 1 - Rap Phim 9', 3),
(10, 'MEGA GS 1 - Rap Phim 10', 4),
(11, 'GALAXY - Rap Phim 11', 5),
(12, 'Rap Phim 12', 6),
(13, 'CGV 1 - Rap Phim 13', 1),
(14, 'BHD 1 - Rap Phim 14', 2),
(15, 'LOTTE 1 - Rap Phim 15', 3),
(16, 'MEGA GS 1 - Rap Phim 16', 4),
(17, 'GALAXY - Rap Phim 17', 5),
(18, 'CINER STAR - Rap Phim 18', 6),
(19, 'CGV 1 - Rap Phim 19', 1),
(20, 'BHD 1 - Rap Phim 20', 2);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;