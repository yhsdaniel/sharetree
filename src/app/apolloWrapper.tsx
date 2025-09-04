"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import AuthProvider from "@/utils/SessionProvider";
import { Toaster } from "react-hot-toast";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ApolloProvider>
  );
}