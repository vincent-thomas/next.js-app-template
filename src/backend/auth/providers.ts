import {
  GitHub,
  Google
} from "arctic"


export const github = new GitHub(env.githubOauth2AppId, env.githubOauth2Secret, {
  redirectURI: "http://localhost:3000/auth/callback/github",
})

export const google = new Google(env.googleOauth2AppId, env.googleOauth2Secret, "http://localhost:3000/auth/callback/google")