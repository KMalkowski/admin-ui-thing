-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `adminnotification_inbox` (
	`notification_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`severity` smallint(5) unsigned NOT NULL DEFAULT 0,
	`date_added` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`title` varchar(255) NOT NULL,
	`description` text DEFAULT 'NULL',
	`url` varchar(255) DEFAULT 'NULL',
	`is_read` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_remove` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `admin_adobe_ims_webapi` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`admin_user_id` int(10) unsigned NOT NULL DEFAULT 0,
	`access_token_hash` varchar(255) DEFAULT 'NULL',
	`access_token` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`last_check_time` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	`access_token_expires_at` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `ADMIN_ADOBE_IMS_WEBAPI_ACCESS_TOKEN_HASH` UNIQUE(`access_token_hash`)
);
--> statement-breakpoint
CREATE TABLE `admin_analytics_usage_version_log` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`last_viewed_in_version` varchar(50) NOT NULL,
	CONSTRAINT `ADMIN_ANALYTICS_USAGE_VERSION_LOG_LAST_VIEWED_IN_VERSION` UNIQUE(`last_viewed_in_version`)
);
--> statement-breakpoint
CREATE TABLE `admin_passwords` (
	`password_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL DEFAULT 0,
	`password_hash` varchar(255) DEFAULT 'NULL',
	`expires` int(10) unsigned NOT NULL DEFAULT 0,
	`last_updated` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `admin_system_messages` (
	`identity` varchar(100) NOT NULL,
	`severity` smallint(5) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `admin_user` (
	`user_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`firstname` varchar(32) DEFAULT 'NULL',
	`lastname` varchar(32) DEFAULT 'NULL',
	`email` varchar(128) DEFAULT 'NULL',
	`username` varchar(40) DEFAULT 'NULL',
	`password` varchar(255) NOT NULL,
	`created` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`modified` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`logdate` timestamp DEFAULT 'NULL',
	`lognum` smallint(5) unsigned NOT NULL DEFAULT 0,
	`reload_acl_flag` smallint(6) NOT NULL DEFAULT 0,
	`is_active` smallint(6) NOT NULL DEFAULT 1,
	`extra` text DEFAULT 'NULL',
	`rp_token` text DEFAULT 'NULL',
	`rp_token_created_at` timestamp DEFAULT 'NULL',
	`interface_locale` varchar(16) NOT NULL DEFAULT ''en_US'',
	`failures_num` smallint(6) DEFAULT 0,
	`first_failure` timestamp DEFAULT 'NULL',
	`lock_expires` timestamp DEFAULT 'NULL',
	CONSTRAINT `ADMIN_USER_USERNAME` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `admin_user_expiration` (
	`user_id` int(10) unsigned NOT NULL,
	`expires_at` datetime NOT NULL DEFAULT ''0000-00-00 00:00:00''
);
--> statement-breakpoint
CREATE TABLE `admin_user_session` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`session_id` varchar(1) DEFAULT 'NULL',
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`status` smallint(5) unsigned NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`ip` varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `adobe_stock_asset` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`media_gallery_id` int(10) unsigned DEFAULT 'NULL',
	`category_id` int(10) unsigned DEFAULT 'NULL',
	`creator_id` int(10) unsigned DEFAULT 'NULL',
	`is_licensed` int(10) unsigned NOT NULL DEFAULT 0,
	`creation_date` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `adobe_stock_category` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `adobe_stock_creator` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `adobe_user_profile` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`admin_user_id` int(10) unsigned NOT NULL DEFAULT 0,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`image` varchar(255) NOT NULL,
	`account_type` varchar(255) DEFAULT 'NULL',
	`access_token` text DEFAULT 'NULL',
	`refresh_token` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`access_token_expires_at` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00''
);
--> statement-breakpoint
CREATE TABLE `authorization_role` (
	`role_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL DEFAULT 0,
	`tree_level` smallint(5) unsigned NOT NULL DEFAULT 0,
	`sort_order` smallint(5) unsigned NOT NULL DEFAULT 0,
	`role_type` varchar(1) NOT NULL DEFAULT ''0'',
	`user_id` int(10) unsigned NOT NULL DEFAULT 0,
	`user_type` varchar(16) DEFAULT 'NULL',
	`role_name` varchar(50) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `authorization_rule` (
	`rule_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`role_id` int(10) unsigned NOT NULL DEFAULT 0,
	`resource_id` varchar(255) DEFAULT 'NULL',
	`privileges` varchar(20) DEFAULT 'NULL',
	`permission` varchar(10) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `braintree_credit_prices` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL,
	`term` int(11) NOT NULL,
	`monthly_payment` decimal(12,2) NOT NULL,
	`instalment_rate` decimal(12,2) NOT NULL,
	`cost_of_purchase` decimal(12,2) NOT NULL,
	`total_inc_interest` decimal(12,2) NOT NULL,
	CONSTRAINT `BRAINTREE_CREDIT_PRICES_PRODUCT_ID_TERM` UNIQUE(`product_id`,`term`)
);
--> statement-breakpoint
CREATE TABLE `braintree_transaction_details` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int(10) unsigned NOT NULL,
	`transaction_source` varchar(12) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `cache` (
	`id` varchar(200) NOT NULL,
	`data` mediumblob DEFAULT 'NULL',
	`create_time` int(11) DEFAULT 'NULL',
	`update_time` int(11) DEFAULT 'NULL',
	`expire_time` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `cache_tag` (
	`tag` varchar(100) NOT NULL,
	`cache_id` varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `captcha_log` (
	`type` varchar(32) NOT NULL,
	`value` varchar(255) NOT NULL,
	`count` int(10) unsigned NOT NULL DEFAULT 0,
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock` (
	`stock_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_name` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock_item` (
	`item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`stock_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`qty` decimal(12,4) DEFAULT 'NULL',
	`min_qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`use_config_min_qty` smallint(5) unsigned NOT NULL DEFAULT 1,
	`is_qty_decimal` smallint(5) unsigned NOT NULL DEFAULT 0,
	`backorders` smallint(5) unsigned NOT NULL DEFAULT 0,
	`use_config_backorders` smallint(5) unsigned NOT NULL DEFAULT 1,
	`min_sale_qty` decimal(12,4) NOT NULL DEFAULT '1.0000',
	`use_config_min_sale_qty` smallint(5) unsigned NOT NULL DEFAULT 1,
	`max_sale_qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`use_config_max_sale_qty` smallint(5) unsigned NOT NULL DEFAULT 1,
	`is_in_stock` smallint(5) unsigned NOT NULL DEFAULT 0,
	`low_stock_date` timestamp DEFAULT 'NULL',
	`notify_stock_qty` decimal(12,4) DEFAULT 'NULL',
	`use_config_notify_stock_qty` smallint(5) unsigned NOT NULL DEFAULT 1,
	`manage_stock` smallint(5) unsigned NOT NULL DEFAULT 0,
	`use_config_manage_stock` smallint(5) unsigned NOT NULL DEFAULT 1,
	`stock_status_changed_auto` smallint(5) unsigned NOT NULL DEFAULT 0,
	`use_config_qty_increments` smallint(5) unsigned NOT NULL DEFAULT 1,
	`qty_increments` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`use_config_enable_qty_inc` smallint(5) unsigned NOT NULL DEFAULT 1,
	`enable_qty_increments` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_decimal_divided` smallint(5) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `CATALOGINVENTORY_STOCK_ITEM_PRODUCT_ID_STOCK_ID` UNIQUE(`product_id`,`stock_id`)
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock_status` (
	`product_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_id` smallint(5) unsigned NOT NULL,
	`qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`stock_status` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock_status_idx` (
	`product_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_id` smallint(5) unsigned NOT NULL,
	`qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`stock_status` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock_status_replica` (
	`product_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_id` smallint(5) unsigned NOT NULL,
	`qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`stock_status` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cataloginventory_stock_status_tmp` (
	`product_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_id` smallint(5) unsigned NOT NULL,
	`qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`stock_status` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogrule` (
	`rule_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`from_date` date DEFAULT 'NULL',
	`to_date` date DEFAULT 'NULL',
	`is_active` smallint(6) NOT NULL DEFAULT 0,
	`conditions_serialized` mediumtext DEFAULT 'NULL',
	`actions_serialized` mediumtext DEFAULT 'NULL',
	`stop_rules_processing` smallint(6) NOT NULL DEFAULT 1,
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0,
	`simple_action` varchar(32) DEFAULT 'NULL',
	`discount_amount` decimal(20,6) NOT NULL DEFAULT '0.000000'
);
--> statement-breakpoint
CREATE TABLE `catalogrule_customer_group` (
	`rule_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogrule_group_website` (
	`rule_id` int(10) unsigned NOT NULL DEFAULT 0,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalogrule_group_website_replica` (
	`rule_id` int(10) unsigned NOT NULL DEFAULT 0,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalogrule_product` (
	`rule_product_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` int(10) unsigned NOT NULL DEFAULT 0,
	`from_time` int(10) unsigned NOT NULL DEFAULT 0,
	`to_time` int(10) unsigned NOT NULL DEFAULT 0,
	`customer_group_id` int(11) DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`action_operator` varchar(10) DEFAULT ''to_fixed'',
	`action_amount` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`action_stop` smallint(6) NOT NULL DEFAULT 0,
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	CONSTRAINT `UNQ_EAA51B56FF092A0DCB795D1CEF812B7B` UNIQUE(`rule_id`,`from_time`,`to_time`,`website_id`,`customer_group_id`,`product_id`,`sort_order`)
);
--> statement-breakpoint
CREATE TABLE `catalogrule_product_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalogrule_product_price` (
	`rule_product_price_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_date` date NOT NULL,
	`customer_group_id` int(11) DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`rule_price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`website_id` smallint(5) unsigned NOT NULL,
	`latest_start_date` date DEFAULT 'NULL',
	`earliest_end_date` date DEFAULT 'NULL',
	CONSTRAINT `CATRULE_PRD_PRICE_RULE_DATE_WS_ID_CSTR_GROUP_ID_PRD_ID` UNIQUE(`rule_date`,`website_id`,`customer_group_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `catalogrule_product_price_replica` (
	`rule_product_price_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_date` date NOT NULL,
	`customer_group_id` int(11) DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`rule_price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`website_id` smallint(5) unsigned NOT NULL,
	`latest_start_date` date DEFAULT 'NULL',
	`earliest_end_date` date DEFAULT 'NULL',
	CONSTRAINT `CATRULE_PRD_PRICE_RULE_DATE_WS_ID_CSTR_GROUP_ID_PRD_ID` UNIQUE(`rule_date`,`website_id`,`customer_group_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `catalogrule_product_replica` (
	`rule_product_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` int(10) unsigned NOT NULL DEFAULT 0,
	`from_time` int(10) unsigned NOT NULL DEFAULT 0,
	`to_time` int(10) unsigned NOT NULL DEFAULT 0,
	`customer_group_id` int(11) DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`action_operator` varchar(10) DEFAULT ''to_fixed'',
	`action_amount` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`action_stop` smallint(6) NOT NULL DEFAULT 0,
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	CONSTRAINT `UNQ_EAA51B56FF092A0DCB795D1CEF812B7B` UNIQUE(`rule_id`,`from_time`,`to_time`,`website_id`,`customer_group_id`,`product_id`,`sort_order`)
);
--> statement-breakpoint
CREATE TABLE `catalogrule_rule_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalogrule_website` (
	`rule_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogsearch_fulltext_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalogsearch_recommendations` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`query_id` int(10) unsigned NOT NULL DEFAULT 0,
	`relation_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_category_entity` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`attribute_set_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`parent_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`path` varchar(255) NOT NULL,
	`position` int(11) NOT NULL,
	`level` int(11) NOT NULL DEFAULT 0,
	`children_count` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_category_entity_datetime` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` datetime DEFAULT 'NULL',
	CONSTRAINT `CATALOG_CATEGORY_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_category_entity_decimal` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` decimal(20,6) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_CATEGORY_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_category_entity_int` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` int(11) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_CATEGORY_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_category_entity_text` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` mediumtext DEFAULT 'NULL',
	CONSTRAINT `CATALOG_CATEGORY_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_category_entity_varchar` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_CATEGORY_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product` (
	`entity_id` int(11) AUTO_INCREMENT NOT NULL,
	`category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `CATALOG_CATEGORY_PRODUCT_CATEGORY_ID_PRODUCT_ID` UNIQUE(`category_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product_index` (
	`category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) DEFAULT 'NULL',
	`is_parent` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`visibility` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product_index_replica` (
	`category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) DEFAULT 'NULL',
	`is_parent` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`visibility` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product_index_store1` (
	`category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) DEFAULT 'NULL',
	`is_parent` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`visibility` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product_index_store1_replica` (
	`category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) DEFAULT 'NULL',
	`is_parent` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`visibility` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_category_product_index_tmp` (
	`category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) NOT NULL DEFAULT 0,
	`is_parent` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`visibility` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_compare_item` (
	`catalog_compare_item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`visitor_id` int(10) unsigned NOT NULL DEFAULT 0,
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`list_id` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_compare_list` (
	`list_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`list_id_mask` varchar(32) DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	CONSTRAINT `CATALOG_COMPARE_LIST_CUSTOMER_ID` UNIQUE(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_eav_attribute` (
	`attribute_id` smallint(5) unsigned NOT NULL,
	`frontend_input_renderer` varchar(255) DEFAULT 'NULL',
	`is_global` smallint(5) unsigned NOT NULL DEFAULT 1,
	`is_visible` smallint(5) unsigned NOT NULL DEFAULT 1,
	`is_searchable` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_filterable` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_comparable` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_visible_on_front` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_html_allowed_on_front` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_used_for_price_rules` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_filterable_in_search` smallint(5) unsigned NOT NULL DEFAULT 0,
	`used_in_product_listing` smallint(5) unsigned NOT NULL DEFAULT 0,
	`used_for_sort_by` smallint(5) unsigned NOT NULL DEFAULT 0,
	`apply_to` varchar(255) DEFAULT 'NULL',
	`is_visible_in_advanced_search` smallint(5) unsigned NOT NULL DEFAULT 0,
	`position` int(11) NOT NULL DEFAULT 0,
	`is_wysiwyg_enabled` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_used_for_promo_rules` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_required_in_admin_store` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_used_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_visible_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_filterable_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`search_weight` float NOT NULL DEFAULT 1,
	`is_pagebuilder_enabled` tinyint NOT NULL DEFAULT 0,
	`additional_data` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_attribute_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_bundle_option` (
	`option_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`required` smallint(5) unsigned NOT NULL DEFAULT 0,
	`position` int(10) unsigned NOT NULL DEFAULT 0,
	`type` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_bundle_option_value` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`title` varchar(255) DEFAULT 'NULL',
	`parent_product_id` int(10) unsigned NOT NULL,
	CONSTRAINT `CAT_PRD_BNDL_OPT_VAL_OPT_ID_PARENT_PRD_ID_STORE_ID` UNIQUE(`option_id`,`parent_product_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_bundle_price_index` (
	`entity_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL,
	`min_price` decimal(20,6) NOT NULL,
	`max_price` decimal(20,6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_product_bundle_selection` (
	`selection_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL,
	`parent_product_id` int(10) unsigned NOT NULL,
	`product_id` int(10) unsigned NOT NULL,
	`position` int(10) unsigned NOT NULL DEFAULT 0,
	`is_default` smallint(5) unsigned NOT NULL DEFAULT 0,
	`selection_price_type` smallint(5) unsigned NOT NULL DEFAULT 0,
	`selection_price_value` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`selection_qty` decimal(12,4) DEFAULT 'NULL',
	`selection_can_change_qty` smallint(6) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_bundle_selection_price` (
	`selection_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`selection_price_type` smallint(5) unsigned NOT NULL DEFAULT 0,
	`selection_price_value` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`parent_product_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_product_bundle_stock_index` (
	`entity_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`stock_status` smallint(6) DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_category_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`attribute_set_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`type_id` varchar(32) NOT NULL DEFAULT ''simple'',
	`sku` varchar(64) NOT NULL,
	`has_options` smallint(6) NOT NULL DEFAULT 0,
	`required_options` smallint(5) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_datetime` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` datetime DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_decimal` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` decimal(20,6) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_gallery` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`position` int(11) NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_ENTITY_GALLERY_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_int` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` int(11) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_media_gallery` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	`media_type` varchar(32) NOT NULL DEFAULT ''image'',
	`disabled` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_media_gallery_value` (
	`value_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`label` varchar(255) DEFAULT 'NULL',
	`position` int(10) unsigned DEFAULT 'NULL',
	`disabled` smallint(5) unsigned NOT NULL DEFAULT 0,
	`record_id` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_media_gallery_value_to_entity` (
	`value_id` int(10) unsigned NOT NULL,
	`entity_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_media_gallery_value_video` (
	`value_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`provider` varchar(32) DEFAULT 'NULL',
	`url` text DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`metadata` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_text` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` mediumtext DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_tier_price` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`all_groups` smallint(5) unsigned NOT NULL DEFAULT 1,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`qty` decimal(12,4) NOT NULL DEFAULT '1.0000',
	`value` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`website_id` smallint(5) unsigned NOT NULL,
	`percentage_value` decimal(5,2) DEFAULT 'NULL',
	CONSTRAINT `UNQ_E8AB433B9ACB00343ABB312AD2FAB087` UNIQUE(`entity_id`,`all_groups`,`customer_group_id`,`qty`,`website_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_entity_varchar` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_frontend_action` (
	`action_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`type_id` varchar(64) NOT NULL,
	`visitor_id` int(10) unsigned DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL,
	`added_at` bigint(20) NOT NULL,
	CONSTRAINT `CATALOG_PRODUCT_FRONTEND_ACTION_VISITOR_ID_PRODUCT_ID_TYPE_ID` UNIQUE(`visitor_id`,`product_id`,`type_id`),
	CONSTRAINT `CATALOG_PRODUCT_FRONTEND_ACTION_CUSTOMER_ID_PRODUCT_ID_TYPE_ID` UNIQUE(`customer_id`,`product_id`,`type_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` int(10) unsigned NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_decimal` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` decimal(12,4) NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_decimal_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` decimal(12,4) NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_decimal_replica` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` decimal(12,4) NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_decimal_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` decimal(12,4) NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` int(10) unsigned NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_replica` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` int(10) unsigned NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_eav_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` int(10) unsigned NOT NULL,
	`source_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`price` decimal(20,6) DEFAULT 'NULL',
	`final_price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_bundle_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`price_type` smallint(5) unsigned NOT NULL,
	`special_price` decimal(20,6) DEFAULT 'NULL',
	`tier_percent` decimal(20,6) DEFAULT 'NULL',
	`orig_price` decimal(20,6) DEFAULT 'NULL',
	`price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`base_tier` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_bundle_opt_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`alt_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`alt_tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_bundle_opt_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`alt_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`alt_tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_bundle_sel_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`selection_id` int(10) unsigned NOT NULL DEFAULT 0,
	`group_type` smallint(5) unsigned DEFAULT 0,
	`is_required` smallint(5) unsigned DEFAULT 0,
	`price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_bundle_sel_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`selection_id` int(10) unsigned NOT NULL DEFAULT 0,
	`group_type` smallint(5) unsigned DEFAULT 0,
	`is_required` smallint(5) unsigned DEFAULT 0,
	`price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_bundle_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`price_type` smallint(5) unsigned NOT NULL,
	`special_price` decimal(20,6) DEFAULT 'NULL',
	`tier_percent` decimal(20,6) DEFAULT 'NULL',
	`orig_price` decimal(20,6) DEFAULT 'NULL',
	`price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`base_tier` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_cfg_opt_agr_idx` (
	`parent_id` int(10) unsigned NOT NULL,
	`child_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_cfg_opt_agr_tmp` (
	`parent_id` int(10) unsigned NOT NULL,
	`child_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_cfg_opt_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_cfg_opt_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_downlod_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`max_price` decimal(20,6) NOT NULL DEFAULT '0.000000'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_downlod_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`max_price` decimal(20,6) NOT NULL DEFAULT '0.000000'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_final_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`orig_price` decimal(20,6) DEFAULT 'NULL',
	`price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`base_tier` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_final_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`orig_price` decimal(20,6) DEFAULT 'NULL',
	`price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`base_tier` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`price` decimal(20,6) DEFAULT 'NULL',
	`final_price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_opt_agr_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_opt_agr_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_opt_idx` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_opt_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_replica` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`price` decimal(20,6) DEFAULT 'NULL',
	`final_price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_price_tmp` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL,
	`tax_class_id` smallint(5) unsigned DEFAULT 0,
	`price` decimal(20,6) DEFAULT 'NULL',
	`final_price` decimal(20,6) DEFAULT 'NULL',
	`min_price` decimal(20,6) DEFAULT 'NULL',
	`max_price` decimal(20,6) DEFAULT 'NULL',
	`tier_price` decimal(20,6) DEFAULT 'NULL',
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_tier_price` (
	`entity_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`min_price` decimal(20,6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_index_website` (
	`website_id` smallint(5) unsigned NOT NULL,
	`default_store_id` smallint(5) unsigned NOT NULL,
	`website_date` date DEFAULT 'NULL',
	`rate` float DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `catalog_product_link` (
	`link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`linked_product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`link_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `CATALOG_PRODUCT_LINK_LINK_TYPE_ID_PRODUCT_ID_LINKED_PRODUCT_ID` UNIQUE(`link_type_id`,`product_id`,`linked_product_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_link_attribute` (
	`product_link_attribute_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`link_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`product_link_attribute_code` varchar(32) DEFAULT 'NULL',
	`data_type` varchar(32) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_link_attribute_decimal` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_link_attribute_id` smallint(5) unsigned DEFAULT 'NULL',
	`link_id` int(10) unsigned NOT NULL,
	`value` decimal(20,6) NOT NULL DEFAULT '0.000000',
	CONSTRAINT `CAT_PRD_LNK_ATTR_DEC_PRD_LNK_ATTR_ID_LNK_ID` UNIQUE(`product_link_attribute_id`,`link_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_link_attribute_int` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_link_attribute_id` smallint(5) unsigned DEFAULT 'NULL',
	`link_id` int(10) unsigned NOT NULL,
	`value` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `CAT_PRD_LNK_ATTR_INT_PRD_LNK_ATTR_ID_LNK_ID` UNIQUE(`product_link_attribute_id`,`link_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_link_attribute_varchar` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_link_attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`link_id` int(10) unsigned NOT NULL,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CAT_PRD_LNK_ATTR_VCHR_PRD_LNK_ATTR_ID_LNK_ID` UNIQUE(`product_link_attribute_id`,`link_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_link_type` (
	`link_type_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(32) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `catalog_product_option` (
	`option_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`type` varchar(50) DEFAULT 'NULL',
	`is_require` smallint(6) NOT NULL DEFAULT 1,
	`sku` varchar(64) DEFAULT 'NULL',
	`max_characters` int(10) unsigned DEFAULT 'NULL',
	`file_extension` varchar(50) DEFAULT 'NULL',
	`image_size_x` smallint(5) unsigned DEFAULT 'NULL',
	`image_size_y` smallint(5) unsigned DEFAULT 'NULL',
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_option_price` (
	`option_price_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`price_type` varchar(7) NOT NULL DEFAULT ''fixed'',
	CONSTRAINT `CATALOG_PRODUCT_OPTION_PRICE_OPTION_ID_STORE_ID` UNIQUE(`option_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_option_title` (
	`option_title_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`title` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_OPTION_TITLE_OPTION_ID_STORE_ID` UNIQUE(`option_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_option_type_price` (
	`option_type_price_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_type_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`price_type` varchar(7) NOT NULL DEFAULT ''fixed'',
	CONSTRAINT `CATALOG_PRODUCT_OPTION_TYPE_PRICE_OPTION_TYPE_ID_STORE_ID` UNIQUE(`option_type_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_option_type_title` (
	`option_type_title_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_type_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`title` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CATALOG_PRODUCT_OPTION_TYPE_TITLE_OPTION_TYPE_ID_STORE_ID` UNIQUE(`option_type_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_option_type_value` (
	`option_type_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`sku` varchar(64) DEFAULT 'NULL',
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_price_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `catalog_product_relation` (
	`parent_id` int(10) unsigned NOT NULL,
	`child_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_product_super_attribute` (
	`product_super_attribute_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`position` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRODUCT_ID_ATTRIBUTE_ID` UNIQUE(`product_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_super_attribute_label` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_super_attribute_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`use_default` smallint(5) unsigned DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CAT_PRD_SPR_ATTR_LBL_PRD_SPR_ATTR_ID_STORE_ID` UNIQUE(`product_super_attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_super_link` (
	`link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`parent_id` int(10) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `CATALOG_PRODUCT_SUPER_LINK_PRODUCT_ID_PARENT_ID` UNIQUE(`product_id`,`parent_id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_product_website` (
	`product_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalog_url_rewrite_product_category` (
	`url_rewrite_id` int(10) unsigned NOT NULL,
	`category_id` int(10) unsigned NOT NULL,
	`product_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `checkout_agreement` (
	`agreement_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	`content` text DEFAULT 'NULL',
	`content_height` varchar(25) DEFAULT 'NULL',
	`checkbox_text` text DEFAULT 'NULL',
	`is_active` smallint(6) NOT NULL DEFAULT 0,
	`is_html` smallint(6) NOT NULL DEFAULT 0,
	`mode` smallint(6) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `checkout_agreement_store` (
	`agreement_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cms_block` (
	`block_id` smallint(6) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`content` mediumtext DEFAULT 'NULL',
	`creation_time` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`update_time` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`is_active` smallint(6) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `cms_block_store` (
	`block_id` smallint(6) NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cms_page` (
	`page_id` smallint(6) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) DEFAULT 'NULL',
	`page_layout` varchar(255) DEFAULT 'NULL',
	`meta_keywords` text DEFAULT 'NULL',
	`meta_description` text DEFAULT 'NULL',
	`identifier` varchar(100) DEFAULT 'NULL',
	`content_heading` varchar(255) DEFAULT 'NULL',
	`content` mediumtext DEFAULT 'NULL',
	`creation_time` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`update_time` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`is_active` smallint(6) NOT NULL DEFAULT 1,
	`sort_order` smallint(6) NOT NULL DEFAULT 0,
	`layout_update_xml` text DEFAULT 'NULL',
	`custom_theme` varchar(100) DEFAULT 'NULL',
	`custom_root_template` varchar(255) DEFAULT 'NULL',
	`custom_layout_update_xml` text DEFAULT 'NULL',
	`layout_update_selected` varchar(128) DEFAULT 'NULL',
	`custom_theme_from` date DEFAULT 'NULL',
	`custom_theme_to` date DEFAULT 'NULL',
	`meta_title` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `cms_page_store` (
	`page_id` smallint(6) NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `core_config_data` (
	`config_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`scope` varchar(8) NOT NULL DEFAULT ''default'',
	`scope_id` int(11) NOT NULL DEFAULT 0,
	`path` varchar(255) NOT NULL DEFAULT ''general'',
	`value` text DEFAULT 'NULL',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `CORE_CONFIG_DATA_SCOPE_SCOPE_ID_PATH` UNIQUE(`scope`,`scope_id`,`path`)
);
--> statement-breakpoint
CREATE TABLE `cron_schedule` (
	`schedule_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`job_code` varchar(255) NOT NULL DEFAULT ''0'',
	`status` varchar(7) NOT NULL DEFAULT ''pending'',
	`messages` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`scheduled_at` timestamp DEFAULT 'NULL',
	`executed_at` timestamp DEFAULT 'NULL',
	`finished_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `customer_address_entity` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`increment_id` varchar(50) DEFAULT 'NULL',
	`parent_id` int(10) unsigned DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`is_active` smallint(5) unsigned NOT NULL DEFAULT 1,
	`city` varchar(255) NOT NULL,
	`company` varchar(255) DEFAULT 'NULL',
	`country_id` varchar(255) NOT NULL,
	`fax` varchar(255) DEFAULT 'NULL',
	`firstname` varchar(255) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`middlename` varchar(255) DEFAULT 'NULL',
	`postcode` varchar(255) DEFAULT 'NULL',
	`prefix` varchar(40) DEFAULT 'NULL',
	`region` varchar(255) DEFAULT 'NULL',
	`region_id` int(10) unsigned DEFAULT 'NULL',
	`street` text NOT NULL,
	`suffix` varchar(40) DEFAULT 'NULL',
	`telephone` varchar(255) NOT NULL,
	`vat_id` varchar(255) DEFAULT 'NULL',
	`vat_is_valid` int(10) unsigned DEFAULT 'NULL',
	`vat_request_date` varchar(255) DEFAULT 'NULL',
	`vat_request_id` varchar(255) DEFAULT 'NULL',
	`vat_request_success` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `customer_address_entity_datetime` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` datetime DEFAULT 'NULL',
	CONSTRAINT `CUSTOMER_ADDRESS_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_address_entity_decimal` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` decimal(12,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `CUSTOMER_ADDRESS_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_address_entity_int` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `CUSTOMER_ADDRESS_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_address_entity_text` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` text NOT NULL,
	CONSTRAINT `CUSTOMER_ADDRESS_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_address_entity_varchar` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CUSTOMER_ADDRESS_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_dummy_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `customer_eav_attribute` (
	`attribute_id` smallint(5) unsigned NOT NULL,
	`is_visible` smallint(5) unsigned NOT NULL DEFAULT 1,
	`input_filter` varchar(255) DEFAULT 'NULL',
	`multiline_count` smallint(5) unsigned NOT NULL DEFAULT 1,
	`validate_rules` text DEFAULT 'NULL',
	`is_system` smallint(5) unsigned NOT NULL DEFAULT 0,
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0,
	`data_model` varchar(255) DEFAULT 'NULL',
	`is_used_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_visible_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_filterable_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_searchable_in_grid` smallint(5) unsigned NOT NULL DEFAULT 0,
	`grid_filter_condition_type` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `customer_eav_attribute_website` (
	`attribute_id` smallint(5) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`is_visible` smallint(5) unsigned DEFAULT 'NULL',
	`is_required` smallint(5) unsigned DEFAULT 'NULL',
	`default_value` text DEFAULT 'NULL',
	`multiline_count` smallint(5) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `customer_entity` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`website_id` smallint(5) unsigned DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`group_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`increment_id` varchar(50) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`is_active` smallint(5) unsigned NOT NULL DEFAULT 1,
	`disable_auto_group_change` smallint(5) unsigned NOT NULL DEFAULT 0,
	`created_in` varchar(255) DEFAULT 'NULL',
	`prefix` varchar(40) DEFAULT 'NULL',
	`firstname` varchar(255) DEFAULT 'NULL',
	`middlename` varchar(255) DEFAULT 'NULL',
	`lastname` varchar(255) DEFAULT 'NULL',
	`suffix` varchar(40) DEFAULT 'NULL',
	`dob` date DEFAULT 'NULL',
	`password_hash` varchar(128) DEFAULT 'NULL',
	`rp_token` varchar(128) DEFAULT 'NULL',
	`rp_token_created_at` datetime DEFAULT 'NULL',
	`default_billing` int(10) unsigned DEFAULT 'NULL',
	`default_shipping` int(10) unsigned DEFAULT 'NULL',
	`taxvat` varchar(50) DEFAULT 'NULL',
	`confirmation` varchar(64) DEFAULT 'NULL',
	`gender` smallint(5) unsigned DEFAULT 'NULL',
	`failures_num` smallint(6) DEFAULT 0,
	`first_failure` timestamp DEFAULT 'NULL',
	`lock_expires` timestamp DEFAULT 'NULL',
	`session_cutoff` timestamp DEFAULT 'NULL',
	CONSTRAINT `CUSTOMER_ENTITY_EMAIL_WEBSITE_ID` UNIQUE(`email`,`website_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_entity_datetime` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` datetime DEFAULT 'NULL',
	CONSTRAINT `CUSTOMER_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_entity_decimal` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` decimal(12,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `CUSTOMER_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_entity_int` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `CUSTOMER_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_entity_text` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` text NOT NULL,
	CONSTRAINT `CUSTOMER_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_entity_varchar` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `CUSTOMER_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID` UNIQUE(`entity_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_form_attribute` (
	`form_code` varchar(32) NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer_grid_flat` (
	`entity_id` int(10) unsigned NOT NULL,
	`name` text DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`group_id` int(11) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`website_id` int(11) DEFAULT 'NULL',
	`confirmation` varchar(255) DEFAULT 'NULL',
	`created_in` text DEFAULT 'NULL',
	`dob` date DEFAULT 'NULL',
	`gender` int(11) DEFAULT 'NULL',
	`taxvat` varchar(255) DEFAULT 'NULL',
	`lock_expires` timestamp DEFAULT 'NULL',
	`shipping_full` text DEFAULT 'NULL',
	`billing_full` text DEFAULT 'NULL',
	`billing_firstname` varchar(255) DEFAULT 'NULL',
	`billing_lastname` varchar(255) DEFAULT 'NULL',
	`billing_telephone` varchar(255) DEFAULT 'NULL',
	`billing_postcode` varchar(255) DEFAULT 'NULL',
	`billing_country_id` varchar(255) DEFAULT 'NULL',
	`billing_region` varchar(255) DEFAULT 'NULL',
	`billing_region_id` int(11) DEFAULT 'NULL',
	`billing_street` varchar(255) DEFAULT 'NULL',
	`billing_city` varchar(255) DEFAULT 'NULL',
	`billing_fax` varchar(255) DEFAULT 'NULL',
	`billing_vat_id` varchar(255) DEFAULT 'NULL',
	`billing_company` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `customer_group` (
	`customer_group_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_group_code` varchar(32) NOT NULL,
	`tax_class_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `customer_group_excluded_website` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer_log` (
	`log_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`last_login_at` timestamp DEFAULT 'NULL',
	`last_logout_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `CUSTOMER_LOG_CUSTOMER_ID` UNIQUE(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `customer_visitor` (
	`visitor_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) DEFAULT 'NULL',
	`session_id` varchar(1) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`last_visit_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `data_exporter_uuid` (
	`uuid` varchar(36) NOT NULL,
	`entity_id` int(10) unsigned NOT NULL,
	`type` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `DATA_EXPORTER_UUID_ENTITY_ID_TYPE` UNIQUE(`entity_id`,`type`)
);
--> statement-breakpoint
CREATE TABLE `design_change` (
	`design_change_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`design` varchar(255) DEFAULT 'NULL',
	`date_from` date DEFAULT 'NULL',
	`date_to` date DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `design_config_dummy_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `design_config_grid_flat` (
	`entity_id` int(10) unsigned NOT NULL,
	`store_website_id` int(11) DEFAULT 'NULL',
	`store_group_id` int(11) DEFAULT 'NULL',
	`store_id` int(11) DEFAULT 'NULL',
	`theme_theme_id` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `directory_country` (
	`country_id` varchar(2) NOT NULL,
	`iso2_code` varchar(2) DEFAULT 'NULL',
	`iso3_code` varchar(3) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `directory_country_format` (
	`country_format_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`country_id` varchar(2) DEFAULT 'NULL',
	`type` varchar(30) DEFAULT 'NULL',
	`format` text NOT NULL,
	CONSTRAINT `DIRECTORY_COUNTRY_FORMAT_COUNTRY_ID_TYPE` UNIQUE(`country_id`,`type`)
);
--> statement-breakpoint
CREATE TABLE `directory_country_region` (
	`region_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`country_id` varchar(4) NOT NULL DEFAULT ''0'',
	`code` varchar(32) DEFAULT 'NULL',
	`default_name` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `directory_country_region_name` (
	`locale` varchar(16) NOT NULL,
	`region_id` int(10) unsigned NOT NULL DEFAULT 0,
	`name` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `directory_currency_rate` (
	`currency_from` varchar(3) NOT NULL,
	`currency_to` varchar(3) NOT NULL,
	`rate` decimal(24,12) NOT NULL DEFAULT '0.000000000000'
);
--> statement-breakpoint
CREATE TABLE `downloadable_link` (
	`link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0,
	`number_of_downloads` int(11) DEFAULT 'NULL',
	`is_shareable` smallint(5) unsigned NOT NULL DEFAULT 0,
	`link_url` varchar(255) DEFAULT 'NULL',
	`link_file` varchar(255) DEFAULT 'NULL',
	`link_type` varchar(20) DEFAULT 'NULL',
	`sample_url` varchar(255) DEFAULT 'NULL',
	`sample_file` varchar(255) DEFAULT 'NULL',
	`sample_type` varchar(20) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `downloadable_link_price` (
	`price_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`link_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`price` decimal(20,6) NOT NULL DEFAULT '0.000000'
);
--> statement-breakpoint
CREATE TABLE `downloadable_link_purchased` (
	`purchased_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int(10) unsigned DEFAULT 0,
	`order_increment_id` varchar(50) DEFAULT 'NULL',
	`order_item_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`customer_id` int(10) unsigned DEFAULT 0,
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_sku` varchar(255) DEFAULT 'NULL',
	`link_section_title` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `downloadable_link_purchased_item` (
	`item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`purchased_id` int(10) unsigned NOT NULL DEFAULT 0,
	`order_item_id` int(10) unsigned DEFAULT 0,
	`product_id` int(10) unsigned DEFAULT 0,
	`link_hash` varchar(255) DEFAULT 'NULL',
	`number_of_downloads_bought` int(10) unsigned NOT NULL DEFAULT 0,
	`number_of_downloads_used` int(10) unsigned NOT NULL DEFAULT 0,
	`link_id` int(10) unsigned NOT NULL DEFAULT 0,
	`link_title` varchar(255) DEFAULT 'NULL',
	`is_shareable` smallint(5) unsigned NOT NULL DEFAULT 0,
	`link_url` varchar(255) DEFAULT 'NULL',
	`link_file` varchar(255) DEFAULT 'NULL',
	`link_type` varchar(255) DEFAULT 'NULL',
	`status` varchar(50) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `downloadable_link_title` (
	`title_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`link_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`title` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `DOWNLOADABLE_LINK_TITLE_LINK_ID_STORE_ID` UNIQUE(`link_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `downloadable_sample` (
	`sample_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`sample_url` varchar(255) DEFAULT 'NULL',
	`sample_file` varchar(255) DEFAULT 'NULL',
	`sample_type` varchar(20) DEFAULT 'NULL',
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `downloadable_sample_title` (
	`title_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`sample_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`title` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `DOWNLOADABLE_SAMPLE_TITLE_SAMPLE_ID_STORE_ID` UNIQUE(`sample_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_attribute` (
	`attribute_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_code` varchar(255) NOT NULL,
	`attribute_model` varchar(255) DEFAULT 'NULL',
	`backend_model` varchar(255) DEFAULT 'NULL',
	`backend_type` varchar(8) NOT NULL DEFAULT ''static'',
	`backend_table` varchar(255) DEFAULT 'NULL',
	`frontend_model` varchar(255) DEFAULT 'NULL',
	`frontend_input` varchar(50) DEFAULT 'NULL',
	`frontend_label` varchar(255) DEFAULT 'NULL',
	`frontend_class` varchar(255) DEFAULT 'NULL',
	`source_model` varchar(255) DEFAULT 'NULL',
	`is_required` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_user_defined` smallint(5) unsigned NOT NULL DEFAULT 0,
	`default_value` text DEFAULT 'NULL',
	`is_unique` smallint(5) unsigned NOT NULL DEFAULT 0,
	`note` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `EAV_ATTRIBUTE_ENTITY_TYPE_ID_ATTRIBUTE_CODE` UNIQUE(`entity_type_id`,`attribute_code`)
);
--> statement-breakpoint
CREATE TABLE `eav_attribute_group` (
	`attribute_group_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`attribute_set_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_group_name` varchar(255) DEFAULT 'NULL',
	`sort_order` smallint(6) NOT NULL DEFAULT 0,
	`default_id` smallint(5) unsigned DEFAULT 0,
	`attribute_group_code` varchar(255) NOT NULL,
	`tab_group_code` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `EAV_ATTRIBUTE_GROUP_ATTRIBUTE_SET_ID_ATTRIBUTE_GROUP_CODE` UNIQUE(`attribute_set_id`,`attribute_group_code`),
	CONSTRAINT `EAV_ATTRIBUTE_GROUP_ATTRIBUTE_SET_ID_ATTRIBUTE_GROUP_NAME` UNIQUE(`attribute_set_id`,`attribute_group_name`)
);
--> statement-breakpoint
CREATE TABLE `eav_attribute_label` (
	`attribute_label_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `eav_attribute_option` (
	`option_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`sort_order` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `eav_attribute_option_swatch` (
	`swatch_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`type` smallint(5) unsigned NOT NULL,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `EAV_ATTRIBUTE_OPTION_SWATCH_STORE_ID_OPTION_ID` UNIQUE(`store_id`,`option_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_attribute_option_value` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `eav_attribute_set` (
	`attribute_set_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_set_name` varchar(255) DEFAULT 'NULL',
	`sort_order` smallint(6) NOT NULL DEFAULT 0,
	CONSTRAINT `EAV_ATTRIBUTE_SET_ENTITY_TYPE_ID_ATTRIBUTE_SET_NAME` UNIQUE(`entity_type_id`,`attribute_set_name`)
);
--> statement-breakpoint
CREATE TABLE `eav_entity` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_set_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`increment_id` varchar(50) DEFAULT 'NULL',
	`parent_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`is_active` smallint(5) unsigned NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `eav_entity_attribute` (
	`entity_attribute_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_set_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_group_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`sort_order` smallint(6) NOT NULL DEFAULT 0,
	CONSTRAINT `EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_SET_ID_ATTRIBUTE_ID` UNIQUE(`attribute_set_id`,`attribute_id`),
	CONSTRAINT `EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_GROUP_ID_ATTRIBUTE_ID` UNIQUE(`attribute_group_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_entity_datetime` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` datetime DEFAULT 'NULL',
	CONSTRAINT `EAV_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_entity_decimal` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` decimal(12,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `EAV_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_entity_int` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `EAV_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_entity_store` (
	`entity_store_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`increment_prefix` varchar(20) DEFAULT 'NULL',
	`increment_last_id` varchar(50) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `eav_entity_text` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` text NOT NULL,
	CONSTRAINT `EAV_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_entity_type` (
	`entity_type_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type_code` varchar(50) NOT NULL,
	`entity_model` varchar(255) NOT NULL,
	`attribute_model` varchar(255) DEFAULT 'NULL',
	`entity_table` varchar(255) DEFAULT 'NULL',
	`value_table_prefix` varchar(255) DEFAULT 'NULL',
	`entity_id_field` varchar(255) DEFAULT 'NULL',
	`is_data_sharing` smallint(5) unsigned NOT NULL DEFAULT 1,
	`data_sharing_key` varchar(100) DEFAULT ''default'',
	`default_attribute_set_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`increment_model` varchar(255) DEFAULT 'NULL',
	`increment_per_store` smallint(5) unsigned NOT NULL DEFAULT 0,
	`increment_pad_length` smallint(5) unsigned NOT NULL DEFAULT 8,
	`increment_pad_char` varchar(1) NOT NULL DEFAULT ''0'',
	`additional_attribute_table` varchar(255) DEFAULT 'NULL',
	`entity_attribute_collection` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `eav_entity_varchar` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `EAV_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_STORE_ID` UNIQUE(`entity_id`,`attribute_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_form_element` (
	`element_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`type_id` smallint(5) unsigned NOT NULL,
	`fieldset_id` smallint(5) unsigned DEFAULT 'NULL',
	`attribute_id` smallint(5) unsigned NOT NULL,
	`sort_order` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `EAV_FORM_ELEMENT_TYPE_ID_ATTRIBUTE_ID` UNIQUE(`type_id`,`attribute_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_form_fieldset` (
	`fieldset_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`type_id` smallint(5) unsigned NOT NULL,
	`code` varchar(64) NOT NULL,
	`sort_order` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `EAV_FORM_FIELDSET_TYPE_ID_CODE` UNIQUE(`type_id`,`code`)
);
--> statement-breakpoint
CREATE TABLE `eav_form_fieldset_label` (
	`fieldset_id` smallint(5) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`label` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `eav_form_type` (
	`type_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(64) NOT NULL,
	`label` varchar(255) NOT NULL,
	`is_system` smallint(5) unsigned NOT NULL DEFAULT 0,
	`theme` varchar(64) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned NOT NULL,
	CONSTRAINT `EAV_FORM_TYPE_CODE_THEME_STORE_ID` UNIQUE(`code`,`theme`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `eav_form_type_entity` (
	`type_id` smallint(5) unsigned NOT NULL,
	`entity_type_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `email_template` (
	`template_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`template_code` varchar(150) NOT NULL,
	`template_text` text NOT NULL,
	`template_styles` text DEFAULT 'NULL',
	`template_type` int(10) unsigned DEFAULT 'NULL',
	`template_subject` varchar(200) NOT NULL,
	`template_sender_name` varchar(200) DEFAULT 'NULL',
	`template_sender_email` varchar(200) DEFAULT 'NULL',
	`added_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`modified_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`orig_template_code` varchar(200) DEFAULT 'NULL',
	`orig_template_variables` text DEFAULT 'NULL',
	`is_legacy` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `EMAIL_TEMPLATE_TEMPLATE_CODE` UNIQUE(`template_code`)
);
--> statement-breakpoint
CREATE TABLE `flag` (
	`flag_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`flag_code` varchar(255) NOT NULL,
	`state` smallint(5) unsigned NOT NULL DEFAULT 0,
	`flag_data` mediumtext DEFAULT 'NULL',
	`last_update` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `gift_message` (
	`gift_message_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned NOT NULL DEFAULT 0,
	`sender` varchar(255) DEFAULT 'NULL',
	`recipient` varchar(255) DEFAULT 'NULL',
	`message` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `googleoptimizer_code` (
	`code_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL,
	`entity_type` varchar(50) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned NOT NULL,
	`experiment_script` text DEFAULT 'NULL',
	CONSTRAINT `GOOGLEOPTIMIZER_CODE_STORE_ID_ENTITY_ID_ENTITY_TYPE` UNIQUE(`store_id`,`entity_id`,`entity_type`)
);
--> statement-breakpoint
CREATE TABLE `importexport_importdata` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity` varchar(50) NOT NULL,
	`behavior` varchar(10) NOT NULL DEFAULT ''append'',
	`data` longtext DEFAULT 'NULL',
	`is_processed` tinyint NOT NULL DEFAULT 1,
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `import_history` (
	`history_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`started_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`user_id` int(10) unsigned NOT NULL DEFAULT 0,
	`imported_file` varchar(255) DEFAULT 'NULL',
	`execution_time` varchar(255) DEFAULT 'NULL',
	`summary` varchar(255) DEFAULT 'NULL',
	`error_file` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `indexer_state` (
	`state_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`indexer_id` varchar(255) DEFAULT 'NULL',
	`status` varchar(16) DEFAULT ''invalid'',
	`updated` datetime DEFAULT 'NULL',
	`hash_config` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `integration` (
	`integration_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`endpoint` varchar(255) DEFAULT 'NULL',
	`status` smallint(5) unsigned NOT NULL,
	`consumer_id` int(10) unsigned DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`setup_type` smallint(5) unsigned NOT NULL DEFAULT 0,
	`identity_link_url` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `INTEGRATION_NAME` UNIQUE(`name`),
	CONSTRAINT `INTEGRATION_CONSUMER_ID` UNIQUE(`consumer_id`)
);
--> statement-breakpoint
CREATE TABLE `inventory_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `inventory_geoname` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`country_code` varchar(64) NOT NULL,
	`postcode` varchar(64) NOT NULL,
	`city` varchar(180) NOT NULL,
	`region` varchar(100) NOT NULL,
	`province` varchar(64) NOT NULL,
	`latitude` double NOT NULL,
	`longitude` double NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_low_stock_notification_configuration` (
	`source_code` varchar(255) NOT NULL,
	`sku` varchar(64) NOT NULL,
	`notify_stock_qty` decimal(12,4) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `inventory_order_notification` (
	`order_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`notification_sent` smallint(6) NOT NULL,
	`send_notification` smallint(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_pickup_location_order` (
	`order_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`pickup_location_code` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_pickup_location_quote_address` (
	`address_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`pickup_location_code` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_reservation` (
	`reservation_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`stock_id` int(10) unsigned NOT NULL,
	`sku` varchar(64) NOT NULL,
	`quantity` decimal(10,4) NOT NULL DEFAULT '0.0000',
	`metadata` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `inventory_shipment_source` (
	`shipment_id` int(10) unsigned NOT NULL,
	`source_code` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_source` (
	`source_code` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`enabled` smallint(5) unsigned NOT NULL DEFAULT 1,
	`description` text DEFAULT 'NULL',
	`latitude` decimal(8,6) DEFAULT 'NULL',
	`longitude` decimal(9,6) DEFAULT 'NULL',
	`country_id` varchar(2) NOT NULL,
	`region_id` int(10) unsigned DEFAULT 'NULL',
	`region` varchar(255) DEFAULT 'NULL',
	`city` varchar(255) DEFAULT 'NULL',
	`street` varchar(255) DEFAULT 'NULL',
	`postcode` varchar(255) NOT NULL,
	`contact_name` varchar(255) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`phone` varchar(255) DEFAULT 'NULL',
	`fax` varchar(255) DEFAULT 'NULL',
	`use_default_carrier_config` smallint(5) unsigned NOT NULL DEFAULT 1,
	`is_pickup_location_active` tinyint NOT NULL DEFAULT 0,
	`frontend_name` varchar(255) DEFAULT '''',
	`frontend_description` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `inventory_source_carrier_link` (
	`link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`source_code` varchar(255) NOT NULL,
	`carrier_code` varchar(255) NOT NULL,
	`position` smallint(5) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `inventory_source_item` (
	`source_item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`source_code` varchar(255) NOT NULL,
	`sku` varchar(64) NOT NULL,
	`quantity` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`status` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `INVENTORY_SOURCE_ITEM_SOURCE_CODE_SKU` UNIQUE(`source_code`,`sku`)
);
--> statement-breakpoint
CREATE TABLE `inventory_source_stock_link` (
	`link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`stock_id` int(10) unsigned NOT NULL,
	`source_code` varchar(255) NOT NULL,
	`priority` smallint(5) unsigned NOT NULL,
	CONSTRAINT `INVENTORY_SOURCE_STOCK_LINK_STOCK_ID_SOURCE_CODE` UNIQUE(`stock_id`,`source_code`)
);
--> statement-breakpoint
CREATE TABLE `inventory_stock` (
	`stock_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_stock_1` (
	`product_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`stock_id` smallint(5) unsigned NOT NULL,
	`quantity` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`is_salable` smallint(5) unsigned NOT NULL,
	`sku` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_stock_sales_channel` (
	`type` varchar(64) NOT NULL,
	`code` varchar(64) NOT NULL,
	`stock_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `jwt_auth_revoked` (
	`user_type_id` int(10) unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`revoke_before` bigint(20) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `layout_link` (
	`layout_link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`theme_id` int(10) unsigned NOT NULL,
	`layout_update_id` int(10) unsigned NOT NULL DEFAULT 0,
	`is_temporary` tinyint NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `layout_update` (
	`layout_update_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`handle` varchar(255) DEFAULT 'NULL',
	`xml` text DEFAULT 'NULL',
	`sort_order` smallint(6) NOT NULL DEFAULT 0,
	`updated_at` timestamp DEFAULT ''0000-00-00 00:00:00''
);
--> statement-breakpoint
CREATE TABLE `login_as_customer` (
	`secret` varchar(64) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`admin_id` int(11) NOT NULL,
	`created_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `login_as_customer_assistance_allowed` (
	`customer_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `magento_acknowledged_bulk` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`bulk_uuid` varbinary(39) DEFAULT 'NULL',
	CONSTRAINT `MAGENTO_ACKNOWLEDGED_BULK_BULK_UUID` UNIQUE(`bulk_uuid`)
);
--> statement-breakpoint
CREATE TABLE `magento_bulk` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`uuid` varbinary(39) DEFAULT 'NULL',
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`user_type` int(11) DEFAULT 'NULL',
	`description` varchar(255) DEFAULT 'NULL',
	`operation_count` int(10) unsigned NOT NULL,
	`start_time` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `MAGENTO_BULK_UUID` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `magento_login_as_customer_log` (
	`log_id` int(11) AUTO_INCREMENT NOT NULL,
	`time` timestamp DEFAULT 'NULL',
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`user_name` varchar(40) DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`customer_email` varchar(40) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `magento_operation` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`operation_key` int(10) unsigned DEFAULT 'NULL',
	`bulk_uuid` varbinary(39) DEFAULT 'NULL',
	`topic_name` varchar(255) DEFAULT 'NULL',
	`serialized_data` blob DEFAULT 'NULL',
	`result_serialized_data` blob DEFAULT 'NULL',
	`status` smallint(6) DEFAULT 0,
	`error_code` smallint(6) DEFAULT 'NULL',
	`result_message` varchar(255) DEFAULT 'NULL',
	`started_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `media_content_asset` (
	`asset_id` int(10) unsigned NOT NULL,
	`entity_type` varchar(255) NOT NULL,
	`entity_id` varchar(255) NOT NULL,
	`field` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media_gallery_asset` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`path` text DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`source` varchar(255) DEFAULT 'NULL',
	`hash` varchar(255) DEFAULT 'NULL',
	`content_type` varchar(255) DEFAULT 'NULL',
	`width` int(10) unsigned NOT NULL DEFAULT 0,
	`height` int(10) unsigned NOT NULL DEFAULT 0,
	`size` int(10) unsigned NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `media_gallery_asset_keyword` (
	`keyword_id` int(10) unsigned NOT NULL,
	`asset_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media_gallery_keyword` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`keyword` varchar(255) NOT NULL,
	CONSTRAINT `MEDIA_GALLERY_KEYWORD_KEYWORD` UNIQUE(`keyword`)
);
--> statement-breakpoint
CREATE TABLE `mview_state` (
	`state_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`view_id` varchar(255) DEFAULT 'NULL',
	`mode` varchar(16) DEFAULT ''disabled'',
	`status` varchar(16) DEFAULT ''idle'',
	`updated` datetime DEFAULT 'NULL',
	`version_id` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `newsletter_problem` (
	`problem_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`subscriber_id` int(10) unsigned DEFAULT 'NULL',
	`queue_id` int(10) unsigned NOT NULL DEFAULT 0,
	`problem_error_code` int(10) unsigned DEFAULT 0,
	`problem_error_text` varchar(200) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `newsletter_queue` (
	`queue_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`template_id` int(10) unsigned NOT NULL DEFAULT 0,
	`newsletter_type` int(11) DEFAULT 'NULL',
	`newsletter_text` text DEFAULT 'NULL',
	`newsletter_styles` text DEFAULT 'NULL',
	`newsletter_subject` varchar(200) DEFAULT 'NULL',
	`newsletter_sender_name` varchar(200) DEFAULT 'NULL',
	`newsletter_sender_email` varchar(200) DEFAULT 'NULL',
	`queue_status` int(10) unsigned NOT NULL DEFAULT 0,
	`queue_start_at` timestamp DEFAULT 'NULL',
	`queue_finish_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `newsletter_queue_link` (
	`queue_link_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`queue_id` int(10) unsigned NOT NULL DEFAULT 0,
	`subscriber_id` int(10) unsigned NOT NULL DEFAULT 0,
	`letter_sent_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `newsletter_queue_store_link` (
	`queue_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscriber` (
	`subscriber_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 0,
	`change_status_at` timestamp DEFAULT 'NULL',
	`customer_id` int(10) unsigned NOT NULL DEFAULT 0,
	`subscriber_email` varchar(150) DEFAULT 'NULL',
	`subscriber_status` int(11) NOT NULL DEFAULT 0,
	`subscriber_confirm_code` varchar(32) DEFAULT ''NULL''
);
--> statement-breakpoint
CREATE TABLE `newsletter_template` (
	`template_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`template_code` varchar(150) DEFAULT 'NULL',
	`template_text` text DEFAULT 'NULL',
	`template_styles` text DEFAULT 'NULL',
	`template_type` int(10) unsigned DEFAULT 'NULL',
	`template_subject` varchar(200) DEFAULT 'NULL',
	`template_sender_name` varchar(200) DEFAULT 'NULL',
	`template_sender_email` varchar(200) DEFAULT 'NULL',
	`template_actual` smallint(5) unsigned DEFAULT 1,
	`added_at` timestamp DEFAULT 'NULL',
	`modified_at` timestamp DEFAULT 'NULL',
	`is_legacy` tinyint NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oauth_consumer` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT ''0000-00-00 00:00:00'',
	`name` varchar(255) NOT NULL,
	`key` varchar(32) NOT NULL,
	`secret` varchar(128) NOT NULL,
	`callback_url` text DEFAULT 'NULL',
	`rejected_callback_url` text NOT NULL,
	CONSTRAINT `OAUTH_CONSUMER_KEY` UNIQUE(`key`),
	CONSTRAINT `OAUTH_CONSUMER_SECRET` UNIQUE(`secret`)
);
--> statement-breakpoint
CREATE TABLE `oauth_nonce` (
	`nonce` varchar(32) NOT NULL,
	`timestamp` int(10) unsigned NOT NULL,
	`consumer_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oauth_token` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`consumer_id` int(10) unsigned DEFAULT 'NULL',
	`admin_id` int(10) unsigned DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`type` varchar(16) NOT NULL,
	`token` varchar(32) NOT NULL,
	`secret` varchar(128) NOT NULL,
	`verifier` varchar(32) DEFAULT 'NULL',
	`callback_url` text NOT NULL,
	`revoked` smallint(5) unsigned NOT NULL DEFAULT 0,
	`authorized` smallint(5) unsigned NOT NULL DEFAULT 0,
	`user_type` int(11) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `OAUTH_TOKEN_TOKEN` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `oauth_token_request_log` (
	`log_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_name` varchar(255) NOT NULL,
	`user_type` smallint(5) unsigned NOT NULL,
	`failures_count` smallint(5) unsigned DEFAULT 0,
	`lock_expires_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `OAUTH_TOKEN_REQUEST_LOG_USER_NAME_USER_TYPE` UNIQUE(`user_name`,`user_type`)
);
--> statement-breakpoint
CREATE TABLE `pagebuilder_template` (
	`template_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(1024) NOT NULL,
	`preview_image` varchar(1024) DEFAULT 'NULL',
	`template` longtext NOT NULL,
	`created_for` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `password_reset_request_event` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`request_type` smallint(5) unsigned NOT NULL,
	`account_reference` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`ip` varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `patch_list` (
	`patch_id` int(11) AUTO_INCREMENT NOT NULL,
	`patch_name` varchar(1024) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payment_services_order_data_production_submitted_hash` (
	`identifier` varchar(64) NOT NULL,
	`feed_hash` varchar(64) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `payment_services_order_data_sandbox_submitted_hash` (
	`identifier` varchar(64) NOT NULL,
	`feed_hash` varchar(64) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `payment_services_order_status_data_prod_submitted_hash` (
	`identifier` varchar(64) NOT NULL,
	`feed_hash` varchar(64) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `payment_services_order_status_data_sandbox_submitted_hash` (
	`identifier` varchar(64) NOT NULL,
	`feed_hash` varchar(64) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `payment_services_store_data_production_submitted_hash` (
	`identifier` varchar(64) NOT NULL,
	`feed_hash` varchar(64) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `payment_services_store_data_sandbox_submitted_hash` (
	`identifier` varchar(64) NOT NULL,
	`feed_hash` varchar(64) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `paypal_billing_agreement` (
	`agreement_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned NOT NULL,
	`method_code` varchar(32) NOT NULL,
	`reference_id` varchar(32) NOT NULL,
	`status` varchar(20) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`agreement_label` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `paypal_billing_agreement_order` (
	`agreement_id` int(10) unsigned NOT NULL,
	`order_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `paypal_cert` (
	`cert_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`content` text DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `paypal_payment_transaction` (
	`transaction_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`txn_id` varchar(100) DEFAULT 'NULL',
	`additional_information` blob DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `PAYPAL_PAYMENT_TRANSACTION_TXN_ID` UNIQUE(`txn_id`)
);
--> statement-breakpoint
CREATE TABLE `paypal_settlement_report` (
	`report_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`report_date` date DEFAULT 'NULL',
	`account_id` varchar(64) DEFAULT 'NULL',
	`filename` varchar(24) DEFAULT 'NULL',
	`last_modified` timestamp DEFAULT 'NULL',
	CONSTRAINT `PAYPAL_SETTLEMENT_REPORT_REPORT_DATE_ACCOUNT_ID` UNIQUE(`report_date`,`account_id`)
);
--> statement-breakpoint
CREATE TABLE `paypal_settlement_report_row` (
	`row_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`report_id` int(10) unsigned NOT NULL,
	`transaction_id` varchar(19) DEFAULT 'NULL',
	`invoice_id` varchar(127) DEFAULT 'NULL',
	`paypal_reference_id` varchar(19) DEFAULT 'NULL',
	`paypal_reference_id_type` varchar(3) DEFAULT 'NULL',
	`transaction_event_code` varchar(5) DEFAULT 'NULL',
	`transaction_initiation_date` timestamp DEFAULT 'NULL',
	`transaction_completion_date` timestamp DEFAULT 'NULL',
	`transaction_debit_or_credit` varchar(2) NOT NULL DEFAULT ''CR'',
	`gross_transaction_amount` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`gross_transaction_currency` varchar(3) DEFAULT 'NULL',
	`fee_debit_or_credit` varchar(2) DEFAULT 'NULL',
	`fee_amount` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`fee_currency` varchar(3) DEFAULT 'NULL',
	`custom_field` varchar(255) DEFAULT 'NULL',
	`consumer_id` varchar(127) DEFAULT 'NULL',
	`payment_tracking_id` varchar(255) DEFAULT 'NULL',
	`store_id` varchar(50) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `persistent_session` (
	`persistent_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`key` varchar(50) NOT NULL,
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`info` text DEFAULT 'NULL',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `PERSISTENT_SESSION_KEY` UNIQUE(`key`),
	CONSTRAINT `PERSISTENT_SESSION_CUSTOMER_ID` UNIQUE(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `product_alert_price` (
	`alert_price_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`price` decimal(20,6) NOT NULL DEFAULT '0.000000',
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned DEFAULT 0,
	`add_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`last_send_date` timestamp DEFAULT 'NULL',
	`send_count` smallint(5) unsigned NOT NULL DEFAULT 0,
	`status` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `product_alert_stock` (
	`alert_stock_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned DEFAULT 0,
	`add_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`send_date` timestamp DEFAULT 'NULL',
	`send_count` smallint(5) unsigned NOT NULL DEFAULT 0,
	`status` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `queue` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `QUEUE_NAME` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `queue_lock` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`message_code` varchar(255) NOT NULL DEFAULT '''',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `QUEUE_LOCK_MESSAGE_CODE` UNIQUE(`message_code`)
);
--> statement-breakpoint
CREATE TABLE `queue_message` (
	`id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`topic_name` varchar(255) DEFAULT 'NULL',
	`body` longtext DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `queue_message_status` (
	`id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`queue_id` int(10) unsigned NOT NULL,
	`message_id` bigint(20) unsigned NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`status` smallint(5) unsigned NOT NULL,
	`number_of_trials` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `QUEUE_MESSAGE_STATUS_QUEUE_ID_MESSAGE_ID` UNIQUE(`queue_id`,`message_id`)
);
--> statement-breakpoint
CREATE TABLE `queue_poison_pill` (
	`version` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quote` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`converted_at` timestamp DEFAULT 'NULL',
	`is_active` smallint(5) unsigned DEFAULT 1,
	`is_virtual` smallint(5) unsigned DEFAULT 0,
	`is_multi_shipping` smallint(5) unsigned DEFAULT 0,
	`items_count` int(10) unsigned DEFAULT 0,
	`items_qty` decimal(12,4) DEFAULT '0.0000',
	`orig_order_id` int(10) unsigned DEFAULT 0,
	`store_to_base_rate` decimal(12,4) DEFAULT '0.0000',
	`store_to_quote_rate` decimal(12,4) DEFAULT '0.0000',
	`base_currency_code` varchar(255) DEFAULT 'NULL',
	`store_currency_code` varchar(255) DEFAULT 'NULL',
	`quote_currency_code` varchar(255) DEFAULT 'NULL',
	`grand_total` decimal(20,4) DEFAULT '0.0000',
	`base_grand_total` decimal(20,4) DEFAULT '0.0000',
	`checkout_method` varchar(255) DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`customer_tax_class_id` int(10) unsigned DEFAULT 'NULL',
	`customer_group_id` int(10) unsigned DEFAULT 0,
	`customer_email` varchar(255) DEFAULT 'NULL',
	`customer_prefix` varchar(40) DEFAULT 'NULL',
	`customer_firstname` varchar(255) DEFAULT 'NULL',
	`customer_middlename` varchar(40) DEFAULT 'NULL',
	`customer_lastname` varchar(255) DEFAULT 'NULL',
	`customer_suffix` varchar(40) DEFAULT 'NULL',
	`customer_dob` datetime DEFAULT 'NULL',
	`customer_note` text DEFAULT 'NULL',
	`customer_note_notify` smallint(5) unsigned DEFAULT 1,
	`customer_is_guest` smallint(5) unsigned DEFAULT 0,
	`remote_ip` varchar(45) DEFAULT 'NULL',
	`applied_rule_ids` varchar(255) DEFAULT 'NULL',
	`reserved_order_id` varchar(64) DEFAULT 'NULL',
	`password_hash` varchar(255) DEFAULT 'NULL',
	`coupon_code` varchar(255) DEFAULT 'NULL',
	`global_currency_code` varchar(255) DEFAULT 'NULL',
	`base_to_global_rate` decimal(20,4) DEFAULT 'NULL',
	`base_to_quote_rate` decimal(20,4) DEFAULT 'NULL',
	`customer_taxvat` varchar(255) DEFAULT 'NULL',
	`customer_gender` varchar(255) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal` decimal(20,4) DEFAULT 'NULL',
	`subtotal_with_discount` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_with_discount` decimal(20,4) DEFAULT 'NULL',
	`is_changed` int(10) unsigned DEFAULT 'NULL',
	`trigger_recollect` smallint(6) NOT NULL DEFAULT 0,
	`ext_shipping_info` text DEFAULT 'NULL',
	`gift_message_id` int(11) DEFAULT 'NULL',
	`is_persistent` smallint(5) unsigned DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `quote_address` (
	`address_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`quote_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`save_in_address_book` smallint(6) DEFAULT 0,
	`customer_address_id` int(10) unsigned DEFAULT 'NULL',
	`address_type` varchar(10) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`prefix` varchar(40) DEFAULT 'NULL',
	`firstname` varchar(255) DEFAULT 'NULL',
	`middlename` varchar(40) DEFAULT 'NULL',
	`lastname` varchar(255) DEFAULT 'NULL',
	`suffix` varchar(40) DEFAULT 'NULL',
	`company` varchar(255) DEFAULT 'NULL',
	`street` varchar(255) DEFAULT 'NULL',
	`city` varchar(255) DEFAULT 'NULL',
	`region` varchar(255) DEFAULT 'NULL',
	`region_id` int(10) unsigned DEFAULT 'NULL',
	`postcode` varchar(20) DEFAULT 'NULL',
	`country_id` varchar(30) DEFAULT 'NULL',
	`telephone` varchar(255) DEFAULT 'NULL',
	`fax` varchar(255) DEFAULT 'NULL',
	`same_as_billing` smallint(5) unsigned NOT NULL DEFAULT 0,
	`collect_shipping_rates` smallint(5) unsigned NOT NULL DEFAULT 0,
	`shipping_method` varchar(120) DEFAULT 'NULL',
	`shipping_description` varchar(255) DEFAULT 'NULL',
	`weight` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`subtotal` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_subtotal` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`subtotal_with_discount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_subtotal_with_discount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`tax_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_tax_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`shipping_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_shipping_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`discount_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_discount_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`grand_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_grand_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`customer_notes` text DEFAULT 'NULL',
	`applied_taxes` text DEFAULT 'NULL',
	`discount_description` varchar(255) DEFAULT 'NULL',
	`shipping_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_discount_tax_compensation_amnt` decimal(20,4) DEFAULT 'NULL',
	`shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`vat_id` text DEFAULT 'NULL',
	`vat_is_valid` smallint(6) DEFAULT 'NULL',
	`vat_request_id` text DEFAULT 'NULL',
	`vat_request_date` text DEFAULT 'NULL',
	`vat_request_success` smallint(6) DEFAULT 'NULL',
	`validated_country_code` text DEFAULT 'NULL',
	`validated_vat_number` text DEFAULT 'NULL',
	`gift_message_id` int(11) DEFAULT 'NULL',
	`free_shipping` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `quote_address_item` (
	`address_item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_item_id` int(10) unsigned DEFAULT 'NULL',
	`quote_address_id` int(10) unsigned NOT NULL DEFAULT 0,
	`quote_item_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`applied_rule_ids` text DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`weight` decimal(12,4) DEFAULT '0.0000',
	`qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`discount_amount` decimal(20,4) DEFAULT '0.0000',
	`tax_amount` decimal(20,4) DEFAULT '0.0000',
	`row_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_row_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`row_total_with_discount` decimal(20,4) DEFAULT '0.0000',
	`base_discount_amount` decimal(20,4) DEFAULT '0.0000',
	`base_tax_amount` decimal(20,4) DEFAULT '0.0000',
	`row_weight` decimal(12,4) DEFAULT '0.0000',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`super_product_id` int(10) unsigned DEFAULT 'NULL',
	`parent_product_id` int(10) unsigned DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`sku` varchar(255) DEFAULT 'NULL',
	`image` varchar(255) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`is_qty_decimal` int(10) unsigned DEFAULT 'NULL',
	`price` decimal(12,4) DEFAULT 'NULL',
	`discount_percent` decimal(12,4) DEFAULT 'NULL',
	`no_discount` int(10) unsigned DEFAULT 'NULL',
	`tax_percent` decimal(12,4) DEFAULT 'NULL',
	`base_price` decimal(20,4) DEFAULT 'NULL',
	`base_cost` decimal(20,4) DEFAULT 'NULL',
	`price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`gift_message_id` int(11) DEFAULT 'NULL',
	`free_shipping` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quote_id_mask` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`quote_id` int(10) unsigned NOT NULL,
	`masked_id` varchar(32) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quote_item` (
	`item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`quote_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`parent_item_id` int(10) unsigned DEFAULT 'NULL',
	`is_virtual` smallint(5) unsigned DEFAULT 'NULL',
	`sku` varchar(255) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`applied_rule_ids` text DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`is_qty_decimal` smallint(5) unsigned DEFAULT 'NULL',
	`no_discount` smallint(5) unsigned DEFAULT 0,
	`weight` decimal(12,4) DEFAULT '0.0000',
	`qty` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`price` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_price` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`custom_price` decimal(20,4) DEFAULT 'NULL',
	`discount_percent` decimal(12,4) DEFAULT '0.0000',
	`discount_amount` decimal(20,4) DEFAULT '0.0000',
	`base_discount_amount` decimal(20,4) DEFAULT '0.0000',
	`tax_percent` decimal(12,4) DEFAULT '0.0000',
	`tax_amount` decimal(20,4) DEFAULT '0.0000',
	`base_tax_amount` decimal(20,4) DEFAULT '0.0000',
	`row_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_row_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`row_total_with_discount` decimal(20,4) DEFAULT '0.0000',
	`row_weight` decimal(12,4) DEFAULT '0.0000',
	`product_type` varchar(255) DEFAULT 'NULL',
	`base_tax_before_discount` decimal(20,4) DEFAULT 'NULL',
	`tax_before_discount` decimal(20,4) DEFAULT 'NULL',
	`original_custom_price` decimal(20,4) DEFAULT 'NULL',
	`redirect_url` varchar(255) DEFAULT 'NULL',
	`base_cost` decimal(12,4) DEFAULT 'NULL',
	`price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`gift_message_id` int(11) DEFAULT 'NULL',
	`free_shipping` smallint(5) unsigned NOT NULL DEFAULT 0,
	`weee_tax_applied` text DEFAULT 'NULL',
	`weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_applied_row_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_row_amnt` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quote_item_option` (
	`option_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`item_id` int(10) unsigned NOT NULL,
	`product_id` int(10) unsigned NOT NULL,
	`code` varchar(255) NOT NULL,
	`value` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quote_payment` (
	`payment_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`quote_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`method` varchar(255) DEFAULT 'NULL',
	`cc_type` varchar(255) DEFAULT 'NULL',
	`cc_number_enc` varchar(255) DEFAULT 'NULL',
	`cc_last_4` varchar(255) DEFAULT 'NULL',
	`cc_cid_enc` varchar(255) DEFAULT 'NULL',
	`cc_owner` varchar(255) DEFAULT 'NULL',
	`cc_exp_month` varchar(255) DEFAULT 'NULL',
	`cc_exp_year` smallint(5) unsigned DEFAULT 0,
	`cc_ss_owner` varchar(255) DEFAULT 'NULL',
	`cc_ss_start_month` smallint(5) unsigned DEFAULT 0,
	`cc_ss_start_year` smallint(5) unsigned DEFAULT 0,
	`po_number` varchar(255) DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`cc_ss_issue` varchar(255) DEFAULT 'NULL',
	`additional_information` text DEFAULT 'NULL',
	`paypal_payer_id` varchar(255) DEFAULT 'NULL',
	`paypal_payer_status` varchar(255) DEFAULT 'NULL',
	`paypal_correlation_id` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quote_shipping_rate` (
	`rate_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`address_id` int(10) unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`carrier` varchar(255) DEFAULT 'NULL',
	`carrier_title` varchar(255) DEFAULT 'NULL',
	`code` varchar(255) DEFAULT 'NULL',
	`method` varchar(255) DEFAULT 'NULL',
	`method_description` text DEFAULT 'NULL',
	`price` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`error_message` text DEFAULT 'NULL',
	`method_title` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `rating` (
	`rating_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`rating_code` varchar(64) NOT NULL,
	`position` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_active` smallint(6) NOT NULL DEFAULT 1,
	CONSTRAINT `RATING_RATING_CODE` UNIQUE(`rating_code`)
);
--> statement-breakpoint
CREATE TABLE `rating_entity` (
	`entity_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`entity_code` varchar(64) NOT NULL,
	CONSTRAINT `RATING_ENTITY_ENTITY_CODE` UNIQUE(`entity_code`)
);
--> statement-breakpoint
CREATE TABLE `rating_option` (
	`option_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rating_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`code` varchar(32) NOT NULL,
	`value` smallint(5) unsigned NOT NULL DEFAULT 0,
	`position` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `rating_option_vote` (
	`vote_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`option_id` int(10) unsigned NOT NULL DEFAULT 0,
	`remote_ip` varchar(16) NOT NULL,
	`remote_ip_long` bigint(20) NOT NULL DEFAULT 0,
	`customer_id` int(10) unsigned DEFAULT 0,
	`entity_pk_value` bigint(20) unsigned NOT NULL DEFAULT 0,
	`rating_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`review_id` bigint(20) unsigned DEFAULT 'NULL',
	`percent` smallint(6) NOT NULL DEFAULT 0,
	`value` smallint(6) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `rating_option_vote_aggregated` (
	`primary_id` int(11) AUTO_INCREMENT NOT NULL,
	`rating_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_pk_value` bigint(20) unsigned NOT NULL DEFAULT 0,
	`vote_count` int(10) unsigned NOT NULL DEFAULT 0,
	`vote_value_sum` int(10) unsigned NOT NULL DEFAULT 0,
	`percent` smallint(6) NOT NULL DEFAULT 0,
	`percent_approved` smallint(6) DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `rating_store` (
	`rating_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `rating_title` (
	`rating_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`value` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `release_notification_viewer_log` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`viewer_id` int(10) unsigned NOT NULL,
	`last_view_version` varchar(16) NOT NULL,
	CONSTRAINT `RELEASE_NOTIFICATION_VIEWER_LOG_VIEWER_ID` UNIQUE(`viewer_id`)
);
--> statement-breakpoint
CREATE TABLE `reporting_counts` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`type` varchar(255) DEFAULT 'NULL',
	`count` int(10) unsigned DEFAULT 'NULL',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `reporting_module_status` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	`active` varchar(255) DEFAULT 'NULL',
	`setup_version` varchar(255) DEFAULT 'NULL',
	`state` varchar(255) DEFAULT 'NULL',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `reporting_orders` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`total` decimal(20,4) unsigned DEFAULT 'NULL',
	`total_base` decimal(20,4) unsigned DEFAULT 'NULL',
	`item_count` int(10) unsigned NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `reporting_system_updates` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`type` varchar(255) DEFAULT 'NULL',
	`action` varchar(255) DEFAULT 'NULL',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `reporting_users` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`type` varchar(255) DEFAULT 'NULL',
	`action` varchar(255) DEFAULT 'NULL',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `report_compared_product_index` (
	`index_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`visitor_id` int(10) unsigned DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`added_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `REPORT_COMPARED_PRODUCT_INDEX_VISITOR_ID_PRODUCT_ID` UNIQUE(`visitor_id`,`product_id`),
	CONSTRAINT `REPORT_COMPARED_PRODUCT_INDEX_CUSTOMER_ID_PRODUCT_ID` UNIQUE(`customer_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `report_event` (
	`event_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`logged_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`event_type_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`object_id` int(10) unsigned NOT NULL DEFAULT 0,
	`subject_id` int(10) unsigned NOT NULL DEFAULT 0,
	`subtype` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `report_event_types` (
	`event_type_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`event_name` varchar(64) NOT NULL,
	`customer_login` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `report_viewed_product_aggregated_daily` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`views_num` int(11) NOT NULL DEFAULT 0,
	`rating_pos` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `REPORT_VIEWED_PRD_AGGRED_DAILY_PERIOD_STORE_ID_PRD_ID` UNIQUE(`period`,`store_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `report_viewed_product_aggregated_monthly` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`views_num` int(11) NOT NULL DEFAULT 0,
	`rating_pos` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `REPORT_VIEWED_PRD_AGGRED_MONTHLY_PERIOD_STORE_ID_PRD_ID` UNIQUE(`period`,`store_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `report_viewed_product_aggregated_yearly` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`views_num` int(11) NOT NULL DEFAULT 0,
	`rating_pos` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `REPORT_VIEWED_PRD_AGGRED_YEARLY_PERIOD_STORE_ID_PRD_ID` UNIQUE(`period`,`store_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `report_viewed_product_index` (
	`index_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`visitor_id` int(10) unsigned DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`added_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `REPORT_VIEWED_PRODUCT_INDEX_VISITOR_ID_PRODUCT_ID` UNIQUE(`visitor_id`,`product_id`),
	CONSTRAINT `REPORT_VIEWED_PRODUCT_INDEX_CUSTOMER_ID_PRODUCT_ID` UNIQUE(`customer_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `review` (
	`review_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`entity_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_pk_value` int(10) unsigned NOT NULL DEFAULT 0,
	`status_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `review_detail` (
	`detail_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`review_id` bigint(20) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned DEFAULT 0,
	`title` varchar(255) NOT NULL,
	`detail` text NOT NULL,
	`nickname` varchar(128) NOT NULL,
	`customer_id` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `review_entity` (
	`entity_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`entity_code` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review_entity_summary` (
	`primary_id` bigint(20) AUTO_INCREMENT NOT NULL,
	`entity_pk_value` bigint(20) NOT NULL DEFAULT 0,
	`entity_type` smallint(6) NOT NULL DEFAULT 0,
	`reviews_count` smallint(6) NOT NULL DEFAULT 0,
	`rating_summary` smallint(6) NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `REVIEW_ENTITY_SUMMARY_ENTITY_PK_VALUE_STORE_ID_ENTITY_TYPE` UNIQUE(`entity_pk_value`,`store_id`,`entity_type`)
);
--> statement-breakpoint
CREATE TABLE `review_status` (
	`status_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`status_code` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review_store` (
	`review_id` bigint(20) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `salesrule` (
	`rule_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`from_date` date DEFAULT 'NULL',
	`to_date` date DEFAULT 'NULL',
	`uses_per_customer` int(11) NOT NULL DEFAULT 0,
	`is_active` smallint(6) NOT NULL DEFAULT 0,
	`conditions_serialized` mediumtext DEFAULT 'NULL',
	`actions_serialized` mediumtext DEFAULT 'NULL',
	`stop_rules_processing` smallint(6) NOT NULL DEFAULT 1,
	`is_advanced` smallint(5) unsigned NOT NULL DEFAULT 1,
	`product_ids` text DEFAULT 'NULL',
	`sort_order` int(10) unsigned NOT NULL DEFAULT 0,
	`simple_action` varchar(32) DEFAULT 'NULL',
	`discount_amount` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`discount_qty` decimal(12,4) DEFAULT 'NULL',
	`discount_step` int(10) unsigned NOT NULL DEFAULT 0,
	`apply_to_shipping` smallint(5) unsigned NOT NULL DEFAULT 0,
	`times_used` int(10) unsigned NOT NULL DEFAULT 0,
	`is_rss` smallint(6) NOT NULL DEFAULT 0,
	`coupon_type` smallint(5) unsigned NOT NULL DEFAULT 1,
	`use_auto_generation` smallint(6) NOT NULL DEFAULT 0,
	`uses_per_coupon` int(11) NOT NULL DEFAULT 0,
	`simple_free_shipping` smallint(5) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `salesrule_coupon` (
	`coupon_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` int(10) unsigned NOT NULL,
	`code` varchar(255) DEFAULT 'NULL',
	`usage_limit` int(10) unsigned DEFAULT 'NULL',
	`usage_per_customer` int(10) unsigned DEFAULT 'NULL',
	`times_used` int(10) unsigned NOT NULL DEFAULT 0,
	`expiration_date` datetime DEFAULT 'NULL',
	`is_primary` smallint(5) unsigned DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`type` smallint(6) DEFAULT 0,
	CONSTRAINT `SALESRULE_COUPON_CODE` UNIQUE(`code`),
	CONSTRAINT `SALESRULE_COUPON_RULE_ID_IS_PRIMARY` UNIQUE(`rule_id`,`is_primary`)
);
--> statement-breakpoint
CREATE TABLE `salesrule_coupon_aggregated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`coupon_code` varchar(50) DEFAULT 'NULL',
	`coupon_uses` int(11) NOT NULL DEFAULT 0,
	`subtotal_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`discount_amount` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`subtotal_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`discount_amount_actual` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`rule_name` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `SALESRULE_COUPON_AGGRED_PERIOD_STORE_ID_ORDER_STS_COUPON_CODE` UNIQUE(`period`,`store_id`,`order_status`,`coupon_code`)
);
--> statement-breakpoint
CREATE TABLE `salesrule_coupon_aggregated_order` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`coupon_code` varchar(50) DEFAULT 'NULL',
	`coupon_uses` int(11) NOT NULL DEFAULT 0,
	`subtotal_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`discount_amount` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`rule_name` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `UNQ_1094D1FBBCBB11704A29DEF3ACC37D2B` UNIQUE(`period`,`store_id`,`order_status`,`coupon_code`)
);
--> statement-breakpoint
CREATE TABLE `salesrule_coupon_aggregated_updated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`coupon_code` varchar(50) DEFAULT 'NULL',
	`coupon_uses` int(11) NOT NULL DEFAULT 0,
	`subtotal_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`discount_amount` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`subtotal_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`discount_amount_actual` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`rule_name` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `UNQ_7196FA120A4F0F84E1B66605E87E213E` UNIQUE(`period`,`store_id`,`order_status`,`coupon_code`)
);
--> statement-breakpoint
CREATE TABLE `salesrule_coupon_usage` (
	`coupon_id` int(10) unsigned NOT NULL,
	`customer_id` int(10) unsigned NOT NULL,
	`times_used` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `salesrule_customer` (
	`rule_customer_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` int(10) unsigned NOT NULL DEFAULT 0,
	`customer_id` int(10) unsigned NOT NULL DEFAULT 0,
	`times_used` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `salesrule_customer_group` (
	`rule_id` int(10) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `salesrule_label` (
	`label_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rule_id` int(10) unsigned NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`label` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `SALESRULE_LABEL_RULE_ID_STORE_ID` UNIQUE(`rule_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `salesrule_product_attribute` (
	`rule_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL,
	`customer_group_id` int(10) unsigned NOT NULL,
	`attribute_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `salesrule_website` (
	`rule_id` int(10) unsigned NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_bestsellers_aggregated_daily` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`qty_ordered` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`rating_pos` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `SALES_BESTSELLERS_AGGREGATED_DAILY_PERIOD_STORE_ID_PRODUCT_ID` UNIQUE(`period`,`store_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_bestsellers_aggregated_monthly` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`qty_ordered` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`rating_pos` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `SALES_BESTSELLERS_AGGREGATED_MONTHLY_PERIOD_STORE_ID_PRODUCT_ID` UNIQUE(`period`,`store_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_bestsellers_aggregated_yearly` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_name` varchar(255) DEFAULT 'NULL',
	`product_price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`qty_ordered` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`rating_pos` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `SALES_BESTSELLERS_AGGREGATED_YEARLY_PERIOD_STORE_ID_PRODUCT_ID` UNIQUE(`period`,`store_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_creditmemo` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`adjustment_positive` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`store_to_order_rate` decimal(20,4) DEFAULT 'NULL',
	`base_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`base_to_order_rate` decimal(20,4) DEFAULT 'NULL',
	`grand_total` decimal(20,4) DEFAULT 'NULL',
	`base_adjustment_negative` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`adjustment_negative` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`store_to_base_rate` decimal(20,4) DEFAULT 'NULL',
	`base_to_global_rate` decimal(20,4) DEFAULT 'NULL',
	`base_adjustment` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal` decimal(20,4) DEFAULT 'NULL',
	`discount_amount` decimal(20,4) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`adjustment` decimal(20,4) DEFAULT 'NULL',
	`base_grand_total` decimal(20,4) DEFAULT 'NULL',
	`base_adjustment_positive` decimal(20,4) DEFAULT 'NULL',
	`base_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`tax_amount` decimal(20,4) DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL,
	`email_sent` smallint(5) unsigned DEFAULT 'NULL',
	`send_email` smallint(5) unsigned DEFAULT 'NULL',
	`creditmemo_status` int(11) DEFAULT 'NULL',
	`state` int(11) DEFAULT 'NULL',
	`shipping_address_id` int(11) DEFAULT 'NULL',
	`billing_address_id` int(11) DEFAULT 'NULL',
	`invoice_id` int(11) DEFAULT 'NULL',
	`store_currency_code` varchar(3) DEFAULT 'NULL',
	`order_currency_code` varchar(3) DEFAULT 'NULL',
	`base_currency_code` varchar(3) DEFAULT 'NULL',
	`global_currency_code` varchar(3) DEFAULT 'NULL',
	`transaction_id` varchar(255) DEFAULT 'NULL',
	`increment_id` varchar(50) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_discount_tax_compensation_amnt` decimal(20,4) DEFAULT 'NULL',
	`shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`discount_description` varchar(255) DEFAULT 'NULL',
	`customer_note` text DEFAULT 'NULL',
	`customer_note_notify` smallint(5) unsigned DEFAULT 'NULL',
	CONSTRAINT `SALES_CREDITMEMO_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_creditmemo_comment` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`is_customer_notified` int(11) DEFAULT 'NULL',
	`is_visible_on_front` smallint(5) unsigned NOT NULL DEFAULT 0,
	`comment` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sales_creditmemo_grid` (
	`entity_id` int(10) unsigned NOT NULL,
	`increment_id` varchar(50) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL,
	`order_increment_id` varchar(50) DEFAULT 'NULL',
	`order_created_at` timestamp DEFAULT 'NULL',
	`billing_name` varchar(255) DEFAULT 'NULL',
	`state` int(11) DEFAULT 'NULL',
	`base_grand_total` decimal(20,4) DEFAULT 'NULL',
	`order_status` varchar(32) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`billing_address` varchar(255) DEFAULT 'NULL',
	`shipping_address` varchar(255) DEFAULT 'NULL',
	`customer_name` varchar(128) NOT NULL,
	`customer_email` varchar(128) DEFAULT 'NULL',
	`customer_group_id` smallint(6) DEFAULT 'NULL',
	`payment_method` varchar(32) DEFAULT 'NULL',
	`shipping_information` varchar(255) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`shipping_and_handling` decimal(20,4) DEFAULT 'NULL',
	`adjustment_positive` decimal(20,4) DEFAULT 'NULL',
	`adjustment_negative` decimal(20,4) DEFAULT 'NULL',
	`order_base_grand_total` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_CREDITMEMO_GRID_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_creditmemo_item` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`base_price` decimal(20,4) DEFAULT 'NULL',
	`tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_row_total` decimal(20,4) DEFAULT 'NULL',
	`discount_amount` decimal(20,4) DEFAULT 'NULL',
	`row_total` decimal(20,4) DEFAULT 'NULL',
	`base_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`qty` decimal(12,4) DEFAULT 'NULL',
	`base_cost` decimal(20,4) DEFAULT 'NULL',
	`price` decimal(20,4) DEFAULT 'NULL',
	`base_row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`product_id` int(11) DEFAULT 'NULL',
	`order_item_id` int(11) DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`sku` varchar(255) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`tax_ratio` text DEFAULT 'NULL',
	`weee_tax_applied` text DEFAULT 'NULL',
	`weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_applied_row_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_row_amnt` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_data_exporter_orders` (
	`id` int(10) unsigned NOT NULL,
	`mode` varchar(255) NOT NULL,
	`feed_data` mediumtext NOT NULL,
	`modified_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sales_data_exporter_orders_index_batches` (
	`batch_number` int(11) NOT NULL,
	`entity_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_data_exporter_orders_index_sequence` (
	`i` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_data_exporter_order_statuses` (
	`status` varchar(255) NOT NULL,
	`feed_data` mediumtext NOT NULL,
	`modified_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sales_data_exporter_order_statuses_index_batches` (
	`batch_number` int(11) NOT NULL,
	`status` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_data_exporter_order_statuses_index_sequence` (
	`i` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_invoice` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`base_grand_total` decimal(20,4) DEFAULT 'NULL',
	`shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`store_to_order_rate` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`base_to_order_rate` decimal(20,4) DEFAULT 'NULL',
	`grand_total` decimal(20,4) DEFAULT 'NULL',
	`shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`store_to_base_rate` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`total_qty` decimal(12,4) DEFAULT 'NULL',
	`base_to_global_rate` decimal(20,4) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal` decimal(20,4) DEFAULT 'NULL',
	`discount_amount` decimal(20,4) DEFAULT 'NULL',
	`billing_address_id` int(11) DEFAULT 'NULL',
	`is_used_for_refund` smallint(5) unsigned DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL,
	`email_sent` smallint(5) unsigned DEFAULT 'NULL',
	`send_email` smallint(5) unsigned DEFAULT 'NULL',
	`can_void_flag` smallint(5) unsigned DEFAULT 'NULL',
	`state` int(11) DEFAULT 'NULL',
	`shipping_address_id` int(11) DEFAULT 'NULL',
	`store_currency_code` varchar(3) DEFAULT 'NULL',
	`transaction_id` varchar(255) DEFAULT 'NULL',
	`order_currency_code` varchar(3) DEFAULT 'NULL',
	`base_currency_code` varchar(3) DEFAULT 'NULL',
	`global_currency_code` varchar(3) DEFAULT 'NULL',
	`increment_id` varchar(50) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_discount_tax_compensation_amnt` decimal(20,4) DEFAULT 'NULL',
	`shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_total_refunded` decimal(20,4) DEFAULT 'NULL',
	`discount_description` varchar(255) DEFAULT 'NULL',
	`customer_note` text DEFAULT 'NULL',
	`customer_note_notify` smallint(5) unsigned DEFAULT 'NULL',
	CONSTRAINT `SALES_INVOICE_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_invoiced_aggregated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`orders_invoiced` decimal(20,4) DEFAULT 'NULL',
	`invoiced` decimal(20,4) DEFAULT 'NULL',
	`invoiced_captured` decimal(20,4) DEFAULT 'NULL',
	`invoiced_not_captured` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_INVOICED_AGGREGATED_PERIOD_STORE_ID_ORDER_STATUS` UNIQUE(`period`,`store_id`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `sales_invoiced_aggregated_order` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) NOT NULL,
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`orders_invoiced` decimal(20,4) DEFAULT 'NULL',
	`invoiced` decimal(20,4) DEFAULT 'NULL',
	`invoiced_captured` decimal(20,4) DEFAULT 'NULL',
	`invoiced_not_captured` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_INVOICED_AGGREGATED_ORDER_PERIOD_STORE_ID_ORDER_STATUS` UNIQUE(`period`,`store_id`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `sales_invoice_comment` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`is_customer_notified` smallint(5) unsigned DEFAULT 'NULL',
	`is_visible_on_front` smallint(5) unsigned NOT NULL DEFAULT 0,
	`comment` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sales_invoice_grid` (
	`entity_id` int(10) unsigned NOT NULL,
	`increment_id` varchar(50) DEFAULT 'NULL',
	`state` int(11) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`store_name` varchar(255) DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL,
	`order_increment_id` varchar(50) DEFAULT 'NULL',
	`order_created_at` timestamp DEFAULT 'NULL',
	`customer_name` varchar(255) DEFAULT 'NULL',
	`customer_email` varchar(255) DEFAULT 'NULL',
	`customer_group_id` int(11) DEFAULT 'NULL',
	`payment_method` varchar(128) DEFAULT 'NULL',
	`store_currency_code` varchar(3) DEFAULT 'NULL',
	`order_currency_code` varchar(3) DEFAULT 'NULL',
	`base_currency_code` varchar(3) DEFAULT 'NULL',
	`global_currency_code` varchar(3) DEFAULT 'NULL',
	`billing_name` varchar(255) DEFAULT 'NULL',
	`billing_address` varchar(255) DEFAULT 'NULL',
	`shipping_address` varchar(255) DEFAULT 'NULL',
	`shipping_information` varchar(255) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`shipping_and_handling` decimal(20,4) DEFAULT 'NULL',
	`grand_total` decimal(20,4) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`base_grand_total` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_INVOICE_GRID_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_invoice_item` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`base_price` decimal(20,4) DEFAULT 'NULL',
	`tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_row_total` decimal(20,4) DEFAULT 'NULL',
	`discount_amount` decimal(20,4) DEFAULT 'NULL',
	`row_total` decimal(20,4) DEFAULT 'NULL',
	`base_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`qty` decimal(12,4) DEFAULT 'NULL',
	`base_cost` decimal(20,4) DEFAULT 'NULL',
	`price` decimal(20,4) DEFAULT 'NULL',
	`base_row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`product_id` int(11) DEFAULT 'NULL',
	`order_item_id` int(11) DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`sku` varchar(255) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`tax_ratio` text DEFAULT 'NULL',
	`weee_tax_applied` text DEFAULT 'NULL',
	`weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_applied_row_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_row_amnt` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_order` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`state` varchar(32) DEFAULT 'NULL',
	`status` varchar(32) DEFAULT 'NULL',
	`coupon_code` varchar(255) DEFAULT 'NULL',
	`protect_code` varchar(255) DEFAULT 'NULL',
	`shipping_description` varchar(255) DEFAULT 'NULL',
	`is_virtual` smallint(5) unsigned DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`base_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_canceled` decimal(20,4) DEFAULT 'NULL',
	`base_discount_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_discount_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_grand_total` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_canceled` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_tax_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_canceled` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`base_tax_canceled` decimal(20,4) DEFAULT 'NULL',
	`base_tax_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_tax_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_to_global_rate` decimal(20,4) DEFAULT 'NULL',
	`base_to_order_rate` decimal(20,4) DEFAULT 'NULL',
	`base_total_canceled` decimal(20,4) DEFAULT 'NULL',
	`base_total_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_total_invoiced_cost` decimal(20,4) DEFAULT 'NULL',
	`base_total_offline_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_total_online_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_total_paid` decimal(20,4) DEFAULT 'NULL',
	`base_total_qty_ordered` decimal(12,4) DEFAULT 'NULL',
	`base_total_refunded` decimal(20,4) DEFAULT 'NULL',
	`discount_amount` decimal(20,4) DEFAULT 'NULL',
	`discount_canceled` decimal(20,4) DEFAULT 'NULL',
	`discount_invoiced` decimal(20,4) DEFAULT 'NULL',
	`discount_refunded` decimal(20,4) DEFAULT 'NULL',
	`grand_total` decimal(20,4) DEFAULT 'NULL',
	`shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_canceled` decimal(20,4) DEFAULT 'NULL',
	`shipping_invoiced` decimal(20,4) DEFAULT 'NULL',
	`shipping_refunded` decimal(20,4) DEFAULT 'NULL',
	`shipping_tax_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_tax_refunded` decimal(20,4) DEFAULT 'NULL',
	`store_to_base_rate` decimal(12,4) DEFAULT 'NULL',
	`store_to_order_rate` decimal(12,4) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`subtotal_canceled` decimal(20,4) DEFAULT 'NULL',
	`subtotal_invoiced` decimal(20,4) DEFAULT 'NULL',
	`subtotal_refunded` decimal(20,4) DEFAULT 'NULL',
	`tax_amount` decimal(20,4) DEFAULT 'NULL',
	`tax_canceled` decimal(20,4) DEFAULT 'NULL',
	`tax_invoiced` decimal(20,4) DEFAULT 'NULL',
	`tax_refunded` decimal(20,4) DEFAULT 'NULL',
	`total_canceled` decimal(20,4) DEFAULT 'NULL',
	`total_invoiced` decimal(20,4) DEFAULT 'NULL',
	`total_offline_refunded` decimal(20,4) DEFAULT 'NULL',
	`total_online_refunded` decimal(20,4) DEFAULT 'NULL',
	`total_paid` decimal(20,4) DEFAULT 'NULL',
	`total_qty_ordered` decimal(12,4) DEFAULT 'NULL',
	`total_refunded` decimal(20,4) DEFAULT 'NULL',
	`can_ship_partially` smallint(5) unsigned DEFAULT 'NULL',
	`can_ship_partially_item` smallint(5) unsigned DEFAULT 'NULL',
	`customer_is_guest` smallint(5) unsigned DEFAULT 'NULL',
	`customer_note_notify` smallint(5) unsigned DEFAULT 'NULL',
	`billing_address_id` int(11) DEFAULT 'NULL',
	`customer_group_id` int(11) DEFAULT 'NULL',
	`edit_increment` int(11) DEFAULT 'NULL',
	`email_sent` smallint(5) unsigned DEFAULT 'NULL',
	`send_email` smallint(5) unsigned DEFAULT 'NULL',
	`forced_shipment_with_invoice` smallint(5) unsigned DEFAULT 'NULL',
	`payment_auth_expiration` int(11) DEFAULT 'NULL',
	`quote_address_id` int(11) DEFAULT 'NULL',
	`quote_id` int(11) DEFAULT 'NULL',
	`shipping_address_id` int(11) DEFAULT 'NULL',
	`adjustment_negative` decimal(20,4) DEFAULT 'NULL',
	`adjustment_positive` decimal(20,4) DEFAULT 'NULL',
	`base_adjustment_negative` decimal(20,4) DEFAULT 'NULL',
	`base_adjustment_positive` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`base_subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_total_due` decimal(20,4) DEFAULT 'NULL',
	`payment_authorization_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_discount_amount` decimal(20,4) DEFAULT 'NULL',
	`subtotal_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`total_due` decimal(20,4) DEFAULT 'NULL',
	`weight` decimal(12,4) DEFAULT 'NULL',
	`customer_dob` datetime DEFAULT 'NULL',
	`increment_id` varchar(50) DEFAULT 'NULL',
	`applied_rule_ids` varchar(128) DEFAULT 'NULL',
	`base_currency_code` varchar(3) DEFAULT 'NULL',
	`customer_email` varchar(128) DEFAULT 'NULL',
	`customer_firstname` varchar(128) DEFAULT 'NULL',
	`customer_lastname` varchar(128) DEFAULT 'NULL',
	`customer_middlename` varchar(128) DEFAULT 'NULL',
	`customer_prefix` varchar(32) DEFAULT 'NULL',
	`customer_suffix` varchar(32) DEFAULT 'NULL',
	`customer_taxvat` varchar(32) DEFAULT 'NULL',
	`discount_description` varchar(255) DEFAULT 'NULL',
	`ext_customer_id` varchar(32) DEFAULT 'NULL',
	`ext_order_id` varchar(32) DEFAULT 'NULL',
	`global_currency_code` varchar(3) DEFAULT 'NULL',
	`hold_before_state` varchar(32) DEFAULT 'NULL',
	`hold_before_status` varchar(32) DEFAULT 'NULL',
	`order_currency_code` varchar(3) DEFAULT 'NULL',
	`original_increment_id` varchar(50) DEFAULT 'NULL',
	`relation_child_id` varchar(32) DEFAULT 'NULL',
	`relation_child_real_id` varchar(32) DEFAULT 'NULL',
	`relation_parent_id` varchar(32) DEFAULT 'NULL',
	`relation_parent_real_id` varchar(32) DEFAULT 'NULL',
	`remote_ip` varchar(45) DEFAULT 'NULL',
	`shipping_method` varchar(120) DEFAULT 'NULL',
	`store_currency_code` varchar(3) DEFAULT 'NULL',
	`store_name` varchar(255) DEFAULT 'NULL',
	`x_forwarded_for` varchar(255) DEFAULT 'NULL',
	`customer_note` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`total_item_count` smallint(5) unsigned NOT NULL DEFAULT 0,
	`customer_gender` int(11) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_discount_tax_compensation_amnt` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_invoiced` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_refunded` decimal(20,4) DEFAULT 'NULL',
	`shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`coupon_rule_name` varchar(255) DEFAULT 'NULL',
	`gift_message_id` int(11) DEFAULT 'NULL',
	`paypal_ipn_customer_notified` int(11) DEFAULT 0,
	`dispute_status` varchar(45) DEFAULT 'NULL',
	CONSTRAINT `SALES_ORDER_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_order_address` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned DEFAULT 'NULL',
	`customer_address_id` int(11) DEFAULT 'NULL',
	`quote_address_id` int(11) DEFAULT 'NULL',
	`region_id` int(11) DEFAULT 'NULL',
	`customer_id` int(11) DEFAULT 'NULL',
	`fax` varchar(255) DEFAULT 'NULL',
	`region` varchar(255) DEFAULT 'NULL',
	`postcode` varchar(255) DEFAULT 'NULL',
	`lastname` varchar(255) DEFAULT 'NULL',
	`street` varchar(255) DEFAULT 'NULL',
	`city` varchar(255) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`telephone` varchar(255) DEFAULT 'NULL',
	`country_id` varchar(2) DEFAULT 'NULL',
	`firstname` varchar(255) DEFAULT 'NULL',
	`address_type` varchar(255) DEFAULT 'NULL',
	`prefix` varchar(255) DEFAULT 'NULL',
	`middlename` varchar(255) DEFAULT 'NULL',
	`suffix` varchar(255) DEFAULT 'NULL',
	`company` varchar(255) DEFAULT 'NULL',
	`vat_id` text DEFAULT 'NULL',
	`vat_is_valid` smallint(6) DEFAULT 'NULL',
	`vat_request_id` text DEFAULT 'NULL',
	`vat_request_date` text DEFAULT 'NULL',
	`vat_request_success` smallint(6) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_order_aggregated_created` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) NOT NULL,
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`total_qty_ordered` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_qty_invoiced` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_income_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_revenue_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_profit_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_invoiced_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_canceled_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_paid_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_refunded_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_tax_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_tax_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_shipping_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_shipping_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_discount_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_discount_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `SALES_ORDER_AGGREGATED_CREATED_PERIOD_STORE_ID_ORDER_STATUS` UNIQUE(`period`,`store_id`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `sales_order_aggregated_updated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) NOT NULL,
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`total_qty_ordered` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_qty_invoiced` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`total_income_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_revenue_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_profit_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_invoiced_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_canceled_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_paid_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_refunded_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_tax_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_tax_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_shipping_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_shipping_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_discount_amount` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`total_discount_amount_actual` decimal(20,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `SALES_ORDER_AGGREGATED_UPDATED_PERIOD_STORE_ID_ORDER_STATUS` UNIQUE(`period`,`store_id`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `sales_order_data_exporter_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `sales_order_grid` (
	`entity_id` int(10) unsigned NOT NULL,
	`status` varchar(32) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`store_name` varchar(255) DEFAULT 'NULL',
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`base_grand_total` decimal(20,4) DEFAULT 'NULL',
	`base_total_paid` decimal(20,4) DEFAULT 'NULL',
	`grand_total` decimal(20,4) DEFAULT 'NULL',
	`total_paid` decimal(20,4) DEFAULT 'NULL',
	`increment_id` varchar(50) DEFAULT 'NULL',
	`base_currency_code` varchar(3) DEFAULT 'NULL',
	`order_currency_code` varchar(255) DEFAULT 'NULL',
	`shipping_name` varchar(255) DEFAULT 'NULL',
	`billing_name` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`billing_address` varchar(255) DEFAULT 'NULL',
	`shipping_address` varchar(255) DEFAULT 'NULL',
	`shipping_information` varchar(255) DEFAULT 'NULL',
	`customer_email` varchar(255) DEFAULT 'NULL',
	`customer_group` varchar(255) DEFAULT 'NULL',
	`subtotal` decimal(20,4) DEFAULT 'NULL',
	`shipping_and_handling` decimal(20,4) DEFAULT 'NULL',
	`customer_name` varchar(255) DEFAULT 'NULL',
	`payment_method` varchar(255) DEFAULT 'NULL',
	`total_refunded` decimal(20,4) DEFAULT 'NULL',
	`pickup_location_code` varchar(255) DEFAULT 'NULL',
	`dispute_status` varchar(45) DEFAULT 'NULL',
	CONSTRAINT `SALES_ORDER_GRID_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_order_item` (
	`item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int(10) unsigned NOT NULL DEFAULT 0,
	`parent_item_id` int(10) unsigned DEFAULT 'NULL',
	`quote_item_id` int(10) unsigned DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`product_id` int(10) unsigned DEFAULT 'NULL',
	`product_type` varchar(255) DEFAULT 'NULL',
	`product_options` longtext DEFAULT 'NULL',
	`weight` decimal(12,4) DEFAULT '0.0000',
	`is_virtual` smallint(5) unsigned DEFAULT 'NULL',
	`sku` varchar(255) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`applied_rule_ids` text DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`is_qty_decimal` smallint(5) unsigned DEFAULT 'NULL',
	`no_discount` smallint(5) unsigned NOT NULL DEFAULT 0,
	`qty_backordered` decimal(12,4) DEFAULT '0.0000',
	`qty_canceled` decimal(12,4) DEFAULT '0.0000',
	`qty_invoiced` decimal(12,4) DEFAULT '0.0000',
	`qty_ordered` decimal(12,4) DEFAULT '0.0000',
	`qty_refunded` decimal(12,4) DEFAULT '0.0000',
	`qty_shipped` decimal(12,4) DEFAULT '0.0000',
	`base_cost` decimal(12,4) DEFAULT '0.0000',
	`price` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_price` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`original_price` decimal(20,4) DEFAULT 'NULL',
	`base_original_price` decimal(20,4) DEFAULT 'NULL',
	`tax_percent` decimal(12,4) DEFAULT '0.0000',
	`tax_amount` decimal(20,4) DEFAULT '0.0000',
	`base_tax_amount` decimal(20,4) DEFAULT '0.0000',
	`tax_invoiced` decimal(20,4) DEFAULT '0.0000',
	`base_tax_invoiced` decimal(20,4) DEFAULT '0.0000',
	`discount_percent` decimal(12,4) DEFAULT '0.0000',
	`discount_amount` decimal(20,4) DEFAULT '0.0000',
	`base_discount_amount` decimal(20,4) DEFAULT '0.0000',
	`discount_invoiced` decimal(20,4) DEFAULT '0.0000',
	`base_discount_invoiced` decimal(20,4) DEFAULT '0.0000',
	`amount_refunded` decimal(20,4) DEFAULT '0.0000',
	`base_amount_refunded` decimal(20,4) DEFAULT '0.0000',
	`row_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_row_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`row_invoiced` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`base_row_invoiced` decimal(20,4) NOT NULL DEFAULT '0.0000',
	`row_weight` decimal(12,4) DEFAULT '0.0000',
	`base_tax_before_discount` decimal(20,4) DEFAULT 'NULL',
	`tax_before_discount` decimal(20,4) DEFAULT 'NULL',
	`ext_order_item_id` varchar(255) DEFAULT 'NULL',
	`locked_do_invoice` smallint(5) unsigned DEFAULT 'NULL',
	`locked_do_ship` smallint(5) unsigned DEFAULT 'NULL',
	`price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_price_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`base_row_total_incl_tax` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_amount` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_invoiced` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_invoiced` decimal(20,4) DEFAULT 'NULL',
	`discount_tax_compensation_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_discount_tax_compensation_refunded` decimal(20,4) DEFAULT 'NULL',
	`tax_canceled` decimal(12,4) DEFAULT 'NULL',
	`discount_tax_compensation_canceled` decimal(20,4) DEFAULT 'NULL',
	`tax_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_tax_refunded` decimal(20,4) DEFAULT 'NULL',
	`discount_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_discount_refunded` decimal(20,4) DEFAULT 'NULL',
	`gift_message_id` int(11) DEFAULT 'NULL',
	`gift_message_available` int(11) DEFAULT 'NULL',
	`free_shipping` smallint(5) unsigned NOT NULL DEFAULT 0,
	`weee_tax_applied` text DEFAULT 'NULL',
	`weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_applied_row_amount` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_amount` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_applied_row_amnt` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_disposition` decimal(12,4) DEFAULT 'NULL',
	`base_weee_tax_row_disposition` decimal(12,4) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_order_payment` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`base_shipping_captured` decimal(20,4) DEFAULT 'NULL',
	`shipping_captured` decimal(20,4) DEFAULT 'NULL',
	`amount_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_amount_paid` decimal(20,4) DEFAULT 'NULL',
	`amount_canceled` decimal(20,4) DEFAULT 'NULL',
	`base_amount_authorized` decimal(20,4) DEFAULT 'NULL',
	`base_amount_paid_online` decimal(20,4) DEFAULT 'NULL',
	`base_amount_refunded_online` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`shipping_amount` decimal(20,4) DEFAULT 'NULL',
	`amount_paid` decimal(20,4) DEFAULT 'NULL',
	`amount_authorized` decimal(20,4) DEFAULT 'NULL',
	`base_amount_ordered` decimal(20,4) DEFAULT 'NULL',
	`base_shipping_refunded` decimal(20,4) DEFAULT 'NULL',
	`shipping_refunded` decimal(20,4) DEFAULT 'NULL',
	`base_amount_refunded` decimal(20,4) DEFAULT 'NULL',
	`amount_ordered` decimal(20,4) DEFAULT 'NULL',
	`base_amount_canceled` decimal(20,4) DEFAULT 'NULL',
	`quote_payment_id` int(11) DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`cc_exp_month` varchar(12) DEFAULT 'NULL',
	`cc_ss_start_year` varchar(12) DEFAULT 'NULL',
	`echeck_bank_name` varchar(128) DEFAULT 'NULL',
	`method` varchar(128) DEFAULT 'NULL',
	`cc_debug_request_body` varchar(32) DEFAULT 'NULL',
	`cc_secure_verify` varchar(32) DEFAULT 'NULL',
	`protection_eligibility` varchar(32) DEFAULT 'NULL',
	`cc_approval` varchar(32) DEFAULT 'NULL',
	`cc_last_4` varchar(100) DEFAULT 'NULL',
	`cc_status_description` varchar(32) DEFAULT 'NULL',
	`echeck_type` varchar(32) DEFAULT 'NULL',
	`cc_debug_response_serialized` varchar(32) DEFAULT 'NULL',
	`cc_ss_start_month` varchar(128) DEFAULT 'NULL',
	`echeck_account_type` varchar(255) DEFAULT 'NULL',
	`last_trans_id` varchar(255) DEFAULT 'NULL',
	`cc_cid_status` varchar(32) DEFAULT 'NULL',
	`cc_owner` varchar(128) DEFAULT 'NULL',
	`cc_type` varchar(32) DEFAULT 'NULL',
	`po_number` varchar(32) DEFAULT 'NULL',
	`cc_exp_year` varchar(4) DEFAULT 'NULL',
	`cc_status` varchar(4) DEFAULT 'NULL',
	`echeck_routing_number` varchar(32) DEFAULT 'NULL',
	`account_status` varchar(32) DEFAULT 'NULL',
	`anet_trans_method` varchar(32) DEFAULT 'NULL',
	`cc_debug_response_body` varchar(32) DEFAULT 'NULL',
	`cc_ss_issue` varchar(32) DEFAULT 'NULL',
	`echeck_account_name` varchar(32) DEFAULT 'NULL',
	`cc_avs_status` varchar(32) DEFAULT 'NULL',
	`cc_number_enc` varchar(128) DEFAULT 'NULL',
	`cc_trans_id` varchar(32) DEFAULT 'NULL',
	`address_status` varchar(32) DEFAULT 'NULL',
	`additional_information` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_order_status` (
	`status` varchar(32) NOT NULL,
	`label` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_order_status_data_exporter_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` varchar(32) NOT NULL DEFAULT ''''
);
--> statement-breakpoint
CREATE TABLE `sales_order_status_history` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`is_customer_notified` int(11) DEFAULT 'NULL',
	`is_visible_on_front` smallint(5) unsigned NOT NULL DEFAULT 0,
	`comment` text DEFAULT 'NULL',
	`status` varchar(32) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`entity_name` varchar(32) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_order_status_label` (
	`status` varchar(32) NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`label` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales_order_status_state` (
	`status` varchar(32) NOT NULL,
	`state` varchar(32) NOT NULL,
	`is_default` smallint(5) unsigned NOT NULL DEFAULT 0,
	`visible_on_front` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `sales_order_tax` (
	`tax_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int(10) unsigned NOT NULL,
	`code` varchar(255) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`percent` decimal(12,4) DEFAULT 'NULL',
	`amount` decimal(20,4) DEFAULT 'NULL',
	`priority` int(11) NOT NULL,
	`position` int(11) NOT NULL,
	`base_amount` decimal(20,4) DEFAULT 'NULL',
	`process` smallint(6) NOT NULL,
	`base_real_amount` decimal(20,4) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_order_tax_item` (
	`tax_item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`tax_id` int(10) unsigned NOT NULL,
	`item_id` int(10) unsigned DEFAULT 'NULL',
	`tax_percent` decimal(12,4) NOT NULL,
	`amount` decimal(20,4) NOT NULL,
	`base_amount` decimal(20,4) NOT NULL,
	`real_amount` decimal(20,4) NOT NULL,
	`real_base_amount` decimal(20,4) NOT NULL,
	`associated_item_id` int(10) unsigned DEFAULT 'NULL',
	`taxable_item_type` varchar(32) NOT NULL,
	CONSTRAINT `SALES_ORDER_TAX_ITEM_TAX_ID_ITEM_ID` UNIQUE(`tax_id`,`item_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_payment_transaction` (
	`transaction_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL DEFAULT 0,
	`payment_id` int(10) unsigned NOT NULL DEFAULT 0,
	`txn_id` varchar(100) DEFAULT 'NULL',
	`parent_txn_id` varchar(100) DEFAULT 'NULL',
	`txn_type` varchar(15) DEFAULT 'NULL',
	`is_closed` smallint(5) unsigned NOT NULL DEFAULT 1,
	`additional_information` blob DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `SALES_PAYMENT_TRANSACTION_ORDER_ID_PAYMENT_ID_TXN_ID` UNIQUE(`order_id`,`payment_id`,`txn_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_refunded_aggregated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) NOT NULL,
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`refunded` decimal(20,4) DEFAULT 'NULL',
	`online_refunded` decimal(20,4) DEFAULT 'NULL',
	`offline_refunded` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_REFUNDED_AGGREGATED_PERIOD_STORE_ID_ORDER_STATUS` UNIQUE(`period`,`store_id`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `sales_refunded_aggregated_order` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`refunded` decimal(20,4) DEFAULT 'NULL',
	`online_refunded` decimal(20,4) DEFAULT 'NULL',
	`offline_refunded` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_REFUNDED_AGGREGATED_ORDER_PERIOD_STORE_ID_ORDER_STATUS` UNIQUE(`period`,`store_id`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `sales_sequence_meta` (
	`meta_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type` varchar(32) NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`sequence_table` varchar(64) NOT NULL,
	CONSTRAINT `SALES_SEQUENCE_META_ENTITY_TYPE_STORE_ID` UNIQUE(`entity_type`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_sequence_profile` (
	`profile_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`meta_id` int(10) unsigned NOT NULL,
	`prefix` varchar(32) DEFAULT 'NULL',
	`suffix` varchar(32) DEFAULT 'NULL',
	`start_value` int(10) unsigned NOT NULL DEFAULT 1,
	`step` int(10) unsigned NOT NULL DEFAULT 1,
	`max_value` int(10) unsigned NOT NULL,
	`warning_value` int(10) unsigned NOT NULL,
	`is_active` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `SALES_SEQUENCE_PROFILE_META_ID_PREFIX_SUFFIX` UNIQUE(`meta_id`,`prefix`,`suffix`)
);
--> statement-breakpoint
CREATE TABLE `sales_shipment` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`total_weight` decimal(12,4) DEFAULT 'NULL',
	`total_qty` decimal(12,4) DEFAULT 'NULL',
	`email_sent` smallint(5) unsigned DEFAULT 'NULL',
	`send_email` smallint(5) unsigned DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL,
	`customer_id` int(11) DEFAULT 'NULL',
	`shipping_address_id` int(11) DEFAULT 'NULL',
	`billing_address_id` int(11) DEFAULT 'NULL',
	`shipment_status` int(11) DEFAULT 'NULL',
	`increment_id` varchar(50) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`packages` text DEFAULT 'NULL',
	`shipping_label` mediumblob DEFAULT 'NULL',
	`customer_note` text DEFAULT 'NULL',
	`customer_note_notify` smallint(5) unsigned DEFAULT 'NULL',
	CONSTRAINT `SALES_SHIPMENT_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_shipment_comment` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`is_customer_notified` int(11) DEFAULT 'NULL',
	`is_visible_on_front` smallint(5) unsigned NOT NULL DEFAULT 0,
	`comment` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sales_shipment_grid` (
	`entity_id` int(10) unsigned NOT NULL,
	`increment_id` varchar(50) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_increment_id` varchar(32) NOT NULL,
	`order_id` int(10) unsigned NOT NULL,
	`order_created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`customer_name` varchar(128) NOT NULL,
	`total_qty` decimal(12,4) DEFAULT 'NULL',
	`shipment_status` int(11) DEFAULT 'NULL',
	`order_status` varchar(32) DEFAULT 'NULL',
	`billing_address` varchar(255) DEFAULT 'NULL',
	`shipping_address` varchar(255) DEFAULT 'NULL',
	`billing_name` varchar(128) DEFAULT 'NULL',
	`shipping_name` varchar(128) DEFAULT 'NULL',
	`customer_email` varchar(128) DEFAULT 'NULL',
	`customer_group_id` int(11) DEFAULT 'NULL',
	`payment_method` varchar(32) DEFAULT 'NULL',
	`shipping_information` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `SALES_SHIPMENT_GRID_INCREMENT_ID_STORE_ID` UNIQUE(`increment_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `sales_shipment_item` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`row_total` decimal(20,4) DEFAULT 'NULL',
	`price` decimal(20,4) DEFAULT 'NULL',
	`weight` decimal(12,4) DEFAULT 'NULL',
	`qty` decimal(12,4) DEFAULT 'NULL',
	`product_id` int(11) DEFAULT 'NULL',
	`order_item_id` int(11) DEFAULT 'NULL',
	`additional_data` text DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`sku` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `sales_shipment_track` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(10) unsigned NOT NULL,
	`weight` decimal(12,4) DEFAULT 'NULL',
	`qty` decimal(12,4) DEFAULT 'NULL',
	`order_id` int(10) unsigned NOT NULL,
	`track_number` text DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`carrier_code` varchar(32) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sales_shipping_aggregated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`shipping_description` varchar(255) DEFAULT 'NULL',
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`total_shipping` decimal(20,4) DEFAULT 'NULL',
	`total_shipping_actual` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `SALES_SHPP_AGGRED_PERIOD_STORE_ID_ORDER_STS_SHPP_DESCRIPTION` UNIQUE(`period`,`store_id`,`order_status`,`shipping_description`)
);
--> statement-breakpoint
CREATE TABLE `sales_shipping_aggregated_order` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`order_status` varchar(50) DEFAULT 'NULL',
	`shipping_description` varchar(255) DEFAULT 'NULL',
	`orders_count` int(11) NOT NULL DEFAULT 0,
	`total_shipping` decimal(20,4) DEFAULT 'NULL',
	`total_shipping_actual` decimal(20,4) DEFAULT 'NULL',
	CONSTRAINT `UNQ_C05FAE47282EEA68654D0924E946761F` UNIQUE(`period`,`store_id`,`order_status`,`shipping_description`)
);
--> statement-breakpoint
CREATE TABLE `search_query` (
	`query_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`query_text` varchar(255) DEFAULT 'NULL',
	`num_results` int(10) unsigned NOT NULL DEFAULT 0,
	`popularity` int(10) unsigned NOT NULL DEFAULT 0,
	`redirect` varchar(255) DEFAULT 'NULL',
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`display_in_terms` smallint(6) NOT NULL DEFAULT 1,
	`is_active` smallint(6) DEFAULT 1,
	`is_processed` smallint(6) DEFAULT 0,
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `SEARCH_QUERY_QUERY_TEXT_STORE_ID` UNIQUE(`query_text`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `search_synonyms` (
	`group_id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`synonyms` text NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `sendfriend_log` (
	`log_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`ip` bigint(20) unsigned NOT NULL DEFAULT 0,
	`time` int(10) unsigned NOT NULL DEFAULT 0,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `sequence_creditmemo_0` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_creditmemo_1` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_invoice_0` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_invoice_1` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_order_0` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_order_1` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_shipment_0` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sequence_shipment_1` (
	`sequence_value` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`session_id` varchar(255) NOT NULL,
	`session_expires` int(10) unsigned NOT NULL DEFAULT 0,
	`session_data` mediumblob NOT NULL
);
--> statement-breakpoint
CREATE TABLE `setup_module` (
	`module` varchar(50) NOT NULL,
	`schema_version` varchar(50) DEFAULT 'NULL',
	`data_version` varchar(50) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `shipping_tablerate` (
	`pk` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`website_id` int(11) NOT NULL DEFAULT 0,
	`dest_country_id` varchar(4) NOT NULL DEFAULT ''0'',
	`dest_region_id` int(11) NOT NULL DEFAULT 0,
	`dest_zip` varchar(10) NOT NULL DEFAULT ''*'',
	`condition_name` varchar(30) NOT NULL,
	`condition_value` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`price` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`cost` decimal(12,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `UNQ_D60821CDB2AFACEE1566CFC02D0D4CAA` UNIQUE(`website_id`,`dest_country_id`,`dest_region_id`,`dest_zip`,`condition_name`,`condition_value`)
);
--> statement-breakpoint
CREATE TABLE `sitemap` (
	`sitemap_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`sitemap_type` varchar(32) DEFAULT 'NULL',
	`sitemap_filename` varchar(32) DEFAULT 'NULL',
	`sitemap_path` varchar(255) DEFAULT 'NULL',
	`sitemap_time` timestamp DEFAULT 'NULL',
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `store` (
	`store_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(32) DEFAULT 'NULL',
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`group_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`name` varchar(255) NOT NULL,
	`sort_order` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_active` smallint(5) unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `STORE_CODE` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `stores_data_exporter` (
	`id` int(10) unsigned NOT NULL,
	`feed_data` mediumtext NOT NULL,
	`modified_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `stores_data_exporter_index_batches` (
	`batch_number` int(11) NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `stores_data_exporter_index_sequence` (
	`i` int(10) unsigned AUTO_INCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `store_data_exporter_cl` (
	`version_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `store_group` (
	`group_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`name` varchar(255) NOT NULL,
	`root_category_id` int(10) unsigned NOT NULL DEFAULT 0,
	`default_store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`code` varchar(32) DEFAULT 'NULL',
	CONSTRAINT `STORE_GROUP_CODE` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `store_website` (
	`website_id` smallint(5) unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(32) DEFAULT 'NULL',
	`name` varchar(64) DEFAULT 'NULL',
	`sort_order` smallint(5) unsigned NOT NULL DEFAULT 0,
	`default_group_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`is_default` smallint(5) unsigned DEFAULT 0,
	CONSTRAINT `STORE_WEBSITE_CODE` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `tax_calculation` (
	`tax_calculation_id` int(11) AUTO_INCREMENT NOT NULL,
	`tax_calculation_rate_id` int(11) NOT NULL,
	`tax_calculation_rule_id` int(11) NOT NULL,
	`customer_tax_class_id` smallint(6) NOT NULL,
	`product_tax_class_id` smallint(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tax_calculation_rate` (
	`tax_calculation_rate_id` int(11) AUTO_INCREMENT NOT NULL,
	`tax_country_id` varchar(2) NOT NULL,
	`tax_region_id` int(11) NOT NULL,
	`tax_postcode` varchar(21) DEFAULT 'NULL',
	`code` varchar(255) NOT NULL,
	`rate` decimal(12,4) NOT NULL,
	`zip_is_range` smallint(6) DEFAULT 'NULL',
	`zip_from` int(10) unsigned DEFAULT 'NULL',
	`zip_to` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `tax_calculation_rate_title` (
	`tax_calculation_rate_title_id` int(11) AUTO_INCREMENT NOT NULL,
	`tax_calculation_rate_id` int(11) NOT NULL,
	`store_id` smallint(5) unsigned NOT NULL,
	`value` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tax_calculation_rule` (
	`tax_calculation_rule_id` int(11) AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`priority` int(11) NOT NULL,
	`position` int(11) NOT NULL,
	`calculate_subtotal` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tax_class` (
	`class_id` smallint(6) AUTO_INCREMENT NOT NULL,
	`class_name` varchar(255) NOT NULL,
	`class_type` varchar(8) NOT NULL DEFAULT ''CUSTOMER''
);
--> statement-breakpoint
CREATE TABLE `tax_order_aggregated_created` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`code` varchar(255) NOT NULL,
	`order_status` varchar(50) NOT NULL,
	`percent` float DEFAULT 'NULL',
	`orders_count` int(10) unsigned NOT NULL DEFAULT 0,
	`tax_base_amount_sum` float DEFAULT 'NULL',
	CONSTRAINT `TAX_ORDER_AGGRED_CREATED_PERIOD_STORE_ID_CODE_PERCENT_ORDER_STS` UNIQUE(`period`,`store_id`,`code`,`percent`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `tax_order_aggregated_updated` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`period` date DEFAULT 'NULL',
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`code` varchar(255) NOT NULL,
	`order_status` varchar(50) NOT NULL,
	`percent` float DEFAULT 'NULL',
	`orders_count` int(10) unsigned NOT NULL DEFAULT 0,
	`tax_base_amount_sum` float DEFAULT 'NULL',
	CONSTRAINT `TAX_ORDER_AGGRED_UPDATED_PERIOD_STORE_ID_CODE_PERCENT_ORDER_STS` UNIQUE(`period`,`store_id`,`code`,`percent`,`order_status`)
);
--> statement-breakpoint
CREATE TABLE `tfa_country_codes` (
	`country_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(2) NOT NULL,
	`name` varchar(255) NOT NULL,
	`dial_code` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tfa_user_config` (
	`config_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`encoded_providers` text DEFAULT 'NULL',
	`encoded_config` text DEFAULT 'NULL',
	`default_provider` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `theme` (
	`theme_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int(11) DEFAULT 'NULL',
	`theme_path` varchar(255) DEFAULT 'NULL',
	`theme_title` varchar(255) NOT NULL,
	`preview_image` varchar(255) DEFAULT 'NULL',
	`is_featured` tinyint NOT NULL DEFAULT 0,
	`area` varchar(255) NOT NULL,
	`type` smallint(6) NOT NULL,
	`code` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `theme_file` (
	`theme_files_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`theme_id` int(10) unsigned NOT NULL,
	`file_path` varchar(255) DEFAULT 'NULL',
	`file_type` varchar(32) NOT NULL,
	`content` longtext NOT NULL,
	`sort_order` smallint(6) NOT NULL DEFAULT 0,
	`is_temporary` tinyint NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `translation` (
	`key_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`string` varchar(255) NOT NULL DEFAULT ''Translate String'',
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`translate` varchar(255) DEFAULT 'NULL',
	`locale` varchar(20) NOT NULL DEFAULT ''en_US'',
	`crc_string` bigint(20) NOT NULL DEFAULT 1591228201,
	CONSTRAINT `TRANSLATION_STORE_ID_LOCALE_CRC_STRING_STRING` UNIQUE(`store_id`,`locale`,`crc_string`,`string`)
);
--> statement-breakpoint
CREATE TABLE `ui_bookmark` (
	`bookmark_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`namespace` varchar(255) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`current` smallint(6) NOT NULL,
	`title` varchar(255) DEFAULT 'NULL',
	`config` longtext DEFAULT 'NULL',
	`created_at` datetime NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` datetime NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `url_rewrite` (
	`url_rewrite_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`entity_type` varchar(32) NOT NULL,
	`entity_id` int(10) unsigned NOT NULL,
	`request_path` varchar(255) DEFAULT 'NULL',
	`target_path` varchar(255) DEFAULT 'NULL',
	`redirect_type` smallint(5) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL,
	`description` varchar(255) DEFAULT 'NULL',
	`is_autogenerated` smallint(5) unsigned NOT NULL DEFAULT 0,
	`metadata` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `URL_REWRITE_REQUEST_PATH_STORE_ID` UNIQUE(`request_path`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `variable` (
	`variable_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(255) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `VARIABLE_CODE` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `variable_value` (
	`value_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`variable_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`plain_value` text DEFAULT 'NULL',
	`html_value` text DEFAULT 'NULL',
	CONSTRAINT `VARIABLE_VALUE_VARIABLE_ID_STORE_ID` UNIQUE(`variable_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `vault_payment_token` (
	`entity_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned DEFAULT 'NULL',
	`website_id` int(10) unsigned DEFAULT 'NULL',
	`public_hash` varchar(128) NOT NULL,
	`payment_method_code` varchar(128) NOT NULL,
	`type` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`expires_at` timestamp DEFAULT 'NULL',
	`gateway_token` varchar(255) NOT NULL,
	`details` text DEFAULT 'NULL',
	`is_active` tinyint NOT NULL DEFAULT 1,
	`is_visible` tinyint NOT NULL DEFAULT 1,
	CONSTRAINT `VAULT_PAYMENT_TOKEN_PUBLIC_HASH` UNIQUE(`public_hash`),
	CONSTRAINT `VAULT_PAYMENT_TOKEN_PAYMENT_METHOD_CODE_CSTR_ID_GATEWAY_TOKEN` UNIQUE(`payment_method_code`,`customer_id`,`gateway_token`)
);
--> statement-breakpoint
CREATE TABLE `vault_payment_token_order_payment_link` (
	`order_payment_id` int(10) unsigned NOT NULL,
	`payment_token_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weee_tax` (
	`value_id` int(11) AUTO_INCREMENT NOT NULL,
	`website_id` smallint(5) unsigned NOT NULL DEFAULT 0,
	`entity_id` int(10) unsigned NOT NULL DEFAULT 0,
	`country` varchar(2) DEFAULT 'NULL',
	`value` decimal(12,4) NOT NULL DEFAULT '0.0000',
	`state` int(11) NOT NULL DEFAULT 0,
	`attribute_id` smallint(5) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `widget` (
	`widget_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`widget_code` varchar(255) DEFAULT 'NULL',
	`widget_type` varchar(255) DEFAULT 'NULL',
	`parameters` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `widget_instance` (
	`instance_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`instance_type` varchar(255) DEFAULT 'NULL',
	`theme_id` int(10) unsigned NOT NULL,
	`title` varchar(255) DEFAULT 'NULL',
	`store_ids` varchar(255) NOT NULL DEFAULT ''0'',
	`widget_parameters` text DEFAULT 'NULL',
	`sort_order` smallint(5) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `widget_instance_page` (
	`page_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`instance_id` int(10) unsigned NOT NULL DEFAULT 0,
	`page_group` varchar(25) DEFAULT 'NULL',
	`layout_handle` varchar(255) DEFAULT 'NULL',
	`block_reference` varchar(255) DEFAULT 'NULL',
	`page_for` varchar(25) DEFAULT 'NULL',
	`entities` text DEFAULT 'NULL',
	`page_template` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `widget_instance_page_layout` (
	`page_id` int(10) unsigned NOT NULL DEFAULT 0,
	`layout_update_id` int(10) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `wishlist` (
	`wishlist_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` int(10) unsigned NOT NULL DEFAULT 0,
	`shared` smallint(5) unsigned NOT NULL DEFAULT 0,
	`sharing_code` varchar(32) DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `WISHLIST_CUSTOMER_ID` UNIQUE(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `wishlist_item` (
	`wishlist_item_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`wishlist_id` int(10) unsigned NOT NULL DEFAULT 0,
	`product_id` int(10) unsigned NOT NULL DEFAULT 0,
	`store_id` smallint(5) unsigned DEFAULT 'NULL',
	`added_at` timestamp DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`qty` decimal(12,4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wishlist_item_option` (
	`option_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`wishlist_item_id` int(10) unsigned NOT NULL,
	`product_id` int(10) unsigned NOT NULL,
	`code` varchar(255) NOT NULL,
	`value` text DEFAULT 'NULL'
);
--> statement-breakpoint
ALTER TABLE `admin_adobe_ims_webapi` ADD CONSTRAINT `ADMIN_ADOBE_IMS_WEBAPI_ADMIN_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `admin_passwords` ADD CONSTRAINT `ADMIN_PASSWORDS_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `admin_user_expiration` ADD CONSTRAINT `ADMIN_USER_EXPIRATION_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `admin_user_session` ADD CONSTRAINT `ADMIN_USER_SESSION_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `adobe_stock_asset` ADD CONSTRAINT `ADOBE_STOCK_ASSET_CATEGORY_ID_ADOBE_STOCK_CATEGORY_ID` FOREIGN KEY (`category_id`) REFERENCES `adobe_stock_category`(`id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `adobe_stock_asset` ADD CONSTRAINT `ADOBE_STOCK_ASSET_CREATOR_ID_ADOBE_STOCK_CREATOR_ID` FOREIGN KEY (`creator_id`) REFERENCES `adobe_stock_creator`(`id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `adobe_stock_asset` ADD CONSTRAINT `ADOBE_STOCK_ASSET_MEDIA_GALLERY_ID_MEDIA_GALLERY_ASSET_ID` FOREIGN KEY (`media_gallery_id`) REFERENCES `media_gallery_asset`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `adobe_user_profile` ADD CONSTRAINT `ADOBE_USER_PROFILE_ADMIN_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `authorization_rule` ADD CONSTRAINT `AUTHORIZATION_RULE_ROLE_ID_AUTHORIZATION_ROLE_ROLE_ID` FOREIGN KEY (`role_id`) REFERENCES `authorization_role`(`role_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `braintree_transaction_details` ADD CONSTRAINT `BRAINTREE_TRANSACTION_DETAILS_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cataloginventory_stock_item` ADD CONSTRAINT `CATINV_STOCK_ITEM_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cataloginventory_stock_item` ADD CONSTRAINT `CATINV_STOCK_ITEM_STOCK_ID_CATINV_STOCK_STOCK_ID` FOREIGN KEY (`stock_id`) REFERENCES `cataloginventory_stock`(`stock_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalogrule_customer_group` ADD CONSTRAINT `CATALOGRULE_CUSTOMER_GROUP_RULE_ID_CATALOGRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `catalogrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalogrule_customer_group` ADD CONSTRAINT `CATRULE_CSTR_GROUP_CSTR_GROUP_ID_CSTR_GROUP_CSTR_GROUP_ID` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group`(`customer_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalogrule_website` ADD CONSTRAINT `CATALOGRULE_WEBSITE_RULE_ID_CATALOGRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `catalogrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalogrule_website` ADD CONSTRAINT `CATALOGRULE_WEBSITE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalogsearch_recommendations` ADD CONSTRAINT `CATALOGSEARCH_RECOMMENDATIONS_QUERY_ID_SEARCH_QUERY_QUERY_ID` FOREIGN KEY (`query_id`) REFERENCES `search_query`(`query_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalogsearch_recommendations` ADD CONSTRAINT `CATALOGSEARCH_RECOMMENDATIONS_RELATION_ID_SEARCH_QUERY_QUERY_ID` FOREIGN KEY (`relation_id`) REFERENCES `search_query`(`query_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_datetime` ADD CONSTRAINT `CATALOG_CATEGORY_ENTITY_DATETIME_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_datetime` ADD CONSTRAINT `CAT_CTGR_ENTT_DTIME_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_datetime` ADD CONSTRAINT `CAT_CTGR_ENTT_DTIME_ENTT_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_decimal` ADD CONSTRAINT `CATALOG_CATEGORY_ENTITY_DECIMAL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_decimal` ADD CONSTRAINT `CAT_CTGR_ENTT_DEC_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_decimal` ADD CONSTRAINT `CAT_CTGR_ENTT_DEC_ENTT_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_int` ADD CONSTRAINT `CATALOG_CATEGORY_ENTITY_INT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_int` ADD CONSTRAINT `CAT_CTGR_ENTT_INT_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_int` ADD CONSTRAINT `CAT_CTGR_ENTT_INT_ENTT_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_text` ADD CONSTRAINT `CATALOG_CATEGORY_ENTITY_TEXT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_text` ADD CONSTRAINT `CAT_CTGR_ENTT_TEXT_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_text` ADD CONSTRAINT `CAT_CTGR_ENTT_TEXT_ENTT_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_varchar` ADD CONSTRAINT `CATALOG_CATEGORY_ENTITY_VARCHAR_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_varchar` ADD CONSTRAINT `CAT_CTGR_ENTT_VCHR_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_entity_varchar` ADD CONSTRAINT `CAT_CTGR_ENTT_VCHR_ENTT_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_product` ADD CONSTRAINT `CAT_CTGR_PRD_CTGR_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`category_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_category_product` ADD CONSTRAINT `CAT_CTGR_PRD_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_compare_item` ADD CONSTRAINT `CATALOG_COMPARE_ITEM_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_compare_item` ADD CONSTRAINT `CATALOG_COMPARE_ITEM_LIST_ID_CATALOG_COMPARE_LIST_LIST_ID` FOREIGN KEY (`list_id`) REFERENCES `catalog_compare_list`(`list_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_compare_item` ADD CONSTRAINT `CATALOG_COMPARE_ITEM_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_compare_item` ADD CONSTRAINT `CATALOG_COMPARE_ITEM_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_compare_list` ADD CONSTRAINT `CATALOG_COMPARE_LIST_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_eav_attribute` ADD CONSTRAINT `CATALOG_EAV_ATTRIBUTE_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_option` ADD CONSTRAINT `CAT_PRD_BNDL_OPT_PARENT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`parent_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_option_value` ADD CONSTRAINT `CAT_PRD_BNDL_OPT_VAL_OPT_ID_CAT_PRD_BNDL_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `catalog_product_bundle_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_price_index` ADD CONSTRAINT `CAT_PRD_BNDL_PRICE_IDX_CSTR_GROUP_ID_CSTR_GROUP_CSTR_GROUP_ID` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group`(`customer_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_price_index` ADD CONSTRAINT `CAT_PRD_BNDL_PRICE_IDX_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_price_index` ADD CONSTRAINT `CAT_PRD_BNDL_PRICE_IDX_WS_ID_STORE_WS_WS_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_selection` ADD CONSTRAINT `CAT_PRD_BNDL_SELECTION_OPT_ID_CAT_PRD_BNDL_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `catalog_product_bundle_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_selection` ADD CONSTRAINT `CAT_PRD_BNDL_SELECTION_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_selection_price` ADD CONSTRAINT `CAT_PRD_BNDL_SELECTION_PRICE_WS_ID_STORE_WS_WS_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_bundle_selection_price` ADD CONSTRAINT `FK_DCF37523AA05D770A70AA4ED7C2616E4` FOREIGN KEY (`selection_id`) REFERENCES `catalog_product_bundle_selection`(`selection_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_datetime` ADD CONSTRAINT `CATALOG_PRODUCT_ENTITY_DATETIME_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_datetime` ADD CONSTRAINT `CAT_PRD_ENTT_DTIME_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_datetime` ADD CONSTRAINT `CAT_PRD_ENTT_DTIME_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_decimal` ADD CONSTRAINT `CATALOG_PRODUCT_ENTITY_DECIMAL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_decimal` ADD CONSTRAINT `CAT_PRD_ENTT_DEC_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_decimal` ADD CONSTRAINT `CAT_PRD_ENTT_DEC_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_gallery` ADD CONSTRAINT `CATALOG_PRODUCT_ENTITY_GALLERY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_gallery` ADD CONSTRAINT `CAT_PRD_ENTT_GLR_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_gallery` ADD CONSTRAINT `CAT_PRD_ENTT_GLR_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_int` ADD CONSTRAINT `CATALOG_PRODUCT_ENTITY_INT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_int` ADD CONSTRAINT `CAT_PRD_ENTT_INT_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_int` ADD CONSTRAINT `CAT_PRD_ENTT_INT_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery` ADD CONSTRAINT `CAT_PRD_ENTT_MDA_GLR_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value` ADD CONSTRAINT `CAT_PRD_ENTT_MDA_GLR_VAL_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value` ADD CONSTRAINT `CAT_PRD_ENTT_MDA_GLR_VAL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value` ADD CONSTRAINT `CAT_PRD_ENTT_MDA_GLR_VAL_VAL_ID_CAT_PRD_ENTT_MDA_GLR_VAL_ID` FOREIGN KEY (`value_id`) REFERENCES `catalog_product_entity_media_gallery`(`value_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value_to_entity` ADD CONSTRAINT `CAT_PRD_ENTT_MDA_GLR_VAL_TO_ENTT_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value_to_entity` ADD CONSTRAINT `FK_A6C6C8FAA386736921D3A7C4B50B1185` FOREIGN KEY (`value_id`) REFERENCES `catalog_product_entity_media_gallery`(`value_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value_video` ADD CONSTRAINT `CAT_PRD_ENTT_MDA_GLR_VAL_VIDEO_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_media_gallery_value_video` ADD CONSTRAINT `FK_6FDF205946906B0E653E60AA769899F8` FOREIGN KEY (`value_id`) REFERENCES `catalog_product_entity_media_gallery`(`value_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_text` ADD CONSTRAINT `CATALOG_PRODUCT_ENTITY_TEXT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_text` ADD CONSTRAINT `CAT_PRD_ENTT_TEXT_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_text` ADD CONSTRAINT `CAT_PRD_ENTT_TEXT_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_tier_price` ADD CONSTRAINT `CAT_PRD_ENTT_TIER_PRICE_CSTR_GROUP_ID_CSTR_GROUP_CSTR_GROUP_ID` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group`(`customer_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_tier_price` ADD CONSTRAINT `CAT_PRD_ENTT_TIER_PRICE_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_tier_price` ADD CONSTRAINT `CAT_PRD_ENTT_TIER_PRICE_WS_ID_STORE_WS_WS_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_varchar` ADD CONSTRAINT `CATALOG_PRODUCT_ENTITY_VARCHAR_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_varchar` ADD CONSTRAINT `CAT_PRD_ENTT_VCHR_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_entity_varchar` ADD CONSTRAINT `CAT_PRD_ENTT_VCHR_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_frontend_action` ADD CONSTRAINT `CAT_PRD_FRONTEND_ACTION_CSTR_ID_CSTR_ENTT_ENTT_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_frontend_action` ADD CONSTRAINT `CAT_PRD_FRONTEND_ACTION_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_index_tier_price` ADD CONSTRAINT `CAT_PRD_IDX_TIER_PRICE_CSTR_GROUP_ID_CSTR_GROUP_CSTR_GROUP_ID` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group`(`customer_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_index_tier_price` ADD CONSTRAINT `CAT_PRD_IDX_TIER_PRICE_ENTT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_index_tier_price` ADD CONSTRAINT `CAT_PRD_IDX_TIER_PRICE_WS_ID_STORE_WS_WS_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_index_website` ADD CONSTRAINT `CAT_PRD_IDX_WS_WS_ID_STORE_WS_WS_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link` ADD CONSTRAINT `CATALOG_PRODUCT_LINK_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link` ADD CONSTRAINT `CAT_PRD_LNK_LNKED_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`linked_product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link` ADD CONSTRAINT `CAT_PRD_LNK_LNK_TYPE_ID_CAT_PRD_LNK_TYPE_LNK_TYPE_ID` FOREIGN KEY (`link_type_id`) REFERENCES `catalog_product_link_type`(`link_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute` ADD CONSTRAINT `CAT_PRD_LNK_ATTR_LNK_TYPE_ID_CAT_PRD_LNK_TYPE_LNK_TYPE_ID` FOREIGN KEY (`link_type_id`) REFERENCES `catalog_product_link_type`(`link_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute_decimal` ADD CONSTRAINT `CAT_PRD_LNK_ATTR_DEC_LNK_ID_CAT_PRD_LNK_LNK_ID` FOREIGN KEY (`link_id`) REFERENCES `catalog_product_link`(`link_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute_decimal` ADD CONSTRAINT `FK_AB2EFA9A14F7BCF1D5400056203D14B6` FOREIGN KEY (`product_link_attribute_id`) REFERENCES `catalog_product_link_attribute`(`product_link_attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute_int` ADD CONSTRAINT `CAT_PRD_LNK_ATTR_INT_LNK_ID_CAT_PRD_LNK_LNK_ID` FOREIGN KEY (`link_id`) REFERENCES `catalog_product_link`(`link_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute_int` ADD CONSTRAINT `FK_D6D878F8BA2A4282F8DDED7E6E3DE35C` FOREIGN KEY (`product_link_attribute_id`) REFERENCES `catalog_product_link_attribute`(`product_link_attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute_varchar` ADD CONSTRAINT `CAT_PRD_LNK_ATTR_VCHR_LNK_ID_CAT_PRD_LNK_LNK_ID` FOREIGN KEY (`link_id`) REFERENCES `catalog_product_link`(`link_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_link_attribute_varchar` ADD CONSTRAINT `FK_DEE9C4DA61CFCC01DFCF50F0D79CEA51` FOREIGN KEY (`product_link_attribute_id`) REFERENCES `catalog_product_link_attribute`(`product_link_attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option` ADD CONSTRAINT `CAT_PRD_OPT_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_price` ADD CONSTRAINT `CATALOG_PRODUCT_OPTION_PRICE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_price` ADD CONSTRAINT `CAT_PRD_OPT_PRICE_OPT_ID_CAT_PRD_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `catalog_product_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_title` ADD CONSTRAINT `CATALOG_PRODUCT_OPTION_TITLE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_title` ADD CONSTRAINT `CAT_PRD_OPT_TTL_OPT_ID_CAT_PRD_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `catalog_product_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_type_price` ADD CONSTRAINT `CATALOG_PRODUCT_OPTION_TYPE_PRICE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_type_price` ADD CONSTRAINT `FK_B523E3378E8602F376CC415825576B7F` FOREIGN KEY (`option_type_id`) REFERENCES `catalog_product_option_type_value`(`option_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_type_title` ADD CONSTRAINT `CATALOG_PRODUCT_OPTION_TYPE_TITLE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_type_title` ADD CONSTRAINT `FK_C085B9CF2C2A302E8043FDEA1937D6A2` FOREIGN KEY (`option_type_id`) REFERENCES `catalog_product_option_type_value`(`option_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_option_type_value` ADD CONSTRAINT `CAT_PRD_OPT_TYPE_VAL_OPT_ID_CAT_PRD_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `catalog_product_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_relation` ADD CONSTRAINT `CAT_PRD_RELATION_CHILD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`child_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_relation` ADD CONSTRAINT `CAT_PRD_RELATION_PARENT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`parent_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_super_attribute` ADD CONSTRAINT `CAT_PRD_SPR_ATTR_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_super_attribute_label` ADD CONSTRAINT `CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_super_attribute_label` ADD CONSTRAINT `FK_309442281DF7784210ED82B2CC51E5D5` FOREIGN KEY (`product_super_attribute_id`) REFERENCES `catalog_product_super_attribute`(`product_super_attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_super_link` ADD CONSTRAINT `CAT_PRD_SPR_LNK_PARENT_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`parent_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_super_link` ADD CONSTRAINT `CAT_PRD_SPR_LNK_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_website` ADD CONSTRAINT `CATALOG_PRODUCT_WEBSITE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_product_website` ADD CONSTRAINT `CAT_PRD_WS_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_url_rewrite_product_category` ADD CONSTRAINT `CAT_URL_REWRITE_PRD_CTGR_CTGR_ID_CAT_CTGR_ENTT_ENTT_ID` FOREIGN KEY (`category_id`) REFERENCES `catalog_category_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_url_rewrite_product_category` ADD CONSTRAINT `CAT_URL_REWRITE_PRD_CTGR_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `catalog_url_rewrite_product_category` ADD CONSTRAINT `FK_BB79E64705D7F17FE181F23144528FC8` FOREIGN KEY (`url_rewrite_id`) REFERENCES `url_rewrite`(`url_rewrite_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `checkout_agreement_store` ADD CONSTRAINT `CHECKOUT_AGREEMENT_STORE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `checkout_agreement_store` ADD CONSTRAINT `CHKT_AGRT_STORE_AGRT_ID_CHKT_AGRT_AGRT_ID` FOREIGN KEY (`agreement_id`) REFERENCES `checkout_agreement`(`agreement_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cms_block_store` ADD CONSTRAINT `CMS_BLOCK_STORE_BLOCK_ID_CMS_BLOCK_BLOCK_ID` FOREIGN KEY (`block_id`) REFERENCES `cms_block`(`block_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cms_block_store` ADD CONSTRAINT `CMS_BLOCK_STORE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cms_page_store` ADD CONSTRAINT `CMS_PAGE_STORE_PAGE_ID_CMS_PAGE_PAGE_ID` FOREIGN KEY (`page_id`) REFERENCES `cms_page`(`page_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cms_page_store` ADD CONSTRAINT `CMS_PAGE_STORE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity` ADD CONSTRAINT `CUSTOMER_ADDRESS_ENTITY_PARENT_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_datetime` ADD CONSTRAINT `CSTR_ADDR_ENTT_DTIME_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_datetime` ADD CONSTRAINT `CSTR_ADDR_ENTT_DTIME_ENTT_ID_CSTR_ADDR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_address_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_decimal` ADD CONSTRAINT `CSTR_ADDR_ENTT_DEC_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_decimal` ADD CONSTRAINT `CSTR_ADDR_ENTT_DEC_ENTT_ID_CSTR_ADDR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_address_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_int` ADD CONSTRAINT `CSTR_ADDR_ENTT_INT_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_int` ADD CONSTRAINT `CSTR_ADDR_ENTT_INT_ENTT_ID_CSTR_ADDR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_address_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_text` ADD CONSTRAINT `CSTR_ADDR_ENTT_TEXT_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_text` ADD CONSTRAINT `CSTR_ADDR_ENTT_TEXT_ENTT_ID_CSTR_ADDR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_address_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_varchar` ADD CONSTRAINT `CSTR_ADDR_ENTT_VCHR_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_address_entity_varchar` ADD CONSTRAINT `CSTR_ADDR_ENTT_VCHR_ENTT_ID_CSTR_ADDR_ENTT_ENTT_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_address_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_eav_attribute` ADD CONSTRAINT `CUSTOMER_EAV_ATTRIBUTE_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_eav_attribute_website` ADD CONSTRAINT `CSTR_EAV_ATTR_WS_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_eav_attribute_website` ADD CONSTRAINT `CSTR_EAV_ATTR_WS_WS_ID_STORE_WS_WS_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity` ADD CONSTRAINT `CUSTOMER_ENTITY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity` ADD CONSTRAINT `CUSTOMER_ENTITY_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_datetime` ADD CONSTRAINT `CUSTOMER_ENTITY_DATETIME_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_datetime` ADD CONSTRAINT `CUSTOMER_ENTITY_DATETIME_ENTITY_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_decimal` ADD CONSTRAINT `CUSTOMER_ENTITY_DECIMAL_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_decimal` ADD CONSTRAINT `CUSTOMER_ENTITY_DECIMAL_ENTITY_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_int` ADD CONSTRAINT `CUSTOMER_ENTITY_INT_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_int` ADD CONSTRAINT `CUSTOMER_ENTITY_INT_ENTITY_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_text` ADD CONSTRAINT `CUSTOMER_ENTITY_TEXT_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_text` ADD CONSTRAINT `CUSTOMER_ENTITY_TEXT_ENTITY_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_varchar` ADD CONSTRAINT `CUSTOMER_ENTITY_VARCHAR_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_entity_varchar` ADD CONSTRAINT `CUSTOMER_ENTITY_VARCHAR_ENTITY_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer_form_attribute` ADD CONSTRAINT `CUSTOMER_FORM_ATTRIBUTE_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `design_change` ADD CONSTRAINT `DESIGN_CHANGE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `directory_country_region_name` ADD CONSTRAINT `DIR_COUNTRY_REGION_NAME_REGION_ID_DIR_COUNTRY_REGION_REGION_ID` FOREIGN KEY (`region_id`) REFERENCES `directory_country_region`(`region_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link` ADD CONSTRAINT `DOWNLOADABLE_LINK_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_price` ADD CONSTRAINT `DOWNLOADABLE_LINK_PRICE_LINK_ID_DOWNLOADABLE_LINK_LINK_ID` FOREIGN KEY (`link_id`) REFERENCES `downloadable_link`(`link_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_price` ADD CONSTRAINT `DOWNLOADABLE_LINK_PRICE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_purchased` ADD CONSTRAINT `DL_LNK_PURCHASED_CSTR_ID_CSTR_ENTT_ENTT_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_purchased` ADD CONSTRAINT `DOWNLOADABLE_LINK_PURCHASED_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_purchased_item` ADD CONSTRAINT `DL_LNK_PURCHASED_ITEM_ORDER_ITEM_ID_SALES_ORDER_ITEM_ITEM_ID` FOREIGN KEY (`order_item_id`) REFERENCES `sales_order_item`(`item_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_purchased_item` ADD CONSTRAINT `DL_LNK_PURCHASED_ITEM_PURCHASED_ID_DL_LNK_PURCHASED_PURCHASED_ID` FOREIGN KEY (`purchased_id`) REFERENCES `downloadable_link_purchased`(`purchased_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_title` ADD CONSTRAINT `DOWNLOADABLE_LINK_TITLE_LINK_ID_DOWNLOADABLE_LINK_LINK_ID` FOREIGN KEY (`link_id`) REFERENCES `downloadable_link`(`link_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_link_title` ADD CONSTRAINT `DOWNLOADABLE_LINK_TITLE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_sample` ADD CONSTRAINT `DOWNLOADABLE_SAMPLE_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_sample_title` ADD CONSTRAINT `DL_SAMPLE_TTL_SAMPLE_ID_DL_SAMPLE_SAMPLE_ID` FOREIGN KEY (`sample_id`) REFERENCES `downloadable_sample`(`sample_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `downloadable_sample_title` ADD CONSTRAINT `DOWNLOADABLE_SAMPLE_TITLE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute` ADD CONSTRAINT `EAV_ATTRIBUTE_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_group` ADD CONSTRAINT `EAV_ATTR_GROUP_ATTR_SET_ID_EAV_ATTR_SET_ATTR_SET_ID` FOREIGN KEY (`attribute_set_id`) REFERENCES `eav_attribute_set`(`attribute_set_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_label` ADD CONSTRAINT `EAV_ATTRIBUTE_LABEL_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_label` ADD CONSTRAINT `EAV_ATTRIBUTE_LABEL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_option` ADD CONSTRAINT `EAV_ATTRIBUTE_OPTION_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_option_swatch` ADD CONSTRAINT `EAV_ATTRIBUTE_OPTION_SWATCH_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_option_swatch` ADD CONSTRAINT `EAV_ATTR_OPT_SWATCH_OPT_ID_EAV_ATTR_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `eav_attribute_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_option_value` ADD CONSTRAINT `EAV_ATTRIBUTE_OPTION_VALUE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_option_value` ADD CONSTRAINT `EAV_ATTR_OPT_VAL_OPT_ID_EAV_ATTR_OPT_OPT_ID` FOREIGN KEY (`option_id`) REFERENCES `eav_attribute_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_attribute_set` ADD CONSTRAINT `EAV_ATTRIBUTE_SET_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity` ADD CONSTRAINT `EAV_ENTITY_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity` ADD CONSTRAINT `EAV_ENTITY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_attribute` ADD CONSTRAINT `EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_attribute` ADD CONSTRAINT `EAV_ENTT_ATTR_ATTR_GROUP_ID_EAV_ATTR_GROUP_ATTR_GROUP_ID` FOREIGN KEY (`attribute_group_id`) REFERENCES `eav_attribute_group`(`attribute_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_datetime` ADD CONSTRAINT `EAV_ENTITY_DATETIME_ENTITY_ID_EAV_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `eav_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_datetime` ADD CONSTRAINT `EAV_ENTITY_DATETIME_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_datetime` ADD CONSTRAINT `EAV_ENTT_DTIME_ENTT_TYPE_ID_EAV_ENTT_TYPE_ENTT_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_decimal` ADD CONSTRAINT `EAV_ENTITY_DECIMAL_ENTITY_ID_EAV_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `eav_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_decimal` ADD CONSTRAINT `EAV_ENTITY_DECIMAL_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_decimal` ADD CONSTRAINT `EAV_ENTITY_DECIMAL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_int` ADD CONSTRAINT `EAV_ENTITY_INT_ENTITY_ID_EAV_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `eav_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_int` ADD CONSTRAINT `EAV_ENTITY_INT_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_int` ADD CONSTRAINT `EAV_ENTITY_INT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_store` ADD CONSTRAINT `EAV_ENTITY_STORE_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_store` ADD CONSTRAINT `EAV_ENTITY_STORE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_text` ADD CONSTRAINT `EAV_ENTITY_TEXT_ENTITY_ID_EAV_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `eav_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_text` ADD CONSTRAINT `EAV_ENTITY_TEXT_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_text` ADD CONSTRAINT `EAV_ENTITY_TEXT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_varchar` ADD CONSTRAINT `EAV_ENTITY_VARCHAR_ENTITY_ID_EAV_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `eav_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_varchar` ADD CONSTRAINT `EAV_ENTITY_VARCHAR_ENTITY_TYPE_ID_EAV_ENTITY_TYPE_ENTITY_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_entity_varchar` ADD CONSTRAINT `EAV_ENTITY_VARCHAR_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_element` ADD CONSTRAINT `EAV_FORM_ELEMENT_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_element` ADD CONSTRAINT `EAV_FORM_ELEMENT_FIELDSET_ID_EAV_FORM_FIELDSET_FIELDSET_ID` FOREIGN KEY (`fieldset_id`) REFERENCES `eav_form_fieldset`(`fieldset_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_element` ADD CONSTRAINT `EAV_FORM_ELEMENT_TYPE_ID_EAV_FORM_TYPE_TYPE_ID` FOREIGN KEY (`type_id`) REFERENCES `eav_form_type`(`type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_fieldset` ADD CONSTRAINT `EAV_FORM_FIELDSET_TYPE_ID_EAV_FORM_TYPE_TYPE_ID` FOREIGN KEY (`type_id`) REFERENCES `eav_form_type`(`type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_fieldset_label` ADD CONSTRAINT `EAV_FORM_FIELDSET_LABEL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_fieldset_label` ADD CONSTRAINT `EAV_FORM_FSET_LBL_FSET_ID_EAV_FORM_FSET_FSET_ID` FOREIGN KEY (`fieldset_id`) REFERENCES `eav_form_fieldset`(`fieldset_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_type` ADD CONSTRAINT `EAV_FORM_TYPE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_type_entity` ADD CONSTRAINT `EAV_FORM_TYPE_ENTITY_TYPE_ID_EAV_FORM_TYPE_TYPE_ID` FOREIGN KEY (`type_id`) REFERENCES `eav_form_type`(`type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `eav_form_type_entity` ADD CONSTRAINT `EAV_FORM_TYPE_ENTT_ENTT_TYPE_ID_EAV_ENTT_TYPE_ENTT_TYPE_ID` FOREIGN KEY (`entity_type_id`) REFERENCES `eav_entity_type`(`entity_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `googleoptimizer_code` ADD CONSTRAINT `GOOGLEOPTIMIZER_CODE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `integration` ADD CONSTRAINT `INTEGRATION_CONSUMER_ID_OAUTH_CONSUMER_ENTITY_ID` FOREIGN KEY (`consumer_id`) REFERENCES `oauth_consumer`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_order_notification` ADD CONSTRAINT `INVENTORY_ORDER_NOTIFICATION_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_pickup_location_order` ADD CONSTRAINT `INVENTORY_PICKUP_LOCATION_ORDER_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_pickup_location_quote_address` ADD CONSTRAINT `INV_PICKUP_LOCATION_QUOTE_ADDR_ADDR_ID_QUOTE_ADDR_ADDR_ID` FOREIGN KEY (`address_id`) REFERENCES `quote_address`(`address_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_source_carrier_link` ADD CONSTRAINT `INV_SOURCE_CARRIER_LNK_SOURCE_CODE_INV_SOURCE_SOURCE_CODE` FOREIGN KEY (`source_code`) REFERENCES `inventory_source`(`source_code`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_source_item` ADD CONSTRAINT `INVENTORY_SOURCE_ITEM_SOURCE_CODE_INVENTORY_SOURCE_SOURCE_CODE` FOREIGN KEY (`source_code`) REFERENCES `inventory_source`(`source_code`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_source_stock_link` ADD CONSTRAINT `INVENTORY_SOURCE_STOCK_LINK_STOCK_ID_INVENTORY_STOCK_STOCK_ID` FOREIGN KEY (`stock_id`) REFERENCES `inventory_stock`(`stock_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_source_stock_link` ADD CONSTRAINT `INV_SOURCE_STOCK_LNK_SOURCE_CODE_INV_SOURCE_SOURCE_CODE` FOREIGN KEY (`source_code`) REFERENCES `inventory_source`(`source_code`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory_stock_sales_channel` ADD CONSTRAINT `INVENTORY_STOCK_SALES_CHANNEL_STOCK_ID_INVENTORY_STOCK_STOCK_ID` FOREIGN KEY (`stock_id`) REFERENCES `inventory_stock`(`stock_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `layout_link` ADD CONSTRAINT `LAYOUT_LINK_LAYOUT_UPDATE_ID_LAYOUT_UPDATE_LAYOUT_UPDATE_ID` FOREIGN KEY (`layout_update_id`) REFERENCES `layout_update`(`layout_update_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `layout_link` ADD CONSTRAINT `LAYOUT_LINK_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `layout_link` ADD CONSTRAINT `LAYOUT_LINK_THEME_ID_THEME_THEME_ID` FOREIGN KEY (`theme_id`) REFERENCES `theme`(`theme_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `login_as_customer_assistance_allowed` ADD CONSTRAINT `LOGIN_AS_CSTR_ASSISTANCE_ALLOWED_CSTR_ID_CSTR_ENTT_ENTT_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `magento_acknowledged_bulk` ADD CONSTRAINT `MAGENTO_ACKNOWLEDGED_BULK_BULK_UUID_MAGENTO_BULK_UUID` FOREIGN KEY (`bulk_uuid`) REFERENCES `magento_bulk`(`uuid`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `magento_operation` ADD CONSTRAINT `MAGENTO_OPERATION_BULK_UUID_MAGENTO_BULK_UUID` FOREIGN KEY (`bulk_uuid`) REFERENCES `magento_bulk`(`uuid`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `media_gallery_asset_keyword` ADD CONSTRAINT `MEDIA_GALLERY_ASSET_KEYWORD_ASSET_ID_MEDIA_GALLERY_ASSET_ID` FOREIGN KEY (`asset_id`) REFERENCES `media_gallery_asset`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `media_gallery_asset_keyword` ADD CONSTRAINT `MEDIA_GALLERY_ASSET_KEYWORD_KEYWORD_ID_MEDIA_GALLERY_KEYWORD_ID` FOREIGN KEY (`keyword_id`) REFERENCES `media_gallery_keyword`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_problem` ADD CONSTRAINT `NEWSLETTER_PROBLEM_QUEUE_ID_NEWSLETTER_QUEUE_QUEUE_ID` FOREIGN KEY (`queue_id`) REFERENCES `newsletter_queue`(`queue_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_problem` ADD CONSTRAINT `NLTTR_PROBLEM_SUBSCRIBER_ID_NLTTR_SUBSCRIBER_SUBSCRIBER_ID` FOREIGN KEY (`subscriber_id`) REFERENCES `newsletter_subscriber`(`subscriber_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_queue` ADD CONSTRAINT `NEWSLETTER_QUEUE_TEMPLATE_ID_NEWSLETTER_TEMPLATE_TEMPLATE_ID` FOREIGN KEY (`template_id`) REFERENCES `newsletter_template`(`template_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_queue_link` ADD CONSTRAINT `NEWSLETTER_QUEUE_LINK_QUEUE_ID_NEWSLETTER_QUEUE_QUEUE_ID` FOREIGN KEY (`queue_id`) REFERENCES `newsletter_queue`(`queue_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_queue_link` ADD CONSTRAINT `NLTTR_QUEUE_LNK_SUBSCRIBER_ID_NLTTR_SUBSCRIBER_SUBSCRIBER_ID` FOREIGN KEY (`subscriber_id`) REFERENCES `newsletter_subscriber`(`subscriber_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_queue_store_link` ADD CONSTRAINT `NEWSLETTER_QUEUE_STORE_LINK_QUEUE_ID_NEWSLETTER_QUEUE_QUEUE_ID` FOREIGN KEY (`queue_id`) REFERENCES `newsletter_queue`(`queue_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_queue_store_link` ADD CONSTRAINT `NEWSLETTER_QUEUE_STORE_LINK_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `newsletter_subscriber` ADD CONSTRAINT `NEWSLETTER_SUBSCRIBER_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `oauth_nonce` ADD CONSTRAINT `OAUTH_NONCE_CONSUMER_ID_OAUTH_CONSUMER_ENTITY_ID` FOREIGN KEY (`consumer_id`) REFERENCES `oauth_consumer`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `oauth_token` ADD CONSTRAINT `OAUTH_TOKEN_ADMIN_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`admin_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `oauth_token` ADD CONSTRAINT `OAUTH_TOKEN_CONSUMER_ID_OAUTH_CONSUMER_ENTITY_ID` FOREIGN KEY (`consumer_id`) REFERENCES `oauth_consumer`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `oauth_token` ADD CONSTRAINT `OAUTH_TOKEN_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `paypal_billing_agreement` ADD CONSTRAINT `PAYPAL_BILLING_AGREEMENT_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `paypal_billing_agreement` ADD CONSTRAINT `PAYPAL_BILLING_AGREEMENT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `paypal_billing_agreement_order` ADD CONSTRAINT `PAYPAL_BILLING_AGREEMENT_ORDER_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `paypal_billing_agreement_order` ADD CONSTRAINT `PAYPAL_BILLING_AGRT_ORDER_AGRT_ID_PAYPAL_BILLING_AGRT_AGRT_ID` FOREIGN KEY (`agreement_id`) REFERENCES `paypal_billing_agreement`(`agreement_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `paypal_cert` ADD CONSTRAINT `PAYPAL_CERT_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `paypal_settlement_report_row` ADD CONSTRAINT `FK_E183E488F593E0DE10C6EBFFEBAC9B55` FOREIGN KEY (`report_id`) REFERENCES `paypal_settlement_report`(`report_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `persistent_session` ADD CONSTRAINT `PERSISTENT_SESSION_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `persistent_session` ADD CONSTRAINT `PERSISTENT_SESSION_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_price` ADD CONSTRAINT `PRODUCT_ALERT_PRICE_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_price` ADD CONSTRAINT `PRODUCT_ALERT_PRICE_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_price` ADD CONSTRAINT `PRODUCT_ALERT_PRICE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_price` ADD CONSTRAINT `PRODUCT_ALERT_PRICE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_stock` ADD CONSTRAINT `PRODUCT_ALERT_STOCK_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_stock` ADD CONSTRAINT `PRODUCT_ALERT_STOCK_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_stock` ADD CONSTRAINT `PRODUCT_ALERT_STOCK_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product_alert_stock` ADD CONSTRAINT `PRODUCT_ALERT_STOCK_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `queue_message_status` ADD CONSTRAINT `QUEUE_MESSAGE_STATUS_MESSAGE_ID_QUEUE_MESSAGE_ID` FOREIGN KEY (`message_id`) REFERENCES `queue_message`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `queue_message_status` ADD CONSTRAINT `QUEUE_MESSAGE_STATUS_QUEUE_ID_QUEUE_ID` FOREIGN KEY (`queue_id`) REFERENCES `queue`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote` ADD CONSTRAINT `QUOTE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_address` ADD CONSTRAINT `QUOTE_ADDRESS_QUOTE_ID_QUOTE_ENTITY_ID` FOREIGN KEY (`quote_id`) REFERENCES `quote`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_address_item` ADD CONSTRAINT `QUOTE_ADDRESS_ITEM_QUOTE_ADDRESS_ID_QUOTE_ADDRESS_ADDRESS_ID` FOREIGN KEY (`quote_address_id`) REFERENCES `quote_address`(`address_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_address_item` ADD CONSTRAINT `QUOTE_ADDRESS_ITEM_QUOTE_ITEM_ID_QUOTE_ITEM_ITEM_ID` FOREIGN KEY (`quote_item_id`) REFERENCES `quote_item`(`item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_address_item` ADD CONSTRAINT `QUOTE_ADDR_ITEM_PARENT_ITEM_ID_QUOTE_ADDR_ITEM_ADDR_ITEM_ID` FOREIGN KEY (`parent_item_id`) REFERENCES `quote_address_item`(`address_item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_id_mask` ADD CONSTRAINT `QUOTE_ID_MASK_QUOTE_ID_QUOTE_ENTITY_ID` FOREIGN KEY (`quote_id`) REFERENCES `quote`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_item` ADD CONSTRAINT `QUOTE_ITEM_PARENT_ITEM_ID_QUOTE_ITEM_ITEM_ID` FOREIGN KEY (`parent_item_id`) REFERENCES `quote_item`(`item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_item` ADD CONSTRAINT `QUOTE_ITEM_QUOTE_ID_QUOTE_ENTITY_ID` FOREIGN KEY (`quote_id`) REFERENCES `quote`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_item` ADD CONSTRAINT `QUOTE_ITEM_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_item_option` ADD CONSTRAINT `QUOTE_ITEM_OPTION_ITEM_ID_QUOTE_ITEM_ITEM_ID` FOREIGN KEY (`item_id`) REFERENCES `quote_item`(`item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_payment` ADD CONSTRAINT `QUOTE_PAYMENT_QUOTE_ID_QUOTE_ENTITY_ID` FOREIGN KEY (`quote_id`) REFERENCES `quote`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quote_shipping_rate` ADD CONSTRAINT `QUOTE_SHIPPING_RATE_ADDRESS_ID_QUOTE_ADDRESS_ADDRESS_ID` FOREIGN KEY (`address_id`) REFERENCES `quote_address`(`address_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating` ADD CONSTRAINT `RATING_ENTITY_ID_RATING_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `rating_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_option` ADD CONSTRAINT `RATING_OPTION_RATING_ID_RATING_RATING_ID` FOREIGN KEY (`rating_id`) REFERENCES `rating`(`rating_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_option_vote` ADD CONSTRAINT `RATING_OPTION_VOTE_OPTION_ID_RATING_OPTION_OPTION_ID` FOREIGN KEY (`option_id`) REFERENCES `rating_option`(`option_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_option_vote` ADD CONSTRAINT `RATING_OPTION_VOTE_REVIEW_ID_REVIEW_REVIEW_ID` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_option_vote_aggregated` ADD CONSTRAINT `RATING_OPTION_VOTE_AGGREGATED_RATING_ID_RATING_RATING_ID` FOREIGN KEY (`rating_id`) REFERENCES `rating`(`rating_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_option_vote_aggregated` ADD CONSTRAINT `RATING_OPTION_VOTE_AGGREGATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_store` ADD CONSTRAINT `RATING_STORE_RATING_ID_RATING_RATING_ID` FOREIGN KEY (`rating_id`) REFERENCES `rating`(`rating_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_store` ADD CONSTRAINT `RATING_STORE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_title` ADD CONSTRAINT `RATING_TITLE_RATING_ID_RATING_RATING_ID` FOREIGN KEY (`rating_id`) REFERENCES `rating`(`rating_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rating_title` ADD CONSTRAINT `RATING_TITLE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `release_notification_viewer_log` ADD CONSTRAINT `RELEASE_NOTIFICATION_VIEWER_LOG_VIEWER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`viewer_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_compared_product_index` ADD CONSTRAINT `REPORT_CMPD_PRD_IDX_CSTR_ID_CSTR_ENTT_ENTT_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_compared_product_index` ADD CONSTRAINT `REPORT_CMPD_PRD_IDX_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_compared_product_index` ADD CONSTRAINT `REPORT_COMPARED_PRODUCT_INDEX_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_event` ADD CONSTRAINT `REPORT_EVENT_EVENT_TYPE_ID_REPORT_EVENT_TYPES_EVENT_TYPE_ID` FOREIGN KEY (`event_type_id`) REFERENCES `report_event_types`(`event_type_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_event` ADD CONSTRAINT `REPORT_EVENT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_aggregated_daily` ADD CONSTRAINT `REPORT_VIEWED_PRD_AGGRED_DAILY_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_aggregated_daily` ADD CONSTRAINT `REPORT_VIEWED_PRODUCT_AGGREGATED_DAILY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_aggregated_monthly` ADD CONSTRAINT `REPORT_VIEWED_PRD_AGGRED_MONTHLY_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_aggregated_monthly` ADD CONSTRAINT `REPORT_VIEWED_PRODUCT_AGGREGATED_MONTHLY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_aggregated_yearly` ADD CONSTRAINT `REPORT_VIEWED_PRD_AGGRED_YEARLY_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_aggregated_yearly` ADD CONSTRAINT `REPORT_VIEWED_PRODUCT_AGGREGATED_YEARLY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_index` ADD CONSTRAINT `REPORT_VIEWED_PRD_IDX_CSTR_ID_CSTR_ENTT_ENTT_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_index` ADD CONSTRAINT `REPORT_VIEWED_PRD_IDX_PRD_ID_CAT_PRD_ENTT_ENTT_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `report_viewed_product_index` ADD CONSTRAINT `REPORT_VIEWED_PRODUCT_INDEX_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review` ADD CONSTRAINT `REVIEW_ENTITY_ID_REVIEW_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `review_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review` ADD CONSTRAINT `REVIEW_STATUS_ID_REVIEW_STATUS_STATUS_ID` FOREIGN KEY (`status_id`) REFERENCES `review_status`(`status_id`) ON DELETE no action ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review_detail` ADD CONSTRAINT `REVIEW_DETAIL_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review_detail` ADD CONSTRAINT `REVIEW_DETAIL_REVIEW_ID_REVIEW_REVIEW_ID` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review_detail` ADD CONSTRAINT `REVIEW_DETAIL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review_entity_summary` ADD CONSTRAINT `REVIEW_ENTITY_SUMMARY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review_store` ADD CONSTRAINT `REVIEW_STORE_REVIEW_ID_REVIEW_REVIEW_ID` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `review_store` ADD CONSTRAINT `REVIEW_STORE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_coupon` ADD CONSTRAINT `SALESRULE_COUPON_RULE_ID_SALESRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `salesrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_coupon_aggregated` ADD CONSTRAINT `SALESRULE_COUPON_AGGREGATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_coupon_aggregated_order` ADD CONSTRAINT `SALESRULE_COUPON_AGGREGATED_ORDER_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_coupon_aggregated_updated` ADD CONSTRAINT `SALESRULE_COUPON_AGGREGATED_UPDATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_coupon_usage` ADD CONSTRAINT `SALESRULE_COUPON_USAGE_COUPON_ID_SALESRULE_COUPON_COUPON_ID` FOREIGN KEY (`coupon_id`) REFERENCES `salesrule_coupon`(`coupon_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_coupon_usage` ADD CONSTRAINT `SALESRULE_COUPON_USAGE_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_customer` ADD CONSTRAINT `SALESRULE_CUSTOMER_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_customer` ADD CONSTRAINT `SALESRULE_CUSTOMER_RULE_ID_SALESRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `salesrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_customer_group` ADD CONSTRAINT `SALESRULE_CSTR_GROUP_CSTR_GROUP_ID_CSTR_GROUP_CSTR_GROUP_ID` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group`(`customer_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_customer_group` ADD CONSTRAINT `SALESRULE_CUSTOMER_GROUP_RULE_ID_SALESRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `salesrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_label` ADD CONSTRAINT `SALESRULE_LABEL_RULE_ID_SALESRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `salesrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_label` ADD CONSTRAINT `SALESRULE_LABEL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_product_attribute` ADD CONSTRAINT `SALESRULE_PRD_ATTR_ATTR_ID_EAV_ATTR_ATTR_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_product_attribute` ADD CONSTRAINT `SALESRULE_PRD_ATTR_CSTR_GROUP_ID_CSTR_GROUP_CSTR_GROUP_ID` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group`(`customer_group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_product_attribute` ADD CONSTRAINT `SALESRULE_PRODUCT_ATTRIBUTE_RULE_ID_SALESRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `salesrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_product_attribute` ADD CONSTRAINT `SALESRULE_PRODUCT_ATTRIBUTE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_website` ADD CONSTRAINT `SALESRULE_WEBSITE_RULE_ID_SALESRULE_RULE_ID` FOREIGN KEY (`rule_id`) REFERENCES `salesrule`(`rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `salesrule_website` ADD CONSTRAINT `SALESRULE_WEBSITE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_bestsellers_aggregated_daily` ADD CONSTRAINT `SALES_BESTSELLERS_AGGREGATED_DAILY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_bestsellers_aggregated_monthly` ADD CONSTRAINT `SALES_BESTSELLERS_AGGREGATED_MONTHLY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_bestsellers_aggregated_yearly` ADD CONSTRAINT `SALES_BESTSELLERS_AGGREGATED_YEARLY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_creditmemo` ADD CONSTRAINT `SALES_CREDITMEMO_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_creditmemo` ADD CONSTRAINT `SALES_CREDITMEMO_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_creditmemo_comment` ADD CONSTRAINT `SALES_CREDITMEMO_COMMENT_PARENT_ID_SALES_CREDITMEMO_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_creditmemo`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_creditmemo_item` ADD CONSTRAINT `SALES_CREDITMEMO_ITEM_PARENT_ID_SALES_CREDITMEMO_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_creditmemo`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_invoice` ADD CONSTRAINT `SALES_INVOICE_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_invoice` ADD CONSTRAINT `SALES_INVOICE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_invoiced_aggregated` ADD CONSTRAINT `SALES_INVOICED_AGGREGATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_invoiced_aggregated_order` ADD CONSTRAINT `SALES_INVOICED_AGGREGATED_ORDER_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_invoice_comment` ADD CONSTRAINT `SALES_INVOICE_COMMENT_PARENT_ID_SALES_INVOICE_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_invoice`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_invoice_item` ADD CONSTRAINT `SALES_INVOICE_ITEM_PARENT_ID_SALES_INVOICE_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_invoice`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order` ADD CONSTRAINT `SALES_ORDER_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order` ADD CONSTRAINT `SALES_ORDER_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_address` ADD CONSTRAINT `SALES_ORDER_ADDRESS_PARENT_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_aggregated_created` ADD CONSTRAINT `SALES_ORDER_AGGREGATED_CREATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_aggregated_updated` ADD CONSTRAINT `SALES_ORDER_AGGREGATED_UPDATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_item` ADD CONSTRAINT `SALES_ORDER_ITEM_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_item` ADD CONSTRAINT `SALES_ORDER_ITEM_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_payment` ADD CONSTRAINT `SALES_ORDER_PAYMENT_PARENT_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_status_history` ADD CONSTRAINT `SALES_ORDER_STATUS_HISTORY_PARENT_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_status_label` ADD CONSTRAINT `SALES_ORDER_STATUS_LABEL_STATUS_SALES_ORDER_STATUS_STATUS` FOREIGN KEY (`status`) REFERENCES `sales_order_status`(`status`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_status_label` ADD CONSTRAINT `SALES_ORDER_STATUS_LABEL_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_status_state` ADD CONSTRAINT `SALES_ORDER_STATUS_STATE_STATUS_SALES_ORDER_STATUS_STATUS` FOREIGN KEY (`status`) REFERENCES `sales_order_status`(`status`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_tax_item` ADD CONSTRAINT `SALES_ORDER_TAX_ITEM_ASSOCIATED_ITEM_ID_SALES_ORDER_ITEM_ITEM_ID` FOREIGN KEY (`associated_item_id`) REFERENCES `sales_order_item`(`item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_tax_item` ADD CONSTRAINT `SALES_ORDER_TAX_ITEM_ITEM_ID_SALES_ORDER_ITEM_ITEM_ID` FOREIGN KEY (`item_id`) REFERENCES `sales_order_item`(`item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_order_tax_item` ADD CONSTRAINT `SALES_ORDER_TAX_ITEM_TAX_ID_SALES_ORDER_TAX_TAX_ID` FOREIGN KEY (`tax_id`) REFERENCES `sales_order_tax`(`tax_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_payment_transaction` ADD CONSTRAINT `FK_B99FF1A06402D725EBDB0F3A7ECD47A2` FOREIGN KEY (`parent_id`) REFERENCES `sales_payment_transaction`(`transaction_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_payment_transaction` ADD CONSTRAINT `SALES_PAYMENT_TRANSACTION_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_payment_transaction` ADD CONSTRAINT `SALES_PAYMENT_TRANSACTION_PAYMENT_ID_SALES_ORDER_PAYMENT_ENTT_ID` FOREIGN KEY (`payment_id`) REFERENCES `sales_order_payment`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_refunded_aggregated` ADD CONSTRAINT `SALES_REFUNDED_AGGREGATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_refunded_aggregated_order` ADD CONSTRAINT `SALES_REFUNDED_AGGREGATED_ORDER_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_sequence_profile` ADD CONSTRAINT `SALES_SEQUENCE_PROFILE_META_ID_SALES_SEQUENCE_META_META_ID` FOREIGN KEY (`meta_id`) REFERENCES `sales_sequence_meta`(`meta_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipment` ADD CONSTRAINT `SALES_SHIPMENT_ORDER_ID_SALES_ORDER_ENTITY_ID` FOREIGN KEY (`order_id`) REFERENCES `sales_order`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipment` ADD CONSTRAINT `SALES_SHIPMENT_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipment_comment` ADD CONSTRAINT `SALES_SHIPMENT_COMMENT_PARENT_ID_SALES_SHIPMENT_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_shipment`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipment_item` ADD CONSTRAINT `SALES_SHIPMENT_ITEM_PARENT_ID_SALES_SHIPMENT_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_shipment`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipment_track` ADD CONSTRAINT `SALES_SHIPMENT_TRACK_PARENT_ID_SALES_SHIPMENT_ENTITY_ID` FOREIGN KEY (`parent_id`) REFERENCES `sales_shipment`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipping_aggregated` ADD CONSTRAINT `SALES_SHIPPING_AGGREGATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sales_shipping_aggregated_order` ADD CONSTRAINT `SALES_SHIPPING_AGGREGATED_ORDER_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `search_query` ADD CONSTRAINT `SEARCH_QUERY_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `search_synonyms` ADD CONSTRAINT `SEARCH_SYNONYMS_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `search_synonyms` ADD CONSTRAINT `SEARCH_SYNONYMS_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sitemap` ADD CONSTRAINT `SITEMAP_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `STORE_GROUP_ID_STORE_GROUP_GROUP_ID` FOREIGN KEY (`group_id`) REFERENCES `store_group`(`group_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `STORE_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `store_group` ADD CONSTRAINT `STORE_GROUP_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_calculation` ADD CONSTRAINT `TAX_CALCULATION_CUSTOMER_TAX_CLASS_ID_TAX_CLASS_CLASS_ID` FOREIGN KEY (`customer_tax_class_id`) REFERENCES `tax_class`(`class_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_calculation` ADD CONSTRAINT `TAX_CALCULATION_PRODUCT_TAX_CLASS_ID_TAX_CLASS_CLASS_ID` FOREIGN KEY (`product_tax_class_id`) REFERENCES `tax_class`(`class_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_calculation` ADD CONSTRAINT `TAX_CALC_TAX_CALC_RATE_ID_TAX_CALC_RATE_TAX_CALC_RATE_ID` FOREIGN KEY (`tax_calculation_rate_id`) REFERENCES `tax_calculation_rate`(`tax_calculation_rate_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_calculation` ADD CONSTRAINT `TAX_CALC_TAX_CALC_RULE_ID_TAX_CALC_RULE_TAX_CALC_RULE_ID` FOREIGN KEY (`tax_calculation_rule_id`) REFERENCES `tax_calculation_rule`(`tax_calculation_rule_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_calculation_rate_title` ADD CONSTRAINT `FK_37FB965F786AD5897BB3AE90470C42AB` FOREIGN KEY (`tax_calculation_rate_id`) REFERENCES `tax_calculation_rate`(`tax_calculation_rate_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_calculation_rate_title` ADD CONSTRAINT `TAX_CALCULATION_RATE_TITLE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_order_aggregated_created` ADD CONSTRAINT `TAX_ORDER_AGGREGATED_CREATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tax_order_aggregated_updated` ADD CONSTRAINT `TAX_ORDER_AGGREGATED_UPDATED_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tfa_user_config` ADD CONSTRAINT `TFA_USER_CONFIG_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `theme_file` ADD CONSTRAINT `THEME_FILE_THEME_ID_THEME_THEME_ID` FOREIGN KEY (`theme_id`) REFERENCES `theme`(`theme_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `translation` ADD CONSTRAINT `TRANSLATION_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `ui_bookmark` ADD CONSTRAINT `UI_BOOKMARK_USER_ID_ADMIN_USER_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `admin_user`(`user_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `variable_value` ADD CONSTRAINT `VARIABLE_VALUE_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `variable_value` ADD CONSTRAINT `VARIABLE_VALUE_VARIABLE_ID_VARIABLE_VARIABLE_ID` FOREIGN KEY (`variable_id`) REFERENCES `variable`(`variable_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `vault_payment_token` ADD CONSTRAINT `VAULT_PAYMENT_TOKEN_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `vault_payment_token_order_payment_link` ADD CONSTRAINT `FK_4ED894655446D385894580BECA993862` FOREIGN KEY (`payment_token_id`) REFERENCES `vault_payment_token`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `vault_payment_token_order_payment_link` ADD CONSTRAINT `FK_CF37B9D854256534BE23C818F6291CA2` FOREIGN KEY (`order_payment_id`) REFERENCES `sales_order_payment`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `weee_tax` ADD CONSTRAINT `WEEE_TAX_ATTRIBUTE_ID_EAV_ATTRIBUTE_ATTRIBUTE_ID` FOREIGN KEY (`attribute_id`) REFERENCES `eav_attribute`(`attribute_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `weee_tax` ADD CONSTRAINT `WEEE_TAX_COUNTRY_DIRECTORY_COUNTRY_COUNTRY_ID` FOREIGN KEY (`country`) REFERENCES `directory_country`(`country_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `weee_tax` ADD CONSTRAINT `WEEE_TAX_ENTITY_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`entity_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `weee_tax` ADD CONSTRAINT `WEEE_TAX_WEBSITE_ID_STORE_WEBSITE_WEBSITE_ID` FOREIGN KEY (`website_id`) REFERENCES `store_website`(`website_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `widget_instance` ADD CONSTRAINT `WIDGET_INSTANCE_THEME_ID_THEME_THEME_ID` FOREIGN KEY (`theme_id`) REFERENCES `theme`(`theme_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `widget_instance_page` ADD CONSTRAINT `WIDGET_INSTANCE_PAGE_INSTANCE_ID_WIDGET_INSTANCE_INSTANCE_ID` FOREIGN KEY (`instance_id`) REFERENCES `widget_instance`(`instance_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `widget_instance_page_layout` ADD CONSTRAINT `WIDGET_INSTANCE_PAGE_LAYOUT_PAGE_ID_WIDGET_INSTANCE_PAGE_PAGE_ID` FOREIGN KEY (`page_id`) REFERENCES `widget_instance_page`(`page_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `widget_instance_page_layout` ADD CONSTRAINT `WIDGET_INSTANCE_PAGE_LYT_LYT_UPDATE_ID_LYT_UPDATE_LYT_UPDATE_ID` FOREIGN KEY (`layout_update_id`) REFERENCES `layout_update`(`layout_update_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `wishlist` ADD CONSTRAINT `WISHLIST_CUSTOMER_ID_CUSTOMER_ENTITY_ENTITY_ID` FOREIGN KEY (`customer_id`) REFERENCES `customer_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `wishlist_item` ADD CONSTRAINT `WISHLIST_ITEM_PRODUCT_ID_CATALOG_PRODUCT_ENTITY_ENTITY_ID` FOREIGN KEY (`product_id`) REFERENCES `catalog_product_entity`(`entity_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `wishlist_item` ADD CONSTRAINT `WISHLIST_ITEM_STORE_ID_STORE_STORE_ID` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `wishlist_item` ADD CONSTRAINT `WISHLIST_ITEM_WISHLIST_ID_WISHLIST_WISHLIST_ID` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist`(`wishlist_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `wishlist_item_option` ADD CONSTRAINT `FK_A014B30B04B72DD0EAB3EECD779728D6` FOREIGN KEY (`wishlist_item_id`) REFERENCES `wishlist_item`(`wishlist_item_id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX `ADMINNOTIFICATION_INBOX_SEVERITY` ON `adminnotification_inbox` (`severity`);--> statement-breakpoint
CREATE INDEX `ADMINNOTIFICATION_INBOX_IS_READ` ON `adminnotification_inbox` (`is_read`);--> statement-breakpoint
CREATE INDEX `ADMINNOTIFICATION_INBOX_IS_REMOVE` ON `adminnotification_inbox` (`is_remove`);--> statement-breakpoint
CREATE INDEX `ADMIN_ADOBE_IMS_WEBAPI_ADMIN_USER_ID` ON `admin_adobe_ims_webapi` (`admin_user_id`);--> statement-breakpoint
CREATE INDEX `ADMIN_PASSWORDS_USER_ID` ON `admin_passwords` (`user_id`);--> statement-breakpoint
CREATE INDEX `ADMIN_USER_SESSION_SESSION_ID` ON `admin_user_session` (`session_id`);--> statement-breakpoint
CREATE INDEX `ADMIN_USER_SESSION_USER_ID` ON `admin_user_session` (`user_id`);--> statement-breakpoint
CREATE INDEX `ADOBE_STOCK_ASSET_ID` ON `adobe_stock_asset` (`id`);--> statement-breakpoint
CREATE INDEX `ADOBE_STOCK_ASSET_CATEGORY_ID` ON `adobe_stock_asset` (`category_id`);--> statement-breakpoint
CREATE INDEX `ADOBE_STOCK_ASSET_CREATOR_ID` ON `adobe_stock_asset` (`creator_id`);--> statement-breakpoint
CREATE INDEX `ADOBE_STOCK_CATEGORY_ID` ON `adobe_stock_category` (`id`);--> statement-breakpoint
CREATE INDEX `ADOBE_STOCK_CREATOR_ID` ON `adobe_stock_creator` (`id`);--> statement-breakpoint
CREATE INDEX `ADOBE_USER_PROFILE_ADMIN_USER_ID` ON `adobe_user_profile` (`admin_user_id`);--> statement-breakpoint
CREATE INDEX `AUTHORIZATION_ROLE_PARENT_ID_SORT_ORDER` ON `authorization_role` (`parent_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `AUTHORIZATION_ROLE_TREE_LEVEL` ON `authorization_role` (`tree_level`);--> statement-breakpoint
CREATE INDEX `AUTHORIZATION_RULE_RESOURCE_ID_ROLE_ID` ON `authorization_rule` (`resource_id`,`role_id`);--> statement-breakpoint
CREATE INDEX `AUTHORIZATION_RULE_ROLE_ID_RESOURCE_ID` ON `authorization_rule` (`role_id`,`resource_id`);--> statement-breakpoint
CREATE INDEX `BRAINTREE_CREDIT_PRICES_PRODUCT_ID` ON `braintree_credit_prices` (`product_id`);--> statement-breakpoint
CREATE INDEX `BRAINTREE_TRANSACTION_DETAILS_ORDER_ID` ON `braintree_transaction_details` (`order_id`);--> statement-breakpoint
CREATE INDEX `CACHE_EXPIRE_TIME` ON `cache` (`expire_time`);--> statement-breakpoint
CREATE INDEX `CACHE_TAG_CACHE_ID` ON `cache_tag` (`cache_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_WEBSITE_ID` ON `cataloginventory_stock` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_ITEM_WEBSITE_ID` ON `cataloginventory_stock_item` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_ITEM_WEBSITE_ID_PRODUCT_ID` ON `cataloginventory_stock_item` (`website_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_ITEM_STOCK_ID` ON `cataloginventory_stock_item` (`stock_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_STOCK_ID` ON `cataloginventory_stock_status` (`stock_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_WEBSITE_ID` ON `cataloginventory_stock_status` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_STOCK_STATUS` ON `cataloginventory_stock_status` (`stock_status`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_IDX_STOCK_ID` ON `cataloginventory_stock_status_idx` (`stock_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_IDX_WEBSITE_ID` ON `cataloginventory_stock_status_idx` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_STOCK_ID` ON `cataloginventory_stock_status_replica` (`stock_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_WEBSITE_ID` ON `cataloginventory_stock_status_replica` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_STOCK_STATUS` ON `cataloginventory_stock_status_replica` (`stock_status`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_TMP_STOCK_ID` ON `cataloginventory_stock_status_tmp` (`stock_id`);--> statement-breakpoint
CREATE INDEX `CATALOGINVENTORY_STOCK_STATUS_TMP_WEBSITE_ID` ON `cataloginventory_stock_status_tmp` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_IS_ACTIVE_SORT_ORDER_TO_DATE_FROM_DATE` ON `catalogrule` (`is_active`,`sort_order`,`to_date`,`from_date`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_CUSTOMER_GROUP_CUSTOMER_GROUP_ID` ON `catalogrule_customer_group` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_GROUP_WEBSITE_CUSTOMER_GROUP_ID` ON `catalogrule_group_website` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_GROUP_WEBSITE_WEBSITE_ID` ON `catalogrule_group_website` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_GROUP_WEBSITE_CUSTOMER_GROUP_ID` ON `catalogrule_group_website_replica` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_GROUP_WEBSITE_WEBSITE_ID` ON `catalogrule_group_website_replica` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_CUSTOMER_GROUP_ID` ON `catalogrule_product` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_WEBSITE_ID` ON `catalogrule_product` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_FROM_TIME` ON `catalogrule_product` (`from_time`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_TO_TIME` ON `catalogrule_product` (`to_time`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRODUCT_ID` ON `catalogrule_product` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRICE_CUSTOMER_GROUP_ID` ON `catalogrule_product_price` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRICE_WEBSITE_ID` ON `catalogrule_product_price` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRICE_PRODUCT_ID` ON `catalogrule_product_price` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRICE_CUSTOMER_GROUP_ID` ON `catalogrule_product_price_replica` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRICE_WEBSITE_ID` ON `catalogrule_product_price_replica` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRICE_PRODUCT_ID` ON `catalogrule_product_price_replica` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_CUSTOMER_GROUP_ID` ON `catalogrule_product_replica` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_WEBSITE_ID` ON `catalogrule_product_replica` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_FROM_TIME` ON `catalogrule_product_replica` (`from_time`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_TO_TIME` ON `catalogrule_product_replica` (`to_time`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_PRODUCT_PRODUCT_ID` ON `catalogrule_product_replica` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOGRULE_WEBSITE_WEBSITE_ID` ON `catalogrule_website` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_LEVEL` ON `catalog_category_entity` (`level`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_PATH` ON `catalog_category_entity` (`path`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_DATETIME_ENTITY_ID` ON `catalog_category_entity_datetime` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_DATETIME_ATTRIBUTE_ID` ON `catalog_category_entity_datetime` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_DATETIME_STORE_ID` ON `catalog_category_entity_datetime` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_DECIMAL_ENTITY_ID` ON `catalog_category_entity_decimal` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_DECIMAL_ATTRIBUTE_ID` ON `catalog_category_entity_decimal` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_DECIMAL_STORE_ID` ON `catalog_category_entity_decimal` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_INT_ENTITY_ID` ON `catalog_category_entity_int` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_INT_ATTRIBUTE_ID` ON `catalog_category_entity_int` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_INT_STORE_ID` ON `catalog_category_entity_int` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_TEXT_ENTITY_ID` ON `catalog_category_entity_text` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_TEXT_ATTRIBUTE_ID` ON `catalog_category_entity_text` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_TEXT_STORE_ID` ON `catalog_category_entity_text` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_VARCHAR_ENTITY_ID` ON `catalog_category_entity_varchar` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_VARCHAR_ATTRIBUTE_ID` ON `catalog_category_entity_varchar` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_ENTITY_VARCHAR_STORE_ID` ON `catalog_category_entity_varchar` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_CATEGORY_PRODUCT_PRODUCT_ID` ON `catalog_category_product` (`product_id`);--> statement-breakpoint
CREATE INDEX `CAT_CTGR_PRD_IDX_PRD_ID_STORE_ID_CTGR_ID_VISIBILITY` ON `catalog_category_product_index` (`product_id`,`store_id`,`category_id`,`visibility`);--> statement-breakpoint
CREATE INDEX `CAT_CTGR_PRD_IDX_STORE_ID_CTGR_ID_VISIBILITY_IS_PARENT_POSITION` ON `catalog_category_product_index` (`store_id`,`category_id`,`visibility`,`is_parent`,`position`);--> statement-breakpoint
CREATE INDEX `CAT_CTGR_PRD_IDX_PRD_ID_STORE_ID_CTGR_ID_VISIBILITY` ON `catalog_category_product_index_replica` (`product_id`,`store_id`,`category_id`,`visibility`);--> statement-breakpoint
CREATE INDEX `CAT_CTGR_PRD_IDX_STORE_ID_CTGR_ID_VISIBILITY_IS_PARENT_POSITION` ON `catalog_category_product_index_replica` (`store_id`,`category_id`,`visibility`,`is_parent`,`position`);--> statement-breakpoint
CREATE INDEX `IDX_4B965DC45C352D6E4C9DC0FF50B1FCF5` ON `catalog_category_product_index_store1` (`product_id`,`store_id`,`category_id`,`visibility`);--> statement-breakpoint
CREATE INDEX `IDX_47AB760CD6A893ACEA69A9C2E0112C60` ON `catalog_category_product_index_store1` (`store_id`,`category_id`,`visibility`,`is_parent`,`position`);--> statement-breakpoint
CREATE INDEX `CAT_CTGR_PRD_IDX_STORE1_PRD_ID_STORE_ID_CTGR_ID_VISIBILITY` ON `catalog_category_product_index_store1_replica` (`product_id`,`store_id`,`category_id`,`visibility`);--> statement-breakpoint
CREATE INDEX `IDX_216E521C8AD125E066D2B0BAB4A08412` ON `catalog_category_product_index_store1_replica` (`store_id`,`category_id`,`visibility`,`is_parent`,`position`);--> statement-breakpoint
CREATE INDEX `CAT_CTGR_PRD_IDX_TMP_PRD_ID_CTGR_ID_STORE_ID` ON `catalog_category_product_index_tmp` (`product_id`,`category_id`,`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_COMPARE_ITEM_PRODUCT_ID` ON `catalog_compare_item` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_COMPARE_ITEM_VISITOR_ID_PRODUCT_ID` ON `catalog_compare_item` (`visitor_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_COMPARE_ITEM_CUSTOMER_ID_PRODUCT_ID` ON `catalog_compare_item` (`customer_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_COMPARE_ITEM_STORE_ID` ON `catalog_compare_item` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_COMPARE_LIST_LIST_ID_MASK` ON `catalog_compare_list` (`list_id_mask`);--> statement-breakpoint
CREATE INDEX `CATALOG_EAV_ATTRIBUTE_USED_FOR_SORT_BY` ON `catalog_eav_attribute` (`used_for_sort_by`);--> statement-breakpoint
CREATE INDEX `CATALOG_EAV_ATTRIBUTE_USED_IN_PRODUCT_LISTING` ON `catalog_eav_attribute` (`used_in_product_listing`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_BUNDLE_OPTION_PARENT_ID` ON `catalog_product_bundle_option` (`parent_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_BUNDLE_PRICE_INDEX_WEBSITE_ID` ON `catalog_product_bundle_price_index` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_BUNDLE_PRICE_INDEX_CUSTOMER_GROUP_ID` ON `catalog_product_bundle_price_index` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_BUNDLE_SELECTION_OPTION_ID` ON `catalog_product_bundle_selection` (`option_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_BUNDLE_SELECTION_PRODUCT_ID` ON `catalog_product_bundle_selection` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_BUNDLE_SELECTION_PRICE_WEBSITE_ID` ON `catalog_product_bundle_selection_price` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_ATTRIBUTE_SET_ID` ON `catalog_product_entity` (`attribute_set_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_SKU` ON `catalog_product_entity` (`sku`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_DATETIME_ATTRIBUTE_ID` ON `catalog_product_entity_datetime` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_DATETIME_STORE_ID` ON `catalog_product_entity_datetime` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_DECIMAL_STORE_ID` ON `catalog_product_entity_decimal` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_DECIMAL_ATTRIBUTE_ID` ON `catalog_product_entity_decimal` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_GALLERY_ENTITY_ID` ON `catalog_product_entity_gallery` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_GALLERY_ATTRIBUTE_ID` ON `catalog_product_entity_gallery` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_GALLERY_STORE_ID` ON `catalog_product_entity_gallery` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_INT_ATTRIBUTE_ID` ON `catalog_product_entity_int` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_INT_STORE_ID` ON `catalog_product_entity_int` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_INT_ATTRIBUTE_ID_STORE_ID_VALUE` ON `catalog_product_entity_int` (`attribute_id`,`store_id`,`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_ATTRIBUTE_ID` ON `catalog_product_entity_media_gallery` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_STORE_ID` ON `catalog_product_entity_media_gallery_value` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_ENTITY_ID` ON `catalog_product_entity_media_gallery_value` (`entity_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_VALUE_ID` ON `catalog_product_entity_media_gallery_value` (`value_id`);--> statement-breakpoint
CREATE INDEX `CAT_PRD_ENTT_MDA_GLR_VAL_ENTT_ID_VAL_ID_STORE_ID` ON `catalog_product_entity_media_gallery_value` (`entity_id`,`value_id`,`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_TEXT_ATTRIBUTE_ID` ON `catalog_product_entity_text` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_TEXT_STORE_ID` ON `catalog_product_entity_text` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_TIER_PRICE_CUSTOMER_GROUP_ID` ON `catalog_product_entity_tier_price` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_TIER_PRICE_WEBSITE_ID` ON `catalog_product_entity_tier_price` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_VARCHAR_ATTRIBUTE_ID` ON `catalog_product_entity_varchar` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_ENTITY_VARCHAR_STORE_ID` ON `catalog_product_entity_varchar` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_ATTRIBUTE_ID` ON `catalog_product_index_eav` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_STORE_ID` ON `catalog_product_index_eav` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_VALUE` ON `catalog_product_index_eav` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_ATTRIBUTE_ID` ON `catalog_product_index_eav_decimal` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_STORE_ID` ON `catalog_product_index_eav_decimal` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_VALUE` ON `catalog_product_index_eav_decimal` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_IDX_ATTRIBUTE_ID` ON `catalog_product_index_eav_decimal_idx` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_IDX_STORE_ID` ON `catalog_product_index_eav_decimal_idx` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_IDX_VALUE` ON `catalog_product_index_eav_decimal_idx` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_ATTRIBUTE_ID` ON `catalog_product_index_eav_decimal_replica` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_STORE_ID` ON `catalog_product_index_eav_decimal_replica` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_VALUE` ON `catalog_product_index_eav_decimal_replica` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_TMP_ATTRIBUTE_ID` ON `catalog_product_index_eav_decimal_tmp` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_TMP_STORE_ID` ON `catalog_product_index_eav_decimal_tmp` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_DECIMAL_TMP_VALUE` ON `catalog_product_index_eav_decimal_tmp` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_IDX_ATTRIBUTE_ID` ON `catalog_product_index_eav_idx` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_IDX_STORE_ID` ON `catalog_product_index_eav_idx` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_IDX_VALUE` ON `catalog_product_index_eav_idx` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_ATTRIBUTE_ID` ON `catalog_product_index_eav_replica` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_STORE_ID` ON `catalog_product_index_eav_replica` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_VALUE` ON `catalog_product_index_eav_replica` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_TMP_ATTRIBUTE_ID` ON `catalog_product_index_eav_tmp` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_TMP_STORE_ID` ON `catalog_product_index_eav_tmp` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_EAV_TMP_VALUE` ON `catalog_product_index_eav_tmp` (`value`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_CUSTOMER_GROUP_ID` ON `catalog_product_index_price` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_MIN_PRICE` ON `catalog_product_index_price` (`min_price`);--> statement-breakpoint
CREATE INDEX `CAT_PRD_IDX_PRICE_WS_ID_CSTR_GROUP_ID_MIN_PRICE` ON `catalog_product_index_price` (`website_id`,`customer_group_id`,`min_price`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_IDX_CUSTOMER_GROUP_ID` ON `catalog_product_index_price_idx` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_IDX_WEBSITE_ID` ON `catalog_product_index_price_idx` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_IDX_MIN_PRICE` ON `catalog_product_index_price_idx` (`min_price`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_CUSTOMER_GROUP_ID` ON `catalog_product_index_price_replica` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_PRICE_MIN_PRICE` ON `catalog_product_index_price_replica` (`min_price`);--> statement-breakpoint
CREATE INDEX `CAT_PRD_IDX_PRICE_WS_ID_CSTR_GROUP_ID_MIN_PRICE` ON `catalog_product_index_price_replica` (`website_id`,`customer_group_id`,`min_price`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_TIER_PRICE_CUSTOMER_GROUP_ID` ON `catalog_product_index_tier_price` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_TIER_PRICE_WEBSITE_ID` ON `catalog_product_index_tier_price` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_INDEX_WEBSITE_WEBSITE_DATE` ON `catalog_product_index_website` (`website_date`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_LINK_PRODUCT_ID` ON `catalog_product_link` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_LINK_LINKED_PRODUCT_ID` ON `catalog_product_link` (`linked_product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_LINK_ATTRIBUTE_LINK_TYPE_ID` ON `catalog_product_link_attribute` (`link_type_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL_LINK_ID` ON `catalog_product_link_attribute_decimal` (`link_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_LINK_ATTRIBUTE_INT_LINK_ID` ON `catalog_product_link_attribute_int` (`link_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR_LINK_ID` ON `catalog_product_link_attribute_varchar` (`link_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_OPTION_PRODUCT_ID` ON `catalog_product_option` (`product_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_OPTION_PRICE_STORE_ID` ON `catalog_product_option_price` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_OPTION_TITLE_STORE_ID` ON `catalog_product_option_title` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_OPTION_TYPE_PRICE_STORE_ID` ON `catalog_product_option_type_price` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_OPTION_TYPE_TITLE_STORE_ID` ON `catalog_product_option_type_title` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_OPTION_TYPE_VALUE_OPTION_ID` ON `catalog_product_option_type_value` (`option_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_RELATION_CHILD_ID` ON `catalog_product_relation` (`child_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_STORE_ID` ON `catalog_product_super_attribute_label` (`store_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_SUPER_LINK_PARENT_ID` ON `catalog_product_super_link` (`parent_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_PRODUCT_WEBSITE_WEBSITE_ID` ON `catalog_product_website` (`website_id`);--> statement-breakpoint
CREATE INDEX `CATALOG_URL_REWRITE_PRODUCT_CATEGORY_CATEGORY_ID_PRODUCT_ID` ON `catalog_url_rewrite_product_category` (`category_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `CMS_BLOCK_IDENTIFIER` ON `cms_block` (`identifier`);--> statement-breakpoint
CREATE INDEX `CMS_BLOCK_TITLE_IDENTIFIER_CONTENT` ON `cms_block` (`title`,`identifier`,`content`);--> statement-breakpoint
CREATE INDEX `CMS_BLOCK_STORE_STORE_ID` ON `cms_block_store` (`store_id`);--> statement-breakpoint
CREATE INDEX `CMS_PAGE_IDENTIFIER` ON `cms_page` (`identifier`);--> statement-breakpoint
CREATE INDEX `CMS_PAGE_TITLE_META_KEYWORDS_META_DESCRIPTION_IDENTIFIER_CONTENT` ON `cms_page` (`title`,`meta_keywords`,`meta_description`,`identifier`,`content`);--> statement-breakpoint
CREATE INDEX `CMS_PAGE_STORE_STORE_ID` ON `cms_page_store` (`store_id`);--> statement-breakpoint
CREATE INDEX `CRON_SCHEDULE_JOB_CODE_STATUS_SCHEDULED_AT` ON `cron_schedule` (`job_code`,`status`,`scheduled_at`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_PARENT_ID` ON `customer_address_entity` (`parent_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_DATETIME_ATTRIBUTE_ID` ON `customer_address_entity_datetime` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_address_entity_datetime` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_DECIMAL_ATTRIBUTE_ID` ON `customer_address_entity_decimal` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_address_entity_decimal` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_INT_ATTRIBUTE_ID` ON `customer_address_entity_int` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_address_entity_int` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_TEXT_ATTRIBUTE_ID` ON `customer_address_entity_text` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_VARCHAR_ATTRIBUTE_ID` ON `customer_address_entity_varchar` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ADDRESS_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_address_entity_varchar` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_EAV_ATTRIBUTE_SORT_ORDER` ON `customer_eav_attribute` (`sort_order`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_EAV_ATTRIBUTE_WEBSITE_WEBSITE_ID` ON `customer_eav_attribute_website` (`website_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_STORE_ID` ON `customer_entity` (`store_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_WEBSITE_ID` ON `customer_entity` (`website_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_FIRSTNAME` ON `customer_entity` (`firstname`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_LASTNAME` ON `customer_entity` (`lastname`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_DATETIME_ATTRIBUTE_ID` ON `customer_entity_datetime` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_entity_datetime` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_DECIMAL_ATTRIBUTE_ID` ON `customer_entity_decimal` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_entity_decimal` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_INT_ATTRIBUTE_ID` ON `customer_entity_int` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_entity_int` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_TEXT_ATTRIBUTE_ID` ON `customer_entity_text` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_VARCHAR_ATTRIBUTE_ID` ON `customer_entity_varchar` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_VALUE` ON `customer_entity_varchar` (`entity_id`,`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_FORM_ATTRIBUTE_ATTRIBUTE_ID` ON `customer_form_attribute` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_GROUP_ID` ON `customer_grid_flat` (`group_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_CREATED_AT` ON `customer_grid_flat` (`created_at`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_WEBSITE_ID` ON `customer_grid_flat` (`website_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_CONFIRMATION` ON `customer_grid_flat` (`confirmation`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_DOB` ON `customer_grid_flat` (`dob`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_GENDER` ON `customer_grid_flat` (`gender`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GRID_FLAT_BILLING_COUNTRY_ID` ON `customer_grid_flat` (`billing_country_id`);--> statement-breakpoint
CREATE INDEX `FTI_8746F705702DD5F6D45B8C7CE7FE9F2F` ON `customer_grid_flat` (`name`,`email`,`created_in`,`taxvat`,`shipping_full`,`billing_full`,`billing_firstname`,`billing_lastname`,`billing_telephone`,`billing_postcode`,`billing_region`,`billing_city`,`billing_fax`,`billing_company`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_GROUP_EXCLUDED_WEBSITE_CUSTOMER_GROUP_ID_WEBSITE_ID` ON `customer_group_excluded_website` (`customer_group_id`,`website_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_VISITOR_CUSTOMER_ID` ON `customer_visitor` (`customer_id`);--> statement-breakpoint
CREATE INDEX `CUSTOMER_VISITOR_LAST_VISIT_AT` ON `customer_visitor` (`last_visit_at`);--> statement-breakpoint
CREATE INDEX `DESIGN_CHANGE_STORE_ID` ON `design_change` (`store_id`);--> statement-breakpoint
CREATE INDEX `DESIGN_CONFIG_GRID_FLAT_STORE_WEBSITE_ID` ON `design_config_grid_flat` (`store_website_id`);--> statement-breakpoint
CREATE INDEX `DESIGN_CONFIG_GRID_FLAT_STORE_GROUP_ID` ON `design_config_grid_flat` (`store_group_id`);--> statement-breakpoint
CREATE INDEX `DESIGN_CONFIG_GRID_FLAT_STORE_ID` ON `design_config_grid_flat` (`store_id`);--> statement-breakpoint
CREATE INDEX `DESIGN_CONFIG_GRID_FLAT_THEME_THEME_ID` ON `design_config_grid_flat` (`theme_theme_id`);--> statement-breakpoint
CREATE INDEX `DIRECTORY_COUNTRY_REGION_COUNTRY_ID` ON `directory_country_region` (`country_id`);--> statement-breakpoint
CREATE INDEX `DIRECTORY_COUNTRY_REGION_NAME_REGION_ID` ON `directory_country_region_name` (`region_id`);--> statement-breakpoint
CREATE INDEX `DIRECTORY_CURRENCY_RATE_CURRENCY_TO` ON `directory_currency_rate` (`currency_to`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PRODUCT_ID_SORT_ORDER` ON `downloadable_link` (`product_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PRICE_LINK_ID` ON `downloadable_link_price` (`link_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PRICE_WEBSITE_ID` ON `downloadable_link_price` (`website_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PURCHASED_ORDER_ID` ON `downloadable_link_purchased` (`order_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PURCHASED_ORDER_ITEM_ID` ON `downloadable_link_purchased` (`order_item_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PURCHASED_CUSTOMER_ID` ON `downloadable_link_purchased` (`customer_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PURCHASED_ITEM_LINK_HASH` ON `downloadable_link_purchased_item` (`link_hash`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PURCHASED_ITEM_ORDER_ITEM_ID` ON `downloadable_link_purchased_item` (`order_item_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_PURCHASED_ITEM_PURCHASED_ID` ON `downloadable_link_purchased_item` (`purchased_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_LINK_TITLE_STORE_ID` ON `downloadable_link_title` (`store_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_SAMPLE_PRODUCT_ID` ON `downloadable_sample` (`product_id`);--> statement-breakpoint
CREATE INDEX `DOWNLOADABLE_SAMPLE_TITLE_STORE_ID` ON `downloadable_sample_title` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_FRONTEND_INPUT_ENTITY_TYPE_ID_IS_USER_DEFINED` ON `eav_attribute` (`frontend_input`,`entity_type_id`,`is_user_defined`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_GROUP_ATTRIBUTE_SET_ID_SORT_ORDER` ON `eav_attribute_group` (`attribute_set_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_LABEL_STORE_ID` ON `eav_attribute_label` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_LABEL_ATTRIBUTE_ID_STORE_ID` ON `eav_attribute_label` (`attribute_id`,`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_OPTION_ATTRIBUTE_ID` ON `eav_attribute_option` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_OPTION_SWATCH_SWATCH_ID` ON `eav_attribute_option_swatch` (`swatch_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_OPTION_VALUE_OPTION_ID` ON `eav_attribute_option_value` (`option_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_OPTION_VALUE_STORE_ID` ON `eav_attribute_option_value` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ATTRIBUTE_SET_ENTITY_TYPE_ID_SORT_ORDER` ON `eav_attribute_set` (`entity_type_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_ENTITY_TYPE_ID` ON `eav_entity` (`entity_type_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_STORE_ID` ON `eav_entity` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_SET_ID_SORT_ORDER` ON `eav_entity_attribute` (`attribute_set_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_ID` ON `eav_entity_attribute` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_DATETIME_STORE_ID` ON `eav_entity_datetime` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_DATETIME_ATTRIBUTE_ID_VALUE` ON `eav_entity_datetime` (`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_DATETIME_ENTITY_TYPE_ID_VALUE` ON `eav_entity_datetime` (`entity_type_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_DECIMAL_STORE_ID` ON `eav_entity_decimal` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_DECIMAL_ATTRIBUTE_ID_VALUE` ON `eav_entity_decimal` (`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_DECIMAL_ENTITY_TYPE_ID_VALUE` ON `eav_entity_decimal` (`entity_type_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_INT_STORE_ID` ON `eav_entity_int` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_INT_ATTRIBUTE_ID_VALUE` ON `eav_entity_int` (`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_INT_ENTITY_TYPE_ID_VALUE` ON `eav_entity_int` (`entity_type_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_STORE_ENTITY_TYPE_ID` ON `eav_entity_store` (`entity_type_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_STORE_STORE_ID` ON `eav_entity_store` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_TEXT_ENTITY_TYPE_ID` ON `eav_entity_text` (`entity_type_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_TEXT_ATTRIBUTE_ID` ON `eav_entity_text` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_TEXT_STORE_ID` ON `eav_entity_text` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_TYPE_ENTITY_TYPE_CODE` ON `eav_entity_type` (`entity_type_code`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_VARCHAR_STORE_ID` ON `eav_entity_varchar` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_VARCHAR_ATTRIBUTE_ID_VALUE` ON `eav_entity_varchar` (`attribute_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_ENTITY_VARCHAR_ENTITY_TYPE_ID_VALUE` ON `eav_entity_varchar` (`entity_type_id`,`value`);--> statement-breakpoint
CREATE INDEX `EAV_FORM_ELEMENT_FIELDSET_ID` ON `eav_form_element` (`fieldset_id`);--> statement-breakpoint
CREATE INDEX `EAV_FORM_ELEMENT_ATTRIBUTE_ID` ON `eav_form_element` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `EAV_FORM_FIELDSET_LABEL_STORE_ID` ON `eav_form_fieldset_label` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_FORM_TYPE_STORE_ID` ON `eav_form_type` (`store_id`);--> statement-breakpoint
CREATE INDEX `EAV_FORM_TYPE_ENTITY_ENTITY_TYPE_ID` ON `eav_form_type_entity` (`entity_type_id`);--> statement-breakpoint
CREATE INDEX `EMAIL_TEMPLATE_ADDED_AT` ON `email_template` (`added_at`);--> statement-breakpoint
CREATE INDEX `EMAIL_TEMPLATE_MODIFIED_AT` ON `email_template` (`modified_at`);--> statement-breakpoint
CREATE INDEX `FLAG_LAST_UPDATE` ON `flag` (`last_update`);--> statement-breakpoint
CREATE INDEX `INDEXER_STATE_INDEXER_ID` ON `indexer_state` (`indexer_id`);--> statement-breakpoint
CREATE INDEX `INVENTORY_RESERVATION_STOCK_ID_SKU_QUANTITY` ON `inventory_reservation` (`stock_id`,`sku`,`quantity`);--> statement-breakpoint
CREATE INDEX `INVENTORY_SOURCE_ITEM_SKU_SOURCE_CODE_QUANTITY` ON `inventory_source_item` (`sku`,`source_code`,`quantity`);--> statement-breakpoint
CREATE INDEX `INVENTORY_SOURCE_STOCK_LINK_STOCK_ID_PRIORITY` ON `inventory_source_stock_link` (`stock_id`,`priority`);--> statement-breakpoint
CREATE INDEX `LAYOUT_LINK_LAYOUT_UPDATE_ID` ON `layout_link` (`layout_update_id`);--> statement-breakpoint
CREATE INDEX `LAYOUT_LINK_STORE_ID_THEME_ID_LAYOUT_UPDATE_ID_IS_TEMPORARY` ON `layout_link` (`store_id`,`theme_id`,`layout_update_id`,`is_temporary`);--> statement-breakpoint
CREATE INDEX `LAYOUT_UPDATE_HANDLE` ON `layout_update` (`handle`);--> statement-breakpoint
CREATE INDEX `LOGIN_AS_CUSTOMER_CREATED_AT` ON `login_as_customer` (`created_at`);--> statement-breakpoint
CREATE INDEX `MAGENTO_BULK_USER_ID` ON `magento_bulk` (`user_id`);--> statement-breakpoint
CREATE INDEX `MAGENTO_BULK_START_TIME` ON `magento_bulk` (`start_time`);--> statement-breakpoint
CREATE INDEX `MAGENTO_LOGIN_AS_CUSTOMER_LOG_USER_ID` ON `magento_login_as_customer_log` (`user_id`);--> statement-breakpoint
CREATE INDEX `MAGENTO_OPERATION_BULK_UUID_ERROR_CODE` ON `magento_operation` (`bulk_uuid`,`error_code`);--> statement-breakpoint
CREATE INDEX `MAGENTO_OPERATION_STATUS_STARTED_AT` ON `magento_operation` (`status`,`started_at`);--> statement-breakpoint
CREATE INDEX `MEDIA_CONTENT_ASSET_ASSET_ID` ON `media_content_asset` (`asset_id`);--> statement-breakpoint
CREATE INDEX `MEDIA_GALLERY_ASSET_ID` ON `media_gallery_asset` (`id`);--> statement-breakpoint
CREATE INDEX `MEDIA_GALLERY_ASSET_TITLE` ON `media_gallery_asset` (`title`);--> statement-breakpoint
CREATE INDEX `MEDIA_GALLERY_ASSET_KEYWORD_ASSET_ID` ON `media_gallery_asset_keyword` (`asset_id`);--> statement-breakpoint
CREATE INDEX `MEDIA_GALLERY_ASSET_KEYWORD_KEYWORD_ID` ON `media_gallery_asset_keyword` (`keyword_id`);--> statement-breakpoint
CREATE INDEX `MEDIA_GALLERY_KEYWORD_ID` ON `media_gallery_keyword` (`id`);--> statement-breakpoint
CREATE INDEX `MVIEW_STATE_VIEW_ID` ON `mview_state` (`view_id`);--> statement-breakpoint
CREATE INDEX `MVIEW_STATE_MODE` ON `mview_state` (`mode`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_PROBLEM_SUBSCRIBER_ID` ON `newsletter_problem` (`subscriber_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_PROBLEM_QUEUE_ID` ON `newsletter_problem` (`queue_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_QUEUE_TEMPLATE_ID` ON `newsletter_queue` (`template_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_QUEUE_LINK_SUBSCRIBER_ID` ON `newsletter_queue_link` (`subscriber_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_QUEUE_LINK_QUEUE_ID_LETTER_SENT_AT` ON `newsletter_queue_link` (`queue_id`,`letter_sent_at`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_QUEUE_STORE_LINK_STORE_ID` ON `newsletter_queue_store_link` (`store_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_SUBSCRIBER_CUSTOMER_ID` ON `newsletter_subscriber` (`customer_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_SUBSCRIBER_STORE_ID` ON `newsletter_subscriber` (`store_id`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_SUBSCRIBER_SUBSCRIBER_EMAIL` ON `newsletter_subscriber` (`subscriber_email`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_TEMPLATE_TEMPLATE_ACTUAL` ON `newsletter_template` (`template_actual`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_TEMPLATE_ADDED_AT` ON `newsletter_template` (`added_at`);--> statement-breakpoint
CREATE INDEX `NEWSLETTER_TEMPLATE_MODIFIED_AT` ON `newsletter_template` (`modified_at`);--> statement-breakpoint
CREATE INDEX `OAUTH_CONSUMER_CREATED_AT` ON `oauth_consumer` (`created_at`);--> statement-breakpoint
CREATE INDEX `OAUTH_CONSUMER_UPDATED_AT` ON `oauth_consumer` (`updated_at`);--> statement-breakpoint
CREATE INDEX `OAUTH_NONCE_TIMESTAMP` ON `oauth_nonce` (`timestamp`);--> statement-breakpoint
CREATE INDEX `OAUTH_TOKEN_CONSUMER_ID` ON `oauth_token` (`consumer_id`);--> statement-breakpoint
CREATE INDEX `OAUTH_TOKEN_CREATED_AT` ON `oauth_token` (`created_at`);--> statement-breakpoint
CREATE INDEX `PAGEBUILDER_TEMPLATE_NAME` ON `pagebuilder_template` (`name`);--> statement-breakpoint
CREATE INDEX `PASSWORD_RESET_REQUEST_EVENT_ACCOUNT_REFERENCE` ON `password_reset_request_event` (`account_reference`);--> statement-breakpoint
CREATE INDEX `PASSWORD_RESET_REQUEST_EVENT_CREATED_AT` ON `password_reset_request_event` (`created_at`);--> statement-breakpoint
CREATE INDEX `PAYPAL_BILLING_AGREEMENT_CUSTOMER_ID` ON `paypal_billing_agreement` (`customer_id`);--> statement-breakpoint
CREATE INDEX `PAYPAL_BILLING_AGREEMENT_STORE_ID` ON `paypal_billing_agreement` (`store_id`);--> statement-breakpoint
CREATE INDEX `PAYPAL_BILLING_AGREEMENT_ORDER_ORDER_ID` ON `paypal_billing_agreement_order` (`order_id`);--> statement-breakpoint
CREATE INDEX `PAYPAL_CERT_WEBSITE_ID` ON `paypal_cert` (`website_id`);--> statement-breakpoint
CREATE INDEX `PAYPAL_SETTLEMENT_REPORT_ROW_REPORT_ID` ON `paypal_settlement_report_row` (`report_id`);--> statement-breakpoint
CREATE INDEX `PERSISTENT_SESSION_UPDATED_AT` ON `persistent_session` (`updated_at`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_PRICE_CUSTOMER_ID` ON `product_alert_price` (`customer_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_PRICE_PRODUCT_ID` ON `product_alert_price` (`product_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_PRICE_WEBSITE_ID` ON `product_alert_price` (`website_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_PRICE_STORE_ID` ON `product_alert_price` (`store_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_STOCK_CUSTOMER_ID` ON `product_alert_stock` (`customer_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_STOCK_PRODUCT_ID` ON `product_alert_stock` (`product_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_STOCK_WEBSITE_ID` ON `product_alert_stock` (`website_id`);--> statement-breakpoint
CREATE INDEX `PRODUCT_ALERT_STOCK_STORE_ID` ON `product_alert_stock` (`store_id`);--> statement-breakpoint
CREATE INDEX `QUEUE_MESSAGE_STATUS_STATUS_UPDATED_AT` ON `queue_message_status` (`status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `QUOTE_CUSTOMER_ID_STORE_ID_IS_ACTIVE` ON `quote` (`customer_id`,`store_id`,`is_active`);--> statement-breakpoint
CREATE INDEX `QUOTE_STORE_ID_UPDATED_AT` ON `quote` (`store_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `QUOTE_ADDRESS_QUOTE_ID` ON `quote_address` (`quote_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ADDRESS_ITEM_QUOTE_ADDRESS_ID` ON `quote_address_item` (`quote_address_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ADDRESS_ITEM_PARENT_ITEM_ID` ON `quote_address_item` (`parent_item_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ADDRESS_ITEM_QUOTE_ITEM_ID` ON `quote_address_item` (`quote_item_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ADDRESS_ITEM_STORE_ID` ON `quote_address_item` (`store_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ID_MASK_QUOTE_ID` ON `quote_id_mask` (`quote_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ID_MASK_MASKED_ID` ON `quote_id_mask` (`masked_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ITEM_PARENT_ITEM_ID` ON `quote_item` (`parent_item_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ITEM_PRODUCT_ID` ON `quote_item` (`product_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ITEM_QUOTE_ID` ON `quote_item` (`quote_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ITEM_STORE_ID` ON `quote_item` (`store_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_ITEM_OPTION_ITEM_ID` ON `quote_item_option` (`item_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_PAYMENT_QUOTE_ID` ON `quote_payment` (`quote_id`);--> statement-breakpoint
CREATE INDEX `QUOTE_SHIPPING_RATE_ADDRESS_ID` ON `quote_shipping_rate` (`address_id`);--> statement-breakpoint
CREATE INDEX `RATING_ENTITY_ID` ON `rating` (`entity_id`);--> statement-breakpoint
CREATE INDEX `RATING_OPTION_RATING_ID` ON `rating_option` (`rating_id`);--> statement-breakpoint
CREATE INDEX `RATING_OPTION_VOTE_OPTION_ID` ON `rating_option_vote` (`option_id`);--> statement-breakpoint
CREATE INDEX `RATING_OPTION_VOTE_AGGREGATED_RATING_ID` ON `rating_option_vote_aggregated` (`rating_id`);--> statement-breakpoint
CREATE INDEX `RATING_OPTION_VOTE_AGGREGATED_STORE_ID` ON `rating_option_vote_aggregated` (`store_id`);--> statement-breakpoint
CREATE INDEX `RATING_STORE_STORE_ID` ON `rating_store` (`store_id`);--> statement-breakpoint
CREATE INDEX `RATING_TITLE_STORE_ID` ON `rating_title` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_COMPARED_PRODUCT_INDEX_STORE_ID` ON `report_compared_product_index` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_COMPARED_PRODUCT_INDEX_ADDED_AT` ON `report_compared_product_index` (`added_at`);--> statement-breakpoint
CREATE INDEX `REPORT_COMPARED_PRODUCT_INDEX_PRODUCT_ID` ON `report_compared_product_index` (`product_id`);--> statement-breakpoint
CREATE INDEX `REPORT_EVENT_EVENT_TYPE_ID` ON `report_event` (`event_type_id`);--> statement-breakpoint
CREATE INDEX `REPORT_EVENT_SUBJECT_ID` ON `report_event` (`subject_id`);--> statement-breakpoint
CREATE INDEX `REPORT_EVENT_OBJECT_ID` ON `report_event` (`object_id`);--> statement-breakpoint
CREATE INDEX `REPORT_EVENT_SUBTYPE` ON `report_event` (`subtype`);--> statement-breakpoint
CREATE INDEX `REPORT_EVENT_STORE_ID` ON `report_event` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_AGGREGATED_DAILY_STORE_ID` ON `report_viewed_product_aggregated_daily` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_AGGREGATED_DAILY_PRODUCT_ID` ON `report_viewed_product_aggregated_daily` (`product_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_AGGREGATED_MONTHLY_STORE_ID` ON `report_viewed_product_aggregated_monthly` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_AGGREGATED_MONTHLY_PRODUCT_ID` ON `report_viewed_product_aggregated_monthly` (`product_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_AGGREGATED_YEARLY_STORE_ID` ON `report_viewed_product_aggregated_yearly` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_AGGREGATED_YEARLY_PRODUCT_ID` ON `report_viewed_product_aggregated_yearly` (`product_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_INDEX_STORE_ID` ON `report_viewed_product_index` (`store_id`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_INDEX_ADDED_AT` ON `report_viewed_product_index` (`added_at`);--> statement-breakpoint
CREATE INDEX `REPORT_VIEWED_PRODUCT_INDEX_PRODUCT_ID` ON `report_viewed_product_index` (`product_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_ENTITY_ID` ON `review` (`entity_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_STATUS_ID` ON `review` (`status_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_ENTITY_PK_VALUE` ON `review` (`entity_pk_value`);--> statement-breakpoint
CREATE INDEX `REVIEW_DETAIL_REVIEW_ID` ON `review_detail` (`review_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_DETAIL_STORE_ID` ON `review_detail` (`store_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_DETAIL_CUSTOMER_ID` ON `review_detail` (`customer_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_ENTITY_SUMMARY_STORE_ID` ON `review_entity_summary` (`store_id`);--> statement-breakpoint
CREATE INDEX `REVIEW_STORE_STORE_ID` ON `review_store` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_IS_ACTIVE_SORT_ORDER_TO_DATE_FROM_DATE` ON `salesrule` (`is_active`,`sort_order`,`to_date`,`from_date`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_RULE_ID` ON `salesrule_coupon` (`rule_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_AGGREGATED_STORE_ID` ON `salesrule_coupon_aggregated` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_AGGREGATED_RULE_NAME` ON `salesrule_coupon_aggregated` (`rule_name`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_AGGREGATED_ORDER_STORE_ID` ON `salesrule_coupon_aggregated_order` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_AGGREGATED_ORDER_RULE_NAME` ON `salesrule_coupon_aggregated_order` (`rule_name`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_AGGREGATED_UPDATED_STORE_ID` ON `salesrule_coupon_aggregated_updated` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_AGGREGATED_UPDATED_RULE_NAME` ON `salesrule_coupon_aggregated_updated` (`rule_name`);--> statement-breakpoint
CREATE INDEX `SALESRULE_COUPON_USAGE_CUSTOMER_ID` ON `salesrule_coupon_usage` (`customer_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_CUSTOMER_RULE_ID_CUSTOMER_ID` ON `salesrule_customer` (`rule_id`,`customer_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_CUSTOMER_CUSTOMER_ID_RULE_ID` ON `salesrule_customer` (`customer_id`,`rule_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_CUSTOMER_GROUP_CUSTOMER_GROUP_ID` ON `salesrule_customer_group` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_LABEL_STORE_ID` ON `salesrule_label` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_PRODUCT_ATTRIBUTE_WEBSITE_ID` ON `salesrule_product_attribute` (`website_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_PRODUCT_ATTRIBUTE_CUSTOMER_GROUP_ID` ON `salesrule_product_attribute` (`customer_group_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_PRODUCT_ATTRIBUTE_ATTRIBUTE_ID` ON `salesrule_product_attribute` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `SALESRULE_WEBSITE_WEBSITE_ID` ON `salesrule_website` (`website_id`);--> statement-breakpoint
CREATE INDEX `SALES_BESTSELLERS_AGGREGATED_DAILY_STORE_ID` ON `sales_bestsellers_aggregated_daily` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_BESTSELLERS_AGGREGATED_DAILY_PRODUCT_ID` ON `sales_bestsellers_aggregated_daily` (`product_id`);--> statement-breakpoint
CREATE INDEX `SALES_BESTSELLERS_AGGREGATED_MONTHLY_STORE_ID` ON `sales_bestsellers_aggregated_monthly` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_BESTSELLERS_AGGREGATED_MONTHLY_PRODUCT_ID` ON `sales_bestsellers_aggregated_monthly` (`product_id`);--> statement-breakpoint
CREATE INDEX `SALES_BESTSELLERS_AGGREGATED_YEARLY_STORE_ID` ON `sales_bestsellers_aggregated_yearly` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_BESTSELLERS_AGGREGATED_YEARLY_PRODUCT_ID` ON `sales_bestsellers_aggregated_yearly` (`product_id`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_STORE_ID` ON `sales_creditmemo` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_ORDER_ID` ON `sales_creditmemo` (`order_id`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_CREDITMEMO_STATUS` ON `sales_creditmemo` (`creditmemo_status`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_STATE` ON `sales_creditmemo` (`state`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_CREATED_AT` ON `sales_creditmemo` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_UPDATED_AT` ON `sales_creditmemo` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_SEND_EMAIL` ON `sales_creditmemo` (`send_email`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_EMAIL_SENT` ON `sales_creditmemo` (`email_sent`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_COMMENT_CREATED_AT` ON `sales_creditmemo_comment` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_COMMENT_PARENT_ID` ON `sales_creditmemo_comment` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_ORDER_INCREMENT_ID` ON `sales_creditmemo_grid` (`order_increment_id`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_CREATED_AT` ON `sales_creditmemo_grid` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_UPDATED_AT` ON `sales_creditmemo_grid` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_ORDER_CREATED_AT` ON `sales_creditmemo_grid` (`order_created_at`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_STATE` ON `sales_creditmemo_grid` (`state`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_BILLING_NAME` ON `sales_creditmemo_grid` (`billing_name`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_ORDER_STATUS` ON `sales_creditmemo_grid` (`order_status`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_BASE_GRAND_TOTAL` ON `sales_creditmemo_grid` (`base_grand_total`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_STORE_ID` ON `sales_creditmemo_grid` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_ORDER_BASE_GRAND_TOTAL` ON `sales_creditmemo_grid` (`order_base_grand_total`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_GRID_ORDER_ID` ON `sales_creditmemo_grid` (`order_id`);--> statement-breakpoint
CREATE INDEX `FTI_32B7BA885941A8254EE84AE650ABDC86` ON `sales_creditmemo_grid` (`increment_id`,`order_increment_id`,`billing_name`,`billing_address`,`shipping_address`,`customer_name`,`customer_email`);--> statement-breakpoint
CREATE INDEX `SALES_CREDITMEMO_ITEM_PARENT_ID` ON `sales_creditmemo_item` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_DATA_EXPORTER_ORDERS_MODIFIED_AT` ON `sales_data_exporter_orders` (`modified_at`);--> statement-breakpoint
CREATE INDEX `SALES_DATA_EXPORTER_ORDER_STATUSES_MODIFIED_AT` ON `sales_data_exporter_order_statuses` (`modified_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_STORE_ID` ON `sales_invoice` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRAND_TOTAL` ON `sales_invoice` (`grand_total`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_ORDER_ID` ON `sales_invoice` (`order_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_STATE` ON `sales_invoice` (`state`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_CREATED_AT` ON `sales_invoice` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_UPDATED_AT` ON `sales_invoice` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_SEND_EMAIL` ON `sales_invoice` (`send_email`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_EMAIL_SENT` ON `sales_invoice` (`email_sent`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICED_AGGREGATED_STORE_ID` ON `sales_invoiced_aggregated` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICED_AGGREGATED_ORDER_STORE_ID` ON `sales_invoiced_aggregated_order` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_COMMENT_CREATED_AT` ON `sales_invoice_comment` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_COMMENT_PARENT_ID` ON `sales_invoice_comment` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_STORE_ID` ON `sales_invoice_grid` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_GRAND_TOTAL` ON `sales_invoice_grid` (`grand_total`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_ORDER_ID` ON `sales_invoice_grid` (`order_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_STATE` ON `sales_invoice_grid` (`state`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_ORDER_INCREMENT_ID` ON `sales_invoice_grid` (`order_increment_id`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_CREATED_AT` ON `sales_invoice_grid` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_UPDATED_AT` ON `sales_invoice_grid` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_ORDER_CREATED_AT` ON `sales_invoice_grid` (`order_created_at`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_BILLING_NAME` ON `sales_invoice_grid` (`billing_name`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_GRID_BASE_GRAND_TOTAL` ON `sales_invoice_grid` (`base_grand_total`);--> statement-breakpoint
CREATE INDEX `FTI_95D9C924DD6A8734EB8B5D01D60F90DE` ON `sales_invoice_grid` (`increment_id`,`order_increment_id`,`billing_name`,`billing_address`,`shipping_address`,`customer_name`,`customer_email`);--> statement-breakpoint
CREATE INDEX `SALES_INVOICE_ITEM_PARENT_ID` ON `sales_invoice_item` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STATUS` ON `sales_order` (`status`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STATE` ON `sales_order` (`state`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STORE_ID` ON `sales_order` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_CREATED_AT` ON `sales_order` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_CUSTOMER_ID` ON `sales_order` (`customer_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_EXT_ORDER_ID` ON `sales_order` (`ext_order_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_QUOTE_ID` ON `sales_order` (`quote_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_UPDATED_AT` ON `sales_order` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_SEND_EMAIL` ON `sales_order` (`send_email`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_EMAIL_SENT` ON `sales_order` (`email_sent`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STORE_ID_STATE_CREATED_AT` ON `sales_order` (`store_id`,`state`,`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_ADDRESS_PARENT_ID` ON `sales_order_address` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_AGGREGATED_CREATED_STORE_ID` ON `sales_order_aggregated_created` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_AGGREGATED_UPDATED_STORE_ID` ON `sales_order_aggregated_updated` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_STATUS` ON `sales_order_grid` (`status`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_STORE_ID` ON `sales_order_grid` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_BASE_GRAND_TOTAL` ON `sales_order_grid` (`base_grand_total`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_BASE_TOTAL_PAID` ON `sales_order_grid` (`base_total_paid`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_GRAND_TOTAL` ON `sales_order_grid` (`grand_total`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_TOTAL_PAID` ON `sales_order_grid` (`total_paid`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_SHIPPING_NAME` ON `sales_order_grid` (`shipping_name`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_BILLING_NAME` ON `sales_order_grid` (`billing_name`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_CREATED_AT` ON `sales_order_grid` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_CUSTOMER_ID` ON `sales_order_grid` (`customer_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_UPDATED_AT` ON `sales_order_grid` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_GRID_PICKUP_LOCATION_CODE` ON `sales_order_grid` (`pickup_location_code`);--> statement-breakpoint
CREATE INDEX `FTI_65B9E9925EC58F0C7C2E2F6379C233E7` ON `sales_order_grid` (`increment_id`,`billing_name`,`shipping_name`,`shipping_address`,`billing_address`,`customer_name`,`customer_email`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_ITEM_ORDER_ID` ON `sales_order_item` (`order_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_ITEM_STORE_ID` ON `sales_order_item` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_PAYMENT_PARENT_ID` ON `sales_order_payment` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STATUS_HISTORY_PARENT_ID` ON `sales_order_status_history` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STATUS_HISTORY_CREATED_AT` ON `sales_order_status_history` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_STATUS_LABEL_STORE_ID` ON `sales_order_status_label` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_TAX_ORDER_ID_PRIORITY_POSITION` ON `sales_order_tax` (`order_id`,`priority`,`position`);--> statement-breakpoint
CREATE INDEX `SALES_ORDER_TAX_ITEM_ITEM_ID` ON `sales_order_tax_item` (`item_id`);--> statement-breakpoint
CREATE INDEX `SALES_PAYMENT_TRANSACTION_PARENT_ID` ON `sales_payment_transaction` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_PAYMENT_TRANSACTION_PAYMENT_ID` ON `sales_payment_transaction` (`payment_id`);--> statement-breakpoint
CREATE INDEX `SALES_REFUNDED_AGGREGATED_STORE_ID` ON `sales_refunded_aggregated` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_REFUNDED_AGGREGATED_ORDER_STORE_ID` ON `sales_refunded_aggregated_order` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_STORE_ID` ON `sales_shipment` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_TOTAL_QTY` ON `sales_shipment` (`total_qty`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_ORDER_ID` ON `sales_shipment` (`order_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_CREATED_AT` ON `sales_shipment` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_UPDATED_AT` ON `sales_shipment` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_SEND_EMAIL` ON `sales_shipment` (`send_email`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_EMAIL_SENT` ON `sales_shipment` (`email_sent`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_COMMENT_CREATED_AT` ON `sales_shipment_comment` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_COMMENT_PARENT_ID` ON `sales_shipment_comment` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_STORE_ID` ON `sales_shipment_grid` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_TOTAL_QTY` ON `sales_shipment_grid` (`total_qty`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_ORDER_INCREMENT_ID` ON `sales_shipment_grid` (`order_increment_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_SHIPMENT_STATUS` ON `sales_shipment_grid` (`shipment_status`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_ORDER_STATUS` ON `sales_shipment_grid` (`order_status`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_CREATED_AT` ON `sales_shipment_grid` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_UPDATED_AT` ON `sales_shipment_grid` (`updated_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_ORDER_CREATED_AT` ON `sales_shipment_grid` (`order_created_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_SHIPPING_NAME` ON `sales_shipment_grid` (`shipping_name`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_BILLING_NAME` ON `sales_shipment_grid` (`billing_name`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_GRID_ORDER_ID` ON `sales_shipment_grid` (`order_id`);--> statement-breakpoint
CREATE INDEX `FTI_086B40C8955F167B8EA76653437879B4` ON `sales_shipment_grid` (`increment_id`,`order_increment_id`,`shipping_name`,`customer_name`,`customer_email`,`billing_address`,`shipping_address`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_ITEM_PARENT_ID` ON `sales_shipment_item` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_TRACK_PARENT_ID` ON `sales_shipment_track` (`parent_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_TRACK_ORDER_ID` ON `sales_shipment_track` (`order_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPMENT_TRACK_CREATED_AT` ON `sales_shipment_track` (`created_at`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPPING_AGGREGATED_STORE_ID` ON `sales_shipping_aggregated` (`store_id`);--> statement-breakpoint
CREATE INDEX `SALES_SHIPPING_AGGREGATED_ORDER_STORE_ID` ON `sales_shipping_aggregated_order` (`store_id`);--> statement-breakpoint
CREATE INDEX `SEARCH_QUERY_QUERY_TEXT_STORE_ID_POPULARITY` ON `search_query` (`query_text`,`store_id`,`popularity`);--> statement-breakpoint
CREATE INDEX `SEARCH_QUERY_IS_PROCESSED` ON `search_query` (`is_processed`);--> statement-breakpoint
CREATE INDEX `SEARCH_QUERY_STORE_ID_NUM_RESULTS_POPULARITY` ON `search_query` (`store_id`,`num_results`,`popularity`);--> statement-breakpoint
CREATE INDEX `SEARCH_SYNONYMS_STORE_ID` ON `search_synonyms` (`store_id`);--> statement-breakpoint
CREATE INDEX `SEARCH_SYNONYMS_WEBSITE_ID` ON `search_synonyms` (`website_id`);--> statement-breakpoint
CREATE INDEX `SEARCH_SYNONYMS_SYNONYMS` ON `search_synonyms` (`synonyms`);--> statement-breakpoint
CREATE INDEX `SENDFRIEND_LOG_IP` ON `sendfriend_log` (`ip`);--> statement-breakpoint
CREATE INDEX `SENDFRIEND_LOG_TIME` ON `sendfriend_log` (`time`);--> statement-breakpoint
CREATE INDEX `SITEMAP_STORE_ID` ON `sitemap` (`store_id`);--> statement-breakpoint
CREATE INDEX `STORE_WEBSITE_ID` ON `store` (`website_id`);--> statement-breakpoint
CREATE INDEX `STORE_IS_ACTIVE_SORT_ORDER` ON `store` (`is_active`,`sort_order`);--> statement-breakpoint
CREATE INDEX `STORE_GROUP_ID` ON `store` (`group_id`);--> statement-breakpoint
CREATE INDEX `STORES_DATA_EXPORTER_MODIFIED_AT` ON `stores_data_exporter` (`modified_at`);--> statement-breakpoint
CREATE INDEX `STORE_GROUP_WEBSITE_ID` ON `store_group` (`website_id`);--> statement-breakpoint
CREATE INDEX `STORE_GROUP_DEFAULT_STORE_ID` ON `store_group` (`default_store_id`);--> statement-breakpoint
CREATE INDEX `STORE_WEBSITE_SORT_ORDER` ON `store_website` (`sort_order`);--> statement-breakpoint
CREATE INDEX `STORE_WEBSITE_DEFAULT_GROUP_ID` ON `store_website` (`default_group_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_TAX_CALCULATION_RULE_ID` ON `tax_calculation` (`tax_calculation_rule_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_CUSTOMER_TAX_CLASS_ID` ON `tax_calculation` (`customer_tax_class_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_PRODUCT_TAX_CLASS_ID` ON `tax_calculation` (`product_tax_class_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALC_TAX_CALC_RATE_ID_CSTR_TAX_CLASS_ID_PRD_TAX_CLASS_ID` ON `tax_calculation` (`tax_calculation_rate_id`,`customer_tax_class_id`,`product_tax_class_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_RATE_TAX_COUNTRY_ID_TAX_REGION_ID_TAX_POSTCODE` ON `tax_calculation_rate` (`tax_country_id`,`tax_region_id`,`tax_postcode`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_RATE_CODE` ON `tax_calculation_rate` (`code`);--> statement-breakpoint
CREATE INDEX `IDX_CA799F1E2CB843495F601E56C84A626D` ON `tax_calculation_rate` (`tax_calculation_rate_id`,`tax_country_id`,`tax_region_id`,`zip_is_range`,`tax_postcode`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_RATE_TITLE_TAX_CALCULATION_RATE_ID_STORE_ID` ON `tax_calculation_rate_title` (`tax_calculation_rate_id`,`store_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_RATE_TITLE_STORE_ID` ON `tax_calculation_rate_title` (`store_id`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_RULE_PRIORITY_POSITION` ON `tax_calculation_rule` (`priority`,`position`);--> statement-breakpoint
CREATE INDEX `TAX_CALCULATION_RULE_CODE` ON `tax_calculation_rule` (`code`);--> statement-breakpoint
CREATE INDEX `TAX_ORDER_AGGREGATED_CREATED_STORE_ID` ON `tax_order_aggregated_created` (`store_id`);--> statement-breakpoint
CREATE INDEX `TAX_ORDER_AGGREGATED_UPDATED_STORE_ID` ON `tax_order_aggregated_updated` (`store_id`);--> statement-breakpoint
CREATE INDEX `TFA_COUNTRY_CODES_CODE` ON `tfa_country_codes` (`code`);--> statement-breakpoint
CREATE INDEX `UI_BOOKMARK_USER_ID_NAMESPACE_IDENTIFIER` ON `ui_bookmark` (`user_id`,`namespace`,`identifier`);--> statement-breakpoint
CREATE INDEX `URL_REWRITE_TARGET_PATH` ON `url_rewrite` (`target_path`);--> statement-breakpoint
CREATE INDEX `URL_REWRITE_STORE_ID_ENTITY_ID` ON `url_rewrite` (`store_id`,`entity_id`);--> statement-breakpoint
CREATE INDEX `URL_REWRITE_ENTITY_ID` ON `url_rewrite` (`entity_id`);--> statement-breakpoint
CREATE INDEX `URL_REWRITE_IS_AUTOGENERATED_METADATA` ON `url_rewrite` (`is_autogenerated`,`metadata`);--> statement-breakpoint
CREATE INDEX `VARIABLE_VALUE_STORE_ID` ON `variable_value` (`store_id`);--> statement-breakpoint
CREATE INDEX `WEEE_TAX_WEBSITE_ID` ON `weee_tax` (`website_id`);--> statement-breakpoint
CREATE INDEX `WEEE_TAX_ENTITY_ID` ON `weee_tax` (`entity_id`);--> statement-breakpoint
CREATE INDEX `WEEE_TAX_COUNTRY` ON `weee_tax` (`country`);--> statement-breakpoint
CREATE INDEX `WEEE_TAX_ATTRIBUTE_ID` ON `weee_tax` (`attribute_id`);--> statement-breakpoint
CREATE INDEX `WIDGET_WIDGET_CODE` ON `widget` (`widget_code`);--> statement-breakpoint
CREATE INDEX `WIDGET_INSTANCE_PAGE_INSTANCE_ID` ON `widget_instance_page` (`instance_id`);--> statement-breakpoint
CREATE INDEX `WIDGET_INSTANCE_PAGE_LAYOUT_PAGE_ID` ON `widget_instance_page_layout` (`page_id`);--> statement-breakpoint
CREATE INDEX `WISHLIST_SHARED` ON `wishlist` (`shared`);--> statement-breakpoint
CREATE INDEX `WISHLIST_ITEM_WISHLIST_ID` ON `wishlist_item` (`wishlist_id`);--> statement-breakpoint
CREATE INDEX `WISHLIST_ITEM_PRODUCT_ID` ON `wishlist_item` (`product_id`);--> statement-breakpoint
CREATE INDEX `WISHLIST_ITEM_STORE_ID` ON `wishlist_item` (`store_id`);
*/