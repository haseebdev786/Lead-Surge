import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import withAuth from '../../hoc/withAuth';
import {
  heroPanelClass,
  panelClass,
  selectClass,
  inputClass,
  pillClass,
} from '../../utils/ui';

/**
 * Admin Users page. Lists all users with their email, role and credits. An admin
 * can update a user's role and credit balance directly from this table.
 * The page is protected by the withAuth HOC with the adminOnly flag.
 */
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          const err = await res.json();
          setError(err.error || 'Failed to fetch users');
        }
      } catch (err) {
        setError('Failed to fetch users');
      }
    }
    fetchUsers();
  }, []);

  async function updateUser(id, role, credits) {
    setError('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role, credits }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setUsers(users.map((u) => (u._id === id ? data : u)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className={heroPanelClass}>
          <div className="flex flex-col gap-4">
            <p className={pillClass}>Admin console</p>
            <h2 className="text-4xl font-semibold text-white">Admin - Users</h2>
            <p className="text-sm text-slate-300">Adjust roles and credit balances across workspaces.</p>
          </div>
        </section>
        {error && <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">{error}</p>}
        <div className={`${panelClass} overflow-x-auto`}>
          <table className="min-w-full text-sm text-slate-200">
            <thead className="text-left text-xs uppercase text-slate-400">
              <tr className="border-b border-white/10">
                <th className="px-3 py-2 font-semibold">Email</th>
                <th className="px-3 py-2 font-semibold">Role</th>
                <th className="px-3 py-2 font-semibold">Credits</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-white/10 last:border-b-0">
                  <td className="px-3 py-2 break-all text-slate-100">{user.email}</td>
                  <td className="px-3 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => updateUser(user._id, e.target.value, user.credits)}
                      className={selectClass}
                    >
                      <option value="customer">customer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min="0"
                      value={user.credits}
                      onChange={(e) => updateUser(user._id, user.role, parseInt(e.target.value, 10))}
                      className={`${inputClass} w-28`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(AdminUsers, { adminOnly: true });

