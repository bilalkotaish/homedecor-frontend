import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaGiftsSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiClockCountdown } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { myContext } from "../../App";
import Drawer from "@mui/material/Drawer";
import CartPanel from "../CartPanel";
import { MdClose } from "react-icons/md";
import AddressPanel from "../../Pages/Myaccount/addressPanel";
import { FaLocationArrow } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


export default function Footer() {
  const context = useContext(myContext);

  return (
    <><footer>
    <div className="py-6 bg-cream">
      <div className="container">
        <div className="footer flex flex-col lg:flex-row lg:justify-between py-8 gap-8">
          {/* Part 1 */}
          <div className="part1 flex-1 p-5 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.1)]">
  <h2 className="text-[18px] font-[600] mb-4">Contact Us</h2>

  {/* Location */}
  <p className="text-[16px] font-[400] pb-4 flex items-start gap-2">
    <FaLocationArrow className="text-primary mt-1" />
    <span>
      Saida - South-Governate-
      <br /> BillyEcommerceStore - Lebanon
    </span>
  </p>

  {/* Email */}
  <Link
    className="link block flex items-center gap-2"
    to="mailto:bilalkotaish2000@gmail.com"
  >
    <MdOutlineEmail className="text-primary" />
    bilalkotaish2000@gmail.com
  </Link>

  {/* Phone */}
  <span className="text-[16px] font-[400] block mt-3 flex items-center gap-2">
    <FaPhoneAlt className="text-primary" />
    Phone: 0096178994740
  </span>
</div>

  
          {/* Part 2 */}
          <div className="part2 flex-1 flex p-5 gap-8 lg:pl-10">
  {/* Column 1 */}
  <div className="w-1/2">
    <h2 className="text-[18px] font-[600] mb-4">Products</h2>
    <ul>
      {["Prices Drop", "New Products", "Best Sales", "Contact us", "Site Map", "Our Stores"].map((item, i) => (
        <li key={i} className="mb-2">
          <Link to="/" className="link text-[14px]">{item}</Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Column 2 */}
  <div className="w-1/2">
    <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
    <ul>
      {[
        { name: "Delivery", link: "/delivery" },
        { name: "Legal Notice", link: "/legalnotice" },
        { name: "Terms & Conditions of use", link: "/terms" },
        { name: "Contact us", link: "/contactus" },
        { name: "About Us", link: "/aboutus" },
        { name: "Secure Payments", link: "/securepayment" },
        { name: "Login", link: "/login" },
      ].map((item, i) => (
        <li key={i} className="mb-2">
          <Link to={item.link} className="link text-[14px]">{item.name}</Link>
        </li>
      ))}
    </ul>
  </div>
</div>

  
          {/* Part 3 */}
          <div className="part3 flex-1 p-5 flex flex-col">
            <h2 className="text-[18px] font-[600] mb-4">Join Our WhatsApp Group</h2>
            <p className="text-[12px]">
              Be the first to know about our latest offers, products,
              <br /> and updates. Join our WhatsApp community!
            </p>
            <div className="mt-5">
              <Button
                className="btn-org w-full sm:w-auto"
                onClick={() =>
                  window.open("https://chat.whatsapp.com/your-invite-link", "_blank")
                }
              >
                Join WhatsApp Group
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Bottom strip */}
    <div className="bottomstrip border-t bg-primary py-3 border-[rgba(0,0,0,0.1)]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Icons */}
        <ul className="flex items-center gap-2">
          <li>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] border flex items-center justify-center rounded-full hover:bg-pink-500 group"
            >
              <FaInstagram className="text-[15px] group-hover:text-white" />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] border flex items-center justify-center rounded-full hover:bg-blue-500 group"
            >
              <FaFacebookF className="text-[15px] group-hover:text-white" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] border flex items-center justify-center rounded-full hover:bg-blue-500 group"
            >
              <RiTwitterXFill className="text-[15px] group-hover:text-white" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] border flex items-center justify-center rounded-full hover:bg-black group"
            >
              <FaGithub className="text-[15px] group-hover:text-white" />
            </a>
          </li>
          <li>
            <a
              href="https://chat.whatsapp.com/your-group-invite"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[35px] h-[35px] border flex items-center justify-center rounded-full hover:bg-green-500 group"
            >
              <FaWhatsapp className="text-[15px] group-hover:text-white" />
            </a>
          </li>
        </ul>
  
        {/* Copyright */}
        <p className="text-gray-600 text-[12px] text-center">
          &copy; 2025 BillyEcommerceStore. All rights reserved.
        </p>
  
        {/* Payment Logos */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <img src="src/assets/carte_bleue.png" alt="" className="h-6" />
          <img src="src/assets/master_card.png" alt="" className="h-6" />
          <img src="src/assets/paypal.png" alt="" className="h-6" />
          <img src="src/assets/visa.png" alt="" className="h-6" />
        </div>
      </div>
    </div>
  </footer>
  
      {/* {cart panel} */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        anchor="right"
        className=" cartpanel"
      >
        <div className="relative flex items-center justify-center py-3 px-4 border-b border-[rgba(0,0,0,0.1)]">
          <h2 className="text-[18px] font-[600] text-center">
            Your Shopping Cart
          </h2>

          <MdClose
            className="absolute right-4 text-[20px] cursor-pointer hover:text-primary transition-colors"
            onClick={context.toggleCartPanel(false)}
          />
        </div>

        {context.cartData?.length > 0 ? (
          <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
            <CartPanel data={context.cartData} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-5">
            <img src="src\assets\emptycarts.png" alt="" />
            <h4 className="text-[14px] pl-3">Your Cart is Empty</h4>
            <Button
              onClick={context.toggleCartPanel(false)}
              className="mt-4 !bg-primary !ml-5 !text-white hover:!bg-primary-dark !rounded-md !px-4 py-2 capitalize"
            >
              Continue Shopping
            </Button>{" "}
          </div>
        )}
        {/* <data={context.cartData} /> */}
      </Drawer>

      {/* {Address panel} */}
      <Drawer
        open={context.openaddressPanel}
        onClose={context.toggleaddressPanel(false)}
        anchor="right"
        className="addresspanel"
      >
        <div className="flex items-center  justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4 className="text-[16px] font-[600] items-center">
            {context.addressmode === "add" ? "Add" : "Update"} Your Shipping
            Address
          </h4>
          <MdClose
            className="text-[20px] cursor-pointer"
            onClick={context.toggleaddressPanel(false)}
          />
        </div>

        <AddressPanel />
      </Drawer>
    </>
  );
}
