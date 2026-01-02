import ImageUpload from "./ImageUpload";
import DocumentUpload from "./DocumentUpload";
interface Props {
  images: File[];
  documents: File[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (i: number) => void;
  onDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveDocument: (i: number) => void;
}

const AssetsSidebar: React.FC<Props> = (props) => (
  <div className="w-96 my-10 mx-auto space-y-10 px-8 py-10 mr-16 border-l bg-gray-900 rounded-3xl">
    <ImageUpload {...props} />
    <DocumentUpload {...props} />
  </div>
);

export default AssetsSidebar;
