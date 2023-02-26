import React from "react";
import { Logo, NavLink } from "@/components";

const WelcomePage = () => {
  return (
    <section className="flex  h-screen flex-col items-center justify-center px-2">
      <Logo logoStyles="text-[3rem]" dotStyles="w-2 h-2 bg-orange" />

      <div className="mt-5 flex flex-col gap-2">
        <p className="text-center text-2xl font-semibold">
          Find New Friends <br /> With FB3!
        </p>

        <p className="text-center text-lg text-primary/50">
          With FB3 you will find new friends <br /> from various countries and
          regions <br /> for free and with ease.
        </p>
      </div>

      <div className="mt-4 w-full xs:w-fit">
        <NavLink
          route={{ to: "/auth/login", name: "Get Started" }}
          fullWidth={true}
          type="large"
          active="activeLink"
        />
      </div>
    </section>
  );
};

export default WelcomePage;
