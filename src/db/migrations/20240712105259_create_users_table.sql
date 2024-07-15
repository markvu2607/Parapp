CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"avatar" text NOT NULL
);
