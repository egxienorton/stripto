import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useState } from "react";

const QCommerce: NextPage = () => {
  const address = useAddress();
  const [newValue, setNewValue] = useState(0);
  const { contract } = useContract("0x86CC05211800DdDB37E0f4fC93fCb7e8Fd0f14ae");

  const {
    data: numvalue,
    isLoading
  } = useContractRead(contract, "retrieve");
  return (
    <main className="h-full w-full z-[40]">


        {/* {Claude(I intent to use it here.)} */}
      <div className="flex flex-col gap-20 z-[40]">
       <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      height: "10vh"
    }}>
      <div style= {{
           display: 'flex',
           flexDirection: 'column',
           alignItems: "center",
           justifyContent: "center",
           border: "1px solid black",
           padding: "1rem",
           borderRadius: "1rem",
           backgroundColor: "#232323",
           minWidth: "400px"
      }}>
        <ConnectWallet style={{
          width :"100%"
        }} />
        <div>

        </div>

        {address && (
          <div style= {{
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}>
              <input type="number" value={newValue}
              onChange={(e) => setNewValue(parseInt(e.target.value))}
              style={{
                marginBottom: "1rem",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid black",
              }}
              />
             <Web3Button
  contractAddress="0x86CC05211800DdDB37E0f4fC93fCb7e8Fd0f14ae"
  action={(contract) => contract.call("deposit", [], { value: newValue })}
  style={{
    width: "100%",
    backgroundColor: "royalblue",
    color: "white"
  }}
  onSuccess={() => alert("Deposit successful!")}
  onError={(error) => alert("Error: " + error.message)}
>
  Deposit
</Web3Button>
            </div>
        )}
      </div> 
    </div>
      
      </div>
    </main>

  );
};

export default QCommerce;
