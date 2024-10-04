import { relations } from "drizzle-orm/relations";
import { adminUser, adminAdobeImsWebapi, adminPasswords, adminUserExpiration, adminUserSession, adobeStockCategory, adobeStockAsset, adobeStockCreator, mediaGalleryAsset, adobeUserProfile, authorizationRole, authorizationRule, salesOrder, braintreeTransactionDetails, catalogProductEntity, cataloginventoryStockItem, cataloginventoryStock, catalogrule, catalogruleCustomerGroup, customerGroup, catalogruleWebsite, storeWebsite, searchQuery, catalogsearchRecommendations, store, catalogCategoryEntityDatetime, eavAttribute, catalogCategoryEntity, catalogCategoryEntityDecimal, catalogCategoryEntityInt, catalogCategoryEntityText, catalogCategoryEntityVarchar, catalogCategoryProduct, customerEntity, catalogCompareItem, catalogCompareList, catalogEavAttribute, catalogProductBundleOption, catalogProductBundleOptionValue, catalogProductBundlePriceIndex, catalogProductBundleSelection, catalogProductBundleSelectionPrice, catalogProductEntityDatetime, catalogProductEntityDecimal, catalogProductEntityGallery, catalogProductEntityInt, catalogProductEntityMediaGallery, catalogProductEntityMediaGalleryValue, catalogProductEntityMediaGalleryValueToEntity, catalogProductEntityMediaGalleryValueVideo, catalogProductEntityText, catalogProductEntityTierPrice, catalogProductEntityVarchar, catalogProductFrontendAction, catalogProductIndexTierPrice, catalogProductIndexWebsite, catalogProductLink, catalogProductLinkType, catalogProductLinkAttribute, catalogProductLinkAttributeDecimal, catalogProductLinkAttributeInt, catalogProductLinkAttributeVarchar, catalogProductOption, catalogProductOptionPrice, catalogProductOptionTitle, catalogProductOptionTypePrice, catalogProductOptionTypeValue, catalogProductOptionTypeTitle, catalogProductRelation, catalogProductSuperAttribute, catalogProductSuperAttributeLabel, catalogProductSuperLink, catalogProductWebsite, catalogUrlRewriteProductCategory, urlRewrite, checkoutAgreementStore, checkoutAgreement, cmsBlock, cmsBlockStore, cmsPage, cmsPageStore, customerAddressEntity, customerAddressEntityDatetime, customerAddressEntityDecimal, customerAddressEntityInt, customerAddressEntityText, customerAddressEntityVarchar, customerEavAttribute, customerEavAttributeWebsite, customerEntityDatetime, customerEntityDecimal, customerEntityInt, customerEntityText, customerEntityVarchar, customerFormAttribute, designChange, directoryCountryRegion, directoryCountryRegionName, downloadableLink, downloadableLinkPrice, downloadableLinkPurchased, salesOrderItem, downloadableLinkPurchasedItem, downloadableLinkTitle, downloadableSample, downloadableSampleTitle, eavEntityType, eavAttributeSet, eavAttributeGroup, eavAttributeLabel, eavAttributeOption, eavAttributeOptionSwatch, eavAttributeOptionValue, eavEntity, eavEntityAttribute, eavEntityDatetime, eavEntityDecimal, eavEntityInt, eavEntityStore, eavEntityText, eavEntityVarchar, eavFormElement, eavFormFieldset, eavFormType, eavFormFieldsetLabel, eavFormTypeEntity, googleoptimizerCode, oauthConsumer, integration, inventoryOrderNotification, inventoryPickupLocationOrder, quoteAddress, inventoryPickupLocationQuoteAddress, inventorySource, inventorySourceCarrierLink, inventorySourceItem, inventoryStock, inventorySourceStockLink, inventoryStockSalesChannel, layoutUpdate, layoutLink, theme, loginAsCustomerAssistanceAllowed, magentoBulk, magentoAcknowledgedBulk, magentoOperation, mediaGalleryAssetKeyword, mediaGalleryKeyword, newsletterQueue, newsletterProblem, newsletterSubscriber, newsletterTemplate, newsletterQueueLink, newsletterQueueStoreLink, oauthNonce, oauthToken, paypalBillingAgreement, paypalBillingAgreementOrder, paypalCert, paypalSettlementReport, paypalSettlementReportRow, persistentSession, productAlertPrice, productAlertStock, queueMessage, queueMessageStatus, queue, quote, quoteAddressItem, quoteItem, quoteIdMask, quoteItemOption, quotePayment, quoteShippingRate, ratingEntity, rating, ratingOption, ratingOptionVote, review, ratingOptionVoteAggregated, ratingStore, ratingTitle, releaseNotificationViewerLog, reportComparedProductIndex, reportEventTypes, reportEvent, reportViewedProductAggregatedDaily, reportViewedProductAggregatedMonthly, reportViewedProductAggregatedYearly, reportViewedProductIndex, reviewEntity, reviewStatus, reviewDetail, reviewEntitySummary, reviewStore, salesrule, salesruleCoupon, salesruleCouponAggregated, salesruleCouponAggregatedOrder, salesruleCouponAggregatedUpdated, salesruleCouponUsage, salesruleCustomer, salesruleCustomerGroup, salesruleLabel, salesruleProductAttribute, salesruleWebsite, salesBestsellersAggregatedDaily, salesBestsellersAggregatedMonthly, salesBestsellersAggregatedYearly, salesCreditmemo, salesCreditmemoComment, salesCreditmemoItem, salesInvoice, salesInvoicedAggregated, salesInvoicedAggregatedOrder, salesInvoiceComment, salesInvoiceItem, salesOrderAddress, salesOrderAggregatedCreated, salesOrderAggregatedUpdated, salesOrderPayment, salesOrderStatusHistory, salesOrderStatus, salesOrderStatusLabel, salesOrderStatusState, salesOrderTaxItem, salesOrderTax, salesPaymentTransaction, salesRefundedAggregated, salesRefundedAggregatedOrder, salesSequenceMeta, salesSequenceProfile, salesShipment, salesShipmentComment, salesShipmentItem, salesShipmentTrack, salesShippingAggregated, salesShippingAggregatedOrder, searchSynonyms, sitemap, storeGroup, taxClass, taxCalculation, taxCalculationRate, taxCalculationRule, taxCalculationRateTitle, taxOrderAggregatedCreated, taxOrderAggregatedUpdated, tfaUserConfig, themeFile, translation, uiBookmark, variableValue, variable, vaultPaymentToken, vaultPaymentTokenOrderPaymentLink, weeeTax, directoryCountry, widgetInstance, widgetInstancePage, widgetInstancePageLayout, wishlist, wishlistItem, wishlistItemOption } from "./schema";

export const adminAdobeImsWebapiRelations = relations(adminAdobeImsWebapi, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [adminAdobeImsWebapi.adminUserId],
		references: [adminUser.userId]
	}),
}));

export const adminUserRelations = relations(adminUser, ({many}) => ({
	adminAdobeImsWebapis: many(adminAdobeImsWebapi),
	adminPasswords: many(adminPasswords),
	adminUserExpirations: many(adminUserExpiration),
	adminUserSessions: many(adminUserSession),
	adobeUserProfiles: many(adobeUserProfile),
	oauthTokens: many(oauthToken),
	releaseNotificationViewerLogs: many(releaseNotificationViewerLog),
	tfaUserConfigs: many(tfaUserConfig),
	uiBookmarks: many(uiBookmark),
}));

export const adminPasswordsRelations = relations(adminPasswords, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [adminPasswords.userId],
		references: [adminUser.userId]
	}),
}));

export const adminUserExpirationRelations = relations(adminUserExpiration, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [adminUserExpiration.userId],
		references: [adminUser.userId]
	}),
}));

export const adminUserSessionRelations = relations(adminUserSession, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [adminUserSession.userId],
		references: [adminUser.userId]
	}),
}));

export const adobeStockAssetRelations = relations(adobeStockAsset, ({one}) => ({
	adobeStockCategory: one(adobeStockCategory, {
		fields: [adobeStockAsset.categoryId],
		references: [adobeStockCategory.id]
	}),
	adobeStockCreator: one(adobeStockCreator, {
		fields: [adobeStockAsset.creatorId],
		references: [adobeStockCreator.id]
	}),
	mediaGalleryAsset: one(mediaGalleryAsset, {
		fields: [adobeStockAsset.mediaGalleryId],
		references: [mediaGalleryAsset.id]
	}),
}));

export const adobeStockCategoryRelations = relations(adobeStockCategory, ({many}) => ({
	adobeStockAssets: many(adobeStockAsset),
}));

export const adobeStockCreatorRelations = relations(adobeStockCreator, ({many}) => ({
	adobeStockAssets: many(adobeStockAsset),
}));

export const mediaGalleryAssetRelations = relations(mediaGalleryAsset, ({many}) => ({
	adobeStockAssets: many(adobeStockAsset),
	mediaGalleryAssetKeywords: many(mediaGalleryAssetKeyword),
}));

export const adobeUserProfileRelations = relations(adobeUserProfile, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [adobeUserProfile.adminUserId],
		references: [adminUser.userId]
	}),
}));

export const authorizationRuleRelations = relations(authorizationRule, ({one}) => ({
	authorizationRole: one(authorizationRole, {
		fields: [authorizationRule.roleId],
		references: [authorizationRole.roleId]
	}),
}));

export const authorizationRoleRelations = relations(authorizationRole, ({many}) => ({
	authorizationRules: many(authorizationRule),
}));

export const braintreeTransactionDetailsRelations = relations(braintreeTransactionDetails, ({one}) => ({
	salesOrder: one(salesOrder, {
		fields: [braintreeTransactionDetails.orderId],
		references: [salesOrder.entityId]
	}),
}));

export const salesOrderRelations = relations(salesOrder, ({one, many}) => ({
	braintreeTransactionDetails: many(braintreeTransactionDetails),
	downloadableLinkPurchaseds: many(downloadableLinkPurchased),
	inventoryOrderNotifications: many(inventoryOrderNotification),
	inventoryPickupLocationOrders: many(inventoryPickupLocationOrder),
	paypalBillingAgreementOrders: many(paypalBillingAgreementOrder),
	salesCreditmemos: many(salesCreditmemo),
	salesInvoices: many(salesInvoice),
	customerEntity: one(customerEntity, {
		fields: [salesOrder.customerId],
		references: [customerEntity.entityId]
	}),
	store: one(store, {
		fields: [salesOrder.storeId],
		references: [store.storeId]
	}),
	salesOrderAddresses: many(salesOrderAddress),
	salesOrderItems: many(salesOrderItem),
	salesOrderPayments: many(salesOrderPayment),
	salesOrderStatusHistories: many(salesOrderStatusHistory),
	salesPaymentTransactions: many(salesPaymentTransaction),
	salesShipments: many(salesShipment),
}));

export const cataloginventoryStockItemRelations = relations(cataloginventoryStockItem, ({one}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [cataloginventoryStockItem.productId],
		references: [catalogProductEntity.entityId]
	}),
	cataloginventoryStock: one(cataloginventoryStock, {
		fields: [cataloginventoryStockItem.stockId],
		references: [cataloginventoryStock.stockId]
	}),
}));

export const catalogProductEntityRelations = relations(catalogProductEntity, ({many}) => ({
	cataloginventoryStockItems: many(cataloginventoryStockItem),
	catalogCategoryProducts: many(catalogCategoryProduct),
	catalogCompareItems: many(catalogCompareItem),
	catalogProductBundleOptions: many(catalogProductBundleOption),
	catalogProductBundlePriceIndices: many(catalogProductBundlePriceIndex),
	catalogProductBundleSelections: many(catalogProductBundleSelection),
	catalogProductEntityDatetimes: many(catalogProductEntityDatetime),
	catalogProductEntityDecimals: many(catalogProductEntityDecimal),
	catalogProductEntityGalleries: many(catalogProductEntityGallery),
	catalogProductEntityInts: many(catalogProductEntityInt),
	catalogProductEntityMediaGalleryValues: many(catalogProductEntityMediaGalleryValue),
	catalogProductEntityMediaGalleryValueToEntities: many(catalogProductEntityMediaGalleryValueToEntity),
	catalogProductEntityTexts: many(catalogProductEntityText),
	catalogProductEntityTierPrices: many(catalogProductEntityTierPrice),
	catalogProductEntityVarchars: many(catalogProductEntityVarchar),
	catalogProductFrontendActions: many(catalogProductFrontendAction),
	catalogProductIndexTierPrices: many(catalogProductIndexTierPrice),
	catalogProductLinks_productId: many(catalogProductLink, {
		relationName: "catalogProductLink_productId_catalogProductEntity_entityId"
	}),
	catalogProductLinks_linkedProductId: many(catalogProductLink, {
		relationName: "catalogProductLink_linkedProductId_catalogProductEntity_entityId"
	}),
	catalogProductOptions: many(catalogProductOption),
	catalogProductRelations_childId: many(catalogProductRelation, {
		relationName: "catalogProductRelation_childId_catalogProductEntity_entityId"
	}),
	catalogProductRelations_parentId: many(catalogProductRelation, {
		relationName: "catalogProductRelation_parentId_catalogProductEntity_entityId"
	}),
	catalogProductSuperAttributes: many(catalogProductSuperAttribute),
	catalogProductSuperLinks_parentId: many(catalogProductSuperLink, {
		relationName: "catalogProductSuperLink_parentId_catalogProductEntity_entityId"
	}),
	catalogProductSuperLinks_productId: many(catalogProductSuperLink, {
		relationName: "catalogProductSuperLink_productId_catalogProductEntity_entityId"
	}),
	catalogProductWebsites: many(catalogProductWebsite),
	catalogUrlRewriteProductCategories: many(catalogUrlRewriteProductCategory),
	downloadableLinks: many(downloadableLink),
	downloadableSamples: many(downloadableSample),
	productAlertPrices: many(productAlertPrice),
	productAlertStocks: many(productAlertStock),
	reportComparedProductIndices: many(reportComparedProductIndex),
	reportViewedProductAggregatedDailies: many(reportViewedProductAggregatedDaily),
	reportViewedProductAggregatedMonthlies: many(reportViewedProductAggregatedMonthly),
	reportViewedProductAggregatedYearlies: many(reportViewedProductAggregatedYearly),
	reportViewedProductIndices: many(reportViewedProductIndex),
	weeeTaxes: many(weeeTax),
	wishlistItems: many(wishlistItem),
}));

