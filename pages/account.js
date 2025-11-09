import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';
import {
  heroPanelClass,
  panelClass,
  inputClass,
  textareaClass,
  selectClass,
  primaryButtonClass,
  secondaryButtonClass,
  infoTextClass,
  pillClass,
  mutedLabelClass,
  dangerButtonClass,
} from '../utils/ui';

function Account() {
  const { user, refresh } = useAuth();
  // const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [socialStatus, setSocialStatus] = useState({
    connected: false,
    instagramBusinessAccountId: null,
    facebookPageId: null,
  });
  const [socialForm, setSocialForm] = useState({
    longLivedToken: '',
    instagramBusinessAccountId: '',
    facebookPageId: '',
  });
  const [socialLoading, setSocialLoading] = useState(true);
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialMessage, setSocialMessage] = useState('');
  const [socialError, setSocialError] = useState('');

  const [aiStatus, setAiStatus] = useState({ provider: 'openai', hasApiKey: false });
  const [aiForm, setAiForm] = useState({ provider: 'openai', apiKey: '' });
  const [aiLoading, setAiLoading] = useState(true);
  const [aiSaving, setAiSaving] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    loadSocial();
    loadAi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSocial() {
    setSocialLoading(true);
    setSocialError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBaseUrl}/account/social`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error('Unable to load social configuration');
      }
      const data = await res.json();
      setSocialStatus(data);
      setSocialForm((prev) => ({
        ...prev,
        longLivedToken: '',
        instagramBusinessAccountId: data.instagramBusinessAccountId || '',
        facebookPageId: data.facebookPageId || '',
      }));
    } catch (err) {
      setSocialError(err.message);
    } finally {
      setSocialLoading(false);
    }
  }

  async function loadAi() {
    setAiLoading(true);
    setAiError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBaseUrl}/account/ai`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error('Unable to load AI configuration');
      }
      const data = await res.json();
      setAiStatus(data);
      setAiForm((prev) => ({
        ...prev,
        provider: data.provider || 'openai',
        apiKey: '',
      }));
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAiChange = (e) => {
    const { name, value } = e.target;
    setAiForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    setSocialError('');
    setSocialMessage('');
    setSocialSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        instagramBusinessAccountId: socialForm.instagramBusinessAccountId.trim() || null,
        facebookPageId: socialForm.facebookPageId.trim() || null,
      };
      if (socialForm.longLivedToken.trim()) {
        payload.longLivedToken = socialForm.longLivedToken.trim();
      }
      const res = await fetch(`${apiBaseUrl}/account/social`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update social configuration');
      }
      setSocialMessage('Social configuration saved.');
      setSocialForm((prev) => ({ ...prev, longLivedToken: '' }));
      await loadSocial();
      await refresh();
    } catch (err) {
      setSocialError(err.message);
    } finally {
      setSocialSaving(false);
    }
  };

  const handleSocialDisconnect = async () => {
    setSocialError('');
    setSocialMessage('');
    setSocialSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBaseUrl}/account/social`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to disconnect social account');
      }
      setSocialMessage('Social account disconnected.');
      await loadSocial();
      await refresh();
    } catch (err) {
      setSocialError(err.message);
    } finally {
      setSocialSaving(false);
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    setAiError('');
    setAiMessage('');
    setAiSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBaseUrl}/account/ai`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: aiForm.provider,
          apiKey: aiForm.apiKey.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update AI configuration');
      }
      setAiMessage('AI configuration saved.');
      setAiForm((prev) => ({ ...prev, apiKey: '' }));
      await loadAi();
      await refresh();
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiSaving(false);
    }
  };

  const handleAiDisconnect = async () => {
    setAiError('');
    setAiMessage('');
    setAiSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBaseUrl}/account/ai`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove AI configuration');
      }
      setAiMessage('AI configuration removed.');
      await loadAi();
      await refresh();
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiSaving(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className={heroPanelClass}>
          <div className="flex flex-col gap-4">
            <p className={pillClass}>Integrations</p>
            <h2 className="text-4xl font-semibold text-white">Account Settings</h2>
            <p className="text-sm text-slate-300">
              Connect Meta assets and manage AI keys so posts and automations keep running from your own infrastructure.
            </p>
          </div>
        </section>

        <section className={`${panelClass} space-y-4`}>
          <div>
            <h2 className="text-xl font-semibold">Meta Account Connection</h2>
            <p className={infoTextClass}>
              Provide your long-lived token and business IDs so posting and DM automation use your own Facebook/Instagram
              assets.
            </p>
            <p className={`${infoTextClass} text-amber-200`}>
              Note: The token saved here is not a permanent token. For a true long-term Meta setup, please contact our help
              team at{' '}
              <a href="mailto:support@leadsuite.ai" className="text-sky-300 underline-offset-2 hover:text-white hover:underline">
                support@leadsuite.ai
              </a>{' '}
              and we&rsquo;ll provision a managed solution.
            </p>
          </div>
          {socialError && <p className="text-sm text-red-600">{socialError}</p>}
          {socialMessage && <p className="text-sm text-green-600">{socialMessage}</p>}
          <p className="text-sm">
            Status:{' '}
            <span className={socialStatus.connected ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {socialStatus.connected ? 'Connected' : 'Not Connected'}
            </span>
          </p>
          {socialLoading ? (
            <p className={infoTextClass}>Loading current configuration...</p>
          ) : (
            <form onSubmit={handleSocialSubmit} className="space-y-4">
              <div>
                <label htmlFor="longLivedToken" className={mutedLabelClass}>
                  Long-lived token
                </label>
                <textarea
                  id="longLivedToken"
                  name="longLivedToken"
                  value={socialForm.longLivedToken}
                  onChange={handleSocialChange}
                  placeholder="Paste new long-lived token (leave blank to keep current token)"
                  className={textareaClass}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="instagramBusinessAccountId" className={mutedLabelClass}>
                    Instagram Business Account ID
                  </label>
                  <input
                    id="instagramBusinessAccountId"
                    name="instagramBusinessAccountId"
                    value={socialForm.instagramBusinessAccountId}
                    onChange={handleSocialChange}
                    className={inputClass}
                    placeholder="IG business account ID"
                  />
                </div>
                <div>
                  <label htmlFor="facebookPageId" className={mutedLabelClass}>
                    Facebook Page ID
                  </label>
                  <input
                    id="facebookPageId"
                    name="facebookPageId"
                    value={socialForm.facebookPageId}
                    onChange={handleSocialChange}
                    className={inputClass}
                    placeholder="Page ID"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={socialSaving}
                  className={primaryButtonClass}
                >
                  {socialSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={handleSocialDisconnect}
                  disabled={socialSaving}
                  className={dangerButtonClass}
                >
                  Disconnect
                </button>
              </div>
            </form>
          )}
        </section>

        {/* <section className={`${panelClass} space-y-4`}>
          <div>
            <h2 className="text-xl font-semibold">AI Provider</h2>
            <p className={infoTextClass}>
              Add your own OpenAI or Gemini API key so usage costs are billed directly to your account.
            </p>
          </div>
          {aiError && <p className="text-sm text-red-600">{aiError}</p>}
          {aiMessage && <p className="text-sm text-green-600">{aiMessage}</p>}
          <p className="text-sm">
            Status:{' '}
            <span className={aiStatus.hasApiKey ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {aiStatus.hasApiKey ? `Configured (${aiStatus.provider})` : 'Not Configured'}
            </span>
          </p>
          {aiLoading ? (
            <p className={infoTextClass}>Loading AI configuration...</p>
          ) : (
            <form onSubmit={handleAiSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="provider" className={mutedLabelClass}>
                    Provider
                  </label>
                  <select
                    id="provider"
                    name="provider"
                    value={aiForm.provider}
                    onChange={handleAiChange}
                    className={selectClass}
                  >
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Google Gemini</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="apiKey" className={mutedLabelClass}>
                    API Key
                  </label>
                  <input
                    id="apiKey"
                    name="apiKey"
                    type="text"
                    value={aiForm.apiKey}
                    onChange={handleAiChange}
                    placeholder="Paste new API key"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={aiSaving}
                  className={primaryButtonClass}
                >
                  {aiSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={handleAiDisconnect}
                  disabled={aiSaving}
                  className={secondaryButtonClass}
                >
                  Remove Key
                </button>
              </div>
            </form>
          )}
        </section> */}
      </div>
    </Layout>
  );
}

export default withAuth(Account);
