/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, SunIcon, XIcon, MoonIcon } from "@heroicons/react/outline";
import { RoutesBase } from "../constants";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const [darkTheme, setDarkTheme] = useState(false);
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const navigation = [
    {
      name: "Topology",
      href: RoutesBase.HOME,
      current: current === RoutesBase.HOME,
    },
    {
      name: "Switch",
      href: RoutesBase.MANAGE,
      current: current === RoutesBase.MANAGE,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-blue-800">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto" src={logo} alt="SnapGP" />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "border-white text-white "
                            : "border-transparent ",
                          "px-3 text-gray-300 border-b-2 hover:border-white py-2  text-sm font-medium hover:text-white transition duration-300"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => setCurrent(item.href)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center pr-2">
                <button
                  type="button"
                  className=" p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                  onClick={() => setDarkTheme(!darkTheme)}
                >
                  <span className="sr-only">Dark mode</span>
                  {darkTheme ? (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.name + "_mobile"}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
