import { Select, ConfigProvider } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { useCryptoContext } from "../context/CryptoContext";
import {  useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()

  const { currency, setCurrency } = useCryptoContext();

  const handleOnchange = (value) => setCurrency(value);



  return (
    
    <ConfigProvider
  theme={{
    components: {
      Select: {
        activeBorderColor: "#a16207",
        selectorBg: "#a16207",
        activeOutlineColor: "#a16207",
        hoverBorderColor: "#a16207",
        
      },
    },
  }}
>
    <header className="w-full h-20 bg-black py-4 sticky top-0 z-10 shadow-lg shadow-yellow-700">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto ">
        <div>
          <Title level={1} className="font-signature text-yellow-700 text-3xl cursor-pointer"
          onClick={() => navigate("/")}
          >
            CryptoLens
            
          </Title>
        </div>
        <div>
          <Select
            value={currency} 
            onChange={handleOnchange}
          
            className="w-24 h-10 rounded-none font-crypto outline-none"
            options={[
              {
                value: "INR",
                label: "INR",
              },
              {
                value: "USD",
                label: "USD",
              },
            ]}
          />
        </div>
      </div>
    </header>
    </ConfigProvider>
  );
};

export default Header;
