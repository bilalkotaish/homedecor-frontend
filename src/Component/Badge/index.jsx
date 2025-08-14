export default function Badge(props) {
  return (
    <>
      <span
        className={`flex items-center justify-center py-1 px-2 text-[14px] capitalize ${
          props.status === "pending" && "bg-orange-500 text-white  rounded-full"
        }
         ${
           props.status === "Confirmed" &&
           "bg-green-500 text-white   rounded-full"
         }
          ${
            props.status === "Canceled" && "bg-red-500 text-white  rounded-full"
          }
        
        `}
      >
        {props.status}
      </span>
    </>
  );
}
