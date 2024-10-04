import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, int, smallint, timestamp, varchar, text, foreignKey, unique, datetime, decimal, date, mediumtext, float, tinyint, longtext, double, varbinary } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const adminnotificationInbox = mysqlTable("adminnotification_inbox", {
	notificationId: int("notification_id").autoincrement().notNull(),
	severity: smallint("severity").notNull(),
	dateAdded: timestamp("date_added", { mode: 'string' }).default('current_timestamp()').notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").default('NULL'),
	url: varchar("url", { length: 255 }).default('NULL'),
	isRead: smallint("is_read").notNull(),
	isRemove: smallint("is_remove").notNull(),
},
(table) => {
	return {
		adminnotificationInboxSeverity: index("ADMINNOTIFICATION_INBOX_SEVERITY").on(table.severity),
		adminnotificationInboxIsRead: index("ADMINNOTIFICATION_INBOX_IS_READ").on(table.isRead),
		adminnotificationInboxIsRemove: index("ADMINNOTIFICATION_INBOX_IS_REMOVE").on(table.isRemove),
	}
});

export const adminAdobeImsWebapi = mysqlTable("admin_adobe_ims_webapi", {
	id: int("id").autoincrement().notNull(),
	adminUserId: int("admin_user_id").default(0).notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	accessTokenHash: varchar("access_token_hash", { length: 255 }).default('NULL'),
	accessToken: text("access_token").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	lastCheckTime: timestamp("last_check_time", { mode: 'string' }).default(''0000-00-00 00:00:00'').notNull(),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }).default(''0000-00-00 00:00:00'').notNull(),
},
(table) => {
	return {
		adminAdobeImsWebapiAdminUserId: index("ADMIN_ADOBE_IMS_WEBAPI_ADMIN_USER_ID").on(table.adminUserId),
		adminAdobeImsWebapiAccessTokenHash: unique("ADMIN_ADOBE_IMS_WEBAPI_ACCESS_TOKEN_HASH").on(table.accessTokenHash),
	}
});

export const adminAnalyticsUsageVersionLog = mysqlTable("admin_analytics_usage_version_log", {
	id: int("id").autoincrement().notNull(),
	lastViewedInVersion: varchar("last_viewed_in_version", { length: 50 }).notNull(),
},
(table) => {
	return {
		adminAnalyticsUsageVersionLogLastViewedInVersion: unique("ADMIN_ANALYTICS_USAGE_VERSION_LOG_LAST_VIEWED_IN_VERSION").on(table.lastViewedInVersion),
	}
});

export const adminPasswords = mysqlTable("admin_passwords", {
	passwordId: int("password_id").autoincrement().notNull(),
	userId: int("user_id").default(0).notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	passwordHash: varchar("password_hash", { length: 255 }).default('NULL'),
	expires: int("expires").default(0).notNull(),
	lastUpdated: int("last_updated").default(0).notNull(),
},
(table) => {
	return {
		adminPasswordsUserId: index("ADMIN_PASSWORDS_USER_ID").on(table.userId),
	}
});

export const adminSystemMessages = mysqlTable("admin_system_messages", {
	identity: varchar("identity", { length: 100 }).notNull(),
	severity: smallint("severity").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const adminUser = mysqlTable("admin_user", {
	userId: int("user_id").autoincrement().notNull(),
	firstname: varchar("firstname", { length: 32 }).default('NULL'),
	lastname: varchar("lastname", { length: 32 }).default('NULL'),
	email: varchar("email", { length: 128 }).default('NULL'),
	username: varchar("username", { length: 40 }).default('NULL'),
	password: varchar("password", { length: 255 }).notNull(),
	created: timestamp("created", { mode: 'string' }).default('current_timestamp()').notNull(),
	modified: timestamp("modified", { mode: 'string' }).default('current_timestamp()').notNull(),
	logdate: timestamp("logdate", { mode: 'string' }).default('NULL'),
	lognum: smallint("lognum").notNull(),
	reloadAclFlag: smallint("reload_acl_flag").notNull(),
	isActive: smallint("is_active").default(1).notNull(),
	extra: text("extra").default('NULL'),
	rpToken: text("rp_token").default('NULL'),
	rpTokenCreatedAt: timestamp("rp_token_created_at", { mode: 'string' }).default('NULL'),
	interfaceLocale: varchar("interface_locale", { length: 16 }).default(''en_US'').notNull(),
	failuresNum: smallint("failures_num"),
	firstFailure: timestamp("first_failure", { mode: 'string' }).default('NULL'),
	lockExpires: timestamp("lock_expires", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		adminUserUsername: unique("ADMIN_USER_USERNAME").on(table.username),
	}
});

export const adminUserExpiration = mysqlTable("admin_user_expiration", {
	userId: int("user_id").notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	expiresAt: datetime("expires_at", { mode: 'string'}).default(''0000-00-00 00:00:00'').notNull(),
});

export const adminUserSession = mysqlTable("admin_user_session", {
	id: int("id").autoincrement().notNull(),
	sessionId: varchar("session_id", { length: 1 }).default('NULL'),
	userId: int("user_id").default('NULL').references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	status: smallint("status").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	ip: varchar("ip", { length: 15 }).notNull(),
},
(table) => {
	return {
		adminUserSessionSessionId: index("ADMIN_USER_SESSION_SESSION_ID").on(table.sessionId),
		adminUserSessionUserId: index("ADMIN_USER_SESSION_USER_ID").on(table.userId),
	}
});

export const adobeStockAsset = mysqlTable("adobe_stock_asset", {
	id: int("id").autoincrement().notNull(),
	mediaGalleryId: int("media_gallery_id").default('NULL').references(() => mediaGalleryAsset.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	categoryId: int("category_id").default('NULL').references(() => adobeStockCategory.id, { onDelete: "set null", onUpdate: "restrict" } ),
	creatorId: int("creator_id").default('NULL').references(() => adobeStockCreator.id, { onDelete: "set null", onUpdate: "restrict" } ),
	isLicensed: int("is_licensed").default(0).notNull(),
	creationDate: varchar("creation_date", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		adobeStockAssetId: index("ADOBE_STOCK_ASSET_ID").on(table.id),
		adobeStockAssetCategoryId: index("ADOBE_STOCK_ASSET_CATEGORY_ID").on(table.categoryId),
		adobeStockAssetCreatorId: index("ADOBE_STOCK_ASSET_CREATOR_ID").on(table.creatorId),
	}
});

export const adobeStockCategory = mysqlTable("adobe_stock_category", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		adobeStockCategoryId: index("ADOBE_STOCK_CATEGORY_ID").on(table.id),
	}
});

export const adobeStockCreator = mysqlTable("adobe_stock_creator", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		adobeStockCreatorId: index("ADOBE_STOCK_CREATOR_ID").on(table.id),
	}
});

export const adobeUserProfile = mysqlTable("adobe_user_profile", {
	id: int("id").autoincrement().notNull(),
	adminUserId: int("admin_user_id").default(0).notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }).notNull(),
	accountType: varchar("account_type", { length: 255 }).default('NULL'),
	accessToken: text("access_token").default('NULL'),
	refreshToken: text("refresh_token").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }).default(''0000-00-00 00:00:00'').notNull(),
},
(table) => {
	return {
		adobeUserProfileAdminUserId: index("ADOBE_USER_PROFILE_ADMIN_USER_ID").on(table.adminUserId),
	}
});

export const authorizationRole = mysqlTable("authorization_role", {
	roleId: int("role_id").autoincrement().notNull(),
	parentId: int("parent_id").default(0).notNull(),
	treeLevel: smallint("tree_level").notNull(),
	sortOrder: smallint("sort_order").notNull(),
	roleType: varchar("role_type", { length: 1 }).default(''0'').notNull(),
	userId: int("user_id").default(0).notNull(),
	userType: varchar("user_type", { length: 16 }).default('NULL'),
	roleName: varchar("role_name", { length: 50 }).default('NULL'),
},
(table) => {
	return {
		authorizationRoleParentIdSortOrder: index("AUTHORIZATION_ROLE_PARENT_ID_SORT_ORDER").on(table.parentId, table.sortOrder),
		authorizationRoleTreeLevel: index("AUTHORIZATION_ROLE_TREE_LEVEL").on(table.treeLevel),
	}
});

