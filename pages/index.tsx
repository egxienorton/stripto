import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useState } from "react";
import Hero from "../components/main/Hero";
import Encryption from "../components/main/Encryption";
import SimpleEcommerce from "../components/main/products";
import QCommerce from "./qcommerce";

const Home: NextPage = () => {
  const address = useAddress();
  const [newValue, setNewValue] = useState(0);
  const { contract } = useContract("0x86CC05211800DdDB37E0f4fC93fCb7e8Fd0f14ae");

  const {
    data: numvalue,
    isLoading
  } = useContractRead(contract, "retrieve");
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <SimpleEcommerce />
        {/* <QCommerce /> */}
        
        <Encryption />
      
      
      
      </div>
    </main>

  );
};

export default Home;
