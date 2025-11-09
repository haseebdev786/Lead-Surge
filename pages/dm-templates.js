import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';
import {
  heroPanelClass,
  panelClass,
  inputClass,
  textareaClass,
  primaryButtonClass,
  secondaryButtonClass,
  infoTextClass,
  pillClass,
  mutedLabelClass,
  dangerButtonClass,
} from '../utils/ui';

/**
 * DM Automation page. Allows users to create reusable DM templates, list
 * existing templates, personalize a template using the AI service and
 * send direct messages to a recipient. Each action updates the user
 * credits accordingly and displays feedback.
 */
function DMTemplates() {
  const { refresh } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing templates on mount
  useEffect(() => {
    async function fetchTemplates() {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dms/templates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTemplates(data);
        }
      } catch (err) {
        console.error('Failed to load templates', err);
      }
    }
    fetchTemplates();
  }, []);

  async function addTemplate(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dms/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create template');
      setTemplates([data, ...templates]);
      setName('');
      setMessage('');
      setInfo('Template created');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTemplate(id) {
    setError('');
    setInfo('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dms/templates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setTemplates(templates.filter((t) => t._id !== id));
      if (selectedTemplate === id) setSelectedTemplate('');
      setInfo('Template deleted');
    } catch (err) {
      setError(err.message);
    }
  }

  async function personalize() {
    setError('');
    setInfo('');
    if (!selectedTemplate) {
      setError('Please select a template first');
      return;
    }
    const tpl = templates.find((t) => t._id === selectedTemplate);
    if (!tpl) {
      setError('Selected template not found');
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ template: tpl.message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to personalize message');
      setPersonalizedMessage(data.message);
      setInfo('Message personalized');
      // Refresh credits after AI usage
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function sendDM() {
    setError('');
    setInfo('');
    if (!selectedTemplate) {
      setError('Please select a template first');
      return;
    }
    if (!recipientId) {
      setError('Recipient ID is required');
      return;
    }
    const tpl = templates.find((t) => t._id === selectedTemplate);
    const textToSend = personalizedMessage || (tpl ? tpl.message : '');
    if (!textToSend) {
      setError('No message to send');
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ recipientId, message: textToSend }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send DM');
      setInfo('Message sent successfully');
      setRecipientId('');
      setPersonalizedMessage('');
      // Refresh credits if any cost is incurred (though sending DM might not cost credits)
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className={heroPanelClass}>
          <div className="flex flex-col gap-4">
            <p className={pillClass}>Outreach studio</p>
            <h2 className="text-4xl font-semibold text-white">DM Automation</h2>
            <p className="text-sm text-slate-300">
              Save reusable scripts, personalize them with AI and push Instagram DMs without leaving your dashboard.
            </p>
          </div>
        </section>
        {error && (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">{error}</p>
        )}
        {info && (
          <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
            {info}
          </p>
        )}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Template creation section */}
          <div className={`${panelClass} space-y-4`}>
            <div>
              <p className={pillClass}>Templates</p>
              <h3 className="text-2xl font-semibold text-white">Create a template</h3>
              <p className={infoTextClass}>Draft once, reuse forever. AI can personalize later.</p>
            </div>
            <form onSubmit={addTemplate} className="space-y-4">
              <div>
                <label htmlFor="name" className={mutedLabelClass}>
                  Template Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message" className={mutedLabelClass}>
                  Message Text
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  className={textareaClass}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={primaryButtonClass}
                >
                  {loading ? 'Saving...' : 'Save Template'}
                </button>
              </div>
            </form>
          </div>
          {/* Templates list and actions */}
          <div className={`${panelClass} space-y-4`}>
            <div>
              <p className={pillClass}>Library</p>
              <h3 className="text-2xl font-semibold text-white">Templates</h3>
              <p className={infoTextClass}>Select, personalize and send without leaving this panel.</p>
            </div>
            {templates.length === 0 ? (
              <p className={infoTextClass}>No templates created yet.</p>
            ) : (
              <ul className="space-y-3">
                {templates.map((tpl) => (
                  <li
                    key={tpl._id}
                    className={`rounded-2xl border p-3 text-sm ${
                      selectedTemplate === tpl._id
                        ? 'border-sky-400/40 bg-sky-500/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-white">{tpl.name}</p>
                        <p className="text-slate-300 break-words">{tpl.message}</p>
                      </div>
                      <button
                        onClick={() => deleteTemplate(tpl._id)}
                        className={`${dangerButtonClass} ml-2`}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTemplate(tpl._id)}
                        className={`text-xs ${
                          selectedTemplate === tpl._id
                            ? 'rounded-full bg-sky-500/80 px-3 py-1 font-semibold text-white'
                            : 'rounded-full border border-white/15 px-3 py-1 text-slate-300 hover:border-white/40'
                        }`}
                      >
                        {selectedTemplate === tpl._id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {/* Personalization and sending section */}
            {templates.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-xl font-semibold text-white">Personalize & Send</h4>
                <div>
                  <label htmlFor="recipient" className={mutedLabelClass}>
                    Recipient IG User ID
                  </label>
                  <input
                    id="recipient"
                    type="text"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    placeholder="123456789"
                    className={inputClass}
                  />
                </div>
                {personalizedMessage && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-semibold text-white">Personalized Message</p>
                    <p className="text-slate-200 whitespace-pre-line break-words">{personalizedMessage}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={personalize}
                    disabled={loading}
                    className={secondaryButtonClass}
                  >
                    {loading ? 'Generating...' : 'Personalize Message'}
                  </button>
                  <button
                    type="button"
                    onClick={sendDM}
                    disabled={loading}
                    className={primaryButtonClass}
                  >
                    {loading ? 'Sending...' : 'Send DM'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(DMTemplates);
