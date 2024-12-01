import { Select, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useCryptoContext } from "../context/CryptoContext";

const Header = () => {
  const { currency, setCurrency } = useCryptoContext();

  const handleOnchange = (value) => setCurrency(value);

  return (
    <header className="w-full h-full bg-black">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto p-5">
        <div>
          <Title level={1} className="font-signature text-violet-600 text-5xl">
            CryptoLens
          </Title>
        </div>
        <div>
          <Select
            value={currency}
            onChange={handleOnchange}
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
  );
};

export default Header;