export const cataloginventoryStockRelations = relations(cataloginventoryStock, ({many}) => ({
	cataloginventoryStockItems: many(cataloginventoryStockItem),
}));

export const catalogruleCustomerGroupRelations = relations(catalogruleCustomerGroup, ({one}) => ({
	catalogrule: one(catalogrule, {
		fields: [catalogruleCustomerGroup.ruleId],
		references: [catalogrule.ruleId]
	}),
	customerGroup: one(customerGroup, {
		fields: [catalogruleCustomerGroup.customerGroupId],
		references: [customerGroup.customerGroupId]
	}),
}));

export const catalogruleRelations = relations(catalogrule, ({many}) => ({
	catalogruleCustomerGroups: many(catalogruleCustomerGroup),
	catalogruleWebsites: many(catalogruleWebsite),
}));

export const customerGroupRelations = relations(customerGroup, ({many}) => ({
	catalogruleCustomerGroups: many(catalogruleCustomerGroup),
	catalogProductBundlePriceIndices: many(catalogProductBundlePriceIndex),
	catalogProductEntityTierPrices: many(catalogProductEntityTierPrice),
	catalogProductIndexTierPrices: many(catalogProductIndexTierPrice),
	salesruleCustomerGroups: many(salesruleCustomerGroup),
	salesruleProductAttributes: many(salesruleProductAttribute),
}));

