import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import StarsCanvas from "../components/main/StarBackground";
import Navbar from "../components/main/Navbar";

import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <StarsCanvas />
    <div
    className=""
    >
        
        <Navbar />
        <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      >
      
      <Component {...pageProps} />
    </ThirdwebProvider>
        {/* <Component {...pageProps} />
        <Footer /> */} 
      </div>
    
        </>
   
  );
}

export default MyApp;
