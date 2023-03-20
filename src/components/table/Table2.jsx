// import React from "react";
// import "./table.scss";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { DataGrid } from "@mui/x-data-grid";

// const List = () => {
//   const rows = [
//     {
//       id: 12101,
//       videoname: "Iklan 1",
//       videofile: "video1.mp4",
//       user: "Sunan Jaya",
//       date: "10 January 2023",
//       status: "Uploaded",
//     },
//     {
//       id: 12102,
//       videoname: "Iklan 2",
//       videofile: "video2.mp4",
//       user: "Khoirul Anwar",
//       date: "12 January 2023",
//       status: "Pending",
//     },
//     {
//       id: 12103,
//       videoname: "Iklan 3",
//       videofile: "video3.mp4",
//       user: "Yayan Anwar",
//       date: "13 January 2023",
//       status: "Uploaded",
//     },
//     {
//       id: 12104,
//       videoname: "Iklan 4",
//       videofile: "video4.mp4",
//       user: "Mardiana",
//       date: "14 January 2023",
//       status: "Pending",
//     },
//     {
//       id: 12105,
//       videoname: "Iklan 5",
//       videofile: "video5.mp4",
//       user: "Rayhan",
//       date: "15 January 2023",
//       status: "Pending",
//     },
//     {
//       id: 12106,
//       videoname: "Iklan 6",
//       videofile: "video6.mp4",
//       user: "Reza",
//       date: "16 January 2023",
//       status: "Uploaded",
//     },
//     {
//       id: 12107,
//       videoname: "Iklan 7",
//       videofile: "video7.mp4",
//       user: "Arif",
//       date: "17 January 2023",
//       status: "Uploaded",
//     },
//   ];

//   return (
//     <TableContainer component={Paper} className="table">
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell className="tableCell">Users ID</TableCell>
//             <TableCell className="tableCell">User Name</TableCell>
//             <TableCell className="tableCell">Video Name</TableCell>
//             <TableCell className="tableCell">File Video</TableCell>
//             <TableCell className="tableCell">Date</TableCell>
//             <TableCell className="tableCell">Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell className="tableCell">{row.id}</TableCell>
//               <TableCell className="tableCell">{row.user}</TableCell>
//               <TableCell className="tableCell">{row.videoname}</TableCell>
//               <TableCell className="tableCell">{row.videofile}</TableCell>
//               <TableCell className="tableCell">{row.date}</TableCell>
//               <TableCell className="tableCell">
//                 <span className={`status ${row.status}`}>{row.status}</span>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default List;
