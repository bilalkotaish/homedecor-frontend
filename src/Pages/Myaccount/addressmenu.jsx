import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteData, editData, fetchData } from "../../utils/api";
import { useContext } from "react";
import { myContext } from "../../App";
import { useEffect } from "react";

export default function Addressmenu(props) {
  const options = ["Edit", "Delete"];
  const context = useContext(myContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [address, setaddress] = useState([]);
  const [userId, setuserId] = useState("");

  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      context.Alertbox("success", res.message);
      context.getuserDetails();

      // Refetch updated address list
      fetchData(`/api/address/get?${context?.userData?._id}`, {
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        setaddress(res.data);
      });
    });
  };
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setuserId(context?.userData?._id);
      fetchData(`/api/address/get?${context?.userData?._id}`, {
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        setaddress(res.data);
      });
    }
  }, [context?.userData]);

  const editAddress = (id) => {
    context.toggleaddressPanel(true)();
    context.setaddressmode("edit");
    context.setAddressId(id);
    // props.editAddress(id);
  };

  return (
    <div>
      <div>
        <BsThreeDotsVertical
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClickMenu}
        />
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            },
            list: {
              "aria-labelledby": "long-button",
            },
          }}
        >
          <MenuItem onClick={() => editAddress(props.address._id)}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => removeAddress(props.address._id)}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
