import DescriptionMutate from "./mutation-components/description-mutate";
import NameMutate from "./mutation-components/name-mutate";

const MainDetails = () => {
  return (
    <div className="grid gap-5">
      <NameMutate />
      <DescriptionMutate />
    </div>
  );
};

export default MainDetails;
