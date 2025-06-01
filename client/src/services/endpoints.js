export const baseUrl = "http://localhost:4000/api";

// authentication
export const loginService = `${baseUrl}/auth/signin`;
export const registerService = `${baseUrl}/auth/signup`;
export const logoutService = `${baseUrl}/auth/signout`;

// user suppliers
export const addSupplierService = `${baseUrl}/supplier/new`;
export const listSupplierService = `${baseUrl}/supplier/list`;

// user categories
export const addCategoryService = `${baseUrl}/category/new`;
export const listCategoriesService = `${baseUrl}/category/list`;