export const catalogruleWebsiteRelations = relations(catalogruleWebsite, ({one}) => ({
	catalogrule: one(catalogrule, {
		fields: [catalogruleWebsite.ruleId],
		references: [catalogrule.ruleId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [catalogruleWebsite.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const storeWebsiteRelations = relations(storeWebsite, ({many}) => ({
	catalogruleWebsites: many(catalogruleWebsite),
	catalogProductBundlePriceIndices: many(catalogProductBundlePriceIndex),
	catalogProductBundleSelectionPrices: many(catalogProductBundleSelectionPrice),
	catalogProductEntityTierPrices: many(catalogProductEntityTierPrice),
	catalogProductIndexTierPrices: many(catalogProductIndexTierPrice),
	catalogProductIndexWebsites: many(catalogProductIndexWebsite),
	catalogProductWebsites: many(catalogProductWebsite),
	customerEavAttributeWebsites: many(customerEavAttributeWebsite),
	customerEntities: many(customerEntity),
	downloadableLinkPrices: many(downloadableLinkPrice),
	paypalCerts: many(paypalCert),
	persistentSessions: many(persistentSession),
	productAlertPrices: many(productAlertPrice),
	productAlertStocks: many(productAlertStock),
	salesruleProductAttributes: many(salesruleProductAttribute),
	salesruleWebsites: many(salesruleWebsite),
	searchSynonyms: many(searchSynonyms),
	stores: many(store),
	storeGroups: many(storeGroup),
	weeeTaxes: many(weeeTax),
}));

export const catalogsearchRecommendationsRelations = relations(catalogsearchRecommendations, ({one}) => ({
	searchQuery_queryId: one(searchQuery, {
		fields: [catalogsearchRecommendations.queryId],
		references: [searchQuery.queryId],
		relationName: "catalogsearchRecommendations_queryId_searchQuery_queryId"
	}),
	searchQuery_relationId: one(searchQuery, {
		fields: [catalogsearchRecommendations.relationId],
		references: [searchQuery.queryId],
		relationName: "catalogsearchRecommendations_relationId_searchQuery_queryId"
	}),
}));

export const searchQueryRelations = relations(searchQuery, ({one, many}) => ({
	catalogsearchRecommendations_queryId: many(catalogsearchRecommendations, {
		relationName: "catalogsearchRecommendations_queryId_searchQuery_queryId"
	}),
	catalogsearchRecommendations_relationId: many(catalogsearchRecommendations, {
		relationName: "catalogsearchRecommendations_relationId_searchQuery_queryId"
	}),
	store: one(store, {
		fields: [searchQuery.storeId],
		references: [store.storeId]
	}),
}));

export const catalogCategoryEntityDatetimeRelations = relations(catalogCategoryEntityDatetime, ({one}) => ({
	store: one(store, {
		fields: [catalogCategoryEntityDatetime.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogCategoryEntityDatetime.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogCategoryEntityDatetime.entityId],
		references: [catalogCategoryEntity.entityId]
	}),
}));

export const storeRelations = relations(store, ({one, many}) => ({
	catalogCategoryEntityDatetimes: many(catalogCategoryEntityDatetime),
	catalogCategoryEntityDecimals: many(catalogCategoryEntityDecimal),
	catalogCategoryEntityInts: many(catalogCategoryEntityInt),
	catalogCategoryEntityTexts: many(catalogCategoryEntityText),
	catalogCategoryEntityVarchars: many(catalogCategoryEntityVarchar),
	catalogCompareItems: many(catalogCompareItem),
	catalogProductEntityDatetimes: many(catalogProductEntityDatetime),
	catalogProductEntityDecimals: many(catalogProductEntityDecimal),
	catalogProductEntityGalleries: many(catalogProductEntityGallery),
	catalogProductEntityInts: many(catalogProductEntityInt),
	catalogProductEntityMediaGalleryValues: many(catalogProductEntityMediaGalleryValue),
	catalogProductEntityMediaGalleryValueVideos: many(catalogProductEntityMediaGalleryValueVideo),
	catalogProductEntityTexts: many(catalogProductEntityText),
	catalogProductEntityVarchars: many(catalogProductEntityVarchar),
	catalogProductOptionPrices: many(catalogProductOptionPrice),
	catalogProductOptionTitles: many(catalogProductOptionTitle),
	catalogProductOptionTypePrices: many(catalogProductOptionTypePrice),
	catalogProductOptionTypeTitles: many(catalogProductOptionTypeTitle),
	catalogProductSuperAttributeLabels: many(catalogProductSuperAttributeLabel),
	checkoutAgreementStores: many(checkoutAgreementStore),
	cmsBlockStores: many(cmsBlockStore),
	cmsPageStores: many(cmsPageStore),
	customerEntities: many(customerEntity),
	designChanges: many(designChange),
	downloadableLinkTitles: many(downloadableLinkTitle),
	downloadableSampleTitles: many(downloadableSampleTitle),
	eavAttributeLabels: many(eavAttributeLabel),
	eavAttributeOptionSwatches: many(eavAttributeOptionSwatch),
	eavAttributeOptionValues: many(eavAttributeOptionValue),
	eavEntities: many(eavEntity),
	eavEntityDatetimes: many(eavEntityDatetime),
	eavEntityDecimals: many(eavEntityDecimal),
	eavEntityInts: many(eavEntityInt),
	eavEntityStores: many(eavEntityStore),
	eavEntityTexts: many(eavEntityText),
	eavEntityVarchars: many(eavEntityVarchar),
	eavFormFieldsetLabels: many(eavFormFieldsetLabel),
	eavFormTypes: many(eavFormType),
	googleoptimizerCodes: many(googleoptimizerCode),
	layoutLinks: many(layoutLink),
	newsletterQueueStoreLinks: many(newsletterQueueStoreLink),
	newsletterSubscribers: many(newsletterSubscriber),
	paypalBillingAgreements: many(paypalBillingAgreement),
	productAlertPrices: many(productAlertPrice),
	productAlertStocks: many(productAlertStock),
	quotes: many(quote),
	quoteItems: many(quoteItem),
	ratingOptionVoteAggregateds: many(ratingOptionVoteAggregated),
	ratingStores: many(ratingStore),
	ratingTitles: many(ratingTitle),
	reportComparedProductIndices: many(reportComparedProductIndex),
	reportEvents: many(reportEvent),
	reportViewedProductAggregatedDailies: many(reportViewedProductAggregatedDaily),
	reportViewedProductAggregatedMonthlies: many(reportViewedProductAggregatedMonthly),
	reportViewedProductAggregatedYearlies: many(reportViewedProductAggregatedYearly),
	reportViewedProductIndices: many(reportViewedProductIndex),
	reviewDetails: many(reviewDetail),
	reviewEntitySummaries: many(reviewEntitySummary),
	reviewStores: many(reviewStore),
	salesruleCouponAggregateds: many(salesruleCouponAggregated),
	salesruleCouponAggregatedOrders: many(salesruleCouponAggregatedOrder),
	salesruleCouponAggregatedUpdateds: many(salesruleCouponAggregatedUpdated),
	salesruleLabels: many(salesruleLabel),
	salesBestsellersAggregatedDailies: many(salesBestsellersAggregatedDaily),
	salesBestsellersAggregatedMonthlies: many(salesBestsellersAggregatedMonthly),
	salesBestsellersAggregatedYearlies: many(salesBestsellersAggregatedYearly),
	salesCreditmemos: many(salesCreditmemo),
	salesInvoices: many(salesInvoice),
	salesInvoicedAggregateds: many(salesInvoicedAggregated),
	salesInvoicedAggregatedOrders: many(salesInvoicedAggregatedOrder),
	salesOrders: many(salesOrder),
	salesOrderAggregatedCreateds: many(salesOrderAggregatedCreated),
	salesOrderAggregatedUpdateds: many(salesOrderAggregatedUpdated),
	salesOrderItems: many(salesOrderItem),
	salesOrderStatusLabels: many(salesOrderStatusLabel),
	salesRefundedAggregateds: many(salesRefundedAggregated),
	salesRefundedAggregatedOrders: many(salesRefundedAggregatedOrder),
	salesShipments: many(salesShipment),
	salesShippingAggregateds: many(salesShippingAggregated),
	salesShippingAggregatedOrders: many(salesShippingAggregatedOrder),
	searchQueries: many(searchQuery),
	searchSynonyms: many(searchSynonyms),
	sitemaps: many(sitemap),
	storeGroup: one(storeGroup, {
		fields: [store.groupId],
		references: [storeGroup.groupId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [store.websiteId],
		references: [storeWebsite.websiteId]
	}),
	taxCalculationRateTitles: many(taxCalculationRateTitle),
	taxOrderAggregatedCreateds: many(taxOrderAggregatedCreated),
	taxOrderAggregatedUpdateds: many(taxOrderAggregatedUpdated),
	translations: many(translation),
	variableValues: many(variableValue),
	wishlistItems: many(wishlistItem),
}));

export const eavAttributeRelations = relations(eavAttribute, ({one, many}) => ({
	catalogCategoryEntityDatetimes: many(catalogCategoryEntityDatetime),
	catalogCategoryEntityDecimals: many(catalogCategoryEntityDecimal),
	catalogCategoryEntityInts: many(catalogCategoryEntityInt),
	catalogCategoryEntityTexts: many(catalogCategoryEntityText),
	catalogCategoryEntityVarchars: many(catalogCategoryEntityVarchar),
	catalogEavAttributes: many(catalogEavAttribute),
	catalogProductEntityDatetimes: many(catalogProductEntityDatetime),
	catalogProductEntityDecimals: many(catalogProductEntityDecimal),
	catalogProductEntityGalleries: many(catalogProductEntityGallery),
	catalogProductEntityInts: many(catalogProductEntityInt),
	catalogProductEntityMediaGalleries: many(catalogProductEntityMediaGallery),
	catalogProductEntityTexts: many(catalogProductEntityText),
	catalogProductEntityVarchars: many(catalogProductEntityVarchar),
	customerAddressEntityDatetimes: many(customerAddressEntityDatetime),
	customerAddressEntityDecimals: many(customerAddressEntityDecimal),
	customerAddressEntityInts: many(customerAddressEntityInt),
	customerAddressEntityTexts: many(customerAddressEntityText),
	customerAddressEntityVarchars: many(customerAddressEntityVarchar),
	customerEavAttributes: many(customerEavAttribute),
	customerEavAttributeWebsites: many(customerEavAttributeWebsite),
	customerEntityDatetimes: many(customerEntityDatetime),
	customerEntityDecimals: many(customerEntityDecimal),
	customerEntityInts: many(customerEntityInt),
	customerEntityTexts: many(customerEntityText),
	customerEntityVarchars: many(customerEntityVarchar),
	customerFormAttributes: many(customerFormAttribute),
	eavEntityType: one(eavEntityType, {
		fields: [eavAttribute.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	eavAttributeLabels: many(eavAttributeLabel),
	eavAttributeOptions: many(eavAttributeOption),
	eavEntityAttributes: many(eavEntityAttribute),
	eavFormElements: many(eavFormElement),
	salesruleProductAttributes: many(salesruleProductAttribute),
	weeeTaxes: many(weeeTax),
}));

export const catalogCategoryEntityRelations = relations(catalogCategoryEntity, ({many}) => ({
	catalogCategoryEntityDatetimes: many(catalogCategoryEntityDatetime),
	catalogCategoryEntityDecimals: many(catalogCategoryEntityDecimal),
	catalogCategoryEntityInts: many(catalogCategoryEntityInt),
	catalogCategoryEntityTexts: many(catalogCategoryEntityText),
	catalogCategoryEntityVarchars: many(catalogCategoryEntityVarchar),
	catalogCategoryProducts: many(catalogCategoryProduct),
	catalogUrlRewriteProductCategories: many(catalogUrlRewriteProductCategory),
}));

export const catalogCategoryEntityDecimalRelations = relations(catalogCategoryEntityDecimal, ({one}) => ({
	store: one(store, {
		fields: [catalogCategoryEntityDecimal.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogCategoryEntityDecimal.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogCategoryEntityDecimal.entityId],
		references: [catalogCategoryEntity.entityId]
	}),
}));

export const catalogCategoryEntityIntRelations = relations(catalogCategoryEntityInt, ({one}) => ({
	store: one(store, {
		fields: [catalogCategoryEntityInt.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogCategoryEntityInt.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogCategoryEntityInt.entityId],
		references: [catalogCategoryEntity.entityId]
	}),
}));

export const catalogCategoryEntityTextRelations = relations(catalogCategoryEntityText, ({one}) => ({
	store: one(store, {
		fields: [catalogCategoryEntityText.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogCategoryEntityText.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogCategoryEntityText.entityId],
		references: [catalogCategoryEntity.entityId]
	}),
}));

export const catalogCategoryEntityVarcharRelations = relations(catalogCategoryEntityVarchar, ({one}) => ({
	store: one(store, {
		fields: [catalogCategoryEntityVarchar.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogCategoryEntityVarchar.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogCategoryEntityVarchar.entityId],
		references: [catalogCategoryEntity.entityId]
	}),
}));

export const catalogCategoryProductRelations = relations(catalogCategoryProduct, ({one}) => ({
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogCategoryProduct.categoryId],
		references: [catalogCategoryEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogCategoryProduct.productId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogCompareItemRelations = relations(catalogCompareItem, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [catalogCompareItem.customerId],
		references: [customerEntity.entityId]
	}),
	catalogCompareList: one(catalogCompareList, {
		fields: [catalogCompareItem.listId],
		references: [catalogCompareList.listId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogCompareItem.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [catalogCompareItem.storeId],
		references: [store.storeId]
	}),
}));

export const customerEntityRelations = relations(customerEntity, ({one, many}) => ({
	catalogCompareItems: many(catalogCompareItem),
	catalogCompareLists: many(catalogCompareList),
	catalogProductFrontendActions: many(catalogProductFrontendAction),
	customerAddressEntities: many(customerAddressEntity),
	store: one(store, {
		fields: [customerEntity.storeId],
		references: [store.storeId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [customerEntity.websiteId],
		references: [storeWebsite.websiteId]
	}),
	customerEntityDatetimes: many(customerEntityDatetime),
	customerEntityDecimals: many(customerEntityDecimal),
	customerEntityInts: many(customerEntityInt),
	customerEntityTexts: many(customerEntityText),
	customerEntityVarchars: many(customerEntityVarchar),
	downloadableLinkPurchaseds: many(downloadableLinkPurchased),
	loginAsCustomerAssistanceAlloweds: many(loginAsCustomerAssistanceAllowed),
	oauthTokens: many(oauthToken),
	paypalBillingAgreements: many(paypalBillingAgreement),
	persistentSessions: many(persistentSession),
	productAlertPrices: many(productAlertPrice),
	productAlertStocks: many(productAlertStock),
	reportComparedProductIndices: many(reportComparedProductIndex),
	reportViewedProductIndices: many(reportViewedProductIndex),
	reviewDetails: many(reviewDetail),
	salesruleCouponUsages: many(salesruleCouponUsage),
	salesruleCustomers: many(salesruleCustomer),
	salesOrders: many(salesOrder),
	vaultPaymentTokens: many(vaultPaymentToken),
	wishlists: many(wishlist),
}));

export const catalogCompareListRelations = relations(catalogCompareList, ({one, many}) => ({
	catalogCompareItems: many(catalogCompareItem),
	customerEntity: one(customerEntity, {
		fields: [catalogCompareList.customerId],
		references: [customerEntity.entityId]
	}),
}));

export const catalogEavAttributeRelations = relations(catalogEavAttribute, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [catalogEavAttribute.attributeId],
		references: [eavAttribute.attributeId]
	}),
}));

export const catalogProductBundleOptionRelations = relations(catalogProductBundleOption, ({one, many}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductBundleOption.parentId],
		references: [catalogProductEntity.entityId]
	}),
	catalogProductBundleOptionValues: many(catalogProductBundleOptionValue),
	catalogProductBundleSelections: many(catalogProductBundleSelection),
}));

export const catalogProductBundleOptionValueRelations = relations(catalogProductBundleOptionValue, ({one}) => ({
	catalogProductBundleOption: one(catalogProductBundleOption, {
		fields: [catalogProductBundleOptionValue.optionId],
		references: [catalogProductBundleOption.optionId]
	}),
}));

export const catalogProductBundlePriceIndexRelations = relations(catalogProductBundlePriceIndex, ({one}) => ({
	customerGroup: one(customerGroup, {
		fields: [catalogProductBundlePriceIndex.customerGroupId],
		references: [customerGroup.customerGroupId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductBundlePriceIndex.entityId],
		references: [catalogProductEntity.entityId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [catalogProductBundlePriceIndex.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const catalogProductBundleSelectionRelations = relations(catalogProductBundleSelection, ({one, many}) => ({
	catalogProductBundleOption: one(catalogProductBundleOption, {
		fields: [catalogProductBundleSelection.optionId],
		references: [catalogProductBundleOption.optionId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductBundleSelection.productId],
		references: [catalogProductEntity.entityId]
	}),
	catalogProductBundleSelectionPrices: many(catalogProductBundleSelectionPrice),
}));

export const catalogProductBundleSelectionPriceRelations = relations(catalogProductBundleSelectionPrice, ({one}) => ({
	storeWebsite: one(storeWebsite, {
		fields: [catalogProductBundleSelectionPrice.websiteId],
		references: [storeWebsite.websiteId]
	}),
	catalogProductBundleSelection: one(catalogProductBundleSelection, {
		fields: [catalogProductBundleSelectionPrice.selectionId],
		references: [catalogProductBundleSelection.selectionId]
	}),
}));

export const catalogProductEntityDatetimeRelations = relations(catalogProductEntityDatetime, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityDatetime.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityDatetime.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityDatetime.entityId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductEntityDecimalRelations = relations(catalogProductEntityDecimal, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityDecimal.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityDecimal.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityDecimal.entityId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductEntityGalleryRelations = relations(catalogProductEntityGallery, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityGallery.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityGallery.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityGallery.entityId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductEntityIntRelations = relations(catalogProductEntityInt, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityInt.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityInt.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityInt.entityId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductEntityMediaGalleryRelations = relations(catalogProductEntityMediaGallery, ({one, many}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityMediaGallery.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntityMediaGalleryValues: many(catalogProductEntityMediaGalleryValue),
	catalogProductEntityMediaGalleryValueToEntities: many(catalogProductEntityMediaGalleryValueToEntity),
	catalogProductEntityMediaGalleryValueVideos: many(catalogProductEntityMediaGalleryValueVideo),
}));

export const catalogProductEntityMediaGalleryValueRelations = relations(catalogProductEntityMediaGalleryValue, ({one}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityMediaGalleryValue.entityId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [catalogProductEntityMediaGalleryValue.storeId],
		references: [store.storeId]
	}),
	catalogProductEntityMediaGallery: one(catalogProductEntityMediaGallery, {
		fields: [catalogProductEntityMediaGalleryValue.valueId],
		references: [catalogProductEntityMediaGallery.valueId]
	}),
}));

export const catalogProductEntityMediaGalleryValueToEntityRelations = relations(catalogProductEntityMediaGalleryValueToEntity, ({one}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityMediaGalleryValueToEntity.entityId],
		references: [catalogProductEntity.entityId]
	}),
	catalogProductEntityMediaGallery: one(catalogProductEntityMediaGallery, {
		fields: [catalogProductEntityMediaGalleryValueToEntity.valueId],
		references: [catalogProductEntityMediaGallery.valueId]
	}),
}));

export const catalogProductEntityMediaGalleryValueVideoRelations = relations(catalogProductEntityMediaGalleryValueVideo, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityMediaGalleryValueVideo.storeId],
		references: [store.storeId]
	}),
	catalogProductEntityMediaGallery: one(catalogProductEntityMediaGallery, {
		fields: [catalogProductEntityMediaGalleryValueVideo.valueId],
		references: [catalogProductEntityMediaGallery.valueId]
	}),
}));

export const catalogProductEntityTextRelations = relations(catalogProductEntityText, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityText.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityText.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityText.entityId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductEntityTierPriceRelations = relations(catalogProductEntityTierPrice, ({one}) => ({
	customerGroup: one(customerGroup, {
		fields: [catalogProductEntityTierPrice.customerGroupId],
		references: [customerGroup.customerGroupId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityTierPrice.entityId],
		references: [catalogProductEntity.entityId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [catalogProductEntityTierPrice.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const catalogProductEntityVarcharRelations = relations(catalogProductEntityVarchar, ({one}) => ({
	store: one(store, {
		fields: [catalogProductEntityVarchar.storeId],
		references: [store.storeId]
	}),
	eavAttribute: one(eavAttribute, {
		fields: [catalogProductEntityVarchar.attributeId],
		references: [eavAttribute.attributeId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductEntityVarchar.entityId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductFrontendActionRelations = relations(catalogProductFrontendAction, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [catalogProductFrontendAction.customerId],
		references: [customerEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductFrontendAction.productId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogProductIndexTierPriceRelations = relations(catalogProductIndexTierPrice, ({one}) => ({
	customerGroup: one(customerGroup, {
		fields: [catalogProductIndexTierPrice.customerGroupId],
		references: [customerGroup.customerGroupId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductIndexTierPrice.entityId],
		references: [catalogProductEntity.entityId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [catalogProductIndexTierPrice.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const catalogProductIndexWebsiteRelations = relations(catalogProductIndexWebsite, ({one}) => ({
	storeWebsite: one(storeWebsite, {
		fields: [catalogProductIndexWebsite.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const catalogProductLinkRelations = relations(catalogProductLink, ({one, many}) => ({
	catalogProductEntity_productId: one(catalogProductEntity, {
		fields: [catalogProductLink.productId],
		references: [catalogProductEntity.entityId],
		relationName: "catalogProductLink_productId_catalogProductEntity_entityId"
	}),
	catalogProductEntity_linkedProductId: one(catalogProductEntity, {
		fields: [catalogProductLink.linkedProductId],
		references: [catalogProductEntity.entityId],
		relationName: "catalogProductLink_linkedProductId_catalogProductEntity_entityId"
	}),
	catalogProductLinkType: one(catalogProductLinkType, {
		fields: [catalogProductLink.linkTypeId],
		references: [catalogProductLinkType.linkTypeId]
	}),
	catalogProductLinkAttributeDecimals: many(catalogProductLinkAttributeDecimal),
	catalogProductLinkAttributeInts: many(catalogProductLinkAttributeInt),
	catalogProductLinkAttributeVarchars: many(catalogProductLinkAttributeVarchar),
}));

export const catalogProductLinkTypeRelations = relations(catalogProductLinkType, ({many}) => ({
	catalogProductLinks: many(catalogProductLink),
	catalogProductLinkAttributes: many(catalogProductLinkAttribute),
}));

export const catalogProductLinkAttributeRelations = relations(catalogProductLinkAttribute, ({one, many}) => ({
	catalogProductLinkType: one(catalogProductLinkType, {
		fields: [catalogProductLinkAttribute.linkTypeId],
		references: [catalogProductLinkType.linkTypeId]
	}),
	catalogProductLinkAttributeDecimals: many(catalogProductLinkAttributeDecimal),
	catalogProductLinkAttributeInts: many(catalogProductLinkAttributeInt),
	catalogProductLinkAttributeVarchars: many(catalogProductLinkAttributeVarchar),
}));

export const catalogProductLinkAttributeDecimalRelations = relations(catalogProductLinkAttributeDecimal, ({one}) => ({
	catalogProductLink: one(catalogProductLink, {
		fields: [catalogProductLinkAttributeDecimal.linkId],
		references: [catalogProductLink.linkId]
	}),
	catalogProductLinkAttribute: one(catalogProductLinkAttribute, {
		fields: [catalogProductLinkAttributeDecimal.productLinkAttributeId],
		references: [catalogProductLinkAttribute.productLinkAttributeId]
	}),
}));

export const catalogProductLinkAttributeIntRelations = relations(catalogProductLinkAttributeInt, ({one}) => ({
	catalogProductLink: one(catalogProductLink, {
		fields: [catalogProductLinkAttributeInt.linkId],
		references: [catalogProductLink.linkId]
	}),
	catalogProductLinkAttribute: one(catalogProductLinkAttribute, {
		fields: [catalogProductLinkAttributeInt.productLinkAttributeId],
		references: [catalogProductLinkAttribute.productLinkAttributeId]
	}),
}));

export const catalogProductLinkAttributeVarcharRelations = relations(catalogProductLinkAttributeVarchar, ({one}) => ({
	catalogProductLink: one(catalogProductLink, {
		fields: [catalogProductLinkAttributeVarchar.linkId],
		references: [catalogProductLink.linkId]
	}),
	catalogProductLinkAttribute: one(catalogProductLinkAttribute, {
		fields: [catalogProductLinkAttributeVarchar.productLinkAttributeId],
		references: [catalogProductLinkAttribute.productLinkAttributeId]
	}),
}));

export const catalogProductOptionRelations = relations(catalogProductOption, ({one, many}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductOption.productId],
		references: [catalogProductEntity.entityId]
	}),
	catalogProductOptionPrices: many(catalogProductOptionPrice),
	catalogProductOptionTitles: many(catalogProductOptionTitle),
	catalogProductOptionTypeValues: many(catalogProductOptionTypeValue),
}));

export const catalogProductOptionPriceRelations = relations(catalogProductOptionPrice, ({one}) => ({
	store: one(store, {
		fields: [catalogProductOptionPrice.storeId],
		references: [store.storeId]
	}),
	catalogProductOption: one(catalogProductOption, {
		fields: [catalogProductOptionPrice.optionId],
		references: [catalogProductOption.optionId]
	}),
}));

export const catalogProductOptionTitleRelations = relations(catalogProductOptionTitle, ({one}) => ({
	store: one(store, {
		fields: [catalogProductOptionTitle.storeId],
		references: [store.storeId]
	}),
	catalogProductOption: one(catalogProductOption, {
		fields: [catalogProductOptionTitle.optionId],
		references: [catalogProductOption.optionId]
	}),
}));

export const catalogProductOptionTypePriceRelations = relations(catalogProductOptionTypePrice, ({one}) => ({
	store: one(store, {
		fields: [catalogProductOptionTypePrice.storeId],
		references: [store.storeId]
	}),
	catalogProductOptionTypeValue: one(catalogProductOptionTypeValue, {
		fields: [catalogProductOptionTypePrice.optionTypeId],
		references: [catalogProductOptionTypeValue.optionTypeId]
	}),
}));

export const catalogProductOptionTypeValueRelations = relations(catalogProductOptionTypeValue, ({one, many}) => ({
	catalogProductOptionTypePrices: many(catalogProductOptionTypePrice),
	catalogProductOptionTypeTitles: many(catalogProductOptionTypeTitle),
	catalogProductOption: one(catalogProductOption, {
		fields: [catalogProductOptionTypeValue.optionId],
		references: [catalogProductOption.optionId]
	}),
}));

export const catalogProductOptionTypeTitleRelations = relations(catalogProductOptionTypeTitle, ({one}) => ({
	store: one(store, {
		fields: [catalogProductOptionTypeTitle.storeId],
		references: [store.storeId]
	}),
	catalogProductOptionTypeValue: one(catalogProductOptionTypeValue, {
		fields: [catalogProductOptionTypeTitle.optionTypeId],
		references: [catalogProductOptionTypeValue.optionTypeId]
	}),
}));

export const catalogProductRelationRelations = relations(catalogProductRelation, ({one}) => ({
	catalogProductEntity_childId: one(catalogProductEntity, {
		fields: [catalogProductRelation.childId],
		references: [catalogProductEntity.entityId],
		relationName: "catalogProductRelation_childId_catalogProductEntity_entityId"
	}),
	catalogProductEntity_parentId: one(catalogProductEntity, {
		fields: [catalogProductRelation.parentId],
		references: [catalogProductEntity.entityId],
		relationName: "catalogProductRelation_parentId_catalogProductEntity_entityId"
	}),
}));

export const catalogProductSuperAttributeRelations = relations(catalogProductSuperAttribute, ({one, many}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductSuperAttribute.productId],
		references: [catalogProductEntity.entityId]
	}),
	catalogProductSuperAttributeLabels: many(catalogProductSuperAttributeLabel),
}));

export const catalogProductSuperAttributeLabelRelations = relations(catalogProductSuperAttributeLabel, ({one}) => ({
	store: one(store, {
		fields: [catalogProductSuperAttributeLabel.storeId],
		references: [store.storeId]
	}),
	catalogProductSuperAttribute: one(catalogProductSuperAttribute, {
		fields: [catalogProductSuperAttributeLabel.productSuperAttributeId],
		references: [catalogProductSuperAttribute.productSuperAttributeId]
	}),
}));

export const catalogProductSuperLinkRelations = relations(catalogProductSuperLink, ({one}) => ({
	catalogProductEntity_parentId: one(catalogProductEntity, {
		fields: [catalogProductSuperLink.parentId],
		references: [catalogProductEntity.entityId],
		relationName: "catalogProductSuperLink_parentId_catalogProductEntity_entityId"
	}),
	catalogProductEntity_productId: one(catalogProductEntity, {
		fields: [catalogProductSuperLink.productId],
		references: [catalogProductEntity.entityId],
		relationName: "catalogProductSuperLink_productId_catalogProductEntity_entityId"
	}),
}));

export const catalogProductWebsiteRelations = relations(catalogProductWebsite, ({one}) => ({
	storeWebsite: one(storeWebsite, {
		fields: [catalogProductWebsite.websiteId],
		references: [storeWebsite.websiteId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogProductWebsite.productId],
		references: [catalogProductEntity.entityId]
	}),
}));

export const catalogUrlRewriteProductCategoryRelations = relations(catalogUrlRewriteProductCategory, ({one}) => ({
	catalogCategoryEntity: one(catalogCategoryEntity, {
		fields: [catalogUrlRewriteProductCategory.categoryId],
		references: [catalogCategoryEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [catalogUrlRewriteProductCategory.productId],
		references: [catalogProductEntity.entityId]
	}),
	urlRewrite: one(urlRewrite, {
		fields: [catalogUrlRewriteProductCategory.urlRewriteId],
		references: [urlRewrite.urlRewriteId]
	}),
}));

export const urlRewriteRelations = relations(urlRewrite, ({many}) => ({
	catalogUrlRewriteProductCategories: many(catalogUrlRewriteProductCategory),
}));

export const checkoutAgreementStoreRelations = relations(checkoutAgreementStore, ({one}) => ({
	store: one(store, {
		fields: [checkoutAgreementStore.storeId],
		references: [store.storeId]
	}),
	checkoutAgreement: one(checkoutAgreement, {
		fields: [checkoutAgreementStore.agreementId],
		references: [checkoutAgreement.agreementId]
	}),
}));

export const checkoutAgreementRelations = relations(checkoutAgreement, ({many}) => ({
	checkoutAgreementStores: many(checkoutAgreementStore),
}));

export const cmsBlockStoreRelations = relations(cmsBlockStore, ({one}) => ({
	cmsBlock: one(cmsBlock, {
		fields: [cmsBlockStore.blockId],
		references: [cmsBlock.blockId]
	}),
	store: one(store, {
		fields: [cmsBlockStore.storeId],
		references: [store.storeId]
	}),
}));

export const cmsBlockRelations = relations(cmsBlock, ({many}) => ({
	cmsBlockStores: many(cmsBlockStore),
}));

export const cmsPageStoreRelations = relations(cmsPageStore, ({one}) => ({
	cmsPage: one(cmsPage, {
		fields: [cmsPageStore.pageId],
		references: [cmsPage.pageId]
	}),
	store: one(store, {
		fields: [cmsPageStore.storeId],
		references: [store.storeId]
	}),
}));

export const cmsPageRelations = relations(cmsPage, ({many}) => ({
	cmsPageStores: many(cmsPageStore),
}));

export const customerAddressEntityRelations = relations(customerAddressEntity, ({one, many}) => ({
	customerEntity: one(customerEntity, {
		fields: [customerAddressEntity.parentId],
		references: [customerEntity.entityId]
	}),
	customerAddressEntityDatetimes: many(customerAddressEntityDatetime),
	customerAddressEntityDecimals: many(customerAddressEntityDecimal),
	customerAddressEntityInts: many(customerAddressEntityInt),
	customerAddressEntityTexts: many(customerAddressEntityText),
	customerAddressEntityVarchars: many(customerAddressEntityVarchar),
}));

export const customerAddressEntityDatetimeRelations = relations(customerAddressEntityDatetime, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerAddressEntityDatetime.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerAddressEntity: one(customerAddressEntity, {
		fields: [customerAddressEntityDatetime.entityId],
		references: [customerAddressEntity.entityId]
	}),
}));

export const customerAddressEntityDecimalRelations = relations(customerAddressEntityDecimal, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerAddressEntityDecimal.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerAddressEntity: one(customerAddressEntity, {
		fields: [customerAddressEntityDecimal.entityId],
		references: [customerAddressEntity.entityId]
	}),
}));

export const customerAddressEntityIntRelations = relations(customerAddressEntityInt, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerAddressEntityInt.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerAddressEntity: one(customerAddressEntity, {
		fields: [customerAddressEntityInt.entityId],
		references: [customerAddressEntity.entityId]
	}),
}));

export const customerAddressEntityTextRelations = relations(customerAddressEntityText, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerAddressEntityText.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerAddressEntity: one(customerAddressEntity, {
		fields: [customerAddressEntityText.entityId],
		references: [customerAddressEntity.entityId]
	}),
}));

export const customerAddressEntityVarcharRelations = relations(customerAddressEntityVarchar, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerAddressEntityVarchar.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerAddressEntity: one(customerAddressEntity, {
		fields: [customerAddressEntityVarchar.entityId],
		references: [customerAddressEntity.entityId]
	}),
}));

export const customerEavAttributeRelations = relations(customerEavAttribute, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEavAttribute.attributeId],
		references: [eavAttribute.attributeId]
	}),
}));

export const customerEavAttributeWebsiteRelations = relations(customerEavAttributeWebsite, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEavAttributeWebsite.attributeId],
		references: [eavAttribute.attributeId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [customerEavAttributeWebsite.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const customerEntityDatetimeRelations = relations(customerEntityDatetime, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEntityDatetime.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerEntity: one(customerEntity, {
		fields: [customerEntityDatetime.entityId],
		references: [customerEntity.entityId]
	}),
}));

export const customerEntityDecimalRelations = relations(customerEntityDecimal, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEntityDecimal.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerEntity: one(customerEntity, {
		fields: [customerEntityDecimal.entityId],
		references: [customerEntity.entityId]
	}),
}));

export const customerEntityIntRelations = relations(customerEntityInt, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEntityInt.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerEntity: one(customerEntity, {
		fields: [customerEntityInt.entityId],
		references: [customerEntity.entityId]
	}),
}));

export const customerEntityTextRelations = relations(customerEntityText, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEntityText.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerEntity: one(customerEntity, {
		fields: [customerEntityText.entityId],
		references: [customerEntity.entityId]
	}),
}));

export const customerEntityVarcharRelations = relations(customerEntityVarchar, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerEntityVarchar.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerEntity: one(customerEntity, {
		fields: [customerEntityVarchar.entityId],
		references: [customerEntity.entityId]
	}),
}));

export const customerFormAttributeRelations = relations(customerFormAttribute, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [customerFormAttribute.attributeId],
		references: [eavAttribute.attributeId]
	}),
}));

