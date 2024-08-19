import React from "react";
import "./MainExpense.css";
import PropertyDetailsModal from "../../modal/Modal";

function MainExpense() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  ];

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };

  return (
    <>
      <div className="user-main">
        <div className="main-table">
          {/* <div style={{ width: 825, height: 120, position: "relative" }}>
            <div
              style={{
                width: 255,
                height: 120,
                left: 0,
                top: 0,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 255,
                  height: 120,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "white",
                  borderRadius: 25,
                }}
              />
              <div
                style={{
                  width: 177,
                  height: 70,
                  left: 41,
                  top: 25,
                  position: "absolute",
                }}
              >
                <div
                  style={{
                    width: 92,
                    height: 56,
                    left: 85,
                    top: 7,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      left: 0,
                      top: 26,
                      position: "absolute",
                      color: "#232323",
                      fontSize: 25,
                      fontFamily: "Inter",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    ₹ 5,600
                  </div>
                  <div
                    style={{
                      left: 0,
                      top: 0,
                      position: "absolute",
                      color: "#718EBF",
                      fontSize: 16,
                      fontFamily: "Inter",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    Income
                  </div>
                </div>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    left: 0,
                    top: 0,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#E7EDFF",
                      borderRadius: 9999,
                    }}
                  />
                  <div
                    style={{
                      width: 29.58,
                      height: 30,
                      left: 20,
                      top: 20,
                      position: "absolute",
                    }}
                  >
                    <div
                      style={{
                        width: 14.84,
                        height: 14.84,
                        left: 10.27,
                        top: -0,
                        position: "absolute",
                        background: "#396AFF",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 10,
                        height: 11.34,
                        left: -0,
                        top: 18.66,
                        position: "absolute",
                        background: "#396AFF",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 21.81,
                        height: 9.5,
                        left: 7.78,
                        top: 15.93,
                        position: "absolute",
                        background: "#396AFF",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: 255,
                height: 120,
                left: 285,
                top: 0,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 255,
                  height: 120,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "white",
                  borderRadius: 25,
                }}
              />
              <div
                style={{
                  width: 94,
                  height: 56,
                  left: 126,
                  top: 32,
                  position: "absolute",
                }}
              >
                <div
                  style={{
                    left: 0,
                    top: 26,
                    position: "absolute",
                    color: "#232323",
                    fontSize: 25,
                    fontFamily: "Inter",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  ₹ 3,400
                </div>
                <div
                  style={{
                    left: 0,
                    top: 0,
                    position: "absolute",
                    color: "#718EBF",
                    fontSize: 16,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  Expense
                </div>
              </div>
              <div
                style={{
                  width: 70,
                  height: 70,
                  left: 41,
                  top: 25,
                  position: "absolute",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background: "#FFE0EB",
                    borderRadius: 9999,
                  }}
                />
                <div
                  style={{
                    width: 30,
                    height: 30,
                    left: 20,
                    top: 20,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 26.48,
                      height: 30,
                      left: 1.76,
                      top: 0,
                      position: "absolute",
                    }}
                  >
                    <div
                      style={{
                        width: 6.21,
                        height: 12.38,
                        left: 20.26,
                        top: 0,
                        position: "absolute",
                        background: "#FF82AC",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 19.9,
                        height: 29.99,
                        left: 0,
                        top: 0,
                        position: "absolute",
                        background: "#FF82AC",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 15.82,
                        height: 15.82,
                        left: 10.62,
                        top: 14.18,
                        position: "absolute",
                        background: "#FF82AC",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: 255,
                height: 120,
                left: 570,
                top: 0,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 255,
                  height: 120,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "white",
                  borderRadius: 25,
                }}
              />
              <div
                style={{
                  width: 178,
                  height: 70,
                  left: 39,
                  top: 25,
                  position: "absolute",
                }}
              >
                <div
                  style={{
                    width: 93,
                    height: 56,
                    left: 85,
                    top: 7,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      left: 0,
                      top: 26,
                      position: "absolute",
                      color: "#232323",
                      fontSize: 25,
                      fontFamily: "Inter",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    ₹ 2,200
                  </div>
                  <div
                    style={{
                      left: 4,
                      top: 0,
                      position: "absolute",
                      color: "#718EBF",
                      fontSize: 16,
                      fontFamily: "Inter",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    Profit
                  </div>
                </div>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    left: 0,
                    top: 0,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#DCFAF8",
                      borderRadius: 9999,
                    }}
                  />
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      left: 20,
                      top: 20,
                      position: "absolute",
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 22.03,
                        left: -0,
                        top: 7.01,
                        position: "absolute",
                        background: "#16DBCC",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 12.12,
                        height: 12.13,
                        left: 3.73,
                        top: 0.96,
                        position: "absolute",
                        background: "#16DBCC",
                      }}
                    ></div>
                  </div>
                </div>
                
              </div>
            </div>
          </div> */}

<div className="w-96 h-28 relative">
    <div className="w-64 h-28 left-0 top-0 absolute">
        <div className="w-64 h-28 left-0 top-0 absolute bg-white rounded-3xl" />
        <div className="w-44 h-16 left-[41px] top-[25px] absolute">
            <div className="w-24 h-14 left-[85px] top-[7px] absolute">
                <div className="left-0 top-[26px] absolute text-neutral-800 text-2xl font-semibold font-['Inter']">₹ 5,600</div>
                <div className="left-0 top-0 absolute text-slate-400 text-base font-normal font-['Inter']">Income</div>
            </div>
            <div className="w-16 h-16 left-0 top-0 absolute">
                <div className="w-16 h-16 left-0 top-0 absolute bg-violet-100 rounded-full" />
                <div className="w-7 h-7 left-[20px] top-[20px] absolute">
                </div>
            </div>
        </div>
    </div>
    <div className="w-64 h-28 left-[285px] top-0 absolute">
        <div className="w-64 h-28 left-0 top-0 absolute bg-white rounded-3xl" />
        <div className="w-24 h-14 left-[126px] top-[32px] absolute">
            <div className="left-0 top-[26px] absolute text-neutral-800 text-2xl font-semibold font-['Inter']">₹ 3,400</div>
            <div className="left-0 top-0 absolute text-slate-400 text-base font-normal font-['Inter']">Expense</div>
        </div>
        <div className="w-16 h-16 left-[41px] top-[25px] absolute">
            <div className="w-16 h-16 left-0 top-0 absolute bg-rose-100 rounded-full" />
            <div className="w-7 h-7 left-[20px] top-[20px] absolute">
                <div className="w-7 h-7 left-[1.76px] top-0 absolute">
                </div>
            </div>
        </div>
    </div>
    <div className="w-64 h-28 left-[570px] top-0 absolute">
        <div className="w-64 h-28 left-0 top-0 absolute bg-white rounded-3xl" />
        <div className="w-44 h-16 left-[39px] top-[25px] absolute">
            <div className="w-24 h-14 left-[85px] top-[7px] absolute">
                <div className="left-0 top-[26px] absolute text-neutral-800 text-2xl font-semibold font-['Inter']">₹ 2,200</div>
                <div className="left-[4px] top-0 absolute text-slate-400 text-base font-normal font-['Inter']">Profit</div>
            </div>
            <div className="w-16 h-16 left-0 top-0 absolute">
                <div className="w-16 h-16 left-0 top-0 absolute bg-sky-100 rounded-full" />
                <div className="w-7 h-7 left-[20px] top-[20px] absolute" />
            </div>
        </div>
    </div>
</div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={() => handleEdit(user.id)}>Block</button>
                    <PropertyDetailsModal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MainExpense;
