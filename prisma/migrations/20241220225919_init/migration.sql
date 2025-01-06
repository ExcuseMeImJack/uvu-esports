-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "hashedPassword" VARCHAR NOT NULL,
    "profilePic" VARCHAR,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "headlineText" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR,
    "time" TIMESTAMP NOT NULL,
    "location" VARCHAR NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" UUID NOT NULL,
    "coverImage" VARCHAR,
    "text" TEXT NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogComments" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "blogId" UUID NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "BlogComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogLikes" (
    "id" UUID NOT NULL,
    "blogId" UUID NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "BlogLikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlogLikes_blogId_createdById_key" ON "BlogLikes"("blogId", "createdById");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogComments" ADD CONSTRAINT "BlogComments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogComments" ADD CONSTRAINT "BlogComments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
