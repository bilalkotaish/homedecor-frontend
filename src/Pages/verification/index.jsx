import { useEffect } from "react";
import OtpBox from "../../Component/OtpBox";
import { postData } from "../../utils/api";
export default function Emailverify() {
  const userEmail = localStorage.getItem("userEmail");

  // useEffect(() => {
  //   if (userEmail) {
  //     postData("/api/user/verify", { email: userEmail ,}).then((res) =>
  //       console.log(res)
  //     );
  //   }
  // }, [userEmail]);
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-12">
          <img
            src="src\assets\Otp verify.png"
            className="w-[100px] mx-auto h-[100px]"
          />

          <h3 className=" !text-center text-[18px] font-[600] mb-3 px-3">
            {" "}
            Verify Your OTP
          </h3>
          <p className="text-center mt-2">
            {" "}
            Otp Sent to:{" "}
            <span className="text-primary font-[600]">{userEmail}</span>
          </p>

          <OtpBox />
        </div>
      </div>
    </section>
  );
}
