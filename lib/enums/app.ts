/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

// routes of the frontend
export enum Routs {
    HOME = "/",
    LOGIN = "/login",
    REGISTER = "/register",
    ITEMS = "/items",
    ORDER = "/order",
    ADMIN_ORDERS = "/admin/orders",
    ADMIN_ORDER_DETAILS = "/admin/order",
    POLICY = "/policy",
    TERMS = "/terms",
}

// endpoints of the backend
export enum Endpoints {
    // auth
    LOGIN = "login",
    REGISTER = "register",
    // users
    GET_ALL_USERS = "users",
    GET_USER_DETAILS = "users/USER_ID",
    UPDATE_USER = "users/USER_ID",
    DELETE_USER = "users/USER_ID",
    // items
    GET_ALL_ITEMS = "items",
    CREATE_NEW_ITEM = "items",
    GET_ITEM_DETAILS = "items/ITEM_ID",
    UPDATE_ITEM = "items/ITEM_ID",
    DELETE_ITEM = "items/ITEM_ID",
    GET_ITEM_ORDERS_COUNT = "items/ITEM_ID/orders",
    // orders
    GET_ALL_ORDERS = "orders",
    CREATE_NEW_ORDER = "orders",
    GET_ORDER_DETAILS = "orders/ORDER_ID",
    UPDATE_ORDER = "orders/ORDER_ID",
    DELETE_ORDER = "orders/ORDER_ID",
    // testimonials
    GET_ALL_TESTIMONIALS = "testimonials",
    CREATE_NEW_TESTIMONIAL = "testimonials",
    GET_TESTIMONIAL_DETAILS = "testimonials/TESTIMONIAL_ID",
    UPDATE_TESTIMONIAL = "testimonials/TESTIMONIAL_ID",
    DELETE_TESTIMONIAL = "testimonials/TESTIMONIAL_ID",
    // marbelous (static data)
    GET_ALL_MARBELOUS_RECORDS = "marbelous",
    CREATE_NEW_MARBELOUS_RECORD = "marbelous",
    GET_MARBELOUS_RECORD_DETAILS = "marbelous/IDENTIFIER",
    UPDATE_MARBELOUS_RECORD = "marbelous/IDENTIFIER",
    DELETE_MARBELOUS_RECORD = "marbelous/IDENTIFIER",
}
