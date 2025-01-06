import bcrypt from 'bcrypt';

async function hashPass(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePass(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

export { hashPass, comparePass };


// // Usage example:
// (async () => {
//   const password = 'mysecretpassword';
//   const hashedPassword = await hashPassword(password);
//   console.log(hashedPassword);

//   const isMatch = await comparePassword(password, hashedPassword);
//   console.log(isMatch); // Should be true
// })();
