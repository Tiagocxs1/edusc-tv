-- EDUSC TV — Parte 6 — SQL espelho do prisma/schema.prisma (PostgreSQL)
-- Rodar com: psql $DATABASE_URL -f 001_initial.sql
-- Country/Region/City, Language, Content + metadata, Channel, Schedule, Collection, Tag, Person/Org, Source/Provider, Verification, Import, Audit

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Country
CREATE TABLE "Country" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  iso2 CHAR(2) UNIQUE NOT NULL,
  iso3 CHAR(3) UNIQUE,
  flag TEXT
);
CREATE INDEX ON "Country"(slug);

-- Region/City
CREATE TABLE "Region" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "countryId" TEXT REFERENCES "Country"(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,
  UNIQUE("countryId", slug)
);
CREATE TABLE "City" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "countryId" TEXT REFERENCES "Country"(id),
  "regionId" TEXT REFERENCES "Region"(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  UNIQUE("countryId", "regionId", slug)
);

-- Content
CREATE TABLE "Content" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  "originalTitle" TEXT,
  subtitle TEXT,
  description TEXT,
  "shortDescription" TEXT,
  year INT,
  "releaseDate" TIMESTAMPTZ,
  "durationSeconds" INT,
  status TEXT DEFAULT 'draft',
  poster TEXT, backdrop TEXT, trailer TEXT,
  "countryId" TEXT REFERENCES "Country"(id),
  "regionId" TEXT REFERENCES "Region"(id),
  "cityId" TEXT REFERENCES "City"(id),
  language TEXT, "ageRating" TEXT,
  "publishedAt" TIMESTAMPTZ, "createdAt" TIMESTAMPTZ DEFAULT now(), "updatedAt" TIMESTAMPTZ DEFAULT now(), "deletedAt" TIMESTAMPTZ
);
CREATE INDEX ON "Content"(slug); CREATE INDEX ON "Content"(type); CREATE INDEX ON "Content"(status);

-- Channel / Schedule
CREATE TABLE "Channel" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL, "shortName" TEXT,
  description TEXT, logo TEXT, cover TEXT,
  "countryId" TEXT REFERENCES "Country"(id),
  "regionId" TEXT REFERENCES "Region"(id),
  "cityId" TEXT REFERENCES "City"(id),
  "organizationId" TEXT, "categoryId" TEXT,
  timezone TEXT NOT NULL, "channelNumber" INT,
  status TEXT DEFAULT 'unknown', "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMPTZ DEFAULT now(), "updatedAt" TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE "ScheduleItem" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "channelId" TEXT REFERENCES "Channel"(id) ON DELETE CASCADE,
  "contentId" TEXT REFERENCES "Content"(id) ON DELETE SET NULL,
  title TEXT NOT NULL, description TEXT,
  "startAt" TIMESTAMPTZ NOT NULL, "endAt" TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL, status TEXT DEFAULT 'scheduled',
  "createdAt" TIMESTAMPTZ DEFAULT now(), "updatedAt" TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON "ScheduleItem"("channelId", "startAt");

-- Provider/Source skeleton
CREATE TABLE "Provider" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL);
CREATE TABLE "ContentSource" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "contentId" TEXT REFERENCES "Content"(id) ON DELETE CASCADE,
  "providerId" TEXT REFERENCES "Provider"(id),
  "sourceUrl" TEXT NOT NULL, "embedUrl" TEXT,
  "embedAllowed" BOOLEAN DEFAULT false, "embedStatus" TEXT DEFAULT 'unknown',
  "isPrimary" BOOLEAN DEFAULT false, priority INT DEFAULT 1, status TEXT DEFAULT 'active',
  "lastCheckedAt" TIMESTAMPTZ
);
CREATE UNIQUE INDEX ON "ContentSource"("providerId", "sourceUrl");
