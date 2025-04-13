import { useEffect, useState } from 'react';

export function usePollingStatus(threadId: string, runId: string) {
  const [status, setStatus] = useState<'in_progress' | 'completed' | 'failed' | 'cancelled' | 'expired' | 'queued' | 'requires_action' | 'loading'>('loading');
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    if (!threadId || !runId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/analyze/status?thread_id=${threadId}&run_id=${runId}`);
      const data = await res.json();

      setStatus(data.status);

      if (data.status === 'completed' && data.output) {
        setOutput(data.output);
        clearInterval(interval);
      }

      if (['failed', 'cancelled', 'expired'].includes(data.status)) {
        clearInterval(interval);
      }
    }, 3000); // verifica a cada 3 segundos

    return () => clearInterval(interval);
  }, [threadId, runId]);

  return { status, output };
}