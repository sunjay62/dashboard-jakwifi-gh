export const tableColumns = [
  { field: "id", headerName: "ID User", width: 100 },
  { field: "user", headerName: "User Name", width: 170 },
  { field: "videoname", headerName: "Video Name", width: 170 },
  { field: "videofile", headerName: "Video File", width: 170 },
  { field: "date", headerName: "Date", width: 170 },
  {
    field: "status",
    headerName: "Status",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithStatus">
          <span className={`status ${params.row.status}`}>
            {params.row.status}
          </span>
        </div>
      );
    },
  },
];

// temporarydata

export const tableRows = [
  {
    id: 12101,
    videoname: "Iklan 1",
    videofile: "video1.mp4",
    user: "Sunan Jaya",
    date: "10 January 2023",
    status: "Uploaded",
  },
  {
    id: 12102,
    videoname: "Iklan 2",
    videofile: "video2.mp4",
    user: "Khoirul Anwar",
    date: "12 January 2023",
    status: "Pending",
  },
  {
    id: 12103,
    videoname: "Iklan 3",
    videofile: "video3.mp4",
    user: "Yayan Anwar",
    date: "13 January 2023",
    status: "Uploaded",
  },
  {
    id: 12104,
    videoname: "Iklan 4",
    videofile: "video4.mp4",
    user: "Mardiana",
    date: "14 January 2023",
    status: "Pending",
  },
  {
    id: 12105,
    videoname: "Iklan 5",
    videofile: "video5.mp4",
    user: "Rayhan",
    date: "15 January 2023",
    status: "Pending",
  },
  {
    id: 12106,
    videoname: "Iklan 6",
    videofile: "video6.mp4",
    user: "Reza",
    date: "16 January 2023",
    status: "Uploaded",
  },
  {
    id: 12107,
    videoname: "Iklan 7",
    videofile: "video7.mp4",
    user: "Arif",
    date: "17 January 2023",
    status: "Uploaded",
  },
];
