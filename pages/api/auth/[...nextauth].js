import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma"
const bcrypt = require('bcryptjs');
let userAccount = null;


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Usuário e Senha",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "seuemail@email.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log("Login ok")
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
  ],
  debug: true,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
})
