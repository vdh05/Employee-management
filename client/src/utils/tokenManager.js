// Token Manager for handling JWT tokens
export const TokenManager = {
  // Store employee token
  setEmployeeToken: (token) => {
    if (token) {
      localStorage.setItem('EMtoken', token);
    }
  },

  // Get employee token
  getEmployeeToken: () => {
    return localStorage.getItem('EMtoken');
  },

  // Clear employee token
  clearEmployeeToken: () => {
    localStorage.removeItem('EMtoken');
  },

  // Store HR token
  setHRToken: (token) => {
    if (token) {
      localStorage.setItem('HRtoken', token);
    }
  },

  // Get HR token
  getHRToken: () => {
    return localStorage.getItem('HRtoken');
  },

  // Clear HR token
  clearHRToken: () => {
    localStorage.removeItem('HRtoken');
  },

  // Clear all tokens
  clearAllTokens: () => {
    localStorage.removeItem('EMtoken');
    localStorage.removeItem('HRtoken');
  },
};
