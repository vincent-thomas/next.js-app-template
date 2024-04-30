CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);