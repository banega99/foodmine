const BASE_URL = 'https://foodmine-backend-bk.vercel.app';

//http://localhost:5000
//https://foodmine-back.onrender.com

export const FOODS_URL = BASE_URL + '/food';
export const FOODS_TAGS_URL = BASE_URL + '/tags';
export const FOODS_BY_NAME_URL = FOODS_URL + '/';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = BASE_URL + '/tags/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/users/login';
export const USER_REGISTER_URL = BASE_URL + '/users/register';
export const USER_PROFILE_URL = BASE_URL + '/users/profile/';

export const ORDERS_URL = BASE_URL + '/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL =
  ORDERS_URL + '/newOrderForCurrentUser/';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const USER_ORDERS_URL = ORDERS_URL + '/user/';
