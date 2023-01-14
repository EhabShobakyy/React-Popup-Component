import React, { useEffect, useState } from "react";
// to call data
import axios from "axios";
import AccessRefreshTokens from "../../RefreshToken/AccessRefreshTokens";

function OrganizationalPopup(props) {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    AccessRefreshTokens.getAccessToken();

    axios
      .get(
        `https://data.argaam.com/api/v1/json/ir-api/organizational-structure`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.individuals);
        setBoardData(res.data.individuals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem("token")]);

  const chaeckEmpty = (string) => (string === "" ? "-" : string);

  const handelClose = () => {
    document.querySelector(".popup-body").style.display = "none";
  };
  if (props.id) {
    document.querySelector(".popup-body").style.display = "block";
  }

  return (
    <div className="popup-body">
      <div
        className="chairman-popup"
        id="chairman-popup"
        style={{ display: props.id === "profile-img" ? "block" : "none" }}
      >
        <div className="container">
          <h3 className="board-title d-flex justify-content-between align-items-center">
            {boardData[7]?.nameEn}
            <span className="close-icon" onClick={handelClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </span>
          </h3>
          <p className="my-1">
            {boardData[7]?.resumeHighLightEn
              .replace(/<[^>]*(>|$)|&nbsp;|&amp;|&raquo;|&laquo;|&gt;/g, " ")
              .slice(0, 85)}
          </p>
          <p className="my-1">
            {boardData[7]?.resumeHighLightEn
              .replace(/<[^>]*(>|$)|&nbsp;|&amp;|&raquo;|&laquo;|&gt;/g, " ")
              .slice(90, 150)}
          </p>
          <p className="my-1">
            {boardData[7]?.resumeHighLightEn
              .replace(/<[^>]*(>|$)|&nbsp;|&amp;|&raquo;|&laquo;|&gt;/g, " ")
              .slice(150, 270)}
          </p>

          <p className="my-1">
            {boardData[7]?.resumeHighLightEn
              .replace(/<[^>]*(>|$)|&nbsp;|&amp;|&raquo;|&laquo;|&gt;/g, " ")
              .slice(280)}
          </p>

          <div>
            {boardData.slice(7, 8).map((item, idx) => {
              return (
                <div>
                  <div className="row  flex-wrap my-4">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-3 col-sm-6 col-6">
                        <h6>Company Name</h6>
                      </div>

                      <div className="col-lg-3 col-sm-6 col-6">
                        <h6>Position Name</h6>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-6">
                        <h6>Started On</h6>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-6">
                        <h6>Ended On</h6>
                      </div>
                    </div>
                    {item?.positionHistory.map((info, id) => {
                      return (
                        <div
                          className="desc d-flex justify-content-between"
                          key={id}
                        >
                          <div className="col-lg-3 col-sm-6 col-6">
                            <p>{info?.companyNameEn}</p>
                          </div>
                          <div className="col-lg-3 col-sm-6 col-6">
                            <p>{info?.positionNameEn}</p>
                          </div>
                          <div className="col-lg-3 col-sm-6 col-6">
                            <p>{chaeckEmpty(info?.startedOn)}</p>
                          </div>
                          <div className="col-lg-3 col-sm-6 col-6">
                            <p>{chaeckEmpty(info?.endedOn)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="board-body"
        style={{ display: props.id === "board-img" ? "block" : "none" }}
      >
        {props.children}
        <div className="boards-popup active-chart" id="boards-popup">
          <div className="container">
            <h3 className="board-title d-flex justify-content-between align-items-center">
              {props.index?.nameEn}
              <span className="close-icon" onClick={handelClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </span>
            </h3>
            <p className="my-1">
              {props.index?.resumeHighLightEn?.replace(
                /<[^>]*(>|$)|&nbsp;|&amp;|&raquo;|&laquo;|&gt;/g,
                " "
              )}
            </p>
            <table className="boards-popup-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Position Name</th>
                  <th>started On</th>
                  <th>Ended On</th>
                </tr>
              </thead>

              <tbody>
                {props.index?.positionHistory?.map((list, id) => {
                  return (
                    <>
                      <tr>
                        <td>{list?.companyNameEn}</td>
                        <td>{list?.positionNameEn}</td>
                        <td>{chaeckEmpty(list?.startedOn)}</td>
                        <td>{chaeckEmpty(list?.endedOn)}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrganizationalPopup;
