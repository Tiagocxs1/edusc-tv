export type ConnectorType = "rss"|"atom"|"youtube_channel"|"youtube_playlist"|"vimeo"|"xmltv"|"website"|"sitemap"|"api"|"hls";
export type SourceStatus = "healthy"|"warning"|"stale"|"blocked"|"error"|"unknown";
export interface SourceConfiguration {
  id:string; name:string; url:string; type:ConnectorType; connector:ConnectorType;
  enabled:boolean; priority:1|2|3; pollingIntervalMin:number; rateLimit?:number;
  timezone?:string; expectedWeekday?:number; expectedTime?:string; windowStart?:string; windowEnd?:string;
  autoPublish:boolean; autoSchedule:boolean; autoCategorize:boolean; trustLevel:"unknown"|"reviewed"|"trusted"|"official";
  lastFetchedAt?:string; lastSuccessAt?:string; lastFailureAt?:string;
  status:SourceStatus; failureCount:number;
}
export interface DiscoveredItem {
  sourceId:string; externalId:string; title:string; description:string; url:string;
  publishedAt:string; author?:string; media?:string; rawPayload?:any;
  firstSeenAt:string; canonicalUrl?:string;
}
export interface NormalizedContent {
  title:string; description:string; url:string; canonicalUrl:string;
  publishedAt:string; externalId:string; provider:string; mediaType:string;
  duration?:number; thumbnail?:string; country?:string; region?:string; category?:string;
  confidence?:number; rightsStatus?:string;
}
export interface PublicationPattern {
  sourceId:string; weekday:number; expectedTime:string; timezone:string;
  confidence:number; sampleCount:number; lastDetectedAt?:string;
}
export interface ImportJob {
  id:string; sourceId:string; status:"queued"|"running"|"completed"|"partial"|"failed"|"cancelled";
  startedAt?:string; finishedAt?:string; itemsFound:number; itemsCreated:number; itemsUpdated:number; itemsSkipped:number; errors?:any;
}
