import React, { useEffect, useState } from "react";
import OrganizationalPopup from "../src/organizationPopup/OrganizationPopup";
// to call data
import axios from "axios";
import AccessRefreshTokens from "../RefreshToken/AccessRefreshTokens";

// Style
import "./Organizational Structure.css";
import Moment from "moment";

const formatDate = (date) => Moment(date).format("DD/MM/YYYY");

function OrganizationalStructure() {
  const [boardData, setBoardData] = useState([]);
  const [orgPopuo, setOrgPopup] = useState([]);
  const [selectIndex, setSelectIndex] = useState([1]);
  const [activePopup, setActivePopup] = useState();

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
  }, [selectIndex, localStorage.getItem("token")]);

  const chaeckEmpty = (string) => (string == "" ? "-" : string);

  const handelPopup = (idx) => {
    setSelectIndex(boardData[idx]);
  };

  return (
    <>
      <div className="OrganizationalStructure">
        <div className="chairman">
          <div className="container-md">
            <div className="row">
              <a href="#chairman-popup">
                <div className="chairman-card d-flex my-5">
                  <div className="chairman-img ">
                    <img
                      className="profile-img"
                      src={boardData[7]?.profilePicURL}
                      alt="Chairman Image"
                    />
                  </div>
                  <div className="chairman-card-data d-flex flex-column justify-content-center">
                    <p className="person-name">{boardData[7]?.nameEn}</p>
                    <p className="person-position">
                      {boardData[7]?.positionNameEn}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="chairman-popup" id="chairman-popup">
          <div className="container">
            <h3 className="board-title d-flex justify-content-between align-items-center">
              {boardData[7]?.nameEn}
              <span className="close-icon">
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
        <div className="board container-md my-2">
          <div className="row">
            {boardData.slice(0, 6).map((item, idx) => {
              return (
                <div className="col-lg-3 col-sm-4 col-6">
                  <a
                    onClick={() => handelPopup(idx)}
                    href="#boards-popup"
                    key={idx}
                  >
                    <div className="person-card my-3">
                      <div>
                        <img className="profile-img" src={item.profilePicURL} />
                      </div>
                      <div className="person-info">
                        <p className="person-name">{item.nameEn}</p>
                        <p className="person-position">
                          {item.companyPositionTypeNameEn}
                        </p>
                      </div>
                      <div></div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="boards-popup active-chart" id="boards-popup">
          <div className="container">
            <h3 className="board-title d-flex justify-content-between align-items-center">
              {selectIndex?.nameEn}
              <span className="close-icon">
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
              {selectIndex?.resumeHighLightEn?.replace(
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
                {selectIndex?.positionHistory?.map((list, id) => {
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
    </>
  );
}

export default OrganizationalStructure;
