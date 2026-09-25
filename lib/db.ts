// Light mode DB client — usa mock quando DATABASE_URL ausente, pronto para Prisma quando instalar
// Não importa @prisma/client aqui para não quebrar build sem pacote

let prisma: any = null;
export function getDb(){
  if(prisma) return prisma;
  const url = process.env.DATABASE_URL;
  if(!url){
    // mock que responde como API mas sem DB
    return {
      isMock: true,
      content: { findMany: async ()=>[] },
      channel: { findMany: async ()=>[] },
      $queryRaw: async ()=>[],
    };
  }
  try{
    // quando prisma estiver instalado, descomente:
    // const { PrismaClient } = require("@prisma/client");
    // prisma = new PrismaClient();
    // return prisma;
    return { isMock:true, content:{ findMany: async ()=>[] } };
  }catch{
    return { isMock:true };
  }
}

// helpers normalização / fallback / verificação (Parte 6 #38-105)
export function normalizeUrl(url:string){
  try{
    const u=new URL(url);
    // youtube watch/embed/short
    if(u.hostname.includes("youtu.be")) return `https://www.youtube.com/watch?v=${u.pathname.slice(1)}`;
    if(u.hostname.includes("youtube.com") && u.searchParams.get("v")) return `https://www.youtube.com/watch?v=${u.searchParams.get("v")}`;
    const m=u.pathname.match(/\/embed\/([^/?]+)/);
    if(m) return `https://www.youtube.com/watch?v=${m[1]}`;
    return u.toString();
  }catch{ return url; }
}

export const ALLOWED_PROTOCOLS=["https:"];
export const ALLOWED_HOSTS=["youtube.com","www.youtube.com","youtu.be","youtube-nocookie.com","www.youtube-nocookie.com","vimeo.com","player.vimeo.com"];

export function isAllowedSource(url:string){
  try{
    const u=new URL(url);
    if(!ALLOWED_PROTOCOLS.includes(u.protocol)) return false;
    return ALLOWED_HOSTS.some(h=> u.hostname===h || u.hostname.endsWith("."+h));
  }catch{ return false; }
}

// fallback seguro: só usa fontes com embedAllowed + verified + active
export function pickPrimarySource(sources: { isPrimary:boolean; priority:number; embedAllowed:boolean; embedStatus:string; status:string; sourceUrl:string }[]){
  const valid=sources.filter(s=> s.embedAllowed && s.embedStatus==="verified" && s.status==="active");
  if(valid.length===0) return null;
  return valid.sort((a,b)=> (a.priority - b.priority) || (Number(b.isPrimary)-Number(a.isPrimary)))[0];
}

// verificação stale
export function isStale(lastCheckedAt?:string|null, maxAgeHours=24){
  if(!lastCheckedAt) return true;
  const age=(Date.now()- new Date(lastCheckedAt).getTime())/36e5;
  return age > maxAgeHours;
}
