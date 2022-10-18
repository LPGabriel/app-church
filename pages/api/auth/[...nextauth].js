import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt";
import { Session } from "inspector";
let userAccount = null;

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

const confirmPasswordHash = (plainPassword, hashedPassword) => {
    return new Promise(resolve => {
        bcrypt.compare(plainPassword, hashedPassword, function(err, res) {
            resolve(res);
        });
    })
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Usuário e Senha",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Seu email",
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "Sua senha",
        },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.username,
            },
          });
          
          if (user !== null && user.password == credentials.password) {
            //Compare the hash

            return user
          } else {
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
callbacks: {
  jwt: async (token, user, account, profile, isNewUser)=> {
   // parâmetro "user" é o objeto recebido de "authorize"
    // "token" está sendo enviado abaixo para callback "session"...
    // ... então definimos o parâmetro "user" de "token" para object de "authorize" ...
    // ... e devolvê-lo ...
      console.log('jwp callback', user)
      user && (token.user = user);
      return token // ... aqui
  }, 
  async session (session, sessionToken) {
    console.log('jwp callback', user)
    session.user = user.user;
    return session
}

},
pages:{
  signIn: 'pagina de login',
  error: 'pagina de erro'
},
session: {
  jwt: true
},
jwt: {
  secret: process.env.JWT_SECRET
}

})
