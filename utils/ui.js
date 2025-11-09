export const panelClass =
  'rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-xl shadow-slate-950/20 backdrop-blur-xl';
export const heroPanelClass =
  'rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/30 to-indigo-900/20 p-8 text-slate-100 shadow-2xl shadow-slate-950/30';
export const mutedLabelClass = 'text-sm font-medium text-slate-300';
export const inputClass =
  'mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60';
export const textareaClass = inputClass + ' min-h-[140px] resize-none';
export const selectClass = inputClass;
export const selectDarkClass = `${selectClass} select-dark`;
export const primaryButtonClass =
  'inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60';
export const secondaryButtonClass =
  'inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60';
export const dangerButtonClass =
  'inline-flex items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60';
export const infoTextClass = 'text-sm text-slate-400';
export const pillClass = 'text-[0.65rem] uppercase tracking-[0.35em] text-slate-400';
export const statusPillMap = {
  posted: 'bg-emerald-500/20 text-emerald-200',
  scheduled: 'bg-amber-500/20 text-amber-200',
  failed: 'bg-rose-500/20 text-rose-200',
};
