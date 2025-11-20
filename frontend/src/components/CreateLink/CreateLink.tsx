import { cn } from "../../utils/cn";
import { Button, Modal, TextInput } from "../shared";
import { useCreateLink } from "./useCreateLink";

export interface CreateLinkProps {
  onClose: () => void;
  postSubmit: () => void;
}

const CreateLink: React.FC<CreateLinkProps> = ({ onClose, postSubmit }) => {
  const { handleAdd, setTargetUrl, targetUrl, adding, error } = useCreateLink({
    postSubmit,
  });

  return (
    <Modal title="Create Link" onClose={onClose}>
      <div className=" flex  flex-col gap-4 py-4">
        <TextInput
          name="targetUrl"
          label="Target URL"
          value={targetUrl}
          onChange={setTargetUrl}
          error={error ?? undefined}
        />
        <div className="flex justify-end">
          <Button
            label="Add"
            onClick={handleAdd}
            className={cn("", adding && "pointer-events-none")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateLink;
