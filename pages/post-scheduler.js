import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';
import {
  heroPanelClass,
  panelClass,
  inputClass,
  textareaClass,
  selectDarkClass,
  primaryButtonClass,
  secondaryButtonClass,
  infoTextClass,
  pillClass,
  statusPillMap,
  mutedLabelClass,
  dangerButtonClass,
} from '../utils/ui';

/**
 * Post Scheduler page. Provides a form to schedule or immediately publish
 * posts to Instagram or Facebook. Also displays a list of the user's
 * scheduled and posted items. On submission the form calls the backend
 * to create a schedule. The posts list is automatically refreshed.
 */
function PostScheduler() {
  const { refresh } = useAuth();
  const [caption, setCaption] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [aiError, setAiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [enhancingCaption, setEnhancingCaption] = useState(false);
  const fileInputRef = useRef(null);

  const scheduledCount = posts.filter((post) => post.status === 'scheduled').length;
  const failedCount = posts.filter((post) => post.status === 'failed').length;
  const postedCount = posts.filter((post) => post.status === 'posted').length;

  const alerts = [
    message && { tone: 'success', text: message },
    error && { tone: 'danger', text: error },
    aiError && { tone: 'danger', text: aiError },
    uploadError && { tone: 'danger', text: uploadError },
  ].filter(Boolean);

  const alertToneClasses = {
    success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
    danger: 'border-rose-400/30 bg-rose-500/10 text-rose-100',
  };

  const heroStats = [
    { label: 'Ready to post', value: scheduledCount },
    { label: 'Published', value: postedCount },
    { label: 'Needs attention', value: failedCount },
  ];

  const formatDate = (value) => {
    if (!value) return 'Not set';
    const date = new Date(value);
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  const getStatusPillClass = (status) => statusPillMap[status] || 'bg-white/10 text-white';

  const loadPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error('Failed to load posts', err);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFileChange(event) {
    setUploadError('');
    setUploadedMedia(null);
    setError('');
    setAiError('');
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('media', file);
    setUploadingMedia(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload media');
      setUploadedMedia(data);
    } catch (err) {
      setUploadError(err.message);
      setUploadedMedia(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setUploadingMedia(false);
    }
  }

  function handleRemoveMedia() {
    setUploadedMedia(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleEnhanceCaption() {
    setAiError('');
    setMessage('');
    setError('');
    const token = localStorage.getItem('token');
    const trimmed = caption.trim();
    if (!trimmed) {
      setAiError('Please enter a draft caption before using AI enhancement.');
      return;
    }
    try {
      setEnhancingCaption(true);
      const payload = { caption: trimmed, platform };
      if (uploadedMedia?.url) {
        payload.imageUrl = uploadedMedia.url;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/caption/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to enhance caption');
      const enhancedCaption = (data.caption || '').trim();
      if (!enhancedCaption) {
        throw new Error('AI did not return an enhanced caption. Please try again.');
      }
      setCaption(enhancedCaption);
      setMessage('Caption enhanced with AI.');
      await refresh();
    } catch (err) {
      setAiError(err.message);
    } finally {
      setEnhancingCaption(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setAiError('');
    if (!uploadedMedia) {
      setError('Please upload an image or video before scheduling your post.');
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          caption,
          mediaUrl: uploadedMedia.url,
          mediaStoragePath: uploadedMedia.path,
          mediaMimeType: uploadedMedia.mimetype,
          scheduledFor: scheduledFor || undefined,
          platform,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to schedule post');
      setMessage(data.status === 'posted' ? 'Post published successfully' : 'Post scheduled successfully');
      setCaption('');
      setScheduledFor('');
      setPlatform('instagram');
      setUploadedMedia(null);
      setUploadError('');
      setAiError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await loadPosts();
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={pillClass}>Campaign cockpit</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Post Scheduler</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">
                Monitor credits, track automation health and queue cross-network posts with a single composer.
              </p>
            </div>
            <div className="grid w-full gap-4 text-center sm:grid-cols-3 lg:w-auto">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {alerts.length > 0 && (
          <div className="grid gap-3">
            {alerts.map((alert, idx) => (
              <div
                key={`${alert.text}-${idx}`}
                className={`rounded-2xl border px-4 py-3 text-sm ${alertToneClasses[alert.tone]}`}
              >
                {alert.text}
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          <section className={`${panelClass} space-y-6`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={pillClass}>Composer</p>
                <h3 className="text-2xl font-semibold text-white">Schedule a new post</h3>
              </div>
              <button
                type="button"
                onClick={handleEnhanceCaption}
                disabled={enhancingCaption || !caption.trim() || uploadingMedia}
                className={secondaryButtonClass}
              >
                {enhancingCaption ? 'Enhancing...' : 'Enhance with AI'}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="caption" className={mutedLabelClass}>
                  Caption
                </label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                    if (aiError) setAiError('');
                  }}
                  required
                  className={textareaClass}
                  placeholder="Draft your caption or paste an outline..."
                />
                <p className={`${infoTextClass} mt-2`}>AI enhancements and immediate publishes deduct credits.</p>
              </div>

              <div>
                <label htmlFor="mediaFile" className={mutedLabelClass}>
                  Upload image or video
                </label>
                <input
                  id="mediaFile"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  disabled={uploadingMedia}
                  className="mt-2 block w-full cursor-pointer rounded-2xl border border-dashed border-white/30 bg-white/5 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-white/60"
                />
                {uploadingMedia && <p className={`${infoTextClass} mt-2`}>Uploading media...</p>}
                {uploadedMedia && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">
                          {uploadedMedia.originalname || uploadedMedia.fileName || 'Uploaded asset'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {uploadedMedia.size != null
                            ? `${(uploadedMedia.size / (1024 * 1024)).toFixed(2)} MB`
                            : 'Size unknown'}{' '}
                          - {uploadedMedia.mimetype}
                        </p>
                      </div>
                      <button type="button" onClick={handleRemoveMedia} className={dangerButtonClass}>
                        Remove
                      </button>
                    </div>
                    {uploadedMedia.url && (
                      <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-2">
                        {uploadedMedia.mimetype?.startsWith('video/') ? (
                          <video src={uploadedMedia.url} controls className="w-full rounded-2xl" />
                        ) : (
                          <img src={uploadedMedia.url} alt="Uploaded preview" className="w-full rounded-2xl object-cover" />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="scheduledFor" className={mutedLabelClass}>
                    Schedule (optional)
                  </label>
                  <input
                    id="scheduledFor"
                    type="datetime-local"
                    value={scheduledFor}
                    onChange={(e) => setScheduledFor(e.target.value)}
                    className={`${inputClass} input-datetime`}
                  />
                </div>
                <div>
                  <label htmlFor="platform" className={mutedLabelClass}>
                    Platform
                  </label>
                  <select
                    id="platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className={selectDarkClass}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className={primaryButtonClass}>
                {loading ? 'Submitting...' : 'Queue post'}
              </button>
            </form>
          </section>

          <section className={`${panelClass} overflow-hidden`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={pillClass}>Pipeline</p>
                <h3 className="text-2xl font-semibold text-white">Your scheduled posts</h3>
              </div>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-slate-300">
                {posts.length} total entries
              </span>
            </div>
            {posts.length === 0 ? (
              <p className={`${infoTextClass} mt-6`}>
                No posts yet. Start by uploading creative on the left.
              </p>
            ) : (
              <div className="mt-6 overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full text-sm text-slate-200">
                  <thead className="text-left text-xs uppercase text-slate-400">
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 font-semibold">Caption</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Media</th>
                      <th className="px-4 py-3 font-semibold">Scheduled</th>
                      <th className="px-4 py-3 font-semibold">Platform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5">
                        <td className="px-4 py-3 align-top">
                          <p className="max-w-xs break-words text-slate-100">{post.caption || 'No caption'}</p>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusPillClass(post.status)}`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top">
                          {post.mediaUrl ? (
                            <a
                              href={post.mediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-300 underline-offset-2 hover:text-white hover:underline"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">{post.scheduledFor ? formatDate(post.scheduledFor) : 'Immediate'}</td>
                        <td className="px-4 py-3 align-top capitalize">{post.platform}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(PostScheduler);