export const authorizationRule = mysqlTable("authorization_rule", {
	ruleId: int("rule_id").autoincrement().notNull(),
	roleId: int("role_id").default(0).notNull().references(() => authorizationRole.roleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	resourceId: varchar("resource_id", { length: 255 }).default('NULL'),
	privileges: varchar("privileges", { length: 20 }).default('NULL'),
	permission: varchar("permission", { length: 10 }).default('NULL'),
},
(table) => {
	return {
		authorizationRuleResourceIdRoleId: index("AUTHORIZATION_RULE_RESOURCE_ID_ROLE_ID").on(table.resourceId, table.roleId),
		authorizationRuleRoleIdResourceId: index("AUTHORIZATION_RULE_ROLE_ID_RESOURCE_ID").on(table.roleId, table.resourceId),
	}
});

export const braintreeCreditPrices = mysqlTable("braintree_credit_prices", {
	id: int("id").autoincrement().notNull(),
	productId: int("product_id").notNull(),
	term: int("term").notNull(),
	monthlyPayment: decimal("monthly_payment", { precision: 12, scale: 2 }).notNull(),
	instalmentRate: decimal("instalment_rate", { precision: 12, scale: 2 }).notNull(),
	costOfPurchase: decimal("cost_of_purchase", { precision: 12, scale: 2 }).notNull(),
	totalIncInterest: decimal("total_inc_interest", { precision: 12, scale: 2 }).notNull(),
},
(table) => {
	return {
		braintreeCreditPricesProductId: index("BRAINTREE_CREDIT_PRICES_PRODUCT_ID").on(table.productId),
		braintreeCreditPricesProductIdTerm: unique("BRAINTREE_CREDIT_PRICES_PRODUCT_ID_TERM").on(table.productId, table.term),
	}
});

export const braintreeTransactionDetails = mysqlTable("braintree_transaction_details", {
	entityId: int("entity_id").autoincrement().notNull(),
	orderId: int("order_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	transactionSource: varchar("transaction_source", { length: 12 }).default('NULL'),
},
(table) => {
	return {
		braintreeTransactionDetailsOrderId: index("BRAINTREE_TRANSACTION_DETAILS_ORDER_ID").on(table.orderId),
	}
});

export const cache = mysqlTable("cache", {
	id: varchar("id", { length: 200 }).notNull(),
	// Warning: Can't parse mediumblob from database
	// mediumblobType: mediumblob("data"),
	createTime: int("create_time").default('NULL'),
	updateTime: int("update_time").default('NULL'),
	expireTime: int("expire_time").default('NULL'),
},
(table) => {
	return {
		cacheExpireTime: index("CACHE_EXPIRE_TIME").on(table.expireTime),
	}
});

export const cacheTag = mysqlTable("cache_tag", {
	tag: varchar("tag", { length: 100 }).notNull(),
	cacheId: varchar("cache_id", { length: 200 }).notNull(),
},
(table) => {
	return {
		cacheTagCacheId: index("CACHE_TAG_CACHE_ID").on(table.cacheId),
	}
});

export const captchaLog = mysqlTable("captcha_log", {
	type: varchar("type", { length: 32 }).notNull(),
	value: varchar("value", { length: 255 }).notNull(),
	count: int("count").default(0).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const cataloginventoryStock = mysqlTable("cataloginventory_stock", {
	stockId: smallint("stock_id").autoincrement().notNull(),
	websiteId: smallint("website_id").notNull(),
	stockName: varchar("stock_name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		cataloginventoryStockWebsiteId: index("CATALOGINVENTORY_STOCK_WEBSITE_ID").on(table.websiteId),
	}
});

export const cataloginventoryStockCl = mysqlTable("cataloginventory_stock_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const cataloginventoryStockItem = mysqlTable("cataloginventory_stock_item", {
	itemId: int("item_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	stockId: smallint("stock_id").notNull().references(() => cataloginventoryStock.stockId, { onDelete: "cascade", onUpdate: "restrict" } ),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('NULL'),
	minQty: decimal("min_qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	useConfigMinQty: smallint("use_config_min_qty").default(1).notNull(),
	isQtyDecimal: smallint("is_qty_decimal").notNull(),
	backorders: smallint("backorders").notNull(),
	useConfigBackorders: smallint("use_config_backorders").default(1).notNull(),
	minSaleQty: decimal("min_sale_qty", { precision: 12, scale: 4 }).default('1.0000').notNull(),
	useConfigMinSaleQty: smallint("use_config_min_sale_qty").default(1).notNull(),
	maxSaleQty: decimal("max_sale_qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	useConfigMaxSaleQty: smallint("use_config_max_sale_qty").default(1).notNull(),
	isInStock: smallint("is_in_stock").notNull(),
	lowStockDate: timestamp("low_stock_date", { mode: 'string' }).default('NULL'),
	notifyStockQty: decimal("notify_stock_qty", { precision: 12, scale: 4 }).default('NULL'),
	useConfigNotifyStockQty: smallint("use_config_notify_stock_qty").default(1).notNull(),
	manageStock: smallint("manage_stock").notNull(),
	useConfigManageStock: smallint("use_config_manage_stock").default(1).notNull(),
	stockStatusChangedAuto: smallint("stock_status_changed_auto").notNull(),
	useConfigQtyIncrements: smallint("use_config_qty_increments").default(1).notNull(),
	qtyIncrements: decimal("qty_increments", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	useConfigEnableQtyInc: smallint("use_config_enable_qty_inc").default(1).notNull(),
	enableQtyIncrements: smallint("enable_qty_increments").notNull(),
	isDecimalDivided: smallint("is_decimal_divided").notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		cataloginventoryStockItemWebsiteId: index("CATALOGINVENTORY_STOCK_ITEM_WEBSITE_ID").on(table.websiteId),
		cataloginventoryStockItemWebsiteIdProductId: index("CATALOGINVENTORY_STOCK_ITEM_WEBSITE_ID_PRODUCT_ID").on(table.websiteId, table.productId),
		cataloginventoryStockItemStockId: index("CATALOGINVENTORY_STOCK_ITEM_STOCK_ID").on(table.stockId),
		cataloginventoryStockItemProductIdStockId: unique("CATALOGINVENTORY_STOCK_ITEM_PRODUCT_ID_STOCK_ID").on(table.productId, table.stockId),
	}
});

export const cataloginventoryStockStatus = mysqlTable("cataloginventory_stock_status", {
	productId: int("product_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	stockId: smallint("stock_id").notNull(),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	stockStatus: smallint("stock_status").notNull(),
},
(table) => {
	return {
		cataloginventoryStockStatusStockId: index("CATALOGINVENTORY_STOCK_STATUS_STOCK_ID").on(table.stockId),
		cataloginventoryStockStatusWebsiteId: index("CATALOGINVENTORY_STOCK_STATUS_WEBSITE_ID").on(table.websiteId),
		cataloginventoryStockStatusStockStatus: index("CATALOGINVENTORY_STOCK_STATUS_STOCK_STATUS").on(table.stockStatus),
	}
});

export const cataloginventoryStockStatusIdx = mysqlTable("cataloginventory_stock_status_idx", {
	productId: int("product_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	stockId: smallint("stock_id").notNull(),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	stockStatus: smallint("stock_status").notNull(),
},
(table) => {
	return {
		cataloginventoryStockStatusIdxStockId: index("CATALOGINVENTORY_STOCK_STATUS_IDX_STOCK_ID").on(table.stockId),
		cataloginventoryStockStatusIdxWebsiteId: index("CATALOGINVENTORY_STOCK_STATUS_IDX_WEBSITE_ID").on(table.websiteId),
	}
});

export const cataloginventoryStockStatusReplica = mysqlTable("cataloginventory_stock_status_replica", {
	productId: int("product_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	stockId: smallint("stock_id").notNull(),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	stockStatus: smallint("stock_status").notNull(),
},
(table) => {
	return {
		cataloginventoryStockStatusStockId: index("CATALOGINVENTORY_STOCK_STATUS_STOCK_ID").on(table.stockId),
		cataloginventoryStockStatusWebsiteId: index("CATALOGINVENTORY_STOCK_STATUS_WEBSITE_ID").on(table.websiteId),
		cataloginventoryStockStatusStockStatus: index("CATALOGINVENTORY_STOCK_STATUS_STOCK_STATUS").on(table.stockStatus),
	}
});

export const cataloginventoryStockStatusTmp = mysqlTable("cataloginventory_stock_status_tmp", {
	productId: int("product_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	stockId: smallint("stock_id").notNull(),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	stockStatus: smallint("stock_status").notNull(),
},
(table) => {
	return {
		cataloginventoryStockStatusTmpStockId: index("CATALOGINVENTORY_STOCK_STATUS_TMP_STOCK_ID").on(table.stockId),
		cataloginventoryStockStatusTmpWebsiteId: index("CATALOGINVENTORY_STOCK_STATUS_TMP_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogrule = mysqlTable("catalogrule", {
	ruleId: int("rule_id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	fromDate: date("from_date", { mode: 'string' }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	toDate: date("to_date", { mode: 'string' }).default('NULL'),
	isActive: smallint("is_active").notNull(),
	conditionsSerialized: mediumtext("conditions_serialized").default('NULL'),
	actionsSerialized: mediumtext("actions_serialized").default('NULL'),
	stopRulesProcessing: smallint("stop_rules_processing").default(1).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	simpleAction: varchar("simple_action", { length: 32 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 6 }).default('0.000000').notNull(),
},
(table) => {
	return {
		catalogruleIsActiveSortOrderToDateFromDate: index("CATALOGRULE_IS_ACTIVE_SORT_ORDER_TO_DATE_FROM_DATE").on(table.isActive, table.sortOrder, table.toDate, table.fromDate),
	}
});

export const catalogruleCustomerGroup = mysqlTable("catalogrule_customer_group", {
	ruleId: int("rule_id").notNull().references(() => catalogrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerGroupId: int("customer_group_id").notNull().references(() => customerGroup.customerGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogruleCustomerGroupCustomerGroupId: index("CATALOGRULE_CUSTOMER_GROUP_CUSTOMER_GROUP_ID").on(table.customerGroupId),
	}
});

export const catalogruleGroupWebsite = mysqlTable("catalogrule_group_website", {
	ruleId: int("rule_id").default(0).notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		catalogruleGroupWebsiteCustomerGroupId: index("CATALOGRULE_GROUP_WEBSITE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogruleGroupWebsiteWebsiteId: index("CATALOGRULE_GROUP_WEBSITE_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogruleGroupWebsiteReplica = mysqlTable("catalogrule_group_website_replica", {
	ruleId: int("rule_id").default(0).notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		catalogruleGroupWebsiteCustomerGroupId: index("CATALOGRULE_GROUP_WEBSITE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogruleGroupWebsiteWebsiteId: index("CATALOGRULE_GROUP_WEBSITE_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogruleProduct = mysqlTable("catalogrule_product", {
	ruleProductId: int("rule_product_id").autoincrement().notNull(),
	ruleId: int("rule_id").default(0).notNull(),
	fromTime: int("from_time").default(0).notNull(),
	toTime: int("to_time").default(0).notNull(),
	customerGroupId: int("customer_group_id").default('NULL'),
	productId: int("product_id").default(0).notNull(),
	actionOperator: varchar("action_operator", { length: 10 }).default(''to_fixed''),
	actionAmount: decimal("action_amount", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	actionStop: smallint("action_stop").notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		catalogruleProductCustomerGroupId: index("CATALOGRULE_PRODUCT_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogruleProductWebsiteId: index("CATALOGRULE_PRODUCT_WEBSITE_ID").on(table.websiteId),
		catalogruleProductFromTime: index("CATALOGRULE_PRODUCT_FROM_TIME").on(table.fromTime),
		catalogruleProductToTime: index("CATALOGRULE_PRODUCT_TO_TIME").on(table.toTime),
		catalogruleProductProductId: index("CATALOGRULE_PRODUCT_PRODUCT_ID").on(table.productId),
		unqEaa51B56Ff092A0Dcb795D1Cef812B7B: unique("UNQ_EAA51B56FF092A0DCB795D1CEF812B7B").on(table.ruleId, table.fromTime, table.toTime, table.websiteId, table.customerGroupId, table.productId, table.sortOrder),
	}
});

export const catalogruleProductCl = mysqlTable("catalogrule_product_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogruleProductPrice = mysqlTable("catalogrule_product_price", {
	ruleProductPriceId: int("rule_product_price_id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	ruleDate: date("rule_date", { mode: 'string' }).notNull(),
	customerGroupId: int("customer_group_id").default('NULL'),
	productId: int("product_id").default(0).notNull(),
	rulePrice: decimal("rule_price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	websiteId: smallint("website_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	latestStartDate: date("latest_start_date", { mode: 'string' }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	earliestEndDate: date("earliest_end_date", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		catalogruleProductPriceCustomerGroupId: index("CATALOGRULE_PRODUCT_PRICE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogruleProductPriceWebsiteId: index("CATALOGRULE_PRODUCT_PRICE_WEBSITE_ID").on(table.websiteId),
		catalogruleProductPriceProductId: index("CATALOGRULE_PRODUCT_PRICE_PRODUCT_ID").on(table.productId),
		catrulePrdPriceRuleDateWsIdCstrGroupIdPrdId: unique("CATRULE_PRD_PRICE_RULE_DATE_WS_ID_CSTR_GROUP_ID_PRD_ID").on(table.ruleDate, table.websiteId, table.customerGroupId, table.productId),
	}
});

export const catalogruleProductPriceReplica = mysqlTable("catalogrule_product_price_replica", {
	ruleProductPriceId: int("rule_product_price_id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	ruleDate: date("rule_date", { mode: 'string' }).notNull(),
	customerGroupId: int("customer_group_id").default('NULL'),
	productId: int("product_id").default(0).notNull(),
	rulePrice: decimal("rule_price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	websiteId: smallint("website_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	latestStartDate: date("latest_start_date", { mode: 'string' }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	earliestEndDate: date("earliest_end_date", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		catalogruleProductPriceCustomerGroupId: index("CATALOGRULE_PRODUCT_PRICE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogruleProductPriceWebsiteId: index("CATALOGRULE_PRODUCT_PRICE_WEBSITE_ID").on(table.websiteId),
		catalogruleProductPriceProductId: index("CATALOGRULE_PRODUCT_PRICE_PRODUCT_ID").on(table.productId),
		catrulePrdPriceRuleDateWsIdCstrGroupIdPrdId: unique("CATRULE_PRD_PRICE_RULE_DATE_WS_ID_CSTR_GROUP_ID_PRD_ID").on(table.ruleDate, table.websiteId, table.customerGroupId, table.productId),
	}
});

export const catalogruleProductReplica = mysqlTable("catalogrule_product_replica", {
	ruleProductId: int("rule_product_id").autoincrement().notNull(),
	ruleId: int("rule_id").default(0).notNull(),
	fromTime: int("from_time").default(0).notNull(),
	toTime: int("to_time").default(0).notNull(),
	customerGroupId: int("customer_group_id").default('NULL'),
	productId: int("product_id").default(0).notNull(),
	actionOperator: varchar("action_operator", { length: 10 }).default(''to_fixed''),
	actionAmount: decimal("action_amount", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	actionStop: smallint("action_stop").notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		catalogruleProductCustomerGroupId: index("CATALOGRULE_PRODUCT_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogruleProductWebsiteId: index("CATALOGRULE_PRODUCT_WEBSITE_ID").on(table.websiteId),
		catalogruleProductFromTime: index("CATALOGRULE_PRODUCT_FROM_TIME").on(table.fromTime),
		catalogruleProductToTime: index("CATALOGRULE_PRODUCT_TO_TIME").on(table.toTime),
		catalogruleProductProductId: index("CATALOGRULE_PRODUCT_PRODUCT_ID").on(table.productId),
		unqEaa51B56Ff092A0Dcb795D1Cef812B7B: unique("UNQ_EAA51B56FF092A0DCB795D1CEF812B7B").on(table.ruleId, table.fromTime, table.toTime, table.websiteId, table.customerGroupId, table.productId, table.sortOrder),
	}
});

export const catalogruleRuleCl = mysqlTable("catalogrule_rule_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogruleWebsite = mysqlTable("catalogrule_website", {
	ruleId: int("rule_id").notNull().references(() => catalogrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogruleWebsiteWebsiteId: index("CATALOGRULE_WEBSITE_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogsearchFulltextCl = mysqlTable("catalogsearch_fulltext_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogsearchRecommendations = mysqlTable("catalogsearch_recommendations", {
	id: int("id").autoincrement().notNull(),
	queryId: int("query_id").default(0).notNull().references(() => searchQuery.queryId, { onDelete: "cascade", onUpdate: "restrict" } ),
	relationId: int("relation_id").default(0).notNull().references(() => searchQuery.queryId, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const catalogCategoryEntity = mysqlTable("catalog_category_entity", {
	entityId: int("entity_id").autoincrement().notNull(),
	attributeSetId: smallint("attribute_set_id").notNull(),
	parentId: int("parent_id").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	path: varchar("path", { length: 255 }).notNull(),
	position: int("position").notNull(),
	level: int("level").default(0).notNull(),
	childrenCount: int("children_count").notNull(),
},
(table) => {
	return {
		catalogCategoryEntityLevel: index("CATALOG_CATEGORY_ENTITY_LEVEL").on(table.level),
		catalogCategoryEntityPath: index("CATALOG_CATEGORY_ENTITY_PATH").on(table.path),
	}
});

export const catalogCategoryEntityDatetime = mysqlTable("catalog_category_entity_datetime", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: datetime("value", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		catalogCategoryEntityDatetimeEntityId: index("CATALOG_CATEGORY_ENTITY_DATETIME_ENTITY_ID").on(table.entityId),
		catalogCategoryEntityDatetimeAttributeId: index("CATALOG_CATEGORY_ENTITY_DATETIME_ATTRIBUTE_ID").on(table.attributeId),
		catalogCategoryEntityDatetimeStoreId: index("CATALOG_CATEGORY_ENTITY_DATETIME_STORE_ID").on(table.storeId),
		catalogCategoryEntityDatetimeEntityIdAttributeIdStoreId: unique("CATALOG_CATEGORY_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogCategoryEntityDecimal = mysqlTable("catalog_category_entity_decimal", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 20, scale: 6 }).default('NULL'),
},
(table) => {
	return {
		catalogCategoryEntityDecimalEntityId: index("CATALOG_CATEGORY_ENTITY_DECIMAL_ENTITY_ID").on(table.entityId),
		catalogCategoryEntityDecimalAttributeId: index("CATALOG_CATEGORY_ENTITY_DECIMAL_ATTRIBUTE_ID").on(table.attributeId),
		catalogCategoryEntityDecimalStoreId: index("CATALOG_CATEGORY_ENTITY_DECIMAL_STORE_ID").on(table.storeId),
		catalogCategoryEntityDecimalEntityIdAttributeIdStoreId: unique("CATALOG_CATEGORY_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogCategoryEntityInt = mysqlTable("catalog_category_entity_int", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: int("value").default('NULL'),
},
(table) => {
	return {
		catalogCategoryEntityIntEntityId: index("CATALOG_CATEGORY_ENTITY_INT_ENTITY_ID").on(table.entityId),
		catalogCategoryEntityIntAttributeId: index("CATALOG_CATEGORY_ENTITY_INT_ATTRIBUTE_ID").on(table.attributeId),
		catalogCategoryEntityIntStoreId: index("CATALOG_CATEGORY_ENTITY_INT_STORE_ID").on(table.storeId),
		catalogCategoryEntityIntEntityIdAttributeIdStoreId: unique("CATALOG_CATEGORY_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogCategoryEntityText = mysqlTable("catalog_category_entity_text", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: mediumtext("value").default('NULL'),
},
(table) => {
	return {
		catalogCategoryEntityTextEntityId: index("CATALOG_CATEGORY_ENTITY_TEXT_ENTITY_ID").on(table.entityId),
		catalogCategoryEntityTextAttributeId: index("CATALOG_CATEGORY_ENTITY_TEXT_ATTRIBUTE_ID").on(table.attributeId),
		catalogCategoryEntityTextStoreId: index("CATALOG_CATEGORY_ENTITY_TEXT_STORE_ID").on(table.storeId),
		catalogCategoryEntityTextEntityIdAttributeIdStoreId: unique("CATALOG_CATEGORY_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogCategoryEntityVarchar = mysqlTable("catalog_category_entity_varchar", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogCategoryEntityVarcharEntityId: index("CATALOG_CATEGORY_ENTITY_VARCHAR_ENTITY_ID").on(table.entityId),
		catalogCategoryEntityVarcharAttributeId: index("CATALOG_CATEGORY_ENTITY_VARCHAR_ATTRIBUTE_ID").on(table.attributeId),
		catalogCategoryEntityVarcharStoreId: index("CATALOG_CATEGORY_ENTITY_VARCHAR_STORE_ID").on(table.storeId),
		catalogCategoryEntityVarcharEntityIdAttributeIdStoreId: unique("CATALOG_CATEGORY_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogCategoryProduct = mysqlTable("catalog_category_product", {
	entityId: int("entity_id").autoincrement().notNull(),
	categoryId: int("category_id").default(0).notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	position: int("position").default(0).notNull(),
},
(table) => {
	return {
		catalogCategoryProductProductId: index("CATALOG_CATEGORY_PRODUCT_PRODUCT_ID").on(table.productId),
		catalogCategoryProductCategoryIdProductId: unique("CATALOG_CATEGORY_PRODUCT_CATEGORY_ID_PRODUCT_ID").on(table.categoryId, table.productId),
	}
});

export const catalogCategoryProductCl = mysqlTable("catalog_category_product_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogCategoryProductIndex = mysqlTable("catalog_category_product_index", {
	categoryId: int("category_id").default(0).notNull(),
	productId: int("product_id").default(0).notNull(),
	position: int("position").default('NULL'),
	isParent: smallint("is_parent").notNull(),
	storeId: smallint("store_id").notNull(),
	visibility: smallint("visibility").notNull(),
},
(table) => {
	return {
		catCtgrPrdIdxPrdIdStoreIdCtgrIdVisibility: index("CAT_CTGR_PRD_IDX_PRD_ID_STORE_ID_CTGR_ID_VISIBILITY").on(table.productId, table.storeId, table.categoryId, table.visibility),
		catCtgrPrdIdxStoreIdCtgrIdVisibilityIsParentPosition: index("CAT_CTGR_PRD_IDX_STORE_ID_CTGR_ID_VISIBILITY_IS_PARENT_POSITION").on(table.storeId, table.categoryId, table.visibility, table.isParent, table.position),
	}
});

export const catalogCategoryProductIndexReplica = mysqlTable("catalog_category_product_index_replica", {
	categoryId: int("category_id").default(0).notNull(),
	productId: int("product_id").default(0).notNull(),
	position: int("position").default('NULL'),
	isParent: smallint("is_parent").notNull(),
	storeId: smallint("store_id").notNull(),
	visibility: smallint("visibility").notNull(),
},
(table) => {
	return {
		catCtgrPrdIdxPrdIdStoreIdCtgrIdVisibility: index("CAT_CTGR_PRD_IDX_PRD_ID_STORE_ID_CTGR_ID_VISIBILITY").on(table.productId, table.storeId, table.categoryId, table.visibility),
		catCtgrPrdIdxStoreIdCtgrIdVisibilityIsParentPosition: index("CAT_CTGR_PRD_IDX_STORE_ID_CTGR_ID_VISIBILITY_IS_PARENT_POSITION").on(table.storeId, table.categoryId, table.visibility, table.isParent, table.position),
	}
});

export const catalogCategoryProductIndexStore1 = mysqlTable("catalog_category_product_index_store1", {
	categoryId: int("category_id").default(0).notNull(),
	productId: int("product_id").default(0).notNull(),
	position: int("position").default('NULL'),
	isParent: smallint("is_parent").notNull(),
	storeId: smallint("store_id").notNull(),
	visibility: smallint("visibility").notNull(),
},
(table) => {
	return {
		idx4B965Dc45C352D6E4C9Dc0Ff50B1Fcf5: index("IDX_4B965DC45C352D6E4C9DC0FF50B1FCF5").on(table.productId, table.storeId, table.categoryId, table.visibility),
		idx47Ab760Cd6A893Acea69A9C2E0112C60: index("IDX_47AB760CD6A893ACEA69A9C2E0112C60").on(table.storeId, table.categoryId, table.visibility, table.isParent, table.position),
	}
});

export const catalogCategoryProductIndexStore1Replica = mysqlTable("catalog_category_product_index_store1_replica", {
	categoryId: int("category_id").default(0).notNull(),
	productId: int("product_id").default(0).notNull(),
	position: int("position").default('NULL'),
	isParent: smallint("is_parent").notNull(),
	storeId: smallint("store_id").notNull(),
	visibility: smallint("visibility").notNull(),
},
(table) => {
	return {
		catCtgrPrdIdxStore1PrdIdStoreIdCtgrIdVisibility: index("CAT_CTGR_PRD_IDX_STORE1_PRD_ID_STORE_ID_CTGR_ID_VISIBILITY").on(table.productId, table.storeId, table.categoryId, table.visibility),
		idx216E521C8Ad125E066D2B0Bab4A08412: index("IDX_216E521C8AD125E066D2B0BAB4A08412").on(table.storeId, table.categoryId, table.visibility, table.isParent, table.position),
	}
});

export const catalogCategoryProductIndexTmp = mysqlTable("catalog_category_product_index_tmp", {
	categoryId: int("category_id").default(0).notNull(),
	productId: int("product_id").default(0).notNull(),
	position: int("position").default(0).notNull(),
	isParent: smallint("is_parent").notNull(),
	storeId: smallint("store_id").notNull(),
	visibility: smallint("visibility").notNull(),
},
(table) => {
	return {
		catCtgrPrdIdxTmpPrdIdCtgrIdStoreId: index("CAT_CTGR_PRD_IDX_TMP_PRD_ID_CTGR_ID_STORE_ID").on(table.productId, table.categoryId, table.storeId),
	}
});

export const catalogCompareItem = mysqlTable("catalog_compare_item", {
	catalogCompareItemId: int("catalog_compare_item_id").autoincrement().notNull(),
	visitorId: int("visitor_id").default(0).notNull(),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	listId: int("list_id").default('NULL').references(() => catalogCompareList.listId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogCompareItemProductId: index("CATALOG_COMPARE_ITEM_PRODUCT_ID").on(table.productId),
		catalogCompareItemVisitorIdProductId: index("CATALOG_COMPARE_ITEM_VISITOR_ID_PRODUCT_ID").on(table.visitorId, table.productId),
		catalogCompareItemCustomerIdProductId: index("CATALOG_COMPARE_ITEM_CUSTOMER_ID_PRODUCT_ID").on(table.customerId, table.productId),
		catalogCompareItemStoreId: index("CATALOG_COMPARE_ITEM_STORE_ID").on(table.storeId),
	}
});

export const catalogCompareList = mysqlTable("catalog_compare_list", {
	listId: int("list_id").autoincrement().notNull(),
	listIdMask: varchar("list_id_mask", { length: 32 }).default('NULL'),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogCompareListListIdMask: index("CATALOG_COMPARE_LIST_LIST_ID_MASK").on(table.listIdMask),
		catalogCompareListCustomerId: unique("CATALOG_COMPARE_LIST_CUSTOMER_ID").on(table.customerId),
	}
});

export const catalogEavAttribute = mysqlTable("catalog_eav_attribute", {
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	frontendInputRenderer: varchar("frontend_input_renderer", { length: 255 }).default('NULL'),
	isGlobal: smallint("is_global").default(1).notNull(),
	isVisible: smallint("is_visible").default(1).notNull(),
	isSearchable: smallint("is_searchable").notNull(),
	isFilterable: smallint("is_filterable").notNull(),
	isComparable: smallint("is_comparable").notNull(),
	isVisibleOnFront: smallint("is_visible_on_front").notNull(),
	isHtmlAllowedOnFront: smallint("is_html_allowed_on_front").notNull(),
	isUsedForPriceRules: smallint("is_used_for_price_rules").notNull(),
	isFilterableInSearch: smallint("is_filterable_in_search").notNull(),
	usedInProductListing: smallint("used_in_product_listing").notNull(),
	usedForSortBy: smallint("used_for_sort_by").notNull(),
	applyTo: varchar("apply_to", { length: 255 }).default('NULL'),
	isVisibleInAdvancedSearch: smallint("is_visible_in_advanced_search").notNull(),
	position: int("position").default(0).notNull(),
	isWysiwygEnabled: smallint("is_wysiwyg_enabled").notNull(),
	isUsedForPromoRules: smallint("is_used_for_promo_rules").notNull(),
	isRequiredInAdminStore: smallint("is_required_in_admin_store").notNull(),
	isUsedInGrid: smallint("is_used_in_grid").notNull(),
	isVisibleInGrid: smallint("is_visible_in_grid").notNull(),
	isFilterableInGrid: smallint("is_filterable_in_grid").notNull(),
	searchWeight: float("search_weight").default(1).notNull(),
	isPagebuilderEnabled: tinyint("is_pagebuilder_enabled").default(0).notNull(),
	additionalData: text("additional_data").default('NULL'),
},
(table) => {
	return {
		catalogEavAttributeUsedForSortBy: index("CATALOG_EAV_ATTRIBUTE_USED_FOR_SORT_BY").on(table.usedForSortBy),
		catalogEavAttributeUsedInProductListing: index("CATALOG_EAV_ATTRIBUTE_USED_IN_PRODUCT_LISTING").on(table.usedInProductListing),
	}
});

export const catalogProductAttributeCl = mysqlTable("catalog_product_attribute_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogProductBundleOption = mysqlTable("catalog_product_bundle_option", {
	optionId: int("option_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	required: smallint("required").notNull(),
	position: int("position").default(0).notNull(),
	type: varchar("type", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductBundleOptionParentId: index("CATALOG_PRODUCT_BUNDLE_OPTION_PARENT_ID").on(table.parentId),
	}
});

export const catalogProductBundleOptionValue = mysqlTable("catalog_product_bundle_option_value", {
	valueId: int("value_id").autoincrement().notNull(),
	optionId: int("option_id").notNull().references(() => catalogProductBundleOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull(),
	title: varchar("title", { length: 255 }).default('NULL'),
	parentProductId: int("parent_product_id").notNull(),
},
(table) => {
	return {
		catPrdBndlOptValOptIdParentPrdIdStoreId: unique("CAT_PRD_BNDL_OPT_VAL_OPT_ID_PARENT_PRD_ID_STORE_ID").on(table.optionId, table.parentProductId, table.storeId),
	}
});

export const catalogProductBundlePriceIndex = mysqlTable("catalog_product_bundle_price_index", {
	entityId: int("entity_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerGroupId: int("customer_group_id").notNull().references(() => customerGroup.customerGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).notNull(),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).notNull(),
},
(table) => {
	return {
		catalogProductBundlePriceIndexWebsiteId: index("CATALOG_PRODUCT_BUNDLE_PRICE_INDEX_WEBSITE_ID").on(table.websiteId),
		catalogProductBundlePriceIndexCustomerGroupId: index("CATALOG_PRODUCT_BUNDLE_PRICE_INDEX_CUSTOMER_GROUP_ID").on(table.customerGroupId),
	}
});

export const catalogProductBundleSelection = mysqlTable("catalog_product_bundle_selection", {
	selectionId: int("selection_id").autoincrement().notNull(),
	optionId: int("option_id").notNull().references(() => catalogProductBundleOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	parentProductId: int("parent_product_id").notNull(),
	productId: int("product_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	position: int("position").default(0).notNull(),
	isDefault: smallint("is_default").notNull(),
	selectionPriceType: smallint("selection_price_type").notNull(),
	selectionPriceValue: decimal("selection_price_value", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	selectionQty: decimal("selection_qty", { precision: 12, scale: 4 }).default('NULL'),
	selectionCanChangeQty: smallint("selection_can_change_qty").notNull(),
},
(table) => {
	return {
		catalogProductBundleSelectionOptionId: index("CATALOG_PRODUCT_BUNDLE_SELECTION_OPTION_ID").on(table.optionId),
		catalogProductBundleSelectionProductId: index("CATALOG_PRODUCT_BUNDLE_SELECTION_PRODUCT_ID").on(table.productId),
	}
});

export const catalogProductBundleSelectionPrice = mysqlTable("catalog_product_bundle_selection_price", {
	selectionId: int("selection_id").notNull().references(() => catalogProductBundleSelection.selectionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	selectionPriceType: smallint("selection_price_type").notNull(),
	selectionPriceValue: decimal("selection_price_value", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	parentProductId: int("parent_product_id").notNull(),
},
(table) => {
	return {
		catalogProductBundleSelectionPriceWebsiteId: index("CATALOG_PRODUCT_BUNDLE_SELECTION_PRICE_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogProductBundleStockIndex = mysqlTable("catalog_product_bundle_stock_index", {
	entityId: int("entity_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	stockId: smallint("stock_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	stockStatus: smallint("stock_status"),
});

export const catalogProductCategoryCl = mysqlTable("catalog_product_category_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogProductEntity = mysqlTable("catalog_product_entity", {
	entityId: int("entity_id").autoincrement().notNull(),
	attributeSetId: smallint("attribute_set_id").notNull(),
	typeId: varchar("type_id", { length: 32 }).default(''simple'').notNull(),
	sku: varchar("sku", { length: 64 }).notNull(),
	hasOptions: smallint("has_options").notNull(),
	requiredOptions: smallint("required_options").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		catalogProductEntityAttributeSetId: index("CATALOG_PRODUCT_ENTITY_ATTRIBUTE_SET_ID").on(table.attributeSetId),
		catalogProductEntitySku: index("CATALOG_PRODUCT_ENTITY_SKU").on(table.sku),
	}
});

export const catalogProductEntityDatetime = mysqlTable("catalog_product_entity_datetime", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: datetime("value", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		catalogProductEntityDatetimeAttributeId: index("CATALOG_PRODUCT_ENTITY_DATETIME_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductEntityDatetimeStoreId: index("CATALOG_PRODUCT_ENTITY_DATETIME_STORE_ID").on(table.storeId),
		catalogProductEntityDatetimeEntityIdAttributeIdStoreId: unique("CATALOG_PRODUCT_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogProductEntityDecimal = mysqlTable("catalog_product_entity_decimal", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 20, scale: 6 }).default('NULL'),
},
(table) => {
	return {
		catalogProductEntityDecimalStoreId: index("CATALOG_PRODUCT_ENTITY_DECIMAL_STORE_ID").on(table.storeId),
		catalogProductEntityDecimalAttributeId: index("CATALOG_PRODUCT_ENTITY_DECIMAL_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductEntityDecimalEntityIdAttributeIdStoreId: unique("CATALOG_PRODUCT_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogProductEntityGallery = mysqlTable("catalog_product_entity_gallery", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	position: int("position").default(0).notNull(),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductEntityGalleryEntityId: index("CATALOG_PRODUCT_ENTITY_GALLERY_ENTITY_ID").on(table.entityId),
		catalogProductEntityGalleryAttributeId: index("CATALOG_PRODUCT_ENTITY_GALLERY_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductEntityGalleryStoreId: index("CATALOG_PRODUCT_ENTITY_GALLERY_STORE_ID").on(table.storeId),
		catalogProductEntityGalleryEntityIdAttributeIdStoreId: unique("CATALOG_PRODUCT_ENTITY_GALLERY_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogProductEntityInt = mysqlTable("catalog_product_entity_int", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: int("value").default('NULL'),
},
(table) => {
	return {
		catalogProductEntityIntAttributeId: index("CATALOG_PRODUCT_ENTITY_INT_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductEntityIntStoreId: index("CATALOG_PRODUCT_ENTITY_INT_STORE_ID").on(table.storeId),
		catalogProductEntityIntAttributeIdStoreIdValue: index("CATALOG_PRODUCT_ENTITY_INT_ATTRIBUTE_ID_STORE_ID_VALUE").on(table.attributeId, table.storeId, table.value),
		catalogProductEntityIntEntityIdAttributeIdStoreId: unique("CATALOG_PRODUCT_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogProductEntityMediaGallery = mysqlTable("catalog_product_entity_media_gallery", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
	mediaType: varchar("media_type", { length: 32 }).default(''image'').notNull(),
	disabled: smallint("disabled").notNull(),
},
(table) => {
	return {
		catalogProductEntityMediaGalleryAttributeId: index("CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_ATTRIBUTE_ID").on(table.attributeId),
	}
});

export const catalogProductEntityMediaGalleryValue = mysqlTable("catalog_product_entity_media_gallery_value", {
	valueId: int("value_id").default(0).notNull().references(() => catalogProductEntityMediaGallery.valueId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	label: varchar("label", { length: 255 }).default('NULL'),
	position: int("position").default('NULL'),
	disabled: smallint("disabled").notNull(),
	recordId: int("record_id").autoincrement().notNull(),
},
(table) => {
	return {
		catalogProductEntityMediaGalleryValueStoreId: index("CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_STORE_ID").on(table.storeId),
		catalogProductEntityMediaGalleryValueEntityId: index("CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_ENTITY_ID").on(table.entityId),
		catalogProductEntityMediaGalleryValueValueId: index("CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_VALUE_ID").on(table.valueId),
		catPrdEnttMdaGlrValEnttIdValIdStoreId: index("CAT_PRD_ENTT_MDA_GLR_VAL_ENTT_ID_VAL_ID_STORE_ID").on(table.entityId, table.valueId, table.storeId),
	}
});

export const catalogProductEntityMediaGalleryValueToEntity = mysqlTable("catalog_product_entity_media_gallery_value_to_entity", {
	valueId: int("value_id").notNull().references(() => catalogProductEntityMediaGallery.valueId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const catalogProductEntityMediaGalleryValueVideo = mysqlTable("catalog_product_entity_media_gallery_value_video", {
	valueId: int("value_id").notNull().references(() => catalogProductEntityMediaGallery.valueId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	provider: varchar("provider", { length: 32 }).default('NULL'),
	url: text("url").default('NULL'),
	title: varchar("title", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	metadata: text("metadata").default('NULL'),
});

export const catalogProductEntityText = mysqlTable("catalog_product_entity_text", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: mediumtext("value").default('NULL'),
},
(table) => {
	return {
		catalogProductEntityTextAttributeId: index("CATALOG_PRODUCT_ENTITY_TEXT_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductEntityTextStoreId: index("CATALOG_PRODUCT_ENTITY_TEXT_STORE_ID").on(table.storeId),
		catalogProductEntityTextEntityIdAttributeIdStoreId: unique("CATALOG_PRODUCT_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogProductEntityTierPrice = mysqlTable("catalog_product_entity_tier_price", {
	valueId: int("value_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	allGroups: smallint("all_groups").default(1).notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull().references(() => customerGroup.customerGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('1.0000').notNull(),
	value: decimal("value", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	percentageValue: decimal("percentage_value", { precision: 5, scale: 2 }).default('NULL'),
},
(table) => {
	return {
		catalogProductEntityTierPriceCustomerGroupId: index("CATALOG_PRODUCT_ENTITY_TIER_PRICE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogProductEntityTierPriceWebsiteId: index("CATALOG_PRODUCT_ENTITY_TIER_PRICE_WEBSITE_ID").on(table.websiteId),
		unqE8Ab433B9Acb00343Abb312Ad2Fab087: unique("UNQ_E8AB433B9ACB00343ABB312AD2FAB087").on(table.entityId, table.allGroups, table.customerGroupId, table.qty, table.websiteId),
	}
});

export const catalogProductEntityVarchar = mysqlTable("catalog_product_entity_varchar", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductEntityVarcharAttributeId: index("CATALOG_PRODUCT_ENTITY_VARCHAR_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductEntityVarcharStoreId: index("CATALOG_PRODUCT_ENTITY_VARCHAR_STORE_ID").on(table.storeId),
		catalogProductEntityVarcharEntityIdAttributeIdStoreId: unique("CATALOG_PRODUCT_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const catalogProductFrontendAction = mysqlTable("catalog_product_frontend_action", {
	actionId: bigint("action_id", { mode: "number" }).autoincrement().notNull(),
	typeId: varchar("type_id", { length: 64 }).notNull(),
	visitorId: int("visitor_id").default('NULL'),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	addedAt: bigint("added_at", { mode: "number" }).notNull(),
},
(table) => {
	return {
		catalogProductFrontendActionVisitorIdProductIdTypeId: unique("CATALOG_PRODUCT_FRONTEND_ACTION_VISITOR_ID_PRODUCT_ID_TYPE_ID").on(table.visitorId, table.productId, table.typeId),
		catalogProductFrontendActionCustomerIdProductIdTypeId: unique("CATALOG_PRODUCT_FRONTEND_ACTION_CUSTOMER_ID_PRODUCT_ID_TYPE_ID").on(table.customerId, table.productId, table.typeId),
	}
});

export const catalogProductIndexEav = mysqlTable("catalog_product_index_eav", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: int("value").notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavStoreId: index("CATALOG_PRODUCT_INDEX_EAV_STORE_ID").on(table.storeId),
		catalogProductIndexEavValue: index("CATALOG_PRODUCT_INDEX_EAV_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavDecimal = mysqlTable("catalog_product_index_eav_decimal", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: decimal("value", { precision: 12, scale: 4 }).notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavDecimalAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavDecimalStoreId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_STORE_ID").on(table.storeId),
		catalogProductIndexEavDecimalValue: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavDecimalIdx = mysqlTable("catalog_product_index_eav_decimal_idx", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: decimal("value", { precision: 12, scale: 4 }).notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavDecimalIdxAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_IDX_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavDecimalIdxStoreId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_IDX_STORE_ID").on(table.storeId),
		catalogProductIndexEavDecimalIdxValue: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_IDX_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavDecimalReplica = mysqlTable("catalog_product_index_eav_decimal_replica", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: decimal("value", { precision: 12, scale: 4 }).notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavDecimalAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavDecimalStoreId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_STORE_ID").on(table.storeId),
		catalogProductIndexEavDecimalValue: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavDecimalTmp = mysqlTable("catalog_product_index_eav_decimal_tmp", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: decimal("value", { precision: 12, scale: 4 }).notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavDecimalTmpAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_TMP_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavDecimalTmpStoreId: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_TMP_STORE_ID").on(table.storeId),
		catalogProductIndexEavDecimalTmpValue: index("CATALOG_PRODUCT_INDEX_EAV_DECIMAL_TMP_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavIdx = mysqlTable("catalog_product_index_eav_idx", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: int("value").notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavIdxAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_IDX_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavIdxStoreId: index("CATALOG_PRODUCT_INDEX_EAV_IDX_STORE_ID").on(table.storeId),
		catalogProductIndexEavIdxValue: index("CATALOG_PRODUCT_INDEX_EAV_IDX_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavReplica = mysqlTable("catalog_product_index_eav_replica", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: int("value").notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavStoreId: index("CATALOG_PRODUCT_INDEX_EAV_STORE_ID").on(table.storeId),
		catalogProductIndexEavValue: index("CATALOG_PRODUCT_INDEX_EAV_VALUE").on(table.value),
	}
});

export const catalogProductIndexEavTmp = mysqlTable("catalog_product_index_eav_tmp", {
	entityId: int("entity_id").notNull(),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull(),
	value: int("value").notNull(),
	sourceId: int("source_id").default(0).notNull(),
},
(table) => {
	return {
		catalogProductIndexEavTmpAttributeId: index("CATALOG_PRODUCT_INDEX_EAV_TMP_ATTRIBUTE_ID").on(table.attributeId),
		catalogProductIndexEavTmpStoreId: index("CATALOG_PRODUCT_INDEX_EAV_TMP_STORE_ID").on(table.storeId),
		catalogProductIndexEavTmpValue: index("CATALOG_PRODUCT_INDEX_EAV_TMP_VALUE").on(table.value),
	}
});

export const catalogProductIndexPrice = mysqlTable("catalog_product_index_price", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	finalPrice: decimal("final_price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
},
(table) => {
	return {
		catalogProductIndexPriceCustomerGroupId: index("CATALOG_PRODUCT_INDEX_PRICE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogProductIndexPriceMinPrice: index("CATALOG_PRODUCT_INDEX_PRICE_MIN_PRICE").on(table.minPrice),
		catPrdIdxPriceWsIdCstrGroupIdMinPrice: index("CAT_PRD_IDX_PRICE_WS_ID_CSTR_GROUP_ID_MIN_PRICE").on(table.websiteId, table.customerGroupId, table.minPrice),
	}
});

export const catalogProductIndexPriceBundleIdx = mysqlTable("catalog_product_index_price_bundle_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	priceType: smallint("price_type").notNull(),
	specialPrice: decimal("special_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPercent: decimal("tier_percent", { precision: 20, scale: 6 }).default('NULL'),
	origPrice: decimal("orig_price", { precision: 20, scale: 6 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	baseTier: decimal("base_tier", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceBundleOptIdx = mysqlTable("catalog_product_index_price_bundle_opt_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	altPrice: decimal("alt_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	altTierPrice: decimal("alt_tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceBundleOptTmp = mysqlTable("catalog_product_index_price_bundle_opt_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	altPrice: decimal("alt_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	altTierPrice: decimal("alt_tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceBundleSelIdx = mysqlTable("catalog_product_index_price_bundle_sel_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	selectionId: int("selection_id").default(0).notNull(),
	groupType: smallint("group_type"),
	isRequired: smallint("is_required"),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceBundleSelTmp = mysqlTable("catalog_product_index_price_bundle_sel_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	selectionId: int("selection_id").default(0).notNull(),
	groupType: smallint("group_type"),
	isRequired: smallint("is_required"),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceBundleTmp = mysqlTable("catalog_product_index_price_bundle_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	priceType: smallint("price_type").notNull(),
	specialPrice: decimal("special_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPercent: decimal("tier_percent", { precision: 20, scale: 6 }).default('NULL'),
	origPrice: decimal("orig_price", { precision: 20, scale: 6 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	baseTier: decimal("base_tier", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceCfgOptAgrIdx = mysqlTable("catalog_product_index_price_cfg_opt_agr_idx", {
	parentId: int("parent_id").notNull(),
	childId: int("child_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceCfgOptAgrTmp = mysqlTable("catalog_product_index_price_cfg_opt_agr_tmp", {
	parentId: int("parent_id").notNull(),
	childId: int("child_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceCfgOptIdx = mysqlTable("catalog_product_index_price_cfg_opt_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceCfgOptTmp = mysqlTable("catalog_product_index_price_cfg_opt_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceDownlodIdx = mysqlTable("catalog_product_index_price_downlod_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
});

export const catalogProductIndexPriceDownlodTmp = mysqlTable("catalog_product_index_price_downlod_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
});

export const catalogProductIndexPriceFinalIdx = mysqlTable("catalog_product_index_price_final_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	origPrice: decimal("orig_price", { precision: 20, scale: 6 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	baseTier: decimal("base_tier", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceFinalTmp = mysqlTable("catalog_product_index_price_final_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	origPrice: decimal("orig_price", { precision: 20, scale: 6 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	baseTier: decimal("base_tier", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceIdx = mysqlTable("catalog_product_index_price_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	finalPrice: decimal("final_price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
},
(table) => {
	return {
		catalogProductIndexPriceIdxCustomerGroupId: index("CATALOG_PRODUCT_INDEX_PRICE_IDX_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogProductIndexPriceIdxWebsiteId: index("CATALOG_PRODUCT_INDEX_PRICE_IDX_WEBSITE_ID").on(table.websiteId),
		catalogProductIndexPriceIdxMinPrice: index("CATALOG_PRODUCT_INDEX_PRICE_IDX_MIN_PRICE").on(table.minPrice),
	}
});

export const catalogProductIndexPriceOptAgrIdx = mysqlTable("catalog_product_index_price_opt_agr_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceOptAgrTmp = mysqlTable("catalog_product_index_price_opt_agr_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	optionId: int("option_id").default(0).notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceOptIdx = mysqlTable("catalog_product_index_price_opt_idx", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceOptTmp = mysqlTable("catalog_product_index_price_opt_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
});

export const catalogProductIndexPriceReplica = mysqlTable("catalog_product_index_price_replica", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	finalPrice: decimal("final_price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
},
(table) => {
	return {
		catalogProductIndexPriceCustomerGroupId: index("CATALOG_PRODUCT_INDEX_PRICE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogProductIndexPriceMinPrice: index("CATALOG_PRODUCT_INDEX_PRICE_MIN_PRICE").on(table.minPrice),
		catPrdIdxPriceWsIdCstrGroupIdMinPrice: index("CAT_PRD_IDX_PRICE_WS_ID_CSTR_GROUP_ID_MIN_PRICE").on(table.websiteId, table.customerGroupId, table.minPrice),
	}
});

export const catalogProductIndexPriceTmp = mysqlTable("catalog_product_index_price_tmp", {
	entityId: int("entity_id").notNull(),
	customerGroupId: int("customer_group_id").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
	taxClassId: smallint("tax_class_id"),
	price: decimal("price", { precision: 20, scale: 6 }).default('NULL'),
	finalPrice: decimal("final_price", { precision: 20, scale: 6 }).default('NULL'),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
	maxPrice: decimal("max_price", { precision: 20, scale: 6 }).default('NULL'),
	tierPrice: decimal("tier_price", { precision: 20, scale: 6 }).default('NULL'),
	id: int("id").autoincrement().notNull(),
});

export const catalogProductIndexTierPrice = mysqlTable("catalog_product_index_tier_price", {
	entityId: int("entity_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerGroupId: int("customer_group_id").notNull().references(() => customerGroup.customerGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	minPrice: decimal("min_price", { precision: 20, scale: 6 }).default('NULL'),
},
(table) => {
	return {
		catalogProductIndexTierPriceCustomerGroupId: index("CATALOG_PRODUCT_INDEX_TIER_PRICE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		catalogProductIndexTierPriceWebsiteId: index("CATALOG_PRODUCT_INDEX_TIER_PRICE_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogProductIndexWebsite = mysqlTable("catalog_product_index_website", {
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	defaultStoreId: smallint("default_store_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	websiteDate: date("website_date", { mode: 'string' }).default('NULL'),
	rate: float("rate").default(1),
},
(table) => {
	return {
		catalogProductIndexWebsiteWebsiteDate: index("CATALOG_PRODUCT_INDEX_WEBSITE_WEBSITE_DATE").on(table.websiteDate),
	}
});

export const catalogProductLink = mysqlTable("catalog_product_link", {
	linkId: int("link_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	linkedProductId: int("linked_product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	linkTypeId: smallint("link_type_id").notNull().references(() => catalogProductLinkType.linkTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogProductLinkProductId: index("CATALOG_PRODUCT_LINK_PRODUCT_ID").on(table.productId),
		catalogProductLinkLinkedProductId: index("CATALOG_PRODUCT_LINK_LINKED_PRODUCT_ID").on(table.linkedProductId),
		catalogProductLinkLinkTypeIdProductIdLinkedProductId: unique("CATALOG_PRODUCT_LINK_LINK_TYPE_ID_PRODUCT_ID_LINKED_PRODUCT_ID").on(table.linkTypeId, table.productId, table.linkedProductId),
	}
});

export const catalogProductLinkAttribute = mysqlTable("catalog_product_link_attribute", {
	productLinkAttributeId: smallint("product_link_attribute_id").autoincrement().notNull(),
	linkTypeId: smallint("link_type_id").notNull().references(() => catalogProductLinkType.linkTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productLinkAttributeCode: varchar("product_link_attribute_code", { length: 32 }).default('NULL'),
	dataType: varchar("data_type", { length: 32 }).default('NULL'),
},
(table) => {
	return {
		catalogProductLinkAttributeLinkTypeId: index("CATALOG_PRODUCT_LINK_ATTRIBUTE_LINK_TYPE_ID").on(table.linkTypeId),
	}
});

export const catalogProductLinkAttributeDecimal = mysqlTable("catalog_product_link_attribute_decimal", {
	valueId: int("value_id").autoincrement().notNull(),
	productLinkAttributeId: smallint("product_link_attribute_id").default('NULL').references(() => catalogProductLinkAttribute.productLinkAttributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	linkId: int("link_id").notNull().references(() => catalogProductLink.linkId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 20, scale: 6 }).default('0.000000').notNull(),
},
(table) => {
	return {
		catalogProductLinkAttributeDecimalLinkId: index("CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL_LINK_ID").on(table.linkId),
		catPrdLnkAttrDecPrdLnkAttrIdLnkId: unique("CAT_PRD_LNK_ATTR_DEC_PRD_LNK_ATTR_ID_LNK_ID").on(table.productLinkAttributeId, table.linkId),
	}
});

export const catalogProductLinkAttributeInt = mysqlTable("catalog_product_link_attribute_int", {
	valueId: int("value_id").autoincrement().notNull(),
	productLinkAttributeId: smallint("product_link_attribute_id").default('NULL').references(() => catalogProductLinkAttribute.productLinkAttributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	linkId: int("link_id").notNull().references(() => catalogProductLink.linkId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: int("value").default(0).notNull(),
},
(table) => {
	return {
		catalogProductLinkAttributeIntLinkId: index("CATALOG_PRODUCT_LINK_ATTRIBUTE_INT_LINK_ID").on(table.linkId),
		catPrdLnkAttrIntPrdLnkAttrIdLnkId: unique("CAT_PRD_LNK_ATTR_INT_PRD_LNK_ATTR_ID_LNK_ID").on(table.productLinkAttributeId, table.linkId),
	}
});

export const catalogProductLinkAttributeVarchar = mysqlTable("catalog_product_link_attribute_varchar", {
	valueId: int("value_id").autoincrement().notNull(),
	productLinkAttributeId: smallint("product_link_attribute_id").notNull().references(() => catalogProductLinkAttribute.productLinkAttributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	linkId: int("link_id").notNull().references(() => catalogProductLink.linkId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductLinkAttributeVarcharLinkId: index("CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR_LINK_ID").on(table.linkId),
		catPrdLnkAttrVchrPrdLnkAttrIdLnkId: unique("CAT_PRD_LNK_ATTR_VCHR_PRD_LNK_ATTR_ID_LNK_ID").on(table.productLinkAttributeId, table.linkId),
	}
});

export const catalogProductLinkType = mysqlTable("catalog_product_link_type", {
	linkTypeId: smallint("link_type_id").autoincrement().notNull(),
	code: varchar("code", { length: 32 }).default('NULL'),
});

export const catalogProductOption = mysqlTable("catalog_product_option", {
	optionId: int("option_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	type: varchar("type", { length: 50 }).default('NULL'),
	isRequire: smallint("is_require").default(1).notNull(),
	sku: varchar("sku", { length: 64 }).default('NULL'),
	maxCharacters: int("max_characters").default('NULL'),
	fileExtension: varchar("file_extension", { length: 50 }).default('NULL'),
	imageSizeX: smallint("image_size_x").default('NULL'),
	imageSizeY: smallint("image_size_y").default('NULL'),
	sortOrder: int("sort_order").default(0).notNull(),
},
(table) => {
	return {
		catalogProductOptionProductId: index("CATALOG_PRODUCT_OPTION_PRODUCT_ID").on(table.productId),
	}
});

export const catalogProductOptionPrice = mysqlTable("catalog_product_option_price", {
	optionPriceId: int("option_price_id").autoincrement().notNull(),
	optionId: int("option_id").default(0).notNull().references(() => catalogProductOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	price: decimal("price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	priceType: varchar("price_type", { length: 7 }).default(''fixed'').notNull(),
},
(table) => {
	return {
		catalogProductOptionPriceStoreId: index("CATALOG_PRODUCT_OPTION_PRICE_STORE_ID").on(table.storeId),
		catalogProductOptionPriceOptionIdStoreId: unique("CATALOG_PRODUCT_OPTION_PRICE_OPTION_ID_STORE_ID").on(table.optionId, table.storeId),
	}
});

export const catalogProductOptionTitle = mysqlTable("catalog_product_option_title", {
	optionTitleId: int("option_title_id").autoincrement().notNull(),
	optionId: int("option_id").default(0).notNull().references(() => catalogProductOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar("title", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductOptionTitleStoreId: index("CATALOG_PRODUCT_OPTION_TITLE_STORE_ID").on(table.storeId),
		catalogProductOptionTitleOptionIdStoreId: unique("CATALOG_PRODUCT_OPTION_TITLE_OPTION_ID_STORE_ID").on(table.optionId, table.storeId),
	}
});

export const catalogProductOptionTypePrice = mysqlTable("catalog_product_option_type_price", {
	optionTypePriceId: int("option_type_price_id").autoincrement().notNull(),
	optionTypeId: int("option_type_id").default(0).notNull().references(() => catalogProductOptionTypeValue.optionTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	price: decimal("price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	priceType: varchar("price_type", { length: 7 }).default(''fixed'').notNull(),
},
(table) => {
	return {
		catalogProductOptionTypePriceStoreId: index("CATALOG_PRODUCT_OPTION_TYPE_PRICE_STORE_ID").on(table.storeId),
		catalogProductOptionTypePriceOptionTypeIdStoreId: unique("CATALOG_PRODUCT_OPTION_TYPE_PRICE_OPTION_TYPE_ID_STORE_ID").on(table.optionTypeId, table.storeId),
	}
});

export const catalogProductOptionTypeTitle = mysqlTable("catalog_product_option_type_title", {
	optionTypeTitleId: int("option_type_title_id").autoincrement().notNull(),
	optionTypeId: int("option_type_id").default(0).notNull().references(() => catalogProductOptionTypeValue.optionTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar("title", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductOptionTypeTitleStoreId: index("CATALOG_PRODUCT_OPTION_TYPE_TITLE_STORE_ID").on(table.storeId),
		catalogProductOptionTypeTitleOptionTypeIdStoreId: unique("CATALOG_PRODUCT_OPTION_TYPE_TITLE_OPTION_TYPE_ID_STORE_ID").on(table.optionTypeId, table.storeId),
	}
});

export const catalogProductOptionTypeValue = mysqlTable("catalog_product_option_type_value", {
	optionTypeId: int("option_type_id").autoincrement().notNull(),
	optionId: int("option_id").default(0).notNull().references(() => catalogProductOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sku: varchar("sku", { length: 64 }).default('NULL'),
	sortOrder: int("sort_order").default(0).notNull(),
},
(table) => {
	return {
		catalogProductOptionTypeValueOptionId: index("CATALOG_PRODUCT_OPTION_TYPE_VALUE_OPTION_ID").on(table.optionId),
	}
});

export const catalogProductPriceCl = mysqlTable("catalog_product_price_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const catalogProductRelation = mysqlTable("catalog_product_relation", {
	parentId: int("parent_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	childId: int("child_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogProductRelationChildId: index("CATALOG_PRODUCT_RELATION_CHILD_ID").on(table.childId),
	}
});

export const catalogProductSuperAttribute = mysqlTable("catalog_product_super_attribute", {
	productSuperAttributeId: int("product_super_attribute_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull(),
	position: smallint("position").notNull(),
},
(table) => {
	return {
		catalogProductSuperAttributeProductIdAttributeId: unique("CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRODUCT_ID_ATTRIBUTE_ID").on(table.productId, table.attributeId),
	}
});

export const catalogProductSuperAttributeLabel = mysqlTable("catalog_product_super_attribute_label", {
	valueId: int("value_id").autoincrement().notNull(),
	productSuperAttributeId: int("product_super_attribute_id").default(0).notNull().references(() => catalogProductSuperAttribute.productSuperAttributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	useDefault: smallint("use_default"),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		catalogProductSuperAttributeLabelStoreId: index("CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_STORE_ID").on(table.storeId),
		catPrdSprAttrLblPrdSprAttrIdStoreId: unique("CAT_PRD_SPR_ATTR_LBL_PRD_SPR_ATTR_ID_STORE_ID").on(table.productSuperAttributeId, table.storeId),
	}
});

export const catalogProductSuperLink = mysqlTable("catalog_product_super_link", {
	linkId: int("link_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	parentId: int("parent_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogProductSuperLinkParentId: index("CATALOG_PRODUCT_SUPER_LINK_PARENT_ID").on(table.parentId),
		catalogProductSuperLinkProductIdParentId: unique("CATALOG_PRODUCT_SUPER_LINK_PRODUCT_ID_PARENT_ID").on(table.productId, table.parentId),
	}
});

export const catalogProductWebsite = mysqlTable("catalog_product_website", {
	productId: int("product_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogProductWebsiteWebsiteId: index("CATALOG_PRODUCT_WEBSITE_WEBSITE_ID").on(table.websiteId),
	}
});

export const catalogUrlRewriteProductCategory = mysqlTable("catalog_url_rewrite_product_category", {
	urlRewriteId: int("url_rewrite_id").notNull().references(() => urlRewrite.urlRewriteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	categoryId: int("category_id").notNull().references(() => catalogCategoryEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		catalogUrlRewriteProductCategoryCategoryIdProductId: index("CATALOG_URL_REWRITE_PRODUCT_CATEGORY_CATEGORY_ID_PRODUCT_ID").on(table.categoryId, table.productId),
	}
});

export const checkoutAgreement = mysqlTable("checkout_agreement", {
	agreementId: int("agreement_id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
	content: text("content").default('NULL'),
	contentHeight: varchar("content_height", { length: 25 }).default('NULL'),
	checkboxText: text("checkbox_text").default('NULL'),
	isActive: smallint("is_active").notNull(),
	isHtml: smallint("is_html").notNull(),
	mode: smallint("mode").notNull(),
});

export const checkoutAgreementStore = mysqlTable("checkout_agreement_store", {
	agreementId: int("agreement_id").notNull().references(() => checkoutAgreement.agreementId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const cmsBlock = mysqlTable("cms_block", {
	blockId: smallint("block_id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	identifier: varchar("identifier", { length: 255 }).notNull(),
	content: mediumtext("content").default('NULL'),
	creationTime: timestamp("creation_time", { mode: 'string' }).default('current_timestamp()').notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default('current_timestamp()').notNull(),
	isActive: smallint("is_active").default(1).notNull(),
},
(table) => {
	return {
		cmsBlockIdentifier: index("CMS_BLOCK_IDENTIFIER").on(table.identifier),
		cmsBlockTitleIdentifierContent: index("CMS_BLOCK_TITLE_IDENTIFIER_CONTENT").on(table.title, table.identifier, table.content),
	}
});

export const cmsBlockStore = mysqlTable("cms_block_store", {
	blockId: smallint("block_id").notNull().references(() => cmsBlock.blockId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		cmsBlockStoreStoreId: index("CMS_BLOCK_STORE_STORE_ID").on(table.storeId),
	}
});

export const cmsPage = mysqlTable("cms_page", {
	pageId: smallint("page_id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).default('NULL'),
	pageLayout: varchar("page_layout", { length: 255 }).default('NULL'),
	metaKeywords: text("meta_keywords").default('NULL'),
	metaDescription: text("meta_description").default('NULL'),
	identifier: varchar("identifier", { length: 100 }).default('NULL'),
	contentHeading: varchar("content_heading", { length: 255 }).default('NULL'),
	content: mediumtext("content").default('NULL'),
	creationTime: timestamp("creation_time", { mode: 'string' }).default('current_timestamp()').notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).default('current_timestamp()').notNull(),
	isActive: smallint("is_active").default(1).notNull(),
	sortOrder: smallint("sort_order").notNull(),
	layoutUpdateXml: text("layout_update_xml").default('NULL'),
	customTheme: varchar("custom_theme", { length: 100 }).default('NULL'),
	customRootTemplate: varchar("custom_root_template", { length: 255 }).default('NULL'),
	customLayoutUpdateXml: text("custom_layout_update_xml").default('NULL'),
	layoutUpdateSelected: varchar("layout_update_selected", { length: 128 }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	customThemeFrom: date("custom_theme_from", { mode: 'string' }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	customThemeTo: date("custom_theme_to", { mode: 'string' }).default('NULL'),
	metaTitle: varchar("meta_title", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		cmsPageIdentifier: index("CMS_PAGE_IDENTIFIER").on(table.identifier),
		cmsPageTitleMetaKeywordsMetaDescriptionIdentifierContent: index("CMS_PAGE_TITLE_META_KEYWORDS_META_DESCRIPTION_IDENTIFIER_CONTENT").on(table.title, table.metaKeywords, table.metaDescription, table.identifier, table.content),
	}
});

export const cmsPageStore = mysqlTable("cms_page_store", {
	pageId: smallint("page_id").notNull().references(() => cmsPage.pageId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		cmsPageStoreStoreId: index("CMS_PAGE_STORE_STORE_ID").on(table.storeId),
	}
});

export const coreConfigData = mysqlTable("core_config_data", {
	configId: int("config_id").autoincrement().notNull(),
	scope: varchar("scope", { length: 8 }).default(''default'').notNull(),
	scopeId: int("scope_id").default(0).notNull(),
	path: varchar("path", { length: 255 }).default(''general'').notNull(),
	value: text("value").default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		coreConfigDataScopeScopeIdPath: unique("CORE_CONFIG_DATA_SCOPE_SCOPE_ID_PATH").on(table.scope, table.scopeId, table.path),
	}
});

export const cronSchedule = mysqlTable("cron_schedule", {
	scheduleId: int("schedule_id").autoincrement().notNull(),
	jobCode: varchar("job_code", { length: 255 }).default(''0'').notNull(),
	status: varchar("status", { length: 7 }).default(''pending'').notNull(),
	messages: text("messages").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	scheduledAt: timestamp("scheduled_at", { mode: 'string' }).default('NULL'),
	executedAt: timestamp("executed_at", { mode: 'string' }).default('NULL'),
	finishedAt: timestamp("finished_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		cronScheduleJobCodeStatusScheduledAt: index("CRON_SCHEDULE_JOB_CODE_STATUS_SCHEDULED_AT").on(table.jobCode, table.status, table.scheduledAt),
	}
});

export const customerAddressEntity = mysqlTable("customer_address_entity", {
	entityId: int("entity_id").autoincrement().notNull(),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	parentId: int("parent_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	isActive: smallint("is_active").default(1).notNull(),
	city: varchar("city", { length: 255 }).notNull(),
	company: varchar("company", { length: 255 }).default('NULL'),
	countryId: varchar("country_id", { length: 255 }).notNull(),
	fax: varchar("fax", { length: 255 }).default('NULL'),
	firstname: varchar("firstname", { length: 255 }).notNull(),
	lastname: varchar("lastname", { length: 255 }).notNull(),
	middlename: varchar("middlename", { length: 255 }).default('NULL'),
	postcode: varchar("postcode", { length: 255 }).default('NULL'),
	prefix: varchar("prefix", { length: 40 }).default('NULL'),
	region: varchar("region", { length: 255 }).default('NULL'),
	regionId: int("region_id").default('NULL'),
	street: text("street").notNull(),
	suffix: varchar("suffix", { length: 40 }).default('NULL'),
	telephone: varchar("telephone", { length: 255 }).notNull(),
	vatId: varchar("vat_id", { length: 255 }).default('NULL'),
	vatIsValid: int("vat_is_valid").default('NULL'),
	vatRequestDate: varchar("vat_request_date", { length: 255 }).default('NULL'),
	vatRequestId: varchar("vat_request_id", { length: 255 }).default('NULL'),
	vatRequestSuccess: int("vat_request_success").default('NULL'),
},
(table) => {
	return {
		customerAddressEntityParentId: index("CUSTOMER_ADDRESS_ENTITY_PARENT_ID").on(table.parentId),
	}
});

export const customerAddressEntityDatetime = mysqlTable("customer_address_entity_datetime", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerAddressEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: datetime("value", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		customerAddressEntityDatetimeAttributeId: index("CUSTOMER_ADDRESS_ENTITY_DATETIME_ATTRIBUTE_ID").on(table.attributeId),
		customerAddressEntityDatetimeEntityIdAttributeIdValue: index("CUSTOMER_ADDRESS_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerAddressEntityDatetimeEntityIdAttributeId: unique("CUSTOMER_ADDRESS_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerAddressEntityDecimal = mysqlTable("customer_address_entity_decimal", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerAddressEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 12, scale: 4 }).default('0.0000').notNull(),
},
(table) => {
	return {
		customerAddressEntityDecimalAttributeId: index("CUSTOMER_ADDRESS_ENTITY_DECIMAL_ATTRIBUTE_ID").on(table.attributeId),
		customerAddressEntityDecimalEntityIdAttributeIdValue: index("CUSTOMER_ADDRESS_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerAddressEntityDecimalEntityIdAttributeId: unique("CUSTOMER_ADDRESS_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerAddressEntityInt = mysqlTable("customer_address_entity_int", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerAddressEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: int("value").default(0).notNull(),
},
(table) => {
	return {
		customerAddressEntityIntAttributeId: index("CUSTOMER_ADDRESS_ENTITY_INT_ATTRIBUTE_ID").on(table.attributeId),
		customerAddressEntityIntEntityIdAttributeIdValue: index("CUSTOMER_ADDRESS_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerAddressEntityIntEntityIdAttributeId: unique("CUSTOMER_ADDRESS_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerAddressEntityText = mysqlTable("customer_address_entity_text", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerAddressEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: text("value").notNull(),
},
(table) => {
	return {
		customerAddressEntityTextAttributeId: index("CUSTOMER_ADDRESS_ENTITY_TEXT_ATTRIBUTE_ID").on(table.attributeId),
		customerAddressEntityTextEntityIdAttributeId: unique("CUSTOMER_ADDRESS_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerAddressEntityVarchar = mysqlTable("customer_address_entity_varchar", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerAddressEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		customerAddressEntityVarcharAttributeId: index("CUSTOMER_ADDRESS_ENTITY_VARCHAR_ATTRIBUTE_ID").on(table.attributeId),
		customerAddressEntityVarcharEntityIdAttributeIdValue: index("CUSTOMER_ADDRESS_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerAddressEntityVarcharEntityIdAttributeId: unique("CUSTOMER_ADDRESS_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerDummyCl = mysqlTable("customer_dummy_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const customerEavAttribute = mysqlTable("customer_eav_attribute", {
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isVisible: smallint("is_visible").default(1).notNull(),
	inputFilter: varchar("input_filter", { length: 255 }).default('NULL'),
	multilineCount: smallint("multiline_count").default(1).notNull(),
	validateRules: text("validate_rules").default('NULL'),
	isSystem: smallint("is_system").notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
	dataModel: varchar("data_model", { length: 255 }).default('NULL'),
	isUsedInGrid: smallint("is_used_in_grid").notNull(),
	isVisibleInGrid: smallint("is_visible_in_grid").notNull(),
	isFilterableInGrid: smallint("is_filterable_in_grid").notNull(),
	isSearchableInGrid: smallint("is_searchable_in_grid").notNull(),
	gridFilterConditionType: smallint("grid_filter_condition_type").notNull(),
},
(table) => {
	return {
		customerEavAttributeSortOrder: index("CUSTOMER_EAV_ATTRIBUTE_SORT_ORDER").on(table.sortOrder),
	}
});

export const customerEavAttributeWebsite = mysqlTable("customer_eav_attribute_website", {
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isVisible: smallint("is_visible").default('NULL'),
	isRequired: smallint("is_required").default('NULL'),
	defaultValue: text("default_value").default('NULL'),
	multilineCount: smallint("multiline_count").default('NULL'),
},
(table) => {
	return {
		customerEavAttributeWebsiteWebsiteId: index("CUSTOMER_EAV_ATTRIBUTE_WEBSITE_WEBSITE_ID").on(table.websiteId),
	}
});

export const customerEntity = mysqlTable("customer_entity", {
	entityId: int("entity_id").autoincrement().notNull(),
	websiteId: smallint("website_id").default('NULL').references(() => storeWebsite.websiteId, { onDelete: "set null", onUpdate: "restrict" } ),
	email: varchar("email", { length: 255 }).default('NULL'),
	groupId: smallint("group_id").notNull(),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	storeId: smallint("store_id").references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	isActive: smallint("is_active").default(1).notNull(),
	disableAutoGroupChange: smallint("disable_auto_group_change").notNull(),
	createdIn: varchar("created_in", { length: 255 }).default('NULL'),
	prefix: varchar("prefix", { length: 40 }).default('NULL'),
	firstname: varchar("firstname", { length: 255 }).default('NULL'),
	middlename: varchar("middlename", { length: 255 }).default('NULL'),
	lastname: varchar("lastname", { length: 255 }).default('NULL'),
	suffix: varchar("suffix", { length: 40 }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date("dob", { mode: 'string' }).default('NULL'),
	passwordHash: varchar("password_hash", { length: 128 }).default('NULL'),
	rpToken: varchar("rp_token", { length: 128 }).default('NULL'),
	rpTokenCreatedAt: datetime("rp_token_created_at", { mode: 'string'}).default('NULL'),
	defaultBilling: int("default_billing").default('NULL'),
	defaultShipping: int("default_shipping").default('NULL'),
	taxvat: varchar("taxvat", { length: 50 }).default('NULL'),
	confirmation: varchar("confirmation", { length: 64 }).default('NULL'),
	gender: smallint("gender").default('NULL'),
	failuresNum: smallint("failures_num"),
	firstFailure: timestamp("first_failure", { mode: 'string' }).default('NULL'),
	lockExpires: timestamp("lock_expires", { mode: 'string' }).default('NULL'),
	sessionCutoff: timestamp("session_cutoff", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		customerEntityStoreId: index("CUSTOMER_ENTITY_STORE_ID").on(table.storeId),
		customerEntityWebsiteId: index("CUSTOMER_ENTITY_WEBSITE_ID").on(table.websiteId),
		customerEntityFirstname: index("CUSTOMER_ENTITY_FIRSTNAME").on(table.firstname),
		customerEntityLastname: index("CUSTOMER_ENTITY_LASTNAME").on(table.lastname),
		customerEntityEmailWebsiteId: unique("CUSTOMER_ENTITY_EMAIL_WEBSITE_ID").on(table.email, table.websiteId),
	}
});

export const customerEntityDatetime = mysqlTable("customer_entity_datetime", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: datetime("value", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		customerEntityDatetimeAttributeId: index("CUSTOMER_ENTITY_DATETIME_ATTRIBUTE_ID").on(table.attributeId),
		customerEntityDatetimeEntityIdAttributeIdValue: index("CUSTOMER_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerEntityDatetimeEntityIdAttributeId: unique("CUSTOMER_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerEntityDecimal = mysqlTable("customer_entity_decimal", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 12, scale: 4 }).default('0.0000').notNull(),
},
(table) => {
	return {
		customerEntityDecimalAttributeId: index("CUSTOMER_ENTITY_DECIMAL_ATTRIBUTE_ID").on(table.attributeId),
		customerEntityDecimalEntityIdAttributeIdValue: index("CUSTOMER_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerEntityDecimalEntityIdAttributeId: unique("CUSTOMER_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerEntityInt = mysqlTable("customer_entity_int", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: int("value").default(0).notNull(),
},
(table) => {
	return {
		customerEntityIntAttributeId: index("CUSTOMER_ENTITY_INT_ATTRIBUTE_ID").on(table.attributeId),
		customerEntityIntEntityIdAttributeIdValue: index("CUSTOMER_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerEntityIntEntityIdAttributeId: unique("CUSTOMER_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerEntityText = mysqlTable("customer_entity_text", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: text("value").notNull(),
},
(table) => {
	return {
		customerEntityTextAttributeId: index("CUSTOMER_ENTITY_TEXT_ATTRIBUTE_ID").on(table.attributeId),
		customerEntityTextEntityIdAttributeId: unique("CUSTOMER_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerEntityVarchar = mysqlTable("customer_entity_varchar", {
	valueId: int("value_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		customerEntityVarcharAttributeId: index("CUSTOMER_ENTITY_VARCHAR_ATTRIBUTE_ID").on(table.attributeId),
		customerEntityVarcharEntityIdAttributeIdValue: index("CUSTOMER_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_VALUE").on(table.entityId, table.attributeId, table.value),
		customerEntityVarcharEntityIdAttributeId: unique("CUSTOMER_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID").on(table.entityId, table.attributeId),
	}
});

export const customerFormAttribute = mysqlTable("customer_form_attribute", {
	formCode: varchar("form_code", { length: 32 }).notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		customerFormAttributeAttributeId: index("CUSTOMER_FORM_ATTRIBUTE_ATTRIBUTE_ID").on(table.attributeId),
	}
});

export const customerGridFlat = mysqlTable("customer_grid_flat", {
	entityId: int("entity_id").notNull(),
	name: text("name").default('NULL'),
	email: varchar("email", { length: 255 }).default('NULL'),
	groupId: int("group_id").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	websiteId: int("website_id").default('NULL'),
	confirmation: varchar("confirmation", { length: 255 }).default('NULL'),
	createdIn: text("created_in").default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date("dob", { mode: 'string' }).default('NULL'),
	gender: int("gender").default('NULL'),
	taxvat: varchar("taxvat", { length: 255 }).default('NULL'),
	lockExpires: timestamp("lock_expires", { mode: 'string' }).default('NULL'),
	shippingFull: text("shipping_full").default('NULL'),
	billingFull: text("billing_full").default('NULL'),
	billingFirstname: varchar("billing_firstname", { length: 255 }).default('NULL'),
	billingLastname: varchar("billing_lastname", { length: 255 }).default('NULL'),
	billingTelephone: varchar("billing_telephone", { length: 255 }).default('NULL'),
	billingPostcode: varchar("billing_postcode", { length: 255 }).default('NULL'),
	billingCountryId: varchar("billing_country_id", { length: 255 }).default('NULL'),
	billingRegion: varchar("billing_region", { length: 255 }).default('NULL'),
	billingRegionId: int("billing_region_id").default('NULL'),
	billingStreet: varchar("billing_street", { length: 255 }).default('NULL'),
	billingCity: varchar("billing_city", { length: 255 }).default('NULL'),
	billingFax: varchar("billing_fax", { length: 255 }).default('NULL'),
	billingVatId: varchar("billing_vat_id", { length: 255 }).default('NULL'),
	billingCompany: varchar("billing_company", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		customerGridFlatGroupId: index("CUSTOMER_GRID_FLAT_GROUP_ID").on(table.groupId),
		customerGridFlatCreatedAt: index("CUSTOMER_GRID_FLAT_CREATED_AT").on(table.createdAt),
		customerGridFlatWebsiteId: index("CUSTOMER_GRID_FLAT_WEBSITE_ID").on(table.websiteId),
		customerGridFlatConfirmation: index("CUSTOMER_GRID_FLAT_CONFIRMATION").on(table.confirmation),
		customerGridFlatDob: index("CUSTOMER_GRID_FLAT_DOB").on(table.dob),
		customerGridFlatGender: index("CUSTOMER_GRID_FLAT_GENDER").on(table.gender),
		customerGridFlatBillingCountryId: index("CUSTOMER_GRID_FLAT_BILLING_COUNTRY_ID").on(table.billingCountryId),
		fti8746F705702Dd5F6D45B8C7Ce7Fe9F2F: index("FTI_8746F705702DD5F6D45B8C7CE7FE9F2F").on(table.name, table.email, table.createdIn, table.taxvat, table.shippingFull, table.billingFull, table.billingFirstname, table.billingLastname, table.billingTelephone, table.billingPostcode, table.billingRegion, table.billingCity, table.billingFax, table.billingCompany),
	}
});

export const customerGroup = mysqlTable("customer_group", {
	customerGroupId: int("customer_group_id").autoincrement().notNull(),
	customerGroupCode: varchar("customer_group_code", { length: 32 }).notNull(),
	taxClassId: int("tax_class_id").default(0).notNull(),
});

export const customerGroupExcludedWebsite = mysqlTable("customer_group_excluded_website", {
	entityId: int("entity_id").autoincrement().notNull(),
	customerGroupId: int("customer_group_id").notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		customerGroupExcludedWebsiteCustomerGroupIdWebsiteId: index("CUSTOMER_GROUP_EXCLUDED_WEBSITE_CUSTOMER_GROUP_ID_WEBSITE_ID").on(table.customerGroupId, table.websiteId),
	}
});

export const customerLog = mysqlTable("customer_log", {
	logId: int("log_id").autoincrement().notNull(),
	customerId: int("customer_id").notNull(),
	lastLoginAt: timestamp("last_login_at", { mode: 'string' }).default('NULL'),
	lastLogoutAt: timestamp("last_logout_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		customerLogCustomerId: unique("CUSTOMER_LOG_CUSTOMER_ID").on(table.customerId),
	}
});

export const customerVisitor = mysqlTable("customer_visitor", {
	visitorId: bigint("visitor_id", { mode: "number" }).autoincrement().notNull(),
	customerId: int("customer_id").default('NULL'),
	sessionId: varchar("session_id", { length: 1 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	lastVisitAt: timestamp("last_visit_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		customerVisitorCustomerId: index("CUSTOMER_VISITOR_CUSTOMER_ID").on(table.customerId),
		customerVisitorLastVisitAt: index("CUSTOMER_VISITOR_LAST_VISIT_AT").on(table.lastVisitAt),
	}
});

export const dataExporterUuid = mysqlTable("data_exporter_uuid", {
	uuid: varchar("uuid", { length: 36 }).notNull(),
	entityId: int("entity_id").notNull(),
	type: varchar("type", { length: 36 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		dataExporterUuidEntityIdType: unique("DATA_EXPORTER_UUID_ENTITY_ID_TYPE").on(table.entityId, table.type),
	}
});

export const designChange = mysqlTable("design_change", {
	designChangeId: int("design_change_id").autoincrement().notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	design: varchar("design", { length: 255 }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateFrom: date("date_from", { mode: 'string' }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateTo: date("date_to", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		designChangeStoreId: index("DESIGN_CHANGE_STORE_ID").on(table.storeId),
	}
});

export const designConfigDummyCl = mysqlTable("design_config_dummy_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const designConfigGridFlat = mysqlTable("design_config_grid_flat", {
	entityId: int("entity_id").notNull(),
	storeWebsiteId: int("store_website_id").default('NULL'),
	storeGroupId: int("store_group_id").default('NULL'),
	storeId: int("store_id").default('NULL'),
	themeThemeId: varchar("theme_theme_id", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		designConfigGridFlatStoreWebsiteId: index("DESIGN_CONFIG_GRID_FLAT_STORE_WEBSITE_ID").on(table.storeWebsiteId),
		designConfigGridFlatStoreGroupId: index("DESIGN_CONFIG_GRID_FLAT_STORE_GROUP_ID").on(table.storeGroupId),
		designConfigGridFlatStoreId: index("DESIGN_CONFIG_GRID_FLAT_STORE_ID").on(table.storeId),
		designConfigGridFlatThemeThemeId: index("DESIGN_CONFIG_GRID_FLAT_THEME_THEME_ID").on(table.themeThemeId),
	}
});

export const directoryCountry = mysqlTable("directory_country", {
	countryId: varchar("country_id", { length: 2 }).notNull(),
	iso2Code: varchar("iso2_code", { length: 2 }).default('NULL'),
	iso3Code: varchar("iso3_code", { length: 3 }).default('NULL'),
});

export const directoryCountryFormat = mysqlTable("directory_country_format", {
	countryFormatId: int("country_format_id").autoincrement().notNull(),
	countryId: varchar("country_id", { length: 2 }).default('NULL'),
	type: varchar("type", { length: 30 }).default('NULL'),
	format: text("format").notNull(),
},
(table) => {
	return {
		directoryCountryFormatCountryIdType: unique("DIRECTORY_COUNTRY_FORMAT_COUNTRY_ID_TYPE").on(table.countryId, table.type),
	}
});

export const directoryCountryRegion = mysqlTable("directory_country_region", {
	regionId: int("region_id").autoincrement().notNull(),
	countryId: varchar("country_id", { length: 4 }).default(''0'').notNull(),
	code: varchar("code", { length: 32 }).default('NULL'),
	defaultName: varchar("default_name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		directoryCountryRegionCountryId: index("DIRECTORY_COUNTRY_REGION_COUNTRY_ID").on(table.countryId),
	}
});

export const directoryCountryRegionName = mysqlTable("directory_country_region_name", {
	locale: varchar("locale", { length: 16 }).notNull(),
	regionId: int("region_id").default(0).notNull().references(() => directoryCountryRegion.regionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	name: varchar("name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		directoryCountryRegionNameRegionId: index("DIRECTORY_COUNTRY_REGION_NAME_REGION_ID").on(table.regionId),
	}
});

export const directoryCurrencyRate = mysqlTable("directory_currency_rate", {
	currencyFrom: varchar("currency_from", { length: 3 }).notNull(),
	currencyTo: varchar("currency_to", { length: 3 }).notNull(),
	rate: decimal("rate", { precision: 24, scale: 12 }).default('0.000000000000').notNull(),
},
(table) => {
	return {
		directoryCurrencyRateCurrencyTo: index("DIRECTORY_CURRENCY_RATE_CURRENCY_TO").on(table.currencyTo),
	}
});

export const downloadableLink = mysqlTable("downloadable_link", {
	linkId: int("link_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sortOrder: int("sort_order").default(0).notNull(),
	numberOfDownloads: int("number_of_downloads").default('NULL'),
	isShareable: smallint("is_shareable").notNull(),
	linkUrl: varchar("link_url", { length: 255 }).default('NULL'),
	linkFile: varchar("link_file", { length: 255 }).default('NULL'),
	linkType: varchar("link_type", { length: 20 }).default('NULL'),
	sampleUrl: varchar("sample_url", { length: 255 }).default('NULL'),
	sampleFile: varchar("sample_file", { length: 255 }).default('NULL'),
	sampleType: varchar("sample_type", { length: 20 }).default('NULL'),
},
(table) => {
	return {
		downloadableLinkProductIdSortOrder: index("DOWNLOADABLE_LINK_PRODUCT_ID_SORT_ORDER").on(table.productId, table.sortOrder),
	}
});

export const downloadableLinkPrice = mysqlTable("downloadable_link_price", {
	priceId: int("price_id").autoincrement().notNull(),
	linkId: int("link_id").default(0).notNull().references(() => downloadableLink.linkId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	price: decimal("price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
},
(table) => {
	return {
		downloadableLinkPriceLinkId: index("DOWNLOADABLE_LINK_PRICE_LINK_ID").on(table.linkId),
		downloadableLinkPriceWebsiteId: index("DOWNLOADABLE_LINK_PRICE_WEBSITE_ID").on(table.websiteId),
	}
});

export const downloadableLinkPurchased = mysqlTable("downloadable_link_purchased", {
	purchasedId: int("purchased_id").autoincrement().notNull(),
	orderId: int("order_id").default(0).references(() => salesOrder.entityId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderIncrementId: varchar("order_increment_id", { length: 50 }).default('NULL'),
	orderItemId: int("order_item_id").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	customerId: int("customer_id").default(0).references(() => customerEntity.entityId, { onDelete: "set null", onUpdate: "restrict" } ),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productSku: varchar("product_sku", { length: 255 }).default('NULL'),
	linkSectionTitle: varchar("link_section_title", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		downloadableLinkPurchasedOrderId: index("DOWNLOADABLE_LINK_PURCHASED_ORDER_ID").on(table.orderId),
		downloadableLinkPurchasedOrderItemId: index("DOWNLOADABLE_LINK_PURCHASED_ORDER_ITEM_ID").on(table.orderItemId),
		downloadableLinkPurchasedCustomerId: index("DOWNLOADABLE_LINK_PURCHASED_CUSTOMER_ID").on(table.customerId),
	}
});

export const downloadableLinkPurchasedItem = mysqlTable("downloadable_link_purchased_item", {
	itemId: int("item_id").autoincrement().notNull(),
	purchasedId: int("purchased_id").default(0).notNull().references(() => downloadableLinkPurchased.purchasedId, { onDelete: "cascade", onUpdate: "restrict" } ),
	orderItemId: int("order_item_id").default(0).references(() => salesOrderItem.itemId, { onDelete: "set null", onUpdate: "restrict" } ),
	productId: int("product_id").default(0),
	linkHash: varchar("link_hash", { length: 255 }).default('NULL'),
	numberOfDownloadsBought: int("number_of_downloads_bought").default(0).notNull(),
	numberOfDownloadsUsed: int("number_of_downloads_used").default(0).notNull(),
	linkId: int("link_id").default(0).notNull(),
	linkTitle: varchar("link_title", { length: 255 }).default('NULL'),
	isShareable: smallint("is_shareable").notNull(),
	linkUrl: varchar("link_url", { length: 255 }).default('NULL'),
	linkFile: varchar("link_file", { length: 255 }).default('NULL'),
	linkType: varchar("link_type", { length: 255 }).default('NULL'),
	status: varchar("status", { length: 50 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		downloadableLinkPurchasedItemLinkHash: index("DOWNLOADABLE_LINK_PURCHASED_ITEM_LINK_HASH").on(table.linkHash),
		downloadableLinkPurchasedItemOrderItemId: index("DOWNLOADABLE_LINK_PURCHASED_ITEM_ORDER_ITEM_ID").on(table.orderItemId),
		downloadableLinkPurchasedItemPurchasedId: index("DOWNLOADABLE_LINK_PURCHASED_ITEM_PURCHASED_ID").on(table.purchasedId),
	}
});

export const downloadableLinkTitle = mysqlTable("downloadable_link_title", {
	titleId: int("title_id").autoincrement().notNull(),
	linkId: int("link_id").default(0).notNull().references(() => downloadableLink.linkId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar("title", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		downloadableLinkTitleStoreId: index("DOWNLOADABLE_LINK_TITLE_STORE_ID").on(table.storeId),
		downloadableLinkTitleLinkIdStoreId: unique("DOWNLOADABLE_LINK_TITLE_LINK_ID_STORE_ID").on(table.linkId, table.storeId),
	}
});

export const downloadableSample = mysqlTable("downloadable_sample", {
	sampleId: int("sample_id").autoincrement().notNull(),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sampleUrl: varchar("sample_url", { length: 255 }).default('NULL'),
	sampleFile: varchar("sample_file", { length: 255 }).default('NULL'),
	sampleType: varchar("sample_type", { length: 20 }).default('NULL'),
	sortOrder: int("sort_order").default(0).notNull(),
},
(table) => {
	return {
		downloadableSampleProductId: index("DOWNLOADABLE_SAMPLE_PRODUCT_ID").on(table.productId),
	}
});

export const downloadableSampleTitle = mysqlTable("downloadable_sample_title", {
	titleId: int("title_id").autoincrement().notNull(),
	sampleId: int("sample_id").default(0).notNull().references(() => downloadableSample.sampleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar("title", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		downloadableSampleTitleStoreId: index("DOWNLOADABLE_SAMPLE_TITLE_STORE_ID").on(table.storeId),
		downloadableSampleTitleSampleIdStoreId: unique("DOWNLOADABLE_SAMPLE_TITLE_SAMPLE_ID_STORE_ID").on(table.sampleId, table.storeId),
	}
});

export const eavAttribute = mysqlTable("eav_attribute", {
	attributeId: smallint("attribute_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeCode: varchar("attribute_code", { length: 255 }).notNull(),
	attributeModel: varchar("attribute_model", { length: 255 }).default('NULL'),
	backendModel: varchar("backend_model", { length: 255 }).default('NULL'),
	backendType: varchar("backend_type", { length: 8 }).default(''static'').notNull(),
	backendTable: varchar("backend_table", { length: 255 }).default('NULL'),
	frontendModel: varchar("frontend_model", { length: 255 }).default('NULL'),
	frontendInput: varchar("frontend_input", { length: 50 }).default('NULL'),
	frontendLabel: varchar("frontend_label", { length: 255 }).default('NULL'),
	frontendClass: varchar("frontend_class", { length: 255 }).default('NULL'),
	sourceModel: varchar("source_model", { length: 255 }).default('NULL'),
	isRequired: smallint("is_required").notNull(),
	isUserDefined: smallint("is_user_defined").notNull(),
	defaultValue: text("default_value").default('NULL'),
	isUnique: smallint("is_unique").notNull(),
	note: varchar("note", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavAttributeFrontendInputEntityTypeIdIsUserDefined: index("EAV_ATTRIBUTE_FRONTEND_INPUT_ENTITY_TYPE_ID_IS_USER_DEFINED").on(table.frontendInput, table.entityTypeId, table.isUserDefined),
		eavAttributeEntityTypeIdAttributeCode: unique("EAV_ATTRIBUTE_ENTITY_TYPE_ID_ATTRIBUTE_CODE").on(table.entityTypeId, table.attributeCode),
	}
});

export const eavAttributeGroup = mysqlTable("eav_attribute_group", {
	attributeGroupId: smallint("attribute_group_id").autoincrement().notNull(),
	attributeSetId: smallint("attribute_set_id").notNull().references(() => eavAttributeSet.attributeSetId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeGroupName: varchar("attribute_group_name", { length: 255 }).default('NULL'),
	sortOrder: smallint("sort_order").notNull(),
	defaultId: smallint("default_id"),
	attributeGroupCode: varchar("attribute_group_code", { length: 255 }).notNull(),
	tabGroupCode: varchar("tab_group_code", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavAttributeGroupAttributeSetIdSortOrder: index("EAV_ATTRIBUTE_GROUP_ATTRIBUTE_SET_ID_SORT_ORDER").on(table.attributeSetId, table.sortOrder),
		eavAttributeGroupAttributeSetIdAttributeGroupCode: unique("EAV_ATTRIBUTE_GROUP_ATTRIBUTE_SET_ID_ATTRIBUTE_GROUP_CODE").on(table.attributeSetId, table.attributeGroupCode),
		eavAttributeGroupAttributeSetIdAttributeGroupName: unique("EAV_ATTRIBUTE_GROUP_ATTRIBUTE_SET_ID_ATTRIBUTE_GROUP_NAME").on(table.attributeSetId, table.attributeGroupName),
	}
});

export const eavAttributeLabel = mysqlTable("eav_attribute_label", {
	attributeLabelId: int("attribute_label_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavAttributeLabelStoreId: index("EAV_ATTRIBUTE_LABEL_STORE_ID").on(table.storeId),
		eavAttributeLabelAttributeIdStoreId: index("EAV_ATTRIBUTE_LABEL_ATTRIBUTE_ID_STORE_ID").on(table.attributeId, table.storeId),
	}
});

export const eavAttributeOption = mysqlTable("eav_attribute_option", {
	optionId: int("option_id").autoincrement().notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sortOrder: smallint("sort_order").notNull(),
},
(table) => {
	return {
		eavAttributeOptionAttributeId: index("EAV_ATTRIBUTE_OPTION_ATTRIBUTE_ID").on(table.attributeId),
	}
});

export const eavAttributeOptionSwatch = mysqlTable("eav_attribute_option_swatch", {
	swatchId: int("swatch_id").autoincrement().notNull(),
	optionId: int("option_id").notNull().references(() => eavAttributeOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	type: smallint("type").notNull(),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavAttributeOptionSwatchSwatchId: index("EAV_ATTRIBUTE_OPTION_SWATCH_SWATCH_ID").on(table.swatchId),
		eavAttributeOptionSwatchStoreIdOptionId: unique("EAV_ATTRIBUTE_OPTION_SWATCH_STORE_ID_OPTION_ID").on(table.storeId, table.optionId),
	}
});

export const eavAttributeOptionValue = mysqlTable("eav_attribute_option_value", {
	valueId: int("value_id").autoincrement().notNull(),
	optionId: int("option_id").default(0).notNull().references(() => eavAttributeOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavAttributeOptionValueOptionId: index("EAV_ATTRIBUTE_OPTION_VALUE_OPTION_ID").on(table.optionId),
		eavAttributeOptionValueStoreId: index("EAV_ATTRIBUTE_OPTION_VALUE_STORE_ID").on(table.storeId),
	}
});

export const eavAttributeSet = mysqlTable("eav_attribute_set", {
	attributeSetId: smallint("attribute_set_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeSetName: varchar("attribute_set_name", { length: 255 }).default('NULL'),
	sortOrder: smallint("sort_order").notNull(),
},
(table) => {
	return {
		eavAttributeSetEntityTypeIdSortOrder: index("EAV_ATTRIBUTE_SET_ENTITY_TYPE_ID_SORT_ORDER").on(table.entityTypeId, table.sortOrder),
		eavAttributeSetEntityTypeIdAttributeSetName: unique("EAV_ATTRIBUTE_SET_ENTITY_TYPE_ID_ATTRIBUTE_SET_NAME").on(table.entityTypeId, table.attributeSetName),
	}
});

export const eavEntity = mysqlTable("eav_entity", {
	entityId: int("entity_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeSetId: smallint("attribute_set_id").notNull(),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	parentId: int("parent_id").default(0).notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	isActive: smallint("is_active").default(1).notNull(),
},
(table) => {
	return {
		eavEntityEntityTypeId: index("EAV_ENTITY_ENTITY_TYPE_ID").on(table.entityTypeId),
		eavEntityStoreId: index("EAV_ENTITY_STORE_ID").on(table.storeId),
	}
});

export const eavEntityAttribute = mysqlTable("eav_entity_attribute", {
	entityAttributeId: int("entity_attribute_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull(),
	attributeSetId: smallint("attribute_set_id").notNull(),
	attributeGroupId: smallint("attribute_group_id").notNull().references(() => eavAttributeGroup.attributeGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sortOrder: smallint("sort_order").notNull(),
},
(table) => {
	return {
		eavEntityAttributeAttributeSetIdSortOrder: index("EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_SET_ID_SORT_ORDER").on(table.attributeSetId, table.sortOrder),
		eavEntityAttributeAttributeId: index("EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_ID").on(table.attributeId),
		eavEntityAttributeAttributeSetIdAttributeId: unique("EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_SET_ID_ATTRIBUTE_ID").on(table.attributeSetId, table.attributeId),
		eavEntityAttributeAttributeGroupIdAttributeId: unique("EAV_ENTITY_ATTRIBUTE_ATTRIBUTE_GROUP_ID_ATTRIBUTE_ID").on(table.attributeGroupId, table.attributeId),
	}
});

export const eavEntityDatetime = mysqlTable("eav_entity_datetime", {
	valueId: int("value_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => eavEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: datetime("value", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		eavEntityDatetimeStoreId: index("EAV_ENTITY_DATETIME_STORE_ID").on(table.storeId),
		eavEntityDatetimeAttributeIdValue: index("EAV_ENTITY_DATETIME_ATTRIBUTE_ID_VALUE").on(table.attributeId, table.value),
		eavEntityDatetimeEntityTypeIdValue: index("EAV_ENTITY_DATETIME_ENTITY_TYPE_ID_VALUE").on(table.entityTypeId, table.value),
		eavEntityDatetimeEntityIdAttributeIdStoreId: unique("EAV_ENTITY_DATETIME_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const eavEntityDecimal = mysqlTable("eav_entity_decimal", {
	valueId: int("value_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => eavEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 12, scale: 4 }).default('0.0000').notNull(),
},
(table) => {
	return {
		eavEntityDecimalStoreId: index("EAV_ENTITY_DECIMAL_STORE_ID").on(table.storeId),
		eavEntityDecimalAttributeIdValue: index("EAV_ENTITY_DECIMAL_ATTRIBUTE_ID_VALUE").on(table.attributeId, table.value),
		eavEntityDecimalEntityTypeIdValue: index("EAV_ENTITY_DECIMAL_ENTITY_TYPE_ID_VALUE").on(table.entityTypeId, table.value),
		eavEntityDecimalEntityIdAttributeIdStoreId: unique("EAV_ENTITY_DECIMAL_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const eavEntityInt = mysqlTable("eav_entity_int", {
	valueId: int("value_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => eavEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: int("value").default(0).notNull(),
},
(table) => {
	return {
		eavEntityIntStoreId: index("EAV_ENTITY_INT_STORE_ID").on(table.storeId),
		eavEntityIntAttributeIdValue: index("EAV_ENTITY_INT_ATTRIBUTE_ID_VALUE").on(table.attributeId, table.value),
		eavEntityIntEntityTypeIdValue: index("EAV_ENTITY_INT_ENTITY_TYPE_ID_VALUE").on(table.entityTypeId, table.value),
		eavEntityIntEntityIdAttributeIdStoreId: unique("EAV_ENTITY_INT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const eavEntityStore = mysqlTable("eav_entity_store", {
	entityStoreId: int("entity_store_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	incrementPrefix: varchar("increment_prefix", { length: 20 }).default('NULL'),
	incrementLastId: varchar("increment_last_id", { length: 50 }).default('NULL'),
},
(table) => {
	return {
		eavEntityStoreEntityTypeId: index("EAV_ENTITY_STORE_ENTITY_TYPE_ID").on(table.entityTypeId),
		eavEntityStoreStoreId: index("EAV_ENTITY_STORE_STORE_ID").on(table.storeId),
	}
});

export const eavEntityText = mysqlTable("eav_entity_text", {
	valueId: int("value_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => eavEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: text("value").notNull(),
},
(table) => {
	return {
		eavEntityTextEntityTypeId: index("EAV_ENTITY_TEXT_ENTITY_TYPE_ID").on(table.entityTypeId),
		eavEntityTextAttributeId: index("EAV_ENTITY_TEXT_ATTRIBUTE_ID").on(table.attributeId),
		eavEntityTextStoreId: index("EAV_ENTITY_TEXT_STORE_ID").on(table.storeId),
		eavEntityTextEntityIdAttributeIdStoreId: unique("EAV_ENTITY_TEXT_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const eavEntityType = mysqlTable("eav_entity_type", {
	entityTypeId: smallint("entity_type_id").autoincrement().notNull(),
	entityTypeCode: varchar("entity_type_code", { length: 50 }).notNull(),
	entityModel: varchar("entity_model", { length: 255 }).notNull(),
	attributeModel: varchar("attribute_model", { length: 255 }).default('NULL'),
	entityTable: varchar("entity_table", { length: 255 }).default('NULL'),
	valueTablePrefix: varchar("value_table_prefix", { length: 255 }).default('NULL'),
	entityIdField: varchar("entity_id_field", { length: 255 }).default('NULL'),
	isDataSharing: smallint("is_data_sharing").default(1).notNull(),
	dataSharingKey: varchar("data_sharing_key", { length: 100 }).default(''default''),
	defaultAttributeSetId: smallint("default_attribute_set_id").notNull(),
	incrementModel: varchar("increment_model", { length: 255 }).default('NULL'),
	incrementPerStore: smallint("increment_per_store").notNull(),
	incrementPadLength: smallint("increment_pad_length").default(8).notNull(),
	incrementPadChar: varchar("increment_pad_char", { length: 1 }).default(''0'').notNull(),
	additionalAttributeTable: varchar("additional_attribute_table", { length: 255 }).default('NULL'),
	entityAttributeCollection: varchar("entity_attribute_collection", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavEntityTypeEntityTypeCode: index("EAV_ENTITY_TYPE_ENTITY_TYPE_CODE").on(table.entityTypeCode),
	}
});

export const eavEntityVarchar = mysqlTable("eav_entity_varchar", {
	valueId: int("value_id").autoincrement().notNull(),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => eavEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		eavEntityVarcharStoreId: index("EAV_ENTITY_VARCHAR_STORE_ID").on(table.storeId),
		eavEntityVarcharAttributeIdValue: index("EAV_ENTITY_VARCHAR_ATTRIBUTE_ID_VALUE").on(table.attributeId, table.value),
		eavEntityVarcharEntityTypeIdValue: index("EAV_ENTITY_VARCHAR_ENTITY_TYPE_ID_VALUE").on(table.entityTypeId, table.value),
		eavEntityVarcharEntityIdAttributeIdStoreId: unique("EAV_ENTITY_VARCHAR_ENTITY_ID_ATTRIBUTE_ID_STORE_ID").on(table.entityId, table.attributeId, table.storeId),
	}
});

export const eavFormElement = mysqlTable("eav_form_element", {
	elementId: int("element_id").autoincrement().notNull(),
	typeId: smallint("type_id").notNull().references(() => eavFormType.typeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	fieldsetId: smallint("fieldset_id").default('NULL').references(() => eavFormFieldset.fieldsetId, { onDelete: "set null", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sortOrder: int("sort_order").default(0).notNull(),
},
(table) => {
	return {
		eavFormElementFieldsetId: index("EAV_FORM_ELEMENT_FIELDSET_ID").on(table.fieldsetId),
		eavFormElementAttributeId: index("EAV_FORM_ELEMENT_ATTRIBUTE_ID").on(table.attributeId),
		eavFormElementTypeIdAttributeId: unique("EAV_FORM_ELEMENT_TYPE_ID_ATTRIBUTE_ID").on(table.typeId, table.attributeId),
	}
});

export const eavFormFieldset = mysqlTable("eav_form_fieldset", {
	fieldsetId: smallint("fieldset_id").autoincrement().notNull(),
	typeId: smallint("type_id").notNull().references(() => eavFormType.typeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	code: varchar("code", { length: 64 }).notNull(),
	sortOrder: int("sort_order").default(0).notNull(),
},
(table) => {
	return {
		eavFormFieldsetTypeIdCode: unique("EAV_FORM_FIELDSET_TYPE_ID_CODE").on(table.typeId, table.code),
	}
});

export const eavFormFieldsetLabel = mysqlTable("eav_form_fieldset_label", {
	fieldsetId: smallint("fieldset_id").notNull().references(() => eavFormFieldset.fieldsetId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	label: varchar("label", { length: 255 }).notNull(),
},
(table) => {
	return {
		eavFormFieldsetLabelStoreId: index("EAV_FORM_FIELDSET_LABEL_STORE_ID").on(table.storeId),
	}
});

export const eavFormType = mysqlTable("eav_form_type", {
	typeId: smallint("type_id").autoincrement().notNull(),
	code: varchar("code", { length: 64 }).notNull(),
	label: varchar("label", { length: 255 }).notNull(),
	isSystem: smallint("is_system").notNull(),
	theme: varchar("theme", { length: 64 }).default('NULL'),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		eavFormTypeStoreId: index("EAV_FORM_TYPE_STORE_ID").on(table.storeId),
		eavFormTypeCodeThemeStoreId: unique("EAV_FORM_TYPE_CODE_THEME_STORE_ID").on(table.code, table.theme, table.storeId),
	}
});

export const eavFormTypeEntity = mysqlTable("eav_form_type_entity", {
	typeId: smallint("type_id").notNull().references(() => eavFormType.typeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityTypeId: smallint("entity_type_id").notNull().references(() => eavEntityType.entityTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		eavFormTypeEntityEntityTypeId: index("EAV_FORM_TYPE_ENTITY_ENTITY_TYPE_ID").on(table.entityTypeId),
	}
});

export const emailTemplate = mysqlTable("email_template", {
	templateId: int("template_id").autoincrement().notNull(),
	templateCode: varchar("template_code", { length: 150 }).notNull(),
	templateText: text("template_text").notNull(),
	templateStyles: text("template_styles").default('NULL'),
	templateType: int("template_type").default('NULL'),
	templateSubject: varchar("template_subject", { length: 200 }).notNull(),
	templateSenderName: varchar("template_sender_name", { length: 200 }).default('NULL'),
	templateSenderEmail: varchar("template_sender_email", { length: 200 }).default('NULL'),
	addedAt: timestamp("added_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	origTemplateCode: varchar("orig_template_code", { length: 200 }).default('NULL'),
	origTemplateVariables: text("orig_template_variables").default('NULL'),
	isLegacy: tinyint("is_legacy").default(0).notNull(),
},
(table) => {
	return {
		emailTemplateAddedAt: index("EMAIL_TEMPLATE_ADDED_AT").on(table.addedAt),
		emailTemplateModifiedAt: index("EMAIL_TEMPLATE_MODIFIED_AT").on(table.modifiedAt),
		emailTemplateTemplateCode: unique("EMAIL_TEMPLATE_TEMPLATE_CODE").on(table.templateCode),
	}
});

export const flag = mysqlTable("flag", {
	flagId: int("flag_id").autoincrement().notNull(),
	flagCode: varchar("flag_code", { length: 255 }).notNull(),
	state: smallint("state").notNull(),
	flagData: mediumtext("flag_data").default('NULL'),
	lastUpdate: timestamp("last_update", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		flagLastUpdate: index("FLAG_LAST_UPDATE").on(table.lastUpdate),
	}
});

export const giftMessage = mysqlTable("gift_message", {
	giftMessageId: int("gift_message_id").autoincrement().notNull(),
	customerId: int("customer_id").default(0).notNull(),
	sender: varchar("sender", { length: 255 }).default('NULL'),
	recipient: varchar("recipient", { length: 255 }).default('NULL'),
	message: text("message").default('NULL'),
});

export const googleoptimizerCode = mysqlTable("googleoptimizer_code", {
	codeId: int("code_id").autoincrement().notNull(),
	entityId: int("entity_id").notNull(),
	entityType: varchar("entity_type", { length: 50 }).default('NULL'),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	experimentScript: text("experiment_script").default('NULL'),
},
(table) => {
	return {
		googleoptimizerCodeStoreIdEntityIdEntityType: unique("GOOGLEOPTIMIZER_CODE_STORE_ID_ENTITY_ID_ENTITY_TYPE").on(table.storeId, table.entityId, table.entityType),
	}
});

export const importexportImportdata = mysqlTable("importexport_importdata", {
	id: int("id").autoincrement().notNull(),
	entity: varchar("entity", { length: 50 }).notNull(),
	behavior: varchar("behavior", { length: 10 }).default(''append'').notNull(),
	data: longtext("data").default('NULL'),
	isProcessed: tinyint("is_processed").default(1).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const importHistory = mysqlTable("import_history", {
	historyId: int("history_id").autoincrement().notNull(),
	startedAt: timestamp("started_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	userId: int("user_id").default(0).notNull(),
	importedFile: varchar("imported_file", { length: 255 }).default('NULL'),
	executionTime: varchar("execution_time", { length: 255 }).default('NULL'),
	summary: varchar("summary", { length: 255 }).default('NULL'),
	errorFile: varchar("error_file", { length: 255 }).notNull(),
});

export const indexerState = mysqlTable("indexer_state", {
	stateId: int("state_id").autoincrement().notNull(),
	indexerId: varchar("indexer_id", { length: 255 }).default('NULL'),
	status: varchar("status", { length: 16 }).default(''invalid''),
	updated: datetime("updated", { mode: 'string'}).default('NULL'),
	hashConfig: varchar("hash_config", { length: 32 }).notNull(),
},
(table) => {
	return {
		indexerStateIndexerId: index("INDEXER_STATE_INDEXER_ID").on(table.indexerId),
	}
});

export const integration = mysqlTable("integration", {
	integrationId: int("integration_id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	endpoint: varchar("endpoint", { length: 255 }).default('NULL'),
	status: smallint("status").notNull(),
	consumerId: int("consumer_id").default('NULL').references(() => oauthConsumer.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	setupType: smallint("setup_type").notNull(),
	identityLinkUrl: varchar("identity_link_url", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		integrationName: unique("INTEGRATION_NAME").on(table.name),
		integrationConsumerId: unique("INTEGRATION_CONSUMER_ID").on(table.consumerId),
	}
});

export const inventoryCl = mysqlTable("inventory_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const inventoryGeoname = mysqlTable("inventory_geoname", {
	entityId: int("entity_id").autoincrement().notNull(),
	countryCode: varchar("country_code", { length: 64 }).notNull(),
	postcode: varchar("postcode", { length: 64 }).notNull(),
	city: varchar("city", { length: 180 }).notNull(),
	region: varchar("region", { length: 100 }).notNull(),
	province: varchar("province", { length: 64 }).notNull(),
	latitude: double("latitude").notNull(),
	longitude: double("longitude").notNull(),
});

export const inventoryLowStockNotificationConfiguration = mysqlTable("inventory_low_stock_notification_configuration", {
	sourceCode: varchar("source_code", { length: 255 }).notNull(),
	sku: varchar("sku", { length: 64 }).notNull(),
	notifyStockQty: decimal("notify_stock_qty", { precision: 12, scale: 4 }).default('NULL'),
});

export const inventoryOrderNotification = mysqlTable("inventory_order_notification", {
	orderId: int("order_id").autoincrement().notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	notificationSent: smallint("notification_sent").notNull(),
	sendNotification: smallint("send_notification").notNull(),
});

export const inventoryPickupLocationOrder = mysqlTable("inventory_pickup_location_order", {
	orderId: int("order_id").autoincrement().notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	pickupLocationCode: varchar("pickup_location_code", { length: 255 }).notNull(),
});

export const inventoryPickupLocationQuoteAddress = mysqlTable("inventory_pickup_location_quote_address", {
	addressId: int("address_id").autoincrement().notNull().references(() => quoteAddress.addressId, { onDelete: "cascade", onUpdate: "restrict" } ),
	pickupLocationCode: varchar("pickup_location_code", { length: 255 }).notNull(),
});

export const inventoryReservation = mysqlTable("inventory_reservation", {
	reservationId: int("reservation_id").autoincrement().notNull(),
	stockId: int("stock_id").notNull(),
	sku: varchar("sku", { length: 64 }).notNull(),
	quantity: decimal("quantity", { precision: 10, scale: 4 }).default('0.0000').notNull(),
	metadata: varchar("metadata", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		inventoryReservationStockIdSkuQuantity: index("INVENTORY_RESERVATION_STOCK_ID_SKU_QUANTITY").on(table.stockId, table.sku, table.quantity),
	}
});

export const inventoryShipmentSource = mysqlTable("inventory_shipment_source", {
	shipmentId: int("shipment_id").notNull(),
	sourceCode: varchar("source_code", { length: 255 }).notNull(),
});

export const inventorySource = mysqlTable("inventory_source", {
	sourceCode: varchar("source_code", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	enabled: smallint("enabled").default(1).notNull(),
	description: text("description").default('NULL'),
	latitude: decimal("latitude", { precision: 8, scale: 6 }).default('NULL'),
	longitude: decimal("longitude", { precision: 9, scale: 6 }).default('NULL'),
	countryId: varchar("country_id", { length: 2 }).notNull(),
	regionId: int("region_id").default('NULL'),
	region: varchar("region", { length: 255 }).default('NULL'),
	city: varchar("city", { length: 255 }).default('NULL'),
	street: varchar("street", { length: 255 }).default('NULL'),
	postcode: varchar("postcode", { length: 255 }).notNull(),
	contactName: varchar("contact_name", { length: 255 }).default('NULL'),
	email: varchar("email", { length: 255 }).default('NULL'),
	phone: varchar("phone", { length: 255 }).default('NULL'),
	fax: varchar("fax", { length: 255 }).default('NULL'),
	useDefaultCarrierConfig: smallint("use_default_carrier_config").default(1).notNull(),
	isPickupLocationActive: tinyint("is_pickup_location_active").default(0).notNull(),
	frontendName: varchar("frontend_name", { length: 255 }).default(''''),
	frontendDescription: text("frontend_description").default('NULL'),
});

export const inventorySourceCarrierLink = mysqlTable("inventory_source_carrier_link", {
	linkId: int("link_id").autoincrement().notNull(),
	sourceCode: varchar("source_code", { length: 255 }).notNull().references(() => inventorySource.sourceCode, { onDelete: "cascade", onUpdate: "restrict" } ),
	carrierCode: varchar("carrier_code", { length: 255 }).notNull(),
	position: smallint("position").default('NULL'),
});

export const inventorySourceItem = mysqlTable("inventory_source_item", {
	sourceItemId: int("source_item_id").autoincrement().notNull(),
	sourceCode: varchar("source_code", { length: 255 }).notNull().references(() => inventorySource.sourceCode, { onDelete: "cascade", onUpdate: "restrict" } ),
	sku: varchar("sku", { length: 64 }).notNull(),
	quantity: decimal("quantity", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	status: smallint("status").notNull(),
},
(table) => {
	return {
		inventorySourceItemSkuSourceCodeQuantity: index("INVENTORY_SOURCE_ITEM_SKU_SOURCE_CODE_QUANTITY").on(table.sku, table.sourceCode, table.quantity),
		inventorySourceItemSourceCodeSku: unique("INVENTORY_SOURCE_ITEM_SOURCE_CODE_SKU").on(table.sourceCode, table.sku),
	}
});

export const inventorySourceStockLink = mysqlTable("inventory_source_stock_link", {
	linkId: int("link_id").autoincrement().notNull(),
	stockId: int("stock_id").notNull().references(() => inventoryStock.stockId, { onDelete: "cascade", onUpdate: "restrict" } ),
	sourceCode: varchar("source_code", { length: 255 }).notNull().references(() => inventorySource.sourceCode, { onDelete: "cascade", onUpdate: "restrict" } ),
	priority: smallint("priority").notNull(),
},
(table) => {
	return {
		inventorySourceStockLinkStockIdPriority: index("INVENTORY_SOURCE_STOCK_LINK_STOCK_ID_PRIORITY").on(table.stockId, table.priority),
		inventorySourceStockLinkStockIdSourceCode: unique("INVENTORY_SOURCE_STOCK_LINK_STOCK_ID_SOURCE_CODE").on(table.stockId, table.sourceCode),
	}
});

export const inventoryStock = mysqlTable("inventory_stock", {
	stockId: int("stock_id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
});

export const inventoryStock1 = mysqlTable("inventory_stock_1", {
	productId: int("product_id").notNull(),
	websiteId: smallint("website_id").notNull(),
	stockId: smallint("stock_id").notNull(),
	quantity: decimal("quantity", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	isSalable: smallint("is_salable").notNull(),
	sku: varchar("sku", { length: 64 }).notNull(),
});

export const inventoryStockSalesChannel = mysqlTable("inventory_stock_sales_channel", {
	type: varchar("type", { length: 64 }).notNull(),
	code: varchar("code", { length: 64 }).notNull(),
	stockId: int("stock_id").notNull().references(() => inventoryStock.stockId, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const jwtAuthRevoked = mysqlTable("jwt_auth_revoked", {
	userTypeId: int("user_type_id").notNull(),
	userId: int("user_id").notNull(),
	revokeBefore: bigint("revoke_before", { mode: "number" }).notNull(),
});

export const layoutLink = mysqlTable("layout_link", {
	layoutLinkId: int("layout_link_id").autoincrement().notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	themeId: int("theme_id").notNull().references(() => theme.themeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	layoutUpdateId: int("layout_update_id").default(0).notNull().references(() => layoutUpdate.layoutUpdateId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isTemporary: tinyint("is_temporary").default(0).notNull(),
},
(table) => {
	return {
		layoutLinkLayoutUpdateId: index("LAYOUT_LINK_LAYOUT_UPDATE_ID").on(table.layoutUpdateId),
		layoutLinkStoreIdThemeIdLayoutUpdateIdIsTemporary: index("LAYOUT_LINK_STORE_ID_THEME_ID_LAYOUT_UPDATE_ID_IS_TEMPORARY").on(table.storeId, table.themeId, table.layoutUpdateId, table.isTemporary),
	}
});

export const layoutUpdate = mysqlTable("layout_update", {
	layoutUpdateId: int("layout_update_id").autoincrement().notNull(),
	handle: varchar("handle", { length: 255 }).default('NULL'),
	xml: text("xml").default('NULL'),
	sortOrder: smallint("sort_order").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(''0000-00-00 00:00:00''),
},
(table) => {
	return {
		layoutUpdateHandle: index("LAYOUT_UPDATE_HANDLE").on(table.handle),
	}
});

export const loginAsCustomer = mysqlTable("login_as_customer", {
	secret: varchar("secret", { length: 64 }).notNull(),
	customerId: int("customer_id").notNull(),
	adminId: int("admin_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		loginAsCustomerCreatedAt: index("LOGIN_AS_CUSTOMER_CREATED_AT").on(table.createdAt),
	}
});

export const loginAsCustomerAssistanceAllowed = mysqlTable("login_as_customer_assistance_allowed", {
	customerId: int("customer_id").notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const magentoAcknowledgedBulk = mysqlTable("magento_acknowledged_bulk", {
	id: int("id").autoincrement().notNull(),
	bulkUuid: varbinary("bulk_uuid", { length: 39 }).default('NULL').references(() => magentoBulk.uuid, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		magentoAcknowledgedBulkBulkUuid: unique("MAGENTO_ACKNOWLEDGED_BULK_BULK_UUID").on(table.bulkUuid),
	}
});

export const magentoBulk = mysqlTable("magento_bulk", {
	id: int("id").autoincrement().notNull(),
	uuid: varbinary("uuid", { length: 39 }).default('NULL'),
	userId: int("user_id").default('NULL'),
	userType: int("user_type").default('NULL'),
	description: varchar("description", { length: 255 }).default('NULL'),
	operationCount: int("operation_count").notNull(),
	startTime: timestamp("start_time", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		magentoBulkUserId: index("MAGENTO_BULK_USER_ID").on(table.userId),
		magentoBulkStartTime: index("MAGENTO_BULK_START_TIME").on(table.startTime),
		magentoBulkUuid: unique("MAGENTO_BULK_UUID").on(table.uuid),
	}
});

export const magentoLoginAsCustomerLog = mysqlTable("magento_login_as_customer_log", {
	logId: int("log_id").autoincrement().notNull(),
	time: timestamp("time", { mode: 'string' }).default('NULL'),
	userId: int("user_id").default('NULL'),
	userName: varchar("user_name", { length: 40 }).default('NULL'),
	customerId: int("customer_id").default('NULL'),
	customerEmail: varchar("customer_email", { length: 40 }).default('NULL'),
},
(table) => {
	return {
		magentoLoginAsCustomerLogUserId: index("MAGENTO_LOGIN_AS_CUSTOMER_LOG_USER_ID").on(table.userId),
	}
});

export const magentoOperation = mysqlTable("magento_operation", {
	id: int("id").autoincrement().notNull(),
	operationKey: int("operation_key").default('NULL'),
	bulkUuid: varbinary("bulk_uuid", { length: 39 }).default('NULL').references(() => magentoBulk.uuid, { onDelete: "cascade", onUpdate: "restrict" } ),
	topicName: varchar("topic_name", { length: 255 }).default('NULL'),
	// Warning: Can't parse blob from database
	// blobType: blob("serialized_data"),
	// Warning: Can't parse blob from database
	// blobType: blob("result_serialized_data"),
	status: smallint("status"),
	errorCode: smallint("error_code").default('NULL'),
	resultMessage: varchar("result_message", { length: 255 }).default('NULL'),
	startedAt: timestamp("started_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		magentoOperationBulkUuidErrorCode: index("MAGENTO_OPERATION_BULK_UUID_ERROR_CODE").on(table.bulkUuid, table.errorCode),
		magentoOperationStatusStartedAt: index("MAGENTO_OPERATION_STATUS_STARTED_AT").on(table.status, table.startedAt),
	}
});

export const mediaContentAsset = mysqlTable("media_content_asset", {
	assetId: int("asset_id").notNull(),
	entityType: varchar("entity_type", { length: 255 }).notNull(),
	entityId: varchar("entity_id", { length: 255 }).notNull(),
	field: varchar("field", { length: 255 }).notNull(),
},
(table) => {
	return {
		mediaContentAssetAssetId: index("MEDIA_CONTENT_ASSET_ASSET_ID").on(table.assetId),
	}
});

export const mediaGalleryAsset = mysqlTable("media_gallery_asset", {
	id: int("id").autoincrement().notNull(),
	path: text("path").default('NULL'),
	title: varchar("title", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	source: varchar("source", { length: 255 }).default('NULL'),
	hash: varchar("hash", { length: 255 }).default('NULL'),
	contentType: varchar("content_type", { length: 255 }).default('NULL'),
	width: int("width").default(0).notNull(),
	height: int("height").default(0).notNull(),
	size: int("size").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		mediaGalleryAssetId: index("MEDIA_GALLERY_ASSET_ID").on(table.id),
		mediaGalleryAssetTitle: index("MEDIA_GALLERY_ASSET_TITLE").on(table.title),
	}
});

export const mediaGalleryAssetKeyword = mysqlTable("media_gallery_asset_keyword", {
	keywordId: int("keyword_id").notNull().references(() => mediaGalleryKeyword.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	assetId: int("asset_id").notNull().references(() => mediaGalleryAsset.id, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		mediaGalleryAssetKeywordAssetId: index("MEDIA_GALLERY_ASSET_KEYWORD_ASSET_ID").on(table.assetId),
		mediaGalleryAssetKeywordKeywordId: index("MEDIA_GALLERY_ASSET_KEYWORD_KEYWORD_ID").on(table.keywordId),
	}
});

export const mediaGalleryKeyword = mysqlTable("media_gallery_keyword", {
	id: int("id").autoincrement().notNull(),
	keyword: varchar("keyword", { length: 255 }).notNull(),
},
(table) => {
	return {
		mediaGalleryKeywordId: index("MEDIA_GALLERY_KEYWORD_ID").on(table.id),
		mediaGalleryKeywordKeyword: unique("MEDIA_GALLERY_KEYWORD_KEYWORD").on(table.keyword),
	}
});

export const mviewState = mysqlTable("mview_state", {
	stateId: int("state_id").autoincrement().notNull(),
	viewId: varchar("view_id", { length: 255 }).default('NULL'),
	mode: varchar("mode", { length: 16 }).default(''disabled''),
	status: varchar("status", { length: 16 }).default(''idle''),
	updated: datetime("updated", { mode: 'string'}).default('NULL'),
	versionId: int("version_id").default('NULL'),
},
(table) => {
	return {
		mviewStateViewId: index("MVIEW_STATE_VIEW_ID").on(table.viewId),
		mviewStateMode: index("MVIEW_STATE_MODE").on(table.mode),
	}
});

export const newsletterProblem = mysqlTable("newsletter_problem", {
	problemId: int("problem_id").autoincrement().notNull(),
	subscriberId: int("subscriber_id").default('NULL').references(() => newsletterSubscriber.subscriberId, { onDelete: "cascade", onUpdate: "restrict" } ),
	queueId: int("queue_id").default(0).notNull().references(() => newsletterQueue.queueId, { onDelete: "cascade", onUpdate: "restrict" } ),
	problemErrorCode: int("problem_error_code").default(0),
	problemErrorText: varchar("problem_error_text", { length: 200 }).default('NULL'),
},
(table) => {
	return {
		newsletterProblemSubscriberId: index("NEWSLETTER_PROBLEM_SUBSCRIBER_ID").on(table.subscriberId),
		newsletterProblemQueueId: index("NEWSLETTER_PROBLEM_QUEUE_ID").on(table.queueId),
	}
});

export const newsletterQueue = mysqlTable("newsletter_queue", {
	queueId: int("queue_id").autoincrement().notNull(),
	templateId: int("template_id").default(0).notNull().references(() => newsletterTemplate.templateId, { onDelete: "cascade", onUpdate: "restrict" } ),
	newsletterType: int("newsletter_type").default('NULL'),
	newsletterText: text("newsletter_text").default('NULL'),
	newsletterStyles: text("newsletter_styles").default('NULL'),
	newsletterSubject: varchar("newsletter_subject", { length: 200 }).default('NULL'),
	newsletterSenderName: varchar("newsletter_sender_name", { length: 200 }).default('NULL'),
	newsletterSenderEmail: varchar("newsletter_sender_email", { length: 200 }).default('NULL'),
	queueStatus: int("queue_status").default(0).notNull(),
	queueStartAt: timestamp("queue_start_at", { mode: 'string' }).default('NULL'),
	queueFinishAt: timestamp("queue_finish_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		newsletterQueueTemplateId: index("NEWSLETTER_QUEUE_TEMPLATE_ID").on(table.templateId),
	}
});

export const newsletterQueueLink = mysqlTable("newsletter_queue_link", {
	queueLinkId: int("queue_link_id").autoincrement().notNull(),
	queueId: int("queue_id").default(0).notNull().references(() => newsletterQueue.queueId, { onDelete: "cascade", onUpdate: "restrict" } ),
	subscriberId: int("subscriber_id").default(0).notNull().references(() => newsletterSubscriber.subscriberId, { onDelete: "cascade", onUpdate: "restrict" } ),
	letterSentAt: timestamp("letter_sent_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		newsletterQueueLinkSubscriberId: index("NEWSLETTER_QUEUE_LINK_SUBSCRIBER_ID").on(table.subscriberId),
		newsletterQueueLinkQueueIdLetterSentAt: index("NEWSLETTER_QUEUE_LINK_QUEUE_ID_LETTER_SENT_AT").on(table.queueId, table.letterSentAt),
	}
});

export const newsletterQueueStoreLink = mysqlTable("newsletter_queue_store_link", {
	queueId: int("queue_id").default(0).notNull().references(() => newsletterQueue.queueId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		newsletterQueueStoreLinkStoreId: index("NEWSLETTER_QUEUE_STORE_LINK_STORE_ID").on(table.storeId),
	}
});

export const newsletterSubscriber = mysqlTable("newsletter_subscriber", {
	subscriberId: int("subscriber_id").autoincrement().notNull(),
	storeId: smallint("store_id").references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	changeStatusAt: timestamp("change_status_at", { mode: 'string' }).default('NULL'),
	customerId: int("customer_id").default(0).notNull(),
	subscriberEmail: varchar("subscriber_email", { length: 150 }).default('NULL'),
	subscriberStatus: int("subscriber_status").default(0).notNull(),
	subscriberConfirmCode: varchar("subscriber_confirm_code", { length: 32 }).default(''NULL''),
},
(table) => {
	return {
		newsletterSubscriberCustomerId: index("NEWSLETTER_SUBSCRIBER_CUSTOMER_ID").on(table.customerId),
		newsletterSubscriberStoreId: index("NEWSLETTER_SUBSCRIBER_STORE_ID").on(table.storeId),
		newsletterSubscriberSubscriberEmail: index("NEWSLETTER_SUBSCRIBER_SUBSCRIBER_EMAIL").on(table.subscriberEmail),
	}
});

export const newsletterTemplate = mysqlTable("newsletter_template", {
	templateId: int("template_id").autoincrement().notNull(),
	templateCode: varchar("template_code", { length: 150 }).default('NULL'),
	templateText: text("template_text").default('NULL'),
	templateStyles: text("template_styles").default('NULL'),
	templateType: int("template_type").default('NULL'),
	templateSubject: varchar("template_subject", { length: 200 }).default('NULL'),
	templateSenderName: varchar("template_sender_name", { length: 200 }).default('NULL'),
	templateSenderEmail: varchar("template_sender_email", { length: 200 }).default('NULL'),
	templateActual: smallint("template_actual").default(1),
	addedAt: timestamp("added_at", { mode: 'string' }).default('NULL'),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default('NULL'),
	isLegacy: tinyint("is_legacy").default(0).notNull(),
},
(table) => {
	return {
		newsletterTemplateTemplateActual: index("NEWSLETTER_TEMPLATE_TEMPLATE_ACTUAL").on(table.templateActual),
		newsletterTemplateAddedAt: index("NEWSLETTER_TEMPLATE_ADDED_AT").on(table.addedAt),
		newsletterTemplateModifiedAt: index("NEWSLETTER_TEMPLATE_MODIFIED_AT").on(table.modifiedAt),
	}
});

export const oauthConsumer = mysqlTable("oauth_consumer", {
	entityId: int("entity_id").autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(''0000-00-00 00:00:00''),
	name: varchar("name", { length: 255 }).notNull(),
	key: varchar("key", { length: 32 }).notNull(),
	secret: varchar("secret", { length: 128 }).notNull(),
	callbackUrl: text("callback_url").default('NULL'),
	rejectedCallbackUrl: text("rejected_callback_url").notNull(),
},
(table) => {
	return {
		oauthConsumerCreatedAt: index("OAUTH_CONSUMER_CREATED_AT").on(table.createdAt),
		oauthConsumerUpdatedAt: index("OAUTH_CONSUMER_UPDATED_AT").on(table.updatedAt),
		oauthConsumerKey: unique("OAUTH_CONSUMER_KEY").on(table.key),
		oauthConsumerSecret: unique("OAUTH_CONSUMER_SECRET").on(table.secret),
	}
});

export const oauthNonce = mysqlTable("oauth_nonce", {
	nonce: varchar("nonce", { length: 32 }).notNull(),
	timestamp: int("timestamp").notNull(),
	consumerId: int("consumer_id").notNull().references(() => oauthConsumer.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		oauthNonceTimestamp: index("OAUTH_NONCE_TIMESTAMP").on(table.timestamp),
	}
});

export const oauthToken = mysqlTable("oauth_token", {
	entityId: int("entity_id").autoincrement().notNull(),
	consumerId: int("consumer_id").default('NULL').references(() => oauthConsumer.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	adminId: int("admin_id").default('NULL').references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	type: varchar("type", { length: 16 }).notNull(),
	token: varchar("token", { length: 32 }).notNull(),
	secret: varchar("secret", { length: 128 }).notNull(),
	verifier: varchar("verifier", { length: 32 }).default('NULL'),
	callbackUrl: text("callback_url").notNull(),
	revoked: smallint("revoked").notNull(),
	authorized: smallint("authorized").notNull(),
	userType: int("user_type").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		oauthTokenConsumerId: index("OAUTH_TOKEN_CONSUMER_ID").on(table.consumerId),
		oauthTokenCreatedAt: index("OAUTH_TOKEN_CREATED_AT").on(table.createdAt),
		oauthTokenToken: unique("OAUTH_TOKEN_TOKEN").on(table.token),
	}
});

export const oauthTokenRequestLog = mysqlTable("oauth_token_request_log", {
	logId: int("log_id").autoincrement().notNull(),
	userName: varchar("user_name", { length: 255 }).notNull(),
	userType: smallint("user_type").notNull(),
	failuresCount: smallint("failures_count"),
	lockExpiresAt: timestamp("lock_expires_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		oauthTokenRequestLogUserNameUserType: unique("OAUTH_TOKEN_REQUEST_LOG_USER_NAME_USER_TYPE").on(table.userName, table.userType),
	}
});

export const pagebuilderTemplate = mysqlTable("pagebuilder_template", {
	templateId: int("template_id").autoincrement().notNull(),
	name: varchar("name", { length: 1024 }).notNull(),
	previewImage: varchar("preview_image", { length: 1024 }).default('NULL'),
	template: longtext("template").notNull(),
	createdFor: varchar("created_for", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		pagebuilderTemplateName: index("PAGEBUILDER_TEMPLATE_NAME").on(table.name),
	}
});

export const passwordResetRequestEvent = mysqlTable("password_reset_request_event", {
	id: int("id").autoincrement().notNull(),
	requestType: smallint("request_type").notNull(),
	accountReference: varchar("account_reference", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	ip: varchar("ip", { length: 15 }).notNull(),
},
(table) => {
	return {
		passwordResetRequestEventAccountReference: index("PASSWORD_RESET_REQUEST_EVENT_ACCOUNT_REFERENCE").on(table.accountReference),
		passwordResetRequestEventCreatedAt: index("PASSWORD_RESET_REQUEST_EVENT_CREATED_AT").on(table.createdAt),
	}
});

export const patchList = mysqlTable("patch_list", {
	patchId: int("patch_id").autoincrement().notNull(),
	patchName: varchar("patch_name", { length: 1024 }).notNull(),
});

export const paymentServicesOrderDataProductionSubmittedHash = mysqlTable("payment_services_order_data_production_submitted_hash", {
	identifier: varchar("identifier", { length: 64 }).notNull(),
	feedHash: varchar("feed_hash", { length: 64 }).notNull(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const paymentServicesOrderDataSandboxSubmittedHash = mysqlTable("payment_services_order_data_sandbox_submitted_hash", {
	identifier: varchar("identifier", { length: 64 }).notNull(),
	feedHash: varchar("feed_hash", { length: 64 }).notNull(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const paymentServicesOrderStatusDataProdSubmittedHash = mysqlTable("payment_services_order_status_data_prod_submitted_hash", {
	identifier: varchar("identifier", { length: 64 }).notNull(),
	feedHash: varchar("feed_hash", { length: 64 }).notNull(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const paymentServicesOrderStatusDataSandboxSubmittedHash = mysqlTable("payment_services_order_status_data_sandbox_submitted_hash", {
	identifier: varchar("identifier", { length: 64 }).notNull(),
	feedHash: varchar("feed_hash", { length: 64 }).notNull(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const paymentServicesStoreDataProductionSubmittedHash = mysqlTable("payment_services_store_data_production_submitted_hash", {
	identifier: varchar("identifier", { length: 64 }).notNull(),
	feedHash: varchar("feed_hash", { length: 64 }).notNull(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const paymentServicesStoreDataSandboxSubmittedHash = mysqlTable("payment_services_store_data_sandbox_submitted_hash", {
	identifier: varchar("identifier", { length: 64 }).notNull(),
	feedHash: varchar("feed_hash", { length: 64 }).notNull(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const paypalBillingAgreement = mysqlTable("paypal_billing_agreement", {
	agreementId: int("agreement_id").autoincrement().notNull(),
	customerId: int("customer_id").notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	methodCode: varchar("method_code", { length: 32 }).notNull(),
	referenceId: varchar("reference_id", { length: 32 }).notNull(),
	status: varchar("status", { length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	agreementLabel: varchar("agreement_label", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		paypalBillingAgreementCustomerId: index("PAYPAL_BILLING_AGREEMENT_CUSTOMER_ID").on(table.customerId),
		paypalBillingAgreementStoreId: index("PAYPAL_BILLING_AGREEMENT_STORE_ID").on(table.storeId),
	}
});

export const paypalBillingAgreementOrder = mysqlTable("paypal_billing_agreement_order", {
	agreementId: int("agreement_id").notNull().references(() => paypalBillingAgreement.agreementId, { onDelete: "cascade", onUpdate: "restrict" } ),
	orderId: int("order_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		paypalBillingAgreementOrderOrderId: index("PAYPAL_BILLING_AGREEMENT_ORDER_ORDER_ID").on(table.orderId),
	}
});

export const paypalCert = mysqlTable("paypal_cert", {
	certId: smallint("cert_id").autoincrement().notNull(),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	content: text("content").default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		paypalCertWebsiteId: index("PAYPAL_CERT_WEBSITE_ID").on(table.websiteId),
	}
});

export const paypalPaymentTransaction = mysqlTable("paypal_payment_transaction", {
	transactionId: int("transaction_id").autoincrement().notNull(),
	txnId: varchar("txn_id", { length: 100 }).default('NULL'),
	// Warning: Can't parse blob from database
	// blobType: blob("additional_information"),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		paypalPaymentTransactionTxnId: unique("PAYPAL_PAYMENT_TRANSACTION_TXN_ID").on(table.txnId),
	}
});

export const paypalSettlementReport = mysqlTable("paypal_settlement_report", {
	reportId: int("report_id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	reportDate: date("report_date", { mode: 'string' }).default('NULL'),
	accountId: varchar("account_id", { length: 64 }).default('NULL'),
	filename: varchar("filename", { length: 24 }).default('NULL'),
	lastModified: timestamp("last_modified", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		paypalSettlementReportReportDateAccountId: unique("PAYPAL_SETTLEMENT_REPORT_REPORT_DATE_ACCOUNT_ID").on(table.reportDate, table.accountId),
	}
});

export const paypalSettlementReportRow = mysqlTable("paypal_settlement_report_row", {
	rowId: int("row_id").autoincrement().notNull(),
	reportId: int("report_id").notNull().references(() => paypalSettlementReport.reportId, { onDelete: "cascade", onUpdate: "restrict" } ),
	transactionId: varchar("transaction_id", { length: 19 }).default('NULL'),
	invoiceId: varchar("invoice_id", { length: 127 }).default('NULL'),
	paypalReferenceId: varchar("paypal_reference_id", { length: 19 }).default('NULL'),
	paypalReferenceIdType: varchar("paypal_reference_id_type", { length: 3 }).default('NULL'),
	transactionEventCode: varchar("transaction_event_code", { length: 5 }).default('NULL'),
	transactionInitiationDate: timestamp("transaction_initiation_date", { mode: 'string' }).default('NULL'),
	transactionCompletionDate: timestamp("transaction_completion_date", { mode: 'string' }).default('NULL'),
	transactionDebitOrCredit: varchar("transaction_debit_or_credit", { length: 2 }).default(''CR'').notNull(),
	grossTransactionAmount: decimal("gross_transaction_amount", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	grossTransactionCurrency: varchar("gross_transaction_currency", { length: 3 }).default('NULL'),
	feeDebitOrCredit: varchar("fee_debit_or_credit", { length: 2 }).default('NULL'),
	feeAmount: decimal("fee_amount", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	feeCurrency: varchar("fee_currency", { length: 3 }).default('NULL'),
	customField: varchar("custom_field", { length: 255 }).default('NULL'),
	consumerId: varchar("consumer_id", { length: 127 }).default('NULL'),
	paymentTrackingId: varchar("payment_tracking_id", { length: 255 }).default('NULL'),
	storeId: varchar("store_id", { length: 50 }).default('NULL'),
},
(table) => {
	return {
		paypalSettlementReportRowReportId: index("PAYPAL_SETTLEMENT_REPORT_ROW_REPORT_ID").on(table.reportId),
	}
});

export const persistentSession = mysqlTable("persistent_session", {
	persistentId: int("persistent_id").autoincrement().notNull(),
	key: varchar("key", { length: 50 }).notNull(),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	info: text("info").default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		persistentSessionUpdatedAt: index("PERSISTENT_SESSION_UPDATED_AT").on(table.updatedAt),
		persistentSessionKey: unique("PERSISTENT_SESSION_KEY").on(table.key),
		persistentSessionCustomerId: unique("PERSISTENT_SESSION_CUSTOMER_ID").on(table.customerId),
	}
});

export const productAlertPrice = mysqlTable("product_alert_price", {
	alertPriceId: int("alert_price_id").autoincrement().notNull(),
	customerId: int("customer_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	price: decimal("price", { precision: 20, scale: 6 }).default('0.000000').notNull(),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	addDate: timestamp("add_date", { mode: 'string' }).default('current_timestamp()').notNull(),
	lastSendDate: timestamp("last_send_date", { mode: 'string' }).default('NULL'),
	sendCount: smallint("send_count").notNull(),
	status: smallint("status").notNull(),
},
(table) => {
	return {
		productAlertPriceCustomerId: index("PRODUCT_ALERT_PRICE_CUSTOMER_ID").on(table.customerId),
		productAlertPriceProductId: index("PRODUCT_ALERT_PRICE_PRODUCT_ID").on(table.productId),
		productAlertPriceWebsiteId: index("PRODUCT_ALERT_PRICE_WEBSITE_ID").on(table.websiteId),
		productAlertPriceStoreId: index("PRODUCT_ALERT_PRICE_STORE_ID").on(table.storeId),
	}
});

export const productAlertStock = mysqlTable("product_alert_stock", {
	alertStockId: int("alert_stock_id").autoincrement().notNull(),
	customerId: int("customer_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	addDate: timestamp("add_date", { mode: 'string' }).default('current_timestamp()').notNull(),
	sendDate: timestamp("send_date", { mode: 'string' }).default('NULL'),
	sendCount: smallint("send_count").notNull(),
	status: smallint("status").notNull(),
},
(table) => {
	return {
		productAlertStockCustomerId: index("PRODUCT_ALERT_STOCK_CUSTOMER_ID").on(table.customerId),
		productAlertStockProductId: index("PRODUCT_ALERT_STOCK_PRODUCT_ID").on(table.productId),
		productAlertStockWebsiteId: index("PRODUCT_ALERT_STOCK_WEBSITE_ID").on(table.websiteId),
		productAlertStockStoreId: index("PRODUCT_ALERT_STOCK_STORE_ID").on(table.storeId),
	}
});

export const queue = mysqlTable("queue", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		queueName: unique("QUEUE_NAME").on(table.name),
	}
});

export const queueLock = mysqlTable("queue_lock", {
	id: int("id").autoincrement().notNull(),
	messageCode: varchar("message_code", { length: 255 }).default('''').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		queueLockMessageCode: unique("QUEUE_LOCK_MESSAGE_CODE").on(table.messageCode),
	}
});

export const queueMessage = mysqlTable("queue_message", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	topicName: varchar("topic_name", { length: 255 }).default('NULL'),
	body: longtext("body").default('NULL'),
});

export const queueMessageStatus = mysqlTable("queue_message_status", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	queueId: int("queue_id").notNull().references(() => queue.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	messageId: bigint("message_id", { mode: "number" }).notNull().references(() => queueMessage.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	status: smallint("status").notNull(),
	numberOfTrials: smallint("number_of_trials").notNull(),
},
(table) => {
	return {
		queueMessageStatusStatusUpdatedAt: index("QUEUE_MESSAGE_STATUS_STATUS_UPDATED_AT").on(table.status, table.updatedAt),
		queueMessageStatusQueueIdMessageId: unique("QUEUE_MESSAGE_STATUS_QUEUE_ID_MESSAGE_ID").on(table.queueId, table.messageId),
	}
});

export const queuePoisonPill = mysqlTable("queue_poison_pill", {
	version: varchar("version", { length: 255 }).notNull(),
});

export const quote = mysqlTable("quote", {
	entityId: int("entity_id").autoincrement().notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	convertedAt: timestamp("converted_at", { mode: 'string' }).default('NULL'),
	isActive: smallint("is_active").default(1),
	isVirtual: smallint("is_virtual"),
	isMultiShipping: smallint("is_multi_shipping"),
	itemsCount: int("items_count").default(0),
	itemsQty: decimal("items_qty", { precision: 12, scale: 4 }).default('0.0000'),
	origOrderId: int("orig_order_id").default(0),
	storeToBaseRate: decimal("store_to_base_rate", { precision: 12, scale: 4 }).default('0.0000'),
	storeToQuoteRate: decimal("store_to_quote_rate", { precision: 12, scale: 4 }).default('0.0000'),
	baseCurrencyCode: varchar("base_currency_code", { length: 255 }).default('NULL'),
	storeCurrencyCode: varchar("store_currency_code", { length: 255 }).default('NULL'),
	quoteCurrencyCode: varchar("quote_currency_code", { length: 255 }).default('NULL'),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('0.0000'),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('0.0000'),
	checkoutMethod: varchar("checkout_method", { length: 255 }).default('NULL'),
	customerId: int("customer_id").default('NULL'),
	customerTaxClassId: int("customer_tax_class_id").default('NULL'),
	customerGroupId: int("customer_group_id").default(0),
	customerEmail: varchar("customer_email", { length: 255 }).default('NULL'),
	customerPrefix: varchar("customer_prefix", { length: 40 }).default('NULL'),
	customerFirstname: varchar("customer_firstname", { length: 255 }).default('NULL'),
	customerMiddlename: varchar("customer_middlename", { length: 40 }).default('NULL'),
	customerLastname: varchar("customer_lastname", { length: 255 }).default('NULL'),
	customerSuffix: varchar("customer_suffix", { length: 40 }).default('NULL'),
	customerDob: datetime("customer_dob", { mode: 'string'}).default('NULL'),
	customerNote: text("customer_note").default('NULL'),
	customerNoteNotify: smallint("customer_note_notify").default(1),
	customerIsGuest: smallint("customer_is_guest"),
	remoteIp: varchar("remote_ip", { length: 45 }).default('NULL'),
	appliedRuleIds: varchar("applied_rule_ids", { length: 255 }).default('NULL'),
	reservedOrderId: varchar("reserved_order_id", { length: 64 }).default('NULL'),
	passwordHash: varchar("password_hash", { length: 255 }).default('NULL'),
	couponCode: varchar("coupon_code", { length: 255 }).default('NULL'),
	globalCurrencyCode: varchar("global_currency_code", { length: 255 }).default('NULL'),
	baseToGlobalRate: decimal("base_to_global_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseToQuoteRate: decimal("base_to_quote_rate", { precision: 20, scale: 4 }).default('NULL'),
	customerTaxvat: varchar("customer_taxvat", { length: 255 }).default('NULL'),
	customerGender: varchar("customer_gender", { length: 255 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotal: decimal("base_subtotal", { precision: 20, scale: 4 }).default('NULL'),
	subtotalWithDiscount: decimal("subtotal_with_discount", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalWithDiscount: decimal("base_subtotal_with_discount", { precision: 20, scale: 4 }).default('NULL'),
	isChanged: int("is_changed").default('NULL'),
	triggerRecollect: smallint("trigger_recollect").notNull(),
	extShippingInfo: text("ext_shipping_info").default('NULL'),
	giftMessageId: int("gift_message_id").default('NULL'),
	isPersistent: smallint("is_persistent"),
},
(table) => {
	return {
		quoteCustomerIdStoreIdIsActive: index("QUOTE_CUSTOMER_ID_STORE_ID_IS_ACTIVE").on(table.customerId, table.storeId, table.isActive),
		quoteStoreIdUpdatedAt: index("QUOTE_STORE_ID_UPDATED_AT").on(table.storeId, table.updatedAt),
	}
});

export const quoteAddress = mysqlTable("quote_address", {
	addressId: int("address_id").autoincrement().notNull(),
	quoteId: int("quote_id").default(0).notNull().references(() => quote.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	customerId: int("customer_id").default('NULL'),
	saveInAddressBook: smallint("save_in_address_book"),
	customerAddressId: int("customer_address_id").default('NULL'),
	addressType: varchar("address_type", { length: 10 }).default('NULL'),
	email: varchar("email", { length: 255 }).default('NULL'),
	prefix: varchar("prefix", { length: 40 }).default('NULL'),
	firstname: varchar("firstname", { length: 255 }).default('NULL'),
	middlename: varchar("middlename", { length: 40 }).default('NULL'),
	lastname: varchar("lastname", { length: 255 }).default('NULL'),
	suffix: varchar("suffix", { length: 40 }).default('NULL'),
	company: varchar("company", { length: 255 }).default('NULL'),
	street: varchar("street", { length: 255 }).default('NULL'),
	city: varchar("city", { length: 255 }).default('NULL'),
	region: varchar("region", { length: 255 }).default('NULL'),
	regionId: int("region_id").default('NULL'),
	postcode: varchar("postcode", { length: 20 }).default('NULL'),
	countryId: varchar("country_id", { length: 30 }).default('NULL'),
	telephone: varchar("telephone", { length: 255 }).default('NULL'),
	fax: varchar("fax", { length: 255 }).default('NULL'),
	sameAsBilling: smallint("same_as_billing").notNull(),
	collectShippingRates: smallint("collect_shipping_rates").notNull(),
	shippingMethod: varchar("shipping_method", { length: 120 }).default('NULL'),
	shippingDescription: varchar("shipping_description", { length: 255 }).default('NULL'),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseSubtotal: decimal("base_subtotal", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	subtotalWithDiscount: decimal("subtotal_with_discount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseSubtotalWithDiscount: decimal("base_subtotal_with_discount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	shippingAmount: decimal("shipping_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseShippingAmount: decimal("base_shipping_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	shippingTaxAmount: decimal("shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingTaxAmount: decimal("base_shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	customerNotes: text("customer_notes").default('NULL'),
	appliedTaxes: text("applied_taxes").default('NULL'),
	discountDescription: varchar("discount_description", { length: 255 }).default('NULL'),
	shippingDiscountAmount: decimal("shipping_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingDiscountAmount: decimal("base_shipping_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	subtotalInclTax: decimal("subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalTotalInclTax: decimal("base_subtotal_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingDiscountTaxCompensationAmount: decimal("shipping_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingDiscountTaxCompensationAmnt: decimal("base_shipping_discount_tax_compensation_amnt", { precision: 20, scale: 4 }).default('NULL'),
	shippingInclTax: decimal("shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingInclTax: decimal("base_shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	vatId: text("vat_id").default('NULL'),
	vatIsValid: smallint("vat_is_valid").default('NULL'),
	vatRequestId: text("vat_request_id").default('NULL'),
	vatRequestDate: text("vat_request_date").default('NULL'),
	vatRequestSuccess: smallint("vat_request_success").default('NULL'),
	validatedCountryCode: text("validated_country_code").default('NULL'),
	validatedVatNumber: text("validated_vat_number").default('NULL'),
	giftMessageId: int("gift_message_id").default('NULL'),
	freeShipping: smallint("free_shipping").notNull(),
},
(table) => {
	return {
		quoteAddressQuoteId: index("QUOTE_ADDRESS_QUOTE_ID").on(table.quoteId),
	}
});

export const quoteAddressItem = mysqlTable("quote_address_item", {
	addressItemId: int("address_item_id").autoincrement().notNull(),
	parentItemId: int("parent_item_id").default('NULL'),
	quoteAddressId: int("quote_address_id").default(0).notNull().references(() => quoteAddress.addressId, { onDelete: "cascade", onUpdate: "restrict" } ),
	quoteItemId: int("quote_item_id").default(0).notNull().references(() => quoteItem.itemId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	appliedRuleIds: text("applied_rule_ids").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('0.0000'),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('0.0000'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('0.0000'),
	rowTotal: decimal("row_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseRowTotal: decimal("base_row_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	rowTotalWithDiscount: decimal("row_total_with_discount", { precision: 20, scale: 4 }).default('0.0000'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('0.0000'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('0.0000'),
	rowWeight: decimal("row_weight", { precision: 12, scale: 4 }).default('0.0000'),
	productId: int("product_id").default('NULL'),
	superProductId: int("super_product_id").default('NULL'),
	parentProductId: int("parent_product_id").default('NULL'),
	storeId: smallint("store_id").default('NULL'),
	sku: varchar("sku", { length: 255 }).default('NULL'),
	image: varchar("image", { length: 255 }).default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	isQtyDecimal: int("is_qty_decimal").default('NULL'),
	price: decimal("price", { precision: 12, scale: 4 }).default('NULL'),
	discountPercent: decimal("discount_percent", { precision: 12, scale: 4 }).default('NULL'),
	noDiscount: int("no_discount").default('NULL'),
	taxPercent: decimal("tax_percent", { precision: 12, scale: 4 }).default('NULL'),
	basePrice: decimal("base_price", { precision: 20, scale: 4 }).default('NULL'),
	baseCost: decimal("base_cost", { precision: 20, scale: 4 }).default('NULL'),
	priceInclTax: decimal("price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	basePriceInclTax: decimal("base_price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	rowTotalInclTax: decimal("row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotalInclTax: decimal("base_row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	giftMessageId: int("gift_message_id").default('NULL'),
	freeShipping: int("free_shipping").default('NULL'),
},
(table) => {
	return {
		quoteAddressItemQuoteAddressId: index("QUOTE_ADDRESS_ITEM_QUOTE_ADDRESS_ID").on(table.quoteAddressId),
		quoteAddressItemParentItemId: index("QUOTE_ADDRESS_ITEM_PARENT_ITEM_ID").on(table.parentItemId),
		quoteAddressItemQuoteItemId: index("QUOTE_ADDRESS_ITEM_QUOTE_ITEM_ID").on(table.quoteItemId),
		quoteAddressItemStoreId: index("QUOTE_ADDRESS_ITEM_STORE_ID").on(table.storeId),
		quoteAddrItemParentItemIdQuoteAddrItemAddrItemId: foreignKey({
			columns: [table.parentItemId],
			foreignColumns: [table.addressItemId],
			name: "QUOTE_ADDR_ITEM_PARENT_ITEM_ID_QUOTE_ADDR_ITEM_ADDR_ITEM_ID"
		}).onUpdate("restrict").onDelete("cascade"),
	}
});

export const quoteIdMask = mysqlTable("quote_id_mask", {
	entityId: int("entity_id").autoincrement().notNull(),
	quoteId: int("quote_id").notNull().references(() => quote.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	maskedId: varchar("masked_id", { length: 32 }).default('NULL'),
},
(table) => {
	return {
		quoteIdMaskQuoteId: index("QUOTE_ID_MASK_QUOTE_ID").on(table.quoteId),
		quoteIdMaskMaskedId: index("QUOTE_ID_MASK_MASKED_ID").on(table.maskedId),
	}
});

export const quoteItem = mysqlTable("quote_item", {
	itemId: int("item_id").autoincrement().notNull(),
	quoteId: int("quote_id").default(0).notNull().references(() => quote.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	productId: int("product_id").default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	parentItemId: int("parent_item_id").default('NULL'),
	isVirtual: smallint("is_virtual").default('NULL'),
	sku: varchar("sku", { length: 255 }).default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	appliedRuleIds: text("applied_rule_ids").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	isQtyDecimal: smallint("is_qty_decimal").default('NULL'),
	noDiscount: smallint("no_discount"),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('0.0000'),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	price: decimal("price", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	basePrice: decimal("base_price", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	customPrice: decimal("custom_price", { precision: 20, scale: 4 }).default('NULL'),
	discountPercent: decimal("discount_percent", { precision: 12, scale: 4 }).default('0.0000'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('0.0000'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('0.0000'),
	taxPercent: decimal("tax_percent", { precision: 12, scale: 4 }).default('0.0000'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('0.0000'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('0.0000'),
	rowTotal: decimal("row_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseRowTotal: decimal("base_row_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	rowTotalWithDiscount: decimal("row_total_with_discount", { precision: 20, scale: 4 }).default('0.0000'),
	rowWeight: decimal("row_weight", { precision: 12, scale: 4 }).default('0.0000'),
	productType: varchar("product_type", { length: 255 }).default('NULL'),
	baseTaxBeforeDiscount: decimal("base_tax_before_discount", { precision: 20, scale: 4 }).default('NULL'),
	taxBeforeDiscount: decimal("tax_before_discount", { precision: 20, scale: 4 }).default('NULL'),
	originalCustomPrice: decimal("original_custom_price", { precision: 20, scale: 4 }).default('NULL'),
	redirectUrl: varchar("redirect_url", { length: 255 }).default('NULL'),
	baseCost: decimal("base_cost", { precision: 12, scale: 4 }).default('NULL'),
	priceInclTax: decimal("price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	basePriceInclTax: decimal("base_price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	rowTotalInclTax: decimal("row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotalInclTax: decimal("base_row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	giftMessageId: int("gift_message_id").default('NULL'),
	freeShipping: smallint("free_shipping").notNull(),
	weeeTaxApplied: text("weee_tax_applied").default('NULL'),
	weeeTaxAppliedAmount: decimal("weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxAppliedRowAmount: decimal("weee_tax_applied_row_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxDisposition: decimal("weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxRowDisposition: decimal("weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedAmount: decimal("base_weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedRowAmnt: decimal("base_weee_tax_applied_row_amnt", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxDisposition: decimal("base_weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxRowDisposition: decimal("base_weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		quoteItemParentItemId: index("QUOTE_ITEM_PARENT_ITEM_ID").on(table.parentItemId),
		quoteItemProductId: index("QUOTE_ITEM_PRODUCT_ID").on(table.productId),
		quoteItemQuoteId: index("QUOTE_ITEM_QUOTE_ID").on(table.quoteId),
		quoteItemStoreId: index("QUOTE_ITEM_STORE_ID").on(table.storeId),
		quoteItemParentItemIdQuoteItemItemId: foreignKey({
			columns: [table.parentItemId],
			foreignColumns: [table.itemId],
			name: "QUOTE_ITEM_PARENT_ITEM_ID_QUOTE_ITEM_ITEM_ID"
		}).onUpdate("restrict").onDelete("cascade"),
	}
});

export const quoteItemOption = mysqlTable("quote_item_option", {
	optionId: int("option_id").autoincrement().notNull(),
	itemId: int("item_id").notNull().references(() => quoteItem.itemId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").notNull(),
	code: varchar("code", { length: 255 }).notNull(),
	value: text("value").default('NULL'),
},
(table) => {
	return {
		quoteItemOptionItemId: index("QUOTE_ITEM_OPTION_ITEM_ID").on(table.itemId),
	}
});

export const quotePayment = mysqlTable("quote_payment", {
	paymentId: int("payment_id").autoincrement().notNull(),
	quoteId: int("quote_id").default(0).notNull().references(() => quote.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	method: varchar("method", { length: 255 }).default('NULL'),
	ccType: varchar("cc_type", { length: 255 }).default('NULL'),
	ccNumberEnc: varchar("cc_number_enc", { length: 255 }).default('NULL'),
	ccLast4: varchar("cc_last_4", { length: 255 }).default('NULL'),
	ccCidEnc: varchar("cc_cid_enc", { length: 255 }).default('NULL'),
	ccOwner: varchar("cc_owner", { length: 255 }).default('NULL'),
	ccExpMonth: varchar("cc_exp_month", { length: 255 }).default('NULL'),
	ccExpYear: smallint("cc_exp_year"),
	ccSsOwner: varchar("cc_ss_owner", { length: 255 }).default('NULL'),
	ccSsStartMonth: smallint("cc_ss_start_month"),
	ccSsStartYear: smallint("cc_ss_start_year"),
	poNumber: varchar("po_number", { length: 255 }).default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	ccSsIssue: varchar("cc_ss_issue", { length: 255 }).default('NULL'),
	additionalInformation: text("additional_information").default('NULL'),
	paypalPayerId: varchar("paypal_payer_id", { length: 255 }).default('NULL'),
	paypalPayerStatus: varchar("paypal_payer_status", { length: 255 }).default('NULL'),
	paypalCorrelationId: varchar("paypal_correlation_id", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		quotePaymentQuoteId: index("QUOTE_PAYMENT_QUOTE_ID").on(table.quoteId),
	}
});

export const quoteShippingRate = mysqlTable("quote_shipping_rate", {
	rateId: int("rate_id").autoincrement().notNull(),
	addressId: int("address_id").default(0).notNull().references(() => quoteAddress.addressId, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	carrier: varchar("carrier", { length: 255 }).default('NULL'),
	carrierTitle: varchar("carrier_title", { length: 255 }).default('NULL'),
	code: varchar("code", { length: 255 }).default('NULL'),
	method: varchar("method", { length: 255 }).default('NULL'),
	methodDescription: text("method_description").default('NULL'),
	price: decimal("price", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	errorMessage: text("error_message").default('NULL'),
	methodTitle: text("method_title").default('NULL'),
},
(table) => {
	return {
		quoteShippingRateAddressId: index("QUOTE_SHIPPING_RATE_ADDRESS_ID").on(table.addressId),
	}
});

export const rating = mysqlTable("rating", {
	ratingId: smallint("rating_id").autoincrement().notNull(),
	entityId: smallint("entity_id").notNull().references(() => ratingEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	ratingCode: varchar("rating_code", { length: 64 }).notNull(),
	position: smallint("position").notNull(),
	isActive: smallint("is_active").default(1).notNull(),
},
(table) => {
	return {
		ratingEntityId: index("RATING_ENTITY_ID").on(table.entityId),
		ratingRatingCode: unique("RATING_RATING_CODE").on(table.ratingCode),
	}
});

export const ratingEntity = mysqlTable("rating_entity", {
	entityId: smallint("entity_id").autoincrement().notNull(),
	entityCode: varchar("entity_code", { length: 64 }).notNull(),
},
(table) => {
	return {
		ratingEntityEntityCode: unique("RATING_ENTITY_ENTITY_CODE").on(table.entityCode),
	}
});

export const ratingOption = mysqlTable("rating_option", {
	optionId: int("option_id").autoincrement().notNull(),
	ratingId: smallint("rating_id").notNull().references(() => rating.ratingId, { onDelete: "cascade", onUpdate: "restrict" } ),
	code: varchar("code", { length: 32 }).notNull(),
	value: smallint("value").notNull(),
	position: smallint("position").notNull(),
},
(table) => {
	return {
		ratingOptionRatingId: index("RATING_OPTION_RATING_ID").on(table.ratingId),
	}
});

export const ratingOptionVote = mysqlTable("rating_option_vote", {
	voteId: bigint("vote_id", { mode: "number" }).autoincrement().notNull(),
	optionId: int("option_id").default(0).notNull().references(() => ratingOption.optionId, { onDelete: "cascade", onUpdate: "restrict" } ),
	remoteIp: varchar("remote_ip", { length: 16 }).notNull(),
	remoteIpLong: bigint("remote_ip_long", { mode: "number" }).notNull(),
	customerId: int("customer_id").default(0),
	entityPkValue: bigint("entity_pk_value", { mode: "number" }).notNull(),
	ratingId: smallint("rating_id").notNull(),
	reviewId: bigint("review_id", { mode: "number" }).default('NULL').references(() => review.reviewId, { onDelete: "cascade", onUpdate: "restrict" } ),
	percent: smallint("percent").notNull(),
	value: smallint("value").notNull(),
},
(table) => {
	return {
		ratingOptionVoteOptionId: index("RATING_OPTION_VOTE_OPTION_ID").on(table.optionId),
	}
});

export const ratingOptionVoteAggregated = mysqlTable("rating_option_vote_aggregated", {
	primaryId: int("primary_id").autoincrement().notNull(),
	ratingId: smallint("rating_id").notNull().references(() => rating.ratingId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityPkValue: bigint("entity_pk_value", { mode: "number" }).notNull(),
	voteCount: int("vote_count").default(0).notNull(),
	voteValueSum: int("vote_value_sum").default(0).notNull(),
	percent: smallint("percent").notNull(),
	percentApproved: smallint("percent_approved"),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		ratingOptionVoteAggregatedRatingId: index("RATING_OPTION_VOTE_AGGREGATED_RATING_ID").on(table.ratingId),
		ratingOptionVoteAggregatedStoreId: index("RATING_OPTION_VOTE_AGGREGATED_STORE_ID").on(table.storeId),
	}
});

export const ratingStore = mysqlTable("rating_store", {
	ratingId: smallint("rating_id").notNull().references(() => rating.ratingId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		ratingStoreStoreId: index("RATING_STORE_STORE_ID").on(table.storeId),
	}
});

export const ratingTitle = mysqlTable("rating_title", {
	ratingId: smallint("rating_id").notNull().references(() => rating.ratingId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).notNull(),
},
(table) => {
	return {
		ratingTitleStoreId: index("RATING_TITLE_STORE_ID").on(table.storeId),
	}
});

export const releaseNotificationViewerLog = mysqlTable("release_notification_viewer_log", {
	id: int("id").autoincrement().notNull(),
	viewerId: int("viewer_id").notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	lastViewVersion: varchar("last_view_version", { length: 16 }).notNull(),
},
(table) => {
	return {
		releaseNotificationViewerLogViewerId: unique("RELEASE_NOTIFICATION_VIEWER_LOG_VIEWER_ID").on(table.viewerId),
	}
});

export const reportingCounts = mysqlTable("reporting_counts", {
	entityId: int("entity_id").autoincrement().notNull(),
	type: varchar("type", { length: 255 }).default('NULL'),
	count: int("count").default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const reportingModuleStatus = mysqlTable("reporting_module_status", {
	entityId: int("entity_id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
	active: varchar("active", { length: 255 }).default('NULL'),
	setupVersion: varchar("setup_version", { length: 255 }).default('NULL'),
	state: varchar("state", { length: 255 }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const reportingOrders = mysqlTable("reporting_orders", {
	entityId: int("entity_id").autoincrement().notNull(),
	customerId: int("customer_id").default('NULL'),
	total: decimal("total", { precision: 20, scale: 4) unsigne }).default('NULL'),
	totalBase: decimal("total_base", { precision: 20, scale: 4) unsigne }).default('NULL'),
	itemCount: int("item_count").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const reportingSystemUpdates = mysqlTable("reporting_system_updates", {
	entityId: int("entity_id").autoincrement().notNull(),
	type: varchar("type", { length: 255 }).default('NULL'),
	action: varchar("action", { length: 255 }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const reportingUsers = mysqlTable("reporting_users", {
	entityId: int("entity_id").autoincrement().notNull(),
	type: varchar("type", { length: 255 }).default('NULL'),
	action: varchar("action", { length: 255 }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const reportComparedProductIndex = mysqlTable("report_compared_product_index", {
	indexId: bigint("index_id", { mode: "number" }).autoincrement().notNull(),
	visitorId: int("visitor_id").default('NULL'),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	addedAt: timestamp("added_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		reportComparedProductIndexStoreId: index("REPORT_COMPARED_PRODUCT_INDEX_STORE_ID").on(table.storeId),
		reportComparedProductIndexAddedAt: index("REPORT_COMPARED_PRODUCT_INDEX_ADDED_AT").on(table.addedAt),
		reportComparedProductIndexProductId: index("REPORT_COMPARED_PRODUCT_INDEX_PRODUCT_ID").on(table.productId),
		reportComparedProductIndexVisitorIdProductId: unique("REPORT_COMPARED_PRODUCT_INDEX_VISITOR_ID_PRODUCT_ID").on(table.visitorId, table.productId),
		reportComparedProductIndexCustomerIdProductId: unique("REPORT_COMPARED_PRODUCT_INDEX_CUSTOMER_ID_PRODUCT_ID").on(table.customerId, table.productId),
	}
});

export const reportEvent = mysqlTable("report_event", {
	eventId: bigint("event_id", { mode: "number" }).autoincrement().notNull(),
	loggedAt: timestamp("logged_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	eventTypeId: smallint("event_type_id").notNull().references(() => reportEventTypes.eventTypeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	objectId: int("object_id").default(0).notNull(),
	subjectId: int("subject_id").default(0).notNull(),
	subtype: smallint("subtype").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		reportEventEventTypeId: index("REPORT_EVENT_EVENT_TYPE_ID").on(table.eventTypeId),
		reportEventSubjectId: index("REPORT_EVENT_SUBJECT_ID").on(table.subjectId),
		reportEventObjectId: index("REPORT_EVENT_OBJECT_ID").on(table.objectId),
		reportEventSubtype: index("REPORT_EVENT_SUBTYPE").on(table.subtype),
		reportEventStoreId: index("REPORT_EVENT_STORE_ID").on(table.storeId),
	}
});

export const reportEventTypes = mysqlTable("report_event_types", {
	eventTypeId: smallint("event_type_id").autoincrement().notNull(),
	eventName: varchar("event_name", { length: 64 }).notNull(),
	customerLogin: smallint("customer_login").notNull(),
});

export const reportViewedProductAggregatedDaily = mysqlTable("report_viewed_product_aggregated_daily", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default('NULL').references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productPrice: decimal("product_price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	viewsNum: int("views_num").default(0).notNull(),
	ratingPos: smallint("rating_pos").notNull(),
},
(table) => {
	return {
		reportViewedProductAggregatedDailyStoreId: index("REPORT_VIEWED_PRODUCT_AGGREGATED_DAILY_STORE_ID").on(table.storeId),
		reportViewedProductAggregatedDailyProductId: index("REPORT_VIEWED_PRODUCT_AGGREGATED_DAILY_PRODUCT_ID").on(table.productId),
		reportViewedPrdAggredDailyPeriodStoreIdPrdId: unique("REPORT_VIEWED_PRD_AGGRED_DAILY_PERIOD_STORE_ID_PRD_ID").on(table.period, table.storeId, table.productId),
	}
});

export const reportViewedProductAggregatedMonthly = mysqlTable("report_viewed_product_aggregated_monthly", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default('NULL').references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productPrice: decimal("product_price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	viewsNum: int("views_num").default(0).notNull(),
	ratingPos: smallint("rating_pos").notNull(),
},
(table) => {
	return {
		reportViewedProductAggregatedMonthlyStoreId: index("REPORT_VIEWED_PRODUCT_AGGREGATED_MONTHLY_STORE_ID").on(table.storeId),
		reportViewedProductAggregatedMonthlyProductId: index("REPORT_VIEWED_PRODUCT_AGGREGATED_MONTHLY_PRODUCT_ID").on(table.productId),
		reportViewedPrdAggredMonthlyPeriodStoreIdPrdId: unique("REPORT_VIEWED_PRD_AGGRED_MONTHLY_PERIOD_STORE_ID_PRD_ID").on(table.period, table.storeId, table.productId),
	}
});

export const reportViewedProductAggregatedYearly = mysqlTable("report_viewed_product_aggregated_yearly", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default('NULL').references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productPrice: decimal("product_price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	viewsNum: int("views_num").default(0).notNull(),
	ratingPos: smallint("rating_pos").notNull(),
},
(table) => {
	return {
		reportViewedProductAggregatedYearlyStoreId: index("REPORT_VIEWED_PRODUCT_AGGREGATED_YEARLY_STORE_ID").on(table.storeId),
		reportViewedProductAggregatedYearlyProductId: index("REPORT_VIEWED_PRODUCT_AGGREGATED_YEARLY_PRODUCT_ID").on(table.productId),
		reportViewedPrdAggredYearlyPeriodStoreIdPrdId: unique("REPORT_VIEWED_PRD_AGGRED_YEARLY_PERIOD_STORE_ID_PRD_ID").on(table.period, table.storeId, table.productId),
	}
});

export const reportViewedProductIndex = mysqlTable("report_viewed_product_index", {
	indexId: bigint("index_id", { mode: "number" }).autoincrement().notNull(),
	visitorId: int("visitor_id").default('NULL'),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	addedAt: timestamp("added_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		reportViewedProductIndexStoreId: index("REPORT_VIEWED_PRODUCT_INDEX_STORE_ID").on(table.storeId),
		reportViewedProductIndexAddedAt: index("REPORT_VIEWED_PRODUCT_INDEX_ADDED_AT").on(table.addedAt),
		reportViewedProductIndexProductId: index("REPORT_VIEWED_PRODUCT_INDEX_PRODUCT_ID").on(table.productId),
		reportViewedProductIndexVisitorIdProductId: unique("REPORT_VIEWED_PRODUCT_INDEX_VISITOR_ID_PRODUCT_ID").on(table.visitorId, table.productId),
		reportViewedProductIndexCustomerIdProductId: unique("REPORT_VIEWED_PRODUCT_INDEX_CUSTOMER_ID_PRODUCT_ID").on(table.customerId, table.productId),
	}
});

export const review = mysqlTable("review", {
	reviewId: bigint("review_id", { mode: "number" }).autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	entityId: smallint("entity_id").notNull().references(() => reviewEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityPkValue: int("entity_pk_value").default(0).notNull(),
	statusId: smallint("status_id").notNull().references(() => reviewStatus.statusId, { onUpdate: "restrict" } ),
},
(table) => {
	return {
		reviewEntityId: index("REVIEW_ENTITY_ID").on(table.entityId),
		reviewStatusId: index("REVIEW_STATUS_ID").on(table.statusId),
		reviewEntityPkValue: index("REVIEW_ENTITY_PK_VALUE").on(table.entityPkValue),
	}
});

export const reviewDetail = mysqlTable("review_detail", {
	detailId: bigint("detail_id", { mode: "number" }).autoincrement().notNull(),
	reviewId: bigint("review_id", { mode: "number" }).notNull().references(() => review.reviewId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	title: varchar("title", { length: 255 }).notNull(),
	detail: text("detail").notNull(),
	nickname: varchar("nickname", { length: 128 }).notNull(),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "set null", onUpdate: "restrict" } ),
},
(table) => {
	return {
		reviewDetailReviewId: index("REVIEW_DETAIL_REVIEW_ID").on(table.reviewId),
		reviewDetailStoreId: index("REVIEW_DETAIL_STORE_ID").on(table.storeId),
		reviewDetailCustomerId: index("REVIEW_DETAIL_CUSTOMER_ID").on(table.customerId),
	}
});

export const reviewEntity = mysqlTable("review_entity", {
	entityId: smallint("entity_id").autoincrement().notNull(),
	entityCode: varchar("entity_code", { length: 32 }).notNull(),
});

export const reviewEntitySummary = mysqlTable("review_entity_summary", {
	primaryId: bigint("primary_id", { mode: "number" }).autoincrement().notNull(),
	entityPkValue: bigint("entity_pk_value", { mode: "number" }).notNull(),
	entityType: smallint("entity_type").notNull(),
	reviewsCount: smallint("reviews_count").notNull(),
	ratingSummary: smallint("rating_summary").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		reviewEntitySummaryStoreId: index("REVIEW_ENTITY_SUMMARY_STORE_ID").on(table.storeId),
		reviewEntitySummaryEntityPkValueStoreIdEntityType: unique("REVIEW_ENTITY_SUMMARY_ENTITY_PK_VALUE_STORE_ID_ENTITY_TYPE").on(table.entityPkValue, table.storeId, table.entityType),
	}
});

export const reviewStatus = mysqlTable("review_status", {
	statusId: smallint("status_id").autoincrement().notNull(),
	statusCode: varchar("status_code", { length: 32 }).notNull(),
});

export const reviewStore = mysqlTable("review_store", {
	reviewId: bigint("review_id", { mode: "number" }).notNull().references(() => review.reviewId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		reviewStoreStoreId: index("REVIEW_STORE_STORE_ID").on(table.storeId),
	}
});

export const salesrule = mysqlTable("salesrule", {
	ruleId: int("rule_id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	fromDate: date("from_date", { mode: 'string' }).default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	toDate: date("to_date", { mode: 'string' }).default('NULL'),
	usesPerCustomer: int("uses_per_customer").default(0).notNull(),
	isActive: smallint("is_active").notNull(),
	conditionsSerialized: mediumtext("conditions_serialized").default('NULL'),
	actionsSerialized: mediumtext("actions_serialized").default('NULL'),
	stopRulesProcessing: smallint("stop_rules_processing").default(1).notNull(),
	isAdvanced: smallint("is_advanced").default(1).notNull(),
	productIds: text("product_ids").default('NULL'),
	sortOrder: int("sort_order").default(0).notNull(),
	simpleAction: varchar("simple_action", { length: 32 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	discountQty: decimal("discount_qty", { precision: 12, scale: 4 }).default('NULL'),
	discountStep: int("discount_step").default(0).notNull(),
	applyToShipping: smallint("apply_to_shipping").notNull(),
	timesUsed: int("times_used").default(0).notNull(),
	isRss: smallint("is_rss").notNull(),
	couponType: smallint("coupon_type").default(1).notNull(),
	useAutoGeneration: smallint("use_auto_generation").notNull(),
	usesPerCoupon: int("uses_per_coupon").default(0).notNull(),
	simpleFreeShipping: smallint("simple_free_shipping").default('NULL'),
},
(table) => {
	return {
		salesruleIsActiveSortOrderToDateFromDate: index("SALESRULE_IS_ACTIVE_SORT_ORDER_TO_DATE_FROM_DATE").on(table.isActive, table.sortOrder, table.toDate, table.fromDate),
	}
});

export const salesruleCoupon = mysqlTable("salesrule_coupon", {
	couponId: int("coupon_id").autoincrement().notNull(),
	ruleId: int("rule_id").notNull().references(() => salesrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	code: varchar("code", { length: 255 }).default('NULL'),
	usageLimit: int("usage_limit").default('NULL'),
	usagePerCustomer: int("usage_per_customer").default('NULL'),
	timesUsed: int("times_used").default(0).notNull(),
	expirationDate: datetime("expiration_date", { mode: 'string'}).default('NULL'),
	isPrimary: smallint("is_primary").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	type: smallint("type"),
},
(table) => {
	return {
		salesruleCouponRuleId: index("SALESRULE_COUPON_RULE_ID").on(table.ruleId),
		salesruleCouponCode: unique("SALESRULE_COUPON_CODE").on(table.code),
		salesruleCouponRuleIdIsPrimary: unique("SALESRULE_COUPON_RULE_ID_IS_PRIMARY").on(table.ruleId, table.isPrimary),
	}
});

export const salesruleCouponAggregated = mysqlTable("salesrule_coupon_aggregated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).notNull(),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	couponCode: varchar("coupon_code", { length: 50 }).default('NULL'),
	couponUses: int("coupon_uses").default(0).notNull(),
	subtotalAmount: decimal("subtotal_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	discountAmount: decimal("discount_amount", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalAmount: decimal("total_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	subtotalAmountActual: decimal("subtotal_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	discountAmountActual: decimal("discount_amount_actual", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalAmountActual: decimal("total_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	ruleName: varchar("rule_name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		salesruleCouponAggregatedStoreId: index("SALESRULE_COUPON_AGGREGATED_STORE_ID").on(table.storeId),
		salesruleCouponAggregatedRuleName: index("SALESRULE_COUPON_AGGREGATED_RULE_NAME").on(table.ruleName),
		salesruleCouponAggredPeriodStoreIdOrderStsCouponCode: unique("SALESRULE_COUPON_AGGRED_PERIOD_STORE_ID_ORDER_STS_COUPON_CODE").on(table.period, table.storeId, table.orderStatus, table.couponCode),
	}
});

export const salesruleCouponAggregatedOrder = mysqlTable("salesrule_coupon_aggregated_order", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).notNull(),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	couponCode: varchar("coupon_code", { length: 50 }).default('NULL'),
	couponUses: int("coupon_uses").default(0).notNull(),
	subtotalAmount: decimal("subtotal_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	discountAmount: decimal("discount_amount", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalAmount: decimal("total_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	ruleName: varchar("rule_name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		salesruleCouponAggregatedOrderStoreId: index("SALESRULE_COUPON_AGGREGATED_ORDER_STORE_ID").on(table.storeId),
		salesruleCouponAggregatedOrderRuleName: index("SALESRULE_COUPON_AGGREGATED_ORDER_RULE_NAME").on(table.ruleName),
		unq1094D1Fbbcbb11704A29Def3Acc37D2B: unique("UNQ_1094D1FBBCBB11704A29DEF3ACC37D2B").on(table.period, table.storeId, table.orderStatus, table.couponCode),
	}
});

export const salesruleCouponAggregatedUpdated = mysqlTable("salesrule_coupon_aggregated_updated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).notNull(),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	couponCode: varchar("coupon_code", { length: 50 }).default('NULL'),
	couponUses: int("coupon_uses").default(0).notNull(),
	subtotalAmount: decimal("subtotal_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	discountAmount: decimal("discount_amount", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalAmount: decimal("total_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	subtotalAmountActual: decimal("subtotal_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	discountAmountActual: decimal("discount_amount_actual", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalAmountActual: decimal("total_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	ruleName: varchar("rule_name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		salesruleCouponAggregatedUpdatedStoreId: index("SALESRULE_COUPON_AGGREGATED_UPDATED_STORE_ID").on(table.storeId),
		salesruleCouponAggregatedUpdatedRuleName: index("SALESRULE_COUPON_AGGREGATED_UPDATED_RULE_NAME").on(table.ruleName),
		unq7196Fa120A4F0F84E1B66605E87E213E: unique("UNQ_7196FA120A4F0F84E1B66605E87E213E").on(table.period, table.storeId, table.orderStatus, table.couponCode),
	}
});

export const salesruleCouponUsage = mysqlTable("salesrule_coupon_usage", {
	couponId: int("coupon_id").notNull().references(() => salesruleCoupon.couponId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerId: int("customer_id").notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	timesUsed: int("times_used").default(0).notNull(),
},
(table) => {
	return {
		salesruleCouponUsageCustomerId: index("SALESRULE_COUPON_USAGE_CUSTOMER_ID").on(table.customerId),
	}
});

export const salesruleCustomer = mysqlTable("salesrule_customer", {
	ruleCustomerId: int("rule_customer_id").autoincrement().notNull(),
	ruleId: int("rule_id").default(0).notNull().references(() => salesrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerId: int("customer_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	timesUsed: smallint("times_used").notNull(),
},
(table) => {
	return {
		salesruleCustomerRuleIdCustomerId: index("SALESRULE_CUSTOMER_RULE_ID_CUSTOMER_ID").on(table.ruleId, table.customerId),
		salesruleCustomerCustomerIdRuleId: index("SALESRULE_CUSTOMER_CUSTOMER_ID_RULE_ID").on(table.customerId, table.ruleId),
	}
});

export const salesruleCustomerGroup = mysqlTable("salesrule_customer_group", {
	ruleId: int("rule_id").notNull().references(() => salesrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerGroupId: int("customer_group_id").notNull().references(() => customerGroup.customerGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		salesruleCustomerGroupCustomerGroupId: index("SALESRULE_CUSTOMER_GROUP_CUSTOMER_GROUP_ID").on(table.customerGroupId),
	}
});

export const salesruleLabel = mysqlTable("salesrule_label", {
	labelId: int("label_id").autoincrement().notNull(),
	ruleId: int("rule_id").notNull().references(() => salesrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	label: varchar("label", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		salesruleLabelStoreId: index("SALESRULE_LABEL_STORE_ID").on(table.storeId),
		salesruleLabelRuleIdStoreId: unique("SALESRULE_LABEL_RULE_ID_STORE_ID").on(table.ruleId, table.storeId),
	}
});

export const salesruleProductAttribute = mysqlTable("salesrule_product_attribute", {
	ruleId: int("rule_id").notNull().references(() => salesrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerGroupId: int("customer_group_id").notNull().references(() => customerGroup.customerGroupId, { onDelete: "cascade", onUpdate: "restrict" } ),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		salesruleProductAttributeWebsiteId: index("SALESRULE_PRODUCT_ATTRIBUTE_WEBSITE_ID").on(table.websiteId),
		salesruleProductAttributeCustomerGroupId: index("SALESRULE_PRODUCT_ATTRIBUTE_CUSTOMER_GROUP_ID").on(table.customerGroupId),
		salesruleProductAttributeAttributeId: index("SALESRULE_PRODUCT_ATTRIBUTE_ATTRIBUTE_ID").on(table.attributeId),
	}
});

export const salesruleWebsite = mysqlTable("salesrule_website", {
	ruleId: int("rule_id").notNull().references(() => salesrule.ruleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		salesruleWebsiteWebsiteId: index("SALESRULE_WEBSITE_WEBSITE_ID").on(table.websiteId),
	}
});

export const salesBestsellersAggregatedDaily = mysqlTable("sales_bestsellers_aggregated_daily", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default('NULL'),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productPrice: decimal("product_price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	qtyOrdered: decimal("qty_ordered", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	ratingPos: smallint("rating_pos").notNull(),
},
(table) => {
	return {
		salesBestsellersAggregatedDailyStoreId: index("SALES_BESTSELLERS_AGGREGATED_DAILY_STORE_ID").on(table.storeId),
		salesBestsellersAggregatedDailyProductId: index("SALES_BESTSELLERS_AGGREGATED_DAILY_PRODUCT_ID").on(table.productId),
		salesBestsellersAggregatedDailyPeriodStoreIdProductId: unique("SALES_BESTSELLERS_AGGREGATED_DAILY_PERIOD_STORE_ID_PRODUCT_ID").on(table.period, table.storeId, table.productId),
	}
});

export const salesBestsellersAggregatedMonthly = mysqlTable("sales_bestsellers_aggregated_monthly", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default('NULL'),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productPrice: decimal("product_price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	qtyOrdered: decimal("qty_ordered", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	ratingPos: smallint("rating_pos").notNull(),
},
(table) => {
	return {
		salesBestsellersAggregatedMonthlyStoreId: index("SALES_BESTSELLERS_AGGREGATED_MONTHLY_STORE_ID").on(table.storeId),
		salesBestsellersAggregatedMonthlyProductId: index("SALES_BESTSELLERS_AGGREGATED_MONTHLY_PRODUCT_ID").on(table.productId),
		salesBestsellersAggregatedMonthlyPeriodStoreIdProductId: unique("SALES_BESTSELLERS_AGGREGATED_MONTHLY_PERIOD_STORE_ID_PRODUCT_ID").on(table.period, table.storeId, table.productId),
	}
});

export const salesBestsellersAggregatedYearly = mysqlTable("sales_bestsellers_aggregated_yearly", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default('NULL'),
	productName: varchar("product_name", { length: 255 }).default('NULL'),
	productPrice: decimal("product_price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	qtyOrdered: decimal("qty_ordered", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	ratingPos: smallint("rating_pos").notNull(),
},
(table) => {
	return {
		salesBestsellersAggregatedYearlyStoreId: index("SALES_BESTSELLERS_AGGREGATED_YEARLY_STORE_ID").on(table.storeId),
		salesBestsellersAggregatedYearlyProductId: index("SALES_BESTSELLERS_AGGREGATED_YEARLY_PRODUCT_ID").on(table.productId),
		salesBestsellersAggregatedYearlyPeriodStoreIdProductId: unique("SALES_BESTSELLERS_AGGREGATED_YEARLY_PERIOD_STORE_ID_PRODUCT_ID").on(table.period, table.storeId, table.productId),
	}
});

export const salesCreditmemo = mysqlTable("sales_creditmemo", {
	entityId: int("entity_id").autoincrement().notNull(),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	adjustmentPositive: decimal("adjustment_positive", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingTaxAmount: decimal("base_shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	storeToOrderRate: decimal("store_to_order_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseToOrderRate: decimal("base_to_order_rate", { precision: 20, scale: 4 }).default('NULL'),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('NULL'),
	baseAdjustmentNegative: decimal("base_adjustment_negative", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalInclTax: decimal("base_subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	shippingAmount: decimal("shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	subtotalInclTax: decimal("subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	adjustmentNegative: decimal("adjustment_negative", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingAmount: decimal("base_shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	storeToBaseRate: decimal("store_to_base_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseToGlobalRate: decimal("base_to_global_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseAdjustment: decimal("base_adjustment", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotal: decimal("base_subtotal", { precision: 20, scale: 4 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	adjustment: decimal("adjustment", { precision: 20, scale: 4 }).default('NULL'),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
	baseAdjustmentPositive: decimal("base_adjustment_positive", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingTaxAmount: decimal("shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	orderId: int("order_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	emailSent: smallint("email_sent").default('NULL'),
	sendEmail: smallint("send_email").default('NULL'),
	creditmemoStatus: int("creditmemo_status").default('NULL'),
	state: int("state").default('NULL'),
	shippingAddressId: int("shipping_address_id").default('NULL'),
	billingAddressId: int("billing_address_id").default('NULL'),
	invoiceId: int("invoice_id").default('NULL'),
	storeCurrencyCode: varchar("store_currency_code", { length: 3 }).default('NULL'),
	orderCurrencyCode: varchar("order_currency_code", { length: 3 }).default('NULL'),
	baseCurrencyCode: varchar("base_currency_code", { length: 3 }).default('NULL'),
	globalCurrencyCode: varchar("global_currency_code", { length: 3 }).default('NULL'),
	transactionId: varchar("transaction_id", { length: 255 }).default('NULL'),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingDiscountTaxCompensationAmount: decimal("shipping_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingDiscountTaxCompensationAmnt: decimal("base_shipping_discount_tax_compensation_amnt", { precision: 20, scale: 4 }).default('NULL'),
	shippingInclTax: decimal("shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingInclTax: decimal("base_shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	discountDescription: varchar("discount_description", { length: 255 }).default('NULL'),
	customerNote: text("customer_note").default('NULL'),
	customerNoteNotify: smallint("customer_note_notify").default('NULL'),
},
(table) => {
	return {
		salesCreditmemoStoreId: index("SALES_CREDITMEMO_STORE_ID").on(table.storeId),
		salesCreditmemoOrderId: index("SALES_CREDITMEMO_ORDER_ID").on(table.orderId),
		salesCreditmemoCreditmemoStatus: index("SALES_CREDITMEMO_CREDITMEMO_STATUS").on(table.creditmemoStatus),
		salesCreditmemoState: index("SALES_CREDITMEMO_STATE").on(table.state),
		salesCreditmemoCreatedAt: index("SALES_CREDITMEMO_CREATED_AT").on(table.createdAt),
		salesCreditmemoUpdatedAt: index("SALES_CREDITMEMO_UPDATED_AT").on(table.updatedAt),
		salesCreditmemoSendEmail: index("SALES_CREDITMEMO_SEND_EMAIL").on(table.sendEmail),
		salesCreditmemoEmailSent: index("SALES_CREDITMEMO_EMAIL_SENT").on(table.emailSent),
		salesCreditmemoIncrementIdStoreId: unique("SALES_CREDITMEMO_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesCreditmemoComment = mysqlTable("sales_creditmemo_comment", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesCreditmemo.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isCustomerNotified: int("is_customer_notified").default('NULL'),
	isVisibleOnFront: smallint("is_visible_on_front").notNull(),
	comment: text("comment").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesCreditmemoCommentCreatedAt: index("SALES_CREDITMEMO_COMMENT_CREATED_AT").on(table.createdAt),
		salesCreditmemoCommentParentId: index("SALES_CREDITMEMO_COMMENT_PARENT_ID").on(table.parentId),
	}
});

export const salesCreditmemoGrid = mysqlTable("sales_creditmemo_grid", {
	entityId: int("entity_id").notNull(),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	orderId: int("order_id").notNull(),
	orderIncrementId: varchar("order_increment_id", { length: 50 }).default('NULL'),
	orderCreatedAt: timestamp("order_created_at", { mode: 'string' }).default('NULL'),
	billingName: varchar("billing_name", { length: 255 }).default('NULL'),
	state: int("state").default('NULL'),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
	orderStatus: varchar("order_status", { length: 32 }).default('NULL'),
	storeId: smallint("store_id").default('NULL'),
	billingAddress: varchar("billing_address", { length: 255 }).default('NULL'),
	shippingAddress: varchar("shipping_address", { length: 255 }).default('NULL'),
	customerName: varchar("customer_name", { length: 128 }).notNull(),
	customerEmail: varchar("customer_email", { length: 128 }).default('NULL'),
	customerGroupId: smallint("customer_group_id").default('NULL'),
	paymentMethod: varchar("payment_method", { length: 32 }).default('NULL'),
	shippingInformation: varchar("shipping_information", { length: 255 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	shippingAndHandling: decimal("shipping_and_handling", { precision: 20, scale: 4 }).default('NULL'),
	adjustmentPositive: decimal("adjustment_positive", { precision: 20, scale: 4 }).default('NULL'),
	adjustmentNegative: decimal("adjustment_negative", { precision: 20, scale: 4 }).default('NULL'),
	orderBaseGrandTotal: decimal("order_base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesCreditmemoGridOrderIncrementId: index("SALES_CREDITMEMO_GRID_ORDER_INCREMENT_ID").on(table.orderIncrementId),
		salesCreditmemoGridCreatedAt: index("SALES_CREDITMEMO_GRID_CREATED_AT").on(table.createdAt),
		salesCreditmemoGridUpdatedAt: index("SALES_CREDITMEMO_GRID_UPDATED_AT").on(table.updatedAt),
		salesCreditmemoGridOrderCreatedAt: index("SALES_CREDITMEMO_GRID_ORDER_CREATED_AT").on(table.orderCreatedAt),
		salesCreditmemoGridState: index("SALES_CREDITMEMO_GRID_STATE").on(table.state),
		salesCreditmemoGridBillingName: index("SALES_CREDITMEMO_GRID_BILLING_NAME").on(table.billingName),
		salesCreditmemoGridOrderStatus: index("SALES_CREDITMEMO_GRID_ORDER_STATUS").on(table.orderStatus),
		salesCreditmemoGridBaseGrandTotal: index("SALES_CREDITMEMO_GRID_BASE_GRAND_TOTAL").on(table.baseGrandTotal),
		salesCreditmemoGridStoreId: index("SALES_CREDITMEMO_GRID_STORE_ID").on(table.storeId),
		salesCreditmemoGridOrderBaseGrandTotal: index("SALES_CREDITMEMO_GRID_ORDER_BASE_GRAND_TOTAL").on(table.orderBaseGrandTotal),
		salesCreditmemoGridOrderId: index("SALES_CREDITMEMO_GRID_ORDER_ID").on(table.orderId),
		fti32B7Ba885941A8254Ee84Ae650Abdc86: index("FTI_32B7BA885941A8254EE84AE650ABDC86").on(table.incrementId, table.orderIncrementId, table.billingName, table.billingAddress, table.shippingAddress, table.customerName, table.customerEmail),
		salesCreditmemoGridIncrementIdStoreId: unique("SALES_CREDITMEMO_GRID_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesCreditmemoItem = mysqlTable("sales_creditmemo_item", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesCreditmemo.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	basePrice: decimal("base_price", { precision: 20, scale: 4 }).default('NULL'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotal: decimal("base_row_total", { precision: 20, scale: 4 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	rowTotal: decimal("row_total", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	priceInclTax: decimal("price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	basePriceInclTax: decimal("base_price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('NULL'),
	baseCost: decimal("base_cost", { precision: 20, scale: 4 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotalInclTax: decimal("base_row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	rowTotalInclTax: decimal("row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	productId: int("product_id").default('NULL'),
	orderItemId: int("order_item_id").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	description: text("description").default('NULL'),
	sku: varchar("sku", { length: 255 }).default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	taxRatio: text("tax_ratio").default('NULL'),
	weeeTaxApplied: text("weee_tax_applied").default('NULL'),
	weeeTaxAppliedAmount: decimal("weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxAppliedRowAmount: decimal("weee_tax_applied_row_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxDisposition: decimal("weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxRowDisposition: decimal("weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedAmount: decimal("base_weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedRowAmnt: decimal("base_weee_tax_applied_row_amnt", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxDisposition: decimal("base_weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxRowDisposition: decimal("base_weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesCreditmemoItemParentId: index("SALES_CREDITMEMO_ITEM_PARENT_ID").on(table.parentId),
	}
});

export const salesDataExporterOrders = mysqlTable("sales_data_exporter_orders", {
	id: int("id").notNull(),
	mode: varchar("mode", { length: 255 }).notNull(),
	feedData: mediumtext("feed_data").notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesDataExporterOrdersModifiedAt: index("SALES_DATA_EXPORTER_ORDERS_MODIFIED_AT").on(table.modifiedAt),
	}
});

export const salesDataExporterOrdersIndexBatches = mysqlTable("sales_data_exporter_orders_index_batches", {
	batchNumber: int("batch_number").notNull(),
	entityId: int("entity_id").notNull(),
});

export const salesDataExporterOrdersIndexSequence = mysqlTable("sales_data_exporter_orders_index_sequence", {
	i: int("i").autoincrement().notNull(),
});

export const salesDataExporterOrderStatuses = mysqlTable("sales_data_exporter_order_statuses", {
	status: varchar("status", { length: 255 }).notNull(),
	feedData: mediumtext("feed_data").notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesDataExporterOrderStatusesModifiedAt: index("SALES_DATA_EXPORTER_ORDER_STATUSES_MODIFIED_AT").on(table.modifiedAt),
	}
});

export const salesDataExporterOrderStatusesIndexBatches = mysqlTable("sales_data_exporter_order_statuses_index_batches", {
	batchNumber: int("batch_number").notNull(),
	status: varchar("status", { length: 32 }).notNull(),
});

export const salesDataExporterOrderStatusesIndexSequence = mysqlTable("sales_data_exporter_order_statuses_index_sequence", {
	i: int("i").autoincrement().notNull(),
});

export const salesInvoice = mysqlTable("sales_invoice", {
	entityId: int("entity_id").autoincrement().notNull(),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
	shippingTaxAmount: decimal("shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	storeToOrderRate: decimal("store_to_order_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingTaxAmount: decimal("base_shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseToOrderRate: decimal("base_to_order_rate", { precision: 20, scale: 4 }).default('NULL'),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('NULL'),
	shippingAmount: decimal("shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	subtotalInclTax: decimal("subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalInclTax: decimal("base_subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	storeToBaseRate: decimal("store_to_base_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingAmount: decimal("base_shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	totalQty: decimal("total_qty", { precision: 12, scale: 4 }).default('NULL'),
	baseToGlobalRate: decimal("base_to_global_rate", { precision: 20, scale: 4 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotal: decimal("base_subtotal", { precision: 20, scale: 4 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	billingAddressId: int("billing_address_id").default('NULL'),
	isUsedForRefund: smallint("is_used_for_refund").default('NULL'),
	orderId: int("order_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	emailSent: smallint("email_sent").default('NULL'),
	sendEmail: smallint("send_email").default('NULL'),
	canVoidFlag: smallint("can_void_flag").default('NULL'),
	state: int("state").default('NULL'),
	shippingAddressId: int("shipping_address_id").default('NULL'),
	storeCurrencyCode: varchar("store_currency_code", { length: 3 }).default('NULL'),
	transactionId: varchar("transaction_id", { length: 255 }).default('NULL'),
	orderCurrencyCode: varchar("order_currency_code", { length: 3 }).default('NULL'),
	baseCurrencyCode: varchar("base_currency_code", { length: 3 }).default('NULL'),
	globalCurrencyCode: varchar("global_currency_code", { length: 3 }).default('NULL'),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingDiscountTaxCompensationAmount: decimal("shipping_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingDiscountTaxCompensationAmnt: decimal("base_shipping_discount_tax_compensation_amnt", { precision: 20, scale: 4 }).default('NULL'),
	shippingInclTax: decimal("shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingInclTax: decimal("base_shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalRefunded: decimal("base_total_refunded", { precision: 20, scale: 4 }).default('NULL'),
	discountDescription: varchar("discount_description", { length: 255 }).default('NULL'),
	customerNote: text("customer_note").default('NULL'),
	customerNoteNotify: smallint("customer_note_notify").default('NULL'),
},
(table) => {
	return {
		salesInvoiceStoreId: index("SALES_INVOICE_STORE_ID").on(table.storeId),
		salesInvoiceGrandTotal: index("SALES_INVOICE_GRAND_TOTAL").on(table.grandTotal),
		salesInvoiceOrderId: index("SALES_INVOICE_ORDER_ID").on(table.orderId),
		salesInvoiceState: index("SALES_INVOICE_STATE").on(table.state),
		salesInvoiceCreatedAt: index("SALES_INVOICE_CREATED_AT").on(table.createdAt),
		salesInvoiceUpdatedAt: index("SALES_INVOICE_UPDATED_AT").on(table.updatedAt),
		salesInvoiceSendEmail: index("SALES_INVOICE_SEND_EMAIL").on(table.sendEmail),
		salesInvoiceEmailSent: index("SALES_INVOICE_EMAIL_SENT").on(table.emailSent),
		salesInvoiceIncrementIdStoreId: unique("SALES_INVOICE_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesInvoicedAggregated = mysqlTable("sales_invoiced_aggregated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	ordersCount: int("orders_count").default(0).notNull(),
	ordersInvoiced: decimal("orders_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	invoiced: decimal("invoiced", { precision: 20, scale: 4 }).default('NULL'),
	invoicedCaptured: decimal("invoiced_captured", { precision: 20, scale: 4 }).default('NULL'),
	invoicedNotCaptured: decimal("invoiced_not_captured", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesInvoicedAggregatedStoreId: index("SALES_INVOICED_AGGREGATED_STORE_ID").on(table.storeId),
		salesInvoicedAggregatedPeriodStoreIdOrderStatus: unique("SALES_INVOICED_AGGREGATED_PERIOD_STORE_ID_ORDER_STATUS").on(table.period, table.storeId, table.orderStatus),
	}
});

export const salesInvoicedAggregatedOrder = mysqlTable("sales_invoiced_aggregated_order", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).notNull(),
	ordersCount: int("orders_count").default(0).notNull(),
	ordersInvoiced: decimal("orders_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	invoiced: decimal("invoiced", { precision: 20, scale: 4 }).default('NULL'),
	invoicedCaptured: decimal("invoiced_captured", { precision: 20, scale: 4 }).default('NULL'),
	invoicedNotCaptured: decimal("invoiced_not_captured", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesInvoicedAggregatedOrderStoreId: index("SALES_INVOICED_AGGREGATED_ORDER_STORE_ID").on(table.storeId),
		salesInvoicedAggregatedOrderPeriodStoreIdOrderStatus: unique("SALES_INVOICED_AGGREGATED_ORDER_PERIOD_STORE_ID_ORDER_STATUS").on(table.period, table.storeId, table.orderStatus),
	}
});

export const salesInvoiceComment = mysqlTable("sales_invoice_comment", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesInvoice.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isCustomerNotified: smallint("is_customer_notified").default('NULL'),
	isVisibleOnFront: smallint("is_visible_on_front").notNull(),
	comment: text("comment").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesInvoiceCommentCreatedAt: index("SALES_INVOICE_COMMENT_CREATED_AT").on(table.createdAt),
		salesInvoiceCommentParentId: index("SALES_INVOICE_COMMENT_PARENT_ID").on(table.parentId),
	}
});

export const salesInvoiceGrid = mysqlTable("sales_invoice_grid", {
	entityId: int("entity_id").notNull(),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	state: int("state").default('NULL'),
	storeId: smallint("store_id").default('NULL'),
	storeName: varchar("store_name", { length: 255 }).default('NULL'),
	orderId: int("order_id").notNull(),
	orderIncrementId: varchar("order_increment_id", { length: 50 }).default('NULL'),
	orderCreatedAt: timestamp("order_created_at", { mode: 'string' }).default('NULL'),
	customerName: varchar("customer_name", { length: 255 }).default('NULL'),
	customerEmail: varchar("customer_email", { length: 255 }).default('NULL'),
	customerGroupId: int("customer_group_id").default('NULL'),
	paymentMethod: varchar("payment_method", { length: 128 }).default('NULL'),
	storeCurrencyCode: varchar("store_currency_code", { length: 3 }).default('NULL'),
	orderCurrencyCode: varchar("order_currency_code", { length: 3 }).default('NULL'),
	baseCurrencyCode: varchar("base_currency_code", { length: 3 }).default('NULL'),
	globalCurrencyCode: varchar("global_currency_code", { length: 3 }).default('NULL'),
	billingName: varchar("billing_name", { length: 255 }).default('NULL'),
	billingAddress: varchar("billing_address", { length: 255 }).default('NULL'),
	shippingAddress: varchar("shipping_address", { length: 255 }).default('NULL'),
	shippingInformation: varchar("shipping_information", { length: 255 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	shippingAndHandling: decimal("shipping_and_handling", { precision: 20, scale: 4 }).default('NULL'),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesInvoiceGridStoreId: index("SALES_INVOICE_GRID_STORE_ID").on(table.storeId),
		salesInvoiceGridGrandTotal: index("SALES_INVOICE_GRID_GRAND_TOTAL").on(table.grandTotal),
		salesInvoiceGridOrderId: index("SALES_INVOICE_GRID_ORDER_ID").on(table.orderId),
		salesInvoiceGridState: index("SALES_INVOICE_GRID_STATE").on(table.state),
		salesInvoiceGridOrderIncrementId: index("SALES_INVOICE_GRID_ORDER_INCREMENT_ID").on(table.orderIncrementId),
		salesInvoiceGridCreatedAt: index("SALES_INVOICE_GRID_CREATED_AT").on(table.createdAt),
		salesInvoiceGridUpdatedAt: index("SALES_INVOICE_GRID_UPDATED_AT").on(table.updatedAt),
		salesInvoiceGridOrderCreatedAt: index("SALES_INVOICE_GRID_ORDER_CREATED_AT").on(table.orderCreatedAt),
		salesInvoiceGridBillingName: index("SALES_INVOICE_GRID_BILLING_NAME").on(table.billingName),
		salesInvoiceGridBaseGrandTotal: index("SALES_INVOICE_GRID_BASE_GRAND_TOTAL").on(table.baseGrandTotal),
		fti95D9C924Dd6A8734Eb8B5D01D60F90De: index("FTI_95D9C924DD6A8734EB8B5D01D60F90DE").on(table.incrementId, table.orderIncrementId, table.billingName, table.billingAddress, table.shippingAddress, table.customerName, table.customerEmail),
		salesInvoiceGridIncrementIdStoreId: unique("SALES_INVOICE_GRID_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesInvoiceItem = mysqlTable("sales_invoice_item", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesInvoice.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	basePrice: decimal("base_price", { precision: 20, scale: 4 }).default('NULL'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotal: decimal("base_row_total", { precision: 20, scale: 4 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	rowTotal: decimal("row_total", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	priceInclTax: decimal("price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	basePriceInclTax: decimal("base_price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('NULL'),
	baseCost: decimal("base_cost", { precision: 20, scale: 4 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotalInclTax: decimal("base_row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	rowTotalInclTax: decimal("row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	productId: int("product_id").default('NULL'),
	orderItemId: int("order_item_id").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	description: text("description").default('NULL'),
	sku: varchar("sku", { length: 255 }).default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	taxRatio: text("tax_ratio").default('NULL'),
	weeeTaxApplied: text("weee_tax_applied").default('NULL'),
	weeeTaxAppliedAmount: decimal("weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxAppliedRowAmount: decimal("weee_tax_applied_row_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxDisposition: decimal("weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxRowDisposition: decimal("weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedAmount: decimal("base_weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedRowAmnt: decimal("base_weee_tax_applied_row_amnt", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxDisposition: decimal("base_weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxRowDisposition: decimal("base_weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesInvoiceItemParentId: index("SALES_INVOICE_ITEM_PARENT_ID").on(table.parentId),
	}
});

export const salesOrder = mysqlTable("sales_order", {
	entityId: int("entity_id").autoincrement().notNull(),
	state: varchar("state", { length: 32 }).default('NULL'),
	status: varchar("status", { length: 32 }).default('NULL'),
	couponCode: varchar("coupon_code", { length: 255 }).default('NULL'),
	protectCode: varchar("protect_code", { length: 255 }).default('NULL'),
	shippingDescription: varchar("shipping_description", { length: 255 }).default('NULL'),
	isVirtual: smallint("is_virtual").default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "set null", onUpdate: "restrict" } ),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountCanceled: decimal("base_discount_canceled", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountInvoiced: decimal("base_discount_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountRefunded: decimal("base_discount_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingAmount: decimal("base_shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingCanceled: decimal("base_shipping_canceled", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingInvoiced: decimal("base_shipping_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingRefunded: decimal("base_shipping_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingTaxAmount: decimal("base_shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingTaxRefunded: decimal("base_shipping_tax_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotal: decimal("base_subtotal", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalCanceled: decimal("base_subtotal_canceled", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalInvoiced: decimal("base_subtotal_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalRefunded: decimal("base_subtotal_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxCanceled: decimal("base_tax_canceled", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxInvoiced: decimal("base_tax_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxRefunded: decimal("base_tax_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseToGlobalRate: decimal("base_to_global_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseToOrderRate: decimal("base_to_order_rate", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalCanceled: decimal("base_total_canceled", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalInvoiced: decimal("base_total_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalInvoicedCost: decimal("base_total_invoiced_cost", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalOfflineRefunded: decimal("base_total_offline_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalOnlineRefunded: decimal("base_total_online_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalPaid: decimal("base_total_paid", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalQtyOrdered: decimal("base_total_qty_ordered", { precision: 12, scale: 4 }).default('NULL'),
	baseTotalRefunded: decimal("base_total_refunded", { precision: 20, scale: 4 }).default('NULL'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	discountCanceled: decimal("discount_canceled", { precision: 20, scale: 4 }).default('NULL'),
	discountInvoiced: decimal("discount_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	discountRefunded: decimal("discount_refunded", { precision: 20, scale: 4 }).default('NULL'),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('NULL'),
	shippingAmount: decimal("shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingCanceled: decimal("shipping_canceled", { precision: 20, scale: 4 }).default('NULL'),
	shippingInvoiced: decimal("shipping_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	shippingRefunded: decimal("shipping_refunded", { precision: 20, scale: 4 }).default('NULL'),
	shippingTaxAmount: decimal("shipping_tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingTaxRefunded: decimal("shipping_tax_refunded", { precision: 20, scale: 4 }).default('NULL'),
	storeToBaseRate: decimal("store_to_base_rate", { precision: 12, scale: 4 }).default('NULL'),
	storeToOrderRate: decimal("store_to_order_rate", { precision: 12, scale: 4 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	subtotalCanceled: decimal("subtotal_canceled", { precision: 20, scale: 4 }).default('NULL'),
	subtotalInvoiced: decimal("subtotal_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	subtotalRefunded: decimal("subtotal_refunded", { precision: 20, scale: 4 }).default('NULL'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('NULL'),
	taxCanceled: decimal("tax_canceled", { precision: 20, scale: 4 }).default('NULL'),
	taxInvoiced: decimal("tax_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	taxRefunded: decimal("tax_refunded", { precision: 20, scale: 4 }).default('NULL'),
	totalCanceled: decimal("total_canceled", { precision: 20, scale: 4 }).default('NULL'),
	totalInvoiced: decimal("total_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	totalOfflineRefunded: decimal("total_offline_refunded", { precision: 20, scale: 4 }).default('NULL'),
	totalOnlineRefunded: decimal("total_online_refunded", { precision: 20, scale: 4 }).default('NULL'),
	totalPaid: decimal("total_paid", { precision: 20, scale: 4 }).default('NULL'),
	totalQtyOrdered: decimal("total_qty_ordered", { precision: 12, scale: 4 }).default('NULL'),
	totalRefunded: decimal("total_refunded", { precision: 20, scale: 4 }).default('NULL'),
	canShipPartially: smallint("can_ship_partially").default('NULL'),
	canShipPartiallyItem: smallint("can_ship_partially_item").default('NULL'),
	customerIsGuest: smallint("customer_is_guest").default('NULL'),
	customerNoteNotify: smallint("customer_note_notify").default('NULL'),
	billingAddressId: int("billing_address_id").default('NULL'),
	customerGroupId: int("customer_group_id").default('NULL'),
	editIncrement: int("edit_increment").default('NULL'),
	emailSent: smallint("email_sent").default('NULL'),
	sendEmail: smallint("send_email").default('NULL'),
	forcedShipmentWithInvoice: smallint("forced_shipment_with_invoice").default('NULL'),
	paymentAuthExpiration: int("payment_auth_expiration").default('NULL'),
	quoteAddressId: int("quote_address_id").default('NULL'),
	quoteId: int("quote_id").default('NULL'),
	shippingAddressId: int("shipping_address_id").default('NULL'),
	adjustmentNegative: decimal("adjustment_negative", { precision: 20, scale: 4 }).default('NULL'),
	adjustmentPositive: decimal("adjustment_positive", { precision: 20, scale: 4 }).default('NULL'),
	baseAdjustmentNegative: decimal("base_adjustment_negative", { precision: 20, scale: 4 }).default('NULL'),
	baseAdjustmentPositive: decimal("base_adjustment_positive", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingDiscountAmount: decimal("base_shipping_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseSubtotalInclTax: decimal("base_subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalDue: decimal("base_total_due", { precision: 20, scale: 4 }).default('NULL'),
	paymentAuthorizationAmount: decimal("payment_authorization_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingDiscountAmount: decimal("shipping_discount_amount", { precision: 20, scale: 4 }).default('NULL'),
	subtotalInclTax: decimal("subtotal_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	totalDue: decimal("total_due", { precision: 20, scale: 4 }).default('NULL'),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('NULL'),
	customerDob: datetime("customer_dob", { mode: 'string'}).default('NULL'),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	appliedRuleIds: varchar("applied_rule_ids", { length: 128 }).default('NULL'),
	baseCurrencyCode: varchar("base_currency_code", { length: 3 }).default('NULL'),
	customerEmail: varchar("customer_email", { length: 128 }).default('NULL'),
	customerFirstname: varchar("customer_firstname", { length: 128 }).default('NULL'),
	customerLastname: varchar("customer_lastname", { length: 128 }).default('NULL'),
	customerMiddlename: varchar("customer_middlename", { length: 128 }).default('NULL'),
	customerPrefix: varchar("customer_prefix", { length: 32 }).default('NULL'),
	customerSuffix: varchar("customer_suffix", { length: 32 }).default('NULL'),
	customerTaxvat: varchar("customer_taxvat", { length: 32 }).default('NULL'),
	discountDescription: varchar("discount_description", { length: 255 }).default('NULL'),
	extCustomerId: varchar("ext_customer_id", { length: 32 }).default('NULL'),
	extOrderId: varchar("ext_order_id", { length: 32 }).default('NULL'),
	globalCurrencyCode: varchar("global_currency_code", { length: 3 }).default('NULL'),
	holdBeforeState: varchar("hold_before_state", { length: 32 }).default('NULL'),
	holdBeforeStatus: varchar("hold_before_status", { length: 32 }).default('NULL'),
	orderCurrencyCode: varchar("order_currency_code", { length: 3 }).default('NULL'),
	originalIncrementId: varchar("original_increment_id", { length: 50 }).default('NULL'),
	relationChildId: varchar("relation_child_id", { length: 32 }).default('NULL'),
	relationChildRealId: varchar("relation_child_real_id", { length: 32 }).default('NULL'),
	relationParentId: varchar("relation_parent_id", { length: 32 }).default('NULL'),
	relationParentRealId: varchar("relation_parent_real_id", { length: 32 }).default('NULL'),
	remoteIp: varchar("remote_ip", { length: 45 }).default('NULL'),
	shippingMethod: varchar("shipping_method", { length: 120 }).default('NULL'),
	storeCurrencyCode: varchar("store_currency_code", { length: 3 }).default('NULL'),
	storeName: varchar("store_name", { length: 255 }).default('NULL'),
	xForwardedFor: varchar("x_forwarded_for", { length: 255 }).default('NULL'),
	customerNote: text("customer_note").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	totalItemCount: smallint("total_item_count").notNull(),
	customerGender: int("customer_gender").default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingDiscountTaxCompensationAmount: decimal("shipping_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingDiscountTaxCompensationAmnt: decimal("base_shipping_discount_tax_compensation_amnt", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationInvoiced: decimal("discount_tax_compensation_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationInvoiced: decimal("base_discount_tax_compensation_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationRefunded: decimal("discount_tax_compensation_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationRefunded: decimal("base_discount_tax_compensation_refunded", { precision: 20, scale: 4 }).default('NULL'),
	shippingInclTax: decimal("shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingInclTax: decimal("base_shipping_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	couponRuleName: varchar("coupon_rule_name", { length: 255 }).default('NULL'),
	giftMessageId: int("gift_message_id").default('NULL'),
	paypalIpnCustomerNotified: int("paypal_ipn_customer_notified").default(0),
	disputeStatus: varchar("dispute_status", { length: 45 }).default('NULL'),
},
(table) => {
	return {
		salesOrderStatus: index("SALES_ORDER_STATUS").on(table.status),
		salesOrderState: index("SALES_ORDER_STATE").on(table.state),
		salesOrderStoreId: index("SALES_ORDER_STORE_ID").on(table.storeId),
		salesOrderCreatedAt: index("SALES_ORDER_CREATED_AT").on(table.createdAt),
		salesOrderCustomerId: index("SALES_ORDER_CUSTOMER_ID").on(table.customerId),
		salesOrderExtOrderId: index("SALES_ORDER_EXT_ORDER_ID").on(table.extOrderId),
		salesOrderQuoteId: index("SALES_ORDER_QUOTE_ID").on(table.quoteId),
		salesOrderUpdatedAt: index("SALES_ORDER_UPDATED_AT").on(table.updatedAt),
		salesOrderSendEmail: index("SALES_ORDER_SEND_EMAIL").on(table.sendEmail),
		salesOrderEmailSent: index("SALES_ORDER_EMAIL_SENT").on(table.emailSent),
		salesOrderStoreIdStateCreatedAt: index("SALES_ORDER_STORE_ID_STATE_CREATED_AT").on(table.storeId, table.state, table.createdAt),
		salesOrderIncrementIdStoreId: unique("SALES_ORDER_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesOrderAddress = mysqlTable("sales_order_address", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").default('NULL').references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerAddressId: int("customer_address_id").default('NULL'),
	quoteAddressId: int("quote_address_id").default('NULL'),
	regionId: int("region_id").default('NULL'),
	customerId: int("customer_id").default('NULL'),
	fax: varchar("fax", { length: 255 }).default('NULL'),
	region: varchar("region", { length: 255 }).default('NULL'),
	postcode: varchar("postcode", { length: 255 }).default('NULL'),
	lastname: varchar("lastname", { length: 255 }).default('NULL'),
	street: varchar("street", { length: 255 }).default('NULL'),
	city: varchar("city", { length: 255 }).default('NULL'),
	email: varchar("email", { length: 255 }).default('NULL'),
	telephone: varchar("telephone", { length: 255 }).default('NULL'),
	countryId: varchar("country_id", { length: 2 }).default('NULL'),
	firstname: varchar("firstname", { length: 255 }).default('NULL'),
	addressType: varchar("address_type", { length: 255 }).default('NULL'),
	prefix: varchar("prefix", { length: 255 }).default('NULL'),
	middlename: varchar("middlename", { length: 255 }).default('NULL'),
	suffix: varchar("suffix", { length: 255 }).default('NULL'),
	company: varchar("company", { length: 255 }).default('NULL'),
	vatId: text("vat_id").default('NULL'),
	vatIsValid: smallint("vat_is_valid").default('NULL'),
	vatRequestId: text("vat_request_id").default('NULL'),
	vatRequestDate: text("vat_request_date").default('NULL'),
	vatRequestSuccess: smallint("vat_request_success").default('NULL'),
},
(table) => {
	return {
		salesOrderAddressParentId: index("SALES_ORDER_ADDRESS_PARENT_ID").on(table.parentId),
	}
});

export const salesOrderAggregatedCreated = mysqlTable("sales_order_aggregated_created", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).notNull(),
	ordersCount: int("orders_count").default(0).notNull(),
	totalQtyOrdered: decimal("total_qty_ordered", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalQtyInvoiced: decimal("total_qty_invoiced", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalIncomeAmount: decimal("total_income_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalRevenueAmount: decimal("total_revenue_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalProfitAmount: decimal("total_profit_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalInvoicedAmount: decimal("total_invoiced_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalCanceledAmount: decimal("total_canceled_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalPaidAmount: decimal("total_paid_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalRefundedAmount: decimal("total_refunded_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalTaxAmount: decimal("total_tax_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalTaxAmountActual: decimal("total_tax_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalShippingAmount: decimal("total_shipping_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalShippingAmountActual: decimal("total_shipping_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalDiscountAmount: decimal("total_discount_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalDiscountAmountActual: decimal("total_discount_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
},
(table) => {
	return {
		salesOrderAggregatedCreatedStoreId: index("SALES_ORDER_AGGREGATED_CREATED_STORE_ID").on(table.storeId),
		salesOrderAggregatedCreatedPeriodStoreIdOrderStatus: unique("SALES_ORDER_AGGREGATED_CREATED_PERIOD_STORE_ID_ORDER_STATUS").on(table.period, table.storeId, table.orderStatus),
	}
});

export const salesOrderAggregatedUpdated = mysqlTable("sales_order_aggregated_updated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).notNull(),
	ordersCount: int("orders_count").default(0).notNull(),
	totalQtyOrdered: decimal("total_qty_ordered", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalQtyInvoiced: decimal("total_qty_invoiced", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	totalIncomeAmount: decimal("total_income_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalRevenueAmount: decimal("total_revenue_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalProfitAmount: decimal("total_profit_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalInvoicedAmount: decimal("total_invoiced_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalCanceledAmount: decimal("total_canceled_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalPaidAmount: decimal("total_paid_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalRefundedAmount: decimal("total_refunded_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalTaxAmount: decimal("total_tax_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalTaxAmountActual: decimal("total_tax_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalShippingAmount: decimal("total_shipping_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalShippingAmountActual: decimal("total_shipping_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalDiscountAmount: decimal("total_discount_amount", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	totalDiscountAmountActual: decimal("total_discount_amount_actual", { precision: 20, scale: 4 }).default('0.0000').notNull(),
},
(table) => {
	return {
		salesOrderAggregatedUpdatedStoreId: index("SALES_ORDER_AGGREGATED_UPDATED_STORE_ID").on(table.storeId),
		salesOrderAggregatedUpdatedPeriodStoreIdOrderStatus: unique("SALES_ORDER_AGGREGATED_UPDATED_PERIOD_STORE_ID_ORDER_STATUS").on(table.period, table.storeId, table.orderStatus),
	}
});

export const salesOrderDataExporterCl = mysqlTable("sales_order_data_exporter_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const salesOrderGrid = mysqlTable("sales_order_grid", {
	entityId: int("entity_id").notNull(),
	status: varchar("status", { length: 32 }).default('NULL'),
	storeId: smallint("store_id").default('NULL'),
	storeName: varchar("store_name", { length: 255 }).default('NULL'),
	customerId: int("customer_id").default('NULL'),
	baseGrandTotal: decimal("base_grand_total", { precision: 20, scale: 4 }).default('NULL'),
	baseTotalPaid: decimal("base_total_paid", { precision: 20, scale: 4 }).default('NULL'),
	grandTotal: decimal("grand_total", { precision: 20, scale: 4 }).default('NULL'),
	totalPaid: decimal("total_paid", { precision: 20, scale: 4 }).default('NULL'),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	baseCurrencyCode: varchar("base_currency_code", { length: 3 }).default('NULL'),
	orderCurrencyCode: varchar("order_currency_code", { length: 255 }).default('NULL'),
	shippingName: varchar("shipping_name", { length: 255 }).default('NULL'),
	billingName: varchar("billing_name", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	billingAddress: varchar("billing_address", { length: 255 }).default('NULL'),
	shippingAddress: varchar("shipping_address", { length: 255 }).default('NULL'),
	shippingInformation: varchar("shipping_information", { length: 255 }).default('NULL'),
	customerEmail: varchar("customer_email", { length: 255 }).default('NULL'),
	customerGroup: varchar("customer_group", { length: 255 }).default('NULL'),
	subtotal: decimal("subtotal", { precision: 20, scale: 4 }).default('NULL'),
	shippingAndHandling: decimal("shipping_and_handling", { precision: 20, scale: 4 }).default('NULL'),
	customerName: varchar("customer_name", { length: 255 }).default('NULL'),
	paymentMethod: varchar("payment_method", { length: 255 }).default('NULL'),
	totalRefunded: decimal("total_refunded", { precision: 20, scale: 4 }).default('NULL'),
	pickupLocationCode: varchar("pickup_location_code", { length: 255 }).default('NULL'),
	disputeStatus: varchar("dispute_status", { length: 45 }).default('NULL'),
},
(table) => {
	return {
		salesOrderGridStatus: index("SALES_ORDER_GRID_STATUS").on(table.status),
		salesOrderGridStoreId: index("SALES_ORDER_GRID_STORE_ID").on(table.storeId),
		salesOrderGridBaseGrandTotal: index("SALES_ORDER_GRID_BASE_GRAND_TOTAL").on(table.baseGrandTotal),
		salesOrderGridBaseTotalPaid: index("SALES_ORDER_GRID_BASE_TOTAL_PAID").on(table.baseTotalPaid),
		salesOrderGridGrandTotal: index("SALES_ORDER_GRID_GRAND_TOTAL").on(table.grandTotal),
		salesOrderGridTotalPaid: index("SALES_ORDER_GRID_TOTAL_PAID").on(table.totalPaid),
		salesOrderGridShippingName: index("SALES_ORDER_GRID_SHIPPING_NAME").on(table.shippingName),
		salesOrderGridBillingName: index("SALES_ORDER_GRID_BILLING_NAME").on(table.billingName),
		salesOrderGridCreatedAt: index("SALES_ORDER_GRID_CREATED_AT").on(table.createdAt),
		salesOrderGridCustomerId: index("SALES_ORDER_GRID_CUSTOMER_ID").on(table.customerId),
		salesOrderGridUpdatedAt: index("SALES_ORDER_GRID_UPDATED_AT").on(table.updatedAt),
		salesOrderGridPickupLocationCode: index("SALES_ORDER_GRID_PICKUP_LOCATION_CODE").on(table.pickupLocationCode),
		fti65B9E9925Ec58F0C7C2E2F6379C233E7: index("FTI_65B9E9925EC58F0C7C2E2F6379C233E7").on(table.incrementId, table.billingName, table.shippingName, table.shippingAddress, table.billingAddress, table.customerName, table.customerEmail),
		salesOrderGridIncrementIdStoreId: unique("SALES_ORDER_GRID_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesOrderItem = mysqlTable("sales_order_item", {
	itemId: int("item_id").autoincrement().notNull(),
	orderId: int("order_id").default(0).notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	parentItemId: int("parent_item_id").default('NULL'),
	quoteItemId: int("quote_item_id").default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	productId: int("product_id").default('NULL'),
	productType: varchar("product_type", { length: 255 }).default('NULL'),
	productOptions: longtext("product_options").default('NULL'),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('0.0000'),
	isVirtual: smallint("is_virtual").default('NULL'),
	sku: varchar("sku", { length: 255 }).default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
	description: text("description").default('NULL'),
	appliedRuleIds: text("applied_rule_ids").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	isQtyDecimal: smallint("is_qty_decimal").default('NULL'),
	noDiscount: smallint("no_discount").notNull(),
	qtyBackordered: decimal("qty_backordered", { precision: 12, scale: 4 }).default('0.0000'),
	qtyCanceled: decimal("qty_canceled", { precision: 12, scale: 4 }).default('0.0000'),
	qtyInvoiced: decimal("qty_invoiced", { precision: 12, scale: 4 }).default('0.0000'),
	qtyOrdered: decimal("qty_ordered", { precision: 12, scale: 4 }).default('0.0000'),
	qtyRefunded: decimal("qty_refunded", { precision: 12, scale: 4 }).default('0.0000'),
	qtyShipped: decimal("qty_shipped", { precision: 12, scale: 4 }).default('0.0000'),
	baseCost: decimal("base_cost", { precision: 12, scale: 4 }).default('0.0000'),
	price: decimal("price", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	basePrice: decimal("base_price", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	originalPrice: decimal("original_price", { precision: 20, scale: 4 }).default('NULL'),
	baseOriginalPrice: decimal("base_original_price", { precision: 20, scale: 4 }).default('NULL'),
	taxPercent: decimal("tax_percent", { precision: 12, scale: 4 }).default('0.0000'),
	taxAmount: decimal("tax_amount", { precision: 20, scale: 4 }).default('0.0000'),
	baseTaxAmount: decimal("base_tax_amount", { precision: 20, scale: 4 }).default('0.0000'),
	taxInvoiced: decimal("tax_invoiced", { precision: 20, scale: 4 }).default('0.0000'),
	baseTaxInvoiced: decimal("base_tax_invoiced", { precision: 20, scale: 4 }).default('0.0000'),
	discountPercent: decimal("discount_percent", { precision: 12, scale: 4 }).default('0.0000'),
	discountAmount: decimal("discount_amount", { precision: 20, scale: 4 }).default('0.0000'),
	baseDiscountAmount: decimal("base_discount_amount", { precision: 20, scale: 4 }).default('0.0000'),
	discountInvoiced: decimal("discount_invoiced", { precision: 20, scale: 4 }).default('0.0000'),
	baseDiscountInvoiced: decimal("base_discount_invoiced", { precision: 20, scale: 4 }).default('0.0000'),
	amountRefunded: decimal("amount_refunded", { precision: 20, scale: 4 }).default('0.0000'),
	baseAmountRefunded: decimal("base_amount_refunded", { precision: 20, scale: 4 }).default('0.0000'),
	rowTotal: decimal("row_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseRowTotal: decimal("base_row_total", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	rowInvoiced: decimal("row_invoiced", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	baseRowInvoiced: decimal("base_row_invoiced", { precision: 20, scale: 4 }).default('0.0000').notNull(),
	rowWeight: decimal("row_weight", { precision: 12, scale: 4 }).default('0.0000'),
	baseTaxBeforeDiscount: decimal("base_tax_before_discount", { precision: 20, scale: 4 }).default('NULL'),
	taxBeforeDiscount: decimal("tax_before_discount", { precision: 20, scale: 4 }).default('NULL'),
	extOrderItemId: varchar("ext_order_item_id", { length: 255 }).default('NULL'),
	lockedDoInvoice: smallint("locked_do_invoice").default('NULL'),
	lockedDoShip: smallint("locked_do_ship").default('NULL'),
	priceInclTax: decimal("price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	basePriceInclTax: decimal("base_price_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	rowTotalInclTax: decimal("row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	baseRowTotalInclTax: decimal("base_row_total_incl_tax", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationAmount: decimal("discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationAmount: decimal("base_discount_tax_compensation_amount", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationInvoiced: decimal("discount_tax_compensation_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationInvoiced: decimal("base_discount_tax_compensation_invoiced", { precision: 20, scale: 4 }).default('NULL'),
	discountTaxCompensationRefunded: decimal("discount_tax_compensation_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountTaxCompensationRefunded: decimal("base_discount_tax_compensation_refunded", { precision: 20, scale: 4 }).default('NULL'),
	taxCanceled: decimal("tax_canceled", { precision: 12, scale: 4 }).default('NULL'),
	discountTaxCompensationCanceled: decimal("discount_tax_compensation_canceled", { precision: 20, scale: 4 }).default('NULL'),
	taxRefunded: decimal("tax_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseTaxRefunded: decimal("base_tax_refunded", { precision: 20, scale: 4 }).default('NULL'),
	discountRefunded: decimal("discount_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseDiscountRefunded: decimal("base_discount_refunded", { precision: 20, scale: 4 }).default('NULL'),
	giftMessageId: int("gift_message_id").default('NULL'),
	giftMessageAvailable: int("gift_message_available").default('NULL'),
	freeShipping: smallint("free_shipping").notNull(),
	weeeTaxApplied: text("weee_tax_applied").default('NULL'),
	weeeTaxAppliedAmount: decimal("weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxAppliedRowAmount: decimal("weee_tax_applied_row_amount", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxDisposition: decimal("weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	weeeTaxRowDisposition: decimal("weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedAmount: decimal("base_weee_tax_applied_amount", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxAppliedRowAmnt: decimal("base_weee_tax_applied_row_amnt", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxDisposition: decimal("base_weee_tax_disposition", { precision: 12, scale: 4 }).default('NULL'),
	baseWeeeTaxRowDisposition: decimal("base_weee_tax_row_disposition", { precision: 12, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesOrderItemOrderId: index("SALES_ORDER_ITEM_ORDER_ID").on(table.orderId),
		salesOrderItemStoreId: index("SALES_ORDER_ITEM_STORE_ID").on(table.storeId),
	}
});

export const salesOrderPayment = mysqlTable("sales_order_payment", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	baseShippingCaptured: decimal("base_shipping_captured", { precision: 20, scale: 4 }).default('NULL'),
	shippingCaptured: decimal("shipping_captured", { precision: 20, scale: 4 }).default('NULL'),
	amountRefunded: decimal("amount_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountPaid: decimal("base_amount_paid", { precision: 20, scale: 4 }).default('NULL'),
	amountCanceled: decimal("amount_canceled", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountAuthorized: decimal("base_amount_authorized", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountPaidOnline: decimal("base_amount_paid_online", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountRefundedOnline: decimal("base_amount_refunded_online", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingAmount: decimal("base_shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	shippingAmount: decimal("shipping_amount", { precision: 20, scale: 4 }).default('NULL'),
	amountPaid: decimal("amount_paid", { precision: 20, scale: 4 }).default('NULL'),
	amountAuthorized: decimal("amount_authorized", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountOrdered: decimal("base_amount_ordered", { precision: 20, scale: 4 }).default('NULL'),
	baseShippingRefunded: decimal("base_shipping_refunded", { precision: 20, scale: 4 }).default('NULL'),
	shippingRefunded: decimal("shipping_refunded", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountRefunded: decimal("base_amount_refunded", { precision: 20, scale: 4 }).default('NULL'),
	amountOrdered: decimal("amount_ordered", { precision: 20, scale: 4 }).default('NULL'),
	baseAmountCanceled: decimal("base_amount_canceled", { precision: 20, scale: 4 }).default('NULL'),
	quotePaymentId: int("quote_payment_id").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	ccExpMonth: varchar("cc_exp_month", { length: 12 }).default('NULL'),
	ccSsStartYear: varchar("cc_ss_start_year", { length: 12 }).default('NULL'),
	echeckBankName: varchar("echeck_bank_name", { length: 128 }).default('NULL'),
	method: varchar("method", { length: 128 }).default('NULL'),
	ccDebugRequestBody: varchar("cc_debug_request_body", { length: 32 }).default('NULL'),
	ccSecureVerify: varchar("cc_secure_verify", { length: 32 }).default('NULL'),
	protectionEligibility: varchar("protection_eligibility", { length: 32 }).default('NULL'),
	ccApproval: varchar("cc_approval", { length: 32 }).default('NULL'),
	ccLast4: varchar("cc_last_4", { length: 100 }).default('NULL'),
	ccStatusDescription: varchar("cc_status_description", { length: 32 }).default('NULL'),
	echeckType: varchar("echeck_type", { length: 32 }).default('NULL'),
	ccDebugResponseSerialized: varchar("cc_debug_response_serialized", { length: 32 }).default('NULL'),
	ccSsStartMonth: varchar("cc_ss_start_month", { length: 128 }).default('NULL'),
	echeckAccountType: varchar("echeck_account_type", { length: 255 }).default('NULL'),
	lastTransId: varchar("last_trans_id", { length: 255 }).default('NULL'),
	ccCidStatus: varchar("cc_cid_status", { length: 32 }).default('NULL'),
	ccOwner: varchar("cc_owner", { length: 128 }).default('NULL'),
	ccType: varchar("cc_type", { length: 32 }).default('NULL'),
	poNumber: varchar("po_number", { length: 32 }).default('NULL'),
	ccExpYear: varchar("cc_exp_year", { length: 4 }).default('NULL'),
	ccStatus: varchar("cc_status", { length: 4 }).default('NULL'),
	echeckRoutingNumber: varchar("echeck_routing_number", { length: 32 }).default('NULL'),
	accountStatus: varchar("account_status", { length: 32 }).default('NULL'),
	anetTransMethod: varchar("anet_trans_method", { length: 32 }).default('NULL'),
	ccDebugResponseBody: varchar("cc_debug_response_body", { length: 32 }).default('NULL'),
	ccSsIssue: varchar("cc_ss_issue", { length: 32 }).default('NULL'),
	echeckAccountName: varchar("echeck_account_name", { length: 32 }).default('NULL'),
	ccAvsStatus: varchar("cc_avs_status", { length: 32 }).default('NULL'),
	ccNumberEnc: varchar("cc_number_enc", { length: 128 }).default('NULL'),
	ccTransId: varchar("cc_trans_id", { length: 32 }).default('NULL'),
	addressStatus: varchar("address_status", { length: 32 }).default('NULL'),
	additionalInformation: text("additional_information").default('NULL'),
},
(table) => {
	return {
		salesOrderPaymentParentId: index("SALES_ORDER_PAYMENT_PARENT_ID").on(table.parentId),
	}
});

export const salesOrderStatus = mysqlTable("sales_order_status", {
	status: varchar("status", { length: 32 }).notNull(),
	label: varchar("label", { length: 128 }).notNull(),
});

export const salesOrderStatusDataExporterCl = mysqlTable("sales_order_status_data_exporter_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: varchar("entity_id", { length: 32 }).default('''').notNull(),
});

export const salesOrderStatusHistory = mysqlTable("sales_order_status_history", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isCustomerNotified: int("is_customer_notified").default('NULL'),
	isVisibleOnFront: smallint("is_visible_on_front").notNull(),
	comment: text("comment").default('NULL'),
	status: varchar("status", { length: 32 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	entityName: varchar("entity_name", { length: 32 }).default('NULL'),
},
(table) => {
	return {
		salesOrderStatusHistoryParentId: index("SALES_ORDER_STATUS_HISTORY_PARENT_ID").on(table.parentId),
		salesOrderStatusHistoryCreatedAt: index("SALES_ORDER_STATUS_HISTORY_CREATED_AT").on(table.createdAt),
	}
});

export const salesOrderStatusLabel = mysqlTable("sales_order_status_label", {
	status: varchar("status", { length: 32 }).notNull().references(() => salesOrderStatus.status, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	label: varchar("label", { length: 128 }).notNull(),
},
(table) => {
	return {
		salesOrderStatusLabelStoreId: index("SALES_ORDER_STATUS_LABEL_STORE_ID").on(table.storeId),
	}
});

export const salesOrderStatusState = mysqlTable("sales_order_status_state", {
	status: varchar("status", { length: 32 }).notNull().references(() => salesOrderStatus.status, { onDelete: "cascade", onUpdate: "restrict" } ),
	state: varchar("state", { length: 32 }).notNull(),
	isDefault: smallint("is_default").notNull(),
	visibleOnFront: smallint("visible_on_front").notNull(),
});

export const salesOrderTax = mysqlTable("sales_order_tax", {
	taxId: int("tax_id").autoincrement().notNull(),
	orderId: int("order_id").notNull(),
	code: varchar("code", { length: 255 }).default('NULL'),
	title: varchar("title", { length: 255 }).default('NULL'),
	percent: decimal("percent", { precision: 12, scale: 4 }).default('NULL'),
	amount: decimal("amount", { precision: 20, scale: 4 }).default('NULL'),
	priority: int("priority").notNull(),
	position: int("position").notNull(),
	baseAmount: decimal("base_amount", { precision: 20, scale: 4 }).default('NULL'),
	process: smallint("process").notNull(),
	baseRealAmount: decimal("base_real_amount", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesOrderTaxOrderIdPriorityPosition: index("SALES_ORDER_TAX_ORDER_ID_PRIORITY_POSITION").on(table.orderId, table.priority, table.position),
	}
});

export const salesOrderTaxItem = mysqlTable("sales_order_tax_item", {
	taxItemId: int("tax_item_id").autoincrement().notNull(),
	taxId: int("tax_id").notNull().references(() => salesOrderTax.taxId, { onDelete: "cascade", onUpdate: "restrict" } ),
	itemId: int("item_id").default('NULL').references(() => salesOrderItem.itemId, { onDelete: "cascade", onUpdate: "restrict" } ),
	taxPercent: decimal("tax_percent", { precision: 12, scale: 4 }).notNull(),
	amount: decimal("amount", { precision: 20, scale: 4 }).notNull(),
	baseAmount: decimal("base_amount", { precision: 20, scale: 4 }).notNull(),
	realAmount: decimal("real_amount", { precision: 20, scale: 4 }).notNull(),
	realBaseAmount: decimal("real_base_amount", { precision: 20, scale: 4 }).notNull(),
	associatedItemId: int("associated_item_id").default('NULL').references(() => salesOrderItem.itemId, { onDelete: "cascade", onUpdate: "restrict" } ),
	taxableItemType: varchar("taxable_item_type", { length: 32 }).notNull(),
},
(table) => {
	return {
		salesOrderTaxItemItemId: index("SALES_ORDER_TAX_ITEM_ITEM_ID").on(table.itemId),
		salesOrderTaxItemTaxIdItemId: unique("SALES_ORDER_TAX_ITEM_TAX_ID_ITEM_ID").on(table.taxId, table.itemId),
	}
});

export const salesPaymentTransaction = mysqlTable("sales_payment_transaction", {
	transactionId: int("transaction_id").autoincrement().notNull(),
	parentId: int("parent_id").default('NULL'),
	orderId: int("order_id").default(0).notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	paymentId: int("payment_id").default(0).notNull().references(() => salesOrderPayment.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	txnId: varchar("txn_id", { length: 100 }).default('NULL'),
	parentTxnId: varchar("parent_txn_id", { length: 100 }).default('NULL'),
	txnType: varchar("txn_type", { length: 15 }).default('NULL'),
	isClosed: smallint("is_closed").default(1).notNull(),
	// Warning: Can't parse blob from database
	// blobType: blob("additional_information"),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesPaymentTransactionParentId: index("SALES_PAYMENT_TRANSACTION_PARENT_ID").on(table.parentId),
		salesPaymentTransactionPaymentId: index("SALES_PAYMENT_TRANSACTION_PAYMENT_ID").on(table.paymentId),
		fkB99Ff1A06402D725Ebdb0F3A7Ecd47A2: foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.transactionId],
			name: "FK_B99FF1A06402D725EBDB0F3A7ECD47A2"
		}).onUpdate("restrict").onDelete("cascade"),
		salesPaymentTransactionOrderIdPaymentIdTxnId: unique("SALES_PAYMENT_TRANSACTION_ORDER_ID_PAYMENT_ID_TXN_ID").on(table.orderId, table.paymentId, table.txnId),
	}
});

export const salesRefundedAggregated = mysqlTable("sales_refunded_aggregated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).notNull(),
	ordersCount: int("orders_count").default(0).notNull(),
	refunded: decimal("refunded", { precision: 20, scale: 4 }).default('NULL'),
	onlineRefunded: decimal("online_refunded", { precision: 20, scale: 4 }).default('NULL'),
	offlineRefunded: decimal("offline_refunded", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesRefundedAggregatedStoreId: index("SALES_REFUNDED_AGGREGATED_STORE_ID").on(table.storeId),
		salesRefundedAggregatedPeriodStoreIdOrderStatus: unique("SALES_REFUNDED_AGGREGATED_PERIOD_STORE_ID_ORDER_STATUS").on(table.period, table.storeId, table.orderStatus),
	}
});

export const salesRefundedAggregatedOrder = mysqlTable("sales_refunded_aggregated_order", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	ordersCount: int("orders_count").default(0).notNull(),
	refunded: decimal("refunded", { precision: 20, scale: 4 }).default('NULL'),
	onlineRefunded: decimal("online_refunded", { precision: 20, scale: 4 }).default('NULL'),
	offlineRefunded: decimal("offline_refunded", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesRefundedAggregatedOrderStoreId: index("SALES_REFUNDED_AGGREGATED_ORDER_STORE_ID").on(table.storeId),
		salesRefundedAggregatedOrderPeriodStoreIdOrderStatus: unique("SALES_REFUNDED_AGGREGATED_ORDER_PERIOD_STORE_ID_ORDER_STATUS").on(table.period, table.storeId, table.orderStatus),
	}
});

export const salesSequenceMeta = mysqlTable("sales_sequence_meta", {
	metaId: int("meta_id").autoincrement().notNull(),
	entityType: varchar("entity_type", { length: 32 }).notNull(),
	storeId: smallint("store_id").notNull(),
	sequenceTable: varchar("sequence_table", { length: 64 }).notNull(),
},
(table) => {
	return {
		salesSequenceMetaEntityTypeStoreId: unique("SALES_SEQUENCE_META_ENTITY_TYPE_STORE_ID").on(table.entityType, table.storeId),
	}
});

export const salesSequenceProfile = mysqlTable("sales_sequence_profile", {
	profileId: int("profile_id").autoincrement().notNull(),
	metaId: int("meta_id").notNull().references(() => salesSequenceMeta.metaId, { onDelete: "cascade", onUpdate: "restrict" } ),
	prefix: varchar("prefix", { length: 32 }).default('NULL'),
	suffix: varchar("suffix", { length: 32 }).default('NULL'),
	startValue: int("start_value").default(1).notNull(),
	step: int("step").default(1).notNull(),
	maxValue: int("max_value").notNull(),
	warningValue: int("warning_value").notNull(),
	isActive: tinyint("is_active").default(0).notNull(),
},
(table) => {
	return {
		salesSequenceProfileMetaIdPrefixSuffix: unique("SALES_SEQUENCE_PROFILE_META_ID_PREFIX_SUFFIX").on(table.metaId, table.prefix, table.suffix),
	}
});

export const salesShipment = mysqlTable("sales_shipment", {
	entityId: int("entity_id").autoincrement().notNull(),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	totalWeight: decimal("total_weight", { precision: 12, scale: 4 }).default('NULL'),
	totalQty: decimal("total_qty", { precision: 12, scale: 4 }).default('NULL'),
	emailSent: smallint("email_sent").default('NULL'),
	sendEmail: smallint("send_email").default('NULL'),
	orderId: int("order_id").notNull().references(() => salesOrder.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerId: int("customer_id").default('NULL'),
	shippingAddressId: int("shipping_address_id").default('NULL'),
	billingAddressId: int("billing_address_id").default('NULL'),
	shipmentStatus: int("shipment_status").default('NULL'),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	packages: text("packages").default('NULL'),
	// Warning: Can't parse mediumblob from database
	// mediumblobType: mediumblob("shipping_label"),
	customerNote: text("customer_note").default('NULL'),
	customerNoteNotify: smallint("customer_note_notify").default('NULL'),
},
(table) => {
	return {
		salesShipmentStoreId: index("SALES_SHIPMENT_STORE_ID").on(table.storeId),
		salesShipmentTotalQty: index("SALES_SHIPMENT_TOTAL_QTY").on(table.totalQty),
		salesShipmentOrderId: index("SALES_SHIPMENT_ORDER_ID").on(table.orderId),
		salesShipmentCreatedAt: index("SALES_SHIPMENT_CREATED_AT").on(table.createdAt),
		salesShipmentUpdatedAt: index("SALES_SHIPMENT_UPDATED_AT").on(table.updatedAt),
		salesShipmentSendEmail: index("SALES_SHIPMENT_SEND_EMAIL").on(table.sendEmail),
		salesShipmentEmailSent: index("SALES_SHIPMENT_EMAIL_SENT").on(table.emailSent),
		salesShipmentIncrementIdStoreId: unique("SALES_SHIPMENT_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesShipmentComment = mysqlTable("sales_shipment_comment", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesShipment.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	isCustomerNotified: int("is_customer_notified").default('NULL'),
	isVisibleOnFront: smallint("is_visible_on_front").notNull(),
	comment: text("comment").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesShipmentCommentCreatedAt: index("SALES_SHIPMENT_COMMENT_CREATED_AT").on(table.createdAt),
		salesShipmentCommentParentId: index("SALES_SHIPMENT_COMMENT_PARENT_ID").on(table.parentId),
	}
});

export const salesShipmentGrid = mysqlTable("sales_shipment_grid", {
	entityId: int("entity_id").notNull(),
	incrementId: varchar("increment_id", { length: 50 }).default('NULL'),
	storeId: smallint("store_id").default('NULL'),
	orderIncrementId: varchar("order_increment_id", { length: 32 }).notNull(),
	orderId: int("order_id").notNull(),
	orderCreatedAt: timestamp("order_created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	customerName: varchar("customer_name", { length: 128 }).notNull(),
	totalQty: decimal("total_qty", { precision: 12, scale: 4 }).default('NULL'),
	shipmentStatus: int("shipment_status").default('NULL'),
	orderStatus: varchar("order_status", { length: 32 }).default('NULL'),
	billingAddress: varchar("billing_address", { length: 255 }).default('NULL'),
	shippingAddress: varchar("shipping_address", { length: 255 }).default('NULL'),
	billingName: varchar("billing_name", { length: 128 }).default('NULL'),
	shippingName: varchar("shipping_name", { length: 128 }).default('NULL'),
	customerEmail: varchar("customer_email", { length: 128 }).default('NULL'),
	customerGroupId: int("customer_group_id").default('NULL'),
	paymentMethod: varchar("payment_method", { length: 32 }).default('NULL'),
	shippingInformation: varchar("shipping_information", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		salesShipmentGridStoreId: index("SALES_SHIPMENT_GRID_STORE_ID").on(table.storeId),
		salesShipmentGridTotalQty: index("SALES_SHIPMENT_GRID_TOTAL_QTY").on(table.totalQty),
		salesShipmentGridOrderIncrementId: index("SALES_SHIPMENT_GRID_ORDER_INCREMENT_ID").on(table.orderIncrementId),
		salesShipmentGridShipmentStatus: index("SALES_SHIPMENT_GRID_SHIPMENT_STATUS").on(table.shipmentStatus),
		salesShipmentGridOrderStatus: index("SALES_SHIPMENT_GRID_ORDER_STATUS").on(table.orderStatus),
		salesShipmentGridCreatedAt: index("SALES_SHIPMENT_GRID_CREATED_AT").on(table.createdAt),
		salesShipmentGridUpdatedAt: index("SALES_SHIPMENT_GRID_UPDATED_AT").on(table.updatedAt),
		salesShipmentGridOrderCreatedAt: index("SALES_SHIPMENT_GRID_ORDER_CREATED_AT").on(table.orderCreatedAt),
		salesShipmentGridShippingName: index("SALES_SHIPMENT_GRID_SHIPPING_NAME").on(table.shippingName),
		salesShipmentGridBillingName: index("SALES_SHIPMENT_GRID_BILLING_NAME").on(table.billingName),
		salesShipmentGridOrderId: index("SALES_SHIPMENT_GRID_ORDER_ID").on(table.orderId),
		fti086B40C8955F167B8Ea76653437879B4: index("FTI_086B40C8955F167B8EA76653437879B4").on(table.incrementId, table.orderIncrementId, table.shippingName, table.customerName, table.customerEmail, table.billingAddress, table.shippingAddress),
		salesShipmentGridIncrementIdStoreId: unique("SALES_SHIPMENT_GRID_INCREMENT_ID_STORE_ID").on(table.incrementId, table.storeId),
	}
});

export const salesShipmentItem = mysqlTable("sales_shipment_item", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesShipment.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	rowTotal: decimal("row_total", { precision: 20, scale: 4 }).default('NULL'),
	price: decimal("price", { precision: 20, scale: 4 }).default('NULL'),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('NULL'),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('NULL'),
	productId: int("product_id").default('NULL'),
	orderItemId: int("order_item_id").default('NULL'),
	additionalData: text("additional_data").default('NULL'),
	description: text("description").default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
	sku: varchar("sku", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		salesShipmentItemParentId: index("SALES_SHIPMENT_ITEM_PARENT_ID").on(table.parentId),
	}
});

export const salesShipmentTrack = mysqlTable("sales_shipment_track", {
	entityId: int("entity_id").autoincrement().notNull(),
	parentId: int("parent_id").notNull().references(() => salesShipment.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	weight: decimal("weight", { precision: 12, scale: 4 }).default('NULL'),
	qty: decimal("qty", { precision: 12, scale: 4 }).default('NULL'),
	orderId: int("order_id").notNull(),
	trackNumber: text("track_number").default('NULL'),
	description: text("description").default('NULL'),
	title: varchar("title", { length: 255 }).default('NULL'),
	carrierCode: varchar("carrier_code", { length: 32 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		salesShipmentTrackParentId: index("SALES_SHIPMENT_TRACK_PARENT_ID").on(table.parentId),
		salesShipmentTrackOrderId: index("SALES_SHIPMENT_TRACK_ORDER_ID").on(table.orderId),
		salesShipmentTrackCreatedAt: index("SALES_SHIPMENT_TRACK_CREATED_AT").on(table.createdAt),
	}
});

export const salesShippingAggregated = mysqlTable("sales_shipping_aggregated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	shippingDescription: varchar("shipping_description", { length: 255 }).default('NULL'),
	ordersCount: int("orders_count").default(0).notNull(),
	totalShipping: decimal("total_shipping", { precision: 20, scale: 4 }).default('NULL'),
	totalShippingActual: decimal("total_shipping_actual", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesShippingAggregatedStoreId: index("SALES_SHIPPING_AGGREGATED_STORE_ID").on(table.storeId),
		salesShppAggredPeriodStoreIdOrderStsShppDescription: unique("SALES_SHPP_AGGRED_PERIOD_STORE_ID_ORDER_STS_SHPP_DESCRIPTION").on(table.period, table.storeId, table.orderStatus, table.shippingDescription),
	}
});

export const salesShippingAggregatedOrder = mysqlTable("sales_shipping_aggregated_order", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	orderStatus: varchar("order_status", { length: 50 }).default('NULL'),
	shippingDescription: varchar("shipping_description", { length: 255 }).default('NULL'),
	ordersCount: int("orders_count").default(0).notNull(),
	totalShipping: decimal("total_shipping", { precision: 20, scale: 4 }).default('NULL'),
	totalShippingActual: decimal("total_shipping_actual", { precision: 20, scale: 4 }).default('NULL'),
},
(table) => {
	return {
		salesShippingAggregatedOrderStoreId: index("SALES_SHIPPING_AGGREGATED_ORDER_STORE_ID").on(table.storeId),
		unqC05Fae47282Eea68654D0924E946761F: unique("UNQ_C05FAE47282EEA68654D0924E946761F").on(table.period, table.storeId, table.orderStatus, table.shippingDescription),
	}
});

export const searchQuery = mysqlTable("search_query", {
	queryId: int("query_id").autoincrement().notNull(),
	queryText: varchar("query_text", { length: 255 }).default('NULL'),
	numResults: int("num_results").default(0).notNull(),
	popularity: int("popularity").default(0).notNull(),
	redirect: varchar("redirect", { length: 255 }).default('NULL'),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	displayInTerms: smallint("display_in_terms").default(1).notNull(),
	isActive: smallint("is_active").default(1),
	isProcessed: smallint("is_processed"),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		searchQueryQueryTextStoreIdPopularity: index("SEARCH_QUERY_QUERY_TEXT_STORE_ID_POPULARITY").on(table.queryText, table.storeId, table.popularity),
		searchQueryIsProcessed: index("SEARCH_QUERY_IS_PROCESSED").on(table.isProcessed),
		searchQueryStoreIdNumResultsPopularity: index("SEARCH_QUERY_STORE_ID_NUM_RESULTS_POPULARITY").on(table.storeId, table.numResults, table.popularity),
		searchQueryQueryTextStoreId: unique("SEARCH_QUERY_QUERY_TEXT_STORE_ID").on(table.queryText, table.storeId),
	}
});

export const searchSynonyms = mysqlTable("search_synonyms", {
	groupId: bigint("group_id", { mode: "number" }).autoincrement().notNull(),
	synonyms: text("synonyms").notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		searchSynonymsStoreId: index("SEARCH_SYNONYMS_STORE_ID").on(table.storeId),
		searchSynonymsWebsiteId: index("SEARCH_SYNONYMS_WEBSITE_ID").on(table.websiteId),
		searchSynonymsSynonyms: index("SEARCH_SYNONYMS_SYNONYMS").on(table.synonyms),
	}
});

export const sendfriendLog = mysqlTable("sendfriend_log", {
	logId: int("log_id").autoincrement().notNull(),
	ip: bigint("ip", { mode: "number" }).notNull(),
	time: int("time").default(0).notNull(),
	websiteId: smallint("website_id").notNull(),
},
(table) => {
	return {
		sendfriendLogIp: index("SENDFRIEND_LOG_IP").on(table.ip),
		sendfriendLogTime: index("SENDFRIEND_LOG_TIME").on(table.time),
	}
});

export const sequenceCreditmemo0 = mysqlTable("sequence_creditmemo_0", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceCreditmemo1 = mysqlTable("sequence_creditmemo_1", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceInvoice0 = mysqlTable("sequence_invoice_0", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceInvoice1 = mysqlTable("sequence_invoice_1", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceOrder0 = mysqlTable("sequence_order_0", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceOrder1 = mysqlTable("sequence_order_1", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceShipment0 = mysqlTable("sequence_shipment_0", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const sequenceShipment1 = mysqlTable("sequence_shipment_1", {
	sequenceValue: int("sequence_value").autoincrement().notNull(),
});

export const session = mysqlTable("session", {
	sessionId: varchar("session_id", { length: 255 }).notNull(),
	sessionExpires: int("session_expires").default(0).notNull(),
	// Warning: Can't parse mediumblob from database
	// mediumblobType: mediumblob("session_data").notNull(),
});

export const setupModule = mysqlTable("setup_module", {
	module: varchar("module", { length: 50 }).notNull(),
	schemaVersion: varchar("schema_version", { length: 50 }).default('NULL'),
	dataVersion: varchar("data_version", { length: 50 }).default('NULL'),
});

export const shippingTablerate = mysqlTable("shipping_tablerate", {
	pk: int("pk").autoincrement().notNull(),
	websiteId: int("website_id").default(0).notNull(),
	destCountryId: varchar("dest_country_id", { length: 4 }).default(''0'').notNull(),
	destRegionId: int("dest_region_id").default(0).notNull(),
	destZip: varchar("dest_zip", { length: 10 }).default(''*'').notNull(),
	conditionName: varchar("condition_name", { length: 30 }).notNull(),
	conditionValue: decimal("condition_value", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	price: decimal("price", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	cost: decimal("cost", { precision: 12, scale: 4 }).default('0.0000').notNull(),
},
(table) => {
	return {
		unqD60821Cdb2Afacee1566Cfc02D0D4Caa: unique("UNQ_D60821CDB2AFACEE1566CFC02D0D4CAA").on(table.websiteId, table.destCountryId, table.destRegionId, table.destZip, table.conditionName, table.conditionValue),
	}
});

export const sitemap = mysqlTable("sitemap", {
	sitemapId: int("sitemap_id").autoincrement().notNull(),
	sitemapType: varchar("sitemap_type", { length: 32 }).default('NULL'),
	sitemapFilename: varchar("sitemap_filename", { length: 32 }).default('NULL'),
	sitemapPath: varchar("sitemap_path", { length: 255 }).default('NULL'),
	sitemapTime: timestamp("sitemap_time", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		sitemapStoreId: index("SITEMAP_STORE_ID").on(table.storeId),
	}
});

export const store = mysqlTable("store", {
	storeId: smallint("store_id").autoincrement().notNull(),
	code: varchar("code", { length: 32 }).default('NULL'),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	groupId: smallint("group_id").notNull().references(() => storeGroup.groupId, { onDelete: "cascade", onUpdate: "restrict" } ),
	name: varchar("name", { length: 255 }).notNull(),
	sortOrder: smallint("sort_order").notNull(),
	isActive: smallint("is_active").notNull(),
},
(table) => {
	return {
		storeWebsiteId: index("STORE_WEBSITE_ID").on(table.websiteId),
		storeIsActiveSortOrder: index("STORE_IS_ACTIVE_SORT_ORDER").on(table.isActive, table.sortOrder),
		storeGroupId: index("STORE_GROUP_ID").on(table.groupId),
		storeCode: unique("STORE_CODE").on(table.code),
	}
});

export const storesDataExporter = mysqlTable("stores_data_exporter", {
	id: int("id").notNull(),
	feedData: mediumtext("feed_data").notNull(),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		storesDataExporterModifiedAt: index("STORES_DATA_EXPORTER_MODIFIED_AT").on(table.modifiedAt),
	}
});

export const storesDataExporterIndexBatches = mysqlTable("stores_data_exporter_index_batches", {
	batchNumber: int("batch_number").notNull(),
	websiteId: smallint("website_id").notNull(),
});

export const storesDataExporterIndexSequence = mysqlTable("stores_data_exporter_index_sequence", {
	i: int("i").autoincrement().notNull(),
});

export const storeDataExporterCl = mysqlTable("store_data_exporter_cl", {
	versionId: int("version_id").autoincrement().notNull(),
	entityId: int("entity_id").default(0).notNull(),
});

export const storeGroup = mysqlTable("store_group", {
	groupId: smallint("group_id").autoincrement().notNull(),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	name: varchar("name", { length: 255 }).notNull(),
	rootCategoryId: int("root_category_id").default(0).notNull(),
	defaultStoreId: smallint("default_store_id").notNull(),
	code: varchar("code", { length: 32 }).default('NULL'),
},
(table) => {
	return {
		storeGroupWebsiteId: index("STORE_GROUP_WEBSITE_ID").on(table.websiteId),
		storeGroupDefaultStoreId: index("STORE_GROUP_DEFAULT_STORE_ID").on(table.defaultStoreId),
		storeGroupCode: unique("STORE_GROUP_CODE").on(table.code),
	}
});

export const storeWebsite = mysqlTable("store_website", {
	websiteId: smallint("website_id").autoincrement().notNull(),
	code: varchar("code", { length: 32 }).default('NULL'),
	name: varchar("name", { length: 64 }).default('NULL'),
	sortOrder: smallint("sort_order").notNull(),
	defaultGroupId: smallint("default_group_id").notNull(),
	isDefault: smallint("is_default"),
},
(table) => {
	return {
		storeWebsiteSortOrder: index("STORE_WEBSITE_SORT_ORDER").on(table.sortOrder),
		storeWebsiteDefaultGroupId: index("STORE_WEBSITE_DEFAULT_GROUP_ID").on(table.defaultGroupId),
		storeWebsiteCode: unique("STORE_WEBSITE_CODE").on(table.code),
	}
});

export const taxCalculation = mysqlTable("tax_calculation", {
	taxCalculationId: int("tax_calculation_id").autoincrement().notNull(),
	taxCalculationRateId: int("tax_calculation_rate_id").notNull().references(() => taxCalculationRate.taxCalculationRateId, { onDelete: "cascade", onUpdate: "restrict" } ),
	taxCalculationRuleId: int("tax_calculation_rule_id").notNull().references(() => taxCalculationRule.taxCalculationRuleId, { onDelete: "cascade", onUpdate: "restrict" } ),
	customerTaxClassId: smallint("customer_tax_class_id").notNull().references(() => taxClass.classId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productTaxClassId: smallint("product_tax_class_id").notNull().references(() => taxClass.classId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		taxCalculationTaxCalculationRuleId: index("TAX_CALCULATION_TAX_CALCULATION_RULE_ID").on(table.taxCalculationRuleId),
		taxCalculationCustomerTaxClassId: index("TAX_CALCULATION_CUSTOMER_TAX_CLASS_ID").on(table.customerTaxClassId),
		taxCalculationProductTaxClassId: index("TAX_CALCULATION_PRODUCT_TAX_CLASS_ID").on(table.productTaxClassId),
		taxCalcTaxCalcRateIdCstrTaxClassIdPrdTaxClassId: index("TAX_CALC_TAX_CALC_RATE_ID_CSTR_TAX_CLASS_ID_PRD_TAX_CLASS_ID").on(table.taxCalculationRateId, table.customerTaxClassId, table.productTaxClassId),
	}
});

export const taxCalculationRate = mysqlTable("tax_calculation_rate", {
	taxCalculationRateId: int("tax_calculation_rate_id").autoincrement().notNull(),
	taxCountryId: varchar("tax_country_id", { length: 2 }).notNull(),
	taxRegionId: int("tax_region_id").notNull(),
	taxPostcode: varchar("tax_postcode", { length: 21 }).default('NULL'),
	code: varchar("code", { length: 255 }).notNull(),
	rate: decimal("rate", { precision: 12, scale: 4 }).notNull(),
	zipIsRange: smallint("zip_is_range").default('NULL'),
	zipFrom: int("zip_from").default('NULL'),
	zipTo: int("zip_to").default('NULL'),
},
(table) => {
	return {
		taxCalculationRateTaxCountryIdTaxRegionIdTaxPostcode: index("TAX_CALCULATION_RATE_TAX_COUNTRY_ID_TAX_REGION_ID_TAX_POSTCODE").on(table.taxCountryId, table.taxRegionId, table.taxPostcode),
		taxCalculationRateCode: index("TAX_CALCULATION_RATE_CODE").on(table.code),
		idxCa799F1E2Cb843495F601E56C84A626D: index("IDX_CA799F1E2CB843495F601E56C84A626D").on(table.taxCalculationRateId, table.taxCountryId, table.taxRegionId, table.zipIsRange, table.taxPostcode),
	}
});

export const taxCalculationRateTitle = mysqlTable("tax_calculation_rate_title", {
	taxCalculationRateTitleId: int("tax_calculation_rate_title_id").autoincrement().notNull(),
	taxCalculationRateId: int("tax_calculation_rate_id").notNull().references(() => taxCalculationRate.taxCalculationRateId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: varchar("value", { length: 255 }).notNull(),
},
(table) => {
	return {
		taxCalculationRateTitleTaxCalculationRateIdStoreId: index("TAX_CALCULATION_RATE_TITLE_TAX_CALCULATION_RATE_ID_STORE_ID").on(table.taxCalculationRateId, table.storeId),
		taxCalculationRateTitleStoreId: index("TAX_CALCULATION_RATE_TITLE_STORE_ID").on(table.storeId),
	}
});

export const taxCalculationRule = mysqlTable("tax_calculation_rule", {
	taxCalculationRuleId: int("tax_calculation_rule_id").autoincrement().notNull(),
	code: varchar("code", { length: 255 }).notNull(),
	priority: int("priority").notNull(),
	position: int("position").notNull(),
	calculateSubtotal: int("calculate_subtotal").notNull(),
},
(table) => {
	return {
		taxCalculationRulePriorityPosition: index("TAX_CALCULATION_RULE_PRIORITY_POSITION").on(table.priority, table.position),
		taxCalculationRuleCode: index("TAX_CALCULATION_RULE_CODE").on(table.code),
	}
});

export const taxClass = mysqlTable("tax_class", {
	classId: smallint("class_id").autoincrement().notNull(),
	className: varchar("class_name", { length: 255 }).notNull(),
	classType: varchar("class_type", { length: 8 }).default(''CUSTOMER'').notNull(),
});

export const taxOrderAggregatedCreated = mysqlTable("tax_order_aggregated_created", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	code: varchar("code", { length: 255 }).notNull(),
	orderStatus: varchar("order_status", { length: 50 }).notNull(),
	percent: float("percent").default('NULL'),
	ordersCount: int("orders_count").default(0).notNull(),
	taxBaseAmountSum: float("tax_base_amount_sum").default('NULL'),
},
(table) => {
	return {
		taxOrderAggregatedCreatedStoreId: index("TAX_ORDER_AGGREGATED_CREATED_STORE_ID").on(table.storeId),
		taxOrderAggredCreatedPeriodStoreIdCodePercentOrderSts: unique("TAX_ORDER_AGGRED_CREATED_PERIOD_STORE_ID_CODE_PERCENT_ORDER_STS").on(table.period, table.storeId, table.code, table.percent, table.orderStatus),
	}
});

export const taxOrderAggregatedUpdated = mysqlTable("tax_order_aggregated_updated", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	period: date("period", { mode: 'string' }).default('NULL'),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	code: varchar("code", { length: 255 }).notNull(),
	orderStatus: varchar("order_status", { length: 50 }).notNull(),
	percent: float("percent").default('NULL'),
	ordersCount: int("orders_count").default(0).notNull(),
	taxBaseAmountSum: float("tax_base_amount_sum").default('NULL'),
},
(table) => {
	return {
		taxOrderAggregatedUpdatedStoreId: index("TAX_ORDER_AGGREGATED_UPDATED_STORE_ID").on(table.storeId),
		taxOrderAggredUpdatedPeriodStoreIdCodePercentOrderSts: unique("TAX_ORDER_AGGRED_UPDATED_PERIOD_STORE_ID_CODE_PERCENT_ORDER_STS").on(table.period, table.storeId, table.code, table.percent, table.orderStatus),
	}
});

export const tfaCountryCodes = mysqlTable("tfa_country_codes", {
	countryId: int("country_id").autoincrement().notNull(),
	code: varchar("code", { length: 2 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	dialCode: varchar("dial_code", { length: 255 }).notNull(),
},
(table) => {
	return {
		tfaCountryCodesCode: index("TFA_COUNTRY_CODES_CODE").on(table.code),
	}
});

export const tfaUserConfig = mysqlTable("tfa_user_config", {
	configId: int("config_id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	encodedProviders: text("encoded_providers").default('NULL'),
	encodedConfig: text("encoded_config").default('NULL'),
	defaultProvider: varchar("default_provider", { length: 255 }).default('NULL'),
});

export const theme = mysqlTable("theme", {
	themeId: int("theme_id").autoincrement().notNull(),
	parentId: int("parent_id").default('NULL'),
	themePath: varchar("theme_path", { length: 255 }).default('NULL'),
	themeTitle: varchar("theme_title", { length: 255 }).notNull(),
	previewImage: varchar("preview_image", { length: 255 }).default('NULL'),
	isFeatured: tinyint("is_featured").default(0).notNull(),
	area: varchar("area", { length: 255 }).notNull(),
	type: smallint("type").notNull(),
	code: text("code").default('NULL'),
});

export const themeFile = mysqlTable("theme_file", {
	themeFilesId: int("theme_files_id").autoincrement().notNull(),
	themeId: int("theme_id").notNull().references(() => theme.themeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	filePath: varchar("file_path", { length: 255 }).default('NULL'),
	fileType: varchar("file_type", { length: 32 }).notNull(),
	content: longtext("content").notNull(),
	sortOrder: smallint("sort_order").notNull(),
	isTemporary: tinyint("is_temporary").default(0).notNull(),
});

export const translation = mysqlTable("translation", {
	keyId: int("key_id").autoincrement().notNull(),
	string: varchar("string", { length: 255 }).default(''Translate String'').notNull(),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	translate: varchar("translate", { length: 255 }).default('NULL'),
	locale: varchar("locale", { length: 20 }).default(''en_US'').notNull(),
	crcString: bigint("crc_string", { mode: "number" }).default(1591228201).notNull(),
},
(table) => {
	return {
		translationStoreIdLocaleCrcStringString: unique("TRANSLATION_STORE_ID_LOCALE_CRC_STRING_STRING").on(table.storeId, table.locale, table.crcString, table.string),
	}
});

export const uiBookmark = mysqlTable("ui_bookmark", {
	bookmarkId: int("bookmark_id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => adminUser.userId, { onDelete: "cascade", onUpdate: "restrict" } ),
	namespace: varchar("namespace", { length: 255 }).notNull(),
	identifier: varchar("identifier", { length: 255 }).notNull(),
	current: smallint("current").notNull(),
	title: varchar("title", { length: 255 }).default('NULL'),
	config: longtext("config").default('NULL'),
	createdAt: datetime("created_at", { mode: 'string'}).default('current_timestamp()').notNull(),
	updatedAt: datetime("updated_at", { mode: 'string'}).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		uiBookmarkUserIdNamespaceIdentifier: index("UI_BOOKMARK_USER_ID_NAMESPACE_IDENTIFIER").on(table.userId, table.namespace, table.identifier),
	}
});

export const urlRewrite = mysqlTable("url_rewrite", {
	urlRewriteId: int("url_rewrite_id").autoincrement().notNull(),
	entityType: varchar("entity_type", { length: 32 }).notNull(),
	entityId: int("entity_id").notNull(),
	requestPath: varchar("request_path", { length: 255 }).default('NULL'),
	targetPath: varchar("target_path", { length: 255 }).default('NULL'),
	redirectType: smallint("redirect_type").notNull(),
	storeId: smallint("store_id").notNull(),
	description: varchar("description", { length: 255 }).default('NULL'),
	isAutogenerated: smallint("is_autogenerated").notNull(),
	metadata: varchar("metadata", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		urlRewriteTargetPath: index("URL_REWRITE_TARGET_PATH").on(table.targetPath),
		urlRewriteStoreIdEntityId: index("URL_REWRITE_STORE_ID_ENTITY_ID").on(table.storeId, table.entityId),
		urlRewriteEntityId: index("URL_REWRITE_ENTITY_ID").on(table.entityId),
		urlRewriteIsAutogeneratedMetadata: index("URL_REWRITE_IS_AUTOGENERATED_METADATA").on(table.isAutogenerated, table.metadata),
		urlRewriteRequestPathStoreId: unique("URL_REWRITE_REQUEST_PATH_STORE_ID").on(table.requestPath, table.storeId),
	}
});

export const variable = mysqlTable("variable", {
	variableId: int("variable_id").autoincrement().notNull(),
	code: varchar("code", { length: 255 }).default('NULL'),
	name: varchar("name", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		variableCode: unique("VARIABLE_CODE").on(table.code),
	}
});

export const variableValue = mysqlTable("variable_value", {
	valueId: int("value_id").autoincrement().notNull(),
	variableId: int("variable_id").default(0).notNull().references(() => variable.variableId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").notNull().references(() => store.storeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	plainValue: text("plain_value").default('NULL'),
	htmlValue: text("html_value").default('NULL'),
},
(table) => {
	return {
		variableValueStoreId: index("VARIABLE_VALUE_STORE_ID").on(table.storeId),
		variableValueVariableIdStoreId: unique("VARIABLE_VALUE_VARIABLE_ID_STORE_ID").on(table.variableId, table.storeId),
	}
});

export const vaultPaymentToken = mysqlTable("vault_payment_token", {
	entityId: int("entity_id").autoincrement().notNull(),
	customerId: int("customer_id").default('NULL').references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	websiteId: int("website_id").default('NULL'),
	publicHash: varchar("public_hash", { length: 128 }).notNull(),
	paymentMethodCode: varchar("payment_method_code", { length: 128 }).notNull(),
	type: varchar("type", { length: 128 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).default('NULL'),
	gatewayToken: varchar("gateway_token", { length: 255 }).notNull(),
	details: text("details").default('NULL'),
	isActive: tinyint("is_active").default(1).notNull(),
	isVisible: tinyint("is_visible").default(1).notNull(),
},
(table) => {
	return {
		vaultPaymentTokenPublicHash: unique("VAULT_PAYMENT_TOKEN_PUBLIC_HASH").on(table.publicHash),
		vaultPaymentTokenPaymentMethodCodeCstrIdGatewayToken: unique("VAULT_PAYMENT_TOKEN_PAYMENT_METHOD_CODE_CSTR_ID_GATEWAY_TOKEN").on(table.paymentMethodCode, table.customerId, table.gatewayToken),
	}
});

export const vaultPaymentTokenOrderPaymentLink = mysqlTable("vault_payment_token_order_payment_link", {
	orderPaymentId: int("order_payment_id").notNull().references(() => salesOrderPayment.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	paymentTokenId: int("payment_token_id").notNull().references(() => vaultPaymentToken.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const weeeTax = mysqlTable("weee_tax", {
	valueId: int("value_id").autoincrement().notNull(),
	websiteId: smallint("website_id").notNull().references(() => storeWebsite.websiteId, { onDelete: "cascade", onUpdate: "restrict" } ),
	entityId: int("entity_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	country: varchar("country", { length: 2 }).default('NULL').references(() => directoryCountry.countryId, { onDelete: "cascade", onUpdate: "restrict" } ),
	value: decimal("value", { precision: 12, scale: 4 }).default('0.0000').notNull(),
	state: int("state").default(0).notNull(),
	attributeId: smallint("attribute_id").notNull().references(() => eavAttribute.attributeId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		weeeTaxWebsiteId: index("WEEE_TAX_WEBSITE_ID").on(table.websiteId),
		weeeTaxEntityId: index("WEEE_TAX_ENTITY_ID").on(table.entityId),
		weeeTaxCountry: index("WEEE_TAX_COUNTRY").on(table.country),
		weeeTaxAttributeId: index("WEEE_TAX_ATTRIBUTE_ID").on(table.attributeId),
	}
});

export const widget = mysqlTable("widget", {
	widgetId: int("widget_id").autoincrement().notNull(),
	widgetCode: varchar("widget_code", { length: 255 }).default('NULL'),
	widgetType: varchar("widget_type", { length: 255 }).default('NULL'),
	parameters: text("parameters").default('NULL'),
},
(table) => {
	return {
		widgetWidgetCode: index("WIDGET_WIDGET_CODE").on(table.widgetCode),
	}
});

export const widgetInstance = mysqlTable("widget_instance", {
	instanceId: int("instance_id").autoincrement().notNull(),
	instanceType: varchar("instance_type", { length: 255 }).default('NULL'),
	themeId: int("theme_id").notNull().references(() => theme.themeId, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar("title", { length: 255 }).default('NULL'),
	storeIds: varchar("store_ids", { length: 255 }).default(''0'').notNull(),
	widgetParameters: text("widget_parameters").default('NULL'),
	sortOrder: smallint("sort_order").notNull(),
});

export const widgetInstancePage = mysqlTable("widget_instance_page", {
	pageId: int("page_id").autoincrement().notNull(),
	instanceId: int("instance_id").default(0).notNull().references(() => widgetInstance.instanceId, { onDelete: "cascade", onUpdate: "restrict" } ),
	pageGroup: varchar("page_group", { length: 25 }).default('NULL'),
	layoutHandle: varchar("layout_handle", { length: 255 }).default('NULL'),
	blockReference: varchar("block_reference", { length: 255 }).default('NULL'),
	pageFor: varchar("page_for", { length: 25 }).default('NULL'),
	entities: text("entities").default('NULL'),
	pageTemplate: varchar("page_template", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		widgetInstancePageInstanceId: index("WIDGET_INSTANCE_PAGE_INSTANCE_ID").on(table.instanceId),
	}
});

export const widgetInstancePageLayout = mysqlTable("widget_instance_page_layout", {
	pageId: int("page_id").default(0).notNull().references(() => widgetInstancePage.pageId, { onDelete: "cascade", onUpdate: "restrict" } ),
	layoutUpdateId: int("layout_update_id").default(0).notNull().references(() => layoutUpdate.layoutUpdateId, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => {
	return {
		widgetInstancePageLayoutPageId: index("WIDGET_INSTANCE_PAGE_LAYOUT_PAGE_ID").on(table.pageId),
	}
});

export const wishlist = mysqlTable("wishlist", {
	wishlistId: int("wishlist_id").autoincrement().notNull(),
	customerId: int("customer_id").default(0).notNull().references(() => customerEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	shared: smallint("shared").notNull(),
	sharingCode: varchar("sharing_code", { length: 32 }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => {
	return {
		wishlistShared: index("WISHLIST_SHARED").on(table.shared),
		wishlistCustomerId: unique("WISHLIST_CUSTOMER_ID").on(table.customerId),
	}
});

export const wishlistItem = mysqlTable("wishlist_item", {
	wishlistItemId: int("wishlist_item_id").autoincrement().notNull(),
	wishlistId: int("wishlist_id").default(0).notNull().references(() => wishlist.wishlistId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").default(0).notNull().references(() => catalogProductEntity.entityId, { onDelete: "cascade", onUpdate: "restrict" } ),
	storeId: smallint("store_id").default('NULL').references(() => store.storeId, { onDelete: "set null", onUpdate: "restrict" } ),
	addedAt: timestamp("added_at", { mode: 'string' }).default('NULL'),
	description: text("description").default('NULL'),
	qty: decimal("qty", { precision: 12, scale: 4 }).notNull(),
},
(table) => {
	return {
		wishlistItemWishlistId: index("WISHLIST_ITEM_WISHLIST_ID").on(table.wishlistId),
		wishlistItemProductId: index("WISHLIST_ITEM_PRODUCT_ID").on(table.productId),
		wishlistItemStoreId: index("WISHLIST_ITEM_STORE_ID").on(table.storeId),
	}
});

export const wishlistItemOption = mysqlTable("wishlist_item_option", {
	optionId: int("option_id").autoincrement().notNull(),
	wishlistItemId: int("wishlist_item_id").notNull().references(() => wishlistItem.wishlistItemId, { onDelete: "cascade", onUpdate: "restrict" } ),
	productId: int("product_id").notNull(),
	code: varchar("code", { length: 255 }).notNull(),
	value: text("value").default('NULL'),
});