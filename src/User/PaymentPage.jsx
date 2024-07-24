import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [Details, setDetails] = useState({});
  const [isDetails, setIsdetails] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    // Perform validation
    if (name === "email") {
      if (!/^([a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+)$/.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    } else if (name === "number") {
      if (!/(0|91)?[6-9][0-9]{9}/.test(value)) {
        setNumberError("Please enter a valid 10-digit mobile number");
      } else {
        setNumberError("");
      }
    }

    // Update state only if validation passes
    if (!emailError && !numberError) {
      setDetails({
        ...Details,
        [name]: value,
      });
    }
  }

  function handleDetails() {
    if (Details.email && Details.number) {
      console.log(Details);
      setIsdetails(true);
    }
  }

  return (
    <div className="flex flex-row  mt-6  bg-gray-200">
      <div className="w-3/5 ml-12">
        {!isDetails ? (
          <React.Fragment>
            <div className="bg-red-400  text-bold h-12 p-3 pl-6 text-white">
              Share your Contact Details
            </div>
            <div className="bg-white py-3 ">
              <input
                className="border-1 border-black text-xs p-3 w-1/3 m-3"
                type="email"
                name="email"
                pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                value={Details.Email}
                placeholder="Email address"
                onChange={handleChange}
                required
              />
              {emailError && <p className="text-red-500 m-3">{emailError}</p>}

              <input
                name="number"
                className="p-2 border-opacity-70 border-1 border-zinc-600 w-1/3 ml-1"
                type="tel"
                value={Details.Number}
                placeholder="Number"
                pattern="(0|91)?[6-9][0-9]{9}"
                required
                onChange={handleChange}
              />
              {numberError && <p className="text-red-500 m-3">{numberError}</p>}

              <button
                className="bg-red-400 px-10 p-2 m-3  rounded-md"
                onClick={() => handleDetails()}
              >
                Continue
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div>
            send tickets to {Details.email}/{Details.number}
          </div>
        )}
        <div className="p-2 m-2">Unlock offers or Apply Promocodes</div>
        <hr />
        {/* <div className="p-2 m-2">Payment Options</div> */}
        <Menu as="div" className="relative inline-block text-left w-full">
          <div>
            <MenuButton className="inline-flex w-full justify-self-start gap-x-1.5 rounded-md bg-white px-3 py-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Payment Options
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="z-10 mt-0 mb-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <div className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  <Link to="/Paymentstatus/UPI-status">UPI</Link>
                </div>
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Debit/Credit Card
                </a>
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Net Banking
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <div className="w-2/6 pl-4 ">
        <div className="flex flex-row font-sans  bg-white  justify-around border-b-2 border-dashed">
          <div>
            <div className="w-3/4 py-3 tracking-widest font-light text-base">
              ORDER SUMMARY
            </div>
            <div className="py-1">Kalki 2898 AD (3D Hindi) (U/A)</div>
            <div className="text-xs py-1 font-light">Hindi, 3D</div>
            <div className="text-xs py-2 font-light">
              INOX: Brookefield Mall (SCREEN 2)
            </div>
            <div className="text-xs py-2 font-light">M-Ticket</div>
            <div className="text-xs">EX-H8,H9</div>
            <div className="text-xs">Tue, 23 Jul, 2024</div>
            <div className="text-xs pb-6">10:30 PM</div>
            {/* <hr className="border-dotted" /> */}
          </div>

          <div className="mt-6 ">
            <div className="text-3xl">2</div>
            <div>Tickets</div>
          </div>
        </div>
        {/* <div flex flex-row p-4>
          <div>Sub Total</div>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentPage;
