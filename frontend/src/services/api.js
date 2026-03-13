const API_URL = "http://localhost:8080/api";

// ===============================
// TOKEN
// ===============================

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// ===============================
// AUTH
// ===============================

export const register = async (user) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  return res.json();
};

export const login = async (user) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  const data = await res.json();

  // lưu token ngay khi login thành công
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

export const googleLogin = async (tokenId) => {
  const res = await fetch(`${API_URL}/auth/google-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tokenId })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

// ===============================
// HELPER FETCH
// ===============================

export const fetchWithAuth = async (endpoint, options = {}) => {
  try {

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...authHeaders(),
        ...(options.headers || {})
      }
    });

    if (res.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Phiên đăng nhập hết hạn");

      window.location.href = "/login";

      return { error: true };
    }

    if (!res.ok) {

      if (res.status === 403) {
        return {
          error: true,
          message: "Bạn không có quyền thực hiện thao tác này (403)"
        };
      }

      const err = await res.json();
      return { error: true, message: err.message };
    }

    return await res.json();

  } catch (err) {

    console.error("API ERROR:", err);

    return {
      error: true,
      message: "Không thể kết nối server"
    };
  }
};

// ===============================
// SERVICES
// ===============================

export const getServices = async () => {

  const res = await fetch(`${API_URL}/services`);

  if (!res.ok) return [];

  return res.json();
};

export const getServiceById = async (id) => {

  const res = await fetch(`${API_URL}/services/${id}`);

  if (!res.ok) return null;

  return res.json();
};

export const createService = async (service) => {

  return fetchWithAuth("/services", {
    method: "POST",
    body: JSON.stringify(service)
  });

};

export const updateService = async (id, service) => {

  return fetchWithAuth(`/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(service)
  });

};

export const deleteService = async (id) => {

  const res = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  return res.ok;
};

// ===============================
// LOGOUT
// ===============================

export const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";

};