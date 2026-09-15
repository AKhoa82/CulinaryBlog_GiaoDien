/**
 * Cấu hình xác thực Auth.js v5 (NextAuth.js v5 beta) cho Culinary Blog
 * Hỗ trợ OAuth Providers (Google, GitHub) và Credentials Provider
 */

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: 'admin' | 'author' | 'reader';
  };
  expires: string;
}

export const authConfig = {
  providers: [
    {
      id: 'google',
      name: 'Google',
      type: 'oauth',
    },
    {
      id: 'github',
      name: 'GitHub',
      type: 'oauth',
    },
    {
      id: 'credentials',
      name: 'Email & Mật khẩu',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
    },
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    newUser: '/auth/register',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role || 'author';
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};
