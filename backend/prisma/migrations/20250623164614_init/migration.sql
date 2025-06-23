-- CreateTable
CREATE TABLE "Scientist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'INTERN',
    "location" TEXT NOT NULL,
    "era" DATETIME NOT NULL,
    "favEmoji" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "Scientist_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL,
    "invention" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "themeSong" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reviewerName" TEXT NOT NULL,
    "ratingStars" INTEGER NOT NULL,
    "fromMadSci" BOOLEAN NOT NULL,
    "reviewDesc" TEXT NOT NULL,
    "scientistId" INTEGER NOT NULL,
    CONSTRAINT "Review_scientistId_fkey" FOREIGN KEY ("scientistId") REFERENCES "Scientist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
