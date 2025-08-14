import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { myContext } from "../../App";
import { fetchData, postData } from "../../utils/api";

export default function Reviews(props) {
  const context = useContext(myContext);

  const [review, setReview] = useState({
    rating: 1,
    review: "",
    image: "",
    userName: "",
    userId: "",
    productId: "",
  });
  const [reviewData, setReviewData] = useState();

  const onChangeReview = (e) => {
    setReview({
      ...review,
      review: e.target.value,
    });
  };
  const onChangeRating = (event, newValue) => {
    setReview((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };
  const onSubmitReview = (e) => {
    e.preventDefault();
    if (review.review === "") {
      context.Alertbox("error", "Please Provide Your Review");
      return;
    }
    postData("/api/user/addReview", review).then((res) => {
      if (res.error === true) {
        context.Alertbox("error", res.message);
        return;
      }
      context.Alertbox("success", res.message);
      setReview((prev) => ({
        ...prev,
        rating: 1,
        review: "",
      }));
      GetReviews();
    });
  };

  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      image: context.userData.Avatar,
      userName: context.userData.name,
      userId: context.userData._id,
      productId: props.productId,
    }));
  }, [context.userData, props.productId]);

  const GetReviews = async () => {
    try {
      if (!props.productId) return;

      const res = await fetchData(
        `/api/user/Reviews?productId=${props.productId}`
      );
      console.log("Fetched reviews:", res?.data);
      setReviewData(res?.data || []);
      props.setReviewsCount?.(res?.data?.length || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewData([]);
      props.setReviewsCount?.(0);
    }
  };

  useEffect(() => {
    if (props.productId) {
      GetReviews();
    }
  }, [props.productId]);

  return (
    <div className="shadow-md w-full p-5 rounded-md">
      <div className="containerreview w-full">
        <h2 className="font-[500] text-[20px]"> Customers Questions</h2>
        {reviewData && reviewData?.length === 0 ? (
          <h2 className="font-[500] text-[20px]">No Reviews</h2>
        ) : (
          <div className="reviewscroll w-full pt-5 pb-4 pr-5 overflow-x-hidden overflow-y-scroll max-h-[300px] ">
            {reviewData?.map((item) => (
              <div className="w-full review flex items-center justify-between  border-b border-[rgba(0,0,0,0.3)]   mt-4">
                <div className="info w-[80%] flex items-center gap-2">
                  <div className="img w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img src={item.image} className="w-full" alt="" />
                  </div>

                  <div className="info w-[80%]">
                    <h3 className="text-[16px]">{item.userName}</h3>
                    <h5 className="text-[13px] text-gray-500 mb-0">
                      {new Date(item.createdAt).toISOString().split("T")[0]}
                    </h5>
                    <p className=" mt-0 mb-0">{item.review}</p>
                  </div>
                </div>
                <Rating
                  name="size-small"
                  value={item.rating}
                  size="small"
                  readOnly
                />
              </div>
            ))}
          </div>
        )}

        <br />

        <div className="reviewform bg-[#fafafa] rounded-md p-4 mr-6 ">
          <h2 className="text-[18px] font-[500] "> Add Review</h2>
          <form className="w-full mt-5" onSubmit={onSubmitReview}>
            <TextField
              id="outlined-multiline-flexible"
              label="Leave A Review"
              multiline
              rows={4}
              value={review.review}
              onChange={onChangeReview}
              name="review"
              className="w-full "
            />
            <br /> <br />
            <Rating
              name="size-small "
              value={review.rating}
              onChange={onChangeRating}
            />
            <div className="flex items-center mt-5">
              <Button
                type="submit"
                className="!bg-primary !text-white !rounded-full"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
