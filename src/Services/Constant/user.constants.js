export const USER_ACTION_TYPE = {
  SET_CURRENT_USER_SUCESS: "SET_CURRENT_USER_SUCESS",
  SET_CURRENT_USER_PENDING: "SET_CURRENT_USER_PENDING",
  SET_CURRENT_USER_ERROR: "SET_CURRENT_USER_ERROR",
  SET_CURRENT_CLIENT_SUCESS: "SET_CURRENT_CLIENT_SUCESS",
  SET_CURRENT_CLIENT_PENDING: "SET_CURRENT_CLIENT_PENDING",
  SET_CURRENT_CLIENT_ERROR: "SET_CURRENT_CLIENT_ERROR",
  SET_USER_SIGNUP_SUCESS: "SET_USER_SIGNUP_SUCESS",
  SET_USER_SIGNUP_PENDING: "SET_USER_SIGNUP_PENDING",
  SET_USER_SIGNUP_ERROR: "SET_USER_SIGNUP_ERROR",
  RESET_USER_SIGNUP: "RESET_USER_SIGNUP",
  SET_USER_LIST_PENDING: "SET_USER_LIST_PENDING",
  SET_USER_LIST_SUCESS: "SET_USER_LIST_SUCESS",
  SET_USER_LIST_ERROR: "SET_USER_LIST_ERROR",
  RESET_USER_LIST: "RESET_USER_LIST",
  SET_PAYMENT_DETAILS_PENDING: "SET_PAYMENT_DETAILS_PENDING",
  SET_PAYMENT_DETAILS_SUCESS: "SET_PAYMENT_DETAILS_SUCESS",
  SET_PAYMENT_DETAILS_ERROR: "SET_PAYMENT_DETAILS_ERROR",
  SET_CLIENT_PENDING: "SET_CLIENT_PENDING",
  SET_CLIENT_SUCESS: "SET_CLIENT_SUCESS",
  SET_CLIENT_ERROR: "SET_CLIENT_ERROR",
  GET_ACCOUNT_CLIENT_PENDING: "GET_ACCOUNT_CLIENT_PENDING",
  GET_ACCOUNT_CLIENT_SUCESS: "GET_ACCOUNT_CLIENT_SUCESS",
  GET_ACCOUNT_CLIENT_ERROR: "GET_ACCOUNT_CLIENT_ERROR",
  RESET_CLIENT_LIST: "RESET_CLIENT_LIST",
  SET_EVENT_LIST_PENDING: "SET_EVENT_LIST_PENDING",
  SET_EVENT_LIST_SUCESS: "SET_EVENT_LIST_SUCESS",
  SET_EVENT_LIST_ERROR: "SET_EVENT_LIST_ERROR",
  RESET_EVENT_LIST: "RESET_EVENT_LIST",
  ACCOUNT_USER_PENDING: "ACCOUNT_USER_PENDING",
  ACCOUNT_USER_SUCESS: "ACCOUNT_USER_SUCESS",
  ACCOUNT_USER_ERROR: "ACCOUNT_USER_ERROR",
  SET_ACCOUNT_LIST_SUCESS: "SET_ACCOUNT_LIST_SUCESS",
  SET_ACCOUNT_LIST_ERROR: "SET_ACCOUNT_LIST_ERROR",
  SET_ACCOUNT_LIST_PENDING: "SET_ACCOUNT_LIST_PENDING",
  GET_EVENT_DETAILS_PENDING: "GET_EVENT_DETAILS_PENDING",
  GET_EVENT_DETAILS_SUCESS: "GET_EVENT_DETAILS_SUCESS",
  GET_EVENT_DETAILS_ERROR: "GET_EVENT_DETAILS_ERROR",
  GET_PAGE_DESIGN_PENDING: "GET_PAGE_DESIGN_PENDING",
  GET_PAGE_DESIGN_SUCESS: "GET_PAGE_DESIGN_SUCESS",
  GET_PAGE_DESIGN_ERROR: "GET_PAGE_DESIGN_ERROR",
  GET_REG_TYPES_PAGE_DESIGN_PENDING: "GET_REG_TYPES_PAGE_DESIGN_PENDING",
  GET_REG_TYPES_PAGE_DESIGN_SUCESS: "GET_REG_TYPES_PAGE_DESIGN_SUCESS",
  GET_REG_TYPES_PAGE_DESIGN_ERROR: "GET_REG_TYPES_PAGE_DESIGN_ERROR",
  GET_REG_TYPES_BY_ID_PENDING: "GET_REG_TYPES_BY_ID_PENDING",
  GET_REG_TYPES_BY_ID_SUCESS: "GET_REG_TYPES_BY_ID_SUCESS",
  GET_REG_TYPES_BY_ID_ERROR: "GET_REG_TYPES_BY_ID_ERROR",
  GET_REG_CATEGORIES_PAGE_DESIGN_PENDING:
    "GET_REG_CATEGORIES_PAGE_DESIGN_PENDING",
  GET_REG_CATEGORIES_PAGE_DESIGN_SUCESS:
    "GET_REG_CATEGORIES_PAGE_DESIGN_SUCESS",
  GET_REG_CATEGORIES_PAGE_DESIGN_ERROR: "GET_REG_CATEGORIES_PAGE_DESIGN_ERROR",
  GET_REG_SCODE_PAGE_DESIGN_PENDING: "GET_REG_SCODE_PAGE_DESIGN_PENDING",
  GET_REG_SCODE_PAGE_DESIGN_SUCESS: "GET_REG_SCODE_PAGE_DESIGN_SUCESS",
  GET_REG_SCODE_PAGE_DESIGN_ERROR: "GET_REG_SCODE_PAGE_DESIGN_ERROR",
  GET_REG_CATEGORIES_BY_ID_PENDING: "GET_REG_CATEGORIES_BY_ID_PENDING",
  GET_REG_CATEGORIES_BY_ID_SUCESS: "GET_REG_CATEGORIES_BY_ID_SUCESS",
  GET_REG_CATEGORIES_BY_ID_ERROR: "GET_REG_CATEGORIES_BY_ID_ERROR",
  GET_FIELDS_QA_DISC_SESSIONS_PENDING: "GET_FIELDS_QA_DISC_SESSIONS_PENDING",
  GET_FIELDS_QA_DISC_SESSIONS_SUCESS: "GET_FIELDS_QA_DISC_SESSIONS_SUCESS",
  GET_FIELDS_QA_DISC_SESSIONS_ERROR: "GET_FIELDS_QA_DISC_SESSIONS_ERROR",
  GET_GUESTS_REGISTRANTS_FIELDS_PENDING:
    "GET_GUESTS_REGISTRANTS_FIELDS_PENDING",
  GET_GUESTS_REGISTRANTS_FIELDS_SUCESS: "GET_GUESTS_REGISTRANTS_FIELDS_SUCESS",
  GET_GUESTS_REGISTRANTS_FIELDS_ERROR: "GET_GUESTS_REGISTRANTS_FIELDS_ERROR",
  GET_CUSTOM_QUESTIONS_PENDING: "GET_CUSTOM_QUESTIONS_PENDING",
  GET_CUSTOM_QUESTIONS_SUCESS: "GET_CUSTOM_QUESTIONS_SUCESS",
  GET_CUSTOM_QUESTIONS_ERROR: "GET_CUSTOM_QUESTIONS_ERROR",
  GET_REGISTRANT_FIELD_PENDING: "GET_REGISTRANT_FIELD_PENDING",
  GET_REGISTRANT_FIELD_SUCESS: "GET_REGISTRANT_FIELD_SUCESS",
  GET_REGISTRANT_FIELD_ERROR: "GET_REGISTRANT_FIELD_ERROR",
  GET_CUSTOM_QUESTIONS_BY_ID_PENDING: "GET_CUSTOM_QUESTIONS_BY_ID_PENDING",
  GET_CUSTOM_QUESTIONS_BY_ID_SUCESS: "GET_CUSTOM_QUESTIONS_BY_ID_SUCESS",
  GET_CUSTOM_QUESTIONS_BY_ID_ERROR: "GET_CUSTOM_QUESTIONS_BY_ID_ERROR",
  GET_DISCOUNT_CODES_PENDING: "GET_DISCOUNT_CODES_PENDING",
  GET_DISCOUNT_CODES_SUCESS: "GET_DISCOUNT_CODES_SUCESS",
  GET_DISCOUNT_CODES_ERROR: "GET_DISCOUNT_CODES_ERROR",
  GET_DISCOUNT_CODES_BY_ID_PENDING: "GET_DISCOUNT_CODES_BY_ID_PENDING",
  GET_DISCOUNT_CODES_BY_ID_SUCESS: "GET_DISCOUNT_CODES_BY_ID_SUCESS",
  GET_DISCOUNT_CODES_BY_ID_ERROR: "GET_DISCOUNT_CODES_BY_ID_ERROR",
  GET_INDIVIDUAL_SESSION_PENDING: "GET_INDIVIDUAL_SESSION_PENDING",
  GET_INDIVIDUAL_SESSION_SUCESS: "GET_INDIVIDUAL_SESSION_SUCESS",
  GET_INDIVIDUAL_SESSION_ERROR: "GET_INDIVIDUAL_SESSION_ERROR",
  GET_INDIVIDUAL_SESSION_BY_ID_PENDING: "GET_INDIVIDUAL_SESSION_BY_ID_PENDING",
  GET_INDIVIDUAL_SESSION_BY_ID_SUCESS: "GET_INDIVIDUAL_SESSION_BY_ID_SUCESS",
  GET_INDIVIDUAL_SESSION_BY_ID_ERROR: "GET_INDIVIDUAL_SESSION_BY_ID_ERROR",
  GET_EXTRA_CONFIG_SESSION_PENDING: "GET_EXTRA_CONFIG_SESSION_PENDING",
  GET_EXTRA_CONFIG_SESSION_SUCESS: "GET_EXTRA_CONFIG_SESSION_SUCESS",
  GET_EXTRA_CONFIG_SESSION_ERROR: "GET_EXTRA_CONFIG_SESSION_ERROR",
  GET_EXTRA_CONFIG_SESSION_BY_ID_PENDING:
    "GET_EXTRA_CONFIG_SESSION_BY_ID_PENDING",
  GET_EXTRA_CONFIG_SESSION_BY_ID_SUCESS:
    "GET_EXTRA_CONFIG_SESSION_BY_ID_SUCESS",
  GET_EXTRA_CONFIG_SESSION_BY_ID_ERROR: "GET_EXTRA_CONFIG_SESSION_BY_ID_ERROR",
  GET_MAIN_CONTACT_FIELD_PENDING: "GET_MAIN_CONTACT_FIELD_PENDING",
  GET_MAIN_CONTACT_FIELD_SUCESS: "GET_MAIN_CONTACT_FIELD_SUCESS",
  GET_MAIN_CONTACT_FIELD_ERROR: "GET_MAIN_CONTACT_FIELD_ERROR",
  GET_REGISTRANT_FIELDS_PENDING: "GET_REGISTRANT_FIELDS_PENDING",
  GET_REGISTRANT_FIELDS_SUCESS: "GET_REGISTRANT_FIELDS_SUCESS",
  GET_REGISTRANT_FIELDS_ERROR: "GET_REGISTRANT_FIELDS_ERROR",
  GET_PAGE_DESIGN_GRP_REG_PENDING: "GET_PAGE_DESIGN_GRP_REG_PENDING",
  GET_PAGE_DESIGN_GRP_REG_SUCESS: "GET_PAGE_DESIGN_GRP_REG_SUCESS",
  GET_PAGE_DESIGN_GRP_REG_ERROR: "GET_PAGE_DESIGN_GRP_REG_ERROR",
  GET_PAGE_DESIGN_EXHIBITOR_PENDING: "GET_PAGE_DESIGN_EXHIBITOR_PENDING",
  GET_PAGE_DESIGN_EXHIBITOR_SUCESS: "GET_PAGE_DESIGN_EXHIBITOR_SUCESS",
  GET_PAGE_DESIGN_EXHIBITOR_ERROR: "GET_PAGE_DESIGN_EXHIBITOR_ERROR",
  GET_EXHIBITOR_LIST_PENDING: "GET_EXHIBITOR_LIST_PENDING",
  GET_EXHIBITOR_LIST_SUCESS: "GET_EXHIBITOR_LIST_SUCESS",
  GET_EXHIBITOR_LIST_ERROR: "GET_EXHIBITOR_LIST_ERROR",
  GET_EXHIBITOR_LIST_BY_ID_PENDING: "GET_EXHIBITOR_LIST_BY_ID_PENDING",
  GET_EXHIBITOR_LIST_BY_ID_SUCESS: "GET_EXHIBITOR_LIST_BY_ID_SUCESS",
  GET_EXHIBITOR_LIST_BY_ID_ERROR: "GET_EXHIBITOR_LIST_BY_ID_ERROR",
  GET_EXHIBITOR_BOOTH_MEMBERS_PENDING: "GET_EXHIBITOR_BOOTH_MEMBERS_PENDING",
  GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS: "GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS",
  GET_EXHIBITOR_BOOTH_MEMBERS_ERROR: "GET_EXHIBITOR_BOOTH_MEMBERS_ERROR",
  GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_PENDING:
    "GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_PENDING",
  GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_SUCESS:
    "GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_SUCESS",
  GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_ERROR:
    "GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_ERROR",
  GET_EMAIL_SETUP_PENDING: "GET_EMAIL_SETUP_PENDING",
  GET_EMAIL_SETUP_SUCESS: "GET_EMAIL_SETUP_SUCESS",
  GET_EMAIL_SETUP_ERROR: "GET_EMAIL_SETUP_ERROR",
  GET_REGISTRANTS_LIST_PENDING: "GET_REGISTRANTS_LIST_PENDING",
  GET_REGISTRANTS_LIST_SUCESS: "GET_REGISTRANTS_LIST_SUCESS",
  GET_REGISTRANTS_LIST_ERROR: "GET_REGISTRANTS_LIST_ERROR",
  GET_QUESTIONS_REGISTRANTS_LIST_PENDING:
    "GET_QUESTIONS_REGISTRANTS_LIST_PENDING",
  GET_QUESTIONS_REGISTRANTS_LIST_SUCESS:
    "GET_QUESTIONS_REGISTRANTS_LIST_SUCESS",
  GET_QUESTIONS_REGISTRANTS_LIST_ERROR: "GET_QUESTIONS_REGISTRANTS_LIST_ERROR",
  GET_GUEST_ADDITIONAL_REGISTRANT_PENDING:
    "GET_GUEST_ADDITIONAL_REGISTRANT_PENDING",
  GET_GUEST_ADDITIONAL_REGISTRANT_SUCESS:
    "GET_GUEST_ADDITIONAL_REGISTRANT_SUCESS",
  GET_GUEST_ADDITIONAL_REGISTRANT_ERROR:
    "GET_GUEST_ADDITIONAL_REGISTRANT_ERROR",
  GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_PENDING:
    "GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_PENDING",
  GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_SUCESS:
    "GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_SUCESS",
  GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_ERROR:
    "GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_ERROR",
  GET_ANSWERS_REGISTRANT_PENDING: "GET_ANSWERS_REGISTRANT_PENDING",
  GET_ANSWERS_REGISTRANT_SUCESS: "GET_ANSWERS_REGISTRANT_SUCESS",
  GET_ANSWERS_REGISTRANT_ERROR: "GET_ANSWERS_REGISTRANT_ERROR",
  GET_REGISTRANTS_SESSIONS_PENDING: "GET_REGISTRANTS_SESSIONS_PENDING",
  GET_REGISTRANTS_SESSIONS_SUCESS: "GET_REGISTRANTS_SESSIONS_SUCESS",
  GET_REGISTRANTS_SESSIONS_ERROR: "GET_REGISTRANTS_SESSIONS_ERROR",
  GET_SESSIONS_CONFIG_PENDING: "GET_SESSIONS_CONFIG_PENDING",
  GET_SESSIONS_CONFIG_SUCESS: "GET_SESSIONS_CONFIG_SUCESS",
  GET_SESSIONS_CONFIG_ERROR: "GET_SESSIONS_CONFIG_ERROR",
  GET_REGISTRANT_SESSIONS_BY_ID_PENDING:
    "GET_REGISTRANT_SESSIONS_BY_ID_PENDING",
  GET_REGISTRANT_SESSIONS_BY_ID_SUCESS: "GET_REGISTRANT_SESSIONS_BY_ID_SUCESS",
  GET_REGISTRANT_SESSIONS_BY_ID_ERROR: "GET_REGISTRANT_SESSIONS_BY_ID_ERROR",
  GET_REG_PAYMENTS_PENDING: "GET_REG_PAYMENTS_PENDING",
  GET_REG_PAYMENTS_SUCESS: "GET_REG_PAYMENTS_SUCESS",
  GET_REG_PAYMENTS_ERROR: "GET_REG_PAYMENTS_ERROR",
  GET_REG_PAYMENTS_BY_ID_PENDING: "GET_REG_PAYMENTS_BY_ID_PENDING",
  GET_REG_PAYMENTS_BY_ID_SUCESS: "GET_REG_PAYMENTS_BY_ID_SUCESS",
  GET_REG_PAYMENTS_BY_ID_ERROR: "GET_REG_PAYMENTS_BY_ID_ERROR",
  GET_REG_AMOUNT_PENDING: "GET_REG_AMOUNT_PENDING",
  GET_REG_AMOUNT_SUCESS: "GET_REG_AMOUNT_SUCESS",
  GET_REG_AMOUNT_ERROR: "GET_REG_AMOUNT_ERROR",
  GET_STRIPE_DETAILS_PENDING: "GET_STRIPE_DETAILS_PENDING",
  GET_STRIPE_DETAILS_SUCESS: "GET_STRIPE_DETAILS_SUCESS",
  GET_STRIPE_DETAILS_ERROR: "GET_STRIPE_DETAILS_ERROR",
  GET_REGISTRANT_PENDING: "GET_REGISTRANT_PENDING",
  GET_REGISTRANT_SUCESS: "GET_REGISTRANT_SUCESS",
  GET_REGISTRANT_ERROR: "GET_REGISTRANT_ERROR",
  GET_REG_TYPE_AMOUNT_PENDING: "GET_REG_TYPE_AMOUNT_PENDING",
  GET_REG_TYPE_AMOUNT_SUCESS: "GET_REG_TYPE_AMOUNT_SUCESS",
  GET_REG_TYPE_AMOUNT_ERROR: "GET_REG_TYPE_AMOUNT_ERROR",
  RESET_REG_DATA: "RESET_REG_DATA",
  GET_PAYMENT_DETAILS_PENDING: "GET_PAYMENT_DETAILS_PENDING",
  GET_PAYMENT_DETAILS_SUCESS: "GET_PAYMENT_DETAILS_SUCESS",
  GET_PAYMENT_DETAILS_ERROR: "GET_PAYMENT_DETAILS_ERROR",
  RESET_ANSWER_DATA: "RESET_ANSWER_DATA",
  RESET_SESSION_PRICE: "RESET_SESSION_PRICE",
  RESET_REGISTRANTS_SESSIONS: "RESET_REGISTRANTS_SESSIONS",
  GET_GUEST_REGISTRANT_SUCESS: "GET_GUEST_REGISTRANT_SUCESS",
  GET_GUEST_REGISTRANT_ERROR: "GET_GUEST_REGISTRANT_ERROR",
  GET_GUEST_REGISTRANT_PENDING: "GET_GUEST_REGISTRANT_PENDING",
  GET_SESSION_PRICE_SUCESS: "GET_SESSION_PRICE_SUCESS",
  GET_SESSION_PRICE_ERROR: "GET_SESSION_PRICE_ERROR",
  GET_SESSION_PRICE_PENDING: "GET_SESSION_PRICE_PENDING",
  GET_EVENT_HEADER_FOOTER_SUCESS: "GET_EVENT_HEADER_FOOTER_SUCESS",
  GET_EVENT_HEADER_FOOTER_ERROR: "GET_EVENT_HEADER_FOOTER_ERROR",
  GET_EVENT_HEADER_FOOTER_PENDING: "GET_EVENT_HEADER_FOOTER_PENDING",
  GET_REG_TYPES_TEMPLATE1_SUCESS: "GET_REG_TYPES_TEMPLATE1_SUCESS",
  GET_REG_TYPES_TEMPLATE1_ERROR: "GET_REG_TYPES_TEMPLATE1_ERROR",
  GET_REG_TYPES_TEMPLATE1_PENDING: "GET_REG_TYPES_TEMPLATE1_PENDING",
  GET_FIELDS_PERSONAL_INFORMATION_SUCESS:
    "GET_FIELDS_PERSONAL_INFORMATION_SUCESS",
  GET_FIELDS_PERSONAL_INFORMATION_ERROR:
    "GET_FIELDS_PERSONAL_INFORMATION_ERROR",
  GET_FIELDS_PERSONAL_INFORMATION_PENDING:
    "GET_FIELDS_PERSONAL_INFORMATION_PENDING",
  GET_FIELDS_REGISTRANT_GUEST_SUCESS: "GET_FIELDS_REGISTRANT_GUEST_SUCESS",
  GET_FIELDS_REGISTRANT_GUEST_ERROR: "GET_FIELDS_REGISTRANT_GUEST_ERROR",
  GET_FIELDS_REGISTRANT_GUEST_PENDING: "GET_FIELDS_REGISTRANT_GUEST_PENDING",
  RESET_REG_TYPES_TEMPLATE1: "RESET_REG_TYPES_TEMPLATE1",
  GET_SESSIONS_TICKETS_DATA_TEMPLATE1_SUCESS:
    "GET_SESSIONS_TICKETS_DATA_TEMPLATE1_SUCESS",
  GET_SESSIONS_TICKETS_DATA_TEMPLATE1_ERROR:
    "GET_SESSIONS_TICKETS_DATA_TEMPLATE1_ERROR",
  GET_SESSIONS_TICKETS_DATA_TEMPLATE1_PENDING:
    "GET_SESSIONS_TICKETS_DATA_TEMPLATE1_PENDING",
  GET_ADDITIONAL_REGISTRANTS_LIST_SUCESS:
    "GET_ADDITIONAL_REGISTRANTS_LIST_SUCESS",
  GET_ADDITIONAL_REGISTRANTS_LIST_ERROR:
    "GET_ADDITIONAL_REGISTRANTS_LIST_ERROR",
  GET_ADDITIONAL_REGISTRANTS_LIST_PENDING:
    "GET_ADDITIONAL_REGISTRANTS_LIST_PENDING",
  GET_FIELDS_REGISTRANT_SUCESS: "GET_FIELDS_REGISTRANT_SUCESS",
  GET_FIELDS_REGISTRANT_ERROR: "GET_FIELDS_REGISTRANT_ERROR",
  GET_FIELDS_REGISTRANT_PENDING: "GET_FIELDS_REGISTRANT_PENDING",
  GET_SESSIONS_TICKETS_DATA_TEMPLATE21_SUCESS:
    "GET_SESSIONS_TICKETS_DATA_TEMPLATE21_SUCESS",
  GET_SESSIONS_TICKETS_DATA_TEMPLATE21_ERROR:
    "GET_SESSIONS_TICKETS_DATA_TEMPLATE21_ERROR",
  GET_SESSIONS_TICKETS_DATA_TEMPLATE21_PENDING:
    "GET_SESSIONS_TICKETS_DATA_TEMPLATE21_PENDING",
  GET_REGISTRANTS_INFO_SUCESS: "GET_REGISTRANTS_INFO_SUCESS",
  GET_REGISTRANTS_INFO_ERROR: "GET_REGISTRANTS_INFO_ERROR",
  GET_REGISTRANTS_INFO_PENDING: "GET_REGISTRANTS_INFO_PENDING",
  GET_REGISTRANTS_SESSIONS_TEMPLATE21_SUCESS:
    "GET_REGISTRANTS_SESSIONS_TEMPLATE21_SUCESS",
  GET_REGISTRANTS_SESSIONS_TEMPLATE21_ERROR:
    "GET_REGISTRANTS_SESSIONS_TEMPLATE21_ERROR",
  GET_REGISTRANTS_SESSIONS_TEMPLATE21_PENDING:
    "GET_REGISTRANTS_SESSIONS_TEMPLATE21_PENDING",
  GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_SUCESS:
    "GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_SUCESS",
  GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_ERROR:
    "GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_ERROR",
  GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_PENDING:
    "GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_PENDING",

  SET_MEMBER_LIST_PENDING: "SET_MEMBER_LIST_PENDING",
  SET_MEMBER_LIST_SUCESS: "SET_MEMBER_LIST_SUCESS",
  SET_MEMBER_LIST_ERROR: "SET_MEMBER_LIST_ERROR",
};

const CONSTANT = [];
CONSTANT[1] = "Administrator";
CONSTANT[2] = "Onsite User";

CONSTANT[3] = "Authorize.net";
CONSTANT[4] = "Pay Pal";
CONSTANT[5] = "Pay Flow";
CONSTANT[6] = "Payeezy Gateway";
CONSTANT[7] = "Payeezy API";
CONSTANT[8] = "QuickBookPayments";
CONSTANT[9] = "Stripe";

export default CONSTANT;
