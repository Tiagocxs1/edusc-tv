export type ContentType = "movie"|"shortFilm"|"documentary"|"series"|"episode"|"program"|"interview"|"concert"|"theater"|"dance"|"lecture"|"course"|"event"|"musicVideo"|"educational";

export type AccessType = "free"|"subscription"|"external";
export type RightsStatus = "officialEmbed"|"officialPublic"|"authorized"|"unknown"|"restricted";
export type ArchiveStatus = "active"|"inactive"|"unavailable"|"archived";

export interface CatalogItem {
  id:string; slug:string; title:string; originalTitle?:string;
  synopsis:string; shortSynopsis:string;
  poster:string; backdrop:string; trailer?:string;
  contentType: ContentType; year:number; durationMin:number;
  country:string; regions:string[]; city?:string;
  languages:string[]; subtitles:string[];
  genres:string[]; director?:string; cast?:string[]; production?:string;
  rating?: string; ageRating?: string; contentWarnings?: string[];
  tags:string[];
  source: { provider:string; sourceUrl:string; embedUrl?:string; officialWebsite?:string; embedAllowed?:boolean; checkedAt?:string; rightsStatus:RightsStatus; accessType:AccessType; status:ArchiveStatus };
  collectionIds:string[]; personIds:string[]; festivalId?:string; institutionId?:string;
  audioDescription?:boolean; captions?:boolean; signLanguage?:boolean;
}

export interface Collection {
  id:string; slug:string; title:string; description:string; cover:string; type:string;
  country?:string; region?:string; contentIds:string[];
  editor?:string; publishedAt?:string;
}

export interface Person { id:string; slug:string; name:string; photo:string; country:string; region?:string; biography:string; role: "Director"|"Actor"|"Producer"|"Researcher"|"Musician"|"Artist"|"Professor"; website?:string; }

export interface ProductionCompany { id:string; slug:string; name:string; country:string; region:string; city:string; logo:string; cover:string; description:string; website?:string; }

export interface Institution { id:string; slug:string; name:string; country:string; region:string; city:string; logo:string; website:string; description:string; }

export interface Festival { id:string; slug:string; name:string; country:string; city:string; year:number; description:string; website?:string; cover:string; }

export interface Tag { id:string; slug:string; name:string; }

export const contentTypes: ContentType[] = ["movie","shortFilm","documentary","series","episode","program","interview","concert","theater","dance","lecture","course","event","musicVideo","educational"];
