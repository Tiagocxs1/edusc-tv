"use client";
import { useEffect, useState } from "react";

export default function Page(){
  const [sources,setSources]=useState<any[]>([]);
  const [jobs,setJobs]=useState<any[]>([]);
  const [url,setUrl]=useState("https://www.youtube.com/@unc");
  const [detect,setDetect]=useState<any>(null);
  useEffect(()=>{
    fetch("/api/discovery/sources").then(r=>r.json()).then(d=>setSources(d.data||[]));
    fetch("/api/discovery/jobs").then(r=>r.json()).then(d=>setJobs(d.jobs||[]));
  },[]);
  const doDetect=async()=>{
    const r=await fetch("/api/discovery/sources",{ method:"POST", headers:{ "Content-Type":"application/json"}, body:JSON.stringify({url})});
    const d=await r.json(); setDetect(d);
  };
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black">Automação · Discovery</h1>
      <div className="rounded-xl border border-[#222] bg-[#141414] p-4">
        <h3 className="font-bold">Adicionar fonte (detecção automática)</h3>
        <div className="mt-2 flex gap-2">
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://exemplo.com" className="flex-1 rounded-full border border-[#333] bg-[#0a0a0a] px-4 py-2 text-sm"/>
          <button onClick={doDetect} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Detectar</button>
        </div>
        {detect && <pre className="mt-3 overflow-auto rounded bg-[#0f0f0f] p-3 text-xs text-[#8a8a8a]">{JSON.stringify(detect,null,2)}</pre>}
        <p className="mt-2 text-xs text-[#6b6b6b]">Detecta RSS/Atom/sitemap/OpenGraph/JSON-LD/VideoObject,canonical — sem hard-codar /feed.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4">
          <h3 className="font-bold text-sm">Fontes monitoradas · SourceRegistry</h3>
          <div className="mt-3 grid gap-2">
            {sources.map((s:any)=> <div key={s.id} className="flex items-center justify-between rounded-lg border border-[#1f1f1f] bg-[#141414] p-3">
              <div><p className="text-sm font-semibold text-white">{s.name}</p><p className="text-xs text-[#8a8a8a]">{s.type} · {s.status} · polling {s.pollingIntervalMin}min · janela {s.windowStart||"-"}→{s.windowEnd||"-"}</p></div>
              <span className={`text-xs px-2 py-1 rounded font-bold ${s.status==="healthy"?"bg-green-600 text-white":"bg-[#222] text-[#8a8a8a]"}`}>{s.status}</span>
            </div>)}
          </div>
        </div>
        <div className="rounded-xl border border-[#222] bg-[#0f0f0f] p-4">
          <h3 className="font-bold text-sm">Jobs · queue/worker</h3>
          <div className="mt-3 grid gap-2">
            {jobs.map((j:any)=> <div key={j.sourceId} className="rounded-lg border border-[#1f1f1f] bg-[#141414] p-3">
              <p className="text-sm font-semibold text-white">{j.source} — {j.status}</p>
              <p className="text-xs text-[#8a8a8a]">{j.itemsFound ?? 0} novos · {j.error || "ok"}</p>
            </div>)}
          </div>
          <p className="mt-2 text-xs text-[#6b6b6b]">Hoje: 248 verificadas · 37 novos · 31 importados · 4 revisão · 2 duplicatas · 1 indisponível (mock)</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#141414] p-4">
        <h3 className="font-bold text-sm">Cenário terça 17h — Publication window</h3>
        <p className="text-xs text-[#8a8a8a]">Janela 16:30→18:30, polling 16:00 normal →16:30 acelerado 15min →17:00 5min →18:00 normal. Vídeos 16:58/17:02/17:20 detectados; 2 vídeos 17:01+17:12 ambos apresentados; sem vídeo = “No new content”.</p>
      </div>
      <p className="text-xs text-[#5a5a5a]">Workflows n8n em /workflows · trace: createdBy=automation, sourceJobId, connector · Idempotency-Key · HMAC webhook</p>
    </div>
  );
}