export const designChangeRelations = relations(designChange, ({one}) => ({
	store: one(store, {
		fields: [designChange.storeId],
		references: [store.storeId]
	}),
}));

export const directoryCountryRegionNameRelations = relations(directoryCountryRegionName, ({one}) => ({
	directoryCountryRegion: one(directoryCountryRegion, {
		fields: [directoryCountryRegionName.regionId],
		references: [directoryCountryRegion.regionId]
	}),
}));

export const directoryCountryRegionRelations = relations(directoryCountryRegion, ({many}) => ({
	directoryCountryRegionNames: many(directoryCountryRegionName),
}));

export const downloadableLinkRelations = relations(downloadableLink, ({one, many}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [downloadableLink.productId],
		references: [catalogProductEntity.entityId]
	}),
	downloadableLinkPrices: many(downloadableLinkPrice),
	downloadableLinkTitles: many(downloadableLinkTitle),
}));

export const downloadableLinkPriceRelations = relations(downloadableLinkPrice, ({one}) => ({
	downloadableLink: one(downloadableLink, {
		fields: [downloadableLinkPrice.linkId],
		references: [downloadableLink.linkId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [downloadableLinkPrice.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const downloadableLinkPurchasedRelations = relations(downloadableLinkPurchased, ({one, many}) => ({
	customerEntity: one(customerEntity, {
		fields: [downloadableLinkPurchased.customerId],
		references: [customerEntity.entityId]
	}),
	salesOrder: one(salesOrder, {
		fields: [downloadableLinkPurchased.orderId],
		references: [salesOrder.entityId]
	}),
	downloadableLinkPurchasedItems: many(downloadableLinkPurchasedItem),
}));

export const downloadableLinkPurchasedItemRelations = relations(downloadableLinkPurchasedItem, ({one}) => ({
	salesOrderItem: one(salesOrderItem, {
		fields: [downloadableLinkPurchasedItem.orderItemId],
		references: [salesOrderItem.itemId]
	}),
	downloadableLinkPurchased: one(downloadableLinkPurchased, {
		fields: [downloadableLinkPurchasedItem.purchasedId],
		references: [downloadableLinkPurchased.purchasedId]
	}),
}));

export const salesOrderItemRelations = relations(salesOrderItem, ({one, many}) => ({
	downloadableLinkPurchasedItems: many(downloadableLinkPurchasedItem),
	salesOrder: one(salesOrder, {
		fields: [salesOrderItem.orderId],
		references: [salesOrder.entityId]
	}),
	store: one(store, {
		fields: [salesOrderItem.storeId],
		references: [store.storeId]
	}),
	salesOrderTaxItems_associatedItemId: many(salesOrderTaxItem, {
		relationName: "salesOrderTaxItem_associatedItemId_salesOrderItem_itemId"
	}),
	salesOrderTaxItems_itemId: many(salesOrderTaxItem, {
		relationName: "salesOrderTaxItem_itemId_salesOrderItem_itemId"
	}),
}));

export const downloadableLinkTitleRelations = relations(downloadableLinkTitle, ({one}) => ({
	downloadableLink: one(downloadableLink, {
		fields: [downloadableLinkTitle.linkId],
		references: [downloadableLink.linkId]
	}),
	store: one(store, {
		fields: [downloadableLinkTitle.storeId],
		references: [store.storeId]
	}),
}));

export const downloadableSampleRelations = relations(downloadableSample, ({one, many}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [downloadableSample.productId],
		references: [catalogProductEntity.entityId]
	}),
	downloadableSampleTitles: many(downloadableSampleTitle),
}));

export const downloadableSampleTitleRelations = relations(downloadableSampleTitle, ({one}) => ({
	downloadableSample: one(downloadableSample, {
		fields: [downloadableSampleTitle.sampleId],
		references: [downloadableSample.sampleId]
	}),
	store: one(store, {
		fields: [downloadableSampleTitle.storeId],
		references: [store.storeId]
	}),
}));

export const eavEntityTypeRelations = relations(eavEntityType, ({many}) => ({
	eavAttributes: many(eavAttribute),
	eavAttributeSets: many(eavAttributeSet),
	eavEntities: many(eavEntity),
	eavEntityDatetimes: many(eavEntityDatetime),
	eavEntityDecimals: many(eavEntityDecimal),
	eavEntityInts: many(eavEntityInt),
	eavEntityStores: many(eavEntityStore),
	eavEntityTexts: many(eavEntityText),
	eavEntityVarchars: many(eavEntityVarchar),
	eavFormTypeEntities: many(eavFormTypeEntity),
}));

export const eavAttributeGroupRelations = relations(eavAttributeGroup, ({one, many}) => ({
	eavAttributeSet: one(eavAttributeSet, {
		fields: [eavAttributeGroup.attributeSetId],
		references: [eavAttributeSet.attributeSetId]
	}),
	eavEntityAttributes: many(eavEntityAttribute),
}));

export const eavAttributeSetRelations = relations(eavAttributeSet, ({one, many}) => ({
	eavAttributeGroups: many(eavAttributeGroup),
	eavEntityType: one(eavEntityType, {
		fields: [eavAttributeSet.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
}));

export const eavAttributeLabelRelations = relations(eavAttributeLabel, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [eavAttributeLabel.attributeId],
		references: [eavAttribute.attributeId]
	}),
	store: one(store, {
		fields: [eavAttributeLabel.storeId],
		references: [store.storeId]
	}),
}));

export const eavAttributeOptionRelations = relations(eavAttributeOption, ({one, many}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [eavAttributeOption.attributeId],
		references: [eavAttribute.attributeId]
	}),
	eavAttributeOptionSwatches: many(eavAttributeOptionSwatch),
	eavAttributeOptionValues: many(eavAttributeOptionValue),
}));

