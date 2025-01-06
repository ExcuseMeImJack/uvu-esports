import prisma from '../lib/prisma'
import { hashPass } from '../lib/hashPass'

async function main() {
  const response = await Promise.all([
    prisma.user.create({
      data: {
        email: 'rauchg@vercel.com',
        name: 'Guillermo Rauch',
        profilePic: 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg',
        hashedPassword: await hashPass("tester"),
        isAdmin: true
      }
    }),
    prisma.user.create({
      data: {
        email: 'tey@vercel.com',
        name: 'Steven Tey',
        profilePic: 'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg',
        hashedPassword: await hashPass("tester"),
        isAdmin: true
      }
    }),
    prisma.user.create({
      data: {
        email: 'lee@vercel.com',
        name: 'Lee Robinson',
        profilePic: 'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg',
        hashedPassword: await hashPass("tester"),
        isAdmin: false
      }
    })
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
