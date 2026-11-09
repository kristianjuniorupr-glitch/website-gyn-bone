const API_BASE = '/api';

export function getAdminToken() {
  return sessionStorage.getItem('corex_admin_token') || localStorage.getItem('corex_admin_token');
}

export function setAdminToken(token, user) {
  if (token) {
    sessionStorage.setItem('corex_admin_token', token);
    if (user) sessionStorage.setItem('corex_admin_user', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('corex_admin_token');
    sessionStorage.removeItem('corex_admin_user');
    localStorage.removeItem('corex_admin_token');
    localStorage.removeItem('corex_admin_user');
  }
}

export function getAdminUser() {
  try {
    const raw = sessionStorage.getItem('corex_admin_user') || localStorage.getItem('corex_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

// ---------------- PUBLIC USER ENDPOINTS ---------------- //

export async function fetchSchedules(day = 'MON') {
  const url = day && day !== 'ALL' ? `${API_BASE}/schedules?day=${day}` : `${API_BASE}/schedules`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch schedules');
  return res.json();
}

export async function bookClass(data) {
  const res = await fetch(`${API_BASE}/schedules/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to book class');
  return json;
}

export async function cancelBooking(id) {
  const res = await fetch(`${API_BASE}/schedules/booking/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to cancel booking');
  return json;
}

export async function fetchPlans() {
  const res = await fetch(`${API_BASE}/memberships/plans`);
  if (!res.ok) throw new Error('Failed to fetch plans');
  return res.json();
}

export async function joinMembership(data) {
  const res = await fetch(`${API_BASE}/memberships/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to join membership');
  return json;
}

export async function fetchTrainers() {
  const res = await fetch(`${API_BASE}/trainers`);
  if (!res.ok) throw new Error('Failed to fetch trainers');
  return res.json();
}

export async function bookConsultation(data) {
  const res = await fetch(`${API_BASE}/trainers/consult`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to book consultation');
  return json;
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to subscribe');
  return json;
}

export async function fetchFAQs() {
  const res = await fetch(`${API_BASE}/faqs`);
  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}

// ---------------- CUSTOM ADMIN AUTH ENDPOINTS ---------------- //

export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Authentication failed');
  
  if (json.token) {
    setAdminToken(json.token, json.user);
  }
  return json;
}

export async function adminLogout() {
  try {
    await fetch(`${API_BASE}/admin/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
  } catch (err) {
    console.warn('Logout notification error:', err);
  } finally {
    setAdminToken(null, null);
  }
}

export async function verifyAdminSession() {
  const token = getAdminToken();
  if (!token) return { valid: false };

  const res = await fetch(`${API_BASE}/admin/verify`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    setAdminToken(null, null);
    return { valid: false };
  }
  return res.json();
}

// ---------------- PROTECTED ADMIN DATA ENDPOINTS ---------------- //

export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch admin stats');
  return json;
}

export async function fetchAdminBookings() {
  const res = await fetch(`${API_BASE}/admin/bookings`, {
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch admin bookings');
  return json;
}

export async function cancelBookingAdmin(id) {
  const res = await fetch(`${API_BASE}/admin/bookings/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to cancel booking');
  return json;
}

export async function fetchAdminMembers() {
  const res = await fetch(`${API_BASE}/admin/members`, {
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch admin members');
  return json;
}

export async function fetchAdminSubscribers() {
  const res = await fetch(`${API_BASE}/admin/subscribers`, {
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch admin subscribers');
  return json;
}

export async function resetDatabase() {
  const res = await fetch(`${API_BASE}/admin/reset`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to reset database');
  return json;
}