export const eavAttributeOptionSwatchRelations = relations(eavAttributeOptionSwatch, ({one}) => ({
	store: one(store, {
		fields: [eavAttributeOptionSwatch.storeId],
		references: [store.storeId]
	}),
	eavAttributeOption: one(eavAttributeOption, {
		fields: [eavAttributeOptionSwatch.optionId],
		references: [eavAttributeOption.optionId]
	}),
}));

export const eavAttributeOptionValueRelations = relations(eavAttributeOptionValue, ({one}) => ({
	store: one(store, {
		fields: [eavAttributeOptionValue.storeId],
		references: [store.storeId]
	}),
	eavAttributeOption: one(eavAttributeOption, {
		fields: [eavAttributeOptionValue.optionId],
		references: [eavAttributeOption.optionId]
	}),
}));

export const eavEntityRelations = relations(eavEntity, ({one, many}) => ({
	eavEntityType: one(eavEntityType, {
		fields: [eavEntity.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	store: one(store, {
		fields: [eavEntity.storeId],
		references: [store.storeId]
	}),
	eavEntityDatetimes: many(eavEntityDatetime),
	eavEntityDecimals: many(eavEntityDecimal),
	eavEntityInts: many(eavEntityInt),
	eavEntityTexts: many(eavEntityText),
	eavEntityVarchars: many(eavEntityVarchar),
}));

export const eavEntityAttributeRelations = relations(eavEntityAttribute, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [eavEntityAttribute.attributeId],
		references: [eavAttribute.attributeId]
	}),
	eavAttributeGroup: one(eavAttributeGroup, {
		fields: [eavEntityAttribute.attributeGroupId],
		references: [eavAttributeGroup.attributeGroupId]
	}),
}));

