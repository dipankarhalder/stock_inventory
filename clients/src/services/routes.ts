export const baseUrl = "http://localhost:4000";
export const v1 = "api/v1";

// authentication
export const loginService = `${v1}/auth/signin`;
export const registerService = `${v1}/auth/signup`;
export const logoutService = `${v1}/auth/signout`;

// profile
export const profileMeService = `${v1}/profile/me`;
export const profilesService = `${v1}/profile`;
export const updateProfilesService = `${v1}/profile/update-profile`;

// consumer
export const consumerAddService = `${v1}/consumer/new`;
export const consumerListService = `${v1}/consumer/list`;
export const consumerProfileService = `${v1}/consumer`;

// event
export const eventListService = `${v1}/event/list`;
export const eventService = `${v1}/event`;

// transaction
export const transactionListService = `${v1}/transaction/list`;
export const transactionService = `${v1}/transaction`;
