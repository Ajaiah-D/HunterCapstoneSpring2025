import CustomLink from "./CustomLink";

const Footnote = () => {
  return (
    <p className="text-white text-center text-1xl w-screen bg-brightblue p-2">
      DISCLAIMER: This project was created as an assignment for school and has
      some bugs throughout and is not yet completed. Please reach out to the
      <CustomLink
        external={true}
        page="https://github.com/Ajaiah-D/HunterCapstoneSpring2025/tree/main"
      >
        CONTRIBUTERS
      </CustomLink>
      if you have any questions.
    </p>
  );
};

export default Footnote;