export const eavEntityDatetimeRelations = relations(eavEntityDatetime, ({one}) => ({
	eavEntity: one(eavEntity, {
		fields: [eavEntityDatetime.entityId],
		references: [eavEntity.entityId]
	}),
	store: one(store, {
		fields: [eavEntityDatetime.storeId],
		references: [store.storeId]
	}),
	eavEntityType: one(eavEntityType, {
		fields: [eavEntityDatetime.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
}));

export const eavEntityDecimalRelations = relations(eavEntityDecimal, ({one}) => ({
	eavEntity: one(eavEntity, {
		fields: [eavEntityDecimal.entityId],
		references: [eavEntity.entityId]
	}),
	eavEntityType: one(eavEntityType, {
		fields: [eavEntityDecimal.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	store: one(store, {
		fields: [eavEntityDecimal.storeId],
		references: [store.storeId]
	}),
}));

export const eavEntityIntRelations = relations(eavEntityInt, ({one}) => ({
	eavEntity: one(eavEntity, {
		fields: [eavEntityInt.entityId],
		references: [eavEntity.entityId]
	}),
	eavEntityType: one(eavEntityType, {
		fields: [eavEntityInt.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	store: one(store, {
		fields: [eavEntityInt.storeId],
		references: [store.storeId]
	}),
}));

export const eavEntityStoreRelations = relations(eavEntityStore, ({one}) => ({
	eavEntityType: one(eavEntityType, {
		fields: [eavEntityStore.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	store: one(store, {
		fields: [eavEntityStore.storeId],
		references: [store.storeId]
	}),
}));

export const eavEntityTextRelations = relations(eavEntityText, ({one}) => ({
	eavEntity: one(eavEntity, {
		fields: [eavEntityText.entityId],
		references: [eavEntity.entityId]
	}),
	eavEntityType: one(eavEntityType, {
		fields: [eavEntityText.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	store: one(store, {
		fields: [eavEntityText.storeId],
		references: [store.storeId]
	}),
}));

export const eavEntityVarcharRelations = relations(eavEntityVarchar, ({one}) => ({
	eavEntity: one(eavEntity, {
		fields: [eavEntityVarchar.entityId],
		references: [eavEntity.entityId]
	}),
	eavEntityType: one(eavEntityType, {
		fields: [eavEntityVarchar.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
	store: one(store, {
		fields: [eavEntityVarchar.storeId],
		references: [store.storeId]
	}),
}));

export const eavFormElementRelations = relations(eavFormElement, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [eavFormElement.attributeId],
		references: [eavAttribute.attributeId]
	}),
	eavFormFieldset: one(eavFormFieldset, {
		fields: [eavFormElement.fieldsetId],
		references: [eavFormFieldset.fieldsetId]
	}),
	eavFormType: one(eavFormType, {
		fields: [eavFormElement.typeId],
		references: [eavFormType.typeId]
	}),
}));

export const eavFormFieldsetRelations = relations(eavFormFieldset, ({one, many}) => ({
	eavFormElements: many(eavFormElement),
	eavFormType: one(eavFormType, {
		fields: [eavFormFieldset.typeId],
		references: [eavFormType.typeId]
	}),
	eavFormFieldsetLabels: many(eavFormFieldsetLabel),
}));

export const eavFormTypeRelations = relations(eavFormType, ({one, many}) => ({
	eavFormElements: many(eavFormElement),
	eavFormFieldsets: many(eavFormFieldset),
	store: one(store, {
		fields: [eavFormType.storeId],
		references: [store.storeId]
	}),
	eavFormTypeEntities: many(eavFormTypeEntity),
}));

export const eavFormFieldsetLabelRelations = relations(eavFormFieldsetLabel, ({one}) => ({
	store: one(store, {
		fields: [eavFormFieldsetLabel.storeId],
		references: [store.storeId]
	}),
	eavFormFieldset: one(eavFormFieldset, {
		fields: [eavFormFieldsetLabel.fieldsetId],
		references: [eavFormFieldset.fieldsetId]
	}),
}));

export const eavFormTypeEntityRelations = relations(eavFormTypeEntity, ({one}) => ({
	eavFormType: one(eavFormType, {
		fields: [eavFormTypeEntity.typeId],
		references: [eavFormType.typeId]
	}),
	eavEntityType: one(eavEntityType, {
		fields: [eavFormTypeEntity.entityTypeId],
		references: [eavEntityType.entityTypeId]
	}),
}));

export const googleoptimizerCodeRelations = relations(googleoptimizerCode, ({one}) => ({
	store: one(store, {
		fields: [googleoptimizerCode.storeId],
		references: [store.storeId]
	}),
}));

export const integrationRelations = relations(integration, ({one}) => ({
	oauthConsumer: one(oauthConsumer, {
		fields: [integration.consumerId],
		references: [oauthConsumer.entityId]
	}),
}));

export const oauthConsumerRelations = relations(oauthConsumer, ({many}) => ({
	integrations: many(integration),
	oauthNonces: many(oauthNonce),
	oauthTokens: many(oauthToken),
}));

export const inventoryOrderNotificationRelations = relations(inventoryOrderNotification, ({one}) => ({
	salesOrder: one(salesOrder, {
		fields: [inventoryOrderNotification.orderId],
		references: [salesOrder.entityId]
	}),
}));

export const inventoryPickupLocationOrderRelations = relations(inventoryPickupLocationOrder, ({one}) => ({
	salesOrder: one(salesOrder, {
		fields: [inventoryPickupLocationOrder.orderId],
		references: [salesOrder.entityId]
	}),
}));

export const inventoryPickupLocationQuoteAddressRelations = relations(inventoryPickupLocationQuoteAddress, ({one}) => ({
	quoteAddress: one(quoteAddress, {
		fields: [inventoryPickupLocationQuoteAddress.addressId],
		references: [quoteAddress.addressId]
	}),
}));

export const quoteAddressRelations = relations(quoteAddress, ({one, many}) => ({
	inventoryPickupLocationQuoteAddresses: many(inventoryPickupLocationQuoteAddress),
	quote: one(quote, {
		fields: [quoteAddress.quoteId],
		references: [quote.entityId]
	}),
	quoteAddressItems: many(quoteAddressItem),
	quoteShippingRates: many(quoteShippingRate),
}));

export const inventorySourceCarrierLinkRelations = relations(inventorySourceCarrierLink, ({one}) => ({
	inventorySource: one(inventorySource, {
		fields: [inventorySourceCarrierLink.sourceCode],
		references: [inventorySource.sourceCode]
	}),
}));

export const inventorySourceRelations = relations(inventorySource, ({many}) => ({
	inventorySourceCarrierLinks: many(inventorySourceCarrierLink),
	inventorySourceItems: many(inventorySourceItem),
	inventorySourceStockLinks: many(inventorySourceStockLink),
}));

export const inventorySourceItemRelations = relations(inventorySourceItem, ({one}) => ({
	inventorySource: one(inventorySource, {
		fields: [inventorySourceItem.sourceCode],
		references: [inventorySource.sourceCode]
	}),
}));

export const inventorySourceStockLinkRelations = relations(inventorySourceStockLink, ({one}) => ({
	inventoryStock: one(inventoryStock, {
		fields: [inventorySourceStockLink.stockId],
		references: [inventoryStock.stockId]
	}),
	inventorySource: one(inventorySource, {
		fields: [inventorySourceStockLink.sourceCode],
		references: [inventorySource.sourceCode]
	}),
}));

export const inventoryStockRelations = relations(inventoryStock, ({many}) => ({
	inventorySourceStockLinks: many(inventorySourceStockLink),
	inventoryStockSalesChannels: many(inventoryStockSalesChannel),
}));

export const inventoryStockSalesChannelRelations = relations(inventoryStockSalesChannel, ({one}) => ({
	inventoryStock: one(inventoryStock, {
		fields: [inventoryStockSalesChannel.stockId],
		references: [inventoryStock.stockId]
	}),
}));

export const layoutLinkRelations = relations(layoutLink, ({one}) => ({
	layoutUpdate: one(layoutUpdate, {
		fields: [layoutLink.layoutUpdateId],
		references: [layoutUpdate.layoutUpdateId]
	}),
	store: one(store, {
		fields: [layoutLink.storeId],
		references: [store.storeId]
	}),
	theme: one(theme, {
		fields: [layoutLink.themeId],
		references: [theme.themeId]
	}),
}));

export const layoutUpdateRelations = relations(layoutUpdate, ({many}) => ({
	layoutLinks: many(layoutLink),
	widgetInstancePageLayouts: many(widgetInstancePageLayout),
}));

export const themeRelations = relations(theme, ({many}) => ({
	layoutLinks: many(layoutLink),
	themeFiles: many(themeFile),
	widgetInstances: many(widgetInstance),
}));

export const loginAsCustomerAssistanceAllowedRelations = relations(loginAsCustomerAssistanceAllowed, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [loginAsCustomerAssistanceAllowed.customerId],
		references: [customerEntity.entityId]
	}),
}));

export const magentoAcknowledgedBulkRelations = relations(magentoAcknowledgedBulk, ({one}) => ({
	magentoBulk: one(magentoBulk, {
		fields: [magentoAcknowledgedBulk.bulkUuid],
		references: [magentoBulk.uuid]
	}),
}));

export const magentoBulkRelations = relations(magentoBulk, ({many}) => ({
	magentoAcknowledgedBulks: many(magentoAcknowledgedBulk),
	magentoOperations: many(magentoOperation),
}));

export const magentoOperationRelations = relations(magentoOperation, ({one}) => ({
	magentoBulk: one(magentoBulk, {
		fields: [magentoOperation.bulkUuid],
		references: [magentoBulk.uuid]
	}),
}));

export const mediaGalleryAssetKeywordRelations = relations(mediaGalleryAssetKeyword, ({one}) => ({
	mediaGalleryAsset: one(mediaGalleryAsset, {
		fields: [mediaGalleryAssetKeyword.assetId],
		references: [mediaGalleryAsset.id]
	}),
	mediaGalleryKeyword: one(mediaGalleryKeyword, {
		fields: [mediaGalleryAssetKeyword.keywordId],
		references: [mediaGalleryKeyword.id]
	}),
}));

export const mediaGalleryKeywordRelations = relations(mediaGalleryKeyword, ({many}) => ({
	mediaGalleryAssetKeywords: many(mediaGalleryAssetKeyword),
}));

export const newsletterProblemRelations = relations(newsletterProblem, ({one}) => ({
	newsletterQueue: one(newsletterQueue, {
		fields: [newsletterProblem.queueId],
		references: [newsletterQueue.queueId]
	}),
	newsletterSubscriber: one(newsletterSubscriber, {
		fields: [newsletterProblem.subscriberId],
		references: [newsletterSubscriber.subscriberId]
	}),
}));

export const newsletterQueueRelations = relations(newsletterQueue, ({one, many}) => ({
	newsletterProblems: many(newsletterProblem),
	newsletterTemplate: one(newsletterTemplate, {
		fields: [newsletterQueue.templateId],
		references: [newsletterTemplate.templateId]
	}),
	newsletterQueueLinks: many(newsletterQueueLink),
	newsletterQueueStoreLinks: many(newsletterQueueStoreLink),
}));

export const newsletterSubscriberRelations = relations(newsletterSubscriber, ({one, many}) => ({
	newsletterProblems: many(newsletterProblem),
	newsletterQueueLinks: many(newsletterQueueLink),
	store: one(store, {
		fields: [newsletterSubscriber.storeId],
		references: [store.storeId]
	}),
}));

export const newsletterTemplateRelations = relations(newsletterTemplate, ({many}) => ({
	newsletterQueues: many(newsletterQueue),
}));

export const newsletterQueueLinkRelations = relations(newsletterQueueLink, ({one}) => ({
	newsletterQueue: one(newsletterQueue, {
		fields: [newsletterQueueLink.queueId],
		references: [newsletterQueue.queueId]
	}),
	newsletterSubscriber: one(newsletterSubscriber, {
		fields: [newsletterQueueLink.subscriberId],
		references: [newsletterSubscriber.subscriberId]
	}),
}));

export const newsletterQueueStoreLinkRelations = relations(newsletterQueueStoreLink, ({one}) => ({
	newsletterQueue: one(newsletterQueue, {
		fields: [newsletterQueueStoreLink.queueId],
		references: [newsletterQueue.queueId]
	}),
	store: one(store, {
		fields: [newsletterQueueStoreLink.storeId],
		references: [store.storeId]
	}),
}));

export const oauthNonceRelations = relations(oauthNonce, ({one}) => ({
	oauthConsumer: one(oauthConsumer, {
		fields: [oauthNonce.consumerId],
		references: [oauthConsumer.entityId]
	}),
}));

export const oauthTokenRelations = relations(oauthToken, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [oauthToken.adminId],
		references: [adminUser.userId]
	}),
	oauthConsumer: one(oauthConsumer, {
		fields: [oauthToken.consumerId],
		references: [oauthConsumer.entityId]
	}),
	customerEntity: one(customerEntity, {
		fields: [oauthToken.customerId],
		references: [customerEntity.entityId]
	}),
}));

export const paypalBillingAgreementRelations = relations(paypalBillingAgreement, ({one, many}) => ({
	customerEntity: one(customerEntity, {
		fields: [paypalBillingAgreement.customerId],
		references: [customerEntity.entityId]
	}),
	store: one(store, {
		fields: [paypalBillingAgreement.storeId],
		references: [store.storeId]
	}),
	paypalBillingAgreementOrders: many(paypalBillingAgreementOrder),
}));

export const paypalBillingAgreementOrderRelations = relations(paypalBillingAgreementOrder, ({one}) => ({
	salesOrder: one(salesOrder, {
		fields: [paypalBillingAgreementOrder.orderId],
		references: [salesOrder.entityId]
	}),
	paypalBillingAgreement: one(paypalBillingAgreement, {
		fields: [paypalBillingAgreementOrder.agreementId],
		references: [paypalBillingAgreement.agreementId]
	}),
}));

export const paypalCertRelations = relations(paypalCert, ({one}) => ({
	storeWebsite: one(storeWebsite, {
		fields: [paypalCert.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const paypalSettlementReportRowRelations = relations(paypalSettlementReportRow, ({one}) => ({
	paypalSettlementReport: one(paypalSettlementReport, {
		fields: [paypalSettlementReportRow.reportId],
		references: [paypalSettlementReport.reportId]
	}),
}));

export const paypalSettlementReportRelations = relations(paypalSettlementReport, ({many}) => ({
	paypalSettlementReportRows: many(paypalSettlementReportRow),
}));

export const persistentSessionRelations = relations(persistentSession, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [persistentSession.customerId],
		references: [customerEntity.entityId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [persistentSession.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const productAlertPriceRelations = relations(productAlertPrice, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [productAlertPrice.customerId],
		references: [customerEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [productAlertPrice.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [productAlertPrice.storeId],
		references: [store.storeId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [productAlertPrice.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const productAlertStockRelations = relations(productAlertStock, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [productAlertStock.customerId],
		references: [customerEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [productAlertStock.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [productAlertStock.storeId],
		references: [store.storeId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [productAlertStock.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const queueMessageStatusRelations = relations(queueMessageStatus, ({one}) => ({
	queueMessage: one(queueMessage, {
		fields: [queueMessageStatus.messageId],
		references: [queueMessage.id]
	}),
	queue: one(queue, {
		fields: [queueMessageStatus.queueId],
		references: [queue.id]
	}),
}));

export const queueMessageRelations = relations(queueMessage, ({many}) => ({
	queueMessageStatuses: many(queueMessageStatus),
}));

export const queueRelations = relations(queue, ({many}) => ({
	queueMessageStatuses: many(queueMessageStatus),
}));

export const quoteRelations = relations(quote, ({one, many}) => ({
	store: one(store, {
		fields: [quote.storeId],
		references: [store.storeId]
	}),
	quoteAddresses: many(quoteAddress),
	quoteIdMasks: many(quoteIdMask),
	quoteItems: many(quoteItem),
	quotePayments: many(quotePayment),
}));

export const quoteAddressItemRelations = relations(quoteAddressItem, ({one, many}) => ({
	quoteAddress: one(quoteAddress, {
		fields: [quoteAddressItem.quoteAddressId],
		references: [quoteAddress.addressId]
	}),
	quoteItem: one(quoteItem, {
		fields: [quoteAddressItem.quoteItemId],
		references: [quoteItem.itemId]
	}),
	quoteAddressItem: one(quoteAddressItem, {
		fields: [quoteAddressItem.parentItemId],
		references: [quoteAddressItem.addressItemId],
		relationName: "quoteAddressItem_parentItemId_quoteAddressItem_addressItemId"
	}),
	quoteAddressItems: many(quoteAddressItem, {
		relationName: "quoteAddressItem_parentItemId_quoteAddressItem_addressItemId"
	}),
}));

export const quoteItemRelations = relations(quoteItem, ({one, many}) => ({
	quoteAddressItems: many(quoteAddressItem),
	quoteItem: one(quoteItem, {
		fields: [quoteItem.parentItemId],
		references: [quoteItem.itemId],
		relationName: "quoteItem_parentItemId_quoteItem_itemId"
	}),
	quoteItems: many(quoteItem, {
		relationName: "quoteItem_parentItemId_quoteItem_itemId"
	}),
	quote: one(quote, {
		fields: [quoteItem.quoteId],
		references: [quote.entityId]
	}),
	store: one(store, {
		fields: [quoteItem.storeId],
		references: [store.storeId]
	}),
	quoteItemOptions: many(quoteItemOption),
}));

export const quoteIdMaskRelations = relations(quoteIdMask, ({one}) => ({
	quote: one(quote, {
		fields: [quoteIdMask.quoteId],
		references: [quote.entityId]
	}),
}));

export const quoteItemOptionRelations = relations(quoteItemOption, ({one}) => ({
	quoteItem: one(quoteItem, {
		fields: [quoteItemOption.itemId],
		references: [quoteItem.itemId]
	}),
}));

export const quotePaymentRelations = relations(quotePayment, ({one}) => ({
	quote: one(quote, {
		fields: [quotePayment.quoteId],
		references: [quote.entityId]
	}),
}));

export const quoteShippingRateRelations = relations(quoteShippingRate, ({one}) => ({
	quoteAddress: one(quoteAddress, {
		fields: [quoteShippingRate.addressId],
		references: [quoteAddress.addressId]
	}),
}));

export const ratingRelations = relations(rating, ({one, many}) => ({
	ratingEntity: one(ratingEntity, {
		fields: [rating.entityId],
		references: [ratingEntity.entityId]
	}),
	ratingOptions: many(ratingOption),
	ratingOptionVoteAggregateds: many(ratingOptionVoteAggregated),
	ratingStores: many(ratingStore),
	ratingTitles: many(ratingTitle),
}));

export const ratingEntityRelations = relations(ratingEntity, ({many}) => ({
	ratings: many(rating),
}));

export const ratingOptionRelations = relations(ratingOption, ({one, many}) => ({
	rating: one(rating, {
		fields: [ratingOption.ratingId],
		references: [rating.ratingId]
	}),
	ratingOptionVotes: many(ratingOptionVote),
}));

export const ratingOptionVoteRelations = relations(ratingOptionVote, ({one}) => ({
	ratingOption: one(ratingOption, {
		fields: [ratingOptionVote.optionId],
		references: [ratingOption.optionId]
	}),
	review: one(review, {
		fields: [ratingOptionVote.reviewId],
		references: [review.reviewId]
	}),
}));

export const reviewRelations = relations(review, ({one, many}) => ({
	ratingOptionVotes: many(ratingOptionVote),
	reviewEntity: one(reviewEntity, {
		fields: [review.entityId],
		references: [reviewEntity.entityId]
	}),
	reviewStatus: one(reviewStatus, {
		fields: [review.statusId],
		references: [reviewStatus.statusId]
	}),
	reviewDetails: many(reviewDetail),
	reviewStores: many(reviewStore),
}));

export const ratingOptionVoteAggregatedRelations = relations(ratingOptionVoteAggregated, ({one}) => ({
	rating: one(rating, {
		fields: [ratingOptionVoteAggregated.ratingId],
		references: [rating.ratingId]
	}),
	store: one(store, {
		fields: [ratingOptionVoteAggregated.storeId],
		references: [store.storeId]
	}),
}));

export const ratingStoreRelations = relations(ratingStore, ({one}) => ({
	rating: one(rating, {
		fields: [ratingStore.ratingId],
		references: [rating.ratingId]
	}),
	store: one(store, {
		fields: [ratingStore.storeId],
		references: [store.storeId]
	}),
}));

export const ratingTitleRelations = relations(ratingTitle, ({one}) => ({
	rating: one(rating, {
		fields: [ratingTitle.ratingId],
		references: [rating.ratingId]
	}),
	store: one(store, {
		fields: [ratingTitle.storeId],
		references: [store.storeId]
	}),
}));

export const releaseNotificationViewerLogRelations = relations(releaseNotificationViewerLog, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [releaseNotificationViewerLog.viewerId],
		references: [adminUser.userId]
	}),
}));

export const reportComparedProductIndexRelations = relations(reportComparedProductIndex, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [reportComparedProductIndex.customerId],
		references: [customerEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [reportComparedProductIndex.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [reportComparedProductIndex.storeId],
		references: [store.storeId]
	}),
}));

export const reportEventRelations = relations(reportEvent, ({one}) => ({
	reportEventType: one(reportEventTypes, {
		fields: [reportEvent.eventTypeId],
		references: [reportEventTypes.eventTypeId]
	}),
	store: one(store, {
		fields: [reportEvent.storeId],
		references: [store.storeId]
	}),
}));

export const reportEventTypesRelations = relations(reportEventTypes, ({many}) => ({
	reportEvents: many(reportEvent),
}));

export const reportViewedProductAggregatedDailyRelations = relations(reportViewedProductAggregatedDaily, ({one}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [reportViewedProductAggregatedDaily.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [reportViewedProductAggregatedDaily.storeId],
		references: [store.storeId]
	}),
}));

export const reportViewedProductAggregatedMonthlyRelations = relations(reportViewedProductAggregatedMonthly, ({one}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [reportViewedProductAggregatedMonthly.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [reportViewedProductAggregatedMonthly.storeId],
		references: [store.storeId]
	}),
}));

export const reportViewedProductAggregatedYearlyRelations = relations(reportViewedProductAggregatedYearly, ({one}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [reportViewedProductAggregatedYearly.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [reportViewedProductAggregatedYearly.storeId],
		references: [store.storeId]
	}),
}));

export const reportViewedProductIndexRelations = relations(reportViewedProductIndex, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [reportViewedProductIndex.customerId],
		references: [customerEntity.entityId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [reportViewedProductIndex.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [reportViewedProductIndex.storeId],
		references: [store.storeId]
	}),
}));

export const reviewEntityRelations = relations(reviewEntity, ({many}) => ({
	reviews: many(review),
}));

export const reviewStatusRelations = relations(reviewStatus, ({many}) => ({
	reviews: many(review),
}));

export const reviewDetailRelations = relations(reviewDetail, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [reviewDetail.customerId],
		references: [customerEntity.entityId]
	}),
	review: one(review, {
		fields: [reviewDetail.reviewId],
		references: [review.reviewId]
	}),
	store: one(store, {
		fields: [reviewDetail.storeId],
		references: [store.storeId]
	}),
}));

export const reviewEntitySummaryRelations = relations(reviewEntitySummary, ({one}) => ({
	store: one(store, {
		fields: [reviewEntitySummary.storeId],
		references: [store.storeId]
	}),
}));

export const reviewStoreRelations = relations(reviewStore, ({one}) => ({
	review: one(review, {
		fields: [reviewStore.reviewId],
		references: [review.reviewId]
	}),
	store: one(store, {
		fields: [reviewStore.storeId],
		references: [store.storeId]
	}),
}));

export const salesruleCouponRelations = relations(salesruleCoupon, ({one, many}) => ({
	salesrule: one(salesrule, {
		fields: [salesruleCoupon.ruleId],
		references: [salesrule.ruleId]
	}),
	salesruleCouponUsages: many(salesruleCouponUsage),
}));

export const salesruleRelations = relations(salesrule, ({many}) => ({
	salesruleCoupons: many(salesruleCoupon),
	salesruleCustomers: many(salesruleCustomer),
	salesruleCustomerGroups: many(salesruleCustomerGroup),
	salesruleLabels: many(salesruleLabel),
	salesruleProductAttributes: many(salesruleProductAttribute),
	salesruleWebsites: many(salesruleWebsite),
}));

export const salesruleCouponAggregatedRelations = relations(salesruleCouponAggregated, ({one}) => ({
	store: one(store, {
		fields: [salesruleCouponAggregated.storeId],
		references: [store.storeId]
	}),
}));

export const salesruleCouponAggregatedOrderRelations = relations(salesruleCouponAggregatedOrder, ({one}) => ({
	store: one(store, {
		fields: [salesruleCouponAggregatedOrder.storeId],
		references: [store.storeId]
	}),
}));

export const salesruleCouponAggregatedUpdatedRelations = relations(salesruleCouponAggregatedUpdated, ({one}) => ({
	store: one(store, {
		fields: [salesruleCouponAggregatedUpdated.storeId],
		references: [store.storeId]
	}),
}));

export const salesruleCouponUsageRelations = relations(salesruleCouponUsage, ({one}) => ({
	salesruleCoupon: one(salesruleCoupon, {
		fields: [salesruleCouponUsage.couponId],
		references: [salesruleCoupon.couponId]
	}),
	customerEntity: one(customerEntity, {
		fields: [salesruleCouponUsage.customerId],
		references: [customerEntity.entityId]
	}),
}));

export const salesruleCustomerRelations = relations(salesruleCustomer, ({one}) => ({
	customerEntity: one(customerEntity, {
		fields: [salesruleCustomer.customerId],
		references: [customerEntity.entityId]
	}),
	salesrule: one(salesrule, {
		fields: [salesruleCustomer.ruleId],
		references: [salesrule.ruleId]
	}),
}));

export const salesruleCustomerGroupRelations = relations(salesruleCustomerGroup, ({one}) => ({
	customerGroup: one(customerGroup, {
		fields: [salesruleCustomerGroup.customerGroupId],
		references: [customerGroup.customerGroupId]
	}),
	salesrule: one(salesrule, {
		fields: [salesruleCustomerGroup.ruleId],
		references: [salesrule.ruleId]
	}),
}));

export const salesruleLabelRelations = relations(salesruleLabel, ({one}) => ({
	salesrule: one(salesrule, {
		fields: [salesruleLabel.ruleId],
		references: [salesrule.ruleId]
	}),
	store: one(store, {
		fields: [salesruleLabel.storeId],
		references: [store.storeId]
	}),
}));

export const salesruleProductAttributeRelations = relations(salesruleProductAttribute, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [salesruleProductAttribute.attributeId],
		references: [eavAttribute.attributeId]
	}),
	customerGroup: one(customerGroup, {
		fields: [salesruleProductAttribute.customerGroupId],
		references: [customerGroup.customerGroupId]
	}),
	salesrule: one(salesrule, {
		fields: [salesruleProductAttribute.ruleId],
		references: [salesrule.ruleId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [salesruleProductAttribute.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const salesruleWebsiteRelations = relations(salesruleWebsite, ({one}) => ({
	salesrule: one(salesrule, {
		fields: [salesruleWebsite.ruleId],
		references: [salesrule.ruleId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [salesruleWebsite.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const salesBestsellersAggregatedDailyRelations = relations(salesBestsellersAggregatedDaily, ({one}) => ({
	store: one(store, {
		fields: [salesBestsellersAggregatedDaily.storeId],
		references: [store.storeId]
	}),
}));

export const salesBestsellersAggregatedMonthlyRelations = relations(salesBestsellersAggregatedMonthly, ({one}) => ({
	store: one(store, {
		fields: [salesBestsellersAggregatedMonthly.storeId],
		references: [store.storeId]
	}),
}));

export const salesBestsellersAggregatedYearlyRelations = relations(salesBestsellersAggregatedYearly, ({one}) => ({
	store: one(store, {
		fields: [salesBestsellersAggregatedYearly.storeId],
		references: [store.storeId]
	}),
}));

export const salesCreditmemoRelations = relations(salesCreditmemo, ({one, many}) => ({
	salesOrder: one(salesOrder, {
		fields: [salesCreditmemo.orderId],
		references: [salesOrder.entityId]
	}),
	store: one(store, {
		fields: [salesCreditmemo.storeId],
		references: [store.storeId]
	}),
	salesCreditmemoComments: many(salesCreditmemoComment),
	salesCreditmemoItems: many(salesCreditmemoItem),
}));

export const salesCreditmemoCommentRelations = relations(salesCreditmemoComment, ({one}) => ({
	salesCreditmemo: one(salesCreditmemo, {
		fields: [salesCreditmemoComment.parentId],
		references: [salesCreditmemo.entityId]
	}),
}));

export const salesCreditmemoItemRelations = relations(salesCreditmemoItem, ({one}) => ({
	salesCreditmemo: one(salesCreditmemo, {
		fields: [salesCreditmemoItem.parentId],
		references: [salesCreditmemo.entityId]
	}),
}));

export const salesInvoiceRelations = relations(salesInvoice, ({one, many}) => ({
	salesOrder: one(salesOrder, {
		fields: [salesInvoice.orderId],
		references: [salesOrder.entityId]
	}),
	store: one(store, {
		fields: [salesInvoice.storeId],
		references: [store.storeId]
	}),
	salesInvoiceComments: many(salesInvoiceComment),
	salesInvoiceItems: many(salesInvoiceItem),
}));

export const salesInvoicedAggregatedRelations = relations(salesInvoicedAggregated, ({one}) => ({
	store: one(store, {
		fields: [salesInvoicedAggregated.storeId],
		references: [store.storeId]
	}),
}));

export const salesInvoicedAggregatedOrderRelations = relations(salesInvoicedAggregatedOrder, ({one}) => ({
	store: one(store, {
		fields: [salesInvoicedAggregatedOrder.storeId],
		references: [store.storeId]
	}),
}));

export const salesInvoiceCommentRelations = relations(salesInvoiceComment, ({one}) => ({
	salesInvoice: one(salesInvoice, {
		fields: [salesInvoiceComment.parentId],
		references: [salesInvoice.entityId]
	}),
}));

export const salesInvoiceItemRelations = relations(salesInvoiceItem, ({one}) => ({
	salesInvoice: one(salesInvoice, {
		fields: [salesInvoiceItem.parentId],
		references: [salesInvoice.entityId]
	}),
}));

export const salesOrderAddressRelations = relations(salesOrderAddress, ({one}) => ({
	salesOrder: one(salesOrder, {
		fields: [salesOrderAddress.parentId],
		references: [salesOrder.entityId]
	}),
}));

export const salesOrderAggregatedCreatedRelations = relations(salesOrderAggregatedCreated, ({one}) => ({
	store: one(store, {
		fields: [salesOrderAggregatedCreated.storeId],
		references: [store.storeId]
	}),
}));

export const salesOrderAggregatedUpdatedRelations = relations(salesOrderAggregatedUpdated, ({one}) => ({
	store: one(store, {
		fields: [salesOrderAggregatedUpdated.storeId],
		references: [store.storeId]
	}),
}));

export const salesOrderPaymentRelations = relations(salesOrderPayment, ({one, many}) => ({
	salesOrder: one(salesOrder, {
		fields: [salesOrderPayment.parentId],
		references: [salesOrder.entityId]
	}),
	salesPaymentTransactions: many(salesPaymentTransaction),
	vaultPaymentTokenOrderPaymentLinks: many(vaultPaymentTokenOrderPaymentLink),
}));

export const salesOrderStatusHistoryRelations = relations(salesOrderStatusHistory, ({one}) => ({
	salesOrder: one(salesOrder, {
		fields: [salesOrderStatusHistory.parentId],
		references: [salesOrder.entityId]
	}),
}));

export const salesOrderStatusLabelRelations = relations(salesOrderStatusLabel, ({one}) => ({
	salesOrderStatus: one(salesOrderStatus, {
		fields: [salesOrderStatusLabel.status],
		references: [salesOrderStatus.status]
	}),
	store: one(store, {
		fields: [salesOrderStatusLabel.storeId],
		references: [store.storeId]
	}),
}));

export const salesOrderStatusRelations = relations(salesOrderStatus, ({many}) => ({
	salesOrderStatusLabels: many(salesOrderStatusLabel),
	salesOrderStatusStates: many(salesOrderStatusState),
}));

export const salesOrderStatusStateRelations = relations(salesOrderStatusState, ({one}) => ({
	salesOrderStatus: one(salesOrderStatus, {
		fields: [salesOrderStatusState.status],
		references: [salesOrderStatus.status]
	}),
}));

export const salesOrderTaxItemRelations = relations(salesOrderTaxItem, ({one}) => ({
	salesOrderItem_associatedItemId: one(salesOrderItem, {
		fields: [salesOrderTaxItem.associatedItemId],
		references: [salesOrderItem.itemId],
		relationName: "salesOrderTaxItem_associatedItemId_salesOrderItem_itemId"
	}),
	salesOrderItem_itemId: one(salesOrderItem, {
		fields: [salesOrderTaxItem.itemId],
		references: [salesOrderItem.itemId],
		relationName: "salesOrderTaxItem_itemId_salesOrderItem_itemId"
	}),
	salesOrderTax: one(salesOrderTax, {
		fields: [salesOrderTaxItem.taxId],
		references: [salesOrderTax.taxId]
	}),
}));

export const salesOrderTaxRelations = relations(salesOrderTax, ({many}) => ({
	salesOrderTaxItems: many(salesOrderTaxItem),
}));

export const salesPaymentTransactionRelations = relations(salesPaymentTransaction, ({one, many}) => ({
	salesPaymentTransaction: one(salesPaymentTransaction, {
		fields: [salesPaymentTransaction.parentId],
		references: [salesPaymentTransaction.transactionId],
		relationName: "salesPaymentTransaction_parentId_salesPaymentTransaction_transactionId"
	}),
	salesPaymentTransactions: many(salesPaymentTransaction, {
		relationName: "salesPaymentTransaction_parentId_salesPaymentTransaction_transactionId"
	}),
	salesOrder: one(salesOrder, {
		fields: [salesPaymentTransaction.orderId],
		references: [salesOrder.entityId]
	}),
	salesOrderPayment: one(salesOrderPayment, {
		fields: [salesPaymentTransaction.paymentId],
		references: [salesOrderPayment.entityId]
	}),
}));

export const salesRefundedAggregatedRelations = relations(salesRefundedAggregated, ({one}) => ({
	store: one(store, {
		fields: [salesRefundedAggregated.storeId],
		references: [store.storeId]
	}),
}));

export const salesRefundedAggregatedOrderRelations = relations(salesRefundedAggregatedOrder, ({one}) => ({
	store: one(store, {
		fields: [salesRefundedAggregatedOrder.storeId],
		references: [store.storeId]
	}),
}));

export const salesSequenceProfileRelations = relations(salesSequenceProfile, ({one}) => ({
	salesSequenceMeta: one(salesSequenceMeta, {
		fields: [salesSequenceProfile.metaId],
		references: [salesSequenceMeta.metaId]
	}),
}));

export const salesSequenceMetaRelations = relations(salesSequenceMeta, ({many}) => ({
	salesSequenceProfiles: many(salesSequenceProfile),
}));

export const salesShipmentRelations = relations(salesShipment, ({one, many}) => ({
	salesOrder: one(salesOrder, {
		fields: [salesShipment.orderId],
		references: [salesOrder.entityId]
	}),
	store: one(store, {
		fields: [salesShipment.storeId],
		references: [store.storeId]
	}),
	salesShipmentComments: many(salesShipmentComment),
	salesShipmentItems: many(salesShipmentItem),
	salesShipmentTracks: many(salesShipmentTrack),
}));

export const salesShipmentCommentRelations = relations(salesShipmentComment, ({one}) => ({
	salesShipment: one(salesShipment, {
		fields: [salesShipmentComment.parentId],
		references: [salesShipment.entityId]
	}),
}));

export const salesShipmentItemRelations = relations(salesShipmentItem, ({one}) => ({
	salesShipment: one(salesShipment, {
		fields: [salesShipmentItem.parentId],
		references: [salesShipment.entityId]
	}),
}));

export const salesShipmentTrackRelations = relations(salesShipmentTrack, ({one}) => ({
	salesShipment: one(salesShipment, {
		fields: [salesShipmentTrack.parentId],
		references: [salesShipment.entityId]
	}),
}));

export const salesShippingAggregatedRelations = relations(salesShippingAggregated, ({one}) => ({
	store: one(store, {
		fields: [salesShippingAggregated.storeId],
		references: [store.storeId]
	}),
}));

export const salesShippingAggregatedOrderRelations = relations(salesShippingAggregatedOrder, ({one}) => ({
	store: one(store, {
		fields: [salesShippingAggregatedOrder.storeId],
		references: [store.storeId]
	}),
}));

export const searchSynonymsRelations = relations(searchSynonyms, ({one}) => ({
	store: one(store, {
		fields: [searchSynonyms.storeId],
		references: [store.storeId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [searchSynonyms.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const sitemapRelations = relations(sitemap, ({one}) => ({
	store: one(store, {
		fields: [sitemap.storeId],
		references: [store.storeId]
	}),
}));

export const storeGroupRelations = relations(storeGroup, ({one, many}) => ({
	stores: many(store),
	storeWebsite: one(storeWebsite, {
		fields: [storeGroup.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const taxCalculationRelations = relations(taxCalculation, ({one}) => ({
	taxClass_customerTaxClassId: one(taxClass, {
		fields: [taxCalculation.customerTaxClassId],
		references: [taxClass.classId],
		relationName: "taxCalculation_customerTaxClassId_taxClass_classId"
	}),
	taxClass_productTaxClassId: one(taxClass, {
		fields: [taxCalculation.productTaxClassId],
		references: [taxClass.classId],
		relationName: "taxCalculation_productTaxClassId_taxClass_classId"
	}),
	taxCalculationRate: one(taxCalculationRate, {
		fields: [taxCalculation.taxCalculationRateId],
		references: [taxCalculationRate.taxCalculationRateId]
	}),
	taxCalculationRule: one(taxCalculationRule, {
		fields: [taxCalculation.taxCalculationRuleId],
		references: [taxCalculationRule.taxCalculationRuleId]
	}),
}));

export const taxClassRelations = relations(taxClass, ({many}) => ({
	taxCalculations_customerTaxClassId: many(taxCalculation, {
		relationName: "taxCalculation_customerTaxClassId_taxClass_classId"
	}),
	taxCalculations_productTaxClassId: many(taxCalculation, {
		relationName: "taxCalculation_productTaxClassId_taxClass_classId"
	}),
}));

export const taxCalculationRateRelations = relations(taxCalculationRate, ({many}) => ({
	taxCalculations: many(taxCalculation),
	taxCalculationRateTitles: many(taxCalculationRateTitle),
}));

export const taxCalculationRuleRelations = relations(taxCalculationRule, ({many}) => ({
	taxCalculations: many(taxCalculation),
}));

export const taxCalculationRateTitleRelations = relations(taxCalculationRateTitle, ({one}) => ({
	taxCalculationRate: one(taxCalculationRate, {
		fields: [taxCalculationRateTitle.taxCalculationRateId],
		references: [taxCalculationRate.taxCalculationRateId]
	}),
	store: one(store, {
		fields: [taxCalculationRateTitle.storeId],
		references: [store.storeId]
	}),
}));

export const taxOrderAggregatedCreatedRelations = relations(taxOrderAggregatedCreated, ({one}) => ({
	store: one(store, {
		fields: [taxOrderAggregatedCreated.storeId],
		references: [store.storeId]
	}),
}));

export const taxOrderAggregatedUpdatedRelations = relations(taxOrderAggregatedUpdated, ({one}) => ({
	store: one(store, {
		fields: [taxOrderAggregatedUpdated.storeId],
		references: [store.storeId]
	}),
}));

export const tfaUserConfigRelations = relations(tfaUserConfig, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [tfaUserConfig.userId],
		references: [adminUser.userId]
	}),
}));

export const themeFileRelations = relations(themeFile, ({one}) => ({
	theme: one(theme, {
		fields: [themeFile.themeId],
		references: [theme.themeId]
	}),
}));

export const translationRelations = relations(translation, ({one}) => ({
	store: one(store, {
		fields: [translation.storeId],
		references: [store.storeId]
	}),
}));

export const uiBookmarkRelations = relations(uiBookmark, ({one}) => ({
	adminUser: one(adminUser, {
		fields: [uiBookmark.userId],
		references: [adminUser.userId]
	}),
}));

export const variableValueRelations = relations(variableValue, ({one}) => ({
	store: one(store, {
		fields: [variableValue.storeId],
		references: [store.storeId]
	}),
	variable: one(variable, {
		fields: [variableValue.variableId],
		references: [variable.variableId]
	}),
}));

export const variableRelations = relations(variable, ({many}) => ({
	variableValues: many(variableValue),
}));

export const vaultPaymentTokenRelations = relations(vaultPaymentToken, ({one, many}) => ({
	customerEntity: one(customerEntity, {
		fields: [vaultPaymentToken.customerId],
		references: [customerEntity.entityId]
	}),
	vaultPaymentTokenOrderPaymentLinks: many(vaultPaymentTokenOrderPaymentLink),
}));

export const vaultPaymentTokenOrderPaymentLinkRelations = relations(vaultPaymentTokenOrderPaymentLink, ({one}) => ({
	vaultPaymentToken: one(vaultPaymentToken, {
		fields: [vaultPaymentTokenOrderPaymentLink.paymentTokenId],
		references: [vaultPaymentToken.entityId]
	}),
	salesOrderPayment: one(salesOrderPayment, {
		fields: [vaultPaymentTokenOrderPaymentLink.orderPaymentId],
		references: [salesOrderPayment.entityId]
	}),
}));

export const weeeTaxRelations = relations(weeeTax, ({one}) => ({
	eavAttribute: one(eavAttribute, {
		fields: [weeeTax.attributeId],
		references: [eavAttribute.attributeId]
	}),
	directoryCountry: one(directoryCountry, {
		fields: [weeeTax.country],
		references: [directoryCountry.countryId]
	}),
	catalogProductEntity: one(catalogProductEntity, {
		fields: [weeeTax.entityId],
		references: [catalogProductEntity.entityId]
	}),
	storeWebsite: one(storeWebsite, {
		fields: [weeeTax.websiteId],
		references: [storeWebsite.websiteId]
	}),
}));

export const directoryCountryRelations = relations(directoryCountry, ({many}) => ({
	weeeTaxes: many(weeeTax),
}));

export const widgetInstanceRelations = relations(widgetInstance, ({one, many}) => ({
	theme: one(theme, {
		fields: [widgetInstance.themeId],
		references: [theme.themeId]
	}),
	widgetInstancePages: many(widgetInstancePage),
}));

export const widgetInstancePageRelations = relations(widgetInstancePage, ({one, many}) => ({
	widgetInstance: one(widgetInstance, {
		fields: [widgetInstancePage.instanceId],
		references: [widgetInstance.instanceId]
	}),
	widgetInstancePageLayouts: many(widgetInstancePageLayout),
}));

export const widgetInstancePageLayoutRelations = relations(widgetInstancePageLayout, ({one}) => ({
	widgetInstancePage: one(widgetInstancePage, {
		fields: [widgetInstancePageLayout.pageId],
		references: [widgetInstancePage.pageId]
	}),
	layoutUpdate: one(layoutUpdate, {
		fields: [widgetInstancePageLayout.layoutUpdateId],
		references: [layoutUpdate.layoutUpdateId]
	}),
}));

export const wishlistRelations = relations(wishlist, ({one, many}) => ({
	customerEntity: one(customerEntity, {
		fields: [wishlist.customerId],
		references: [customerEntity.entityId]
	}),
	wishlistItems: many(wishlistItem),
}));

export const wishlistItemRelations = relations(wishlistItem, ({one, many}) => ({
	catalogProductEntity: one(catalogProductEntity, {
		fields: [wishlistItem.productId],
		references: [catalogProductEntity.entityId]
	}),
	store: one(store, {
		fields: [wishlistItem.storeId],
		references: [store.storeId]
	}),
	wishlist: one(wishlist, {
		fields: [wishlistItem.wishlistId],
		references: [wishlist.wishlistId]
	}),
	wishlistItemOptions: many(wishlistItemOption),
}));

export const wishlistItemOptionRelations = relations(wishlistItemOption, ({one}) => ({
	wishlistItem: one(wishlistItem, {
		fields: [wishlistItemOption.wishlistItemId],
		references: [wishlistItem.wishlistItemId]
	}),
}));