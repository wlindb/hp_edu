const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateSignUpInput = data => {
   let errors = {};

   let { user_name, email, password } = data;
   //Converting empty fields to an empty string so that we can use validator function as it works only with strings
   user_name = !isEmpty(user_name) ? user_name : "";
   email = !isEmpty(email) ? email : "";
   password = !isEmpty(password) ? password : "";

   if (Validator.isEmpty(user_name)) {
      errors.user_name = "Användarnamn krävs";
   }

   if (Validator.isEmpty(email)) {
      errors.email = "Epostadress krävs";
   } else if (!Validator.isEmail(email)) {
      errors.email = "Ange en giltig epostadress";
   }

   if (Validator.isEmpty(password)) {
      errors.password = "Lösenord krävs";
   } else if (!Validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = "Lösenordet måste vara minst 8 karaktärer";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};