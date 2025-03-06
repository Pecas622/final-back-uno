import { hashSync, compareSync } from "bcrypt";

export const hashPassword = (password) => hashSync(password, 6)

export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD)

const passE = hashPassword("Pecas622")
console.log(passE);
console.log(validatePassword("Pecas622", passE));