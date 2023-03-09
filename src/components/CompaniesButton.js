const CompaniesButton = ({ companies, filteredItems }) => {
  return (
    <ul className="p-10 cursor-pointer">
      {companies.map((company, index) => (
        <li
          onClick={() => filteredItems(company)}
          key={index}
          className="border-gray-400 border-b py-2 uppercase"
        >
          {company}
        </li>
      ))}
    </ul>
  );
};

export default CompaniesButton;
