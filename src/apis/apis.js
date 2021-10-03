const baseUrlWithSlash =
  // "https://qyuj7t5u48.execute-api.ap-south-1.amazonaws.com/development/";
  process.env.REACT_APP_API_BASE_URL;
// "https://8v2noslt2i.execute-api.ap-south-1.amazonaws.com/development/";
// "http://localhost:3001/";
// "https://8vd9crv0nh.execute-api.ap-south-1.amazonaws.com/staging/";
// "http://3.108.91.182:443/";

// process.env.REACT_APP_API_BASE_URL;
// "https://tr5lrjsyj5.execute-api.ap-south-1.amazonaws.com/staging/";
// "https://tr5lrjsyj5.execute-api.ap-south-1.amazonaws.com/staging/";
//

const apiUrls = {
  auth: {
    login: "api/auth/login",
    generateOtp: "api/auth/getOtp",
    updateSession: "api/auth/updateSession",
    verifyOtp: (query) => `api/auth/verifyOtp${query}`,
  },
  userDocuments: {
    upload: "api/userDocument",
    getUserDocuments: (userId) => `api/userDocument?user_id=${userId}`,
    getUserDocuments: (userId) => `api/userDocument?user_id=${userId}`,
    deleteUserDocument: (id) => `api/userDocument?_id=${id}`,
  },
  organization: {
    addOrganization: "api/organization",
    // getOrganization: (id) => `api/organization/getorganization?_id=${id}`,
    getOrganizations: (queryString) => `api/organization${queryString}`,
    importOrganizations: "api/organization/import",
    exportOrganizations: (type) => `api/organization/export?type=${type}`,
    getOrganizationsPaginate: (page, limit) =>
      `api/organization/paginate?page=${page}&limit=${limit}`,
    updateOrganization: (_id) => `api/organization?_id=${_id}`,
    deleteOrganization: (_id) => `api/organization/delete?_id=${_id}`,
    disableEmployee: (_id) => `api/organization/disable?_id=${_id}`,
    // isOrganizationExist: (key, value, _id) => {
    //   return `api/organization/isOrganizationExist?${key}=${value}${_id ? `&_id=${_id}` : ""
    //     }`;
    // },
  },
  employee: {
    downloadEmployees: "api/user/download",
    resetPassword: (userId) => `api/user/resetPassword?_id=${userId}`,
    addEmployee: "api/user",
    getEmployees: (queryString) => `api/user${queryString}`,
    // getOneEmployee: (id) => `api/user/getuser?_id=${id}`,
    getUserPassword: (id) => `api/user/getUserPassword?_id=${id}`,
    updateEmployee: "api/user",
    // deleteEmployee: (_id) => `api/user/delete?_id=${_id}`,
    // disableEmployee: (_id) => `api/user/disable?_id=${_id}`,
    changeStatus: (status, id) => `/api/user/status?_id=${id}&status=${status}`,
    importEmployees: "api/user/import/excel",
    exportEmployees: (type) => `api/user/export?type=${type}`,
    getEmployeePaginate: (query) => `api/user/paginate${query}`,
    changePassword: "api/user/changePassword",
    isEmployeeExist: (key, value, _id) => {
      return `api/user/isEmployeeExist?${key}=${value}${
        _id ? `&_id=${_id}` : ""
      }`;
    },
    getEmployeesForManagers: `api/user/getEmployeesForManagers`,
    getUsersFromIdList: "api/user/getFavourites",
    getMetaData: (query) => `api/user/meta${query}`,
    addMetaData: `api/user/meta`,
    getEmployeesDocuments: (query) => `api/userDocument/get/all${query}`,
    addFavourite: `api/user/favourites/add`,
    removeFavourite: `api/user/favourites/remove`,
    uploadProfilePicture: "api/user/profile_picture",
    getUsersWithSelectedFields: "api/user/getUsersWithSelectedFields",
  },
  user: {
    findOne: (id) => `api/user/getuser?_id=${id}`,
  },
  asset: {
    addAssets: "api/asset",
    getAssets: (query) => `api/asset${query}`,
    deleteAssets: (_id) => `api/asset?_id=${_id}`,
    importAssets: "api/asset/upload",
  },
  payslip: {
    getPayslips: `api/payslip/getPayslips`,
    getPayslipsByUserId: `api/payslip/getUserPayslips`,
    deletePayslips: (_id, fileType, filePath) =>
      `api/payslip?_id=${_id}&fileType=${fileType}&filePath=${filePath}`,
    uploadPayslip: `/api/payslip`,
  },
  leaves: {
    getLeaves: (query) => `api/leave?is_deleted=false${query}`,
    createLeave: `api/leave`,
    appliedLeaves: (query) => `api/leave/apply${query}`,
    getLeaveStats: (query) => `api/leave/stat${query}`,
    getLeaveTypes: (query) => `api/leave${query}`,
    applyForLeave: `api/leave/apply`,
  },
  holidays: {
    getHolidays: (queryString) => `api/holiday?${queryString}`,
    createHoliday: `api/holiday`,
  },
  otherDocuments: {
    uploadOtherDocs: `api/otherDocs/`,
  },
  getPresignedUrl: `api/userDocument/getUrl`,
  downloads: {
    employeeUploadSampleSheet: `api/downloads/employeeUploadSampleSheet/employee`,
    assetUploadSampleSheet: `api/downloads/employeeUploadSampleSheet/asset`,
  },
  activities: {
    getActivities: (query) => `api/activities?${query}`,
    addActivity: `api/activities`,
  },
  resignation: {
    getResignations: (query) => `api/resignation/find?${query}`,
    getEmployee: (query) => `api/resignation/findOne?${query}`,
    putResignation: `api/resignation/add`,
    addResignations: `api/resignation/add`,
  },
};

export { baseUrlWithSlash as apiBaseUrl };
export default apiUrls;
