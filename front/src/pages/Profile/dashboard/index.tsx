import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useOutletContext } from "react-router-dom";
import { IContext, IPost } from "../../../helpers/types";
import { useEffect, useRef, useState } from "react";
import { getAllPosts, handleUpload, handleUploadCover } from "../../../helpers/api";
import { BASE, DEF, DEF2 } from "../../../helpers/default";

export function Profile() {

  const { account, setAccount } = useOutletContext<IContext>();
  const photo = useRef<HTMLInputElement | null>(null);
  const coverPhoto = useRef<HTMLInputElement | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getAllPosts()
      .then(response => {
        setPosts(response.payload as IPost[])
      })
  }, [])

  const choosePhoto = () => {
    const file = photo.current?.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("picture", file);
      handleUpload(form).then((response) => {
        setAccount({ ...account, picture: response.payload as string });
      });
    }
  };

  const chooseCoverPhoto = () => {

    const file = coverPhoto.current?.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("cover", file);
      handleUploadCover(form)
        .then((response) => {
          setAccount({ ...account, cover: response.payload as string });
        })
    }
  }

  const handleCoverPhotoClick = () => {
    coverPhoto.current?.click();
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9DE2FF" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{
                  backgroundImage: `url(${account.cover ? BASE + account.cover : DEF2})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: "200px",
                }}
                onClick={handleCoverPhotoClick}
              >
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={coverPhoto}
                  onChange={chooseCoverPhoto}
                />
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <input style={{ display: 'none' }} type="file" ref={photo} onChange={choosePhoto} />
                  <MDBCardImage
                    onClick={() => photo.current?.click()}
                    src={account.picture ? BASE + account.picture : DEF}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {account.name} {account.surname}
                  </MDBTypography>
                  <MDBCardText>VibeSnapNet</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  {
                    account && <div>
                      <MDBCardText className="mb-1 h5">{posts.length}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                  }
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account.followers?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Followers
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account.following?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Following
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    Recent photos
                  </MDBCardText>
                </div>
                <MDBRow className="g-2">
                  {
                    posts.map((img) => (
                      <MDBCol md="4" key={img.id} className="mb-2">
                        <MDBCardImage
                          src={img.picture ? BASE + img.picture : DEF}
                          alt="Posts"
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
                    ))
                  }
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div >
  );
}