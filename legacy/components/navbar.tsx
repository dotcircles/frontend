import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { title, subtitle } from "@/legacy/components/primitives";
import { Image } from "@heroui/image";
import logo from "public/logo.png";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/legacy/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/legacy/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full mt-2" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <div className="font-mono font-extrabold text-3xl italic">
            DOTCIRCLES
          </div> */}
          <Image src="/logo.png" alt="My Logo" />
        </NavbarItem>
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <div className="logo-container">
              <div className="circle white-circle">
                <div className="dark-orbit"></div>
              </div>
              <div className="circle black-circle">
                <div className="light-orbit"></div>
              </div>
            </div>
          </NextLink>
        </NavbarBrand>
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <div className="font-mono font-extrabold text-3xl italic">
            DOTCIRCLES
          </div> */}
          {/* <Image src="/logo.png" alt="My Logo" /> */}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
