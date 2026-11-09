const API_BASE = '/api';

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

export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
}

export async function fetchAdminBookings() {
  const res = await fetch(`${API_BASE}/admin/bookings`);
  if (!res.ok) throw new Error('Failed to fetch admin bookings');
  return res.json();
}

export async function fetchAdminMembers() {
  const res = await fetch(`${API_BASE}/admin/members`);
  if (!res.ok) throw new Error('Failed to fetch admin members');
  return res.json();
}

export async function fetchAdminSubscribers() {
  const res = await fetch(`${API_BASE}/admin/subscribers`);
  if (!res.ok) throw new Error('Failed to fetch admin subscribers');
  return res.json();
}

export async function resetDatabase() {
  const res = await fetch(`${API_BASE}/admin/reset`, {
    method: 'POST'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to reset database');
  return json;
}

