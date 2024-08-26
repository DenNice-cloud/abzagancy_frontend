const { Link } = require("react-router-dom");

const UserShortInfo = ({ data }) => {
  return (
    <Link
      key={data.id}
      to={`/users/${data.id}`}
      className="rounded p-4 border shadow-md bg-white"
    >
      <div className="mb-2 text-gray-700">
        <strong>Id:</strong> {data.id}
      </div>
      <div className="mb-2 text-gray-700 break-words">
        <strong>E-mail:</strong> {data.email}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>User name:</strong> {data.name}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Telephone:</strong> {data.phone}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Position name:</strong>
        <p>{data.position}</p>
      </div>
      <img
        src={data.photo}
        alt={data.name}
        className="w-[70px] h-[70px] rounded-md mt-4 mx-auto"
      />
    </Link>
  );
};

export default UserShortInfo;
