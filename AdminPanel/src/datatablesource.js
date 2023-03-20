export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "user_type",
    headerName: "Type",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.user_type}`}>
          {params.row.user_type}
        </div>
      );
    },
  },
];


export const TeamsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 230,
  },
  {
    field: "place",
    headerName: "Place ",
    width: 230,
  },
  {
    field: "position",
    headerName: "Position",
    width: 100,
  },
  {
    field: "about",
    headerName: "About",
    width: 100,
  },
  {
    field: "image_url",
    headerName: "Image",
    width: 160,
    renderCell: (params) => {
      return (
        <img src={params.row.image_url} alt={params.row.image_alt} />
      );
    },
  },
  {
    field: "image_alt",
    headerName: "image_alt",
    width: 100,
  },
];

export const CompetitionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "place",
    headerName: "Place ",
    width: 230,
  },
  {
    field: "timings",
    headerName: "Timings",
    width: 100,
  },
  {
    field: "image_url",
    headerName: "Image",
    width: 160,
    renderCell: (params) => {
      return (
        <img src={params.row.image_url} alt={params.row.image_alt} />
      );
    },
  },
  {
    field: "image_alt",
    headerName: "image_alt",
    width: 100,
  },
];

export const BookColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "writer",
    headerName: "writer",
    width: 100,
  },
  {
    field: "image_url",
    headerName: "Image",
    width: 160,
    renderCell: (params) => {
      return (
        <img src={params.row.image} alt={params.row.image_alt} />
      );
    },
  },
  {
    field: "image_alt",
    headerName: "image_alt",
    width: 100,
  },
];


export const writerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Full Name",
    width: 230,
  },
  {
    field: "place",
    headerName: "Place ",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "image_url",
    headerName: "Image",
    width: 160,
    renderCell: (params) => {
      return (
        <img src={params.row.image_url} alt={params.row.image_alt} />
      );
    },
  },
  {
    field: "image_alt",
    headerName: "image_alt",
    width: 100,
  },
];