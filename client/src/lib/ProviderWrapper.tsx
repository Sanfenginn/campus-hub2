"use client";

import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "./ apolloClient";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

const ProviderWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const client = initializeApollo();

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ReduxProvider>
  );
};

export default ProviderWrapper;
