import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    loading: true,
    data: {},
    totalvalue: {},
  };

  getCountryData = (finalData) => {
    let finalDataArray = Object.values(finalData);
    let totalTested = 0;
    let totalConfirmed = 0;
    let totalDeceased = 0;
    let totalRecovered = 0;

    for (var j = 0; j < finalDataArray.length; j++) {
      if (finalDataArray[j]) {
        totalConfirmed = totalConfirmed + finalDataArray[j].confirmed;
        totalDeceased = totalDeceased + finalDataArray[j].deceased;
        totalRecovered = totalRecovered + finalDataArray[j].recovered;
        totalTested = totalTested + finalDataArray[j].tested;
      }
    }
    return {
      totalConfirmed: {
        className: "Confirmed",
        value: totalConfirmed,
        title: "Confirmed",
        tag: "",
      },
      totalTested: {
        className: "Active",
        value: totalTested,
        title: "Tested",
        tag: "",
      },

      totalRecovered: {
        className: "Recovered",
        value: totalRecovered,
        title: "Recovered",
        tag: "",
      },

      totalDeceased: {
        className: "Deceased",
        value: totalDeceased,
        title: "Deceased",
        tag: "",
      },
    };
  };

  async componentDidMount() {
    const url = "https://api.covid19india.org/state_district_wise.json";
    const response = await fetch(url);
    const data = await response.json();

    let keys = Object.keys(data);

    const finalData = Object.values(data).reduce((result, item, index) => {
      const { statecode } = item;
      result[statecode] = keys[index];

      return result;
    }, {});

    const stateDataUrl = "https://api.covid19india.org/v4/timeseries.json";
    const stateDataresponse = await fetch(stateDataUrl);
    const stateData = await stateDataresponse.json();

    let keys2 = Object.keys(stateData);

    const finalStaeData = Object.values(stateData).reduce(
      (result, item, index) => {
        const { dates } = item;
        const stateObject = Object.values(dates);
        const stateIndex = stateObject.length - 1;
        const lastStateObject = Object.values(dates)[stateIndex].total;
        const stateKey = Object.keys(stateData)[index];

        if (finalData.hasOwnProperty(stateKey)) {
          const stateName = finalData[stateKey];

          result[`${stateName}`] = lastStateObject;
        }
        return result;
      },
      {}
    );

    this.setState({ data: finalStaeData });
    const totalCount = this.getCountryData(finalStaeData);

    this.setState({ totalvalue: totalCount });

    var currentDate = new Date();
    var y = currentDate.getFullYear();
    var m = currentDate.getMonth() + 1;
    var d = currentDate.getDate();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    document.getElementById("date").innerHTML =
      d + " Dec," + hour + ":" + minutes + " IST";
    document.getElementById("dateUpadted").innerHTML =
      "Last upadted on " + d + " Dec," + hour + ":" + minutes + " IST";
    document.getElementById("dateUpadtedOn").innerHTML = "As of " + d + " Dec,";
  }
  render() {
    const { data, totalvalue } = this.state || {};
    const flag = Object.keys(totalvalue).length !== 0;
    return (
      <body className="dark-mode">
        <div className="App">
          <div className="Navbar">
            <div className="navbar-left">English</div>

            <div className="navbar-middle">
              <a href="/">
                Covid19
                <div>India</div>
              </a>
            </div>
            <div class="navbar-right">
              <a href="/">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </span>
              </a>
              <a href="/blog">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </span>
              </a>

              <a href="/">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </span>
              </a>

              <a href="/">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffc107"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="Home">
            <div className="left-panel">
              <div className="Search-time-panel">
                <div className="covid19-name-style">COVID19</div>

                <div className="time" id="date"></div>
              </div>
              <div className="Status">
                {Object.values(totalvalue).map((item, index) => {
                  console.log("====>", item);
                  return (
                    <div className={item.className}>
                      <div className="status-style">{item.title}</div>
                      <div className="day-count">{item.tag}</div>
                      <div className="total-count">{item.value}</div>
                    </div>
                  );
                })}
                {}
              </div>
              <div className="table">
                <div className="grid-container">
                  <div class="each-coloumn-state">State</div>
                  <div class="each-coloumn-confirmed">Confirmed</div>
                  <div class="each-coloumn-recoverd">Recovered</div>
                  <div class="each-coloumn-deceased">Deceased</div>
                  <div class="each-coloumn-tested">Tested</div>
                </div>
                {Object.values(data).map((item, index) => {
                  if (item) {
                    return (
                      <div className="grid-container">
                        <div class="each-coloumn-state">
                          {Object.keys(data)[index]}
                        </div>
                        <div class="each-coloumn-confirmed">
                          {item.confirmed}
                        </div>
                        <div class="each-coloumn-recoverd">
                          {item.recovered}
                        </div>
                        <div class="each-coloumn-deceased">{item.deceased}</div>
                        <div class="each-coloumn-tested">{item.tested}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="right-panel">
              <div className="Country-header">
                <div className="country-header-div">
                  <div className="header-left">
                    <div className="country-name-style">India</div>
                    <div className="time-updated" id="dateUpadted"></div>
                  </div>
                  <div className="header-right">
                    <div className="font-small">Tested</div>

                    {flag && (
                      <div className="weight-font">
                        {totalvalue.totalTested.value}
                      </div>
                    )}

                    <div className="font-small" id="dateUpadtedOn">
                      {" "}
                    </div>
                    <div className="font-small">per source</div>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
