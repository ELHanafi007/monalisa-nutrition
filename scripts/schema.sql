-- =============================================
-- Monalisa Nutrition — MySQL Schema
-- Run this in your hosting panel's phpMyAdmin
-- or MySQL console to create the required tables.
-- =============================================

-- Products table
CREATE TABLE IF NOT EXISTS `products` (
  `id`          VARCHAR(100) NOT NULL,
  `name`        VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL UNIQUE,
  `brand`       VARCHAR(255) NOT NULL,
  `price`       INT          NOT NULL,
  `old_price`   INT          DEFAULT NULL,
  `category`    VARCHAR(100) NOT NULL,
  `image`       TEXT         NOT NULL,
  `images`      JSON         DEFAULT NULL,
  `description` TEXT         NOT NULL,
  `benefits`    JSON         DEFAULT NULL,
  `specs`       JSON         DEFAULT NULL,
  `is_rupture`  TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Categories table
CREATE TABLE IF NOT EXISTS `categories` (
  `id`          VARCHAR(100) NOT NULL,
  `name`        VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT         DEFAULT NULL,
  `image`       TEXT         DEFAULT NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Orders table
CREATE TABLE IF NOT EXISTS `orders` (
  `id`               INT          NOT NULL AUTO_INCREMENT,
  `customer_name`    VARCHAR(255) NOT NULL,
  `customer_phone`   VARCHAR(50)  NOT NULL,
  `customer_address` TEXT         NOT NULL,
  `items`            JSON         NOT NULL,
  `total_amount`     INT          NOT NULL,
  `status`           VARCHAR(50)  NOT NULL DEFAULT 'en_attente',
  `created_at`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
