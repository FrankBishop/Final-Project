set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "watchlist" (
  "entryId" serial,
  "show" text,
  "episode name" text,
  "season" text,
  "number" text,
  "image" text,
  "isWatched" boolean,
  primary key ("entryId")
);
-- create table "todos" (
--   "todoId"      serial,
--   "task"        text           not null,
--   "isCompleted" boolean        not null,
--   "createdAt"   timestamptz(6) not null default now(),
--   "updatedAt"   timestamptz(6) not null default now(),
--   primary key ("todoId")
-- );
