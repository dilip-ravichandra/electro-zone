// Auth Guard - token check and authentication
class AuthGuard {
  static isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  static clearToken() {
    localStorage.removeItem('authToken');
  }

  static redirectToLogin() {
    window.location.href = '/public/auth.html';
  }

  static redirectToHome() {
    window.location.href = '/public/home.html';
  }

  static protectRoute() {
    if (!this.isAuthenticated()) {
      this.redirectToLogin();
    }
  }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  // If on a protected page and not authenticated, redirect
  const protectedPages = ['/public/home.html', '/public/product.html'];
  const currentPage = window.location.pathname;

  if (protectedPages.some((page) => currentPage.includes(page))) {
    AuthGuard.protectRoute();
  }
});
