import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReferralLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate("/register", {
        state: {
          userId: id,
        },
      });
    }
  }, [id, navigate]);

  return <></>;
};

export default ReferralLink;
