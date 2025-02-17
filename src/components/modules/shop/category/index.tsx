import { Button } from "@/components/ui/button";
import CreateCategorymodal from "./CreateCategorymodal";

const ManageCategories = () => {
  return (
    <div>
      <div className="flex  justify-between px-[4vw] items-center">
        <h1  className="text-[4vw] md:text-[2vw]  ">Manage Categories</h1>
        <CreateCategorymodal/>
      </div>
    </div>
  );
};

export default ManageCategories;
