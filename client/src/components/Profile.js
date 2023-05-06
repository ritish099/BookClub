//   return isLoggedIn ? (
//     <div>
//
//       <div className="Heading">
//         <Text marginBottom={"10px"}>Your Books</Text>
//       </div>
//       <div className="Catalogue">
//         {Books.map((book) => (
//           <ProductCard id={book._id} book={book} />
//         ))}
//       </div>

//       <ChatButton />
//     </div>
//   ) : (
//     <>
//       <InfoPage message="You have to be logged in to access this page" />
//       <ChatButton/>
//     </>
//   );
// };

// export default Profile;

import {useState, useEffect} from "react";
import verifySignIn from "../utils/verifySignIn";
import getUserBooks from "../utils/getUserBooks";
import InfoPage from "./InfoPage";
import ProductCard from "../components/ProductCard";
import {Text} from "@chakra-ui/react";
import ChatButton from "./IconButton";

import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import getUserDetails from "../utils/getUserDetails";

export default function EditButton() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const sampleImage =
    "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ";

  useEffect(() => {
    verifySignIn().then((res) => {
      //console.log(res);
      setisLoggedIn(res);
    });
    getUserBooks(setBooks);
  }, []);

  useEffect(() => {
    getUserDetails(setUser);
  }, []);

  return isLoggedIn ? (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100" style={{width: "100%"}}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{backgroundColor: "#000", height: "200px"}}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{width: "150px"}}
                >
                  <MDBCardImage
                    src={user?.image ? user?.image : sampleImage}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{width: "150px", zIndex: "1"}}
                  />
                  <MDBBtn
                    outline
                    color="dark"
                    style={{height: "36px", overflow: "visible"}}
                    onClick={() => {
                      navigate("/update-profile");
                    }}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{marginTop: "130px"}}>
                  <MDBTypography tag="h5">{localStorage.getItem("name")}</MDBTypography>
                  <MDBCardText>@{localStorage.getItem("userName")}</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{backgroundColor: "#f8f9fa"}}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5"></MDBCardText>
                    <MDBCardText className="small text-muted mb-0"></MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5"></MDBCardText>
                    <MDBCardText className="small text-muted mb-0"></MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5"></MDBCardText>
                    <MDBCardText className="small text-muted mb-0"></MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                    {
                      user?.about
                    }
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    Your Uploaded Books
                  </MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="#!" className="text-muted">
                      {/* Show all */}
                    </a>
                  </MDBCardText>
                </div>
                <MDBRow>
                  <div className="Catalogue">
                    {Books.map((book) => (
                      <ProductCard id={book._id} book={book} />
                    ))}
                  </div>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
}
