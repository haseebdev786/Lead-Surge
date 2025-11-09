import { useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';
import {
  heroPanelClass,
  panelClass,
  inputClass,
  primaryButtonClass,
  infoTextClass,
  pillClass,
  mutedLabelClass,
} from '../utils/ui';

/**
 * Hashtag Discovery page. Allows the user to enter a topic or caption
 * and requests the backend to generate a set of hashtags via the AI
 * integration. The result displays the suggested hashtags alongside
 * metadata like tokens used and credits deducted. This page is protected
 * with authentication.
 */
function HashtagDiscovery() {
  const { refresh } = useAuth();
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [tokensUsed, setTokensUsed] = useState(null);
  const [creditsDeducted, setCreditsDeducted] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setHashtags('');
    setTokensUsed(null);
    setCreditsDeducted(null);
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/hashtags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate hashtags');
      setHashtags(data.hashtags);
      setTokensUsed(data.tokensUsed);
      setCreditsDeducted(data.creditsDeducted);
      // Refresh user to update credits
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderHashtags = () => {
    if (!hashtags) return null;
    const list = hashtags.split(',').map((h) => h.trim());
    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">Suggested hashtags</h3>
        <div className="flex flex-wrap gap-2">
          {list.map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-sky-200"
            >
              #{h}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className={heroPanelClass}>
          <div className="flex flex-col gap-4">
            <p className={pillClass}>AI ideation</p>
            <h2 className="text-4xl font-semibold text-white">Hashtag Discovery</h2>
            <p className="text-sm text-slate-300">
              Describe your campaign and let AI surface hyper-relevant hashtags that are ready to copy into the scheduler.
            </p>
          </div>
        </section>

        <section className={`${panelClass} space-y-6`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="topic" className={mutedLabelClass}>
                Topic or caption
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                placeholder="Describe your post content..."
                className={inputClass}
              />
              <p className={`${infoTextClass} mt-2`}>
                AI usage deducts credits. Keep prompts concise for best results.
              </p>
            </div>
            <button type="submit" disabled={loading} className={primaryButtonClass}>
              {loading ? 'Generating...' : 'Generate hashtags'}
            </button>
          </form>
          {error && (
            <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">{error}</p>
          )}
          {renderHashtags()}
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(HashtagDiscovery);
